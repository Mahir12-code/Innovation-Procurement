/**
 * Centralized Mock Dataset for Sarkar Setu
 * Written in clear, everyday plain English.
 */

export const PROCUREMENT_STEPS = [
  {
    id: 1,
    title: 'Spot the Problem',
    tagline: 'Define department challenges and expected outcomes',
    status: 'completed', // 'completed' | 'active' | 'upcoming'
    statusLabel: 'Completed',
    count: 6,
    whatHappens: 'Department officers identify an operational bottleneck (e.g. manual crop checking, junction traffic jams) and write clear goals with a realistic budget.',
    keyOutput: 'Clear Problem Statement & Sanctioned Budget Draft',
    activeChallengesCount: 6,
    actionLabel: 'Review Problem Statements',
    actionRoute: '/government/challenges',
    timeframe: 'Week 1-2'
  },
  {
    id: 2,
    title: 'Post the Challenge',
    tagline: 'Open RFP challenge for startups with simple rules',
    status: 'completed',
    statusLabel: 'Completed',
    count: 4,
    whatHappens: 'The challenge is published publicly. Any eligible DPIIT-registered startup can read the requirements, see the grant amount, and apply online.',
    keyOutput: 'Public RFP Live with Open Application Window',
    activeChallengesCount: 4,
    actionLabel: 'View Live Challenges',
    actionRoute: '/government/challenges',
    timeframe: 'Week 3-4'
  },
  {
    id: 3,
    title: 'Find Great Startups',
    tagline: 'Automated matchmaking with DPIIT startup database',
    status: 'completed',
    statusLabel: 'Completed',
    count: 18,
    whatHappens: 'Sarkar Setu automatically suggests top verified Indian startups matching the exact technical area and Technology Readiness Level (TRL).',
    keyOutput: '18 Qualified Startups Invited to Submit Pitch',
    activeChallengesCount: 18,
    actionLabel: 'Discover Matched Startups',
    actionRoute: '/government/discovery',
    timeframe: 'Week 5'
  },
  {
    id: 4,
    title: 'Check Eligibility',
    tagline: 'Instant DPIIT verification and basic criteria screening',
    status: 'completed',
    statusLabel: 'Completed',
    count: 12,
    whatHappens: 'Automated screening checks DPIIT registration, legal incorporation, IP ownership, and ensures zero blacklisting before jury review.',
    keyOutput: '12 Startups Passed Compliance Gate',
    activeChallengesCount: 12,
    actionLabel: 'Review Eligibility Log',
    actionRoute: '/government/discovery',
    timeframe: 'Week 6'
  },
  {
    id: 5,
    title: 'Expert Review',
    tagline: 'Scored by IIT professors and domain technical jury',
    status: 'active',
    statusLabel: 'In Progress (2 Pending)',
    count: 8,
    whatHappens: 'Independent technical evaluators score each startup’s solution for technical feasibility, cybersecurity, and real-world durability.',
    keyOutput: 'Consolidated Jury Scorecards & Merit Ranking',
    activeChallengesCount: 8,
    actionLabel: 'Open Evaluation Sheet',
    actionRoute: '/government/evaluation',
    timeframe: 'Week 7-8'
  },
  {
    id: 6,
    title: 'Plan the Pilot',
    tagline: 'Agree on test location, safety rules, and grant tranches',
    status: 'completed',
    statusLabel: 'Completed',
    count: 5,
    whatHappens: 'The top startup works with the department to define sandbox boundaries, safety safeguards, success metrics, and milestone-linked payment schedules.',
    keyOutput: 'Signed Sandbox Agreement & Escrow Setup',
    activeChallengesCount: 5,
    actionLabel: 'View Pilot Charters',
    actionRoute: '/government/pilots',
    timeframe: 'Week 9'
  },
  {
    id: 7,
    title: 'Test in the Field',
    tagline: 'Live pilot deployment in real government facilities',
    status: 'active',
    statusLabel: 'Active Field Testing (3 Live)',
    count: 7,
    whatHappens: 'The startup deploys hardware and software on-site (e.g. 500 farms in Varanasi, 12 traffic junctions in Pune) with live telemetry tracking.',
    keyOutput: 'Live IoT Telemetry & Weekly Field Logs',
    activeChallengesCount: 7,
    actionLabel: 'Inspect Sandbox Telemetry',
    actionRoute: '/government/pilots',
    timeframe: 'Month 3-6'
  },
  {
    id: 8,
    title: 'Measure Results',
    tagline: 'Track real uptime, accuracy, and operational impact',
    status: 'active',
    statusLabel: 'Measuring 4 Pilots',
    count: 4,
    whatHappens: 'Automated analytics benchmark startup performance against baseline criteria (e.g. >92% disease accuracy, 22% traffic delay reduction).',
    keyOutput: 'Verified KPI Impact Report',
    activeChallengesCount: 4,
    actionLabel: 'Review KPI Metrics',
    actionRoute: '/government/pilots',
    timeframe: 'Month 6'
  },
  {
    id: 9,
    title: 'Third-Party Check',
    tagline: 'Independent audit by STQC / CSIR / IIT labs',
    status: 'active',
    statusLabel: '3 Under Audit',
    count: 3,
    whatHappens: 'Government-authorized testing agencies perform independent cybersecurity, stress testing, and hardware durability verification.',
    keyOutput: 'Official STQC / IIT Validation Certificate',
    activeChallengesCount: 3,
    actionLabel: 'View Audit Certificates',
    actionRoute: '/government/evaluation',
    timeframe: 'Month 7'
  },
  {
    id: 10,
    title: 'Scale Across India',
    tagline: 'Direct procurement sanction & GeM onboard for pan-India rollout',
    status: 'upcoming',
    statusLabel: '2 Ready for Sanction',
    count: 2,
    whatHappens: 'Successful pilots bypass traditional multi-year tenders. Departments can directly issue commercial purchase orders and onboard the product onto GeM.',
    keyOutput: 'Commercial Purchase Order & GeM Listing',
    activeChallengesCount: 2,
    actionLabel: 'Approve Scale-Up Sanction',
    actionRoute: '/government/procurement',
    timeframe: 'Month 8+'
  }
];

