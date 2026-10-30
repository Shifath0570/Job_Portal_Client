
"use client";

import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Bookmark,
  Calendar,
  CheckCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";
import { authClient } from "@/app/lib/auth-client";

export default function SeekerOverview() {
  const [stats, setStats] = useState({
    totalApplications: 0,
    savedJobs: 0,
    interviews: 0,
    acceptedApplications: 0,
    rejectedApplications: 0,
  });
  const [recentApps, setRecentApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState("ALL");

  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const user = session?.user;
  const userEmail = user?.email?.toLowerCase().trim() || "";

  // Fetch candidate applications & saved jobs count from backend APIs
  const fetchDashboardData = async () => {
    try {
      if (!userEmail) return;
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

      // Fetch applications and saved jobs concurrently
      const [appRes, savedRes] = await Promise.all([
        fetch(`${baseUrl}/api/applications/${encodeURIComponent(userEmail)}`),
        fetch(`${baseUrl}/api/savejob?email=${encodeURIComponent(userEmail)}`),
      ]);

      const appData = await appRes.json();
      const savedData = await savedRes.json();

      let total = 0;
      let accepted = 0;
      let interviews = 0;
      let rejected = 0;

      if (appData.success && Array.isArray(appData.applications)) {
        const apps = appData.applications;
        total = apps.length;
        accepted = apps.filter(
          (a) => (a.status || "").toLowerCase() === "accepted" || (a.status || "").toLowerCase() === "shortlisted"
        ).length;
        interviews = apps.filter(
          (a) => (a.status || "").toLowerCase() === "interview scheduled"
        ).length;
        rejected = apps.filter(
          (a) => (a.status || "").toLowerCase() === "rejected"
        ).length;

        const formattedApps = apps.map((item) => ({
          id: item._id || item.id,
          company: item.companyName || item.company || "Company Not Specified",
          jobTitle: item.jobTitle || item.jobPosition || "Role Not Specified",
          location: item.location || item.officeAddress || "Remote",
          appliedDate: item.appliedDate || item.createdAt ? new Date(item.appliedDate || item.createdAt).toLocaleDateString() : "Recent",
          status: item.status || "Applied",
          statusNote: item.statusNote || item.notes || "Application submitted successfully",
        }));

        setRecentApps(formattedApps);
      }

      // Calculate saved job count from response
      const savedJobsCount = savedData.success && Array.isArray(savedData.jobs) ? savedData.jobs.length : 0;

      setStats({
        totalApplications: total,
        savedJobs: savedJobsCount,
        interviews: interviews,
        acceptedApplications: accepted,
        rejectedApplications: rejected,
      });
    } catch (error) {
      console.error("Error fetching overview data:", error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (sessionLoading) return;
    fetchDashboardData();
  }, [sessionLoading, userEmail]);

  const handleRefreshData = async () => {
    setIsRefreshing(true);
    await fetchDashboardData();
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

  const getStatusBadge = (status) => {
    switch ((status || "").toLowerCase()) {
      case "accepted":
      case "shortlisted":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "interview scheduled":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
      case "rejected":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  const filteredApps = recentApps.filter((app) => {
    const st = (app.status || "").toLowerCase();
    if (activeFilter === "ACCEPTED") return st === "accepted" || st === "shortlisted";
    if (activeFilter === "INTERVIEW") return st === "interview scheduled";
    if (activeFilter === "REJECTED") return st === "rejected";
    return true;
  });

  if (loading || sessionLoading) {
    return (
      <div className="min-h-screen flex-1 bg-[#0a0a0f] text-white flex items-center justify-center">
        <p className="text-purple-400 text-sm animate-pulse">Loading dashboard overview...</p>
      </div>
    );
  }

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
            type="button"
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
                  className="h-full bg-emerald-500 rounded-full transition-all"
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
                  className="h-full bg-indigo-500 rounded-full transition-all"
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
                  className="h-full bg-rose-500 rounded-full transition-all"
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
                  type="button"
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






