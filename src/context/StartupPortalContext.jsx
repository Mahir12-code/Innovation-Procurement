import React, { createContext, useContext, useState, useEffect } from 'react';

// ==========================================
// INITIAL DEMO DATA STRUCTURES
// ==========================================

export const DEFAULT_STARTUP_PROFILE = {
  id: 'STU-94821',
  name: 'AquaSense Innovations Pvt Ltd',
  tagline: 'AI-Powered Water Quality Telemetry & Municipal Leak Detection',
  dpiitNumber: 'DIPP94821',
  incorporationYear: 2021,
  stage: 'Growth Stage (TRL 7 - Operational Field Prototype)',
  sector: 'CleanTech & IoT',
  founderName: 'Pooja Deshmukh',
  founderRole: 'Founder & Chief Technology Officer',
  email: 'pooja.deshmukh@aquasense.io',
  phone: '+91 98201 44921',
  headquarters: 'Pune, Maharashtra',
  address: 'Plot 42, Hinjewadi Phase 1, Pune, Maharashtra - 411057',
  website: 'https://aquasense.io',
  teamSize: '18 Engineers & Data Scientists',
  patentsCount: 2,
  turnoverAnnual: '₹1.42 Crores',
  dpiitRecognized: true,
  cinNumber: 'U72900PN2021PTC198421',
  gstin: '27AAACA9482P1Z5',
  technology: 'Edge AI inference, IoT Ultrasonic Transducers, LoRaWAN Telemetry, React Cloud Dashboard',
  deployments: '12 municipal pump houses in Pimpri-Chinchwad, 4 pilot canals in Nashik irrigation command',
  achievements: 'Winner of Maharashtra Startup Week 2024, STQC Pre-Compliance Security Audit Cleared',
  supportingEvidence: [
    { name: 'DPIIT_Recognition_Certificate.pdf', size: '1.2 MB', date: '12 Jan 2022', verified: true },
    { name: 'Patent_Grant_Ultrasonic_Telemetry.pdf', size: '2.8 MB', date: '04 Aug 2023', verified: true },
    { name: 'STQC_Pre_Test_Validation_Summary.pdf', size: '3.4 MB', date: '15 Feb 2026', verified: true }
  ]
};

// 8 Public Evaluation Criteria (General explanations, no internal formulas or weights)
export const EVALUATION_CRITERIA_PUBLIC = [
  {
    id: 'crit-1',
    name: 'Problem Alignment & Technical Fit',
    explanation: 'How directly and innovatively the proposed technology addresses the department operational bottleneck.',
    expectedEvidence: 'Architecture diagram, workflow mapping, and field integration specs.'
  },
  {
    id: 'crit-2',
    name: 'Technology Readiness Level (TRL 6+)',
    explanation: 'Readiness of the prototype for deployment in realistic municipal or rural government testbeds.',
    expectedEvidence: 'Lab test reports, bench test video, or prior pilot performance log.'
  },
  {
    id: 'crit-3',
    name: 'Cybersecurity & Data Privacy',
    explanation: 'Adherence to Indian Data Protection laws, CERT-In encryption standards, and STQC security frameworks.',
    expectedEvidence: 'Vulnerability assessment report, encryption standard declaration, and cloud architecture.'
  },
  {
    id: 'crit-4',
    name: 'Deployment Feasibility & Maintenance SLA',
    explanation: 'Ease of field installation, ruggedness against outdoor weather, and availability of on-site service teams in Maharashtra.',
    expectedEvidence: 'Installation protocol, mean time between failures (MTBF), and spare parts plan.'
  },
  {
    id: 'crit-5',
    name: 'Cost Efficiency & Scalability',
    explanation: 'Cost per unit compared to legacy manual processes, with clear unit economics for pan-state rollout.',
    expectedEvidence: 'Bill of Materials (BOM) breakdown and scaled deployment pricing tiers.'
  },
  {
    id: 'crit-6',
    name: 'Team Credibility & IP Ownership',
    explanation: 'Qualifications of the founding engineers and formal ownership of core intellectual property.',
    expectedEvidence: 'Founders CVs, patent filing receipts, and DPIIT declaration.'
  },
  {
    id: 'crit-7',
    name: 'Measurable Impact & KPI Trackability',
    explanation: 'Ability to generate transparent real-time telemetry and audit-grade performance metrics.',
    expectedEvidence: 'Sample cloud dashboard, telemetry API schema, and reporting frequency.'
  },
  {
    id: 'crit-8',
    name: 'Social & Environmental Impact',
    explanation: 'Reduction in carbon emissions, water conservation, citizen convenience, or public health improvement.',
    expectedEvidence: 'Sustainability metric estimates and community benefit projection.'
  }
];

