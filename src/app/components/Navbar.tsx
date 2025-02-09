// src/components/Navbar.tsx
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname(); // Get the current route

  // State to manage the dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // In Navbar.tsx
  useEffect(() => {
    const navbarHeight = document.querySelector("nav")?.offsetHeight;
    document.documentElement.style.setProperty(
      "--navbar-height",
      `${navbarHeight}px`
    );
  }, []);
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md p-4 flex justify-between items-center">
      {/* App Title */}
      <h1 className="text-xl font-bold text-gray-800">Task Manager</h1>

      {/* Profile Section with Dropdown */}
      <div className="relative">
        {/* Profile Picture Button */}
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full hover:bg-gray-400 transition-colors"
        >
          <img
            src="https://i.pravatar.cc/150?img=01"
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </button>
        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <ul className="py-2">
              <li>
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsDropdownOpen(false)} // Close dropdown after navigation
                >
                  View Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsDropdownOpen(false)} // Close dropdown after navigation
                >
                  Settings
                </Link>
              </li>
              <li>
                <button
                  className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                  onClick={() => {
                    console.log("Logout clicked");
                    setIsDropdownOpen(false); // Close dropdown after action
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
