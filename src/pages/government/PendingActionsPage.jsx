import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  ListTodo, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileCheck, 
  IndianRupee, 
  Send, 
  Building2, 
  Calendar,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useGovernmentPortal } from '../../context/GovernmentPortalContext';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { Badge } from '../../components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';

export function PendingActionsPage() {
  const navigate = useNavigate();
  const { pendingActions, completeAction, showToast } = useGovernmentPortal();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('pending'); // 'pending', 'all', 'high', 'completed'

  // Action Execution Modal
  const [activeActionModal, setActiveActionModal] = useState(null);
  const [officerNote, setOfficerNote] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const pendingCount = pendingActions.filter(a => a.status === 'Pending').length;

  const filteredActions = useMemo(() => {
    return pendingActions.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.startup.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesTab = true;
      if (activeTab === 'pending') {
        matchesTab = item.status === 'Pending';
      } else if (activeTab === 'high') {
        matchesTab = item.status === 'Pending' && (item.priority === 'High' || item.priority === 'Critical');
      } else if (activeTab === 'completed') {
        matchesTab = item.status === 'Completed';
      }

      return matchesSearch && matchesTab;
    });
  }, [pendingActions, searchQuery, activeTab]);

  const handleOpenActionModal = (action) => {
    setActiveActionModal(action);
    setOfficerNote(`Sanction approved in accordance with Maharashtra State Startup Policy guidelines.`);
    setIsConfirmed(false);
  };

  const handleExecuteAction = (e) => {
    e.preventDefault();
    if (!activeActionModal) return;

    completeAction(activeActionModal.id);
    setActiveActionModal(null);
  };

  const handleQuickComplete = (actionId) => {
    completeAction(actionId);
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'Critical':
        return <Badge variant="danger" size="sm">CRITICAL</Badge>;
      case 'High':
        return <Badge variant="danger" size="sm">HIGH</Badge>;
      case 'Medium':
        return <Badge variant="warning" size="sm">MEDIUM</Badge>;
      default:
        return <Badge variant="neutral" size="sm">{priority}</Badge>;
    }
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
              Officer Decision Inbox
            </span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
              Pending Actions
            </h1>
            <Badge variant="warning" size="md">
              {pendingCount} Awaiting Authorization
            </Badge>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Official departmental approvals, grant tranche authorizations, and sandbox MoUs awaiting your nodal signature.
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
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-xl">
          {[
            { id: 'pending', label: `Pending (${pendingCount})` },
            { id: 'high', label: 'Critical / High Priority' },
            { id: 'completed', label: `Completed (${pendingActions.filter(a => a.status === 'Completed').length})` },
            { id: 'all', label: `All Tasks (${pendingActions.length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
          <Input
            placeholder="Search action, startup, category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>
      </div>

      {/* Actions Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xs">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Action ID</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Action Title & Scope</TableHead>
              <TableHead>Associated Startup / Project</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredActions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12 text-zinc-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                    <p className="font-semibold">No pending actions found</p>
                    <p className="text-xs text-zinc-400">All officer authorizations have been executed or no records match this view.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredActions.map((action) => (
                <TableRow key={action.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40">
                  <TableCell className="font-mono text-xs font-bold text-zinc-600 dark:text-zinc-400">
                    {action.id}
                  </TableCell>
                  <TableCell>
                    {getPriorityBadge(action.priority)}
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="font-bold text-zinc-900 dark:text-white text-sm">
                      {action.title}
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                      {action.description || 'Departmental sanction review required.'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                      {action.startup}
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      {action.department || 'Govt. of Maharashtra'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                      {action.category}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                      {action.dueDate}
                    </div>
                    {action.isOverdue && (
                      <span className="text-[10px] text-red-600 font-bold block">Overdue</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={action.status === 'Completed' ? 'success' : 'warning'} size="sm">
                      {action.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {action.status === 'Pending' ? (
                        <>
                          <Button
                            variant="primary"
                            size="xs"
                            onClick={() => handleOpenActionModal(action)}
                            className="text-xs bg-orange-600 hover:bg-orange-700 text-white font-bold"
                          >
                            <FileCheck className="w-3.5 h-3.5 mr-1" />
                            Authorize
                          </Button>
                          <Button
                            variant="outline"
                            size="xs"
                            onClick={() => handleQuickComplete(action.id)}
                            className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-emerald-600"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                            Done
                          </Button>
                        </>
                      ) : (
                        <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 justify-end">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Signed
                        </span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Authorize & Execute Action Modal */}
      {activeActionModal && (
        <Modal
          isOpen={!!activeActionModal}
          onClose={() => setActiveActionModal(null)}
          title={`Officer Authorization: ${activeActionModal.title}`}
          description={`Action ID: ${activeActionModal.id} • Beneficiary: ${activeActionModal.startup}`}
          maxWidth="max-w-lg"
          footer={
            <div className="flex items-center justify-end gap-2 w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveActionModal(null)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleExecuteAction}
                disabled={!isConfirmed}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold flex items-center gap-1.5"
              >
                <FileCheck className="w-4 h-4" />
                Sign & Execute Order
              </Button>
            </div>
          }
        >
          <form onSubmit={handleExecuteAction} className="space-y-4 text-xs">
            <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-zinc-400 uppercase font-bold">Category</span>
                <span className="font-bold text-zinc-900 dark:text-white">{activeActionModal.category}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-zinc-400 uppercase font-bold">Priority Rating</span>
                <span>{getPriorityBadge(activeActionModal.priority)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-zinc-400 uppercase font-bold">SLA Due Date</span>
                <span className="font-bold text-zinc-900 dark:text-white">{activeActionModal.dueDate}</span>
              </div>
            </div>

            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Executive Sanction Remarks
              </label>
              <Textarea
                rows={3}
                value={officerNote}
                onChange={(e) => setOfficerNote(e.target.value)}
                className="text-xs"
              />
            </div>

            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isConfirmed}
                  onChange={(e) => setIsConfirmed(e.target.checked)}
                  className="mt-0.5 rounded text-orange-600 focus:ring-orange-500"
                />
                <span className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                  I confirm that all milestone proofs, technical evaluations, and statutory eligibility criteria have been verified in compliance with the Maharashtra Public Procurement Manual.
                </span>
              </label>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