export const INITIAL_PUBLISHED_OPPORTUNITIES = [
  {
    id: 'OPP-MH-2026-01',
    title: 'Smart Waste Management & Real-Time Segregation Telemetry',
    department: 'Urban Development Department',
    sector: 'Smart Cities & IoT',
    state: 'Maharashtra',
    status: 'Open',
    publishedAt: '2026-08-15',
    deadline: '2026-09-18',
    daysRemaining: 13,
    budget: '₹45 Lakhs',
    grantAdvancePercent: 30,
    problemStatement: 'Manual waste segregation at municipal transfer stations leads to contamination and landfill overflow. Urban local bodies require automated optical/AI sorting telemetry.',
    expectedOutcome: 'Deploy edge-AI camera sensors on 20 municipal trucks in Pune, logging real-time segregation purity scores and GPS overflow alerts to the municipal cloud dashboard.',
    eligibility: 'DPIIT recognized Indian startups under 10 years old. Minimum TRL 6 working hardware prototype in computer vision or IoT sensing. DPIIT Rule 170 turnover waiver applicable.',
    requiredDocuments: [
      'DPIIT Recognition Certificate',
      'Technical Architecture & Prototype Demo Link',
      'GST Registration & Audited Balance Sheet (or Exemption Waiver)',
      'Product Cybersecurity Self-Declaration'
    ],
    submissionRequirements: '5-step online submission via Sarkar Setu. Sandbox pilot agreements will be issued within 14 days of technical jury signoff.',
    importantDates: [
      { label: 'RFP Published', date: '15 Aug 2026' },
      { label: 'Application Deadline', date: '18 Sep 2026' },
      { label: 'Jury Evaluation Window', date: '20 Sep – 25 Sep 2026' },
      { label: 'Pilot Sandbox Sanction', date: '01 Oct 2026' }
    ]
  },
  {
    id: 'OPP-MH-2026-02',
    title: 'Adaptive AI Traffic Optimization & Queue-Based Signal Timing',
    department: 'Transport Department',
    sector: 'Smart Mobility',
    state: 'Maharashtra',
    status: 'Open',
    publishedAt: '2026-08-20',
    deadline: '2026-09-22',
    daysRemaining: 17,
    budget: '₹60 Lakhs',
    grantAdvancePercent: 30,
    problemStatement: 'Urban traffic signal timers operate on static fixed cycles, exacerbating congestion along major city arterial corridors during morning and evening rush hours.',
    expectedOutcome: 'Retrofittable optical edge compute system adjusting traffic signal green-times dynamically across 12 high-density junctions in Pune without storing license plates.',
    eligibility: 'DPIIT-registered startups with demonstrable optical flow or edge inference traffic models. Exemption from prior experience granted under Maharashtra Innovation Policy.',
    requiredDocuments: [
      'DPIIT Recognition Certificate',
      'Junction Controller Interfacing Specs',
      'Latency & Resilience Test Bench Report',
      'IP Ownership Declaration'
    ],
    submissionRequirements: 'Must be compatible with standard Indian road junction controllers (12V/24V relays) with fail-safe optical bypass.',
    importantDates: [
      { label: 'RFP Published', date: '20 Aug 2026' },
      { label: 'Application Deadline', date: '22 Sep 2026' },
      { label: 'Field Demo Session', date: '26 Sep 2026' },
      { label: 'Pilot Agreement & Escrow', date: '05 Oct 2026' }
    ]
  },
  {
    id: 'OPP-MH-2026-03',
    title: 'Offline-First Tele-Diagnostics Kit for Rural PHC Clinics',
    department: 'Public Health Department',
    sector: 'MedTech & Healthcare',
    state: 'Maharashtra',
    status: 'Open',
    publishedAt: '2026-08-25',
    deadline: '2026-09-28',
    daysRemaining: 23,
    budget: '₹50 Lakhs',
    grantAdvancePercent: 35,
    problemStatement: 'Primary Health Centres (PHCs) in remote tribal talukas suffer from spotty 4G connectivity, delaying emergency cardiac and maternal vitals diagnosis by district doctors.',
    expectedOutcome: 'Ruggedized diagnostic kit incorporating 12-lead ECG, digital stethoscope, and SpO2 with automated store-and-forward encryption when cellular network reconnects.',
    eligibility: 'Medtech startups with ISO 13485 or CDSCO registered medical hardware. Exemption from prior supply history granted.',
    requiredDocuments: [
      'DPIIT Certificate',
      'CDSCO / ISO 13485 Medical Device Certification',
      'Store-and-Forward Security Encryption Protocol',
      'Clinical Trial / PHC Validation Summary'
    ],
    submissionRequirements: 'Battery capacity must exceed 14 hours continuous operation. Must support Marathi and English user interfaces for ASHA workers.',
    importantDates: [
      { label: 'RFP Published', date: '25 Aug 2026' },
      { label: 'Application Deadline', date: '28 Sep 2026' },
      { label: 'Medical Panel Review', date: '02 Oct 2026' },
      { label: 'Field Deployment Sanction', date: '10 Oct 2026' }
    ]
  },
  {
    id: 'OPP-MH-2026-04',
    title: 'Acoustic Canal Leakage & Illegal Tapping Detection IoT Array',
    department: 'Water Resources Department',
    sector: 'CleanTech & IoT',
    state: 'Maharashtra',
    status: 'Open',
    publishedAt: '2026-08-28',
    deadline: '2026-10-05',
    daysRemaining: 30,
    budget: '₹35 Lakhs',
    grantAdvancePercent: 30,
    problemStatement: 'Water losses along concrete irrigation canals exceed 24% due to micro-fissures, sub-surface ground seepage, and unauthorized siphon tapping.',
    expectedOutcome: 'Deploy submerged ultrasonic transducer nodes transmitting pressure transient logs via LoRaWAN up to 15km to alert canal water engineers within 5 minutes.',
    eligibility: 'DPIIT recognized startups with IP in acoustic sensors or fluid telemetry. Prior turnover waiver fully active.',
    requiredDocuments: [
      'DPIIT Certificate',
      'Sensor Ruggedness IP68 Proof',
      'LoRaWAN Battery Life Telemetry Calculation',
      'CA Net Worth / Exemption Letter'
    ],
    submissionRequirements: 'Sensor nodes must maintain continuous submersible operation for minimum 18 months without battery replacement.',
    importantDates: [
      { label: 'RFP Published', date: '28 Aug 2026' },
      { label: 'Application Deadline', date: '05 Oct 2026' },
      { label: 'Canal Testbed Inspection', date: '10 Oct 2026' },
      { label: 'Tranche 1 Escrow Release', date: '18 Oct 2026' }
    ]
  }
];

