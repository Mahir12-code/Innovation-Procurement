import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export const Textarea = forwardRef(function Textarea(
  {
    label,
    error,
    helperText,
    className,
    id,
    rows = 3,
    disabled = false,
    required = false,
    ...props
  },
  ref
) {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 tracking-wide"
        >
          {label}
          {required && <span className="text-rose-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative rounded-md shadow-sm">
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          disabled={disabled}
          className={cn(
            'block w-full rounded-xl border text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 bg-white dark:bg-zinc-900 transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500',
            'disabled:bg-zinc-100 dark:disabled:bg-zinc-800 disabled:text-zinc-400 disabled:cursor-not-allowed',
            'p-3',
            error
              ? 'border-rose-400 text-rose-900 dark:text-rose-300 focus:ring-rose-500 focus:border-rose-500'
              : 'border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600',
            className
          )}
          {...props}
        />
      </div>

      {error && <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">{error}</p>}
      {!error && helperText && <p className="text-xs text-zinc-500 dark:text-zinc-400">{helperText}</p>}
    </div>
  );
});
