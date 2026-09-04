import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { GovHeaderBar } from '../components/layout/GovHeaderBar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import sarkarLogo from '../assets/sarkar-setu-logo.jpg';
import {
  LogIn,
  UserPlus,
  Menu,
  X
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
    { label: 'Initiatives by the Govt', path: '/initiatives' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      {/* 1. Official Government of Maharashtra Header Banner */}
      <GovHeaderBar />

      {/* 2. Top Gradient Bar in Orange & Black */}
      <div className="h-1 w-full bg-gradient-to-r from-orange-600 via-zinc-950 dark:via-zinc-800 to-orange-500" />

      {/* 3. Main Public Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 shadow-subtle transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          {/* Left: Sarkar Setu Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <img
              src={sarkarLogo}
              alt="Sarkar Setu — Pilot. Evaluate. Scale."
              className="w-10 h-10 object-contain rounded-full shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-700 group-hover:scale-105 transition-transform"
            />
            <div className="flex items-center gap-2">
              <span className="font-black text-lg text-zinc-950 dark:text-white tracking-tight">Sarkar Setu</span>
              <span className="text-[10px] font-extrabold tracking-wide px-2 py-0.5 bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800/60 rounded-full hidden sm:inline-block">
                Govt of Maharashtra
              </span>
            </div>
          </Link>

          {/* Middle: Important Navigation Buttons */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-xl text-xs font-black transition-all ${
                    isActive
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-orange-50/70 dark:hover:bg-orange-950/30'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Theme Toggle & Login/Register Buttons */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <ThemeToggle />

            {/* Login Button */}
            <Link to="/login">
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<LogIn className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-300" />}
                className="font-black dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-700"
              >
                Login
              </Button>
            </Link>

            {/* Register Button (Direct link for Startups) */}
            <Link to="/register">
              <Button
                variant="primary"
                size="sm"
                leftIcon={<UserPlus className="w-3.5 h-3.5" />}
                className="font-black shadow-sm"
              >
                Register
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button & Theme Toggle */}
          <div className="xl:hidden flex items-center gap-2">
            <ThemeToggle />
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
            <div className="grid grid-cols-1 gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-black transition-colors ${
                      isActive
                        ? 'bg-orange-600 text-white'
                        : 'text-zinc-800 dark:text-zinc-200 hover:bg-orange-50 dark:hover:bg-orange-950/40'
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
