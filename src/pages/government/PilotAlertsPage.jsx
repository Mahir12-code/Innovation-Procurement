import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  WifiOff, 
  ShieldAlert, 
  Send, 
  FileWarning, 
  Building2, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useGovernmentPortal } from '../../context/GovernmentPortalContext';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { Badge } from '../../components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';

export function PilotAlertsPage() {
  const navigate = useNavigate();
  const { pilotAlerts, resolveAlert, showToast } = useGovernmentPortal();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('active'); // 'active', 'all', 'high', 'telemetry', 'milestone'

  // Resolve Alert Modal
  const [resolveModalAlert, setResolveModalAlert] = useState(null);
  const [resolutionNote, setResolutionNote] = useState('');

  const unresolvedCount = pilotAlerts.filter(a => !a.resolved).length;

  const filteredAlerts = useMemo(() => {
    return pilotAlerts.filter((alert) => {
      const matchesSearch =
        alert.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.pilotId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.startup.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.description.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesTab = true;
      if (activeTab === 'active') {
        matchesTab = !alert.resolved;
      } else if (activeTab === 'high') {
        matchesTab = alert.severity === 'High' || alert.severity === 'Critical';
      } else if (activeTab === 'telemetry') {
        matchesTab = alert.type.toLowerCase().includes('telemetry');
      } else if (activeTab === 'milestone') {
        matchesTab = alert.type.toLowerCase().includes('milestone');
      }

      return matchesSearch && matchesTab;
    });
  }, [pilotAlerts, searchQuery, activeTab]);

  const handleOpenResolveModal = (alert) => {
    setResolveModalAlert(alert);
    setResolutionNote('Root cause verified by nodal officer. Startup restored standard operational SLA.');
  };

  const handleConfirmResolve = (e) => {
    e.preventDefault();
    if (!resolveModalAlert) return;

    resolveAlert(resolveModalAlert.id);
    setResolveModalAlert(null);
  };

  const handleSendNotice = (alert) => {
    showToast(`Urgent Cure Notice dispatched to ${alert.startup} for ${alert.id}. 48h SLA response timer activated.`, 'warning');
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'Critical':
        return <Badge variant="danger" size="sm">CRITICAL</Badge>;
      case 'High':
        return <Badge variant="danger" size="sm">HIGH</Badge>;
      case 'Medium':
        return <Badge variant="warning" size="sm">MEDIUM</Badge>;
      default:
        return <Badge variant="neutral" size="sm">{severity}</Badge>;
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
              SLA & Telemetry Watchdesk
            </span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
              Pilot Milestone
            </h1>
            <Badge variant="danger" size="md">
              {unresolvedCount} Active Breaches
            </Badge>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Real-time escalation center monitoring milestone delays, offline sensor telemetry, and statutory testbed SLA compliance.
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
            onClick={() => navigate('/government/pilots')}
            className="flex items-center gap-1.5 shadow-sm"
          >
            View Active Testbeds
          </Button>
        </div>
      </div>

      {/* SLA Alert Banner */}
      {unresolvedCount > 0 ? (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 flex items-start justify-between gap-4 text-xs text-red-900 dark:text-red-300">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
            <div>
              <div className="font-bold text-sm">Escalation Notice: Immediate Nodal Attention Required</div>
              <p className="mt-0.5 text-zinc-600 dark:text-zinc-400">
                {unresolvedCount} testbeds have exceeded permitted SLA tolerance margins. Outstanding alerts block subsequent grant tranche releases.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 flex items-center gap-3 text-xs text-emerald-900 dark:text-emerald-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span className="font-bold">All testbed telemetry lines and milestones are running within nominal SLA bounds.</span>
        </div>
      )}

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-xl">
          {[
            { id: 'active', label: `Active (${unresolvedCount})` },
            { id: 'all', label: `All Alerts (${pilotAlerts.length})` },
            { id: 'high', label: 'High Priority' },
            { id: 'telemetry', label: 'Telemetry Offline' },
            { id: 'milestone', label: 'Milestone Delays' }
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
            placeholder="Search alerts or pilots..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>
      </div>

      {/* Alerts Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xs">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Alert ID</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Pilot & Startup</TableHead>
              <TableHead>Alert Issue & Scope</TableHead>
              <TableHead>Days Overdue</TableHead>
              <TableHead>Nodal Officer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAlerts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12 text-zinc-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                    <p className="font-semibold">No alerts found for this filter</p>
                    <p className="text-xs text-zinc-400">Great job! All operational SLAs and milestones are on track.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredAlerts.map((alert) => (
                <TableRow key={alert.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40">
                  <TableCell className="font-mono text-xs font-bold text-zinc-600 dark:text-zinc-400">
                    {alert.id}
                  </TableCell>
                  <TableCell>
                    {getSeverityBadge(alert.severity)}
                  </TableCell>
                  <TableCell>
                    <div className="font-bold text-zinc-900 dark:text-white text-sm">
                      {alert.startup}
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                      {alert.pilotId} • {alert.department}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-md">
                    <div className="font-bold text-zinc-800 dark:text-zinc-200 text-xs">
                      {alert.type}
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      {alert.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-xs font-bold text-red-600 dark:text-red-400">
                      {alert.daysOverdue || '3 days'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs text-zinc-700 dark:text-zinc-300">
                      {alert.officer || 'Shri S. Kulkarni'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={alert.resolved ? 'success' : 'danger'} size="sm">
                      {alert.resolved ? 'Resolved' : 'Active'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {!alert.resolved ? (
                        <>
                          <Button
                            variant="primary"
                            size="xs"
                            onClick={() => handleOpenResolveModal(alert)}
                            className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                            Resolve
                          </Button>
                          <Button
                            variant="outline"
                            size="xs"
                            onClick={() => handleSendNotice(alert)}
                            className="text-xs text-orange-600 border-orange-200 hover:bg-orange-50 dark:border-orange-900/50"
                          >
                            <Send className="w-3.5 h-3.5 mr-1" />
                            Notice
                          </Button>
                        </>
                      ) : (
                        <span className="text-xs text-emerald-600 font-bold">Closed</span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Resolve Alert Modal */}
      {resolveModalAlert && (
        <Modal
          isOpen={!!resolveModalAlert}
          onClose={() => setResolveModalAlert(null)}
          title={`Resolve SLA Alert: ${resolveModalAlert.id}`}
          description={`Startup: ${resolveModalAlert.startup} (${resolveModalAlert.pilotId})`}
          maxWidth="max-w-lg"
          footer={
            <div className="flex items-center justify-end gap-2 w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setResolveModalAlert(null)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleConfirmResolve}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
              >
                Confirm Resolution
              </Button>
            </div>
          }
        >
          <form onSubmit={handleConfirmResolve} className="space-y-3 text-xs">
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <span className="font-bold text-zinc-900 dark:text-white block">{resolveModalAlert.type}</span>
              <p className="text-zinc-500 mt-1">{resolveModalAlert.description}</p>
            </div>

            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Resolution Action & Nodal Officer Justification *
              </label>
              <Textarea
                rows={3}
                value={resolutionNote}
                onChange={(e) => setResolutionNote(e.target.value)}
                required
                className="text-xs"
                placeholder="Explain the remedy applied or milestone verification report received..."
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
