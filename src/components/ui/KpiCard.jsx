import React from 'react';
import { cn } from '../../utils/cn';
import { TrendingUp, TrendingDown, Minus, Target, FileText, Rocket, CheckCircle2, AlertCircle } from 'lucide-react';

const iconMap = {
  Target,
  FileText,
  Rocket,
  CheckCircle2,
  AlertCircle
};

const colorThemes = {
  orange: {
    iconBg: 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border-orange-200/80 dark:border-orange-800/60',
    topBar: 'bg-orange-600',
    pill: 'bg-orange-50 dark:bg-orange-950/40 text-orange-800 dark:text-orange-300 border-orange-200/60 dark:border-orange-800/60',
  },
  blue: { // mapped to electric orange
    iconBg: 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border-orange-200/80 dark:border-orange-800/60',
    topBar: 'bg-orange-600',
    pill: 'bg-orange-50 dark:bg-orange-950/40 text-orange-800 dark:text-orange-300 border-orange-200/60 dark:border-orange-800/60',
  },
  black: {
    iconBg: 'bg-zinc-900 text-white border-zinc-700',
    topBar: 'bg-zinc-950 dark:bg-orange-500',
    pill: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-300 dark:border-zinc-700',
  },
  emerald: {
    iconBg: 'bg-zinc-900 text-orange-400 border-black',
    topBar: 'bg-zinc-900 dark:bg-orange-500',
    pill: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/60',
  },
  amber: {
    iconBg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200/80 dark:border-amber-800/60',
    topBar: 'bg-amber-500',
    pill: 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200/60 dark:border-amber-800/60',
  },
  rose: {
    iconBg: 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border-rose-200/80 dark:border-rose-800/60',
    topBar: 'bg-rose-600',
    pill: 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-200/60 dark:border-rose-800/60',
  }
};

export function KpiCard({
  title,
  value,
  change,
  trend = 'neutral',
  subtitle,
  icon,
  color = 'orange',
  className,
}) {
  const IconComponent = typeof icon === 'string' ? iconMap[icon] || Target : icon;
  const theme = colorThemes[color] || colorThemes.orange;

  return (
    <div
      className={cn(
        'relative bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 shadow-card p-6 overflow-hidden transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5',
        className
      )}
    >
      {/* Top Accent Stripe */}
      <div className={cn('absolute top-0 left-0 right-0 h-1', theme.topBar)} />

      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{title}</p>
          <div className="flex items-baseline gap-2 pt-1">
            <h3 className="text-3xl font-black text-zinc-950 dark:text-white tracking-tight">{value}</h3>
          </div>
        </div>

        {IconComponent && (
          <div className={cn('p-3 rounded-xl border shrink-0', theme.iconBg)}>
            {React.isValidElement(IconComponent) ? (
              IconComponent
            ) : (
              <IconComponent className="w-5 h-5" />
            )}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs">
        {change && (
          <div className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border font-bold', theme.pill)}>
            {trend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
            {trend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0" />}
            {trend === 'alert' && <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />}
            {trend === 'neutral' && <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shrink-0" />}
            <span>{change}</span>
          </div>
        )}
        {subtitle && (
          <span className="text-zinc-400 dark:text-zinc-500 font-medium truncate">{subtitle}</span>
        )}
      </div>
    </div>
  );
}
