import React, { useState } from 'react';
import {
  X,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Target,
  Award,
  Compass,
  Building2,
  ExternalLink
} from 'lucide-react';
import { STARTUP_SCHEMES_DATA } from '../../data/startupSchemesData';
import { getSchemeIcon } from './StartupSchemeCard';

const QUESTIONS = [
  {
    id: 'stage',
    question: '1. What is your current startup stage?',
    description: 'Select the operational stage that best describes your venture today.',
    options: [
      { label: 'Idea Stage', desc: 'Conceptualizing the business model or research phase' },
      { label: 'Pre-Seed', desc: 'Working prototype or proof-of-concept (TRL 3-5)' },
      { label: 'Seed', desc: 'Functional prototype tested with pilot users (TRL 6)' },
      { label: 'Early Stage', desc: 'Commercial product launched with initial revenue' },
      { label: 'Growth Stage', desc: 'Scaling operations and expanding customer base' },
      { label: 'MSME', desc: 'Established micro, small, or medium manufacturing/service unit' }
    ]
  },
  {
    id: 'registration',
    question: '2. Are you registered as a startup or business entity?',
    description: 'Formal incorporation status helps determine grant and regulatory eligibility.',
    options: [
      { label: 'Yes - DPIIT Recognized Startup', desc: 'Has valid DIPP number from Govt of India' },
      { label: 'Yes - Private Limited / LLP / OPC', desc: 'Incorporated under MCA but not yet DPIIT registered' },
      { label: 'Registered MSME / Udyam', desc: 'Holds valid Udyam Registration Certificate' },
      { label: 'Not Yet Registered', desc: 'Sole proprietorship, student team, or unregistered idea' }
    ]
  },
  {
    id: 'location',
    question: '3. Where is your startup based or operating in Maharashtra?',
    description: 'Some schemes offer special district-level priority or rural subsidies.',
    options: [
      { label: 'Mumbai / MMR', desc: 'Greater Mumbai, Thane, Navi Mumbai, Raigad' },
      { label: 'Pune Region', desc: 'Pune, Pimpri-Chinchwad, Satara, Solapur' },
      { label: 'Nagpur / Vidarbha', desc: 'Nagpur, Amravati, Chandrapur, Wardha, Gadchiroli' },
      { label: 'Nashik / North Maharashtra', desc: 'Nashik, Dhule, Jalgaon, Ahmednagar' },
      { label: 'Chhatrapati Sambhajinagar / Marathwada', desc: 'Sambhajinagar, Nanded, Latur, Jalna, Parbhani' },
      { label: 'Other Maharashtra District / Rural Taluka', desc: 'Any other of the 36 districts of Maharashtra' },
      { label: 'Outside Maharashtra (Planning Expansion)', desc: 'Indian startup willing to pilot or incorporate in Maharashtra' }
    ]
  },
  {
    id: 'industry',
    question: '4. What primary industry or sector are you working in?',
    description: 'Select the primary technological or commercial focus of your product.',
    options: [
      { label: 'GovTech', desc: 'Civic tech, e-governance, public service automation' },
      { label: 'AgriTech', desc: 'Smart farming, post-harvest, irrigation, dairy IoT' },
      { label: 'HealthTech', desc: 'Tele-medicine, diagnostics, medical devices, biotech' },
      { label: 'EdTech', desc: 'Educational tools, skilling, digital learning' },
      { label: 'FinTech', desc: 'Financial inclusion, payment tech, credit enablement' },
      { label: 'DefenceTech & Aerospace', desc: 'Tactical systems, UAVs, dual-use technologies' },
      { label: 'CleanTech', desc: 'Renewable energy, water conservation, waste recycling' },
      { label: 'AI/Technology', desc: 'DeepTech, Artificial Intelligence, SaaS, IoT, Robotics' },
      { label: 'Social Impact', desc: 'Grassroots solutions, livelihood, rural development' },
      { label: 'Manufacturing & Engineering', desc: 'Precision hardware, tooling, automotive components' }
    ]
  },
  {
    id: 'supportNeeded',
    question: '5. What type of support do you need most urgently?',
    description: 'Helps prioritize grants vs acceleration vs infrastructure.',
    options: [
      { label: 'Funding & Grants', desc: 'Direct financial assistance or non-dilutive capital' },
      { label: 'Government Pilot & Market Access', desc: 'Testbed deployment with municipal or state departments' },
      { label: 'Incubation & Prototyping Labs', desc: 'Physical co-working, 3D printers, maker spaces' },
      { label: 'Mentorship & Acceleration', desc: 'Structured curriculum, business scaling, investor connects' },
      { label: 'Subsidized Loan / Credit Linkage', desc: 'Bank term loans with interest subsidy or margin money support' }
    ]
  },
  {
    id: 'womanFounder',
    question: '6. Are you a woman founder or is your venture women-led?',
    description: 'Maharashtra offers affirmative grants and cells for women entrepreneurs.',
    options: [
      { label: 'Yes', desc: 'Woman founder or women holding at least 51% equity' },
      { label: 'No', desc: 'Not a women-majority founded enterprise' }
    ]
  },
  {
    id: 'studentFounder',
    question: '7. Are you a student founder or recent graduate?',
    description: 'University incubators and district plan competitions cater to youth.',
    options: [
      { label: 'Yes', desc: 'Currently enrolled student or graduated within last 2 years' },
      { label: 'No', desc: 'Working professional or experienced entrepreneur' }
    ]
  },
  {
    id: 'specialCategory',
    question: '8. Do you belong to an eligible affirmative category?',
    description: 'Special incentives exist under state industrial policy.',
    options: [
      { label: 'SC/ST Entrepreneur', desc: 'Hold valid Caste & Caste Validity Certificate in Maharashtra' },
      { label: 'Rural Entrepreneur / Self-Help Group', desc: 'Operating primarily in rural talukas or Bachat Gat' },
      { label: 'Social Impact Enterprise', desc: 'Primary mission is societal or environmental transformation' },
      { label: 'General / None of the above', desc: 'Open category' }
    ]
  },
  {
    id: 'fundingType',
    question: '9. Are you looking for external financial support?',
    description: 'Helps distinguish between venture equity, grants, and bank debt.',
    options: [
      { label: 'Yes - Equity / Venture Capital', desc: 'Looking for institutional fund investment' },
      { label: 'Yes - Grant / Non-Dilutive Grant-in-Aid', desc: 'Looking for pilot grant or seed money subsidy' },
      { label: 'Yes - Bank Loan with Margin Subsidy', desc: 'Looking for term loan backed by DIC / PMEGP' },
      { label: 'No - Non-Financial Support Only', desc: 'Seeking only mentorship, incubation, or pilot testbeds' }
    ]
  },
  {
    id: 'pilotInterest',
    question: '10. Are you looking for a government pilot zone or work order?',
    description: 'Maharashtra Startup Week provides direct public sector testbeds.',
    options: [
      { label: 'Yes - Ready to deploy pilot in public departments', desc: 'Have working solution for municipal/state use cases' },
      { label: 'No - Focused purely on private market B2B/B2C sales', desc: 'Not seeking public sector government deployment' }
    ]
  }
];

