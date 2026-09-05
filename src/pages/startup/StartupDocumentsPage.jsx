import React, { useState } from 'react';
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Download,
  RefreshCw,
  Plus,
  X,
  FileCheck,
  Lock,
  ExternalLink
} from 'lucide-react';
import { useStartupPortal } from '../../context/StartupPortalContext';

export function StartupDocumentsPage() {
  const { documents, uploadDocument, replaceDocument, showToast } = useStartupPortal();

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [replacingDocId, setReplacingDocId] = useState(null);

  // New Upload Form State
  const [newDocData, setNewDocData] = useState({
    name: '',
    category: 'Technical & Security',
    fileSize: '2.4 MB',
    fileType: 'PDF'
  });

  // Replace file state
  const [replaceFileName, setReplaceFileName] = useState('');

  const handleCreateUpload = (e) => {
    e.preventDefault();
    if (!newDocData.name.trim()) {
      showToast('Please enter a document name.', 'error');
      return;
    }

    uploadDocument(newDocData);
    setIsUploadModalOpen(false);
    setNewDocData({
      name: '',
      category: 'Technical & Security',
      fileSize: '2.4 MB',
      fileType: 'PDF'
    });
  };

  const handleExecuteReplace = (e) => {
    e.preventDefault();
    if (!replaceFileName.trim()) {
      showToast('Please specify the updated filename.', 'error');
      return;
    }
    replaceDocument(replacingDocId, replaceFileName);
    setReplacingDocId(null);
    setReplaceFileName('');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Verified':
        return (
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified
          </span>
        );
      case 'Pending':
        return (
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" /> Pending Review
          </span>
        );
      case 'Clarification Requested':
        return (
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800/60 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-red-600" /> Clarification Requested
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
      {/* Header Banner */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 px-2 py-0.5 rounded border border-orange-200 dark:border-orange-800/60">
              Statutory Vault
            </span>
            <span className="text-xs text-zinc-500 font-medium">
              Maharashtra Public Procurement Compliance
            </span>
          </div>
          <h1 className="text-2xl font-black text-zinc-950 dark:text-white tracking-tight">
            Company Document Vault
          </h1>
          <p className="text-xs text-zinc-500 max-w-xl">
            Central repository of incorporation, tax exemptions, and technical certifications.
            Verified files are digitally linked to all proposal submissions.
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Upload Document
        </button>
      </div>

      {/* Security & Verification Rule Notice */}
      <div className="p-4 bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 rounded-2xl flex items-start gap-3 text-xs text-zinc-600 dark:text-zinc-300">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-zinc-900 dark:text-zinc-100">
            Government Verification & Non-Tampering Protocol
          </p>
          <p className="leading-relaxed">
            Statutory compliance certificates cannot be manually self-verified by startups. Verification is stamped exclusively
            via official DPIIT/MCA API bridges or certified government nodal officers during evaluation.
            Verified documents are locked against alteration.
          </p>
        </div>
      </div>

      {/* Documents Grid / Table */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Uploaded Credentials ({documents.length})
          </h2>
          <span className="text-xs text-zinc-500 font-medium">
            {documents.filter((d) => d.status === 'Verified').length} Verified by Government Desk
          </span>
        </div>

        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors"
            >
              <div className="flex items-start gap-3.5 max-w-2xl">
                <div className="p-2.5 bg-orange-50 dark:bg-orange-950/40 rounded-xl text-orange-600 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                      {doc.name}
                    </h3>
                    {getStatusBadge(doc.status)}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                    <span className="font-medium">{doc.category}</span>
                    <span>•</span>
                    <span>{doc.fileSize}</span>
                    <span>•</span>
                    <span>Uploaded: {doc.uploadDate}</span>
                    <span>•</span>
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">
                      Audit Desk: <strong>{doc.verifiedBy}</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => showToast(`Downloading ${doc.name}`, 'info')}
                  className="p-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer"
                  title="Download File"
                >
                  <Download className="w-4 h-4" />
                </button>

                {doc.canReplace ? (
                  <button
                    type="button"
                    onClick={() => {
                      setReplacingDocId(doc.id);
                      setReplaceFileName('');
                    }}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Replace File
                  </button>
                ) : (
                  <span className="px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-400 text-xs font-medium rounded-xl flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" /> Locked
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Upload New Document */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-xl animate-in fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-orange-600" /> Upload Compliance Document
              </h2>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUpload} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Document Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ISO 27001 Information Security Certificate"
                  value={newDocData.name}
                  onChange={(e) => setNewDocData({ ...newDocData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs focus:ring-2 focus:ring-orange-500 outline-none text-zinc-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Category
                </label>
                <select
                  value={newDocData.category}
                  onChange={(e) => setNewDocData({ ...newDocData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs focus:ring-2 focus:ring-orange-500 outline-none text-zinc-900 dark:text-white font-medium"
                >
                  <option value="Statutory Compliance">Statutory Compliance (DPIIT / MSME)</option>
                  <option value="Corporate Legal">Corporate Legal (CIN / MCA)</option>
                  <option value="Tax & Compliance">Tax & Compliance (GST / PAN)</option>
                  <option value="Financials">Financials & Turnover Waivers</option>
                  <option value="Technical & Security">Technical & STQC Certifications</option>
                  <option value="Intellectual Property">Intellectual Property & Patents</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Select File (PDF, max 10MB)
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setNewDocData({
                        ...newDocData,
                        name: newDocData.name || e.target.files[0].name,
                        fileSize: `${(e.target.files[0].size / (1024 * 1024)).toFixed(1)} MB`
                      });
                    }
                  }}
                  className="w-full text-xs text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-zinc-100 file:text-zinc-700 dark:file:bg-zinc-800 dark:file:text-zinc-300 hover:file:bg-zinc-200 cursor-pointer"
                />
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-xl text-[11px] text-amber-800 dark:text-amber-300">
                Newly uploaded documents are marked <strong>Pending Review</strong> until validated by the nodal desk.
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Upload to Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Replace Document */}
      {replacingDocId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl animate-in fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-amber-600" /> Replace Document
              </h2>
              <button
                onClick={() => setReplacingDocId(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Upload an updated replacement copy in response to the department clarification.
              The document status will reset to <strong>Pending</strong> for evaluation review.
            </p>

            <form onSubmit={handleExecuteReplace} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Updated Document File / Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CA_Certified_Turnover_Exemption_Affidavit_Revised.pdf"
                  value={replaceFileName}
                  onChange={(e) => setReplaceFileName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs focus:ring-2 focus:ring-orange-500 outline-none text-zinc-900 dark:text-white font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setReplacingDocId(null)}
                  className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Submit Replacement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
