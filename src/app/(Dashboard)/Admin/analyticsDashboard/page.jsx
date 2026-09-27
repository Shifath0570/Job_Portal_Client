"use client";

import React, { useState } from "react";

// ==========================================
// Inline Custom SVG Icons
// ==========================================

const TrendingUpIcon = (props) => (
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
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

const UsersIcon = (props) => (
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
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

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

const FileTextIcon = (props) => (
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
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a1 1 0 0 0 1 1h4" />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </svg>
);

const UserCheckIcon = (props) => (
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
    <polyline points="16 11 18 13 22 9" />
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

const LayersIcon = (props) => (
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
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
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

// ==========================================
// Analytics Mock Data
// ==========================================

const MONTHLY_USER_GROWTH = [
  { month: "Mar", totalUsers: 3200, heightPct: 40 },
  { month: "Apr", totalUsers: 4100, heightPct: 52 },
  { month: "May", totalUsers: 5400, heightPct: 65 },
  { month: "Jun", totalUsers: 6800, heightPct: 78 },
  { month: "Jul", totalUsers: 8200, heightPct: 90 },
  { month: "Aug", totalUsers: 9450, heightPct: 100 },
];

const RECRUITER_VS_CANDIDATE_GROWTH = [
  { month: "Mar", recruiters: 120, candidates: 1100 },
  { month: "Apr", recruiters: 180, candidates: 1450 },
  { month: "May", recruiters: 240, candidates: 1900 },
  { month: "Jun", recruiters: 310, candidates: 2500 },
  { month: "Jul", recruiters: 420, candidates: 3200 },
  { month: "Aug", recruiters: 530, candidates: 3950 },
];

const JOBS_AND_APPLICATIONS_DATA = [
  { month: "Mar", jobs: 140, applications: 850 },
  { month: "Apr", jobs: 210, applications: 1200 },
  { month: "May", jobs: 280, applications: 1650 },
  { month: "Jun", jobs: 340, applications: 2100 },
  { month: "Jul", jobs: 410, applications: 2850 },
  { month: "Aug", jobs: 490, applications: 3400 },
];

const POPULAR_CATEGORIES = [
  { name: "Software Development", percentage: 42, count: 1240, color: "bg-purple-500" },
  { name: "Design & UX", percentage: 24, count: 680, color: "bg-indigo-500" },
  { name: "Marketing & Growth", percentage: 15, count: 420, color: "bg-emerald-500" },
  { name: "Sales & BizDev", percentage: 11, count: 350, color: "bg-amber-500" },
  { name: "Finance & Legal", percentage: 8, count: 210, color: "bg-rose-500" },
];

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("6M");

  return (
    <div className="min-h-screen flex-1 bg-[#0a0a0f] text-white p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Analytics Dashboard
          </h1>
          <p className="text-gray-400 text-sm pt-1">
            Real-time platform metrics, user adoption rates, job posting statistics, and engagement insights.
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center gap-2 bg-[#14141f] border border-gray-800 p-1.5 rounded-xl self-start sm:self-auto">
          <CalendarIcon className="w-4 h-4 text-purple-400 ml-2" />
          {["1M", "3M", "6M", "1Y"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                timeRange === range
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Top Level Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Users */}
        <div className="bg-[#14141f] border border-gray-800 hover:border-purple-500/40 rounded-2xl p-5 shadow-xl transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Total Users
            </span>
            <div className="p-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl">
              <UsersIcon className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">9,450</h2>
            <div className="flex items-center gap-1.5 pt-1 text-emerald-400 text-xs font-semibold">
              <TrendingUpIcon className="w-3.5 h-3.5" />
              <span>+18.4% vs last month</span>
            </div>
          </div>
        </div>

        {/* New Jobs Posted */}
        <div className="bg-[#14141f] border border-gray-800 hover:border-indigo-500/40 rounded-2xl p-5 shadow-xl transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Jobs Posted
            </span>
            <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl">
              <BriefcaseIcon className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">490</h2>
            <div className="flex items-center gap-1.5 pt-1 text-emerald-400 text-xs font-semibold">
              <TrendingUpIcon className="w-3.5 h-3.5" />
              <span>+14.2% vs last month</span>
            </div>
          </div>
        </div>

        {/* Job Applications */}
        <div className="bg-[#14141f] border border-gray-800 hover:border-emerald-500/40 rounded-2xl p-5 shadow-xl transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Job Applications
            </span>
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
              <FileTextIcon className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">3,400</h2>
            <div className="flex items-center gap-1.5 pt-1 text-emerald-400 text-xs font-semibold">
              <TrendingUpIcon className="w-3.5 h-3.5" />
              <span>+22.1% vs last month</span>
            </div>
          </div>
        </div>

        {/* Recruiter Ratio */}
        <div className="bg-[#14141f] border border-gray-800 hover:border-amber-500/40 rounded-2xl p-5 shadow-xl transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Active Recruiters
            </span>
            <div className="p-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl">
              <UserCheckIcon className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">530</h2>
            <div className="flex items-center gap-1.5 pt-1 text-emerald-400 text-xs font-semibold">
              <TrendingUpIcon className="w-3.5 h-3.5" />
              <span>+12.8% vs last month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Row 1: Monthly User Growth Bar Chart & Most Popular Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly User Growth */}
        <div className="lg:col-span-2 bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-gray-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-white">Monthly User Growth</h2>
              <p className="text-xs text-gray-400">Total registered candidates & recruiters over time</p>
            </div>
            <span className="px-3 py-1 bg-purple-500/10 text-purple-300 text-xs font-semibold rounded-lg border border-purple-500/20">
              User Volume
            </span>
          </div>

          {/* Pure CSS Bar Visualizer */}
          <div className="h-60 flex items-end justify-between gap-3 pt-6 px-2">
            {MONTHLY_USER_GROWTH.map((item) => (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[11px] font-bold text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.totalUsers}
                </span>
                <div
                  style={{ height: `${item.heightPct}%` }}
                  className="w-full bg-gradient-to-t from-purple-900 via-purple-600 to-indigo-500 rounded-t-xl group-hover:brightness-125 transition-all shadow-lg shadow-purple-500/10"
                />
                <span className="text-xs font-semibold text-gray-400 group-hover:text-white transition-colors">
                  {item.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Most Popular Categories */}
        <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-gray-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-white">Most Popular Categories</h2>
              <p className="text-xs text-gray-400">Distribution by job posts</p>
            </div>
            <LayersIcon className="w-5 h-5 text-purple-400" />
          </div>

          <div className="space-y-4 pt-2">
            {POPULAR_CATEGORIES.map((cat) => (
              <div key={cat.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-gray-200">{cat.name}</span>
                  <span className="text-gray-400 font-mono">
                    {cat.count} jobs ({cat.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-[#0a0a0f] h-2.5 rounded-full overflow-hidden border border-gray-800">
                  <div
                    style={{ width: `${cat.percentage}%` }}
                    className={`h-full ${cat.color} rounded-full transition-all duration-500`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Row 2: Recruiter vs Candidate Growth & New Jobs vs Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recruiter Growth vs Candidate Growth */}
        <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-gray-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-white">Recruiter vs Candidate Growth</h2>
              <p className="text-xs text-gray-400">Comparing user segmentation profiles</p>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-gray-300">Candidates</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-indigo-400" />
                <span className="text-gray-300">Recruiters</span>
              </div>
            </div>
          </div>

          {/* Dual Bar Progress Rows */}
          <div className="space-y-4 pt-2">
            {RECRUITER_VS_CANDIDATE_GROWTH.map((row) => (
              <div key={row.month} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-purple-300">{row.month}</span>
                  <span className="text-gray-400 font-mono text-[11px]">
                    Candidates: <strong className="text-white">{row.candidates}</strong> | Recruiters: <strong className="text-white">{row.recruiters}</strong>
                  </span>
                </div>
                <div className="flex gap-1.5 h-3">
                  <div
                    style={{ width: `${(row.candidates / 4000) * 100}%` }}
                    className="bg-purple-500 rounded-md transition-all"
                    title={`Candidates: ${row.candidates}`}
                  />
                  <div
                    style={{ width: `${(row.recruiters / 600) * 100}%` }}
                    className="bg-indigo-400 rounded-md transition-all"
                    title={`Recruiters: ${row.recruiters}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Jobs Posted vs Applications */}
        <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-gray-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-white">Jobs Posted vs Applications</h2>
              <p className="text-xs text-gray-400">Conversion and activity volume</p>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-gray-300">Applications</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="text-gray-300">Jobs Posted</span>
              </div>
            </div>
          </div>

          {/* Activity Comparison Table Visualizer */}
          <div className="space-y-4 pt-2">
            {JOBS_AND_APPLICATIONS_DATA.map((row) => (
              <div key={row.month} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-emerald-300">{row.month}</span>
                  <span className="text-gray-400 font-mono text-[11px]">
                    Applications: <strong className="text-white">{row.applications}</strong> | Jobs: <strong className="text-white">{row.jobs}</strong>
                  </span>
                </div>
                <div className="flex gap-1.5 h-3">
                  <div
                    style={{ width: `${(row.applications / 3500) * 100}%` }}
                    className="bg-emerald-400 rounded-md transition-all"
                  />
                  <div
                    style={{ width: `${(row.jobs / 500) * 100}%` }}
                    className="bg-amber-400 rounded-md transition-all"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}