export const GOVERNMENT_KPIS = [
  {
    id: 'kpi-active-challenges',
    title: 'Active Challenges',
    value: '4',
    change: '+1 from last month',
    trend: 'up',
    subtitle: 'Across 3 Priority Missions',
    icon: 'Target',
    color: 'blue'
  },
  {
    id: 'kpi-total-applications',
    title: 'Startup Applications',
    value: '103',
    change: '+34% vs Q1 baseline',
    trend: 'up',
    subtitle: '86 DPIIT-validated startups',
    icon: 'FileText',
    color: 'indigo'
  },
  {
    id: 'kpi-active-pilots',
    title: 'Active Pilots in Pilot Zone',
    value: '3',
    change: '2 On-Track, 1 Reviewing',
    trend: 'neutral',
    subtitle: '₹60 Lakhs Total Sanctioned',
    icon: 'Rocket',
    color: 'emerald'
  },
  {
    id: 'kpi-pending-decisions',
    title: 'Pending Sanction Decisions',
    value: '2',
    change: 'Requires High-Level Sanction',
    trend: 'alert',
    subtitle: '1 Scale-Up & 1 STQC Sign-off',
    icon: 'CheckCircle2',
    color: 'amber'
  }
];

export const RISK_ALERTS = [
  {
    id: 'risk-1',
    severity: 'warning',
    title: 'Power Outage at Pune Traffic Testbed',
    description: '2 camera sensor edge nodes reporting 0 telemetry for >18 hrs. FlowMobility notified.',
    timestamp: '2 hours ago',
    actionRequired: 'Request Telemetry Recovery Report'
  },
  {
    id: 'risk-2',
    severity: 'info',
    title: 'DGCA Swarm Clearance Required',
    description: 'Forest fire drone pilot application requires DGCA corridor waiver before pilot zone launch.',
    timestamp: '5 hours ago',
    actionRequired: 'Forward to Nodal Aviation Desk'
  }
];
