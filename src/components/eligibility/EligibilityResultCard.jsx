import React from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Building2,
  ArrowRight
} from 'lucide-react';

export function EligibilityResultCard({ evaluation, onJumpToSchemes }) {
  if (!evaluation) return null;

  const isEligible = evaluation.status === 'LIKELY_ELIGIBLE';
  const isNotEligible = evaluation.status === 'NOT_ELIGIBLE';
  const isMoreInfo = evaluation.status === 'MORE_INFO';

  return (
    <div
      className={`rounded-2xl border p-6 sm:p-7 space-y-5 transition-all shadow-sm ${
        isEligible
          ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
          : isNotEligible
          ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800'
          : 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800'
      }`}
    >
      {/* Top Banner Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
              isEligible
                ? 'bg-emerald-600 text-white'
                : isNotEligible
                ? 'bg-rose-600 text-white'
                : 'bg-amber-500 text-white'
            }`}
          >
            {isEligible && <CheckCircle2 className="w-7 h-7" />}
            {isNotEligible && <XCircle className="w-7 h-7" />}
            {isMoreInfo && <AlertTriangle className="w-7 h-7" />}
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                  isEligible
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200'
                    : isNotEligible
                    ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200'
                }`}
              >
                Assessment Outcome
              </span>
            </div>
            <h3
              className={`text-xl sm:text-2xl font-black tracking-tight ${
                isEligible
                  ? 'text-emerald-950 dark:text-emerald-200'
                  : isNotEligible
                  ? 'text-rose-950 dark:text-rose-200'
                  : 'text-amber-950 dark:text-amber-200'
              }`}
            >
              {isEligible && '✓ Likely Eligible'}
              {isNotEligible && '✕ Currently Not Eligible'}
              {isMoreInfo && '⚠ More Information Required'}
            </h3>
          </div>
        </div>
      </div>

      {/* Description text */}
      <p
        className={`text-xs sm:text-sm font-medium leading-relaxed ${
          isEligible
            ? 'text-emerald-900 dark:text-emerald-300'
            : isNotEligible
            ? 'text-rose-900 dark:text-rose-300'
            : 'text-amber-900 dark:text-amber-300'
        }`}
      >
        {evaluation.description}
      </p>

      {/* If missing information */}
      {isMoreInfo && evaluation.missingFields?.length > 0 && (
        <div className="p-4 bg-white/80 dark:bg-zinc-900/80 rounded-xl border border-amber-200 dark:border-amber-800 space-y-2">
          <span className="text-xs font-bold text-amber-900 dark:text-amber-200 block">
            The following fields must be provided before evaluating:
          </span>
          <div className="flex flex-wrap gap-2">
            {evaluation.missingFields.map((field, idx) => (
              <span
                key={idx}
                className="text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-2.5 py-1 rounded-md border border-amber-300 dark:border-amber-800"
              >
                • {field}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Checklist Breakdown for each criterion */}
      {evaluation.criteriaResults?.length > 0 && (
        <div className="space-y-3 pt-2">
          <span className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
            Criteria Verification Summary
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {evaluation.criteriaResults.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs transition-colors ${
                  item.passed
                    ? 'bg-white/80 dark:bg-zinc-900/80 border-emerald-200 dark:border-emerald-900/60 text-zinc-800 dark:text-zinc-200'
                    : 'bg-white/80 dark:bg-zinc-900/80 border-rose-200 dark:border-rose-900/60 text-zinc-800 dark:text-zinc-200'
                }`}
              >
                {item.passed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-zinc-900 dark:text-white">
                      {item.title}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                        item.passed
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      }`}
                    >
                      {item.passed ? 'Satisfied' : 'Action Needed'}
                    </span>
                  </div>
                  <p className="text-zinc-500 dark:text-zinc-400 text-[11px] mt-0.5 leading-snug">
                    {item.reason}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
