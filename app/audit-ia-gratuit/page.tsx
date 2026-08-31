import Link from "next/link";
import AvaWidget from "@/components/AvaWidget";

export default function AuditIaGratuitPage() {
  return (
    <main className="min-h-screen bg-[#050816] text-slate-100">
      <section className="relative grid min-h-screen place-items-center overflow-hidden px-6 py-10 md:px-10 lg:px-16">
        <div aria-hidden="true" className="pointer-events-none absolute left-[-8rem] top-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute right-[-10rem] top-24 h-96 w-96 rounded-full bg-violet-500/12 blur-3xl" />

        <div className="z-10 w-full max-w-4xl">
          <div className="mb-14 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <div className="rounded-[2.25rem] border border-white/15 bg-white/5 px-6 py-10 shadow-[0_40px_120px_-70px_rgba(34,211,238,0.6)] md:px-12 md:py-14 lg:px-16 lg:py-16">
            <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Audit IA gratuit</p>
              <h1 className="mt-5 w-full text-3xl font-extrabold leading-tight text-white md:text-5xl">
                Identifiez vos gains rapides en automatisation
              </h1>

              <p className="mt-8 w-full text-lg leading-9 text-slate-200 md:text-2xl md:leading-10">
                En 30 minutes nous identifions :
              </p>

              <div className="mt-10 grid w-full gap-4 text-center text-lg text-slate-100 md:text-2xl">
                <p className="w-full rounded-2xl border border-white/15 bg-white/8 px-5 py-4">✅ les tâches à automatiser</p>
                <p className="w-full rounded-2xl border border-white/15 bg-white/8 px-5 py-4">✅ le temps que vous pouvez économiser</p>
                <p className="w-full rounded-2xl border border-white/15 bg-white/8 px-5 py-4">✅ les outils adaptés</p>
                <p className="w-full rounded-2xl border border-white/15 bg-white/8 px-5 py-4">✅ un plan d'action concret</p>
              </div>

              <div className="mt-8">
                <Link href="/" className="text-base text-cyan-300 transition hover:text-cyan-200">
                  Retour a l'accueil
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AvaWidget />
    </main>
  );
}
