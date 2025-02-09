// src/components/MainContentWrapper.tsx
"use client"; // Mark this as a client component

import { useSidebar } from "@/context/SidebarContext";
import React from "react";

const MainContentWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isCollapsed } = useSidebar();

  return (
    <main
      className={`flex-1 p-4 transition-all duration-300 ${
        isCollapsed ? "ml-[80px]" : "ml-[272px]"
      }`}
    >
      {children}
    </main>
  );
};

export default MainContentWrapper;
