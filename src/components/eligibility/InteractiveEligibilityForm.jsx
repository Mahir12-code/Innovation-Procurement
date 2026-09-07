import React, { useState } from 'react';
import {
  Building2,
  Calendar,
  IndianRupee,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  HelpCircle,
  Cpu,
  Layers,
  Check
} from 'lucide-react';
import { FORM_OPTIONS } from '../../data/startupEligibilityRules';

export function InteractiveEligibilityForm({ onEvaluate, initialProfile = {} }) {
  const [profile, setProfile] = useState({
    businessStructure: initialProfile.businessStructure || '',
    incorporationDate: initialProfile.incorporationDate || '',
    annualTurnover: initialProfile.annualTurnover || '',
    dpiitRecognition: initialProfile.dpiitRecognition || '',
    isInnovative: initialProfile.isInnovative || '',
    isIndependent: initialProfile.isIndependent || '',
    sector: initialProfile.sector || ''
  });

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEvaluate && onEvaluate(profile);
  };

  const handleReset = () => {
    const cleared = {
      businessStructure: '',
      incorporationDate: '',
      annualTurnover: '',
      dpiitRecognition: '',
      isInnovative: '',
      isIndependent: '',
      sector: ''
    };
    setProfile(cleared);
    onEvaluate && onEvaluate(null);
  };

  const handleFillDemoEligible = () => {
    const demo = {
      businessStructure: 'Private Limited',
      incorporationDate: '2022-06-15',
      annualTurnover: '₹1 – ₹10 Crore',
      dpiitRecognition: 'Yes',
      isInnovative: 'Yes',
      isIndependent: 'Yes',
      sector: 'Technology'
    };
    setProfile(demo);
    onEvaluate && onEvaluate(demo);
  };

  const handleFillDemoIneligible = () => {
    const demo = {
      businessStructure: 'Other',
      incorporationDate: '2010-01-10',
      annualTurnover: 'Above ₹200 Crore',
      dpiitRecognition: 'No',
      isInnovative: 'No',
      isIndependent: 'No',
      sector: 'Other'
    };
    setProfile(demo);
    onEvaluate && onEvaluate(demo);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
        <div>
          <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
            Assessment Wizard
          </span>
          <h3 className="text-xl font-black text-zinc-950 dark:text-white tracking-tight mt-0.5">
            Check Your Eligibility
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Fill out your corporate details to evaluate eligibility against DPIIT and Maharashtra guidelines.
          </p>
        </div>

        {/* Quick Demo Fill Buttons for Presentations / SIH */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleFillDemoEligible}
            className="px-2.5 py-1 text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer"
            title="Load eligible sample startup"
          >
            Demo: Eligible Profile
          </button>
          <button
            type="button"
            onClick={handleFillDemoIneligible}
            className="px-2.5 py-1 text-[11px] font-bold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 rounded-lg hover:bg-rose-100 transition-colors cursor-pointer"
            title="Load non-eligible sample profile"
          >
            Demo: Ineligible
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Business Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400 text-xs font-black flex items-center justify-center">
              1
            </span>
            <h4 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-wider">
              Business Details
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Business Structure */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                <span>Business Structure</span>
                <span className="text-rose-500">*</span>
              </label>
              <select
                value={profile.businessStructure}
                onChange={(e) => handleChange('businessStructure', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs sm:text-sm text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500 transition-all cursor-pointer"
              >
                <option value="">Select structure...</option>
                {FORM_OPTIONS.businessStructures.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-zinc-500">
                Pvt Ltd, LLP, or registered partnership required.
              </p>
            </div>

            {/* Date of Incorporation */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                <span>Date of Incorporation</span>
                <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                value={profile.incorporationDate}
                onChange={(e) => handleChange('incorporationDate', e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs sm:text-sm text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500 transition-all cursor-pointer"
              />
              <p className="text-[10px] text-zinc-500">
                Generally ≤ 10 years (≤ 15 yrs for DeepTech).
              </p>
            </div>

            {/* Annual Turnover */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                <span>Annual Turnover (Last FY)</span>
                <span className="text-rose-500">*</span>
              </label>
              <select
                value={profile.annualTurnover}
                onChange={(e) => handleChange('annualTurnover', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs sm:text-sm text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500 transition-all cursor-pointer"
              >
                <option value="">Select turnover bracket...</option>
                {FORM_OPTIONS.turnoverRanges.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-zinc-500">
                Must not exceed ₹200 Crore in any FY.
              </p>
            </div>
          </div>
        </div>

        {/* Step 2: Startup Details & Declarations */}
        <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400 text-xs font-black flex items-center justify-center">
              2
            </span>
            <h4 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-wider">
              Startup Details & Innovation Status
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* DPIIT Recognition */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                <span>DPIIT Recognition</span>
                <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-1">
                {FORM_OPTIONS.dpiitOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleChange('dpiitRecognition', opt)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer text-center ${
                      profile.dpiitRecognition === opt
                        ? 'bg-orange-600 text-white border-orange-600 shadow-2xs'
                        : 'bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Innovative Product/Service */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                <span>Innovative Product/Service?</span>
                <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-1">
                {FORM_OPTIONS.booleanOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleChange('isInnovative', opt)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer text-center ${
                      profile.isInnovative === opt
                        ? 'bg-orange-600 text-white border-orange-600 shadow-2xs'
                        : 'bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Independently Established */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                <span>Independently Established?</span>
                <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-1">
                {FORM_OPTIONS.booleanOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleChange('isIndependent', opt)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer text-center ${
                      profile.isIndependent === opt
                        ? 'bg-orange-600 text-white border-orange-600 shadow-2xs'
                        : 'bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Startup Sector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                <span>Startup Sector</span>
                <span className="text-rose-500">*</span>
              </label>
              <select
                value={profile.sector}
                onChange={(e) => handleChange('sector', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs sm:text-sm text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500 transition-all cursor-pointer"
              >
                <option value="">Select industry sector...</option>
                {FORM_OPTIONS.sectors.map((sec) => (
                  <option key={sec} value={sec}>
                    {sec}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Action Button Strip */}
        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear Form
          </button>

          <button
            type="submit"
            className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-black rounded-xl shadow-xs hover:shadow-md transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Check Eligibility</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
