// Structured dataset for Pilot Sandbox
// Provides data for Pilot Opportunities, Testbed Locations, Active Pilots, and Completed Outcomes

export const PILOT_SANDBOX_STATS = {
  pilotReady: 12,
  activePilots: 3,
  awaitingApproval: 4,
  completedPilots: 8
};

export const TESTBED_LOCATIONS = [
  {
    id: 'TB-NSK-14',
    district: 'Nashik',
    location: 'Nashik Municipal Ward 14',
    department: 'Urban Development Department',
    population: '18,400',
    dailyVolume: '12.5 tonnes waste/day',
    baselineEfficiency: '71%',
    infrastructure: 'Municipal waste collection network (14 compactor routes, 2 mini-transfer stations)',
    nodalOfficer: 'Shri R. K. Shinde (Executive Engineer)',
    contact: '+91 94222 10984'
  },
  {
    id: 'TB-NSK-CANAL',
    district: 'Nashik',
    location: 'Nashik District Rural Canal Network (Sector 4)',
    department: 'Water Resources Department',
    population: '45,000 farmers',
    dailyVolume: '240 MLD water distribution',
    baselineEfficiency: '68%',
    infrastructure: 'Sub-surface irrigation pipelines, 8 sluice gate telemetry points',
    nodalOfficer: 'Shri A. V. Deshpande (Superintending Engineer)',
    contact: '+91 98220 33445'
  },
  {
    id: 'TB-PUN-JUNC',
    district: 'Pune',
    location: '12 Arterial Junctions, Pune Municipal Corp',
    department: 'Transport Department',
    population: '350,000 commuters/day',
    dailyVolume: '140,000 vehicles/peak hr',
    baselineEfficiency: '62%',
    infrastructure: 'Existing ITMS camera gantry poles, 4G edge controller cabinets',
    nodalOfficer: 'Shri V. P. More (Joint Commissioner Transport)',
    contact: '+91 98221 00998'
  },
  {
    id: 'TB-GAD-PHC',
    district: 'Gadchiroli',
    location: '18 Primary Health Centres, Gadchiroli',
    department: 'Public Health Department',
    population: '82,000 rural residents',
    dailyVolume: '120 clinical consultations/day',
    baselineEfficiency: '55%',
    infrastructure: 'Sub-district hospital server node, solar-backed tele-medicine clinics',
    nodalOfficer: 'Dr. S. M. Gaikwad (Civil Surgeon)',
    contact: '+91 98220 98765'
  },
  {
    id: 'TB-KOP-AGRI',
    district: 'Kolhapur',
    location: 'Karveer Block Farm Clusters (14 Village Panchayats)',
    department: 'Agriculture Department',
    population: '12,500 farmers',
    dailyVolume: '8,400 hectares cultivated',
    baselineEfficiency: '64%',
    infrastructure: 'MahaAgri District Krishi Vigyan Kendra testing lab',
    nodalOfficer: 'Shri P. T. Patil (District Agriculture Officer)',
    contact: '+91 98233 44556'
  }
];

