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
  Paperclip
} from 'lucide-react';
import { useStartupPortal } from '../../context/StartupPortalContext';

export function StartupPilotDetailsPage() {
  const { id } = useParams();
  const { pilots, submitPilotProgress, submitKpiEvidence, showToast } = useStartupPortal();

  const pilot = pilots.find((p) => p.id === id) || pilots[0];

  const [activeTab, setActiveTab] = useState('milestones');
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
  const [isKpiModalOpen, setIsKpiModalOpen] = useState(false);

  // Form states
  const [milestoneFormData, setMilestoneFormData] = useState({
    milestoneName: 'Milestone 3: 60-Day Telemetry Uptime & Simulated Leak Pinpointing',
    summary: '',
    attachmentName: 'Mutha_Canal_Node_14_to_20_Calibration_Log.pdf'
  });

  const [kpiFormData, setKpiFormData] = useState({
    kpiId: 'KPI-3',
    reportedValue: '135 seconds',
    evidenceFileName: 'Acoustic_Latency_Telemetry_Sample_Week4.csv',
    remarks: 'Acoustic wave disruption captured and transmitted in 135 seconds during simulated valve cutoff.'
  });

  if (!pilot) {
    return (
      <div className="text-center py-16">
        <AlertCircle className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-zinc-950 dark:text-white">Pilot Sandbox Not Found</h2>
        <Link
          to="/startup/pilots"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Active Pilots
        </Link>
      </div>
    );
  }

  const pilotName = pilot.name || pilot.opportunityTitle || 'Sandbox Pilot';
  const pilotLocation = pilot.testbedLocation || pilot.location || 'Pune District, Maharashtra';
  const pilotSanction = typeof pilot.sanctionedGrant === 'number'
    ? `₹${(pilot.sanctionedGrant / 100000).toFixed(1)} Lakhs`
    : pilot.sanctionAmount || '₹35.0 Lakhs';
  const pilotDisbursed = typeof pilot.disbursedGrant === 'number'
    ? `₹${(pilot.disbursedGrant / 100000).toFixed(1)} Lakhs`
    : pilot.disbursedAmount || '₹10.5 Lakhs';
  const escrowAccount = pilot.escrowAccount || 'SBI-ESCR-MH-9482-PUNE';
  const pilotStatus = pilot.status || 'Active Field Testing';

  const handleMilestoneSubmit = (e) => {
    e.preventDefault();
    if (!milestoneFormData.summary.trim()) {
      showToast('Please provide a milestone progress summary.', 'error');
      return;
    }
    submitPilotProgress(pilot.id, milestoneFormData);
    setIsMilestoneModalOpen(false);
    setMilestoneFormData({
      milestoneName: 'Milestone 3: 60-Day Telemetry Uptime & Simulated Leak Pinpointing',
      summary: '',
      attachmentName: 'Field_Progress_Deployment_Report.pdf'
    });
  };

  const handleKpiSubmit = (e) => {
    e.preventDefault();
    if (!kpiFormData.reportedValue.trim()) {
      showToast('Please enter the reported telemetry metric value.', 'error');
      return;
    }
    submitKpiEvidence(
      pilot.id,
      kpiFormData.kpiId,
      kpiFormData.reportedValue,
      kpiFormData.evidenceFileName,
      kpiFormData.remarks
    );
    setIsKpiModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Breadcrumb */}
      <div>
        <Link
          to="/startup/pilots"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Active Pilots
        </Link>
      </div>

      {/* Header Banner */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800/60">
                {pilot.id}
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {pilotStatus}
              </span>
              <span className="text-xs font-mono text-zinc-500">
                Escrow: <strong>{escrowAccount}</strong>
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-white">
              {pilotName}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
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
                Sanctioned: <strong>{pilotSanction}</strong> (Disbursed: <strong>{pilotDisbursed}</strong>)
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
      </div>

      {/* Tabs Bar */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs overflow-hidden">
        <div className="flex border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 px-6 pt-3 gap-6">
          {[
            { id: 'milestones', label: 'Milestones & Payout Schedule' },
            { id: 'kpis', label: 'Telemetry & Verification KPIs' },
            { id: 'updates', label: `Progress Logs (${pilot.progressUpdates?.length || 0})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'border-orange-600 text-orange-600 dark:text-orange-400'
                  : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* TAB 1: MILESTONES */}
          {activeTab === 'milestones' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Phased Sandbox Deliverables & Escrow Tranche Payouts
                </span>
                <span className="text-xs text-emerald-600 font-semibold">
                  Tranche 1 Disbursed to Escrow
                </span>
              </div>

              <div className="space-y-3">
                {pilot.milestones.map((m, idx) => {
                  const mTitle = m.name || m.title;
                  const mDate = m.targetDate || m.dueDate || '2026-10-30';
                  const mDisbursal = m.grantDisbursal || (m.payoutPercentage ? `${m.payoutPercentage}% Grant` : 'Grant Tranche');
                  const isDone = m.status === 'Completed';
                  const isCurrent = m.status === 'In Progress';

                  return (
                    <div
                      key={m.id}
                      className="p-5 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3.5 max-w-2xl">
                        <div
                          className={`w-7 h-7 rounded-full text-xs font-black flex items-center justify-center shrink-0 mt-0.5 ${
                            isDone
                              ? 'bg-emerald-600 text-white'
                              : isCurrent
                              ? 'bg-orange-600 text-white animate-pulse'
                              : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-500'
                          }`}
                        >
                          {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] font-bold text-zinc-500">{m.id}</span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                isDone
                                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                  : isCurrent
                                  ? 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300'
                                  : 'bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300'
                              }`}
                            >
                              {m.status}
                            </span>
                          </div>

                          <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                            {mTitle}
                          </h3>

                          <p className="text-xs text-zinc-600 dark:text-zinc-400">
                            {m.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-3 text-[11px] text-zinc-500 pt-1">
                            <span>Target Date: <strong className="text-zinc-700 dark:text-zinc-300">{mDate}</strong></span>
                            <span>•</span>
                            <span>Audit: <strong className="text-zinc-700 dark:text-zinc-300">Water Resources Nodal Cell</strong></span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="text-[11px] text-zinc-500 font-medium">Tranche Allocation</p>
                        <p className="text-sm font-black text-zinc-900 dark:text-white">
                          {mDisbursal}
                        </p>
                        <span className="text-[11px] font-bold text-emerald-600">
                          {isDone ? 'Released to Account' : isCurrent ? 'In Execution' : 'Scheduled'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: KPIS & TELEMETRY */}
          {activeTab === 'kpis' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Target vs Startup Reported vs Government Verified
                </span>
                <button
                  onClick={() => setIsKpiModalOpen(true)}
                  className="text-xs font-bold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Submit Metric Evidence
                </button>
              </div>

              <div className="space-y-3">
                {pilot.kpis.map((kpi) => {
                  const kpiName = kpi.name || kpi.metricName;
                  const govVerified = kpi.govVerified || kpi.governmentVerified || 'Pending Review';

                  return (
                    <div
                      key={kpi.id}
                      className="p-5 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                    >
                      <div className="space-y-1 max-w-xl">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] font-bold text-zinc-500">{kpi.id}</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              kpi.status === 'Verified'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            }`}
                          >
                            {kpi.status}
                          </span>
                        </div>

                        <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                          {kpiName}
                        </h3>

                        {kpi.definition && (
                          <p className="text-xs text-zinc-600 dark:text-zinc-400">
                            {kpi.definition}
                          </p>
                        )}

                        <p className="text-xs text-zinc-500 pt-1">
                          Evidence File: <strong className="text-zinc-700 dark:text-zinc-300 font-mono">{kpi.evidenceName}</strong>
                        </p>
                      </div>

                      {/* Metric comparison tiles */}
                      <div className="grid grid-cols-3 gap-3 shrink-0 text-center">
                        <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                          <span className="text-[10px] font-bold text-zinc-400 block uppercase">Sanction Target</span>
                          <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{kpi.target}</span>
                        </div>
                        <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                          <span className="text-[10px] font-bold text-orange-500 block uppercase">Startup Reported</span>
                          <span className="text-xs font-bold text-orange-600">{kpi.startupReported}</span>
                        </div>
                        <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                          <span className="text-[10px] font-bold text-emerald-500 block uppercase">Gov Verified</span>
                          <span className="text-xs font-bold text-emerald-600">{govVerified}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: PROGRESS UPDATES */}
          {activeTab === 'updates' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Chronological Field Log Dispatches
                </span>
                <button
                  onClick={() => setIsMilestoneModalOpen(true)}
                  className="text-xs font-bold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Progress Log
                </button>
              </div>

              <div className="space-y-3">
                {pilot.progressUpdates?.map((upd) => (
                  <div
                    key={upd.id}
                    className="p-5 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-orange-600 dark:text-orange-400">
                        {upd.id} • {upd.milestoneName}
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        {new Date(upd.submittedAt).toLocaleString()}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed bg-white dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
                      {upd.summary}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-zinc-500 pt-1">
                      <Paperclip className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Attachment:</span>
                      <span className="font-mono text-zinc-700 dark:text-zinc-300 font-bold">{upd.attachmentName}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal: Log Milestone Progress */}
      {isMilestoneModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-xl animate-in fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-orange-600" /> Log Milestone Progress
              </h2>
              <button
                onClick={() => setIsMilestoneModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
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
                  value={milestoneFormData.milestoneName}
                  onChange={(e) => setMilestoneFormData({ ...milestoneFormData, milestoneName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs focus:ring-2 focus:ring-orange-500 outline-none text-zinc-900 dark:text-white font-medium"
                >
                  {pilot.milestones.map((m) => (
                    <option key={m.id} value={`${m.id}: ${m.name || m.title}`}>
                      {m.id}: {m.name || m.title}
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
                  placeholder="Detail units deployed, bench tests completed, calibration status, or any assistance required from the nodal engineer..."
                  value={milestoneFormData.summary}
                  onChange={(e) => setMilestoneFormData({ ...milestoneFormData, summary: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs focus:ring-2 focus:ring-orange-500 outline-none text-zinc-900 dark:text-white"
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
                  className="w-full px-3.5 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-mono text-zinc-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsMilestoneModalOpen(false)}
                  className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Dispatch to Nodal Officer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Submit KPI Telemetry Evidence */}
      {isKpiModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-xl animate-in fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                <Radio className="w-4 h-4 text-indigo-600" /> Submit Telemetry Metric Evidence
              </h2>
              <button
                onClick={() => setIsKpiModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
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
                  className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs focus:ring-2 focus:ring-orange-500 outline-none text-zinc-900 dark:text-white font-medium"
                >
                  {pilot.kpis.map((kpi) => (
                    <option key={kpi.id} value={kpi.id}>
                      {kpi.id} - {kpi.name || kpi.metricName} (Target: {kpi.target})
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
                  placeholder="e.g. 98.6% or 135 seconds"
                  value={kpiFormData.reportedValue}
                  onChange={(e) => setKpiFormData({ ...kpiFormData, reportedValue: e.target.value })}
                  className="w-full px-3.5 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-bold text-zinc-900 dark:text-white"
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
                  className="w-full px-3.5 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-mono text-zinc-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Measurement Methodology Remarks
                </label>
                <textarea
                  rows={2}
                  value={kpiFormData.remarks}
                  onChange={(e) => setKpiFormData({ ...kpiFormData, remarks: e.target.value })}
                  className="w-full px-3.5 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs text-zinc-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsKpiModalOpen(false)}
                  className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Submit for Department Verification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
