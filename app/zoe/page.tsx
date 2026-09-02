import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { isValidZoeToken, ZOE_COOKIE_NAME } from "@/lib/zoe-auth";
import ZoeClient from "./zoe-client";

export const metadata: Metadata = {
  title: "Zoé — Direction",
  robots: { index: false, follow: false },
};

type ZoePageProps = {
  searchParams: Promise<{ access?: string }>;
};

export default async function ZoePage({ searchParams }: ZoePageProps) {
  const cookieStore = await cookies();
  const accessToken = (await searchParams).access;
  const hasAccess = isValidZoeToken(cookieStore.get(ZOE_COOKIE_NAME)?.value);

  if (!hasAccess && isValidZoeToken(accessToken)) {
    redirect(`/api/zoe/access?access=${encodeURIComponent(accessToken!)}`);
  }

  if (!hasAccess) {
    return (
      <main className="zoe-denied" aria-labelledby="zoe-denied-title">
        <div>
          <span className="zoe-kicker">SP AI OS</span>
          <h1 id="zoe-denied-title">Accès non autorisé</h1>
        </div>
      </main>
    );
  }

  return <ZoeClient />;
}