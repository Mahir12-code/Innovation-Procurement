import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { ChevronDown } from 'lucide-react';

export const Select = forwardRef(function Select(
  {
    label,
    options = [],
    error,
    helperText,
    className,
    id,
    disabled = false,
    required = false,
    placeholder = 'Select an option',
    children,
    ...props
  },
  ref
) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 tracking-wide"
        >
          {label}
          {required && <span className="text-rose-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative rounded-md shadow-sm">
        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          className={cn(
            'block w-full appearance-none rounded-xl border text-sm text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-900 transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500',
            'disabled:bg-zinc-100 dark:disabled:bg-zinc-800 disabled:text-zinc-400 disabled:cursor-not-allowed',
            'pl-3.5 pr-9 py-2.5',
            error
              ? 'border-rose-400 text-rose-900 dark:text-rose-300 focus:ring-rose-500 focus:border-rose-500'
              : 'border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="text-zinc-400">
              {placeholder}
            </option>
          )}
          {options.map((opt) => {
            const isObj = typeof opt === 'object';
            const value = isObj ? opt.value : opt;
            const text = isObj ? opt.label : opt;
            return (
              <option key={value} value={value}>
                {text}
              </option>
            );
          })}
          {children}
        </select>

        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-500">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {error && <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">{error}</p>}
      {!error && helperText && <p className="text-xs text-zinc-500 dark:text-zinc-400">{helperText}</p>}
    </div>
  );
});
