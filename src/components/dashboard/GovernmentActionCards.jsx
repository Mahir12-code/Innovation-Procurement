import React from 'react';
import { GovernmentDashboardCard } from './GovernmentDashboardCard';
import { GOVERNMENT_DASHBOARD_ACTIONS } from '../../data/governmentDashboardActions';
import { useGovernmentPortal } from '../../context/GovernmentPortalContext';

const ACTION_COUNT_KEYS = {
  'active-problem-statements': 'activeProblems',
  'applications-received': 'applicationsReceived',
  'applications-awaiting-verification': 'awaitingVerification',
  'applications-under-evaluation': 'underEvaluation',
  'shortlisted-startups': 'shortlistedStartups',
  'active-pilots': 'activePilots',
  'pilot-milestone-alerts': 'pilotAlerts',
  'pending-actions': 'pendingActions'
};

export function GovernmentActionCards({ actions = GOVERNMENT_DASHBOARD_ACTIONS }) {
  let liveCounts = null;
  try {
    const portal = useGovernmentPortal();
    liveCounts = portal?.counts;
  } catch (e) {
    // If rendered outside GovernmentPortalProvider, gracefully fallback to static counts
  }

  return (
    <section aria-label="Key Action and Performance Metrics" className="space-y-3">
      {/* 8 Action Cards Grid: 4 per row on Desktop, 2 per row on Tablet, 1 per row on Mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => {
          const countKey = ACTION_COUNT_KEYS[action.id];
          const dynamicCount = liveCounts && countKey && liveCounts[countKey] !== undefined
            ? liveCounts[countKey]
            : action.count;

          return (
            <GovernmentDashboardCard
              key={action.id}
              title={action.title}
              count={dynamicCount}
              contextLabel={action.contextLabel}
              iconName={action.iconName}
              route={action.route}
              requiresAttention={action.requiresAttention}
              attentionBadge={action.attentionBadge}
              tooltip={action.tooltip}
            />
          );
        })}
      </div>
    </section>
  );
}
