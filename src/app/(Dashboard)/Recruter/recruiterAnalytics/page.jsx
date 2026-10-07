
"use client";

import React, { useState } from "react";
import {
  Eye as EyeIcon,
  Users as UsersIcon,
  UserCheck as UserCheckIcon,
  Calendar as CalendarIcon,
  Award as AwardIcon,
  RefreshCw as RefreshIcon,
  TrendingUp as TrendingUpIcon,
} from "lucide-react";

const INITIAL_METRICS = {
  totalViews: "18,450",
  totalApplications: "1,420",
  shortlisted: "185",
  interviewsScheduled: "48",
  hiredCandidates: "24",
};

const INITIAL_POPULAR_JOBS = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    views: "5,420",
    applications: "412",
    conversionRate: "7.6%",
    status: "Active",
  },
  {
    id: 2,
    title: "Backend Node.js Architect",
    views: "4,180",
    applications: "385",
    conversionRate: "9.2%",
    status: "Closed",
  },
  {
    id: 3,
    title: "UI/UX Product Designer",
    views: "3,890",
    applications: "294",
    conversionRate: "7.5%",
    status: "Active",
  },
  {
    id: 4,
    title: "DevOps & Cloud Engineer",
    views: "2,610",
    applications: "198",
    conversionRate: "7.5%",
    status: "Active",
  },
];

export default function RecruiterAnalytics() {
  const [metrics, setMetrics] = useState(INITIAL_METRICS);
  const [popularJobs, setPopularJobs] = useState(INITIAL_POPULAR_JOBS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState("30d");

  // Fetch updated analytics baseline without useEffect
  const handleRefreshAnalytics = async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch(`/api/recruiter/analytics?range=${timeRange}`);
      if (!response.ok) throw new Error("Analytics API request failed");
      const data = await response.json();

      if (data.metrics) setMetrics(data.metrics);
      if (data.popularJobs) setPopularJobs(data.popularJobs);
    } catch (error) {
      console.warn("Retaining baseline analytics data:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const statCards = [
    {
      title: "Total Job Views",
      value: metrics.totalViews,
      change: "+14.2% vs last period",
      icon: EyeIcon,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      title: "Total Applications",
      value: metrics.totalApplications,
      change: "+8.5% vs last period",
      icon: UsersIcon,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
    {
      title: "Shortlisted Candidates",
      value: metrics.shortlisted,
      change: "13% conversion rate",
      icon: UserCheckIcon,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
    },
    {
      title: "Interviews Scheduled",
      value: metrics.interviewsScheduled,
      change: "26% conversion from shortlist",
      icon: CalendarIcon,
      color: "text-indigo-400",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/20",
    },
    {
      title: "Hired Candidates",
      value: metrics.hiredCandidates,
      change: "50% offer acceptance",
      icon: AwardIcon,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
  ];

  return (
    <div className="min-h-screen flex-1 bg-[#0a0a0f] text-white p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Recruiter Analytics
          </h1>
          <p className="text-gray-400 text-sm pt-1">
            Overview of job view engagement, application funnels, and performance statistics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Time Range Filter */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2.5 bg-[#14141f] border border-gray-800 text-gray-300 text-xs font-semibold rounded-xl outline-none focus:border-purple-500 cursor-pointer"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">All Time</option>
          </select>

          {/* Sync Button */}
          <button
            onClick={handleRefreshAnalytics}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#14141f] hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white text-xs font-medium rounded-xl transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshIcon className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Updating..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* Main Key Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
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
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <div className="text-2xl font-extrabold text-white tracking-tight">
                  {card.value}
                </div>
                <p className="text-[11px] text-gray-500 pt-1 font-medium">
                  {card.change}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Secondary Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
        {/* Most Popular Job Posts Table */}
        <div className="lg:col-span-8 bg-[#14141f] border border-gray-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <TrendingUpIcon className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-bold text-white">Most Popular Job Posts</h2>
            </div>
            <span className="text-xs text-gray-500">Ranked by views</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-800 bg-[#0a0a0f]/50 text-gray-400 uppercase font-semibold tracking-wider">
                  <th className="py-3.5 px-4">Job Title</th>
                  <th className="py-3.5 px-4">Views</th>
                  <th className="py-3.5 px-4">Applications</th>
                  <th className="py-3.5 px-4">Conv. Rate</th>
                  <th className="py-3.5 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/80">
                {popularJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="hover:bg-purple-500/[0.02] transition-colors"
                  >
                    <td className="py-4 px-4 font-semibold text-white">
                      {job.title}
                    </td>
                    <td className="py-4 px-4 text-gray-300 font-medium">
                      {job.views}
                    </td>
                    <td className="py-4 px-4 text-purple-400 font-semibold">
                      {job.applications}
                    </td>
                    <td className="py-4 px-4 text-emerald-400 font-medium">
                      {job.conversionRate}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${
                          job.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-gray-500/10 text-gray-400 border-gray-500/20"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Application Conversion Funnel Summary */}
        <div className="lg:col-span-4 bg-[#14141f] border border-gray-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <h2 className="text-lg font-bold text-white pb-4 border-b border-gray-800">
            Hiring Funnel Breakdown
          </h2>

          <div className="space-y-5 text-xs">
            <div>
              <div className="flex justify-between text-gray-400 mb-1.5 font-medium">
                <span>Views to Applications</span>
                <span className="text-white font-semibold">7.7%</span>
              </div>
              <div className="w-full h-2 bg-[#0a0a0f] rounded-full overflow-hidden border border-gray-800">
                <div className="h-full bg-blue-500 rounded-full w-[7.7%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-gray-400 mb-1.5 font-medium">
                <span>Applications to Shortlisted</span>
                <span className="text-white font-semibold">13.0%</span>
              </div>
              <div className="w-full h-2 bg-[#0a0a0f] rounded-full overflow-hidden border border-gray-800">
                <div className="h-full bg-purple-500 rounded-full w-[13.0%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-gray-400 mb-1.5 font-medium">
                <span>Shortlisted to Interview</span>
                <span className="text-white font-semibold">25.9%</span>
              </div>
              <div className="w-full h-2 bg-[#0a0a0f] rounded-full overflow-hidden border border-gray-800">
                <div className="h-full bg-indigo-500 rounded-full w-[25.9%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-gray-400 mb-1.5 font-medium">
                <span>Interviews to Hired</span>
                <span className="text-white font-semibold">50.0%</span>
              </div>
              <div className="w-full h-2 bg-[#0a0a0f] rounded-full overflow-hidden border border-gray-800">
                <div className="h-full bg-emerald-500 rounded-full w-[50.0%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}






