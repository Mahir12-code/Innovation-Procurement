import React, { createContext, useContext, useState, useMemo } from 'react';

// Initial Maharashtra Datasets
const INITIAL_PROBLEM_STATEMENTS = [
  {
    id: 'PS-001',
    title: 'Smart Waste Management & Segregation Telemetry',
    department: 'Urban Development Department',
    category: 'Smart Cities & IoT',
    state: 'Maharashtra',
    status: 'Open',
    budget: '₹45 Lakhs',
    deadline: '18 Sep 2026',
    applicationsCount: 32,
    description: 'AI-driven computer vision sensors mounted on municipal refuse collectors for automated waste segregation and real-time overflow telemetry.',
    expectedSolution: 'Edge-AI device with GPS tracking, cellular IoT upload, and cloud dashboard displaying segregation purity index.',
    eligibility: 'DPIIT recognized startups with TRL 6+ prototype in hardware IoT or computer vision.',
    evaluationCriteria: 'Technical Feasibility (25%), Sensor Accuracy (25%), Cost per Junction (25%), Maintenance SLA (25%)'
  },
  {
    id: 'PS-002',
    title: 'AI Traffic Monitoring & Adaptive Junction Timing',
    department: 'Transport Department',
    category: 'Smart Mobility',
    state: 'Maharashtra',
    status: 'Open',
    budget: '₹60 Lakhs',
    deadline: '22 Sep 2026',
    applicationsCount: 28,
    description: 'Dynamic traffic signal control system adjusting green phase durations in real-time based on junction queue lengths without storing vehicle plates.',
    expectedSolution: 'Privacy-first optical edge compute module retrofittable to existing municipal signal controllers.',
    eligibility: 'Startups with verified computer vision stack tested in urban traffic scenarios.',
    evaluationCriteria: 'Latency (<200ms), Queue Estimation Accuracy, Resilience to Weather, Open API Compliance'
  },
  {
    id: 'PS-003',
    title: 'Digital Health Monitoring & Rural Tele-ICU Kits',
    department: 'Public Health Department',
    category: 'MedTech & Healthcare',
    state: 'Maharashtra',
    status: 'Open',
    budget: '₹50 Lakhs',
    deadline: '28 Sep 2026',
    applicationsCount: 41,
    description: 'Portable, battery-operated vital signs monitoring kit for Primary Health Centres (PHCs) with automated telemetry sync for specialist review.',
    expectedSolution: '12-lead ECG, SpO2, NIBP, and digital stethoscope transmitting encrypted clinical data over 2G/4G networks.',
    eligibility: 'Medtech startups with CDSCO/ISO-13485 medical device safety certifications.',
    evaluationCriteria: 'Clinical Accuracy (30%), Battery Life >12h (25%), Ease of Training (25%), Encryption (20%)'
  },
  {
    id: 'PS-004',
    title: 'Water Leakage Detection in Canal & Municipal Mains',
    department: 'Water Resources Department',
    category: 'CleanTech & IoT',
    state: 'Maharashtra',
    status: 'Open',
    budget: '₹35 Lakhs',
    deadline: '05 Oct 2026',
    applicationsCount: 24,
    description: 'Acoustic and pressure transient monitoring sensors to detect underground pipe bursts and illegal canal tapping across irrigation networks.',
    expectedSolution: 'Submersible ultrasonic sensors with LoRaWAN telemetry communicating up to 15km line-of-sight.',
    eligibility: 'Indian startups with field-tested water pressure sensors and IP ownership.',
    evaluationCriteria: 'Leak Pinpoint Accuracy (±3m), Sensor Ruggedness (IP68), Battery Life >3 yrs, Cloud Telemetry'
  },
  {
    id: 'PS-005',
    title: 'School Attendance Analytics & Drop-out Early Warning',
    department: 'School Education Department',
    category: 'EdTech & GovTech',
    state: 'Maharashtra',
    status: 'Open',
    budget: '₹30 Lakhs',
    deadline: '12 Oct 2026',
    applicationsCount: 19,
    description: 'Predictive analytics engine using mid-day meal logs, biometric timestamps, and geographic trends to flag students at risk of drop-out.',
    expectedSolution: 'Offline-first tablet app with predictive ML model operating on district education servers.',
    eligibility: 'Startups with proven education analytics or AI software deployed in at least 50 schools.',
    evaluationCriteria: 'Predictive Precision (30%), Data Privacy Compliance, Marathi Language Interface, Scalability'
  },
  {
    id: 'PS-006',
    title: 'Soil Nutrient Rapid Testing & Drone Fertilizer Mapping',
    department: 'Agriculture Department',
    category: 'AgriTech',
    state: 'Maharashtra',
    status: 'Open',
    budget: '₹40 Lakhs',
    deadline: '15 Oct 2026',
    applicationsCount: 22,
    description: 'Spectroscopic handheld probe delivering instant NPK soil analysis with variable-rate drone fertilizer prescription maps.',
    expectedSolution: 'Chemical-free optical spectrometer syncing with state MahaAgri portal.',
    eligibility: 'DPIIT recognized agritech startups with field testing validation from ICAR or state agri universities.',
    evaluationCriteria: 'Testing Time (<5 min), NPK Accuracy vs Wet Chemistry >85%, Farmer App UX, Ruggedness'
  }
];

