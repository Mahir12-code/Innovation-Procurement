import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ClipboardList,
  Inbox,
  ShieldCheck,
  ClipboardCheck,
  BadgeCheck,
  Rocket,
  AlertTriangle,
  ListTodo,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { cn } from '../../utils/cn';

const ICON_MAP = {
  ClipboardList,
  Inbox,
  ShieldCheck,
  ClipboardCheck,
  BadgeCheck,
  Rocket,
  AlertTriangle,
  ListTodo
};

export function GovernmentDashboardCard({
  title,
  count,
  contextLabel,
  iconName,
  route,
  requiresAttention = false,
  attentionBadge,
  tooltip,
  className
}) {
  const navigate = useNavigate();
  const IconComponent = ICON_MAP[iconName] || ClipboardList;

  const handleClick = () => {
    if (route) {
      navigate(route);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      title={tooltip || title}
      aria-label={`${title}: ${count}. ${contextLabel || ''}`}
      className={cn(
        'group relative bg-white dark:bg-zinc-900 rounded-xl border p-5 transition-all duration-150 select-none cursor-pointer text-left flex flex-col justify-between',
        'hover:-translate-y-0.5 hover:shadow-xs focus:outline-none focus:ring-2 focus:ring-orange-500/50',
        requiresAttention
          ? 'border-amber-200/90 dark:border-amber-800/60 bg-gradient-to-br from-white to-amber-50/20 dark:from-zinc-900 dark:to-amber-950/20 hover:border-amber-400 dark:hover:border-amber-600'
          : 'border-zinc-200/90 dark:border-zinc-800 hover:border-orange-500/50',
        className
      )}
    >
      {/* Card Header: Title & Icon */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1 pr-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 line-clamp-1">
              {title}
            </h4>
            <div className="text-3xl font-black text-zinc-950 dark:text-white tracking-tight pt-0.5">
              {count}
            </div>
          </div>

          <div
            className={cn(
              'p-2.5 rounded-lg border shrink-0 group-hover:scale-105 transition-transform',
              requiresAttention
                ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800/60'
                : 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border-orange-200/60 dark:border-orange-800/60'
            )}
          >
            <IconComponent className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Card Footer: Contextual Label / Attention Status */}
      <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs gap-2">
        <div className="flex items-center gap-1.5 font-medium min-w-0">
          {requiresAttention && attentionBadge ? (
            <span className="inline-flex items-center gap-1 text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md text-[11px] font-bold border border-amber-200 dark:border-amber-800/60 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              {attentionBadge}
            </span>
          ) : (
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium truncate">
              {contextLabel}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0 text-zinc-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
}
