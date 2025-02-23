"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Me", path: "/aboutMe" },
    { name: "Timeline", path: "/timeline" },
    { name: "Projects", path: "/projects" },
    { name: "Certifications", path: "/certifications" },
    { name: "Contact Me", path: "/contactMe" },
  ];

  // Properly handle mobile menu toggling
  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Close menu on clicking any menu item
  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
      ${scrolled ? "bg-white/80 backdrop-blur-md shadow-lg" : "bg-white/50 backdrop-blur-sm"}`}
    >
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Brand Name */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent transform transition-transform duration-300 hover:scale-105">
          Vipul Anand
        </h1>

        {/* Desktop Navbar */}
        <ul className="hidden md:flex space-x-1">
          {navItems.map((item) => (
            <li key={item.path} className="relative">
              <Link
                href={item.path}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ease-in-out relative group flex items-center justify-center
                ${pathname === item.path ? "text-white bg-blue-600" : "hover:text-blue-600"}`}
              >
                <span className="relative z-10">{item.name}</span>
                {pathname !== item.path && (
                  <span className="absolute inset-0 bg-blue-100 rounded-lg scale-0 transition-transform duration-300 ease-in-out group-hover:scale-100" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button - Prevents unintended navigation */}
        <button
          type="button"
          className="md:hidden relative w-10 h-10 flex items-center justify-center"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-16 left-0 w-full bg-white shadow-lg transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col py-4">
          {navItems.map((item) => (
            <li key={item.path} className="w-full">
              <Link
                href={item.path}
                className={`block py-3 px-6 transition-all duration-300 ease-in-out relative overflow-hidden ${
                  pathname === item.path ? "bg-blue-600 text-white" : "hover:bg-blue-50 text-gray-800"
                }`}
                onClick={handleNavLinkClick} // Close menu when a link is clicked
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
        </ul>
      </div>
    </nav>
  );
}
