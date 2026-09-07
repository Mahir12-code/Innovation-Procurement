/**
 * STARTUP ELIGIBILITY RULES & ENGINE
 * Grounded in DPIIT (Department for Promotion of Industry and Internal Trade)
 * and Government of Maharashtra Startup & Innovation Policy Guidelines.
 */

import { STARTUP_SCHEMES_DATA } from './startupSchemesData';

export const ELIGIBILITY_CRITERIA_DEFINITIONS = [
  {
    id: 'crit-business-reg',
    number: '1',
    title: 'Business Registration',
    badge: 'Legal Entity',
    description: 'The entity must be registered as a recognized corporate or legal structure in India.',
    eligibleEntities: [
      'Private Limited Company (Companies Act, 2013)',
      'Limited Liability Partnership - LLP (LLP Act, 2008)',
      'Registered Partnership Firm (Partnership Act, 1932)',
      'Cooperative Society'
    ],
    note: 'Sole proprietorships or unregistered businesses are not considered startups until formally incorporated.'
  },
  {
    id: 'crit-startup-age',
    number: '2',
    title: 'Startup Age & Vintage',
    badge: 'Age Limit',
    description: 'The entity must be within the defined operating vintage since incorporation.',
    rule: 'Generally up to 10 years from the date of incorporation/registration.',
    deepTechNote: 'DeepTech startups and bio-technology ventures may have an extended eligibility window (up to 15 years) under applicable DPIIT rules.',
    note: 'Vintage is calculated from official certificate of incorporation date.'
  },
  {
    id: 'crit-turnover',
    number: '3',
    title: 'Annual Turnover Limit',
    badge: 'Financial Ceiling',
    description: 'The company turnover must not exceed the prescribed ceiling in any previous financial year.',
    rule: 'Turnover must not exceed ₹200 crore in any financial year since incorporation.',
    deepTechNote: 'DeepTech and capital-intensive research entities may qualify under higher applicable limits upon DPIIT board review.',
    note: 'Audited balance sheets or CA certification may be required during formal verification.'
  },
  {
    id: 'crit-innovation',
    number: '4',
    title: 'Innovation & Scalability',
    badge: 'Core Value',
    description: 'The business model must be oriented towards innovation, tech commercialization, or high-impact scaling.',
    requirements: [
      'Develop or significantly improve a product, process, or service',
      'Demonstrate technological innovation or scalable business model',
      'High potential for employment generation or wealth creation'
    ],
    note: 'Conventional retail trade without innovative tech processes does not qualify.'
  },
  {
    id: 'crit-original-business',
    number: '5',
    title: 'Original Business Entity',
    badge: 'Formation Rule',
    description: 'The startup must be an independently founded, greenfield enterprise.',
    rule: 'The startup should NOT have been formed by splitting up or reconstructing an existing business entity.',
    note: 'Corporate subsidiaries or reorganized legacy firms cannot claim startup concessions.'
  },
  {
    id: 'crit-dpiit-recognition',
    number: '6',
    title: 'DPIIT Recognition',
    badge: 'Statutory Credential',
    description: 'Official startup credential issued by the Department for Promotion of Industry and Internal Trade, Govt of India.',
    rule: 'DPIIT recognition may be required for certain Central Government startup schemes, tax exemptions (Section 80-IAC, Angel Tax exemption), and tender EMD waivers.',
    note: 'For many Maharashtra State Innovation Society (MSInS) grants and pilot challenges, startups with pending DPIIT status may still apply during active windows.'
  }
];

export const FORM_OPTIONS = {
  businessStructures: [
    'Private Limited',
    'LLP',
    'Partnership',
    'Cooperative Society',
    'Other'
  ],
  turnoverRanges: [
    'Below ₹25 Lakh',
    '₹25 Lakh – ₹1 Crore',
    '₹1 – ₹10 Crore',
    '₹10 – ₹200 Crore',
    'Above ₹200 Crore'
  ],
  dpiitOptions: ['Yes', 'No', 'Applied'],
  booleanOptions: ['Yes', 'No'],
  sectors: [
    'Technology',
    'Agriculture',
    'Healthcare',
    'FinTech',
    'Education',
    'Manufacturing',
    'Green Energy',
    'Other'
  ]
};

/**
 * Calculates startup age in years from incorporation date.
 */
export function calculateStartupAge(incorporationDate) {
  if (!incorporationDate) return null;
  const incDate = new Date(incorporationDate);
  if (isNaN(incDate.getTime())) return null;
  const now = new Date();
  const diffTime = Math.abs(now - incDate);
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
  return Math.floor(diffYears);
}

/**
 * Core Assessment Function
 * Returns: { status: 'LIKELY_ELIGIBLE' | 'NOT_ELIGIBLE' | 'MORE_INFO', criteriaResults, missingFields, summaryText }
 */
