---
# ── Identité de l'article ─────────────────────────────────────────────
# Le slug est déduit du NOM DU FICHIER (content/blog/<slug>.md), pas du frontmatter.
# Format du nom de fichier : minuscules, chiffres et tirets uniquement.

title: "Titre complet de l'article (obligatoire)"
excerpt: "Résumé en 1-2 phrases, affiché sur la carte du blog (obligatoire)."
category: "Automatisation"        # Produit | Automatisation | Stratégie | ...
status: "draft"                    # draft | published
author: "Sebastien Pallier"

tags:                              # liste de tags (peut être vide : [])
  - ia
  - nocode

# Dates au format ISO 8601 "YYYY-MM-DD" (obligatoire : publishedAt si status=published)
publishedAt: null                  # ex. "2026-10-02" — null tant que l'article est un brouillon
updatedAt: null                    # ex. "2026-10-05" — date de dernière mise à jour

image: null                        # facultatif — chemin public, ex. "/blog/mon-visuel.webp"

sources: []                        # liste d'URL utilisées pour la rédaction, ex. :
                                   # - "https://example.com/etude"

seo:                               # métadonnées SEO de l'article
  title: "Titre SEO (≤ 60 caractères)"
  description: "Description SEO (≤ 160 caractères)."
---

<!--
  Corps de l'article en Markdown (GitHub Flavored Markdown).
  Le HTML brut n'est PAS interprété : il est échappé à l'affichage (sécurité XSS).
  Le temps de lecture est calculé automatiquement depuis ce contenu (~200 mots/min).
  Un article ne peut être publié (status: published) que si le corps n'est pas vide.
-->

## Première section

Texte de l'article…
