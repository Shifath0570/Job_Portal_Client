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

const EyeIcon = (props) => (
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
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const StarIcon = (props) => (
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
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const CalendarIcon = (props) => (
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
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

const AwardIcon = (props) => (
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
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

const XCircleIcon = (props) => (
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
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
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
// Mock Notifications Data
// ==========================================

const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-101",
    type: "JOB_OFFER",
    title: "Job Offer Received!",
    company: "Acme Technologies",
    jobTitle: "Senior React Developer",
    message: "Congratulations! Acme Technologies has extended an official offer for the Senior React Developer role.",
    timestamp: "10 minutes ago",
    isRead: false,
  },
  {
    id: "notif-102",
    type: "INTERVIEW_SCHEDULED",
    title: "Interview Scheduled",
    company: "Starlight Design Studio",
    jobTitle: "UI/UX Product Designer",
    message: "Your Technical Interview has been scheduled for Aug 12, 2026 at 02:00 PM EST via Google Meet.",
    timestamp: "2 hours ago",
    isRead: false,
  },
  {
    id: "notif-103",
    type: "SHORTLISTED",
    title: "Candidate Shortlisted",
    company: "Nexus Systems",
    jobTitle: "Frontend Architect",
    message: "You have been shortlisted for the Frontend Architect position! The team will reach out shortly for next steps.",
    timestamp: "1 day ago",
    isRead: true,
  },
  {
    id: "notif-104",
    type: "APPLICATION_REVIEWED",
    title: "Application Reviewed",
    company: "CyberPulse Labs",
    jobTitle: "Full Stack JavaScript Developer",
    message: "A recruiter from CyberPulse Labs viewed your application and resume portfolio.",
    timestamp: "2 days ago",
    isRead: true,
  },
  {
    id: "notif-105",
    type: "APPLICATION_SUBMITTED",
    title: "Application Submitted Successfully",
    company: "CloudVibe Tech",
    jobTitle: "Junior Software Engineer",
    message: "Your application for Junior Software Engineer was successfully delivered to CloudVibe Tech.",
    timestamp: "3 days ago",
    isRead: true,
  },
  {
    id: "notif-106",
    type: "APPLICATION_REJECTED",
    title: "Application Status Update",
    company: "Apex Innovations",
    jobTitle: "DevOps & Cloud Engineer",
    message: "Thank you for applying to Apex Innovations. Unfortunately, this position has been filled by another candidate.",
    timestamp: "1 week ago",
    isRead: true,
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [toastMessage, setToastMessage] = useState("");

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Toggle single notification read state
  const toggleReadStatus = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setToastMessage("All notifications marked as read.");
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setToastMessage("Notification removed.");
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Render Icon & Badge Colors per Event Type
  const renderTypeIcon = (type) => {
    switch (type) {
      case "JOB_OFFER":
        return (
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl shrink-0">
            <AwardIcon className="w-5 h-5" />
          </div>
        );
      case "INTERVIEW_SCHEDULED":
        return (
          <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 rounded-xl shrink-0">
            <CalendarIcon className="w-5 h-5" />
          </div>
        );
      case "SHORTLISTED":
        return (
          <div className="p-2.5 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-xl shrink-0">
            <StarIcon className="w-5 h-5" />
          </div>
        );
      case "APPLICATION_REVIEWED":
        return (
          <div className="p-2.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-xl shrink-0">
            <EyeIcon className="w-5 h-5" />
          </div>
        );
      case "APPLICATION_SUBMITTED":
        return (
          <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-xl shrink-0">
            <CheckCircleIcon className="w-5 h-5" />
          </div>
        );
      case "APPLICATION_REJECTED":
        return (
          <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl shrink-0">
            <XCircleIcon className="w-5 h-5" />
          </div>
        );
      default:
        return (
          <div className="p-2.5 bg-gray-500/10 border border-gray-500/30 text-gray-400 rounded-xl shrink-0">
            <BellIcon className="w-5 h-5" />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex-1 bg-[#0a0a0f] text-white p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800/80">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold rounded-full">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-gray-400 text-sm pt-1">
            Real-time updates regarding your applications, interview requests, and job offers.
          </p>
        </div>

        {/* Header Action Controls */}
        {notifications.length > 0 && (
          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="px-4 py-2 bg-[#14141f] hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white text-xs font-semibold rounded-xl transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-2"
          >
            <CheckCheckIcon className="w-4 h-4 text-purple-400" />
            Mark All as Read
          </button>
        )}
      </div>

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="p-4 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold rounded-xl flex items-center gap-2">
          <CheckCircleIcon className="w-4 h-4 text-purple-400 shrink-0" />
          {toastMessage}
        </div>
      )}

      {/* Notification List */}
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="p-12 text-center bg-[#14141f] border border-gray-800 rounded-2xl text-gray-500 space-y-2 shadow-xl">
            <BellIcon className="w-10 h-10 mx-auto text-gray-600 mb-2" />
            <h3 className="text-base font-bold text-white">No notifications yet</h3>
            <p className="text-xs text-gray-400">
              When your application status changes or recruiters reach out, updates will appear here.
            </p>
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              className={`border rounded-2xl p-5 space-y-3 transition-all shadow-xl flex items-start gap-4 ${
                !item.isRead
                  ? "bg-[#14141f] border-purple-500/40 relative overflow-hidden"
                  : "bg-[#14141f]/60 border-gray-800/80"
              }`}
            >
              {/* Unread Left Border Accent */}
              {!item.isRead && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500" />
              )}

              {/* Status Specific Icon */}
              {renderTypeIcon(item.type)}

              {/* Content Body */}
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    {item.title}
                    {!item.isRead && (
                      <span className="w-2 h-2 rounded-full bg-purple-400 inline-block" />
                    )}
                  </h2>
                  <span className="text-[11px] text-gray-500 font-medium">
                    {item.timestamp}
                  </span>
                </div>

                <p className="text-xs text-purple-400 font-medium">
                  {item.company} • <span className="text-gray-300">{item.jobTitle}</span>
                </p>

                <p className="text-xs text-gray-300 leading-relaxed pt-1">
                  {item.message}
                </p>
              </div>

              {/* Actions: Mark Read / Delete */}
              <div className="flex items-center gap-1.5 shrink-0 pl-2">
                <button
                  onClick={() => toggleReadStatus(item.id)}
                  title={item.isRead ? "Mark as Unread" : "Mark as Read"}
                  className="p-2 bg-[#0a0a0f] hover:bg-gray-800 border border-gray-800 text-gray-400 hover:text-white rounded-xl transition-all cursor-pointer"
                >
                  <CheckCircleIcon className={`w-4 h-4 ${item.isRead ? "text-emerald-400" : "text-gray-400"}`} />
                </button>

                <button
                  onClick={() => deleteNotification(item.id)}
                  title="Delete Notification"
                  className="p-2 bg-[#0a0a0f] hover:bg-rose-500/10 border border-gray-800 hover:border-rose-500/30 text-gray-400 hover:text-rose-400 rounded-xl transition-all cursor-pointer"
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