import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  Award, 
  Rocket, 
  Download, 
  Mail, 
  Phone, 
  Building2, 
  MapPin, 
  Calendar, 
  IndianRupee, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import { useGovernmentPortal } from '../../context/GovernmentPortalContext';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';

export function ShortlistedStartupsPage() {
  const navigate = useNavigate();
  const { shortlistedStartups, initiatePilot, showToast } = useGovernmentPortal();

  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Initiate Pilot Modal State
  const [isPilotModalOpen, setIsPilotModalOpen] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [pilotConfig, setPilotConfig] = useState({
    location: 'Pune Municipal Smart City Pilot Zone (Zone 4)',
    duration: '3 Months (Phase 1 Pilot Zone)',
    startDate: '2026-10-01',
    endDate: '2027-01-01',
    budget: '₹40 Lakhs',
    officer: 'Shri Rajesh Sharma (Executive Engineer)'
  });

  // Contact Modal State
  const [contactModalStartup, setContactModalStartup] = useState(null);

  const departmentOptions = [
    'All',
    'Urban Development Department',
    'Transport Department',
    'Public Health Department',
    'Water Resources Department',
    'School Education Department',
    'Agriculture Department'
  ];

  const filteredStartups = useMemo(() => {
    return shortlistedStartups.filter((item) => {
      const matchesSearch =
        item.startupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.problemTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.contactPerson && item.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDept = deptFilter === 'All' || item.department === deptFilter;
      const matchesStatus =
        statusFilter === 'All' ||
        item.pilotStatus === statusFilter;

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [shortlistedStartups, searchQuery, deptFilter, statusFilter]);

  const handleOpenPilotModal = (startup) => {
    setSelectedStartup(startup);
    setPilotConfig({
      location: `${startup.department.includes('Urban') ? 'Pune Municipal Corporation' : startup.department.includes('Transport') ? 'Nagpur Traffic Control Hub' : 'Mumbai Central Health District'} Innovation Pilot Zone`,
      duration: '3 Months (Phase 1 Pilot Zone)',
      startDate: '2026-10-01',
      endDate: '2027-01-01',
      budget: startup.sanctionedGrant || '₹40 Lakhs',
      officer: 'Shri Rajesh Sharma (Executive Engineer)'
    });
    setIsPilotModalOpen(true);
  };

  const handleConfirmInitiatePilot = (e) => {
    e.preventDefault();
    if (!selectedStartup) return;

    initiatePilot(selectedStartup.startupName, {
      department: selectedStartup.department,
      problemTitle: selectedStartup.problemTitle,
      location: pilotConfig.location,
      startDate: pilotConfig.startDate,
      endDate: pilotConfig.endDate,
      budget: pilotConfig.budget,
      contact: selectedStartup.contactPerson
    });

    setIsPilotModalOpen(false);
    setSelectedStartup(null);
  };

  const handleDownloadDossier = (startup) => {
    showToast(`Downloading Jury Evaluation & Sanction Summary for ${startup.startupName}...`, 'info');
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
              Procurement Pilot Zone Selection
            </span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
              Shortlisted Startups
            </h1>
            <Badge variant="success" size="md">
              {shortlistedStartups.length} Cleared for Pilot Zone
            </Badge>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            High-scoring innovators that cleared statutory and jury gates, eligible for government pilot zone agreements and grant tranches.
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
            onClick={() => navigate('/government/pilots')}
            className="flex items-center gap-1.5 shadow-sm"
          >
            <Rocket className="w-4 h-4" />
            Active Testbed Pilots
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
          <Input
            placeholder="Search startup name, problem, contact..."
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
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={[
            { value: 'All', label: 'All Pilot Stages' },
            { value: 'Ready for Pilot Zone', label: 'Ready for Pilot Zone' },
            { value: 'Pilot Active', label: 'Pilot Active in Field' },
            { value: 'Pilot Pending', label: 'Agreement / Pilot Zone Pending' }
          ]}
          className="text-xs"
        />
      </div>

      {/* Shortlisted Startups Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xs">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-28">ID</TableHead>
              <TableHead>Startup & Nodal Contact</TableHead>
              <TableHead>Challenge & Department</TableHead>
              <TableHead className="text-center">Jury Score</TableHead>
              <TableHead>Sanctioned Grant</TableHead>
              <TableHead>Pilot Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStartups.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-zinc-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Award className="w-8 h-8 text-zinc-400" />
                    <p className="font-semibold">No shortlisted startups match the filters</p>
                    <p className="text-xs text-zinc-400">Startups scoring ≥80/100 in Technical Evaluation will appear here automatically.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredStartups.map((startup) => (
                <TableRow key={startup.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40">
                  <TableCell className="font-mono text-xs font-bold text-zinc-600 dark:text-zinc-400">
                    {startup.id}
                  </TableCell>
                  <TableCell>
                    <div className="font-bold text-zinc-900 dark:text-white text-sm">
                      {startup.startupName}
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      {startup.contactPerson} • {startup.email}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 line-clamp-1">
                      {startup.problemTitle}
                    </div>
                    <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      {startup.department}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-900 dark:bg-emerald-950/70 dark:text-emerald-300">
                      {startup.score}/100
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                      {startup.sanctionedGrant || '₹40 Lakhs'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={startup.pilotStatus === 'Pilot Active' ? 'success' : 'primary'}
                      size="sm"
                    >
                      {startup.pilotStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => setContactModalStartup(startup)}
                        className="text-xs text-zinc-700 dark:text-zinc-300"
                      >
                        <Mail className="w-3.5 h-3.5 mr-1" />
                        Contact
                      </Button>

                      {startup.pilotStatus !== 'Pilot Active' ? (
                        <Button
                          variant="primary"
                          size="xs"
                          onClick={() => handleOpenPilotModal(startup)}
                          className="text-xs bg-orange-600 hover:bg-orange-700 text-white font-bold"
                        >
                          <Rocket className="w-3.5 h-3.5 mr-1" />
                          Initiate Pilot
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="xs"
                          onClick={() => navigate('/government/pilots')}
                          className="text-xs text-emerald-600 border-emerald-300 dark:border-emerald-800"
                        >
                          View Testbed
                        </Button>
                      )}

                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => handleDownloadDossier(startup)}
                        className="text-xs text-zinc-600 dark:text-zinc-400"
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

      {/* Initiate Pilot Modal */}
      {isPilotModalOpen && selectedStartup && (
        <Modal
          isOpen={isPilotModalOpen}
          onClose={() => setIsPilotModalOpen(false)}
          title={`Deploy Pilot Zone: ${selectedStartup.startupName}`}
          description={`Issuing Pilot Zone Order for Challenge: ${selectedStartup.problemTitle}`}
          maxWidth="max-w-xl"
          footer={
            <div className="flex items-center justify-end gap-2 w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPilotModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleConfirmInitiatePilot}
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold flex items-center gap-1.5"
              >
                <Rocket className="w-4 h-4" />
                Sanction & Deploy Pilot
              </Button>
            </div>
          }
        >
          <form onSubmit={handleConfirmInitiatePilot} className="space-y-4 text-xs">
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">Executing Department</span>
                <span className="font-bold text-zinc-900 dark:text-white">{selectedStartup.department}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">Sanction Budget</span>
                <span className="font-bold text-orange-600 dark:text-orange-400">{pilotConfig.budget}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Designated Testbed Facility / Location *
              </label>
              <Input
                value={pilotConfig.location}
                onChange={(e) => setPilotConfig({ ...pilotConfig, location: e.target.value })}
                required
                className="text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Start Date
                </label>
                <Input
                  type="date"
                  value={pilotConfig.startDate}
                  onChange={(e) => setPilotConfig({ ...pilotConfig, startDate: e.target.value })}
                  className="text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Target Completion Date
                </label>
                <Input
                  type="date"
                  value={pilotConfig.endDate}
                  onChange={(e) => setPilotConfig({ ...pilotConfig, endDate: e.target.value })}
                  className="text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Assigned Department Nodal Officer
              </label>
              <Input
                value={pilotConfig.officer}
                onChange={(e) => setPilotConfig({ ...pilotConfig, officer: e.target.value })}
                className="text-xs"
              />
            </div>

            <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-900/50 text-orange-900 dark:text-orange-300">
              <span className="font-bold block mb-0.5">Deployment Notice:</span>
              Submitting this sanction triggers Tranche 1 disbursal authorization (25% advance) and creates a live monitoring record under Active Pilots.
            </div>
          </form>
        </Modal>
      )}

      {/* Contact Startup Modal */}
      {contactModalStartup && (
        <Modal
          isOpen={!!contactModalStartup}
          onClose={() => setContactModalStartup(null)}
          title={`Contact Nodal Team: ${contactModalStartup.startupName}`}
          description={`Direct official communication channel`}
          maxWidth="max-w-md"
          footer={
            <Button
              variant="outline"
              size="sm"
              onClick={() => setContactModalStartup(null)}
            >
              Close
            </Button>
          }
        >
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg space-y-2 border border-zinc-200 dark:border-zinc-800">
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">Founder / Authorized Signatory</span>
                <span className="font-bold text-zinc-900 dark:text-white">{contactModalStartup.contactPerson}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">Official Email</span>
                <span className="font-mono text-zinc-800 dark:text-zinc-200">{contactModalStartup.email}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">Telephone</span>
                <span className="font-mono text-zinc-800 dark:text-zinc-200">+91 98201 44589</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                showToast(`Official briefing email dispatched to ${contactModalStartup.email}`);
                setContactModalStartup(null);
              }}
              className="w-full text-xs"
            >
              Send Official Briefing Email
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
