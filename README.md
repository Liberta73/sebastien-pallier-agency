# Sebastien Pallier Agency

Landing page Next.js pour l'offre NoCode, IA et automatisation de Sebastien Pallier.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui

## Scripts

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run type-check`

## Deploiement Vercel

1. Importer le repository dans Vercel.
2. Laisser `npm install` comme commande d'installation.
3. Laisser `npm run build` comme commande de build.
4. Déployer.

## Calendly

- Renseigner `NEXT_PUBLIC_CALENDLY_URL` dans les variables d'environnement Vercel pour activer le vrai lien de prise de rendez-vous.
- Sans cette variable, le bouton de rendez-vous retombe automatiquement sur l'email.

## Notes

- La page d'accueil est dans `app/page.tsx`.
- Le blog est disponible via `app/blog/page.tsx`.
- Les métadonnées SEO globales sont dans `app/layout.tsx`.