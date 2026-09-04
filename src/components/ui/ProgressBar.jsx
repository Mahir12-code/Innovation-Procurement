import React from 'react';
import { cn } from '../../utils/cn';

const colorStyles = {
  primary: 'bg-orange-600',
  orange: 'bg-orange-600',
  black: 'bg-zinc-950 dark:bg-orange-500',
  accent: 'bg-orange-500',
  success: 'bg-emerald-600',
  warning: 'bg-amber-500',
  danger: 'bg-rose-500',
  info: 'bg-orange-600',
};

export function ProgressBar({
  value = 0,
  max = 100,
  color = 'primary',
  showLabel = false,
  label,
  height = 'h-2',
  className,
}) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div className={cn('w-full space-y-1.5', className)}>
      {(showLabel || label) && (
        <div className="flex items-center justify-between text-xs font-semibold text-zinc-600 dark:text-zinc-400">
          <span>{label}</span>
          <span className="font-extrabold text-zinc-950 dark:text-white">{percentage}%</span>
        </div>
      )}
      
      <div className={cn('w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden border border-zinc-200/60 dark:border-zinc-700', height)}>
        <div
          className={cn('h-full transition-all duration-500 ease-out rounded-full', colorStyles[color] || colorStyles.primary)}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
}
