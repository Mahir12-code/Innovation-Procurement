import React, { useEffect } from 'react';
import {
  X,
  ExternalLink,
  Building2,
  CheckCircle2,
  FileText,
  HelpCircle,
  Award,
  Calendar,
  ShieldCheck,
  Landmark,
  Share2,
  Check
} from 'lucide-react';
import { getSchemeIcon } from './StartupSchemeCard';

export function StartupSchemeDetailModal({ scheme, isOpen, onClose }) {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !scheme) return null;

  const isCentral = scheme.governmentType?.includes('Central Government');

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin + '/schemes#' + scheme.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 z-10 overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Sticky Header */}
        <div className="px-6 py-5 border-b border-zinc-100 dark:border-zinc-800 flex items-start justify-between gap-4 bg-zinc-50/50 dark:bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-20">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-orange-50 dark:bg-orange-950/50 border border-orange-200/80 dark:border-orange-800/60 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
              {getSchemeIcon(scheme.badge, scheme.category)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span
                  className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-lg border ${
                    isCentral
                      ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300 border-sky-200 dark:border-sky-800/60'
                      : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60'
                  }`}
                >
                  <Landmark className="w-3 h-3" />
                  {scheme.governmentType}
                </span>

                <span className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">
                  Status: {scheme.status}
                </span>

                <span className="text-[11px] font-semibold text-orange-700 dark:text-orange-300 bg-orange-100/60 dark:bg-orange-950/40 px-2 py-0.5 rounded">
                  Mode: {scheme.applicationMode}
                </span>
              </div>

              <h2 className="text-xl font-black text-zinc-950 dark:text-white tracking-tight leading-snug">
                {scheme.schemeName}
              </h2>

              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium flex items-center gap-1.5 mt-1">
                <Building2 className="w-3.5 h-3.5 text-zinc-400" />
                {scheme.department} • {scheme.implementingAgency}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-xl text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="Copy share link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="px-6 py-6 overflow-y-auto space-y-6 divide-y divide-zinc-100 dark:divide-zinc-800">
          {/* Section 1: Overview & Highlight */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Scheme Overview
            </h4>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
              {scheme.description}
            </p>

            {scheme.highlight && (
              <div className="p-3.5 bg-orange-50/70 dark:bg-orange-950/30 rounded-xl border border-orange-200/80 dark:border-orange-800/50 text-xs text-orange-950 dark:text-orange-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-black">Key Opportunity / Highlight: </span>
                  {scheme.highlight}
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Who Can Benefit */}
          <div className="pt-6 space-y-2.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Who Can Benefit?
            </h4>
            <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200/80 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
              {scheme.targetBeneficiaries}
            </div>
          </div>

          {/* Section 3: Eligibility */}
          <div className="pt-6 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Verified Eligibility Criteria
            </h4>
            <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
              {Array.isArray(scheme.eligibility) ? (
                scheme.eligibility.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 shrink-0 mt-1.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))
              ) : (
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                  <span>{scheme.eligibility}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Section 4: Benefits */}
          <div className="pt-6 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              Benefits & Support Provided
            </h4>
            <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
              {Array.isArray(scheme.benefits) ? (
                scheme.benefits.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))
              ) : (
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                  <span>{scheme.benefits}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Section 5: Required Documents */}
          <div className="pt-6 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Officially Required Documents
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {scheme.documents?.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200/80 dark:border-zinc-700/60 text-xs text-zinc-700 dark:text-zinc-300 flex items-center gap-2"
                >
                  <span className="w-5 h-5 rounded-md bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[10px] font-black flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="font-medium truncate">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: How to Apply & Application Mode */}
          <div className="pt-6 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              How to Apply (Application Mode: {scheme.applicationMode})
            </h4>
            <ol className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
              {Array.isArray(scheme.applicationProcess) ? (
                scheme.applicationProcess.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="font-black text-orange-600 dark:text-orange-400 shrink-0">
                      Step {idx + 1}:
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))
              ) : (
                <li>{scheme.applicationProcess}</li>
              )}
            </ol>
          </div>

          {/* Section 7: Verification & Audit Metadata */}
          <div className="pt-6">
            <div className="p-4 bg-zinc-100/70 dark:bg-zinc-800/70 rounded-xl border border-zinc-200 dark:border-zinc-700/60 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                <div>
                  <span className="font-bold text-zinc-900 dark:text-white">Official Source: </span>
                  <span className="text-zinc-600 dark:text-zinc-300">{scheme.officialSource}</span>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 text-[11px] font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Last verified: {scheme.sourceLastChecked}</span>
                </div>
              </div>

              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed italic border-t border-zinc-200/80 dark:border-zinc-700/60 pt-2">
                * Scheme information is provided for citizen and entrepreneur convenience. Eligibility, funding, application dates and program conditions may change. Always verify the latest information on the official Government portal before applying.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Sticky Footer with Official Portal CTA */}
        <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sticky bottom-0 z-20">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>

          <a
            href={scheme.officialPortal}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-black rounded-xl shadow-xs transition-colors inline-flex items-center justify-center gap-2"
          >
            Visit Official Government Portal →
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
