
"use client";

import React, { useState } from "react";
import {
  Bell,
  UserPlus,
  Building,
  Flag,
  ShieldAlert,
  CheckCircle,
  Trash,
  Filter,
} from "lucide-react";


const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-101",
    type: "Suspicious Activity Detected",
    title: "Multiple Failed Login Attempts",
    message:
      "IP address 192.168.1.45 exceeded login rate limits for account admin@company.com.",
    timestamp: "10 mins ago",
    isRead: false,
    severity: "high",
  },
  {
    id: "notif-102",
    type: "New Report Submitted",
    title: "Flagged Job Listing #REP-901",
    message:
      "Alex Rivera reported 'Data Entry Specialist' posted by Global Apex Solutions as a Fake Job.",
    timestamp: "45 mins ago",
    isRead: false,
    severity: "high",
  },
  {
    id: "notif-103",
    type: "New Company Requests Verification",
    title: "Verification Request Pending",
    message:
      "Starlight Design Studio submitted official business registration documents for review.",
    timestamp: "2 hours ago",
    isRead: false,
    severity: "medium",
  },
  {
    id: "notif-104",
    type: "New Recruiter Registers",
    title: "New Recruiter Onboarded",
    message:
      "Sarah Jenkins (Recruiter ID: REC-402) completed account setup for Acme Technologies.",
    timestamp: "5 hours ago",
    isRead: true,
    severity: "normal",
  },
  {
    id: "notif-105",
    type: "Suspicious Activity Detected",
    title: "Mass Job Posting Triggered",
    message:
      "User account 'fast-hire-bot' created 25 job postings within 3 minutes.",
    timestamp: "1 day ago",
    isRead: true,
    severity: "high",
  },
];

export default function Notifications() {
  const [notificationsList, setNotificationsList] = useState(
    INITIAL_NOTIFICATIONS
  );
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
        return <UserPlus className="w-5 h-5 text-purple-400" />;
      case "New Company Requests Verification":
        return <Building className="w-5 h-5 text-indigo-400" />;
      case "New Report Submitted":
        return <Flag className="w-5 h-5 text-amber-400" />;
      case "Suspicious Activity Detected":
        return <ShieldAlert className="w-5 h-5 text-rose-400" />;
      default:
        return <Bell className="w-5 h-5 text-gray-400" />;
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
            Real-time system events, recruiter signups, verification requests,
            and security flags.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="px-3.5 py-2 bg-[#14141f] hover:bg-purple-500/10 border border-gray-800 hover:border-purple-500/30 text-purple-300 text-xs font-semibold rounded-xl cursor-pointer transition-all flex items-center gap-1.5"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              Mark All Read
            </button>
          )}

          {notificationsList.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-3.5 py-2 bg-[#14141f] hover:bg-rose-500/10 border border-gray-800 hover:border-rose-500/30 text-rose-400 text-xs font-semibold rounded-xl cursor-pointer transition-all flex items-center gap-1.5"
            >
              <Trash className="w-3.5 h-3.5" />
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="p-4 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold rounded-xl flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-purple-400 shrink-0" />
          {toastMessage}
        </div>
      )}

      {/* Search & Filter Controls */}
      <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-purple-400 shrink-0" />
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2 bg-[#0a0a0f] border border-gray-800 text-gray-300 rounded-xl text-xs outline-none focus:border-purple-500 cursor-pointer font-medium"
          >
            <option value="ALL">All System Event Types</option>
            <option value="New Recruiter Registers">
              New Recruiter Registers
            </option>
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
            <Bell className="w-10 h-10 mx-auto text-gray-600 mb-2" />
            <p className="text-sm font-semibold text-white">
              No notifications to display.
            </p>
            <p className="text-xs text-gray-400">
              All caught up or try resetting your filter choices.
            </p>
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
                    <CheckCircle className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => handleDeleteNotification(notif.id)}
                  title="Delete Notification"
                  className="p-2 bg-[#0a0a0f] hover:bg-rose-500/10 border border-gray-800 hover:border-rose-500/30 text-gray-500 hover:text-rose-400 rounded-xl transition-all cursor-pointer text-xs"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}






