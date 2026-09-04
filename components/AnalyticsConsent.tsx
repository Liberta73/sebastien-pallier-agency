"use client";

import { useEffect, useState } from "react";

const CONSENT_STORAGE_KEY = "sp_analytics_consent";

type ConsentChoice = "granted" | "denied";

export default function AnalyticsConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    setIsVisible(consent !== "granted" && consent !== "denied");
  }, []);

  function chooseConsent(choice: ConsentChoice) {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    window.dispatchEvent(
      new CustomEvent("sp-analytics-consent-changed", {
        detail: { consent: choice },
      }),
    );
    setIsVisible(false);
  }

  if (!isVisible) return null;

  return (
    <aside
      role="dialog"
      aria-label="Consentement aux cookies analytics"
      style={{
        position: "fixed",
        right: 16,
        bottom: 16,
        left: 16,
        zIndex: 50,
        maxWidth: 720,
        marginInline: "auto",
        padding: "16px 18px",
        border: "1px solid rgba(148, 163, 184, 0.3)",
        borderRadius: 8,
        background: "rgba(15, 23, 42, 0.97)",
        boxShadow: "0 14px 40px rgba(0, 0, 0, 0.28)",
        color: "#f8fafc",
      }}
    >
      <p style={{ margin: "0 0 14px", color: "#cbd5e1", fontSize: 13, lineHeight: 1.5 }}>
        Des cookies et mesures d’audience Google Analytics peuvent être utilisés pour mesurer les visites et améliorer le site.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-end", gap: 10 }}>
        <button
          type="button"
          onClick={() => chooseConsent("denied")}
          style={{
            minWidth: 96,
            padding: "8px 14px",
            border: "1px solid #64748b",
            borderRadius: 4,
            background: "transparent",
            color: "#f8fafc",
            cursor: "pointer",
            font: "inherit",
            fontSize: 13,
          }}
        >
          Refuser
        </button>
        <button
          type="button"
          onClick={() => chooseConsent("granted")}
          style={{
            minWidth: 96,
            padding: "8px 14px",
            border: "1px solid #5eead4",
            borderRadius: 4,
            background: "#14b8a6",
            color: "#042f2e",
            cursor: "pointer",
            font: "inherit",
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          Accepter
        </button>
      </div>
    </aside>
  );
}
