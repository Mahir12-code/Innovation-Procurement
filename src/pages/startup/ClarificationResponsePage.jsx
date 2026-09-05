import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Clock,
  FileText,
  Send,
  Upload,
  Building2,
  Paperclip,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { useStartupPortal } from '../../context/StartupPortalContext';

export function ClarificationResponsePage() {
  const { id: routeAppId } = useParams();
  const { clarifications, respondClarification, showToast } = useStartupPortal();

  const [activeFilter, setActiveFilter] = useState('all');
  const [activeClarificationId, setActiveClarificationId] = useState(
    routeAppId
      ? clarifications.find((c) => c.applicationId === routeAppId)?.id || clarifications[0]?.id
      : clarifications[0]?.id
  );

  // Form state for replying
  const [responseText, setResponseText] = useState('');
  const [attachmentName, setAttachmentName] = useState('CA_Turnover_Exemption_Affidavit_2026.pdf');

  const selectedClarification = clarifications.find((c) => c.id === activeClarificationId) || clarifications[0];

  const handleSubmitResponse = (e) => {
    e.preventDefault();
    if (!responseText.trim()) {
      showToast('Please provide an explanatory response text.', 'error');
      return;
    }

    respondClarification(selectedClarification.id, {
      text: responseText,
      attachments: attachmentName ? [attachmentName] : []
    });

    setResponseText('');
  };

  const filteredClarifications = clarifications.filter((c) => {
    if (activeFilter === 'pending') return c.status === 'Pending Response';
    if (activeFilter === 'resolved') return c.status === 'Resolved';
    return true;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <Link
          to="/startup/applications"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to My Applications
        </Link>
        <span className="text-xs font-bold text-zinc-500">
          Statutory Clarification Desk
        </span>
      </div>

      {/* Header Banner */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-lg w-fit border border-amber-200 dark:border-amber-800/60">
          <AlertCircle className="w-3.5 h-3.5" /> Official Communications
        </div>
        <h1 className="text-2xl font-black text-zinc-950 dark:text-white tracking-tight">
          Government Clarifications & Queries
        </h1>
        <p className="text-xs text-zinc-500 max-w-2xl">
          Departments and evaluation committees may issue formal clarification queries regarding your technical claims,
          certifications, or statutory exemptions under Maharashtra public procurement regulations.
        </p>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: List of Queries */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Clarification Requests ({clarifications.length})
            </h2>
            <div className="flex gap-1 bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg text-[11px] font-semibold">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-2 py-0.5 rounded-md transition-colors ${
                  activeFilter === 'all' ? 'bg-white dark:bg-zinc-700 shadow-xs' : 'text-zinc-500'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter('pending')}
                className={`px-2 py-0.5 rounded-md transition-colors ${
                  activeFilter === 'pending' ? 'bg-white dark:bg-zinc-700 shadow-xs text-amber-600' : 'text-zinc-500'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setActiveFilter('resolved')}
                className={`px-2 py-0.5 rounded-md transition-colors ${
                  activeFilter === 'resolved' ? 'bg-white dark:bg-zinc-700 shadow-xs text-emerald-600' : 'text-zinc-500'
                }`}
              >
                Resolved
              </button>
            </div>
          </div>

          <div className="space-y-2.5">
            {filteredClarifications.map((item) => {
              const isSelected = item.id === selectedClarification?.id;
              const isPending = item.status === 'Pending Response';

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveClarificationId(item.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-orange-50/50 dark:bg-orange-950/20 border-orange-300 dark:border-orange-800/80 shadow-xs'
                      : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-[11px] font-bold text-zinc-600 dark:text-zinc-400">
                      {item.id} • {item.applicationId}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isPending
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 animate-pulse'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 leading-snug line-clamp-2">
                    {item.requestTitle}
                  </h3>

                  <p className="text-[11px] text-zinc-500 mt-1 flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-zinc-400" />
                    {item.department}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column (2 Cols): Query Details & Response Form */}
        <div className="lg:col-span-2">
          {selectedClarification ? (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              {/* Query Header */}
              <div className="space-y-3 pb-6 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 px-2 py-0.5 rounded border border-orange-200 dark:border-orange-800/60">
                      {selectedClarification.id}
                    </span>
                    <span className="text-xs text-zinc-500">
                      Application: <strong>{selectedClarification.applicationId}</strong>
                    </span>
                  </div>

                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      selectedClarification.status === 'Pending Response'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}
                  >
                    {selectedClarification.status}
                  </span>
                </div>

                <h2 className="text-lg font-black text-zinc-950 dark:text-white">
                  {selectedClarification.requestTitle}
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
                  <span className="flex items-center gap-1 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-zinc-400" />
                    {selectedClarification.department}
                  </span>
                  <span className="flex items-center gap-1 font-medium text-amber-600">
                    <Clock className="w-3.5 h-3.5" />
                    Deadline: {new Date(selectedClarification.deadline).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Department Query Box */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Official Inquiry from Department Nodal Cell
                </label>
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                  {selectedClarification.requestText}
                </div>
              </div>

              {/* Response Section */}
              {selectedClarification.status === 'Pending Response' ? (
                <form onSubmit={handleSubmitResponse} className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Startup Justification & Technical Explanation <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      placeholder="Enter detailed clarification explaining statutory waiver applicability, technical frequency conformance, or documentary evidence..."
                      className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs focus:ring-2 focus:ring-orange-500 outline-none text-zinc-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Attach Supporting Evidence / Affidavit Document
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={attachmentName}
                        onChange={(e) => setAttachmentName(e.target.value)}
                        placeholder="Filename or certificate title"
                        className="flex-1 px-3.5 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-mono text-zinc-900 dark:text-white"
                      />
                      <label className="px-3.5 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5" /> Browse File
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) setAttachmentName(e.target.files[0].name);
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="pt-3 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800">
                    <p className="text-[11px] text-zinc-500">
                      Dispatched responses are logged in the immutable procurement audit ledger.
                    </p>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" /> Submit Clarification Response
                    </button>
                  </div>
                </form>
              ) : (
                /* Resolved Response Card */
                <div className="space-y-4 pt-2">
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Response Formally Dispatched
                      </span>
                      <span className="text-[11px] text-emerald-700 dark:text-emerald-300 font-medium">
                        {selectedClarification.response?.submittedAt
                          ? new Date(selectedClarification.response.submittedAt).toLocaleString()
                          : 'Recorded'}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-800 dark:text-zinc-200 font-medium leading-relaxed bg-white dark:bg-zinc-900 p-3.5 rounded-lg border border-emerald-100 dark:border-emerald-900/40">
                      {selectedClarification.response?.text || 'Formal clarification explanation and statutory documents recorded.'}
                    </p>

                    {selectedClarification.response?.attachments?.length > 0 && (
                      <div className="flex items-center gap-2 pt-1 text-xs">
                        <Paperclip className="w-3.5 h-3.5 text-zinc-400" />
                        <span className="font-semibold text-zinc-700 dark:text-zinc-300">Attached Document:</span>
                        <span className="font-mono text-orange-600 dark:text-orange-400">
                          {selectedClarification.response.attachments[0]}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-12 text-center">
              <FileText className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
              <p className="text-sm font-bold text-zinc-950 dark:text-white">No Clarification Selected</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
