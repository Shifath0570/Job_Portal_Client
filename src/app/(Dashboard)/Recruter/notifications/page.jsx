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

const UserXIcon = (props) => (
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
    <line x1="17" x2="22" y1="8" y2="13" />
    <line x1="22" x2="17" y1="8" y2="13" />
  </svg>
);

const AlertTriangleIcon = (props) => (
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
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" x2="12" y1="9" y2="13" />
    <line x1="12" x2="12.01" y1="17" y2="17" />
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

const CheckCheckIcon = (props) => (
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
    <path d="M18 6 7 17l-5-5" />
    <path d="m22 10-7.5 7.5L13 16" />
  </svg>
);

// ==========================================
// Initial Mock Notifications
// ==========================================

const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    type: "NEW_APPLICATION",
    title: "New Candidate Application",
    message: "Eleanor Pena applied for Senior Frontend Engineer position.",
    timestamp: "10 minutes ago",
    read: false,
    actionUrl: "/recruiter/applicants",
  },
  {
    id: "notif-2",
    type: "INTERVIEW_ACCEPTED",
    title: "Interview Accepted",
    message: "Jerome Bell accepted your interview invitation for UI/UX Designer role.",
    timestamp: "1 hour ago",
    read: false,
    actionUrl: "/recruiter/applicants",
  },
  {
    id: "notif-3",
    type: "JOB_EXPIRING",
    title: "Job Listing Expiring Soon",
    message: "The job post 'Backend Node.js Architect' will expire in 2 days.",
    timestamp: "3 hours ago",
    read: true,
    actionUrl: "/recruiter/jobs",
  },
  {
    id: "notif-4",
    type: "APPLICATION_WITHDRAWN",
    title: "Application Withdrawn",
    message: "Devon Lane has withdrawn their application for Full Stack Developer.",
    timestamp: "1 day ago",
    read: true,
    actionUrl: "/recruiter/applicants",
  },
  {
    id: "notif-5",
    type: "NEW_APPLICATION",
    title: "New Candidate Application",
    message: "Sophia Martinez applied for UI/UX Product Designer position.",
    timestamp: "2 days ago",
    read: true,
    actionUrl: "/recruiter/applicants",
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState("ALL");

  // Mark a single notification as read
  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Mark all notifications as read
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Delete single notification
  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Clear all notifications
  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all notifications?")) {
      setNotifications([]);
    }
  };

  // Tab Filter Logic
  const filteredNotifications = notifications.filter((item) => {
    if (activeTab === "UNREAD") return !item.read;
    if (activeTab === "APPLICATIONS") return item.type === "NEW_APPLICATION";
    if (activeTab === "INTERVIEWS") return item.type === "INTERVIEW_ACCEPTED";
    if (activeTab === "EXPIRATIONS") return item.type === "JOB_EXPIRING";
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Helper renderer for type-based visual elements
  const renderNotificationConfig = (type) => {
    switch (type) {
      case "NEW_APPLICATION":
        return {
          icon: UserPlusIcon,
          color: "text-blue-400",
          bgColor: "bg-blue-500/10",
          borderColor: "border-blue-500/20",
          label: "New Applicant",
        };
      case "INTERVIEW_ACCEPTED":
        return {
          icon: CheckCircleIcon,
          color: "text-emerald-400",
          bgColor: "bg-emerald-500/10",
          borderColor: "border-emerald-500/20",
          label: "Interview",
        };
      case "APPLICATION_WITHDRAWN":
        return {
          icon: UserXIcon,
          color: "text-rose-400",
          bgColor: "bg-rose-500/10",
          borderColor: "border-rose-500/20",
          label: "Withdrawn",
        };
      case "JOB_EXPIRING":
        return {
          icon: AlertTriangleIcon,
          color: "text-amber-400",
          bgColor: "bg-amber-500/10",
          borderColor: "border-amber-500/20",
          label: "Job Alert",
        };
      default:
        return {
          icon: BellIcon,
          color: "text-purple-400",
          bgColor: "bg-purple-500/10",
          borderColor: "border-purple-500/20",
          label: "General",
        };
    }
  };

  return (
    <div className="min-h-screen flex-1 bg-[#0a0a0f] text-white p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800/80">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">
                {unreadCount} new
              </span>
            )}
          </div>
          <p className="text-gray-400 text-sm pt-1">
            Stay updated on candidate submissions, interview confirmations, and job posting updates.
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#14141f] hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white text-xs font-medium rounded-xl transition-all cursor-pointer"
            >
              <CheckCheckIcon className="w-4 h-4 text-purple-400" />
              Mark All Read
            </button>
          )}

          {notifications.length > 0 && (
            <button
              onClick={handleClearAll}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#14141f] hover:bg-rose-500/10 border border-gray-800 hover:border-rose-500/30 text-gray-300 hover:text-rose-400 text-xs font-medium rounded-xl transition-all cursor-pointer"
            >
              <TrashIcon className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-800/80 pb-4">
        {[
          { id: "ALL", label: "All Updates" },
          { id: "UNREAD", label: "Unread" },
          { id: "APPLICATIONS", label: "Applications" },
          { id: "INTERVIEWS", label: "Interviews" },
          { id: "EXPIRATIONS", label: "Job Expirations" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-purple-600/20 text-purple-400 border border-purple-500/30"
                : "bg-[#14141f] text-gray-400 border border-gray-800 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List Feed */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="p-12 text-center bg-[#14141f] border border-gray-800 rounded-2xl text-gray-500 space-y-2">
            <BellIcon className="w-8 h-8 mx-auto text-gray-600 mb-2" />
            <p className="text-sm">No notifications found in this category.</p>
          </div>
        ) : (
          filteredNotifications.map((notif) => {
            const config = renderNotificationConfig(notif.type);
            const IconComponent = config.icon;

            return (
              <div
                key={notif.id}
                onClick={() => handleMarkAsRead(notif.id)}
                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-2xl border transition-all gap-4 cursor-pointer shadow-lg ${
                  notif.read
                    ? "bg-[#14141f]/60 border-gray-800/80 hover:border-gray-700"
                    : "bg-[#14141f] border-purple-500/30 hover:border-purple-500/50"
                }`}
              >
                {/* Left Side Icon & Information */}
                <div className="flex items-start gap-4">
                  <div
                    className={`w-11 h-11 rounded-xl ${config.bgColor} border ${config.borderColor} flex items-center justify-center ${config.color} shrink-0 mt-0.5 sm:mt-0`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-bold text-white">
                        {notif.title}
                      </h2>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                      )}
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${config.bgColor} ${config.color} ${config.borderColor}`}
                      >
                        {config.label}
                      </span>
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed">
                      {notif.message}
                    </p>

                    <p className="text-[11px] text-gray-500 pt-0.5">
                      {notif.timestamp}
                    </p>
                  </div>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(notif.id);
                    }}
                    title="Remove notification"
                    className="p-2 bg-[#0a0a0f] border border-gray-800 hover:border-rose-500/40 text-gray-400 hover:text-rose-400 rounded-xl transition-all cursor-pointer"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}