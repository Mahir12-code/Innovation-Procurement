import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { PORTAL_NAV_CONFIG } from '../../routes/navigation';
import { cn } from '../../utils/cn';

export function Sidebar({ isOpen, onClose, role = 'government' }) {
  const config = PORTAL_NAV_CONFIG[role] || PORTAL_NAV_CONFIG.government;
  const location = useLocation();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Panel: White in Light Mode, Deep Zinc in Dark Mode */}
      <aside
        className={cn(
          'fixed lg:sticky top-0 lg:top-16 z-40 lg:z-20 h-screen lg:h-[calc(100vh-4rem)] w-60 bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 flex flex-col justify-between border-r border-zinc-200 dark:border-zinc-800 transition-colors duration-150 ease-in-out shadow-xs lg:shadow-none shrink-0',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <nav className="space-y-1">
            {config.items.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className={({ isActive: isCurrent }) =>
                    cn(
                      'group flex items-center gap-3 px-3 py-2.5 text-xs font-semibold transition-all duration-150 rounded-xl',
                      isCurrent
                        ? 'bg-orange-50 dark:bg-orange-950/40 text-zinc-950 dark:text-white font-bold border-l-4 border-orange-600 rounded-l-none pl-2'
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-950 dark:hover:text-white'
                    )
                  }
                >
                  <Icon
                    className={cn(
                      'w-4 h-4 shrink-0 transition-colors',
                      isActive
                        ? 'text-orange-600 dark:text-orange-400'
                        : 'text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100'
                    )}
                  />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