const INITIAL_APPLICATIONS = [
  {
    id: 'APP-1024',
    startupName: 'EcoVision AI',
    founder: 'Sanjay Deshmukh',
    problemId: 'PS-001',
    problemTitle: 'Smart Waste Management',
    department: 'Urban Development Department',
    submittedDate: '02 Sep 2026',
    status: 'Under Review',
    verificationStatus: 'Verified',
    score: 82,
    priority: 'Medium',
    dpiitNumber: 'DIPP-89211',
    email: 'sanjay@ecovision.ai',
    phone: '+91 98230 45678',
    location: 'Pune, Maharashtra',
    documentsCount: 6
  },
  {
    id: 'APP-1025',
    startupName: 'TrafficSense',
    founder: 'Pooja Kulkarni',
    problemId: 'PS-002',
    problemTitle: 'AI Traffic Monitoring',
    department: 'Transport Department',
    submittedDate: '03 Sep 2026',
    status: 'Awaiting Verification',
    verificationStatus: 'Pending Verification',
    score: 76,
    priority: 'High',
    dpiitNumber: 'DIPP-91044',
    email: 'pooja@trafficsense.in',
    phone: '+91 99201 23456',
    location: 'Mumbai, Maharashtra',
    documentsCount: 5
  },
  {
    id: 'APP-1026',
    startupName: 'AquaTech Labs',
    founder: 'Amit Patil',
    problemId: 'PS-004',
    problemTitle: 'Water Leakage Detection',
    department: 'Water Resources Department',
    submittedDate: '03 Sep 2026',
    status: 'Shortlisted',
    verificationStatus: 'Verified',
    score: 91,
    priority: 'High',
    dpiitNumber: 'DIPP-78233',
    email: 'amit@aquatechlabs.org',
    phone: '+91 97654 32109',
    location: 'Nashik, Maharashtra',
    documentsCount: 7
  },
  {
    id: 'APP-1027',
    startupName: 'HealthGrid Solutions',
    founder: 'Dr. Radhika Sen',
    problemId: 'PS-003',
    problemTitle: 'Digital Health Monitoring',
    department: 'Public Health Department',
    submittedDate: '04 Sep 2026',
    status: 'Under Review',
    verificationStatus: 'Verified',
    score: 87,
    priority: 'High',
    dpiitNumber: 'DIPP-67129',
    email: 'radhika@healthgrid.in',
    phone: '+91 98220 98765',
    location: 'Nagpur, Maharashtra',
    documentsCount: 8
  },
  {
    id: 'APP-1028',
    startupName: 'EduMatrix Analytics',
    founder: 'Vikram Shinde',
    problemId: 'PS-005',
    problemTitle: 'School Attendance Analytics',
    department: 'School Education Department',
    submittedDate: '04 Sep 2026',
    status: 'Awaiting Verification',
    verificationStatus: 'Documents Missing',
    score: 79,
    priority: 'Medium',
    dpiitNumber: 'DIPP-80214',
    email: 'vikram@edumatrix.tech',
    phone: '+91 98901 11223',
    location: 'Chhatrapati Sambhajinagar, Maharashtra',
    documentsCount: 4
  },
  {
    id: 'APP-1029',
    startupName: 'KisanVeda Drone Systems',
    founder: 'Aniket Jadhav',
    problemId: 'PS-006',
    problemTitle: 'Soil Nutrient Rapid Testing',
    department: 'Agriculture Department',
    submittedDate: '01 Sep 2026',
    status: 'Shortlisted',
    verificationStatus: 'Verified',
    score: 89,
    priority: 'High',
    dpiitNumber: 'DIPP-72109',
    email: 'aniket@kisanveda.com',
    phone: '+91 98200 88776',
    location: 'Kolhapur, Maharashtra',
    documentsCount: 6
  },
  {
    id: 'APP-1030',
    startupName: 'CleanPave Telemetry',
    founder: 'Nikhil Ranade',
    problemId: 'PS-001',
    problemTitle: 'Smart Waste Management',
    department: 'Urban Development Department',
    submittedDate: '31 Aug 2026',
    status: 'Under Review',
    verificationStatus: 'Verified',
    score: 84,
    priority: 'Medium',
    dpiitNumber: 'DIPP-84321',
    email: 'nikhil@cleanpave.in',
    phone: '+91 98111 22334',
    location: 'Thane, Maharashtra',
    documentsCount: 5
  }
];

