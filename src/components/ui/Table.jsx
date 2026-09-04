import React from 'react';
import { cn } from '../../utils/cn';

export function Table({ children, className, ...props }) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
      <table
        className={cn('w-full text-left text-sm text-zinc-700 dark:text-zinc-300', className)}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children, className, ...props }) {
  return (
    <thead
      className={cn('bg-zinc-50 dark:bg-zinc-800/80 text-xs uppercase font-extrabold text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-800', className)}
      {...props}
    >
      {children}
    </thead>
  );
}

export function TableBody({ children, className, ...props }) {
  return (
    <tbody
      className={cn('divide-y divide-zinc-100 dark:divide-zinc-800 bg-white dark:bg-zinc-900', className)}
      {...props}
    >
      {children}
    </tbody>
  );
}

export function TableRow({ children, className, hoverable = true, ...props }) {
  return (
    <tr
      className={cn(
        'transition-colors',
        hoverable && 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50',
        className
      )}
      {...props}
    >
      {children}
    </tr>
  );
}

export function TableHead({ children, className, ...props }) {
  return (
    <th
      scope="col"
      className={cn('px-4 py-3.5 text-left font-extrabold text-zinc-800 dark:text-zinc-200 tracking-wider', className)}
      {...props}
    >
      {children}
    </th>
  );
}

export function TableCell({ children, className, ...props }) {
  return (
    <td
      className={cn('px-4 py-3.5 whitespace-nowrap text-zinc-700 dark:text-zinc-300 text-sm align-middle', className)}
      {...props}
    >
      {children}
    </td>
  );
}