export const INITIAL_STARTUP_APPLICATIONS = [
  {
    id: 'APP-2026-081',
    startupId: 'STU-94821',
    opportunityId: 'OPP-MH-2026-04',
    opportunityTitle: 'Acoustic Canal Leakage & Illegal Tapping Detection IoT Array',
    department: 'Water Resources Department',
    sector: 'CleanTech & IoT',
    grantBudget: '₹35 Lakhs',
    status: 'Selected for Pilot',
    currentStage: 'Pilot Execution & Telemetry',
    submittedAt: '2026-08-10',
    pilotId: 'PLT-MH-001',
    solution: {
      name: 'AquaPulse LoRaWAN Acoustic Array',
      tagline: 'Autonomous underwater acoustic sensors pinpointing leak locations to within ±3.2 meters in real-time.',
      techStack: 'Piezoelectric Hydrophones, STM32 Edge MCU, LoRaWAN Class A, Cloud Analytics',
      trlLevel: 'TRL 7 (Operational Environment Prototype)',
      deploymentReadiness: 'Ready for immediate 20-node deployment'
    },
    problemSolution: {
      problemUnderstanding: 'Irrigation canal leakage causes huge agricultural water deficit and soil salinization along Maharashtra canal networks.',
      proposedSolution: 'Our passive acoustic hydrophones listen to fluid transient sound profiles, filtering ambient animal noise via edge neural networks.',
      governmentImpact: 'Saves an estimated 4.2 million litres of canal irrigation water per kilometer annually.',
      implementationPlan: 'Deploy 20 submerged nodes across Mutha canal over 4 weeks with live telemetry upload.'
    },
    documents: [
      { name: 'DPIIT_Recognition_Certificate.pdf', status: 'Verified', date: '10 Aug 2026' },
      { name: 'IP68_Submersible_Certificate.pdf', status: 'Verified', date: '10 Aug 2026' },
      { name: 'LoRaWAN_Telemetry_Report.pdf', status: 'Verified', date: '10 Aug 2026' }
    ],
    timeline: [
      { event: 'Application Submitted', date: '10 Aug 2026, 11:30 AM', status: 'completed' },
      { event: 'Eligibility Verification Passed', date: '14 Aug 2026, 04:15 PM', status: 'completed' },
      { event: 'Technical Jury Evaluation Completed', date: '21 Aug 2026, 02:40 PM', status: 'completed' },
      { event: 'Shortlisted for Sandbox Pilot', date: '25 Aug 2026, 06:00 PM', status: 'completed' },
      { event: 'Sandbox Pilot Sanctioned & Escrow Activated', date: '28 Aug 2026, 10:00 AM', status: 'completed' }
    ],
    requiredActions: []
  },
  {
    id: 'APP-2026-104',
    startupId: 'STU-94821',
    opportunityId: 'OPP-MH-2026-01',
    opportunityTitle: 'Smart Waste Management & Real-Time Segregation Telemetry',
    department: 'Urban Development Department',
    sector: 'Smart Cities & IoT',
    grantBudget: '₹45 Lakhs',
    status: 'Under Evaluation',
    currentStage: 'Technical Jury Assessment',
    submittedAt: '2026-08-28',
    solution: {
      name: 'SortSense Edge AI Vision Sorter',
      tagline: 'On-truck camera compute module categorizing wet/dry/hazardous municipal refuse.',
      techStack: 'YOLOv8 Edge Model, Sony IMX Sensors, 4G LTE-M, AWS GovCloud',
      trlLevel: 'TRL 7',
      deploymentReadiness: '10 truck retrofit kits ready'
    },
    problemSolution: {
      problemUnderstanding: 'Municipal transfer stations lack accountability on source segregation compliance.',
      proposedSolution: 'Optical sorting camera mounted inside truck hopper tags non-segregated loads with geotags.',
      governmentImpact: 'Increases segregated processing purity from 54% to 92%.',
      implementationPlan: '4-week trial across Zone 4 Pune Municipal Corporation.'
    },
    documents: [
      { name: 'DPIIT_Recognition_Certificate.pdf', status: 'Verified', date: '28 Aug 2026' },
      { name: 'Prototype_Demo_Video.mp4', status: 'Verified', date: '28 Aug 2026' },
      { name: 'Cybersecurity_Self_Declaration.pdf', status: 'Pending', date: '28 Aug 2026' }
    ],
    timeline: [
      { event: 'Application Submitted', date: '28 Aug 2026, 03:20 PM', status: 'completed' },
      { event: 'Eligibility Verification Passed', date: '01 Sep 2026, 11:00 AM', status: 'completed' },
      { event: 'Under Technical Jury Assessment', date: '03 Sep 2026, 02:15 PM', status: 'in_progress' }
    ],
    requiredActions: []
  },
  {
    id: 'APP-2026-118',
    startupId: 'STU-94821',
    opportunityId: 'OPP-MH-2026-02',
    opportunityTitle: 'Adaptive AI Traffic Optimization & Queue-Based Signal Timing',
    department: 'Transport Department',
    sector: 'Smart Mobility',
    grantBudget: '₹60 Lakhs',
    status: 'Eligibility Verification',
    currentStage: 'Clarification Required',
    submittedAt: '2026-09-02',
    solution: {
      name: 'FlowMatrix Edge Adaptive Traffic Core',
      tagline: 'Computer vision vehicle queue counter controlling signal phase durations without storing plates.',
      techStack: 'TensorRT, Edge Jetson Nano, LoRa, Municipal SCADA Bridge',
      trlLevel: 'TRL 6',
      deploymentReadiness: 'Hardware bench tested'
    },
    problemSolution: {
      problemUnderstanding: 'Fixed junction signal timers waste vehicle fuel and cause gridlocks.',
      proposedSolution: 'Edge camera calculates queue depth and dynamically requests extra green time.',
      governmentImpact: 'Reduces commute wait times by 28% and carbon emissions at bottlenecks.',
      implementationPlan: 'Pilot on 6 junction cluster along University Road, Pune.'
    },
    documents: [
      { name: 'DPIIT_Recognition_Certificate.pdf', status: 'Verified', date: '02 Sep 2026' },
      { name: 'Audited_Balance_Sheet_FY24.pdf', status: 'Clarification Requested', date: '02 Sep 2026' }
    ],
    timeline: [
      { event: 'Application Submitted', date: '02 Sep 2026, 05:45 PM', status: 'completed' },
      { event: 'Eligibility Screening: Clarification Issued', date: '04 Sep 2026, 10:30 AM', status: 'in_progress' }
    ],
    requiredActions: [
      {
        id: 'ACT-CLAR-01',
        type: 'clarification',
        title: 'Respond to Eligibility Clarification',
        description: 'Government Nodal Officer requested CA Exemption Certificate or Audited Turnover Proof.',
        dueDate: '08 Sep 2026',
        route: '/startup/applications/APP-2026-118/clarifications'
      }
    ]
  },
  {
    id: 'APP-2026-142',
    startupId: 'STU-94821',
    opportunityId: 'OPP-MH-2026-03',
    opportunityTitle: 'Offline-First Tele-Diagnostics Kit for Rural PHC Clinics',
    department: 'Public Health Department',
    sector: 'MedTech & Healthcare',
    grantBudget: '₹50 Lakhs',
    status: 'Draft',
    currentStage: 'Drafting Application',
    submittedAt: null,
    solution: {
      name: 'Sanjeevani Tele-Vitals Box',
      tagline: 'Offline-first multi-vital diagnostic box syncing clinical files over low-bandwidth cellular.',
      techStack: 'Micro-controller, Bluetooth LE, SQLite Store-and-Forward, AES-256',
      trlLevel: 'TRL 6',
      deploymentReadiness: 'Working bench prototype'
    },
    problemSolution: {
      problemUnderstanding: 'Rural PHCs cannot transmit 12-lead ECGs to district hospitals due to zero signal.',
      proposedSolution: 'Local buffering device compresses ECG data to <20KB and syncs on connection.',
      governmentImpact: 'Enables cardiac diagnosis within the golden hour in tribal talukas.',
      implementationPlan: 'Deploy in 8 PHCs in Gadchiroli district.'
    },
    documents: [],
    timeline: [
      { event: 'Draft Created', date: '04 Sep 2026, 09:15 AM', status: 'completed' }
    ],
    requiredActions: [
      {
        id: 'ACT-DRAFT-01',
        type: 'draft',
        title: 'Complete and Submit Application',
        description: 'Application is currently in draft. Complete document uploads before deadline (28 Sep 2026).',
        dueDate: '28 Sep 2026',
        route: '/startup/applications/APP-2026-142/edit'
      }
    ]
  }
];