const INITIAL_VERIFICATION_QUEUE = [
  {
    id: 'VRF-01',
    appId: 'APP-1025',
    startupName: 'TrafficSense',
    founder: 'Pooja Kulkarni',
    problemTitle: 'AI Traffic Monitoring',
    submittedDate: '03 Sep 2026',
    verificationStatus: 'Pending Verification',
    priority: 'High',
    gstNumber: '27AABCT3514Q1Z8',
    panNumber: 'AABCT3514Q',
    incorporationDate: '12 Jan 2023',
    bankVerified: true,
    documents: ['Incorporation_Cert.pdf', 'GST_Certificate.pdf', 'DPIIT_Letter.pdf', 'Audited_FY24_Ledger.pdf'],
    notes: 'Incorporation and GST documents valid. Awaiting nodal signature check.'
  },
  {
    id: 'VRF-02',
    appId: 'APP-1028',
    startupName: 'EduMatrix Analytics',
    founder: 'Vikram Shinde',
    problemTitle: 'School Attendance Analytics',
    submittedDate: '04 Sep 2026',
    verificationStatus: 'Documents Missing',
    priority: 'Medium',
    gstNumber: '27AABCE8910F1Z2',
    panNumber: 'AABCE8910F',
    incorporationDate: '18 Jul 2024',
    bankVerified: false,
    documents: ['Incorporation_Cert.pdf', 'PAN_Card.pdf'],
    notes: 'Missing DPIIT certificate and audited bank statement. Correction requested.'
  },
  {
    id: 'VRF-03',
    appId: 'APP-1031',
    startupName: 'VayuSensor IoT',
    founder: 'Tanvi Joshi',
    problemTitle: 'Smart Waste Management',
    submittedDate: '02 Sep 2026',
    verificationStatus: 'Verification In Progress',
    priority: 'High',
    gstNumber: '27AABCV5544N1ZP',
    panNumber: 'AABCV5544N',
    incorporationDate: '05 May 2022',
    bankVerified: true,
    documents: ['Incorporation_Cert.pdf', 'GST_Certificate.pdf', 'DPIIT_Letter.pdf', 'Bank_Details.pdf'],
    notes: 'Under compliance verification by Accounts Cell.'
  },
  {
    id: 'VRF-04',
    appId: 'APP-1032',
    startupName: 'BioMed Triage Labs',
    founder: 'Dr. Harsh Vardhan',
    problemTitle: 'Digital Health Monitoring',
    submittedDate: '01 Sep 2026',
    verificationStatus: 'Pending Verification',
    priority: 'High',
    gstNumber: '27AABCB9012K1Z5',
    panNumber: 'AABCB9012K',
    incorporationDate: '09 Nov 2021',
    bankVerified: true,
    documents: ['Incorporation_Cert.pdf', 'ISO13485_Cert.pdf', 'CDSCO_Approval.pdf', 'GST.pdf'],
    notes: 'Medical device regulatory dossier uploaded.'
  }
];

