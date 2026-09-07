import React from 'react';
import heroBanner from '../../assets/sarkar-setu-hero-banner.png';
import {
  ShieldCheck,
  Users,
  Handshake,
  TrendingUp,
  Target,
  Search,
  ClipboardCheck,
  FlaskConical,
  Globe,
  ChevronRight
} from 'lucide-react';

const SARKAR_SETU_STEPS = [
  {
    step: '01',
    title: 'Identify the Problem',
    desc: 'Government departments define a real operational challenge and expected outcome.',
    icon: Target,
  },
  {
    step: '02',
    title: 'Discover & Apply',
    desc: 'Publish the challenge and let eligible startups discover and submit solutions.',
    icon: Search,
  },
  {
    step: '03',
    title: 'Verify & Evaluate',
    desc: 'Verify startup eligibility and evaluate solutions using transparent criteria and expert review.',
    icon: ClipboardCheck,
  },
  {
    step: '04',
    title: 'Pilot & Measure',
    desc: 'Select the best solution, run a controlled pilot, and measure real-world results.',
    icon: FlaskConical,
  },
  {
    step: '05',
    title: 'Scale Across India',
    desc: 'Successful solutions move toward procurement and wider government adoption.',
    icon: Globe,
  },
];

export function HomePage() {
  return (
    <div className="w-full space-y-12 pb-16">
      {/* 1. Official Government of Maharashtra Sarkar Setu Hero Banner (Full-Bleed Transparent Effect, Zero Grains) */}
      <section className="w-full relative overflow-hidden bg-gradient-to-b from-orange-500/10 via-orange-500/5 to-transparent dark:from-orange-500/10 dark:via-zinc-950/40 dark:to-transparent">
        {/* Ambient Glowing Gradient Orbs for depth and transparency effect */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[400px] bg-orange-500/15 dark:bg-orange-500/15 rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />
        <div className="absolute top-1/4 right-1/4 w-[700px] h-[350px] bg-amber-500/15 dark:bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Full-width container filling out the entire screen edge-to-edge with pristine HD quality */}
        <div className="w-full relative flex items-center justify-center">
          <img
            src={heroBanner}
            alt="Sarkar Setu — Pilot. Evaluate. Scale. Government of Maharashtra"
            className="w-full h-auto block transition-all duration-300 mix-blend-multiply dark:mix-blend-screen dark:[filter:invert(1)_hue-rotate(180deg)] [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]"
          />
        </div>
      </section>

      {/* Main Content Sections (Centered Container) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

      {/* 2. Core Value Pillars */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-subtle hover:border-orange-300 dark:hover:border-orange-600/60 hover:shadow-card transition-all space-y-2">
          <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-black text-zinc-950 dark:text-white">Startup Friendly</h4>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
            Empowering innovators and entrepreneurs with fast-track onboarding and zero past-turnover barriers.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-subtle hover:border-orange-300 dark:hover:border-orange-600/60 hover:shadow-card transition-all space-y-2">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center font-bold">
            <Handshake className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-black text-zinc-950 dark:text-white">Government Connect</h4>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
            Transparent, inclusive, and collaborative channel directly linking department officers to innovators.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-subtle hover:border-orange-300 dark:hover:border-orange-600/60 hover:shadow-card transition-all space-y-2">
          <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-black text-zinc-950 dark:text-white">Trust & Transparency</h4>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
            A fair and open process with independent testing and clear milestone-based grants.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-subtle hover:border-orange-300 dark:hover:border-orange-600/60 hover:shadow-card transition-all space-y-2">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center font-bold">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-black text-zinc-950 dark:text-white">Impact at Scale</h4>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
            Proven field solutions that scale across Maharashtra for meaningful, lasting public impact.
          </p>
        </div>
      </section>


      {/* 4. How Sarkar Setu Works (Standardized 5-Step Process) */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <span className="px-3.5 py-1 rounded-full bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 text-xs font-black tracking-wider uppercase border border-orange-200/80 dark:border-orange-800/60">
            STANDARDIZED PROCESS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 dark:text-white tracking-tight">
            How Sarkar Setu Works
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-medium">
            From identifying a government challenge to scaling proven startup solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
          {SARKAR_SETU_STEPS.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === SARKAR_SETU_STEPS.length - 1;

            return (
              <div key={item.step} className="relative flex flex-col">
                <div className="h-full p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 shadow-subtle hover:border-orange-300 dark:hover:border-orange-600/60 hover:shadow-card transition-all duration-200 flex flex-col justify-between space-y-4 group">
                  {/* Top: Step Badge & Icon */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-black font-mono px-2.5 py-1 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border border-orange-200/80 dark:border-orange-800/60 tracking-wider">
                      STEP {item.step}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 group-hover:bg-orange-50 dark:group-hover:bg-orange-950/50 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Body: Title and Description */}
                  <div className="space-y-1.5 flex-1">
                    <h3 className="text-sm sm:text-base font-black text-zinc-950 dark:text-white tracking-tight leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Connecting arrow indicator between cards on desktop */}
                {!isLast && (
                  <div
                    aria-hidden="true"
                    className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200/90 dark:border-zinc-700 items-center justify-center shadow-2xs text-zinc-400 dark:text-zinc-500 pointer-events-none"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
      </div>
    </div>
  );
}
