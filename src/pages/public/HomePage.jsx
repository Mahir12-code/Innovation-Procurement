import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { PROCUREMENT_STEPS } from '../../data/mockData';
import heroBanner from '../../assets/sarkar-setu-hero-banner.png';
import {
  ArrowRight,
  ShieldCheck,
  Building,
  Rocket,
  Award,
  Scale,
  Sparkles,
  CheckCircle2,
  Users,
  Handshake,
  TrendingUp,
  Lightbulb,
  Target
} from 'lucide-react';

export function HomePage() {
  return (
    <div className="space-y-16 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 1. Official Government of Maharashtra Sarkar Setu Hero Banner (High-Res) */}
      <section className="space-y-6">
        <div className="relative overflow-hidden rounded-3xl border border-zinc-200/90 dark:border-zinc-800 shadow-card bg-white dark:bg-zinc-900 hover:shadow-card-hover transition-all duration-300">
          <img
            src={heroBanner}
            alt="Sarkar Setu — Pilot. Evaluate. Scale. Government of Maharashtra"
            className="w-full h-auto block object-contain"
          />
        </div>

        {/* Quick Action CTAs below the banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-zinc-950 text-white border border-zinc-800 shadow-card">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <h3 className="text-sm sm:text-base font-black tracking-tight text-white">
                Maharashtra Innovation Sandbox & Procurement Gateway
              </h3>
            </div>
            <p className="text-xs text-zinc-400 font-medium">
              Connecting departments with DPIIT-verified startups for rapid field piloting and scaling.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/government/dashboard">
              <Button size="md" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Open Government Portal
              </Button>
            </Link>
            <Link to="/startup/dashboard">
              <Button size="md" variant="secondary" className="bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700">
                Startup Desk
              </Button>
            </Link>
          </div>
        </div>
      </section>

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
            Transparent, inclusive, and collaborative channel directly linking department officers to tech founders.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-subtle hover:border-orange-300 dark:hover:border-orange-600/60 hover:shadow-card transition-all space-y-2">
          <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-black text-zinc-950 dark:text-white">Trust & Transparency</h4>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
            Fair, efficient, and accountable process with STQC third-party testing and verified milestone grants.
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

      {/* 3. Primary Audience Pathways: Government & Startups */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* For Government Departments (Deep Black Card) */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-black via-zinc-900 to-zinc-950 text-white border border-zinc-800 shadow-xl shadow-black/20 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-orange-400">
              <Building className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <span className="text-xs uppercase font-black tracking-widest text-orange-400">
                For Government Departments
              </span>
              <h3 className="text-2xl font-black tracking-tight text-white">
                Find Proven Tech & Solve Real Field Problems
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed font-medium">
                Post challenges in minutes, discover DPIIT-screened startups, and run controlled sandbox trials before committing to large-scale procurement.
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-zinc-300 pt-2 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Risk-free sandbox testing with milestone-linked grants</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Independent validation by STQC and premier IIT labs</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Direct GeM procurement bypasses multi-year tenders</span>
              </li>
            </ul>
          </div>

          <div>
            <Link to="/government/dashboard">
              <Button variant="primary" size="md" className="w-full font-black">
                Access Government Portal
              </Button>
            </Link>
          </div>
        </div>

        {/* For Innovation Startups (Crisp White & Dark Card) */}
        <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 text-orange-600 dark:text-orange-400 flex items-center justify-center">
              <Rocket className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <span className="text-xs uppercase font-black tracking-widest text-orange-700 dark:text-orange-400">
                For Innovation Startups
              </span>
              <h3 className="text-2xl font-black tracking-tight text-zinc-950 dark:text-white">
                Deploy in Real Sandboxes & Win Big Contracts
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium">
                No past turnover or 5-year tender requirements. Get ₹15-50 Lakhs in sandbox pilot grants and a direct path to pan-India government scale-up.
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-zinc-600 dark:text-zinc-300 pt-2 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0" />
                <span>Fast-track DPIIT eligibility check in under 48 hours</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0" />
                <span>Guaranteed milestone payouts held securely in escrow</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0" />
                <span>Government validation certificate recognized nationwide</span>
              </li>
            </ul>
          </div>

          <div>
            <Link to="/startup/dashboard">
              <Button variant="black" size="md" className="w-full font-black dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:border-zinc-700">
                Access Startup Desk
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. 10-Step Workflow SOP Banner */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 text-xs font-black border border-orange-200 dark:border-orange-800/60">
            Standardized SOP
          </span>
          <h2 className="text-3xl font-black text-zinc-950 dark:text-white">How Sarkar Setu Works in 10 Steps</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
            A transparent, predictable journey from spotting an operational gap to pan-India scale.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {PROCUREMENT_STEPS.map((step) => (
            <div
              key={step.id}
              className="p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 shadow-subtle hover:border-orange-300 dark:hover:border-orange-600/60 hover:shadow-card transition-all duration-200 flex flex-col justify-between space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black font-mono px-2 py-0.5 rounded-md bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800/60">
                  Step {step.id.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500">{step.timeframe}</span>
              </div>
              <div>
                <h4 className="text-xs font-black text-zinc-950 dark:text-white leading-snug">{step.title}</h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed font-medium">{step.tagline}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 4 Portals Navigation Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Link to="/government/dashboard" className="block group">
          <Card className="h-full border-zinc-200/90 dark:border-zinc-800 dark:bg-zinc-900 group-hover:border-orange-500 transition-all">
            <CardContent className="p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-zinc-950 dark:text-white text-sm">Government Portal</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-medium">Post challenges, approve sandbox pilots & issue purchase orders.</p>
              </div>
              <div className="pt-2 text-xs font-black text-orange-600 dark:text-orange-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                <span>Open Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/startup/dashboard" className="block group">
          <Card className="h-full border-zinc-200/90 dark:border-zinc-800 dark:bg-zinc-900 group-hover:border-orange-500 dark:group-hover:border-orange-500 transition-all">
            <CardContent className="p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center group-hover:bg-black dark:group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-zinc-950 dark:text-white text-sm">Startup Desk</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-medium">Browse challenges, apply online & track milestone payouts.</p>
              </div>
              <div className="pt-2 text-xs font-black text-zinc-900 dark:text-zinc-200 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                <span>Explore Grants</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/expert/dashboard" className="block group">
          <Card className="h-full border-zinc-200/90 dark:border-zinc-800 dark:bg-zinc-900 group-hover:border-orange-500 transition-all">
            <CardContent className="p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-zinc-950 dark:text-white text-sm">Technical Jury</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-medium">Score startup technical feasibility, safety & real-world durability.</p>
              </div>
              <div className="pt-2 text-xs font-black text-orange-600 dark:text-orange-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                <span>View Scorecards</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/admin/dashboard" className="block group">
          <Card className="h-full border-zinc-200/90 dark:border-zinc-800 dark:bg-zinc-900 group-hover:border-orange-500 dark:group-hover:border-orange-500 transition-all">
            <CardContent className="p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center group-hover:bg-black dark:group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-zinc-950 dark:text-white text-sm">Audit & Admin</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-medium">Immutable audit logs, user management & GeM integration.</p>
              </div>
              <div className="pt-2 text-xs font-black text-zinc-900 dark:text-zinc-200 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                <span>View Logs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </section>
    </div>
  );
}
