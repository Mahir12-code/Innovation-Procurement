import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Sparkles,
  Database,
  Rocket,
  TrendingUp,
  Globe
} from 'lucide-react';

export function AboutPage() {
  return (
    <div className="w-full py-10 sm:py-16 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* 1. Minimal Header & Mission */}
        <section className="space-y-6 text-center max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            <Link to="/" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-zinc-900 dark:text-zinc-100 font-bold">About</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 text-orange-700 dark:text-orange-300 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span>Government of Maharashtra · Innovation Procurement Gateway</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 dark:text-white leading-[1.15]">
            Bridging Government Challenges with Startup Innovation
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed">
            <strong className="text-zinc-900 dark:text-white font-bold">Sarkar Setu</strong> is Maharashtra’s official public procurement pilot zone platform. It eliminates traditional tender barriers, enabling DPIIT-registered startups to pilot breakthrough solutions directly inside government departments and fast-track to state-wide deployment.
          </p>
        </section>

        {/* 2. Traditional Tender vs Sarkar Setu Comparison */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400">
              Why Sarkar Setu
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white">
              Solving the Public Procurement Gap
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Traditional Method */}
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-100/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-4">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-black text-sm uppercase tracking-wide">
                <XCircle className="w-5 h-5" />
                <span>Traditional Public Tenders</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-black shrink-0">✕</span>
                  <span>Requires 3–5 years audited turnover & massive past government contracts.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-black shrink-0">✕</span>
                  <span>6 to 18-month procurement cycles before any testing begins.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-black shrink-0">✕</span>
                  <span>High Earnest Money Deposit (EMD) and bank guarantees blocking working capital.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-black shrink-0">✕</span>
                  <span>High risk of multi-crore full deployment failure without trial run.</span>
                </li>
              </ul>
            </div>

            {/* The Sarkar Setu Method */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-orange-500/40 dark:border-orange-500/50 shadow-card space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-black text-sm uppercase tracking-wide">
                <CheckCircle2 className="w-5 h-5" />
                <span>The Sarkar Setu Way</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                <li className="flex items-start gap-2.5">
                  <span className="text-orange-600 dark:text-orange-400 font-black shrink-0">✓</span>
                  <span><strong>Zero past turnover barriers:</strong> Open to any DPIIT-recognized tech startup.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-orange-600 dark:text-orange-400 font-black shrink-0">✓</span>
                  <span><strong>Fast-track 30-day onboarding:</strong> From challenge discovery to pilot zone trial.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-orange-600 dark:text-orange-400 font-black shrink-0">✓</span>
                  <span><strong>Guaranteed Escrow Payouts:</strong> Grants disbursed automatically on verified milestones.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-orange-600 dark:text-orange-400 font-black shrink-0">✓</span>
                  <span><strong>De-risked Scalability:</strong> Test small in the field first; purchase at scale with confidence.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 5. Essential Platform Features (Bento Grid) */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400">
              Platform Features
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white">
              Core Capabilities of Sarkar Setu
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* 1. AI-POWERED */}
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-subtle hover:border-orange-300 dark:hover:border-orange-600/60 transition-all space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-black text-zinc-950 dark:text-white uppercase tracking-wider">
                AI-POWERED
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                Evidence-based evaluation using AI/LLMs
              </p>
            </div>

            {/* 2. API READY */}
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-subtle hover:border-orange-300 dark:hover:border-orange-600/60 transition-all space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center font-bold">
                <Database className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-black text-zinc-950 dark:text-white uppercase tracking-wider">
                API READY
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                Integrates with DPIIT, GeM and other gov. data sources
              </p>
            </div>

            {/* 3. PILOT READY */}
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-subtle hover:border-orange-300 dark:hover:border-orange-600/60 transition-all space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
                <Rocket className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-black text-zinc-950 dark:text-white uppercase tracking-wider">
                PILOT READY
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                Real-world testing through government pilot zones
              </p>
            </div>

            {/* 4. IMPACT DRIVEN */}
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-subtle hover:border-orange-300 dark:hover:border-orange-600/60 transition-all space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-black text-zinc-950 dark:text-white uppercase tracking-wider">
                IMPACT DRIVEN
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                Faster adoption, innovation in governance and better public services
              </p>
            </div>

            {/* 5. SCALABLE */}
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-subtle hover:border-orange-300 dark:hover:border-orange-600/60 transition-all space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
                <Globe className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-black text-zinc-950 dark:text-white uppercase tracking-wider">
                SCALABLE
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                Replicable across multiple departments and states
              </p>
            </div>

            {/* 6. SECURE & TRUSTED */}
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-subtle hover:border-orange-300 dark:hover:border-orange-600/60 transition-all space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-black text-zinc-950 dark:text-white uppercase tracking-wider">
                SECURE & TRUSTED
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                Role-based access audit logs and data security
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
