"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

type ConversationMessage = {
  id: string;
  role: "user" | "zoe";
  content: string;
};

type ZoeApiResponse = {
  ok: boolean;
  message?: string;
  audio?: string;
  audio_mime_type?: string;
  error?: string;
};

const SESSION_STORAGE_KEY = "sp_zoe_session_id";

function createSessionId() {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();

  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  return [...bytes].map((byte, index) => {
    const hex = byte.toString(16).padStart(2, "0");
    return [4, 6, 8, 10].includes(index) ? `-${hex}` : hex;
  }).join("");
}

function getSessionId() {
  const existing = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
  if (existing) return existing;
  const created = createSessionId();
  window.sessionStorage.setItem(SESSION_STORAGE_KEY, created);
  return created;
}

export default function ZoeClient() {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [error, setError] = useState("");
  const historyRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const shouldSendAudioRef = useRef(false);

  useEffect(() => setSessionId(getSessionId()), []);
  useEffect(() => {
    return () => {
      shouldSendAudioRef.current = false;
      if (mediaRecorderRef.current?.state === "recording") mediaRecorderRef.current.stop();
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
      mediaRecorderRef.current = null;
      mediaStreamRef.current = null;
      audioChunksRef.current = [];
    };
  }, []);
  useEffect(() => {
    historyRef.current?.scrollTo({ top: historyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  function startNewConversation() {
    const nextSessionId = createSessionId();
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, nextSessionId);
    setSessionId(nextSessionId);
    setMessages([]);
    setError("");
  }

  async function startRecording() {
    if (isLoading || isAudioLoading || isRecording || !sessionId) return;
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setError("L’enregistrement audio n’est pas disponible dans ce navigateur.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = ["audio/webm;codecs=opus", "audio/mp4", "audio/webm", "audio/ogg;codecs=opus"].find((type) => MediaRecorder.isTypeSupported(type));
      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      audioChunksRef.current = [];
      shouldSendAudioRef.current = false;
      mediaStreamRef.current = stream;
      mediaRecorderRef.current = recorder;
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };
      recorder.onstop = async () => {
        const shouldSend = shouldSendAudioRef.current;
        shouldSendAudioRef.current = false;
        const chunks = audioChunksRef.current;
        const streamToRelease = mediaStreamRef.current;
        const recorderMimeType = recorder.mimeType || mimeType || "audio/webm";
        const extension = recorderMimeType.includes("mp4") ? "mp4" : recorderMimeType.includes("ogg") ? "ogg" : "webm";
        const audioBlob = new Blob(chunks, { type: recorderMimeType });
        mediaRecorderRef.current = null;
        mediaStreamRef.current = null;
        audioChunksRef.current = [];
        streamToRelease?.getTracks().forEach((track) => track.stop());
        setIsRecording(false);

        if (!shouldSend) return;
        if (!audioBlob.size) {
          setError("Aucun audio n’a été enregistré.");
          return;
        }

        setIsAudioLoading(true);
        setError("");
        try {
          const formData = new FormData();
          formData.append("data", audioBlob, `zoe-audio.${extension}`);
          formData.append("session_id", sessionId);
          const response = await fetch("/api/zoe", { method: "POST", body: formData });
          const data = (await response.json()) as ZoeApiResponse;
          if (!response.ok || !data.ok || !data.message) throw new Error("Zoe audio request failed");
          setMessages((current) => [...current, { id: crypto.randomUUID(), role: "zoe", content: data.message! }]);
          if (typeof data.audio === "string" && data.audio.trim()) {
            try {
              const binary = atob(data.audio);
              const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
              const responseAudioBlob = new Blob([bytes], { type: data.audio_mime_type || "audio/mpeg" });
              const audioUrl = URL.createObjectURL(responseAudioBlob);
              const player = new Audio(audioUrl);
              let urlRevoked = false;
              const revokeAudioUrl = () => {
                if (urlRevoked) return;
                urlRevoked = true;
                URL.revokeObjectURL(audioUrl);
              };
              const handlePlaybackError = () => {
                revokeAudioUrl();
                setError("La réponse audio n’a pas pu être lue.");
              };
              player.addEventListener("ended", revokeAudioUrl, { once: true });
              player.addEventListener("error", handlePlaybackError, { once: true });
              void player.play().catch(handlePlaybackError);
            } catch {
              setError("La réponse audio n’a pas pu être lue.");
            }
          }
        } catch {
          setError("Zoé est momentanément indisponible. Réessayez.");
        } finally {
          setIsAudioLoading(false);
        }
      };
      recorder.onerror = () => {
        shouldSendAudioRef.current = false;
        recorder.stop();
        setError("L’enregistrement audio a échoué. Réessayez.");
      };
      recorder.start();
      setError("");
      setIsRecording(true);
    } catch {
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
      mediaRecorderRef.current = null;
      audioChunksRef.current = [];
      setError("L’accès au microphone a été refusé ou est indisponible.");
    }
  }

  function stopRecording() {
    const recorder = mediaRecorderRef.current;
    if (!recorder || recorder.state !== "recording") return;
    shouldSendAudioRef.current = true;
    recorder.stop();
  }

  async function sendMessage(event?: FormEvent) {
    event?.preventDefault();
    const message = input.trim();
    if (!message || isLoading || !sessionId) return;

    setInput("");
    setError("");
    setMessages((current) => [...current, { id: crypto.randomUUID(), role: "user", content: message }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/zoe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, session_id: sessionId }),
      });
      const data = (await response.json()) as ZoeApiResponse;
      if (!response.ok || !data.ok || !data.message) throw new Error("Zoe request failed");
      setMessages((current) => [...current, { id: crypto.randomUUID(), role: "zoe", content: data.message! }]);
    } catch {
      setError("Zoé est momentanément indisponible. Réessayez.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  }

  return (
    <main className="zoe-shell">
      <header className="zoe-header">
        <div>
          <span className="zoe-kicker">SP AI OS / DIRECTION</span>
          <h1>Zoé</h1>
          <p>Assistant Direction</p>
        </div>
        <div className="zoe-header-actions">
          <span className="zoe-status"><span aria-hidden="true" />Direction</span>
          <button type="button" className="zoe-new-button" onClick={startNewConversation}>Nouvelle conversation</button>
        </div>
      </header>

      <div className="zoe-history" ref={historyRef} aria-live="polite" aria-label="Historique de conversation">
        {messages.length === 0 && <p className="zoe-empty">La conversation avec Zoé commencera ici.</p>}
        {messages.map((message) => (
          <article className={`zoe-message zoe-message-${message.role}`} key={message.id}>
            <span className="zoe-message-label">{message.role === "zoe" ? "Zoé" : "Vous"}</span>
            <p>{message.content}</p>
          </article>
        ))}
        {isLoading && <p className="zoe-loading" role="status">Zoé prépare une réponse<span aria-hidden="true">...</span></p>}
      </div>

      <form className="zoe-composer" onSubmit={sendMessage}>
        <label htmlFor="zoe-message">Message</label>
        <textarea id="zoe-message" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={handleKeyDown} placeholder="Demander quelque chose à Zoé…" maxLength={4000} rows={2} disabled={isLoading || isRecording || isAudioLoading} />
        <div className="zoe-composer-footer">
          <span className="zoe-hint">Entrée pour envoyer · Maj + Entrée pour une nouvelle ligne</span>
          <button type="button" onClick={isRecording ? stopRecording : startRecording} aria-label={isRecording ? "Arrêter l’enregistrement" : "Démarrer l’enregistrement"} aria-pressed={isRecording} disabled={isLoading || isAudioLoading}>
            {isRecording ? "Arrêter" : "Microphone"}
          </button>
          <button type="submit" className="zoe-send-button" disabled={!input.trim() || isLoading || isRecording || isAudioLoading}>Envoyer</button>
        </div>
        {error && <p className="zoe-error" role="alert">{error}</p>}
      </form>
    </main>
  );
}