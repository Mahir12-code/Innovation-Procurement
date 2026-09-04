import React, { useState } from 'react';
import { Plus, Target, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { ChallengeCard } from './ChallengeCard';

const CHALLENGES_DATA = [
  {
    id: 'ch-1',
    title: 'Smart Traffic Monitoring',
    department: 'Urban Development',
    applicationsReceived: 32,
    deadline: '18 Sep 2026',
    status: 'Open',
    budget: '₹45 Lakhs',
    summary: 'AI-driven adaptive traffic signal management for high-density municipal corridors to reduce intersection wait times.'
  },
  {
    id: 'ch-2',
    title: 'Decentralized Solar Microgrid & Water Purifier',
    department: 'Water Resources & Energy',
    applicationsReceived: 24,
    deadline: '25 Sep 2026',
    status: 'Open',
    budget: '₹50 Lakhs',
    summary: 'Off-grid solar powered water desalination and filtration systems for remote rural schools and primary health centers.'
  },
  {
    id: 'ch-3',
    title: 'Tele-ICU & Point-of-Care Diagnostics',
    department: 'Public Health & Family Welfare',
    applicationsReceived: 41,
    deadline: '05 Oct 2026',
    status: 'Open',
    budget: '₹60 Lakhs',
    summary: 'Edge-AI clinical triage kits allowing rural medical officers to conduct real-time video telemetry with tertiary medical hospitals.'
  },
  {
    id: 'ch-4',
    title: 'Automated Pothole & Road Quality Telemetry',
    department: 'Public Works Department (PWD)',
    applicationsReceived: 19,
    deadline: '12 Oct 2026',
    status: 'Open',
    budget: '₹35 Lakhs',
    summary: 'Computer-vision telemetry on public transport buses that automatically maps road surface distress and pothole severity.'
  }
];

export function ActiveChallengesSection({ onPostChallengeClick }) {
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  return (
    <section aria-label="Active Government Challenges" className="space-y-4">
      {/* Header with Title and [ + Post Challenge ] button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-black text-zinc-950 dark:text-white tracking-tight">
            Active Government Challenges
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Priority problem statements open for DPIIT-verified startup proposals
          </p>
        </div>

        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={onPostChallengeClick}
          leftIcon={<Plus className="w-4 h-4" />}
          className="self-start sm:self-auto font-bold shadow-xs"
        >
          + Post Challenge
        </Button>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CHALLENGES_DATA.map((ch) => (
          <ChallengeCard
            key={ch.id}
            title={ch.title}
            department={ch.department}
            applicationsReceived={ch.applicationsReceived}
            deadline={ch.deadline}
            status={ch.status}
            onView={() => setSelectedChallenge(ch)}
          />
        ))}
      </div>

      {/* Challenge View Details Modal */}
      {selectedChallenge && (
        <Modal
          isOpen={Boolean(selectedChallenge)}
          onClose={() => setSelectedChallenge(null)}
          title={selectedChallenge.title}
          description={`Department: ${selectedChallenge.department}`}
          footer={
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setSelectedChallenge(null)}
            >
              Close
            </Button>
          }
        >
          <div className="space-y-4 text-xs text-left">
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-500">Department:</span>
                <span className="font-bold text-zinc-900 dark:text-white">
                  {selectedChallenge.department}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Grant Budget:</span>
                <span className="font-bold text-orange-600">
                  {selectedChallenge.budget}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Applications Received:</span>
                <span className="font-bold text-zinc-900 dark:text-white">
                  {selectedChallenge.applicationsReceived} Startups
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Deadline:</span>
                <span className="font-bold text-zinc-900 dark:text-white">
                  {selectedChallenge.deadline}
                </span>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                Challenge Scope & Testbed Requirements
              </h5>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {selectedChallenge.summary}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
