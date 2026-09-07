import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Search,
  ClipboardCheck,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Download,
  Rocket,
  HelpCircle,
  Check,
  Info
} from 'lucide-react';
import { useGovernmentPortal } from '../../context/GovernmentPortalContext';
import {
  INITIAL_AI_EVALUATIONS,
  AI_EVALUATOR_STATS
} from '../../data/aiEvaluatorData';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { Badge } from '../../components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';

export function ApplicationsEvaluationPage() {
  const navigate = useNavigate();
  const { appId } = useParams();
  const { initiatePilot, showToast } = useGovernmentPortal();

  // Evaluation dataset state (in-memory state initialized from structured mock store)
  const [evaluations, setEvaluations] = useState(INITIAL_AI_EVALUATIONS);

  // Filter and Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [scoreFilter, setScoreFilter] = useState('All');

  // Active Report Selection (supports both URL param /:appId or state)
  const [activeReportId, setActiveReportId] = useState(appId || null);

  // Dialog States
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isCreatePilotOpen, setIsCreatePilotOpen] = useState(false);
  const [isRequestImprovementsOpen, setIsRequestImprovementsOpen] = useState(false);
  const [isOverrideOpen, setIsOverrideOpen] = useState(false);

  // Form States for Modals
  const [pilotFormData, setPilotFormData] = useState({
    duration: '90 days',
    location: '',
    budget: '₹35 Lakhs',
    kpis: ''
  });

  const [improvementCategories, setImprovementCategories] = useState({
    technicalReadiness: false,
    scalability: false,
    costEfficiency: false,
    deploymentEvidence: false,
    documentation: false
  });
  const [improvementFeedback, setImprovementFeedback] = useState('');

  const [overrideDecision, setOverrideDecision] = useState('Proceed with Pilot');
  const [overrideReason, setOverrideReason] = useState('');

  // Synchronize when URL parameter changes
  useEffect(() => {
    if (appId) {
      setActiveReportId(appId);
    }
  }, [appId]);

  // Selected report object
  const activeReport = useMemo(() => {
    if (!activeReportId) return null;
    return evaluations.find((e) => e.applicationId === activeReportId) || null;
  }, [activeReportId, evaluations]);

  // Department dropdown options
  const departmentOptions = [
    'All',
    'Urban Development Department',
    'Public Health Department',
    'Public Works Department (PWD)',
    'Water Resources Department',
    'Agriculture Department'
  ];

  // Filtered evaluation queue
  const filteredEvaluations = useMemo(() => {
    return evaluations.filter((item) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.startupName.toLowerCase().includes(query) ||
        item.applicationId.toLowerCase().includes(query) ||
        item.problemStatement.toLowerCase().includes(query);

      const matchesDept = deptFilter === 'All' || item.department === deptFilter;
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;

      let matchesScore = true;
      if (scoreFilter === 'pilot') {
        matchesScore = item.overallScore >= 80;
      } else if (scoreFilter === 'improvement') {
        matchesScore = item.overallScore >= 60 && item.overallScore < 80;
      } else if (scoreFilter === 'review') {
        matchesScore = item.overallScore < 60;
      }

      return matchesSearch && matchesDept && matchesStatus && matchesScore;
    });
  }, [evaluations, searchQuery, deptFilter, statusFilter, scoreFilter]);

  // Helper for opening detail view
  const handleOpenReport = (applicationId) => {
    setActiveReportId(applicationId);
    navigate(`/government/evaluator/${applicationId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToEvaluator = () => {
    setActiveReportId(null);
    navigate('/government/evaluator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Create Pilot Dialog with pre-filled AI scope
  const handleOpenCreatePilot = () => {
    if (!activeReport) return;
    setPilotFormData({
      duration: activeReport.pilotRecommendation?.duration || '90 days',
      location: activeReport.pilotRecommendation?.location || 'Designated Municipal Zone',
      budget: activeReport.pilotRecommendation?.budget || '₹35 Lakhs',
      kpis: (activeReport.pilotRecommendation?.kpis || []).join('\n')
    });
    setIsCreatePilotOpen(true);
  };

  // Confirm Pilot Creation
  const handleConfirmPilot = (e) => {
    e.preventDefault();
    if (!activeReport) return;

    // Call context initiatePilot to link to Active Pilots module
    initiatePilot(activeReport.startupName, {
      department: activeReport.department,
      problemTitle: activeReport.problemStatement,
      location: pilotFormData.location,
      budget: pilotFormData.budget,
      duration: pilotFormData.duration
    });

    // Update evaluation record status
    setEvaluations((prev) =>
      prev.map((item) =>
        item.applicationId === activeReport.applicationId
          ? { ...item, status: 'Pilot Created' }
          : item
      )
    );

    setIsCreatePilotOpen(false);
    showToast(`Pilot Project created for ${activeReport.startupName}!`);
    navigate('/government/pilots');
  };

  // Open Request Improvements Dialog
  const handleOpenRequestImprovements = () => {
    setImprovementCategories({
      technicalReadiness: false,
      scalability: false,
      costEfficiency: false,
      deploymentEvidence: false,
      documentation: false
    });
    setImprovementFeedback('');
    setIsRequestImprovementsOpen(true);
  };

  // Confirm Request Improvements
  const handleConfirmRequestImprovements = (e) => {
    e.preventDefault();
    if (!activeReport) return;

    setEvaluations((prev) =>
      prev.map((item) =>
        item.applicationId === activeReport.applicationId
          ? { ...item, status: 'Improvements Requested' }
          : item
      )
    );

    setIsRequestImprovementsOpen(false);
    showToast(`Improvement request dispatched to ${activeReport.startupName}.`);
  };

  // Open Override Dialog
  const handleOpenOverride = () => {
    setOverrideDecision('Proceed with Pilot');
    setOverrideReason('');
    setIsOverrideOpen(true);
  };

  // Confirm Override
  const handleConfirmOverride = (e) => {
    e.preventDefault();
    if (!activeReport || !overrideReason.trim()) {
      showToast('Please provide a mandatory justification for the official audit log.');
      return;
    }

    let newStatus = 'Final Decision';
    if (overrideDecision === 'Proceed with Pilot') newStatus = 'Pilot Created';
    else if (overrideDecision === 'Request Improvements') newStatus = 'Improvements Requested';

    setEvaluations((prev) =>
      prev.map((item) =>
        item.applicationId === activeReport.applicationId
          ? {
              ...item,
              status: newStatus,
              departmentNotes: `Overridden by Officer: ${overrideDecision}. Reason: ${overrideReason}`
            }
          : item
      )
    );

    setIsOverrideOpen(false);
    showToast(`AI recommendation overridden for ${activeReport.applicationId}. Updated in audit log.`);
  };

  // Print/Download Handler
  const handleDownloadReport = () => {
    window.print();
  };

  // =========================================================================
  // VIEW 1: DETAILED FULL-PAGE AI EVALUATION REPORT
  // =========================================================================
  if (activeReport) {
    const scores = activeReport.scores || {};

    return (
      <div className="space-y-6 max-w-7xl mx-auto pb-16">
        {/* Top Header Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200/80 dark:border-zinc-800">
          <div className="space-y-1">
            <button
              onClick={handleBackToEvaluator}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors mb-1 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Evaluator
            </button>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight">
                AI Evaluation Report
              </h1>
              <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300 border border-orange-200 dark:border-orange-800/60">
                Decision Support
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium">
              Comprehensive AI-powered analysis of the startup application
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadReport}
              className="text-xs flex items-center gap-1.5 shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              Download Report
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleOpenCreatePilot}
              className="text-xs flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-xs"
            >
              <Rocket className="w-3.5 h-3.5" />
              Create Pilot
            </Button>
          </div>
        </div>

        {/* Startup Information Dossier Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono font-bold text-orange-600 dark:text-orange-400">
                  {activeReport.applicationId}
                </span>
                <span className="text-zinc-300 dark:text-zinc-700">•</span>
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  {activeReport.department}
                </span>
              </div>
              <h2 className="text-2xl font-black text-zinc-950 dark:text-white tracking-tight">
                {activeReport.startupName}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium mt-0.5">
                {activeReport.headline || activeReport.problemStatement}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/70 dark:border-zinc-700">
                DPIIT: {activeReport.dpiitNumber}
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/70 dark:border-zinc-700">
                {activeReport.stage}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
            <div>
              <span className="text-zinc-400 block font-medium">Application ID</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100 font-mono">
                {activeReport.applicationId}
              </span>
            </div>
            <div>
              <span className="text-zinc-400 block font-medium">Nodal Department</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100">
                {activeReport.department}
              </span>
            </div>
            <div>
              <span className="text-zinc-400 block font-medium">Submission Date</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100">
                {activeReport.submittedDate}
              </span>
            </div>
            <div>
              <span className="text-zinc-400 block font-medium">Evaluation Status</span>
              <span className="font-bold text-orange-600 dark:text-orange-400">
                {activeReport.status}
              </span>
            </div>
          </div>
        </div>

        {/* Top Grid: Overall Score + Score Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* OVERALL AI READINESS SCORE CARD (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-xs flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-black uppercase tracking-wider text-zinc-500">
                  OVERALL AI READINESS SCORE
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                  Advisory Model
                </span>
              </div>

              {/* Dominant Circular / Number Visualization */}
              <div className="flex items-center gap-5 my-2">
                <div className="relative w-24 h-24 rounded-full flex items-center justify-center border-4 border-orange-500 dark:border-orange-500/90 bg-orange-50/40 dark:bg-orange-950/20 shrink-0">
                  <div className="text-center">
                    <span className="text-3xl font-black text-zinc-950 dark:text-white tracking-tight leading-none block">
                      {activeReport.overallScore}
                    </span>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">
                      / 100
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Badge
                      variant={activeReport.overallScore >= 80 ? 'success' : 'warning'}
                      size="md"
                    >
                      {activeReport.recommendation}
                    </Badge>
                  </div>
                  <div className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                    Confidence Level:{' '}
                    <span className="font-extrabold text-zinc-900 dark:text-white">
                      {activeReport.confidence.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed mt-4 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200/60 dark:border-zinc-800">
                {activeReport.overallScore >= 80
                  ? 'This startup demonstrates strong technical readiness and potential for controlled government pilot deployment.'
                  : 'This startup requires targeted improvements in deployment evidence or operational durability prior to full pilot approval.'}
              </p>
            </div>

            <div className="text-[11px] text-zinc-400 font-medium border-t border-zinc-100 dark:border-zinc-800 pt-3 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>
                Calculated across 5 core dimensions using evidence-backed neural assessment.
              </span>
            </div>
          </div>

          {/* READ-ONLY SCORE BREAKDOWN (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
              <h3 className="text-sm font-black text-zinc-950 dark:text-white uppercase tracking-wider">
                Score Breakdown
              </h3>
              <span className="text-[11px] font-semibold text-zinc-400">
                AI-generated assessment (Read-Only)
              </span>
            </div>

            <div className="space-y-3.5 text-xs">
              {Object.entries(scores).map(([key, item]) => {
                const percentage = Math.round((item.score / item.max) * 100);
                return (
                  <div key={key} className="space-y-1">
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-zinc-800 dark:text-zinc-200">
                        {item.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-zinc-900 dark:text-white">
                          {item.score} / {item.max}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                            item.rating === 'Strong'
                              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                              : 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300'
                          }`}
                        >
                          {item.rating}
                        </span>
                      </div>
                    </div>

                    <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2 overflow-hidden border border-zinc-200/60 dark:border-zinc-700">
                      <div
                        className={`h-full rounded-full transition-all ${
                          percentage >= 80 ? 'bg-emerald-600' : 'bg-orange-600'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    {item.notes && (
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        {item.notes}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section: "Why this score?" */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-xs space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-600" />
            <h3 className="text-base font-black text-zinc-950 dark:text-white tracking-tight">
              Why this score?
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">
            {activeReport.whyThisScore}
          </p>
        </div>

        {/* Section: Evidence Used */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
            <h3 className="text-base font-black text-zinc-950 dark:text-white tracking-tight">
              Evidence Used
            </h3>
            <span className="text-[11px] font-medium text-zinc-400">
              Verified Primary Documents & Telemetry
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
            {(activeReport.evidenceUsed || []).map((evidence, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/70 dark:border-zinc-800 flex items-start gap-2.5 text-xs"
              >
                <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className="text-zinc-700 dark:text-zinc-300 font-medium leading-snug">
                  {evidence}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Grid: Key Strengths + Gaps / Risks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Key Strengths */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-black text-zinc-950 dark:text-white uppercase tracking-wider">
                Key Strengths
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs">
              {(activeReport.strengths || []).map((str, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">
                    {str}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Gaps / Risks */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 p-6 shadow-xs space-y-3 bg-amber-50/15 dark:bg-amber-950/10">
            <div className="flex items-center gap-2 pb-2 border-b border-amber-100 dark:border-amber-900/30">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <h3 className="text-sm font-black text-amber-950 dark:text-amber-300 uppercase tracking-wider">
                Gaps / Risks
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs">
              {(activeReport.gapsRisks || []).map((risk, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-amber-600 dark:text-amber-400 font-bold shrink-0 mt-0.5">
                    ⚠
                  </span>
                  <span className="text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">
                    {risk}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section: AI Recommendation & Suggested Pilot Scope */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <h3 className="text-base font-black text-zinc-950 dark:text-white tracking-tight">
                AI Recommendation
              </h3>
            </div>
            <Badge variant="primary" size="sm">
              Advisory Decision Support
            </Badge>
          </div>

          <div className="p-4 rounded-xl bg-orange-50/40 dark:bg-orange-950/20 border border-orange-200/70 dark:border-orange-800/60">
            <span className="text-xs font-bold text-orange-900 dark:text-orange-200 block mb-1">
              Recommended Course of Action:
            </span>
            <p className="text-sm font-extrabold text-orange-950 dark:text-orange-100">
              {activeReport.overallScore >= 80
                ? 'Proceed with a controlled pilot deployment.'
                : 'Request technical and operational improvements prior to pilot sanctioning.'}
            </p>
          </div>

          {activeReport.pilotRecommendation && (
            <div className="space-y-3 pt-1">
              <h4 className="text-xs font-black uppercase tracking-wider text-zinc-500">
                Suggested Pilot Scope
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200/70 dark:border-zinc-800">
                  <span className="text-zinc-400 block font-medium">Duration</span>
                  <span className="font-bold text-zinc-900 dark:text-white">
                    {activeReport.pilotRecommendation.duration}
                  </span>
                </div>
                <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200/70 dark:border-zinc-800">
                  <span className="text-zinc-400 block font-medium">Location</span>
                  <span className="font-bold text-zinc-900 dark:text-white">
                    {activeReport.pilotRecommendation.location}
                  </span>
                </div>
                <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200/70 dark:border-zinc-800">
                  <span className="text-zinc-400 block font-medium">Suggested Budget</span>
                  <span className="font-bold text-zinc-900 dark:text-white">
                    {activeReport.pilotRecommendation.budget || '₹35 Lakhs'}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">
                  Suggested Key Performance Indicators (KPIs):
                </span>
                <div className="space-y-1.5 text-xs">
                  {(activeReport.pilotRecommendation.kpis || []).map((kpi, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800 flex items-center gap-2 text-zinc-700 dark:text-zinc-300 font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-600 shrink-0" />
                      <span>{kpi}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="p-3 rounded-xl bg-zinc-100/80 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-[11px] text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
            <strong>Advisory Notice:</strong> This assessment is generated using automated decision-support logic. Final approval, sanctioning, or rejection authority resides strictly with the designated government evaluator and departmental nodal officer.
          </div>
        </div>

        {/* Section: Final Government Actions */}
        <div className="sticky bottom-4 z-20 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-2xl border border-zinc-200/90 dark:border-zinc-800 p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs">
            <span className="font-bold text-zinc-950 dark:text-white block">
              Government Executive Decision
            </span>
            <span className="text-zinc-500 dark:text-zinc-400">
              Authority: Dr. Rajesh Sharma (Nodal Procurement Lead)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenOverride}
              className="text-xs"
            >
              Override AI Recommendation
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenRequestImprovements}
              className="text-xs"
            >
              Request Improvements
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleOpenCreatePilot}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
            >
              <Rocket className="w-3.5 h-3.5" />
              Create Pilot Project
            </Button>
          </div>
        </div>

        {/* MODAL 1: CREATE PILOT PROJECT */}
        <Modal
          isOpen={isCreatePilotOpen}
          onClose={() => setIsCreatePilotOpen(false)}
          title={`Create Pilot Project: ${activeReport.startupName}`}
          description={`Application ID: ${activeReport.applicationId} • Pre-filled from AI Evaluation recommendations`}
          maxWidth="max-w-xl"
          footer={
            <div className="flex items-center justify-end gap-2 w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCreatePilotOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleConfirmPilot}
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold"
              >
                Confirm & Initiate Pilot
              </Button>
            </div>
          }
        >
          <form onSubmit={handleConfirmPilot} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Startup Name
              </label>
              <Input value={activeReport.startupName} disabled className="bg-zinc-50 dark:bg-zinc-800" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Department
                </label>
                <Input value={activeReport.department} disabled className="bg-zinc-50 dark:bg-zinc-800" />
              </div>
              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Sanction Budget
                </label>
                <Input
                  value={pilotFormData.budget}
                  onChange={(e) => setPilotFormData({ ...pilotFormData, budget: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Suggested Duration
                </label>
                <Input
                  value={pilotFormData.duration}
                  onChange={(e) => setPilotFormData({ ...pilotFormData, duration: e.target.value })}
                />
              </div>
              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Testbed Location
                </label>
                <Input
                  value={pilotFormData.location}
                  onChange={(e) => setPilotFormData({ ...pilotFormData, location: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Pilot KPIs & Milestones (One per line)
              </label>
              <Textarea
                rows={4}
                value={pilotFormData.kpis}
                onChange={(e) => setPilotFormData({ ...pilotFormData, kpis: e.target.value })}
              />
            </div>
          </form>
        </Modal>

        {/* MODAL 2: REQUEST IMPROVEMENTS */}
        <Modal
          isOpen={isRequestImprovementsOpen}
          onClose={() => setIsRequestImprovementsOpen(false)}
          title="Request Startup Improvements"
          description={`Provide clear, actionable feedback to ${activeReport.startupName} to strengthen their application.`}
          maxWidth="max-w-lg"
          footer={
            <div className="flex items-center justify-end gap-2 w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsRequestImprovementsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleConfirmRequestImprovements}
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold"
              >
                Send Feedback
              </Button>
            </div>
          }
        >
          <form onSubmit={handleConfirmRequestImprovements} className="space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/60 space-y-1">
              <span className="font-bold text-amber-900 dark:text-amber-300 block">
                AI-Identified Gaps to Address:
              </span>
              <ul className="list-disc list-inside text-amber-800 dark:text-amber-400 space-y-0.5">
                {(activeReport.gapsRisks || []).slice(0, 3).map((gap, i) => (
                  <li key={i}>{gap}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <label className="block font-bold text-zinc-800 dark:text-zinc-200">
                Select Areas Needing Improvement:
              </label>
              <div className="space-y-2">
                {[
                  { key: 'technicalReadiness', label: 'Technical readiness & TRL verification' },
                  { key: 'scalability', label: 'Scalability & API standard conformance' },
                  { key: 'costEfficiency', label: 'Cost efficiency & unit economics' },
                  { key: 'deploymentEvidence', label: 'Deployment evidence & field trial logs' },
                  { key: 'documentation', label: 'Documentation & regulatory clearances' }
                ].map((item) => (
                  <label key={item.key} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={improvementCategories[item.key]}
                      onChange={(e) =>
                        setImprovementCategories({
                          ...improvementCategories,
                          [item.key]: e.target.checked
                        })
                      }
                      className="rounded accent-orange-600 w-4 h-4 cursor-pointer"
                    />
                    <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                Additional feedback for startup...
              </label>
              <Textarea
                rows={3}
                placeholder="Detail technical requirements, expected field test validation, or compliance documents required before re-evaluation..."
                value={improvementFeedback}
                onChange={(e) => setImprovementFeedback(e.target.value)}
              />
            </div>
          </form>
        </Modal>

        {/* MODAL 3: OVERRIDE AI RECOMMENDATION */}
        <Modal
          isOpen={isOverrideOpen}
          onClose={() => setIsOverrideOpen(false)}
          title="Override AI Recommendation"
          description="AI recommendations are advisory. You are about to override the AI assessment."
          maxWidth="max-w-lg"
          footer={
            <div className="flex items-center justify-end gap-2 w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsOverrideOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleConfirmOverride}
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold"
              >
                Confirm Override
              </Button>
            </div>
          }
        >
          <form onSubmit={handleConfirmOverride} className="space-y-4 text-xs">
            <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <p className="text-zinc-700 dark:text-zinc-300">
                <strong>Current AI Recommendation:</strong> {activeReport.recommendation} (Score: {activeReport.overallScore}/100)
              </p>
            </div>

            <div>
              <label className="block font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                Select Authorized Override Decision:
              </label>
              <Select
                value={overrideDecision}
                onChange={(e) => setOverrideDecision(e.target.value)}
                options={[
                  { value: 'Proceed with Pilot', label: 'Proceed with Pilot (Override AI score)' },
                  { value: 'Request Improvements', label: 'Request Improvements (Override approval)' },
                  { value: 'Reject / Further Review', label: 'Reject / Further Review' }
                ]}
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                Mandatory Reason for Override (Audit Log Record):
              </label>
              <Textarea
                rows={3}
                required
                placeholder="State the departmental justification, policy waiver, or special testbed conditions authorizing this override..."
                value={overrideReason}
                onChange={(e) => setOverrideReason(e.target.value)}
              />
            </div>
          </form>
        </Modal>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: AI EVALUATOR LANDING PAGE & TABLE
  // =========================================================================
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-zinc-200/80 dark:border-zinc-800">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 border border-orange-200/80 dark:border-orange-800/60">
              Government Portal
            </span>
            <span className="text-xs text-zinc-400 dark:text-zinc-600 font-bold">•</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold">
              Government of Maharashtra
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight">
              AI Evaluator
            </h1>
            <button
              type="button"
              onClick={() => setIsHowItWorksOpen(true)}
              className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 px-2.5 py-1 rounded-lg bg-orange-50 dark:bg-orange-950/40 border border-orange-200/80 dark:border-orange-800/60 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>How it works?</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm font-bold text-orange-600 dark:text-orange-400">
            Intelligent evaluation for informed government decisions
          </p>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium max-w-3xl leading-relaxed">
            AI analyzes startup applications across multiple parameters and provides a transparent readiness score, evidence-backed insights and recommendations. Final decisions remain with the authorized government evaluator.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/government/dashboard')}
            className="text-xs"
          >
            Dashboard
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/government/pilots')}
            className="text-xs flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-xs"
          >
            <Rocket className="w-3.5 h-3.5" />
            Active Pilots
          </Button>
        </div>
      </div>

      {/* 2. SUMMARY CARDS (4 COMPACT TILES) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Applications Evaluated */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              Applications Evaluated
            </span>
            <div className="w-8 h-8 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 flex items-center justify-center">
              <ClipboardCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-zinc-950 dark:text-white tracking-tight">
            {AI_EVALUATOR_STATS.totalEvaluated}
          </div>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 block">
            {AI_EVALUATOR_STATS.evaluatedTrend}
          </span>
        </div>

        {/* Card 2: Pilot Recommended */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              Pilot Recommended
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Rocket className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
            {AI_EVALUATOR_STATS.pilotRecommended}
          </div>
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block">
            {AI_EVALUATOR_STATS.pilotRecommendedCriteria}
          </span>
        </div>

        {/* Card 3: Needs Improvement */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              Needs Improvement
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-600 dark:text-amber-400 tracking-tight">
            {AI_EVALUATOR_STATS.needsImprovement}
          </div>
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block">
            {AI_EVALUATOR_STATS.needsImprovementCriteria}
          </span>
        </div>

        {/* Card 4: Under Review */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              Under Review
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-zinc-950 dark:text-white tracking-tight">
            {AI_EVALUATOR_STATS.underReview}
          </div>
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block">
            {AI_EVALUATOR_STATS.underReviewCriteria}
          </span>
        </div>
      </div>

      {/* 3. FILTERS AREA */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
        <div className="sm:col-span-5 relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
          <Input
            placeholder="Search by startup name, application ID or problem statement..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>

        <div className="sm:col-span-3">
          <Select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            options={departmentOptions.map((d) => ({
              value: d,
              label: d === 'All' ? 'All Departments' : d
            }))}
            className="text-xs"
          />
        </div>

        <div className="sm:col-span-2">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: 'All', label: 'All Evaluation Status' },
              { value: 'AI Evaluated', label: 'AI Evaluated' },
              { value: 'Under Review', label: 'Under Review' },
              { value: 'Improvements Requested', label: 'Improvements Requested' },
              { value: 'Pilot Created', label: 'Pilot Created' },
              { value: 'Final Decision', label: 'Final Decision' }
            ]}
            className="text-xs"
          />
        </div>

        <div className="sm:col-span-2">
          <Select
            value={scoreFilter}
            onChange={(e) => setScoreFilter(e.target.value)}
            options={[
              { value: 'All', label: 'All Score Ranges' },
              { value: 'pilot', label: 'Score ≥ 80 (Pilot Rec.)' },
              { value: 'improvement', label: 'Score 60–79 (Needs Impr.)' },
              { value: 'review', label: 'Score < 60 (Further Review)' }
            ]}
            className="text-xs"
          />
        </div>
      </div>

      {/* 4. STARTUP EVALUATION TABLE */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">APP ID</TableHead>
                <TableHead>STARTUP & PROBLEM STATEMENT</TableHead>
                <TableHead>DEPARTMENT</TableHead>
                <TableHead className="text-center">AI SCORE</TableHead>
                <TableHead className="text-center">CONFIDENCE</TableHead>
                <TableHead>RECOMMENDATION</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead className="text-right">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvaluations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12 text-zinc-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <ClipboardCheck className="w-8 h-8 text-zinc-400" />
                      <p className="font-semibold text-sm">No applications found</p>
                      <p className="text-xs text-zinc-400">
                        No startup applications match your active search or filter criteria.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredEvaluations.map((item) => {
                  const score = item.overallScore;
                  let scoreBadgeClass = 'bg-orange-50 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300 border-orange-200 dark:border-orange-800/60';
                  if (score >= 80) {
                    scoreBadgeClass = 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60';
                  } else if (score >= 60) {
                    scoreBadgeClass = 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800/60';
                  }

                  return (
                    <TableRow key={item.applicationId} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40">
                      <TableCell className="font-mono text-xs font-bold text-zinc-700 dark:text-zinc-300">
                        {item.applicationId}
                      </TableCell>
                      <TableCell>
                        <div className="font-bold text-zinc-950 dark:text-white text-sm">
                          {item.startupName}
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                          {item.problemStatement}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs text-zinc-700 dark:text-zinc-300 font-medium">
                          {item.department}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-black border ${scoreBadgeClass}`}>
                          {item.overallScore}/100
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                          {item.confidence}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            item.recommendation === 'Pilot Recommended'
                              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60'
                              : 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60'
                          }`}
                        >
                          {item.recommendation}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="primary"
                          size="xs"
                          onClick={() => handleOpenReport(item.applicationId)}
                          className="text-xs bg-orange-600 hover:bg-orange-700 text-white font-bold cursor-pointer shadow-xs"
                        >
                          View AI Report
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* HOW IT WORKS MODAL */}
      <Modal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
        title="How the AI Evaluator Works"
        description="Transparent, evidence-based AI decision support designed for public procurement."
        maxWidth="max-w-2xl"
        footer={
          <div className="flex justify-end w-full">
            <Button variant="primary" size="sm" onClick={() => setIsHowItWorksOpen(false)}>
              Got it
            </Button>
          </div>
        }
      >
        <div className="space-y-4 text-xs">
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            The AI Evaluator provides transparent, advisory scoring to assist government officials in evaluating startup proposals without manual jury friction.
          </p>

          <div className="space-y-3">
            {[
              {
                step: '01',
                title: 'Startup Application Dossier',
                desc: 'Startups submit technical specs, DPIIT details, prototype data, and trial results.'
              },
              {
                step: '02',
                title: 'Multi-Parameter Evidence Analysis',
                desc: 'AI analyzes technical feasibility, IP novelty, state-wide scalability, and public impact.'
              },
              {
                step: '03',
                title: 'Transparent Readiness Score',
                desc: 'Generates a 0–100 score with clear explainability ("Why this score?") and identified risks.'
              },
              {
                step: '04',
                title: 'Advisory Pilot Recommendation',
                desc: 'Suggests duration, location, and measurable KPIs for a controlled real-world pilot.'
              },
              {
                step: '05',
                title: 'Government Executive Decision',
                desc: 'The authorized government official makes the final call to initiate a pilot or request improvements.'
              }
            ].map((item) => (
              <div
                key={item.step}
                className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/70 dark:border-zinc-800 flex items-start gap-3"
              >
                <span className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400 font-mono font-black flex items-center justify-center shrink-0">
                  {item.step}
                </span>
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800/60 text-orange-900 dark:text-orange-200 font-semibold">
            Key Rule: AI never automatically approves or rejects proposals. Authority stays strictly with the government officer.
          </div>
        </div>
      </Modal>
    </div>
  );
}
