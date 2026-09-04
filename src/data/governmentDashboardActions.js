/**
 * Centralized Data and Service Configuration for Government Dashboard Action Cards
 * Ready for backend API integration.
 */

export const GOVERNMENT_DASHBOARD_ACTIONS = [
  {
    id: 'active-problem-statements',
    title: 'Active Problem Statements',
    count: 24,
    contextLabel: '+4 this month',
    iconName: 'ClipboardList',
    route: '/government/problem-statements',
    requiresAttention: false,
    tooltip: 'Currently active government problem statements open for startup proposals',
    category: 'Discovery'
  },
  {
    id: 'applications-received',
    title: 'Applications Received',
    count: 148,
    contextLabel: '+18% this month',
    iconName: 'Inbox',
    route: '/government/applications',
    requiresAttention: false,
    tooltip: 'Total number of startup proposals received across all departments',
    category: 'Applications'
  },
  {
    id: 'applications-awaiting-verification',
    title: 'Applications Awaiting Verification',
    count: 15,
    contextLabel: 'Action required',
    iconName: 'ShieldCheck',
    route: '/government/applications/verification',
    requiresAttention: true,
    attentionBadge: 'Requires Verification',
    tooltip: 'DPIIT compliance and incorporation document checks awaiting officer sign-off',
    category: 'Verification'
  },
  {
    id: 'applications-under-evaluation',
    title: 'Applications Under Evaluation',
    count: 38,
    contextLabel: 'Jury reviewing',
    iconName: 'ClipboardCheck',
    route: '/government/applications/evaluation',
    requiresAttention: true,
    attentionBadge: 'In Review',
    tooltip: 'Proposals currently undergoing scoring by IIT/technical jury members',
    category: 'Evaluation'
  },
  {
    id: 'shortlisted-startups',
    title: 'Shortlisted Startups',
    count: 52,
    contextLabel: 'Ready for sandbox',
    iconName: 'BadgeCheck',
    route: '/government/shortlisted-startups',
    requiresAttention: false,
    tooltip: 'Startups that successfully cleared technical review and compliance gates',
    category: 'Selection'
  },
  {
    id: 'active-pilots',
    title: 'Active Pilots',
    count: 7,
    contextLabel: 'Field testbeds active',
    iconName: 'Rocket',
    route: '/government/pilots',
    requiresAttention: false,
    tooltip: 'Live pilot projects deployed across Maharashtra district facilities',
    category: 'Pilots'
  },
  {
    id: 'pilot-milestone-alerts',
    title: 'Pilot Milestone',
    count: 3,
    contextLabel: '2 delayed, 1 telemetry offline',
    iconName: 'AlertTriangle',
    route: '/government/pilots/alerts',
    requiresAttention: true,
    attentionBadge: 'Alerts Active',
    tooltip: 'Pilots with upcoming, delayed, or missed milestone checkpoints',
    category: 'Monitoring'
  },
  {
    id: 'pending-actions',
    title: 'Pending Actions',
    count: 9,
    contextLabel: '4 high priority',
    iconName: 'ListTodo',
    route: '/government/pending-actions',
    requiresAttention: true,
    attentionBadge: 'High Priority',
    tooltip: 'Decisions, grant tranches, and procurement authorizations awaiting your action',
    category: 'Decisions'
  }
];

/**
 * Service function to fetch dashboard actions data.
 * Can be replaced with actual backend fetch: `api.get('/government/dashboard/actions')`
 */
export async function fetchGovernmentDashboardActions() {
  // Simulating async API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(GOVERNMENT_DASHBOARD_ACTIONS);
    }, 50);
  });
}
