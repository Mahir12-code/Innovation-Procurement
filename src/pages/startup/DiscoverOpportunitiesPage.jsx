import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  ArrowRight,
  Clock,
  Building2,
  SlidersHorizontal,
  FileCheck,
  CheckCircle2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useStartupPortal } from '../../context/StartupPortalContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';

export function DiscoverOpportunitiesPage() {
  const navigate = useNavigate();
  const { opportunities, createDraftApplication } = useStartupPortal();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedSector, setSelectedSector] = useState('All');

  const departmentOptions = [
    { value: 'All', label: 'All Government Departments' },
    { value: 'Urban Development Department', label: 'Urban Development' },
    { value: 'Transport Department', label: 'Transport & Smart Mobility' },
    { value: 'Public Health Department', label: 'Public Health' },
    { value: 'Water Resources Department', label: 'Water Resources' }
  ];

  const sectorOptions = [
    { value: 'All', label: 'All Sectors' },
    { value: 'Smart Cities & IoT', label: 'Smart Cities & IoT' },
    { value: 'Smart Mobility', label: 'Smart Mobility' },
    { value: 'MedTech & Healthcare', label: 'MedTech & Healthcare' },
    { value: 'CleanTech & IoT', label: 'CleanTech & IoT' }
  ];

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opp) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        opp.title.toLowerCase().includes(query) ||
        opp.problemStatement.toLowerCase().includes(query) ||
        opp.department.toLowerCase().includes(query) ||
        opp.sector.toLowerCase().includes(query);

      const matchesDept = selectedDept === 'All' || opp.department === selectedDept;
      const matchesSector = selectedSector === 'All' || opp.sector === selectedSector;

      // Strictly only Published + Open
      const isOpen = opp.status === 'Open';

      return matchesSearch && matchesDept && matchesSector && isOpen;
    });
  }, [opportunities, searchQuery, selectedDept, selectedSector]);

  const handleApply = (oppId) => {
    const draftId = createDraftApplication(oppId);
    if (draftId) {
      navigate(`/startup/applications/${draftId}/edit`);
    }
  };

  return (
    <div className="space-y-6 pb-16 max-w-7xl mx-auto">
      {/* -------------------------------------------------- */}
      {/* 1. HEADER */}
      {/* -------------------------------------------------- */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-5 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-zinc-400">Sarkar Setu / Startup</span>
          <span className="text-xs text-zinc-400">/</span>
          <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
            Discover Opportunities
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight">
              Government RFP Opportunities & Challenges
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Live innovation procurement problem statements published by Government of Maharashtra departments.
            </p>
          </div>
          <Badge variant="success" className="text-xs font-bold shrink-0">
            DPIIT Turnover Waiver Active
          </Badge>
        </div>
      </div>

      {/* -------------------------------------------------- */}
      {/* 2. SEARCH & FILTERS BAR */}
      {/* -------------------------------------------------- */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by challenge title, problem statement, or tech area..."
              className="pl-9 text-xs"
            />
          </div>

          {/* Department Filter */}
          <div className="md:col-span-3">
            <Select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              options={departmentOptions}
              className="text-xs"
            />
          </div>

          {/* Sector Filter */}
          <div className="md:col-span-3">
            <Select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              options={sectorOptions}
              className="text-xs"
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 pt-1">
          <span>
            Showing <strong className="text-zinc-900 dark:text-white">{filteredOpportunities.length}</strong> active published challenge(s)
          </span>
          {(searchQuery || selectedDept !== 'All' || selectedSector !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDept('All');
                setSelectedSector('All');
              }}
              className="text-orange-600 dark:text-orange-400 font-bold hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* -------------------------------------------------- */}
      {/* 3. OPPORTUNITIES GRID */}
      {/* -------------------------------------------------- */}
      {filteredOpportunities.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
          <AlertCircle className="w-8 h-8 text-zinc-400 mx-auto" />
          <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
            No matching opportunities found
          </h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Try adjusting your search terms or filter selections to view available published challenges.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredOpportunities.map((opp) => (
            <div
              key={opp.id}
              className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs hover:border-orange-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800/80">
                    {opp.sector}
                  </span>
                  <div className="text-right">
                    <span className="text-sm font-black text-zinc-950 dark:text-white block">
                      {opp.budget}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-medium">Grant Ceiling</span>
                  </div>
                </div>

                <div>
                  <h3
                    onClick={() => navigate(`/startup/opportunities/${opp.id}`)}
                    className="text-base font-bold text-zinc-950 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 transition-colors cursor-pointer leading-snug"
                  >
                    {opp.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{opp.department} • {opp.state}</span>
                  </div>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                  {opp.problemStatement}
                </p>

                {/* Eligibility Tag */}
                <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-600 dark:text-zinc-300">
                  <span className="font-bold text-zinc-900 dark:text-white block mb-0.5">Eligibility:</span>
                  <p className="line-clamp-2">{opp.eligibility}</p>
                </div>
              </div>

              {/* Bottom Actions & Countdown */}
              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2 text-xs">
                <span className="text-zinc-500 dark:text-zinc-400 font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>
                    <strong>{opp.daysRemaining} days</strong> left ({opp.deadline})
                  </span>
                </span>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/startup/opportunities/${opp.id}`)}
                    className="text-xs h-8"
                  >
                    View Details
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleApply(opp.id)}
                    className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs h-8 shadow-xs"
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