export const INITIAL_CLARIFICATIONS = [
  {
    id: 'CLAR-001',
    applicationId: 'APP-2026-118',
    opportunityTitle: 'Adaptive AI Traffic Optimization & Queue-Based Signal Timing',
    department: 'Transport Department',
    requestTitle: 'Clarification on Startup Turnover Exemption & Patent Filing',
    requestText: 'Under Maharashtra Public Procurement guidelines (Rule 170), please provide your DPIIT startup recognition certificate confirming exemption from prior turnover, along with patent filing receipt for the Optical Flow Edge Model.',
    requestedDate: '2026-09-04T10:30:00Z',
    deadline: '2026-09-08T18:00:00Z',
    status: 'Clarification Required', // 'Clarification Required' | 'Response Submitted' | 'Resolved'
    response: null,
    attachments: []
  },
  {
    id: 'CLAR-002',
    applicationId: 'APP-2026-081',
    opportunityTitle: 'Acoustic Canal Leakage & Illegal Tapping Detection IoT Array',
    department: 'Water Resources Department',
    requestTitle: 'Clarification on LoRaWAN Gateway Frequency Band Compliance',
    requestText: 'Kindly verify that the LoRaWAN gateway operates within the de-licensed 865-867 MHz frequency band approved by the Wireless Planning & Coordination (WPC) wing of India.',
    requestedDate: '2026-08-16T14:00:00Z',
    deadline: '2026-08-20T18:00:00Z',
    status: 'Resolved',
    response: {
      text: 'We confirm that all AquaPulse nodes and the field gateway transmit exclusively on IN865 (865.0 - 867.0 MHz) in strict compliance with DOT/WPC Notification GSR 564(E). ETA certificate ETA-SD-20230800142 attached.',
      submittedAt: '2026-08-17T11:20:00Z',
      attachments: ['WPC_ETA_Compliance_Certificate.pdf']
    },
    attachments: ['WPC_ETA_Compliance_Certificate.pdf']
  }
];

export const INITIAL_STARTUP_DOCUMENTS = [
  {
    id: 'DOC-01',
    name: 'DPIIT Recognition Certificate (DIPP94821)',
    category: 'Statutory Compliance',
    uploadDate: '12 Jan 2026',
    status: 'Verified',
    fileSize: '1.2 MB',
    fileType: 'PDF',
    verifiedBy: 'DPIIT Automated Bridge',
    canReplace: false
  },
  {
    id: 'DOC-02',
    name: 'Certificate of Incorporation (MCA CIN U72900PN2021PTC198421)',
    category: 'Corporate Legal',
    uploadDate: '14 Jan 2026',
    status: 'Verified',
    fileSize: '2.1 MB',
    fileType: 'PDF',
    verifiedBy: 'State Nodal Desk',
    canReplace: false
  },
  {
    id: 'DOC-03',
    name: 'GST Registration Certificate (27AAACA9482P1Z5)',
    category: 'Tax & Compliance',
    uploadDate: '15 Jan 2026',
    status: 'Verified',
    fileSize: '840 KB',
    fileType: 'PDF',
    verifiedBy: 'GSTN Gateway',
    canReplace: false
  },
  {
    id: 'DOC-04',
    name: 'Audited Financial Statements / CA Turnover Exemption Affidavit',
    category: 'Financials',
    uploadDate: '02 Sep 2026',
    status: 'Clarification Requested',
    fileSize: '3.4 MB',
    fileType: 'PDF',
    verifiedBy: 'Transport Nodal Cell',
    canReplace: true
  },
  {
    id: 'DOC-05',
    name: 'STQC Pre-Compliance Security & Penetration Testing Report',
    category: 'Technical & Security',
    uploadDate: '15 Feb 2026',
    status: 'Verified',
    fileSize: '4.8 MB',
    fileType: 'PDF',
    verifiedBy: 'STQC Evaluation Panel',
    canReplace: false
  },
  {
    id: 'DOC-06',
    name: 'LoRaWAN Class A IP68 Environmental Ruggedness Certificate',
    category: 'Product Specifications',
    uploadDate: '10 Aug 2026',
    status: 'Verified',
    fileSize: '1.9 MB',
    fileType: 'PDF',
    verifiedBy: 'Water Resources Nodal Cell',
    canReplace: false
  }
];

