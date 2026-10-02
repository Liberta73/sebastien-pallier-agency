import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AvaWidget from "@/components/AvaWidget";
import { formatPostDate, getPublishedPostBySlug, getPublishedSlugs } from "@/lib/posts";

type PageProps = { params: Promise<{ slug: string }> };

// Seuls les articles publiés génèrent une route ; tout le reste renvoie 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPublishedPostBySlug(slug);
  if (!post) return {};

  const title = post.seo.title ?? post.title;
  const description = post.seo.description ?? post.excerpt;

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      locale: "fr_FR",
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt ?? undefined,
      authors: [post.author],
      tags: post.tags,
      ...(post.image ? { images: [{ url: post.image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(post.image ? { images: [post.image] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPublishedPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-[#050816] py-20 text-slate-100 md:py-24">
      <div className="section-frame">
        <article className="content-align">
          <Link
            href="/blog"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300 transition hover:text-cyan-200"
          >
            ← Retour au blog
          </Link>

          <header className="mt-8 text-center">
            <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.18em] text-cyan-300">
              <span>{post.category}</span>
              <span className="h-1 w-1 rounded-full bg-cyan-300" />
              <span>{formatPostDate(post.publishedAt)}</span>
              <span className="h-1 w-1 rounded-full bg-cyan-300" />
              <span>{post.readTimeLabel} de lecture</span>
            </div>
            <h1 className="mt-6 text-4xl font-black leading-tight text-white md:text-5xl">
              {post.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300">{post.excerpt}</p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Par {post.author}
              {post.updatedAt && post.updatedAt !== post.publishedAt
                ? ` · mis à jour le ${formatPostDate(post.updatedAt)}`
                : ""}
            </p>
          </header>

          {/* react-markdown n'interprète pas le HTML brut : le contenu est échappé (anti-XSS). */}
          <div className="mx-auto mt-14 max-w-3xl text-left">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <h2 className="mt-12 text-3xl font-bold leading-tight text-white">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mt-10 text-2xl font-semibold leading-tight text-white">{children}</h3>
                ),
                p: ({ children }) => <p className="mt-6 text-base leading-8 text-slate-300">{children}</p>,
                a: ({ children, href }) => (
                  <a
                    href={href}
                    className="font-medium text-cyan-300 underline decoration-cyan-300/40 underline-offset-4 transition hover:text-cyan-200"
                    {...(href?.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {children}
                  </a>
                ),
                ul: ({ children }) => (
                  <ul className="mt-6 list-disc space-y-3 pl-6 text-base leading-8 text-slate-300">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="mt-6 list-decimal space-y-3 pl-6 text-base leading-8 text-slate-300">{children}</ol>
                ),
                li: ({ children }) => <li className="pl-2">{children}</li>,
                blockquote: ({ children }) => (
                  <blockquote className="mt-8 border-l-2 border-cyan-300/40 pl-6 italic text-slate-300">
                    {children}
                  </blockquote>
                ),
                code: ({ children, className }) => {
                  const isBlock = /language-/.test(className ?? "");
                  return isBlock ? (
                    <code className="block overflow-x-auto rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-cyan-100">
                      {children}
                    </code>
                  ) : (
                    <code className="rounded-md border border-white/10 bg-white/10 px-1.5 py-0.5 text-sm text-cyan-200">
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => <pre className="mt-6">{children}</pre>,
                strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                hr: () => <hr className="mt-12 border-white/10" />,
                table: ({ children }) => (
                  <div className="mt-8 overflow-x-auto">
                    <table className="w-full border-collapse text-left text-sm text-slate-300">{children}</table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="border-b border-white/20 px-4 py-3 font-semibold text-white">{children}</th>
                ),
                td: ({ children }) => <td className="border-b border-white/10 px-4 py-3">{children}</td>,
              }}
            >
              {post.content}
            </ReactMarkdown>

            {post.tags.length > 0 && (
              <div className="mt-14 flex flex-wrap justify-center gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {post.sources.length > 0 && (
              <footer className="mt-14 rounded-[1.75rem] border border-white/10 bg-white/5 p-7">
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Sources</h2>
                <ul className="mt-4 space-y-2 text-sm leading-7">
                  {post.sources.map((source) => (
                    <li key={source}>
                      <a
                        href={source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-300 underline decoration-cyan-300/40 underline-offset-4 transition hover:text-cyan-200"
                      >
                        {source}
                      </a>
                    </li>
                  ))}
                </ul>
              </footer>
            )}
          </div>
        </article>
      </div>
      <AvaWidget />
    </main>
  );
}
