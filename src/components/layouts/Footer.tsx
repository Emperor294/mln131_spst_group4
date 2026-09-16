import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PRIMARY_NAVIGATION } from "@/config/navigation";
import { SITE_CONFIG } from "@/config/site";

export default function Footer() {
  return (
    <footer className="relative z-20 border-t border-white/10 bg-[#080a0d] text-[#f2eee5]">
      <div className="mx-auto w-[min(calc(100%_-_48px),1320px)] py-14 md:py-20">
        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-[1.35fr_.65fr] md:pb-20">
          <div>
            <p className="mb-5 font-sub text-[10px] uppercase tracking-[0.2em] text-[#baa26d]">{SITE_CONFIG.courseCode} · Digital learning museum</p>
            <h2 className="max-w-3xl font-serif text-4xl leading-[0.98] tracking-[-0.04em] sm:text-5xl lg:text-7xl">{SITE_CONFIG.brand}</h2>
            <p className="mt-6 max-w-xl font-sub text-sm leading-7 text-white/52">{SITE_CONFIG.shortDescription}</p>
          </div>
          <nav aria-label="Điều hướng chân trang" className="md:justify-self-end md:min-w-52">
            <p className="mb-4 font-sub text-[10px] uppercase tracking-[0.16em] text-white/35">Điều hướng</p>
            {PRIMARY_NAVIGATION.map((item) => (
              <Link key={item.href} href={item.href} className="group flex items-center justify-between border-b border-white/10 py-3 font-sub text-sm text-white/68 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-[#baa26d]">
                {item.label}<ArrowUpRight aria-hidden="true" className="opacity-35 transition-opacity group-hover:opacity-100" size={15} />
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-3 pt-7 font-sub text-[10px] uppercase tracking-[0.12em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {SITE_CONFIG.brand}</span>
          <span>{SITE_CONFIG.academicTitle}</span>
        </div>
      </div>
      <div className="h-[3px] bg-[#a42b32]" />
    </footer>
  );
}
