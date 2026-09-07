import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { BUDGET_BREAKDOWN } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatters';
import { Wallet, ShieldCheck } from 'lucide-react';

export function BudgetProgressWidget() {
  const totalAllocated = BUDGET_BREAKDOWN.reduce((acc, item) => acc + item.allocated, 0);
  const totalDisbursed = BUDGET_BREAKDOWN.reduce((acc, item) => acc + item.disbursed, 0);
  const totalCommitted = BUDGET_BREAKDOWN.reduce((acc, item) => acc + item.committedPilots, 0);
  const totalRemaining = BUDGET_BREAKDOWN.reduce((acc, item) => acc + item.remaining, 0);

  const percentUtilized = Math.round((totalDisbursed / totalAllocated) * 100);

  return (
    <Card className="border-zinc-200/90 dark:border-zinc-800 shadow-card h-full flex flex-col justify-between">
      <div>
        <CardHeader className="pb-3 flex-row items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400">
                <Wallet className="w-4 h-4" />
              </span>
              <CardTitle className="text-base text-zinc-950 dark:text-white">
                Escrow & PFMS Grant Ledger
              </CardTitle>
            </div>
            <CardDescription className="mt-0.5">
              Maharashtra pilot zone grant allocations & milestone disbursements.
            </CardDescription>
          </div>

          <span className="text-xs font-mono font-black px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 rounded-full shrink-0">
            Escrow Protected
          </span>
        </CardHeader>

        <CardContent className="p-5 space-y-4">
          {/* Main Budget Metric Banner */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-200/90 dark:border-zinc-700 space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Total Budget Disbursed
              </span>
              <span className="font-mono text-xs font-black text-orange-600 dark:text-orange-400">
                {percentUtilized}% utilized
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <h4 className="text-2xl font-black text-zinc-950 dark:text-white font-mono">
                {formatCurrency(totalDisbursed)}
              </h4>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                of {formatCurrency(totalAllocated)} sanctioned
              </span>
            </div>

            <ProgressBar value={percentUtilized} color="orange" size="md" className="mt-2" />
          </div>

          {/* Allocation Breakdown Rows */}
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-white dark:bg-zinc-800/40 rounded-xl border border-zinc-200/80 dark:border-zinc-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-600"></span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200">Disbursed to Startups</span>
              </div>
              <span className="font-mono font-black text-zinc-950 dark:text-white">
                {formatCurrency(totalDisbursed)}
              </span>
            </div>

            <div className="p-3 bg-white dark:bg-zinc-800/40 rounded-xl border border-zinc-200/80 dark:border-zinc-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-950 dark:bg-zinc-400"></span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200">Locked in Milestone Escrow</span>
              </div>
              <span className="font-mono font-black text-zinc-950 dark:text-white">
                {formatCurrency(totalCommitted)}
              </span>
            </div>

            <div className="p-3 bg-white dark:bg-zinc-800/40 rounded-xl border border-zinc-200/80 dark:border-zinc-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-600"></span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200">Available Sanctioned Balance</span>
              </div>
              <span className="font-mono font-black text-emerald-600 dark:text-emerald-400">
                {formatCurrency(totalRemaining)}
              </span>
            </div>
          </div>
        </CardContent>
      </div>

      <CardFooter className="py-3 px-6 text-xs text-zinc-500 dark:text-zinc-400 font-medium flex items-center justify-between">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>PFMS Verified Node</span>
        </span>
        <span className="font-mono font-bold text-zinc-700 dark:text-zinc-300">PFMS-MH-2026-09</span>
      </CardFooter>
    </Card>
  );
}
