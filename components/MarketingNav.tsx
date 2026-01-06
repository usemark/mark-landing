"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function MarketingNav() {
  const pathname = usePathname();
  
  // Determine which page is active
  const isHome = pathname === "/";
  const isSubscribe = pathname === "/subscribe";
  const isBlog = pathname?.startsWith("/blog");

  return (
    <nav className="w-full flex justify-between items-center px-8 py-6 border-b bg-white/95 relative z-10">
      {/* PERFORMANCE: Replaced backdrop-blur-lg with solid bg-white/95 to eliminate expensive backdrop filter during scroll */}
      <Link href="/">
        <Image
          src="/mark-logo.png"
          alt="Mark Logo"
          width={80}
          height={26}
          className="object-contain cursor-pointer"
          priority
        />
      </Link>

      <div className="flex items-center gap-4">
        {/* Home Link - PERFORMANCE: Removed backdrop-blur-md, hover:shadow-lg, using transform only */}
        <Link
          href="/"
          className={`px-4 py-2 rounded-full border shadow-md hover:scale-105 transition-transform duration-200 text-sm font-medium ${
            isHome
              ? "bg-gradient-to-r from-[#FF6A1A] to-[#FF8A1A] text-white border-transparent font-semibold"
              : "bg-white/95 border-black/5 text-black/80 hover:text-[#FF6A1A]"
          }`}
        >
          Home
        </Link>

        {/* Subscribe Button - PERFORMANCE: Same optimizations */}
        <Link
          href="/subscribe"
          className={`px-4 py-2 rounded-full border shadow-md hover:scale-105 transition-transform duration-200 text-sm font-medium ${
            isSubscribe
              ? "bg-gradient-to-r from-[#FF6A1A] to-[#FF8A1A] text-white border-transparent font-semibold"
              : "bg-white/95 border-black/5 text-black/80 hover:text-[#FF6A1A]"
          }`}
        >
          Subscribe
        </Link>

        {/* Blog Link - PERFORMANCE: Same optimizations */}
        <Link
          href="/blog"
          className={`px-4 py-2 rounded-full border shadow-md hover:scale-105 transition-transform duration-200 text-sm font-medium ${
            isBlog
              ? "bg-gradient-to-r from-[#FF6A1A] to-[#FF8A1A] text-white border-transparent font-semibold"
              : "bg-white/95 border-black/5 text-black/80 hover:text-[#FF6A1A]"
          }`}
        >
          Blog
        </Link>

        {/* Go to App Button - PERFORMANCE: Removed hover:shadow-xl, using transform only */}
        <a
          href={`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/login`}
          className="px-5 py-2.5 rounded-full bg-[#0A0A0A] text-white font-bold shadow-lg hover:scale-105 transition-transform duration-200 text-sm"
        >
          Go to App →
        </a>

        {/* Follow Us Dropdown - PERFORMANCE: Removed shadow transition */}
        <div className="group relative">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 border border-black/5 shadow-md hover:scale-105 transition-transform duration-200">
            <svg className="w-4 h-4 text-black/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
            <span className="text-sm font-medium text-black/80">Follow Us</span>
            <svg className="w-3 h-3 text-black/50 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
            <div className="bg-white/98 border border-black/10 rounded-2xl shadow-2xl overflow-hidden">
              {/* PERFORMANCE: Removed backdrop-blur-xl */}
              <div className="p-2 space-y-1">
                <a
                  href="https://x.com/usemarkapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-black/5 transition-colors group/item"
                >
                  <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center group-hover/item:bg-[#FF6A1A]/10 transition">
                    <svg className="w-4 h-4 text-black/70 group-hover/item:text-[#FF6A1A] transition" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-black/90">X (Twitter)</div>
                    <div className="text-xs text-black/50">@usemarkapp</div>
                  </div>
                </a>

                <a
                  href="https://www.instagram.com/usemarkapp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-black/5 transition-colors group/item"
                >
                  <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center group-hover/item:bg-[#FF6A1A]/10 transition">
                    <svg className="w-4 h-4 text-black/70 group-hover/item:text-[#FF6A1A] transition" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-black/90">Instagram</div>
                    <div className="text-xs text-black/50">@usemarkapp</div>
                  </div>
                </a>

                <a
                  href="https://www.tiktok.com/@usemarkapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-black/5 transition-colors group/item"
                >
                  <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center group-hover/item:bg-[#FF6A1A]/10 transition">
                    <svg className="w-4 h-4 text-black/70 group-hover/item:text-[#FF6A1A] transition" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-black/90">TikTok</div>
                    <div className="text-xs text-black/50">@usemarkapp</div>
                  </div>
                </a>

                <a
                  href="https://www.facebook.com/usemarkapp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-black/5 transition-colors group/item"
                >
                  <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center group-hover/item:bg-[#FF6A1A]/10 transition">
                    <svg className="w-4 h-4 text-black/70 group-hover/item:text-[#FF6A1A] transition" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-black/90">Facebook</div>
                    <div className="text-xs text-black/50">@usemarkapp</div>
                  </div>
                </a>

                <a
                  href="https://www.youtube.com/@usemarkapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-black/5 transition-colors group/item"
                >
                  <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center group-hover/item:bg-[#FF6A1A]/10 transition">
                    <svg className="w-4 h-4 text-black/70 group-hover/item:text-[#FF6A1A] transition" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-black/90">YouTube</div>
                    <div className="text-xs text-black/50">@usemarkapp</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
