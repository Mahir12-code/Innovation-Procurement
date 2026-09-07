import React from 'react';
import {
  Cpu,
  Building,
  MapPin,
  ExternalLink,
  Shield,
  Layers,
  Wrench
} from 'lucide-react';
import { MAHARASHTRA_INCUBATORS } from '../../data/startupSchemesData';

export function IncubatorsSection() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/40 px-2.5 py-0.5 rounded-md border border-teal-200 dark:border-teal-800/60">
              State Prototyping & Incubation Infrastructure
            </span>
          </div>
          <h2 className="text-2xl font-black text-zinc-950 dark:text-white tracking-tight">
            Government & Academic Incubator Network
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-2xl">
            Maharashtra boasts one of India's largest state-supported incubation ecosystems, providing subsidised co-working, maker spaces, testing testbeds, and seed grants across key regional hubs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {MAHARASHTRA_INCUBATORS.map((inc) => (
          <div
            key={inc.id}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs hover:shadow-card-hover hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800 flex items-center justify-center shrink-0">
                  <Cpu className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                </div>
                <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                  <MapPin className="w-3 h-3 text-zinc-400" />
                  {inc.location}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-black text-zinc-950 dark:text-white leading-snug">
                  {inc.name}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">
                  {inc.institution}
                </p>
              </div>

              <div className="p-2.5 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200/80 dark:border-zinc-800 text-[11px] text-zinc-600 dark:text-zinc-300 space-y-1">
                <span className="font-bold text-zinc-800 dark:text-zinc-200 block">
                  Support & Backing:
                </span>
                <p>{inc.supportedBy}</p>
              </div>

              {/* Focus Sectors */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">
                  Focus Sectors:
                </span>
                <div className="flex flex-wrap gap-1">
                  {inc.focusSectors.map((sector, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-700/60"
                    >
                      {sector}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Facilities */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                  <Wrench className="w-3 h-3 text-zinc-400" /> Facilities Available:
                </span>
                <div className="flex flex-wrap gap-1">
                  {inc.facilities.map((fac, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/40 px-2 py-0.5 rounded border border-teal-200/60 dark:border-teal-800/40"
                    >
                      {fac}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-zinc-500">
                Accredited Incubator
              </span>
              <a
                href={inc.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 inline-flex items-center gap-1 transition-colors"
              >
                Incubator Portal
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
