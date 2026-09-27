"use client";

import React, { useState } from "react";

// ==========================================
// Inline Custom SVG Icons
// ==========================================

const BriefcaseIcon = (props) => (
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
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const BookmarkIcon = (props) => (
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
    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
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

const RefreshIcon = (props) => (
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
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M16 16h5v5" />
  </svg>
);

const ExternalLinkIcon = (props) => (
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
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" x2="21" y1="14" y2="3" />
  </svg>
);

// ==========================================
// Initial Mock Baseline Data
// ==========================================

const INITIAL_OVERVIEW_STATS = {
  totalApplications: 18,
  savedJobs: 12,
  interviews: 4,
  acceptedApplications: 3,
  rejectedApplications: 2,
};

const INITIAL_RECENT_APPLICATIONS = [
  {
    id: "app-201",
    company: "Acme Technologies",
    jobTitle: "Senior React Developer",
    location: "Remote",
    appliedDate: "Aug 06, 2026",
    status: "Accepted",
    statusNote: "Offer Letter Issued",
  },
  {
    id: "app-202",
    company: "Starlight Labs",
    jobTitle: "Frontend Engineer",
    location: "San Francisco, CA",
    appliedDate: "Aug 02, 2026",
    status: "Interview Scheduled",
    statusNote: "Google Meet • Aug 10 at 2:00 PM",
  },
  {
    id: "app-203",
    company: "Nexus Software",
    jobTitle: "Full Stack Engineer",
    location: "New York, NY",
    appliedDate: "Jul 28, 2026",
    status: "Accepted",
    statusNote: "Application Shortlisted",
  },
  {
    id: "app-204",
    company: "Apex Cloud Innovations",
    jobTitle: "UI Engineer",
    location: "Remote",
    appliedDate: "Jul 20, 2026",
    status: "Rejected",
    statusNote: "Position Filled",
  },
  {
    id: "app-205",
    company: "CyberPulse Systems",
    jobTitle: "JavaScript Tech Lead",
    location: "Austin, TX",
    appliedDate: "Jul 15, 2026",
    status: "Rejected",
    statusNote: "Candidate Not Shortlisted",
  },
];

export default function SeekerOverview() {
  const [stats, setStats] = useState(INITIAL_OVERVIEW_STATS);
  const [recentApps] = useState(INITIAL_RECENT_APPLICATIONS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState("ALL");

  // Fetch / Sync candidate dashboard data without useEffect
  const handleRefreshData = async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch("/api/candidate/overview");
      if (!response.ok) throw new Error("Failed to fetch overview");
      const data = await response.json();
      if (data.stats) setStats(data.stats);
    } catch (error) {
      console.warn("Server sync unavailable. Showing local overview:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const overviewCards = [
    {
      title: "Total Applications",
      count: stats.totalApplications,
      subtitle: "Active job submissions",
      icon: BriefcaseIcon,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
    {
      title: "Saved Jobs",
      count: stats.savedJobs,
      subtitle: "Bookmarked opportunities",
      icon: BookmarkIcon,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      title: "Interviews",
      count: stats.interviews,
      subtitle: "Scheduled discussions",
      icon: CalendarIcon,
      color: "text-indigo-400",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/20",
    },
    {
      title: "Accepted Applications",
      count: stats.acceptedApplications,
      subtitle: "Shortlisted or Offer Stage",
      icon: CheckCircleIcon,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
    {
      title: "Rejected Applications",
      count: stats.rejectedApplications,
      subtitle: "Closed submissions",
      icon: XCircleIcon,
      color: "text-rose-400",
      bgColor: "bg-rose-500/10",
      borderColor: "border-rose-500/20",
    },
  ];

  // Helper status badge styles
  const getStatusBadge = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Interview Scheduled":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
      case "Rejected":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  const filteredApps = recentApps.filter((app) => {
    if (activeFilter === "ACCEPTED") return app.status === "Accepted";
    if (activeFilter === "INTERVIEW") return app.status === "Interview Scheduled";
    if (activeFilter === "REJECTED") return app.status === "Rejected";
    return true;
  });

  return (
    <div className="min-h-screen flex-1 bg-[#0a0a0f] text-white p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Candidate Dashboard
          </h1>
          <p className="text-gray-400 text-sm pt-1">
            Welcome back! Here is an overview of your job search progress and application statuses.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefreshData}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#14141f] hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white text-xs font-medium rounded-xl transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshIcon className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Syncing..." : "Sync Overview"}
          </button>
        </div>
      </div>

      {/* Main 5 Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {overviewCards.map((card, idx) => {
          const IconComponent = card.icon;
          return (
            <div
              key={idx}
              className="bg-[#14141f] border border-gray-800 hover:border-purple-500/40 rounded-2xl p-5 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  {card.title}
                </span>
                <div
                  className={`w-9 h-9 rounded-xl ${card.bgColor} border ${card.borderColor} flex items-center justify-center ${card.color} shrink-0`}
                >
                  <IconComponent className="w-4 h-4" />
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {card.count}
                </div>
                <p className="text-[11px] text-gray-500 pt-1 font-medium">
                  {card.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle Section: Progress & Conversion Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Application Funnel Breakdown */}
        <div className="lg:col-span-4 bg-[#14141f] border border-gray-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <h2 className="text-lg font-bold text-white pb-4 border-b border-gray-800">
            Application Success Ratio
          </h2>

          <div className="space-y-5 text-xs">
            <div>
              <div className="flex justify-between text-gray-400 mb-1.5 font-medium">
                <span>Accepted Rate</span>
                <span className="text-emerald-400 font-semibold">
                  {((stats.acceptedApplications / (stats.totalApplications || 1)) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full h-2 bg-[#0a0a0f] rounded-full overflow-hidden border border-gray-800">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{
                    width: `${(stats.acceptedApplications / (stats.totalApplications || 1)) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-gray-400 mb-1.5 font-medium">
                <span>Interview Conversion</span>
                <span className="text-indigo-400 font-semibold">
                  {((stats.interviews / (stats.totalApplications || 1)) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full h-2 bg-[#0a0a0f] rounded-full overflow-hidden border border-gray-800">
                <div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{
                    width: `${(stats.interviews / (stats.totalApplications || 1)) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-gray-400 mb-1.5 font-medium">
                <span>Rejection Rate</span>
                <span className="text-rose-400 font-semibold">
                  {((stats.rejectedApplications / (stats.totalApplications || 1)) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full h-2 bg-[#0a0a0f] rounded-full overflow-hidden border border-gray-800">
                <div
                  className="h-full bg-rose-500 rounded-full"
                  style={{
                    width: `${(stats.rejectedApplications / (stats.totalApplications || 1)) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Application History Table */}
        <div className="lg:col-span-8 bg-[#14141f] border border-gray-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-800">
            <h2 className="text-lg font-bold text-white">Recent Application Activity</h2>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-[#0a0a0f] p-1 border border-gray-800 rounded-xl">
              {[
                { id: "ALL", label: "All" },
                { id: "ACCEPTED", label: "Accepted" },
                { id: "INTERVIEW", label: "Interviews" },
                { id: "REJECTED", label: "Rejected" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                    activeFilter === tab.id
                      ? "bg-purple-600 text-white shadow-sm"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 uppercase font-semibold tracking-wider">
                  <th className="py-3 px-4">Company & Job Title</th>
                  <th className="py-3 px-4">Applied Date</th>
                  <th className="py-3 px-4">Status & Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/80">
                {filteredApps.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-gray-500">
                      No application records match this status.
                    </td>
                  </tr>
                ) : (
                  filteredApps.map((app) => (
                    <tr
                      key={app.id}
                      className="hover:bg-purple-500/[0.02] transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="font-bold text-white">{app.jobTitle}</div>
                        <div className="text-gray-400 text-[11px] pt-0.5">
                          {app.company} • {app.location}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-400 font-medium">
                        {app.appliedDate}
                      </td>
                      <td className="py-4 px-4 space-y-1">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusBadge(
                            app.status
                          )}`}
                        >
                          {app.status}
                        </span>
                        <p className="text-[11px] text-gray-500">{app.statusNote}</p>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}