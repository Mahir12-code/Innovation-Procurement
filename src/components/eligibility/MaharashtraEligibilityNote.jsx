import React from 'react';
import {
  Landmark,
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  CheckCircle2,
  Users,
  Compass,
  Coins
} from 'lucide-react';
import maharashtraLogo from '../../assets/maharashtra-gov-logo.png';

export function MaharashtraEligibilityNote() {
  return (
    <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="bg-white p-2 rounded-xl border border-zinc-200 shadow-2xs shrink-0">
            <img
              src={maharashtraLogo}
              alt="Government of Maharashtra"
              className="h-9 w-auto object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-orange-700 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 px-2 py-0.5 rounded border border-orange-200 dark:border-orange-800/60">
                State Specific Guidelines
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-white tracking-tight mt-0.5">
              Maharashtra Startup Eligibility & State Provisions
            </h2>
          </div>
        </div>
      </div>

      {/* Mandatory Regulatory Difference Note */}
      <div className="p-4 bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 rounded-xl flex items-start gap-3 text-xs text-amber-950 dark:text-amber-200">
        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1 leading-relaxed">
          <span className="font-bold text-amber-900 dark:text-amber-100 block">
            Important Inter-Governmental Notice:
          </span>
          <p>
            “Eligibility requirements can vary between Maharashtra Government schemes and Central Government/DPIIT schemes. Always verify the individual scheme guidelines before applying.”
          </p>
        </div>
      </div>

      {/* Highlights of Maharashtra Innovations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200/80 dark:border-zinc-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-black">
            <Compass className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-zinc-900 dark:text-white">
            Rule 170 Public Procurement Waiver
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Under the Maharashtra Innovation Policy, verified startups with working prototypes are exempt from prior turnover and tender experience requirements when competing for government pilot zones.
          </p>
        </div>

        <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200/80 dark:border-zinc-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 flex items-center justify-center font-black">
            <Users className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-zinc-900 dark:text-white">
            Women & SC/ST Affirmative Action
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Enterprises with majority women founders (≥51%) or SC/ST entrepreneurs receive dedicated grant tracks (Punyashlok Ahilyadevi Holkar, Hirkani, and MIDC preferential industrial plot allocations).
          </p>
        </div>

        <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200/80 dark:border-zinc-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 flex items-center justify-center font-black">
            <Coins className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-zinc-900 dark:text-white">
            District DIC & MAITRI Portal Integration
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            In addition to DPIIT central registration, Maharashtra enterprises benefit from local District Industries Centres (DIC) single window clearances, electricity duty waivers, and stamp duty concessions.
          </p>
        </div>
      </div>
    </section>
  );
}