export const INITIAL_STARTUP_PILOTS = [
  {
    id: 'PLT-MH-001',
    applicationId: 'APP-2026-081',
    opportunityId: 'OPP-MH-2026-04',
    name: 'Smart Canal Acoustic Telemetry Pilot — Mutha Irrigation Corridor',
    department: 'Water Resources Department, Government of Maharashtra',
    sector: 'CleanTech & IoT',
    objective: 'Demonstrate continuous real-time leak detection and unauthorized siphon tapping telemetry across 15 km of the Mutha Canal testbed using submersible acoustic nodes.',
    scope: '20 submerged acoustic IoT nodes, 2 LoRaWAN field gateways, cloud dashboard integrated with Mantralaya Water SCADA.',
    testbedLocation: 'Khadakwasla to Swargate Canal Segment, Pune District',
    startDate: '2026-08-28',
    endDate: '2027-02-28',
    status: 'Active Field Testing',
    sanctionedGrant: 3500000,
    disbursedGrant: 1050000, // 30% Tranche 1 released to escrow
    escrowAccount: 'SBI-ESCR-MH-9482-PUNE',
    currentMilestoneIndex: 2,
    milestones: [
      {
        id: 'M1',
        name: 'Milestone 1: Sandbox Charter Execution & Baseline Calibration',
        targetDate: '2026-08-30',
        status: 'Completed',
        grantDisbursal: '₹10.5 Lakhs (30% Advance)',
        description: 'Signing of tripartite sandbox charter, escrow setup, and baseline acoustic noise profiling in dry/wet conditions.'
      },
      {
        id: 'M2',
        name: 'Milestone 2: 20-Node Field Deployment & LoRaWAN Gateway Sync',
        targetDate: '2026-09-05',
        status: 'Completed',
        grantDisbursal: 'In Review for Tranche 2 Signoff',
        description: 'Physical deployment of 20 submersible nodes along 15km corridor with continuous packet transmissions to Mantralaya SCADA.'
      },
      {
        id: 'M3',
        name: 'Milestone 3: 60-Day Telemetry Uptime & Simulated Leak Pinpointing',
        targetDate: '2026-10-30',
        status: 'In Progress',
        grantDisbursal: '₹14.0 Lakhs (40% Deployment)',
        description: 'Uninterrupted telemetry uptime >98% and successful automated pinpointing of controlled canal leak test drills within ±5m.'
      },
      {
        id: 'M4',
        name: 'Milestone 4: Third-Party STQC Verification & GeM Direct Catalog Listing',
        targetDate: '2027-02-15',
        status: 'Upcoming',
        grantDisbursal: '₹10.5 Lakhs (30% Acceptance)',
        description: 'Third-party certification by STQC and Government Sanction Committee sign-off for single-source procurement onboarding on GeM.'
      }
    ],
    kpis: [
      {
        id: 'KPI-1',
        name: 'Sensor Network Telemetry Uptime',
        definition: 'Percentage of hours in a calendar month where nodes transmit heartbeats every 15 minutes.',
        target: '≥ 98.0%',
        startupReported: '99.2%',
        govVerified: '98.8%',
        evidenceName: 'Telemetry_Gateway_Uptime_Log_Aug.csv',
        status: 'Verified'
      },
      {
        id: 'KPI-2',
        name: 'Acoustic Leak Pinpoint Accuracy',
        definition: 'Physical distance delta between predicted acoustic leak coordinate and ground-truth leak point.',
        target: '± 5.0 meters',
        startupReported: '± 3.2 meters',
        govVerified: '± 3.8 meters',
        evidenceName: 'Field_Verification_Report_Drill_1.pdf',
        status: 'Verified'
      },
      {
        id: 'KPI-3',
        name: 'Automated Breach Alert Latency',
        definition: 'Time elapsed between simulated siphon breach event and alert notification on nodal officer phone.',
        target: '< 300 seconds (5 min)',
        startupReported: '142 seconds',
        govVerified: 'Pending Review',
        evidenceName: 'Alert_Log_Timestamp_Audit.pdf',
        status: 'Pending'
      },
      {
        id: 'KPI-4',
        name: 'Estimated Water Loss Reduction',
        definition: 'Extrapolated cubic meters of canal water saved through early detection of micro-fractures.',
        target: '≥ 3.0 Million Litres/km',
        startupReported: '4.1 Million Litres/km',
        govVerified: 'Pending Review',
        evidenceName: 'Hydrology_Model_Simulation.pdf',
        status: 'Pending'
      }
    ],
    progressUpdates: [
      {
        id: 'PRG-01',
        milestoneName: 'Milestone 2: 20-Node Field Deployment',
        submittedAt: '2026-09-03T15:30:00Z',
        summary: 'All 20 nodes installed at designated canal bridges (Chainage 0+000 to 14+800). Solar-assisted LoRaWAN gateway online with 99.4% RSSI.',
        attachmentName: 'Deployment_Photographs_Chainage_Report.zip'
      },
      {
        id: 'PRG-02',
        milestoneName: 'Milestone 1: Baseline Calibration',
        submittedAt: '2026-08-30T11:00:00Z',
        summary: 'Acoustic background signature captured across diurnal flow cycles. Zero harmonic interference with municipal intake pumps.',
        attachmentName: 'Calibration_Acoustic_Baseline.pdf'
      }
    ],
    governmentFeedback: [
      {
        date: '2026-09-04',
        officer: 'Joint Secretary (Water Resources, GoM)',
        comment: 'Nodes 01-14 data stream confirmed live in Mantralaya Water SCADA. Field inspection scheduled for 09 Sep 2026 for Tranche 2 release.'
      }
    ]
  }
];

