// Structured dataset for Startup-Side Pilot Sandbox Workspace
// Separated from UI components for clean architecture and future backend integration

export const STARTUP_PILOT_SUMMARY_STATS = {
  activePilotsCount: 1,
  activePilotsSubtitle: 'Currently in progress',
  milestonesCleared: '3 / 5',
  milestonesProgressPercent: 60,
  milestonesSubtitle: '60% overall progress',
  activeKpisCount: 4,
  kpiHealthPercent: 92,
  kpiHealthSubtitle: '92% KPI health',
  budgetDisbursedDisplay: '₹10.5L / ₹35L',
  budgetDisbursedPercent: 30,
  budgetSubtitle: '30% disbursed'
};

export const ACTIVE_STARTUP_PILOT = {
  id: 'PLT-MH-001',
  applicationId: 'APP-2026-081',
  opportunityId: 'OPP-MH-2026-04',
  startupName: 'AquaSense Innovations Pvt Ltd',
  title: 'Smart Canal Acoustic Telemetry Pilot — Mutha Irrigation Corridor',
  department: 'Water Resources Department, Government of Maharashtra',
  location: 'Pune District',
  specificTestbed: 'Mutha Irrigation Corridor, Pune District',
  duration: '15 Aug 2026 – 15 Nov 2026',
  status: 'On Track',
  operationalState: 'Active Field Testing',
  progress: 68,
  currentMilestoneNumber: 3,
  totalMilestones: 5,
  currentMilestoneLabel: 'Milestone 3 of 5',
  currentPhase: 'Field Testing',
  kpiHealth: 92,
  kpisOnTrackCount: '4 of 4 KPIs currently on track',
  
  budget: {
    sanctioned: '₹35.0 Lakhs',
    sanctionedAmount: 3500000,
    disbursed: '₹10.5 Lakhs',
    disbursedAmount: 1050000,
    utilizationPercent: 30,
    currentTranche: 'Tranche 1 (30% Mobilization Advance Released)',
    trancheStatus: 'Released',
    escrowAccount: 'SBI-ESCR-MH-9482-PUNE'
  },

  about: 'Deploy acoustic sensors for real-time canal leakage detection to reduce water loss and improve irrigation efficiency across the Mutha canal corridor.',
  
  expectedOutcomes: [
    '20–25% reduction in water loss',
    'Real-time leak detection within ±3.2m accuracy',
    'Improved maintenance response time (<4 hrs)',
    'Scalable across district'
  ],

  actionRequired: {
    active: true,
    title: 'Additional evidence requested',
    reason: 'Maintenance response time validation across Pune canal sub-segment',
    dueDate: '18 Sep 2026',
    department: 'Water Resources Department'
  },

  kpis: [
    {
      id: 'KPI-1',
      name: 'Leakage Detection Accuracy',
      baseline: '70%',
      target: '90%',
      current: '88%',
      status: 'On Track',
      frequency: 'Weekly',
      evidenceFile: 'Acoustic_Wave_Log_Week4.csv',
      lastReported: '04 Sep 2026',
      reviewStatus: 'Verified'
    },
    {
      id: 'KPI-2',
      name: 'Water Loss Reduction',
      baseline: '0%',
      target: '25%',
      current: '18%',
      status: 'In Progress',
      frequency: 'Monthly',
      evidenceFile: 'Hydrology_Loss_Model_Aug.pdf',
      lastReported: '02 Sep 2026',
      reviewStatus: 'In Review'
    },
    {
      id: 'KPI-3',
      name: 'Response Time',
      baseline: '6 hrs',
      target: '<4 hrs',
      current: '3.2 hrs',
      status: 'On Track',
      frequency: 'Per Event',
      evidenceFile: 'Maintenance_SLA_Time_Log.csv',
      lastReported: '05 Sep 2026',
      reviewStatus: 'Clarification Requested'
    },
    {
      id: 'KPI-4',
      name: 'Operational Cost',
      baseline: '₹100/unit',
      target: '₹85/unit',
      current: '₹88/unit',
      status: 'At Risk',
      frequency: 'Monthly',
      evidenceFile: 'BOM_Expense_Ledger_Aug.pdf',
      lastReported: '31 Aug 2026',
      reviewStatus: 'Verified'
    },
    {
      id: 'KPI-5',
      name: 'System Uptime',
      baseline: '-',
      target: '95%',
      current: '99.2%',
      status: 'On Track',
      frequency: 'Continuous',
      evidenceFile: 'Gateway_Packet_Heartbeat_Log.csv',
      lastReported: '06 Sep 2026',
      reviewStatus: 'Verified'
    }
  ],

  milestones: [
    {
      id: 'M1',
      title: 'Milestone 1: Sandbox Charter Execution',
      dates: '01 Aug – 10 Aug 2026',
      status: 'Completed',
      description: 'Signing of tripartite pilot zone charter, escrow account establishment, and baseline acoustic noise profiling.',
      requiredEvidence: 'Signed_Charter_Tripartite.pdf, Escrow_Confirmation_SBI.pdf',
      disbursal: '₹10.5 Lakhs (30% Advance Released)'
    },
    {
      id: 'M2',
      title: 'Milestone 2: 20-Node Field Deployment',
      dates: '11 Aug – 31 Aug 2026',
      status: 'Completed',
      description: 'Physical installation of 20 submersible nodes along Mutha canal corridor with solar LoRaWAN gateway packet sync.',
      requiredEvidence: 'Deployment_Photographs_Chainage.zip, LoRaWAN_Sync_Log.csv',
      disbursal: 'In Review for Tranche 2 Signoff'
    },
    {
      id: 'M3',
      title: 'Milestone 3: 60-Day Telemetry Uptime & Leak Pinpointing',
      dates: '01 Sep – 30 Oct 2026',
      status: 'In Progress',
      isCurrent: true,
      description: 'Uninterrupted telemetry uptime >98% and automated pinpointing of controlled canal leak test drills within ±5m.',
      requiredEvidence: '60_Day_Telemetry_Log.csv, Controlled_Drill_Report.pdf',
      disbursal: '₹14.0 Lakhs (40% Deployment Tranche)'
    },
    {
      id: 'M4',
      title: 'Milestone 4: Third-Party STQC Verification',
      dates: '01 Nov – 10 Nov 2026',
      status: 'Upcoming',
      description: 'Independent evaluation by STQC panel on sensor durability, cybersecurity encryption, and automated alarm latency.',
      requiredEvidence: 'STQC_Third_Party_Audit_Certificate.pdf',
      disbursal: 'Milestone Verification Clearance'
    },
    {
      id: 'M5',
      title: 'Milestone 5: Final Impact Report & Scale Recommendation',
      dates: '11 Nov – 15 Nov 2026',
      status: 'Upcoming',
      description: 'Comprehensive operational impact assessment submitted to Maharashtra Innovation Council for district scaling.',
      requiredEvidence: 'Final_Comprehensive_Pilot_Dossier.pdf',
      disbursal: '₹10.5 Lakhs (30% Final Acceptance)'
    }
  ],

  documents: [
    {
      id: 'DOC-01',
      name: 'Monthly Progress Report - August',
      type: 'Progress Report',
      date: '05 Sep 2026',
      status: 'Submitted',
      fileSize: '2.4 MB'
    },
    {
      id: 'DOC-02',
      name: 'Telemetry Data Export (Week 1-4)',
      type: 'Data File',
      date: '01 Sep 2026',
      status: 'Submitted',
      fileSize: '8.1 MB'
    },
    {
      id: 'DOC-03',
      name: 'Field Deployment Photos (Nodes 1-20)',
      type: 'Images',
      date: '29 Aug 2026',
      status: 'Approved',
      fileSize: '14.2 MB'
    },
    {
      id: 'DOC-04',
      name: 'Mutha Canal Hydraulic Benchmark Studies',
      type: 'Technical Document',
      date: '15 Aug 2026',
      status: 'Approved',
      fileSize: '4.8 MB'
    },
    {
      id: 'DOC-05',
      name: 'Maintenance Response Time Field Audit',
      type: 'Audit Evidence',
      date: 'Due 18 Sep 2026',
      status: 'Needs Revision',
      fileSize: 'Pending Upload'
    }
  ],

  feedback: [
    {
      id: 'FB-01',
      date: '12 Sep 2026',
      department: 'Water Resources Department, Government of Maharashtra',
      officer: 'Shri A. V. Deshpande (Superintending Engineer)',
      message: 'Field deployment is progressing well. Please provide additional evidence on maintenance response time for the next review.',
      status: 'New',
      actionRequired: true,
      replies: []
    },
    {
      id: 'FB-02',
      date: '03 Sep 2026',
      department: 'Water Resources Department, Government of Maharashtra',
      officer: 'Joint Secretary (Water Resources, GoM)',
      message: 'Telemetry uptime evidence accepted. Nodes 01-14 data stream confirmed live in Mantralaya Water SCADA.',
      status: 'Resolved',
      actionRequired: false,
      replies: [
        {
          sender: 'AquaSense Innovations (You)',
          date: '03 Sep 2026',
          message: 'Thank you Sir. Nodes 15-20 calibration is now complete and telemetry packets are transmitting seamlessly.'
        }
      ]
    }
  ],

  outcome: {
    score: 88,
    status: 'Completed',
    recommendation: 'Recommended for Scale',
    scaleApproved: true,
    highlights: {
      efficiency: '22%',
      costSaving: '18%',
      satisfaction: '91%',
      deploymentRate: '100%'
    },
    scalePlan: {
      title: 'Approved for Scale',
      district: 'Nashik & Pune Canal Networks',
      wardsCovered: 24,
      procurementStage: 'Single-Source GeM Direct Catalog Onboarding (Tranche 3)',
      budgetAllocation: '₹1.45 Crores',
      nextSteps: 'MoU execution with Maharashtra Water Resources Department for district-wide telemetry expansion.'
    }
  }
};
