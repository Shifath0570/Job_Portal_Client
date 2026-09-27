"use client";

import React, { useState } from "react";

// ==========================================
// Inline Custom SVG Icons
// ==========================================

const FileCheckIcon = (props) => (
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
    <path d="m9 15 2 2 4-4" />
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
// Mock Job Applications Data
// ==========================================

const INITIAL_APPLICATIONS = [
  {
    id: "app-301",
    candidateName: "Alex Rivera",
    candidateEmail: "alex.rivera@example.com",
    candidateAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    jobTitle: "Senior Full Stack Developer",
    company: "Starlight Design Studio",
    companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80",
    applicationDate: "Aug 05, 2026",
    status: "Interview",
    coverNote: "With 6+ years building React/Node microservices, I am very eager to help Starlight build world-class design tools.",
    resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "app-302",
    candidateName: "Marcus Vance",
    candidateEmail: "m.vance@devmail.org",
    candidateAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    jobTitle: "Lead Product Designer",
    company: "Acme Technologies",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80",
    applicationDate: "Aug 06, 2026",
    status: "Pending",
    coverNote: "I have spearheaded Figma component design systems for major SaaS enterprises and look forward to discussing Acme's vision.",
    resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "app-303",
    candidateName: "Sophia Chen",
    candidateEmail: "sophia.chen@cloudlab.io",
    candidateAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
    jobTitle: "DevOps & Cloud Engineer",
    company: "CyberPulse Labs",
    companyLogo: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=100&auto=format&fit=crop&q=80",
    applicationDate: "Jul 28, 2026",
    status: "Accepted",
    coverNote: "Specialized in zero-downtime Kubernetes cluster deployments with Terraform and automated CI/CD.",
    resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "app-304",
    candidateName: "Jordan Lee",
    candidateEmail: "j.lee@datascience.net",
    candidateAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    jobTitle: "AI Specialist & Machine Learning Researcher",
    company: "CloudVibe Tech",
    companyLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=80",
    applicationDate: "Aug 02, 2026",
    status: "Rejected",
    coverNote: "Focused on fine-tuning LLMs and NLP analytics pipelines in Python and PyTorch.",
    resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
];

export default function Application() {
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("ALL");

  // Modal & Notification State
  const [viewingApp, setViewingApp] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Status Change Handler
  const handleStatusChange = (id, newStatus, candidateName) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
    showToast(`Application status for ${candidateName} updated to "${newStatus}".`);
  };

  // Delete Application Record
  const handleDeleteApplication = (id, candidateName) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
    showToast(`Application for ${candidateName} deleted.`);
  };

  // Status Badge Styling Helper
  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Interview":
        return "bg-purple-500/10 text-purple-300 border-purple-500/20";
      case "Pending":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Rejected":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  // Filter Applications Logic
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.candidateEmail.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatusFilter === "ALL" || app.status === selectedStatusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen flex-1 bg-[#0a0a0f] text-white p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Application Overview
          </h1>
          <p className="text-gray-400 text-sm pt-1">
            Monitor and review all active job submissions across candidate accounts and companies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold rounded-xl">
            {applications.length} Total Submissions
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
      <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Field */}
        <div className="relative w-full sm:flex-1">
          <SearchIcon className="w-4 h-4 absolute left-4 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search by candidate name, job title, or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl text-xs outline-none"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <FilterIcon className="w-4 h-4 text-purple-400 shrink-0" />
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2 bg-[#0a0a0f] border border-gray-800 text-gray-300 rounded-xl text-xs outline-none focus:border-purple-500 cursor-pointer font-medium"
          >
            <option value="ALL">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Interview">Interview</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
        {filteredApplications.length === 0 ? (
          <div className="p-12 text-center text-gray-500 space-y-2">
            <FileCheckIcon className="w-10 h-10 mx-auto text-gray-600 mb-2" />
            <p className="text-sm font-semibold text-white">No applications found.</p>
            <p className="text-xs text-gray-400">Try modifying your search or filter settings.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 uppercase font-semibold tracking-wider">
                  <th className="py-3 px-4">Candidate Name</th>
                  <th className="py-3 px-4">Job Title</th>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Application Date</th>
                  <th className="py-3 px-4">Application Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/80">
                {filteredApplications.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-purple-500/[0.02] transition-colors group"
                  >
                    {/* Candidate Name & Avatar */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={app.candidateAvatar}
                          alt={app.candidateName}
                          className="w-9 h-9 rounded-full object-cover border border-gray-800 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-white text-sm group-hover:text-purple-400 transition-colors">
                            {app.candidateName}
                          </p>
                          <p className="text-gray-400 text-[11px] pt-0.5">
                            {app.candidateEmail}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Job Title */}
                    <td className="py-4 px-4 font-semibold text-gray-200">
                      {app.jobTitle}
                    </td>

                    {/* Company */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={app.companyLogo}
                          alt={app.company}
                          className="w-6 h-6 rounded-md object-cover border border-gray-800 shrink-0"
                        />
                        <span className="font-medium text-gray-300">{app.company}</span>
                      </div>
                    </td>

                    {/* Application Date */}
                    <td className="py-4 px-4 text-gray-400 font-medium">
                      {app.applicationDate}
                    </td>

                    {/* Application Status Dropdown */}
                    <td className="py-4 px-4">
                      <select
                        value={app.status}
                        onChange={(e) =>
                          handleStatusChange(app.id, e.target.value, app.candidateName)
                        }
                        className={`px-3 py-1 rounded-full text-[11px] font-semibold border bg-[#0a0a0f] outline-none cursor-pointer transition-all ${getStatusBadgeStyle(
                          app.status
                        )}`}
                      >
                        <option value="Pending" className="bg-[#14141f] text-amber-400">
                          Pending
                        </option>
                        <option value="Interview" className="bg-[#14141f] text-purple-300">
                          Interview
                        </option>
                        <option value="Accepted" className="bg-[#14141f] text-emerald-400">
                          Accepted
                        </option>
                        <option value="Rejected" className="bg-[#14141f] text-rose-400">
                          Rejected
                        </option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Inspect Details Button */}
                        <button
                          onClick={() => setViewingApp(app)}
                          title="View Application Details"
                          className="p-2 bg-[#0a0a0f] hover:bg-purple-500/10 border border-gray-800 hover:border-purple-500/30 text-gray-300 hover:text-purple-400 rounded-xl transition-all cursor-pointer"
                        >
                          <EyeIcon className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteApplication(app.id, app.candidateName)}
                          title="Delete Application Record"
                          className="p-2 bg-[#0a0a0f] hover:bg-rose-500/10 border border-gray-800 hover:border-rose-500/30 text-gray-400 hover:text-rose-400 rounded-xl transition-all cursor-pointer"
                        >
                          <TrashIcon className="w-3.5 h-3.5" />
                        </button>
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
      {/* VIEW APPLICATION DETAILS MODAL             */}
      {/* ========================================== */}
      {viewingApp && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl w-full max-w-lg p-6 space-y-6 shadow-2xl relative">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={viewingApp.candidateAvatar}
                  alt={viewingApp.candidateName}
                  className="w-12 h-12 rounded-full object-cover border border-gray-800"
                />
                <div>
                  <h2 className="text-base font-bold text-white">
                    {viewingApp.candidateName}
                  </h2>
                  <p className="text-xs text-purple-400 font-medium">
                    Applied for {viewingApp.jobTitle}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setViewingApp(null)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-2">
                <span className="text-gray-400 font-semibold block">Cover Note</span>
                <p className="text-gray-200 leading-relaxed">
                  {viewingApp.coverNote}
                </p>
              </div>

              {/* Application Details Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-1">
                  <span className="text-gray-500 text-[10px] uppercase font-semibold block">
                    Target Company
                  </span>
                  <p className="font-bold text-white">{viewingApp.company}</p>
                </div>

                <div className="p-3 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-1">
                  <span className="text-gray-500 text-[10px] uppercase font-semibold block">
                    Submission Date
                  </span>
                  <p className="font-bold text-white">{viewingApp.applicationDate}</p>
                </div>
              </div>

              {/* Resume External Link */}
              <div className="p-3 bg-[#0a0a0f] border border-gray-800 rounded-xl flex items-center justify-between">
                <span className="text-gray-400 font-medium">Candidate Document:</span>
                <a
                  href={viewingApp.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 font-bold inline-flex items-center gap-1"
                >
                  View Submitted Resume
                  <ExternalLinkIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end pt-3 border-t border-gray-800">
              <button
                type="button"
                onClick={() => setViewingApp(null)}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-xl cursor-pointer transition-all shadow-md"
              >
                Close Modal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