export const PILOT_OPPORTUNITIES = [
  {
    id: 'OPP-1024',
    appId: 'APP-1024',
    startupName: 'EcoVision AI',
    solution: 'Smart Waste Management Solutions',
    department: 'Urban Development Department',
    assessmentScore: 82,
    assessmentStatus: 'Pilot Recommended',
    confidence: 'High Confidence',
    technology: 'AI-based waste classification & route telemetry',
    currentTrl: '7 (Prototype Tested in Field)',
    deploymentReadiness: 'Ready for controlled municipal field deployment',
    expectedImpact: '28% improvement in collection efficiency',
    aiSummary: 'This startup demonstrates strong technical readiness and potential for controlled government pilot deployment with verified edge compute accuracy.',
    suggestedPilot: {
      duration: '90 Days',
      durationDays: 90,
      scope: '2–3 Municipal Wards',
      kpisCount: 4,
      targetLocation: 'Nashik Municipal Ward 14',
      district: 'Nashik',
      budget: '₹35 Lakhs',
      fundingRequested: '₹22.5 Lakhs'
    },
    defaultKpis: [
      { name: 'Collection Efficiency', baseline: '71%', target: '90%', frequency: 'Weekly', status: 'Pending Launch' },
      { name: 'Missed Pickups', baseline: '14%', target: '<5%', frequency: 'Daily', status: 'Pending Launch' },
      { name: 'Operational Cost', baseline: '₹100/unit', target: '₹85/unit', frequency: 'Monthly', status: 'Pending Launch' },
      { name: 'Citizen Satisfaction', baseline: '68%', target: '80%', frequency: 'Monthly', status: 'Pending Launch' }
    ],
    defaultMilestones: [
      { name: 'Setup & Vehicle Sensor Integration', status: 'Pending' },
      { name: 'Controlled Deployment in Ward 14', status: 'Pending' },
      { name: 'Field Testing & Telemetry SLA Verification', status: 'Pending' },
      { name: 'Impact Evaluation & Council Report', status: 'Pending' }
    ]
  },
  {
    id: 'OPP-1027',
    appId: 'APP-1027',
    startupName: 'HealthGrid Solutions',
    solution: 'Digital Health Monitoring & Tele-ICU Kits',
    department: 'Public Health Department',
    assessmentScore: 87,
    assessmentStatus: 'Pilot Recommended',
    confidence: 'High Confidence',
    technology: 'Portable clinical vital signs kits with low-bandwidth sync',
    currentTrl: '8 (Commercial Clinical Validation)',
    deploymentReadiness: 'Ready for multi-centre tribal health pilot',
    expectedImpact: '35% reduction in specialist triage referral time',
    aiSummary: 'Validated with CDSCO/ISO-13485 medical device compliance; demonstrates strong field telemetry resilience over intermittent rural 2G/4G networks.',
    suggestedPilot: {
      duration: '120 Days',
      durationDays: 120,
      scope: '5–18 Primary Health Centres',
      kpisCount: 5,
      targetLocation: '18 Primary Health Centres, Gadchiroli',
      district: 'Gadchiroli',
      budget: '₹50 Lakhs',
      fundingRequested: '₹20.0 Lakhs'
    },
    defaultKpis: [
      { name: 'Consultation Sync Latency', baseline: '45 min', target: '<5 min', frequency: 'Daily', status: 'Pending Launch' },
      { name: 'Diagnostic Reliability', baseline: '88%', target: '>98%', frequency: 'Weekly', status: 'Pending Launch' },
      { name: 'Device Battery Endurance', baseline: '6 hrs', target: '>12 hrs', frequency: 'Continuous', status: 'Pending Launch' },
      { name: 'Patient Triage Velocity', baseline: '3 days', target: '<4 hrs', frequency: 'Weekly', status: 'Pending Launch' },
      { name: 'Doctor Adherence Score', baseline: '65%', target: '90%', frequency: 'Monthly', status: 'Pending Launch' }
    ],
    defaultMilestones: [
      { name: 'Kit Distribution to 18 PHCs', status: 'Pending' },
      { name: 'Clinical Staff & ASHA Training', status: 'Pending' },
      { name: '1,000 Live Consultations Target', status: 'Pending' },
      { name: 'District Civil Surgeon Sign-off', status: 'Pending' }
    ]
  },
  {
    id: 'OPP-1003',
    appId: 'APP-1003',
    startupName: 'FlowMobility Tech',
    solution: 'AI Traffic Signal Adaptation & Edge Queue Sensing',
    department: 'Transport Department',
    assessmentScore: 78,
    assessmentStatus: 'Good Potential',
    confidence: 'Moderate Confidence',
    technology: 'Edge optical flow compute module for signal cycle optimization',
    currentTrl: '7 (Field Simulation Complete)',
    deploymentReadiness: 'Ready for controlled arterial corridor validation',
    expectedImpact: '25% reduction in intersection queue delay',
    aiSummary: 'Edge computer vision architecture with privacy-by-design queue measurement; warrants controlled field trial on heavy commute corridors.',
    suggestedPilot: {
      duration: '90 Days',
      durationDays: 90,
      scope: '12 Arterial Junctions',
      kpisCount: 3,
      targetLocation: '12 Arterial Junctions, Pune Municipal Corp',
      district: 'Pune',
      budget: '₹60 Lakhs',
      fundingRequested: '₹45.0 Lakhs'
    },
    defaultKpis: [
      { name: 'Queue Latency Reduction', baseline: '0%', target: '25%', frequency: 'Real-time', status: 'Pending Launch' },
      { name: 'Zero False Red Lights', baseline: '96%', target: '99.9%', frequency: 'Continuous', status: 'Pending Launch' },
      { name: 'Corridor Travel Time', baseline: '38 mins', target: '28 mins', frequency: 'Daily Peak', status: 'Pending Launch' }
    ],
    defaultMilestones: [
      { name: 'Edge Camera Retrofitting on 12 Junctions', status: 'Pending' },
      { name: 'Controller Timing Sync & Calibration', status: 'Pending' },
      { name: 'Peak-Hour Autonomous Adaptive Timing', status: 'Pending' },
      { name: 'Traffic Police Impact Audit', status: 'Pending' }
    ]
  },
  {
    id: 'OPP-1051',
    appId: 'APP-1051',
    startupName: 'JalMitra Systems',
    solution: 'Water Quality Monitoring & Contamination Early Warning',
    department: 'Water Resources Department',
    assessmentScore: 91,
    assessmentStatus: 'Pilot Recommended',
    confidence: 'High Confidence',
    technology: 'Submersible spectroscopic sensors with LoRaWAN telemetry',
    currentTrl: '8 (Ruggedized Prototype)',
    deploymentReadiness: 'Ready for state reservoir pilot',
    expectedImpact: '40% faster contamination detection',
    aiSummary: 'High-precision multi-parameter probe with IP68 rating and verified 3-year battery life; ideally suited for critical canal telemetry.',
    suggestedPilot: {
      duration: '90 Days',
      durationDays: 90,
      scope: '6 Reservoirs / Canal Outlets',
      kpisCount: 4,
      targetLocation: 'Nashik District Rural Canal Network (Sector 4)',
      district: 'Nashik',
      budget: '₹35 Lakhs',
      fundingRequested: '₹22.5 Lakhs'
    },
    defaultKpis: [
      { name: 'Purity Telemetry Latency', baseline: '120 mins', target: '<15 mins', frequency: 'Hourly', status: 'Pending Launch' },
      { name: 'Contamination Pinpoint Accuracy', baseline: '70%', target: '95%', frequency: 'Continuous', status: 'Pending Launch' },
      { name: 'Sensor Telemetry Uptime', baseline: '85%', target: '99%', frequency: 'Daily', status: 'Pending Launch' },
      { name: 'Water Quality SLA Index', baseline: '72%', target: '90%', frequency: 'Weekly', status: 'Pending Launch' }
    ],
    defaultMilestones: [
      { name: 'Sensor Submersion in 6 Sector Canals', status: 'Pending' },
      { name: 'LoRaWAN Long-Range Uplink Sync', status: 'Pending' },
      { name: 'Contamination Trigger Stress Test', status: 'Pending' },
      { name: 'State Water Board Impact Certification', status: 'Pending' }
    ]
  }
];

