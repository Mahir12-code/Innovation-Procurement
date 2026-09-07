import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Sparkles,
  RotateCcw,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  Building2,
  Users,
  Award,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import maharashtraLogo from '../../assets/maharashtra-gov-logo.png';
import {
  STARTUP_SCHEMES_DATA,
  FILTER_OPTIONS
} from '../../data/startupSchemesData';
import {
  StartupSchemeCard,
  StartupSchemeDetailModal,
  FindSupportModal,
  IncubatorsSection
} from '../../components/schemes';

export function StartupsSchemesPage() {
  const { id: routeSchemeId } = useParams();
  const [searchParams] = useSearchParams();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSupportType, setSelectedSupportType] = useState('All');
  const [selectedStage, setSelectedStage] = useState('All Stages');
  const [selectedFounderType, setSelectedFounderType] = useState('All Founders');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');

  // Modal State
  const [activeModalScheme, setActiveModalScheme] = useState(null);
  const [isFindSupportOpen, setIsFindSupportOpen] = useState(false);

  // Deep-linking / URL Parameter handling
  useEffect(() => {
    const targetId = routeSchemeId || window.location.hash.replace('#', '') || searchParams.get('id');
    if (targetId) {
      const matched = STARTUP_SCHEMES_DATA.find(
        (s) => s.id === targetId || s.slug === targetId
      );
      if (matched) {
        setActiveModalScheme(matched);
      }
    }
  }, [routeSchemeId, searchParams]);

  // Featured schemes (top 4)
  const featuredSchemes = useMemo(() => {
    return STARTUP_SCHEMES_DATA.filter((s) => s.isFeatured);
  }, []);

  // Filtered schemes logic
  const filteredSchemes = useMemo(() => {
    return STARTUP_SCHEMES_DATA.filter((scheme) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = scheme.schemeName.toLowerCase().includes(q);
        const matchesDept = scheme.department.toLowerCase().includes(q);
        const matchesAgency = scheme.implementingAgency.toLowerCase().includes(q);
        const matchesDesc = scheme.description.toLowerCase().includes(q);
        const matchesTags = scheme.tags?.some((t) => t.toLowerCase().includes(q));
        const matchesIndustry = scheme.industry?.some((i) => i.toLowerCase().includes(q));
        if (!matchesName && !matchesDept && !matchesAgency && !matchesDesc && !matchesTags && !matchesIndustry) {
          return false;
        }
      }

      // 2. Support Type
      if (selectedSupportType !== 'All') {
        if (!scheme.supportType?.includes(selectedSupportType)) {
          return false;
        }
      }

      // 3. Startup Stage
      if (selectedStage !== 'All Stages') {
        if (!scheme.stage?.includes(selectedStage)) {
          return false;
        }
      }

      // 4. Founder Type
      if (selectedFounderType !== 'All Founders') {
        if (!scheme.founderType?.includes(selectedFounderType) && !scheme.founderType?.includes('Any Entrepreneur')) {
          return false;
        }
      }

      // 5. Industry
      if (selectedIndustry !== 'All Industries') {
        if (!scheme.industry?.includes(selectedIndustry)) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedSupportType, selectedStage, selectedFounderType, selectedIndustry]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedSupportType !== 'All' ||
    selectedStage !== 'All Stages' ||
    selectedFounderType !== 'All Founders' ||
    selectedIndustry !== 'All Industries';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSupportType('All');
    setSelectedStage('All Stages');
    setSelectedFounderType('All Founders');
    setSelectedIndustry('All Industries');
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      {/* 1. HERO SECTION */}
      <section className="relative border-b border-zinc-200 dark:border-zinc-800 bg-gradient-to-b from-orange-50/40 via-white to-zinc-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 overflow-hidden">
        {/* Background Subtle Maharashtra Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:28px_28px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 sm:pt-14 sm:pb-16 space-y-6">
          {/* Government Endorsement Badge */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 bg-white dark:bg-zinc-800/90 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 shadow-2xs">
              <img
                src={maharashtraLogo}
                alt="Maharashtra Seal"
                className="h-4 w-auto object-contain"
              />
              <span className="text-[11px] font-black tracking-wide text-zinc-800 dark:text-zinc-200 uppercase">
                Government of Maharashtra
              </span>
            </div>

            <span className="text-xs font-bold text-orange-700 dark:text-orange-400 bg-orange-100/70 dark:bg-orange-950/50 px-3 py-1 rounded-full border border-orange-200/80 dark:border-orange-800/60 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Schemes Directory
            </span>

            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium hidden sm:inline">
              Official MSInS & Directorate of Industries Repository
            </span>
          </div>

          {/* Titles */}
          <div className="max-w-4xl space-y-3">
            <div className="space-y-1">
              <span className="text-xs font-extrabold uppercase tracking-widest text-orange-600 dark:text-orange-400">
                Startups & Entrepreneurship
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white tracking-tight leading-tight">
                Startup & Entrepreneurship Support
              </h1>
            </div>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 font-normal leading-relaxed">
              Find funding, incubation, mentorship and government opportunities for your startup in Maharashtra.
            </p>

            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium">
              Discover Maharashtra Government support for startups, entrepreneurs and innovators — from seed grants and market access pilots to state venture funds and women entrepreneurship initiatives.
            </p>
          </div>

          {/* Quick Metrics Strip */}
          <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl">
            <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xs border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl shadow-2xs">
              <div className="text-xl font-black text-zinc-950 dark:text-white">14</div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-semibold">Active Schemes Listed</div>
            </div>
            <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xs border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl shadow-2xs">
              <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">Up to ₹15L</div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-semibold">Govt Pilot Work Orders</div>
            </div>
            <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xs border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl shadow-2xs">
              <div className="text-xl font-black text-orange-600 dark:text-orange-400">36 Districts</div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-semibold">Statewide DIC Network</div>
            </div>
            <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xs border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl shadow-2xs">
              <div className="text-xl font-black text-violet-600 dark:text-violet-400">100% Verified</div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-semibold">Official Govt Portals</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* 2. SEARCH BAR & 3. "FIND SUPPORT FOR MY STARTUP" CTA BANNER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Search Box (7 cols on desktop) */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between gap-4">
            <div className="space-y-1">
              <label htmlFor="scheme-search" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                <span>Search Startup Programs & Grants</span>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-[11px] font-bold text-orange-600 hover:text-orange-700 dark:hover:text-orange-400 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset Filters
                  </button>
                )}
              </label>
              <div className="relative mt-2">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="scheme-search"
                  type="text"
                  placeholder="Search startup schemes, funding, incubation or support…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Quick Helper Filter Counts */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400 pt-1 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-1.5 font-medium">
                <span>Showing</span>
                <strong className="text-zinc-900 dark:text-white font-bold">{filteredSchemes.length}</strong>
                <span>of</span>
                <strong className="text-zinc-900 dark:text-white font-bold">{STARTUP_SCHEMES_DATA.length}</strong>
                <span>verified programs</span>
              </div>

              {/* Industry Dropdown in search card */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-semibold text-zinc-400">Industry:</span>
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold rounded-lg px-2 py-1 outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer"
                >
                  {FILTER_OPTIONS.industries.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 3. CTA Banner: "Find Support For My Startup" (5 cols on desktop) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-orange-600 to-amber-700 text-white rounded-2xl p-6 shadow-md flex flex-col justify-between relative overflow-hidden group">
            {/* Ambient visual badge */}
            <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-2 relative z-10">
              <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                Interactive Opportunity Matchmaker
              </div>
              <h3 className="text-xl font-black tracking-tight leading-tight">
                Not sure which scheme fits your stage?
              </h3>
              <p className="text-xs text-orange-100 leading-relaxed max-w-sm">
                Answer 10 quick questions about your startup stage, industry, and founder profile to discover high-match Maharashtra government programs.
              </p>
            </div>

            <div className="pt-4 relative z-10">
              <button
                type="button"
                onClick={() => setIsFindSupportOpen(true)}
                className="w-full sm:w-auto px-5 py-2.5 bg-white text-orange-700 hover:bg-orange-50 text-xs font-black rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer group-hover:shadow-md"
              >
                Find Support For My Startup
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* 4. FEATURED STARTUP PROGRAMS SECTION */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-orange-700 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 px-2.5 py-0.5 rounded-md border border-orange-200 dark:border-orange-800/60">
                  Flagship State Initiatives
                </span>
              </div>
              <h2 className="text-2xl font-black text-zinc-950 dark:text-white tracking-tight">
                Featured Startup Programs
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Key flagship programs launched by the Government of Maharashtra and MSInS offering direct pilots, venture funding, and structured acceleration.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featuredSchemes.map((scheme) => (
              <StartupSchemeCard
                key={scheme.id}
                scheme={scheme}
                onViewDetails={(s) => setActiveModalScheme(s)}
                isFeatured={true}
              />
            ))}
          </div>
        </section>

        {/* 5, 6, 7. BROWSE BY FILTERS SECTION */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <h3 className="text-sm font-black text-zinc-950 dark:text-white tracking-tight">
                Filter Schemes by Parameters
              </h3>
            </div>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs font-bold text-zinc-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors cursor-pointer"
              >
                Clear All
              </button>
            )}
          </div>

          {/* 5. Browse by Support Type */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">
              Support Type:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {FILTER_OPTIONS.supportTypes.map((type) => {
                const isSelected = selectedSupportType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedSupportType(type)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-orange-600 text-white shadow-xs'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 6. Browse by Startup Stage */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">
              Startup Stage:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {FILTER_OPTIONS.startupStages.map((stg) => {
                const isSelected = selectedStage === stg;
                return (
                  <button
                    key={stg}
                    type="button"
                    onClick={() => setSelectedStage(stg)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-xs'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    }`}
                  >
                    {stg}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 7. Browse by Founder Type */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">
              Founder Type:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {FILTER_OPTIONS.founderTypes.map((founder) => {
                const isSelected = selectedFounderType === founder;
                return (
                  <button
                    key={founder}
                    type="button"
                    onClick={() => setSelectedFounderType(founder)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    }`}
                  >
                    {founder}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 8. ALL STARTUP SCHEMES GRID */}
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black text-zinc-950 dark:text-white tracking-tight">
                All Startup Schemes & Financial Programs
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Browse all verified Government of Maharashtra and centrally sponsored entrepreneurship schemes available in the state.
              </p>
            </div>

            <div className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
              Showing {filteredSchemes.length} of {STARTUP_SCHEMES_DATA.length} schemes
            </div>
          </div>

          {filteredSchemes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredSchemes.map((scheme) => (
                <StartupSchemeCard
                  key={scheme.id}
                  scheme={scheme}
                  onViewDetails={(s) => setActiveModalScheme(s)}
                  isFeatured={false}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-zinc-900 dark:text-white">
                  No schemes matched your filters
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
                  Try clearing your search query or selecting "All" across support types and stages to view the full directory.
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold hover:bg-orange-700 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset All Filters
              </button>
            </div>
          )}
        </section>

        {/* 9. GOVERNMENT INCUBATORS / ECOSYSTEM */}
        <IncubatorsSection />

        {/* 10. IMPORTANT INFORMATION / DISCLAIMER SECTION */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-amber-700 dark:text-amber-400" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-black text-zinc-950 dark:text-white tracking-tight">
                Important Information & Official Verification Guidelines
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Statutory advisory for startups, founders, and MSME applicants
              </p>
            </div>
          </div>

          <div className="p-4 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 rounded-xl text-xs text-amber-950 dark:text-amber-200 leading-relaxed space-y-2">
            <p className="font-bold">
              Official Disclaimer:
            </p>
            <p>
              “Scheme information is provided for citizen and entrepreneur convenience. Eligibility, funding, application dates and program conditions may change. Always verify the latest information on the official Government portal before applying.”
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-zinc-600 dark:text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <div className="space-y-1.5">
              <h4 className="font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Verified Official Data Sources
              </h4>
              <p className="leading-relaxed">
                Information listed on this directory is gathered from official Government of Maharashtra gazettes, Maharashtra State Innovation Society (MSInS), Directorate of Industries (di.maharashtra.gov.in), and official central portals (KVIC/PMEGP).
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-orange-600" /> State vs Central Government Program Distinction
              </h4>
              <p className="leading-relaxed">
                Maharashtra Government state programs are implemented directly by state nodal agencies. Centrally sponsored schemes like PMEGP are clearly labeled as "Central Government Scheme — Available in Maharashtra" to prevent regulatory ambiguity.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Scheme Detail Modal */}
      <StartupSchemeDetailModal
        scheme={activeModalScheme}
        isOpen={!!activeModalScheme}
        onClose={() => setActiveModalScheme(null)}
      />

      {/* "Find Support For My Startup" Questionnaire Modal */}
      <FindSupportModal
        isOpen={isFindSupportOpen}
        onClose={() => setIsFindSupportOpen(false)}
        onSelectScheme={(scheme) => {
          setIsFindSupportOpen(false);
          setActiveModalScheme(scheme);
        }}
      />
    </div>
  );
}
