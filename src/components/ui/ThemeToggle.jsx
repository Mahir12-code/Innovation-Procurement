import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { cn } from '../../utils/cn';

export function ThemeToggle({ className, showLabel = true }) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleTheme();
      }}
      className={cn(
        'relative px-2 sm:px-2.5 py-1.5 rounded-xl border text-xs font-black transition-all duration-200 cursor-pointer select-none flex items-center gap-1.5 shadow-xs',
        isDark
          ? 'bg-zinc-900 border-zinc-700 text-orange-400 hover:bg-zinc-800 hover:text-orange-300'
          : 'bg-zinc-100 border-zinc-300 text-zinc-800 hover:bg-zinc-200 hover:text-zinc-950',
        className
      )}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Moon className="w-4 h-4 text-orange-400" />
        ) : (
          <Sun className="w-4 h-4 text-orange-600" />
        )}
      </div>
      {showLabel && (
        <span className="text-[11px] font-black uppercase tracking-wider hidden 2xl:inline">
          {isDark ? 'Dark' : 'Light'}
        </span>
      )}
    </button>
  );
}
