import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Post } from "@/lib/posts";

interface PostCardProps {
  post: Post;
  size?: "default" | "large";
}

/* Botanical color palette for card accents */
const accentColors: Record<string, string> = {
  "AI":     "bg-[#8C9A84]/15",
  "科技":   "bg-[#8C9A84]/15",
  "閱讀":   "bg-[#DCCFC2]/40",
  "生活":   "bg-[#C27B66]/10",
  "設計":   "bg-[#8C9A84]/20",
  "旅行":   "bg-[#DCCFC2]/30",
  "美食":   "bg-[#C27B66]/15",
  "攝影":   "bg-[#8C9A84]/10",
};

export default function PostCard({ post, size = "default" }: PostCardProps) {
  const isLarge = size === "large";
  const accent = accentColors[post.category] || "bg-[#DCCFC2]/30";

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="bg-white rounded-3xl overflow-hidden shadow-soft-sm card-botanical h-full flex flex-col">
        {/* Cover */}
        <div className={`relative overflow-hidden ${isLarge ? "h-56" : "h-48"} ${accent}`}>
          {/* Decorative elements */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-20 bg-white/40 rounded-t-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 border-[#2D3A31]/5" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-4xl text-[#2D3A31]/8 italic">
            {post.category[0]}
          </span>

          {/* Category Badge */}
          <span className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-[#2D3A31]/80 backdrop-blur-sm text-[#F9F8F4] rounded-full text-xs font-medium tracking-wide">
            {post.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className={`font-heading font-bold leading-snug mb-3 text-[#2D3A31] group-hover:text-[#C27B66] transition-colors duration-500 ${isLarge ? "text-2xl" : "text-xl"}`}>
            {post.title}
          </h3>
          <p className="text-sm text-[#2D3A31]/60 leading-relaxed mb-4 line-clamp-2 flex-1">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between pt-4 border-t border-[#8C9A84]/15">
            <span className="text-xs text-[#8C9A84] tracking-wide">
              {post.date.replace(/-/g, "/")}
            </span>
            <span className="flex items-center gap-1 text-xs font-medium text-[#C27B66] group-hover:gap-2 transition-all duration-500">
              閱讀 <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
