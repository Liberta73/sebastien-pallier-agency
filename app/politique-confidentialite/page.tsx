import Link from "next/link";

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <div className="section-frame py-20 md:py-28">
        <div className="content-align mx-auto max-w-4xl rounded-[1.75rem] border border-white/10 bg-white/5 p-8 md:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Politique de confidentialité</p>
          <h1 className="mt-5 text-4xl font-extrabold text-white md:text-5xl">Politique de confidentialité</h1>

          <div className="mt-8 space-y-8 text-sm leading-7 text-slate-300">
            <section>
              <h2 className="text-xl font-semibold text-white">1. Objet</h2>
              <p className="mt-3">
                Cette politique décrit les traitements de données personnelles réalisés dans le cadre du site sebastienpallier.com et des outils intégrés au site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">2. Données collectées via le formulaire de contact</h2>
              <p className="mt-3">
                Le formulaire de contact collecte les informations suivantes lorsque l’utilisateur soumet une demande : nom, email, entreprise, projet (description du besoin). Ces données sont utilisées uniquement pour traiter la demande de contact et répondre au prospect.
              </p>
              <p className="mt-3">
                Le formulaire ouvre ensuite un client email avec ces informations préremplies. Aucune donnée n’est stockée par le site dans une base de données distincte via ce formulaire.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">3. Données collectées via AVA</h2>
              <p className="mt-3">
                Lorsque l’utilisateur utilise AVA, le message saisi est envoyé au service n8n via le webhook configuré dans l’intégration AVA. Le site envoie également un identifiant de session (sessionId) afin de relier la conversation à une session de navigation.
              </p>
              <p className="mt-3">
                Les données envoyées à ce service peuvent inclure : le texte du message utilisateur, la sessionId de la conversation, ainsi que les éventuelles informations de contexte nécessaires au traitement de la demande.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">4. Données de navigation et analytics</h2>
              <p className="mt-3">
                Le site met en place un système de tracking front-end local pour les analyses de navigation. Ces données peuvent inclure : visitorId, sessionId, referrer, UTM (utm_source, utm_medium, utm_campaign, utm_content), page consultée, titre de la page, type d’appareil, page de départ, et autres informations de contexte de navigation.
              </p>
              <p className="mt-3">
                Ces informations sont stockées dans localStorage et sessionStorage du navigateur afin de conserver l’identité du visiteur et la session de navigation dans le front-end. Elles sont utilisées pour suivre les interactions et les événements d’analytics sur le site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">5. Durée de conservation</h2>
              <p className="mt-3">
                Les données saisies dans le formulaire et les informations de session/analytics sont conservées selon les besoins de traitement et d’analyse du site. Les éléments stockés dans le navigateur peuvent rester présents tant que l’utilisateur n’efface pas son historique de navigation ou les données du site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">6. Droits des utilisateurs</h2>
              <p className="mt-3">
                Conformément au cadre applicable, l’utilisateur peut demander l’accès, la rectification ou l’effacement des données qu’il a communiquées, ainsi que s’opposer à certains traitements. Pour toute demande, il peut contacter le responsable du site à l’adresse suivante : <strong className="text-white">sebastien@sebastienpallier.com</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">7. Informations à compléter</h2>
              <p className="mt-3">
                Les informations suivantes doivent être confirmées avant mise en production afin d’être pleinement conformes à l’exigence légale : raison sociale, statut juridique, SIREN/SIRET, directeur de publication, hébergeur, et éventuelles précisions sur les sous-traitants de traitement. Les éléments manquants sont indiqués ici par <strong className="text-white">[À COMPLÉTER]</strong> dans les mentions légales.
              </p>
            </section>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/" className="inline-flex rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
              Retour à l’accueil
            </Link>
            <Link href="/mentions-legales" className="inline-flex rounded-full border border-cyan-300/40 bg-cyan-400/10 px-5 py-2.5 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/15">
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