const INITIAL_EVALUATION_QUEUE = [
  {
    id: 'EVL-01',
    appId: 'APP-1024',
    startupName: 'EcoVision AI',
    problemTitle: 'Smart Waste Management',
    assignedEvaluator: 'Prof. K. Venkatesh (IIT Bombay)',
    technicalFeasibility: 21,
    innovation: 17,
    scalability: 16,
    govImpact: 16,
    teamCapability: 12,
    overallScore: 82,
    status: 'Under Evaluation',
    comments: 'Strong edge hardware architecture with low unit bill-of-materials.'
  },
  {
    id: 'EVL-02',
    appId: 'APP-1027',
    startupName: 'HealthGrid Solutions',
    problemTitle: 'Digital Health Monitoring',
    assignedEvaluator: 'Dr. Meera Swaminathan (KEM Hospital)',
    technicalFeasibility: 23,
    innovation: 18,
    scalability: 17,
    govImpact: 17,
    teamCapability: 12,
    overallScore: 87,
    status: 'Under Evaluation',
    comments: 'Exceptional 12-lead ECG battery life. Field protocol suitable for tribal PHCs.'
  },
  {
    id: 'EVL-03',
    appId: 'APP-1030',
    startupName: 'CleanPave Telemetry',
    problemTitle: 'Smart Waste Management',
    assignedEvaluator: 'Dr. Anil Joshi (COEP Pune)',
    technicalFeasibility: 20,
    innovation: 18,
    scalability: 17,
    govImpact: 16,
    teamCapability: 13,
    overallScore: 84,
    status: 'Under Evaluation',
    comments: 'Very competitive pricing model for municipality rollouts.'
  }
];

const INITIAL_SHORTLISTED = [
  {
    id: 'SL-01',
    startupName: 'AquaTech Labs',
    problemTitle: 'Water Leakage Detection',
    department: 'Water Resources Department',
    score: 91,
    shortlistedDate: '02 Sep 2026',
    pilotStatus: 'Pilot Pending',
    sanctionedGrant: '₹35 Lakhs',
    contactPerson: 'Amit Patil (Founder)',
    email: 'amit@aquatechlabs.org'
  },
  {
    id: 'SL-02',
    startupName: 'KisanVeda Drone Systems',
    problemTitle: 'Soil Nutrient Rapid Testing',
    department: 'Agriculture Department',
    score: 89,
    shortlistedDate: '03 Sep 2026',
    pilotStatus: 'Pilot Active',
    sanctionedGrant: '₹40 Lakhs',
    contactPerson: 'Aniket Jadhav (CEO)',
    email: 'aniket@kisanveda.com'
  },
  {
    id: 'SL-03',
    startupName: 'EcoVision AI',
    problemTitle: 'Smart Waste Management',
    department: 'Urban Development Department',
    score: 85,
    shortlistedDate: '03 Sep 2026',
    pilotStatus: 'Pilot Pending',
    sanctionedGrant: '₹45 Lakhs',
    contactPerson: 'Sanjay Deshmukh (Founder)',
    email: 'sanjay@ecovision.ai'
  },
  {
    id: 'SL-04',
    startupName: 'HealthGrid Solutions',
    problemTitle: 'Digital Health Monitoring',
    department: 'Public Health Department',
    score: 87,
    shortlistedDate: '04 Sep 2026',
    pilotStatus: 'Pilot Active',
    sanctionedGrant: '₹50 Lakhs',
    contactPerson: 'Dr. Radhika Sen',
    email: 'radhika@healthgrid.in'
  }
];

