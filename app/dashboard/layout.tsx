// layout.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UserCheck,
  LogOut,
  Menu,
  X,
  FileText,
  History,
  Settings,
  User,
  BarChart2,
  Upload,
  Search,
  Share2,
  Bell,
  Sun,
  Moon,
  ShieldBan,
  BookOpenCheck,
} from "lucide-react";
import Image from "next/image";
import { LanguageSwitcher } from "../components/language-switcher";

type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: "Individual" | "Verifier" | "Issuer";
  hash_id: string;
  is_email_verified: boolean;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notifications, setNotifications] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Common navigation items for all roles
  const commonNavItems = [
    {
      href: "/dashboard",
      icon: (
        <LayoutDashboard className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
      ),
      label: "Overview",
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/profile",
      icon: (
        <User className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
      ),
      label: "Profile",
      active: pathname === "/dashboard/profile",
    },
    {
      href: "/dashboard/history",
      icon: (
        <History className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
      ),
      label: "History",
      active: pathname === "/dashboard/history",
    },
    {
      href: "/dashboard/settings",
      icon: (
        <Settings className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
      ),
      label: "Settings",
      active: pathname === "/dashboard/settings",
    },
  ];

  // Role-specific navigation items
  const roleSpecificNavItems = {
    Issuer: [
      {
        href: "/dashboard/issuer",
        icon: (
          <Upload className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
        ),
        label: "Issue Documents",
        active: pathname === "/dashboard/issuer",
      },
      {
        href: "/dashboard/issuer/certificate-gen",
        icon: (
          <ShieldBan className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
        ),
        label: "Generate Certificate",
        active: pathname === "/dashboard/issuer/certificate-gen",
      },
    ],
    Verifier: [
      {
        href: "/dashboard/verifier",
        icon: (
          <UserCheck className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
        ),
        label: "Verify Documents",
        active: pathname === "/dashboard/verifier",
      },
      // {
      //   href: "/dashboard/verifier/stats",
      //   icon: (
      //     <BarChart2 className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
      //   ),
      //   label: "Statistics",
      //   active: pathname === "/dashboard/verifier/stats",
      // },
      {
        href: "/dashboard/verifier/test",
        icon: (
          <BookOpenCheck className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
        ),
        label: "Test",
        active: pathname === "/dashboard/verifier/test",
      },
    ],
    Individual: [
      {
        href: "/dashboard/documents",
        icon: (
          <FileText className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
        ),
        label: "My Documents",
        active: pathname === "/dashboard/documents",
      },
      {
        href: "/dashboard/share",
        icon: (
          <Share2 className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
        ),
        label: "Share Documents",
        active: pathname === "/dashboard/share",
      },
    ],
  };

  const getNavigationItems = () => {
    if (!user) return commonNavItems;
    return [...commonNavItems, ...(roleSpecificNavItems[user.role] || [])];
  };

  // Auth check and user data fetching
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = useCallback(() => {
    if (pathname === "/login" || pathname === "/signup") {
      setLoading(false);
      return;
    }

    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setUser(user);
      } catch (error) {
        console.error("Error parsing user data:", error);
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
    setLoading(false);
  }, [router, pathname]);

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      localStorage.removeItem("user");
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("user");
      setUser(null);
      router.push("/login");
    }
  };

  // Loading and auth redirects
  if (pathname === "/login" || pathname === "/signup") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className={`flex min-h-screen ${darkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-40 w-64
        bg-white dark:bg-gray-800 shadow-xl 
        transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Logo and Brand */}
        <div className="flex items-center h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <Image
            src="/logo.jpg"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h1 className="ml-3 text-xl font-bold text-gray-800 dark:text-white">
            TrueDoc
          </h1>
        </div>

        {/* Navigation */}
        <div className="flex flex-col h-[calc(100vh-4rem)] justify-between">
          <nav className="flex-1 px-4 mt-6">
            {getNavigationItems().map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`
                  flex items-center space-x-3 py-3 px-4 rounded-lg mb-2
                  ${
                    item.active
                      ? "bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }
                `}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Bottom Section with Theme Toggle and Logout */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center space-x-3 w-full py-3 px-4 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 mb-2"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
              <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full py-3 px-4 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 bg-white dark:bg-gray-800 shadow-sm px-6 flex items-center">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isSidebarOpen ? <X /> : <Menu />}
          </button>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl ml-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4 ml-auto">
            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            <LanguageSwitcher/>
            {/* User Profile */}
            {user && (
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.role}
                  </p>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {error ? (
            <div className="text-center py-4 text-red-600">{error}</div>
          ) : (
            children
          )}
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 px-6">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} TrueDoc. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
