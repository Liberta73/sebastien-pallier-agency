"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Pourquoi", href: "#pourquoi" },
  { label: "Réalisations", href: "#realisations" },
  { label: "Blog", href: "/blog" },
];

export default function MobileNavMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        aria-label="Ouvrir le menu de navigation"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-slate-100 transition hover:bg-white/10"
      >
        <span className="flex flex-col gap-1.5">
          <span className="block h-0.5 w-5 rounded-full bg-current" />
          <span className="block h-0.5 w-5 rounded-full bg-current" />
          <span className="block h-0.5 w-5 rounded-full bg-current" />
        </span>
      </button>

      {open && (
        <nav className="absolute right-0 top-full z-50 mt-2 min-w-[200px] rounded-xl border border-white/10 bg-[#050816]/95 p-2 shadow-2xl backdrop-blur-xl">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