export function FindSupportModal({ isOpen, onClose, onSelectScheme }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const handleSelectOption = (optionLabel) => {
    const q = QUESTIONS[currentStep];
    setAnswers((prev) => ({ ...prev, [q.id]: optionLabel }));
  };

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsCompleted(false);
  };

  // Recommendation Scoring Engine
  const calculateRecommendations = () => {
    const scores = STARTUP_SCHEMES_DATA.map((scheme) => {
      let score = 0;
      let reasons = [];

      // 1. Woman founder match
      if (answers.womanFounder === 'Yes') {
        if (scheme.id === 'punyashlok-ahilyadevi-holkar-women-startup') {
          score += 50;
          reasons.push('Dedicated women-led startup grant scheme');
        }
        if (scheme.id === 'msins-women-entrepreneurship-cell') {
          score += 45;
          reasons.push('Dedicated women founder mentorship & networking desk');
        }
        if (scheme.id === 'hirkani-maharashtrachi') {
          score += 40;
          reasons.push('Grassroots women entrepreneurship & SHG market access');
        }
      }

      // 2. SC/ST entrepreneur match
      if (answers.specialCategory === 'SC/ST Entrepreneur') {
        if (scheme.id === 'sc-st-special-incentive-scheme') {
          score += 60;
          reasons.push('Affirmative state industrial subsidies & MIDC plot reservations');
        }
        if (scheme.id === 'pmegp-central-scheme') {
          score += 30;
          reasons.push('Higher margin money subsidy (up to 35%) for SC/ST applicants');
        }
      }

      // 3. Government pilot interest
      if (answers.pilotInterest?.includes('Yes') || answers.supportNeeded?.includes('Government Pilot')) {
        if (scheme.id === 'maharashtra-startup-week') {
          score += 50;
          reasons.push('Direct public sector pilot work orders up to ₹15 lakh');
        }
      }

      // 4. Industry matches
      const ind = answers.industry || '';
      if (ind.includes('DefenceTech') && scheme.id === 'maharashtra-defence-aerospace-fund') {
        score += 55;
        reasons.push('Specialized defence & aerospace venture capital fund');
      }
      if (ind.includes('Social Impact') && scheme.id === 'maharashtra-social-venture-fund') {
        score += 50;
        reasons.push('Focuses on healthcare, education, agriculture & rural impact');
      }

      // 5. Stage & Support Type matches
      const stage = answers.stage || '';
      if (stage === 'Idea Stage' || stage === 'Pre-Seed') {
        if (scheme.id === 'maharashtra-network-startup-incubators') {
          score += 40;
          reasons.push('Provides early infrastructure, co-working, and maker labs');
        }
        if (scheme.id === 'district-business-plan-competition') {
          score += 35;
          reasons.push('Early idea & district-level problem solving competition');
        }
      }

      if (stage === 'Growth Stage' || stage === 'Early Stage' || answers.fundingType?.includes('Equity')) {
        if (scheme.id === 'mitdf-innovation-fund') {
          score += 45;
          reasons.push('Venture investment backing for scaling commercial innovations');
        }
      }

      if (answers.supportNeeded?.includes('Mentorship') || answers.supportNeeded?.includes('Acceleration')) {
        if (scheme.id === 'maharashtra-startup-acceleration-program') {
          score += 45;
          reasons.push('Structured 3-month acceleration with industry mentors');
        }
      }

      // 6. Student founder
      if (answers.studentFounder === 'Yes') {
        if (scheme.id === 'district-business-plan-competition') {
          score += 40;
          reasons.push('Tailored for college students and young innovators');
        }
        if (scheme.id === 'maharashtra-network-startup-incubators') {
          score += 30;
          reasons.push('Direct access through state university incubation hubs');
        }
      }

      // 7. MSME or Bank Loan / Seed Money
      if (stage === 'MSME' || answers.fundingType?.includes('Bank Loan')) {
        if (scheme.id === 'pmegp-central-scheme') {
          score += 40;
          reasons.push('Credit-linked subsidy up to 35% for new micro ventures');
        }
        if (scheme.id === 'dic-loan-scheme') {
          score += 35;
          reasons.push('District Industries Centre interest subsidy & PSI incentives');
        }
        if (scheme.id === 'seed-money-scheme') {
          score += 35;
          reasons.push('Margin money soft loan assistance for new units');
        }
      }

      // Baseline relevance
      if (scheme.isFeatured) score += 10;

      return {
        scheme,
        score,
        reason: reasons[0] || 'Matches your general profile and entrepreneurial criteria'
      };
    });

    // Sort descending
    scores.sort((a, b) => b.score - a.score);

    const highMatch = scores.filter((s) => s.score >= 45).slice(0, 2);
    const goodMatch = scores.filter((s) => s.score >= 30 && s.score < 45).slice(0, 2);
    const possibleMatch = scores.filter((s) => s.score < 30).slice(0, 2);

    return { highMatch, goodMatch, possibleMatch };
  };

  const currentQ = QUESTIONS[currentStep];
  const selectedAnswer = answers[currentQ?.id];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Box */}
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 z-10 overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/70 dark:bg-zinc-900/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-zinc-950 dark:text-white tracking-tight">
                Find Support For My Startup
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                10-Question Maharashtra Government Startup Opportunity Matchmaker
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar (if in quiz) */}
        {!isCompleted && (
          <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5">
            <div
              className="bg-orange-600 h-1.5 transition-all duration-300"
              style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 overflow-y-auto max-h-[68vh]">
          {!isCompleted ? (
            <div className="space-y-5">
              {/* Question Meta */}
              <div>
                <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                  Question {currentStep + 1} of {QUESTIONS.length}
                </span>
                <h4 className="text-lg font-black text-zinc-950 dark:text-white tracking-tight mt-1">
                  {currentQ.question}
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  {currentQ.description}
                </p>
              </div>

              {/* Options List */}
              <div className="space-y-2.5 pt-1">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedAnswer === opt.label;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(opt.label)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'bg-orange-50/80 dark:bg-orange-950/40 border-orange-500 ring-1 ring-orange-500 text-orange-950 dark:text-orange-100'
                          : 'bg-white dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700/80 text-zinc-800 dark:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-600'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-bold block">{opt.label}</span>
                        {opt.desc && (
                          <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 block leading-snug">
                            {opt.desc}
                          </span>
                        )}
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected
                            ? 'border-orange-600 bg-orange-600 text-white'
                            : 'border-zinc-300 dark:border-zinc-600'
                        }`}
                      >
                        {isSelected && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-6">
              {/* Important Disclaimer Header */}
              <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl flex items-start gap-3 text-amber-900 dark:text-amber-200">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h5 className="text-xs font-black">Recommendation & Discovery Notice</h5>
                  <p className="text-xs leading-relaxed">
                    <strong>“You may be eligible — verify the official eligibility criteria before applying.”</strong>
                    <br />
                    This matchmaker provides advisory suggestions based on your responses. It is not an official government eligibility clearance.
                  </p>
                </div>
              </div>

              {/* Matched Programs Display */}
              {(() => {
                const { highMatch, goodMatch, possibleMatch } = calculateRecommendations();
                return (
                  <div className="space-y-5">
                    {/* High Match Section */}
                    {highMatch.length > 0 && (
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-md border border-emerald-300 dark:border-emerald-800">
                            High Match
                          </span>
                          <span className="text-xs text-zinc-500 font-medium">
                            Strong alignment with your profile & support requests
                          </span>
                        </div>
                        <div className="grid grid-cols-1 gap-2.5">
                          {highMatch.map(({ scheme, reason }) => (
                            <div
                              key={scheme.id}
                              className="p-3.5 bg-white dark:bg-zinc-800/70 border border-emerald-200 dark:border-emerald-900/60 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs hover:border-emerald-400 transition-colors"
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-md bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center shrink-0">
                                    {getSchemeIcon(scheme.badge, scheme.category)}
                                  </div>
                                  <h4 className="text-xs font-bold text-zinc-950 dark:text-white">
                                    {scheme.schemeName}
                                  </h4>
                                </div>
                                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                  Match Reason: <span className="font-semibold text-emerald-700 dark:text-emerald-300">{reason}</span>
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  onClose();
                                  onSelectScheme && onSelectScheme(scheme);
                                }}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shrink-0 cursor-pointer transition-colors"
                              >
                                View Details →
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Good Match Section */}
                    {goodMatch.length > 0 && (
                      <div className="space-y-2.5 pt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-orange-700 dark:text-orange-400 bg-orange-100 dark:bg-orange-950/60 px-2.5 py-0.5 rounded-md border border-orange-300 dark:border-orange-800">
                            Good Match
                          </span>
                          <span className="text-xs text-zinc-500 font-medium">
                            Relevant programs worth exploring
                          </span>
                        </div>
                        <div className="grid grid-cols-1 gap-2.5">
                          {goodMatch.map(({ scheme, reason }) => (
                            <div
                              key={scheme.id}
                              className="p-3.5 bg-white dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs hover:border-orange-400 transition-colors"
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-md bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center shrink-0">
                                    {getSchemeIcon(scheme.badge, scheme.category)}
                                  </div>
                                  <h4 className="text-xs font-bold text-zinc-950 dark:text-white">
                                    {scheme.schemeName}
                                  </h4>
                                </div>
                                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                  Match Reason: <span className="font-semibold text-orange-700 dark:text-orange-300">{reason}</span>
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  onClose();
                                  onSelectScheme && onSelectScheme(scheme);
                                }}
                                className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-lg shrink-0 cursor-pointer transition-colors"
                              >
                                View Details →
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Possible Match Section */}
                    {possibleMatch.length > 0 && (
                      <div className="space-y-2.5 pt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-zinc-700 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 rounded-md border border-zinc-200 dark:border-zinc-700">
                            Possible Match
                          </span>
                          <span className="text-xs text-zinc-500 font-medium">
                            Additional state incentives that may fit
                          </span>
                        </div>
                        <div className="grid grid-cols-1 gap-2.5">
                          {possibleMatch.map(({ scheme, reason }) => (
                            <div
                              key={scheme.id}
                              className="p-3.5 bg-white dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                            >
                              <div className="space-y-1">
                                <h4 className="text-xs font-bold text-zinc-950 dark:text-white">
                                  {scheme.schemeName}
                                </h4>
                                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                  {scheme.highlight || scheme.description}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  onClose();
                                  onSelectScheme && onSelectScheme(scheme);
                                }}
                                className="px-3 py-1.5 bg-zinc-900 dark:bg-zinc-700 hover:bg-zinc-800 text-white text-xs font-bold rounded-lg shrink-0 cursor-pointer transition-colors"
                              >
                                View Details
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-3">
          {!isCompleted ? (
            <>
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="px-4 py-2 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Previous
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={!selectedAnswer}
                className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-black rounded-xl shadow-xs transition-colors inline-flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {currentStep === QUESTIONS.length - 1 ? 'Show Recommendations' : 'Next Question'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retake Questionnaire
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-black rounded-xl transition-colors cursor-pointer"
              >
                Browse All Schemes
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
