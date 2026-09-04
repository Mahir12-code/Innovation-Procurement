import React from 'react';
import { cn } from '../../utils/cn';

export function PageHeader({
  title,
  description,
  badge,
  breadcrumbs = [],
  actions,
  className,
}) {
  return (
    <div className={cn('space-y-2 pb-6 border-b border-zinc-200 dark:border-zinc-800', className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {crumb.href ? (
                <a href={crumb.href} className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  {crumb.label}
                </a>
              ) : (
                <span className="text-zinc-900 dark:text-zinc-100 font-bold">{crumb.label}</span>
              )}
              {idx < breadcrumbs.length - 1 && <span>/</span>}
            </React.Fragment>
          ))}
        </nav>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-white tracking-tight">
              {title}
            </h1>
            {badge && <div>{badge}</div>}
          </div>
          {description && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-3xl font-medium">
              {description}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-2.5 shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
