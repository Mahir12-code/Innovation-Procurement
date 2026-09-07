import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import {
  Building2,
  User,
  Rocket,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Save,
  Check,
  Building,
  ShieldCheck,
  Clock,
  Sparkles,
  Award,
  ExternalLink
} from 'lucide-react';

const STARTUP_TYPES = [
  'Private Limited',
  'LLP',
  'Partnership',
  'Sole Proprietorship',
  'Other',
];

const INDIAN_STATES = [
  'Maharashtra',
  'Andhra Pradesh',
  'Delhi (NCT)',
  'Gujarat',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Punjab',
  'Rajasthan',
  'Tamil Nadu',
  'Telangana',
  'Uttar Pradesh',
  'West Bengal',
  'Other State / UT',
];

const MAHARASHTRA_DISTRICTS = [
  'Mumbai City',
  'Mumbai Suburban',
  'Pune',
  'Nagpur',
  'Thane',
  'Nashik',
  'Chhatrapati Sambhajinagar (Aurangabad)',
  'Kolhapur',
  'Solapur',
  'Amravati',
  'Nanded',
  'Jalgaon',
  'Akola',
  'Latur',
  'Dhule',
  'Ahmednagar',
  'Satara',
  'Chandrapur',
  'Parbhani',
  'Jalna',
  'Raigad',
  'Ratnagiri',
  'Sindhudurg',
  'Sangli',
  'Beed',
  'Buldhana',
  'Yavatmal',
  'Dharashiv (Osmanabad)',
  'Wardha',
  'Bhandara',
  'Gondia',
  'Gadchiroli',
  'Washim',
  'Hingoli',
  'Palghar',
  'Nandurbar',
  'Other District',
];

const PRIMARY_SECTORS = [
  'AI & Machine Learning',
  'AgriTech',
  'FinTech',
  'HealthTech',
  'EdTech',
  'CleanTech',
  'IT & SaaS',
  'Manufacturing',
  'Other',
];

const STARTUP_STAGES = [
  'Ideation',
  'Prototype',
  'MVP',
  'Early Traction',
  'Scaling',
];

const DPIIT_OPTIONS = [
  { id: 'Recognised', label: 'Recognised', desc: 'Hold official DPIIT certificate' },
  { id: 'Applied / Under Process', label: 'Applied / Under Process', desc: 'Application in review' },
  { id: 'Not Yet Recognised', label: 'Not Yet Recognised', desc: 'Eligible for fast-track support' },
];

const PROCUREMENT_READINESS_OPTIONS = [
  {
    id: 'Ready for Government Pilot',
    title: 'Ready for Government Pilot',
    desc: 'Functional solution ready for trial in live field testbeds.',
  },
  {
    id: 'Ready for Tender',
    title: 'Ready for Tender',
    desc: 'Commercially viable and ready for direct procurement tenders.',
  },
  {
    id: 'Ready for Large-scale Deployment',
    title: 'Ready for Large-scale Deployment',
    desc: 'Proven architecture prepared for state-wide department rollout.',
  },
  {
    id: 'Need Government Pilot Support',
    title: 'Need Government Pilot Support',
    desc: 'Seeking test facility access, mentorship, or regulatory pilot zone.',
  },
];

const STEPS = [
  { number: '01', label: 'Basic Details' },
  { number: '02', label: 'Representative' },
  { number: '03', label: 'Startup Profile' },
  { number: '04', label: 'Complete' },
];

const STORAGE_KEY = 'sarkar_setu_startup_registration_draft';

