import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, FileText, CheckCircle2, Scale, Download } from 'lucide-react';

export function QuickActions({ onPostChallenge, onExportReport }) {
  const navigate = useNavigate();

  const actions = [
    {
      id: 'post-challenge',
      label: '+ Post New Challenge',
      icon: Plus,
      primary: true,
      onClick: onPostChallenge
    },
    {
      id: 'discover-startups',
      label: 'Discover Startups',
      icon: Search,
      onClick: () => navigate('/government/discovery')
    },
    {
      id: 'review-apps',
      label: 'Review Applications',
      icon: FileText,
      onClick: () => navigate('/government/applications')
    },
    {
      id: 'approve-pilot',
      label: 'Approve Pilot',
      icon: CheckCircle2,
      onClick: () => navigate('/government/pilots')
    },
    {
      id: 'review-procurement',
      label: 'Review Procurement',
      icon: Scale,
      onClick: () => navigate('/government/procurement')
    },
    {
      id: 'generate-report',
      label: 'Generate Report',
      icon: Download,
      onClick: onExportReport
    }
  ];

  return (
    <section aria-label="Quick Actions" className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Quick Actions
        </h3>
        <span className="text-[11px] text-zinc-400">
          Frequently used nodal operations
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              type="button"
              onClick={act.onClick}
              className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer text-center ${
                act.primary
                  ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-xs shadow-orange-600/30'
                  : 'bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-orange-500/40 hover:text-orange-600 dark:hover:text-orange-400'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{act.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
