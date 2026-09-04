import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';

export function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Determine current portal role based on URL path
  let currentRole = 'government';
  if (location.pathname.startsWith('/startup')) currentRole = 'startup';
  else if (location.pathname.startsWith('/expert')) currentRole = 'expert';
  else if (location.pathname.startsWith('/admin')) currentRole = 'admin';

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        isSidebarOpen={isSidebarOpen}
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        portalRole={currentRole}
      />

      {/* Body Area with Sidebar and Dynamic Content */}
      <div className="flex-1 flex w-full">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          role={currentRole}
        />

        {/* Main Content Pane */}
        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
