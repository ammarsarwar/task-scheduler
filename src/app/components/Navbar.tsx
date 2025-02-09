// src/components/Navbar.tsx

"use client";
import Link from "next/link";
import { signOut } from "next-auth/react"; // For logout functionality
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
const Navbar = () => {
  
  const { data: session } = useSession();
 const pathname = usePathname(); // Get the current route

 const isAuthRoute = ["/auth/login", "/auth/register"].includes(pathname!);

 if (isAuthRoute) {
   // Simplified navbar for auth pages
   return (
    null
   );
 }
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* App Title */}
      <h1 className="text-xl font-bold text-gray-800">Task Manager</h1>

      {/* Profile Section */}
      <div className="flex items-center space-x-4">
        {session ? (
          <>
            {/* User Name */}
            <span className="text-gray-700 font-medium">
              {session.user?.name}
            </span>

            {/* Logout Button */}
            <button
              onClick={() => signOut()} // Logout functionality
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          // If no user, show login link
          <Link
            href="/auth/login"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
