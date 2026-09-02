import { NextRequest, NextResponse } from "next/server";
import { hasValidZoeCookie } from "@/lib/zoe-auth";

const MAX_MESSAGE_LENGTH = 4000;
const N8N_TIMEOUT_MS = 20_000;

type ZoeRequest = { message: string; session_id: string };
type N8nResponse = { response?: unknown; message?: unknown; text?: unknown; data?: unknown };

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function getResponseText(payload: N8nResponse) {
  for (const value of [payload.response, payload.message, payload.text]) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  if (payload.data && typeof payload.data === "object" && !Array.isArray(payload.data)) {
    return getResponseText(payload.data as N8nResponse);
  }
  return null;
}

// The workflow contract is not present in this repository; keep the adapter isolated until confirmed.
function toN8nPayload(request: ZoeRequest) {
  return { message: request.message, session_id: request.session_id };
}

export async function POST(request: NextRequest) {
  if (!hasValidZoeCookie(request)) return NextResponse.json({ ok: false, error: "Accès non autorisé" }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide" }, { status: 400 });
  }

  const candidate = body as Partial<ZoeRequest>;
  const message = typeof candidate.message === "string" ? candidate.message.trim() : "";
  const sessionId = typeof candidate.session_id === "string" ? candidate.session_id.trim() : "";
  if (!message || message.length > MAX_MESSAGE_LENGTH || !isUuid(sessionId)) {
    return NextResponse.json({ ok: false, error: "Requête invalide" }, { status: 400 });
  }

  const webhookUrl = process.env.ZOE_N8N_WEBHOOK_URL;
  if (!webhookUrl) return NextResponse.json({ ok: false, error: "Service indisponible" }, { status: 503 });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), N8N_TIMEOUT_MS);
  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toN8nPayload({ message, session_id: sessionId })),
      signal: controller.signal,
      cache: "no-store",
    });
    if (response.status === 429) return NextResponse.json({ ok: false, error: "Service temporairement indisponible" }, { status: 429 });
    if (!response.ok) return NextResponse.json({ ok: false, error: "Service indisponible" }, { status: 502 });

    let payload: N8nResponse;
    try {
      payload = (await response.json()) as N8nResponse;
    } catch {
      return NextResponse.json({ ok: false, error: "Réponse invalide" }, { status: 502 });
    }
    const text = getResponseText(payload);
    if (!text) return NextResponse.json({ ok: false, error: "Réponse vide" }, { status: 502 });
    return NextResponse.json({ ok: true, message: text });
  } catch (error) {
    console.error("Zoé proxy error", { type: error instanceof Error && error.name === "AbortError" ? "timeout" : "network" });
    return NextResponse.json({ ok: false, error: "Service indisponible" }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}