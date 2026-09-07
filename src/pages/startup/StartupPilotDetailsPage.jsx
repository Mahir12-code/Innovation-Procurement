import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Rocket,
  Building2,
  MapPin,
  Coins,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Upload,
  Send,
  Plus,
  X,
  Radio,
  ExternalLink,
  ShieldCheck,
  Paperclip,
  TrendingUp,
  Award,
  Calendar,
  Layers,
  ChevronRight,
  Download,
  MessageSquare,
  Check,
  Info,
  Sparkles,
  FileCheck
} from 'lucide-react';
import { useStartupPortal } from '../../context/StartupPortalContext';
import { ACTIVE_STARTUP_PILOT } from '../../data/startupPilotSandboxData';

export function StartupPilotDetailsPage() {
  const { id } = useParams();
  const { showToast } = useStartupPortal();

  // Initialize pilot from active startup pilot data
  const [pilot, setPilot] = useState(ACTIVE_STARTUP_PILOT);

  // Tabs: 'overview', 'kpis', 'milestones', 'documents', 'feedback', 'outcome'
  const [activeTab, setActiveTab] = useState('overview');

  // Modals
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
  const [isKpiModalOpen, setIsKpiModalOpen] = useState(false);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [selectedFeedbackItem, setSelectedFeedbackItem] = useState(null);

  // Forms
  const [milestoneFormData, setMilestoneFormData] = useState({
    milestoneId: 'M3',
    milestoneName: 'Milestone 3: 60-Day Telemetry Uptime & Leak Pinpointing',
    summary: 'Nodes 01-20 have completed 45 days of uninterrupted acoustic capture. Simulated breach calibration pinpointed coordinate within ±3.2m.',
    attachmentName: 'Acoustic_45Day_Log_Drill_Report.pdf'
  });

  const [kpiFormData, setKpiFormData] = useState({
    kpiId: 'KPI-3',
    reportedValue: '3.1 hrs',
    evidenceFileName: 'Response_Time_Telemetry_Log_W6.csv',
    remarks: 'Acoustic trigger to nodal officer SMS delivery achieved in 3.1 hours under test breach.'
  });

  const [docFormData, setDocFormData] = useState({
    name: 'Maintenance Response Time Field Audit',
    type: 'Audit Evidence',
    fileName: 'Pune_Sector4_Maintenance_Audit_Report.pdf'
  });

  const [replyText, setReplyText] = useState('');

  // Handlers
  const handleMilestoneSubmit = (e) => {
    e.preventDefault();
    if (!milestoneFormData.summary.trim()) {
      showToast('Please provide a milestone progress summary.', 'error');
      return;
    }

    setPilot((prev) => ({
      ...prev,
      milestones: prev.milestones.map((m) =>
        m.id === milestoneFormData.milestoneId
          ? {
              ...m,
              status: 'Submitted for Review',
              disbursal: 'In Review for Tranche Signoff'
            }
          : m
      )
    }));

    setIsMilestoneModalOpen(false);
    showToast('Milestone deliverable dossier submitted to Department Nodal Officer!', 'success');
  };

  const handleKpiSubmit = (e) => {
    e.preventDefault();
    if (!kpiFormData.reportedValue.trim()) {
      showToast('Please enter the reported metric value.', 'error');
      return;
    }

    setPilot((prev) => ({
      ...prev,
      kpis: prev.kpis.map((kpi) =>
        kpi.id === kpiFormData.kpiId
          ? {
              ...kpi,
              current: kpiFormData.reportedValue,
              evidenceFile: kpiFormData.evidenceFileName || kpi.evidenceFile,
              lastReported: 'Just now',
              reviewStatus: 'Submitted for Government Review'
            }
          : kpi
      )
    }));

    setIsKpiModalOpen(false);
    showToast('KPI telemetry evidence submitted for department verification!', 'success');
  };

  const handleDocSubmit = (e) => {
    e.preventDefault();
    if (!docFormData.name.trim()) {
      showToast('Please enter document name.', 'error');
      return;
    }

    const newDoc = {
      id: `DOC-0${pilot.documents.length + 1}`,
      name: docFormData.name,
      type: docFormData.type,
      date: 'Today',
      status: 'Submitted',
      fileSize: '3.8 MB'
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
    showToast('Document uploaded and dispatched for review!', 'success');
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) {
      showToast('Please provide your response message.', 'error');
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
    showToast('Official response dispatched to Department Nodal Officer!', 'success');
  };

  const completedMilestones = pilot.milestones.filter((m) => m.status === 'Completed').length;

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Top Breadcrumb */}
      <div>
        <Link
          to="/startup/pilots"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Pilot Sandbox
        </Link>
      </div>

      {/* 2. Header Banner */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/40 px-2.5 py-1 rounded-lg border border-orange-200 dark:border-orange-800/60">
                {pilot.id}
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {pilot.status} • {pilot.operationalState}
              </span>
              <span className="text-xs font-mono text-zinc-500">
                Escrow: <strong>{pilot.budget.escrowAccount}</strong>
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-white tracking-tight">
              {pilot.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
              <span className="flex items-center gap-1 font-medium">
                <Building2 className="w-3.5 h-3.5 text-zinc-400" />
                {pilot.department}
              </span>
              <span className="flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                {pilot.specificTestbed}
              </span>
              <span className="flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400">
                <Coins className="w-3.5 h-3.5" />
                Sanctioned: <strong>{pilot.budget.sanctioned}</strong> (Disbursed: <strong>{pilot.budget.disbursed}</strong>)
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => setIsMilestoneModalOpen(true)}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" /> Log Milestone Progress
            </button>
            <button
              onClick={() => setIsKpiModalOpen(true)}
              className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-800 dark:text-zinc-200 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Radio className="w-3.5 h-3.5 text-indigo-500" /> Submit Telemetry
            </button>
          </div>
        </div>

        {/* Action Required Banner if pending */}
        {pilot.actionRequired.active && (
          <div className="p-4 bg-amber-50/90 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <span className="font-bold text-amber-900 dark:text-amber-200">
                  Action Required: {pilot.actionRequired.reason}
                </span>
                <span className="text-amber-700 dark:text-amber-400 ml-2">
                  (Due {pilot.actionRequired.dueDate} • Requested by {pilot.actionRequired.department})
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsDocModalOpen(true)}
              className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shrink-0 cursor-pointer self-start sm:self-auto"
            >
              Upload Evidence Now
            </button>
          </div>
        )}
      </div>

      {/* 3. Workspace Navigation Tabs */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs overflow-hidden">
        <div className="flex items-center overflow-x-auto border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 px-4 sm:px-6 pt-3 gap-2 sm:gap-6 no-scrollbar">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'kpis', label: 'KPIs & Metrics', count: pilot.kpis.length },
            { id: 'milestones', label: 'Milestones', count: '3/5' },
            { id: 'documents', label: 'Documents', count: pilot.documents.length },
            { id: 'feedback', label: 'Feedback', count: pilot.feedback.length, alert: pilot.feedback.some(f => f.actionRequired) },
            { id: 'outcome', label: 'Outcome & Scale', highlight: true }
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
              {tab.highlight && <Sparkles className="w-3.5 h-3.5 text-amber-500" />}
              <span>{tab.label}</span>
              {tab.count && (
                <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                  {tab.count}
                </span>
              )}
              {tab.alert && <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* About Pilot */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  About this Public Sector Pilot
                </span>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  {pilot.about}
                </p>
              </div>

              {/* Pilot Specifications Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-zinc-400">Testbed Corridor</span>
                  <p className="text-sm font-bold text-zinc-950 dark:text-white">{pilot.specificTestbed}</p>
                  <p className="text-xs text-zinc-500">15km canal stretch • 20 nodes</p>
                </div>

                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-zinc-400">Escrow Sanction</span>
                  <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{pilot.budget.sanctioned}</p>
                  <p className="text-xs text-zinc-500">{pilot.budget.disbursed} Disbursed (30%)</p>
                </div>

                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-zinc-400">Current Phase</span>
                  <p className="text-sm font-bold text-orange-600 dark:text-orange-400">{pilot.currentPhase}</p>
                  <p className="text-xs text-zinc-500">Milestone 3 of 5 in progress</p>
                </div>

                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-zinc-400">Telemetry Health</span>
                  <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{pilot.kpiHealth}% Compliance</p>
                  <p className="text-xs text-zinc-500">All 4 telemetry KPIs active</p>
                </div>
              </div>

              {/* Expected Outcomes */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">
                  Contracted Impact Objectives
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pilot.expectedOutcomes.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-3 text-xs text-zinc-800 dark:text-zinc-200 font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stakeholders and Governance */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">
                  Pilot Governance & Nodal Stakeholders
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">Department Nodal Officer</span>
                    <p className="text-xs font-bold text-zinc-900 dark:text-white">Shri A. V. Deshpande</p>
                    <p className="text-[11px] text-zinc-500">Superintending Engineer, Water Resources</p>
                  </div>

                  <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">Innovation Testbed Lead</span>
                    <p className="text-xs font-bold text-zinc-900 dark:text-white">Dr. Rajiv Gokhale</p>
                    <p className="text-[11px] text-zinc-500">Maharashtra Innovation Society</p>
                  </div>

                  <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">Startup Project Director</span>
                    <p className="text-xs font-bold text-zinc-900 dark:text-white">Pooja Deshmukh</p>
                    <p className="text-[11px] text-zinc-500">CTO, AquaSense Innovations</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: KPIS & METRICS */}
          {activeTab === 'kpis' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                    Pilot KPIs & Government Verification Standards
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Targets are locked by the Government Sanction Committee. Submit telemetry readings for department verification.
                  </p>
                </div>

                <button
                  onClick={() => setIsKpiModalOpen(true)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Submit Telemetry Metric</span>
                </button>
              </div>

              <div className="space-y-3 pt-2">
                {pilot.kpis.map((kpi) => (
                  <div
                    key={kpi.id}
                    className="p-5 bg-zinc-50/50 dark:bg-zinc-800/30 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
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

                      <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 pt-1">
                        <span>Evidence: <strong className="font-mono text-zinc-700 dark:text-zinc-300">{kpi.evidenceFile}</strong></span>
                        <span>•</span>
                        <span>Last Reading: {kpi.lastReported}</span>
                        <span>•</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                          Status: {kpi.reviewStatus}
                        </span>
                      </div>
                    </div>

                    {/* Metric Comparison Boxes */}
                    <div className="grid grid-cols-3 gap-3 shrink-0 text-center">
                      <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                        <span className="text-[10px] font-bold text-zinc-400 block uppercase">Baseline</span>
                        <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">{kpi.baseline}</span>
                      </div>

                      <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                        <span className="text-[10px] font-bold text-zinc-400 block uppercase">Gov Target</span>
                        <span className="text-xs font-bold text-zinc-950 dark:text-white">{kpi.target}</span>
                      </div>

                      <div className="p-3 bg-orange-50 dark:bg-orange-950/40 rounded-xl border border-orange-200 dark:border-orange-800/60">
                        <span className="text-[10px] font-bold text-orange-600 block uppercase">Reported</span>
                        <span className="text-xs font-black text-orange-600">{kpi.current}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MILESTONES */}
          {activeTab === 'milestones' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                    Milestones & Escrow Tranche Roadmap
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Deliverables trigger tranche release from the SBI Escrow Account upon Nodal Officer signoff.
                  </p>
                </div>

                <button
                  onClick={() => setIsMilestoneModalOpen(true)}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Log Milestone Deliverable</span>
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
                          : 'bg-zinc-50/30 dark:bg-zinc-900/30 border-zinc-200 dark:border-zinc-800'
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
                                setMilestoneFormData((prev) => ({
                                  ...prev,
                                  milestoneId: m.id,
                                  milestoneName: m.title
                                }));
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

          {/* TAB 4: DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                    Compliance Documents & Evidence Submissions
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Official evidence artifacts submitted for testbed compliance and audit.
                  </p>
                </div>

                <button
                  onClick={() => setIsDocModalOpen(true)}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shadow-xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Document</span>
                </button>
              </div>

              <div className="space-y-2.5 pt-2">
                {pilot.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 bg-zinc-50/50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 flex items-center justify-center shrink-0">
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

          {/* TAB 5: FEEDBACK */}
          {activeTab === 'feedback' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                  Government Nodal Officer Communications
                </h3>
                <p className="text-xs text-zinc-500">
                  Direct official clarifications and remarks from the Water Resources Department.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {pilot.feedback.map((fb) => (
                  <div
                    key={fb.id}
                    className="p-5 bg-zinc-50/40 dark:bg-zinc-800/30 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4"
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

                    <div className="p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed">
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

          {/* TAB 6: OUTCOME & SCALE */}
          {activeTab === 'outcome' && (
            <div className="space-y-6">
              {/* Scale Approval Card */}
              <div className="p-6 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {pilot.outcome.recommendation}
                      </span>
                      <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                        Pilot Outcome Cleared by Government Evaluation Committee
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-zinc-950 dark:text-white">
                      Statewide Expansion & GeM Direct Catalog Onboarding
                    </h3>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
                      Overall Evaluation Score
                    </span>
                    <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                      {pilot.outcome.score} / 100
                    </span>
                  </div>
                </div>

                {/* Highlights Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-emerald-200/60 dark:border-emerald-900/40 text-center">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">Water Loss Reduction</span>
                    <span className="text-base font-black text-emerald-600 block">{pilot.outcome.highlights.efficiency}</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-emerald-200/60 dark:border-emerald-900/40 text-center">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">Operational Cost Saving</span>
                    <span className="text-base font-black text-emerald-600 block">{pilot.outcome.highlights.costSaving}</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-emerald-200/60 dark:border-emerald-900/40 text-center">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">Department Satisfaction</span>
                    <span className="text-base font-black text-emerald-600 block">{pilot.outcome.highlights.satisfaction}</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-emerald-200/60 dark:border-emerald-900/40 text-center">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">Hardware Deployment</span>
                    <span className="text-base font-black text-emerald-600 block">{pilot.outcome.highlights.deploymentRate}</span>
                  </div>
                </div>
              </div>

              {/* Expansion Blueprint */}
              <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">
                  Next Stage: Single-Source Public Sector Scaling
                </span>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">Procurement Pathway</span>
                    <p className="text-xs font-bold text-zinc-900 dark:text-white">
                      {pilot.outcome.scalePlan.procurementStage}
                    </p>
                    <p className="text-[11px] text-zinc-500">Exemption under Rule 149/194</p>
                  </div>

                  <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">Expansion Regions</span>
                    <p className="text-xs font-bold text-zinc-900 dark:text-white">
                      {pilot.outcome.scalePlan.district}
                    </p>
                    <p className="text-[11px] text-zinc-500">{pilot.outcome.scalePlan.wardsCovered} canal ward sectors</p>
                  </div>

                  <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">Budget Allocation</span>
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {pilot.outcome.scalePlan.budgetAllocation}
                    </p>
                    <p className="text-[11px] text-zinc-500">Tranche 3 Capital Grant</p>
                  </div>
                </div>

                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase">Action for Startup</span>
                  <p className="text-xs text-zinc-700 dark:text-zinc-300">
                    {pilot.outcome.scalePlan.nextSteps}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL: LOG MILESTONE PROGRESS */}
      {isMilestoneModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h2 className="text-base font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                  <Send className="w-4 h-4 text-orange-600" />
                  <span>Log Milestone Progress</span>
                </h2>
                <p className="text-xs text-zinc-500">
                  Submit progress dossier to the department nodal engineer.
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
                  value={milestoneFormData.milestoneId}
                  onChange={(e) => setMilestoneFormData({ ...milestoneFormData, milestoneId: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs text-zinc-900 dark:text-white font-medium outline-none"
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
                  Progress Summary & Field Observations <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detail units deployed, bench tests completed, calibration status..."
                  value={milestoneFormData.summary}
                  onChange={(e) => setMilestoneFormData({ ...milestoneFormData, summary: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Attachment Name / Field Report PDF
                </label>
                <input
                  type="text"
                  value={milestoneFormData.attachmentName}
                  onChange={(e) => setMilestoneFormData({ ...milestoneFormData, attachmentName: e.target.value })}
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
                  Dispatch to Nodal Officer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: SUBMIT TELEMETRY EVIDENCE */}
      {isKpiModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h2 className="text-base font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                  <Radio className="w-4 h-4 text-indigo-600" />
                  <span>Submit Telemetry Metric Evidence</span>
                </h2>
                <p className="text-xs text-zinc-500">
                  Transmit measured reading for department verification.
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
                  value={kpiFormData.kpiId}
                  onChange={(e) => setKpiFormData({ ...kpiFormData, kpiId: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs text-zinc-900 dark:text-white font-medium outline-none"
                >
                  {pilot.kpis.map((kpi) => (
                    <option key={kpi.id} value={kpi.id}>
                      {kpi.id} - {kpi.name} (Target: {kpi.target})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Startup Reported Telemetry Value <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 88% or 3.2 hrs"
                  value={kpiFormData.reportedValue}
                  onChange={(e) => setKpiFormData({ ...kpiFormData, reportedValue: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-bold text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Telemetry Evidence Dataset / CSV
                </label>
                <input
                  type="text"
                  value={kpiFormData.evidenceFileName}
                  onChange={(e) => setKpiFormData({ ...kpiFormData, evidenceFileName: e.target.value })}
                  className="w-full px-3.5 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-mono text-zinc-900 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Measurement Remarks
                </label>
                <textarea
                  rows={2}
                  value={kpiFormData.remarks}
                  onChange={(e) => setKpiFormData({ ...kpiFormData, remarks: e.target.value })}
                  className="w-full px-3.5 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs text-zinc-900 dark:text-white outline-none"
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
                  Submit for Department Verification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: UPLOAD DOCUMENT */}
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
                  Upload evidence requested by the department.
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
                  value={docFormData.name}
                  onChange={(e) => setDocFormData({ ...docFormData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-bold text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Document Category
                </label>
                <select
                  value={docFormData.type}
                  onChange={(e) => setDocFormData({ ...docFormData, type: e.target.value })}
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
                  value={docFormData.fileName}
                  onChange={(e) => setDocFormData({ ...docFormData, fileName: e.target.value })}
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

      {/* MODAL: REPLY TO DEPARTMENT */}
      {isReplyModalOpen && selectedFeedbackItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h2 className="text-base font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-orange-600" />
                  <span>Reply to Department Nodal Officer</span>
                </h2>
                <p className="text-xs text-zinc-500">
                  Responding to: {selectedFeedbackItem.officer}
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
                  Official Startup Response <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detail clarifying comments or schedule updates..."
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

export default StartupPilotDetailsPage;
