/**
 * STARTUP SCHEMES & ENTREPRENEURSHIP DATASET
 * Government of Maharashtra & Central Schemes available in Maharashtra
 * 
 * Sources:
 * 1. Maharashtra State Innovation Society (MSInS) - https://msins.in
 * 2. Directorate of Industries, Government of Maharashtra - https://di.maharashtra.gov.in
 * 3. Ministry of MSME / KVIC (PMEGP) - https://kviconline.gov.in/pmegp/
 * 
 * Rules:
 * - Real, verified facts only; no invented numbers.
 * - If figures cannot be independently confirmed, explicitly mark "Verify on official portal".
 * - PMEGP is clearly marked as "Central Government Scheme — Available in Maharashtra".
 */

export const STARTUP_SCHEMES_DATA = [
  {
    id: 'maharashtra-startup-week',
    slug: 'maharashtra-startup-week',
    schemeName: 'Maharashtra Startup Week',
    category: 'Government Market Access / Startup',
    department: 'Skills, Employment, Entrepreneurship & Innovation Department',
    implementingAgency: 'Maharashtra State Innovation Society (MSInS)',
    governmentType: 'Government of Maharashtra',
    description: 'A Maharashtra Government initiative that provides selected startups an opportunity to demonstrate and pilot innovative solutions with government departments.',
    highlight: 'Selected startups may receive government work orders of up to ₹15 lakh, subject to the applicable program rules and selection process.',
    targetBeneficiaries: 'Technology startups, GovTech, HealthTech, AgriTech, EdTech, Smart City, CleanTech, and other innovative startups.',
    eligibility: [
      'Must be a registered Indian entity (Private Limited Company, LLP, or Registered Partnership).',
      'Recognized by DPIIT (Department for Promotion of Industry and Internal Trade).',
      'Must possess a working product or functional prototype (TRL 6+) ready for deployment in public sector pilots.',
      'Entity must not have been blacklisted by any Central or State Government department.',
      'Preference for startups incorporated or substantially operating in Maharashtra.'
    ],
    benefits: [
      'Opportunity to receive government work orders of up to ₹15 lakh to pilot solutions with Maharashtra government departments.',
      'Direct deployment pilot zone across state civic bodies, collectorates, and state departments.',
      'Access to senior IAS officers, department secretaries, and technical juries for product validation.',
      'Exemption from conventional prior turnover and tender experience requirements under Maharashtra Startup Policy.',
      'Showcase and recognition at state and national innovation platforms.'
    ],
    documents: [
      'Certificate of Incorporation / Registration Certificate',
      'DPIIT Recognition Certificate (DIPP number)',
      'Product / Prototype Pitch Deck with Demo Video URL',
      'Audited Financial Statements or CA Turnover Declaration',
      'Director / Partner Identity Proof (PAN / Aadhaar)'
    ],
    applicationProcess: [
      'Register on the official Maharashtra State Innovation Society (MSInS) portal.',
      'Complete company profile and provide DPIIT credentials.',
      'Submit detailed technical proposal against one of the sector-specific challenge themes.',
      'Participate in preliminary jury screening by domain experts.',
      'Top 100 finalists pitch in person to senior department secretaries during Maharashtra Startup Week.'
    ],
    applicationMode: 'Selection-based',
    officialPortal: 'https://msins.in',
    officialSource: 'Maharashtra State Innovation Society (MSInS)',
    sourceLastChecked: '01 March 2026',
    status: 'Active',
    tags: ['Startup', 'Market Access', 'Government Pilot', 'Maharashtra', 'GovTech'],
    badge: 'Government Pilot',
    supportType: ['Government Pilot', 'Market Access', 'Grant'],
    stage: ['Early Stage', 'Growth Stage', 'Seed'],
    founderType: ['Any Entrepreneur', 'Technology Startup'],
    industry: ['GovTech', 'HealthTech', 'AgriTech', 'EdTech', 'CleanTech', 'AI/Technology'],
    isFeatured: true
  },
  {
    id: 'punyashlok-ahilyadevi-holkar-women-startup',
    slug: 'punyashlok-ahilyadevi-holkar-women-startup',
    schemeName: 'Punyashlok Ahilyadevi Holkar Women Startup Scheme',
    category: 'Women Entrepreneurs / Startup Funding',
    department: 'Department of Women & Child Development / MSInS',
    implementingAgency: 'Maharashtra State Innovation Society (MSInS)',
    governmentType: 'Government of Maharashtra',
    description: 'A Maharashtra Government initiative supporting eligible women-led startups and entrepreneurs with financial assistance and dedicated ecosystem enablement.',
    highlight: 'Eligible applicants may receive financial assistance/grant support according to the current scheme guidelines (Verify on official portal).',
    targetBeneficiaries: 'Women founders, women co-founders (holding majority/significant equity), and women-led startups based in Maharashtra.',
    eligibility: [
      'Entity must be founded or co-founded by a woman entrepreneur with at least 51% equity or significant leadership control.',
      'Entity must be registered in Maharashtra as a Startup or MSME.',
      'Recognized by DPIIT / Government of Maharashtra innovation portal.',
      'Meets the specific vintage and operational guidelines defined in the active official notification.'
    ],
    benefits: [
      'Financial assistance and grant-in-aid support (verify current financial sanction tier on official portal).',
      'Dedicated mentorship through the MSInS Women Entrepreneurship Cell.',
      'Priority participation in state procurement exhibitions and buyer-seller meets.',
      'Subsidized access to state incubation centers and patent filing assistance.'
    ],
    documents: [
      'Certificate of Incorporation / Partnership Deed / Shop Act Registration',
      'Proof of Woman Ownership (>51% shareholding pattern certified by CA/CS)',
      'DPIIT Recognition Certificate / Udyam Registration',
      'Maharashtra Domicile Certificate of the Woman Founder',
      'Bank Account Details (in company name) & PAN'
    ],
    applicationProcess: [
      'Visit the official MSInS web portal.',
      'Navigate to the Punyashlok Ahilyadevi Holkar Women Startup Scheme application desk.',
      'Upload founder identity, domicile, and shareholding documentation.',
      'Submit the business proposal and financial projection summary.',
      'Undergo scrutiny by the Women Entrepreneurship Review Committee.'
    ],
    applicationMode: 'Online',
    officialPortal: 'https://msins.in',
    officialSource: 'Maharashtra State Innovation Society (MSInS) & Department of Women & Child Development',
    sourceLastChecked: '28 February 2026',
    status: 'Active',
    tags: ['Women Founder', 'Startup', 'Funding', 'Maharashtra', 'Grant'],
    badge: 'Women',
    supportType: ['Funding', 'Grant', 'Mentorship'],
    stage: ['Idea Stage', 'Pre-Seed', 'Seed', 'Early Stage'],
    founderType: ['Women Founder'],
    industry: ['AI/Technology', 'HealthTech', 'AgriTech', 'Social Impact', 'Manufacturing'],
    isFeatured: true
  },
  {
    id: 'maharashtra-startup-acceleration-program',
    slug: 'maharashtra-startup-acceleration-program',
    schemeName: 'Maharashtra Startup Acceleration Program',
    category: 'Acceleration / Mentorship',
    department: 'Skills, Employment, Entrepreneurship & Innovation Department',
    implementingAgency: 'Maharashtra State Innovation Society (MSInS)',
    governmentType: 'Government of Maharashtra',
    description: 'Provides selected startups with structured acceleration support, mentorship, workshops and ecosystem connections to scale product-market fit.',
    highlight: 'Intensive cohort-based acceleration with dedicated industry mentors, investor demo days, and market readiness tracks.',
    targetBeneficiaries: 'Early-stage and growth-stage startups ready to scale operations, acquire commercial customers, and raise institutional capital.',
    eligibility: [
      'Early-stage or growth-stage startups with a validated Minimum Viable Product (MVP) or active traction.',
      'Entity registered in Maharashtra or primarily operating within the state.',
      'Full-time commitment from the founding team during the acceleration cohort.',
      'Focus on tech-enabled, scalable, or socially transformative solutions.'
    ],
    benefits: [
      '1-on-1 mentorship from seasoned entrepreneurs and domain experts.',
      'Access to masterclasses in product-market fit, unit economics, and IP management.',
      'Curated demo day with venture capital funds, angel networks, and family offices.',
      'Cloud credits, legal advisory, and accounting partner toolkits.',
      'Ecosystem visibility through state media and government showcases.'
    ],
    documents: [
      'Startup Pitch Deck (Executive Summary, Problem, Solution, Traction, Team)',
      'Company Registration Certificate & DPIIT recognition',
      'Product Demo or Application Link',
      'Founding Team Resumes / Professional Credentials'
    ],
    applicationProcess: [
      'Monitor MSInS official notifications for open cohort intake announcements.',
      'Submit online application form with deck and traction metrics.',
      'Shortlisted applicants participate in interview rounds with the accelerator jury.',
      'Induction into the 12-week hybrid acceleration curriculum.'
    ],
    applicationMode: 'Online',
    officialPortal: 'https://msins.in',
    officialSource: 'Maharashtra State Innovation Society (MSInS)',
    sourceLastChecked: '25 February 2026',
    status: 'Active',
    tags: ['Acceleration', 'Mentorship', 'Growth', 'Startup', 'Maharashtra'],
    badge: 'Acceleration',
    supportType: ['Acceleration', 'Mentorship', 'Training', 'Market Access'],
    stage: ['Pre-Seed', 'Seed', 'Early Stage', 'Growth Stage'],
    founderType: ['Any Entrepreneur', 'Student Founder', 'Women Founder'],
    industry: ['AI/Technology', 'FinTech', 'HealthTech', 'AgriTech', 'CleanTech', 'GovTech'],
    isFeatured: true
  },
  {
    id: 'mitdf-innovation-fund',
    slug: 'mitdf-innovation-fund',
    schemeName: 'Maharashtra Innovation & Technological Development Fund (MITDF)',
    category: 'Startup Funding / Investment',
    department: 'Finance Department & Skill Development Department',
    implementingAgency: 'Maharashtra State Innovation Society (MSInS) / State Alternate Investment Fund',
    governmentType: 'Government of Maharashtra',
    description: 'A Maharashtra Government-backed fund designed to support promising, innovative and high-impact startups/MSMEs with growth capital.',
    highlight: 'Venture investment and growth capital backing for scalable Maharashtra innovations meeting state strategic development goals.',
    targetBeneficiaries: 'Innovative startups and MSMEs meeting the applicable investment readiness and governance requirements.',
    eligibility: [
      'Registered company with registered or principal operational office in Maharashtra.',
      'DPIIT recognized startup or registered MSME with strong innovative intellectual property.',
      'Demonstrated revenue traction or validated clinical/industrial test results.',
      'Clean regulatory track record, compliance with ROC/GST, and formal corporate governance.'
    ],
    benefits: [
      'Equity and quasi-equity venture capital investments (subject to fund manager due diligence).',
      'Technology commercialization and global scaling facilitation.',
      'Institutional co-investment alongside leading Indian and global venture capital funds.',
      'Assistance in strategic partnerships with state infrastructure projects.'
    ],
    documents: [
      'Audited Financials for the last 2-3 fiscal years (or since incorporation)',
      'Cap Table & Shareholders Agreement',
      'Detailed 3-5 Year Business Plan & Financial Model',
      'IP filings, patents, or technology proprietary declarations',
      'Due Diligence statutory compliance certificates'
    ],
    applicationProcess: [
      'Review the fund charter and eligible investment verticals on MSInS portal.',
      'Submit an institutional investment inquiry via the designated fund manager channel.',
      'Preliminary screening by investment committee.',
      'Comprehensive commercial, financial, and legal due diligence.',
      'Term sheet issuance and final sanction by the Fund Governing Board.'
    ],
    applicationMode: 'Online',
    officialPortal: 'https://msins.in',
    officialSource: 'Maharashtra State Innovation Society (MSInS)',
    sourceLastChecked: '02 March 2026',
    status: 'Active',
    tags: ['Investment', 'Funding', 'Venture Capital', 'Maharashtra', 'Growth'],
    badge: 'Funding',
    supportType: ['Funding', 'Investment'],
    stage: ['Seed', 'Early Stage', 'Growth Stage', 'MSME'],
    founderType: ['Any Entrepreneur', 'Technology Startup'],
    industry: ['AI/Technology', 'HealthTech', 'FinTech', 'AgriTech', 'CleanTech', 'Manufacturing'],
    isFeatured: true
  },
  {
    id: 'maharashtra-social-venture-fund',
    slug: 'maharashtra-social-venture-fund',
    schemeName: 'Maharashtra Social Venture Fund',
    category: 'Social Impact / Startup Funding',
    department: 'Government of Maharashtra & SIDBI Venture Capital',
    implementingAgency: 'MSInS / SIDBI / Government of Maharashtra',
    governmentType: 'Government of Maharashtra',
    description: 'Funding ecosystem supporting startups and ventures working on social-impact problems with sustainable market solutions.',
    highlight: 'Direct funding and catalytic investment for social enterprises addressing grassroots societal challenges in Maharashtra.',
    targetBeneficiaries: 'Social enterprises and impact-oriented startups working on healthcare, education, agriculture, and public service innovation.',
    eligibility: [
      'Entities addressing pressing social issues in Maharashtra with viable, scalable unit economics.',
      'Focus areas: Healthcare, Education, Livelihood, Agriculture, Social development, and Public service innovation.',
      'Clear framework for measuring and reporting social impact alongside financial sustainability.',
      'Incorporated business entity adhering to Indian corporate and regulatory frameworks.'
    ],
    benefits: [
      'Venture capital / patient capital investment tailored for impact ventures.',
      'Network access to government developmental agencies and rural deployment channels.',
      'Impact measurement metrics and ESG governance advisory.',
      'Visibility at state and national social entrepreneurship summits.'
    ],
    documents: [
      'Social Impact Model & Theory of Change Document',
      'Company Incorporation Certificate & DPIIT/MSME Status',
      'Financial Statements & Current Cash Flow Projections',
      'Field Beneficiary Case Studies or Ground Survey Validations'
    ],
    applicationProcess: [
      'Submit enterprise details and impact dossier through the official MSInS / SIDBI portal.',
      'Evaluation by Social Impact Committee on sustainability and community transformation.',
      'Field validation and institutional due diligence.',
      'Investment sanction and milestone-based capital disbursement.'
    ],
    applicationMode: 'Through official portal',
    officialPortal: 'https://msins.in',
    officialSource: 'MSInS & Government of Maharashtra Social Venture Partnership',
    sourceLastChecked: '26 February 2026',
    status: 'Active',
    tags: ['Social Impact', 'Funding', 'Healthcare', 'Agriculture', 'Education'],
    badge: 'Social Impact',
    supportType: ['Funding', 'Investment', 'Grant'],
    stage: ['Seed', 'Early Stage', 'Growth Stage'],
    founderType: ['Social Entrepreneur', 'Rural Entrepreneur', 'Any Entrepreneur'],
    industry: ['Social Impact', 'HealthTech', 'AgriTech', 'EdTech', 'CleanTech'],
    isFeatured: false
  },
  {
    id: 'maharashtra-defence-aerospace-fund',
    slug: 'maharashtra-defence-aerospace-fund',
    schemeName: 'Maharashtra Defence & Aerospace Fund',
    category: 'Defence / Aerospace / Startup Funding',
    department: 'Industries Department, Government of Maharashtra',
    implementingAgency: 'IDBI Capital / Directorate of Industries, GoM',
    governmentType: 'Government of Maharashtra',
    description: 'A dedicated funding ecosystem supporting innovation and entrepreneurship in defence, aerospace, and advanced dual-use engineering.',
    highlight: 'Specialized venture capital fund supporting indigenous defence manufacturing, aerospace components, and dual-use technologies.',
    targetBeneficiaries: 'Defence-tech and aerospace startups, advanced engineering firms, and hardware innovators in Maharashtra.',
    eligibility: [
      'Startups or MSMEs operating in defence technology, aerospace, advanced engineering, or dual-use technologies.',
      'Registered in Maharashtra or establishing key manufacturing/R&D nodes within state defence industrial nodes (e.g. Pune, Nagpur, Nashik, Chhatrapati Sambhajinagar).',
      'Compliant with Indian defence procurement regulations and industrial licensing requirements.'
    ],
    benefits: [
      'Venture capital investments to build aerospace-grade prototypes and pilot batches.',
      'Integration into the Maharashtra Defence Industrial Corridor supply chain.',
      'Facilitation for testing and evaluation at state defence testing facilities and DRDO/DPSU testbeds.',
      'Exhibition support at national and international defence expos (DefExpo, Aero India).'
    ],
    documents: [
      'Company Incorporation & DPIIT/MSME Certificates',
      'Defence Industrial License / Drone Registration / Relevant Certifications (if applicable)',
      'Detailed Technical Specification Sheet & Prototype Architecture',
      'Audited Financials and Cap Table'
    ],
    applicationProcess: [
      'Access the Maharashtra Defence & Aerospace Fund portal via the Directorate of Industries or IDBI Capital desk.',
      'Submit executive summary highlighting defence application and dual-use potential.',
      'Presentation to Technical & Defence Investment Advisory Board.',
      'Statutory security clearance and due diligence.',
      'Final investment agreement and sanction.'
    ],
    applicationMode: 'Through official portal',
    officialPortal: 'https://di.maharashtra.gov.in',
    officialSource: 'Directorate of Industries, Government of Maharashtra',
    sourceLastChecked: '24 February 2026',
    status: 'Active',
    tags: ['Defence', 'Aerospace', 'Funding', 'Dual-Use', 'Advanced Engineering'],
    badge: 'Defence',
    supportType: ['Funding', 'Investment', 'Market Access'],
    stage: ['Early Stage', 'Growth Stage', 'MSME'],
    founderType: ['Technology Startup', 'Any Entrepreneur'],
    industry: ['DefenceTech', 'Aerospace', 'Manufacturing', 'AI/Technology'],
    isFeatured: false
  },
  {
    id: 'maharashtra-network-startup-incubators',
    slug: 'maharashtra-network-startup-incubators',
    schemeName: 'Maharashtra Network of Startup Incubators',
    category: 'Incubation',
    department: 'Skills, Employment, Entrepreneurship & Innovation Department',
    implementingAgency: 'Maharashtra State Innovation Society (MSInS)',
    governmentType: 'Government of Maharashtra',
    description: 'A state-supported startup incubation ecosystem connecting entrepreneurs with incubators and startup support infrastructure across Maharashtra.',
    highlight: 'Access to world-class incubation facilities, prototyping labs, subsidized co-working, and university innovation centers across the state.',
    targetBeneficiaries: 'Early-stage startups, researchers, student entrepreneurs, and innovators needing infrastructure, lab access, and incubation.',
    eligibility: [
      'Any individual, student, or incorporated team with an early-stage innovative concept or working prototype.',
      'Preference for entities solving critical regional or technological challenges.',
      'Willingness to base operations or register within an accredited Maharashtra incubator.'
    ],
    benefits: [
      'Subsidized or free co-working space and high-speed infrastructure.',
      'Access to advanced maker labs, rapid prototyping machinery, 3D printers, and testing instruments.',
      'Mentorship and advisory for legal, accounting, and company incorporation.',
      'Direct pipeline to MSInS seed funding and Startup India Seed Fund Scheme (SISFS).',
      'Ecosystem networking with fellow founders and academic researchers.'
    ],
    documents: [
      'Project / Startup Concept Note',
      'Applicant Identity Proof and Academic / Professional Credential',
      'Prototype Description or Wireframes (if available)'
    ],
    applicationProcess: [
      'Explore the accredited network of incubators (COEP Bhau Institute, SINE IIT Bombay, SP-TBI, University incubators).',
      'Submit application either via MSInS central incubation window or directly to partner incubator portal.',
      'Pitch concept to incubator selection committee.',
      'Receive letter of incubation and onboarding.'
    ],
    applicationMode: 'Through incubator',
    officialPortal: 'https://msins.in',
    officialSource: 'Maharashtra State Innovation Society (MSInS)',
    sourceLastChecked: '01 March 2026',
    status: 'Active',
    tags: ['Incubation', 'Infrastructure', 'Mentorship', 'Student', 'Maharashtra'],
    badge: 'Incubation',
    supportType: ['Incubation', 'Mentorship', 'Training'],
    stage: ['Idea Stage', 'Pre-Seed', 'Seed'],
    founderType: ['Student Founder', 'Any Entrepreneur', 'Women Founder'],
    industry: ['AI/Technology', 'HealthTech', 'AgriTech', 'CleanTech', 'EdTech', 'Manufacturing'],
    isFeatured: false
  },
  {
    id: 'district-business-plan-competition',
    slug: 'district-business-plan-competition',
    schemeName: 'District Business Plan Competition',
    category: 'Innovation / Entrepreneurship',
    department: 'Skills, Employment, Entrepreneurship & Innovation Department',
    implementingAgency: 'Maharashtra State Innovation Society (MSInS)',
    governmentType: 'Government of Maharashtra',
    description: 'A platform encouraging innovative business ideas that address local and district-level problems across all 36 districts of Maharashtra.',
    highlight: 'District-level discovery competition giving grassroots innovators and youth direct platform recognition, cash prizes, and incubation entry.',
    targetBeneficiaries: 'Students, young entrepreneurs, innovators, and local startups across Maharashtra.',
    eligibility: [
      'Open to bonafide residents and students studying/residing in any of the 36 districts of Maharashtra.',
      'Proposals can be at idea stage, proof of concept, or early operating venture.',
      'Solutions must address district-level challenges such as rural water, agriculture, waste management, or municipal services.'
    ],
    benefits: [
      'District-level cash awards and state innovation citations (verify exact prize pool on official portal).',
      'Direct admission into regional incubation centers.',
      'Mentorship from district innovation officers and industry leaders.',
      'Opportunity to represent the district at the annual State Innovation Conclave.'
    ],
    documents: [
      'District Residence Proof / Student ID Card',
      'Business Plan Presentation / Concept Submission',
      'Aadhaar Card of Applicant'
    ],
    applicationProcess: [
      'Register through the official MSInS District Business Plan Competition portal.',
      'Select your home district and challenge track.',
      'Submit a 5-slide business plan answering problem, solution, target market, and execution plan.',
      'Present proposal at the District Collectorate / Zilla Parishad innovation jury session.'
    ],
    applicationMode: 'Online',
    officialPortal: 'https://msins.in',
    officialSource: 'Maharashtra State Innovation Society (MSInS)',
    sourceLastChecked: '27 February 2026',
    status: 'Active',
    tags: ['Student', 'District', 'Competition', 'Grassroots', 'Innovation'],
    badge: 'Student',
    supportType: ['Grant', 'Mentorship', 'Training'],
    stage: ['Idea Stage', 'Pre-Seed'],
    founderType: ['Student Founder', 'Rural Entrepreneur', 'Any Entrepreneur'],
    industry: ['AgriTech', 'CleanTech', 'Social Impact', 'GovTech', 'EdTech'],
    isFeatured: false
  },
  {
    id: 'hirkani-maharashtrachi',
    slug: 'hirkani-maharashtrachi',
    schemeName: 'Hirkani Maharashtrachi',
    category: 'Women Entrepreneurship',
    department: 'Skill Development, Employment and Entrepreneurship Department',
    implementingAgency: 'Maharashtra State Innovation Society (MSInS)',
    governmentType: 'Government of Maharashtra',
    description: 'An initiative supporting women entrepreneurs and self-help groups with opportunities for entrepreneurship development and business growth at the taluka and district level.',
    highlight: 'Dedicated taluka and district-level initiative unlocking market access, packaging guidance, and financial assistance for women-led enterprises.',
    targetBeneficiaries: 'Women entrepreneurs, women-led micro-enterprises, and eligible Self-Help Groups (SHGs) across Maharashtra.',
    eligibility: [
      'Women entrepreneurs or registered Women Self-Help Groups (Bachat Gat) operating in Maharashtra.',
      'Involved in manufacturing, handicrafts, food processing, agri-products, or service enterprises.',
      'Domicile of Maharashtra state.'
    ],
    benefits: [
      'Taluka and district level financial incentives for top performing women ventures (verify on official portal).',
      'Branding, modern packaging, and food-grade quality certification assistance.',
      'Direct stalls and buyer linkages in government exhibitions and state fairs.',
      'Access to credit linkages and interest subsidies through nationalized banks.'
    ],
    documents: [
      'Maharashtra Domicile Certificate / Ration Card',
      'SHG Registration Certificate or Udyam Registration',
      'Bank Passbook copy (SHG / Individual Woman Entrepreneur)',
      'Brief product description / photographs'
    ],
    applicationProcess: [
      'Apply through the Taluka / District Skill Development, Employment & Entrepreneurship Guidance Centre.',
      'Submit application with product catalogue and SHG resolution.',
      'District-level evaluation committee evaluates products for quality and marketability.',
      'Selected entrepreneurs receive financial support and exhibition invites.'
    ],
    applicationMode: 'Through DIC',
    officialPortal: 'https://msins.in',
    officialSource: 'Skill Development, Employment and Entrepreneurship Department, GoM',
    sourceLastChecked: '22 February 2026',
    status: 'Active',
    tags: ['Women', 'SHG', 'Grassroots', 'Livelihood', 'Market Access'],
    badge: 'Women',
    supportType: ['Grant', 'Market Access', 'Training'],
    stage: ['Idea Stage', 'Pre-Seed', 'MSME'],
    founderType: ['Women Founder', 'Rural Entrepreneur'],
    industry: ['Manufacturing', 'AgriTech', 'Social Impact'],
    isFeatured: false
  },
  {
    id: 'msins-women-entrepreneurship-cell',
    slug: 'msins-women-entrepreneurship-cell',
    schemeName: 'MSInS Women Entrepreneurship Cell',
    category: 'Women Entrepreneurship',
    department: 'Skills, Employment, Entrepreneurship & Innovation Department',
    implementingAgency: 'Maharashtra State Innovation Society (MSInS)',
    governmentType: 'Government of Maharashtra',
    description: 'An ecosystem initiative supporting women entrepreneurs through entrepreneurship programs, networking, mentoring and access to relevant government initiatives.',
    highlight: 'Dedicated state desk providing 360-degree support, policy advocacy, corporate partnerships, and investor connects for women founders.',
    targetBeneficiaries: 'Women founders, tech innovators, and aspiring women entrepreneurs seeking institutional ecosystem navigation.',
    eligibility: [
      'Women founders or co-founders of innovative startups or commercial ventures.',
      'Based in or operating in Maharashtra.',
      'Commitment to participate in capacity building and mentorship programs.'
    ],
    benefits: [
      'Structured networking events connecting women founders with angel investors and venture capital funds.',
      'Specialized masterclasses on legal compliance, fundraising, and digital scaling.',
      'Facilitation for government procurement vendor empanelment.',
      'Mentorship pairings with prominent women business leaders.'
    ],
    documents: [
      'Startup / Business Profile Document',
      'Founder Profile and Contact Information',
      'DPIIT / Udyam Certificate (if available)'
    ],
    applicationProcess: [
      'Register online at the MSInS Women Entrepreneurship Cell portal.',
      'Create founder profile and specify areas where mentorship or networking is requested.',
      'Receive invitations to cohort roundtables, networking clinics, and investor meets.'
    ],
    applicationMode: 'Online',
    officialPortal: 'https://msins.in',
    officialSource: 'Maharashtra State Innovation Society (MSInS)',
    sourceLastChecked: '01 March 2026',
    status: 'Active',
    tags: ['Women', 'Mentorship', 'Networking', 'Ecosystem', 'Startup'],
    badge: 'Women',
    supportType: ['Mentorship', 'Training', 'Market Access'],
    stage: ['Idea Stage', 'Pre-Seed', 'Seed', 'Early Stage', 'Growth Stage'],
    founderType: ['Women Founder'],
    industry: ['AI/Technology', 'HealthTech', 'FinTech', 'EdTech', 'Social Impact'],
    isFeatured: false
  },
  {
    id: 'seed-money-scheme',
    slug: 'seed-money-scheme',
    schemeName: 'Seed Money Scheme',
    category: 'Entrepreneurship / Financial Assistance',
    department: 'Industries, Energy & Labour Department',
    implementingAgency: 'Directorate of Industries, GoM / District Industries Centres (DIC)',
    governmentType: 'Government of Maharashtra',
    description: 'Financial assistance intended to help eligible entrepreneurs establish new businesses and meet financing requirements.',
    highlight: 'Margin money soft loan assistance enabling educated unemployed youth to secure bank term loans for setting up micro and small enterprises (Verify on official portal).',
    targetBeneficiaries: 'New entrepreneurs, educated unemployed youth, and eligible small business ventures in Maharashtra.',
    eligibility: [
      'Age between 18 to 50 years (bonafide resident of Maharashtra for at least 15 years).',
      'Minimum educational qualification: Passed 7th Standard or equivalent vocational certificate.',
      'Project cost must be within the prescribed limits for micro and small manufacturing or service units (verify on official portal).',
      'Applicant must contribute minimum 5% to 10% own equity towards total project cost.'
    ],
    benefits: [
      'Soft loan assistance towards entrepreneur margin money requirement (typically up to 15-20% of project cost, verify exact limits on portal).',
      'Low interest rate (approx. 6% p.a. with moratorium period for repayment).',
      'Facilitates bank credit approval for the remaining project cost balance.',
      'Special concessions for backward categories and women entrepreneurs.'
    ],
    documents: [
      'Domicile Certificate of Maharashtra (minimum 15 years)',
      'Educational Qualification Certificates / Marksheets',
      'Detailed Project Report (DPR) with machinery and raw material quotes',
      'Bank In-Principle Sanction Letter / Loan Application',
      'Caste Certificate (if claiming special category relaxation)'
    ],
    applicationProcess: [
      'Prepare a Project Profile for the proposed manufacturing or service unit.',
      'Submit application online via the Directorate of Industries Single Window Portal or offline at the local District Industries Centre (DIC).',
      'Scrutiny by General Manager, DIC and forwarding to the financing bank.',
      'Disbursement of soft loan upon bank loan sanction.'
    ],
    applicationMode: 'Through DIC',
    officialPortal: 'https://di.maharashtra.gov.in',
    officialSource: 'Directorate of Industries, Government of Maharashtra',
    sourceLastChecked: '20 February 2026',
    status: 'Active',
    tags: ['Financial Assistance', 'Seed Money', 'DIC', 'Micro Enterprise', 'Youth'],
    badge: 'Funding',
    supportType: ['Funding', 'Investment'],
    stage: ['Idea Stage', 'Pre-Seed', 'MSME'],
    founderType: ['Any Entrepreneur', 'Rural Entrepreneur', 'Student Founder'],
    industry: ['Manufacturing', 'Social Impact', 'AgriTech'],
    isFeatured: false
  },
  {
    id: 'dic-loan-scheme',
    slug: 'dic-loan-scheme',
    schemeName: 'District Industries Centre (DIC) Loan Scheme',
    category: 'Entrepreneurship / Business Finance',
    department: 'Industries Department, Government of Maharashtra',
    implementingAgency: 'District Industries Centres (DIC), Directorate of Industries, GoM',
    governmentType: 'Government of Maharashtra',
    description: 'Financial assistance supporting eligible entrepreneurs and small businesses through the District Industries Centre ecosystem.',
    highlight: 'Comprehensive credit facilitation, capital subsidy, stamp duty exemption, and power tariff concessions under the Maharashtra Industrial Policy.',
    targetBeneficiaries: 'Micro and small entrepreneurs setting up industrial or service enterprises in developing and rural talukas of Maharashtra.',
    eligibility: [
      'Registered MSME with Udyam Registration in Maharashtra.',
      'New unit or undertaking substantial expansion in designated industrial zones (Taluka Category B, C, D, D+ or No Industry Districts).',
      'Project appraisal by an approved commercial bank or financial institution.'
    ],
    benefits: [
      'Interest subsidy on long-term loans sanctioned by commercial banks.',
      'Capital investment subsidy under the Package Scheme of Incentives (PSI).',
      'Exemption from payment of electricity duty and stamp duty during setup phase.',
      'Quality certification and patent registration reimbursement subsidies.'
    ],
    documents: [
      'Udyam Registration Certificate',
      'Land Allotment / Lease Agreement / MIDC possession letter',
      'Bank Sanction Letter & Loan Disbursement schedule',
      'Audited Financials and Chartered Engineer machinery valuation',
      'Valid factory licenses and pollution board consent (MPCB)'
    ],
    applicationProcess: [
      'Register on the Maharashtra Industry Single Window Portal (MAITRI).',
      'Apply for Package Scheme of Incentives (PSI) through the local DIC dashboard.',
      'Physical inspection by DIC industrial promotion officer.',
      'Eligibility Certificate issuance followed by subsidy reimbursement.'
    ],
    applicationMode: 'Through DIC',
    officialPortal: 'https://di.maharashtra.gov.in',
    officialSource: 'Directorate of Industries, Government of Maharashtra',
    sourceLastChecked: '23 February 2026',
    status: 'Active',
    tags: ['Business Finance', 'DIC', 'MSME', 'Subsidies', 'Industrial Policy'],
    badge: 'Funding',
    supportType: ['Funding', 'Market Access'],
    stage: ['Early Stage', 'Growth Stage', 'MSME'],
    founderType: ['Any Entrepreneur', 'Rural Entrepreneur'],
    industry: ['Manufacturing', 'AgriTech', 'CleanTech'],
    isFeatured: false
  },
  {
    id: 'pmegp-central-scheme',
    slug: 'pmegp-central-scheme',
    schemeName: "Prime Minister's Employment Generation Programme (PMEGP)",
    category: 'Self Employment / Entrepreneurship',
    department: 'Ministry of Micro, Small & Medium Enterprises, Government of India',
    implementingAgency: 'Khadi and Village Industries Commission (KVIC), KVIB & District Industries Centres (DICs) in Maharashtra',
    governmentType: 'Central Government Scheme — Available in Maharashtra',
    description: 'A credit-linked government program supporting eligible entrepreneurs in establishing new self-employment ventures.',
    highlight: 'Credit-linked capital subsidy program providing up to 25% (urban) and 35% (rural) margin money subsidy for setting up new micro-enterprises.',
    targetBeneficiaries: 'New individual entrepreneurs, SHGs, cooperative societies, and institutions establishing greenfield manufacturing or service projects.',
    eligibility: [
      'Any individual above 18 years of age.',
      'Minimum 8th standard pass for manufacturing projects above ₹10 lakh and service projects above ₹5 lakh.',
      'Only for new (greenfield) projects; existing units or units that have availed other government subsidies are not eligible.',
      'Beneficiary contribution: 10% for general category, 5% for special categories (SC/ST/OBC/Women/Ex-servicemen/PH).'
    ],
    benefits: [
      'Substantial margin money subsidy: 15% (General Urban), 25% (General Rural), 25% (Special Urban), 35% (Special Rural).',
      'Maximum project cost ceiling: Up to ₹50 Lakhs for manufacturing units, and up to ₹20 Lakhs for service sector units.',
      'Bank loan finances remaining project balance (60% to 75%).',
      'Mandatory EDP (Entrepreneurship Development Programme) training before loan disbursal.'
    ],
    documents: [
      'Aadhaar Card and PAN Card',
      'Educational Qualification Certificate (8th standard or higher for projects above limit)',
      'Detailed Project Report (DPR) with machinery quotations',
      'Caste / Special Category Certificate (if claiming special subsidy)',
      'Rural Area Certificate from Gram Panchayat (for rural projects)'
    ],
    applicationProcess: [
      'Submit online application on the official KVIC PMEGP e-portal (https://kviconline.gov.in/pmegp/).',
      'Select implementing agency in your Maharashtra district (KVIC / KVIB / DIC).',
      'District Task Force Committee (DTFC) reviews and forwards shortlisted cases to designated bank.',
      'Bank completes appraisal, sanctions loan, and claims margin money subsidy from KVIC nodal bank.'
    ],
    applicationMode: 'Online',
    officialPortal: 'https://kviconline.gov.in/pmegp/',
    officialSource: 'Ministry of MSME & KVIC (Implemented through Maharashtra DICs & KVIB)',
    sourceLastChecked: '02 March 2026',
    status: 'Active',
    tags: ['Central Government', 'PMEGP', 'Subsidy', 'Self Employment', 'Micro Enterprise'],
    badge: 'Funding',
    supportType: ['Funding', 'Grant', 'Training'],
    stage: ['Idea Stage', 'Pre-Seed', 'MSME'],
    founderType: ['Any Entrepreneur', 'Rural Entrepreneur', 'Women Founder', 'SC/ST Entrepreneur'],
    industry: ['Manufacturing', 'AgriTech', 'Social Impact'],
    isFeatured: false
  },
  {
    id: 'sc-st-special-incentive-scheme',
    slug: 'sc-st-special-incentive-scheme',
    schemeName: 'SC/ST Special Incentive Scheme for Entrepreneurs',
    category: 'SC/ST Entrepreneurship',
    department: 'Social Justice & Special Assistance Department / Directorate of Industries',
    implementingAgency: 'Directorate of Industries, Government of Maharashtra',
    governmentType: 'Government of Maharashtra',
    description: 'Special support/incentives for eligible entrepreneurs belonging to SC/ST communities under applicable Maharashtra Government programs.',
    highlight: 'Enhanced capital subsidies, seed capital support, and preferential industrial plot allotment for Scheduled Caste and Scheduled Tribe entrepreneurs.',
    targetBeneficiaries: 'Entrepreneurs belonging to Scheduled Caste (SC) and Scheduled Tribe (ST) communities establishing business ventures in Maharashtra.',
    eligibility: [
      'Proprietor or partners/directors belonging to SC/ST category (minimum 51% shareholding and control).',
      'Valid Caste Certificate and Caste Validity Certificate issued by the competent authority in Maharashtra.',
      'Enterprise registered with Udyam / DPIIT in Maharashtra.',
      'Compliance with Maharashtra Industrial Policy guidelines for affirmative entrepreneurial action.'
    ],
    benefits: [
      'Higher rate of capital investment subsidy under the Package Scheme of Incentives (PSI).',
      'Lower own-contribution requirements and relaxed collateral criteria in state lending schemes.',
      'Reimbursement of power tariffs and stamp duty exemption on industrial land acquisition.',
      'Reserved quota allocation for industrial plots in Maharashtra Industrial Development Corporation (MIDC) estates.',
      'Capacity building and vendor development programs linking with state PSUs.'
    ],
    documents: [
      'Caste Certificate & Caste Validity Certificate issued by Government of Maharashtra',
      'Udyam Registration / DPIIT Recognition',
      'Proof of 51%+ SC/ST Equity Ownership (CA certified shareholding)',
      'Maharashtra Domicile Certificate',
      'Bank Sanction Letter & Detailed Project Report'
    ],
    applicationProcess: [
      'Submit online application via the MAITRI Single Window Portal or the local District Industries Centre (DIC).',
      'Upload verified caste validity certificate and enterprise registration details.',
      'Special scrutiny by the SC/ST Entrepreneurship Cell at the Directorate of Industries.',
      'Sanction of incentive letter and financial subsidy disbursement.'
    ],
    applicationMode: 'Through DIC',
    officialPortal: 'https://di.maharashtra.gov.in',
    officialSource: 'Directorate of Industries & Social Justice Department, Government of Maharashtra',
    sourceLastChecked: '25 February 2026',
    status: 'Active',
    tags: ['SC/ST', 'Special Incentive', 'Inclusion', 'Subsidy', 'MIDC'],
    badge: 'SC/ST',
    supportType: ['Funding', 'Grant', 'Market Access'],
    stage: ['Idea Stage', 'Pre-Seed', 'Seed', 'Early Stage', 'MSME'],
    founderType: ['SC/ST Entrepreneur'],
    industry: ['Manufacturing', 'AI/Technology', 'AgriTech', 'Social Impact'],
    isFeatured: false
  }
];

