import React, { useState } from 'react';
import {
  Coins,
  Building2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Award,
  Filter,
  Search,
  BookOpen
} from 'lucide-react';
import { useStartupPortal } from '../../context/StartupPortalContext';

export function StartupSchemesPage() {
  const { schemes } = useStartupPortal();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'State Innovation Grant', 'Central Seed Fund', 'Market Access', 'DeepTech & R&D'];

  const filteredSchemes = schemes.filter((s) => {
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Header Banner */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/60">
              Government Innovation Schemes
            </span>
            <span className="text-xs text-zinc-500 font-medium">
              Financial Grants & Sandbox Subsidies
            </span>
          </div>
          <h1 className="text-2xl font-black text-zinc-950 dark:text-white tracking-tight">
            Schemes, Grants & Financial Incentives
          </h1>
          <p className="text-xs text-zinc-500 max-w-xl">
            Explore dedicated government innovation grants, seed funds, and GeM procurement tracks
            available for DPIIT-recognized startups in Maharashtra.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search schemes by name, agency, or grant type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs focus:ring-2 focus:ring-orange-500 outline-none text-zinc-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-all space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                  {scheme.category}
                </span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5" />
                  {scheme.maxGrant}
                </span>
              </div>

              <h2 className="text-base font-bold text-zinc-950 dark:text-white leading-snug">
                {scheme.title}
              </h2>

              <p className="text-xs text-zinc-500 flex items-center gap-1.5 font-medium">
                <Building2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                {scheme.agency}
              </p>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {scheme.description}
              </p>

              <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-600 dark:text-zinc-300 space-y-1">
                <span className="font-bold text-zinc-800 dark:text-zinc-200 block">Eligibility:</span>
                <p>{scheme.eligibility}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> DPIIT Rule 170 Compliant
              </span>

              <a
                href={scheme.portalUrl || 'https://msins.in'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors inline-flex items-center gap-1.5"
              >
                Official Portal <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