export const INITIAL_STARTUP_NOTIFICATIONS = [
  {
    id: 'NOTIF-01',
    type: 'Clarification Request',
    title: 'Eligibility Clarification Issued',
    message: 'Transport Department has requested clarification regarding turnover exemption for Application APP-2026-118.',
    timestamp: 'Yesterday at 10:30 AM',
    read: false,
    route: '/startup/applications/APP-2026-118/clarifications'
  },
  {
    id: 'NOTIF-02',
    type: 'Pilot Update',
    title: 'Milestone 2 Review Scheduled',
    message: 'Water Resources Department scheduled field validation inspection for Canal Telemetry Pilot (PLT-MH-001) on 09 Sep.',
    timestamp: '04 Sep 2026, 04:15 PM',
    read: false,
    route: '/startup/pilots/PLT-MH-001'
  },
  {
    id: 'NOTIF-03',
    type: 'New Opportunity',
    title: 'New Government RFP Published',
    message: 'Water Resources Department published: Acoustic Canal Leakage & Illegal Tapping Detection IoT Array (₹35 Lakhs).',
    timestamp: '28 Aug 2026, 09:00 AM',
    read: true,
    route: '/startup/opportunities/OPP-MH-2026-04'
  },
  {
    id: 'NOTIF-04',
    type: 'Selected for Pilot',
    title: 'Selected for Sandbox Pilot Sanction!',
    message: 'Congratulations! Application APP-2026-081 has been approved for Sandbox Pilot testing. Tranche 1 Escrow active.',
    timestamp: '28 Aug 2026, 10:00 AM',
    read: true,
    route: '/startup/pilots/PLT-MH-001'
  },
  {
    id: 'NOTIF-05',
    type: 'Application Status Change',
    title: 'Application Moved to Technical Evaluation',
    message: 'Application APP-2026-104 (SortSense Vision Sorter) passed eligibility screening and is now under technical jury review.',
    timestamp: '01 Sep 2026, 11:00 AM',
    read: true,
    route: '/startup/applications/APP-2026-104'
  }
];

export const INITIAL_STARTUP_SCHEMES = [
  {
    id: 'SCH-01',
    title: 'Maharashtra State Innovation Society (MSInS) Sandbox Grant',
    department: 'Skill Development & Innovation Department, GoM',
    fundingAmount: 'Up to ₹50 Lakhs direct pilot testbed grant',
    description: 'Provides 100% grant-in-aid to innovative startups piloting new tech in municipal corporations, Zilla Parishads, and state utilities without prior tendering history.',
    eligibility: 'DPIIT recognized startups incorporated in Maharashtra or executing pilots within the state with TRL 6+ prototypes.',
    relevantOpportunity: 'Applicable to all Sarkar Setu live challenges',
    resourceLink: 'https://msins.in'
  },
  {
    id: 'SCH-02',
    title: 'DPIIT Startup India Seed Fund Scheme (SISFS)',
    department: 'Ministry of Commerce & Industry, GoI',
    fundingAmount: 'Up to ₹20 Lakhs grant for prototype validation & ₹50 Lakhs for commercialization',
    description: 'Financial assistance to startups for proof of concept, prototype development, product trials, market entry, and commercialization.',
    eligibility: 'Startups recognized by DPIIT with innovative business ideas capable of scaling.',
    relevantOpportunity: 'Applicable for sandbox equipment fabrication',
    resourceLink: 'https://seedfund.startupindia.gov.in'
  },
  {
    id: 'SCH-03',
    title: 'GeM Direct Onboarding for Verified Sandbox Pilots',
    department: 'Government e-Marketplace (GeM), GoI',
    fundingAmount: 'Direct Procurement Onboarding (Single Source Exemption)',
    description: 'Startups that successfully conclude field pilots on Sarkar Setu receive fast-track direct product catalogue onboarding under GeM Startup Runway.',
    eligibility: 'Successful completion of government sandbox pilot with STQC technical verification sign-off.',
    relevantOpportunity: 'Post-pilot procurement sanction track',
    resourceLink: 'https://gem.gov.in'
  },
  {
    id: 'SCH-04',
    title: 'TIDE 2.0 MeitY Incubation & Scaling Support',
    department: 'Ministry of Electronics & Information Technology (MeitY)',
    fundingAmount: 'Up to ₹7 Lakhs for Entrepreneur-in-Residence & ₹30 Lakhs grant',
    description: 'Supports tech startups using emerging technologies (IoT, AI, Blockchain) to solve challenges in healthcare, agriculture, and smart cities.',
    eligibility: 'Indian tech startups working with verified incubators (e.g. IIT Bombay SINE, COEP Bhau Institute).',
    relevantOpportunity: 'Smart Cities & Health Innovation challenges',
    resourceLink: 'https://meitystartuphub.in'
  }
];

// ==========================================
// CONTEXT CREATION & PROVIDER
// ==========================================

export const StartupPortalContext = createContext(null);