const INITIAL_ACTIVE_PILOTS = [
  {
    id: 'PIL-001',
    startup: 'AquaTech Labs',
    department: 'Water Resources Department',
    problem: 'Water Leakage Detection',
    startDate: '15 Aug 2026',
    endDate: '15 Nov 2026',
    currentPhase: 'Field Testing',
    progress: 68,
    kpiStatus: 'On Track',
    testbedLocation: 'Nashik District Rural Canal Network (Sector 4)',
    grantBudget: '₹35 Lakhs',
    disbursed: '₹22.5 Lakhs',
    officer: 'Shri R. K. Shinde (Executive Engineer)',
    contact: 'Amit Patil (+91 97654 32109)',
    milestones: [
      { name: 'Hardware deployment of 150 pressure nodes', status: 'Completed' },
      { name: 'LoRaWAN gateway telemetry online', status: 'Completed' },
      { name: 'Algorithm leak pinpoint verification', status: 'In Progress' },
      { name: 'STQC Third-Party Validation', status: 'Upcoming' }
    ],
    kpis: [
      { name: 'Leak Detection Accuracy', target: '90%', current: '92%', status: 'Normal' },
      { name: 'Daily Telemetry Uptime', target: '95%', current: '98.4%', status: 'Normal' },
      { name: 'Water Loss Reduction', target: '30%', current: '21%', status: 'At Risk' }
    ]
  },
  {
    id: 'PIL-002',
    startup: 'HealthGrid Solutions',
    department: 'Public Health Department',
    problem: 'Digital Health Monitoring',
    startDate: '20 Aug 2026',
    endDate: '20 Dec 2026',
    currentPhase: 'Deployment',
    progress: 45,
    kpiStatus: 'At Risk',
    testbedLocation: '18 Primary Health Centres, Gadchiroli',
    grantBudget: '₹50 Lakhs',
    disbursed: '₹20.0 Lakhs',
    officer: 'Dr. S. M. Gaikwad (Civil Surgeon)',
    contact: 'Dr. Radhika Sen (+91 98220 98765)',
    milestones: [
      { name: 'Delivery of 18 diagnostic kits', status: 'Completed' },
      { name: 'ANM and nurse clinical training', status: 'Completed' },
      { name: '1,000 rural tele-consultations', status: 'In Progress' },
      { name: 'District hospital specialist triage sync', status: 'Upcoming' }
    ],
    kpis: [
      { name: 'Consultation Sync Latency', target: '<5 min', current: '14 min', status: 'At Risk' },
      { name: 'Device Battery Endurance', target: '>12 hrs', current: '14.2 hrs', status: 'Normal' },
      { name: 'Diagnostic Reliability', target: '>98%', current: '99.1%', status: 'Normal' }
    ]
  },
  {
    id: 'PIL-003',
    startup: 'FlowMobility Tech',
    department: 'Transport Department',
    problem: 'AI Traffic Signal Adaptation',
    startDate: '01 Jul 2026',
    endDate: '01 Oct 2026',
    currentPhase: 'Live Operation',
    progress: 82,
    kpiStatus: 'On Track',
    testbedLocation: '12 Arterial Junctions, Pune Municipal Corp',
    grantBudget: '₹60 Lakhs',
    disbursed: '₹45.0 Lakhs',
    officer: 'Shri V. P. More (Joint Commissioner Transport)',
    contact: 'Rohan Deshmukh (+91 98221 00998)',
    milestones: [
      { name: 'Retrofit optical sensors on 12 junctions', status: 'Completed' },
      { name: 'Controller algorithmic synchronization', status: 'Completed' },
      { name: 'Rush-hour adaptive timing evaluation', status: 'In Progress' },
      { name: 'Final Traffic Police Impact Sign-Off', status: 'Upcoming' }
    ],
    kpis: [
      { name: 'Intersection Queue Reduction', target: '25%', current: '28.5%', status: 'Normal' },
      { name: 'Zero False Red Lights', target: '99.9%', current: '100%', status: 'Normal' }
    ]
  }
];

const INITIAL_PILOT_ALERTS = [
  {
    id: 'ALERT-001',
    pilotId: 'PIL-001',
    startup: 'AquaTech Labs',
    department: 'Water Resources Department',
    title: 'Water reduction KPI below target',
    type: 'KPI',
    priority: 'High',
    description: 'Target reduction was 30%, but current sensor logs show 21% reduction in Nashik Sector 4.',
    target: '30%',
    current: '21%',
    date: '04 Sep 2026',
    resolved: false
  },
  {
    id: 'ALERT-002',
    pilotId: 'PIL-002',
    startup: 'HealthGrid Solutions',
    department: 'Public Health Department',
    title: 'Consultation Sync Latency overdue',
    type: 'Milestone',
    priority: 'High',
    description: 'Gadchiroli remote PHC cellular uplink taking 14 minutes against SLA threshold of 5 minutes.',
    target: '<5 min',
    current: '14 min',
    date: '03 Sep 2026',
    resolved: false
  },
  {
    id: 'ALERT-003',
    pilotId: 'PIL-003',
    startup: 'FlowMobility Tech',
    department: 'Transport Department',
    title: 'Bi-weekly pilot progress report pending',
    type: 'Report',
    priority: 'Medium',
    description: 'Pune Municipal Junctions progress update for Phase 3 overdue by 3 working days.',
    target: 'Every 14 days',
    current: '17 days since last upload',
    date: '02 Sep 2026',
    resolved: false
  }
];

