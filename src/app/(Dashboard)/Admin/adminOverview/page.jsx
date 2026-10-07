
"use client";

import React, { useState } from "react";
import {
  Users,
  UserCheck,
  Briefcase,
  CheckCircle,
  FileText,
  Building,
  AlertTriangle,
  TrendingUp,
  Clock,
  ShieldCheck,
  FileCheck,
} from "lucide-react";


const METRICS = [
  {
    id: "total-users",
    title: "Total Users",
    value: "24,890",
    change: "+12.5%",
    isPositive: true,
    icon: Users,
    accent: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
  {
    id: "total-candidates",
    title: "Total Candidates",
    value: "19,420",
    change: "+14.2%",
    isPositive: true,
    icon: UserCheck,
    accent: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  },
  {
    id: "total-recruiters",
    title: "Total Recruiters",
    value: "5,470",
    change: "+6.8%",
    isPositive: true,
    icon: Users,
    accent: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  {
    id: "total-jobs",
    title: "Total Jobs",
    value: "8,350",
    change: "+18.4%",
    isPositive: true,
    icon: Briefcase,
    accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    id: "active-jobs",
    title: "Active Jobs",
    value: "3,120",
    change: "+4.1%",
    isPositive: true,
    icon: CheckCircle,
    accent: "text-teal-400 bg-teal-500/10 border-teal-500/20",
  },
  {
    id: "total-applications",
    title: "Total Applications",
    value: "142,600",
    change: "+22.9%",
    isPositive: true,
    icon: FileText,
    accent: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  {
    id: "total-companies",
    title: "Total Companies",
    value: "1,280",
    change: "+8.3%",
    isPositive: true,
    icon: Building,
    accent: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  },
  {
    id: "total-reports",
    title: "Total Reports",
    value: "42",
    change: "-15.0%",
    isPositive: true,
    icon: AlertTriangle,
    accent: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  },
];

const RECENT_LOGS = [
  {
    id: "log-1",
    action: "New Company Verified",
    target: "Starlight Design Studio",
    time: "10 mins ago",
    type: "system",
    icon: ShieldCheck,
  },
  {
    id: "log-2",
    action: "Report Resolved",
    target: "Job #8821 Flagged for Spam",
    time: "45 mins ago",
    type: "report",
    icon: FileCheck,
  },
  {
    id: "log-3",
    action: "Recruiter Approved",
    target: "David Miller (Acme Tech)",
    time: "2 hours ago",
    type: "user",
    icon: UserCheck,
  },
  {
    id: "log-4",
    action: "Job Posting Archived",
    target: "Senior Node Developer",
    time: "5 hours ago",
    type: "system",
    icon: Briefcase,
  },
];

export default function AdminOverview() {
  const [timeRange, setTimeRange] = useState("30d");

  return (
    <div className="min-h-screen flex-1 bg-[#0a0a0f] text-white p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Admin Overview
          </h1>
          <p className="text-gray-400 text-sm pt-1">
            Real-time platform metrics, user growth, and management activities.
          </p>
        </div>

        {/* Time Period Filter */}
        <div className="flex items-center bg-[#14141f] border border-gray-800 p-1 rounded-xl">
          {["7d", "30d", "90d", "1y"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                timeRange === range
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {range.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* 8 Dashboard Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map((metric) => {
          const IconComponent = metric.icon;
          return (
            <div
              key={metric.id}
              className="bg-[#14141f] border border-gray-800 hover:border-purple-500/30 rounded-2xl p-5 space-y-4 transition-all shadow-xl flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {metric.title}
                </span>
                <div className={`p-2.5 rounded-xl border ${metric.accent}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {metric.value}
                </h2>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{metric.change}</span>
                  <span className="text-gray-500 text-[10px] font-normal pl-0.5">
                    vs previous {timeRange}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Visual Breakdown & System Audit Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Growth Mock Chart Card */}
        <div className="lg:col-span-2 bg-[#14141f] border border-gray-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-gray-800/80 pb-4">
            <div>
              <h3 className="text-base font-bold text-white">
                Platform Activity Overview
              </h3>
              <p className="text-xs text-gray-400 pt-0.5">
                Application submissions vs new candidate registrations
              </p>
            </div>
            <span className="px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[11px] font-semibold rounded-lg">
              Live Feed
            </span>
          </div>

          {/* Bar Chart Simulation */}
          <div className="h-48 flex items-end justify-between gap-2 pt-6 px-2">
            {[40, 65, 55, 80, 95, 70, 85, 100, 60, 75, 90, 85].map(
              (height, idx) => (
                <div
                  key={idx}
                  className="flex-1 flex flex-col items-center gap-2 h-full justify-end group"
                >
                  <div
                    style={{ height: `${height}%` }}
                    className="w-full bg-gradient-to-t from-purple-600/40 to-indigo-500 rounded-t-md group-hover:from-purple-500 group-hover:to-indigo-400 transition-all relative"
                  >
                    <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-[#0a0a0f] border border-gray-700 text-white text-[9px] px-1.5 py-0.5 rounded shadow">
                      {height * 120}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-500 font-medium">
                    M{idx + 1}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* System Activity & Audit Log */}
        <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 space-y-5 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-gray-800/80 pb-3">
              <h3 className="text-base font-bold text-white">
                Recent System Audit
              </h3>
              <p className="text-xs text-gray-400 pt-0.5">
                Automated flags & admin actions
              </p>
            </div>

            <div className="space-y-3.5">
              {RECENT_LOGS.map((log) => {
                const LogIcon = log.icon;
                return (
                  <div
                    key={log.id}
                    className="p-3 bg-[#0a0a0f] border border-gray-800/80 rounded-xl space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-purple-400 flex items-center gap-1.5">
                        <LogIcon className="w-3.5 h-3.5" />
                        {log.action}
                      </span>
                      <span className="text-[10px] text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {log.time}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 font-medium truncate">
                      {log.target}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <button className="w-full py-2.5 bg-[#0a0a0f] hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white text-xs font-semibold rounded-xl transition-all cursor-pointer mt-4">
            View All Audit Logs
          </button>
        </div>
      </div>
    </div>
  );
}