export const KPIS_DATA = [
  {
    id: 'kpi-challenges',
    title: 'Active Challenges',
    value: '4',
    change: '+1 new this month',
    trend: 'up',
    subtitle: 'Across 3 Priority Missions',
    icon: 'Target',
    color: 'blue'
  },
  {
    id: 'kpi-applications',
    title: 'Startup Applications',
    value: '103',
    change: '+34% from last quarter',
    trend: 'up',
    subtitle: '86 DPIIT-verified startups',
    icon: 'FileText',
    color: 'emerald'
  },
  {
    id: 'kpi-pilots',
    title: 'Live Pilots in Field',
    value: '3',
    change: '2 On-Track, 1 Being Checked',
    trend: 'neutral',
    subtitle: '₹60 Lakhs in sandbox grants',
    icon: 'Rocket',
    color: 'blue'
  },
  {
    id: 'kpi-decisions',
    title: 'Decisions Waiting Approval',
    value: '2',
    change: 'Action needed this week',
    trend: 'alert',
    subtitle: '1 Scale-Up & 1 STQC Sign-off',
    icon: 'CheckCircle2',
    color: 'amber'
  }
];

export const URGENT_TASKS = [
  {
    id: 'task-1',
    title: 'Review 3 startup pitch decks before Friday',
    category: 'Jury Review',
    dueText: 'Due in 2 days (Fri, 5:00 PM)',
    priority: 'high',
    assignedTo: 'Prof. K. Venkatesh (IITB)',
    completed: false,
    challenge: 'AI Traffic Optimization'
  },
  {
    id: 'task-2',
    title: 'Approve Milestone 2 grant payout (₹4.5 Lakhs) for AgriVision Labs',
    category: 'Grant Payout',
    dueText: 'Due Tomorrow',
    priority: 'high',
    assignedTo: 'Dr. Rajesh Sharma (Nodal Officer)',
    completed: false,
    challenge: 'Crop Disease AI'
  },
  {
    id: 'task-3',
    title: 'Confirm testbed power restoration at Pune Junction #4',
    category: 'Field Issue',
    dueText: 'Immediate attention',
    priority: 'medium',
    assignedTo: 'FlowMobility Tech Field Lead',
    completed: false,
    challenge: 'AI Traffic Optimization'
  },
  {
    id: 'task-4',
    title: 'Sign-off final scale-up sanction for Sanjeevani Tele-Diagnostics',
    category: 'Scale Sanction',
    dueText: 'Next Monday',
    priority: 'medium',
    assignedTo: 'Joint Secretary (Health)',
    completed: true,
    challenge: 'PHC Tele-Diagnostics'
  }
];

export const BUDGET_BREAKDOWN = [
  {
    mission: 'Digital Agriculture Mission',
    allocated: 15000000,
    disbursed: 6800000,
    committedPilots: 4500000,
    remaining: 3700000,
    percentageUsed: 75,
    leadStartup: 'AgriVision AI Labs'
  },
  {
    mission: 'Smart Urban Mobility Track',
    allocated: 12000000,
    disbursed: 4500000,
    committedPilots: 4000000,
    remaining: 3500000,
    percentageUsed: 70,
    leadStartup: 'FlowMobility Tech'
  },
  {
    mission: 'Ayushman Bharat Diagnostics',
    allocated: 18000000,
    disbursed: 9200000,
    committedPilots: 6500000,
    remaining: 2300000,
    percentageUsed: 87,
    leadStartup: 'Sanjeevani MedSystems'
  }
];

