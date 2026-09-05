import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bell,
  CheckCircle2,
  AlertCircle,
  Clock,
  Rocket,
  FileText,
  ChevronRight,
  CheckCheck
} from 'lucide-react';
import { useStartupPortal } from '../../context/StartupPortalContext';

export function StartupNotificationsPage() {
  const {
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead
  } = useStartupPortal();

  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'clarification') return notif.type === 'Clarification';
    if (filter === 'pilot') return notif.type === 'Pilot Update' || notif.type === 'Pilot Sanction';
    return true;
  });

  const handleNotificationClick = (notif) => {
    markNotificationAsRead(notif.id);
    if (notif.route) {
      navigate(notif.route);
    }
  };

  const getNotifIcon = (type) => {
    switch (type) {
      case 'Clarification':
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case 'Pilot Update':
      case 'Pilot Sanction':
        return <Rocket className="w-5 h-5 text-emerald-500" />;
      case 'Evaluation':
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <FileText className="w-5 h-5 text-orange-500" />;
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header Banner */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 px-2.5 py-0.5 rounded border border-orange-200 dark:border-orange-800/60">
              Activity Stream
            </span>
            <span className="text-xs text-zinc-500 font-medium">
              {unreadNotificationsCount} Unread Notifications
            </span>
          </div>
          <h1 className="text-2xl font-black text-zinc-950 dark:text-white tracking-tight">
            Notifications & Department Alerts
          </h1>
          <p className="text-xs text-zinc-500 max-w-xl">
            Real-time updates regarding your proposal evaluations, verification clarifications, and pilot testbed milestones.
          </p>
        </div>

        {unreadNotificationsCount > 0 && (
          <button
            onClick={markAllNotificationsAsRead}
            className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-700 dark:text-zinc-300 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <CheckCheck className="w-4 h-4 text-zinc-500" /> Mark All as Read
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2 overflow-x-auto">
        {[
          { id: 'all', label: 'All Notifications' },
          { id: 'unread', label: `Unread (${unreadNotificationsCount})` },
          { id: 'clarification', label: 'Clarifications & Actions' },
          { id: 'pilot', label: 'Pilot Sandbox Alerts' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
              filter === tab.id
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-12 text-center">
            <Bell className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-zinc-950 dark:text-white">No Notifications</h3>
            <p className="text-xs text-zinc-500 mt-1">You are all caught up!</p>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleNotificationClick(notif)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                !notif.read
                  ? 'bg-orange-50/40 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800/60 shadow-xs'
                  : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl shrink-0 mt-0.5">
                  {getNotifIcon(notif.type)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                      {notif.type}
                    </span>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
                    )}
                  </div>

                  <h2 className="text-sm font-bold text-zinc-950 dark:text-white">
                    {notif.title}
                  </h2>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {notif.message}
                  </p>

                  <span className="text-[11px] text-zinc-400 block pt-1 font-medium">
                    {notif.timestamp}
                  </span>
                </div>
              </div>

              <div className="shrink-0 flex items-center text-orange-600 hover:text-orange-700 text-xs font-semibold">
                <span>View</span>
                <ChevronRight className="w-4 h-4 ml-0.5" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
