import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Building2, 
  Calendar, 
  IndianRupee, 
  Users, 
  CheckCircle2, 
  Clock, 
  Eye, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { useGovernmentPortal } from '../../context/GovernmentPortalContext';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { Badge } from '../../components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';

export function ActiveProblemStatementsPage() {
  const navigate = useNavigate();
  const { problemStatements, addProblemStatement, closeProblemStatement, showToast } = useGovernmentPortal();

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);

  // New Problem Form State
  const [newProblem, setNewProblem] = useState({
    title: '',
    department: 'Urban Development Department',
    sector: 'Smart Cities & IoT',
    budget: '5000000',
    deadline: '2026-10-30',
    description: '',
    expectedSolution: '',
    eligibility: ''
  });

  const departmentOptions = [
    'All',
    'Urban Development Department',
    'Transport Department',
    'Public Health Department',
    'Water Resources Department',
    'School Education Department',
    'Agriculture Department'
  ];

  const categoryOptions = [
    'All',
    'Smart Cities & IoT',
    'Smart Mobility',
    'MedTech & Healthcare',
    'CleanTech & IoT',
    'EdTech & GovTech',
    'AgriTech'
  ];

  const filteredProblems = useMemo(() => {
    return problemStatements.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDept = selectedDept === 'All' || item.department === selectedDept;
      const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;

      return matchesSearch && matchesDept && matchesStatus && matchesCat;
    });
  }, [problemStatements, searchQuery, selectedDept, selectedStatus, selectedCategory]);

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newProblem.title.trim()) {
      showToast('Please enter a problem statement title', 'error');
      return;
    }
    addProblemStatement(newProblem);
    setIsCreateModalOpen(false);
    setNewProblem({
      title: '',
      department: 'Urban Development Department',
      sector: 'Smart Cities & IoT',
      budget: '5000000',
      deadline: '2026-10-30',
      description: '',
      expectedSolution: '',
      eligibility: ''
    });
  };

  const handleDownloadRFP = (problem) => {
    showToast(`Downloading RFP documentation dossier for ${problem.id}...`, 'info');
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
              Government Innovation Desk
            </span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
              Active Problem Statements
            </h1>
            <Badge variant="primary" size="md">
              {problemStatements.filter(p => p.status === 'Open').length} Active
            </Badge>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Publish, manage, and review open department challenges for startup procurement across Maharashtra.
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
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Post Challenge
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
          <Input
            placeholder="Search by ID, keyword, description..."
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
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          options={categoryOptions.map(c => ({ value: c, label: c === 'All' ? 'All Categories' : c }))}
          className="text-xs"
        />

        <Select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          options={[
            { value: 'All', label: 'All Statuses' },
            { value: 'Open', label: 'Open Challenges' },
            { value: 'Closed', label: 'Closed' }
          ]}
          className="text-xs"
        />
      </div>

      {/* Problem Statements Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xs">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-28">ID</TableHead>
              <TableHead>Problem Statement & Sector</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="text-center">Proposals</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProblems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12 text-zinc-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <AlertCircle className="w-8 h-8 text-zinc-400" />
                    <p className="font-semibold">No problem statements found</p>
                    <p className="text-xs text-zinc-400">Try adjusting your search query or filters.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredProblems.map((problem) => (
                <TableRow key={problem.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40">
                  <TableCell className="font-mono text-xs font-bold text-zinc-600 dark:text-zinc-400">
                    {problem.id}
                  </TableCell>
                  <TableCell className="max-w-md">
                    <div className="font-bold text-zinc-900 dark:text-white text-sm">
                      {problem.title}
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                      {problem.description}
                    </div>
                    <span className="inline-block mt-1 text-[11px] font-semibold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 px-2 py-0.5 rounded">
                      {problem.category}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                      {problem.department}
                    </div>
                    <div className="text-[11px] text-zinc-400">Govt. of Maharashtra</div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                      {problem.applicationsCount}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                      {problem.budget}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                      {problem.deadline}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={problem.status === 'Open' ? 'success' : 'neutral'} size="sm">
                      {problem.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => setSelectedProblem(problem)}
                        className="text-xs text-zinc-700 dark:text-zinc-300"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        Details
                      </Button>
                      {problem.status === 'Open' && (
                        <Button
                          variant="outline"
                          size="xs"
                          onClick={() => closeProblemStatement(problem.id)}
                          className="text-xs text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900/50 dark:hover:bg-red-950/50"
                        >
                          Close
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* View Details Modal */}
      {selectedProblem && (
        <Modal
          isOpen={!!selectedProblem}
          onClose={() => setSelectedProblem(null)}
          title={selectedProblem.title}
          description={`Problem ID: ${selectedProblem.id} • ${selectedProblem.department}`}
          maxWidth="max-w-2xl"
          footer={
            <div className="flex items-center justify-between w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownloadRFP(selectedProblem)}
                className="flex items-center gap-1.5 text-xs"
              >
                <FileText className="w-4 h-4" />
                Download Official RFP
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setSelectedProblem(null)}
              >
                Close
              </Button>
            </div>
          }
        >
          <div className="space-y-4 text-xs text-zinc-600 dark:text-zinc-300">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-zinc-50 dark:bg-zinc-800/60 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Category</span>
                <span className="font-bold text-zinc-900 dark:text-white">{selectedProblem.category}</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Sanction Budget</span>
                <span className="font-bold text-zinc-900 dark:text-white">{selectedProblem.budget}</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Deadline</span>
                <span className="font-bold text-zinc-900 dark:text-white">{selectedProblem.deadline}</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Proposals</span>
                <span className="font-bold text-zinc-900 dark:text-white">{selectedProblem.applicationsCount} Submissions</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-zinc-900 dark:text-white text-xs uppercase tracking-wide mb-1">
                Challenge Description
              </h4>
              <p className="leading-relaxed bg-white dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
                {selectedProblem.description}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-zinc-900 dark:text-white text-xs uppercase tracking-wide mb-1">
                Expected Solution & Deliverables
              </h4>
              <p className="leading-relaxed bg-white dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
                {selectedProblem.expectedSolution}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-zinc-900 dark:text-white text-xs uppercase tracking-wide mb-1">
                Startup Eligibility Requirements
              </h4>
              <p className="leading-relaxed bg-white dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
                {selectedProblem.eligibility}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-zinc-900 dark:text-white text-xs uppercase tracking-wide mb-1">
                Evaluation & Weightage Criteria
              </h4>
              <p className="leading-relaxed bg-white dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
                {selectedProblem.evaluationCriteria}
              </p>
            </div>
          </div>
        </Modal>
      )}

      {/* Post Challenge Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Post New Department Challenge"
        description="Publish an official challenge RFP on Sarkar Setu for DPIIT startup submissions."
        maxWidth="max-w-xl"
        footer={
          <div className="flex items-center justify-end gap-2 w-full">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleCreateSubmit}
            >
              Publish Challenge
            </Button>
          </div>
        }
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Challenge Title *
            </label>
            <Input
              placeholder="e.g. Real-Time Water Quality IoT Monitoring for Rural Reservoirs"
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
                options={departmentOptions.filter(d => d !== 'All').map(d => ({ value: d, label: d }))}
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
                options={categoryOptions.filter(c => c !== 'All').map(c => ({ value: c, label: c }))}
                className="text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Sanctioned Budget (INR)
              </label>
              <Input
                type="number"
                placeholder="4500000"
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
              Problem Description & Statement
            </label>
            <Textarea
              rows={3}
              placeholder="Detail the operational problem, existing challenges, and key constraints..."
              value={newProblem.description}
              onChange={(e) => setNewProblem({ ...newProblem, description: e.target.value })}
              className="text-xs"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