export const ACTIVE_CHALLENGES = [
  {
    id: 'CH-2026-081',
    title: 'AI Crop Disease Diagnostics & Soil Nutrient Prediction',
    department: 'Ministry of Electronics & IT',
    sector: 'Agritech & AI',
    stepNumber: 7,
    stepName: 'Testing in the Field',
    status: 'in_pilot',
    statusLabel: 'Live Pilot Active',
    grantBudget: 4500000,
    applicationsCount: 28,
    deadline: '2026-09-15',
    leadStartup: 'AgriVision AI Labs',
    testbedLocation: 'Varanasi & Gorakhpur (500 Farms)',
    description: 'Edge-AI cameras on farm tools diagnosing leaf diseases in real-time with >92% accuracy across 500 smallholder test farms.'
  },
  {
    id: 'CH-2026-092',
    title: 'Real-Time Edge Computer Vision for Traffic Congestion',
    department: 'Ministry of Electronics & IT',
    sector: 'Smart Cities & IoT',
    stepNumber: 5,
    stepName: 'Expert Review',
    status: 'evaluation',
    statusLabel: 'Jury Scoring',
    grantBudget: 6000000,
    applicationsCount: 42,
    deadline: '2026-09-02',
    leadStartup: 'FlowMobility Tech',
    testbedLocation: '12 Junctions, Pune Municipal Corp',
    description: 'Adaptive traffic signal algorithm based on edge camera feeds that reduces wait times without storing private vehicle plates.'
  },
  {
    id: 'CH-2026-104',
    title: 'Offline-First Tele-Diagnostics Kit for Rural Health Clinics',
    department: 'Ministry of Health & Family Welfare',
    sector: 'Healthcare & Medtech',
    stepNumber: 9,
    stepName: 'Third-Party Check',
    status: 'validation',
    statusLabel: 'STQC Audit Ready',
    grantBudget: 8000000,
    applicationsCount: 19,
    deadline: '2026-08-10',
    leadStartup: 'Sanjeevani MedSystems',
    testbedLocation: '18 PHCs in Bastar District, CG',
    description: 'Portable ECG, SpO2 and rapid blood analyzer that works without active internet and syncs when connected for specialist triage.'
  },
  {
    id: 'CH-2026-118',
    title: 'Autonomous Drone Cluster for Forest Fire Early Warning',
    department: 'Ministry of Electronics & IT',
    sector: 'Drones & Aerospace',
    stepNumber: 2,
    stepName: 'Post the Challenge',
    status: 'open_for_applications',
    statusLabel: 'Open for Proposals',
    grantBudget: 5000000,
    applicationsCount: 14,
    deadline: '2026-09-30',
    leadStartup: 'GarudaGeo Spatial Systems',
    testbedLocation: 'Simlipal Biosphere Reserve, Odisha',
    description: 'Thermal imaging drone clusters that automatically launch upon smoke detection to send live coordinates to forest control rooms.'
  }
];

export const LIVE_PILOTS = [
  {
    id: 'PLT-501',
    challengeId: 'CH-2026-081',
    challengeTitle: 'AI Crop Disease Diagnostics',
    startupName: 'AgriVision AI Labs',
    dpiitNumber: 'DIPP89234',
    testbedLocation: 'Varanasi Rural Block (32 Village Societies)',
    progress: 68,
    healthStatus: 'on_track',
    healthLabel: 'On Track',
    sanctionedGrant: 1500000,
    disbursedGrant: 900000,
    currentMilestone: 'Milestone 3: 500 Farm Device Deployments',
    nextCheckup: '2026-09-10',
    telemetrySummary: '512 sensors active • 97.4% daily uptime'
  },
  {
    id: 'PLT-502',
    challengeId: 'CH-2026-104',
    challengeTitle: 'Offline Tele-Diagnostics Kit',
    startupName: 'Sanjeevani MedSystems',
    dpiitNumber: 'DIPP44912',
    testbedLocation: 'Bastar Tribal Health Network (18 PHCs)',
    progress: 92,
    healthStatus: 'completed',
    healthLabel: 'Audit Passed',
    sanctionedGrant: 2500000,
    disbursedGrant: 2500000,
    currentMilestone: 'Milestone 4: Third-Party STQC Clinical Verification',
    nextCheckup: '2026-09-01',
    telemetrySummary: '2,400+ patients screened • 99.1% diagnostic accuracy'
  },
  {
    id: 'PLT-503',
    challengeId: 'CH-2026-092',
    challengeTitle: 'Edge Computer Vision Traffic',
    startupName: 'FlowMobility Tech',
    dpiitNumber: 'DIPP71049',
    testbedLocation: 'Pune Municipal Corridor (12 Junctions)',
    progress: 35,
    healthStatus: 'at_risk',
    healthLabel: 'Power Issue (Resolved Soon)',
    sanctionedGrant: 2000000,
    disbursedGrant: 600000,
    currentMilestone: 'Milestone 2: Optical Flow Tuning & Camera Sync',
    nextCheckup: '2026-09-04',
    telemetrySummary: '10/12 junctions online • 2 offline for generator repair'
  }
];

export const CURRENT_OFFICER = {
  name: 'Dr. Rajesh Sharma',
  role: 'Nodal Procurement Lead',
  department: 'Ministry of Electronics & IT',
  email: 'rajesh.sharma@gov.in',
  initials: 'RS'
};
