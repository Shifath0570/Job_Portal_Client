"use client";

import React, { useState } from "react";

// ==========================================
// Inline Custom SVG Icons
// ==========================================

const BellIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

const UserPlusIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="19" x2="19" y1="8" y2="14" />
    <line x1="16" x2="22" y1="11" y2="11" />
  </svg>
);

const BuildingCheckIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
    <path d="m10 11 2 2 4-4" />
  </svg>
);

const FlagIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" x2="4" y1="22" y2="15" />
  </svg>
);

const ShieldAlertIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </svg>
);

const CheckCircleIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const TrashIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);

const FilterIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

// ==========================================
// Mock Notifications Data
// ==========================================

const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-101",
    type: "Suspicious Activity Detected",
    title: "Multiple Failed Login Attempts",
    message: "IP address 192.168.1.45 exceeded login rate limits for account admin@company.com.",
    timestamp: "10 mins ago",
    isRead: false,
    severity: "high", // high | medium | normal
  },
  {
    id: "notif-102",
    type: "New Report Submitted",
    title: "Flagged Job Listing #REP-901",
    message: "Alex Rivera reported 'Data Entry Specialist' posted by Global Apex Solutions as a Fake Job.",
    timestamp: "45 mins ago",
    isRead: false,
    severity: "high",
  },
  {
    id: "notif-103",
    type: "New Company Requests Verification",
    title: "Verification Request Pending",
    message: "Starlight Design Studio submitted official business registration documents for review.",
    timestamp: "2 hours ago",
    isRead: false,
    severity: "medium",
  },
  {
    id: "notif-104",
    type: "New Recruiter Registers",
    title: "New Recruiter Onboarded",
    message: "Sarah Jenkins (Recruiter ID: REC-402) completed account setup for Acme Technologies.",
    timestamp: "5 hours ago",
    isRead: true,
    severity: "normal",
  },
  {
    id: "notif-105",
    type: "Suspicious Activity Detected",
    title: "Mass Job Posting Triggered",
    message: "User account 'fast-hire-bot' created 25 job postings within 3 minutes.",
    timestamp: "1 day ago",
    isRead: true,
    severity: "high",
  },
];

