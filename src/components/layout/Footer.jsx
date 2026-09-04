import React from 'react';
import { Link } from 'react-router-dom';
import sarkarLogo from '../../assets/sarkar-setu-logo.jpg';

export function Footer() {
  return (
    <footer className="bg-black text-zinc-400 text-xs border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={sarkarLogo}
                alt="Sarkar Setu"
                className="w-10 h-10 object-contain rounded-full shadow-sm ring-1 ring-zinc-800"
              />
              <span className="font-black text-white text-base tracking-tight">Sarkar Setu</span>
            </div>
            <p className="text-zinc-400 text-xs max-w-md leading-relaxed font-medium">
              Empowering government departments to discover, test in sandboxes, and rapidly scale groundbreaking innovations from verified Indian startups.
            </p>
            <div className="pt-1 flex items-center gap-2 text-[11px] text-zinc-500 font-medium">
              <span>Digital India Initiative</span>
              <span>•</span>
              <span>Government of India</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3">Portal Access</h4>
            <ul className="space-y-2 font-medium">
              <li>
                <Link to="/government/dashboard" className="hover:text-orange-400 transition-colors">
                  Government Officer Portal
                </Link>
              </li>
              <li>
                <Link to="/startup/dashboard" className="hover:text-orange-400 transition-colors">
                  Startup Innovation Desk
                </Link>
              </li>
              <li>
                <Link to="/expert/dashboard" className="hover:text-orange-400 transition-colors">
                  Technical Jury Panel
                </Link>
              </li>
              <li>
                <Link to="/admin/dashboard" className="hover:text-orange-400 transition-colors">
                  System Audit & Compliance
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3">Resources</h4>
            <ul className="space-y-2 font-medium">
              <li>
                <Link to="/how-it-works" className="hover:text-orange-400 transition-colors">
                  10-Stage Procurement Guide
                </Link>
              </li>
              <li>
                <Link to="/challenges" className="hover:text-orange-400 transition-colors">
                  Open Public Challenges
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-orange-400 transition-colors">
                  Officer Sign-In
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-orange-400 transition-colors">
                  DPIIT Startup Onboarding
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500 font-medium">
          <p>© {new Date().getFullYear()} Sarkar Setu. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="text-orange-400 font-mono font-bold">Phase 1 Sandbox Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
