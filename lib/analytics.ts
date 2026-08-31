export type AnalyticsEventType =
  | "page_view"
  | "ava_open"
  | "ava_message_started"
  | "ava_message_sent"
  | "cta_click"
  | "blog_view"
  | "contact_click";

export type AnalyticsEvent = {
  eventId: string;
  eventType: AnalyticsEventType;
  sessionId: string;
  visitorId: string;
  eventDate: string;
  page: string;
  pageTitle: string;
  referrer: string;
  source: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  cta: string;
  deviceType: string;
  landingPage: string;
  [key: string]: string;
};

function safeRandomId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}_${crypto.randomUUID()}`;
  }

  return `${prefix}_${Math.random().toString(36).slice(2)}_${Date.now().toString(36)}`;
}

function readOrCreateStorage(key: string, prefix: string) {
  const existing = typeof window === "undefined" ? null : window.localStorage.getItem(key);

  if (existing) {
    return existing;
  }

  const newValue = safeRandomId(prefix);

  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, newValue);
  }

  return newValue;
}

function getSessionId() {
  if (typeof window === "undefined") {
    return "server-session";
  }

  const existing = window.sessionStorage.getItem("analytics_session_id");

  if (existing) {
    return existing;
  }

  const newValue = safeRandomId("session");
  window.sessionStorage.setItem("analytics_session_id", newValue);
  return newValue;
}

function getVisitorId() {
  return readOrCreateStorage("analytics_visitor_id", "visitor");
}

function getDeviceType() {
  if (typeof window === "undefined") {
    return "unknown";
  }

  const width = window.innerWidth;

  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

function getSourceFromReferrer() {
  if (typeof document === "undefined") {
    return "direct";
  }

  if (!document.referrer) {
    return "direct";
  }

  try {
    const referrer = new URL(document.referrer);
    return referrer.hostname || "direct";
  } catch {
    return "direct";
  }
}

function getLandingPage() {
  if (typeof document === "undefined") {
    return "/";
  }

  const landing = window.sessionStorage.getItem("analytics_landing_page");

  if (landing) {
    return landing;
  }

  const value = window.location.pathname || "/";
  window.sessionStorage.setItem("analytics_landing_page", value);
  return value;
}

function getUtmValues() {
  if (typeof window === "undefined") {
    return { utmSource: "", utmMedium: "", utmCampaign: "", utmContent: "" };
  }

  const search = new URLSearchParams(window.location.search);

  return {
    utmSource: search.get("utm_source") || "",
    utmMedium: search.get("utm_medium") || "",
    utmCampaign: search.get("utm_campaign") || "",
    utmContent: search.get("utm_content") || "",
  };
}

function shouldSkipDuplicatePageView() {
  if (typeof window === "undefined") {
    return false;
  }

  const currentKey = `${window.location.pathname}${window.location.search}`;
  const lastPage = window.sessionStorage.getItem("analytics_last_page_view");

  if (lastPage === currentKey) {
    return true;
  }

  window.sessionStorage.setItem("analytics_last_page_view", currentKey);
  return false;
}

function shouldSkipDuplicateAvaStarted() {
  if (typeof window === "undefined") {
    return false;
  }

  const key = "analytics_ava_message_started";
  if (window.sessionStorage.getItem(key) === "1") {
    return true;
  }

  window.sessionStorage.setItem(key, "1");
  return false;
}

export function buildAnalyticsEvent(eventType: AnalyticsEventType, extra: Record<string, string> = {}): AnalyticsEvent {
  const sessionId = getSessionId();
  const visitorId = getVisitorId();
  const { utmSource, utmMedium, utmCampaign, utmContent } = getUtmValues();

  const payload: AnalyticsEvent = {
    eventId: safeRandomId("evt"),
    eventType,
    sessionId,
    visitorId,
    eventDate: new Date().toISOString(),
    page: typeof window !== "undefined" ? window.location.pathname : "/",
    pageTitle: typeof document !== "undefined" ? document.title : "",
    referrer: typeof document !== "undefined" ? document.referrer : "",
    source: getSourceFromReferrer(),
    utmSource,
    utmMedium,
    utmCampaign,
    utmContent,
    cta: extra.cta || "",
    deviceType: getDeviceType(),
    landingPage: getLandingPage(),
  };

  return { ...payload, ...extra };
}

export function trackEvent(eventType: AnalyticsEventType, extra: Record<string, string> = {}) {
  if (typeof window === "undefined") {
    return null;
  }

  if (eventType === "page_view" && shouldSkipDuplicatePageView()) {
    return null;
  }

  if (eventType === "ava_message_started" && shouldSkipDuplicateAvaStarted()) {
    return null;
  }

  const payload = buildAnalyticsEvent(eventType, extra);

  const queueKey = "analytics_queue";
  const previous = window.sessionStorage.getItem(queueKey);
  const queue = previous ? JSON.parse(previous) : [];
  queue.push(payload);

  if (queue.length > 50) {
    queue.shift();
  }

  window.sessionStorage.setItem(queueKey, JSON.stringify(queue));

  window.dispatchEvent(new CustomEvent("analytics:track", { detail: payload }));

  return payload;
}

export function listenForAvaBridge() {
  if (typeof window === "undefined") {
    return;
  }

  const allowedOrigin = window.location.origin;

  const handler = (event: MessageEvent) => {
    if (event.origin !== allowedOrigin) {
      return;
    }

    const data = event.data;

    if (!data || typeof data !== "object") {
      return;
    }

    if (data.type === "ava_message_started") {
      trackEvent("ava_message_started", {
        cta: "ava_message_started",
      });
    }

    if (data.type === "ava_message_sent") {
      trackEvent("ava_message_sent", {
        cta: "ava_message_sent",
      });
    }
  };

  window.addEventListener("message", handler);
}