export function RegisterPage() {
  const navigate = useNavigate();

  // Step state: 1, 2, 3, or 4 (Success Screen)
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [draftSavedToast, setDraftSavedToast] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // Section 1: Startup Details
    startupName: '',
    startupType: '',
    incorporationDate: '',
    state: 'Maharashtra',
    district: '',
    primarySector: '',

    // Section 2: Founder / Representative
    founderName: '',
    designation: '',
    email: '',
    contactNumber: '',

    // Section 3: Startup Status
    startupStage: '',
    dpiitStatus: 'Recognised',
    dpiitNumber: '',
    website: '',
    description: '',
    procurementReadiness: 'Ready for Government Pilot',
  });

  // Validation Errors state
  const [errors, setErrors] = useState({});

  // Restore draft if saved
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          setFormData((prev) => ({ ...prev, ...parsed }));
        }
      }
    } catch (e) {
      // Ignore parse error
    }
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Validate Step 1
  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.startupName.trim()) {
      newErrors.startupName = 'Startup / Legal Entity Name is required';
    }
    if (!formData.startupType) {
      newErrors.startupType = 'Please select a startup type';
    }
    if (!formData.incorporationDate) {
      newErrors.incorporationDate = 'Date of incorporation is required';
    }
    if (!formData.state) {
      newErrors.state = 'Please select state';
    }
    if (!formData.district) {
      newErrors.district = 'Please select district';
    }
    if (!formData.primarySector) {
      newErrors.primarySector = 'Please select primary sector';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate Step 2
  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.founderName.trim()) {
      newErrors.founderName = 'Founder / Representative Name is required';
    }
    if (!formData.designation.trim()) {
      newErrors.designation = 'Designation is required';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Official email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    const cleanPhone = formData.contactNumber.replace(/\D/g, '');
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (cleanPhone.length < 10) {
      newErrors.contactNumber = 'Please enter a valid 10-digit mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate Step 3
  const validateStep3 = () => {
    const newErrors = {};
    if (!formData.startupStage) {
      newErrors.startupStage = 'Please select your current startup stage';
    }
    if (!formData.dpiitStatus) {
      newErrors.dpiitStatus = 'Please select your DPIIT recognition status';
    }
    if (formData.dpiitStatus === 'Recognised' && !formData.dpiitNumber.trim()) {
      newErrors.dpiitNumber = 'DPIIT Recognition Number is required for recognised startups';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (currentStep === 2) {
      if (validateStep2()) {
        setCurrentStep(3);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSaveDraft = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      setDraftSavedToast(true);
      setTimeout(() => setDraftSavedToast(false), 3000);
    } catch (e) {
      // Ignore
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setIsSubmitting(true);

    // Save final state and clear draft
    try {
      localStorage.setItem('sarkar_setu_registered_startup', JSON.stringify(formData));
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // Ignore
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 700);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] py-10 px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border border-orange-200/80 dark:border-orange-800/60 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
            <span>Government of Maharashtra • Innovation Pilot Zone</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 dark:text-white">
            Register Your Startup
          </h1>

          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium max-w-xl mx-auto">
            Create your startup profile and connect with government opportunities through Sarkar Setu.
          </p>
        </div>

        {/* Multi-Step Progress Indicator */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 p-4 shadow-subtle">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {STEPS.map((step, idx) => {
              const stepNumber = idx + 1;
              const isCompleted = currentStep > stepNumber;
              const isActive = currentStep === stepNumber;

              return (
                <div
                  key={step.number}
                  className={`flex items-center gap-2 p-2 rounded-xl transition-all ${
                    isActive
                      ? 'bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 font-black border border-orange-200 dark:border-orange-800/60'
                      : isCompleted
                      ? 'text-zinc-900 dark:text-zinc-100 font-bold'
                      : 'text-zinc-400 dark:text-zinc-500 font-medium'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0 font-mono font-bold ${
                      isActive
                        ? 'bg-orange-600 text-white shadow-xs'
                        : isCompleted
                        ? 'bg-zinc-900 dark:bg-zinc-800 text-orange-400 border border-zinc-700'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {isCompleted ? <Check className="w-3.5 h-3.5 text-white" /> : step.number}
                  </div>
                  <span className="truncate text-[11px] sm:text-xs">{step.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Draft Saved Toast Alert */}
        {draftSavedToast && (
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Draft saved to your browser! You can safely return anytime to continue registration.</span>
          </div>
        )}

        {/* Main Card Container */}
        {currentStep < 4 ? (
          <Card className="border-zinc-200/90 dark:border-zinc-800 shadow-card bg-white dark:bg-zinc-900">
            <CardContent className="p-6 sm:p-8 space-y-6">
              {/* ================= STEP 1: Basic Details ================= */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="pb-4 border-b border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-black text-xs uppercase tracking-wider">
                      <Building2 className="w-4 h-4" />
                      <span>Section 1 of 3</span>
                    </div>
                    <h2 className="text-lg font-black text-zinc-950 dark:text-white mt-1">
                      Startup Details
                    </h2>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">
                      Enter official legal information of your startup entity.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* 1. Startup Name */}
                    <Input
                      label="Startup / Legal Entity Name"
                      required
                      placeholder="e.g. AgriVision AI Solutions Pvt Ltd"
                      value={formData.startupName}
                      onChange={(e) => handleChange('startupName', e.target.value)}
                      error={errors.startupName}
                    />

                    {/* 2. Startup Type & Date of Incorporation */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Select
                        label="Startup Type"
                        required
                        placeholder="Select entity type"
                        options={STARTUP_TYPES}
                        value={formData.startupType}
                        onChange={(e) => handleChange('startupType', e.target.value)}
                        error={errors.startupType}
                      />

                      <Input
                        label="Date of Incorporation"
                        type="date"
                        required
                        value={formData.incorporationDate}
                        onChange={(e) => handleChange('incorporationDate', e.target.value)}
                        error={errors.incorporationDate}
                      />
                    </div>

                    {/* 3. State & District */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Select
                        label="State"
                        required
                        placeholder="Select State"
                        options={INDIAN_STATES}
                        value={formData.state}
                        onChange={(e) => handleChange('state', e.target.value)}
                        error={errors.state}
                      />

                      <Select
                        label="District"
                        required
                        placeholder="Select District"
                        options={MAHARASHTRA_DISTRICTS}
                        value={formData.district}
                        onChange={(e) => handleChange('district', e.target.value)}
                        error={errors.district}
                      />
                    </div>

                    {/* 4. Primary Sector */}
                    <Select
                      label="Primary Sector"
                      required
                      placeholder="Select your core technology domain"
                      options={PRIMARY_SECTORS}
                      value={formData.primarySector}
                      onChange={(e) => handleChange('primarySector', e.target.value)}
                      error={errors.primarySector}
                      helperText="This helps government departments match your solution with relevant challenges"
                    />
                  </div>

                  {/* Navigation Buttons for Step 1 */}
                  <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={handleSaveDraft}
                      className="text-xs font-bold text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Draft</span>
                    </button>

                    <Button
                      type="button"
                      variant="primary"
                      size="md"
                      onClick={handleNext}
                      className="w-full sm:w-auto font-black px-6 shadow-sm shadow-orange-600/30"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      Continue →
                    </Button>
                  </div>
                </div>
              )}

              {/* ================= STEP 2: Representative ================= */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="pb-4 border-b border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-black text-xs uppercase tracking-wider">
                      <User className="w-4 h-4" />
                      <span>Section 2 of 3</span>
                    </div>
                    <h2 className="text-lg font-black text-zinc-950 dark:text-white mt-1">
                      Founder / Authorized Representative
                    </h2>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">
                      Details of the authorized person communicating with government departments.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* 7. Founder Name & 8. Designation */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Founder / Authorized Representative Name"
                        required
                        placeholder="e.g. Rohan Kulkarni"
                        value={formData.founderName}
                        onChange={(e) => handleChange('founderName', e.target.value)}
                        error={errors.founderName}
                      />

                      <Input
                        label="Designation"
                        required
                        placeholder="e.g. Founder & CEO / Managing Director"
                        value={formData.designation}
                        onChange={(e) => handleChange('designation', e.target.value)}
                        error={errors.designation}
                      />
                    </div>

                    {/* 9. Official Email & 10. Contact Number */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Official Email"
                        type="email"
                        required
                        placeholder="rohan@agrivision.ai"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        error={errors.email}
                        helperText="Used for tender notifications and pilot invitations"
                      />

                      <Input
                        label="Contact Number"
                        type="tel"
                        required
                        placeholder="e.g. 98200 12345"
                        value={formData.contactNumber}
                        onChange={(e) => handleChange('contactNumber', e.target.value)}
                        error={errors.contactNumber}
                        helperText="10-digit mobile number for OTP and nodal communications"
                      />
                    </div>
                  </div>

                  {/* Navigation Buttons for Step 2 */}
                  <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-4">
                    <Button
                      type="button"
                      variant="secondary"
                      size="md"
                      onClick={handleBack}
                      leftIcon={<ArrowLeft className="w-4 h-4" />}
                      className="font-bold dark:bg-zinc-800 dark:border-zinc-700"
                    >
                      Back
                    </Button>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleSaveDraft}
                        className="hidden sm:inline-flex text-xs font-bold text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Draft</span>
                      </button>

                      <Button
                        type="button"
                        variant="primary"
                        size="md"
                        onClick={handleNext}
                        className="font-black px-6 shadow-sm shadow-orange-600/30"
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                      >
                        Continue →
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* ================= STEP 3: Startup Profile ================= */}
              {currentStep === 3 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="pb-4 border-b border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-black text-xs uppercase tracking-wider">
                      <Rocket className="w-4 h-4" />
                      <span>Section 3 of 3</span>
                    </div>
                    <h2 className="text-lg font-black text-zinc-950 dark:text-white mt-1">
                      Startup Status & Readiness
                    </h2>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">
                      DPIIT recognition details, stage of maturity, and procurement preparedness.
                    </p>
                  </div>

                  <div className="space-y-5">
                    {/* 11. Startup Stage */}
                    <Select
                      label="Startup Stage"
                      required
                      placeholder="Select current stage"
                      options={STARTUP_STAGES}
                      value={formData.startupStage}
                      onChange={(e) => handleChange('startupStage', e.target.value)}
                      error={errors.startupStage}
                    />

                    {/* 12. DPIIT Recognition Status */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 tracking-wide">
                        DPIIT Recognition Status <span className="text-rose-500">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {DPIIT_OPTIONS.map((opt) => {
                          const isSelected = formData.dpiitStatus === opt.id;
                          return (
                            <div
                              key={opt.id}
                              onClick={() => handleChange('dpiitStatus', opt.id)}
                              className={`p-3 rounded-xl border transition-all cursor-pointer select-none text-left ${
                                isSelected
                                  ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-500 text-orange-900 dark:text-orange-200 font-bold ring-1 ring-orange-500/40'
                                  : 'bg-white dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-black">{opt.label}</span>
                                <input
                                  type="radio"
                                  name="dpiit_radio"
                                  checked={isSelected}
                                  onChange={() => handleChange('dpiitStatus', opt.id)}
                                  className="text-orange-600 accent-orange-600"
                                />
                              </div>
                              <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block mt-1 leading-snug">
                                {opt.desc}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      {errors.dpiitStatus && (
                        <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">
                          {errors.dpiitStatus}
                        </p>
                      )}
                    </div>

                    {/* 13. Conditional: DPIIT Recognition Number */}
                    {formData.dpiitStatus === 'Recognised' && (
                      <div className="p-4 rounded-xl bg-orange-50/70 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800/60 animate-in fade-in space-y-2">
                        <Input
                          label="DPIIT Recognition Number"
                          required
                          placeholder="e.g. DIPP89234"
                          value={formData.dpiitNumber}
                          onChange={(e) => handleChange('dpiitNumber', e.target.value)}
                          error={errors.dpiitNumber}
                          helperText="Enter your official recognition certificate number issued by Startup India"
                        />
                      </div>
                    )}

                    {/* 14. Optional Website & 15. Short Description */}
                    <div className="grid grid-cols-1 gap-4 pt-2">
                      <Input
                        label="Startup Website (Optional)"
                        type="url"
                        placeholder="https://yourstartup.com"
                        value={formData.website}
                        onChange={(e) => handleChange('website', e.target.value)}
                      />

                      <Textarea
                        label="Short Startup Description (Optional)"
                        rows={3}
                        placeholder="Briefly describe what your product or technology solves (max 300 characters)..."
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        helperText="Summarize your product, key technology, and the public or industrial problem it solves."
                      />
                    </div>

                    {/* 16. Government Procurement Readiness (Small optional section) */}
                    <div className="pt-2 space-y-2.5">
                      <div className="space-y-0.5">
                        <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 tracking-wide">
                          Government Procurement Readiness
                        </label>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                          Select the deployment track that best fits your current operational status.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {PROCUREMENT_READINESS_OPTIONS.map((opt) => {
                          const isSelected = formData.procurementReadiness === opt.id;
                          return (
                            <div
                              key={opt.id}
                              onClick={() => handleChange('procurementReadiness', opt.id)}
                              className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left select-none ${
                                isSelected
                                  ? 'bg-orange-50/80 dark:bg-orange-950/40 border-orange-500 text-zinc-950 dark:text-white font-bold ring-1 ring-orange-500/40'
                                  : 'bg-white dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-750 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-black leading-snug">{opt.title}</span>
                                <input
                                  type="radio"
                                  name="readiness_radio"
                                  checked={isSelected}
                                  onChange={() => handleChange('procurementReadiness', opt.id)}
                                  className="text-orange-600 accent-orange-600 shrink-0"
                                />
                              </div>
                              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                                {opt.desc}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons for Step 3 */}
                  <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                      <Button
                        type="button"
                        variant="secondary"
                        size="md"
                        onClick={handleBack}
                        leftIcon={<ArrowLeft className="w-4 h-4" />}
                        className="w-full sm:w-auto font-bold dark:bg-zinc-800 dark:border-zinc-700"
                      >
                        Back
                      </Button>

                      <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
                        <Button
                          type="button"
                          variant="secondary"
                          size="md"
                          onClick={handleSaveDraft}
                          leftIcon={<Save className="w-4 h-4" />}
                          className="w-full sm:w-auto font-bold dark:bg-zinc-800 dark:border-zinc-700"
                        >
                          Save & Continue Later
                        </Button>

                        <Button
                          type="submit"
                          variant="primary"
                          size="md"
                          isLoading={isSubmitting}
                          className="w-full sm:w-auto font-black px-6 shadow-md shadow-orange-600/30"
                          rightIcon={<ArrowRight className="w-4 h-4" />}
                        >
                          Create Startup Profile →
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        ) : (
          /* ================= STEP 4: Complete / Success Screen ================= */
          <Card className="border-zinc-200/90 dark:border-zinc-800 shadow-card bg-white dark:bg-zinc-900 animate-in fade-in zoom-in-95 duration-300">
            <CardContent className="p-8 sm:p-12 text-center space-y-6 max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-3xl bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400 flex items-center justify-center mx-auto shadow-sm">
                <Sparkles className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight">
                  Startup Profile Created Successfully
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                  Your Sarkar Setu startup profile has been created. You can now explore government schemes, pilots and procurement opportunities.
                </p>
              </div>

              {/* Profile Summary Pill Box */}
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-left space-y-2 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-200/60 dark:border-zinc-700">
                  <span className="text-zinc-500 dark:text-zinc-400 font-medium">Startup Name</span>
                  <span className="font-black text-zinc-950 dark:text-white">
                    {formData.startupName || 'AgriVision AI Solutions'}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-zinc-200/60 dark:border-zinc-700">
                  <span className="text-zinc-500 dark:text-zinc-400 font-medium">Primary Sector</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">
                    {formData.primarySector || 'AI & Machine Learning'}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-zinc-200/60 dark:border-zinc-700">
                  <span className="text-zinc-500 dark:text-zinc-400 font-medium">Stage & Status</span>
                  <span className="font-bold text-orange-600 dark:text-orange-400">
                    {formData.startupStage || 'MVP'} • {formData.dpiitStatus}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 dark:text-zinc-400 font-medium">Readiness Track</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">
                    {formData.procurementReadiness}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/startup/dashboard')}
                  className="w-full font-black shadow-md shadow-orange-600/30"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Go to Startup Dashboard →
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Small text below card */}
        {currentStep < 4 && (
          <div className="text-center">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              Already registered?{' '}
              <Link
                to="/login"
                className="font-bold text-orange-600 dark:text-orange-400 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
