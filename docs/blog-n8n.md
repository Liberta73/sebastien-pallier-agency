# Publication du blog via n8n — Format et workflow

Ce document décrit le contrat exact entre le workflow n8n et ce dépôt pour publier
un article sur https://sebastienpallier.com/blog.

## Principe

1. n8n prépare un article en Markdown.
2. Après validation humaine, n8n crée (ou met à jour) un fichier
   `content/blog/<slug>.md` via l'API GitHub, sur une branche dédiée,
   puis ouvre une pull request vers `main`.
3. La fusion de la PR sur `main` déclenche automatiquement le déploiement Vercel.
4. Le site lit les fichiers Markdown au build : aucune base de données,
   aucune API de publication, aucun secret côté site.

- **Dépôt** : `Liberta73/sebastien-pallier-agency` (https://github.com/Liberta73/sebastien-pallier-agency)
- **Branche de production** : `main`
- **Chemin cible** : `content/blog/<slug>.md`
- **Exemple commenté** : `content/blog/_template.md` (les fichiers commençant
  par `_` sont ignorés par le site)

## Chemin et nommage

```
content/blog/<slug>.md
```

- `<slug>` = identifiant unique de l'article, déduit du **nom du fichier**
  (pas du frontmatter).
- Format du slug : minuscules, chiffres, tirets uniquement
  (`^[a-z0-9]+(-[a-z0-9]+)*$`). Ex. : `automatiser-relances-pme`.
- **Anti-doublons** : le slug est la clé unique. Avant de créer un fichier,
  n8n doit vérifier via l'API GitHub que `content/blog/<slug>.md` n'existe pas
  (GET contents → 404 = disponible). Pour mettre à jour un article existant,
  n8n réutilise le même slug et fournit le `sha` du fichier à l'API GitHub.

## Format exact du fichier

Fichier Markdown avec frontmatter YAML délimité par `---` :

```markdown
---
title: "Titre complet de l'article"          # OBLIGATOIRE — chaîne non vide
excerpt: "Résumé en 1-2 phrases."            # OBLIGATOIRE — affiché sur la carte du blog
category: "Automatisation"                   # OBLIGATOIRE — ex. Produit | Automatisation | Stratégie
status: "draft"                              # OBLIGATOIRE — "draft" | "published"
author: "Sebastien Pallier"                  # OBLIGATOIRE
tags:                                        # optionnel — liste de chaînes (défaut : [])
  - ia
  - nocode
publishedAt: "2026-10-02"                    # ISO "YYYY-MM-DD" — OBLIGATOIRE si status=published, null sinon
updatedAt: "2026-10-05"                      # ISO "YYYY-MM-DD" ou null
image: "/blog/mon-visuel.webp"               # optionnel — chemin sous public/ ou null
sources:                                     # optionnel — liste d'URL (défaut : [])
  - "https://example.com/etude"
seo:                                         # optionnel mais recommandé
  title: "Titre SEO ≤ 60 caractères"         # défaut : title
  description: "Description SEO ≤ 160 caractères."  # défaut : excerpt
---

Corps de l'article en Markdown (GitHub Flavored Markdown).
```

## Règles de validation appliquées par le site

Un fichier **invalide est ignoré au build** (avertissement en console, pas de
page générée). Règles :

- `title`, `excerpt`, `category`, `author` : chaînes non vides obligatoires.
- `status` : toute valeur autre que `"published"` est traitée comme brouillon.
- `publishedAt` / `updatedAt` : format strict `YYYY-MM-DD`.
- Si `status: "published"` : `publishedAt` **et** un corps Markdown non vide
  sont obligatoires.
- Les **brouillons sont exclus** de la liste `/blog`, des pages `/blog/<slug>`
  (404) et du sitemap.
- Le **temps de lecture est calculé automatiquement** (~200 mots/min) :
  ne pas le fournir dans le frontmatter.
- Le **HTML brut est échappé** à l'affichage (anti-XSS) : rédiger en Markdown
  pur, sans balises HTML.
- L'URL canonique générée : `https://sebastienpallier.com/blog/<slug>`.

## Corps de l'article

- Markdown GFM : titres `##`/`###`, listes, tableaux, citations, liens, code.
- Ne pas utiliser de titre `#` (h1) dans le corps : le h1 est généré depuis
  `title`.
- Le contenu est rendu statiquement au build (SSG) : aucune donnée dynamique
  côté client.

## Workflow n8n recommandé

1. **Génération** : le LLM produit le frontmatter + le corps Markdown.
2. **Validation humaine** : relecture hors du site (email, Slack, Airtable…).
3. **Publication** : nœud GitHub « Create/Update File » sur une branche
   `blog/<slug>` → « Create Pull Request » vers `main`.
4. **Fusion manuelle de la PR** = publication effective → Vercel redéploie.
5. Pour dépublier : repasser `status` à `"draft"` ou supprimer le fichier,
  via une nouvelle PR.

Le jeton GitHub utilisé par n8n vit **uniquement dans n8n** (credential GitHub),
jamais dans ce dépôt ni dans les variables d'environnement Vercel.
