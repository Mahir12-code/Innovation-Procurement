import React from 'react';
import { Calendar, Users, Building, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

export function ChallengeCard({
  title,
  department,
  applicationsReceived,
  deadline,
  status = 'Open',
  onView
}) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/90 dark:border-zinc-800 p-5 flex flex-col justify-between transition-all duration-150 hover:border-orange-500/40 hover:shadow-xs">
      <div className="space-y-3">
        {/* Top Status and Dept */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {status}
          </span>
          <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-zinc-400" />
            {applicationsReceived} Apps
          </span>
        </div>

        {/* Title */}
        <h4 className="font-bold text-sm text-zinc-950 dark:text-white line-clamp-2 leading-snug">
          {title}
        </h4>

        {/* Department */}
        <div className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400">
          <Building className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          <span className="truncate">{department}</span>
        </div>
      </div>

      {/* Footer Info & View Button */}
      <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <span>Deadline:</span>
          <span className="font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-orange-600" />
            {deadline}
          </span>
        </div>

        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={onView}
          className="w-full text-xs font-bold border-zinc-200 dark:border-zinc-700 hover:border-orange-500 hover:text-orange-600 justify-center"
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
        >
          View Challenge
        </Button>
      </div>
    </div>
  );
}
