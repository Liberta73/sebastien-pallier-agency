"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function openAvaWidget() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("ava:open"));
}

export default function AvaWidget() {
  const [open, setOpen] = useState(false);
  const [compactMobile, setCompactMobile] = useState(false);

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    window.addEventListener("ava:open", handleOpen);
    window.addEventListener("ava:close", handleClose);

    return () => {
      window.removeEventListener("ava:open", handleOpen);
      window.removeEventListener("ava:close", handleClose);
    };
  }, []);

  useEffect(() => {
    const updateCompact = () => setCompactMobile(window.innerWidth < 375);

    updateCompact();
    window.addEventListener("resize", updateCompact);

    return () => window.removeEventListener("resize", updateCompact);
  }, []);

  const toggle = () => {
    setOpen((prev) => {
      const next = !prev;
      if (next) {
        window.dispatchEvent(new CustomEvent("ava:open"));
      } else {
        window.dispatchEvent(new CustomEvent("ava:close"));
      }
      return next;
    });
  };

  return (
    <>
      {open && (
        <div
          style={{
            position: "fixed",
            right: "24px",
            bottom: "90px",
            width: "min(420px, calc(100vw - 24px))",
            height: "min(650px, calc(100vh - 110px))",
            zIndex: 9999,
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,.25)",
            background: "#fff",
          }}
        >
          <iframe
            src="/ava/index.html"
            title="AVA - Assistante IA"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        </div>
      )}

      <button
        onClick={toggle}
        style={{
          position: "fixed",
          right: "max(12px, env(safe-area-inset-right))",
          bottom: "max(12px, env(safe-area-inset-bottom))",
          zIndex: 10000,
          border: "1px solid rgba(255,255,255,0.22)",
          borderRadius: "999px",
          padding: compactMobile ? "10px 12px 10px 10px" : "12px 22px 12px 12px",
          background: "linear-gradient(135deg, #103255 0%, #1f3f66 48%, #3b2d63 100%)",
          color: "white",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          minHeight: "64px",
          width: compactMobile ? "calc(100vw - 28px)" : "auto",
          maxWidth: "calc(100vw - 28px)",
          overflow: "hidden",
          boxShadow: "0 18px 42px rgba(0,0,0,.34), inset 0 1px 0 rgba(255,255,255,0.2)",
          backdropFilter: "blur(8px)",
          transition: "transform .2s ease, box-shadow .2s ease",
        }}
      >
        <span
          style={{
            position: "relative",
            width: "44px",
            height: "44px",
            borderRadius: "999px",
            overflow: "hidden",
            flex: "0 0 auto",
            boxShadow: "0 0 0 2px rgba(255,255,255,0.16)",
          }}
        >
          <Image src="/ava/ava.png" alt="AVA" fill sizes="44px" />
        </span>
        <span
          style={{
            display: "grid",
            textAlign: "left",
            lineHeight: 1.15,
            paddingRight: "2px",
            minWidth: 0,
            flex: 1,
            overflow: "hidden",
          }}
        >
          <span style={{ fontSize: "18px", fontWeight: 800, letterSpacing: "0.01em", whiteSpace: "nowrap" }}>
            {open ? "Fermer AVA" : "Parler à AVA"}
          </span>
          {!open && !compactMobile ? (
            <span style={{ fontSize: "12px", opacity: 0.94, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Construis ton projet en quelques minutes
            </span>
          ) : null}
        </span>
      </button>
    </>
  );
}
