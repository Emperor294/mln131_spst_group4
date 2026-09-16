import { Be_Vietnam_Pro, Geist, Geist_Mono, Noto_Serif_Display } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/layouts/SiteShell";
import { SITE_CONFIG } from "@/config/site";
import { generateSEOMetadata } from "@/lib/seo";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});


const notoSerifDisplay = Noto_Serif_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-noto-serif-display",
  display: "swap",
  preload: true,
});

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
  preload: true,
});

export const metadata = generateSEOMetadata({});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={SITE_CONFIG.language}>
      <head>
        <link rel="preload" href="/background.jpg" as="image" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSerifDisplay.variable} ${beVietnamPro.variable} antialiased text-gray-900 overlay-scroll`}
      >
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
