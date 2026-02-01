// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/src/components/Header"; // 确保 Header.tsx 已经存在

// 配置字体
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 页面 metadata
export const metadata: Metadata = {
  title: "我的任务 - Todo App",
  description: "一个简洁高效的任务管理应用",
};

// RootLayout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Header /> {/* 全局显示 Header */}
          {children} {/* 页面内容 */}
        </body>
      </html>
    </ClerkProvider>
  );
}
