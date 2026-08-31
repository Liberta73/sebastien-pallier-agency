"use client";

import { FormEvent, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  email: string;
  company: string;
  project: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  company: "",
  project: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(`Demande de contact - ${form.name || "Nouveau projet"}`);
    const body = encodeURIComponent(
      [
        `Nom: ${form.name}`,
        `Email: ${form.email}`,
        `Entreprise: ${form.company}`,
        "",
        "Projet:",
        form.project,
      ].join("\n")
    );

    window.location.href = `mailto:sebastien@sebastienpallier.com?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 md:p-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Formulaire</p>
        <h3 className="mt-4 text-2xl font-semibold text-white">Parlez-moi de votre projet</h3>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          Le message s&apos;ouvrira dans votre client email avec les informations déjà remplies.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm text-slate-300">Nom</span>
          <input
            required
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-slate-300">Email</span>
          <input
            type="email"
            required
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60"
          />
        </label>

        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm text-slate-300">Entreprise</span>
          <input
            value={form.company}
            onChange={(event) => setForm((current) => ({ ...current, company: event.target.value }))}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60"
          />
        </label>

        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm text-slate-300">Projet</span>
          <textarea
            required
            rows={6}
            value={form.project}
            onChange={(event) => setForm((current) => ({ ...current, project: event.target.value }))}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Réponse sous 24h</p>
        <button
          type="submit"
          className={cn(buttonVariants({ variant: "default", size: "lg" }), "rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-8 text-white hover:brightness-110")}
        >
          Envoyer la demande
        </button>
      </div>
    </form>
  );
}