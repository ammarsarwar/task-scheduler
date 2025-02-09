// src/context/SidebarContext.tsx
"use client";
import { createContext, useState, useEffect, useContext } from "react";

// Define the shape of the context
interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

// Create the context with default values
export const SidebarContext = createContext<SidebarContextType>({
  isCollapsed: false,
  toggleSidebar: () => {},
});

// Custom hook to use the SidebarContext
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Initialize state with value from localStorage or default to false
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("sidebar-collapsed");
      return savedState ? JSON.parse(savedState) : false;
    }
    return false;
  });

  // Toggle sidebar collapse state
  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  // Persist the collapsed state in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  // Provide the context value to consumers
  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
