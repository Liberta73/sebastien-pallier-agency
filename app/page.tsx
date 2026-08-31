import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AnimatedStats } from "@/components/animated-stats";
import AvaWidget from "@/components/AvaWidget";
import AvaCta from "@/components/AvaCta";
import MobileNavMenu from "@/components/MobileNavMenu";

const services = [
  {
    title: "Agents IA",
    description: "Des assistants IA capables de qualifier, informer, orienter et déclencher des actions dans vos processus.",
  },
  {
    title: "Automatisation",
    description: "Automatisez les tâches répétitives, les relances, les notifications et la circulation de vos données.",
  },
  {
    title: "Applications métier",
    description: "Des outils internes sur mesure pour centraliser vos informations et piloter votre activité.",
  },
];

const reasons = [
  "Approche orientée résultats métier",
  "Solutions adaptées à vos outils et à votre rythme",
  "Cadrage clair de la mission à la mise en œuvre",
  "Accompagnement à la livraison et à l'usage",
];

const projects = [
  {
    name: "Pilotage interne",
    category: "Pilotage interne",
    text: "Centralisation des informations, suivi opérationnel et automatisation des processus internes.",
    stack: ["Tableau de bord", "Automatisation", "Suivi"],
  },
  {
    name: "Qualification & suivi des prospects",
    category: "Acquisition",
    text: "Qualification, scoring, relances et synchronisation des informations commerciales.",
    stack: ["IA", "CRM", "Relances"],
  },
  {
    name: "Espace et suivi client",
    category: "Expérience client",
    text: "Centralisation des documents, demandes, informations et suivi des livrables.",
    stack: ["Portail", "Documents", "Suivi"],
  },
];

const processSteps = [
  {
    title: "Audit",
    text: "Comprendre vos processus et identifier les automatisations utiles.",
  },
  {
    title: "Proposition",
    text: "Définir une solution adaptée à votre activité et à vos outils.",
  },
  {
    title: "Mise en place",
    text: "Construire, connecter et tester les automatisations.",
  },
  {
    title: "Formation",
    text: "Vous transmettre une solution exploitable et compréhensible.",
  },
];

const useCases = [
  {
    title: "Agence immobilière",
    description: "Qualification des demandes, suivi des prospects et prise de rendez-vous.",
  },
  {
    title: "Garage automobile",
    description: "Qualification des demandes et organisation automatique des rendez-vous.",
  },
  {
    title: "Cabinet comptable",
    description: "Collecte, classement et suivi des documents et demandes clients.",
  },
  {
    title: "Artisan / bâtiment",
    description: "Qualification des demandes, collecte des informations et préparation du suivi d'intervention.",
  },
];

const faq = [
  {
    q: "Travaillez-vous avec des PME et des entreprises de taille intermédiaire ?",
    a: "Oui. J'accompagne les PME qui souhaitent automatiser des tâches répétitives, améliorer leur qualification commerciale et mieux piloter leurs process.",
  },
  {
    q: "Pouvez-vous connecter nos outils existants ?",
    a: "Oui. Je peux relier vos outils, CRM, ERP, formulaires et bases de données pour fluidifier la circulation des informations.",
  },
  {
    q: "Quel est le niveau d'accompagnement ?",
    a: "L'accompagnement dépend du besoin. Il peut aller du cadrage et de la conception à la mise en place, la configuration et la transmission de la solution.",
  },
  {
    q: "Combien coûte une automatisation ?",
    a: "Le coût dépend du périmètre, des outils à connecter et du niveau d'automatisation souhaité. Un premier cadrage permet d'identifier la bonne solution.",
  },
  {
    q: "Quel est le meilleur point de départ ?",
    a: "Le bon point de départ est souvent un audit rapide des process et des tâches répétitives pour identifier les gains les plus faciles à obtenir.",
  },
];

