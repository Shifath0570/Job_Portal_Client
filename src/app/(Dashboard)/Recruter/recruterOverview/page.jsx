

"use client";

import React, { useState } from "react";
import {
  Briefcase as BriefcaseIcon,
  CheckCircle as CheckCircleIcon,
  Archive as ArchiveIcon,
  Users as UsersIcon,
  UserCheck as UserCheckIcon,
  Calendar as CalendarIcon,
  Award as AwardIcon,
  Plus as PlusIcon,
  RefreshCw as RefreshIcon,
} from "lucide-react";

const INITIAL_METRICS = [
  {
    id: "total-jobs",
    title: "Total Jobs Posted",
    value: "28",
    change: "+4 this month",
    icon: BriefcaseIcon,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
  },
  {
    id: "active-jobs",
    title: "Active Jobs",
    value: "12",
    change: "Currently hiring",
    icon: CheckCircleIcon,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
  },
  {
    id: "closed-jobs",
    title: "Closed Jobs",
    value: "16",
    change: "Archived roles",
    icon: ArchiveIcon,
    color: "text-gray-400",
    bgColor: "bg-gray-500/10",
    borderColor: "border-gray-500/20",
  },
  {
    id: "total-apps",
    title: "Total Applications",
    value: "1,420",
    change: "+124 this week",
    icon: UsersIcon,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
  {
    id: "shortlisted",
    title: "Shortlisted Candidates",
    value: "185",
    change: "13% conversion",
    icon: UserCheckIcon,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
  },
  {
    id: "interviews",
    title: "Scheduled Interviews",
    value: "24",
    change: "Next 7 days",
    icon: CalendarIcon,
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20",
  },
  {
    id: "hired",
    title: "Hired Candidates",
    value: "42",
    change: "All-time hires",
    icon: AwardIcon,
    color: "text-rose-400",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/20",
  },
];

const INITIAL_APPLICATIONS = [
  {
    id: 1,
    name: "Eleanor Pena",
    role: "Senior Frontend Engineer",
    appliedDate: "2 hours ago",
    status: "Shortlisted",
    statusColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  {
    id: 2,
    name: "Jerome Bell",
    role: "UI/UX Designer",
    appliedDate: "5 hours ago",
    status: "Interview Scheduled",
    statusColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  },
  {
    id: 3,
    name: "Devon Lane",
    role: "Backend Node.js Developer",
    appliedDate: "1 day ago",
    status: "Hired",
    statusColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
];

export default function RecruiterOverview() {
  const [metrics, setMetrics] = useState(INITIAL_METRICS);
  const [recentApps, setRecentApps] = useState(INITIAL_APPLICATIONS);
  const [isFetching, setIsFetching] = useState(false);

  const handleFetchData = async () => {
    setIsFetching(true);
    try {
      const response = await fetch("/api/recruiter/overview");
      if (!response.ok) throw new Error("API call failed");

      const data = await response.json();

      if (data.metrics) {
        setMetrics((prev) =>
          prev.map((item) => ({
            ...item,
            value: data.metrics[item.id]?.value ?? item.value,
            change: data.metrics[item.id]?.change ?? item.change,
          }))
        );
      }

      if (data.recentApplications) {
        setRecentApps(data.recentApplications);
      }
    } catch (error) {
      console.warn("Using baseline mock data:", error);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="min-h-screen flex-1 bg-[#0a0a0f] text-white p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Recruiter Overview
          </h1>
          <p className="text-gray-400 text-sm pt-1">
            Welcome back! Here is a summary of your hiring activities and job listings.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleFetchData}
            disabled={isFetching}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#14141f] hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white text-sm font-medium rounded-xl transition-all disabled:opacity-50 cursor-pointer"
          >
            <RefreshIcon className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} />
            {isFetching ? "Syncing..." : "Refresh Data"}
          </button>

          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-sm rounded-xl transition-all shadow-md cursor-pointer">
            <PlusIcon className="w-4 h-4" />
            Post New Job
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.id}
              className="bg-[#14141f] border border-gray-800 hover:border-purple-500/40 rounded-2xl p-5 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {metric.title}
                </span>
                <div
                  className={`w-10 h-10 rounded-xl ${metric.bgColor} border ${metric.borderColor} flex items-center justify-center ${metric.color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div>
                <div className="text-3xl font-extrabold text-white tracking-tight">
                  {metric.value}
                </div>
                <p className="text-xs text-gray-500 pt-1 font-medium">
                  {metric.change}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Secondary Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
        {/* Recent Applications Feed */}
        <div className="lg:col-span-8 bg-[#14141f] border border-gray-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-gray-800">
            <h2 className="text-lg font-bold text-white">Recent Candidate Activity</h2>
            <button className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors cursor-pointer">
              View All Applications
            </button>
          </div>

          <div className="space-y-4">
            {recentApps.map((app) => (
              <div
                key={app.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#0a0a0f] border border-gray-800/80 rounded-xl gap-4 hover:border-gray-700 transition-all"
              >
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-white">{app.name}</h3>
                  <p className="text-xs text-gray-400">{app.role}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${app.statusColor}`}
                  >
                    {app.status}
                  </span>
                  <span className="text-xs text-gray-500">{app.appliedDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hiring Pipeline Quick Summary */}
        <div className="lg:col-span-4 bg-[#14141f] border border-gray-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <h2 className="text-lg font-bold text-white pb-4 border-b border-gray-800">
            Hiring Progress
          </h2>

          <div className="space-y-4 text-sm">
            <div>
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Screening Completed</span>
                <span className="text-white font-medium">78%</span>
              </div>
              <div className="w-full h-2 bg-[#0a0a0f] rounded-full overflow-hidden border border-gray-800">
                <div className="h-full bg-purple-500 rounded-full w-[78%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Interview Stage</span>
                <span className="text-white font-medium">45%</span>
              </div>
              <div className="w-full h-2 bg-[#0a0a0f] rounded-full overflow-hidden border border-gray-800">
                <div className="h-full bg-indigo-500 rounded-full w-[45%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Offer Accepted</span>
                <span className="text-white font-medium">20%</span>
              </div>
              <div className="w-full h-2 bg-[#0a0a0f] rounded-full overflow-hidden border border-gray-800">
                <div className="h-full bg-emerald-500 rounded-full w-[20%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




