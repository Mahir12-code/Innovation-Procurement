import React from 'react';
import { Check, Clock } from 'lucide-react';

const RECENT_ACTIVITIES = [
  {
    id: 'act-1',
    title: 'New startup application received',
    detail: 'AgriVision AI submitted proposal for Challenge #MH-2026-04 (Smart Traffic Monitoring)',
    timestamp: '12 mins ago',
    date: '04 Sep 2026'
  },
  {
    id: 'act-2',
    title: 'Expert review completed',
    detail: 'IIT Bombay Evaluation Panel scored UrbanGrid Tech proposal (88/100, Recommended)',
    timestamp: '1 hour ago',
    date: '04 Sep 2026'
  },
  {
    id: 'act-3',
    title: 'Pilot milestone submitted',
    detail: 'Smart Water Monitoring uploaded Tranche-2 IoT sensor telemetry and field inspection logs',
    timestamp: '3 hours ago',
    date: '04 Sep 2026'
  },
  {
    id: 'act-4',
    title: 'Challenge posted',
    detail: 'Decentralized Solar Microgrid & Water Purifier RFP published by Water Resources Dept',
    timestamp: 'Yesterday, 04:30 PM',
    date: '03 Sep 2026'
  },
  {
    id: 'act-5',
    title: 'Procurement decision updated',
    detail: 'Direct scale-up purchase sanction approved for MedVitals AI (Clinical Audit Cleared)',
    timestamp: '02 Sep 2026',
    date: '02 Sep 2026'
  }
];

export function RecentActivity() {
  return (
    <section aria-label="Recent Activity" className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/90 dark:border-zinc-800 p-6 space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <h3 className="text-base font-bold text-zinc-950 dark:text-white">
            Recent Activity
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Audit-logged timeline of incoming submissions, evaluations, and scale-up sanctions
          </p>
        </div>
        <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 hidden sm:inline">
          Last updated: Just now
        </span>
      </div>

      {/* 5 Activities List */}
      <div className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
        {RECENT_ACTIVITIES.map((item) => (
          <div
            key={item.id}
            className="py-3.5 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:bg-zinc-50/60 dark:hover:bg-zinc-800/30 -mx-3 px-3 rounded-lg transition-colors"
          >
            <div className="flex items-start gap-3">
              {/* Checkmark Icon in Emerald */}
              <div className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 stroke-[2.5]" />
              </div>

              <div>
                <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  {item.title}
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {item.detail}
                </p>
              </div>
            </div>

            {/* Time / Date on Right */}
            <div className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 shrink-0 self-start sm:self-center pl-8 sm:pl-0 flex items-center gap-1">
              <Clock className="w-3 h-3 text-zinc-400" />
              <span>{item.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
