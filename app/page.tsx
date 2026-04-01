import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PostCard from "@/components/PostCard";
import { getPosts } from "@/lib/posts";

export default async function HomePage() {
  const posts    = getPosts();
  const featured = posts.find((p) => p.featured);
  const recent   = posts.filter((p) => !p.featured).slice(0, 6);

  return (
    <div className="overflow-x-hidden">

      {/* ─── HERO ────────────────────────────────────────── */}
      <section className="relative paper-grain overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#8C9A84]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-56 h-56 bg-[#DCCFC2]/30 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 sm:px-8 py-24 lg:py-36">
          <div className="max-w-2xl">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#8C9A84] mb-6 animate-fade-in">
              Personal Blog
            </p>

            <h1 className="font-heading font-bold leading-[1.1] tracking-tight mb-8 animate-slide-up">
              <span className="block text-5xl sm:text-6xl lg:text-7xl text-[#2D3A31]">用文字</span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl text-[#C27B66] italic mt-2">記錄生活</span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl text-[#2D3A31] mt-2">每個瞬間</span>
            </h1>

            <p className="text-lg text-[#2D3A31]/60 leading-relaxed max-w-md mb-10">
              分享閱讀心得、生活隨筆與靈感碎片。在文字裡找到安靜的力量。
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#2D3A31] text-[#F9F8F4] rounded-full text-sm font-medium tracking-wide btn-botanical hover:bg-[#C27B66] transition-colors duration-500"
              >
                開始閱讀 <ArrowRight size={16} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#2D3A31]/20 text-[#2D3A31] rounded-full text-sm font-medium tracking-wide btn-botanical hover:border-[#C27B66] hover:text-[#C27B66] transition-all duration-500"
              >
                關於我
              </Link>
            </div>
          </div>
        </div>

        {/* Botanical divider */}
        <div className="divider-botanical" />
      </section>

      {/* ─── FEATURED POST ───────────────────────────────── */}
      {featured && (
        <section className="py-20 lg:py-28">
          <div className="max-w-6xl mx-auto px-6 sm:px-8">
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-3xl overflow-hidden shadow-soft-md card-botanical">
                {/* Decorative area */}
                <div className="relative h-64 lg:h-auto min-h-[280px] bg-[#DCCFC2]/30 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-56 bg-white/50 rounded-t-full" />
                  </div>
                  <span className="absolute top-6 left-6 z-10 px-3 py-1.5 bg-[#C27B66] text-[#F9F8F4] rounded-full text-xs font-medium tracking-wide">
                    精選文章
                  </span>
                </div>
                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="text-xs tracking-[0.2em] uppercase text-[#8C9A84] mb-4 font-medium">
                    {featured.category}
                  </span>
                  <h2 className="font-heading text-3xl lg:text-4xl font-bold leading-snug text-[#2D3A31] mb-4 group-hover:text-[#C27B66] transition-colors duration-500">
                    {featured.title}
                  </h2>
                  <p className="text-[#2D3A31]/60 leading-relaxed mb-6">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium text-[#C27B66] group-hover:gap-3 transition-all duration-500">
                    閱讀全文 <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ─── RECENT POSTS ────────────────────────────────── */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-xs tracking-[0.2em] uppercase text-[#8C9A84] mb-3 block font-medium">Recent</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#2D3A31]">最新文章</h2>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-[#C27B66] hover:gap-3 transition-all duration-500"
            >
              全部文章 <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {recent.map((post, i) => (
              <div key={post.slug} className={i % 3 === 1 ? "lg:translate-y-12" : ""}>
                <PostCard post={post} />
              </div>
            ))}
          </div>
          <div className="mt-12 sm:hidden text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#2D3A31] text-[#F9F8F4] rounded-full text-sm font-medium tracking-wide btn-botanical"
            >
              查看全部文章 <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ──────────────────────────────────── */}
      <section className="py-20 bg-[#2D3A31] relative paper-grain overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#8C9A84]/10 rounded-full blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-12">
            <span className="text-xs tracking-[0.2em] uppercase text-[#8C9A84] block mb-3 font-medium">Categories</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#F9F8F4]">探索分類</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {["設計", "旅行", "生活", "美食", "閱讀", "攝影"].map((cat) => (
              <Link
                key={cat}
                href={`/blog?category=${encodeURIComponent(cat)}`}
                className="group flex flex-col items-center justify-center py-8 px-4 rounded-2xl border border-[#F9F8F4]/10 text-center hover:bg-[#F9F8F4]/5 hover:border-[#8C9A84]/30 transition-all duration-500"
              >
                <span className="font-heading text-lg text-[#F9F8F4] group-hover:text-[#C27B66] transition-colors duration-500">
                  {cat}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ──────────────────────────────────── */}
      <section className="py-20 lg:py-28 relative paper-grain overflow-hidden">
        <div className="absolute top-10 right-1/4 w-80 h-80 bg-[#DCCFC2]/20 rounded-full blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
          <div className="max-w-xl mx-auto text-center">
            <span className="text-xs tracking-[0.2em] uppercase text-[#8C9A84] block mb-4 font-medium">Newsletter</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#2D3A31] mb-4">
              不想錯過新文章？
            </h2>
            <p className="text-[#2D3A31]/60 leading-relaxed mb-8">
              每週精選文章直送你的信箱，與你一起在文字中找到靈感。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="你的電子信箱..."
                className="flex-1 px-5 py-3.5 bg-white border border-[#8C9A84]/20 rounded-xl text-sm focus:outline-none focus:border-[#8C9A84] transition-colors duration-300 placeholder:text-[#2D3A31]/30"
              />
              <button className="px-6 py-3.5 bg-[#C27B66] text-[#F9F8F4] rounded-xl text-sm font-medium tracking-wide btn-botanical hover:bg-[#2D3A31] transition-colors duration-500 whitespace-nowrap">
                訂閱
              </button>
            </div>
            <p className="text-xs text-[#8C9A84] mt-4">每週一封，隨時可取消訂閱</p>
          </div>
        </div>
      </section>

    </div>
  );
}
