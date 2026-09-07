/**
 * AI Evaluator Centralized Data Store
 * Structured mock evaluation data for government decision-support workflow.
 * Architected to be easily substituted with live REST/GraphQL API endpoints.
 */

export const INITIAL_AI_EVALUATIONS = [
  {
    applicationId: 'APP-1024',
    startupName: 'EcoVision AI',
    problemStatement: 'Smart Waste Management',
    department: 'Urban Development Department',
    submittedDate: '12 Aug 2025',
    founder: 'Sanjay Deshmukh',
    stage: 'Growth Stage (TRL 7 - Operational Field Prototype)',
    dpiitNumber: 'DIPP-89211',
    overallScore: 82,
    confidence: 'High',
    recommendation: 'Pilot Recommended',
    status: 'AI Evaluated',
    headline: 'AI-based Municipal Waste Segregation & Predictive Collection Telemetry',
    scores: {
      technicalFeasibility: {
        label: 'Technical Feasibility & TRL Maturity',
        score: 21,
        max: 25,
        rating: 'Strong',
        notes: 'TRL 7 validated. Camera-equipped edge nodes run low-latency YOLO models reliably.'
      },
      innovation: {
        label: 'Innovation & IP Uniqueness',
        score: 17,
        max: 20,
        rating: 'Strong',
        notes: '2 published Indian patents on real-time optical sorting and multi-spectrum contamination detection.'
      },
      scalability: {
        label: 'Scalability & Deployment Readiness',
        score: 16,
        max: 20,
        rating: 'Good',
        notes: 'API architecture conforms to Smart Cities Mission open data standard (IUDX).'
      },
      governmentImpact: {
        label: 'Government Impact & Cost Efficiency',
        score: 16,
        max: 20,
        rating: 'Strong',
        notes: 'Demonstrated 28% reduction in secondary transport fuel consumption in trial zone.'
      },
      financialViability: {
        label: 'Financial & Business Viability',
        score: 12,
        max: 15,
        rating: 'Good',
        notes: '18 months operating runway; seed venture-backed by Maharashtra State Innovation Society fund.'
      }
    },
    whyThisScore:
      'EcoVision AI demonstrates strong technical readiness with a working prototype and existing municipal deployment experience. The solution uses AI-based waste classification and predictive collection routing, indicating potential for measurable improvement in municipal waste-management efficiency.',
    evidenceUsed: [
      'Startup application dossier & DPIIT verification certificate',
      'Detailed technical architecture specification & edge model benchmark logs',
      'Pilot results from Pune Municipal Corporation trial (Zone 4)',
      'Third-party hardware safety and IP67 weather-proofing certifications',
      'Audited financial statements (FY24) & cap table structure',
      'Founding team technical patents and academic credentials'
    ],
    strengths: [
      'Working prototype with municipal deployment experience',
      'Innovative AI-based waste classification and contamination alerting',
      'Clear government use case with direct departmental alignment',
      'Potential citizen impact with cleaner neighborhoods and on-time pickups',
      'Scalable API-based architecture conforming to state data standards',
      'Experienced founding team with domain expertise in computer vision'
    ],
    gapsRisks: [
      'Limited large-scale deployment evidence across multiple districts simultaneously',
      'Integration with existing municipal legacy billing systems requires field validation',
      'Long-term hardware maintenance and sensor lifecycle cost data unavailable',
      'Dependence on third-party optical sensor hardware vendors'
    ],
    pilotRecommendation: {
      duration: '90 days',
      location: '2–3 municipal wards in Pune / Pimpri-Chinchwad',
      budget: '₹35 Lakhs',
      kpis: [
        'Waste collection efficiency (+25% on-time truck dispatch)',
        'Cost savings (minimum 15% route fuel optimization)',
        'AI classification accuracy (≥ 92% across mixed municipal solid waste)',
        'Citizen satisfaction score (minimum 4.2/5 in pilot wards)',
        'Operational scalability across 100+ collection points'
      ]
    }
  },
  {
    applicationId: 'APP-1027',
    startupName: 'HealthGrid Solutions',
    problemStatement: 'Digital Health Monitoring',
    department: 'Public Health Department',
    submittedDate: '18 Aug 2025',
    founder: 'Dr. Radhika Sen',
    stage: 'Clinical Validation (TRL 7)',
    dpiitNumber: 'DIPP-93041',
    overallScore: 87,
    confidence: 'High',
    recommendation: 'Pilot Recommended',
    status: 'AI Evaluated',
    headline: 'IoT Telemetry Vital Signs Relay & Rural PHC Diagnostic AI Node',
    scores: {
      technicalFeasibility: {
        label: 'Technical Feasibility & TRL Maturity',
        score: 23,
        max: 25,
        rating: 'Strong',
        notes: 'CDSCO Class B approved medical telemetry node with cellular fallback.'
      },
      innovation: {
        label: 'Innovation & IP Uniqueness',
        score: 18,
        max: 20,
        rating: 'Strong',
        notes: 'Proprietary arrhythmia early warning algorithm tuned for low-bandwidth rural networks.'
      },
      scalability: {
        label: 'Scalability & Deployment Readiness',
        score: 17,
        max: 20,
        rating: 'Good',
        notes: 'Seamless interoperability with Ayushman Bharat Digital Mission (ABDM) FHIR standards.'
      },
      governmentImpact: {
        label: 'Government Impact & Cost Efficiency',
        score: 17,
        max: 20,
        rating: 'Strong',
        notes: 'Drastically reduces emergency ambulance callouts by flagging cardiac risk 6 hours early.'
      },
      financialViability: {
        label: 'Financial & Business Viability',
        score: 12,
        max: 15,
        rating: 'Good',
        notes: 'Supported by BIRAC grant; viable device-as-a-service unit economics.'
      }
    },
    whyThisScore:
      'HealthGrid Solutions presents exceptional clinical-grade reliability, regulatory compliance, and verified field performance in remote Primary Health Centres. Its automated triage diagnostics directly address the shortage of specialist doctors in rural Maharashtra.',
    evidenceUsed: [
      'CDSCO regulatory clearance dossier and clinical safety audit',
      'Telemetry trial dataset conducted across 12 sub-district hospitals in Gadchiroli',
      'ABDM FHIR milestone-3 interoperability certification',
      'Biocompatibility test certificates (ISO 10993)',
      'Audited balance sheets & patent documentation'
    ],
    strengths: [
      'Regulatory clearance with clinical validation in district hospitals',
      'Fully compliant with Ayushman Bharat Digital Mission (ABDM)',
      'Solar-powered and low-bandwidth capability for tribal PHCs',
      'Clinical advisory board includes leading cardiologists from KEM & JJ Hospital',
      'Measurable reduction in maternal and cardiac mortality risk indicators'
    ],
    gapsRisks: [
      'Requires certified training for auxiliary nurse midwives (ANMs) before handoff',
      'Cold-chain dependency for disposable sensor patches in remote areas',
      'SLA on hardware unit replacement in deep rural zones needs contractual guarantee'
    ],
    pilotRecommendation: {
      duration: '120 days',
      location: '15 Primary Health Centres in Palghar & Nandurbar districts',
      budget: '₹45 Lakhs',
      kpis: [
        'Diagnostic uptime (≥ 98.5% uninterrupted rural connectivity)',
        'Early risk identification (verified accuracy ≥ 94% on clinical audits)',
        'Tele-consultation turnaround (under 15 minutes for acute triage)',
        'Healthcare worker usability index (≥ 85% satisfaction)'
      ]
    }
  },
  {
    applicationId: 'APP-1030',
    startupName: 'CleanPave Telemetry',
    problemStatement: 'Smart Road Maintenance',
    department: 'Public Works Department (PWD)',
    submittedDate: '24 Aug 2025',
    founder: 'Nikhil Ranade',
    stage: 'Prototype Field Testing (TRL 6)',
    dpiitNumber: 'DIPP-84321',
    overallScore: 68,
    confidence: 'Medium',
    recommendation: 'Needs Improvement',
    status: 'AI Evaluated',
    headline: 'Vehicle-Mounted Optical Pothole Detection & Road Surface Degradation Profiler',
    scores: {
      technicalFeasibility: {
        label: 'Technical Feasibility & TRL Maturity',
        score: 17,
        max: 25,
        rating: 'Moderate',
        notes: 'Optical camera system struggles with motion blur above 50 km/h and during heavy rainfall.'
      },
      innovation: {
        label: 'Innovation & IP Uniqueness',
        score: 14,
        max: 20,
        rating: 'Moderate',
        notes: 'Uses open-source computer vision frameworks with moderate proprietary refinement.'
      },
      scalability: {
        label: 'Scalability & Deployment Readiness',
        score: 13,
        max: 20,
        rating: 'Fair',
        notes: 'Heavy video data processing currently requires nightly batch uploads rather than edge telemetry.'
      },
      governmentImpact: {
        label: 'Government Impact & Cost Efficiency',
        score: 14,
        max: 20,
        rating: 'Moderate',
        notes: 'Potential to automate PWD inspection drives, but requires integration with road contractor dispatch.'
      },
      financialViability: {
        label: 'Financial & Business Viability',
        score: 10,
        max: 15,
        rating: 'Fair',
        notes: 'Early stage boot-strapped; needs working capital support to build fleet hardware mounts.'
      }
    },
    whyThisScore:
      'CleanPave Telemetry shows promising core software capability for road inspection, but hardware mount durability and adverse-weather performance currently fail to meet state highway procurement standards. Edge processing and rainy-season calibration require improvements before a formal pilot.',
    evidenceUsed: [
      'Startup proposal and sample road inspection dashcam recordings',
      'Demonstration report on Pune-Satara expressway trial',
      'Component bill-of-materials and edge TPU power specs',
      'Incorporation and DPIIT registration credentials'
    ],
    strengths: [
      'Low installation cost compared to high-end LiDAR survey vehicles',
      'Automated geotagging and classification of road potholes',
      'Responsive dashboard visualization for junior engineers',
      'Strong civil engineering domain understanding'
    ],
    gapsRisks: [
      'Performance degrades severely in monsoon conditions and low-light environments',
      'Edge processing bottleneck requires nightly Wi-Fi docking to offload video',
      'Lack of integration with PWD MahaPWD GIS road network database',
      'Limited balance sheet reserves to sustain prolonged hardware replacements'
    ],
    pilotRecommendation: {
      duration: '60 days',
      location: 'Selected arterial corridors in Nashik PWD Division',
      budget: '₹20 Lakhs',
      kpis: [
        'Pothole detection recall rate (target ≥ 88% under normal daylight)',
        'Edge processing turnaround (target under 2 hours per 50km corridor)',
        'Durability rating under continuous vehicular vibrations'
      ]
    }
  },
  {
    applicationId: 'APP-1042',
    startupName: 'AgriSense Tech',
    problemStatement: 'Precision Agriculture',
    department: 'Agriculture Department',
    submittedDate: '29 Aug 2025',
    founder: 'Aniket Jadhav',
    stage: 'Pilot Prototype (TRL 6)',
    dpiitNumber: 'DIPP-72109',
    overallScore: 74,
    confidence: 'Medium',
    recommendation: 'Needs Improvement',
    status: 'AI Evaluated',
    headline: 'Multi-Spectral Drone Soil Chemistry & Micro-Nutrient Deficit Mapping',
    scores: {
      technicalFeasibility: {
        label: 'Technical Feasibility & TRL Maturity',
        score: 19,
        max: 25,
        rating: 'Good',
        notes: 'Drone telemetry works well; chemical correlation with physical soil test samples is 78% accurate.'
      },
      innovation: {
        label: 'Innovation & IP Uniqueness',
        score: 15,
        max: 20,
        rating: 'Moderate',
        notes: 'Commercial off-the-shelf multispectral sensors with custom soil reflectance analytics.'
      },
      scalability: {
        label: 'Scalability & Deployment Readiness',
        score: 14,
        max: 20,
        rating: 'Moderate',
        notes: 'Pilot requires certified DGCA drone pilots; regional talent pipeline is constrained in Marathwada.'
      },
      governmentImpact: {
        label: 'Government Impact & Cost Efficiency',
        score: 15,
        max: 20,
        rating: 'Good',
        notes: 'Provides micro-nutrient advisory cards directly to smallholder farmers.'
      },
      financialViability: {
        label: 'Financial & Business Viability',
        score: 11,
        max: 15,
        rating: 'Good',
        notes: 'Profitable pilot testing in sugar belt co-operatives; solid local traction.'
      }
    },
    whyThisScore:
      'AgriSense Tech provides valuable soil nutrient mapping for farm clusters, but calibration against official state laboratory soil test standards requires higher precision. Standardized drone pilot availability and integration with Krishi Seva Kendra workflows are required before state-wide pilot sanctioning.',
    evidenceUsed: [
      'Comparative accuracy report against ICAR soil test benchmarks',
      'DGCA drone type certification and pilot operator licenses',
      'Data logs from 40 farm plots in Kolhapur district',
      'Startup pitch deck and audited revenue statement'
    ],
    strengths: [
      'Generates farm-level soil health advisories in Marathi and English',
      'Strong relationships with agricultural co-operatives in western Maharashtra',
      'Rapid turnaround of 24 hours from drone flight to farmer recommendation card',
      'Experienced drone pilots with zero incident safety record'
    ],
    gapsRisks: [
      'Calibration variance across black cotton vs laterite soils requires broader testing',
      'DGCA airspace permission delays can impact timely pre-sowing soil surveys',
      'Data pipeline is not yet synchronized with the Mahadbt portal'
    ],
    pilotRecommendation: {
      duration: '90 days (Single crop sowing cycle)',
      location: '3 Talukas in Chhatrapati Sambhajinagar district',
      budget: '₹28 Lakhs',
      kpis: [
        'Correlation with laboratory chemical soil tests (target ≥ 85%)',
        'Farmer advisory adoption rate (target ≥ 60% of surveyed farmers)',
        'Delivery turnaround time (under 48 hours to farmer WhatsApp/SMS)'
      ]
    }
  },
  {
    applicationId: 'APP-1051',
    startupName: 'JalMitra Systems',
    problemStatement: 'Water Quality Monitoring',
    department: 'Water Resources Department',
    submittedDate: '03 Sep 2025',
    founder: 'Amit Patil',
    stage: 'Commercial Ready (TRL 8)',
    dpiitNumber: 'DIPP-78233',
    overallScore: 91,
    confidence: 'High',
    recommendation: 'Pilot Recommended',
    status: 'AI Evaluated',
    headline: 'Submersible Ultrasonic Flow & Multi-Parameter Real-Time Water Quality Array',
    scores: {
      technicalFeasibility: {
        label: 'Technical Feasibility & TRL Maturity',
        score: 24,
        max: 25,
        rating: 'Strong',
        notes: 'NABL accredited laboratory calibration; IP68 submersible sensor arrays with anti-fouling wiper.'
      },
      innovation: {
        label: 'Innovation & IP Uniqueness',
        score: 18,
        max: 20,
        rating: 'Strong',
        notes: 'Patented acoustic wave-velocity algorithm measuring flow rate without mechanical impellers.'
      },
      scalability: {
        label: 'Scalability & Deployment Readiness',
        score: 18,
        max: 20,
        rating: 'Strong',
        notes: 'Plug-and-play SCADA integration via MODBUS/LoRaWAN; tested on canal networks.'
      },
      governmentImpact: {
        label: 'Government Impact & Cost Efficiency',
        score: 18,
        max: 20,
        rating: 'Strong',
        notes: 'Prevents estimated 22% non-revenue water leakage and detects industrial effluent contamination.'
      },
      financialViability: {
        label: 'Financial & Business Viability',
        score: 13,
        max: 15,
        rating: 'Strong',
        notes: 'Over ₹2.1 Cr revenue in municipal pilots; 24-month cash runway.'
      }
    },
    whyThisScore:
      'JalMitra Systems is an exceptionally high-readiness solution with validated NABL lab certifications, robust anti-fouling mechanical design, and field-tested telemetry. It represents a textbook candidate for immediate departmental pilot deployment and subsequent rate-contract procurement.',
    evidenceUsed: [
      'NABL test laboratory certificate of sensor calibration & measurement limits',
      'IP68 immersion certification from STQC Directorate',
      '6-month operational telemetry log from Mutha River canal pilot',
      'Patent grant letters for acoustic flow measurement system',
      'GST returns, DPIIT recognition certificate, and vendor registrations'
    ],
    strengths: [
      'NABL-accredited precision with zero mechanical maintenance impellers',
      'Automated ultrasonic anti-biofouling mechanism ensures 6-month hands-off deployment',
      'Solar-powered LoRaWAN transmitters with up to 15km line-of-sight range',
      'Direct compatibility with State Water Data Centre telemetry format',
      'Proven unit durability in high-turbidity monsoon flows'
    ],
    gapsRisks: [
      'Submerged sensor mounts require physical security against canal bank vandalism',
      'High initial capital cost per station requires structured milestone disbursements',
      'Battery longevity during extended monsoon cloud cover requires solar over-provisioning'
    ],
    pilotRecommendation: {
      duration: '90 days',
      location: 'Bhadbhada Canal & Ujjani Dam feeder network (Pune/Solapur)',
      budget: '₹40 Lakhs',
      kpis: [
        'Telemetry data availability (target ≥ 99.0% hourly packet delivery)',
        'Contamination alert latency (target under 5 minutes from threshold breach)',
        'Leakage pinpointing accuracy (within ±50 meters along canal reach)',
        'Zero sensor calibration drift over 90 consecutive days'
      ]
    }
  }
];

export const AI_EVALUATOR_STATS = {
  totalEvaluated: 47,
  evaluatedTrend: '+12% from last month',
  pilotRecommended: 12,
  pilotRecommendedCriteria: 'Score ≥ 80',
  needsImprovement: 18,
  needsImprovementCriteria: 'Score 50–79',
  underReview: 17,
  underReviewCriteria: 'Awaiting decision'
};
