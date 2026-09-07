import React, { useState } from 'react';
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
  ShieldCheck,
  Flag,
  Activity,
  AlertCircle,
  FileText,
  Upload,
  Calendar,
  Send,
  MessageSquare,
  Plus,
  X,
  Radio,
  FileCheck,
  Check,
  Eye,
  Download,
  HelpCircle,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { useStartupPortal } from '../../context/StartupPortalContext';
import { STARTUP_PILOT_SUMMARY_STATS, ACTIVE_STARTUP_PILOT } from '../../data/startupPilotSandboxData';

export function StartupPilotsPage() {
  const { showToast } = useStartupPortal();

  // Local state for interactive pilot data initialized with rich ACTIVE_STARTUP_PILOT
  const [pilot, setPilot] = useState(ACTIVE_STARTUP_PILOT);
  const [activeTab, setActiveTab] = useState('pilots'); // 'pilots', 'milestones', 'kpis', 'documents', 'feedback'

  // Modals state
  const [isJourneyModalOpen, setIsJourneyModalOpen] = useState(false);
  const [isKpiModalOpen, setIsKpiModalOpen] = useState(false);
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [selectedFeedbackItem, setSelectedFeedbackItem] = useState(null);

  // Form states
  const [kpiForm, setKpiForm] = useState({
    kpiId: 'KPI-1',
    reportedValue: '89%',
    evidenceFile: 'Acoustic_Wave_Log_Week5.csv',
    remarks: 'Acoustic wave anomaly scan calibrated with Sector-4 canal flow gate.'
  });

  const [milestoneForm, setMilestoneForm] = useState({
    milestoneId: 'M3',
    summary: 'Completed 45 days of continuous acoustic wave telemetry across nodes 01-20. Simulated breach detected within 135s.',
    attachmentName: 'Mutha_Canal_Acoustic_45Day_Log.pdf'
  });

  const [docForm, setDocForm] = useState({
    docName: 'Maintenance Response Time Field Audit',
    docType: 'Audit Evidence',
    fileName: 'Pune_Sector4_Maintenance_Log_Sep.pdf'
  });

  const [replyText, setReplyText] = useState('');

  // Handlers
  const handleKpiSubmit = (e) => {
    e.preventDefault();
    if (!kpiForm.reportedValue.trim()) {
      showToast('Please enter the current reported KPI metric.', 'error');
      return;
    }

    setPilot((prev) => ({
      ...prev,
      kpis: prev.kpis.map((k) =>
        k.id === kpiForm.kpiId
          ? {
              ...k,
              current: kpiForm.reportedValue,
              lastReported: 'Just now',
              reviewStatus: 'Submitted for Government Review',
              evidenceFile: kpiForm.evidenceFile || k.evidenceFile
            }
          : k
      )
    }));

    setIsKpiModalOpen(false);
    showToast('KPI telemetry reading submitted for government review!', 'success');
  };

  const handleMilestoneSubmit = (e) => {
    e.preventDefault();
    if (!milestoneForm.summary.trim()) {
      showToast('Please provide a milestone completion summary.', 'error');
      return;
    }

    setPilot((prev) => ({
      ...prev,
      milestones: prev.milestones.map((m) =>
        m.id === milestoneForm.milestoneId
          ? {
              ...m,
              status: 'Submitted for Review',
              disbursal: 'In Review for Tranche Signoff'
            }
          : m
      )
    }));

    setIsMilestoneModalOpen(false);
    showToast('Milestone evidence dossier submitted for department inspection!', 'success');
  };

  const handleDocSubmit = (e) => {
    e.preventDefault();
    if (!docForm.docName.trim()) {
      showToast('Please enter the document title.', 'error');
      return;
    }

    const newDoc = {
      id: `DOC-0${pilot.documents.length + 1}`,
      name: docForm.docName,
      type: docForm.docType,
      date: 'Today',
      status: 'Submitted',
      fileSize: '3.6 MB'
    };

    setPilot((prev) => ({
      ...prev,
      documents: [newDoc, ...prev.documents],
      actionRequired: {
        ...prev.actionRequired,
        active: false
      }
    }));

    setIsDocModalOpen(false);
    showToast('Document uploaded and submitted for department review!', 'success');
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) {
      showToast('Please enter your response message.', 'error');
      return;
    }

    if (!selectedFeedbackItem) return;

    setPilot((prev) => ({
      ...prev,
      feedback: prev.feedback.map((fb) =>
        fb.id === selectedFeedbackItem.id
          ? {
              ...fb,
              status: 'Responded',
              actionRequired: false,
              replies: [
                ...fb.replies,
                {
                  sender: 'AquaSense Innovations (You)',
                  date: 'Today',
                  message: replyText
                }
              ]
            }
          : fb
      )
    }));

    setReplyText('');
    setIsReplyModalOpen(false);
    showToast('Response dispatched to department nodal officer!', 'success');
  };

  const completedMilestonesCount = pilot.milestones.filter(
    (m) => m.status === 'Completed'
  ).length;

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Top Header Banner */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/40 px-2.5 py-0.5 rounded-full border border-orange-200 dark:border-orange-800/60 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              Pilot Sandbox Workspace
            </span>
            <span className="text-xs text-zinc-500 font-medium">
              Maharashtra State Innovation Testbed Framework
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight">
            Pilot Sandbox
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Manage your government pilot, track progress, submit evidence and demonstrate impact.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsJourneyModalOpen(true)}
            className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600" />
            <span>View My Journey →</span>
          </button>
        </div>
      </div>

      {/* 2. Top 4 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Pilot */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Active Pilot</span>
            <div className="w-8 h-8 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 flex items-center justify-center">
              <Rocket className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white">
              {STARTUP_PILOT_SUMMARY_STATS.activePilotsCount}
            </span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              1 in Field Testing
            </span>
          </div>
          <p className="text-xs text-zinc-500">
            {STARTUP_PILOT_SUMMARY_STATS.activePilotsSubtitle}
          </p>
        </div>

        {/* Milestones */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Milestones</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center">
              <Flag className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white">
              {STARTUP_PILOT_SUMMARY_STATS.milestonesCleared}
            </span>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
              {STARTUP_PILOT_SUMMARY_STATS.milestonesProgressPercent}% Cleared
            </span>
          </div>
          <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${STARTUP_PILOT_SUMMARY_STATS.milestonesProgressPercent}%` }}
            />
          </div>
        </div>

        {/* Active KPIs */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Active KPIs</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white">
              {STARTUP_PILOT_SUMMARY_STATS.activeKpisCount}
            </span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              {STARTUP_PILOT_SUMMARY_STATS.kpiHealthPercent}% Health
            </span>
          </div>
          <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${STARTUP_PILOT_SUMMARY_STATS.kpiHealthPercent}%` }}
            />
          </div>
        </div>

        {/* Budget Utilization */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Budget Utilization</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 flex items-center justify-center">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-white">
              {STARTUP_PILOT_SUMMARY_STATS.budgetDisbursedDisplay}
            </span>
            <span className="text-xs text-zinc-500 font-medium">({STARTUP_PILOT_SUMMARY_STATS.budgetSubtitle})</span>
          </div>
          <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-purple-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${STARTUP_PILOT_SUMMARY_STATS.budgetDisbursedPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3. Five Lifecycle Tabs */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs overflow-hidden">
        <div className="flex items-center overflow-x-auto border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 px-4 sm:px-6 pt-3 gap-2 sm:gap-6 no-scrollbar">
          {[
            { id: 'pilots', label: 'My Pilots', count: 1 },
            { id: 'milestones', label: 'Upcoming Milestones', count: 2 },
            { id: 'kpis', label: 'KPI Performance', count: pilot.kpis.length },
            { id: 'documents', label: 'Documents & Submissions', count: pilot.documents.length },
            { id: 'feedback', label: 'Government Feedback', count: pilot.feedback.length, alert: pilot.feedback.some(f => f.actionRequired) }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-1 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-orange-600 text-orange-600 dark:text-orange-400'
                  : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <span>{tab.label}</span>
              {tab.alert ? (
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              ) : (
                <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* TAB 1: MY PILOTS (Default) */}
          {activeTab === 'pilots' && (
            <div className="space-y-6">
              {/* Active Pilot Card */}
              <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 bg-zinc-50/30 dark:bg-zinc-900/30 space-y-6 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
                {/* Header Row */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-950/60 px-2.5 py-0.5 rounded border border-orange-200 dark:border-orange-800">
                        {pilot.id}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {pilot.status}
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                        {pilot.operationalState}
                      </span>
                      <span className="text-xs text-zinc-500">
                        Ref: <strong className="font-mono text-zinc-700 dark:text-zinc-300">{pilot.applicationId}</strong>
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-white tracking-tight">
                      {pilot.title}
                    </h2>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 pt-1">
                      <span className="flex items-center gap-1 font-medium">
                        <Building2 className="w-3.5 h-3.5 text-zinc-400" />
                        {pilot.department}
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                        {pilot.specificTestbed}
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                        {pilot.duration}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-600 dark:text-zinc-400 pt-1 leading-relaxed">
                      {pilot.about}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap lg:flex-col items-stretch gap-2.5 shrink-0">
                    <Link
                      to={`/startup/pilots/${pilot.id}`}
                      className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Open Pilot Workspace</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => setIsKpiModalOpen(true)}
                      className="px-5 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 text-zinc-800 dark:text-zinc-200 text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Radio className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Submit KPI Data</span>
                    </button>
                  </div>
                </div>

                {/* Progress Indicators Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  {/* Milestone Progress */}
                  <div className="space-y-2 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                        Milestone Progress
                      </span>
                      <span className="font-black text-zinc-950 dark:text-white">
                        {pilot.progress}% • {pilot.currentMilestoneLabel}
                      </span>
                    </div>
                    <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${pilot.progress}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-zinc-500 flex items-center justify-between">
                      <span>Currently executing: <strong>{pilot.currentPhase}</strong></span>
                      <span className="text-emerald-600 font-semibold">{completedMilestonesCount} of {pilot.milestones.length} Completed</span>
                    </p>
                  </div>

                  {/* Budget Utilization */}
                  <div className="space-y-2 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                        Budget Utilization
                      </span>
                      <span className="font-black text-purple-600 dark:text-purple-400">
                        {pilot.budget.utilizationPercent}% Disbursed
                      </span>
                    </div>
                    <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-purple-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${pilot.budget.utilizationPercent}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-zinc-500 flex items-center justify-between">
                      <span>{pilot.budget.currentTranche}</span>
                      <span>Total: <strong>{pilot.budget.sanctioned}</strong></span>
                    </p>
                  </div>
                </div>

                {/* Expected Outcomes Checklist */}
                <div className="pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-2">
                    Contracted Deliverables & Impact Targets
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {pilot.expectedOutcomes.map((outcome, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300 font-medium"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4. Contextual Advice Banner */}
              <div className="bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5 max-w-3xl">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-200">
                      Next Action Required: {pilot.actionRequired.reason}
                    </h4>
                    <p className="text-xs text-amber-700 dark:text-amber-400">
                      Upload week 8 acoustic telemetry calibration log to unlock Milestone 4 review. Due by{' '}
                      <strong>{pilot.actionRequired.dueDate}</strong> • Requested by {pilot.actionRequired.department}.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsDocModalOpen(true)}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0 self-start sm:self-center cursor-pointer flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Now</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: UPCOMING MILESTONES */}
          {activeTab === 'milestones' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                    Pilot Milestone Roadmap & Tranche Disbursal Schedule
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Sanctioned timeline established with the Government of Maharashtra Water Resources Department.
                  </p>
                </div>

                <button
                  onClick={() => setIsMilestoneModalOpen(true)}
                  className="px-3.5 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Submit Deliverable</span>
                </button>
              </div>

              <div className="space-y-3 pt-2">
                {pilot.milestones.map((m, idx) => {
                  const isDone = m.status === 'Completed';
                  const isCurrent = m.status === 'In Progress';

                  return (
                    <div
                      key={m.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        isCurrent
                          ? 'bg-orange-50/40 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800/60 shadow-xs'
                          : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-3.5 max-w-3xl">
                          <div
                            className={`w-8 h-8 rounded-full text-xs font-black flex items-center justify-center shrink-0 mt-0.5 ${
                              isDone
                                ? 'bg-emerald-600 text-white'
                                : isCurrent
                                ? 'bg-orange-600 text-white shadow-xs animate-pulse'
                                : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'
                            }`}
                          >
                            {isDone ? <Check className="w-4 h-4" /> : idx + 1}
                          </div>

                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-mono text-xs font-bold text-zinc-600 dark:text-zinc-400">
                                {m.id}
                              </span>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  isDone
                                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                    : isCurrent
                                    ? 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300'
                                    : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                                }`}
                              >
                                {m.status}
                              </span>
                              <span className="text-xs text-zinc-400 font-medium">
                                • {m.dates}
                              </span>
                            </div>

                            <h4 className="text-sm font-bold text-zinc-950 dark:text-white">
                              {m.title}
                            </h4>

                            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                              {m.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-zinc-500">
                              <FileCheck className="w-3.5 h-3.5 text-zinc-400" />
                              <span>Required Deliverable:</span>
                              <span className="font-mono text-zinc-800 dark:text-zinc-200 font-medium">
                                {m.requiredEvidence}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center shrink-0 border-t md:border-t-0 pt-2 md:pt-0 border-zinc-200 dark:border-zinc-800">
                          <span className="text-[11px] text-zinc-500 font-medium">Tranche Allocation</span>
                          <span className="text-xs font-black text-zinc-900 dark:text-white">
                            {m.disbursal}
                          </span>
                          {isCurrent && (
                            <button
                              onClick={() => {
                                setMilestoneForm((prev) => ({ ...prev, milestoneId: m.id }));
                                setIsMilestoneModalOpen(true);
                              }}
                              className="mt-1.5 px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white text-[11px] font-bold rounded-lg cursor-pointer"
                            >
                              Submit Evidence
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: KPI PERFORMANCE */}
          {activeTab === 'kpis' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                    KPI Performance & Telemetry Validation
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Targets set by the Government Sanction Committee. Readings submitted are reviewed by the Nodal Engineer.
                  </p>
                </div>

                <button
                  onClick={() => setIsKpiModalOpen(true)}
                  className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Submit New Reading</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-2">
                {pilot.kpis.map((kpi) => (
                  <div
                    key={kpi.id}
                    className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-zinc-600 dark:text-zinc-400">
                          {kpi.id}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            kpi.status === 'On Track'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : kpi.status === 'In Progress'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          }`}
                        >
                          {kpi.status}
                        </span>
                        <span className="text-xs text-zinc-500">
                          Frequency: <strong>{kpi.frequency}</strong>
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-zinc-950 dark:text-white">
                        {kpi.name}
                      </h4>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                        <span>Latest File: <strong className="font-mono text-zinc-700 dark:text-zinc-300">{kpi.evidenceFile}</strong></span>
                        <span>•</span>
                        <span>Updated: {kpi.lastReported}</span>
                        <span>•</span>
                        <span className="font-semibold text-emerald-600">{kpi.reviewStatus}</span>
                      </div>
                    </div>

                    {/* Metrics Box */}
                    <div className="grid grid-cols-3 gap-3 shrink-0 text-center">
                      <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-700/60">
                        <span className="text-[10px] font-bold text-zinc-400 block uppercase">Baseline</span>
                        <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">{kpi.baseline}</span>
                      </div>

                      <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-700/60">
                        <span className="text-[10px] font-bold text-zinc-400 block uppercase">Target (Gov)</span>
                        <span className="text-xs font-bold text-zinc-950 dark:text-white">{kpi.target}</span>
                      </div>

                      <div className="p-3 bg-orange-50/60 dark:bg-orange-950/30 rounded-xl border border-orange-200 dark:border-orange-800/60">
                        <span className="text-[10px] font-bold text-orange-600 block uppercase">Reported</span>
                        <span className="text-xs font-black text-orange-600">{kpi.current}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: DOCUMENTS & SUBMISSIONS */}
          {activeTab === 'documents' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                    Compliance Documents & Evidence Dossiers
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Official pilot documentation submitted to the Maharashtra Water Resources Nodal Desk.
                  </p>
                </div>

                <button
                  onClick={() => setIsDocModalOpen(true)}
                  className="px-3.5 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Document</span>
                </button>
              </div>

              {pilot.actionRequired.active && (
                <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-amber-900 dark:text-amber-200">
                        Pending Required Evidence: {pilot.actionRequired.reason}
                      </p>
                      <p className="text-[11px] text-amber-700 dark:text-amber-400">
                        Due: {pilot.actionRequired.dueDate} • Requested by {pilot.actionRequired.department}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsDocModalOpen(true)}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shrink-0 cursor-pointer"
                  >
                    Upload Now
                  </button>
                </div>
              )}

              <div className="space-y-2.5 pt-1">
                {pilot.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-zinc-950 dark:text-white">
                          {doc.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                          <span>{doc.type}</span>
                          <span>•</span>
                          <span>{doc.fileSize}</span>
                          <span>•</span>
                          <span>{doc.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                          doc.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : doc.status === 'Submitted'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}
                      >
                        {doc.status}
                      </span>
                      <button
                        onClick={() => showToast(`Downloading ${doc.name}`, 'info')}
                        className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
                        title="Download Document"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: GOVERNMENT FEEDBACK */}
          {activeTab === 'feedback' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                  Government Nodal Officer Communications
                </h3>
                <p className="text-xs text-zinc-500">
                  Two-way communication thread between AquaSense Innovations and the Department of Water Resources.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {pilot.feedback.map((fb) => (
                  <div
                    key={fb.id}
                    className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-zinc-900 dark:text-white">
                            {fb.officer}
                          </span>
                          <span className="text-[10px] text-zinc-400 font-medium">
                            • {fb.date}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              fb.status === 'New'
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            }`}
                          >
                            {fb.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-500">{fb.department}</p>
                      </div>

                      {fb.actionRequired && (
                        <button
                          onClick={() => {
                            setSelectedFeedbackItem(fb);
                            setIsReplyModalOpen(true);
                          }}
                          className="px-3.5 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shrink-0"
                        >
                          <Send className="w-3 h-3" />
                          <span>Reply to Department</span>
                        </button>
                      )}
                    </div>

                    <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed">
                      {fb.message}
                    </div>

                    {/* Replies */}
                    {fb.replies.length > 0 && (
                      <div className="space-y-2 pl-4 border-l-2 border-orange-500">
                        {fb.replies.map((reply, rIdx) => (
                          <div
                            key={rIdx}
                            className="p-3 bg-orange-50/50 dark:bg-orange-950/20 rounded-xl border border-orange-200/60 dark:border-orange-900/40 space-y-1"
                          >
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="font-bold text-orange-900 dark:text-orange-300">
                                {reply.sender}
                              </span>
                              <span className="text-zinc-400">{reply.date}</span>
                            </div>
                            <p className="text-xs text-zinc-700 dark:text-zinc-300">{reply.message}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL 1: VIEW MY JOURNEY MODAL */}
      {isJourneyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-3xl w-full p-6 space-y-6 shadow-2xl animate-in fade-in my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                  Public Sector Innovation-to-Impact Lifecycle
                </span>
                <h2 className="text-xl font-black text-zinc-950 dark:text-white">
                  Government Pilot Sandbox Journey
                </h2>
                <p className="text-xs text-zinc-500">
                  How AquaSense Innovations progresses from initial opportunity to statewide public procurement.
                </p>
              </div>

              <button
                onClick={() => setIsJourneyModalOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stages Flow */}
            <div className="space-y-3">
              {[
                { step: 1, title: 'Innovation Assessment', status: 'Completed', desc: 'AI-driven evaluation of technical fit, TRL 7 readiness, and DPIIT verification.' },
                { step: 2, title: 'Pilot Recommended', status: 'Completed', desc: 'Evaluation panel approves proposal for pilot testbed deployment.' },
                { step: 3, title: 'Create Pilot Charter', status: 'Completed', desc: 'Tripartite sandbox agreement between startup, department, and Maharashtra Innovation Council.' },
                { step: 4, title: 'Select Testbed', status: 'Completed', desc: 'Testbed assigned: Mutha Irrigation Corridor (Sector 4, Pune District).' },
                { step: 5, title: 'Define Pilot + KPIs + Budget', status: 'Completed', desc: '5 official KPIs and ₹35.0 Lakhs escrow grant allocation ratified.' },
                { step: 6, title: 'Government Approval', status: 'Completed', desc: 'Administrative sanction signed by Principal Secretary (Water Resources).' },
                { step: 7, title: 'Field Deployment (Current Stage)', status: 'Active', desc: '20 acoustic telemetry nodes live. LoRaWAN packets transmitting to Mantralaya SCADA.', isCurrent: true },
                { step: 8, title: 'Monitor KPIs & Milestones', status: 'In Progress', desc: 'Continuous telemetry logging, leak drill tests, and tranche 2 verification.' },
                { step: 9, title: 'Pilot Outcome Evaluation', status: 'Upcoming', desc: 'Impact assessment against benchmark loss reduction and response latency.' },
                { step: 10, title: 'Scale / Direct GeM Procurement', status: 'Upcoming', desc: 'Direct catalog onboarding under Rule 149/194 for statewide expansion.' }
              ].map((stage) => (
                <div
                  key={stage.step}
                  className={`p-3.5 rounded-xl border flex items-start gap-3.5 transition-all ${
                    stage.isCurrent
                      ? 'bg-orange-50 dark:bg-orange-950/30 border-orange-300 dark:border-orange-800 shadow-xs'
                      : stage.status === 'Completed'
                      ? 'bg-emerald-50/40 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-800/40'
                      : 'bg-zinc-50/50 dark:bg-zinc-800/30 border-zinc-200 dark:border-zinc-800'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full text-xs font-black flex items-center justify-center shrink-0 mt-0.5 ${
                      stage.isCurrent
                        ? 'bg-orange-600 text-white animate-pulse'
                        : stage.status === 'Completed'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-500'
                    }`}
                  >
                    {stage.status === 'Completed' ? <Check className="w-3.5 h-3.5" /> : stage.step}
                  </div>

                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-zinc-950 dark:text-white">
                        {stage.title}
                      </h4>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          stage.isCurrent
                            ? 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300'
                            : stage.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800'
                        }`}
                      >
                        {stage.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2 border-t border-zinc-200 dark:border-zinc-800">
              <button
                onClick={() => setIsJourneyModalOpen(false)}
                className="px-5 py-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 text-xs font-bold rounded-xl cursor-pointer"
              >
                Close Journey Map
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: SUBMIT KPI DATA */}
      {isKpiModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h2 className="text-base font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                  <Radio className="w-4 h-4 text-indigo-600" />
                  <span>Submit Telemetry & KPI Reading</span>
                </h2>
                <p className="text-xs text-zinc-500">
                  Transmits verified sensor reading to the department evaluation dashboard.
                </p>
              </div>
              <button
                onClick={() => setIsKpiModalOpen(false)}
                className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleKpiSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Select Target KPI
                </label>
                <select
                  value={kpiForm.kpiId}
                  onChange={(e) => setKpiForm({ ...kpiForm, kpiId: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs text-zinc-900 dark:text-white font-medium outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {pilot.kpis.map((kpi) => (
                    <option key={kpi.id} value={kpi.id}>
                      {kpi.id}: {kpi.name} (Target: {kpi.target})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Current Measured Reading <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 89% or 135s or 3.2 hrs"
                  value={kpiForm.reportedValue}
                  onChange={(e) => setKpiForm({ ...kpiForm, reportedValue: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-bold text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Supporting CSV / Telemetry Dataset Filename
                </label>
                <input
                  type="text"
                  value={kpiForm.evidenceFile}
                  onChange={(e) => setKpiForm({ ...kpiForm, evidenceFile: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-mono text-zinc-900 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Measurement Remarks & Sensor Nodes Checked
                </label>
                <textarea
                  rows={3}
                  value={kpiForm.remarks}
                  onChange={(e) => setKpiForm({ ...kpiForm, remarks: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs text-zinc-900 dark:text-white outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsKpiModalOpen(false)}
                  className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Submit for Government Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: SUBMIT MILESTONE EVIDENCE */}
      {isMilestoneModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h2 className="text-base font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                  <Flag className="w-4 h-4 text-orange-600" />
                  <span>Submit Milestone Deliverable Dossier</span>
                </h2>
                <p className="text-xs text-zinc-500">
                  Notify the Nodal Inspection Committee to review completed deliverables and disburse tranches.
                </p>
              </div>
              <button
                onClick={() => setIsMilestoneModalOpen(false)}
                className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleMilestoneSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Select Milestone
                </label>
                <select
                  value={milestoneForm.milestoneId}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, milestoneId: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs text-zinc-900 dark:text-white font-medium outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {pilot.milestones.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.id}: {m.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Field Completion Summary <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detail testbed observations, deployment chainage, hardware integrity, or validation trials conducted..."
                  value={milestoneForm.summary}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, summary: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Attachment Name / Field Report PDF
                </label>
                <input
                  type="text"
                  value={milestoneForm.attachmentName}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, attachmentName: e.target.value })}
                  className="w-full px-3.5 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-mono text-zinc-900 dark:text-white outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsMilestoneModalOpen(false)}
                  className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Dispatch for Verification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: UPLOAD DOCUMENT */}
      {isDocModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h2 className="text-base font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                  <Upload className="w-4 h-4 text-orange-600" />
                  <span>Upload Compliance Document</span>
                </h2>
                <p className="text-xs text-zinc-500">
                  Upload PDF audits, CSV datasets, or deployment photographs for the pilot testbed.
                </p>
              </div>
              <button
                onClick={() => setIsDocModalOpen(false)}
                className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDocSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Document Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={docForm.docName}
                  onChange={(e) => setDocForm({ ...docForm, docName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-bold text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Document Category
                </label>
                <select
                  value={docForm.docType}
                  onChange={(e) => setDocForm({ ...docForm, docType: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs text-zinc-900 dark:text-white font-medium outline-none"
                >
                  <option value="Audit Evidence">Audit Evidence</option>
                  <option value="Progress Report">Progress Report</option>
                  <option value="Data File">Data File / CSV</option>
                  <option value="Technical Document">Technical Document</option>
                  <option value="Images">Deployment Images</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  File Attachment Name
                </label>
                <input
                  type="text"
                  value={docForm.fileName}
                  onChange={(e) => setDocForm({ ...docForm, fileName: e.target.value })}
                  className="w-full px-3.5 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-mono text-zinc-900 dark:text-white outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsDocModalOpen(false)}
                  className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Upload & Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: REPLY TO GOVERNMENT FEEDBACK */}
      {isReplyModalOpen && selectedFeedbackItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h2 className="text-base font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-orange-600" />
                  <span>Reply to Government Department</span>
                </h2>
                <p className="text-xs text-zinc-500">
                  Responding to: {selectedFeedbackItem.officer} ({selectedFeedbackItem.department})
                </p>
              </div>
              <button
                onClick={() => setIsReplyModalOpen(false)}
                className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-700 dark:text-zinc-300 italic">
              "{selectedFeedbackItem.message}"
            </div>

            <form onSubmit={handleReplySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Your Official Response <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide clarifying remarks, schedule updates, or explain evidence uploaded..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsReplyModalOpen(false)}
                  className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Send Response
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default StartupPilotsPage;
