import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export const POSTS_DIRECTORY = path.join(process.cwd(), "content", "blog");

const WORDS_PER_MINUTE = 200;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export type PostStatus = "draft" | "published";

export interface PostSeo {
  title?: string;
  description?: string;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  content: string;
  status: PostStatus;
  author: string;
  tags: string[];
  publishedAt: string | null;
  updatedAt: string | null;
  image: string | null;
  sources: string[];
  seo: PostSeo;
  readTimeMinutes: number;
  readTimeLabel: string;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isIsoDate(value: unknown): value is string {
  return isNonEmptyString(value) && ISO_DATE_PATTERN.test(value.trim()) && !Number.isNaN(Date.parse(value.trim()));
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter(isNonEmptyString).map((item) => item.trim());
}

function computeReadTime(content: string): { minutes: number; label: string } {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  return { minutes, label: `${minutes} min` };
}

/**
 * Valide le frontmatter d'un fichier Markdown et retourne un article typé.
 * Retourne null (avec un avertissement en console) si le fichier est invalide,
 * afin qu'un article malformé ne casse pas le build.
 */
function parsePost(slug: string, raw: string): Post | null {
  let parsed: matter.GrayMatterFile<string>;
  try {
    parsed = matter(raw);
  } catch {
    console.warn(`[blog] Frontmatter invalide: content/blog/${slug}.md`);
    return null;
  }

  const data = parsed.data as Record<string, unknown>;
  const content = parsed.content.trim();

  if (!isNonEmptyString(data.title)) return warn(slug, "title manquant");
  if (!isNonEmptyString(data.excerpt)) return warn(slug, "excerpt manquant");
  if (!isNonEmptyString(data.category)) return warn(slug, "category manquante");
  if (!isNonEmptyString(data.author)) return warn(slug, "author manquant");

  const status = data.status === "published" ? "published" : "draft";

  const publishedAt = isIsoDate(data.publishedAt) ? (data.publishedAt as string).trim() : null;
  const updatedAt = isIsoDate(data.updatedAt) ? (data.updatedAt as string).trim() : null;

  // Un article publié doit avoir une date de publication et un contenu réel.
  if (status === "published" && !publishedAt) return warn(slug, "publishedAt (YYYY-MM-DD) requis pour un article publié");
  if (status === "published" && content.length === 0) return warn(slug, "contenu vide pour un article publié");

  const seoRaw = (data.seo ?? {}) as Record<string, unknown>;
  const seo: PostSeo = {
    title: isNonEmptyString(seoRaw.title) ? seoRaw.title.trim() : undefined,
    description: isNonEmptyString(seoRaw.description) ? seoRaw.description.trim() : undefined,
  };

  const { minutes, label } = computeReadTime(content);

  return {
    slug,
    title: (data.title as string).trim(),
    excerpt: (data.excerpt as string).trim(),
    category: (data.category as string).trim(),
    content,
    status,
    author: (data.author as string).trim(),
    tags: toStringArray(data.tags),
    publishedAt,
    updatedAt,
    image: isNonEmptyString(data.image) ? (data.image as string).trim() : null,
    sources: toStringArray(data.sources),
    seo,
    readTimeMinutes: minutes,
    readTimeLabel: label,
  };
}

function warn(slug: string, reason: string): null {
  console.warn(`[blog] Article ignoré (${slug}): ${reason}`);
  return null;
}

function readAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIRECTORY)) return [];

  return fs
    .readdirSync(POSTS_DIRECTORY)
    .filter((file) => file.endsWith(".md") && !file.startsWith("_"))
    .map((file) => file.replace(/\.md$/, ""))
    .filter((slug) => SLUG_PATTERN.test(slug))
    .map((slug) => parsePost(slug, fs.readFileSync(path.join(POSTS_DIRECTORY, `${slug}.md`), "utf8")))
    .filter((post): post is Post => post !== null);
}

/** Tous les articles valides (brouillons inclus), triés par slug. */
export function getAllPosts(): Post[] {
  return readAllPosts().sort((a, b) => a.slug.localeCompare(b.slug));
}

/** Articles publiés uniquement, triés du plus récent au plus ancien. */
export function getPublishedPosts(): Post[] {
  return readAllPosts()
    .filter((post) => post.status === "published")
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
}

/** Retourne un article publié par son slug, null sinon (brouillon ou inconnu). */
export function getPublishedPostBySlug(slug: string): Post | null {
  if (!SLUG_PATTERN.test(slug)) return null;
  const post = getAllPosts().find((candidate) => candidate.slug === slug);
  return post && post.status === "published" ? post : null;
}

/** Slugs des articles publiés, pour generateStaticParams. */
export function getPublishedSlugs(): string[] {
  return getPublishedPosts().map((post) => post.slug);
}

/** Formate une date ISO en libellé français lisible (ex. "juillet 2026"). */
export function formatPostDate(isoDate: string | null): string {
  if (!isoDate) return "";
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${isoDate}T12:00:00Z`));
}
