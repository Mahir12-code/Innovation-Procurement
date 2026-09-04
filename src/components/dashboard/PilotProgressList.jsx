import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { LIVE_PILOTS } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatters';
import { Rocket, Activity, CheckCircle2, ChevronRight, AlertCircle, ArrowUpRight } from 'lucide-react';

export function PilotProgressList() {
  return (
    <Card className="border-zinc-200/90 dark:border-zinc-800 shadow-card">
      <CardHeader className="flex-row items-center justify-between gap-4 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400">
              <Rocket className="w-4 h-4" />
            </span>
            <CardTitle className="text-base text-zinc-950 dark:text-white">
              Sandbox Pilots & Testbeds
            </CardTitle>
          </div>
          <CardDescription className="mt-0.5">
            Active field trials across Maharashtra with real-time testbed telemetry.
          </CardDescription>
        </div>

        <Link to="/government/pilots">
          <Button variant="secondary" size="sm" rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />} className="dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200">
            Open Telemetry
          </Button>
        </Link>
      </CardHeader>

      <CardContent className="p-5 sm:p-6 space-y-4">
        {LIVE_PILOTS.map((pilot) => (
          <div
            key={pilot.id}
            className="p-4 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 hover:border-orange-300 dark:hover:border-orange-500/50 hover:shadow-subtle transition-all space-y-3.5"
          >
            {/* Header: Title, Startup, Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-black text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md border border-zinc-200 dark:border-zinc-700">
                    {pilot.id}
                  </span>
                  <h4 className="font-extrabold text-xs text-zinc-950 dark:text-white">{pilot.challengeTitle}</h4>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                  <span className="font-extrabold text-orange-600 dark:text-orange-400">{pilot.startupName}</span>
                  <span>•</span>
                  <span>{pilot.testbedLocation}</span>
                  <span>•</span>
                  <span className="font-mono font-bold text-zinc-950 dark:text-zinc-100">{formatCurrency(pilot.sanctionedGrant)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800/60">
                  {pilot.healthLabel}
                </span>
              </div>
            </div>

            {/* Progress Bar & Current Milestone */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-zinc-600 dark:text-zinc-300 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                  <span>Current: <strong>{pilot.currentMilestone}</strong></span>
                </span>
                <span className="font-mono font-black text-zinc-950 dark:text-white">
                  {pilot.progress}% Completed
                </span>
              </div>
              <ProgressBar value={pilot.progress} color="orange" size="md" />
            </div>

            {/* Testbed Telemetry Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800 text-[11px]">
              <div className="p-2 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200/80 dark:border-zinc-700">
                <span className="text-zinc-400 dark:text-zinc-500 block text-[10px] uppercase font-bold">Telemetry</span>
                <span className="font-extrabold text-zinc-800 dark:text-zinc-200 truncate block">{pilot.telemetrySummary}</span>
              </div>
              <div className="p-2 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200/80 dark:border-zinc-700">
                <span className="text-zinc-400 dark:text-zinc-500 block text-[10px] uppercase font-bold">Next Checkup</span>
                <span className="font-extrabold text-zinc-800 dark:text-zinc-200">{pilot.nextCheckup}</span>
              </div>
              <div className="p-2 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200/80 dark:border-zinc-700 flex items-center justify-between col-span-2 sm:col-span-1">
                <div>
                  <span className="text-zinc-400 dark:text-zinc-500 block text-[10px] uppercase font-bold">Disbursed</span>
                  <span className="font-extrabold text-orange-600 dark:text-orange-400">{formatCurrency(pilot.disbursedGrant)}</span>
                </div>
                <Link to={`/government/pilots`}>
                  <Button variant="secondary" size="sm" className="h-7 px-2 text-[10px] font-bold dark:bg-zinc-800 dark:border-zinc-700">
                    Audit
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
