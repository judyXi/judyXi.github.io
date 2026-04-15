import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen">

      {/* ─── HEADER ──────────────────────────────────── */}
      <section className="relative py-20 lg:py-28 paper-grain overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#DCCFC2]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-20 w-56 h-56 bg-[#8C9A84]/8 rounded-full blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-6 sm:px-8">
          <span className="text-xs tracking-[0.2em] uppercase text-[#8C9A84] block mb-4 font-medium">About</span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2D3A31] mb-6">
            關於我
          </h1>
          <p className="text-lg text-[#2D3A31]/50 max-w-lg leading-relaxed">
            一個喜歡閱讀、旅行和記錄生活的人。
          </p>
        </div>
      </section>

      <div className="divider-botanical" />

      {/* ─── CONTENT ─────────────────────────────────── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 sm:px-8">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Avatar area */}
            <div className="md:col-span-1 flex justify-center">
              <div className="w-48 h-48 rounded-full overflow-hidden">
                <Image
                  src="/images/ab_400x400.jpg"
                  alt="Judy"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <h2 className="font-heading text-2xl font-bold text-[#2D3A31] mb-4">Judy</h2>
              <p className="text-[#2D3A31]/70 leading-[1.9] mb-4">
                嗨，我是 Judy，養了四隻貓，喜歡看書也喜歡學新事物，這是我記錄生活、分享閱讀心得和靈感碎片的地方。
              </p>
              <p className="text-[#2D3A31]/70 leading-[1.9] mb-4">
                文字有一種安靜的力量，可以在吵雜的世界中幫助整理思緒、保存能量，也能讓陌生人之間產生共鳴。
              </p>
              <p className="text-[#2D3A31]/70 leading-[1.9] mb-4">
                在這裡你會看到對書籍的思考、對生活的觀察，還有一些純粹想寫下來的想法。
              </p>
              <p className="text-[#2D3A31]/70 leading-[1.9]">
                希望你也能在這些文字裡，找到屬於你自己的體悟。
              </p>
            </div>
          </div>

          {/* Interests */}
          <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-soft-sm mb-16">
            <h3 className="font-heading text-xl font-bold text-[#2D3A31] mb-6">喜歡的事</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { emoji: "📚", label: "閱讀" },
                { emoji: "✈️", label: "旅行" },
                { emoji: "📝", label: "寫作" },
                { emoji: "📷", label: "攝影" },
                { emoji: "🐱", label: "貓奴" },
              ].map(({ emoji, label }) => (
                <div key={label} className="flex flex-col items-center py-6 rounded-2xl bg-[#F9F8F4]">
                  <span className="text-3xl mb-2">{emoji}</span>
                  <span className="text-sm text-[#2D3A31]/60 font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-8">
            <p className="font-heading text-2xl font-bold text-[#2D3A31] mb-4">
              一起來探索世界
            </p>
            <p className="text-[#2D3A31]/50 mb-8">去文章頁看看我最新的紀錄吧。</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#2D3A31] text-[#F9F8F4] rounded-full text-sm font-medium tracking-wide btn-botanical hover:bg-[#C27B66] transition-colors duration-500"
              >
                閱讀文章 <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
