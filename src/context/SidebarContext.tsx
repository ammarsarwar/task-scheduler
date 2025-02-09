// src/context/SidebarContext.tsx
"use client"
import { createContext, useState } from "react";

export const SidebarContext = createContext<{
  isCollapsed: boolean;
  toggleSidebar: () => void;
}>({
  isCollapsed: false,
  toggleSidebar: () => {},
});

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
