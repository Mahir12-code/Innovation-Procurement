import React from 'react';
import {
  Building2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Rocket,
  Landmark,
  Shield,
  HeartHandshake,
  GraduationCap,
  Users,
  Coins,
  Cpu,
  Compass,
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

// Category / Badge Icon Mapping
export function getSchemeIcon(badge, category) {
  const normalized = (badge || category || '').toLowerCase();
  if (normalized.includes('pilot') || normalized.includes('market')) {
    return <Compass className="w-4 h-4 text-orange-600 dark:text-orange-400" />;
  }
  if (normalized.includes('women')) {
    return <Sparkles className="w-4 h-4 text-pink-600 dark:text-pink-400" />;
  }
  if (normalized.includes('acceleration') || normalized.includes('growth')) {
    return <Rocket className="w-4 h-4 text-violet-600 dark:text-violet-400" />;
  }
  if (normalized.includes('defence') || normalized.includes('aerospace')) {
    return <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
  }
  if (normalized.includes('social') || normalized.includes('impact')) {
    return <HeartHandshake className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
  }
  if (normalized.includes('student') || normalized.includes('youth')) {
    return <GraduationCap className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
  }
  if (normalized.includes('sc/st')) {
    return <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />;
  }
  if (normalized.includes('incubation')) {
    return <Cpu className="w-4 h-4 text-teal-600 dark:text-teal-400" />;
  }
  return <Coins className="w-4 h-4 text-orange-600 dark:text-orange-400" />;
}

export function StartupSchemeCard({ scheme, onViewDetails, isFeatured = false }) {
  const isCentral = scheme.governmentType.includes('Central Government');

  return (
    <div
      className={`group relative bg-white dark:bg-zinc-900 border rounded-2xl transition-all duration-200 flex flex-col justify-between ${
        isFeatured
          ? 'border-orange-200 dark:border-orange-900/60 shadow-md hover:shadow-xl hover:border-orange-300 dark:hover:border-orange-800 p-6 sm:p-7 bg-gradient-to-b from-orange-50/20 via-white to-white dark:from-zinc-900 dark:to-zinc-900'
          : 'border-zinc-200 dark:border-zinc-800 shadow-xs hover:shadow-card-hover hover:border-zinc-300 dark:hover:border-zinc-700 p-5 sm:p-6'
      }`}
    >
      <div className="space-y-4">
        {/* Top Badges Row */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Government Type Label */}
          <span
            className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg border ${
              isCentral
                ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300 border-sky-200 dark:border-sky-800/60'
                : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60'
            }`}
          >
            <Landmark className="w-3 h-3 shrink-0" />
            {scheme.governmentType}
          </span>

          {/* Primary Badge */}
          {scheme.badge && (
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-orange-700 dark:text-orange-300 bg-orange-100/70 dark:bg-orange-950/50 px-2.5 py-0.5 rounded-full border border-orange-200/80 dark:border-orange-800/50">
              {scheme.badge}
            </span>
          )}
        </div>

        {/* Header: Icon & Scheme Name */}
        <div className="flex items-start gap-3 pt-1">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-200 dark:border-zinc-700 shadow-2xs group-hover:scale-105 transition-transform">
            {getSchemeIcon(scheme.badge, scheme.category)}
          </div>
          <div className="flex-1 min-w-0">
            <h3
              onClick={() => onViewDetails && onViewDetails(scheme)}
              className={`font-black text-zinc-950 dark:text-white tracking-tight cursor-pointer hover:text-orange-600 dark:hover:text-orange-400 transition-colors line-clamp-2 ${
                isFeatured ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
              }`}
            >
              {scheme.schemeName}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 mt-1 font-medium truncate">
              <Building2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>{scheme.implementingAgency || scheme.department}</span>
            </p>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed line-clamp-3">
          {scheme.description}
        </p>

        {/* Highlight Callout */}
        {scheme.highlight && (
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200/80 dark:border-zinc-800 text-[11px] text-zinc-700 dark:text-zinc-200 font-medium flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
            <div className="leading-snug">
              <span className="font-bold text-zinc-900 dark:text-white">Highlight: </span>
              {scheme.highlight}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {scheme.tags.slice(0, 4).map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] font-semibold text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md border border-zinc-200 dark:border-zinc-700/60"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onViewDetails && onViewDetails(scheme)}
          className="text-xs font-black text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 inline-flex items-center gap-1 cursor-pointer transition-colors py-1.5"
        >
          View Details
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <a
          href={scheme.officialPortal}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 text-xs font-bold rounded-xl shadow-2xs transition-all"
        >
          Official Portal
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
