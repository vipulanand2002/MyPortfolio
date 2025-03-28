"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import { FiSun, FiMoon } from "react-icons/fi";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Get initial theme from localStorage or default to light
    const savedTheme = localStorage.getItem("themeMode") || "light";
    setIsDarkMode(savedTheme === "dark");
    applyTheme(savedTheme);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Apply theme changes
  const applyTheme = (mode) => {
    const root = document.documentElement;
    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  // Toggle theme
  const toggleTheme = () => {
    const newMode = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("themeMode", newMode);
    applyTheme(newMode);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Me", path: "/aboutMe" },
    { name: "Timeline", path: "/timeline" },
    { name: "Projects", path: "/projects" },
    { name: "Certifications", path: "/certifications" },
    { name: "Contact Me", path: "/contactMe" },
  ];

  // Toggle mobile menu
  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
      ${scrolled 
        ? "bg-white/80 backdrop-blur-md shadow-lg dark:bg-gray-900/80 dark:shadow-gray-800/30" 
        : "bg-white/50 backdrop-blur-sm dark:bg-gray-900/50"}`}
    >
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Brand Name */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent transform transition-transform duration-300 hover:scale-105">
          Vipul Anand
        </h1>

        {/* Desktop Navigation and Theme Toggle */}
        <div className="hidden md:flex items-center">
          <ul className="flex space-x-1 mr-4">
            {navItems.map((item) => (
              <li key={item.path} className="relative">
                <Link
                  href={item.path}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ease-in-out relative group flex items-center justify-center
                  ${pathname === item.path 
                    ? "text-white bg-blue-600 dark:bg-blue-700" 
                    : "hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"}`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {pathname !== item.path && (
                    <span className="absolute inset-0 bg-blue-100 dark:bg-blue-900/40 rounded-lg scale-0 transition-transform duration-300 ease-in-out group-hover:scale-100" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Theme Toggle Switch (Desktop) */}
          <div className="relative">
            <button
              onClick={toggleTheme}
              className="flex items-center p-2 bg-gray-100 dark:bg-gray-800 rounded-full w-16 h-8 transition-all duration-300"
              aria-label="Toggle theme"
            >
              <div className={`absolute top-1 left-1 right-1 bottom-1 flex justify-between items-center px-1 rounded-full`}>
                <FiSun className="text-yellow-500" size={16} />
                <FiMoon className="text-blue-400" size={16} />
              </div>
              <div 
                className={`w-6 h-6 rounded-full bg-white dark:bg-gray-600 shadow-md transform transition-transform duration-300 
                ${isDarkMode ? 'translate-x-8' : 'translate-x-0'}`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Controls (Menu & Theme Toggle) */}
        <div className="md:hidden flex items-center">
          {/* Theme Toggle Button (Mobile) */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors mr-2"
            aria-label="Toggle theme"
          >
            {isDarkMode ? 
              <FiMoon className="text-blue-400" size={20} /> : 
              <FiSun className="text-yellow-500" size={20} />
            }
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="relative w-10 h-10 flex items-center justify-center"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <FiX size={24} className="dark:text-white" /> : <FiMenu size={24} className="dark:text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col py-4">
          {navItems.map((item) => (
            <li key={item.path} className="w-full">
              <Link
                href={item.path}
                className={`block py-3 px-6 transition-all duration-300 ease-in-out relative overflow-hidden ${
                  pathname === item.path 
                    ? "bg-blue-600 text-white" 
                    : "hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-800 dark:text-gray-200"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="relative z-10 flex items-center">
                  {item.name}
                  <span className="ml-2 opacity-0 transform translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}

          {/* Theme Option in Mobile Menu */}
          <li className="w-full px-6 py-3 border-t border-gray-100 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Theme</p>
            <div className="flex items-center">
              <span className="mr-2 text-gray-600 dark:text-gray-300">
                <FiSun size={18} />
              </span>
              <button
                onClick={toggleTheme}
                className="relative w-14 h-7 bg-gray-200 dark:bg-gray-700 rounded-full"
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-white dark:bg-blue-400 rounded-full transition-transform duration-300 ${
                    isDarkMode ? "transform translate-x-7" : ""
                  }`}
                />
              </button>
              <span className="ml-2 text-gray-600 dark:text-gray-300">
                <FiMoon size={18} />
              </span>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}