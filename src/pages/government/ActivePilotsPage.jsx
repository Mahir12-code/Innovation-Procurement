import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Search,
  Rocket,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sliders,
  Plus,
  Building2,
  MapPin,
  Calendar,
  IndianRupee,
  Activity,
  TrendingUp,
  Eye,
  FileText,
  Check,
  Award,
  BarChart3,
  Layers,
  ChevronRight,
  ShieldCheck,
  ExternalLink,
  Sparkles,
  Info,
  X,
  Send,
  Users
} from 'lucide-react';
import { useGovernmentPortal } from '../../context/GovernmentPortalContext';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';

import {
  PILOT_SANDBOX_STATS,
  TESTBED_LOCATIONS,
  PILOT_OPPORTUNITIES,
  INITIAL_PILOT_SANDBOX_LIST,
  COMPLETED_PILOTS
} from '../../data/pilotSandboxData';

export function ActivePilotsPage() {
  const navigate = useNavigate();
  const { pilotId } = useParams();
  const { showToast } = useGovernmentPortal();

  // Active lifecycle tab: 'opportunities' | 'active' | 'completed'
  const [activeTab, setActiveTab] = useState('opportunities');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [kpiHealthFilter, setKpiHealthFilter] = useState('All');

  // Local state for active pilots list (initialized from data)
  const [pilotsList, setPilotsList] = useState(INITIAL_PILOT_SANDBOX_LIST);
  const [completedList, setCompletedList] = useState(COMPLETED_PILOTS);

  // Drilldown states:
  // - selectedPilotForDetails: active pilot object to show in full detail view
  // - selectedOutcome: completed pilot object to show in outcome & scale view
  const [selectedPilotForDetails, setSelectedPilotForDetails] = useState(null);
  const [selectedOutcome, setSelectedOutcome] = useState(null);

  // Detail View Sub-Tab
  const [detailTab, setDetailTab] = useState('overview');

  // ==========================================
  // CREATE PILOT MULTI-STEP WIZARD STATE
  // ==========================================
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1); // 1 to 5
  const [wizardSuccessPilot, setWizardSuccessPilot] = useState(null);

  // Wizard form state
  const [wizardStartup, setWizardStartup] = useState(PILOT_OPPORTUNITIES[0]);
  const [wizardTestbedId, setWizardTestbedId] = useState('TB-NSK-14');
  const [wizardObjective, setWizardObjective] = useState(
    'Reduce missed waste collection and improve route efficiency using AI-based predictive scheduling across Nashik Ward 14.'
  );
  const [wizardDuration, setWizardDuration] = useState('90 Days');
  const [wizardStartDate, setWizardStartDate] = useState('2026-09-15');
  const [wizardEndDate, setWizardEndDate] = useState('2026-12-14');
  const [wizardScope, setWizardScope] = useState('2–3 Municipal Wards');
  const [wizardDeploymentType, setWizardDeploymentType] = useState('Controlled Field Deployment');
  const [wizardTotalBudget, setWizardTotalBudget] = useState('₹35 Lakhs');
  const [wizardFundingRequested, setWizardFundingRequested] = useState('₹22.5 Lakhs');
  const [wizardKpis, setWizardKpis] = useState(PILOT_OPPORTUNITIES[0].defaultKpis);
  const [newKpiName, setNewKpiName] = useState('');
  const [newKpiBaseline, setNewKpiBaseline] = useState('');
  const [newKpiTarget, setNewKpiTarget] = useState('');
  const [newKpiFreq, setNewKpiFreq] = useState('Weekly');
  const [isAddingKpi, setIsAddingKpi] = useState(false);

  // Scale confirmation modal state
  const [scaleConfirmModal, setScaleConfirmModal] = useState(null); // pilot object

  // Check URL parameter on mount or change
  useEffect(() => {
    if (pilotId) {
      const activeMatch = pilotsList.find((p) => p.id === pilotId || p.startupId === pilotId);
      if (activeMatch) {
        setSelectedPilotForDetails(activeMatch);
        setActiveTab('active');
        return;
      }
      const completedMatch = completedList.find(
        (c) => c.pilotId === pilotId || c.startupId === pilotId
      );
      if (completedMatch) {
        setSelectedOutcome(completedMatch);
        setActiveTab('completed');
      }
    }
  }, [pilotId, pilotsList, completedList]);

  // Selected testbed object for wizard
  const selectedTestbed = useMemo(() => {
    return TESTBED_LOCATIONS.find((t) => t.id === wizardTestbedId) || TESTBED_LOCATIONS[0];
  }, [wizardTestbedId]);

  // Department options for filter
  const departmentOptions = [
    'All',
    'Urban Development Department',
    'Transport Department',
    'Public Health Department',
    'Water Resources Department',
    'Agriculture Department'
  ];

  // Handler to open create pilot wizard for a specific opportunity
  const handleOpenCreatePilot = (opportunity) => {
    const opp = opportunity || PILOT_OPPORTUNITIES[0];
    setWizardStartup(opp);
    setWizardStep(1);
    setWizardSuccessPilot(null);
    setWizardObjective(
      `Deploy ${opp.startupName}'s ${opp.solution} to validate real-world efficacy and measurable operational impact.`
    );
    setWizardDuration(opp.suggestedPilot.duration);
    setWizardScope(opp.suggestedPilot.scope);
    setWizardTotalBudget(opp.suggestedPilot.budget);
    setWizardFundingRequested(opp.suggestedPilot.fundingRequested);
    setWizardKpis([...opp.defaultKpis]);

    // Match testbed location if available
    const matchingTestbed = TESTBED_LOCATIONS.find((t) =>
      t.location.toLowerCase().includes(opp.suggestedPilot.district.toLowerCase())
    );
    if (matchingTestbed) {
      setWizardTestbedId(matchingTestbed.id);
    } else {
      setWizardTestbedId(TESTBED_LOCATIONS[0].id);
    }

    setIsCreateModalOpen(true);
  };

  // Launch pilot in wizard step 5
  const handleLaunchPilot = () => {
    const newId = `PIL-00${pilotsList.length + 1}`;
    const newActivePilot = {
      id: newId,
      startupId: wizardStartup.appId,
      startup: wizardStartup.startupName,
      solution: wizardStartup.solution,
      department: wizardStartup.department,
      testbedLocation: selectedTestbed.location,
      district: selectedTestbed.district,
      startDate: wizardStartDate,
      endDate: wizardEndDate,
      duration: wizardDuration,
      daysRemaining: 90,
      currentPhase: 'Planning & Setup',
      progress: 10,
      kpiStatus: 'On Track',
      grantBudget: wizardTotalBudget,
      disbursed: '₹0 Lakhs (Tranche 1 Pending)',
      budgetTotal: 3500000,
      budgetDisbursed: 0,
      officer: selectedTestbed.nodalOfficer,
      contact: wizardStartup.startupName + ' (+91 98230 45678)',
      objective: wizardObjective,
      milestones: wizardStartup.defaultMilestones.map((m, idx) => ({
        name: m.name,
        status: idx === 0 ? 'In Progress' : 'Upcoming',
        date: idx === 0 ? 'Current Phase' : 'TBD'
      })),
      kpis: wizardKpis.map((k) => ({
        ...k,
        current: k.baseline,
        status: 'On Track'
      })),
      insights: {
        observations: [
          'Pilot officially sanctioned for ' + selectedTestbed.location + '.',
          'Initial testbed baseline established at ' + selectedTestbed.baselineEfficiency + '.',
          'Hardware delivery and telemetry setup initiated.'
        ],
        recommendedAction: 'Verify site readiness and sensor telemetry integration.'
      }
    };

    setPilotsList((prev) => [newActivePilot, ...prev]);
    setWizardSuccessPilot(newActivePilot);
    showToast(`Pilot ${newId} for ${wizardStartup.startupName} initiated successfully!`, 'success');
  };

  // Add new custom KPI in step 4
  const handleAddCustomKpi = (e) => {
    e.preventDefault();
    if (!newKpiName.trim()) return;
    setWizardKpis((prev) => [
      ...prev,
      {
        name: newKpiName.trim(),
        baseline: newKpiBaseline.trim() || 'N/A',
        target: newKpiTarget.trim() || 'N/A',
        frequency: newKpiFreq,
        status: 'Pending Launch'
      }
    ]);
    setNewKpiName('');
    setNewKpiBaseline('');
    setNewKpiTarget('');
    setIsAddingKpi(false);
  };

  // Remove KPI
  const handleRemoveKpi = (idx) => {
    setWizardKpis((prev) => prev.filter((_, i) => i !== idx));
  };

  // Approve district scale
  const handleConfirmScale = () => {
    if (!scaleConfirmModal) return;
    setCompletedList((prev) =>
      prev.map((c) =>
        c.pilotId === scaleConfirmModal.pilotId
          ? {
              ...c,
              scaleScope: {
                ...c.scaleScope,
                scaleStatus: 'Approved for Scale'
              }
            }
          : c
      )
    );
    if (selectedOutcome && selectedOutcome.pilotId === scaleConfirmModal.pilotId) {
      setSelectedOutcome((prev) => ({
        ...prev,
        scaleScope: {
          ...prev.scaleScope,
          scaleStatus: 'Approved for Scale'
        }
      }));
    }
    showToast(
      `Scale deployment approved for ${scaleConfirmModal.startupName} across ${scaleConfirmModal.scaleScope.district}!`,
      'success'
    );
    setScaleConfirmModal(null);
  };

  // Filtered lists
  const filteredOpportunities = useMemo(() => {
    return PILOT_OPPORTUNITIES.filter((opp) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        opp.startupName.toLowerCase().includes(q) ||
        opp.solution.toLowerCase().includes(q) ||
        opp.suggestedPilot.targetLocation.toLowerCase().includes(q);
      const matchesDept = deptFilter === 'All' || opp.department === deptFilter;
      return matchesSearch && matchesDept;
    });
  }, [searchQuery, deptFilter]);

  const filteredActivePilots = useMemo(() => {
    return pilotsList.filter((pilot) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        pilot.id.toLowerCase().includes(q) ||
        pilot.startup.toLowerCase().includes(q) ||
        pilot.solution.toLowerCase().includes(q) ||
        pilot.testbedLocation.toLowerCase().includes(q);
      const matchesDept = deptFilter === 'All' || pilot.department === deptFilter;
      const matchesKpi = kpiHealthFilter === 'All' || pilot.kpiStatus === kpiHealthFilter;
      const matchesStatus = statusFilter === 'All' || pilot.currentPhase === statusFilter;
      return matchesSearch && matchesDept && matchesKpi && matchesStatus;
    });
  }, [pilotsList, searchQuery, deptFilter, kpiHealthFilter, statusFilter]);

  const filteredCompletedPilots = useMemo(() => {
    return completedList.filter((c) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        c.startupName.toLowerCase().includes(q) ||
        c.solution.toLowerCase().includes(q) ||
        c.testbed.location.toLowerCase().includes(q);
      const matchesDept = deptFilter === 'All' || c.department === deptFilter;
      return matchesSearch && matchesDept;
    });
  }, [completedList, searchQuery, deptFilter]);

  // ==========================================
  // VIEW: DETAILED PILOT VIEW (if selected)
  // ==========================================
  if (selectedPilotForDetails) {
    const p = selectedPilotForDetails;
    return (
      <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Link & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setSelectedPilotForDetails(null);
                  navigate('/government/pilots');
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Pilot Sandbox
              </button>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <span className="text-xs font-semibold text-orange-600 dark:text-orange-400">
                Live Deployment Telemetry
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
                {p.startup}
              </h1>
              <Badge variant="outline" size="sm" className="font-mono">
                {p.id}
              </Badge>
              <Badge
                variant={p.kpiStatus === 'On Track' ? 'success' : 'warning'}
                size="sm"
                className="font-bold uppercase"
              >
                {p.kpiStatus}
              </Badge>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {p.solution} • {p.testbedLocation} • {p.startDate} to {p.endDate}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/government/evaluator/${p.startupId || 'APP-1024'}`)}
              className="text-xs"
            >
              <Eye className="w-3.5 h-3.5 mr-1" />
              View Assessment
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => showToast('Syncing real-time telemetry from edge sensors...', 'info')}
              className="text-xs flex items-center gap-1.5"
            >
              <Activity className="w-3.5 h-3.5" />
              Refresh Telemetry
            </Button>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex border-b border-zinc-200 dark:border-zinc-800 gap-6 text-xs font-bold">
          {['overview', 'kpis & metrics', 'milestones', 'documents', 'stakeholders', 'notes'].map((tab) => (
            <button
              key={tab}
              onClick={() => setDetailTab(tab)}
              className={`pb-3 border-b-2 capitalize transition-colors ${
                detailTab === tab
                  ? 'border-orange-600 text-orange-600 dark:text-orange-400'
                  : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab Content */}
        {detailTab === 'overview' && (
          <div className="space-y-6">
            {/* Top Stat Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
                <div className="flex justify-between items-center text-xs text-zinc-500 mb-1">
                  <span className="font-semibold">Pilot Progress</span>
                  <Activity className="w-4 h-4 text-orange-600" />
                </div>
                <div className="text-2xl font-black text-zinc-900 dark:text-white mb-2">
                  {p.progress}%
                </div>
                <ProgressBar progress={p.progress} variant="primary" size="sm" />
                <span className="text-[11px] text-zinc-400 mt-1 block">Phase 4 of 6 active</span>
              </div>

              <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
                <div className="flex justify-between items-center text-xs text-zinc-500 mb-1">
                  <span className="font-semibold">Current Phase</span>
                  <Layers className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-lg font-black text-zinc-900 dark:text-white mb-1">
                  {p.currentPhase}
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Active in {p.testbedLocation}
                </p>
              </div>

              <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
                <div className="flex justify-between items-center text-xs text-zinc-500 mb-1">
                  <span className="font-semibold">Days Remaining</span>
                  <Clock className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-2xl font-black text-zinc-900 dark:text-white mb-1">
                  {p.daysRemaining} Days
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Target End: {p.endDate}
                </p>
              </div>

              <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
                <div className="flex justify-between items-center text-xs text-zinc-500 mb-1">
                  <span className="font-semibold">Budget Utilization</span>
                  <IndianRupee className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-2xl font-black text-zinc-900 dark:text-white mb-1">
                  {p.disbursed}
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Cap: {p.grantBudget} (64% released)
                </p>
              </div>
            </div>

            {/* KPI Performance Section */}
            <div className="bg-white dark:bg-zinc-900 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                    Key Performance Indicators
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Live telemetry vs baseline benchmarks verified by municipal field inspector
                  </p>
                </div>
                <Badge variant="outline" size="sm" className="text-[11px]">
                  Real-time SLA Uptime 98.4%
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {p.kpis?.map((kpi, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold text-zinc-900 dark:text-white">
                        {kpi.name}
                      </span>
                      <Badge
                        variant={kpi.status === 'On Track' ? 'success' : 'warning'}
                        size="xs"
                      >
                        {kpi.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <div>
                        <span className="text-[10px] text-zinc-400 block uppercase font-bold">
                          Current
                        </span>
                        <span className="text-base font-black text-zinc-900 dark:text-white">
                          {kpi.current}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-zinc-400 block uppercase font-bold">
                          Target
                        </span>
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          {kpi.target}
                        </span>
                      </div>
                    </div>
                    <div className="text-[11px] text-zinc-500 pt-1 border-t border-zinc-200 dark:border-zinc-700 flex justify-between">
                      <span>Baseline: {kpi.baseline}</span>
                      <span>{kpi.frequency}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Two-Column: Milestone Timeline & AI Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Milestone Timeline */}
              <div className="bg-white dark:bg-zinc-900 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                    Milestone Timeline
                  </h3>
                  <span className="text-xs text-zinc-400">6 Stages</span>
                </div>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-200 dark:before:bg-zinc-800">
                  {p.milestones?.map((m, idx) => {
                    const isCompleted = m.status === 'Completed';
                    const isInProgress = m.status === 'In Progress';
                    return (
                      <div key={idx} className="relative flex items-start justify-between">
                        <div
                          className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            isCompleted
                              ? 'bg-emerald-600 text-white'
                              : isInProgress
                              ? 'bg-orange-600 text-white animate-pulse'
                              : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'
                          }`}
                        >
                          {isCompleted ? <Check className="w-3 h-3" /> : idx + 1}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                            <span>{m.name}</span>
                            {isInProgress && (
                              <span className="text-[10px] bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300 font-extrabold px-1.5 py-0.5 rounded">
                                CURRENT
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-zinc-400">{m.date}</p>
                        </div>
                        <Badge
                          variant={isCompleted ? 'success' : isInProgress ? 'primary' : 'neutral'}
                          size="xs"
                        >
                          {m.status}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pilot Insights Card */}
              <div className="bg-white dark:bg-zinc-900 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange-600" />
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                    Pilot Operational Insights
                  </h3>
                </div>

                <div className="space-y-2.5">
                  {p.insights?.observations.map((obs, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 flex items-start gap-2.5"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-1.5 shrink-0" />
                      <span>{obs}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 rounded-lg bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800/40 space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-orange-700 dark:text-orange-300">
                    Recommended Executive Action
                  </div>
                  <p className="text-xs font-semibold text-zinc-900 dark:text-white">
                    {p.insights?.recommendedAction}
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center text-xs text-zinc-500">
                  <span>Assigned Nodal Officer:</span>
                  <span className="font-bold text-zinc-900 dark:text-white">{p.officer}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {detailTab !== 'overview' && (
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 text-center space-y-3">
            <FileText className="w-8 h-8 text-zinc-400 mx-auto" />
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white capitalize">
              {detailTab} Ledger
            </h3>
            <p className="text-xs text-zinc-500 max-w-md mx-auto">
              Live records and verification certificates are synced with the Maharashtra State Innovation Portal.
            </p>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // VIEW: COMPLETED PILOT OUTCOME & SCALE (if selected)
  // ==========================================
  if (selectedOutcome) {
    const outcome = selectedOutcome;
    return (
      <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setSelectedOutcome(null);
                  navigate('/government/pilots');
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Completed Pilots
              </button>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                Pilot Outcome & Scale Decision
              </span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
                {outcome.startupName}
              </h1>
              <Badge variant="success" size="md">
                {outcome.status}
              </Badge>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {outcome.solution} • {outcome.testbed.location} ({outcome.testbed.district}) • {outcome.duration}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/government/evaluator/${outcome.startupId}`)}
              className="text-xs"
            >
              <Eye className="w-3.5 h-3.5 mr-1" />
              View Initial Assessment
            </Button>
          </div>
        </div>

        {/* Large Score Card */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border-2 border-emerald-500/30 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 leading-none">
                {outcome.overallScore}
              </span>
              <span className="text-[10px] font-bold text-emerald-700/80 dark:text-emerald-300/80">
                / 100
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-zinc-400">
                  Overall Pilot Score
                </span>
                <Badge variant="success" size="sm" className="font-bold">
                  {outcome.scaleRecommendation}
                </Badge>
              </div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                Deployment Completed Successfully
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xl">
                {outcome.supportingText}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg text-center border border-zinc-100 dark:border-zinc-800">
              <div className="text-base font-black text-emerald-600">
                +{outcome.highlights.efficiencyImprovement}
              </div>
              <div className="text-[10px] text-zinc-400 font-semibold">Efficiency Boost</div>
            </div>
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg text-center border border-zinc-100 dark:border-zinc-800">
              <div className="text-base font-black text-blue-600">
                -{outcome.highlights.costReduction}
              </div>
              <div className="text-[10px] text-zinc-400 font-semibold">Cost Reduction</div>
            </div>
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg text-center border border-zinc-100 dark:border-zinc-800">
              <div className="text-base font-black text-orange-600">
                {outcome.highlights.citizenSatisfaction}
              </div>
              <div className="text-[10px] text-zinc-400 font-semibold">Citizen Satisfaction</div>
            </div>
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg text-center border border-zinc-100 dark:border-zinc-800">
              <div className="text-base font-black text-zinc-900 dark:text-white">
                {outcome.highlights.deploymentRate}
              </div>
              <div className="text-[10px] text-zinc-400 font-semibold">Deployment Rate</div>
            </div>
          </div>
        </div>

        {/* Impact Analysis: Before Pilot vs After Pilot */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
              Measurable Impact Analysis (Before vs After)
            </h3>
            <p className="text-xs text-zinc-500">
              Audited before-pilot municipal baseline compared with verified post-pilot telemetry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {outcome.impactAnalysis.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-zinc-900 dark:text-white">
                    {item.metric}
                  </span>
                  <span className="text-xs font-black text-emerald-600">
                    {item.before} {item.unit} → {item.after} {item.unit}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-zinc-400">
                    <span>Before Pilot: {item.before} {item.unit}</span>
                    <span>Post-Pilot: {item.after} {item.unit}</span>
                  </div>
                  <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-2 rounded-full overflow-hidden flex">
                    <div
                      className="bg-zinc-400 h-full"
                      style={{ width: `${Math.min(100, item.before)}%` }}
                    />
                    <div
                      className="bg-emerald-500 h-full"
                      style={{ width: `${Math.min(100, Math.max(0, item.after - item.before))}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Executive Scale Decision Box */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border-2 border-orange-500/20 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                Executive Action
              </span>
              <h3 className="text-base font-black text-zinc-900 dark:text-white">
                Government Scaling Decision
              </h3>
            </div>
            {outcome.scaleScope.scaleStatus === 'Approved for Scale' ? (
              <Badge variant="success" size="md" className="font-black flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                Approved for District Scale
              </Badge>
            ) : (
              <span className="text-xs text-zinc-400 italic">
                The government official makes the final decision. The AI recommendation remains advisory.
              </span>
            )}
          </div>

          <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 text-xs space-y-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-semibold">
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase">Target Locations</span>
                <span className="text-zinc-900 dark:text-white">{outcome.scaleScope.targetWards} Wards</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase">Scaling District</span>
                <span className="text-zinc-900 dark:text-white">{outcome.scaleScope.district}</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase">Projected Impact</span>
                <span className="text-emerald-600">{outcome.scaleScope.projectedImpact}</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase">Estimated Budget</span>
                <span className="text-zinc-900 dark:text-white">{outcome.scaleScope.estimatedBudget}</span>
              </div>
            </div>
          </div>

          {/* Decision Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              variant="primary"
              size="md"
              disabled={outcome.scaleScope.scaleStatus === 'Approved for Scale'}
              onClick={() => setScaleConfirmModal(outcome)}
              className="flex items-center gap-1.5 shadow-sm"
            >
              <Rocket className="w-4 h-4" />
              {outcome.scaleScope.scaleStatus === 'Approved for Scale'
                ? 'Scale Deployment Approved'
                : 'Scale Across District'}
            </Button>

            <Button
              variant="outline"
              size="md"
              onClick={() => showToast('Pilot extension requisition drafted for approval.', 'info')}
            >
              Extend Pilot
            </Button>

            <Button
              variant="outline"
              size="md"
              onClick={() => showToast('Improvement notice dispatched to startup.', 'info')}
            >
              Request Improvements
            </Button>

            <Button
              variant="ghost"
              size="md"
              onClick={() => showToast('Pilot archived and closed.', 'info')}
              className="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            >
              Close Pilot
            </Button>
          </div>
        </div>

        {/* Scale Confirmation Modal for Outcome View */}
        {scaleConfirmModal && (
          <Modal
            isOpen={!!scaleConfirmModal}
            onClose={() => setScaleConfirmModal(null)}
            title={`Scale ${scaleConfirmModal.startupName} Across District?`}
            description={`District-wide rollout authorization for ${scaleConfirmModal.scaleScope.district}.`}
            maxWidth="max-w-md"
            footer={
              <div className="flex items-center justify-end gap-2 w-full">
                <Button variant="outline" size="sm" onClick={() => setScaleConfirmModal(null)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={handleConfirmScale}>
                  Approve District Scale Deployment
                </Button>
              </div>
            }
          >
            <div className="space-y-3 text-xs text-zinc-700 dark:text-zinc-300">
              <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-400 font-semibold">Pilot Outcome Score:</span>
                  <span className="font-bold text-emerald-600">{scaleConfirmModal.overallScore}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400 font-semibold">Target Locations:</span>
                  <span className="font-bold text-zinc-900 dark:text-white">
                    {scaleConfirmModal.scaleScope.targetWards} Municipal Wards
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400 font-semibold">Projected Impact:</span>
                  <span className="font-bold text-emerald-600">
                    {scaleConfirmModal.scaleScope.projectedImpact}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400 font-semibold">Estimated Budget:</span>
                  <span className="font-bold text-zinc-900 dark:text-white">
                    {scaleConfirmModal.scaleScope.estimatedBudget}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-zinc-500">
                Confirming this sanction will issue a municipal scale mandate and notify the Department Nodal Officer.
              </p>
            </div>
          </Modal>
        )}
      </div>
    );
  }

  // ==========================================
  // MAIN VIEW: PILOT SANDBOX LANDING PAGE
  // ==========================================
  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/government/dashboard')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="text-xs font-semibold text-orange-600 dark:text-orange-400">
              Government of Maharashtra
            </span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
              Pilot Sandbox
            </h1>
            <Badge variant="primary" size="md">
              Innovation Testbed
            </Badge>
          </div>
          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            Turn promising innovations into measurable real-world solutions.
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Create, deploy and evaluate structured government pilots with defined testbeds, budgets, milestones and measurable outcomes.
          </p>
        </div>

        {/* Top-Right Action Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/government/pilots/alerts')}
            className="flex items-center gap-1.5 text-xs"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-orange-600" />
            Pilot Milestones
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => handleOpenCreatePilot(PILOT_OPPORTUNITIES[0])}
            className="flex items-center gap-1.5 shadow-sm text-xs"
          >
            <Plus className="w-4 h-4" />
            + Create New Pilot
          </Button>
        </div>
      </div>

      {/* Top 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => setActiveTab('opportunities')}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            activeTab === 'opportunities'
              ? 'bg-orange-50/60 dark:bg-orange-950/30 border-orange-400 dark:border-orange-600/60 shadow-xs'
              : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
            <span className="font-bold uppercase tracking-wider text-[10px]">Pilot Ready</span>
            <Award className="w-4 h-4 text-orange-600" />
          </div>
          <div className="text-2xl font-black text-zinc-900 dark:text-white">
            {PILOT_SANDBOX_STATS.pilotReady}
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">
            Startups recommended for pilot
          </p>
        </div>

        <div
          onClick={() => setActiveTab('active')}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            activeTab === 'active'
              ? 'bg-orange-50/60 dark:bg-orange-950/30 border-orange-400 dark:border-orange-600/60 shadow-xs'
              : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
            <span className="font-bold uppercase tracking-wider text-[10px]">Active Pilots</span>
            <Rocket className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-zinc-900 dark:text-white">
            {pilotsList.length}
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">
            Currently deployed in field
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
            <span className="font-bold uppercase tracking-wider text-[10px]">Awaiting Approval</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-zinc-900 dark:text-white">
            {PILOT_SANDBOX_STATS.awaitingApproval}
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">
            Pilot proposals awaiting action
          </p>
        </div>

        <div
          onClick={() => setActiveTab('completed')}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            activeTab === 'completed'
              ? 'bg-orange-50/60 dark:bg-orange-950/30 border-orange-400 dark:border-orange-600/60 shadow-xs'
              : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
            <span className="font-bold uppercase tracking-wider text-[10px]">Completed Pilots</span>
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-zinc-900 dark:text-white">
            {completedList.length}
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">
            Ready for outcome assessment
          </p>
        </div>
      </div>

      {/* Lifecycle Tabs Bar */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800 gap-8 text-sm font-bold">
        <button
          onClick={() => setActiveTab('opportunities')}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'opportunities'
              ? 'border-orange-600 text-orange-600 dark:text-orange-400'
              : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
          }`}
        >
          <span>Pilot Opportunities</span>
          <span className="px-2 py-0.5 rounded-full text-xs bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 font-bold">
            {PILOT_OPPORTUNITIES.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('active')}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'active'
              ? 'border-orange-600 text-orange-600 dark:text-orange-400'
              : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
          }`}
        >
          <span>Active Pilots</span>
          <span className="px-2 py-0.5 rounded-full text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold">
            {pilotsList.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'completed'
              ? 'border-orange-600 text-orange-600 dark:text-orange-400'
              : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
          }`}
        >
          <span>Completed Pilots</span>
          <span className="px-2 py-0.5 rounded-full text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold">
            {completedList.length}
          </span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
          <Input
            placeholder="Search startup, pilot ID, testbed location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>

        <Select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          options={departmentOptions.map((d) => ({
            value: d,
            label: d === 'All' ? 'All Departments' : d
          }))}
          className="text-xs"
        />

        <Select
          value={kpiHealthFilter}
          onChange={(e) => setKpiHealthFilter(e.target.value)}
          options={[
            { value: 'All', label: 'All KPI Health' },
            { value: 'On Track', label: 'On Track (Healthy)' },
            { value: 'At Risk', label: 'At Risk (Attention Needed)' }
          ]}
          className="text-xs"
        />
      </div>

      {/* ========================================== */}
      {/* TAB 1: PILOT OPPORTUNITIES */}
      {/* ========================================== */}
      {activeTab === 'opportunities' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                Pilot Opportunities
              </h2>
              <p className="text-xs text-zinc-500">
                Startups recommended for real-world government validation based on Innovation Assessment.
              </p>
            </div>
            <span className="text-xs text-zinc-400">
              Showing {filteredOpportunities.length} Recommended Startups
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredOpportunities.map((opp) => (
              <div
                key={opp.id}
                className="bg-white dark:bg-zinc-900 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs hover:border-orange-500/40 transition-all flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-black text-zinc-900 dark:text-white">
                          {opp.startupName}
                        </h3>
                        <span className="text-xs text-zinc-400 font-mono">({opp.appId})</span>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                        {opp.solution}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800/60 text-xs font-black text-orange-700 dark:text-orange-400">
                        <span>{opp.assessmentScore}</span>
                        <span className="text-[10px] text-orange-500">/ 100</span>
                      </div>
                      <span className="block text-[10px] font-bold text-emerald-600 mt-0.5">
                        {opp.assessmentStatus}
                      </span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold text-[11px]">
                      {opp.department}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold text-[11px]">
                      TRL: {opp.currentTrl}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold text-[11px]">
                      {opp.confidence}
                    </span>
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
                    {opp.aiSummary}
                  </p>

                  {/* Suggested Pilot Scope Card */}
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs space-y-1.5">
                    <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                      <span>Suggested Pilot Scope</span>
                      <span className="text-orange-600">Advisory</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 font-semibold text-zinc-800 dark:text-zinc-200 text-xs">
                      <div>
                        <span className="block text-[10px] text-zinc-400 font-normal">Duration</span>
                        {opp.suggestedPilot.duration}
                      </div>
                      <div>
                        <span className="block text-[10px] text-zinc-400 font-normal">Testbed Scope</span>
                        {opp.suggestedPilot.scope}
                      </div>
                      <div>
                        <span className="block text-[10px] text-zinc-400 font-normal">Success KPIs</span>
                        {opp.suggestedPilot.kpisCount} KPIs Defined
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/government/evaluator/${opp.appId}`)}
                    className="text-xs"
                  >
                    <Eye className="w-3.5 h-3.5 mr-1" />
                    View Assessment
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleOpenCreatePilot(opp)}
                    className="text-xs flex items-center gap-1.5"
                  >
                    <Rocket className="w-3.5 h-3.5" />
                    Create Pilot
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 2: ACTIVE PILOTS */}
      {/* ========================================== */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-white">Active Pilots</h2>
            <p className="text-xs text-zinc-500">
              Monitor real-world deployment, KPI performance, milestones and budget utilization.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xs">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">Pilot ID</TableHead>
                  <TableHead>Startup & Solution</TableHead>
                  <TableHead>Testbed Location</TableHead>
                  <TableHead>Current Phase</TableHead>
                  <TableHead className="w-36">Deployment Progress</TableHead>
                  <TableHead>KPI Health</TableHead>
                  <TableHead>Disbursed / Budget</TableHead>
                  <TableHead className="text-right w-28">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivePilots.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12 text-zinc-500">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Rocket className="w-8 h-8 text-zinc-400" />
                        <p className="font-semibold">No active pilots match your criteria</p>
                        <p className="text-xs text-zinc-400">
                          Create a new pilot from the Pilot Opportunities tab to deploy it here.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredActivePilots.map((pilot) => (
                    <TableRow key={pilot.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40">
                      <TableCell className="font-mono text-xs font-bold text-zinc-600 dark:text-zinc-400">
                        {pilot.id}
                      </TableCell>
                      <TableCell>
                        <div className="font-bold text-zinc-900 dark:text-white text-sm">
                          {pilot.startup}
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                          {pilot.solution}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                          {pilot.testbedLocation}
                        </div>
                        <div className="text-[11px] text-zinc-400">
                          {pilot.startDate} — {pilot.endDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                          {pilot.currentPhase}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-bold">
                            <span className="text-zinc-500">Completed</span>
                            <span className="text-zinc-900 dark:text-white">{pilot.progress}%</span>
                          </div>
                          <ProgressBar
                            progress={pilot.progress}
                            variant={
                              pilot.progress >= 75
                                ? 'success'
                                : pilot.kpiStatus === 'At Risk'
                                ? 'warning'
                                : 'primary'
                            }
                            size="sm"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={pilot.kpiStatus === 'On Track' ? 'success' : 'warning'}
                          size="sm"
                        >
                          {pilot.kpiStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                          {pilot.disbursed}
                        </div>
                        <div className="text-[11px] text-zinc-400">Cap: {pilot.grantBudget}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="primary"
                          size="xs"
                          onClick={() => {
                            setSelectedPilotForDetails(pilot);
                            setDetailTab('overview');
                          }}
                          className="text-xs flex items-center gap-1 ml-auto"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View Pilot
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 3: COMPLETED PILOTS */}
      {/* ========================================== */}
      {activeTab === 'completed' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-zinc-900 dark:text-white">Completed Pilots</h2>
              <p className="text-xs text-zinc-500">
                Pilots that have finished deployment and are ready for outcome assessment and scaling decisions.
              </p>
            </div>
            <span className="text-xs text-zinc-400">
              Showing {filteredCompletedPilots.length} Completed Deployments
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredCompletedPilots.map((comp) => (
              <div
                key={comp.pilotId}
                className="bg-white dark:bg-zinc-900 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-black text-zinc-900 dark:text-white">
                          {comp.startupName}
                        </h3>
                        <span className="text-xs text-zinc-400 font-mono">({comp.pilotId})</span>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                        {comp.solution}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-xs font-black text-emerald-700 dark:text-emerald-400">
                        <span>{comp.overallScore}</span>
                        <span className="text-[10px] text-emerald-500">/ 100</span>
                      </div>
                      <span className="block text-[10px] font-bold text-emerald-600 mt-0.5">
                        {comp.scaleRecommendation}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold text-[11px]">
                      {comp.department}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold text-[11px]">
                      {comp.testbed.location}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold text-[11px]">
                      {comp.duration}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    {comp.supportingText}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-3 gap-2 p-2.5 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg text-center text-xs">
                    <div>
                      <span className="block text-[10px] text-zinc-400">Efficiency</span>
                      <span className="font-bold text-emerald-600">+{comp.highlights.efficiencyImprovement}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-zinc-400">Cost Saving</span>
                      <span className="font-bold text-blue-600">-{comp.highlights.costReduction}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-zinc-400">Citizen Rating</span>
                      <span className="font-bold text-orange-600">{comp.highlights.citizenSatisfaction}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800">
                  <span className="text-xs font-semibold text-zinc-400">
                    Scale Status: <span className="text-zinc-900 dark:text-white font-bold">{comp.scaleScope.scaleStatus}</span>
                  </span>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setSelectedOutcome(comp)}
                    className="text-xs flex items-center gap-1.5"
                  >
                    <Award className="w-3.5 h-3.5" />
                    View Outcome
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* CREATE PILOT MULTI-STEP WIZARD MODAL */}
      {/* =================================================================== */}
      {isCreateModalOpen && (
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => {
            setIsCreateModalOpen(false);
            setWizardStep(1);
            setWizardSuccessPilot(null);
          }}
          title={wizardSuccessPilot ? "Pilot Created Successfully" : "Create Government Pilot"}
          description={
            wizardSuccessPilot
              ? "Official pilot sanctioned under Maharashtra Innovation Testbed Framework"
              : "Structured workflow to deploy validated startup innovation into municipal testbeds."
          }
          maxWidth="max-w-3xl"
        >
          {wizardSuccessPilot ? (
            /* SUCCESS STATE */
            <div className="py-6 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black text-zinc-900 dark:text-white">
                  Pilot Created Successfully
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                  {wizardStartup.startupName} is now registered for controlled field deployment in{' '}
                  {selectedTestbed.location}.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 max-w-sm mx-auto text-xs space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Pilot ID:</span>
                  <span className="font-mono font-bold text-zinc-900 dark:text-white">
                    {wizardSuccessPilot.id}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Status:</span>
                  <Badge variant="primary" size="xs">
                    Awaiting Deployment
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Testbed:</span>
                  <span className="font-semibold text-zinc-900 dark:text-white">
                    {selectedTestbed.location}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Duration:</span>
                  <span className="font-semibold text-zinc-900 dark:text-white">
                    {wizardDuration}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setActiveTab('active');
                  }}
                >
                  Back to Sandbox
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setSelectedPilotForDetails(wizardSuccessPilot);
                    setActiveTab('active');
                  }}
                  className="flex items-center gap-1.5"
                >
                  <Eye className="w-4 h-4" />
                  View Pilot
                </Button>
              </div>
            </div>
          ) : (
            /* MULTI-STEP WORKFLOW */
            <div className="space-y-6">
              {/* Stepper Header */}
              <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <div className="flex items-center justify-between text-xs font-bold">
                  {[
                    { num: 1, label: 'Innovation' },
                    { num: 2, label: 'Testbed' },
                    { num: 3, label: 'Pilot Design' },
                    { num: 4, label: 'KPIs & Budget' },
                    { num: 5, label: 'Review & Launch' }
                  ].map((step) => {
                    const isActive = wizardStep === step.num;
                    const isPassed = wizardStep > step.num;
                    return (
                      <div
                        key={step.num}
                        className={`flex items-center gap-2 ${
                          isActive
                            ? 'text-orange-600 dark:text-orange-400'
                            : isPassed
                            ? 'text-emerald-600'
                            : 'text-zinc-400'
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            isActive
                              ? 'bg-orange-600 text-white'
                              : isPassed
                              ? 'bg-emerald-600 text-white'
                              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          {isPassed ? <Check className="w-3.5 h-3.5" /> : step.num}
                        </div>
                        <span className="hidden sm:inline">{step.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* STEP 1: INNOVATION */}
              {wizardStep === 1 && (
                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-base font-black text-zinc-900 dark:text-white">
                          {wizardStartup.startupName}
                        </h4>
                        <p className="text-zinc-500 dark:text-zinc-400 font-medium">
                          {wizardStartup.solution}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-black text-orange-600">
                          {wizardStartup.assessmentScore} / 100
                        </span>
                        <span className="block text-[10px] text-emerald-600 font-bold">
                          {wizardStartup.assessmentStatus}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-zinc-600 dark:text-zinc-300">
                      <div>
                        <span className="text-zinc-400 block text-[10px] uppercase">Application ID</span>
                        <span className="font-mono font-bold text-zinc-900 dark:text-white">
                          {wizardStartup.appId}
                        </span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block text-[10px] uppercase">Department</span>
                        <span className="font-bold text-zinc-900 dark:text-white">
                          {wizardStartup.department}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* AI Assessment Summary */}
                  <div className="p-3.5 rounded-lg bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/40 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-700 dark:text-orange-300">
                      AI Assessment Summary
                    </span>
                    <p className="text-xs text-zinc-800 dark:text-zinc-200">
                      "{wizardStartup.aiSummary}"
                    </p>
                  </div>

                  {/* Key information from assessment (read-only) */}
                  <div className="space-y-2">
                    <h5 className="font-bold text-zinc-900 dark:text-white uppercase tracking-wider text-[11px]">
                      Key Information from Assessment (Read-Only)
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                        <span className="text-zinc-400 block text-[10px] uppercase">Technology</span>
                        <span className="font-semibold text-zinc-900 dark:text-white">
                          {wizardStartup.technology}
                        </span>
                      </div>
                      <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                        <span className="text-zinc-400 block text-[10px] uppercase">Current TRL</span>
                        <span className="font-semibold text-zinc-900 dark:text-white">
                          {wizardStartup.currentTrl}
                        </span>
                      </div>
                      <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                        <span className="text-zinc-400 block text-[10px] uppercase">Deployment Readiness</span>
                        <span className="font-semibold text-zinc-900 dark:text-white">
                          {wizardStartup.deploymentReadiness}
                        </span>
                      </div>
                      <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                        <span className="text-zinc-400 block text-[10px] uppercase">Expected Impact</span>
                        <span className="font-semibold text-emerald-600">
                          {wizardStartup.expectedImpact}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Wizard Step 1 Footer */}
                  <div className="flex justify-end pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setWizardStep(2)}
                      className="flex items-center gap-1.5"
                    >
                      Continue to Testbed
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 2: TESTBED */}
              {wizardStep === 2 && (
                <div className="space-y-4 text-xs">
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                      Select Government Testbed
                    </h4>
                    <p className="text-zinc-500">
                      Choose the municipal ward or district jurisdiction for field deployment.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                        Department
                      </label>
                      <Input value={wizardStartup.department} disabled className="text-xs bg-zinc-100 dark:bg-zinc-800" />
                    </div>
                    <div>
                      <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                        District
                      </label>
                      <Input value={selectedTestbed.district} disabled className="text-xs bg-zinc-100 dark:bg-zinc-800" />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                      Testbed Location *
                    </label>
                    <Select
                      value={wizardTestbedId}
                      onChange={(e) => setWizardTestbedId(e.target.value)}
                      options={TESTBED_LOCATIONS.map((t) => ({
                        value: t.id,
                        label: `${t.location} (${t.district})`
                      }))}
                      className="text-xs"
                    />
                  </div>

                  {/* Testbed Information Card */}
                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-zinc-900 dark:text-white text-xs">
                        {selectedTestbed.location} Profile
                      </span>
                      <Badge variant="outline" size="xs">
                        Verified Testbed
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-zinc-700 dark:text-zinc-300">
                      <div>
                        <span className="text-zinc-400 block text-[10px] uppercase font-bold">Population</span>
                        <span className="font-bold text-zinc-900 dark:text-white">{selectedTestbed.population}</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block text-[10px] uppercase font-bold">Daily Volume</span>
                        <span className="font-bold text-zinc-900 dark:text-white">{selectedTestbed.dailyVolume}</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block text-[10px] uppercase font-bold">Current Efficiency</span>
                        <span className="font-bold text-orange-600">{selectedTestbed.baselineEfficiency}</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block text-[10px] uppercase font-bold">Nodal Officer</span>
                        <span className="font-bold text-zinc-900 dark:text-white text-[11px] truncate block">
                          {selectedTestbed.nodalOfficer}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700 text-[11px]">
                      <span className="text-zinc-400 font-semibold">Existing Infrastructure: </span>
                      <span className="text-zinc-600 dark:text-zinc-300">{selectedTestbed.infrastructure}</span>
                    </div>
                  </div>

                  {/* Wizard Step 2 Footer */}
                  <div className="flex justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <Button variant="outline" size="sm" onClick={() => setWizardStep(1)}>
                      ← Back
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setWizardStep(3)}
                      className="flex items-center gap-1.5"
                    >
                      Continue to Pilot Design
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 3: PILOT DESIGN */}
              {wizardStep === 3 && (
                <div className="space-y-4 text-xs">
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Define Pilot</h4>
                    <p className="text-zinc-500">
                      Configure pilot duration, boundaries, and primary operational objective.
                    </p>
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                      Pilot Objective *
                    </label>
                    <textarea
                      rows={2}
                      value={wizardObjective}
                      onChange={(e) => setWizardObjective(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-1 focus:ring-orange-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                        Duration
                      </label>
                      <Select
                        value={wizardDuration}
                        onChange={(e) => setWizardDuration(e.target.value)}
                        options={[
                          { value: '60 Days', label: '60 Days' },
                          { value: '90 Days', label: '90 Days (Recommended)' },
                          { value: '120 Days', label: '120 Days' },
                          { value: '180 Days', label: '180 Days' }
                        ]}
                        className="text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                        Start Date
                      </label>
                      <Input
                        type="date"
                        value={wizardStartDate}
                        onChange={(e) => setWizardStartDate(e.target.value)}
                        className="text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                        End Date
                      </label>
                      <Input
                        type="date"
                        value={wizardEndDate}
                        onChange={(e) => setWizardEndDate(e.target.value)}
                        className="text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                        Pilot Scope
                      </label>
                      <Input
                        value={wizardScope}
                        onChange={(e) => setWizardScope(e.target.value)}
                        className="text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                        Deployment Type
                      </label>
                      <Select
                        value={wizardDeploymentType}
                        onChange={(e) => setWizardDeploymentType(e.target.value)}
                        options={[
                          { value: 'Controlled Field Deployment', label: 'Controlled Field Deployment' },
                          { value: 'Live Parallel Run', label: 'Live Parallel Run' },
                          { value: 'Sandbox Simulation with Live Feed', label: 'Sandbox Simulation with Live Feed' }
                        ]}
                        className="text-xs"
                      />
                    </div>
                  </div>

                  {/* AI Suggested Scope Badge */}
                  <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/40 flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-orange-600 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[11px] font-bold text-orange-700 dark:text-orange-300 uppercase block">
                        AI Suggested Pilot Scope (Advisory)
                      </span>
                      <p className="text-[11px] text-zinc-700 dark:text-zinc-300">
                        {wizardStartup.suggestedPilot.duration} across {wizardStartup.suggestedPilot.scope} is recommended to account for route variation and operational shift transitions.
                      </p>
                    </div>
                  </div>

                  {/* Wizard Step 3 Footer */}
                  <div className="flex justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <Button variant="outline" size="sm" onClick={() => setWizardStep(2)}>
                      ← Back
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setWizardStep(4)}
                      className="flex items-center gap-1.5"
                    >
                      Continue to KPIs & Budget
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 4: KPIS & BUDGET */}
              {wizardStep === 4 && (
                <div className="space-y-4 text-xs">
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                      Define Success Metrics
                    </h4>
                    <p className="text-zinc-500">
                      Specify baseline vs target indicators and sanctioned funding envelope.
                    </p>
                  </div>

                  {/* KPI Table */}
                  <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold">
                        <tr>
                          <th className="p-2.5">KPI Name</th>
                          <th className="p-2.5">Baseline</th>
                          <th className="p-2.5">Target</th>
                          <th className="p-2.5">Frequency</th>
                          <th className="p-2.5 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {wizardKpis.map((k, idx) => (
                          <tr key={idx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40">
                            <td className="p-2.5 font-bold text-zinc-900 dark:text-white">{k.name}</td>
                            <td className="p-2.5 text-zinc-500">{k.baseline}</td>
                            <td className="p-2.5 font-semibold text-emerald-600">{k.target}</td>
                            <td className="p-2.5 text-zinc-500">{k.frequency}</td>
                            <td className="p-2.5 text-right">
                              <button
                                type="button"
                                onClick={() => handleRemoveKpi(idx)}
                                className="text-red-500 hover:text-red-700 text-xs font-bold"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Add KPI Inline Button / Form */}
                  {isAddingKpi ? (
                    <form onSubmit={handleAddCustomKpi} className="p-3 rounded-lg border border-orange-200 dark:border-orange-800/60 bg-orange-50/40 dark:bg-orange-950/20 space-y-3">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold text-zinc-500">KPI Name</label>
                          <Input
                            placeholder="e.g. Turnaround Time"
                            value={newKpiName}
                            onChange={(e) => setNewKpiName(e.target.value)}
                            required
                            className="text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-zinc-500">Baseline</label>
                          <Input
                            placeholder="e.g. 48h"
                            value={newKpiBaseline}
                            onChange={(e) => setNewKpiBaseline(e.target.value)}
                            className="text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-zinc-500">Target</label>
                          <Input
                            placeholder="e.g. <12h"
                            value={newKpiTarget}
                            onChange={(e) => setNewKpiTarget(e.target.value)}
                            className="text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-zinc-500">Frequency</label>
                          <Select
                            value={newKpiFreq}
                            onChange={(e) => setNewKpiFreq(e.target.value)}
                            options={[
                              { value: 'Daily', label: 'Daily' },
                              { value: 'Weekly', label: 'Weekly' },
                              { value: 'Monthly', label: 'Monthly' }
                            ]}
                            className="text-xs"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="xs" onClick={() => setIsAddingKpi(false)}>
                          Cancel
                        </Button>
                        <Button variant="primary" size="xs" type="submit">
                          Append KPI
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => setIsAddingKpi(true)}
                      className="text-xs flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add KPI
                    </Button>
                  )}

                  {/* Budget Section */}
                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 space-y-3">
                    <h5 className="font-bold text-zinc-900 dark:text-white uppercase tracking-wider text-[11px]">
                      Pilot Budget & Grant Allocation
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                          Total Pilot Budget
                        </label>
                        <Input
                          value={wizardTotalBudget}
                          onChange={(e) => setWizardTotalBudget(e.target.value)}
                          className="text-xs"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                          Funding Requested
                        </label>
                        <Input
                          value={wizardFundingRequested}
                          onChange={(e) => setWizardFundingRequested(e.target.value)}
                          className="text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Sequential Milestones */}
                  <div className="space-y-2">
                    <h5 className="font-bold text-zinc-900 dark:text-white uppercase tracking-wider text-[11px]">
                      Deployment Milestones
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-700 dark:text-zinc-300 font-medium">
                      {wizardStartup.defaultMilestones.map((m, idx) => (
                        <div key={idx} className="p-2.5 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300 flex items-center justify-center text-[10px] font-bold">
                            {idx + 1}
                          </span>
                          <span className="text-xs truncate">{m.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Wizard Step 4 Footer */}
                  <div className="flex justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <Button variant="outline" size="sm" onClick={() => setWizardStep(3)}>
                      ← Back
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setWizardStep(5)}
                      className="flex items-center gap-1.5"
                    >
                      Continue to Review & Launch
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 5: REVIEW & LAUNCH */}
              {wizardStep === 5 && (
                <div className="space-y-4 text-xs">
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                      Final Review & Pilot Authorization
                    </h4>
                    <p className="text-zinc-500">
                      Verify all parameters before creating the official government pilot sanction.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div>
                        <span className="text-zinc-400 block text-[10px] uppercase font-bold">Startup</span>
                        <span className="font-black text-zinc-900 dark:text-white text-sm">
                          {wizardStartup.startupName}
                        </span>
                        <span className="text-zinc-400 block text-[10px]">{wizardStartup.appId}</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block text-[10px] uppercase font-bold">Assessment</span>
                        <span className="font-bold text-orange-600">
                          {wizardStartup.assessmentScore} / 100
                        </span>
                        <span className="text-emerald-600 block text-[10px] font-semibold">
                          {wizardStartup.assessmentStatus}
                        </span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block text-[10px] uppercase font-bold">Department</span>
                        <span className="font-semibold text-zinc-900 dark:text-white">
                          {wizardStartup.department}
                        </span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block text-[10px] uppercase font-bold">Testbed</span>
                        <span className="font-semibold text-zinc-900 dark:text-white">
                          {selectedTestbed.location}
                        </span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block text-[10px] uppercase font-bold">Duration</span>
                        <span className="font-semibold text-zinc-900 dark:text-white">
                          {wizardDuration}
                        </span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block text-[10px] uppercase font-bold">Sanctioned Budget</span>
                        <span className="font-bold text-zinc-900 dark:text-white">
                          {wizardFundingRequested} (Cap {wizardTotalBudget})
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700">
                      <span className="text-zinc-400 block text-[10px] uppercase font-bold">
                        Pilot Objective
                      </span>
                      <p className="text-zinc-800 dark:text-zinc-200 font-medium">
                        {wizardObjective}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700 flex justify-between items-center text-[11px]">
                      <span className="text-zinc-500">Configured Success Metrics:</span>
                      <span className="font-bold text-emerald-600">{wizardKpis.length} Defined KPIs</span>
                    </div>
                  </div>

                  {/* Warning banner */}
                  <div className="p-3.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                    <p className="text-xs text-amber-900 dark:text-amber-200 font-medium">
                      Launching this pilot will create an official government pilot project. The final decision remains with the authorized government official.
                    </p>
                  </div>

                  {/* Wizard Step 5 Footer */}
                  <div className="flex justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <Button variant="outline" size="sm" onClick={() => setWizardStep(4)}>
                      ← Back
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleLaunchPilot}
                      className="flex items-center gap-1.5 shadow-sm"
                    >
                      <Rocket className="w-4 h-4" />
                      Launch Pilot
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </Modal>
      )}

      {/* =================================================================== */}
      {/* SCALE CONFIRMATION MODAL */}
      {/* =================================================================== */}
      {scaleConfirmModal && (
        <Modal
          isOpen={!!scaleConfirmModal}
          onClose={() => setScaleConfirmModal(null)}
          title={`Scale ${scaleConfirmModal.startupName} Across District?`}
          description={`District-wide rollout authorization for ${scaleConfirmModal.scaleScope.district}.`}
          maxWidth="max-w-md"
          footer={
            <div className="flex items-center justify-end gap-2 w-full">
              <Button variant="outline" size="sm" onClick={() => setScaleConfirmModal(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleConfirmScale}>
                Approve District Scale Deployment
              </Button>
            </div>
          }
        >
          <div className="space-y-3 text-xs text-zinc-700 dark:text-zinc-300">
            <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-400 font-semibold">Pilot Outcome Score:</span>
                <span className="font-bold text-emerald-600">{scaleConfirmModal.overallScore}/100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400 font-semibold">Target Locations:</span>
                <span className="font-bold text-zinc-900 dark:text-white">
                  {scaleConfirmModal.scaleScope.targetWards} Municipal Wards
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400 font-semibold">Projected Impact:</span>
                <span className="font-bold text-emerald-600">
                  {scaleConfirmModal.scaleScope.projectedImpact}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400 font-semibold">Estimated Budget:</span>
                <span className="font-bold text-zinc-900 dark:text-white">
                  {scaleConfirmModal.scaleScope.estimatedBudget}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-zinc-500">
              Confirming this sanction will issue a municipal scale mandate and notify the Department Nodal Officer.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}
