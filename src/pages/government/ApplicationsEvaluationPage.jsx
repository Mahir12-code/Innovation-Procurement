import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  ClipboardCheck, 
  Award, 
  Star, 
  Sliders, 
  CheckCircle2, 
  AlertCircle, 
  UserCheck, 
  Building2,
  TrendingUp,
  ChevronRight
} from 'lucide-react';
import { useGovernmentPortal } from '../../context/GovernmentPortalContext';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { Badge } from '../../components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';

export function ApplicationsEvaluationPage() {
  const navigate = useNavigate();
  const { evaluationQueue, submitEvaluation, showToast } = useGovernmentPortal();

  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Scoring Modal State
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [scores, setScores] = useState({
    technicalFeasibility: 22,
    innovation: 18,
    scalability: 17,
    govImpact: 19,
    teamCapability: 14
  });
  const [recommendation, setRecommendation] = useState('Shortlist for Pilot Sandbox');
  const [evaluatorNotes, setEvaluatorNotes] = useState('');

  const departmentOptions = [
    'All',
    'Urban Development Department',
    'Transport Department',
    'Public Health Department',
    'Water Resources Department',
    'School Education Department',
    'Agriculture Department'
  ];

  const filteredQueue = useMemo(() => {
    return evaluationQueue.filter((item) => {
      const matchesSearch =
        item.startupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.appId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.problemTitle.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDept = deptFilter === 'All' || item.department === deptFilter;
      const matchesStatus =
        statusFilter === 'All' ||
        (statusFilter === 'Under Evaluation' && item.status === 'Under Evaluation') ||
        (statusFilter === 'Evaluated' && item.status === 'Evaluated');

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [evaluationQueue, searchQuery, deptFilter, statusFilter]);

  const openScoringModal = (item) => {
    setSelectedEvaluation(item);
    setScores({
      technicalFeasibility: item.technicalFeasibility || 22,
      innovation: item.innovation || 18,
      scalability: item.scalability || 17,
      govImpact: item.govImpact || 19,
      teamCapability: item.teamCapability || 14
    });
    setEvaluatorNotes(item.comments || 'Strong technical readiness, proven field trial validation, high relevance to department problem statement.');
  };

  const currentTotal = useMemo(() => {
    return (
      (parseInt(scores.technicalFeasibility) || 0) +
      (parseInt(scores.innovation) || 0) +
      (parseInt(scores.scalability) || 0) +
      (parseInt(scores.govImpact) || 0) +
      (parseInt(scores.teamCapability) || 0)
    );
  }, [scores]);

  const handleScoreSubmit = (e) => {
    e.preventDefault();
    if (!selectedEvaluation) return;

    submitEvaluation(selectedEvaluation.appId, scores, evaluatorNotes);
    setSelectedEvaluation(null);
  };

  const underEvalCount = evaluationQueue.filter(e => e.status === 'Under Evaluation').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Navigation & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/government/dashboard')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="text-xs font-semibold text-orange-600 dark:text-orange-400">
              Technical Jury Desk
            </span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
              Applications Under Evaluation
            </h1>
            <Badge variant="primary" size="md">
              {underEvalCount} In Active Scoring
            </Badge>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Independent evaluation committee scoring matrix based on technical feasibility, innovation, and government impact.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/government/dashboard')}
          >
            Dashboard
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/government/shortlisted-startups')}
            className="flex items-center gap-1.5 shadow-sm"
          >
            <Award className="w-4 h-4" />
            Shortlisted Startups
          </Button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
          <Input
            placeholder="Search startup name, ID, problem..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>

        <Select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          options={departmentOptions.map(d => ({ value: d, label: d === 'All' ? 'All Departments' : d }))}
          className="text-xs"
        />

        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={[
            { value: 'All', label: 'All Evaluation States' },
            { value: 'Under Evaluation', label: 'In Progress (Jury Reviewing)' },
            { value: 'Evaluated', label: 'Evaluation Completed' }
          ]}
          className="text-xs"
        />
      </div>

      {/* Evaluation Queue Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xs">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-28">App ID</TableHead>
              <TableHead>Startup & Problem Statement</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Assigned Jury Panel</TableHead>
              <TableHead className="text-center">Jury Reviews</TableHead>
              <TableHead className="text-center">Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Scoring Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQueue.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12 text-zinc-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <ClipboardCheck className="w-8 h-8 text-zinc-400" />
                    <p className="font-semibold">No applications found under evaluation</p>
                    <p className="text-xs text-zinc-400">All submissions have been scored or no records match your filter.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredQueue.map((item) => (
                <TableRow key={item.appId} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40">
                  <TableCell className="font-mono text-xs font-bold text-zinc-600 dark:text-zinc-400">
                    {item.appId}
                  </TableCell>
                  <TableCell>
                    <div className="font-bold text-zinc-900 dark:text-white text-sm">
                      {item.startupName}
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                      {item.problemTitle}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-zinc-700 dark:text-zinc-300 font-medium">
                      {item.department}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs text-zinc-600 dark:text-zinc-400">
                      {item.evaluators || 'IIT Bombay & STQC Technical Panel'}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                      {item.reviewsCompleted || '2/3 Complete'}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    {item.overallScore ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black bg-orange-100 text-orange-900 dark:bg-orange-950/70 dark:text-orange-300">
                        {item.overallScore}/100
                      </span>
                    ) : (
                      <span className="text-xs text-zinc-400 font-medium">In Scoring</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={item.status === 'Evaluated' ? 'success' : 'primary'}
                      size="sm"
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant={item.status === 'Evaluated' ? 'outline' : 'primary'}
                      size="xs"
                      onClick={() => openScoringModal(item)}
                      className="text-xs"
                    >
                      <Sliders className="w-3.5 h-3.5 mr-1" />
                      {item.status === 'Evaluated' ? 'Re-Score' : 'Score Dossier'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Interactive Jury Scoring Matrix Modal */}
      {selectedEvaluation && (
        <Modal
          isOpen={!!selectedEvaluation}
          onClose={() => setSelectedEvaluation(null)}
          title={`Jury Scorecard: ${selectedEvaluation.startupName}`}
          description={`Application ID: ${selectedEvaluation.appId} • Challenge: ${selectedEvaluation.problemTitle}`}
          maxWidth="max-w-2xl"
          footer={
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-zinc-500">Cumulative Score:</span>
                <span className={`text-base font-black ${currentTotal >= 80 ? 'text-emerald-600 dark:text-emerald-400' : 'text-orange-600'}`}>
                  {currentTotal}/100
                </span>
                <span className="text-[11px] font-semibold text-zinc-400">
                  ({currentTotal >= 80 ? 'Clears Sandbox Threshold ≥80' : 'Below Sandbox Threshold'})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedEvaluation(null)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleScoreSubmit}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold"
                >
                  Submit Official Scorecard
                </Button>
              </div>
            </div>
          }
        >
          <form onSubmit={handleScoreSubmit} className="space-y-4 text-xs">
            {/* Criteria 1 */}
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-zinc-900 dark:text-white">
                  1. Technical Feasibility & TRL Maturity (Max: 25)
                </label>
                <span className="font-black text-orange-600 dark:text-orange-400 text-sm">
                  {scores.technicalFeasibility} / 25
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 mb-2">
                Evaluates prototype readiness (TRL 6+), architecture stability, and engineering rigor.
              </p>
              <input
                type="range"
                min="0"
                max="25"
                value={scores.technicalFeasibility}
                onChange={(e) => setScores({ ...scores, technicalFeasibility: parseInt(e.target.value) || 0 })}
                className="w-full accent-orange-600 cursor-pointer"
              />
            </div>

            {/* Criteria 2 */}
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-zinc-900 dark:text-white">
                  2. Innovation & IP Uniqueness (Max: 20)
                </label>
                <span className="font-black text-orange-600 dark:text-orange-400 text-sm">
                  {scores.innovation} / 20
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 mb-2">
                Indigenous patents, novel algorithms, or unique technological approach over existing legacy systems.
              </p>
              <input
                type="range"
                min="0"
                max="20"
                value={scores.innovation}
                onChange={(e) => setScores({ ...scores, innovation: parseInt(e.target.value) || 0 })}
                className="w-full accent-orange-600 cursor-pointer"
              />
            </div>

            {/* Criteria 3 */}
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-zinc-900 dark:text-white">
                  3. Scalability & Field Deployment Readiness (Max: 20)
                </label>
                <span className="font-black text-orange-600 dark:text-orange-400 text-sm">
                  {scores.scalability} / 20
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 mb-2">
                Ability to scale across 36 districts of Maharashtra and integrate with state cloud & APIs.
              </p>
              <input
                type="range"
                min="0"
                max="20"
                value={scores.scalability}
                onChange={(e) => setScores({ ...scores, scalability: parseInt(e.target.value) || 0 })}
                className="w-full accent-orange-600 cursor-pointer"
              />
            </div>

            {/* Criteria 4 */}
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-zinc-900 dark:text-white">
                  4. Government Impact & Cost Efficiency (Max: 20)
                </label>
                <span className="font-black text-orange-600 dark:text-orange-400 text-sm">
                  {scores.govImpact} / 20
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 mb-2">
                Measurable citizen benefit, public expenditure savings, and service SLA improvement.
              </p>
              <input
                type="range"
                min="0"
                max="20"
                value={scores.govImpact}
                onChange={(e) => setScores({ ...scores, govImpact: parseInt(e.target.value) || 0 })}
                className="w-full accent-orange-600 cursor-pointer"
              />
            </div>

            {/* Criteria 5 */}
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-zinc-900 dark:text-white">
                  5. Team Execution Capability & Pedigree (Max: 15)
                </label>
                <span className="font-black text-orange-600 dark:text-orange-400 text-sm">
                  {scores.teamCapability} / 15
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 mb-2">
                Domain expertise of founding team, key engineers, and past delivery track record.
              </p>
              <input
                type="range"
                min="0"
                max="15"
                value={scores.teamCapability}
                onChange={(e) => setScores({ ...scores, teamCapability: parseInt(e.target.value) || 0 })}
                className="w-full accent-orange-600 cursor-pointer"
              />
            </div>

            {/* Evaluator Notes */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Official Jury Findings & Nodal Recommendation
              </label>
              <Textarea
                rows={2}
                value={evaluatorNotes}
                onChange={(e) => setEvaluatorNotes(e.target.value)}
                placeholder="Detail technical strengths, potential risks during sandbox deployment..."
                className="text-xs"
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