export default function Notifications() {
  const [notificationsList, setNotificationsList] = useState(INITIAL_NOTIFICATIONS);
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Mark single notification as read
  const handleMarkAsRead = (id) => {
    setNotificationsList((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  // Mark all notifications as read
  const handleMarkAllAsRead = () => {
    setNotificationsList((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast("All notifications marked as read.");
  };

  // Delete single notification
  const handleDeleteNotification = (id) => {
    setNotificationsList((prev) => prev.filter((n) => n.id !== id));
  };

  // Clear all notifications
  const handleClearAll = () => {
    setNotificationsList([]);
    showToast("All notifications cleared.");
  };

  // Get Notification Icon by Type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "New Recruiter Registers":
        return <UserPlusIcon className="w-5 h-5 text-purple-400" />;
      case "New Company Requests Verification":
        return <BuildingCheckIcon className="w-5 h-5 text-indigo-400" />;
      case "New Report Submitted":
        return <FlagIcon className="w-5 h-5 text-amber-400" />;
      case "Suspicious Activity Detected":
        return <ShieldAlertIcon className="w-5 h-5 text-rose-400" />;
      default:
        return <BellIcon className="w-5 h-5 text-gray-400" />;
    }
  };

  // Get Badge Style by Type
  const getBadgeStyle = (type) => {
    switch (type) {
      case "New Recruiter Registers":
        return "bg-purple-500/10 text-purple-300 border-purple-500/20";
      case "New Company Requests Verification":
        return "bg-indigo-500/10 text-indigo-300 border-indigo-500/20";
      case "New Report Submitted":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Suspicious Activity Detected":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  // Filter Logic
  const unreadCount = notificationsList.filter((n) => !n.isRead).length;

  const filteredNotifications = notificationsList.filter((n) => {
    const matchesType =
      selectedFilter === "ALL" || n.type === selectedFilter;
    const matchesUnread = !showOnlyUnread || !n.isRead;

    return matchesType && matchesUnread;
  });

  return (
    <div className="min-h-screen flex-1 bg-[#0a0a0f] text-white p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Notifications Center
          </h1>
          <p className="text-gray-400 text-sm pt-1">
            Real-time system events, recruiter signups, verification requests, and security flags.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="px-3.5 py-2 bg-[#14141f] hover:bg-purple-500/10 border border-gray-800 hover:border-purple-500/30 text-purple-300 text-xs font-semibold rounded-xl cursor-pointer transition-all flex items-center gap-1.5"
            >
              <CheckCircleIcon className="w-3.5 h-3.5" />
              Mark All Read
            </button>
          )}

          {notificationsList.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-3.5 py-2 bg-[#14141f] hover:bg-rose-500/10 border border-gray-800 hover:border-rose-500/30 text-rose-400 text-xs font-semibold rounded-xl cursor-pointer transition-all flex items-center gap-1.5"
            >
              <TrashIcon className="w-3.5 h-3.5" />
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="p-4 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold rounded-xl flex items-center gap-2">
          <CheckCircleIcon className="w-4 h-4 text-purple-400 shrink-0" />
          {toastMessage}
        </div>
      )}

      {/* Search & Filter Controls */}
      <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <FilterIcon className="w-4 h-4 text-purple-400 shrink-0" />
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2 bg-[#0a0a0f] border border-gray-800 text-gray-300 rounded-xl text-xs outline-none focus:border-purple-500 cursor-pointer font-medium"
          >
            <option value="ALL">All System Event Types</option>
            <option value="New Recruiter Registers">New Recruiter Registers</option>
            <option value="New Company Requests Verification">
              New Company Requests Verification
            </option>
            <option value="New Report Submitted">New Report Submitted</option>
            <option value="Suspicious Activity Detected">
              Suspicious Activity Detected
            </option>
          </select>
        </div>

        {/* Unread Toggle */}
        <label className="flex items-center gap-2 text-xs font-medium text-gray-300 cursor-pointer self-start sm:self-auto">
          <input
            type="checkbox"
            checked={showOnlyUnread}
            onChange={(e) => setShowOnlyUnread(e.target.checked)}
            className="w-4 h-4 rounded border-gray-800 text-purple-600 focus:ring-purple-500 bg-[#0a0a0f]"
          />
          Show Unread Only ({unreadCount})
        </label>
      </div>

      {/* Notifications Stream List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="p-12 text-center bg-[#14141f] border border-gray-800 rounded-2xl space-y-2">
            <BellIcon className="w-10 h-10 mx-auto text-gray-600 mb-2" />
            <p className="text-sm font-semibold text-white">No notifications to display.</p>
            <p className="text-xs text-gray-400">All caught up or try resetting your filter choices.</p>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 relative group ${
                notif.isRead
                  ? "bg-[#14141f]/70 border-gray-800/80 opacity-80"
                  : "bg-[#14141f] border-purple-500/30 shadow-lg shadow-purple-500/5"
              }`}
            >
              {/* Unread Glowing Dot */}
              {!notif.isRead && (
                <span className="w-2.5 h-2.5 bg-purple-500 rounded-full absolute top-5 left-3 animate-pulse" />
              )}

              <div className="flex items-start gap-4 pl-3">
                {/* Icon Container */}
                <div className="p-3 bg-[#0a0a0f] border border-gray-800 rounded-xl shrink-0 mt-0.5">
                  {getNotificationIcon(notif.type)}
                </div>

                {/* Content */}
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getBadgeStyle(
                        notif.type
                      )}`}
                    >
                      {notif.type}
                    </span>
                    <span className="text-gray-500 text-[11px] font-mono">
                      • {notif.timestamp}
                    </span>
                  </div>

                  <h2 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                    {notif.title}
                  </h2>

                  <p className="text-xs text-gray-400 leading-relaxed max-w-3xl">
                    {notif.message}
                  </p>
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-2 shrink-0">
                {!notif.isRead && (
                  <button
                    onClick={() => handleMarkAsRead(notif.id)}
                    title="Mark as Read"
                    className="p-2 bg-[#0a0a0f] hover:bg-purple-500/10 border border-gray-800 hover:border-purple-500/30 text-gray-400 hover:text-purple-400 rounded-xl transition-all cursor-pointer text-xs"
                  >
                    <CheckCircleIcon className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => handleDeleteNotification(notif.id)}
                  title="Delete Notification"
                  className="p-2 bg-[#0a0a0f] hover:bg-rose-500/10 border border-gray-800 hover:border-rose-500/30 text-gray-500 hover:text-rose-400 rounded-xl transition-all cursor-pointer text-xs"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}