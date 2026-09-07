import React from 'react';
import { Link } from 'react-router-dom';
import {
  Rocket,
  ChevronRight,
  FlaskConical,
  Award,
  Search
} from 'lucide-react';

const sandboxSteps = [
  {
    step: '01',
    title: 'Submit Pilot Proposal',
    desc: 'Startups submit a simple proposal outlining their solution, test goals, and timeline.',
    icon: Rocket,
    badge: 'Step 1'
  },
  {
    step: '02',
    title: 'Department Review',
    desc: 'Departments review and shortlist proposals that solve real operational challenges.',
    icon: Search,
    badge: 'Step 2'
  },
  {
    step: '03',
    title: 'Field Testing',
    desc: 'Test solutions in real environments—such as hospitals, transit depots, or municipal wards.',
    icon: FlaskConical,
    badge: 'Step 3'
  },
  {
    step: '04',
    title: 'Statewide Rollout',
    desc: 'Successful pilots get certified for direct government adoption and statewide rollout on GeM.',
    icon: Award,
    badge: 'Step 4'
  }
];

export function PilotSandboxPage() {
  return (
    <div className="w-full py-10 sm:py-16 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* 1. HERO SECTION */}
        <section className="space-y-6 text-center max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            <Link to="/" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-zinc-900 dark:text-zinc-100 font-bold">Pilot Zone</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 text-orange-700 dark:text-orange-300 text-xs font-bold">
            <Rocket className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span>Government of Maharashtra · Pilot Zone Framework</span>
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 dark:text-white leading-[1.15]">
              Turn Government Opportunities into Real-World Pilots
            </h1>
            <p className="text-sm sm:text-base font-extrabold text-orange-600 dark:text-orange-400 tracking-wide uppercase">
              Test and Validate Solutions in Real Government Environments
            </p>
          </div>

          {/* Key Message Quote Banner */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 border border-orange-300/80 dark:border-orange-700/60 shadow-xs max-w-2xl mx-auto">
            <p className="text-base sm:text-lg font-black text-zinc-950 dark:text-white tracking-tight">
              “From promising idea → government pilot → real-world impact.”
            </p>
          </div>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed max-w-3xl mx-auto">
            The <strong className="text-zinc-900 dark:text-white font-bold">Pilot Zone</strong> connects startups with government departments. Startups can test their solutions in real government environments, while departments can evaluate innovations safely before wider rollout.
          </p>
        </section>

        {/* 2. THE PROCESS */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400">
              The Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white">
              How the Pilot Zone Works
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium">
              A simple 4-step process to safely test solutions before rolling them out across the state.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {sandboxSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-subtle hover:border-orange-300 dark:hover:border-orange-600/60 transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono font-black text-orange-600 dark:text-orange-400 px-2.5 py-0.5 rounded bg-orange-50 dark:bg-orange-950/50">
                        {step.badge}
                      </span>
                    </div>
                    <h3 className="text-base font-black text-zinc-950 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