export function evaluateStartupEligibility(profile) {
  const missingFields = [];
  if (!profile.businessStructure) missingFields.push('Business Structure');
  if (!profile.incorporationDate) missingFields.push('Date of Incorporation');
  if (!profile.annualTurnover) missingFields.push('Annual Turnover');
  if (!profile.dpiitRecognition) missingFields.push('DPIIT Recognition');
  if (!profile.isInnovative) missingFields.push('Innovative Product/Service Declaration');
  if (!profile.isIndependent) missingFields.push('Original Entity Declaration');
  if (!profile.sector) missingFields.push('Startup Sector');

  if (missingFields.length > 0) {
    return {
      status: 'MORE_INFO',
      title: 'More Information Required',
      description: 'Please complete all required fields to evaluate your startup eligibility.',
      missingFields,
      criteriaResults: [],
      matchedSchemes: []
    };
  }

  const age = calculateStartupAge(profile.incorporationDate);
  const isDeepTechSector = ['Technology', 'Healthcare', 'Green Energy'].includes(profile.sector);
  const maxAgeAllowed = isDeepTechSector ? 15 : 10;

  // Criteria evaluations
  const regPassed = ['Private Limited', 'LLP', 'Partnership', 'Cooperative Society'].includes(
    profile.businessStructure
  );

  const agePassed = age !== null && age <= maxAgeAllowed;

  const turnoverPassed = profile.annualTurnover !== 'Above ₹200 Crore';

  const innovationPassed = profile.isInnovative === 'Yes';

  const independentPassed = profile.isIndependent === 'Yes';

  const dpiitPassed = profile.dpiitRecognition === 'Yes' || profile.dpiitRecognition === 'Applied';

  const criteriaResults = [
    {
      id: 'crit-business-reg',
      title: 'Business Registration',
      passed: regPassed,
      reason: regPassed
        ? `Registered as eligible entity (${profile.businessStructure}).`
        : `Entities registered as "${profile.businessStructure}" are generally not eligible under standard DPIIT guidelines until converted to Pvt Ltd, LLP, or Partnership.`
    },
    {
      id: 'crit-startup-age',
      title: 'Startup Age & Vintage',
      passed: agePassed,
      reason: agePassed
        ? `Incorporated ~${age} year(s) ago (within ${maxAgeAllowed} years limit${isDeepTechSector ? ' for DeepTech' : ''}).`
        : `Incorporated ~${age} year(s) ago. Standard eligibility is up to 10 years (${isDeepTechSector ? '15 for DeepTech' : '10 for general'}).`
    },
    {
      id: 'crit-turnover',
      title: 'Turnover Ceiling (≤ ₹200 Cr)',
      passed: turnoverPassed,
      reason: turnoverPassed
        ? `Turnover tier (${profile.annualTurnover}) is within the ₹200 Crore limit.`
        : `Turnover exceeds the statutory ₹200 Crore startup threshold.`
    },
    {
      id: 'crit-innovation',
      title: 'Innovation & Scalability',
      passed: innovationPassed,
      reason: innovationPassed
        ? 'Confirmed offering of innovative products, services, or improved processes.'
        : 'Entity does not demonstrate innovation or technological improvement.'
    },
    {
      id: 'crit-original-business',
      title: 'Original Business Entity',
      passed: independentPassed,
      reason: independentPassed
        ? 'Independently formed greenfield business enterprise.'
        : 'Formed by splitting or reconstructing an existing business.'
    },
    {
      id: 'crit-dpiit-recognition',
      title: 'DPIIT Recognition Status',
      passed: dpiitPassed,
      reason:
        profile.dpiitRecognition === 'Yes'
          ? 'Active DPIIT Recognition provides fast-track access to government pilot zones and tax benefits.'
          : profile.dpiitRecognition === 'Applied'
          ? 'Application pending with DPIIT. Most state innovation programs allow conditional enrollment.'
          : 'Not yet recognized by DPIIT. Central government tenders may require registration before final award.'
    }
  ];

  // Overall assessment
  const coreChecksPassed = regPassed && agePassed && turnoverPassed && innovationPassed && independentPassed;

  const status = coreChecksPassed ? 'LIKELY_ELIGIBLE' : 'NOT_ELIGIBLE';

  const title = coreChecksPassed ? 'Likely Eligible' : 'Currently Not Eligible';

  const description = coreChecksPassed
    ? 'Your startup meets the basic criteria for several startup-focused government schemes. Final eligibility depends on the individual scheme requirements.'
    : 'Your startup currently does not satisfy one or more basic statutory criteria. Review the specific criteria breakdown below to see what is required.';

  // Scheme Matching
  const matchedSchemes = matchSchemesToProfile(profile, coreChecksPassed, age);

  return {
    status,
    title,
    description,
    missingFields: [],
    criteriaResults,
    matchedSchemes
  };
}

/**
 * Scheme-Specific Rules Evaluator
 */
