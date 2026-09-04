import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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
  FileText
} from 'lucide-react';
import { useGovernmentPortal } from '../../context/GovernmentPortalContext';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';

export function ActivePilotsPage() {
  const navigate = useNavigate();
  const { activePilots, updatePilotKpi, addPilotMilestone, showToast } = useGovernmentPortal();

  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [kpiFilter, setKpiFilter] = useState('All');

  // Milestone / Telemetry Tracking Modal
  const [selectedPilot, setSelectedPilot] = useState(null);

  // Update KPI Modal
  const [kpiModalPilot, setKpiModalPilot] = useState(null);
  const [newProgress, setNewProgress] = useState(50);
  const [newStatus, setNewStatus] = useState('On Track');

  // Add Milestone Modal
  const [milestonePilot, setMilestonePilot] = useState(null);
  const [newMilestoneName, setNewMilestoneName] = useState('');

  const departmentOptions = [
    'All',
    'Urban Development Department',
    'Transport Department',
    'Public Health Department',
    'Water Resources Department',
    'School Education Department',
    'Agriculture Department'
  ];

  const filteredPilots = useMemo(() => {
    return activePilots.filter((pilot) => {
      const matchesSearch =
        pilot.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pilot.startup.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pilot.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pilot.testbedLocation.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDept = deptFilter === 'All' || pilot.department === deptFilter;
      const matchesKpi = kpiFilter === 'All' || pilot.kpiStatus === kpiFilter;

      return matchesSearch && matchesDept && matchesKpi;
    });
  }, [activePilots, searchQuery, deptFilter, kpiFilter]);

  const handleOpenKpiModal = (pilot) => {
    setKpiModalPilot(pilot);
    setNewProgress(pilot.progress);
    setNewStatus(pilot.kpiStatus);
  };

  const handleSaveKpi = (e) => {
    e.preventDefault();
    if (!kpiModalPilot) return;

    const delta = newProgress - kpiModalPilot.progress;
    updatePilotKpi(kpiModalPilot.id, delta, newStatus);
    setKpiModalPilot(null);
  };

  const handleOpenAddMilestone = (pilot) => {
    setMilestonePilot(pilot);
    setNewMilestoneName('');
  };

  const handleSaveMilestone = (e) => {
    e.preventDefault();
    if (!milestonePilot || !newMilestoneName.trim()) return;

    addPilotMilestone(milestonePilot.id, newMilestoneName.trim());
    setMilestonePilot(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Navigation & Header */}
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
              Operations & Testbed Desk
            </span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
              Active Pilots & Testbed Management
            </h1>
            <Badge variant="primary" size="md">
              {activePilots.length} Live Deployments
            </Badge>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Real-time telemetry, milestone completion, and SLA tracking across Maharashtra municipal and district testbeds.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/government/dashboard')}
          >
            Dashboard
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/government/pilots/alerts')}
            className="flex items-center gap-1.5 shadow-sm"
          >
            <AlertTriangle className="w-4 h-4" />
            Pilot Milestones
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
          <Input
            placeholder="Search pilot ID, startup, testbed location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>

        <Select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          options={departmentOptions.map(d => ({ value: d, label: d === 'All' ? 'All Departments' : d }))}
          className="text-xs"
        />

        <Select
          value={kpiFilter}
          onChange={(e) => setKpiFilter(e.target.value)}
          options={[
            { value: 'All', label: 'All KPI Statuses' },
            { value: 'On Track', label: 'On Track (Healthy)' },
            { value: 'Delayed', label: 'Delayed Milestones' },
            { value: 'Needs Attention', label: 'Needs Immediate Attention' }
          ]}
          className="text-xs"
        />
      </div>

      {/* Pilots Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xs">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Pilot ID</TableHead>
              <TableHead>Startup & Solution</TableHead>
              <TableHead>Testbed Location</TableHead>
              <TableHead>Current Phase</TableHead>
              <TableHead className="w-44">Deployment Progress</TableHead>
              <TableHead>KPI Health</TableHead>
              <TableHead>Disbursed / Budget</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPilots.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12 text-zinc-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Rocket className="w-8 h-8 text-zinc-400" />
                    <p className="font-semibold">No active pilots found</p>
                    <p className="text-xs text-zinc-400">Initiate pilots from the Shortlisted Startups page to monitor them here.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredPilots.map((pilot) => (
                <TableRow key={pilot.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40">
                  <TableCell className="font-mono text-xs font-bold text-zinc-600 dark:text-zinc-400">
                    {pilot.id}
                  </TableCell>
                  <TableCell>
                    <div className="font-bold text-zinc-900 dark:text-white text-sm">
                      {pilot.startup}
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                      {pilot.problem}
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
                            : pilot.kpiStatus === 'Needs Attention'
                            ? 'danger'
                            : pilot.kpiStatus === 'Delayed'
                            ? 'warning'
                            : 'primary'
                        }
                        size="sm"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        pilot.kpiStatus === 'On Track'
                          ? 'success'
                          : pilot.kpiStatus === 'Delayed'
                          ? 'warning'
                          : 'danger'
                      }
                      size="sm"
                    >
                      {pilot.kpiStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                      {pilot.disbursed}
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      Cap: {pilot.grantBudget}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => setSelectedPilot(pilot)}
                        className="text-xs text-zinc-700 dark:text-zinc-300"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        Milestones
                      </Button>
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => handleOpenKpiModal(pilot)}
                        className="text-xs"
                      >
                        <Sliders className="w-3.5 h-3.5 mr-1" />
                        Update KPI
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Milestone & Telemetry Tracking Modal */}
      {selectedPilot && (
        <Modal
          isOpen={!!selectedPilot}
          onClose={() => setSelectedPilot(null)}
          title={`Testbed Telemetry: ${selectedPilot.startup}`}
          description={`Pilot ID: ${selectedPilot.id} • ${selectedPilot.testbedLocation}`}
          maxWidth="max-w-2xl"
          footer={
            <div className="flex items-center justify-between w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleOpenAddMilestone(selectedPilot)}
                className="flex items-center gap-1.5 text-xs"
              >
                <Plus className="w-4 h-4" />
                Add Milestone Checkpoint
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setSelectedPilot(null)}
              >
                Close
              </Button>
            </div>
          }
        >
          <div className="space-y-4 text-xs text-zinc-600 dark:text-zinc-300">
            {/* Overview Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-zinc-50 dark:bg-zinc-800/60 p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Nodal Officer</span>
                <span className="font-bold text-zinc-900 dark:text-white">{selectedPilot.officer}</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Timeline</span>
                <span className="font-bold text-zinc-900 dark:text-white">{selectedPilot.startDate} - {selectedPilot.endDate}</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Grant Disbursed</span>
                <span className="font-bold text-emerald-600">{selectedPilot.disbursed}</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Overall Progress</span>
                <span className="font-bold text-orange-600">{selectedPilot.progress}%</span>
              </div>
            </div>

            {/* Live Milestones */}
            <div>
              <h4 className="font-bold text-zinc-900 dark:text-white text-xs uppercase tracking-wide mb-2">
                Tranche & Deployment Milestones
              </h4>
              <div className="space-y-2">
                {selectedPilot.milestones?.map((m, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        m.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : m.status === 'In Progress'
                          ? 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300'
                          : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800'
                      }`}>
                        {idx + 1}
                      </div>
                      <div>
                        <div className="font-bold text-zinc-900 dark:text-white text-xs">{m.name}</div>
                        <div className="text-[11px] text-zinc-400">Target verification by Municipal Field Inspector</div>
                      </div>
                    </div>
                    <Badge
                      variant={m.status === 'Completed' ? 'success' : m.status === 'In Progress' ? 'primary' : 'neutral'}
                      size="sm"
                    >
                      {m.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Telemetry KPIs */}
            <div>
              <h4 className="font-bold text-zinc-900 dark:text-white text-xs uppercase tracking-wide mb-2">
                IoT Telemetry & Field KPIs
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedPilot.kpis?.map((kpi, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-zinc-900 dark:text-white block">{kpi.name}</span>
                      <span className="text-[11px] text-zinc-400">Target: {kpi.target}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-emerald-600 block">{kpi.current}</span>
                      <span className="text-[10px] text-zinc-500 uppercase font-bold">{kpi.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Update KPI & Progress Modal */}
      {kpiModalPilot && (
        <Modal
          isOpen={!!kpiModalPilot}
          onClose={() => setKpiModalPilot(null)}
          title={`Update Progress & Health: ${kpiModalPilot.startup}`}
          description={`Pilot ID: ${kpiModalPilot.id}`}
          maxWidth="max-w-md"
          footer={
            <div className="flex items-center justify-end gap-2 w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setKpiModalPilot(null)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSaveKpi}
              >
                Save Progress
              </Button>
            </div>
          }
        >
          <form onSubmit={handleSaveKpi} className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-zinc-700 dark:text-zinc-300">
                  Deployment Completion %
                </label>
                <span className="font-black text-orange-600 text-sm">{newProgress}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={newProgress}
                onChange={(e) => setNewProgress(parseInt(e.target.value) || 0)}
                className="w-full accent-orange-600 cursor-pointer"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Field Health & KPI Status
              </label>
              <Select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                options={[
                  { value: 'On Track', label: 'On Track (Normal Operations)' },
                  { value: 'Delayed', label: 'Delayed (Minor Schedule Slippage)' },
                  { value: 'Needs Attention', label: 'Needs Attention (Critical Alert / Telemetry Halt)' }
                ]}
                className="text-xs"
              />
            </div>
          </form>
        </Modal>
      )}

      {/* Add Milestone Modal */}
      {milestonePilot && (
        <Modal
          isOpen={!!milestonePilot}
          onClose={() => setMilestonePilot(null)}
          title={`Add Milestone Checkpoint: ${milestonePilot.id}`}
          description={`Startup: ${milestonePilot.startup}`}
          maxWidth="max-w-md"
          footer={
            <div className="flex items-center justify-end gap-2 w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMilestonePilot(null)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSaveMilestone}
              >
                Append Milestone
              </Button>
            </div>
          }
        >
          <form onSubmit={handleSaveMilestone} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Milestone Title *
              </label>
              <Input
                placeholder="e.g. 50-Node Sensor Gateway Stress Testing"
                value={newMilestoneName}
                onChange={(e) => setNewMilestoneName(e.target.value)}
                required
                className="text-xs"
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
