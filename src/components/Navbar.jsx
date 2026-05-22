"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, authClient } from "../lib/auth-client"; // আপনার পাথ অনুযায়ী ঠিক করে নিন
import { toast } from "react-toastify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success("Successfully logged out!");
      router.push("/");
    } catch (err) {
      toast.error("Failed to log out!");
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Ideas", path: "/ideas" },
    ...(user ? [
      { name: "Add Idea", path: "/add-idea" },
      { name: "My Ideas", path: "/my-ideas" },
      { name: "My Interactions", path: "/my-interactions" },
    ] : [])
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">💡</span>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">IdeaVault</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}
                className={`text-sm font-medium transition ${pathname === link.path ? "text-indigo-600" : "text-gray-600 hover:text-indigo-600"}`}>
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth / Profile */}
          <div className="flex items-center gap-4">
            {!user ? (
              <div className="hidden md:flex gap-3">
                <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-indigo-600">Login</Link>
                <Link href="/signup" className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700">Register</Link>
              </div>
            ) : (
              <div className="relative">
                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="h-9 w-9 rounded-full overflow-hidden border">
                  <img src={user.image || "https://ui-avatars.com/api/?name=" + user.name} alt="Profile" />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border p-2">
                    <p className="px-4 py-2 text-sm font-semibold truncate">{user.name}</p>
                    <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">Profile Management</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Logout</button>
                  </div>
                )}
              </div>
            )}
            {/* Mobile Toggle */}
            <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>☰</button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden p-4 bg-white dark:bg-gray-900 border-b">
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path} onClick={() => setIsOpen(false)} className="block py-2 text-gray-600">{link.name}</Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;