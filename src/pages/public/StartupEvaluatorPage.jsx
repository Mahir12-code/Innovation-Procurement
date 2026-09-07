import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Target,
  BarChart3,
  CheckCircle2,
  Cpu,
  Users
} from 'lucide-react';

const criteriaList = [
  {
    id: 'technicalCapability',
    name: 'Technical Capability',
    icon: Cpu,
    desc: 'Core architecture robustness, engineering standards, technical documentation, and TRL 6+ readiness.',
    weight: '20%'
  },
  {
    id: 'innovation',
    name: 'Innovation',
    icon: Sparkles,
    desc: 'Originality of solution, indigenous IP/patent filing, and distinct technological edge over legacy alternatives.',
    weight: '15%'
  },
  {
    id: 'problemFit',
    name: 'Problem Fit',
    icon: Target,
    desc: 'Direct alignment with specific department problem statements, operational workflow needs, and citizen impact.',
    weight: '15%'
  },
  {
    id: 'scalability',
    name: 'Scalability',
    icon: TrendingUp,
    desc: 'Architectural capability to handle large data volumes, statewide user loads, and multi-district deployment.',
    weight: '15%'
  },
  {
    id: 'financialViability',
    name: 'Financial Viability',
    icon: BarChart3,
    desc: 'Sustainable unit economics, transparent operational pricing, cost-efficiency for procurement, and sound runway.',
    weight: '10%'
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    icon: ShieldCheck,
    desc: 'Compliance with CERT-In/STQC security standards, data privacy protocols, role-based access control, and encryption.',
    weight: '10%'
  },
  {
    id: 'implementationFeasibility',
    name: 'Implementation Feasibility',
    icon: CheckCircle2,
    desc: 'Realistic 30-day pilot deployment milestones, clear dependency mapping, and ease of departmental integration.',
    weight: '10%'
  },
  {
    id: 'teamCapability',
    name: 'Team Capability',
    icon: Users,
    desc: 'Domain expertise, technical qualifications, past execution track record, and core founding team depth.',
    weight: '5%'
  }
];

export function StartupEvaluatorPage() {
  return (
    <div className="w-full py-10 sm:py-16 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* 1. HERO SECTION */}
        <section className="space-y-6 text-center max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            <Link to="/" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-zinc-900 dark:text-zinc-100 font-bold">AI Evaluator</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 text-orange-700 dark:text-orange-300 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span>AI-Powered Startup Evaluator · Diagnostic Desk</span>
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 dark:text-white leading-[1.15]">
              Know Your Readiness Before You Apply
            </h1>
            <p className="text-sm sm:text-base font-extrabold text-orange-600 dark:text-orange-400 tracking-wide uppercase">
              Transparent, Evidence-Based AI Diagnostics for Maharashtra Startups
            </p>
          </div>

          {/* Key Message Quote Banner */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 border border-orange-300/80 dark:border-orange-700/60 shadow-xs max-w-2xl mx-auto">
            <p className="text-base sm:text-lg font-black text-zinc-950 dark:text-white tracking-tight">
              “Don’t just apply. Know your chances, improve, and apply better.”
            </p>
          </div>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed max-w-3xl mx-auto">
            Our intelligent evaluator analyzes a startup across key parameters such as <strong className="text-zinc-900 dark:text-white font-bold">technical capability, innovation, problem fit, scalability, financial viability, cybersecurity, implementation feasibility, and team capability</strong>. It generates a transparent score with personalized feedback, helping startups understand their strengths, identify gaps, improve their proposal, and reapply with a stronger application.
          </p>
        </section>

        {/* 2. THE 8 CORE EVALUATION PARAMETERS */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400">
              Evaluation Framework
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white">
              8 Dimensional Assessment Matrix
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
              Every application is scored by independent experts against the same eight criteria, so no department official picks a "favorite" without justification.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {criteriaList.map((crit) => {
              const Icon = crit.icon;
              return (
                <div
                  key={crit.id}
                  className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-subtle hover:border-orange-300 dark:hover:border-orange-600/60 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-black font-mono px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                      Weight: {crit.weight}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-zinc-950 dark:text-white">
                    {crit.name}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                    {crit.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
