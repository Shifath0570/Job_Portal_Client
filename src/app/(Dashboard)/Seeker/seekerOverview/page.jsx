
"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Bookmark,
  Calendar,
  CheckCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";


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
      icon: Briefcase,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
    {
      title: "Saved Jobs",
      count: stats.savedJobs,
      subtitle: "Bookmarked opportunities",
      icon: Bookmark,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      title: "Interviews",
      count: stats.interviews,
      subtitle: "Scheduled discussions",
      icon: Calendar,
      color: "text-indigo-400",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/20",
    },
    {
      title: "Accepted Applications",
      count: stats.acceptedApplications,
      subtitle: "Shortlisted or Offer Stage",
      icon: CheckCircle,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
    {
      title: "Rejected Applications",
      count: stats.rejectedApplications,
      subtitle: "Closed submissions",
      icon: XCircle,
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
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
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







