import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  Save,
  Send,
  AlertCircle,
  FileText,
  Upload,
  Layers,
  Sparkles,
  ShieldCheck,
  Cpu,
  Clock,
  ExternalLink,
  ChevronRight,
  Info,
  Lock
} from 'lucide-react';
import { useStartupPortal } from '../../context/StartupPortalContext';

const TRL_OPTIONS = [
  { value: 'TRL 5', label: 'TRL 5 - Integrated technology components validated in relevant environment' },
  { value: 'TRL 6', label: 'TRL 6 - Prototype validated in simulated operational environment' },
  { value: 'TRL 7', label: 'TRL 7 - Prototype operational demonstration in field testbed' },
  { value: 'TRL 8', label: 'TRL 8 - Actual technology completed and qualified through test and demonstration' },
  { value: 'TRL 9', label: 'TRL 9 - Field proven operational system in full production' }
];

export function ApplicationWizardPage() {
  const { opportunityId, id: routeAppId } = useParams();
  const navigate = useNavigate();
  const {
    opportunities,
    applications,
    createDraftApplication,
    updateApplication,
    submitApplication,
    documents,
    profile,
    showToast
  } = useStartupPortal();

  // Find or initialize application
  const [currentApp, setCurrentApp] = useState(null);
  const [activeStep, setActiveStep] = useState(1);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToIntegrity, setAgreedToIntegrity] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State initialized from app
  const [formData, setFormData] = useState({
    solutionName: '',
    executiveSummary: '',
    technologyStack: '',
    trlLevel: 'TRL 7',
    problemFitDetails: '',
    fieldMethodology: '',
    testbedRequirements: '',
    pilotTimelineWeeks: 12,
    patentsEvidence: '',
    priorDeployments: '',
    labCertifications: '',
    demoUrl: '',
    uploadedFiles: []
  });

  useEffect(() => {
    let app = null;
    if (routeAppId) {
      app = applications.find((a) => a.id === routeAppId);
    } else if (opportunityId) {
      app = applications.find((a) => a.opportunityId === opportunityId);
      if (!app) {
        // Create draft if not found
        const newId = createDraftApplication(opportunityId);
        app = applications.find((a) => a.id === newId);
      }
    }

    if (app) {
      setCurrentApp(app);
      setFormData({
        solutionName: app.solutionName || '',
        executiveSummary: app.executiveSummary || '',
        technologyStack: app.technologyStack || profile.technology || '',
        trlLevel: app.trlLevel || 'TRL 7',
        problemFitDetails: app.problemFitDetails || '',
        fieldMethodology: app.fieldMethodology || '',
        testbedRequirements: app.testbedRequirements || '',
        pilotTimelineWeeks: app.pilotTimelineWeeks || 12,
        patentsEvidence: app.patentsEvidence || '2 Indian Patents Granted (Ultrasonic Flow Sensing & Edge LoRa Telemetry)',
        priorDeployments: app.priorDeployments || profile.deployments || '',
        labCertifications: app.labCertifications || 'STQC Pre-Compliance Security Audit, NABL Water Meter Testing Cleared',
        demoUrl: app.demoUrl || 'https://aquasense.io/pilot-telemetry-demo',
        uploadedFiles: app.uploadedFiles || ['DPIIT_Recognition_Certificate.pdf', 'Technical_Architecture_Whitepaper.pdf']
      });
    }
  }, [routeAppId, opportunityId, applications]);

  const targetOpp = opportunities.find((o) => o.id === (currentApp?.opportunityId || opportunityId)) || opportunities[0];

  const isLocked = currentApp && currentApp.status !== 'Draft';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveDraft = () => {
    if (!currentApp) return;
    updateApplication(currentApp.id, formData);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!agreedToTerms || !agreedToIntegrity) {
      showToast('Please check the statutory declarations before submitting.', 'error');
      return;
    }
    if (!formData.solutionName.trim() || !formData.executiveSummary.trim()) {
      showToast('Please complete required solution details in Step 1.', 'error');
      setActiveStep(1);
      return;
    }

    setIsSubmitting(true);
    // Update data first then submit
    updateApplication(currentApp.id, formData);
    submitApplication(currentApp.id);
    setIsSubmitting(false);

    // Redirect to tracking page
    navigate(`/startup/applications/${currentApp.id}`);
  };

  const steps = [
    { num: 1, title: 'Solution Info', subtitle: 'TRL & Tech Stack' },
    { num: 2, title: 'Problem Fit', subtitle: 'Field Methodology' },
    { num: 3, title: 'Evidence & IP', subtitle: 'Patents & Pilots' },
    { num: 4, title: 'Documents', subtitle: 'Statutory Vault' },
    { num: 5, title: 'Review & Submit', subtitle: 'Statutory Signing' }
  ];

  if (!currentApp) {
    return (
      <div className="text-center py-20">
        <div className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">Initializing Application Workspace...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      {/* Top Breadcrumb / Return */}
      <div className="flex items-center justify-between">
        <Link
          to="/startup/applications"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to My Applications
        </Link>
        <span className="text-xs font-mono font-bold text-zinc-500">
          Ref: {currentApp.id}
        </span>
      </div>

      {/* Lock Notice if already submitted */}
      {isLocked && (
        <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 rounded-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 text-white rounded-xl">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-blue-950 dark:text-blue-200">
                Application Submitted & Formally Locked ({currentApp.status})
              </h3>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                This dossier was submitted on {currentApp.submittedAt ? new Date(currentApp.submittedAt).toLocaleDateString() : 'N/A'}.
                It is currently under official departmental review.
              </p>
            </div>
          </div>
          <Link
            to={`/startup/applications/${currentApp.id}`}
            className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-xs hover:bg-blue-700 transition-colors shrink-0"
          >
            Track Status Timeline
          </Link>
        </div>
      )}

      {/* Target RFP Header */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 px-2 py-0.5 rounded border border-orange-200 dark:border-orange-800/60">
              {targetOpp.id}
            </span>
            <span className="text-xs text-zinc-500 font-medium">
              {targetOpp.department}
            </span>
          </div>
          <h1 className="text-lg sm:text-xl font-black text-zinc-950 dark:text-white">
            {targetOpp.title}
          </h1>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {!isLocked && (
            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 text-xs font-bold rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-750 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Save className="w-3.5 h-3.5" /> Save Draft
            </button>
          )}
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            Status: {currentApp.status}
          </span>
        </div>
      </div>

      {/* Step Indicator Bar */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-xs">
        <div className="grid grid-cols-5 gap-2 sm:gap-4">
          {steps.map((step) => {
            const isDone = activeStep > step.num;
            const isCurrent = activeStep === step.num;

            return (
              <button
                key={step.num}
                type="button"
                onClick={() => setActiveStep(step.num)}
                className={`p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60'
                    : isDone
                    ? 'bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100'
                    : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/30 opacity-60'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center ${
                      isCurrent
                        ? 'bg-orange-600 text-white'
                        : isDone
                        ? 'bg-emerald-600 text-white'
                        : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : step.num}
                  </span>
                  <span
                    className={`text-xs font-bold hidden md:inline ${
                      isCurrent
                        ? 'text-orange-600 dark:text-orange-400'
                        : 'text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                <p className="text-[10px] text-zinc-500 hidden sm:block truncate">
                  {step.subtitle}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Content Container */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xs">
        {/* STEP 1: SOLUTION INFO */}
        {activeStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-zinc-950 dark:text-white">Step 1: Proposed Solution & Technology</h2>
              <p className="text-xs text-zinc-500">Define the core product and readiness stage you intend to pilot</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Solution / Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="solutionName"
                  value={formData.solutionName}
                  onChange={handleInputChange}
                  disabled={isLocked}
                  placeholder="e.g. AquaPulse HydroEdge AI Sensor System"
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none text-zinc-900 dark:text-white font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Elevator Pitch & Executive Summary <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="executiveSummary"
                  rows={4}
                  value={formData.executiveSummary}
                  onChange={handleInputChange}
                  disabled={isLocked}
                  placeholder="Summarize the technological breakthrough, how it integrates into existing department infrastructure, and the core benefits."
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none text-zinc-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Technology Readiness Level (TRL) <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="trlLevel"
                    value={formData.trlLevel}
                    onChange={handleInputChange}
                    disabled={isLocked}
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs focus:ring-2 focus:ring-orange-500 outline-none text-zinc-900 dark:text-white font-medium"
                  >
                    {TRL_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Core Technology Stack
                  </label>
                  <input
                    type="text"
                    name="technologyStack"
                    value={formData.technologyStack}
                    onChange={handleInputChange}
                    disabled={isLocked}
                    placeholder="e.g. Edge AI, LoRaWAN, Python microservices, AWS GovCloud"
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none text-zinc-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: PROBLEM FIT & METHODOLOGY */}
        {activeStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-zinc-950 dark:text-white">Step 2: Problem-Solution Fit & Sandbox Deployment</h2>
              <p className="text-xs text-zinc-500">Detail your technical architecture and operational deployment plan</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Detailed Technical Approach & Architecture
                </label>
                <textarea
                  name="problemFitDetails"
                  rows={4}
                  value={formData.problemFitDetails}
                  onChange={handleInputChange}
                  disabled={isLocked}
                  placeholder="Explain how sensor inputs, Edge models, communication gateways, and cloud dashboards interact to solve the department challenge."
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none text-zinc-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Field Deployment Methodology in Maharashtra
                </label>
                <textarea
                  name="fieldMethodology"
                  rows={3}
                  value={formData.fieldMethodology}
                  onChange={handleInputChange}
                  disabled={isLocked}
                  placeholder="Outline physical installation, calibration protocols, outdoor weather hardening, and field maintenance availability."
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none text-zinc-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Government Testbed Site Requirements
                  </label>
                  <input
                    type="text"
                    name="testbedRequirements"
                    value={formData.testbedRequirements}
                    onChange={handleInputChange}
                    disabled={isLocked}
                    placeholder="e.g. 230V AC socket, 20m canal bank access, Cellular 4G signal"
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none text-zinc-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Estimated Pilot Duration (Weeks)
                  </label>
                  <input
                    type="number"
                    name="pilotTimelineWeeks"
                    value={formData.pilotTimelineWeeks}
                    onChange={handleInputChange}
                    disabled={isLocked}
                    min={4}
                    max={52}
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none text-zinc-900 dark:text-white font-medium"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: EVIDENCE & IP */}
        {activeStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-zinc-950 dark:text-white">Step 3: Evidence, IP & Credibility</h2>
              <p className="text-xs text-zinc-500">Provide verifiable proof of technology performance and intellectual property</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Patents & Proprietary IP Rights
                </label>
                <input
                  type="text"
                  name="patentsEvidence"
                  value={formData.patentsEvidence}
                  onChange={handleInputChange}
                  disabled={isLocked}
                  placeholder="List Indian/PCT patent application numbers or granted numbers"
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none text-zinc-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Prior Deployments & Commercial Pilots
                </label>
                <textarea
                  name="priorDeployments"
                  rows={3}
                  value={formData.priorDeployments}
                  onChange={handleInputChange}
                  disabled={isLocked}
                  placeholder="Detail previous pilots with municipal corporations, industrial clients, or academic labs."
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none text-zinc-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Testing Reports & STQC / NABL Certifications
                  </label>
                  <input
                    type="text"
                    name="labCertifications"
                    value={formData.labCertifications}
                    onChange={handleInputChange}
                    disabled={isLocked}
                    placeholder="e.g. STQC Pre-Compliance Security Audit, NABL Water Meter Testing"
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none text-zinc-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Live Demo Video URL or Public Repo
                  </label>
                  <input
                    type="url"
                    name="demoUrl"
                    value={formData.demoUrl}
                    onChange={handleInputChange}
                    disabled={isLocked}
                    placeholder="https://youtube.com/watch?v=... or https://github.com/..."
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none text-zinc-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: REQUIRED DOCUMENTS */}
        {activeStep === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-zinc-950 dark:text-white">Step 4: Statutory & Technical Documents</h2>
              <p className="text-xs text-zinc-500">Verified documents attached from your company vault</p>
            </div>

            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-orange-600 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{doc.name}</p>
                      <p className="text-[11px] text-zinc-500">{doc.category} • {doc.fileSize} • Uploaded {doc.uploadDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        doc.status === 'Verified'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : doc.status === 'Pending'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                      }`}
                    >
                      {doc.status}
                    </span>
                    <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Attached
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800/50 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-orange-900 dark:text-orange-200">
                <ShieldCheck className="w-4 h-4 text-orange-600" />
                <span>All attached documents inherit verified digital signatures from your central vault.</span>
              </div>
              <Link
                to="/startup/documents"
                className="text-xs font-bold text-orange-600 hover:text-orange-700 underline"
              >
                Open Vault
              </Link>
            </div>
          </div>
        )}

        {/* STEP 5: REVIEW & FINAL SUBMISSION */}
        {activeStep === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-zinc-950 dark:text-white">Step 5: Review & Statutory Sign-off</h2>
              <p className="text-xs text-zinc-500">Carefully review your proposal dossier before final government dispatch</p>
            </div>

            {/* Summary Review Card */}
            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-zinc-500 block">Proposed Solution:</span>
                  <strong className="text-zinc-900 dark:text-zinc-100 text-sm">{formData.solutionName || 'Not specified'}</strong>
                </div>
                <div>
                  <span className="text-zinc-500 block">Target Challenge:</span>
                  <strong className="text-zinc-900 dark:text-zinc-100">{targetOpp.title}</strong>
                </div>
                <div>
                  <span className="text-zinc-500 block">Readiness Level:</span>
                  <span className="font-bold text-orange-600">{formData.trlLevel}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Estimated Duration:</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">{formData.pilotTimelineWeeks} Weeks</span>
                </div>
              </div>

              <div>
                <span className="text-zinc-500 block mb-1">Executive Summary:</span>
                <p className="text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700">
                  {formData.executiveSummary || 'No summary entered.'}
                </p>
              </div>

              <div>
                <span className="text-zinc-500 block mb-1">Attached Documents ({documents.length}):</span>
                <div className="flex flex-wrap gap-2">
                  {documents.map((d) => (
                    <span key={d.id} className="px-2.5 py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md font-mono text-[11px]">
                      {d.name.slice(0, 32)}...
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Statutory Checkboxes */}
            {!isLocked && (
              <div className="space-y-3 p-4 bg-orange-50/50 dark:bg-orange-950/20 rounded-xl border border-orange-200 dark:border-orange-800/40">
                <h3 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                  Mandatory Statutory Declarations
                </h3>
                <label className="flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-0.5 rounded text-orange-600 focus:ring-orange-500 cursor-pointer"
                  />
                  <span>
                    I confirm on behalf of <strong>{profile.name}</strong> that all technical claims and
                    certifications provided are accurate. We possess clear IP ownership or exclusive commercial licenses.
                  </span>
                </label>
                <label className="flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToIntegrity}
                    onChange={(e) => setAgreedToIntegrity(e.target.checked)}
                    className="mt-0.5 rounded text-orange-600 focus:ring-orange-500 cursor-pointer"
                  />
                  <span>
                    We agree to adhere to the Maharashtra State Innovation Society (MSInS) sandbox pilot guidelines
                    and understand that final application submission locks the dossier against subsequent edits.
                  </span>
                </label>
              </div>
            )}
          </div>
        )}

        {/* Wizard Footer Navigation */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800">
          <div>
            {activeStep > 1 && (
              <button
                type="button"
                onClick={() => setActiveStep((prev) => prev - 1)}
                className="px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 text-xs font-bold rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-750 transition-colors cursor-pointer"
              >
                Previous Step
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {!isLocked && (
              <button
                type="button"
                onClick={handleSaveDraft}
                className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" /> Save Draft
              </button>
            )}

            {activeStep < 5 ? (
              <button
                type="button"
                onClick={() => setActiveStep((prev) => prev + 1)}
                className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                Next Step <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : !isLocked ? (
              <button
                type="button"
                disabled={isSubmitting || !agreedToTerms || !agreedToIntegrity}
                onClick={handleFinalSubmit}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" /> Submit Application
              </button>
            ) : (
              <Link
                to={`/startup/applications/${currentApp.id}`}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                View Tracking Dossier
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
