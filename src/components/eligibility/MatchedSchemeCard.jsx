import React from 'react';
import {
  Building2,
  ExternalLink,
  ChevronRight,
  Landmark,
  Award,
  Users,
  CheckCircle2,
  AlertCircle,
  Coins,
  ShieldCheck
} from 'lucide-react';
import { getSchemeIcon } from '../schemes/StartupSchemeCard';

export function MatchedSchemeCard({ scheme, onViewDetails }) {
  const badgeStyle = {
    Eligible:
      'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    'Potentially Eligible':
      'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    'Not Eligible':
      'bg-rose-50 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    'More Information Required':
      'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700'
  }[scheme.matchBadge || 'Eligible'];

  const isCentral = scheme.governmentType?.includes('Central Government');

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-card-hover hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between space-y-4">
      <div className="space-y-3.5">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Match Badge */}
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-black px-2.5 py-1 rounded-lg border shadow-2xs ${badgeStyle}`}
          >
            {scheme.matchBadge === 'Eligible' && <CheckCircle2 className="w-3.5 h-3.5" />}
            {scheme.matchBadge === 'Potentially Eligible' && <AlertCircle className="w-3.5 h-3.5" />}
            {scheme.matchBadge}
          </span>

          {/* Government Type */}
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded border ${
              isCentral
                ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300 border-sky-200 dark:border-sky-800/60'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
            }`}
          >
            <Landmark className="w-3 h-3" />
            {scheme.governmentType}
          </span>
        </div>

        {/* Header: Icon & Scheme Name */}
        <div className="flex items-start gap-3 pt-1">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-200 dark:border-zinc-700">
            {getSchemeIcon(scheme.badge, scheme.category)}
          </div>
          <div>
            <h3
              onClick={() => onViewDetails && onViewDetails(scheme)}
              className="font-black text-base text-zinc-950 dark:text-white tracking-tight cursor-pointer hover:text-orange-600 dark:hover:text-orange-400 transition-colors leading-snug"
            >
              {scheme.schemeName}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 mt-0.5 font-medium truncate">
              <Building2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>{scheme.department} • {scheme.implementingAgency}</span>
            </p>
          </div>
        </div>

        {/* Benefits & Max Assistance */}
        <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200/80 dark:border-zinc-800 space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
          <div className="flex items-start gap-2">
            <Coins className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-zinc-900 dark:text-white">Primary Benefit: </span>
              <span>{Array.isArray(scheme.benefits) ? scheme.benefits[0] : scheme.benefits}</span>
            </div>
          </div>

          {scheme.highlight && (
            <div className="text-[11px] text-zinc-500 dark:text-zinc-400 pt-1 border-t border-zinc-200/60 dark:border-zinc-700/60">
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">Financial Assistance: </span>
              {scheme.highlight}
            </div>
          )}
        </div>

        {/* Target Beneficiaries */}
        <div className="space-y-1 text-xs">
          <span className="font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1 text-[11px] uppercase tracking-wider text-zinc-400">
            <Users className="w-3 h-3" /> Target Beneficiaries:
          </span>
          <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed line-clamp-2">
            {scheme.targetBeneficiaries}
          </p>
        </div>

        {/* Eligibility Summary */}
        <div className="p-2.5 bg-orange-50/50 dark:bg-orange-950/20 rounded-xl border border-orange-200/60 dark:border-orange-900/40 text-[11px] text-orange-950 dark:text-orange-200 space-y-0.5">
          <span className="font-bold block">Eligibility Summary:</span>
          <p className="leading-snug">{scheme.eligibilitySummary}</p>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="pt-3.5 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onViewDetails && onViewDetails(scheme)}
          className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 inline-flex items-center gap-1 cursor-pointer transition-colors"
        >
          View Details
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <a
          href={scheme.officialPortal}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 text-xs font-bold rounded-xl shadow-2xs transition-all inline-flex items-center gap-1.5"
        >
          Apply / Official Portal
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
