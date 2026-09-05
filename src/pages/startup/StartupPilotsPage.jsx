import React from 'react';
import { Link } from 'react-router-dom';
import {
  Rocket,
  Building2,
  MapPin,
  Coins,
  Clock,
  CheckCircle2,
  ChevronRight,
  BarChart3,
  Layers,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { useStartupPortal } from '../../context/StartupPortalContext';

export function StartupPilotsPage() {
  const { pilots } = useStartupPortal();

  return (
    <div className="space-y-6 pb-16">
      {/* Header Banner */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/60">
              Operational Sandboxes
            </span>
            <span className="text-xs text-zinc-500 font-medium">
              Maharashtra State Sandbox Pilot Framework
            </span>
          </div>
          <h1 className="text-2xl font-black text-zinc-950 dark:text-white tracking-tight">
            Pilot Execution Tracker
          </h1>
          <p className="text-xs text-zinc-500 max-w-xl">
            Live public sector field deployments. Track milestone progress, submit KPI telemetry evidence,
            and inspect escrow grant tranche disbursements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[11px] text-zinc-500 font-medium">Active Pilots</p>
            <p className="text-lg font-black text-emerald-600">{pilots.length} Live</p>
          </div>
        </div>
      </div>

      {/* Pilots List */}
      <div className="space-y-6">
        {pilots.map((pilot) => {
          const completedMilestones = pilot.milestones.filter((m) => m.status === 'Completed').length;
          const totalMilestones = pilot.milestones.length;
          const milestonePercent = Math.round((completedMilestones / totalMilestones) * 100);

          const pilotName = pilot.name || pilot.opportunityTitle || 'Sandbox Pilot';
          const pilotLocation = pilot.testbedLocation || pilot.location || 'Pune District, Maharashtra';
          const pilotSanction = typeof pilot.sanctionedGrant === 'number'
            ? `₹${(pilot.sanctionedGrant / 100000).toFixed(1)} Lakhs`
            : pilot.sanctionAmount || '₹35.0 Lakhs';
          const pilotDisbursed = typeof pilot.disbursedGrant === 'number'
            ? `₹${(pilot.disbursedGrant / 100000).toFixed(1)} Lakhs`
            : pilot.disbursedAmount || '₹10.5 Lakhs';

          return (
            <div
              key={pilot.id}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-6 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
            >
              {/* Pilot Header */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/60">
                      {pilot.id}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60">
                      {pilot.status || 'Active Field Testing'}
                    </span>
                    <span className="text-xs text-zinc-500">
                      RFP Ref: <strong>{pilot.opportunityId}</strong>
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-black text-zinc-950 dark:text-white">
                    {pilotName}
                  </h2>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 pt-1">
                    <span className="flex items-center gap-1 font-medium">
                      <Building2 className="w-3.5 h-3.5 text-zinc-400" />
                      {pilot.department}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                      {pilotLocation}
                    </span>
                    <span className="flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400">
                      <Coins className="w-3.5 h-3.5" />
                      Sanction: <strong>{pilotSanction}</strong>
                    </span>
                  </div>
                </div>

                <Link
                  to={`/startup/pilots/${pilot.id}`}
                  className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 shrink-0 self-start cursor-pointer"
                >
                  <span>Open Pilot Control Desk</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Milestone & Escrow Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                    Milestone Progress
                  </span>
                  <p className="text-lg font-black text-zinc-950 dark:text-white">
                    {completedMilestones} of {totalMilestones} Cleared
                  </p>
                  <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${milestonePercent}%` }} />
                  </div>
                </div>

                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                    Escrow Grant Disbursed
                  </span>
                  <p className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                    {pilotDisbursed}
                  </p>
                  <p className="text-[11px] text-zinc-500">
                    Tranche 1 (30% Mobilization Advance Released)
                  </p>
                </div>

                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                    Telemetry Stream
                  </span>
                  <p className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                    {pilot.kpis.length} Active KPIs
                  </p>
                  <p className="text-[11px] text-zinc-500">
                    LoRaWAN sensor packet transmission healthy
                  </p>
                </div>
              </div>

              {/* Milestones Preview */}
              <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">
                  Sanctioned Roadmap
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {pilot.milestones.map((m) => {
                    const mTitle = m.name || m.title;
                    const mDate = m.targetDate || m.dueDate || '2026-10-30';
                    const mDisbursal = m.grantDisbursal || (m.payoutPercentage ? `${m.payoutPercentage}% Grant` : 'Grant Tranche');

                    return (
                      <div
                        key={m.id}
                        className="p-3 bg-zinc-50/50 dark:bg-zinc-800/30 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] font-bold text-zinc-500">{m.id}</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              m.status === 'Completed'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : m.status === 'In Progress'
                                ? 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300'
                                : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                            }`}
                          >
                            {m.status}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                          {mTitle}
                        </p>
                        <p className="text-[11px] text-zinc-500">
                          Payout: <strong>{mDisbursal}</strong> ({mDate})
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
