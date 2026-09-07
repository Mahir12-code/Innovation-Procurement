export const PIPELINE_STAGES = [
  {
    id: 1,
    key: 'problem_identified',
    name: 'Problem Identified',
    shortName: 'Problem ID',
    description: 'Internal department requirement definition and problem scoping',
    phase: 'Scoping',
    count: 6,
    color: 'slate'
  },
  {
    id: 2,
    key: 'challenge_published',
    name: 'Challenge Published',
    shortName: 'Published',
    description: 'Public RFP open for startup applications with clear evaluation criteria',
    phase: 'Sourcing',
    count: 4,
    color: 'blue'
  },
  {
    id: 3,
    key: 'startup_discovery',
    name: 'Startup Discovery',
    shortName: 'Discovery',
    description: 'Outreach and automated matchmaking via DPIIT startup repository',
    phase: 'Sourcing',
    count: 18,
    color: 'indigo'
  },
  {
    id: 4,
    key: 'eligibility_screening',
    name: 'Eligibility Screening',
    shortName: 'Screening',
    description: 'Compliance, DPIIT status, DPI/IP validation, and preliminary criteria check',
    phase: 'Screening',
    count: 12,
    color: 'amber'
  },
  {
    id: 5,
    key: 'expert_evaluation',
    name: 'Expert Evaluation',
    shortName: 'Evaluation',
    description: 'Multi-member technical jury and domain committee scoring',
    phase: 'Evaluation',
    count: 8,
    color: 'orange'
  },
  {
    id: 6,
    key: 'pilot_designed',
    name: 'Pilot Designed',
    shortName: 'Pilot Design',
    description: 'Pilot Zone scoping, KPI baselining, safety protocol, and contract signing',
    phase: 'Piloting',
    count: 5,
    color: 'purple'
  },
  {
    id: 7,
    key: 'pilot_executed',
    name: 'Pilot Executed',
    shortName: 'Pilot Execution',
    description: 'Active field deployment across designated testbed sites',
    phase: 'Piloting',
    count: 7,
    color: 'teal'
  },
  {
    id: 8,
    key: 'performance_measured',
    name: 'Performance Measured',
    shortName: 'KPI Review',
    description: 'Automated telemetry analysis and field SLA verification',
    phase: 'Validation',
    count: 4,
    color: 'emerald'
  },
  {
    id: 9,
    key: 'independent_validation',
    name: 'Independent Validation',
    shortName: 'Validation',
    description: 'Third-party audit (STQC/IITs/CSIR) certification and safety audit',
    phase: 'Validation',
    count: 3,
    color: 'cyan'
  },
  {
    id: 10,
    key: 'scale_up_decision',
    name: 'Scale-Up Decision',
    shortName: 'Scale Decision',
    description: 'Direct procurement sanction, GeM catalogue on-boarding, and pan-India rollout',
    phase: 'Procurement',
    count: 2,
    color: 'emerald'
  }
];
