import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#2D3A31] text-[#F9F8F4]">
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <span className="font-heading text-2xl font-bold tracking-tight block mb-4">
              Judy&apos;s Blog
            </span>
            <p className="text-[#F9F8F4]/60 leading-relaxed text-sm mb-6">
              用文字記錄生活中每一個值得被留下的瞬間。在閱讀與書寫之間，找到屬於自己的節奏。
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {["IG", "TW"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-[#F9F8F4]/20 text-xs font-medium text-[#F9F8F4]/60 hover:bg-[#C27B66] hover:border-[#C27B66] hover:text-[#F9F8F4] transition-all duration-300"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#8C9A84] mb-5 font-medium">
              導覽
            </h3>
            <ul className="space-y-3">
              {[
                { label: "首頁", href: "/" },
                { label: "所有文章", href: "/blog" },
                { label: "關於", href: "/about" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#F9F8F4]/60 hover:text-[#C27B66] transition-colors duration-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Mini */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#8C9A84] mb-5 font-medium">
              訂閱電子報
            </h3>
            <p className="text-sm text-[#F9F8F4]/60 mb-4 leading-relaxed">
              每週精選文章，直送你的信箱。
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="px-4 py-3 bg-[#F9F8F4]/5 border border-[#F9F8F4]/15 rounded-xl text-sm text-[#F9F8F4] placeholder:text-[#F9F8F4]/30 focus:outline-none focus:border-[#8C9A84] transition-colors duration-300"
              />
              <button className="px-4 py-3 bg-[#C27B66] text-[#F9F8F4] rounded-xl text-sm font-medium tracking-wide btn-botanical hover:bg-[#C27B66]/80 transition-colors duration-300">
                訂閱
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#F9F8F4]/10">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[#F9F8F4]/40 text-xs">
            &copy; 2026 Judy. All rights reserved.
          </p>
          <p className="text-[#F9F8F4]/30 text-xs italic font-heading">
            Cultivated with care
          </p>
        </div>
      </div>
    </footer>
  );
}