const blogHighlights = [
  {
    category: "Produit",
    title: "Lancer un MVP NoCode sans perdre du temps en cadrage",
    text: "Une méthode simple pour sortir une première version utile, testable et bien structurée.",
  },
  {
    category: "Automatisation",
    title: "Les automatisations IA les plus rentables pour une PME",
    text: "Les cas d'usage qui réduisent vraiment la charge opérationnelle et les tâches répétitives.",
  },
  {
    category: "Stratégie",
    title: "Quand choisir le NoCode, l'IA ou du sur-mesure",
    text: "Un cadre de décision clair pour éviter les mauvais arbitrages techniques trop tôt.",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050816] text-slate-100">
      <div className="grain-overlay pointer-events-none absolute inset-0" />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050816]/88 backdrop-blur-xl">
        <div className="page-frame flex items-center justify-between gap-8 py-5 md:py-6">
          <div className="flex items-center gap-4 pr-2">
            <Image
              src="/sp-logo.ico"
              alt="Logo Sebastien Pallier"
              width={44}
              height={44}
              sizes="44px"
              className="h-11 w-11 shrink-0 object-contain"
            />
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-[0.14em] text-white">SEBASTIEN PALLIER</p>
              <p className="mt-1 text-xs text-slate-300">Automatisation · IA · Savoie</p>
            </div>
          </div>
          <nav className="hidden items-center gap-8 text-sm md:flex">
            <a href="#services" className="text-slate-300 transition hover:text-white">Services</a>
            <a href="#pourquoi" className="text-slate-300 transition hover:text-white">Pourquoi</a>
            <a href="#realisations" className="text-slate-300 transition hover:text-white">Réalisations</a>
            <Link href="/blog" className="text-slate-300 transition hover:text-white">Blog</Link>
          </nav>

          <MobileNavMenu />
        </div>
      </header>

      <section className="page-frame relative grid gap-14 overflow-hidden pb-28 pt-24 md:grid-cols-[1.02fr_0.98fr] md:items-center md:gap-20 md:pb-32 md:pt-28 lg:gap-24">
        <div aria-hidden="true" className="pointer-events-none absolute -left-28 top-10 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute right-[-6rem] top-1/4 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="space-y-10">
          <p className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
            IA · Automatisation · PME
          </p>
          <h1 className="text-[2.3rem] font-semibold leading-[1] tracking-[-0.02em] text-white sm:text-[2.8rem] md:text-[3.2rem] lg:text-[3.6rem]">
            Automatisez les opérations de votre PME avec l'IA.
          </h1>
          <p className="max-w-xl text-base leading-8 text-slate-300 md:text-lg">
            De la qualification d'un prospect jusqu'au suivi du projet, je conçois des systèmes IA et des automatisations adaptés à votre activité.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <AvaCta
              label="Construire mon projet avec AVA"
              className="inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-6 text-sm font-semibold shadow-[0_16px_36px_-20px_rgba(76,29,149,0.8)] transition hover:brightness-110"
            />
          </div>

          <div className="grid max-w-2xl grid-cols-2 gap-3 text-xs text-slate-300 md:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">Solutions sur mesure</div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">Automatisation métier</div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">Accompagnement</div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">Basé en Savoie</div>
          </div>
        </div>

        <div className="float-gentle relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/15 bg-[#0a0f2a] shadow-[0_40px_120px_-60px_rgba(124,58,237,0.45)]">
          <Image
            src="/hero-photo.jpg"
            alt="Panorama de Savoie"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 42vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/62 via-slate-900/30 to-transparent" />

          <div className="absolute inset-x-4 bottom-1/2 translate-y-1/2 rounded-2xl border border-white/25 bg-slate-950/72 px-5 py-4 text-white shadow-2xl backdrop-blur-sm md:inset-x-6 md:px-6 md:py-5">
            <Image
              src="/sp-logo.ico"
              alt="Logo Sebastien Pallier"
              width={64}
              height={64}
              sizes="64px"
              className="h-16 w-16 object-contain"
            />
            <p className="reveal-up mt-1 text-lg font-semibold tracking-wide md:text-xl">SEBASTIEN PALLIER</p>
            <p className="reveal-up reveal-delay-1 mt-0.5 text-xs font-medium uppercase tracking-[0.2em] text-slate-200 md:text-sm">
              Automatisation IA pour PME
            </p>
            <p className="reveal-up reveal-delay-2 mt-1 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300 md:text-sm">
              EN SAVOIE
            </p>
          </div>
        </div>
      </section>

      <div className="h-16 md:h-24" aria-hidden="true" />
      <section id="services" className="section-frame pb-28 pt-20 md:pb-32 md:pt-24">
        <div className="mb-14 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="content-align">
          <div className="reveal-up reveal-delay-1 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Services</p>
            <h2 className="mt-5 text-4xl font-extrabold text-transparent bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text md:text-5xl lg:text-6xl">Ce que je construis pour vous</h2>
          </div>

          <div className="mx-auto mt-20 grid gap-7 md:grid-cols-3">
            {services.map((item, idx) => (
              <article
                key={item.title}
                className={cn(
                  "reveal-up rounded-2xl border border-white/10 bg-white/5 p-7 shadow-sm transition hover:-translate-y-0.5 hover:bg-white/8 hover:shadow-lg",
                  idx === 1 && "reveal-delay-1",
                  idx === 2 && "reveal-delay-2"
                )}
              >
                <h3 className="text-center text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-center text-sm leading-7 text-slate-300">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <div className="h-16 md:h-24" aria-hidden="true" />
      <section className="section-frame pb-20 pt-10 md:pb-24 md:pt-12">
        <div className="content-align">
          <div className="reveal-up flex flex-col items-center rounded-[1.75rem] border border-white/15 bg-white/5 p-7 md:p-10">
            <h2 className="max-w-4xl text-center text-3xl font-extrabold leading-tight text-white md:text-4xl lg:text-5xl">
              Votre entreprise perd-elle du temps à cause de :
            </h2>
            <ul className="mt-8 grid w-full max-w-3xl list-none place-items-center gap-3 p-0 text-center text-base text-slate-200 md:text-lg">
              <li className="w-full max-w-3xl rounded-xl border border-white/10 bg-white/5 px-5 py-3">recopier des données ?</li>
              <li className="w-full max-w-3xl rounded-xl border border-white/10 bg-white/5 px-5 py-3">répondre toujours aux mêmes e-mails ?</li>
              <li className="w-full max-w-3xl rounded-xl border border-white/10 bg-white/5 px-5 py-3">relancer les devis ?</li>
              <li className="w-full max-w-3xl rounded-xl border border-white/10 bg-white/5 px-5 py-3">prendre les rendez-vous ?</li>
              <li className="w-full max-w-3xl rounded-xl border border-white/10 bg-white/5 px-5 py-3">rechercher les informations ?</li>
            </ul>
            <p className="mt-8 text-center text-xl font-semibold text-cyan-300 md:text-2xl">
              Nous automatisons tout cela.
            </p>
          </div>
        </div>
      </section>

      <div className="h-24 md:h-32" aria-hidden="true" />
      <AnimatedStats />

      <div className="h-24 md:h-32" aria-hidden="true" />
      <section id="pourquoi" className="bg-slate-950 py-24 text-slate-100 md:py-28">
        <div className="section-frame">
          <div className="reveal-up flex justify-center">
            <div className="max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Pourquoi</p>
              <h2 className="mt-5 text-4xl font-extrabold text-transparent bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text md:text-5xl lg:text-6xl">
                Pourquoi travailler ensemble
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">
                Une approche claire, un delivery rapide et une exécution soignée pour passer d’une idée floue à une solution utile et durable.
              </p>
            </div>
          </div>

          <div className="content-align mt-16 grid gap-4 md:grid-cols-2">
            {reasons.map((item, idx) => (
              <div
                key={item}
                className={cn(
                  "reveal-up flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-4 text-center text-sm",
                  idx === 1 && "reveal-delay-1",
                  idx === 2 && "reveal-delay-2",
                  idx === 3 && "reveal-delay-3"
                )}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-24 md:h-32" aria-hidden="true" />
      <section id="realisations" className="section-frame pb-28 pt-20 md:pb-32 md:pt-24">
        <div className="mb-14 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Exemples de solutions</p>
          <h2 className="mt-5 text-5xl font-extrabold text-cyan-300 md:text-6xl lg:text-7xl">Pilotage, acquisition et expérience client</h2>
          <p className="mt-5 w-full max-w-3xl text-center text-base leading-8 text-slate-300 md:text-lg" style={{ marginInline: "auto" }}>
            Des systèmes qui peuvent être adaptés aux processus de votre entreprise.
          </p>
        </div>
        <div className="content-align mt-20 grid gap-7 md:grid-cols-3">
          {projects.map((project, idx) => (
            <article
              key={project.name}
              className={cn(
                "reveal-up rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm transition hover:-translate-y-0.5 hover:bg-white/8 hover:shadow-lg",
                idx === 1 && "reveal-delay-1",
                idx === 2 && "reveal-delay-2"
              )}
            >
              <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">{project.category}</p>
              <h3 className="mt-3 text-center text-2xl font-semibold text-white">{project.name}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-200">{project.text}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-frame pb-20 pt-4 md:pb-24 md:pt-8">
        <div className="content-align">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Cas d’usage</p>
            <h2 className="mt-4 text-3xl font-extrabold text-transparent bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text md:text-4xl lg:text-5xl">
              Des usages concrets selon votre activité
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {useCases.map((item, idx) => (
              <article
                key={item.title}
                className={cn(
                  "reveal-up rounded-2xl border border-white/10 bg-white/5 p-6 text-center shadow-sm transition hover:-translate-y-0.5 hover:bg-white/8 hover:shadow-lg",
                  idx === 1 && "reveal-delay-1",
                  idx === 2 && "reveal-delay-2",
                  idx === 3 && "reveal-delay-3"
                )}
              >
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="h-24 md:h-32" aria-hidden="true" />
      <section className="section-frame py-24 md:py-28">
        <div className="content-align">
          <div className="mx-auto mb-10 h-px w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Processus</p>
            <h2 className="mt-5 text-4xl font-extrabold text-transparent bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text md:text-5xl lg:text-6xl">Une méthode claire en quatre étapes</h2>
          </div>
          <div className="mt-16 grid gap-5 md:grid-cols-4">
            {processSteps.map((item, idx) => (
              <article
                key={item.title}
                className={cn(
                  "reveal-up rounded-2xl border border-white/10 bg-white/5 p-6 text-center",
                  idx === 1 && "reveal-delay-1",
                  idx === 2 && "reveal-delay-2",
                  idx === 3 && "reveal-delay-3"
                )}
              >
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="h-24 md:h-32" aria-hidden="true" />
      <section className="section-frame pb-28 pt-20 md:pb-32 md:pt-24">
        <div className="mb-14 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="content-align">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">FAQ</p>
            <h2 className="mt-5 text-4xl font-extrabold text-transparent bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text md:text-5xl lg:text-6xl">
              Questions fréquentes
            </h2>
          </div>
          <div className="mx-auto mt-16 grid gap-4">
            {faq.map((item, idx) => (
              <details
                key={item.q}
                className={cn(
                  "reveal-up rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-left shadow-sm open:bg-white/7",
                  idx === 1 && "reveal-delay-1",
                  idx === 2 && "reveal-delay-2"
                )}
              >
                <summary className="cursor-pointer list-none text-base font-semibold text-white">
                  {item.q}
                </summary>
                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-300">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div className="h-16 md:h-24" aria-hidden="true" />
      <section className="section-frame pb-28 pt-20 md:pb-32 md:pt-24">
        <div className="mb-14 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="content-align">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Blog</p>
            <h2 className="mt-5 text-4xl font-extrabold text-transparent bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text md:text-5xl lg:text-6xl">
              Derniers sujets publiés
            </h2>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {blogHighlights.map((item, idx) => (
              <article
                key={item.title}
                className={cn(
                  "reveal-up rounded-2xl border border-white/10 bg-white/5 p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-white/8 hover:shadow-lg",
                  idx === 1 && "reveal-delay-1",
                  idx === 2 && "reveal-delay-2"
                )}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">{item.category}</p>
                <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{item.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/blog"
              className="inline-flex rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Voir le blog
            </Link>
          </div>
        </div>
      </section>

      <div className="h-16 md:h-24" aria-hidden="true" />
      <section className="pb-28 pt-20 text-white md:pb-32 md:pt-24">
        <div className="section-frame">
          <div className="content-align mb-14 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <div className="content-align group flex flex-col items-center rounded-[1.75rem] border border-cyan-300/30 bg-gradient-to-br from-cyan-500/20 via-cyan-400/10 to-violet-500/20 p-8 text-center shadow-[0_30px_90px_-55px_rgba(34,211,238,0.75)] transition hover:-translate-y-0.5 hover:border-cyan-200/50 hover:bg-cyan-400/15 md:p-14">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">PROCHAINE ÉTAPE</p>
            <div className="mx-auto mt-5 flex w-full max-w-3xl flex-col items-center text-center">
              <h2 className="w-full text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">Parlez de votre projet à AVA</h2>
              <p className="mt-5 w-full max-w-2xl text-center text-base leading-8 text-slate-200 md:text-lg">
                Décrivez votre besoin en quelques minutes. AVA vous aide à structurer votre projet et à identifier les automatisations adaptées à votre activité.
              </p>
            </div>
            <AvaCta
              label="Construire mon projet avec AVA"
              className="mt-8 inline-flex rounded-full border border-white/30 px-6 py-2 text-sm font-semibold text-white transition group-hover:bg-white/10"
            />
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#050816] py-10">
        <div className="section-frame">
          <div className="content-align grid gap-8 text-sm text-slate-400 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
            <div>
              <p className="text-base font-semibold text-white">Sebastien Pallier</p>
              <p className="mt-3 max-w-sm leading-7">
                Automatisation, agents IA et outils métier pour PME. Des systèmes conçus pour réduire les tâches répétitives et mieux piloter votre activité.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Navigation</p>
              <div className="mt-4 grid gap-2">
                <a href="#services" className="transition hover:text-white">Services</a>
                <a href="#realisations" className="transition hover:text-white">Réalisations</a>
                <Link href="/blog" className="transition hover:text-white">Blog</Link>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Coordonnées</p>
              <div className="mt-4 grid gap-2">
                <a href="mailto:sebastien@sebastienpallier.com" className="transition hover:text-white">sebastien@sebastienpallier.com</a>
                <a href="tel:0625320810" className="transition hover:text-white">06 25 32 08 10</a>
                <p>Automatisation · IA · Savoie</p>
              </div>
            </div>
          </div>
          <div className="content-align mt-8 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-sm text-slate-500 md:flex-row">
            <p>© {new Date().getFullYear()} Sebastien Pallier. Tous droits réservés.</p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/mentions-legales" className="transition hover:text-white">Mentions légales</Link>
              <Link href="/politique-confidentialite" className="transition hover:text-white">Politique de confidentialité</Link>
            </div>
          </div>
        </div>
      </footer>
      <AvaWidget />
    </main>
  );
}
