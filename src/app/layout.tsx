// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Sidebar from "./components/Sidebar";
import { SidebarProvider } from "../context/SidebarContext";
import Navbar from "./components/Navbar";
import MainContentWrapper from "./components/MainContentWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Manager",
  description: "A task management app built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        <Toaster position="top-right" reverseOrder={false} />
        {/* Wrap the app with SidebarProvider */}
        <SidebarProvider>
          {/* Navbar */}
          <Navbar />
          {/* Main Layout */}
          <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar />
            {/* Main Content */}
            <MainContentWrapper>{children}</MainContentWrapper>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
