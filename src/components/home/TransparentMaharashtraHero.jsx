import React from 'react';
import { Link } from 'react-router-dom';
import { MaharashtraMapSvg } from './MaharashtraMapSvg';
import sarkarLogo from '../../assets/sarkar-setu-logo.jpg';
import maharashtraLogo from '../../assets/maharashtra-gov-logo.png';
import { Button } from '../ui/Button';
import {
  Rocket,
  ClipboardCheck,
  TrendingUp,
  Users,
  Handshake,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Lightbulb,
  Building,
  Target
} from 'lucide-react';

export function TransparentMaharashtraHero() {
  return (
    <div className="space-y-6">
      {/* 1. Transparent Black & Orange Hero Canvas with Maharashtra Map in Background */}
      <div className="relative overflow-hidden rounded-3xl bg-zinc-950 text-white border border-orange-500/30 shadow-2xl shadow-orange-950/40 p-6 sm:p-10 transition-all duration-300">
        {/* Glowing Orange Gradient Lights */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/15 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32 animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        {/* Transparent Maharashtra Map Vector Layer in Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
          <MaharashtraMapSvg className="w-full max-w-4xl h-auto opacity-25 scale-110 sm:scale-100" />
        </div>

        {/* Foreground Content (Z-Index 10 with Glassmorphism) */}
        <div className="relative z-10 space-y-10">
          {/* Top Row: Government Emblem & 3-Step Innovation Workflow */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-800/80">
            {/* Left: Maharashtra Government Seal & Emblem */}
            <div className="flex items-center gap-3.5 bg-black/40 backdrop-blur-md py-2 px-4 rounded-2xl border border-orange-500/20 w-fit">
              <img
                src={maharashtraLogo}
                alt="Government of Maharashtra | महाराष्ट्र शासन"
                className="h-10 w-auto object-contain brightness-110"
              />
            </div>

            {/* Right: The 3 Workflow Steps (Pilot, Evaluate, Scale) */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 bg-black/40 backdrop-blur-md py-2.5 px-5 rounded-2xl border border-orange-500/20">
              {/* Step 1: Pilot */}
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-orange-500/20 border border-orange-500/50 flex items-center justify-center text-orange-400">
                  <Rocket className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">Pilot</h4>
                  <p className="text-[10px] text-zinc-400 font-medium">Test in Real World</p>
                </div>
              </div>

              <div className="hidden sm:block text-orange-500/50 font-bold">→</div>

              {/* Step 2: Evaluate */}
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-orange-500/20 border border-orange-500/50 flex items-center justify-center text-orange-400">
                  <ClipboardCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">Evaluate</h4>
                  <p className="text-[10px] text-zinc-400 font-medium">Measure with Confidence</p>
                </div>
              </div>

              <div className="hidden sm:block text-orange-500/50 font-bold">→</div>

              {/* Step 3: Scale */}
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-orange-500/20 border border-orange-500/50 flex items-center justify-center text-orange-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">Scale</h4>
                  <p className="text-[10px] text-zinc-400 font-medium">Expand What Works</p>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Row: Grand Brand Identity & Core Mission */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={sarkarLogo}
                  alt="Sarkar Setu Logo"
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-contain shadow-lg ring-2 ring-orange-500"
                />
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white flex items-center gap-3">
                    SARKAR <span className="text-orange-500">SETU</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-orange-400 font-extrabold font-mono tracking-widest uppercase mt-0.5">
                    PILOT • EVALUATE • SCALE
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-zinc-300 font-medium leading-relaxed max-w-2xl">
                A startup-friendly public procurement platform enabling <strong className="text-white font-bold">Government of Maharashtra</strong> to discover, pilot, and scale innovative solutions for <span className="text-orange-400 font-black">greater public impact</span>.
              </p>
            </div>

            {/* Right Quick Summary Highlight Badge */}
            <div className="lg:col-span-4 p-5 rounded-2xl bg-black/60 backdrop-blur-md border border-orange-500/30 space-y-2.5">
              <div className="flex items-center gap-2 text-orange-400 font-black text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>State Pilot Zone Guarantee</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                Direct procurement bypasses multi-year tender hurdles with milestone-linked escrow grants for Indian startups.
              </p>
              <div className="pt-1 flex items-center gap-2 text-[11px] text-orange-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                <span>Active across all Maharashtra Testbeds</span>
              </div>
            </div>
          </div>

          {/* 4 Core Value Pillars in Transparent Glassmorphism Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            <div className="p-4 rounded-2xl bg-black/50 backdrop-blur-md border border-orange-500/20 hover:border-orange-500/60 transition-all space-y-1.5">
              <div className="flex items-center gap-2 text-orange-400">
                <Users className="w-4 h-4" />
                <h5 className="text-xs font-black uppercase tracking-wider text-white">Startup Friendly</h5>
              </div>
              <p className="text-[11px] text-zinc-400 font-medium leading-relaxed">
                Empowering innovators & entrepreneurs with fast onboarding.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/50 backdrop-blur-md border border-orange-500/20 hover:border-orange-500/60 transition-all space-y-1.5">
              <div className="flex items-center gap-2 text-orange-400">
                <Handshake className="w-4 h-4" />
                <h5 className="text-xs font-black uppercase tracking-wider text-white">Government Connect</h5>
              </div>
              <p className="text-[11px] text-zinc-400 font-medium leading-relaxed">
                Transparent, inclusive & collaborative department links.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/50 backdrop-blur-md border border-orange-500/20 hover:border-orange-500/60 transition-all space-y-1.5">
              <div className="flex items-center gap-2 text-orange-400">
                <ShieldCheck className="w-4 h-4" />
                <h5 className="text-xs font-black uppercase tracking-wider text-white">Trust & Transparency</h5>
              </div>
              <p className="text-[11px] text-zinc-400 font-medium leading-relaxed">
                Fair, efficient & accountable STQC verification process.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/50 backdrop-blur-md border border-orange-500/20 hover:border-orange-500/60 transition-all space-y-1.5">
              <div className="flex items-center gap-2 text-orange-400">
                <TrendingUp className="w-4 h-4" />
                <h5 className="text-xs font-black uppercase tracking-wider text-white">Impact at Scale</h5>
              </div>
              <p className="text-[11px] text-zinc-400 font-medium leading-relaxed">
                Solutions that create lasting change across Maharashtra.
              </p>
            </div>
          </div>

          {/* Bottom Quote & Innovation Philosophy Strip */}
          <div className="pt-4 border-t border-zinc-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <p className="text-zinc-300 font-medium text-center md:text-left">
              <span className="text-orange-500 font-serif text-base mr-1">“</span>
              Building a bridge between <strong className="text-orange-400 font-black">Innovation</strong> and <strong className="text-white font-black">Governance</strong> for a Progressive Maharashtra.
              <span className="text-orange-500 font-serif text-base ml-1">”</span>
            </p>

            <div className="flex items-center gap-5 text-[11px] font-bold text-zinc-400 shrink-0">
              <span className="flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-orange-400" />
                <span>INNOVATE New Ideas</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Handshake className="w-3.5 h-3.5 text-orange-400" />
                <span>COLLABORATE Together</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-orange-400" />
                <span>IMPACT Tomorrow</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. High-Contrast Black & Orange Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-zinc-950 text-white border border-zinc-800 shadow-card">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
            <h3 className="text-sm sm:text-base font-black tracking-tight text-white">
              Maharashtra Innovation Pilot Zone & Procurement Gateway
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
            <Button size="md" variant="secondary" className="bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700 hover:text-orange-400 font-bold">
              Startup Desk
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
