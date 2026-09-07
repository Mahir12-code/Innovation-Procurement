import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import maharashtraLogo from '../assets/maharashtra-gov-logo.png';
import sarkarLogo from '../assets/sarkar-setu-logo.jpg';
import {
  LogIn,
  UserPlus,
  Menu,
  X,
  Globe
} from 'lucide-react';

export function PublicLayout() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation items including Home
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Schemes', path: '/schemes' },
    { label: 'Evaluator', path: '/evaluator' },
    { label: 'Pilot', path: '/pilot' },
    { label: 'Eligibility', path: '/eligibility' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      {/* Top Accent Gradient Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-orange-600 via-zinc-950 dark:via-zinc-800 to-orange-500" />

      {/* Unified Government Navigation Bar (Wide & Merged) */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 shadow-subtle transition-colors duration-200">
        <div className="w-full px-4 sm:px-6 lg:px-8 2xl:px-10 min-h-[92px] sm:min-h-[100px] py-3.5 sm:py-4 flex items-center justify-between gap-3 lg:gap-5">
          {/* Left: Maharashtra Government Emblem & Sarkar Setu Brand */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            {/* Government of Maharashtra Official Emblem */}
            <Link to="/" className="flex items-center gap-2 group shrink-0" title="Government of Maharashtra | महाराष्ट्र शासन">
              <div className="bg-white px-3 py-1.5 rounded-xl shadow-xs border border-zinc-200/80 dark:border-zinc-700/60 flex items-center">
                <img
                  src={maharashtraLogo}
                  alt="Government of Maharashtra | महाराष्ट्र शासन"
                  className="h-9 sm:h-10 w-auto object-contain"
                />
              </div>
            </Link>

            {/* Subtle Vertical Divider */}
            <div className="h-10 w-px bg-zinc-200 dark:bg-zinc-700 hidden sm:block" />

            {/* Sarkar Setu Logo & Identity */}
            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <img
                src={sarkarLogo}
                alt="Sarkar Setu"
                className="w-10 h-10 sm:w-11 sm:h-11 object-contain rounded-full shadow-xs ring-1 ring-zinc-200 dark:ring-zinc-700 group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className="font-black text-lg sm:text-xl text-zinc-950 dark:text-white tracking-tight leading-none whitespace-nowrap">
                  Sarkar Setu
                </span>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-semibold tracking-wide mt-1 hidden lg:block whitespace-nowrap">
                  Pilot • Evaluate • Scale
                </span>
              </div>
            </Link>
          </div>

          {/* Middle: Important Navigation Buttons */}
          <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1.5 shrink-0">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all select-none ${
                    isActive
                      ? 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 shadow-2xs'
                      : 'text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60 border border-transparent'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Language Selector, Theme Toggle & Login/Register Buttons */}
          <div className="hidden sm:flex items-center gap-2 sm:gap-2.5 lg:gap-3 shrink-0">
            {/* Language Selector */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 px-3 py-2 rounded-xl bg-zinc-100/80 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/60 shrink-0">
              <Globe className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0" />
              <button type="button" className="font-bold text-zinc-900 dark:text-zinc-100 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                मराठी
              </button>
              <span className="text-zinc-300 dark:text-zinc-600">|</span>
              <button type="button" className="text-orange-600 dark:text-orange-400 font-extrabold hover:underline">
                English
              </button>
            </div>

            <ThemeToggle className="py-2 px-2.5 sm:px-3" />

            {/* Login Button */}
            <Link to="/login">
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<LogIn className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />}
                className="font-black px-3.5 sm:px-4 py-2 text-xs dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-700"
              >
                Login
              </Button>
            </Link>

            {/* Register Button (Direct link for Startups) */}
            <Link to="/register">
              <Button
                variant="primary"
                size="sm"
                leftIcon={<UserPlus className="w-4 h-4" />}
                className="font-black px-3.5 sm:px-4 py-2 text-xs shadow-xs"
              >
                Register
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button & Theme Toggle */}
          <div className="xl:hidden flex items-center gap-2">
            <div className="sm:hidden">
              <ThemeToggle />
            </div>
            <Link to="/login" className="sm:hidden">
              <Button variant="secondary" size="sm" className="px-2.5 py-1 text-xs font-bold dark:bg-zinc-800 dark:border-zinc-700">
                Login
              </Button>
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="xl:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 pt-3 pb-6 space-y-3 shadow-lg">
            {/* Mobile Language Selector */}
            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 text-xs">
              <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300 font-medium">
                <Globe className="w-4 h-4 text-orange-600" />
                <span>भाषा / Language:</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-zinc-900 dark:text-white">मराठी</span>
                <span className="text-zinc-300 dark:text-zinc-600">|</span>
                <span className="font-extrabold text-orange-600">English</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-black transition-colors select-none ${
                      isActive
                        ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/60'
                        : 'text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Login & Register Options */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
              <Link to="/login" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="secondary" size="md" className="w-full font-black dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" leftIcon={<LogIn className="w-4 h-4" />}>
                  Login
                </Button>
              </Link>

              <Link to="/register" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="primary" size="md" className="w-full font-black" leftIcon={<UserPlus className="w-4 h-4" />}>
                  Register
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
