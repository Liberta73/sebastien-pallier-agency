"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const GA_SCRIPT_ID = "google-analytics-gtag";
const CONSENT_STORAGE_KEY = "sp_analytics_consent";
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const [hasConsent, setHasConsent] = useState(false);
  const [isGaReady, setIsGaReady] = useState(false);
  const lastTrackedPathRef = useRef<string | null>(null);

  useEffect(() => {
    setHasConsent(window.localStorage.getItem("sp_analytics_consent") === "granted");
    function handleConsentChange(event: Event) {
      const consent = (event as CustomEvent<{ consent?: string }>).detail?.consent;
      if (consent === "granted") {
        lastTrackedPathRef.current = null;
        setIsGaReady(false);
        setHasConsent(true);
      }
      if (consent === "denied") {
        lastTrackedPathRef.current = null;
        setIsGaReady(false);
        setHasConsent(false);
      }
    }
    window.addEventListener("sp-analytics-consent-changed", handleConsentChange);
    return () => window.removeEventListener("sp-analytics-consent-changed", handleConsentChange);
  }, [pathname]);

  useEffect(() => {
    if (!isGaReady || !hasConsent || !GA_MEASUREMENT_ID || pathname === "/zoe" || pathname.startsWith("/zoe/") || typeof window.gtag !== "function" || lastTrackedPathRef.current === pathname) return;
    window.gtag("event", "page_view", {
      page_path: pathname,
    });
    lastTrackedPathRef.current = pathname;
  }, [hasConsent, isGaReady, pathname]);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || pathname === "/zoe" || pathname.startsWith("/zoe/")) return;

    function handleAvaOpen() {
      if (window.localStorage.getItem(CONSENT_STORAGE_KEY) !== "granted" || typeof window.gtag !== "function") return;
      window.gtag("event", "ava_open", {
        event_category: "engagement",
      });
    }

    window.addEventListener("ava:open", handleAvaOpen);
    return () => window.removeEventListener("ava:open", handleAvaOpen);
  }, [pathname]);

  if (!GA_MEASUREMENT_ID || pathname === "/zoe" || pathname.startsWith("/zoe/")) {
    return null;
  }

  if (!hasConsent) {
    return null;
  }

  return (
    <>
      <Script
        id={GA_SCRIPT_ID}
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-config" strategy="afterInteractive" onReady={() => setIsGaReady(true)}>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true, send_page_view: false });
        `}
      </Script>
    </>
  );
}
