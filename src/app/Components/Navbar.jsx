
"use client";

import React, { useState } from "react";
import { authClient } from "../lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const router = useRouter();

  // Better Auth session hook
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/login");
          router.refresh();
        },
      },
    });
  };

  // Helper for user initials avatar
  const getInitials = (name, email) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return email ? email[0].toUpperCase() : "U";
  };

  return (
    <header className="w-full bg-[#0a0a0f] border-b border-gray-800 text-white sticky top-0 z-50">
      {/* 75% Max Content Width Container */}
      <div className="w-full lg:w-[75%] mx-auto px-4 py-3.5 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 via-purple-500 to-indigo-400 flex items-center justify-center font-bold text-lg shadow-lg shadow-purple-500/30 text-white">
            C
          </div>
          <span className="font-bold text-white text-lg tracking-tight">
            CareerConnect
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-gray-300">
          <Link href="/jobs" className="hover:text-white transition-colors">
            Find Jobs
          </Link>
          <Link href="/companies" className="hover:text-white transition-colors">
            Companies
          </Link>
          <Link href="/categories" className="hover:text-white transition-colors">
            Categories
          </Link>
          <Link href="/resources" className="hover:text-white transition-colors whitespace-nowrap">
            Career Resources
          </Link>
          <Link href="/blog" className="hover:text-white transition-colors">
            Blog
          </Link>
          <Link href="/about" className="hover:text-white transition-colors whitespace-nowrap">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors whitespace-nowrap">
            Contact Us
          </Link>
        </nav>

        {/* Action Buttons & Profile Dropdown (Desktop) */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {isPending ? (
            <span className="text-xs text-gray-400">Loading...</span>
          ) : session ? (
            /* Logged In View: Profile Avatar + Dropdown */
            <div
              className="relative"
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  setProfileOpen(false);
                }
              }}
            >
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="flex items-center gap-3 focus:outline-none cursor-pointer"
              >
                {/* User Avatar / Image */}
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className="w-9 h-9 rounded-full object-cover border border-purple-500/50"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-semibold text-xs flex items-center justify-center border border-indigo-400/30">
                    {getInitials(session.user.name, session.user.email)}
                  </div>
                )}
                <span className="text-sm font-medium text-gray-200 hover:text-white transition-colors max-w-[120px] truncate">
                  {session.user.name || "Account"}
                </span>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Profile Dropdown Menu */}
              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-[#14141f] border border-gray-800 rounded-lg shadow-xl py-2 z-50 text-sm">
                  {/* User Info Header */}
                  <div className="px-4 py-2 border-b border-gray-800/80">
                    <p className="text-sm font-medium text-white truncate">
                      {session.user.name || "User"}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {session.user.email}
                    </p>
                  </div>

                  {/* Links */}
                  <Link
                    href="/dashboard"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-gray-300 hover:bg-purple-600/20 hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 00-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Dashboard
                  </Link>

                  <Link
                    href="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-gray-300 hover:bg-purple-600/20 hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                  </Link>

                  <div className="border-t border-gray-800/80 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-colors cursor-pointer"
                    >
                      <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Logged Out View */
            <>
              <Link
                href="/auth/login"
                className="border border-gray-700 hover:border-gray-500 text-white font-medium px-4 py-1.5 rounded-md text-sm transition-all cursor-pointer"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium px-4 py-1.5 rounded-md text-sm shadow-md transition-all hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] cursor-pointer"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="lg:hidden p-2 text-gray-300 hover:text-white focus:outline-none cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0a0a0f] border-b border-gray-800 px-6 py-4 flex flex-col gap-4">
          <nav className="flex flex-col gap-3 text-gray-300 text-sm">
            <Link href="/jobs" onClick={() => setMobileOpen(false)} className="hover:text-white">Find Jobs</Link>
            <Link href="/companies" onClick={() => setMobileOpen(false)} className="hover:text-white">Companies</Link>
            <Link href="/categories" onClick={() => setMobileOpen(false)} className="hover:text-white">Categories</Link>
            <Link href="/resources" onClick={() => setMobileOpen(false)} className="hover:text-white">Career Resources</Link>
            <Link href="/blog" onClick={() => setMobileOpen(false)} className="hover:text-white">Blog</Link>
            <Link href="/about" onClick={() => setMobileOpen(false)} className="hover:text-white">About Us</Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="hover:text-white">Contact Us</Link>
          </nav>

          <div className="pt-4 border-t border-gray-800 flex flex-col gap-2">
            {session ? (
              <>
                <div className="flex items-center gap-3 pb-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-semibold text-xs flex items-center justify-center">
                    {getInitials(session.user.name, session.user.email)}
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-medium text-white truncate">{session.user.name || "User"}</p>
                    <p className="text-xs text-gray-400 truncate">{session.user.email}</p>
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center border border-gray-700 text-white py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center border border-gray-700 text-white py-2 rounded-md text-sm font-medium"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full border border-red-600/80 text-red-400 py-2 rounded-md text-sm font-medium hover:bg-red-950/30 cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center border border-gray-700 text-white py-2 rounded-md text-sm font-medium cursor-pointer"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-md text-sm font-medium cursor-pointer"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;



