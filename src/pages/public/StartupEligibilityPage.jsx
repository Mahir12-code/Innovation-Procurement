import React, { useState, useRef } from 'react';
import {
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import maharashtraLogo from '../../assets/maharashtra-gov-logo.png';
import {
  evaluateStartupEligibility
} from '../../data/startupEligibilityRules';
import {
  EligibilityCriteriaCards,
  InteractiveEligibilityForm,
  EligibilityResultCard
} from '../../components/eligibility';

export function StartupEligibilityPage() {
  const [evaluation, setEvaluation] = useState(null);
  const resultsRef = useRef(null);

  const handleEvaluate = (profile) => {
    if (!profile) {
      setEvaluation(null);
      return;
    }
    const result = evaluateStartupEligibility(profile);
    setEvaluation(result);

    // Smooth scroll to results
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // Determine current active progress step
  const getActiveStep = () => {
    if (!evaluation) return 1;
    if (evaluation.status === 'MORE_INFO') return 2;
    return 3;
  };

  const currentStep = getActiveStep();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      {/* 1. HERO SECTION */}
      <section className="relative border-b border-zinc-200 dark:border-zinc-800 bg-gradient-to-b from-orange-50/40 via-white to-zinc-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:28px_28px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 sm:pt-14 sm:pb-16 space-y-6">
          {/* Header Badge */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 bg-white dark:bg-zinc-800/90 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 shadow-2xs">
              <img
                src={maharashtraLogo}
                alt="Maharashtra Seal"
                className="h-4 w-auto object-contain"
              />
              <span className="text-[11px] font-black tracking-wide text-zinc-800 dark:text-zinc-200 uppercase">
                Government of Maharashtra
              </span>
            </div>

            <span className="text-xs font-bold text-orange-700 dark:text-orange-400 bg-orange-100/70 dark:bg-orange-950/50 px-3 py-1 rounded-full border border-orange-200/80 dark:border-orange-800/60 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Statutory DPIIT & State Guidelines
            </span>

            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium hidden sm:inline">
              Rule 170 & Startup Policy Evaluation Desk
            </span>
          </div>

          {/* Titles */}
          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white tracking-tight leading-tight">
              Startup Eligibility Checker
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 font-normal leading-relaxed">
              Check whether your startup meets the basic eligibility requirements for government startup schemes.
            </p>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Evaluate corporate structure, operating vintage, turnover limits, innovation potential, and discover which Maharashtra state and central grants apply to your enterprise.
            </p>
          </div>

          {/* Visual Progress Indicator (3 Steps) */}
          <div className="pt-2 max-w-3xl">
            <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xs border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-2xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { step: 1, title: '1. Business Details', desc: 'Structure & Age' },
                  { step: 2, title: '2. Startup Details', desc: 'DPIIT & Innovation' },
                  { step: 3, title: '3. Eligibility', desc: 'Assessment Outcome' }
                ].map((s) => {
                  const isDone = currentStep > s.step;
                  const isCurrent = currentStep === s.step;

                  return (
                    <div
                      key={s.step}
                      className={`p-2.5 rounded-xl border transition-all flex items-center gap-2.5 ${
                        isCurrent
                          ? 'bg-orange-50/80 dark:bg-orange-950/40 border-orange-500 text-orange-950 dark:text-orange-200 shadow-2xs ring-1 ring-orange-500/50'
                          : isDone
                          ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300'
                          : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/60 text-zinc-500 dark:text-zinc-400'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                          isDone
                            ? 'bg-emerald-600 text-white'
                            : isCurrent
                            ? 'bg-orange-600 text-white'
                            : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-4 h-4" /> : s.step}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold truncate">{s.title}</div>
                        <div className="text-[10px] opacity-80 truncate">{s.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* SECTION 1: CRITERIA CARDS */}
        <EligibilityCriteriaCards />

        {/* SECTION 2: INTERACTIVE CHECKER FORM */}
        <div id="checker-form">
          <InteractiveEligibilityForm onEvaluate={handleEvaluate} />
        </div>

        {/* SECTION 3: ASSESSMENT RESULT CARD */}
        {evaluation && (
          <div ref={resultsRef} className="space-y-6 pt-2">
            <EligibilityResultCard evaluation={evaluation} />
          </div>
        )}
      </div>
    </div>
  );
}
