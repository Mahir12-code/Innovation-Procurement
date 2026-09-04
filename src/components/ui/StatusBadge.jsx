import React from 'react';
import { cn } from '../../utils/cn';

const statusMap = {
  // Live Pilots & Tests
  on_track: { label: 'On Track', color: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/60', dot: 'bg-emerald-500' },
  completed: { label: 'Passed & Validated', color: 'bg-zinc-900 dark:bg-zinc-800 text-white border-black dark:border-zinc-700', dot: 'bg-orange-500' },
  at_risk: { label: 'Needs Attention', color: 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/60', dot: 'bg-amber-500' },
  delayed: { label: 'Delayed', color: 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-200/80 dark:border-rose-800/60', dot: 'bg-rose-500' },

  // Challenges
  in_pilot: { label: 'Live in Field', color: 'bg-orange-50 dark:bg-orange-950/40 text-orange-900 dark:text-orange-300 border-orange-200/80 dark:border-orange-800/60', dot: 'bg-orange-600' },
  evaluation: { label: 'Expert Review', color: 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/60', dot: 'bg-amber-500' },
  validation: { label: 'Third-Party Check', color: 'bg-zinc-900 dark:bg-zinc-800 text-white border-zinc-900 dark:border-zinc-700', dot: 'bg-orange-500' },
  open_for_applications: { label: 'Open for Startups', color: 'bg-orange-50 dark:bg-orange-950/40 text-orange-900 dark:text-orange-300 border-orange-200/80 dark:border-orange-800/60', dot: 'bg-orange-600' },
  scale_up_approved: { label: 'Ready to Scale', color: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/60', dot: 'bg-emerald-600' },

  // Step Statuses
  active_step: { label: 'In Progress', color: 'bg-orange-50 dark:bg-orange-950/40 text-orange-900 dark:text-orange-300 border-orange-200/80 dark:border-orange-800/60', dot: 'bg-orange-600' },
  completed_step: { label: 'Completed', color: 'bg-zinc-900 dark:bg-zinc-800 text-white border-black dark:border-zinc-700', dot: 'bg-emerald-400' },
  upcoming_step: { label: 'Upcoming', color: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700', dot: 'bg-zinc-400' },

  // Generic fallback
  active: { label: 'Active', color: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/60', dot: 'bg-emerald-500' },
  pending: { label: 'Pending', color: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700', dot: 'bg-zinc-400' },
};

export function StatusBadge({ status, label, className }) {
  const conf = statusMap[status] || {
    label: label || status || 'Active',
    color: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700',
    dot: 'bg-zinc-400'
  };

  const displayLabel = label || conf.label;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border transition-colors',
        conf.color,
        className
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full shrink-0 animate-pulse', conf.dot)} />
      <span>{displayLabel}</span>
    </span>
  );
}
