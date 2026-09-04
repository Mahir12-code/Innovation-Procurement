import React from 'react';
import maharashtraLogo from '../../assets/maharashtra-gov-logo.png';
import { Globe } from 'lucide-react';

export function GovHeaderBar() {
  return (
    <div className="bg-white dark:bg-zinc-950 border-b border-zinc-200/90 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4">
        {/* Left: Government of Maharashtra Emblem & Text */}
        <div className="flex items-center gap-3">
          <img
            src={maharashtraLogo}
            alt="Government of Maharashtra | महाराष्ट्र शासन"
            className="h-9 sm:h-10 w-auto object-contain brightness-100 dark:brightness-110"
          />
        </div>

        {/* Right: Language Selector */}
        <div className="flex items-center gap-2 text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">
          <Globe className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
          <span className="font-bold text-zinc-900 dark:text-zinc-100">मराठी</span>
          <span className="text-zinc-300 dark:text-zinc-700">|</span>
          <span className="text-orange-600 dark:text-orange-400 font-extrabold">English</span>
        </div>
      </div>
    </div>
  );
}
