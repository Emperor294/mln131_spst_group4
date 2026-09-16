"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import ClickSpark from "@/components/ClickSpark";
import ChatSpeedDial from "@/features/chatbot/components/chat-speed-dial";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import MusicPlayer from "@/components/ui/music-player";
import ContentReviewNotice from "@/components/ui/content-review-notice";
import { SITE_SHELL_ROUTES } from "@/config/navigation";

interface SiteShellProps {
  children: ReactNode;
}

export default function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const withoutSiteChrome =
    SITE_SHELL_ROUTES.withoutChrome.some((route) => route === pathname) ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/baotang");
  const showsContentReviewNotice = SITE_SHELL_ROUTES.contentReview.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  return (
    <>
      {!isHomepage && (
        <ClickSpark sparkSize={12} sparkRadius={25} sparkCount={10} duration={600} />
      )}

      {withoutSiteChrome ? (
        <main className="flex-1 relative z-10">
          <div className="absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center bg-fixed opacity-95 pointer-events-none" />
          <div className="relative z-10">{children}</div>
        </main>
      ) : (
        <div className="flex flex-col min-h-screen relative">
          {!isHomepage && <div className="fixed bottom-0 left-0 w-[150px] h-[150px] pointer-events-none z-20">
            <div className="absolute bottom-0 left-0 w-[3px] h-[60px] bg-gradient-to-t from-[rgba(190,0,0,0.8)] to-transparent" />
            <div className="absolute bottom-0 left-0 w-[60px] h-[3px] bg-gradient-to-r from-[rgba(190,0,0,0.8)] to-transparent" />
          </div>}
          {!isHomepage && <div className="fixed bottom-0 right-0 w-[150px] h-[150px] pointer-events-none z-20">
            <div className="absolute bottom-0 right-0 w-[3px] h-[60px] bg-gradient-to-t from-[rgba(190,0,0,0.8)] to-transparent" />
            <div className="absolute bottom-0 right-0 w-[60px] h-[3px] bg-gradient-to-l from-[rgba(190,0,0,0.8)] to-transparent" />
          </div>}

          <Navbar />

          <main className={`flex-1 relative z-10 ${isHomepage ? "" : "pt-[72px]"}`}>
            {!isHomepage && <div className="absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center bg-fixed opacity-95 pointer-events-none" />}
            <div
              className={`relative z-10 ${isHomepage ? "" : "py-8"}`}
              data-content-status={showsContentReviewNotice ? "draft" : undefined}
            >
              {showsContentReviewNotice && <ContentReviewNotice />}
              {children}
            </div>
          </main>
          <Footer />
          {!isHomepage && <ChatSpeedDial />}
          {!isHomepage && <MusicPlayer />}
        </div>
      )}
    </>
  );
}
