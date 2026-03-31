"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import PostCard from "@/components/PostCard";
import type { Post } from "@/lib/posts";

interface Props {
  posts: Post[];
  categories: string[];
}

export default function BlogClient({ posts, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [searchQuery,    setSearchQuery]    = useState("");

  const filtered = posts.filter((p) => {
    const matchCat    = activeCategory === "全部" || p.category === activeCategory;
    const matchSearch = searchQuery === "" ||
      p.title.includes(searchQuery) ||
      p.excerpt.includes(searchQuery) ||
      p.tags.some((t) => t.includes(searchQuery));
    return matchCat && matchSearch;
  });

  return (
    <div>
      {/* ─── PAGE HEADER ─────────────────────────────── */}
      <section className="relative py-20 lg:py-28 paper-grain overflow-hidden">
        <div className="absolute top-10 right-20 w-72 h-72 bg-[#DCCFC2]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-56 h-56 bg-[#8C9A84]/8 rounded-full blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
          <span className="text-xs tracking-[0.2em] uppercase text-[#8C9A84] block mb-4 font-medium">
            All Posts
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2D3A31] mb-4">
            所有文章
          </h1>
          <p className="text-lg text-[#2D3A31]/50 max-w-lg">
            {posts.length > 0
              ? `${posts.length} 篇文章，持續更新中。`
              : "文章正在同步中..."}
          </p>
        </div>
      </section>

      <div className="divider-botanical" />

      {/* ─── FILTERS ─────────────────────────────────── */}
      <section className="bg-[#F9F8F4]/90 backdrop-blur-md sticky top-16 z-40 border-b border-[#8C9A84]/10">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300
                    ${activeCategory === cat
                      ? "bg-[#2D3A31] text-[#F9F8F4] shadow-soft-sm"
                      : "bg-transparent text-[#2D3A31]/60 border border-[#8C9A84]/20 hover:border-[#8C9A84]/40 hover:text-[#2D3A31]"
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
            {/* Search */}
            <div className="flex items-center border border-[#8C9A84]/20 rounded-xl bg-white shadow-soft-sm w-full sm:w-64 overflow-hidden">
              <Search size={14} className="ml-3.5 shrink-0 text-[#8C9A84]" />
              <input
                type="text"
                placeholder="搜尋文章..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-2.5 bg-transparent text-sm focus:outline-none placeholder:text-[#2D3A31]/30"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── POSTS GRID ──────────────────────────────── */}
      <section className="py-12 lg:py-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl shadow-soft-sm">
              <span className="block text-5xl mb-4">🌿</span>
              <p className="font-heading text-2xl font-bold text-[#2D3A31]">還沒有找到文章</p>
              <p className="text-[#2D3A31]/50 mt-2 max-w-md mx-auto text-sm">
                請確認 Obsidian BLOG 資料夾裡有 .md 檔案。
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl shadow-soft-sm">
              <span className="block text-5xl mb-4">🔍</span>
              <p className="font-heading text-2xl font-bold text-[#2D3A31]">找不到相關文章</p>
              <p className="text-[#2D3A31]/50 mt-2 text-sm">換個關鍵字試試看吧</p>
            </div>
          ) : (
            <>
              <p className="text-xs text-[#8C9A84] tracking-[0.15em] uppercase mb-8 font-medium">
                共 {filtered.length} 篇文章
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filtered.map((post, i) => (
                  <div key={post.slug} className={i % 3 === 1 ? "lg:translate-y-8" : ""}>
                    <PostCard post={post} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
