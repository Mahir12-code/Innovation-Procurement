import React from 'react';
import {
  Building2,
  Calendar,
  IndianRupee,
  Sparkles,
  GitFork,
  FileBadge2,
  Info,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { ELIGIBILITY_CRITERIA_DEFINITIONS } from '../../data/startupEligibilityRules';

export function EligibilityCriteriaCards() {
  const getIcon = (id) => {
    switch (id) {
      case 'crit-business-reg':
        return <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'crit-startup-age':
        return <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />;
      case 'crit-turnover':
        return <IndianRupee className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'crit-innovation':
        return <Sparkles className="w-5 h-5 text-violet-600 dark:text-violet-400" />;
      case 'crit-original-business':
        return <GitFork className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'crit-dpiit-recognition':
        return <FileBadge2 className="w-5 h-5 text-teal-600 dark:text-teal-400" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-zinc-500" />;
    }
  };

  return (
    <section className="space-y-6">
      <div>
        <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
          Statutory Framework
        </span>
        <h2 className="text-2xl font-black text-zinc-950 dark:text-white tracking-tight mt-1">
          Core Startup Eligibility Criteria
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-3xl leading-relaxed">
          Based on the official Government of India (DPIIT) and Government of Maharashtra innovation guidelines. Meeting these 6 foundational requirements qualifies your enterprise for state grants, pilot zones, and procurement preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {ELIGIBILITY_CRITERIA_DEFINITIONS.map((crit) => (
          <div
            key={crit.id}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-card-hover hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                  Criterion {crit.number}
                </span>
                <span className="text-[11px] font-bold text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/40 px-2.5 py-0.5 rounded-full border border-orange-200/80 dark:border-orange-800/60">
                  {crit.badge}
                </span>
              </div>

              {/* Title & Icon */}
              <div className="flex items-start gap-3 pt-1">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-200 dark:border-zinc-700">
                  {getIcon(crit.id)}
                </div>
                <div>
                  <h3 className="text-base font-black text-zinc-950 dark:text-white tracking-tight">
                    {crit.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 leading-snug">
                    {crit.description}
                  </p>
                </div>
              </div>

              {/* Specific Content */}
              {crit.eligibleEntities && (
                <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200/80 dark:border-zinc-800 space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                  <span className="font-bold text-[11px] text-zinc-900 dark:text-zinc-100 uppercase tracking-wider block">
                    Eligible Entity Structures:
                  </span>
                  <ul className="space-y-1">
                    {crit.eligibleEntities.map((entity, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{entity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {crit.requirements && (
                <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200/80 dark:border-zinc-800 space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                  <span className="font-bold text-[11px] text-zinc-900 dark:text-zinc-100 uppercase tracking-wider block">
                    Qualifying Factors:
                  </span>
                  <ul className="space-y-1">
                    {crit.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {crit.rule && (
                <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200/80 dark:border-zinc-800 text-xs text-zinc-800 dark:text-zinc-200 font-semibold leading-relaxed">
                  {crit.rule}
                </div>
              )}

              {/* DeepTech relaxation note if applicable */}
              {crit.deepTechNote && (
                <div className="p-2.5 bg-violet-50 dark:bg-violet-950/40 rounded-xl border border-violet-200 dark:border-violet-800/60 text-[11px] text-violet-900 dark:text-violet-200 flex items-start gap-2 font-medium">
                  <Cpu className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>DeepTech Relaxation:</strong> {crit.deepTechNote}
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Note */}
            {crit.note && (
              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-start gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                <Info className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                <span>{crit.note}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
