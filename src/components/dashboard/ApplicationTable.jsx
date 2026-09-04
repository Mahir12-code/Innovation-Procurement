import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { cn } from '../../utils/cn';

const DEFAULT_ACTION_APPLICATIONS = [
  {
    id: 'app-1',
    startupName: 'AgriVision AI',
    sector: 'Agritech & AI',
    status: 'Expert Review',
    actionLabel: 'Review',
    priority: 'high',
    assignedTo: 'Prof. K. Venkatesh (IITB)',
    submittedDate: '02 Sep 2026'
  },
  {
    id: 'app-2',
    startupName: 'MediTech Labs',
    sector: 'Healthcare & IoT',
    status: 'Documents Pending',
    actionLabel: 'Verify',
    priority: 'medium',
    assignedTo: 'Documentation Cell',
    submittedDate: '01 Sep 2026'
  },
  {
    id: 'app-3',
    startupName: 'UrbanGrid Tech',
    sector: 'Smart Cities',
    status: 'Pilot Ready',
    actionLabel: 'View',
    priority: 'high',
    assignedTo: 'Pilot Advisory Board',
    submittedDate: '28 Aug 2026'
  },
  {
    id: 'app-4',
    startupName: 'EduNova',
    sector: 'EdTech & Gov',
    status: 'Eligibility Check',
    actionLabel: 'Evaluate',
    priority: 'medium',
    assignedTo: 'Compliance Nodal Desk',
    submittedDate: '30 Aug 2026'
  }
];

const STATUS_CONFIG = {
  'Expert Review': {
    badge: 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/60',
    dot: 'bg-amber-500'
  },
  'Documents Pending': {
    badge: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700',
    dot: 'bg-zinc-400'
  },
  'Pilot Ready': {
    badge: 'bg-orange-50 dark:bg-orange-950/40 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-800/60',
    dot: 'bg-orange-500'
  },
  'Eligibility Check': {
    badge: 'bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300 border-sky-200 dark:border-sky-800/60',
    dot: 'bg-sky-500'
  }
};

export function ApplicationTable({
  applications = DEFAULT_ACTION_APPLICATIONS,
  title = 'Applications Requiring Action'
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [actionDoneMessage, setActionDoneMessage] = useState(null);

  const filteredApps = useMemo(() => {
    return applications
      .filter((app) => {
        const matchesSearch =
          app.startupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.sector.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        return sortAsc
          ? a.startupName.localeCompare(b.startupName)
          : b.startupName.localeCompare(a.startupName);
      });
  }, [applications, searchTerm, statusFilter, sortAsc]);

  const handleActionClick = (app) => {
    setSelectedApp(app);
  };

  const handleConfirmAction = () => {
    if (!selectedApp) return;
    setActionDoneMessage(`Action '${selectedApp.actionLabel}' executed for ${selectedApp.startupName}.`);
    setSelectedApp(null);
    setTimeout(() => setActionDoneMessage(null), 3500);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/90 dark:border-zinc-800 p-6 flex flex-col justify-between">
      <div>
        {/* Header & Count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <h3 className="text-base font-bold text-zinc-950 dark:text-white">
              {title}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Urgent pending dossiers awaiting nodal officer clearance
            </p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 rounded-md border border-orange-200/60 dark:border-orange-800/60 self-start sm:self-auto">
            {filteredApps.length} Pending
          </span>
        </div>

        {/* Action Done Feedback Toast */}
        {actionDoneMessage && (
          <div className="my-3 p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center justify-between animate-in fade-in">
            <span>{actionDoneMessage}</span>
            <button
              onClick={() => setActionDoneMessage(null)}
              className="text-emerald-600 hover:text-emerald-800 font-bold ml-2"
            >
              ✕
            </button>
          </div>
        )}

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 py-3">
          <div className="relative w-full sm:flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search startup name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto px-2.5 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-800 dark:text-zinc-200 focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="Expert Review">Expert Review</option>
              <option value="Documents Pending">Documents Pending</option>
              <option value="Pilot Ready">Pilot Ready</option>
              <option value="Eligibility Check">Eligibility Check</option>
            </select>

            <button
              type="button"
              onClick={() => setSortAsc(!sortAsc)}
              title="Toggle Sort Order"
              className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors shrink-0"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Compact Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                <th className="py-2.5 pr-3">Startup Name</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 pl-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-zinc-400 text-xs">
                    No applications match the search or filter criteria.
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => {
                  const statusStyle =
                    STATUS_CONFIG[app.status] || STATUS_CONFIG['Documents Pending'];
                  return (
                    <tr
                      key={app.id}
                      className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
                    >
                      <td className="py-3 pr-3">
                        <div className="font-bold text-zinc-950 dark:text-white">
                          {app.startupName}
                        </div>
                        <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                          {app.sector}
                        </div>
                      </td>

                      <td className="py-3 px-3 whitespace-nowrap">
                        <span
                          className={cn(
                            'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border',
                            statusStyle.badge
                          )}
                        >
                          <span
                            className={cn('w-1.5 h-1.5 rounded-full', statusStyle.dot)}
                          />
                          {app.status}
                        </span>
                      </td>

                      <td className="py-3 pl-3 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleActionClick(app)}
                          className="px-3 py-1 text-xs font-bold rounded-lg bg-orange-600 hover:bg-orange-700 text-white transition-colors cursor-pointer shadow-xs"
                        >
                          {app.actionLabel}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
        <span>Sarkar Setu Priority Queue</span>
        <span className="font-semibold text-orange-600 dark:text-orange-400">
          Auto-synchronized with DPIIT
        </span>
      </div>

      {/* Action Verification Modal */}
      {selectedApp && (
        <Modal
          isOpen={Boolean(selectedApp)}
          onClose={() => setSelectedApp(null)}
          title={`${selectedApp.actionLabel}: ${selectedApp.startupName}`}
          description={`Process application dossier for ${selectedApp.sector}.`}
          footer={
            <>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedApp(null)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleConfirmAction}
              >
                Confirm {selectedApp.actionLabel}
              </Button>
            </>
          }
        >
          <div className="space-y-3 text-xs text-left">
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg space-y-1.5">
              <div className="flex justify-between">
                <span className="text-zinc-500">Startup:</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">
                  {selectedApp.startupName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Current Status:</span>
                <span className="font-bold text-orange-600">
                  {selectedApp.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Assigned Desk:</span>
                <span className="text-zinc-800 dark:text-zinc-200">
                  {selectedApp.assignedTo}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Submission Date:</span>
                <span className="text-zinc-800 dark:text-zinc-200">
                  {selectedApp.submittedDate}
                </span>
              </div>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Confirming this action will advance the application to the next evaluation gate and notify the applicant startup and assigned jury members.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}
