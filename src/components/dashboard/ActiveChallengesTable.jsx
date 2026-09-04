import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../ui/Table';
import { StatusBadge } from '../ui/StatusBadge';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { ACTIVE_CHALLENGES } from '../../data/mockData';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Target, Plus, Eye, Search, Filter, ArrowUpRight } from 'lucide-react';

const SECTORS = ['All Sectors', 'Agritech & AI', 'Smart Cities & IoT', 'Healthcare & Medtech', 'Drones & Aerospace'];

export function ActiveChallengesTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('All Sectors');

  const filteredChallenges = ACTIVE_CHALLENGES.filter((ch) => {
    const matchesSearch =
      ch.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ch.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ch.leadStartup && ch.leadStartup.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSector =
      selectedSector === 'All Sectors' || ch.sector === selectedSector;

    return matchesSearch && matchesSector;
  });

  return (
    <Card className="border-zinc-200/90 dark:border-zinc-800 shadow-card">
      <CardHeader className="flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400">
              <Target className="w-4 h-4" />
            </span>
            <CardTitle className="text-base text-zinc-950 dark:text-white">
              Active Department Challenges
            </CardTitle>
          </div>
          <CardDescription className="mt-0.5">
            Open problem statements, sandbox tracks, and RFP opportunities for startups.
          </CardDescription>
        </div>

        <Link to="/government/challenges">
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
            Post New Challenge
          </Button>
        </Link>
      </CardHeader>

      {/* Filter and Search Bar */}
      <div className="px-6 py-3.5 bg-zinc-50 dark:bg-zinc-800/40 border-b border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search Box */}
        <div className="relative w-full md:w-80">
          <Input
            placeholder="Search by challenge ID, title, or startup..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search className="w-4 h-4 text-zinc-400" />}
            className="py-1.5 text-xs bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        {/* Sector Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {SECTORS.map((sec) => (
            <button
              key={sec}
              type="button"
              onClick={() => setSelectedSector(sec)}
              className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedSector === sec
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-zinc-50 dark:bg-zinc-800/60 border-b border-zinc-200 dark:border-zinc-800">
              <TableHead className="font-extrabold text-zinc-800 dark:text-zinc-200">Challenge Statement</TableHead>
              <TableHead className="font-extrabold text-zinc-800 dark:text-zinc-200">Sector</TableHead>
              <TableHead className="font-extrabold text-zinc-800 dark:text-zinc-200">Current Step</TableHead>
              <TableHead className="font-extrabold text-zinc-800 dark:text-zinc-200">Sanctioned Grant</TableHead>
              <TableHead className="font-extrabold text-zinc-800 dark:text-zinc-200">Proposals</TableHead>
              <TableHead className="font-extrabold text-zinc-800 dark:text-zinc-200">Deadline</TableHead>
              <TableHead className="text-right font-extrabold text-zinc-800 dark:text-zinc-200">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredChallenges.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-zinc-500 dark:text-zinc-400 text-xs font-medium">
                  No challenges found matching your filter criteria.
                </TableCell>
              </TableRow>
            ) : (
              filteredChallenges.map((ch) => (
                <TableRow key={ch.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 border-b border-zinc-100 dark:border-zinc-800">
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-extrabold text-orange-700 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 px-2 py-0.5 rounded-md border border-orange-200 dark:border-orange-800/60">
                          {ch.id}
                        </span>
                        {ch.leadStartup && (
                          <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                            Lead: <strong className="text-zinc-900 dark:text-zinc-100 font-bold">{ch.leadStartup}</strong>
                          </span>
                        )}
                      </div>
                      <p className="font-extrabold text-zinc-950 dark:text-zinc-100 text-xs max-w-sm truncate" title={ch.title}>
                        {ch.title}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge variant="default" size="sm" className="dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300">
                      {ch.sector}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-extrabold text-zinc-500 dark:text-zinc-400 block">Step {ch.stepNumber}</span>
                      <StatusBadge status={ch.status} label={ch.stepName} />
                    </div>
                  </TableCell>

                  <TableCell className="font-mono font-black text-zinc-950 dark:text-zinc-100 text-xs">
                    {formatCurrency(ch.grantBudget)}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <span className="font-black text-zinc-950 dark:text-zinc-100 text-xs">{ch.applicationsCount}</span>
                      <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-medium">received</span>
                    </div>
                  </TableCell>

                  <TableCell className="text-xs text-zinc-600 dark:text-zinc-400 font-bold">
                    {formatDate(ch.deadline)}
                  </TableCell>

                  <TableCell className="text-right">
                    <Link to="/government/challenges">
                      <Button variant="secondary" size="sm" className="h-8 px-2.5 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200">
                        <Eye className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" />
                        <span className="ml-1 text-xs font-bold">View</span>
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="py-3 px-6 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
        <span>Showing {filteredChallenges.length} of {ACTIVE_CHALLENGES.length} challenges</span>
        <Link to="/government/challenges" className="text-orange-600 dark:text-orange-400 font-black hover:underline flex items-center gap-1">
          <span>Manage all challenges</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </CardFooter>
    </Card>
  );
}
