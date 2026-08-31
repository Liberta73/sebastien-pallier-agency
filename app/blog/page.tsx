import type { Metadata } from "next";
import Link from "next/link";
import AvaCta from "@/components/AvaCta";
import AvaWidget from "@/components/AvaWidget";

const posts = [
  {
    title: "Comment lancer un MVP NoCode sans perdre 3 mois en cadrage",
    excerpt:
      "Une méthode simple pour passer d'une idée floue à un premier produit testable, sans empiler les outils inutilement.",
    category: "Produit",
    date: "Juillet 2026",
    readTime: "4 min",
  },
  {
    title: "Les 5 automatisations IA qui font gagner du temps aux PME",
    excerpt:
      "Qualification, support, synthèse, relances et reporting: les cas d'usage concrets qui apportent vite de la valeur.",
    category: "Automatisation",
    date: "Juillet 2026",
    readTime: "5 min",
  },
  {
    title: "NoCode, IA, sur-mesure: comment choisir la bonne approche",
    excerpt:
      "Quand faut-il aller vite avec du NoCode, quand faut-il ajouter de l'IA, et quand faut-il structurer davantage.",
    category: "Stratégie",
    date: "Juillet 2026",
    readTime: "6 min",
  },
];

export const metadata: Metadata = {
  title: "Blog | Sebastien Pallier",
  description:
    "Articles sur le NoCode, l'IA, l'automatisation et la conception d'applications utiles pour les PME.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#050816] py-20 text-slate-100 md:py-24">
      <div className="section-frame">
        <div className="content-align text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Blog</p>
          <h1 className="mt-5 text-5xl font-black leading-tight text-white md:text-6xl lg:text-7xl">
            Articles sur le NoCode, l'IA et l'automatisation
          </h1>
          <p
            className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg"
            style={{ marginInline: "auto" }}
          >
            Une base de contenu pensée pour expliquer les cas d'usage, clarifier les choix techniques et montrer ce qui crée vraiment de la valeur.
          </p>
        </div>

        <div className="content-align mt-16 grid gap-4">
          {posts.map((post) => (
            <article key={post.title} className="w-full rounded-[1.75rem] border border-white/10 bg-white/5 p-7 text-center shadow-sm transition hover:-translate-y-0.5 hover:bg-white/8 hover:shadow-lg">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-cyan-300">
                <span>{post.category}</span>
                <span className="h-1 w-1 rounded-full bg-cyan-300" />
                <span>{post.date}</span>
              </div>
              <h2 className="mt-5 text-2xl font-semibold leading-tight text-white">{post.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">{post.excerpt}</p>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{post.readTime}</p>
            </article>
          ))}
        </div>

        <div className="content-align mt-16 rounded-[1.75rem] border border-cyan-300/15 bg-cyan-300/10 p-8 text-center md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">Prochaine étape</p>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">Besoin d'un article plus ciblé sur ton activité ?</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 md:text-base" style={{ marginInline: "auto" }}>
            Je peux aussi produire du contenu centré sur vos outils, vos opérations ou vos cas d'usage métier pour renforcer le référencement et la crédibilité de l'offre.
          </p>
          <AvaCta
            label="Discuter du contenu"
            className="mt-8 inline-flex rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          />
        </div>
      </div>
      <AvaWidget />
    </main>
  );
}