export function StartupPortalProvider({ children }) {
  // 1. Profile State
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('sarkar_setu_startup_profile');
    return saved ? JSON.parse(saved) : DEFAULT_STARTUP_PROFILE;
  });

  // 2. Opportunities (Only Published + Open)
  const [opportunities, setOpportunities] = useState(() => {
    return INITIAL_PUBLISHED_OPPORTUNITIES;
  });

  // 3. Applications State
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('sarkar_setu_startup_applications');
    return saved ? JSON.parse(saved) : INITIAL_STARTUP_APPLICATIONS;
  });

  // 4. Clarifications State
  const [clarifications, setClarifications] = useState(() => {
    const saved = localStorage.getItem('sarkar_setu_startup_clarifications');
    return saved ? JSON.parse(saved) : INITIAL_CLARIFICATIONS;
  });

  // 5. Documents State
  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem('sarkar_setu_startup_documents');
    return saved ? JSON.parse(saved) : INITIAL_STARTUP_DOCUMENTS;
  });

  // 6. Pilots State
  const [pilots, setPilots] = useState(() => {
    const saved = localStorage.getItem('sarkar_setu_startup_pilots');
    return saved ? JSON.parse(saved) : INITIAL_STARTUP_PILOTS;
  });

  // 7. Notifications State
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('sarkar_setu_startup_notifications');
    return saved ? JSON.parse(saved) : INITIAL_STARTUP_NOTIFICATIONS;
  });

  // 8. Self-Assessment State
  const [selfAssessment, setSelfAssessment] = useState(() => {
    const saved = localStorage.getItem('sarkar_setu_startup_self_assessment');
    return saved
      ? JSON.parse(saved)
      : {
          'crit-1': { rating: 5, comments: 'Direct fit with municipal canal challenges using acoustic telemetry.', evidence: 'Acoustic_Field_Data.pdf' },
          'crit-2': { rating: 4, comments: 'TRL 7 verified prototype deployed in 4 Nashik canal gates.', evidence: 'TRL_7_Field_Log.pdf' },
          'crit-3': { rating: 5, comments: 'AES-256 encrypted LoRaWAN telemetry cleared STQC audit.', evidence: 'STQC_Crypto_Report.pdf' },
          'crit-4': { rating: 4, comments: '24-hour on-site replacement team based out of Pune office.', evidence: 'SLA_Support_Charter.pdf' },
          'crit-5': { rating: 4, comments: 'BOM cost per sensor node is ₹12,500, scalable to ₹8,200 at 500 units.', evidence: 'BOM_Costing_Sheet.xlsx' },
          'crit-6': { rating: 5, comments: '2 granted patents in ultrasonic transient hydrophones.', evidence: 'Patent_Receipts.pdf' },
          'crit-7': { rating: 5, comments: 'Real-time telemetry feeds with API sync to Mantralaya SCADA.', evidence: 'SCADA_API_Docs.pdf' },
          'crit-8': { rating: 5, comments: 'Projected to conserve 4.2M litres of irrigation water per canal km.', evidence: 'Water_Impact_Study.pdf' }
        };
  });

  // 9. Toast Notifications
  const [toasts, setToasts] = useState([]);
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('sarkar_setu_startup_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('sarkar_setu_startup_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('sarkar_setu_startup_clarifications', JSON.stringify(clarifications));
  }, [clarifications]);

  useEffect(() => {
    localStorage.setItem('sarkar_setu_startup_documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('sarkar_setu_startup_pilots', JSON.stringify(pilots));
  }, [pilots]);

  useEffect(() => {
    localStorage.setItem('sarkar_setu_startup_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('sarkar_setu_startup_self_assessment', JSON.stringify(selfAssessment));
  }, [selfAssessment]);

  // ==========================================
  // CORE ACTIONS & MUTATORS
  // ==========================================

  // 1. Create a New Application Draft from Opportunity
  const createDraftApplication = (opportunityId) => {
    const opp = opportunities.find((o) => o.id === opportunityId);
    if (!opp) {
      showToast('Opportunity not found or closed', 'error');
      return null;
    }

    // Check if an application already exists
    const existing = applications.find((a) => a.opportunityId === opportunityId && a.status !== 'Not Selected');
    if (existing) {
      showToast(`Existing application found (${existing.id})`, 'info');
      return existing.id;
    }

    const newId = `APP-2026-${Math.floor(Math.random() * 800) + 200}`;
    const newDraft = {
      id: newId,
      startupId: profile.id,
      opportunityId: opp.id,
      opportunityTitle: opp.title,
      department: opp.department,
      sector: opp.sector,
      grantBudget: opp.budget,
      status: 'Draft',
      currentStage: 'Drafting Application',
      submittedAt: null,
      solution: {
        name: `${profile.name} Solution for ${opp.sector}`,
        tagline: 'High-reliability innovation tailored for Maharashtra public sector deployment.',
        techStack: profile.technology || 'Edge AI, IoT, Cloud Telemetry',
        trlLevel: 'TRL 7 (Operational Environment Prototype)',
        deploymentReadiness: 'Ready for 30-day testbed rollout'
      },
      problemSolution: {
        problemUnderstanding: `Our engineering team analyzed the ${opp.department} requirement for ${opp.title}.`,
        proposedSolution: 'Field-tested hardware and software stack designed for high availability and low power consumption.',
        governmentImpact: 'Substantial improvement in operational efficiency, transparency, and public cost savings.',
        implementationPlan: 'Phase 1: Baseline setup (W1-2) | Phase 2: Deployment (W3-4) | Phase 3: Telemetry (M2-6)'
      },
      documents: opp.requiredDocuments.map((docName) => ({
        name: `${docName.replace(/\s+/g, '_')}_AquaSense.pdf`,
        status: 'Uploaded',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      })),
      timeline: [
        {
          event: 'Draft Created',
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          status: 'completed'
        }
      ],
      requiredActions: [
        {
          id: `ACT-${newId}`,
          type: 'draft',
          title: 'Complete and Submit Application',
          description: `Application draft saved. Complete all 5 steps before deadline (${opp.deadline}).`,
          dueDate: opp.deadline,
          route: `/startup/applications/${newId}/edit`
        }
      ]
    };

    setApplications((prev) => [newDraft, ...prev]);
    showToast(`Application draft ${newId} initiated!`, 'success');
    return newId;
  };

  // 2. Update Draft Application
  const updateApplication = (id, updatedData) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, ...updatedData } : app))
    );
    showToast('Draft progress saved successfully!', 'success');
  };

  // 3. Submit Application
  const submitApplication = (id) => {
    const app = applications.find((a) => a.id === id);
    if (!app) return;

    const submissionDate = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    const updatedApp = {
      ...app,
      status: 'Submitted',
      currentStage: 'Eligibility Verification Gate',
      submittedAt: submissionDate,
      requiredActions: [],
      timeline: [
        ...app.timeline,
        {
          event: 'Application Submitted & Locked',
          date: `${submissionDate}, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          status: 'completed'
        },
        {
          event: 'Under Official Eligibility Screening',
          date: 'In Queue for Nodal Officer Gate Verification',
          status: 'in_progress'
        }
      ]
    };

    setApplications((prev) => prev.map((a) => (a.id === id ? updatedApp : a)));

    // Create Notification
    const notif = {
      id: `NOTIF-${Date.now()}`,
      type: 'Application Submitted',
      title: 'Application Successfully Submitted',
      message: `Your technical application (${id}) for "${app.opportunityTitle}" has been formally submitted to ${app.department}.`,
      timestamp: 'Just now',
      read: false,
      route: `/startup/applications/${id}`
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast(`Application ${id} submitted successfully!`, 'success');
  };

  // 4. Respond to Clarification Request
  const respondClarification = (clarificationId, responseText, attachmentName = null) => {
    const clar = clarifications.find((c) => c.id === clarificationId);
    if (!clar) return;

    const nowIso = new Date().toISOString();
    const updatedClar = {
      ...clar,
      status: 'Response Submitted',
      response: {
        text: responseText,
        submittedAt: nowIso,
        attachments: attachmentName ? [attachmentName] : ['Exemption_Declaration_Signed.pdf']
      },
      attachments: attachmentName ? [...clar.attachments, attachmentName] : [...clar.attachments, 'Exemption_Declaration_Signed.pdf']
    };

    setClarifications((prev) =>
      prev.map((c) => (c.id === clarificationId ? updatedClar : c))
    );

    // Update the parent application's requiredActions and timeline
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === clar.applicationId) {
          return {
            ...app,
            status: app.status === 'Clarification Requested' ? 'Under Evaluation' : app.status,
            requiredActions: (app.requiredActions || []).filter((a) => a.type !== 'clarification'),
            timeline: [
              ...(app.timeline || []),
              {
                event: `Clarification Response Submitted (${clar.id})`,
                date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                status: 'completed'
              }
            ]
          };
        }
        return app;
      })
    );

    // Notification
    const notif = {
      id: `NOTIF-${Date.now()}`,
      type: 'Clarification Request',
      title: 'Clarification Response Dispatched',
      message: `Your response to clarification request ${clarificationId} has been sent to ${clar.department}.`,
      timestamp: 'Just now',
      read: false,
      route: `/startup/applications/${clar.applicationId}/clarifications`
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast('Clarification response submitted to government nodal cell!', 'success');
  };

  // 5. Upload Document
  const uploadDocument = (newDoc) => {
    const docId = `DOC-${Date.now().toString().slice(-4)}`;
    const docEntry = {
      id: docId,
      name: newDoc.name,
      category: newDoc.category || 'General Compliance',
      uploadDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Pending',
      fileSize: newDoc.fileSize || '2.4 MB',
      fileType: 'PDF',
      verifiedBy: 'Pending Department Review',
      canReplace: false
    };

    setDocuments((prev) => [docEntry, ...prev]);
    showToast(`Document "${newDoc.name}" uploaded. Verification status: Pending.`, 'success');
  };

  // 6. Replace Document (when permitted)
  const replaceDocument = (docId, newFileName) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === docId
          ? {
              ...doc,
              name: newFileName || doc.name,
              uploadDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
              status: 'Pending',
              canReplace: false
            }
          : doc
      )
    );
    showToast('Updated document uploaded for department verification.', 'success');
  };

  // 7. Update Startup Profile
  const updateProfile = (updatedFields) => {
    setProfile((prev) => ({ ...prev, ...updatedFields }));
    showToast('Startup company profile updated successfully!', 'success');
  };

  // 8. Save Self-Assessment
  const saveSelfAssessment = (assessmentData) => {
    setSelfAssessment(assessmentData);
    showToast('Startup self-assessment saved! (Stored separately from official jury scores)', 'success');
  };

  // 9. Submit Pilot Progress Update
  const submitPilotProgress = (pilotId, progressData) => {
    const updateEntry = {
      id: `PRG-${Date.now().toString().slice(-4)}`,
      milestoneName: progressData.milestoneName,
      submittedAt: new Date().toISOString(),
      summary: progressData.summary,
      attachmentName: progressData.attachmentName || 'Field_Deployment_Log.pdf'
    };

    setPilots((prev) =>
      prev.map((plt) =>
        plt.id === pilotId
          ? {
              ...plt,
              progressUpdates: [updateEntry, ...plt.progressUpdates]
            }
          : plt
      )
    );

    // Add Notification
    const notif = {
      id: `NOTIF-${Date.now()}`,
      type: 'Pilot Update',
      title: 'Pilot Progress Log Dispatched',
      message: `Progress evidence for "${progressData.milestoneName}" submitted to government testbed desk.`,
      timestamp: 'Just now',
      read: false,
      route: `/startup/pilots/${pilotId}`
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast('Pilot milestone progress report dispatched to government nodal engineer!', 'success');
  };

  // 10. Submit KPI Telemetry Evidence
  const submitKpiEvidence = (pilotId, kpiId, reportedValue, evidenceFileName, remarks) => {
    setPilots((prev) =>
      prev.map((plt) => {
        if (plt.id === pilotId) {
          const updatedKpis = plt.kpis.map((kpi) => {
            if (kpi.id === kpiId) {
              return {
                ...kpi,
                startupReported: reportedValue,
                evidenceName: evidenceFileName || kpi.evidenceName,
                status: 'Pending Review'
              };
            }
            return kpi;
          });
          return { ...plt, kpis: updatedKpis };
        }
        return plt;
      })
    );
    showToast('KPI telemetry evidence submitted for department verification!', 'success');
  };

  // 11. Notification Management
  const markNotificationAsRead = (notifId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  // Unread Count
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <StartupPortalContext.Provider
      value={{
        profile,
        updateProfile,
        opportunities,
        applications,
        createDraftApplication,
        updateApplication,
        submitApplication,
        clarifications,
        respondClarification,
        documents,
        uploadDocument,
        replaceDocument,
        pilots,
        submitPilotProgress,
        submitKpiEvidence,
        notifications,
        unreadNotificationsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        selfAssessment,
        saveSelfAssessment,
        schemes: INITIAL_STARTUP_SCHEMES,
        publicCriteria: EVALUATION_CRITERIA_PUBLIC,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </StartupPortalContext.Provider>
  );
}

export function useStartupPortal() {
  const context = useContext(StartupPortalContext);
  if (!context) {
    throw new Error('useStartupPortal must be used within a StartupPortalProvider');
  }
  return context;
}