const INITIAL_PENDING_ACTIONS = [
  {
    id: 'ACT-001',
    type: 'Verification',
    subject: 'TrafficSense (APP-1025)',
    description: 'Verify startup incorporation and DPIIT registration documents before jury forwarding.',
    priority: 'High',
    dueDate: '05 Sep 2026',
    assignedTo: 'Rajesh Sharma (Nodal Officer)',
    status: 'Pending',
    targetRoute: '/government/applications/verification'
  },
  {
    id: 'ACT-002',
    type: 'Evaluation',
    subject: 'EcoVision AI (APP-1024)',
    description: 'Complete and sign off consolidated jury scorecard for Smart Waste Management.',
    priority: 'Medium',
    dueDate: '06 Sep 2026',
    assignedTo: 'Prof. K. Venkatesh (IIT Bombay)',
    status: 'Pending',
    targetRoute: '/government/applications/evaluation'
  },
  {
    id: 'ACT-003',
    type: 'Pilot Milestone',
    subject: 'HealthGrid Solutions (PIL-002)',
    description: 'Inspect field telemetry logs and approve Milestone 2 grant tranche (₹10 Lakhs).',
    priority: 'High',
    dueDate: '05 Sep 2026',
    assignedTo: 'Dr. S. M. Gaikwad (Civil Surgeon)',
    status: 'Pending',
    targetRoute: '/government/pilots'
  },
  {
    id: 'ACT-004',
    type: 'Procurement Sanction',
    subject: 'AquaTech Labs (PIL-001)',
    description: 'Review STQC audit validation report for commercial GeM onboarding sanction.',
    priority: 'High',
    dueDate: '08 Sep 2026',
    assignedTo: 'Joint Secretary (Water Resources)',
    status: 'Pending',
    targetRoute: '/government/shortlisted-startups'
  },
  {
    id: 'ACT-005',
    type: 'Verification',
    subject: 'EduMatrix Analytics (APP-1028)',
    description: 'Review corrected GST and audited balance sheet uploaded by founder.',
    priority: 'Medium',
    dueDate: '07 Sep 2026',
    assignedTo: 'Nodal Documentation Cell',
    status: 'Pending',
    targetRoute: '/government/applications/verification'
  }
];

export const GovernmentPortalContext = createContext(null);

