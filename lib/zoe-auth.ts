import { timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

export const ZOE_COOKIE_NAME = "sp_zoe_access";

function tokensMatch(candidate: string | undefined, expected: string | undefined) {
  if (!candidate || !expected) return false;

  const candidateBuffer = Buffer.from(candidate);
  const expectedBuffer = Buffer.from(expected);
  return candidateBuffer.length === expectedBuffer.length && timingSafeEqual(candidateBuffer, expectedBuffer);
}

export function isValidZoeToken(token: string | undefined) {
  return tokensMatch(token, process.env.ZOE_DASHBOARD_ACCESS_TOKEN);
}

export function hasValidZoeCookie(request: NextRequest) {
  return isValidZoeToken(request.cookies.get(ZOE_COOKIE_NAME)?.value);
}

export const zoeCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "none" as const,
  path: "/",
  maxAge: 8 * 60 * 60,
};