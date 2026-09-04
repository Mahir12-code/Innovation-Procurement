import React from 'react';
import { cn } from '../../utils/cn';

const variantStyles = {
  default: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700',
  primary: 'bg-orange-50 dark:bg-orange-950/40 text-orange-800 dark:text-orange-300 border-orange-200/80 dark:border-orange-800/60',
  black: 'bg-zinc-950 dark:bg-zinc-800 text-white border-zinc-800 dark:border-zinc-700',
  accent: 'bg-orange-500 text-white border-orange-600',
  success: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60',
  warning: 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/60',
  danger: 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800/60',
  outline: 'bg-transparent text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700',
};

const sizeStyles = {
  sm: 'text-[10px] px-2 py-0.5 font-bold',
  md: 'text-xs px-2.5 py-1 font-bold',
  lg: 'text-sm px-3 py-1.5 font-extrabold',
};

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
  ...props
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border',
        variantStyles[variant] || variantStyles.default,
        sizeStyles[size] || sizeStyles.md,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
