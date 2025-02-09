// src/components/Sidebar.tsx
"use client";
import Link from "next/link";
import { useContext, useState } from "react";
import { usePathname } from "next/navigation";
import { SidebarContext } from "@/context/SidebarContext";

const Sidebar = () => {
  const { isCollapsed, toggleSidebar } = useContext(SidebarContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const pathname = usePathname(); // Get the current route

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-200 text-gray-700 p-3 rounded-full shadow-md hover:bg-gray-300 transition-colors"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isCollapsed ? "w-16 pt-5" : "w-64 pt-5"
        } bg-white shadow-lg fixed top-[64px] left-0 z-40 h-[calc(100vh-64px)] transition-all duration-300 ${
          isMobileMenuOpen ? "block" : "hidden md:block"
        }`}
      >
        {/* Close Button for Mobile */}
        <button
          className="md:hidden absolute top-4 right-4 text-gray-700 p-2 rounded-full shadow-md hover:bg-gray-200 transition-colors"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          &times;
        </button>

        {/* Toggle Collapse Button for Desktop */}
        <button
          className="absolute top-4 right-[-15px] bg-gray-200 text-gray-700 p-1 rounded-full shadow-md z-50 hidden md:block hover:bg-gray-300 transition-colors"
          onClick={toggleSidebar}
        >
          {isCollapsed ? ">" : "<"}
        </button>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-1 px-2">
          <Link
            href="/"
            className={`p-3 rounded-md flex items-center space-x-3 ${
              pathname === "/"
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            } transition-all`}
            title={isCollapsed ? "Home" : undefined}
            onClick={() => setIsMobileMenuOpen(false)} // Close menu after navigation
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${isCollapsed ? "mx-auto" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0L9 9"
              />
            </svg>
            {!isCollapsed && <span>Home</span>}
          </Link>

          <Link
            href="/calendar"
            className={`p-3 rounded-md flex items-center space-x-3 ${
              pathname === "/calendar"
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            } transition-all`}
            title={isCollapsed ? "View Calendar" : undefined}
            onClick={() => setIsMobileMenuOpen(false)} // Close menu after navigation
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${isCollapsed ? "mx-auto" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {!isCollapsed && <span>Calendar</span>}
          </Link>

          <Link
            href="/analytics"
            className={`p-3 rounded-md flex items-center space-x-3 ${
              pathname === "/analytics"
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            } transition-all`}
            title={isCollapsed ? "View Analytics" : undefined}
            onClick={() => setIsMobileMenuOpen(false)} // Close menu after navigation
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${isCollapsed ? "mx-auto" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            {!isCollapsed && <span>Analytics</span>}
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