export const INITIAL_PILOT_SANDBOX_LIST = [
  {
    id: 'PIL-001',
    startupId: 'APP-1026',
    startup: 'AquaTech Labs',
    solution: 'Water Leakage Detection in Canal & Mains',
    department: 'Water Resources Department',
    testbedLocation: 'Nashik District Rural Canal Network (Sector 4)',
    district: 'Nashik',
    startDate: '15 Aug 2026',
    endDate: '15 Nov 2026',
    duration: '90 Days',
    daysRemaining: 68,
    currentPhase: 'Field Testing',
    progress: 68,
    kpiStatus: 'On Track',
    grantBudget: '₹35 Lakhs',
    disbursed: '₹22.5 Lakhs',
    budgetTotal: 3500000,
    budgetDisbursed: 2250000,
    officer: 'Shri R. K. Shinde (Executive Engineer)',
    contact: 'Amit Patil (+91 97654 32109)',
    objective: 'Deploy 150 acoustic and pressure transient nodes to isolate pipe bursts and prevent non-revenue water loss.',
    milestones: [
      { name: 'Pilot Approved & Framework Sign-off', status: 'Completed', date: '15 Aug 2026' },
      { name: 'Infrastructure Setup & 150 Node Placement', status: 'Completed', date: '28 Aug 2026' },
      { name: 'LoRaWAN Gateway Uplink & Telemetry Sync', status: 'Completed', date: '04 Sep 2026' },
      { name: 'Field Testing & Algorithm Accuracy Calibration', status: 'In Progress', date: 'Current Phase' },
      { name: 'Impact Evaluation & Water Loss Accounting', status: 'Upcoming', date: '01 Nov 2026' },
      { name: 'Final Report & Scale-Up Decision', status: 'Upcoming', date: '15 Nov 2026' }
    ],
    kpis: [
      { name: 'Leak Detection Accuracy', baseline: '65%', target: '90%', current: '92%', status: 'On Track', frequency: 'Weekly' },
      { name: 'Daily Telemetry Uptime', baseline: '80%', target: '95%', current: '98.4%', status: 'On Track', frequency: 'Continuous' },
      { name: 'Water Loss Reduction', baseline: '10%', target: '30%', current: '21%', status: 'At Risk', frequency: 'Weekly' },
      { name: 'Response Time to Burst Alerts', baseline: '48 hrs', target: '<6 hrs', current: '5.2 hrs', status: 'On Track', frequency: 'Per Event' }
    ],
    insights: {
      observations: [
        'Acoustic pinpointing accuracy currently exceeds target at 92%.',
        'Water loss reduction is at 21%, currently 9 percentage points below the 30% pilot goal.',
        'Sensor battery telemetry across Sector 4 shows healthy 98.4% uptime.'
      ],
      recommendedAction: 'Continue field testing while focusing maintenance crews on Sector 4 sub-channel valves.'
    }
  },
  {
    id: 'PIL-002',
    startupId: 'APP-1027',
    startup: 'HealthGrid Solutions',
    solution: 'Digital Health Monitoring & Rural Tele-ICU Kits',
    department: 'Public Health Department',
    testbedLocation: '18 Primary Health Centres, Gadchiroli',
    district: 'Gadchiroli',
    startDate: '20 Aug 2026',
    endDate: '20 Dec 2026',
    duration: '120 Days',
    daysRemaining: 104,
    currentPhase: 'Deployment',
    progress: 45,
    kpiStatus: 'At Risk',
    grantBudget: '₹50 Lakhs',
    disbursed: '₹20.0 Lakhs',
    budgetTotal: 5000000,
    budgetDisbursed: 2000000,
    officer: 'Dr. S. M. Gaikwad (Civil Surgeon)',
    contact: 'Dr. Radhika Sen (+91 98220 98765)',
    objective: 'Equip remote PHCs with clinical vital monitoring kits and link rural patients with district hospital specialists.',
    milestones: [
      { name: 'Pilot Approved & Ethics Committee Clearance', status: 'Completed', date: '20 Aug 2026' },
      { name: 'Delivery of 18 Diagnostic Kits', status: 'Completed', date: '29 Aug 2026' },
      { name: 'ANM and Nurse Clinical Operations Training', status: 'Completed', date: '04 Sep 2026' },
      { name: '1,000 Live Consultations Deployment', status: 'In Progress', date: 'Current Phase' },
      { name: 'District Hospital Specialist Triage Sync', status: 'Upcoming', date: '15 Nov 2026' },
      { name: 'Final Health Impact Assessment', status: 'Upcoming', date: '20 Dec 2026' }
    ],
    kpis: [
      { name: 'Consultation Sync Latency', baseline: '45 min', target: '<5 min', current: '14 min', status: 'At Risk', frequency: 'Daily' },
      { name: 'Device Battery Endurance', baseline: '6 hrs', target: '>12 hrs', current: '14.2 hrs', status: 'On Track', frequency: 'Continuous' },
      { name: 'Diagnostic Reliability', baseline: '90%', target: '>98%', current: '99.1%', status: 'On Track', frequency: 'Weekly' },
      { name: 'Rural Patient Footfall Served', baseline: '200', target: '1,000', current: '420', status: 'On Track', frequency: 'Monthly' }
    ],
    insights: {
      observations: [
        'Device battery life exceeds target, reliably lasting over 14 hours in remote villages.',
        'Consultation upload latency averages 14 minutes against 5-minute target due to local cellular packet drops.',
        'Clinical triage accuracy validated at 99.1% by visiting medical officers.'
      ],
      recommendedAction: 'Implement offline buffering mode on kits to allow background asynchronous transmission.'
    }
  },
  {
    id: 'PIL-003',
    startupId: 'APP-1003',
    startup: 'FlowMobility Tech',
    solution: 'AI Traffic Signal Adaptation & Edge Queue Sensing',
    department: 'Transport Department',
    testbedLocation: '12 Arterial Junctions, Pune Municipal Corp',
    district: 'Pune',
    startDate: '01 Jul 2026',
    endDate: '01 Oct 2026',
    duration: '90 Days',
    daysRemaining: 24,
    currentPhase: 'Live Operation',
    progress: 82,
    kpiStatus: 'On Track',
    grantBudget: '₹60 Lakhs',
    disbursed: '₹45.0 Lakhs',
    budgetTotal: 6000000,
    budgetDisbursed: 4500000,
    officer: 'Shri V. P. More (Joint Commissioner Transport)',
    contact: 'Rohan Deshmukh (+91 98221 00998)',
    objective: 'Implement adaptive signal green-phase timing across 12 consecutive junctions to reduce peak commuter travel time.',
    milestones: [
      { name: 'Pilot Approved & Traffic Police MOU', status: 'Completed', date: '01 Jul 2026' },
      { name: 'Optical Edge Compute Sensor Retrofit', status: 'Completed', date: '18 Jul 2026' },
      { name: 'Controller Algorithmic Calibration', status: 'Completed', date: '05 Aug 2026' },
      { name: 'Rush-Hour Adaptive Operation', status: 'In Progress', date: 'Current Phase' },
      { name: 'Corridor Travel Time Audit', status: 'Upcoming', date: '20 Sep 2026' },
      { name: 'Final Traffic Police Impact Sign-Off', status: 'Upcoming', date: '01 Oct 2026' }
    ],
    kpis: [
      { name: 'Intersection Queue Reduction', baseline: '0%', target: '25%', current: '28.5%', status: 'On Track', frequency: 'Daily' },
      { name: 'Zero False Red Lights', baseline: '96%', target: '99.9%', current: '100%', status: 'On Track', frequency: 'Continuous' },
      { name: 'Corridor Commute Time', baseline: '38 min', target: '28 min', current: '26.4 min', status: 'On Track', frequency: 'Peak' }
    ],
    insights: {
      observations: [
        'Intersection queue reduction reached 28.5%, surpassing the 25% target.',
        'Zero false red lights recorded across 1,200 hours of continuous edge processing.',
        'Corridor commute duration dropped from 38 minutes to 26.4 minutes.'
      ],
      recommendedAction: 'Prepare corridor impact documentation for municipal council scale-up evaluation.'
    }
  },
  {
    id: 'PIL-004',
    startupId: 'APP-1024',
    startup: 'EcoVision AI',
    solution: 'Smart Waste Management Solutions',
    department: 'Urban Development Department',
    testbedLocation: 'Nashik Municipal Ward 14',
    district: 'Nashik',
    startDate: '15 Sep 2026',
    endDate: '14 Dec 2026',
    duration: '90 Days',
    daysRemaining: 45,
    currentPhase: 'Field Testing',
    progress: 68,
    kpiStatus: 'On Track',
    grantBudget: '₹35 Lakhs',
    disbursed: '₹22.5 Lakhs',
    budgetTotal: 3500000,
    budgetDisbursed: 2250000,
    officer: 'Shri Rajesh Sharma (Nodal Lead)',
    contact: 'Sanjay Deshmukh (+91 98230 45678)',
    objective: 'Reduce missed waste collection and improve route efficiency using AI-based predictive scheduling across Nashik Ward 14.',
    milestones: [
      { name: 'Pilot Approved', status: 'Completed', date: '15 Sep 2026' },
      { name: 'Infrastructure Setup', status: 'Completed', date: '25 Sep 2026' },
      { name: 'Initial Deployment', status: 'Completed', date: '08 Oct 2026' },
      { name: 'Field Testing — CURRENT', status: 'In Progress', date: 'Current Phase' },
      { name: 'Impact Evaluation', status: 'Upcoming', date: '25 Nov 2026' },
      { name: 'Final Report & Decision', status: 'Upcoming', date: '14 Dec 2026' }
    ],
    kpis: [
      { name: 'Collection Efficiency', baseline: '71%', target: '90%', current: '86%', status: 'On Track', frequency: 'Weekly' },
      { name: 'Missed Pickups', baseline: '14%', target: '<5%', current: '7%', status: 'At Risk', frequency: 'Daily' },
      { name: 'Operational Cost', baseline: '₹100/unit', target: '₹85/unit', current: '₹88/unit', status: 'At Risk', frequency: 'Monthly' },
      { name: 'Citizen Satisfaction', baseline: '68%', target: '80%', current: '78%', status: 'On Track', frequency: 'Monthly' }
    ],
    insights: {
      observations: [
        'Collection efficiency has improved from 71% to 86%, but the pilot is currently 4 percentage points below the target.',
        'Missed pickups remain above target and require attention in Sector B of Ward 14.',
        'Operational costs are trending slightly above the target at ₹88/unit vs target ₹85/unit.'
      ],
      recommendedAction: 'Continue field testing while prioritizing missed-pickup reduction.'
    }
  }
];

