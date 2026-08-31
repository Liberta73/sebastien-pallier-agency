import "../styles/globals.css";
import React from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  metadataBase: new URL("https://sebastienpallier.com"),
  title: "Sebastien Pallier | NoCode, IA et applications sur mesure",
  description: "Applications NoCode, automatisations IA et accompagnement produit en Savoie. Conception rapide, delivery propre et solutions digitales sur mesure.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "nocode",
    "intelligence artificielle",
    "automatisation",
    "developpement application",
    "savoie",
    "sebastien pallier",
  ],
  openGraph: {
    title: "Sebastien Pallier | NoCode, IA et applications sur mesure",
    description: "Applications NoCode, automatisations IA et accompagnement produit en Savoie.",
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Sebastien Pallier",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sebastien Pallier | NoCode, IA et applications sur mesure",
    description: "Applications NoCode, automatisations IA et accompagnement produit en Savoie.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/sp-logo.ico",
    shortcut: "/sp-logo.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={cn("font-sans", geist.variable)}>
      <body className="overflow-x-hidden bg-[#050816] text-slate-100">
        <div className="min-h-screen bg-[#050816] text-slate-100">
          {children}
        </div>
      </body>
    </html>
  );
}
