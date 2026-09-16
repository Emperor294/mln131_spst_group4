"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PRIMARY_NAVIGATION } from "@/config/navigation";
import { SITE_CONFIG } from "@/config/site";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#080a0d]/82 text-[#f2eee5] backdrop-blur-xl">
      <nav className="mx-auto flex h-[72px] w-[min(calc(100%_-_48px),1320px)] items-center justify-between" aria-label="Điều hướng chính">
        <Link className="group flex min-w-0 items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#baa26d]" href="/" aria-label={`${SITE_CONFIG.brand} — Trang chủ`}>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#a42b32] font-serif text-sm text-[#f2eee5] transition-colors group-hover:bg-[#a42b32]">S</span>
          <span className="min-w-0">
            <strong className="block truncate font-sub text-xs tracking-[0.16em]">{SITE_CONFIG.brand}</strong>
            <span className="hidden truncate font-sub text-[9px] uppercase tracking-[0.12em] text-white/42 sm:block">{SITE_CONFIG.courseCode} · Digital museum</span>
          </span>
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {PRIMARY_NAVIGATION.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className="relative py-2 font-sub text-[11px] font-medium uppercase tracking-[0.14em] text-white/65 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#baa26d]"
              >
                {item.label}
                <span className={`absolute inset-x-0 -bottom-[19px] h-px bg-[#a42b32] transition-transform ${isActive ? "scale-x-100" : "scale-x-0"}`} />
              </Link>
            );
          })}
        </div>

        <span className="hidden font-sub text-[9px] uppercase tracking-[0.16em] text-white/35 lg:block">{SITE_CONFIG.academicTitle}</span>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center border border-white/15 text-white transition-colors hover:border-white/45 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#baa26d] md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            className="border-t border-white/10 bg-[#080a0d]/98 px-6 py-5 md:hidden"
          >
            {PRIMARY_NAVIGATION.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between border-b border-white/10 py-4 font-sub text-sm text-white/80 focus-visible:outline-2 focus-visible:outline-[#baa26d]"
              >
                <span>{item.label}</span><span className="text-[10px] text-[#baa26d]">0{index + 1}</span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
