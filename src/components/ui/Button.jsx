import React from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

const variantStyles = {
  primary: 'bg-orange-600 text-white hover:bg-orange-700 active:bg-orange-800 focus-visible:ring-orange-500 shadow-sm shadow-orange-600/25',
  black: 'bg-zinc-950 dark:bg-zinc-800 text-white hover:bg-zinc-800 dark:hover:bg-zinc-700 active:bg-zinc-900 focus-visible:ring-zinc-700 shadow-sm border border-transparent dark:border-zinc-700',
  secondary: 'bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-300 active:bg-zinc-100 focus-visible:ring-orange-500 shadow-subtle',
  emerald: 'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 focus-visible:ring-emerald-500 shadow-sm',
  outline: 'border border-orange-600 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/40 active:bg-orange-100 focus-visible:ring-orange-500',
  ghost: 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white active:bg-zinc-200 focus-visible:ring-zinc-400',
  danger: 'bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 focus-visible:ring-rose-500 shadow-sm shadow-rose-500/20',
  subtle: 'bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/60 active:bg-orange-200 focus-visible:ring-orange-400 font-semibold',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-xs font-bold rounded-lg gap-1.5',
  md: 'px-4 py-2 text-sm font-bold rounded-xl gap-2',
  lg: 'px-5 py-2.5 text-base font-extrabold rounded-xl gap-2.5',
};

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  disabled = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  type = 'button',
  onClick,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer',
        variantStyles[variant] || variantStyles.primary,
        sizeStyles[size] || sizeStyles.md,
        className
      )}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : leftIcon ? (
        <span className="shrink-0">{leftIcon}</span>
      ) : null}
      
      {children}

      {!isLoading && rightIcon && (
        <span className="shrink-0">{rightIcon}</span>
      )}
    </button>
  );
}
