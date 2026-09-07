import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  ExternalLink,
  Settings,
  Building2,
  FileCheck,
  Globe
} from 'lucide-react';
import maharashtraLogo from '../../assets/maharashtra-gov-logo.png';
import { ThemeToggle } from '../ui/ThemeToggle';
import sarkarLogo from '../../assets/sarkar-setu-logo.jpg';
import { CURRENT_OFFICER } from '../../data/mockData';

export function Navbar({ onMenuToggle, isSidebarOpen, portalRole = 'government' }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const isStartup = portalRole === 'startup';

  return (
    <div className="sticky top-0 z-30 flex flex-col">
      {/* Top Accent Strip */}
      <div className="h-1 w-full bg-gradient-to-r from-orange-600 via-zinc-950 dark:via-zinc-800 to-orange-500" />

      {/* Main Unified Navigation Bar */}
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shadow-xs transition-colors duration-200">
        <div className="px-4 sm:px-6 lg:px-8 min-h-[74px] sm:min-h-[80px] py-2.5 flex items-center justify-between gap-4">
          {/* Left: Mobile Toggle & Maharashtra Emblem & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Government of Maharashtra Official Emblem */}
            <div className="hidden sm:flex bg-white px-2.5 py-1 rounded-xl shadow-2xs border border-zinc-200/80 dark:border-zinc-700/60 items-center">
              <img
                src={maharashtraLogo}
                alt="Government of Maharashtra | महाराष्ट्र शासन"
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </div>

            <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-700 hidden sm:block" />

            <Link
              to={isStartup ? "/startup/dashboard" : "/government/dashboard"}
              className="flex items-center gap-2.5 group shrink-0"
            >
              <img
                src={sarkarLogo}
                alt="Sarkar Setu"
                className="w-10 h-10 object-contain rounded-full shadow-xs ring-1 ring-zinc-200 dark:ring-zinc-700 group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className="font-black text-base text-zinc-950 dark:text-white tracking-tight leading-none">
                  Sarkar Setu
                </span>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium tracking-wide mt-1 hidden md:inline">
                  {isStartup ? 'Startup Innovation Desk • DPIIT Portal' : 'Innovations for a Stronger Bharat'}
                </span>
              </div>
            </Link>
          </div>

          {/* Right Actions: Language Selector, Theme Toggle, Notifications, Officer/Startup Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector */}
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 px-2 py-1 rounded-xl bg-zinc-100/80 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/60">
              <Globe className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400 shrink-0" />
              <button type="button" className="font-bold text-zinc-900 dark:text-zinc-100 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                मराठी
              </button>
              <span className="text-zinc-300 dark:text-zinc-600">|</span>
              <button type="button" className="text-orange-600 dark:text-orange-400 font-extrabold hover:underline">
                English
              </button>
            </div>

            {/* Theme Toggle Button */}
            <ThemeToggle />


            {/* Profile Avatar & Info Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2.5 p-1 sm:px-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center text-xs font-black shadow-xs">
                  {isStartup ? 'PD' : CURRENT_OFFICER.initials}
                </div>
                <div className="text-left hidden md:block">
                  <div className="text-xs font-bold text-zinc-950 dark:text-zinc-100 leading-tight">
                    {isStartup ? 'Pooja Deshmukh' : CURRENT_OFFICER.name}
                  </div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight font-medium">
                    {isStartup ? 'AquaSense (STU-94821)' : CURRENT_OFFICER.role}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400 hidden md:block" />
              </button>

              {showUserMenu && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white dark:bg-zinc-900 rounded-2xl shadow-dropdown border border-zinc-200 dark:border-zinc-800 p-2 z-50 animate-in fade-in"
                  onMouseLeave={() => setShowUserMenu(false)}
                >
                  <div className="px-3 py-2.5 border-b border-zinc-100 dark:border-zinc-800">
                    <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                      {isStartup ? 'AquaSense Innovations Pvt Ltd' : CURRENT_OFFICER.name}
                    </p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono truncate">
                      {isStartup ? 'pooja.deshmukh@aquasense.io' : CURRENT_OFFICER.email}
                    </p>
                    <span className="inline-block mt-1 text-[10px] font-semibold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 px-2 py-0.5 rounded">
                      {isStartup ? 'DPIIT DIPP94821 • TRL 7' : CURRENT_OFFICER.role}
                    </span>
                  </div>
                  <div className="py-1">
                    {isStartup ? (
                      <>
                        <Link
                          to="/startup/profile"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl font-medium"
                        >
                          <Building2 className="w-4 h-4 text-zinc-400" />
                          Company Profile
                        </Link>
                        <Link
                          to="/startup/documents"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl font-medium"
                        >
                          <FileCheck className="w-4 h-4 text-zinc-400" />
                          Document Vault
                        </Link>
                      </>
                    ) : (
                      <Link
                        to="/government/settings"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl font-medium"
                      >
                        <Settings className="w-4 h-4 text-zinc-400" />
                        Settings & Preferences
                      </Link>
                    )}
                    <Link
                      to="/login"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
