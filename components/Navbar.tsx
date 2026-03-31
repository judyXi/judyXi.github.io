"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/",       label: "首頁" },
  { href: "/blog",   label: "文章" },
  { href: "/about",  label: "關於" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#F9F8F4]/90 backdrop-blur-md border-b border-[#8C9A84]/20 transition-all duration-500">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <span className="font-heading text-2xl font-bold tracking-tight text-[#2D3A31] group-hover:text-[#C27B66] transition-colors duration-500">
            Judy&apos;s Blog
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`
                  relative text-sm font-medium tracking-wide transition-colors duration-300
                  ${active
                    ? "text-[#C27B66]"
                    : "text-[#2D3A31]/70 hover:text-[#2D3A31]"
                  }
                `}
              >
                {label}
                {active && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#C27B66] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Subscribe Button */}
        <div className="hidden md:block">
          <Link
            href="/blog"
            className="px-5 py-2 bg-[#2D3A31] text-[#F9F8F4] rounded-full text-sm font-medium tracking-wide btn-botanical hover:bg-[#C27B66] transition-colors duration-300"
          >
            探索文章
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-full text-[#2D3A31] hover:bg-[#8C9A84]/10 transition-colors duration-300"
          onClick={() => setOpen(!open)}
          aria-label="開關選單"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#F9F8F4] border-t border-[#8C9A84]/20 animate-fade-in">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`block px-6 py-4 text-base font-medium tracking-wide border-b border-[#8C9A84]/10 transition-colors duration-300
                  ${active ? "text-[#C27B66] bg-[#DCCFC2]/20" : "text-[#2D3A31]/70 hover:text-[#2D3A31] hover:bg-[#DCCFC2]/10"}
                `}
              >
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
