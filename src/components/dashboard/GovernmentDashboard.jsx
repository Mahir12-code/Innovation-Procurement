import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Target,
  FileText,
  Rocket,
  Plus,
  ArrowUpRight,
  ArrowRight,
  Search,
  CheckCircle2,
  Clock,
  ExternalLink,
  Calendar,
  Building2,
  Eye
} from 'lucide-react';
import { useGovernmentPortal } from '../../context/GovernmentPortalContext';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';

export function GovernmentDashboard() {
  const navigate = useNavigate();
  const { counts, applications, addProblemStatement, showToast } = useGovernmentPortal();

  // Create Challenge Modal
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  // New Problem Statement Form State
  const [newProblem, setNewProblem] = useState({
    title: '',
    department: 'Urban Development Department',
    sector: 'Smart Cities & IoT',
    budget: '5000000',
    deadline: '2026-10-30',
    description: ''
  });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newProblem.title.trim()) {
      showToast('Please enter a challenge title', 'error');
      return;
    }
    addProblemStatement(newProblem);
    setIsPostModalOpen(false);
    setNewProblem({
      title: '',
      department: 'Urban Development Department',
      sector: 'Smart Cities & IoT',
      budget: '5000000',
      deadline: '2026-10-30',
      description: ''
    });
  };

  // Curated recent applications combining live context with user-specified flagship examples
  const recentApplicationsList = [
    {
      id: 'APP-2001',
      startup: 'AquaSense',
      solution: 'AI-based Water Quality Monitor',
      department: 'Ministry of Jal Shakti',
      status: 'Under Review',
      date: '12 Sep 2026',
      founder: 'Dr. Ramesh Kulkarni',
      trl: 'TRL 7 (Field Validated)'
    },
    {
      id: 'APP-2002',
      startup: 'EcoScan',
      solution: 'Waste Segregation using IoT',
      department: 'Ministry of Environment',
      status: 'Shortlisted',
      date: '10 Sep 2026',
      founder: 'Pooja Deshmukh',
      trl: 'TRL 8 (Commercial Ready)'
    },
    {
      id: 'APP-2003',
      startup: 'RuralTech',
      solution: 'Smart Traffic Management',
      department: 'Ministry of Road Transport',
      status: 'New',
      date: '09 Sep 2026',
      founder: 'Amit Verma',
      trl: 'TRL 6 (Field Prototype)'
    },
    {
      id: 'APP-2004',
      startup: 'SwastyaLink',
      solution: 'Rural Telehealth Platform',
      department: 'Ministry of Health',
      status: 'Under Review',
      date: '08 Sep 2026',
      founder: 'Dr. Ananya Joshi',
      trl: 'TRL 7 (Clinical Trials)'
    },
    {
      id: 'APP-2005',
      startup: 'AgriNext',
      solution: 'Soil Health Prediction AI',
      department: 'Ministry of Agriculture',
      status: 'In Discussion',
      date: '06 Sep 2026',
      founder: 'Karan Patil',
      trl: 'TRL 6 (University Tested)'
    },
    ...(applications || []).slice(0, 3).map((a) => ({
      id: a.id,
      startup: a.startupName,
      solution: a.problemTitle,
      department: a.department,
      status: a.status || 'Under Review',
      date: a.submittedDate,
      founder: a.founder,
      trl: a.trlLevel || 'TRL 6'
    }))
  ].slice(0, 5);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Shortlisted':
      case 'Approved':
      case 'Active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
            {status}
          </span>
        );
      case 'Under Review':
      case 'Pending':
      case 'In Discussion':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60">
            {status}
          </span>
        );
      case 'New':
      case 'Submitted':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
            {status}
          </span>
        );
      case 'Rejected':
      case 'Failed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300 border border-red-200/60 dark:border-red-800/60">
            {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto">
      {/* -------------------------------------------------- */}
      {/* 1. WELCOME & GREETING SECTION */}
      {/* -------------------------------------------------- */}
      <div className="space-y-2 pt-2">
        <div className="w-12 h-1 bg-orange-600 rounded-full" />
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white tracking-tight leading-tight">
          Welcome Back,<br />
          <span className="text-zinc-900 dark:text-zinc-100">Dr. Rajesh Sharma</span>
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
          Let's drive innovation for a stronger Bharat.
        </p>
      </div>

      {/* -------------------------------------------------- */}
      {/* 2. KPI SECTION (3 PRIMARY CARDS + PRIMARY ACTION) */}
      {/* -------------------------------------------------- */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* 3 Pastel KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
          {/* KPI 1: Active Problem Statements */}
          <div
            onClick={() => navigate('/government/problem-statements')}
            className="group p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-100/80 dark:border-blue-900/30 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-blue-100/80 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center">
                <Target className="w-4 h-4" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-200 transition-colors" />
            </div>
            <div className="mt-4">
              <div className="text-3xl font-black text-blue-950 dark:text-blue-100 tracking-tight">
                {counts?.activeProblems ?? 12}
              </div>
              <div className="text-xs font-semibold text-blue-700 dark:text-blue-300 mt-1">
                Active Problem Statements
              </div>
            </div>
          </div>

          {/* KPI 2: Applications Received */}
          <div
            onClick={() => navigate('/government/applications')}
            className="group p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-100/80 dark:border-emerald-900/30 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-emerald-100/80 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-200 transition-colors" />
            </div>
            <div className="mt-4">
              <div className="text-3xl font-black text-emerald-950 dark:text-emerald-100 tracking-tight">
                {counts?.applicationsReceived ?? 48}
              </div>
              <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 mt-1">
                Applications Received
              </div>
            </div>
          </div>

          {/* KPI 3: Ongoing Pilot Projects */}
          <div
            onClick={() => navigate('/government/pilots')}
            className="group p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-100/80 dark:border-amber-900/30 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-amber-100/80 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 flex items-center justify-center">
                <Rocket className="w-4 h-4" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-amber-400 group-hover:text-amber-700 dark:group-hover:text-amber-200 transition-colors" />
            </div>
            <div className="mt-4">
              <div className="text-3xl font-black text-amber-950 dark:text-amber-100 tracking-tight">
                {counts?.activePilots ?? 5}
              </div>
              <div className="text-xs font-semibold text-amber-700 dark:text-amber-300 mt-1">
                Ongoing Pilot Projects
              </div>
            </div>
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="lg:w-64 shrink-0 flex items-center">
          <button
            type="button"
            onClick={() => setIsPostModalOpen(true)}
            className="w-full h-full py-5 px-6 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            <span>Post New Problem Statement</span>
          </button>
        </div>
      </div>

      {/* -------------------------------------------------- */}
      {/* 3. MAIN DASHBOARD CONTENT (RECENT APPS + RIGHT PANEL) */}
      {/* -------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Recent Applications (8 Columns) */}
        <div className="lg:col-span-8 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-zinc-950 dark:text-white tracking-tight">
                Recent Applications
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Latest startup innovation proposals submitted for department review.
              </p>
            </div>
            <button
              onClick={() => navigate('/government/applications')}
              className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700 dark:text-orange-400 transition-colors cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-800 text-zinc-400 uppercase text-[10px] font-bold tracking-wider">
                  <th className="pb-3 pr-4">Startup</th>
                  <th className="pb-3 pr-4">Solution Title</th>
                  <th className="pb-3 pr-4">Relevant Department</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 text-right">Received On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                {recentApplicationsList.map((app) => (
                  <tr
                    key={app.id}
                    onClick={() => setSelectedApp(app)}
                    className="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 pr-4 font-bold text-zinc-900 dark:text-white group-hover:text-orange-600 transition-colors">
                      {app.startup}
                    </td>
                    <td className="py-3.5 pr-4 text-zinc-600 dark:text-zinc-300 max-w-xs truncate">
                      {app.solution}
                    </td>
                    <td className="py-3.5 pr-4 text-zinc-500 dark:text-zinc-400">
                      {app.department}
                    </td>
                    <td className="py-3.5 pr-4">
                      {getStatusBadge(app.status)}
                    </td>
                    <td className="py-3.5 text-right text-zinc-500 dark:text-zinc-400 font-mono text-[11px]">
                      {app.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Quick Actions (4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Actions Card */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-5 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
              Quick Actions
            </h3>
            <div className="space-y-1.5">
              {[
                {
                  label: 'Browse Startups',
                  icon: Search,
                  onClick: () => navigate('/government/discovery')
                },
                {
                  label: 'Manage Pilot Projects',
                  icon: Rocket,
                  onClick: () => navigate('/government/pilots')
                }
              ].map((action, idx) => {
                const Icon = action.icon;
                return (
                  <button
                    key={idx}
                    onClick={action.onClick}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-zinc-400 group-hover:text-orange-600 transition-colors" />
                      <span>{action.label}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-300 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------- */}
      {/* 4. BOTTOM SUBTLE BRANDING & MISSION SECTION */}
      {/* -------------------------------------------------- */}
      <div className="rounded-2xl p-5 bg-orange-50/50 dark:bg-zinc-900/60 border border-orange-100/80 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div>
          <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
            Collaborating with innovators today for a better tomorrow.
          </p>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
            Empowering Indian startups to pilot and scale high-impact solutions with government ministries.
          </p>
        </div>
        <div className="text-center sm:text-right shrink-0">
          <span className="text-xs font-black text-orange-600 dark:text-orange-400 block tracking-tight">
            Sarkar Setu
          </span>
          <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
            Government–Startup Partnership
          </span>
        </div>
      </div>

      {/* -------------------------------------------------- */}
      {/* MODAL: POST NEW PROBLEM STATEMENT */}
      {/* -------------------------------------------------- */}
      {isPostModalOpen && (
        <Modal
          isOpen={isPostModalOpen}
          onClose={() => setIsPostModalOpen(false)}
          title="Post New Problem Statement"
          description="Publish a department innovation RFP on Sarkar Setu for startup pilot applications."
          maxWidth="max-w-xl"
          footer={
            <div className="flex items-center justify-end gap-2 w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPostModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleCreateSubmit}
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold"
              >
                Publish Challenge
              </Button>
            </div>
          }
        >
          <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Challenge Title *
              </label>
              <Input
                placeholder="e.g. AI-driven Traffic Control System for Municipal Junctions"
                value={newProblem.title}
                onChange={(e) => setNewProblem({ ...newProblem, title: e.target.value })}
                required
                className="text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Issuing Department
                </label>
                <Select
                  value={newProblem.department}
                  onChange={(e) => setNewProblem({ ...newProblem, department: e.target.value })}
                  options={[
                    { value: 'Urban Development Department', label: 'Urban Development Department' },
                    { value: 'Transport Department', label: 'Transport Department' },
                    { value: 'Public Health Department', label: 'Public Health Department' },
                    { value: 'Water Resources Department', label: 'Water Resources Department' },
                    { value: 'School Education Department', label: 'School Education Department' },
                    { value: 'Agriculture Department', label: 'Agriculture Department' }
                  ]}
                  className="text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Technology Category
                </label>
                <Select
                  value={newProblem.sector}
                  onChange={(e) => setNewProblem({ ...newProblem, sector: e.target.value })}
                  options={[
                    { value: 'Smart Cities & IoT', label: 'Smart Cities & IoT' },
                    { value: 'Smart Mobility', label: 'Smart Mobility' },
                    { value: 'MedTech & Healthcare', label: 'MedTech & Healthcare' },
                    { value: 'CleanTech & IoT', label: 'CleanTech & IoT' },
                    { value: 'EdTech & GovTech', label: 'EdTech & GovTech' },
                    { value: 'AgriTech', label: 'AgriTech' }
                  ]}
                  className="text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Sanction Budget (INR)
                </label>
                <Input
                  type="number"
                  placeholder="5000000"
                  value={newProblem.budget}
                  onChange={(e) => setNewProblem({ ...newProblem, budget: e.target.value })}
                  className="text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Submission Deadline
                </label>
                <Input
                  type="date"
                  value={newProblem.deadline}
                  onChange={(e) => setNewProblem({ ...newProblem, deadline: e.target.value })}
                  className="text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Problem Description & Operational Need
              </label>
              <Textarea
                rows={3}
                placeholder="Explain the administrative problem, existing challenges, and target outcomes..."
                value={newProblem.description}
                onChange={(e) => setNewProblem({ ...newProblem, description: e.target.value })}
                className="text-xs"
              />
            </div>
          </form>
        </Modal>
      )}

      {/* -------------------------------------------------- */}
      {/* MODAL: APPLICATION DETAILS */}
      {/* -------------------------------------------------- */}
      {selectedApp && (
        <Modal
          isOpen={!!selectedApp}
          onClose={() => setSelectedApp(null)}
          title={`Application: ${selectedApp.startup}`}
          description={`Application ID: ${selectedApp.id} • ${selectedApp.department}`}
          maxWidth="max-w-xl"
          footer={
            <div className="flex items-center justify-between w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedApp(null);
                  navigate('/government/applications');
                }}
                className="text-xs"
              >
                Go to Applications Desk
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setSelectedApp(null)}
                className="text-xs"
              >
                Close
              </Button>
            </div>
          }
        >
          <div className="space-y-4 text-xs text-zinc-600 dark:text-zinc-300">
            <div className="grid grid-cols-2 gap-3 bg-zinc-50 dark:bg-zinc-800/60 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">Founder</span>
                <span className="font-bold text-zinc-900 dark:text-white">{selectedApp.founder || 'Founding Lead'}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">TRL Readiness</span>
                <span className="font-bold text-orange-600 dark:text-orange-400">{selectedApp.trl}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">Application Status</span>
                <span className="font-semibold text-zinc-900 dark:text-white">{selectedApp.status}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">Received Date</span>
                <span className="font-semibold text-zinc-900 dark:text-white">{selectedApp.date}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] text-zinc-400 uppercase font-bold block mb-1">Proposed Solution</span>
              <p className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 font-medium">
                {selectedApp.solution}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
