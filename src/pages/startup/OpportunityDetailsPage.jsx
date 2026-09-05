import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Building2,
  Clock,
  Coins,
  ShieldCheck,
  CheckCircle2,
  FileText,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Award,
  Layers,
  FileCheck
} from 'lucide-react';
import { useStartupPortal } from '../../context/StartupPortalContext';

export function OpportunityDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { opportunities, applications, createDraftApplication, publicCriteria } = useStartupPortal();

  const opp = opportunities.find((o) => o.id === id) || opportunities[0];

  if (!opp) {
    return (
      <div className="text-center py-16">
        <AlertCircle className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Opportunity Not Found</h2>
        <p className="text-zinc-500 text-sm mt-1">The requested RFP challenge could not be located.</p>
        <Link
          to="/startup/opportunities"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Discover Opportunities
        </Link>
      </div>
    );
  }

  // Check if startup has an existing application
  const existingApp = applications.find((a) => a.opportunityId === opp.id);

  const handleApplyClick = () => {
    if (existingApp) {
      if (existingApp.status === 'Draft') {
        navigate(`/startup/applications/${existingApp.id}/edit`);
      } else {
        navigate(`/startup/applications/${existingApp.id}`);
      }
    } else {
      const newDraftId = createDraftApplication(opp.id);
      navigate(`/startup/applications/${newDraftId}/edit`);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Back Link */}
      <div>
        <Link
          to="/startup/opportunities"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Discover Opportunities
        </Link>
      </div>

      {/* Header Banner */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-orange-500/5 to-transparent pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 px-2.5 py-1 rounded-lg border border-orange-200 dark:border-orange-800/60">
                {opp.id}
              </span>
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {opp.status} for Proposals
              </span>
              <span className="text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-lg">
                {opp.sector}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight leading-tight">
              {opp.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-600 dark:text-zinc-400">
              <span className="flex items-center gap-1.5 font-medium">
                <Building2 className="w-4 h-4 text-zinc-400" />
                {opp.department}
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-orange-500" />
                Deadline: {opp.deadline} ({opp.daysRemaining} days left)
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Coins className="w-4 h-4 text-emerald-500" />
                Grant Ceiling: <strong className="text-zinc-900 dark:text-white font-bold">{opp.budget}</strong>
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2">
            <button
              onClick={handleApplyClick}
              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              {existingApp
                ? existingApp.status === 'Draft'
                  ? 'Continue Draft Application'
                  : 'View Submitted Application'
                : 'Apply for this Opportunity'}
            </button>
            {existingApp && (
              <span className="text-center text-[11px] font-medium text-zinc-500">
                Current Status: <strong className="text-orange-600">{existingApp.status}</strong>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Problem Statement, Expected Outcome, Public Criteria */}
        <div className="lg:col-span-2 space-y-6">
          {/* Problem Statement Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-orange-50 dark:bg-orange-950/40 rounded-xl text-orange-600">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-950 dark:text-white">The Public Challenge Statement</h2>
                <p className="text-xs text-zinc-500">Operational challenge identified by the department</p>
              </div>
            </div>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-zinc-950/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
              {opp.problemStatement}
            </p>

            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Expected Sandbox Outcome & Deliverables
              </h3>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {opp.expectedOutcome}
              </p>
            </div>
          </div>

          {/* 8 Public Evaluation Criteria Framework */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-blue-600">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-zinc-950 dark:text-white">Public Evaluation Framework</h2>
                  <p className="text-xs text-zinc-500">8 benchmark criteria used by the technical jury</p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-lg">
                Non-Confidential Guidance
              </span>
            </div>

            <div className="p-3.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-xl text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
              <HelpCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
              <span>
                <strong>Transparent Evaluation Notice:</strong> The criteria below describe what technical aspects
                the government evaluation committee analyzes. Specific evaluator scorecards, jury notes, and internal
                mathematical weights remain strictly confidential to preserve competitive fairness.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {publicCriteria.map((crit, idx) => (
                <div
                  key={crit.id}
                  className="p-3.5 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2 hover:border-orange-300 dark:hover:border-orange-800/60 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-600 text-[10px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{crit.name}</h3>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-snug">
                    {crit.explanation}
                  </p>
                  <div className="text-[11px] text-zinc-500 pt-1 border-t border-zinc-200 dark:border-zinc-700">
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">Expected Evidence:</span> {crit.expectedEvidence}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Eligibility, Documents, Important Dates */}
        <div className="space-y-6">
          {/* Eligibility & Exemptions */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h2 className="text-sm font-bold text-zinc-950 dark:text-white">Eligibility & Startup Waivers</h2>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {opp.eligibility}
            </p>
            <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>DPIIT Rule 170 EMD / Bid Security Waiver Active</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Prior Turnover & Experience Relaxation Applicable</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Up to {opp.grantAdvancePercent}% Mobilization Grant Advance</span>
              </div>
            </div>
          </div>

          {/* Required Documents */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-orange-600" />
              <h2 className="text-sm font-bold text-zinc-950 dark:text-white">Required Submission Files</h2>
            </div>
            <ul className="space-y-2.5">
              {opp.requiredDocuments.map((docName, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-300">
                  <FileText className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                  <span>{docName}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <Link
                to="/startup/documents"
                className="text-xs font-semibold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1"
              >
                Manage Company Documents Vault <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Important Dates Timeline */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
              <h2 className="text-sm font-bold text-zinc-950 dark:text-white">RFP Schedule</h2>
            </div>
            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-200 dark:before:bg-zinc-800">
              {opp.importantDates.map((item, idx) => (
                <div key={idx} className="relative">
                  <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-orange-500 ring-4 ring-white dark:ring-zinc-900" />
                  <p className="text-[11px] font-medium text-zinc-500">{item.label}</p>
                  <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{item.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action Card */}
          <div className="p-4 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800/50 rounded-2xl text-center space-y-3">
            <p className="text-xs text-orange-900 dark:text-orange-200 font-medium">
              Ready to deploy your prototype for Maharashtra public sector impact?
            </p>
            <button
              onClick={handleApplyClick}
              className="w-full py-2.5 px-4 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              Start 5-Step Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
