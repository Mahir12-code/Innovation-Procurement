import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  Download, 
  Eye, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  Building2, 
  Award,
  ShieldCheck
} from 'lucide-react';
import { useGovernmentPortal } from '../../context/GovernmentPortalContext';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';

export function ApplicationsReceivedPage() {
  const navigate = useNavigate();
  const { applications, showToast } = useGovernmentPortal();

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedApp, setSelectedApp] = useState(null);

  const departmentOptions = [
    'All',
    'Urban Development Department',
    'Transport Department',
    'Public Health Department',
    'Water Resources Department',
    'School Education Department',
    'Agriculture Department'
  ];

  const statusOptions = [
    'All',
    'Under Review',
    'Under Evaluation',
    'Shortlisted',
    'Verified',
    'Documents Missing',
    'Rejected'
  ];

  const filteredApps = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.startupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.founder.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.problemTitle.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDept = selectedDept === 'All' || app.department === selectedDept;
      const matchesStatus =
        selectedStatus === 'All' ||
        app.status === selectedStatus ||
        app.verificationStatus === selectedStatus;

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [applications, searchQuery, selectedDept, selectedStatus]);

  const handleDownloadDossier = (app) => {
    showToast(`Downloading startup dossier for ${app.startupName} (${app.id})...`, 'info');
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'Shortlisted':
      case 'Verified':
        return 'success';
      case 'Under Evaluation':
      case 'Under Review':
        return 'primary';
      case 'Documents Missing':
        return 'warning';
      case 'Rejected':
        return 'danger';
      default:
        return 'neutral';
    }
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
              Procurement & Applications Desk
            </span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
              Applications Received
            </h1>
            <Badge variant="neutral" size="md">
              {applications.length} Proposals Submitted
            </Badge>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Comprehensive intake repository of DPIIT-certified startup submissions for Maharashtra government challenges.
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
            onClick={() => navigate('/government/applications/verification')}
            className="flex items-center gap-1.5 shadow-sm"
          >
            <ShieldCheck className="w-4 h-4" />
            Verification Queue
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
          <Input
            placeholder="Search startup name, ID, founder, problem..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>

        <Select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          options={departmentOptions.map(d => ({ value: d, label: d === 'All' ? 'All Departments' : d }))}
          className="text-xs"
        />

        <Select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          options={statusOptions.map(s => ({ value: s, label: s === 'All' ? 'All Statuses' : s }))}
          className="text-xs"
        />
      </div>

      {/* Applications Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xs">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-28">App ID</TableHead>
              <TableHead>Startup & Founder</TableHead>
              <TableHead>Problem Statement & Dept</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Compliance Check</TableHead>
              <TableHead className="text-center">Jury Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApps.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12 text-zinc-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <AlertCircle className="w-8 h-8 text-zinc-400" />
                    <p className="font-semibold">No applications match the criteria</p>
                    <p className="text-xs text-zinc-400">Try adjusting your filters or search keywords.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredApps.map((app) => (
                <TableRow key={app.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40">
                  <TableCell className="font-mono text-xs font-bold text-zinc-600 dark:text-zinc-400">
                    {app.id}
                  </TableCell>
                  <TableCell>
                    <div className="font-bold text-zinc-900 dark:text-white text-sm">
                      {app.startupName}
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      Founder: {app.founder} • {app.dpiitNumber}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 line-clamp-1">
                      {app.problemTitle}
                    </div>
                    <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      {app.department}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">
                      {app.submittedDate}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={app.verificationStatus === 'Verified' ? 'success' : app.verificationStatus === 'Documents Missing' ? 'warning' : 'neutral'} size="sm">
                      {app.verificationStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {app.score ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-black bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300">
                        {app.score}/100
                      </span>
                    ) : (
                      <span className="text-xs text-zinc-400 font-medium">Pending</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(app.status)} size="sm">
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => setSelectedApp(app)}
                        className="text-xs text-zinc-700 dark:text-zinc-300"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => handleDownloadDossier(app)}
                        className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Application Details Modal */}
      {selectedApp && (
        <Modal
          isOpen={!!selectedApp}
          onClose={() => setSelectedApp(null)}
          title={`Application: ${selectedApp.startupName}`}
          description={`Application ID: ${selectedApp.id} • Registered under ${selectedApp.dpiitNumber}`}
          maxWidth="max-w-2xl"
          footer={
            <div className="flex items-center justify-between w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownloadDossier(selectedApp)}
                className="flex items-center gap-1.5 text-xs"
              >
                <Download className="w-4 h-4" />
                Download Application Dossier
              </Button>
              <div className="flex items-center gap-2">
                {selectedApp.verificationStatus !== 'Verified' && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setSelectedApp(null);
                      navigate('/government/applications/verification');
                    }}
                  >
                    Go to Verification
                  </Button>
                )}
                {selectedApp.verificationStatus === 'Verified' && !selectedApp.score && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setSelectedApp(null);
                      navigate('/government/evaluator');
                    }}
                  >
                    Go to Evaluator Desk
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedApp(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          }
        >
          <div className="space-y-4 text-xs text-zinc-600 dark:text-zinc-300">
            {/* Startup Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-zinc-50 dark:bg-zinc-800/60 p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Founder / Lead</span>
                <span className="font-bold text-zinc-900 dark:text-white">{selectedApp.founder}</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Location</span>
                <span className="font-bold text-zinc-900 dark:text-white">{selectedApp.location || 'Maharashtra, India'}</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Readiness Level</span>
                <span className="font-bold text-orange-600 dark:text-orange-400">{selectedApp.trlLevel || 'TRL 6 (Field Prototype)'}</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Patents / IP</span>
                <span className="font-bold text-zinc-900 dark:text-white">{selectedApp.patents || '1 Granted, 1 Published'}</span>
              </div>
            </div>

            {/* Targeted Challenge */}
            <div className="bg-white dark:bg-zinc-900 p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <span className="text-zinc-400 block text-[10px] uppercase font-bold mb-1">
                Targeted Department Challenge
              </span>
              <div className="font-bold text-zinc-900 dark:text-white text-sm">
                {selectedApp.problemTitle}
              </div>
              <div className="text-zinc-500 dark:text-zinc-400 text-xs mt-0.5">
                Department: {selectedApp.department}
              </div>
            </div>

            {/* Technical Solution Proposal */}
            <div>
              <h4 className="font-bold text-zinc-900 dark:text-white text-xs uppercase tracking-wide mb-1">
                Technical Architecture & Implementation Approach
              </h4>
              <p className="leading-relaxed bg-white dark:bg-zinc-900 p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
                {selectedApp.proposalSummary ||
                  'The startup proposes an indigenous, edge-AI enabled telemetry gateway with cellular backup and cloud API synchronization. Field hardware has undergone endurance testing in pilot municipal wards with proven IP67 ingress protection.'}
              </p>
            </div>

            {/* Attached Compliance Documents */}
            <div>
              <h4 className="font-bold text-zinc-900 dark:text-white text-xs uppercase tracking-wide mb-2">
                Attached Compliance Documents
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {['Certificate of Incorporation', 'DPIIT Recognition Certificate', 'Audited Balance Sheet (FY 25-26)', 'Product Whitepaper & Field Test SLA'].map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-orange-600" />
                      <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">{doc}</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded">
                      Verified
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
