"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Search,
  Bell,
  User,
  ChevronDown,
  Terminal,
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "API", href: "#api" },
    { label: "Features", href: "#features" },
    { label: "Documentation", href: "#docs" },
    { label: "Pricing", href: "#pricing" },
    { label: "Enterprise", href: "#enterprise" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/90 backdrop-blur-xl border-b border-slate-800"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center">
                <Terminal className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full border-2 border-slate-950" />
            </div>
            <div>
              <div className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                QuantumStock
              </div>
              <div className="text-xs text-slate-400 font-mono">API</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200 text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
            <button className="ml-4 px-4 py-2 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 hover:from-cyan-500/20 hover:to-blue-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg transition-all duration-200 text-sm font-medium flex items-center">
              Console
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="hidden md:block relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Search className="h-4 w-4 text-slate-500" />
              </div>
              <input
                type="text"
                placeholder="Search APIs..."
                className="pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/30 w-64 text-sm"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 hover:bg-slate-800/50 rounded-lg transition-colors">
              <Bell className="h-5 w-5 text-slate-400" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full" />
            </button>

            {/* User */}
            <div className="hidden md:flex items-center space-x-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-700 flex items-center justify-center">
                <User className="h-5 w-5 text-slate-300" />
              </div>
              <div className="text-sm">
                <div className="font-medium">john@quantum.com</div>
                <div className="text-xs text-slate-400">Enterprise</div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-slate-800/50 rounded-lg"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-slate-300" />
              ) : (
                <Menu className="h-6 w-6 text-slate-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search APIs..."
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/30 text-sm"
                  />
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-700 flex items-center justify-center">
                  <User className="h-5 w-5 text-slate-300" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
