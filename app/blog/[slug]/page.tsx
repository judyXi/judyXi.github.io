import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar, Tag, ArrowRight } from "lucide-react";
import { getPosts, getPostBySlug, getAllSlugs } from "@/lib/posts";

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

  // Markdown 格式轉 HTML
  const fmt = (text: string) =>
    text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-[#2D3A31]">$1</strong>')
      .replace(/==(.*?)==/g, '<mark class="bg-[#DCCFC2]/50 px-1 rounded">$1</mark>')
      .replace(/~~(.*?)~~/g, "<del>$1</del>");

  const cleanHeading = (text: string) =>
    text.replace(/\*\*/g, "").trim();

  // Markdown → JSX 渲染
  const renderContent = (content: string) => {
    return content.trim().split("\n\n").map((block, i) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      if (trimmed.startsWith("### ")) {
        return (
          <h3 key={i} className="font-heading text-xl font-bold text-[#2D3A31] mt-10 mb-4">
            {cleanHeading(trimmed.slice(4))}
          </h3>
        );
      }
      if (trimmed.startsWith("## ")) {
        return (
          <h2 key={i} className="font-heading text-2xl font-bold text-[#2D3A31] mt-12 mb-5">
            {cleanHeading(trimmed.slice(3))}
          </h2>
        );
      }
      if (trimmed.startsWith("# ")) return null;

      if (trimmed === "---") {
        return <div key={i} className="divider-botanical my-10" />;
      }

      if (trimmed.startsWith("> ")) {
        return (
          <blockquote key={i} className="my-8 pl-6 border-l-2 border-[#C27B66]/40 bg-[#DCCFC2]/10 py-5 pr-6 rounded-r-2xl">
            <p className="font-heading text-lg italic text-[#2D3A31]/80 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: fmt(trimmed.slice(2)) }} />
          </blockquote>
        );
      }

      const lines = trimmed.split("\n");
      if (lines.every((l) => l.startsWith("- ") || l.startsWith("• "))) {
        return (
          <ul key={i} className="space-y-3 my-6 ml-2">
            {lines.map((l, j) => (
              <li key={j} className="flex items-start gap-3 text-[#2D3A31]/75 leading-relaxed">
                <span className="mt-2.5 w-1.5 h-1.5 bg-[#8C9A84] rounded-full shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: fmt(l.replace(/^[-•]\s*/, "")) }} />
              </li>
            ))}
          </ul>
        );
      }

      if (lines.every((l) => /^\d+\. /.test(l))) {
        return (
          <ol key={i} className="space-y-3 my-6 ml-2 list-decimal list-inside text-[#2D3A31]/75">
            {lines.map((l, j) => (
              <li key={j} className="leading-relaxed"
                dangerouslySetInnerHTML={{ __html: fmt(l.replace(/^\d+\. /, "")) }} />
            ))}
          </ol>
        );
      }

      return (
        <p key={i} className="text-[#2D3A31]/75 leading-[1.9] my-5"
          dangerouslySetInnerHTML={{ __html: fmt(trimmed) }} />
      );
    });
  };

  return (
    <article className="min-h-screen">

      {/* ─── COVER ───────────────────────────────────── */}
      <div className="relative overflow-hidden bg-[#DCCFC2]/20 paper-grain">
        {/* Cover image */}
        {post.coverImage && (
          <div className="relative w-full h-64 sm:h-80 lg:h-96">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F9F8F4]" />
          </div>
        )}

        {/* Decorative blobs (only when no image) */}
        {!post.coverImage && (
          <>
            <div className="absolute top-10 right-20 w-80 h-80 bg-[#8C9A84]/8 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-10 w-56 h-56 bg-[#DCCFC2]/20 rounded-full blur-3xl" />
          </>
        )}

        <div className={`relative max-w-3xl mx-auto px-6 sm:px-8 ${post.coverImage ? 'py-12 lg:py-16 -mt-20 relative z-10' : 'py-20 lg:py-28'}`}>
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
