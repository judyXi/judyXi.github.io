import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import { getPosts, getPostBySlug, getAllSlugs } from "@/lib/posts";
import MarkdownContent from "@/components/MarkdownContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "找不到文章" };
  return {
    title: `${post.title} — Judy's Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const all   = getPosts();
  const idx   = all.findIndex((p) => p.slug === slug);
  const prevPost = idx > 0              ? all[idx - 1] : null;
  const nextPost = idx < all.length - 1 ? all[idx + 1] : null;

  /* Markdown is rendered by MarkdownContent, including Obsidian callouts,
     tables, fenced code blocks, embeds, lists and inline formatting. */
  const renderContent = (content: string) => {
    // Obsidian accepts body text immediately after a heading. Normalize that
    // case so the body line is not rendered as part of the heading on the blog.
    const normalized = content
      .replace(/^(#{1,3}\s+[^\n]+)\n(?=\S)/gm, "$1\n\n");

    return <MarkdownContent content={normalized} />;
  };

  return (
    <article className="min-h-screen">

      {/* ─── COVER ───────────────────────────────────── */}
      <div className="relative overflow-hidden bg-[#DCCFC2]/20 paper-grain">
        {/* Decorative blobs */}
        <div className="absolute top-10 right-20 w-80 h-80 bg-[#8C9A84]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-56 h-56 bg-[#DCCFC2]/20 rounded-full blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-6 sm:px-8 py-20 lg:py-28">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#8C9A84] hover:text-[#C27B66] transition-colors duration-300 mb-8"
          >
            <ArrowLeft size={14} />
            所有文章
          </Link>

          <div className="flex flex-wrap gap-2 mb-5">
            <span className="px-3 py-1.5 bg-[#2D3A31] text-[#F9F8F4] rounded-full text-xs font-medium tracking-wide">
              {post.category}
            </span>
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-3 py-1.5 bg-white/60 text-[#2D3A31]/70 rounded-full text-xs font-medium">
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-snug text-[#2D3A31] mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-[#8C9A84]">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} />
              {post.date.replace(/-/g, "/")}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} />
              閱讀約 {post.readTime} 分鐘
            </div>
          </div>
        </div>
      </div>

      <div className="divider-botanical" />

      {/* ─── CONTENT ─────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-16 lg:py-20">
        {post.excerpt && (
          <div className="bg-[#DCCFC2]/15 rounded-2xl p-6 mb-12 border border-[#DCCFC2]/30">
            <p className="font-heading text-lg italic text-[#2D3A31]/70 leading-relaxed">{post.excerpt}</p>
          </div>
        )}

        {post.content ? (
          <div className="prose-botanical">{renderContent(post.content)}</div>
        ) : (
          <div className="py-16 text-center bg-white rounded-3xl shadow-soft-sm">
            <p className="font-heading text-xl font-bold text-[#2D3A31]">文章內容讀取中...</p>
            <p className="text-[#2D3A31]/50 mt-2 text-sm">請確認 Obsidian 頁面裡有寫文章內容</p>
          </div>
        )}

        {/* Tags */}
        <div className="mt-16 pt-8">
          <div className="divider-botanical mb-8" />
          <div className="flex items-center gap-2 flex-wrap">
            <Tag size={14} className="text-[#8C9A84]" />
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1.5 bg-[#8C9A84]/10 text-[#2D3A31]/60 rounded-full text-xs font-medium">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── PREV / NEXT ─────────────────────────────── */}
      {(prevPost || nextPost) && (
        <div className="bg-[#F9F8F4]">
          <div className="divider-botanical" />
          <div className="max-w-3xl mx-auto px-6 sm:px-8 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="group flex flex-col gap-2 p-6 bg-white rounded-2xl shadow-soft-sm card-botanical"
                >
                  <span className="text-xs tracking-[0.15em] uppercase text-[#8C9A84] font-medium">← 上一篇</span>
                  <span className="font-heading text-base font-bold text-[#2D3A31] group-hover:text-[#C27B66] transition-colors duration-500">
                    {prevPost.title}
                  </span>
                </Link>
              ) : <div />}
              {nextPost && (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="group flex flex-col gap-2 p-6 bg-white rounded-2xl shadow-soft-sm card-botanical text-right"
                >
                  <span className="text-xs tracking-[0.15em] uppercase text-[#8C9A84] font-medium">下一篇 →</span>
                  <span className="font-heading text-base font-bold text-[#2D3A31] group-hover:text-[#C27B66] transition-colors duration-500">
                    {nextPost.title}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── BACK ────────────────────────────────────── */}
      <div className="bg-[#DCCFC2]/15 py-12 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-3 px-8 py-4 bg-[#2D3A31] text-[#F9F8F4] rounded-full text-sm font-medium tracking-wide btn-botanical hover:bg-[#C27B66] transition-colors duration-500"
        >
          <ArrowLeft size={16} />
          返回所有文章
        </Link>
      </div>

    </article>
  );
}
