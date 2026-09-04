import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  ShieldCheck, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  FileText, 
  ExternalLink, 
  Eye, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { useGovernmentPortal } from '../../context/GovernmentPortalContext';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { Badge } from '../../components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';

export function ApplicationsVerificationPage() {
  const navigate = useNavigate();
  const { verificationQueue, verifyApplication, requestCorrection, showToast } = useGovernmentPortal();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals
  const [selectedItem, setSelectedItem] = useState(null);
  const [isCorrectionModalOpen, setIsCorrectionModalOpen] = useState(false);
  const [correctionApp, setCorrectionApp] = useState(null);
  const [correctionNote, setCorrectionNote] = useState('');

  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectApp, setRejectApp] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  // Checklist state for modal
  const [checklist, setChecklist] = useState({
    dpiit: true,
    mca: true,
    turnover: true,
    nonBlacklist: true
  });

  const filteredQueue = useMemo(() => {
    return verificationQueue.filter((item) => {
      const matchesSearch =
        item.startupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.appId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.dpiitNo.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'All' ||
        (statusFilter === 'Pending' && item.verificationStatus === 'Pending Verification') ||
        (statusFilter === 'Documents Missing' && item.verificationStatus === 'Documents Missing') ||
        (statusFilter === 'Verified' && item.verificationStatus === 'Verified') ||
        (statusFilter === 'Rejected' && item.verificationStatus === 'Rejected');

      return matchesSearch && matchesStatus;
    });
  }, [verificationQueue, searchQuery, statusFilter]);

  const handleApprove = (appId) => {
    verifyApplication(appId, 'approve');
    if (selectedItem?.appId === appId) {
      setSelectedItem(null);
    }
  };

  const handleOpenCorrection = (item) => {
    setCorrectionApp(item);
    setCorrectionNote(item.notes || 'Please provide updated FY 24-25 CA audited turnover certificate and revised GST-3B return.');
    setIsCorrectionModalOpen(true);
  };

  const handleSendCorrection = () => {
    if (!correctionNote.trim()) {
      showToast('Please enter the required deficiency notes', 'error');
      return;
    }
    requestCorrection(correctionApp.appId, correctionNote);
    setIsCorrectionModalOpen(false);
    setCorrectionApp(null);
    if (selectedItem?.appId === correctionApp.appId) {
      setSelectedItem(null);
    }
  };

  const handleOpenReject = (item) => {
    setRejectApp(item);
    setRejectReason('Startup entity exceeds maximum age (>10 years from incorporation) under DPIIT eligibility criteria.');
    setIsRejectModalOpen(true);
  };

  const handleConfirmReject = () => {
    verifyApplication(rejectApp.appId, 'reject', rejectReason);
    setIsRejectModalOpen(false);
    setRejectApp(null);
    if (selectedItem?.appId === rejectApp.appId) {
      setSelectedItem(null);
    }
  };

  const pendingCount = verificationQueue.filter(v => v.verificationStatus === 'Pending Verification').length;

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
              Statutory Compliance Desk
            </span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
              Applications Awaiting Verification
            </h1>
            <Badge variant="warning" size="md">
              {pendingCount} Awaiting Review
            </Badge>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Mandatory DPIIT recognition, MCA registration, and turnover exemption checks prior to expert jury scoring.
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
            onClick={() => navigate('/government/applications/evaluation')}
            className="text-xs shadow-sm"
          >
            Go to Evaluation Desk
          </Button>
        </div>
      </div>

      {/* Regulatory Info Banner */}
      <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-start gap-3 text-xs text-amber-800 dark:text-amber-300">
        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
        <div>
          <span className="font-bold">Officer Verification Protocol:</span> Every startup proposal must be verified against the official Startup India DPIIT portal and MCA portal before technical evaluation. Approving an application automatically clears it for technical jury review.
        </div>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
          <Input
            placeholder="Search startup name, DPIIT No, App ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>

        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={[
            { value: 'All', label: 'All Queue Items' },
            { value: 'Pending', label: 'Pending Verification Only' },
            { value: 'Documents Missing', label: 'Documents Missing / Clarification' },
            { value: 'Verified', label: 'Verified & Approved' },
            { value: 'Rejected', label: 'Rejected' }
          ]}
          className="text-xs"
        />
      </div>

      {/* Verification Queue Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xs">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-28">App ID</TableHead>
              <TableHead>Startup & DPIIT Reg</TableHead>
              <TableHead>Targeted Challenge</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Uploaded Documents</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Officer Verification Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQueue.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-zinc-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <ShieldCheck className="w-8 h-8 text-emerald-500" />
                    <p className="font-semibold">Queue is clear</p>
                    <p className="text-xs text-zinc-400">All pending startup applications have been verified or no records match your filter.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredQueue.map((item) => (
                <TableRow key={item.appId} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40">
                  <TableCell className="font-mono text-xs font-bold text-zinc-600 dark:text-zinc-400">
                    {item.appId}
                  </TableCell>
                  <TableCell>
                    <div className="font-bold text-zinc-900 dark:text-white text-sm">
                      {item.startupName}
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                      {item.dpiitNo} • Incorp: {item.incorporationDate}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 line-clamp-1">
                      {item.problemTitle}
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      CIN: {item.cin}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">
                      {item.submittedDate}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {item.documents.map((doc, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-1.5 py-0.5 rounded"
                        >
                          {doc}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.verificationStatus === 'Verified'
                          ? 'success'
                          : item.verificationStatus === 'Documents Missing'
                          ? 'warning'
                          : item.verificationStatus === 'Rejected'
                          ? 'danger'
                          : 'neutral'
                      }
                      size="sm"
                    >
                      {item.verificationStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => setSelectedItem(item)}
                        className="text-xs text-zinc-700 dark:text-zinc-300"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        Inspect
                      </Button>

                      {item.verificationStatus !== 'Verified' && item.verificationStatus !== 'Rejected' && (
                        <>
                          <Button
                            variant="primary"
                            size="xs"
                            onClick={() => handleApprove(item.appId)}
                            className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                          >
                            <CheckCircle className="w-3.5 h-3.5 mr-1" />
                            Verify & Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="xs"
                            onClick={() => handleOpenCorrection(item)}
                            className="text-xs text-amber-700 border-amber-300 hover:bg-amber-50 dark:border-amber-800 dark:text-amber-400"
                          >
                            Request Docs
                          </Button>
                          <Button
                            variant="outline"
                            size="xs"
                            onClick={() => handleOpenReject(item)}
                            className="text-xs text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900/50"
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Inspect Documents & Verification Checklist Modal */}
      {selectedItem && (
        <Modal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          title={`Verification Dossier: ${selectedItem.startupName}`}
          description={`Application ID: ${selectedItem.appId} • DPIIT: ${selectedItem.dpiitNo}`}
          maxWidth="max-w-2xl"
          footer={
            <div className="flex items-center justify-between w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedItem(null)}
              >
                Close
              </Button>
              {selectedItem.verificationStatus !== 'Verified' && selectedItem.verificationStatus !== 'Rejected' && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenCorrection(selectedItem)}
                    className="text-xs text-amber-700 border-amber-300 dark:text-amber-400"
                  >
                    Request Clarification
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleApprove(selectedItem.appId)}
                    className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve Verification
                  </Button>
                </div>
              )}
            </div>
          }
        >
          <div className="space-y-4 text-xs text-zinc-600 dark:text-zinc-300">
            {/* Regulatory Records Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-zinc-50 dark:bg-zinc-800/60 p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">DPIIT Reg</span>
                <span className="font-bold text-zinc-900 dark:text-white font-mono">{selectedItem.dpiitNo}</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">MCA CIN</span>
                <span className="font-bold text-zinc-900 dark:text-white font-mono">{selectedItem.cin}</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Turnover</span>
                <span className="font-bold text-zinc-900 dark:text-white">{selectedItem.turnover || '₹2.4 Cr'}</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Status</span>
                <span className="font-bold text-orange-600">{selectedItem.verificationStatus}</span>
              </div>
            </div>

            {/* Document Inspection Cards */}
            <div>
              <h4 className="font-bold text-zinc-900 dark:text-white text-xs uppercase tracking-wide mb-2">
                Mandatory Uploaded Documents
              </h4>
              <div className="space-y-2">
                {selectedItem.documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-orange-600" />
                      <div>
                        <div className="font-bold text-zinc-900 dark:text-white text-xs">{doc}</div>
                        <div className="text-[11px] text-zinc-400">Digitally signed PDF • Cryptographically sealed</div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => showToast(`Opening preview for ${doc}...`, 'info')}
                      className="text-xs text-orange-600"
                    >
                      <ExternalLink className="w-3.5 h-3.5 mr-1" />
                      Inspect PDF
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Officer Statutory Checklist */}
            <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
              <h4 className="font-bold text-zinc-900 dark:text-white text-xs uppercase tracking-wide">
                Statutory Compliance Checklist (Maharashtra Public Procurement Rule 149)
              </h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklist.dpiit}
                    onChange={(e) => setChecklist({ ...checklist, dpiit: e.target.checked })}
                    className="rounded text-orange-600 focus:ring-orange-500"
                  />
                  Entity verified on Startup India portal; active DPIIT recognition number validated
                </label>
                <label className="flex items-center gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklist.mca}
                    onChange={(e) => setChecklist({ ...checklist, mca: e.target.checked })}
                    className="rounded text-orange-600 focus:ring-orange-500"
                  />
                  Ministry of Corporate Affairs (MCA21) active company status confirmed
                </label>
                <label className="flex items-center gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklist.turnover}
                    onChange={(e) => setChecklist({ ...checklist, turnover: e.target.checked })}
                    className="rounded text-orange-600 focus:ring-orange-500"
                  />
                  Annual turnover within DPIIT threshold (&lt; ₹100 Crore in any preceding financial year)
                </label>
                <label className="flex items-center gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklist.nonBlacklist}
                    onChange={(e) => setChecklist({ ...checklist, nonBlacklist: e.target.checked })}
                    className="rounded text-orange-600 focus:ring-orange-500"
                  />
                  Not debarred or blacklisted by any Central/State Ministry or PSU
                </label>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Request Missing Documents Modal */}
      {isCorrectionModalOpen && correctionApp && (
        <Modal
          isOpen={isCorrectionModalOpen}
          onClose={() => setIsCorrectionModalOpen(false)}
          title={`Request Clarification / Documents: ${correctionApp.startupName}`}
          description={`Issue deficiency memorandum for Application ${correctionApp.appId}`}
          maxWidth="max-w-lg"
          footer={
            <div className="flex items-center justify-end gap-2 w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCorrectionModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSendCorrection}
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                Dispatch Notice to Startup
              </Button>
            </div>
          }
        >
          <div className="space-y-3">
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Specify the exact documents or statutory clarifications required. The applicant will be notified via email and given 7 calendar days to re-upload.
            </p>
            <Textarea
              rows={4}
              value={correctionNote}
              onChange={(e) => setCorrectionNote(e.target.value)}
              className="text-xs"
              placeholder="e.g. Please upload the audited balance sheet for FY 2024-25 and certified partnership deed..."
            />
          </div>
        </Modal>
      )}

      {/* Reject Application Modal */}
      {isRejectModalOpen && rejectApp && (
        <Modal
          isOpen={isRejectModalOpen}
          onClose={() => setIsRejectModalOpen(false)}
          title={`Reject Verification: ${rejectApp.startupName}`}
          description={`Reason for rejecting Application ${rejectApp.appId}`}
          maxWidth="max-w-lg"
          footer={
            <div className="flex items-center justify-end gap-2 w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsRejectModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleConfirmReject}
              >
                Confirm Rejection
              </Button>
            </div>
          }
        >
          <div className="space-y-3">
            <p className="text-xs text-red-600 dark:text-red-400 font-semibold">
              This action will mark the application as ineligible and remove it from the evaluation pipeline.
            </p>
            <Textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="text-xs"
              placeholder="State the statutory grounds for ineligibility..."
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
