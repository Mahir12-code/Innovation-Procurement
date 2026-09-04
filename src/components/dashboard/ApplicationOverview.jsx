import React from 'react';
import { ApplicationPieChart } from './ApplicationPieChart';
import { ApplicationTable } from './ApplicationTable';

export function ApplicationOverview() {
  return (
    <section aria-label="Startup Application Overview" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ApplicationPieChart />
      <ApplicationTable />
    </section>
  );
}
