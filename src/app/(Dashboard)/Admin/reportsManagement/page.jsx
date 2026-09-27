"use client";

import React, { useState } from "react";

// ==========================================
// Inline Custom SVG Icons
// ==========================================

const ShieldAlertIcon = (props) => (
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
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </svg>
);

const SearchIcon = (props) => (
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
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const FilterIcon = (props) => (
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
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
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

const BanIcon = (props) => (
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
    <path d="m4.93 4.93 14.14 14.14" />
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

const CloseIcon = (props) => (
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
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const ClockIcon = (props) => (
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
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

// ==========================================
// Mock User Reports Data
// ==========================================

const INITIAL_REPORTS = [
  {
    id: "REP-901",
    type: "Fake Job",
    reporterName: "Alex Rivera",
    reporterEmail: "alex.rivera@example.com",
    targetEntity: "Data Entry Specialist (Work From Home)",
    companyName: "Global Apex Solutions",
    reportDate: "Aug 06, 2026",
    status: "Open", // Open | Under Review | Closed
    description: "The listing asks applicants to pay a $50 upfront registration fee before receiving project materials.",
    evidenceLink: "https://example.com/flagged-job-901",
  },
  {
    id: "REP-902",
    type: "Scam Company",
    reporterName: "Marcus Vance",
    reporterEmail: "m.vance@devmail.org",
    targetEntity: "Nova Tech Ventures",
    companyName: "Nova Tech Ventures",
    reportDate: "Aug 05, 2026",
    status: "Under Review",
    description: "Company profile claims to be based in New York, but contact numbers redirect to phishing sites requesting SSN data.",
    evidenceLink: "https://example.com/flagged-company-902",
  },
  {
    id: "REP-903",
    type: "Spam Content",
    reporterName: "Sophia Chen",
    reporterEmail: "sophia.chen@cloudlab.io",
    targetEntity: "Crypto Mining Opportunity Advert",
    companyName: "Web3 Fast Track",
    reportDate: "Aug 03, 2026",
    status: "Open",
    description: "Repeatedly posting promotional Telegram channel links inside the job description requirements.",
    evidenceLink: "https://example.com/flagged-job-903",
  },
  {
    id: "REP-904",
    type: "Inappropriate Content",
    reporterName: "Jordan Lee",
    reporterEmail: "j.lee@datascience.net",
    targetEntity: "Junior Frontend Developer Listing",
    companyName: "Vanguard Tech",
    reportDate: "Jul 29, 2026",
    status: "Closed",
    description: "Job posting contained discriminatory age and gender restrictions explicitly in the qualifications section.",
    evidenceLink: "https://example.com/flagged-job-904",
  },
];

export default function ReportsManagement() {
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypeFilter, setSelectedTypeFilter] = useState("ALL");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("ALL");

  // Modal & Toast States
  const [viewingReport, setViewingReport] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Admin Action: Review Report (Set status to Under Review)
  const handleReviewReport = (id) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Under Review" } : r))
    );
    showToast(`Report ${id} marked as "Under Review".`);
  };

  // Admin Action: Close Report
  const handleCloseReport = (id) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Closed" } : r))
    );
    showToast(`Report ${id} closed successfully.`);
  };

  // Admin Action: Remove Flagged Job
  const handleRemoveJob = (id, targetEntity) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Closed" } : r))
    );
    showToast(`Job "${targetEntity}" removed and report ${id} closed.`);
  };

  // Admin Action: Suspend Company
  const handleSuspendCompany = (id, companyName) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Closed" } : r))
    );
    showToast(`Company "${companyName}" suspended across the platform.`);
  };

  // Type Badge Styling
  const getTypeBadgeStyle = (type) => {
    switch (type) {
      case "Fake Job":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      case "Scam Company":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Spam Content":
        return "bg-purple-500/10 text-purple-300 border-purple-500/20";
      case "Inappropriate Content":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  // Filter Logic
  const filteredReports = reports.filter((rep) => {
    const matchesSearch =
      rep.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.targetEntity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.reporterName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      selectedTypeFilter === "ALL" || rep.type === selectedTypeFilter;

    const matchesStatus =
      selectedStatusFilter === "ALL" || rep.status === selectedStatusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="min-h-screen flex-1 bg-[#0a0a0f] text-white p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Reports Management
          </h1>
          <p className="text-gray-400 text-sm pt-1">
            Review user flags for fake jobs, scam companies, spam, or inappropriate platform content.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold rounded-xl flex items-center gap-1.5">
            <ShieldAlertIcon className="w-3.5 h-3.5" />
            {reports.filter((r) => r.status === "Open").length} Active Flags
          </span>
        </div>
      </div>

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="p-4 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold rounded-xl flex items-center gap-2">
          <CheckCircleIcon className="w-4 h-4 text-purple-400 shrink-0" />
          {toastMessage}
        </div>
      )}

      {/* Search & Filter Controls */}
      <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-4 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Field */}
        <div className="relative w-full md:flex-1">
          <SearchIcon className="w-4 h-4 absolute left-4 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search report ID, target listing, company, or reporter..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl text-xs outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full md:w-auto">
          <FilterIcon className="w-4 h-4 text-purple-400 shrink-0 hidden sm:block" />
          
          {/* Category Filter */}
          <select
            value={selectedTypeFilter}
            onChange={(e) => setSelectedTypeFilter(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2 bg-[#0a0a0f] border border-gray-800 text-gray-300 rounded-xl text-xs outline-none focus:border-purple-500 cursor-pointer font-medium"
          >
            <option value="ALL">All Categories</option>
            <option value="Fake Job">Fake Job</option>
            <option value="Scam Company">Scam Company</option>
            <option value="Spam Content">Spam Content</option>
            <option value="Inappropriate Content">Inappropriate Content</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2 bg-[#0a0a0f] border border-gray-800 text-gray-300 rounded-xl text-xs outline-none focus:border-purple-500 cursor-pointer font-medium"
          >
            <option value="ALL">All Statuses</option>
            <option value="Open">Open</option>
            <option value="Under Review">Under Review</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
        {filteredReports.length === 0 ? (
          <div className="p-12 text-center text-gray-500 space-y-2">
            <ShieldAlertIcon className="w-10 h-10 mx-auto text-gray-600 mb-2" />
            <p className="text-sm font-semibold text-white">No reports match your criteria.</p>
            <p className="text-xs text-gray-400">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 uppercase font-semibold tracking-wider">
                  <th className="py-3 px-4">Report ID & Type</th>
                  <th className="py-3 px-4">Flagged Entity / Company</th>
                  <th className="py-3 px-4">Reporter</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Admin Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/80">
                {filteredReports.map((rep) => (
                  <tr
                    key={rep.id}
                    className="hover:bg-purple-500/[0.02] transition-colors group"
                  >
                    {/* ID & Category */}
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <span className="font-mono font-bold text-gray-200">
                          {rep.id}
                        </span>
                        <div>
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getTypeBadgeStyle(
                              rep.type
                            )}`}
                          >
                            {rep.type}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Target Entity */}
                    <td className="py-4 px-4">
                      <p className="font-bold text-white text-sm group-hover:text-purple-400 transition-colors">
                        {rep.targetEntity}
                      </p>
                      <p className="text-gray-400 text-[11px] pt-0.5">
                        Company: <span className="text-gray-300 font-medium">{rep.companyName}</span>
                      </p>
                    </td>

                    {/* Reporter */}
                    <td className="py-4 px-4">
                      <p className="font-semibold text-gray-200">{rep.reporterName}</p>
                      <p className="text-gray-500 text-[11px]">{rep.reportDate}</p>
                    </td>

                    {/* Report Status */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                          rep.status === "Open"
                            ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                            : rep.status === "Under Review"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        }`}
                      >
                        {rep.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View Details */}
                        <button
                          onClick={() => setViewingReport(rep)}
                          title="View Report Details"
                          className="p-2 bg-[#0a0a0f] hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white rounded-xl transition-all cursor-pointer"
                        >
                          <EyeIcon className="w-3.5 h-3.5" />
                        </button>

                        {/* Review Report */}
                        {rep.status === "Open" && (
                          <button
                            onClick={() => handleReviewReport(rep.id)}
                            title="Mark Under Review"
                            className="p-2 bg-[#0a0a0f] hover:bg-amber-500/10 border border-gray-800 hover:border-amber-500/30 text-amber-400 rounded-xl transition-all cursor-pointer"
                          >
                            <ClockIcon className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Remove Job Action */}
                        {(rep.type === "Fake Job" || rep.type === "Spam Content") && (
                          <button
                            onClick={() => handleRemoveJob(rep.id, rep.targetEntity)}
                            title="Remove Flagged Job Listing"
                            className="p-2 bg-[#0a0a0f] hover:bg-rose-500/10 border border-gray-800 hover:border-rose-500/30 text-rose-400 rounded-xl transition-all cursor-pointer"
                          >
                            <TrashIcon className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Suspend Company Action */}
                        {rep.type === "Scam Company" && (
                          <button
                            onClick={() => handleSuspendCompany(rep.id, rep.companyName)}
                            title="Suspend Company Account"
                            className="p-2 bg-[#0a0a0f] hover:bg-rose-500/10 border border-gray-800 hover:border-rose-500/30 text-rose-400 rounded-xl transition-all cursor-pointer"
                          >
                            <BanIcon className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Close Report */}
                        {rep.status !== "Closed" && (
                          <button
                            onClick={() => handleCloseReport(rep.id)}
                            title="Close Report"
                            className="p-2 bg-[#0a0a0f] hover:bg-emerald-500/10 border border-gray-800 hover:border-emerald-500/30 text-emerald-400 rounded-xl transition-all cursor-pointer"
                          >
                            <CheckCircleIcon className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ========================================== */}
      {/* VIEW REPORT DETAILS MODAL                  */}
      {/* ========================================== */}
      {viewingReport && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl w-full max-w-lg p-6 space-y-6 shadow-2xl relative">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl">
                  <ShieldAlertIcon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">
                    Report {viewingReport.id}
                  </h2>
                  <p className="text-xs text-purple-400 font-medium">
                    Category: {viewingReport.type}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setViewingReport(null)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-2">
                <span className="text-gray-400 font-semibold block">Incident Description</span>
                <p className="text-gray-200 leading-relaxed">
                  {viewingReport.description}
                </p>
              </div>

              {/* Report Metadata */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-1">
                  <span className="text-gray-500 text-[10px] uppercase font-semibold block">
                    Flagged Target
                  </span>
                  <p className="font-bold text-white truncate">{viewingReport.targetEntity}</p>
                </div>

                <div className="p-3 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-1">
                  <span className="text-gray-500 text-[10px] uppercase font-semibold block">
                    Associated Company
                  </span>
                  <p className="font-bold text-white truncate">{viewingReport.companyName}</p>
                </div>

                <div className="p-3 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-1">
                  <span className="text-gray-500 text-[10px] uppercase font-semibold block">
                    Submitted By
                  </span>
                  <p className="font-bold text-white">{viewingReport.reporterName}</p>
                </div>

                <div className="p-3 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-1">
                  <span className="text-gray-500 text-[10px] uppercase font-semibold block">
                    Date Filed
                  </span>
                  <p className="font-bold text-white">{viewingReport.reportDate}</p>
                </div>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-800 gap-2">
              <div className="flex gap-2">
                {viewingReport.type === "Scam Company" ? (
                  <button
                    onClick={() => {
                      handleSuspendCompany(viewingReport.id, viewingReport.companyName);
                      setViewingReport(null);
                    }}
                    className="px-3.5 py-2 bg-rose-600/20 border border-rose-500/30 text-rose-300 hover:bg-rose-600 hover:text-white rounded-xl transition-all cursor-pointer font-medium"
                  >
                    Suspend Company
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleRemoveJob(viewingReport.id, viewingReport.targetEntity);
                      setViewingReport(null);
                    }}
                    className="px-3.5 py-2 bg-rose-600/20 border border-rose-500/30 text-rose-300 hover:bg-rose-600 hover:text-white rounded-xl transition-all cursor-pointer font-medium"
                  >
                    Remove Content
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => setViewingReport(null)}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl cursor-pointer transition-all shadow-md"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}