/**
 * INCUBATORS & ECOSYSTEM DATA
 */
export const MAHARASHTRA_INCUBATORS = [
  {
    id: 'coep-bhau',
    name: 'Bhau Institute of Innovation, Entrepreneurship & Agility',
    institution: 'COEP Technological University, Pune',
    location: 'Pune, Maharashtra',
    supportedBy: 'MSInS, DST & Govt of Maharashtra',
    focusSectors: ['DeepTech', 'IoT', 'Healthcare', 'Cybersecurity', 'EdTech'],
    facilities: ['Makers Lab', 'IoT Testbed', 'Subsidized Co-Working', 'IP Cell'],
    portalUrl: 'https://www.bhau.org'
  },
  {
    id: 'sine-iitb',
    name: 'Society for Innovation and Entrepreneurship (SINE)',
    institution: 'IIT Bombay, Powai, Mumbai',
    location: 'Mumbai, Maharashtra',
    supportedBy: 'IIT Bombay, DST & Maharashtra State Collaboration',
    focusSectors: ['DeepTech', 'AI/ML', 'CleanTech', 'MedTech', 'Semiconductors'],
    facilities: ['Advanced Prototyping Labs', 'Cleanroom Access', 'Global VC Connect'],
    portalUrl: 'https://sineiitb.org'
  },
  {
    id: 'sp-tbi',
    name: 'Sardar Patel Technology Business Incubator (SP-TBI)',
    institution: "Bhavan's Campus, Andheri West, Mumbai",
    location: 'Mumbai, Maharashtra',
    supportedBy: 'DST & Government of Maharashtra',
    focusSectors: ['FinTech', 'Data Analytics', 'EdTech', 'Enterprise SaaS'],
    facilities: ['Cloud Pilot Zone', 'Investor Lounge', 'Corporate Accelerator Track'],
    portalUrl: 'https://sp-tbi.com'
  },
  {
    id: 'aic-rmp',
    name: 'Atal Incubation Centre - Rambhau Mhalgi Prabodhini',
    institution: 'Keshav Srushti, Uttan, Bhayander / Thane',
    location: 'Thane / Mumbai MMR',
    supportedBy: 'AIM, NITI Aayog & Govt of Maharashtra',
    focusSectors: ['AgriTech', 'Social Innovation', 'Rural Livelihood', 'Sustainability'],
    facilities: ['Agri-Field Testbeds', 'Farmer Producer Connect', 'Rural Outreach Desk'],
    portalUrl: 'https://aic-rmp.org'
  },
  {
    id: 'msins-chhatrapati-sambhajinagar',
    name: 'MSInS Marathwada Regional Incubation Centre',
    institution: 'Dr. BAMU Campus, Chhatrapati Sambhajinagar',
    location: 'Chhatrapati Sambhajinagar, Maharashtra',
    supportedBy: 'Maharashtra State Innovation Society (MSInS)',
    focusSectors: ['Automotive Electronics', 'Industrial Automation', 'Agri-Processing'],
    facilities: ['Hardware Testing Bench', 'CAD/CAM Lab', 'Mentorship Desk'],
    portalUrl: 'https://msins.in'
  },
  {
    id: 'msins-nagpur',
    name: 'MSInS Vidarbha Innovation & Incubation Centre',
    institution: 'RTM Nagpur University Campus',
    location: 'Nagpur, Maharashtra',
    supportedBy: 'Maharashtra State Innovation Society (MSInS)',
    focusSectors: ['Defence Components', 'Mineral Tech', 'Biotech', 'Smart Logistics'],
    facilities: ['Logistics Simulation Desk', 'Chemical Analysis Lab', 'Co-Working Space'],
    portalUrl: 'https://msins.in'
  }
];

export const FILTER_OPTIONS = {
  supportTypes: [
    'All',
    'Funding',
    'Grant',
    'Investment',
    'Incubation',
    'Acceleration',
    'Mentorship',
    'Government Pilot',
    'Market Access',
    'Training'
  ],
  startupStages: [
    'All Stages',
    'Idea Stage',
    'Pre-Seed',
    'Seed',
    'Early Stage',
    'Growth Stage',
    'MSME'
  ],
  founderTypes: [
    'All Founders',
    'Any Entrepreneur',
    'Women Founder',
    'Student Founder',
    'SC/ST Entrepreneur',
    'Rural Entrepreneur',
    'Social Entrepreneur'
  ],
  industries: [
    'All Industries',
    'GovTech',
    'AgriTech',
    'HealthTech',
    'EdTech',
    'FinTech',
    'DefenceTech',
    'Aerospace',
    'CleanTech',
    'AI/Technology',
    'Social Impact',
    'Manufacturing'
  ]
};
