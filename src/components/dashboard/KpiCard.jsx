import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export function KpiCard({
  title,
  value,
  indicator,
  trend = 'neutral',
  icon: Icon,
  onClick,
  href,
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/90 dark:border-zinc-800 p-5 transition-all duration-150',
        onClick || href
          ? 'cursor-pointer hover:border-orange-500/50 hover:shadow-xs'
          : ''
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {title}
          </p>
          <div className="text-3xl font-black text-zinc-950 dark:text-white tracking-tight pt-0.5">
            {value}
          </div>
        </div>

        {Icon && (
          <div className="p-2.5 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200/60 dark:border-orange-800/60 shrink-0 group-hover:scale-105 transition-transform">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-medium">
          {trend === 'up' && (
            <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md text-[11px] font-bold border border-emerald-200/60 dark:border-emerald-800/60">
              <TrendingUp className="w-3 h-3 shrink-0" />
              {indicator}
            </span>
          )}
          {trend === 'alert' && (
            <span className="inline-flex items-center gap-1 text-amber-800 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md text-[11px] font-bold border border-amber-200/60 dark:border-amber-800/60">
              <AlertCircle className="w-3 h-3 shrink-0" />
              {indicator}
            </span>
          )}
          {trend === 'down' && (
            <span className="inline-flex items-center gap-1 text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-md text-[11px] font-bold border border-rose-200/60 dark:border-rose-800/60">
              <TrendingDown className="w-3 h-3 shrink-0" />
              {indicator}
            </span>
          )}
          {trend === 'neutral' && (
            <span className="inline-flex items-center gap-1 text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md text-[11px] font-medium border border-zinc-200 dark:border-zinc-700">
              {indicator}
            </span>
          )}
        </div>

        {(onClick || href) && (
          <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all" />
        )}
      </div>
    </div>
  );
}
