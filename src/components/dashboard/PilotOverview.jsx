import React, { useState } from 'react';
import { Building, Rocket, CheckCircle2, Clock, Eye, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { cn } from '../../utils/cn';

const PILOT_PROJECTS_DATA = [
  {
    id: 'plt-1',
    title: 'Smart Water Monitoring',
    department: 'Water Resources',
    leadStartup: 'AquaVision IoT Labs',
    status: 'Active',
    progress: 68,
    testbed: '32 Rural Water Distribution Schemes, Nashik',
    currentMilestone: 'Milestone 3: 500 Sensor Nodes & Cloud Telemetry Live',
    budgetDisbursed: '₹22.5L / ₹35L',
    uptime: '98.4% daily telemetry availability'
  },
  {
    id: 'plt-2',
    title: 'AI Maternal Health Screening',
    department: 'Public Health',
    leadStartup: 'CareMother Health Solutions',
    status: 'Planning',
    progress: 25,
    testbed: '18 Primary Health Centers, Gadchiroli',
    currentMilestone: 'Milestone 1: IRB Ethical Clearance & Equipment Calibrations',
    budgetDisbursed: '₹7.5L / ₹30L',
    uptime: 'Pre-deployment protocol validation'
  },
  {
    id: 'plt-3',
    title: 'Drone Crop Damage Assessment',
    department: 'Agriculture & Relief',
    leadStartup: 'KisanDrishti Geospatial',
    status: 'Completed',
    progress: 100,
    testbed: '500 Smallholder Farms, Aurangabad District',
    currentMilestone: 'Milestone 4: Third-party STQC Field Validation Passed',
    budgetDisbursed: '₹40L / ₹40L',
    uptime: '100% SLA achieved • Pilot successfully concluded'
  }
];

const STATUS_BADGES = {
  Planning: {
    bg: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700',
    dot: 'bg-zinc-400'
  },
  Active: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/60',
    dot: 'bg-emerald-500'
  },
  Completed: {
    bg: 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border-sky-200/60 dark:border-sky-800/60',
    dot: 'bg-sky-500'
  }
};

export function PilotOverview() {
  const [filter, setFilter] = useState('ALL');
  const [selectedPilot, setSelectedPilot] = useState(null);

  const filteredPilots = PILOT_PROJECTS_DATA.filter((p) => {
    if (filter === 'ALL') return true;
    return p.status === filter;
  });

  return (
    <section aria-label="Pilot Projects" className="space-y-4">
      {/* Header & Status Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-black text-zinc-950 dark:text-white tracking-tight">
            Pilot Projects
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Real-world testing in government facilities across Maharashtra
          </p>
        </div>

        {/* 3 Key Pilot Statuses Filter */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-lg self-start sm:self-auto">
          {['ALL', 'Planning', 'Active', 'Completed'].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilter(status)}
              className={cn(
                'px-3 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer',
                filter === status
                  ? 'bg-white dark:bg-zinc-900 text-orange-600 dark:text-orange-400 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              )}
            >
              {status === 'ALL' ? 'All Pilots' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Pilots Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredPilots.map((pilot) => {
          const badgeStyle = STATUS_BADGES[pilot.status] || STATUS_BADGES.Active;
          return (
            <div
              key={pilot.id}
              className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/90 dark:border-zinc-800 p-5 flex flex-col justify-between transition-all duration-150 hover:border-orange-500/40 hover:shadow-xs"
            >
              <div className="space-y-3">
                {/* Status & Startup */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border',
                      badgeStyle.bg
                    )}
                  >
                    <span className={cn('w-1.5 h-1.5 rounded-full', badgeStyle.dot)} />
                    {pilot.status}
                  </span>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                    {pilot.leadStartup}
                  </span>
                </div>

                {/* Pilot Title */}
                <div>
                  <h4 className="font-bold text-sm text-zinc-950 dark:text-white leading-snug">
                    {pilot.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    <Building className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span>Department: {pilot.department}</span>
                  </div>
                </div>

                {/* Simple Progress Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500 dark:text-zinc-400 font-medium">
                      Progress
                    </span>
                    <span className="font-black text-zinc-900 dark:text-white">
                      {pilot.progress}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all duration-500',
                        pilot.status === 'Completed'
                          ? 'bg-sky-500'
                          : pilot.progress > 50
                          ? 'bg-orange-600'
                          : 'bg-amber-500'
                      )}
                      style={{ width: `${pilot.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* View Pilot Action Button */}
              <div className="pt-4 mt-3 border-t border-zinc-100 dark:border-zinc-800">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedPilot(pilot)}
                  className="w-full text-xs font-bold border-zinc-200 dark:border-zinc-700 hover:border-orange-500 hover:text-orange-600 justify-center"
                  rightIcon={<Eye className="w-3.5 h-3.5" />}
                >
                  View Pilot
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* View Pilot Details Modal */}
      {selectedPilot && (
        <Modal
          isOpen={Boolean(selectedPilot)}
          onClose={() => setSelectedPilot(null)}
          title={`Pilot: ${selectedPilot.title}`}
          description={`Department: ${selectedPilot.department} • Startup: ${selectedPilot.leadStartup}`}
          footer={
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setSelectedPilot(null)}
            >
              Close
            </Button>
          }
        >
          <div className="space-y-3.5 text-xs text-left">
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-500">Status:</span>
                <span className="font-bold text-orange-600">
                  {selectedPilot.status} ({selectedPilot.progress}%)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Pilot Zone Testbed:</span>
                <span className="font-bold text-zinc-900 dark:text-white">
                  {selectedPilot.testbed}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Escrow Tranche Disbursal:</span>
                <span className="font-bold text-zinc-900 dark:text-white">
                  {selectedPilot.budgetDisbursed}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Telemetry SLA:</span>
                <span className="text-zinc-800 dark:text-zinc-200">
                  {selectedPilot.uptime}
                </span>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                Current Milestone
              </h5>
              <p className="text-zinc-600 dark:text-zinc-400">
                {selectedPilot.currentMilestone}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
