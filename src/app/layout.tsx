import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import "pretendard/dist/web/variable/pretendardvariable.css";
import "./globals.css";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SITE_CONFIG, getSiteUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${SITE_CONFIG.name} | 백엔드 개발자`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  applicationName: `${SITE_CONFIG.name} 포트폴리오`,
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.github }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    title: `${SITE_CONFIG.name} | 백엔드 개발자`,
    description: SITE_CONFIG.description,
    siteName: `${SITE_CONFIG.name} 포트폴리오`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | 백엔드 개발자`,
    description: SITE_CONFIG.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={GeistMono.variable}>
      <body>
        <a
          href="#main-content"
          className="fixed left-4 top-4 -translate-y-24 rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground transition-transform focus:translate-y-0"
        >
          본문으로 건너뛰기
        </a>
        <TooltipProvider>
          <div className="flex min-h-svh flex-col">
            <SiteHeader />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
