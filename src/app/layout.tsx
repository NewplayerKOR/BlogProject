import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NewplayerKOR 기술 블로그",
  description: "학습 내용과 개발 경험을 공유하는 기술 블로그입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen bg-gray-50">
          {/* 좌측 사이드바 */}
          <Sidebar />
          
          {/* 메인 콘텐츠 영역 */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