function matchSchemesToProfile(profile, corePassed, age) {
  return STARTUP_SCHEMES_DATA.map((scheme) => {
    let badge = 'Eligible';
    let eligibilitySummary = '';
    let isRecommended = true;

    // 1. Maharashtra Startup Week
    if (scheme.id === 'maharashtra-startup-week') {
      if (corePassed && profile.isInnovative === 'Yes') {
        badge = 'Eligible';
        eligibilitySummary = 'Ideal fit for public sector pilots. DPIIT waiver applicable for prior turnover.';
      } else if (!corePassed) {
        badge = 'Not Eligible';
        eligibilitySummary = 'Must be an incorporated entity within the vintage limit with innovative product.';
      } else {
        badge = 'Potentially Eligible';
        eligibilitySummary = 'Requires a functional working prototype (TRL 6+) ready for deployment.';
      }
    }

    // 2. Punyashlok Ahilyadevi Holkar Women Startup Scheme
    else if (scheme.id === 'punyashlok-ahilyadevi-holkar-women-startup') {
      if (!corePassed) {
        badge = 'Not Eligible';
        eligibilitySummary = 'Requires valid business registration and startup vintage.';
      } else {
        badge = 'Potentially Eligible';
        eligibilitySummary = 'Eligible if the enterprise has ≥51% woman founder shareholding or female leadership.';
      }
    }

    // 3. Maharashtra Startup Acceleration Program
    else if (scheme.id === 'maharashtra-startup-acceleration-program') {
      if (corePassed) {
        badge = 'Eligible';
        eligibilitySummary = 'Strong fit for early and growth stage scaling with structured mentorship.';
      } else {
        badge = 'Potentially Eligible';
        eligibilitySummary = 'Requires early operating traction and active Maharashtra presence.';
      }
    }

    // 4. MITDF (Venture Fund)
    else if (scheme.id === 'mitdf-innovation-fund') {
      if (corePassed && (profile.annualTurnover === '₹1 – ₹10 Crore' || profile.annualTurnover === '₹10 – ₹200 Crore')) {
        badge = 'Eligible';
        eligibilitySummary = 'Matches venture growth stage criteria for capital backing and scaling.';
      } else if (corePassed) {
        badge = 'Potentially Eligible';
        eligibilitySummary = 'Requires demonstrable product traction or commercial revenue.';
      } else {
        badge = 'Not Eligible';
        eligibilitySummary = 'Must fulfill statutory corporate governance and audited balance sheet criteria.';
      }
    }

    // 5. Maharashtra Defence & Aerospace Fund
    else if (scheme.id === 'maharashtra-defence-aerospace-fund') {
      if (profile.sector === 'Technology' || profile.sector === 'Manufacturing') {
        badge = corePassed ? 'Potentially Eligible' : 'Not Eligible';
        eligibilitySummary = 'Applicable for dual-use tech, aerospace hardware, or defence precision engineering.';
      } else {
        badge = 'Not Eligible';
        eligibilitySummary = 'Restricted to defence, aerospace, and advanced manufacturing sectors.';
      }
    }

    // 6. Social Venture Fund
    else if (scheme.id === 'maharashtra-social-venture-fund') {
      if (['Agriculture', 'Healthcare', 'Education', 'Green Energy'].includes(profile.sector)) {
        badge = corePassed ? 'Eligible' : 'Potentially Eligible';
        eligibilitySummary = 'Direct sector match for social development and rural transformation.';
      } else {
        badge = 'Potentially Eligible';
        eligibilitySummary = 'Requires measurable public social impact in Maharashtra.';
      }
    }

    // 7. Incubators & Prototyping
    else if (scheme.id === 'maharashtra-network-startup-incubators') {
      badge = 'Eligible';
      eligibilitySummary = 'Open to early-stage innovators and registered startups for lab infrastructure.';
    }

    // 8. District Business Plan Competition
    else if (scheme.id === 'district-business-plan-competition') {
      badge = 'Eligible';
      eligibilitySummary = 'Open across all 36 Maharashtra districts for grassroots solutions.';
    }

    // 9. PMEGP (Central Scheme)
    else if (scheme.id === 'pmegp-central-scheme') {
      if (profile.annualTurnover === 'Below ₹25 Lakh' || profile.annualTurnover === '₹25 Lakh – ₹1 Crore') {
        badge = 'Eligible';
        eligibilitySummary = 'Credit-linked subsidy up to 35% for new manufacturing/service units.';
      } else {
        badge = 'Potentially Eligible';
        eligibilitySummary = 'Best suited for micro-enterprises under capital investment ceilings.';
      }
    }

    // 10. SC/ST Special Incentive Scheme
    else if (scheme.id === 'sc-st-special-incentive-scheme') {
      badge = 'Potentially Eligible';
      eligibilitySummary = 'Applicable for entrepreneurs with valid Maharashtra SC/ST Caste Validity Certificate.';
    }

    // Default general mapping
    else {
      badge = corePassed ? 'Eligible' : 'Potentially Eligible';
      eligibilitySummary = scheme.highlight || scheme.description;
    }

    return {
      ...scheme,
      matchBadge: badge,
      eligibilitySummary
    };
  });
}
