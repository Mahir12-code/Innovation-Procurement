import React, { useState } from 'react';
import { Check, ChevronRight, Scale, Award, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { cn } from '../../utils/cn';

const PIPELINE_STAGES = [
  { id: 1, name: 'Challenge', status: 'completed' },
  { id: 2, name: 'Startup Applications', status: 'completed' },
  { id: 3, name: 'Eligibility', status: 'completed' },
  { id: 4, name: 'Expert Review', status: 'completed' },
  { id: 5, name: 'Pilot', status: 'completed' },
  { id: 6, name: 'Procurement', status: 'current' },
  { id: 7, name: 'Scale-up', status: 'upcoming' }
];

const PROCUREMENT_READY_STARTUPS = [
  {
    id: 'str-1',
    startupName: 'AgriVision AI',
    sector: 'AgriTech',
    readiness: 'Pilot Completed',
    readinessBadge: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/60',
    pilotScore: '94.2%',
    actionLabel: 'Review',
    dpiit: 'DIPP-89234',
    recommendedPO: '₹1.20 Crore (5,000 Farm Units)'
  },
  {
    id: 'str-2',
    startupName: 'DroneShield Geo',
    sector: 'DeepTech / Aerospace',
    readiness: 'Field Verified (98.4%)',
    readinessBadge: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/60',
    pilotScore: '98.4%',
    actionLabel: 'Review',
    dpiit: 'DIPP-76120',
    recommendedPO: '₹85 Lakhs (12 Regional Hubs)'
  },
  {
    id: 'str-3',
    startupName: 'MedVitals AI',
    sector: 'MedTech',
    readiness: 'Clinical Audit Passed',
    readinessBadge: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/60',
    pilotScore: '99.1%',
    actionLabel: 'Review',
    dpiit: 'DIPP-44912',
    recommendedPO: '₹1.50 Crore (120 Sub-Districts)'
  },
  {
    id: 'str-4',
    startupName: 'CleanGrid IoT',
    sector: 'Energy & CleanTech',
    readiness: 'Pilot SLA Met',
    readinessBadge: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/60',
    pilotScore: '96.0%',
    actionLabel: 'Review',
    dpiit: 'DIPP-31804',
    recommendedPO: '₹60 Lakhs (40 Municipal Substations)'
  }
];

export function ProcurementPipeline() {
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [sanctionSuccess, setSanctionSuccess] = useState(null);

  const handleApproveSanction = () => {
    if (!selectedStartup) return;
    setSanctionSuccess(`Procurement recommendation sanctioned for ${selectedStartup.startupName}!`);
    setSelectedStartup(null);
    setTimeout(() => setSanctionSuccess(null), 3500);
  };

  return (
    <section aria-label="Procurement Pipeline" className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/90 dark:border-zinc-800 p-6 space-y-6">
      {/* Title & Description */}
      <div>
        <h3 className="text-lg font-black text-zinc-950 dark:text-white tracking-tight">
          Procurement Pipeline
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          Step-by-step institutional trajectory from open problem statement to direct GeM scaling
        </p>
      </div>

      {/* Horizontal Simple Process Indicator */}
      <div className="overflow-x-auto pb-2">
        <div className="flex items-center min-w-[680px] justify-between">
          {PIPELINE_STAGES.map((stage, idx) => {
            const isCurrent = stage.status === 'current';
            const isCompleted = stage.status === 'completed';

            return (
              <React.Fragment key={stage.id}>
                <div className="flex flex-col items-center text-center group cursor-default">
                  {/* Step Bubble */}
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                      isCurrent
                        ? 'bg-orange-600 text-white ring-4 ring-orange-500/20 shadow-xs'
                        : isCompleted
                        ? 'bg-zinc-900 text-white dark:bg-zinc-800 dark:text-zinc-200'
                        : 'bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500'
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <span>{stage.id}</span>
                    )}
                  </div>

                  {/* Stage Label */}
                  <span
                    className={cn(
                      'text-xs mt-2 whitespace-nowrap',
                      isCurrent
                        ? 'font-black text-orange-600 dark:text-orange-400'
                        : isCompleted
                        ? 'font-bold text-zinc-800 dark:text-zinc-200'
                        : 'font-medium text-zinc-400 dark:text-zinc-500'
                    )}
                  >
                    {stage.name}
                  </span>

                  {isCurrent && (
                    <span className="text-[10px] font-bold text-orange-600 bg-orange-50 dark:bg-orange-950/40 px-2 py-0.5 rounded-full border border-orange-200 dark:border-orange-800/60 mt-0.5">
                      Active Stage
                    </span>
                  )}
                </div>

                {/* Connector Arrow */}
                {idx < PIPELINE_STAGES.length - 1 && (
                  <div className="flex-1 px-2 mb-4">
                    <div
                      className={cn(
                        'h-0.5 w-full',
                        idx < 5 ? 'bg-zinc-900 dark:bg-zinc-700' : 'bg-zinc-200 dark:bg-zinc-800'
                      )}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Sanction Success Notification */}
      {sanctionSuccess && (
        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center justify-between animate-in fade-in">
          <span>{sanctionSuccess}</span>
          <button onClick={() => setSanctionSuccess(null)} className="text-emerald-600 font-bold ml-2">
            ✕
          </button>
        </div>
      )}

      {/* Sub-section: Startups Ready for Procurement */}
      <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-sm text-zinc-950 dark:text-white">
              Startups Ready for Procurement
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Pilots completed with verified milestones, eligible for direct work order award
            </p>
          </div>
          <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 hidden sm:inline">
            4 Startups In Queue
          </span>
        </div>

        {/* Compact Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                <th className="py-2.5 pr-3">Startup Name</th>
                <th className="py-2.5 px-3">Sector</th>
                <th className="py-2.5 px-3">Readiness</th>
                <th className="py-2.5 pl-3 text-right">Recommended Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
              {PROCUREMENT_READY_STARTUPS.map((startup) => (
                <tr
                  key={startup.id}
                  className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
                >
                  <td className="py-3 pr-3 font-bold text-zinc-950 dark:text-white">
                    {startup.startupName}
                    <span className="block text-[10px] font-normal text-zinc-400">
                      {startup.dpiit}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-zinc-700 dark:text-zinc-300">
                    {startup.sector}
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border',
                        startup.readinessBadge
                      )}
                    >
                      <Check className="w-3 h-3 text-emerald-600" />
                      {startup.readiness}
                    </span>
                  </td>
                  <td className="py-3 pl-3 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => setSelectedStartup(startup)}
                      className="px-3 py-1 text-xs font-bold rounded-lg bg-orange-600 hover:bg-orange-700 text-white transition-colors cursor-pointer shadow-xs"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Procurement Review Modal */}
      {selectedStartup && (
        <Modal
          isOpen={Boolean(selectedStartup)}
          onClose={() => setSelectedStartup(null)}
          title={`Procurement Review: ${selectedStartup.startupName}`}
          description={`DPIIT Entity: ${selectedStartup.dpiit} • Sector: ${selectedStartup.sector}`}
          footer={
            <>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedStartup(null)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleApproveSanction}
              >
                Approve Scale Sanction
              </Button>
            </>
          }
        >
          <div className="space-y-3.5 text-xs text-left">
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-500">Pilot Performance Score:</span>
                <span className="font-bold text-emerald-600">
                  {selectedStartup.pilotScore}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Readiness Gate:</span>
                <span className="font-bold text-zinc-900 dark:text-white">
                  {selectedStartup.readiness}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Recommended Purchase Sanction:</span>
                <span className="font-bold text-orange-600">
                  {selectedStartup.recommendedPO}
                </span>
              </div>
            </div>

            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              This startup has satisfied all testing, third-party safety, and SLA conditions in the field testbed. Approving this recommendation triggers commercial purchase order issuance and initiates direct catalogue listing on the Government e-Marketplace (GeM).
            </p>
          </div>
        </Modal>
      )}
    </section>
  );
}
