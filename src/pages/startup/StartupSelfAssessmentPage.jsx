import React, { useState } from 'react';
import {
  Award,
  ShieldAlert,
  Save,
  CheckCircle2,
  Info,
  Layers,
  HelpCircle,
  BarChart3,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useStartupPortal } from '../../context/StartupPortalContext';

export function StartupSelfAssessmentPage() {
  const { publicCriteria, selfAssessment, saveSelfAssessment } = useStartupPortal();

  // State initialized from context or defaults
  const [ratings, setRatings] = useState(
    selfAssessment?.ratings || {
      'crit-1': 5,
      'crit-2': 4,
      'crit-3': 4,
      'crit-4': 4,
      'crit-5': 5,
      'crit-6': 4,
      'crit-7': 5,
      'crit-8': 4
    }
  );

  const [notes, setNotes] = useState(
    selfAssessment?.notes || {
      'crit-1': 'Directly matches Pune Municipal Corporation non-revenue water loss requirements.',
      'crit-2': 'TRL 7 verified via 6-month continuous field test in Pimpri pump houses.',
      'crit-3': 'CERT-In empaneled audit cleared; data hosted in AWS GovCloud Mumbai region.',
      'crit-4': 'Pune based on-site field team guarantees 4-hour MTTR response.',
      'crit-5': 'BOM cost ₹18,400 per node compared to ₹1.2 Lakh legacy imported flow meters.',
      'crit-6': '2 granted Indian patents with 100% assignment to AquaSense Innovations.',
      'crit-7': 'LoRaWAN telemetry pushed at 5-minute intervals to public Grafana portal.',
      'crit-8': 'Conserves estimated 1.4 million liters daily by curtailing unmetered leaks.'
    }
  );

  const totalPoints = Object.values(ratings).reduce((a, b) => a + b, 0);
  const maxPoints = publicCriteria.length * 5;
  const readinessPercent = Math.round((totalPoints / maxPoints) * 100);

  const handleRatingChange = (critId, score) => {
    setRatings((prev) => ({ ...prev, [critId]: score }));
  };

  const handleNotesChange = (critId, text) => {
    setNotes((prev) => ({ ...prev, [critId]: text }));
  };

  const handleSave = () => {
    saveSelfAssessment({
      ratings,
      notes,
      lastSaved: new Date().toISOString(),
      readinessPercent
    });
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header Banner */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded border border-blue-200 dark:border-blue-800/60">
              Evaluation Readiness
            </span>
            <span className="text-xs text-zinc-500 font-medium">
              8 Public Framework Dimensions
            </span>
          </div>
          <h1 className="text-2xl font-black text-zinc-950 dark:text-white tracking-tight">
            Evaluation Framework & Self-Assessment
          </h1>
          <p className="text-xs text-zinc-500 max-w-xl">
            Benchmark your technology proposal against official public evaluation dimensions prior to technical jury defense.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Save className="w-4 h-4" /> Save Self-Assessment
        </button>
      </div>

      {/* Prominent Legal / Disclaimer Notice */}
      <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-2xl flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-amber-950 dark:text-amber-100">
            Startup Self-Assessment Tool — Not Official Government Evaluation Score
          </p>
          <p className="leading-relaxed text-amber-800 dark:text-amber-300">
            This module is provided strictly for your startup's internal readiness, proposal self-diagnosis, and pitch preparation.
            Ratings recorded here are stored only in your startup private workspace. Official proposal scoring is performed
            exclusively by the appointed Government of Maharashtra Technical Evaluation Committee using confidential jury weights.
          </p>
        </div>
      </div>

      {/* Summary Scorecard Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Calculated Internal Readiness
          </span>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-black text-zinc-950 dark:text-white">
              {readinessPercent}%
            </span>
            <span className="text-xs font-bold text-zinc-500">
              ({totalPoints} of {maxPoints} Potential Points)
            </span>
          </div>
          <p className="text-xs text-zinc-500">
            Based on your self-reported ratings across all 8 technical criteria.
          </p>
        </div>

        {/* Progress bar */}
        <div className="flex-1 max-w-md space-y-2">
          <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${readinessPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-zinc-400 font-medium">
            <span>Needs Preparation (0-50%)</span>
            <span>Viable (51-75%)</span>
            <span className="text-emerald-600 font-bold">Jury Ready (76-100%)</span>
          </div>
        </div>
      </div>

      {/* 8 Criteria Self-Assessment Rows */}
      <div className="space-y-4">
        {publicCriteria.map((crit, idx) => {
          const currentRating = ratings[crit.id] || 3;
          const currentNote = notes[crit.id] || '';

          return (
            <div
              key={crit.id}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 text-xs font-black flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                      {crit.name}
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed pl-8">
                    {crit.explanation}
                  </p>
                  <p className="text-[11px] text-zinc-500 pl-8">
                    <strong className="text-zinc-700 dark:text-zinc-300">Expected Evidence:</strong> {crit.expectedEvidence}
                  </p>
                </div>

                {/* Rating 1-5 selector */}
                <div className="shrink-0 space-y-1.5 pl-8 md:pl-0">
                  <label className="block text-[11px] font-bold text-zinc-500 text-right">
                    Self-Assessed Maturity (1 - 5)
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => handleRatingChange(crit.id, val)}
                        className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          currentRating === val
                            ? 'bg-orange-600 text-white shadow-xs scale-105 ring-2 ring-orange-400/40'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Startup Justification Textarea */}
              <div className="pl-8 pt-2">
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Startup Evidence Justification & Self-Notes
                </label>
                <textarea
                  rows={2}
                  value={currentNote}
                  onChange={(e) => handleNotesChange(crit.id, e.target.value)}
                  placeholder="Note specific data points, pilot telemetry results, or certifications that validate this criterion..."
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs focus:ring-2 focus:ring-orange-500 outline-none text-zinc-900 dark:text-white"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Save Action */}
      <div className="flex items-center justify-between p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs">
        <p className="text-xs text-zinc-500">
          Last saved: {selfAssessment?.lastSaved ? new Date(selfAssessment.lastSaved).toLocaleString() : 'Not saved yet'}
        </p>
        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Save className="w-4 h-4" /> Save Self-Assessment
        </button>
      </div>
    </div>
  );
}
