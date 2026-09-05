import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Layers,
  Rocket,
  Edit3,
  Cpu,
  Lock,
  MessageSquare
} from 'lucide-react';
import { useStartupPortal } from '../../context/StartupPortalContext';

export function ApplicationDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { applications, clarifications, opportunities } = useStartupPortal();

  const [activeTab, setActiveTab] = useState('overview');

  const app = applications.find((a) => a.id === id) || applications[0];
  const targetOpp = opportunities.find((o) => o.id === app?.opportunityId);
  const pendingClarification = clarifications.find(
    (c) => c.applicationId === app?.id && c.status === 'Pending Response'
  );

  if (!app) {
    return (
      <div className="text-center py-16">
        <AlertCircle className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Application Not Found</h2>
        <Link
          to="/startup/applications"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700"
        >
          <ArrowLeft className="w-4 h-4" /> Back to My Applications
        </Link>
      </div>
    );
  }

  // Define procurement stages for this application
  const stages = [
    {
      title: 'Proposal Dossier Submitted',
      date: app.submittedAt ? new Date(app.submittedAt).toLocaleDateString() : 'Pending',
      status: app.status === 'Draft' ? 'upcoming' : 'completed',
      note: 'Dossier digitally stamped and locked in the government procurement repository.'
    },
    {
      title: 'Statutory Verification',
      date: app.status === 'Draft' ? 'Pending' : '02 Sep 2026',
      status:
        app.status === 'Draft'
          ? 'upcoming'
          : app.status === 'Clarification Requested'
          ? 'action_required'
          : 'completed',
      note:
        app.status === 'Clarification Requested'
          ? 'Nodal officer requested clarification on audited balance sheet / waiver.'
          : 'DPIIT certificate, incorporation, and GST verification cleared.'
    },
    {
      title: 'Technical Jury Evaluation',
      date: app.status === 'Selected for Pilot' ? '25 Aug 2026' : 'In Progress',
      status:
        app.status === 'Selected for Pilot'
          ? 'completed'
          : app.status === 'Under Evaluation'
          ? 'in_progress'
          : 'upcoming',
      note: 'Independent multi-member expert committee reviewing problem alignment & TRL 7 readiness.'
    },
    {
      title: 'Testbed Demonstration',
      date: app.status === 'Selected for Pilot' ? '28 Aug 2026' : 'Upcoming',
      status: app.status === 'Selected for Pilot' ? 'completed' : 'upcoming',
      note: 'Live field bench test of sensor communication and telemetry accuracy.'
    },
    {
      title: 'Sandbox Pilot Sanction',
      date: app.status === 'Selected for Pilot' ? '01 Sep 2026' : 'Upcoming',
      status: app.status === 'Selected for Pilot' ? 'completed' : 'upcoming',
      note: 'Official Government Resolution (GR) issued and escrow advance sanctioned.'
    }
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Back Link */}
      <div>
        <Link
          to="/startup/applications"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to My Applications
        </Link>
      </div>

      {/* Header Banner */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 px-2.5 py-1 rounded-lg border border-orange-200 dark:border-orange-800/60">
                {app.id}
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                Status: {app.status}
              </span>
              <span className="text-xs font-medium text-zinc-500">
                Target RFP: <strong className="text-zinc-700 dark:text-zinc-300">{app.opportunityId}</strong>
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-white">
              {app.opportunityTitle}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
              <span className="flex items-center gap-1 font-medium">
                <Building2 className="w-3.5 h-3.5 text-zinc-400" />
                {app.department}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                Submitted: {app.submittedAt ? new Date(app.submittedAt).toLocaleDateString() : 'Draft'}
              </span>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            {app.status === 'Draft' ? (
              <Link
                to={`/startup/applications/${app.id}/edit`}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Edit3 className="w-4 h-4" /> Edit Draft
              </Link>
            ) : app.status === 'Selected for Pilot' ? (
              <Link
                to="/startup/pilots/PLT-MH-001"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2"
              >
                <Rocket className="w-4 h-4" /> Manage Pilot Sandbox
              </Link>
            ) : (
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-xl">
                <Lock className="w-3.5 h-3.5 text-zinc-400" /> Dossier Locked Under Review
              </div>
            )}
          </div>
        </div>

        {/* Action Required Banner if Clarification is Pending */}
        {pendingClarification && (
          <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-amber-950 dark:text-amber-200">
                  Statutory Clarification Requested by Department
                </h3>
                <p className="text-xs text-amber-800 dark:text-amber-300 mt-0.5">
                  {pendingClarification.requestTitle}: "{pendingClarification.requestText.slice(0, 120)}..."
                </p>
              </div>
            </div>
            <Link
              to={`/startup/applications/${app.id}/clarifications`}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" /> Submit Response
            </Link>
          </div>
        )}
      </div>

      {/* 5-Stage Procurement Timeline Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-6">
        <div>
          <h2 className="text-base font-bold text-zinc-950 dark:text-white">Procurement & Evaluation Progress</h2>
          <p className="text-xs text-zinc-500">Milestone timeline tracking through Maharashtra state procurement desk</p>
        </div>

        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-200 dark:before:bg-zinc-800">
          {stages.map((stage, idx) => {
            const isCompleted = stage.status === 'completed';
            const isCurrent = stage.status === 'in_progress';
            const isActionReq = stage.status === 'action_required';

            return (
              <div key={idx} className="relative">
                {/* Node indicator */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-zinc-900 ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-orange-600 text-white animate-pulse'
                      : isActionReq
                      ? 'bg-amber-600 text-white animate-bounce'
                      : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <span className="text-[10px] font-bold">{idx + 1}</span>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      {stage.title}
                    </h3>
                    <span className="text-[11px] font-medium text-zinc-500">
                      {stage.date}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    {stage.note}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Data Privacy & Blinded Evaluation Callout */}
        <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-start gap-2.5 text-xs text-zinc-500">
          <ShieldCheck className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
          <span>
            <strong>Blinded Evaluation Protocol:</strong> Under Maharashtra public procurement norms, individual evaluator identities,
            scoring breakdowns, and competitor rankings are protected to uphold integrity and non-discrimination.
          </span>
        </div>
      </div>

      {/* Submitted Dossier Details Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs overflow-hidden">
        {/* Dossier Tabs */}
        <div className="flex border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 px-6 pt-3 gap-6">
          {[
            { id: 'overview', label: 'Solution Overview' },
            { id: 'methodology', label: 'Methodology & Testbed' },
            { id: 'evidence', label: 'IP & Evidence' },
            { id: 'documents', label: 'Attached Documents' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'border-orange-600 text-orange-600 dark:text-orange-400'
                  : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 space-y-4">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-zinc-500 block">Solution Name:</span>
                  <p className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{app.solutionName}</p>
                </div>
                <div>
                  <span className="text-zinc-500 block">Technology Readiness Level:</span>
                  <span className="font-bold text-orange-600">{app.trlLevel}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-zinc-500 block">Technology Stack:</span>
                  <p className="text-zinc-800 dark:text-zinc-200 font-medium">{app.technologyStack || 'Edge AI, LoRaWAN, Python microservices'}</p>
                </div>
              </div>

              <div>
                <span className="text-xs text-zinc-500 block mb-1">Executive Summary:</span>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-zinc-800/40 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  {app.executiveSummary}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'methodology' && (
            <div className="space-y-4 text-xs">
              <div>
                <span className="text-zinc-500 block mb-1">Detailed Technical Approach:</span>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-zinc-800/40 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  {app.problemFitDetails || 'Ultrasonic transducers installed at 200m canal intervals measuring acoustic wave disruption correlated with water loss and unauthorized siphoning.'}
                </p>
              </div>

              <div>
                <span className="text-zinc-500 block mb-1">Field Deployment Methodology in Maharashtra:</span>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-zinc-800/40 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  {app.fieldMethodology || 'Solar-powered IP68 outdoor nodes mounted on canal retaining walls. Local maintenance team based in Pune providing 4-hour SLA.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-zinc-500 block">Testbed Site Requirements:</span>
                  <p className="font-medium text-zinc-800 dark:text-zinc-200">{app.testbedRequirements || '20km open canal embankment with cellular 4G or LoRa gateway line-of-sight'}</p>
                </div>
                <div>
                  <span className="text-zinc-500 block">Proposed Sandbox Duration:</span>
                  <p className="font-medium text-zinc-800 dark:text-zinc-200">{app.pilotTimelineWeeks || 12} Weeks</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'evidence' && (
            <div className="space-y-4 text-xs">
              <div>
                <span className="text-zinc-500 block">Patents & Intellectual Property:</span>
                <p className="font-medium text-zinc-800 dark:text-zinc-200">{app.patentsEvidence || '2 Indian Patents Granted (Ultrasonic Telemetry & Dynamic Leak Vector Analysis)'}</p>
              </div>

              <div>
                <span className="text-zinc-500 block">Prior Deployments & Field Validation:</span>
                <p className="font-medium text-zinc-800 dark:text-zinc-200">{app.priorDeployments || '12 municipal pump houses in Pimpri-Chinchwad, 4 pilot canals in Nashik irrigation command'}</p>
              </div>

              <div>
                <span className="text-zinc-500 block">Lab Certifications:</span>
                <p className="font-medium text-zinc-800 dark:text-zinc-200">{app.labCertifications || 'STQC Pre-Compliance Security Audit, NABL Water Meter Testing'}</p>
              </div>

              <div>
                <span className="text-zinc-500 block">Interactive Demo URL:</span>
                <a
                  href={app.demoUrl || 'https://aquasense.io/demo'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-600 hover:text-orange-700 font-semibold inline-flex items-center gap-1"
                >
                  {app.demoUrl || 'https://aquasense.io/demo'} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-3">
              {app.uploadedFiles?.map((docName, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-orange-600" />
                    <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{docName}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/60">
                    Digitally Verified
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
