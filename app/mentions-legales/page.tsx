import Link from "next/link";

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <div className="section-frame py-20 md:py-28">
        <div className="content-align mx-auto max-w-4xl rounded-[1.75rem] border border-white/10 bg-white/5 p-8 md:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Mentions légales</p>
          <h1 className="mt-5 text-4xl font-extrabold text-white md:text-5xl">Mentions légales</h1>

          <div className="mt-8 space-y-8 text-sm leading-7 text-slate-300">
            <section>
              <h2 className="text-xl font-semibold text-white">1. Éditeur du site</h2>
              <p className="mt-3">
                Le site sebastienpallier.com est édité par <strong className="text-white">[À COMPLÉTER]</strong>.
              </p>
              <p className="mt-2">
                Statut juridique : <strong className="text-white">[À COMPLÉTER]</strong><br />
                SIREN/SIRET : <strong className="text-white">[À COMPLÉTER]</strong><br />
                Adresse : <strong className="text-white">[À COMPLÉTER]</strong><br />
                Email : <strong className="text-white">sebastien@sebastienpallier.com</strong>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">2. Directeur de publication</h2>
              <p className="mt-3">
                Directeur de publication : <strong className="text-white">[À COMPLÉTER]</strong>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">3. Hébergement</h2>
              <p className="mt-3">
                Le site est hébergé par <strong className="text-white">[À COMPLÉTER]</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">4. Propriété intellectuelle</h2>
              <p className="mt-3">
                Tous les éléments du site (textes, visuels, logos, structure, code, contenus éditoriaux) sont protégés par le droit d’auteur et les droits de propriété intellectuelle. Toute reproduction, représentation, adaptation ou exploitation sans autorisation préalable est interdite.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">5. Responsabilité</h2>
              <p className="mt-3">
                L’éditeur met en œuvre les moyens nécessaires pour assurer l’exactitude des informations publiées. Toutefois, il ne peut être tenu pour responsable des erreurs, omissions ou indisponibilités dues à des causes indépendantes de sa volonté.
              </p>
            </section>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/" className="inline-flex rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
              Retour à l’accueil
            </Link>
            <Link href="/politique-confidentialite" className="inline-flex rounded-full border border-cyan-300/40 bg-cyan-400/10 px-5 py-2.5 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/15">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
