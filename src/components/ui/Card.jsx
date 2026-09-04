import React from 'react';
import { cn } from '../../utils/cn';

export function Card({ children, className, ...props }) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-card hover:shadow-card-hover transition-all duration-200 text-zinc-900 dark:text-zinc-100',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }) {
  return (
    <div
      className={cn('px-6 py-4.5 border-b border-zinc-100 dark:border-zinc-800 flex flex-col gap-1', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children, className, ...props }) {
  return (
    <h3
      className={cn('text-base font-black text-zinc-950 dark:text-white tracking-tight flex items-center gap-2', className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ children, className, ...props }) {
  return (
    <p
      className={cn('text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed', className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({ children, className, ...props }) {
  return (
    <div className={cn('p-6', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }) {
  return (
    <div
      className={cn('px-6 py-3.5 bg-zinc-50/60 dark:bg-zinc-800/40 rounded-b-2xl border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-zinc-500 dark:text-zinc-400', className)}
      {...props}
    >
      {children}
    </div>
  );
}
