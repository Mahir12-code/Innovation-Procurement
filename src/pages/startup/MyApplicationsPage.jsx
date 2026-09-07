import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  Search,
  Clock,
  Building2,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Plus,
  Rocket,
  Edit3,
  Filter,
  Eye,
  MessageSquare
} from 'lucide-react';
import { useStartupPortal } from '../../context/StartupPortalContext';

export function MyApplicationsPage() {
  const { applications, clarifications } = useStartupPortal();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.opportunityTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.department.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;
      if (statusFilter === 'All') return true;
      if (statusFilter === 'Drafts') return app.status === 'Draft';
      if (statusFilter === 'Submitted') return app.status === 'Submitted';
      if (statusFilter === 'Under Evaluation') return app.status === 'Under Evaluation';
      if (statusFilter === 'Clarification Requested') return app.status === 'Clarification Requested';
      if (statusFilter === 'Pilot') return app.status === 'Selected for Pilot';
      return true;
    });
  }, [applications, searchQuery, statusFilter]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Draft':
        return (
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 flex items-center gap-1.5">
            <Edit3 className="w-3.5 h-3.5 text-zinc-500" /> Draft
          </span>
        );
      case 'Submitted':
        return (
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Submitted
          </span>
        );
      case 'Under Evaluation':
        return (
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-indigo-500 animate-spin" /> Technical Review
          </span>
        );
      case 'Clarification Requested':
        return (
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 flex items-center gap-1.5 animate-pulse">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Action Required
          </span>
        );
      case 'Selected for Pilot':
        return (
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1.5">
            <Rocket className="w-3.5 h-3.5 text-emerald-600" /> Pilot Sanctioned
          </span>
        );
      default:
        return (
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-950 dark:text-white tracking-tight">
            My Applications
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Track submitted technical dossiers, jury evaluation milestones, and pilot zone selections
          </p>
        </div>

        <Link
          to="/startup/opportunities"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" /> Discover New Opportunities
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by ID, challenge title, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs focus:ring-2 focus:ring-orange-500 outline-none text-zinc-900 dark:text-white"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['All', 'Drafts', 'Submitted', 'Under Evaluation', 'Clarification Requested', 'Pilot'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  statusFilter === tab
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-12 text-center">
            <FileText className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-zinc-950 dark:text-white">No Applications Found</h3>
            <p className="text-xs text-zinc-500 mt-1 max-w-md mx-auto">
              No proposal dossiers match your current filters. You can discover and apply for open public department challenges.
            </p>
            <Link
              to="/startup/opportunities"
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white text-xs font-bold rounded-xl hover:bg-orange-700 transition-colors"
            >
              Browse Open Challenges
            </Link>
          </div>
        ) : (
          filteredApplications.map((app) => {
            const hasClarificationPending = clarifications.some(
              (c) => c.applicationId === app.id && c.status === 'Pending Response'
            );

            return (
              <div
                key={app.id}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 px-2 py-0.5 rounded border border-orange-200 dark:border-orange-800/60">
                        {app.id}
                      </span>
                      {getStatusBadge(app.status)}
                      <span className="text-xs text-zinc-500">
                        RFP: <strong>{app.opportunityId}</strong>
                      </span>
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-white pt-1">
                      {app.opportunityTitle}
                    </h2>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                      <span className="flex items-center gap-1 font-medium">
                        <Building2 className="w-3.5 h-3.5 text-zinc-400" />
                        {app.department}
                      </span>
                      <span>•</span>
                      <span>Solution: <strong className="text-zinc-700 dark:text-zinc-300">{app.solutionName}</strong></span>
                      <span>•</span>
                      <span>TRL: <strong className="text-orange-600">{app.trlLevel}</strong></span>
                    </div>
                  </div>

                  {/* Submission date info */}
                  <div className="text-right shrink-0">
                    <p className="text-[11px] text-zinc-500 font-medium">
                      {app.status === 'Draft' ? 'Draft Created' : 'Submitted Date'}
                    </p>
                    <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                      {app.submittedAt ? new Date(app.submittedAt).toLocaleDateString() : 'In Draft'}
                    </p>
                  </div>
                </div>

                {/* Urgent clarification callout if pending */}
                {hasClarificationPending && (
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-xl flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-amber-900 dark:text-amber-200">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>
                        <strong>Action Required:</strong> The department nodal cell has requested a statutory clarification for this proposal.
                      </span>
                    </div>
                    <Link
                      to={`/startup/applications/${app.id}/clarifications`}
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shrink-0 transition-colors"
                    >
                      Respond Now
                    </Link>
                  </div>
                )}

                {/* Action Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="text-[11px] text-zinc-500">
                    {app.uploadedFiles?.length || 2} documents attached • Stage: {app.currentStage || 'Technical Review'}
                  </div>

                  <div className="flex items-center gap-2">
                    {app.status === 'Draft' ? (
                      <Link
                        to={`/startup/applications/${app.id}/edit`}
                        className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Continue Draft
                      </Link>
                    ) : app.status === 'Selected for Pilot' ? (
                      <>
                        <Link
                          to="/startup/pilots/PLT-MH-001"
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                        >
                          <Rocket className="w-3.5 h-3.5" /> Open Pilot Zone
                        </Link>
                        <Link
                          to={`/startup/applications/${app.id}`}
                          className="px-3 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-700 dark:text-zinc-300 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" /> Dossier
                        </Link>
                      </>
                    ) : (
                      <Link
                        to={`/startup/applications/${app.id}`}
                        className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" /> View Timeline & Dossier
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
