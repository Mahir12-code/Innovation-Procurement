import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { PageHeader } from '../../components/ui/PageHeader';
import { Construction, ArrowLeft, ArrowRight, Layers } from 'lucide-react';

export function PlaceholderPage({ title, role = 'Module', description }) {
  const location = useLocation();

  const readableTitle = title || location.pathname
    .split('/')
    .filter(Boolean)
    .map(segment => segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()))
    .join(' — ') || 'Module Overview';

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <PageHeader
        title={readableTitle}
        description={description || `Module endpoint: ${location.pathname}`}
        badge={<Badge variant="primary">{role}</Badge>}
        breadcrumbs={[
          { label: 'Sarkar Setu', href: '/' },
          { label: role, href: '#' },
          { label: readableTitle }
        ]}
      />

      <Card className="border-dashed border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900">
        <CardContent className="py-14 px-6 flex flex-col items-center text-center max-w-xl mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 flex items-center justify-center text-orange-600 dark:text-orange-400 shadow-sm">
            <Construction className="w-7 h-7" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-lg font-black text-zinc-950 dark:text-white tracking-tight">
              {readableTitle}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono bg-zinc-100 dark:bg-zinc-800 py-1 px-3 rounded-md inline-block font-bold">
              Route: {location.pathname}
            </p>
          </div>

          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium">
            This module route is registered and ready in the <strong>Sarkar Setu</strong> Phase 1 architecture. Full interactive forms and real-time state will be activated in subsequent modules.
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <Link to="/government/dashboard">
              <Button variant="primary" size="md" leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
                Go to Government Dashboard
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button variant="secondary" size="md" rightIcon={<ArrowRight className="w-3.5 h-3.5" />} className="dark:bg-zinc-800 dark:border-zinc-700 dark:text-white">
                View 10-Step Guide
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
