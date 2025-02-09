// src/components/MainContentWrapper.tsx

"use client"; // Mark as a client component
import { SidebarContext } from "@/context/SidebarContext";
import { useContext } from "react";


export default function MainContentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isCollapsed } = useContext(SidebarContext);

  return (
    <main
      className={`flex-1 p-4 transition-all duration-300 ${
        isCollapsed ? "md:ml-16" : "md:ml-64"
      }`}
    >
      {children}
    </main>
  );
}