export function GovernmentPortalProvider({ children }) {
  const [problemStatements, setProblemStatements] = useState(INITIAL_PROBLEM_STATEMENTS);
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [verificationQueue, setVerificationQueue] = useState(INITIAL_VERIFICATION_QUEUE);
  const [evaluationQueue, setEvaluationQueue] = useState(INITIAL_EVALUATION_QUEUE);
  const [shortlistedStartups, setShortlistedStartups] = useState(INITIAL_SHORTLISTED);
  const [activePilots, setActivePilots] = useState(INITIAL_ACTIVE_PILOTS);
  const [pilotAlerts, setPilotAlerts] = useState(INITIAL_PILOT_ALERTS);
  const [pendingActions, setPendingActions] = useState(INITIAL_PENDING_ACTIONS);
  const [toasts, setToasts] = useState([]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Dynamic Dashboard Card Counts
  // Multipliers ensure totals match the requested high-level numbers (e.g. 24, 148, 15, 38, 52, 7, 3, 9)
  const counts = useMemo(() => {
    const activePS = 24 + problemStatements.filter((p) => p.status === 'Open').length - INITIAL_PROBLEM_STATEMENTS.length;
    const totalApps = 148 + applications.length - INITIAL_APPLICATIONS.length;
    const awaitingVerif = 15 - (INITIAL_VERIFICATION_QUEUE.length - verificationQueue.filter((v) => v.verificationStatus !== 'Verified').length);
    const underEval = 38 - (INITIAL_EVALUATION_QUEUE.length - evaluationQueue.filter((e) => e.status === 'Under Evaluation').length);
    const shortlisted = 52 + (shortlistedStartups.length - INITIAL_SHORTLISTED.length);
    const pilots = 7 + (activePilots.length - INITIAL_ACTIVE_PILOTS.length);
    const alerts = 3 - (INITIAL_PILOT_ALERTS.length - pilotAlerts.filter((a) => !a.resolved).length);
    const pendingActs = 9 - (INITIAL_PENDING_ACTIONS.length - pendingActions.filter((a) => a.status === 'Pending').length);

    return {
      activeProblems: Math.max(activePS, 0),
      applicationsReceived: Math.max(totalApps, 0),
      awaitingVerification: Math.max(awaitingVerif, 0),
      underEvaluation: Math.max(underEval, 0),
      shortlistedStartups: Math.max(shortlisted, 0),
      activePilots: Math.max(pilots, 0),
      pilotAlerts: Math.max(alerts, 0),
      pendingActions: Math.max(pendingActs, 0)
    };
  }, [problemStatements, applications, verificationQueue, evaluationQueue, shortlistedStartups, activePilots, pilotAlerts, pendingActions]);

  // Actions
  const verifyApplication = (appId, decision, notes = '') => {
    setVerificationQueue((prev) =>
      prev.map((item) =>
        item.appId === appId
          ? {
              ...item,
              verificationStatus: decision === 'approve' ? 'Verified' : 'Rejected',
              notes: notes || item.notes
            }
          : item
      )
    );

    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId
          ? {
              ...app,
              verificationStatus: decision === 'approve' ? 'Verified' : 'Rejected',
              status: decision === 'approve' ? 'Under Review' : 'Rejected'
            }
          : app
      )
    );

    showToast(
      decision === 'approve'
        ? `Application ${appId} successfully verified! Moved to Expert Review.`
        : `Application ${appId} verification rejected.`
    );
  };

  const requestCorrection = (appId, note) => {
    setVerificationQueue((prev) =>
      prev.map((item) =>
        item.appId === appId
          ? { ...item, verificationStatus: 'Documents Missing', notes: note }
          : item
      )
    );
    showToast(`Correction notice dispatched to applicant for ${appId}.`, 'info');
  };

  const submitEvaluation = (appId, scores, comments) => {
    const total =
      (scores.technicalFeasibility || 0) +
      (scores.innovation || 0) +
      (scores.scalability || 0) +
      (scores.govImpact || 0) +
      (scores.teamCapability || 0);

    setEvaluationQueue((prev) =>
      prev.map((item) =>
        item.appId === appId
          ? {
              ...item,
              ...scores,
              overallScore: total,
              status: 'Evaluated',
              comments: comments || item.comments
            }
          : item
      )
    );

    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId
          ? {
              ...app,
              score: total,
              status: total >= 80 ? 'Shortlisted' : 'Evaluated'
            }
          : app
      )
    );

    if (total >= 80) {
      const app = applications.find((a) => a.id === appId);
      if (app && !shortlistedStartups.some((s) => s.startupName === app.startupName)) {
        setShortlistedStartups((prev) => [
          ...prev,
          {
            id: `SL-${Date.now()}`,
            startupName: app.startupName,
            problemTitle: app.problemTitle,
            department: app.department,
            score: total,
            shortlistedDate: 'Just now',
            pilotStatus: 'Pilot Pending',
            sanctionedGrant: '₹40 Lakhs',
            contactPerson: app.founder,
            email: app.email
          }
        ]);
      }
    }

    showToast(`Evaluation completed for ${appId}. Total Score: ${total}/100.`);
  };

  const initiatePilot = (startupName, details) => {
    const newPilot = {
      id: `PIL-00${activePilots.length + 1}`,
      startup: startupName,
      department: details.department || 'Urban Development Department',
      problem: details.problemTitle || 'Innovation Testbed Deployment',
      startDate: details.startDate || '01 Oct 2026',
      endDate: details.endDate || '01 Jan 2027',
      currentPhase: 'Planning & Setup',
      progress: 10,
      kpiStatus: 'On Track',
      testbedLocation: details.location || 'Pune Municipal Innovation Sandbox',
      grantBudget: details.budget || '₹40 Lakhs',
      disbursed: '₹10.0 Lakhs (Tranche 1)',
      officer: 'Shri Rajesh Sharma (Nodal Lead)',
      contact: details.contact || 'Founding Team',
      milestones: [
        { name: 'Hardware Setup & Safety Clearance', status: 'In Progress' },
        { name: 'Telemetry Integration & Calibration', status: 'Upcoming' },
        { name: 'Field Testing SLA Verification', status: 'Upcoming' }
      ],
      kpis: [
        { name: 'Operational Availability', target: '95%', current: '96%', status: 'Normal' }
      ]
    };

    setActivePilots((prev) => [...prev, newPilot]);
    setShortlistedStartups((prev) =>
      prev.map((s) =>
        s.startupName === startupName ? { ...s, pilotStatus: 'Pilot Active' } : s
      )
    );

    showToast(`Sandbox pilot initiated for ${startupName}! Added to Active Pilots.`);
  };

  const updatePilotKpi = (pilotId, progressDelta, newStatus) => {
    setActivePilots((prev) =>
      prev.map((p) =>
        p.id === pilotId
          ? {
              ...p,
              progress: Math.min(100, Math.max(0, p.progress + progressDelta)),
              kpiStatus: newStatus || p.kpiStatus
            }
          : p
      )
    );
    showToast(`Pilot ${pilotId} KPI progress updated successfully.`);
  };

  const addPilotMilestone = (pilotId, milestoneName) => {
    setActivePilots((prev) =>
      prev.map((p) =>
        p.id === pilotId
          ? {
              ...p,
              milestones: [...p.milestones, { name: milestoneName, status: 'Upcoming' }]
            }
          : p
      )
    );
    showToast(`New milestone added to Pilot ${pilotId}.`);
  };

  const resolveAlert = (alertId) => {
    setPilotAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, resolved: true } : a))
    );
    showToast(`Alert ${alertId} resolved successfully.`);
  };

  const completeAction = (actionId) => {
    setPendingActions((prev) =>
      prev.map((a) => (a.id === actionId ? { ...a, status: 'Completed' } : a))
    );
    showToast(`Action ${actionId} marked as Completed!`);
  };

  const addProblemStatement = (newPS) => {
    const formatted = {
      id: `PS-0${problemStatements.length + 1}`,
      title: newPS.title,
      department: newPS.department,
      category: newPS.sector || 'Smart Governance',
      state: 'Maharashtra',
      status: 'Open',
      budget: `₹${(newPS.budget / 100000).toFixed(0)} Lakhs`,
      deadline: newPS.deadline,
      applicationsCount: 0,
      description: newPS.description,
      expectedSolution: 'Verified MVP meeting state testbed specifications.',
      eligibility: 'DPIIT recognized startups.',
      evaluationCriteria: 'Technical Innovation, Feasibility, Cost & Impact.'
    };

    setProblemStatements((prev) => [formatted, ...prev]);
    showToast(`Problem Statement ${formatted.id} published successfully!`);
  };

  const closeProblemStatement = (psId) => {
    setProblemStatements((prev) =>
      prev.map((p) => (p.id === psId ? { ...p, status: 'Closed' } : p))
    );
    showToast(`Problem Statement ${psId} has been closed.`);
  };

  const value = {
    problemStatements,
    applications,
    verificationQueue,
    evaluationQueue,
    shortlistedStartups,
    activePilots,
    pilotAlerts,
    pendingActions,
    counts,
    verifyApplication,
    requestCorrection,
    submitEvaluation,
    initiatePilot,
    updatePilotKpi,
    addPilotMilestone,
    resolveAlert,
    completeAction,
    addProblemStatement,
    closeProblemStatement,
    showToast
  };

  return (
    <GovernmentPortalContext.Provider value={value}>
      {children}

      {/* Global Toast Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto px-4 py-3 rounded-xl shadow-lg border text-xs font-bold flex items-center justify-between gap-3 animate-in slide-in-from-bottom-3 ${
              toast.type === 'info'
                ? 'bg-sky-950 text-sky-100 border-sky-800'
                : 'bg-zinc-950 text-white border-zinc-800 dark:bg-white dark:text-zinc-950 dark:border-zinc-200'
            }`}
          >
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-zinc-400 hover:text-white dark:hover:text-zinc-900 ml-2"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </GovernmentPortalContext.Provider>
  );
}

export function useGovernmentPortal() {
  const ctx = useContext(GovernmentPortalContext);
  if (!ctx) {
    throw new Error('useGovernmentPortal must be used within a GovernmentPortalProvider');
  }
  return ctx;
}