export const COMPLETED_PILOTS = [
  {
    pilotId: 'PIL-004-CMP',
    startupId: 'APP-1024',
    startupName: 'EcoVision AI',
    solution: 'Smart Waste Management Solutions',
    department: 'Urban Development Department',
    testbed: {
      district: 'Nashik',
      location: 'Nashik Municipal Ward 14'
    },
    duration: '90 Days',
    status: 'Completed',
    overallScore: 88,
    scaleRecommendation: 'Recommended for Scale',
    supportingText: 'The pilot met its primary objectives and demonstrated measurable operational impact across municipal solid waste management.',
    highlights: {
      efficiencyImprovement: '22%',
      costReduction: '18%',
      citizenSatisfaction: '91%',
      deploymentRate: '100%'
    },
    impactAnalysis: [
      { metric: 'Collection Efficiency', before: 71, after: 93, unit: '%' },
      { metric: 'Missed Pickups', before: 14, after: 4, unit: '%' },
      { metric: 'Operational Cost', before: 100, after: 82, unit: '₹/unit' },
      { metric: 'Citizen Satisfaction', before: 68, after: 91, unit: '%' }
    ],
    scaleScope: {
      targetWards: 24,
      district: 'Nashik',
      projectedImpact: '20–25% efficiency improvement across district',
      estimatedBudget: '₹1.45 Crores',
      scaleStatus: 'Pending Decision'
    },
    officerNotes: 'Demonstrated automated route optimization without requiring vehicle replacements. Field crew adopted handheld telemetry with zero downtime.'
  },
  {
    pilotId: 'PIL-000-CMP',
    startupId: 'APP-1051',
    startupName: 'JalMitra Systems',
    solution: 'Water Quality Monitoring & Contamination Early Warning',
    department: 'Water Resources Department',
    testbed: {
      district: 'Pune',
      location: '6 Khadakwasla Canal Sub-reservoirs'
    },
    duration: '120 Days',
    status: 'Completed',
    overallScore: 91,
    scaleRecommendation: 'Recommended for Scale',
    supportingText: 'The pilot successfully automated multi-parameter pathogen detection across major surface water reservoirs with continuous telemetry.',
    highlights: {
      efficiencyImprovement: '34%',
      costReduction: '24%',
      citizenSatisfaction: '94%',
      deploymentRate: '100%'
    },
    impactAnalysis: [
      { metric: 'Purity Telemetry Latency', before: 120, after: 8, unit: 'mins' },
      { metric: 'Contamination Alert Accuracy', before: 65, after: 98, unit: '%' },
      { metric: 'Manual Sampling Overhead', before: 100, after: 68, unit: '₹/kL' },
      { metric: 'Potable Water Compliance', before: 78, after: 96, unit: '%' }
    ],
    scaleScope: {
      targetWards: 36,
      district: 'Pune District Surface Water Reservoirs',
      projectedImpact: 'Automated telemetry network across 36 irrigation sub-divisions',
      estimatedBudget: '₹2.80 Crores',
      scaleStatus: 'Pending Decision'
    },
    officerNotes: 'Sensors survived monsoon silt buildup and maintained LoRaWAN connectivity throughout testing.'
  }
];
