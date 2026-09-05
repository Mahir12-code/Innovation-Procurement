import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Rocket,
  Target,
  FileText,
  Clock,
  AlertCircle,
  Building2,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Coins,
  Bell
} from 'lucide-react';
import { useStartupPortal } from '../../context/StartupPortalContext';

export function StartupDashboardPage() {
  const navigate = useNavigate();
  const {
    profile,
    opportunities,
    applications,
    clarifications,
    pilots,
    notifications,
    createDraftApplication
  } = useStartupPortal();

  // Filter applications
  const drafts = applications.filter((a) => a.status === 'Draft');
  const activeApps = applications.filter((a) => a.status !== 'Draft');
  const openClarifications = clarifications.filter(
    (c) => c.status === 'Pending Response' || c.status === 'Clarification Required'
  );
  const activePilot = pilots[0];

  const handleApplyNow = (oppId) => {
    const draftId = createDraftApplication(oppId);
    if (draftId) {
      navigate(`/startup/applications/${draftId}/edit`);
    }
  };

  return (
    <div className="space-y-6 pb-16 max-w-7xl mx-auto">
      {/* -------------------------------------------------- */}
      {/* 1. MINIMAL GREETING BANNER (NO REDUNDANT BUTTONS)  */}
      {/* -------------------------------------------------- */}
      <div className="border-b border-zinc-200/80 dark:border-zinc-800 pb-5">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-800/60">
            DPIIT Verified: {profile.dpiitNumber}
          </span>
          <span className="text-xs text-zinc-400">•</span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            {profile.stage}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight">
          Welcome, {profile.founderName} 👋
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          <strong className="text-zinc-900 dark:text-zinc-200 font-bold">{profile.name}</strong> — Government of Maharashtra Innovation Procurement Desk
        </p>
      </div>

      {/* -------------------------------------------------- */}
      {/* 2. MINIMAL SUMMARY KPI METRICS TILES               */}
      {/* -------------------------------------------------- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div
          onClick={() => navigate('/startup/opportunities')}
          className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              Live Challenges
            </span>
            <Target className="w-4 h-4 group-hover:text-orange-600 transition-colors" />
          </div>
          <div className="text-2xl font-black text-zinc-950 dark:text-white">
            {opportunities.length}
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1 block">
            Published & Open
          </span>
        </div>

        {/* Metric 2 */}
        <div
          onClick={() => navigate('/startup/applications')}
          className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              My Applications
            </span>
            <FileText className="w-4 h-4 group-hover:text-orange-600 transition-colors" />
          </div>
          <div className="text-2xl font-black text-zinc-950 dark:text-white">
            {applications.length}
          </div>
          <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium mt-1 block">
            {drafts.length} Draft • {activeApps.length} Submitted
          </span>
        </div>

        {/* Metric 3 */}
        <div
          onClick={() => navigate('/startup/pilots')}
          className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              Active Pilots
            </span>
            <Rocket className="w-4 h-4 group-hover:text-orange-600 transition-colors" />
          </div>
          <div className="text-2xl font-black text-orange-600 dark:text-orange-400">
            {pilots.length}
          </div>
          <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium mt-1 block">
            ₹35L Sanctioned Sandbox
          </span>
        </div>

        {/* Metric 4 */}
        <div
          onClick={() => navigate('/startup/clarifications')}
          className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              Action Required
            </span>
            <AlertCircle
              className={`w-4 h-4 ${
                openClarifications.length > 0 ? 'text-amber-500 animate-pulse' : 'text-zinc-400'
              }`}
            />
          </div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400">
            {openClarifications.length}
          </div>
          <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold mt-1 block">
            {openClarifications.length > 0 ? 'Clarification Pending' : 'All Clear'}
          </span>
        </div>
      </div>

      {/* -------------------------------------------------- */}
      {/* 3. URGENT CLARIFICATION BANNER (MINIMAL & FOCUSED)  */}
      {/* -------------------------------------------------- */}
      {openClarifications.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="space-y-0.5 text-xs">
              <span className="font-bold text-amber-950 dark:text-amber-200 block text-sm">
                Clarification Required on Application {openClarifications[0].applicationId}
              </span>
              <p className="text-amber-800 dark:text-amber-300">
                {openClarifications[0].requestTitle} — Requested by{' '}
                <strong>{openClarifications[0].department}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={() =>
              navigate(
                `/startup/applications/${openClarifications[0].applicationId}/clarifications`
              )
            }
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            Respond Now <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* -------------------------------------------------- */}
      {/* 4. ACTIVE SANDBOX PILOT SHOWCASE (CLEAN, NO CLUTTER)*/}
      {/* -------------------------------------------------- */}
      {activePilot && (
        <div
          onClick={() => navigate(`/startup/pilots/${activePilot.id}`)}
          className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-xs space-y-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer group"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-orange-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Rocket className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                  Pilot Execution Tracker
                </span>
                <h2 className="text-sm sm:text-base font-bold text-zinc-950 dark:text-white group-hover:text-orange-600 transition-colors">
                  {activePilot.name || activePilot.opportunityTitle}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-lg border border-emerald-200 dark:border-emerald-800/60">
                {activePilot.status}
              </span>
              <span className="text-xs font-bold text-zinc-500 group-hover:text-orange-600 transition-colors flex items-center gap-0.5">
                Open Workspace <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
            <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800 space-y-1">
              <span className="text-[10px] font-bold uppercase text-zinc-400 block">
                Current Milestone
              </span>
              <div className="font-bold text-zinc-900 dark:text-zinc-100">
                {activePilot.milestones[activePilot.currentMilestoneIndex]?.name || 'Milestone 3 in execution'}
              </div>
              <span className="text-[11px] text-zinc-500">
                Due: {activePilot.milestones[activePilot.currentMilestoneIndex]?.targetDate || '2026-10-30'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800 space-y-1">
              <span className="text-[10px] font-bold uppercase text-zinc-400 block">
                Field Telemetry
              </span>
              <div className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                99.2% Uptime
              </div>
              <span className="text-[11px] text-zinc-500">
                20 Submerged Nodes across Mutha Canal
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800 space-y-1">
              <span className="text-[10px] font-bold uppercase text-zinc-400 block">
                Escrow Grant
              </span>
              <div className="font-bold text-zinc-900 dark:text-zinc-100">
                ₹10.5L Disbursed (Tranche 1)
              </div>
              <span className="text-[11px] text-zinc-500">
                Total Sanction: ₹35.0 Lakhs
              </span>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------- */}
      {/* 5. MAIN SPLIT: OPPORTUNITIES & APPLICATIONS        */}
      {/* -------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 Cols): Opportunities (Streamlined, Single Action) */}
        <div className="lg:col-span-7 space-y-3.5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-zinc-950 dark:text-white flex items-center gap-2">
              Published Government Opportunities
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                {opportunities.length} Open
              </span>
            </h2>
            <button
              onClick={() => navigate('/startup/opportunities')}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors flex items-center gap-0.5 cursor-pointer"
            >
              Browse All <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {opportunities.slice(0, 3).map((opp) => (
              <div
                key={opp.id}
                onClick={() => navigate(`/startup/opportunities/${opp.id}`)}
                className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer group space-y-2.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      {opp.sector}
                    </span>
                    <h3 className="font-bold text-sm text-zinc-950 dark:text-white group-hover:text-orange-600 transition-colors leading-snug">
                      {opp.title}
                    </h3>
                    <span className="text-xs text-zinc-500">
                      {opp.department}
                    </span>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-black text-zinc-900 dark:text-white block">
                      {opp.budget}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-medium">Grant Ceiling</span>
                  </div>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                  {opp.problemStatement}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800/80 text-xs">
                  <span className="text-zinc-500 flex items-center gap-1.5 font-medium text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-orange-500" />
                    Deadline: {opp.deadline} ({opp.daysRemaining} days left)
                  </span>

                  <span className="text-xs font-bold text-orange-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    View Details & Apply <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (5 Cols): Applications & Notifications */}
        <div className="lg:col-span-5 space-y-6">
          {/* Applications List */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-5 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-zinc-950 dark:text-white">
                My Challenge Applications
              </h2>
              <button
                onClick={() => navigate('/startup/applications')}
                className="text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors flex items-center gap-0.5"
              >
                View All <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {applications.slice(0, 4).map((app) => (
                <div
                  key={app.id}
                  onClick={() =>
                    app.status === 'Draft'
                      ? navigate(`/startup/applications/${app.id}/edit`)
                      : navigate(`/startup/applications/${app.id}`)
                  }
                  className="p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors cursor-pointer group space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-zinc-500">
                      {app.id}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        app.status === 'Selected for Pilot'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : app.status === 'Under Evaluation'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                          : app.status === 'Draft'
                          ? 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-xs text-zinc-900 dark:text-zinc-100 group-hover:text-orange-600 transition-colors line-clamp-1">
                    {app.opportunityTitle}
                  </h4>

                  <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-0.5">
                    <span>{app.department}</span>
                    <span>{app.currentStage}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Minimal Notifications Feed */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-zinc-400" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Recent Alerts
                </h2>
              </div>
              <button
                onClick={() => navigate('/startup/notifications')}
                className="text-[11px] font-bold text-orange-600 hover:text-orange-700 transition-colors"
              >
                Inbox →
              </button>
            </div>

            <div className="space-y-2">
              {notifications.slice(0, 3).map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => navigate(notif.route)}
                  className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                    notif.read
                      ? 'border-zinc-100 dark:border-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/30'
                      : 'border-orange-200/50 dark:border-orange-950/60 bg-orange-50/20 dark:bg-orange-950/10 text-zinc-900 dark:text-zinc-100 font-medium'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase">
                      {notif.type}
                    </span>
                    <span className="text-[10px] text-zinc-400">{notif.timestamp}</span>
                  </div>
                  <p className="text-xs leading-snug line-clamp-2">{notif.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
