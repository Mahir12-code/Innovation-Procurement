import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  Sliders,
  Users,
  ShieldCheck,
  Cpu,
  Bell,
  Save,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  KeyRound,
  ExternalLink,
  RefreshCw,
  Clock,
  Lock,
  FileCheck,
  Check,
  HelpCircle,
  Laptop
} from 'lucide-react';
import { useGovernmentPortal } from '../../context/GovernmentPortalContext';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { Badge } from '../../components/ui/Badge';

export function GovernmentSettingsPage() {
  const navigate = useNavigate();
  const { showToast } = useGovernmentPortal();

  // Active Tab
  const [activeTab, setActiveTab] = useState('department');

  // Tab 1: Department Profile State
  const [departmentData, setDepartmentData] = useState({
    departmentName: 'Urban Development & Smart Cities Mission',
    stateGov: 'Government of Maharashtra',
    nodalOfficerName: 'Dr. Rajesh Sharma',
    designation: 'Nodal Procurement Lead & Director of Innovation',
    nicEmail: 'rajesh.sharma@gov.in',
    phone: '+91 22 2202 4581',
    officeAddress: 'Room 412, 4th Floor, Mantralaya Annex, Madam Cama Road, Nariman Point, Mumbai - 400032',
    officialPortalUrl: 'https://urban.maharashtra.gov.in',
    nodalCellId: 'MH-UDD-INNOV-2026'
  });

  // Tab 2: Procurement & Pilot Thresholds State
  const [thresholds, setThresholds] = useState({
    maxPilotGrant: '5000000', // ₹50 Lakhs
    fastTrackSanctionLimit: '10000000', // ₹1 Crore
    tranche1Ratio: '30', // % Advance on Sandbox Agreement
    tranche2Ratio: '40', // % on IoT/Field Deployment
    tranche3Ratio: '30', // % on STQC Third-Party Validation
    maxPilotDurationMonths: '6',
    minJuryPanelSize: '3',
    turnoverExemptionActive: true,
    priorExperienceWaiver: true,
    autoGeMListingEligible: true,
    escrowAutoRelease: false
  });

  // Tab 3: Team & RBAC Officers
  const [officers, setOfficers] = useState([
    {
      id: 'OFF-01',
      name: 'Dr. Rajesh Sharma',
      designation: 'Nodal Procurement Lead',
      email: 'rajesh.sharma@gov.in',
      role: 'Super Admin / Nodal Officer',
      status: 'Active',
      permissions: 'Full RFP, Evaluation & Payout Authority'
    },
    {
      id: 'OFF-02',
      name: 'Shri Anand Kulkarni, IAS',
      designation: 'Principal Secretary',
      email: 'sec.udd@maharashtra.gov.in',
      role: 'Sanction Authority',
      status: 'Active',
      permissions: 'Commercial Purchase Orders & Cabinet Sanctions'
    },
    {
      id: 'OFF-03',
      name: 'Prof. K. Venkatesh',
      designation: 'Chief Technical Evaluator (IIT Bombay)',
      email: 'k.venkatesh@ee.iitb.ac.in',
      role: 'Technical Jury Lead',
      status: 'Active',
      permissions: 'Jury Scoring, TRL Gate Verification'
    },
    {
      id: 'OFF-04',
      name: 'Dr. S. M. Gaikwad',
      designation: 'Director of Field Validations',
      email: 'sm.gaikwad@health.gov.in',
      role: 'Field Sandbox Officer',
      status: 'Active',
      permissions: 'IoT Telemetry Audits & On-Site Sandbox Approvals'
    },
    {
      id: 'OFF-05',
      name: 'Smt. Meera Joshi',
      designation: 'Finance Desk Undersecretary',
      email: 'finance.innov@maharashtra.gov.in',
      role: 'Escrow Finance Officer',
      status: 'Active',
      permissions: 'PFMS Tranche Verification & Escrow Releases'
    }
  ]);

  // Modal: Add Officer
  const [isAddOfficerModalOpen, setIsAddOfficerModalOpen] = useState(false);
  const [newOfficer, setNewOfficer] = useState({
    name: '',
    designation: '',
    email: '',
    role: 'Technical Evaluator'
  });

  // Tab 4: Security & DSC e-Sign State
  const [securitySettings, setSecuritySettings] = useState({
    enforceMfa: true,
    requireClass3Dsc: true,
    sessionTimeoutMinutes: '15',
    ipRestricted: true,
    allowedSubnet: '10.124.0.0/16 (Mantralaya Government WAN)',
    dscSerial: 'MH-NIC-8824-A (e-Mudhra Class 3)',
    dscExpiry: '14 Nov 2027',
    dscStatus: 'Valid & Connected'
  });
  const [isTestingDsc, setIsTestingDsc] = useState(false);
  const [dscTestModal, setDscTestModal] = useState(false);

  // Tab 5: External Integrations State
  const [integrations, setIntegrations] = useState([
    {
      id: 'gem',
      name: 'GeM (Government e-Marketplace)',
      category: 'Public Procurement & Direct Sanction',
      status: 'Connected',
      version: 'API v3.4 (REST)',
      lastSync: '5 mins ago',
      pingMs: 42
    },
    {
      id: 'pfms',
      name: 'PFMS (Public Financial Management System)',
      category: 'Direct Benefit Transfer & Escrow Payouts',
      status: 'Connected',
      version: 'NIC Gateway v2.8',
      lastSync: '12 mins ago',
      pingMs: 88
    },
    {
      id: 'dpiit',
      name: 'DPIIT Startup India Registry',
      category: 'Startup Recognition & Turnover Exemption',
      status: 'Connected',
      version: 'DPIIT OpenAPI 2026',
      lastSync: '1 min ago',
      pingMs: 35
    },
    {
      id: 'sso',
      name: 'Aaple Sarkar / MahaOnline SSO',
      category: 'Officer Single Sign-On & MeriPehchan',
      status: 'Connected',
      version: 'SAML 2.0 / OAuth2',
      lastSync: 'Just now',
      pingMs: 29
    }
  ]);
  const [pingingId, setPingingId] = useState(null);

  // Tab 6: Notification Rules
  const [notificationRules, setNotificationRules] = useState({
    notifyOnNewApplication: true,
    notifyOnMilestoneDue: true,
    notifyOnTelemetryDrop: true,
    notifyOnEscrowReleaseReq: true,
    notifyDailyDigest: true,
    channelEmail: true,
    channelSms: true,
    channelWhatsAppGov: false
  });

  // Handle Save Feedback
  const handleSaveSettings = (sectionName) => {
    showToast(`${sectionName} configurations saved successfully!`, 'success');
  };

  // Add Officer Submit
  const handleAddOfficerSubmit = (e) => {
    e.preventDefault();
    if (!newOfficer.name.trim() || !newOfficer.email.trim()) {
      showToast('Please provide officer name and official government email', 'error');
      return;
    }
    const created = {
      id: `OFF-0${officers.length + 1}`,
      name: newOfficer.name,
      designation: newOfficer.designation || 'Special Invitee Evaluator',
      email: newOfficer.email,
      role: newOfficer.role,
      status: 'Active',
      permissions:
        newOfficer.role === 'Sanction Authority'
          ? 'Commercial Sanctions & High-Value Approvals'
          : 'Proposal Review & Jury Scoring'
    };
    setOfficers([...officers, created]);
    setIsAddOfficerModalOpen(false);
    setNewOfficer({ name: '', designation: '', email: '', role: 'Technical Evaluator' });
    showToast(`Officer ${created.name} added to department roster`, 'success');
  };

  // Toggle Officer Status
  const handleToggleOfficerStatus = (id) => {
    setOfficers(
      officers.map((off) =>
        off.id === id ? { ...off, status: off.status === 'Active' ? 'Suspended' : 'Active' } : off
      )
    );
    showToast('Officer status updated', 'success');
  };

  // Remove Officer
  const handleRemoveOfficer = (id, name) => {
    setOfficers(officers.filter((off) => off.id !== id));
    showToast(`Officer ${name} removed from roster`, 'success');
  };

  // Test DSC Token Action
  const handleTestDsc = () => {
    setIsTestingDsc(true);
    setTimeout(() => {
      setIsTestingDsc(false);
      setDscTestModal(true);
    }, 1200);
  };

  // Test Integration Ping
  const handleTestIntegration = (id) => {
    setPingingId(id);
    setTimeout(() => {
      setPingingId(null);
      setIntegrations((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, pingMs: Math.floor(Math.random() * 40) + 25, lastSync: 'Just now' } : item
        )
      );
      showToast(`Integration bridge to ${id.toUpperCase()} verified with 100% packet delivery`, 'success');
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-16 max-w-7xl mx-auto">
      {/* -------------------------------------------------- */}
      {/* 1. TOP HEADER & BREADCRUMB */}
      {/* -------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/government/dashboard')}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              title="Return to Government Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold text-zinc-400">Sarkar Setu / Government</span>
            <span className="text-xs text-zinc-400">/</span>
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400">Settings & Permissions</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight">
              Department Settings & Permissions
            </h1>
            <Badge variant="warning" className="text-[10px] font-black uppercase tracking-wider">
              Nodal Admin
            </Badge>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Configure department parameters, procurement authorization ceilings, DSC e-sign security, and API integrations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/government/dashboard')}
            className="text-xs"
          >
            Dashboard
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleSaveSettings('All active')}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
          >
            <Save className="w-3.5 h-3.5" />
            Save All Changes
          </Button>
        </div>
      </div>

      {/* -------------------------------------------------- */}
      {/* 2. NAVIGATION TABS */}
      {/* -------------------------------------------------- */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-zinc-200 dark:border-zinc-800 no-scrollbar">
        {[
          { id: 'department', label: 'Department & Office', icon: Building2 },
          { id: 'thresholds', label: 'Procurement Thresholds', icon: Sliders },
          { id: 'team', label: 'Team & RBAC Roles', icon: Users, badge: officers.length },
          { id: 'security', label: 'Security & e-Sign (DSC)', icon: ShieldCheck },
          { id: 'integrations', label: 'System Integrations', icon: Cpu, badge: '4 Active' },
          { id: 'notifications', label: 'Notification Rules', icon: Bell }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:text-zinc-950 dark:hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* -------------------------------------------------- */}
      {/* TAB 1: DEPARTMENT & OFFICE PROFILE */}
      {/* -------------------------------------------------- */}
      {activeTab === 'department' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
              <div>
                <h2 className="text-base font-bold text-zinc-950 dark:text-white">
                  Nodal Department Profile & Official Credentials
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Official administrative parameters recognized by Government of Maharashtra & DPIIT.
                </p>
              </div>
              <Badge variant="success" className="text-xs font-semibold">
                NIC Verified Official Cell
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Department / Mission Name *
                </label>
                <Input
                  value={departmentData.departmentName}
                  onChange={(e) => setDepartmentData({ ...departmentData, departmentName: e.target.value })}
                  className="text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  State / Union Territory *
                </label>
                <Input
                  value={departmentData.stateGov}
                  disabled
                  className="text-xs bg-zinc-100 dark:bg-zinc-800 cursor-not-allowed text-zinc-500"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Nodal Procurement Lead *
                </label>
                <Input
                  value={departmentData.nodalOfficerName}
                  onChange={(e) => setDepartmentData({ ...departmentData, nodalOfficerName: e.target.value })}
                  className="text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Official Designation *
                </label>
                <Input
                  value={departmentData.designation}
                  onChange={(e) => setDepartmentData({ ...departmentData, designation: e.target.value })}
                  className="text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Verified NIC Email ID *
                </label>
                <Input
                  type="email"
                  value={departmentData.nicEmail}
                  onChange={(e) => setDepartmentData({ ...departmentData, nicEmail: e.target.value })}
                  className="text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Official Office Landline / Ext
                </label>
                <Input
                  value={departmentData.phone}
                  onChange={(e) => setDepartmentData({ ...departmentData, phone: e.target.value })}
                  className="text-xs font-mono"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Office Physical Address (for Sandbox Site Inspections) *
                </label>
                <Textarea
                  rows={2}
                  value={departmentData.officeAddress}
                  onChange={(e) => setDepartmentData({ ...departmentData, officeAddress: e.target.value })}
                  className="text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Department Innovation Portal URL
                </label>
                <Input
                  value={departmentData.officialPortalUrl}
                  onChange={(e) => setDepartmentData({ ...departmentData, officialPortalUrl: e.target.value })}
                  className="text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Sarkar Setu Nodal Cell Code
                </label>
                <Input
                  value={departmentData.nodalCellId}
                  disabled
                  className="text-xs font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleSaveSettings('Department Profile')}
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs"
              >
                Save Profile Details
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------- */}
      {/* TAB 2: PROCUREMENT & PILOT THRESHOLDS */}
      {/* -------------------------------------------------- */}
      {activeTab === 'thresholds' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
              <div>
                <h2 className="text-base font-bold text-zinc-950 dark:text-white">
                  Public Procurement & Sandbox Grant Thresholds
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Configure statutory authorization caps as per Maharashtra Public Procurement & DPIIT Startup Directives.
                </p>
              </div>
              <Badge variant="neutral" className="text-xs font-semibold">
                Rule 170(i) Compliant
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-1.5 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/80">
                <label className="block font-bold text-zinc-900 dark:text-zinc-100">
                  Maximum Single Pilot Grant Ceiling (₹)
                </label>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Maximum grant authorized for one startup sandbox pilot without Cabinet Committee clearance.
                </p>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-2.5 text-zinc-400 font-bold">₹</span>
                  <Input
                    type="number"
                    value={thresholds.maxPilotGrant}
                    onChange={(e) => setThresholds({ ...thresholds, maxPilotGrant: e.target.value })}
                    className="pl-8 text-xs font-semibold"
                  />
                </div>
                <span className="text-[10px] text-orange-600 dark:text-orange-400 font-semibold block mt-1">
                  Currently: ₹50,00,000 (Fifty Lakhs INR)
                </span>
              </div>

              <div className="space-y-1.5 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/80">
                <label className="block font-bold text-zinc-900 dark:text-zinc-100">
                  Fast-Track Commercial Sanction Ceiling (₹)
                </label>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Post-pilot commercial purchase orders up to this amount bypass traditional open RFP tendering.
                </p>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-2.5 text-zinc-400 font-bold">₹</span>
                  <Input
                    type="number"
                    value={thresholds.fastTrackSanctionLimit}
                    onChange={(e) => setThresholds({ ...thresholds, fastTrackSanctionLimit: e.target.value })}
                    className="pl-8 text-xs font-semibold"
                  />
                </div>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block mt-1">
                  Currently: ₹1,00,00,000 (One Crore INR)
                </span>
              </div>
            </div>

            {/* Tranche Formula */}
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3">
              <h3 className="font-bold text-zinc-900 dark:text-white text-xs">
                Standard Pilot Milestone Tranche Disbursal Ratio (%)
              </h3>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Total must sum to 100%. Disbursals are released automatically through PFMS linked escrow upon milestone signoff.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                    Tranche 1: Sandbox Agreement
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Input
                      type="number"
                      value={thresholds.tranche1Ratio}
                      onChange={(e) => setThresholds({ ...thresholds, tranche1Ratio: e.target.value })}
                      className="text-xs"
                    />
                    <span className="text-zinc-500 font-bold">%</span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                    Tranche 2: Field Deployment
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Input
                      type="number"
                      value={thresholds.tranche2Ratio}
                      onChange={(e) => setThresholds({ ...thresholds, tranche2Ratio: e.target.value })}
                      className="text-xs"
                    />
                    <span className="text-zinc-500 font-bold">%</span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                    Tranche 3: STQC Acceptance
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Input
                      type="number"
                      value={thresholds.tranche3Ratio}
                      onChange={(e) => setThresholds({ ...thresholds, tranche3Ratio: e.target.value })}
                      className="text-xs"
                    />
                    <span className="text-zinc-500 font-bold">%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Regulatory Exemption Toggles */}
            <div className="space-y-3 pt-2">
              <h3 className="font-bold text-zinc-900 dark:text-white text-xs">
                Startup Regulatory Exemption Rules (Maharashtra & DPIIT)
              </h3>
              <div className="space-y-2">
                {[
                  {
                    key: 'turnoverExemptionActive',
                    title: 'Waiver of Prior Turnover Requirement (DPIIT Rule 170)',
                    desc: 'Allow registered Indian startups under 10 years old to bid regardless of prior annual audited revenues.'
                  },
                  {
                    key: 'priorExperienceWaiver',
                    title: 'Waiver of Prior Public Sector Experience Requirement',
                    desc: 'Allow innovative startups with TRL 6+ prototypes to pilot solutions without demanding past government contracts.'
                  },
                  {
                    key: 'autoGeMListingEligible',
                    title: 'Automatic GeM Direct Catalog Listing on Pilot Success',
                    desc: 'Issue official government acceptance certificate that qualifies product directly for single-source onboarding on GeM.'
                  }
                ].map((item) => (
                  <label
                    key={item.key}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-800 cursor-pointer hover:bg-zinc-100/70 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={thresholds[item.key]}
                      onChange={(e) => setThresholds({ ...thresholds, [item.key]: e.target.checked })}
                      className="mt-0.5 rounded text-orange-600 focus:ring-orange-500 w-4 h-4"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-zinc-900 dark:text-zinc-100 block">{item.title}</span>
                      <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 block">{item.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleSaveSettings('Procurement Thresholds')}
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs"
              >
                Save Threshold Rules
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------- */}
      {/* TAB 3: TEAM & RBAC ROLES */}
      {/* -------------------------------------------------- */}
      {activeTab === 'team' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
              <div>
                <h2 className="text-base font-bold text-zinc-950 dark:text-white">
                  Department Nodal Team & RBAC Permissions
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Authorized officers, technical jury panels, and finance signatories managing Sarkar Setu.
                </p>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsAddOfficerModalOpen(true)}
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center gap-1.5 shrink-0"
              >
                <Plus className="w-4 h-4" />
                Add Nodal Officer
              </Button>
            </div>

            {/* Officers Table */}
            <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-zinc-800/60 border-b border-zinc-200 dark:border-zinc-800 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    <th className="py-3 px-4">Officer Name & Designation</th>
                    <th className="py-3 px-4">Official Gov Email</th>
                    <th className="py-3 px-4">Assigned Role</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {officers.map((officer) => (
                    <tr key={officer.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-zinc-900 dark:text-zinc-100">{officer.name}</div>
                        <div className="text-[11px] text-zinc-500 dark:text-zinc-400">{officer.designation}</div>
                        <div className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">
                          {officer.permissions}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-zinc-700 dark:text-zinc-300">
                        {officer.email}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800/80">
                          {officer.role}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            officer.status === 'Active'
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                              : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                          }`}
                        >
                          {officer.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => handleToggleOfficerStatus(officer.id)}
                          className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors cursor-pointer"
                        >
                          {officer.status === 'Active' ? 'Suspend' : 'Activate'}
                        </button>
                        {officer.id !== 'OFF-01' && (
                          <button
                            onClick={() => handleRemoveOfficer(officer.id, officer.name)}
                            className="text-[11px] font-semibold text-red-600 dark:text-red-400 hover:underline transition-colors cursor-pointer"
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------- */}
      {/* TAB 4: SECURITY & e-SIGN (DSC) */}
      {/* -------------------------------------------------- */}
      {activeTab === 'security' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
              <div>
                <h2 className="text-base font-bold text-zinc-950 dark:text-white">
                  Government e-Sign (Class 3 DSC) & Cybersecurity Policies
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Cryptographic verification tokens and compliance guidelines for digital sanctions.
                </p>
              </div>
              <Badge variant="success" className="text-xs font-semibold">
                STQC Certified
              </Badge>
            </div>

            {/* DSC Token Status Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-zinc-50 to-orange-50/30 dark:from-zinc-800/60 dark:to-orange-950/20 border border-orange-200/60 dark:border-zinc-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <KeyRound className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-zinc-900 dark:text-white text-sm">
                      {securitySettings.dscSerial}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-0.5">
                    Registered to: <span className="font-semibold">{departmentData.nodalOfficerName}</span> • Valid until {securitySettings.dscExpiry}
                  </p>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    Used for automated hashing and legally binding e-Sign on pilot grant escrow releases.
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleTestDsc}
                disabled={isTestingDsc}
                className="text-xs font-bold shrink-0 flex items-center gap-2 border-orange-300 dark:border-orange-800 text-orange-700 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-950/40"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isTestingDsc ? 'animate-spin' : ''}`} />
                {isTestingDsc ? 'Checking USB Token...' : 'Test e-Sign Token'}
              </Button>
            </div>

            {/* Security Toggles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-zinc-900 dark:text-white">
                    Enforce MeriPehchan / Aadhaar 2FA
                  </span>
                  <input
                    type="checkbox"
                    checked={securitySettings.enforceMfa}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, enforceMfa: e.target.checked })}
                    className="rounded text-orange-600 focus:ring-orange-500 w-4 h-4 cursor-pointer"
                  />
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Mandate OTP verification via registered mobile/Aadhaar on all grant approvals and pilot disbursements.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-zinc-900 dark:text-white">
                    Mandatory Class 3 DSC for Purchase Orders
                  </span>
                  <input
                    type="checkbox"
                    checked={securitySettings.requireClass3Dsc}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, requireClass3Dsc: e.target.checked })}
                    className="rounded text-orange-600 focus:ring-orange-500 w-4 h-4 cursor-pointer"
                  />
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Block scale-up commercial sanction without cryptographically signed digital token.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <label className="block font-bold text-zinc-900 dark:text-white">
                  Idle Session Logout Timeout (Minutes)
                </label>
                <Select
                  value={securitySettings.sessionTimeoutMinutes}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeoutMinutes: e.target.value })}
                  options={[
                    { value: '10', label: '10 Minutes (Strict Gov)' },
                    { value: '15', label: '15 Minutes (Recommended)' },
                    { value: '30', label: '30 Minutes' },
                    { value: '60', label: '60 Minutes' }
                  ]}
                  className="text-xs"
                />
                <span className="text-[10px] text-zinc-400">Automated lock as per CERT-In guidelines</span>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <label className="block font-bold text-zinc-900 dark:text-white">
                  Mantralaya WAN IP Whitelist Gateway
                </label>
                <Input
                  value={securitySettings.allowedSubnet}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, allowedSubnet: e.target.value })}
                  className="text-xs font-mono"
                />
                <span className="text-[10px] text-zinc-400">Restricts high-value pilot actions to secure government networks</span>
              </div>
            </div>

            <div className="flex items-center justify-end pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleSaveSettings('Security Parameters')}
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs"
              >
                Save Security Settings
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------- */}
      {/* TAB 5: SYSTEM INTEGRATIONS */}
      {/* -------------------------------------------------- */}
      {activeTab === 'integrations' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
              <div>
                <h2 className="text-base font-bold text-zinc-950 dark:text-white">
                  Government Digital Infrastructure & API Bridges
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Real-time connectivity to national procurement registries, treasury escrow, and startup databases.
                </p>
              </div>
              <Badge variant="success" className="text-xs font-semibold">
                All 4 Systems Online
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {integrations.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-zinc-950 dark:text-white text-xs">{item.name}</h3>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">{item.category}</p>
                    </div>
                    <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {item.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                    <span>Protocol: {item.version}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">Latency: {item.pingMs}ms</span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-zinc-400">Synced: {item.lastSync}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTestIntegration(item.id)}
                      disabled={pingingId === item.id}
                      className="text-[11px] h-7 px-2.5 flex items-center gap-1.5"
                    >
                      <RefreshCw className={`w-3 h-3 ${pingingId === item.id ? 'animate-spin' : ''}`} />
                      {pingingId === item.id ? 'Pinging...' : 'Test Connection'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-orange-50/40 dark:bg-zinc-800/30 border border-orange-200/60 dark:border-zinc-700/60 flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-zinc-900 dark:text-white block">
                  Automated GeM Scale-Up Pipeline
                </span>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-0.5">
                  When a startup successfully passes STQC evaluation on Sarkar Setu, this integration pushes product specifications directly into the GeM Direct Purchase catalogue for pan-India municipal acquisition.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------- */}
      {/* TAB 6: NOTIFICATION RULES */}
      {/* -------------------------------------------------- */}
      {activeTab === 'notifications' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
              <div>
                <h2 className="text-base font-bold text-zinc-950 dark:text-white">
                  Automated Event Triggers & Alert Dispatch Rules
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Manage real-time notifications sent to nodal officers and jury members.
                </p>
              </div>
              <Badge variant="neutral" className="text-xs font-semibold">
                Gov-Mail & SMS Gateway
              </Badge>
            </div>

            <div className="space-y-3">
              {[
                {
                  key: 'notifyOnNewApplication',
                  title: 'New Startup RFP Proposal Received',
                  desc: 'Instant dispatch when a verified DPIIT startup submits a bid for active department problem statements.'
                },
                {
                  key: 'notifyOnMilestoneDue',
                  title: 'Sandbox Pilot Milestone Due Alerts (T-3 Days)',
                  desc: 'Alert nodal officer and field engineer 72 hours before a pilot deployment phase deadline expires.'
                },
                {
                  key: 'notifyOnTelemetryDrop',
                  title: 'IoT Telemetry Drop Below 90% Uptime',
                  desc: 'Immediate emergency alert if field sensors or telemetry gateways in pilot sites experience connection blackout.'
                },
                {
                  key: 'notifyOnEscrowReleaseReq',
                  title: 'Escrow Tranche Payout Claims Submitted',
                  desc: 'Notify Finance Desk and Nodal Lead when startup claims milestone completion with proof documents.'
                },
                {
                  key: 'notifyDailyDigest',
                  title: 'Daily Morning Executive Digest (08:30 AM IST)',
                  desc: 'Consolidated briefing email with new applications, pending verifications, and active pilot milestones.'
                }
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 cursor-pointer hover:bg-zinc-100/60 dark:hover:bg-zinc-800 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={notificationRules[item.key]}
                    onChange={(e) =>
                      setNotificationRules({ ...notificationRules, [item.key]: e.target.checked })
                    }
                    className="mt-0.5 rounded text-orange-600 focus:ring-orange-500 w-4 h-4"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-zinc-900 dark:text-zinc-100 block">{item.title}</span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 block">{item.desc}</span>
                  </div>
                </label>
              ))}
            </div>

            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <h3 className="font-bold text-zinc-900 dark:text-white text-xs mb-2">
                Active Notification Channels
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {[
                  { key: 'channelEmail', label: 'Official NIC Email (@gov.in)' },
                  { key: 'channelSms', label: 'National Mobile SMS Gateway' },
                  { key: 'channelWhatsAppGov', label: 'MahaGov WhatsApp Bot' }
                ].map((channel) => (
                  <label
                    key={channel.key}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={notificationRules[channel.key]}
                      onChange={(e) =>
                        setNotificationRules({ ...notificationRules, [channel.key]: e.target.checked })
                      }
                      className="rounded text-orange-600 focus:ring-orange-500 w-4 h-4"
                    />
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200 text-xs">
                      {channel.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleSaveSettings('Notification Rules')}
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs"
              >
                Save Notification Rules
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------- */}
      {/* MODAL 1: ADD NODAL OFFICER */}
      {/* -------------------------------------------------- */}
      {isAddOfficerModalOpen && (
        <Modal
          isOpen={isAddOfficerModalOpen}
          onClose={() => setIsAddOfficerModalOpen(false)}
          title="Add Nodal Officer or Evaluator"
          description="Grant administrative, jury, or financial oversight access on Sarkar Setu."
          maxWidth="max-w-md"
          footer={
            <div className="flex items-center justify-end gap-2 w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAddOfficerModalOpen(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleAddOfficerSubmit}
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs"
              >
                Grant Access
              </Button>
            </div>
          }
        >
          <form onSubmit={handleAddOfficerSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Full Name *
              </label>
              <Input
                placeholder="e.g. Smt. Radhika Nair"
                value={newOfficer.name}
                onChange={(e) => setNewOfficer({ ...newOfficer, name: e.target.value })}
                required
                className="text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Official Designation *
              </label>
              <Input
                placeholder="e.g. Joint Secretary / Technical Member"
                value={newOfficer.designation}
                onChange={(e) => setNewOfficer({ ...newOfficer, designation: e.target.value })}
                required
                className="text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Official Government / University Email *
              </label>
              <Input
                type="email"
                placeholder="e.g. radhika.nair@gov.in"
                value={newOfficer.email}
                onChange={(e) => setNewOfficer({ ...newOfficer, email: e.target.value })}
                required
                className="text-xs font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Assigned Role & Permissions *
              </label>
              <Select
                value={newOfficer.role}
                onChange={(e) => setNewOfficer({ ...newOfficer, role: e.target.value })}
                options={[
                  { value: 'Technical Evaluator', label: 'Technical Jury (Proposal Scoring)' },
                  { value: 'Field Sandbox Officer', label: 'Field Sandbox Officer (IoT & Telemetry)' },
                  { value: 'Finance Desk Officer', label: 'Finance Desk (Escrow & PFMS)' },
                  { value: 'Sanction Authority', label: 'Sanction Authority (Purchase Orders)' }
                ]}
                className="text-xs"
              />
            </div>
          </form>
        </Modal>
      )}

      {/* -------------------------------------------------- */}
      {/* MODAL 2: DSC TOKEN VERIFICATION SUCCESS */}
      {/* -------------------------------------------------- */}
      {dscTestModal && (
        <Modal
          isOpen={dscTestModal}
          onClose={() => setDscTestModal(false)}
          title="Class 3 DSC Cryptographic Diagnostic"
          description="e-Mudhra / NIC Digital Signature Token Verification Log"
          maxWidth="max-w-md"
          footer={
            <Button
              variant="primary"
              size="sm"
              onClick={() => setDscTestModal(false)}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs w-full"
            >
              Done
            </Button>
          }
        >
          <div className="space-y-3.5 text-xs text-zinc-600 dark:text-zinc-300">
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold text-emerald-900 dark:text-emerald-200 block">
                  Hardware Token Operational
                </span>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-300">
                  RSA 2048-bit Key Pair Verified with NIC Root CA.
                </span>
              </div>
            </div>

            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl space-y-1.5 font-mono text-[11px]">
              <div className="flex justify-between">
                <span className="text-zinc-400">Token ID:</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">MH-NIC-8824-A</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Holder:</span>
                <span className="text-zinc-900 dark:text-zinc-100">{departmentData.nodalOfficerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">CA Provider:</span>
                <span className="text-zinc-900 dark:text-zinc-100">CCA India / e-Mudhra</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Validity:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">Until 14 Nov 2027</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
