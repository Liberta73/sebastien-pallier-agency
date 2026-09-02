import { NextRequest, NextResponse } from "next/server";
import { isValidZoeToken, ZOE_COOKIE_NAME, zoeCookieOptions } from "@/lib/zoe-auth";

export async function GET(request: NextRequest) {
  const accessToken = request.nextUrl.searchParams.get("access") ?? undefined;
  if (!isValidZoeToken(accessToken)) {
    return NextResponse.redirect(new URL("/zoe", request.url));
  }

  const response = NextResponse.redirect(new URL("/zoe", request.url));
  response.cookies.set(ZOE_COOKIE_NAME, accessToken!, zoeCookieOptions);
  return response;
}