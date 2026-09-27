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

const EditIcon = (props) => (
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
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
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

const PowerIcon = (props) => (
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
    <path d="M12 2v10" />
    <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
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

const MapPinIcon = (props) => (
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
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const DollarSignIcon = (props) => (
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
    <line x1="12" x2="12" y1="2" y2="22" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

// ==========================================
// Mock Jobs Data
// ==========================================

const INITIAL_JOBS = [
  {
    id: "job-101",
    title: "Senior Full Stack Developer",
    company: "Starlight Design Studio",
    companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80",
    location: "New York, NY (Remote)",
    type: "Full-Time",
    salary: "$140,000 - $170,000",
    status: "Active",
    postedDate: "Aug 01, 2026",
    applicationsCount: 48,
    description: "We are seeking a Lead Developer skilled in React, Node.js, and cloud deployments to build high-scale design tools.",
  },
  {
    id: "job-102",
    title: "Lead Product Designer",
    company: "Acme Technologies",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80",
    location: "San Francisco, CA",
    status: "Pending",
    type: "Full-Time",
    salary: "$130,000 - $160,000",
    postedDate: "Aug 06, 2026",
    applicationsCount: 0,
    description: "Lead user interface and experience initiatives across our enterprise SaaS suites.",
  },
  {
    id: "job-103",
    title: "DevOps & Cloud Engineer",
    company: "CyberPulse Labs",
    companyLogo: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=100&auto=format&fit=crop&q=80",
    location: "Austin, TX (Hybrid)",
    status: "Closed",
    type: "Contract",
    salary: "$90/hr - $110/hr",
    postedDate: "Jul 15, 2026",
    applicationsCount: 82,
    description: "Manage AWS infrastructure automation with Terraform and Kubernetes clusters.",
  },
  {
    id: "job-104",
    title: "AI Specialist & Machine Learning Researcher",
    company: "CloudVibe Tech",
    companyLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=80",
    location: "Remote",
    status: "Active",
    type: "Full-Time",
    salary: "$160,000 - $200,000",
    postedDate: "Aug 04, 2026",
    applicationsCount: 29,
    description: "Build state-of-the-art fine-tuned ML models for NLP analysis.",
  },
];

export default function ManageJobs() {
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("ALL");
  const [toastMessage, setToastMessage] = useState("");

  // Modal States
  const [viewingJob, setViewingJob] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "Full-Time",
    description: "",
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Approve Job Posting
  const handleApprove = (id, title) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, status: "Active" } : j))
    );
    showToast(`Job "${title}" approved and published!`);
  };

  // Toggle Close / Reopen Job
  const handleToggleJobStatus = (id, title, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Closed" : "Active";
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, status: newStatus } : j))
    );
    showToast(`Job "${title}" is now ${newStatus.toLowerCase()}.`);
  };

  // Delete Job Posting
  const handleDeleteJob = (id, title) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
    showToast(`Job "${title}" has been deleted.`);
  };

  // Open Edit Modal
  const handleOpenEdit = (job) => {
    setEditingJob(job);
    setEditFormData({
      title: job.title,
      company: job.company,
      location: job.location,
      salary: job.salary,
      type: job.type,
      description: job.description,
    });
  };

  // Save Edit Job
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingJob) return;

    setJobs((prev) =>
      prev.map((j) =>
        j.id === editingJob.id
          ? {
              ...j,
              title: editFormData.title,
              company: editFormData.company,
              location: editFormData.location,
              salary: editFormData.salary,
              type: editFormData.type,
              description: editFormData.description,
            }
          : j
      )
    );

    showToast(`Job "${editFormData.title}" updated.`);
    setEditingJob(null);
  };

  // Status Badge Helper
  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case "Active":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Pending":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Closed":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  // Filter Jobs Logic
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatusFilter === "ALL" || job.status === selectedStatusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen flex-1 bg-[#0a0a0f] text-white p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Manage Jobs
          </h1>
          <p className="text-gray-400 text-sm pt-1">
            Monitor, approve, modify, close, or delete job postings across the platform.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold rounded-xl">
            {jobs.length} Total Postings
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
            placeholder="Search jobs by title, company, or location..."
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
            <option value="ALL">All Postings</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending Approval</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="p-12 text-center text-gray-500 space-y-2">
            <BriefcaseIcon className="w-10 h-10 mx-auto text-gray-600 mb-2" />
            <p className="text-sm font-semibold text-white">No jobs found.</p>
            <p className="text-xs text-gray-400">Try modifying your search criteria or status filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 uppercase font-semibold tracking-wider">
                  <th className="py-3 px-4">Job Title & Company</th>
                  <th className="py-3 px-4">Type & Salary</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Applications</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/80">
                {filteredJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="hover:bg-purple-500/[0.02] transition-colors group"
                  >
                    {/* Title & Company */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={job.companyLogo}
                          alt={job.company}
                          className="w-10 h-10 rounded-xl object-cover border border-gray-800 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-white text-sm group-hover:text-purple-400 transition-colors">
                            {job.title}
                          </p>
                          <p className="text-gray-400 text-[11px] pt-0.5">
                            {job.company} • <span className="text-gray-500">{job.location}</span>
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Type & Salary */}
                    <td className="py-4 px-4">
                      <div className="space-y-0.5">
                        <p className="font-semibold text-gray-200">{job.salary}</p>
                        <span className="inline-block text-[10px] text-purple-400 font-medium">
                          {job.type}
                        </span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusBadgeStyle(
                          job.status
                        )}`}
                      >
                        {job.status}
                      </span>
                    </td>

                    {/* Applications Count */}
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 bg-[#0a0a0f] border border-gray-800 text-gray-300 font-semibold rounded-lg">
                        {job.applicationsCount} Applicants
                      </span>
                    </td>

                    {/* Action Controls */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View Job Details Button */}
                        <button
                          onClick={() => setViewingJob(job)}
                          title="View Job Details"
                          className="p-2 bg-[#0a0a0f] hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white rounded-xl transition-all cursor-pointer"
                        >
                          <EyeIcon className="w-3.5 h-3.5" />
                        </button>

                        {/* Approve Button (if pending) */}
                        {job.status === "Pending" && (
                          <button
                            onClick={() => handleApprove(job.id, job.title)}
                            title="Approve Job Posting"
                            className="p-2 bg-[#0a0a0f] hover:bg-emerald-500/10 border border-gray-800 hover:border-emerald-500/30 text-emerald-400 rounded-xl transition-all cursor-pointer"
                          >
                            <CheckCircleIcon className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Edit Job Button */}
                        <button
                          onClick={() => handleOpenEdit(job)}
                          title="Edit Job Information"
                          className="p-2 bg-[#0a0a0f] hover:bg-purple-500/10 border border-gray-800 hover:border-purple-500/30 text-gray-300 hover:text-purple-400 rounded-xl transition-all cursor-pointer"
                        >
                          <EditIcon className="w-3.5 h-3.5" />
                        </button>

                        {/* Close / Reopen Toggle Button */}
                        {job.status !== "Pending" && (
                          <button
                            onClick={() => handleToggleJobStatus(job.id, job.title, job.status)}
                            title={job.status === "Active" ? "Close Job Posting" : "Reopen Job Posting"}
                            className={`p-2 bg-[#0a0a0f] border rounded-xl transition-all cursor-pointer ${
                              job.status === "Active"
                                ? "border-gray-800 text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/30"
                                : "border-gray-800 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/30"
                            }`}
                          >
                            <PowerIcon className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Delete Job Button */}
                        <button
                          onClick={() => handleDeleteJob(job.id, job.title)}
                          title="Delete Job Posting"
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
      {/* VIEW JOB DETAILS MODAL                     */}
      {/* ========================================== */}
      {viewingJob && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl w-full max-w-lg p-6 space-y-6 shadow-2xl relative">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={viewingJob.companyLogo}
                  alt={viewingJob.company}
                  className="w-12 h-12 rounded-xl object-cover border border-gray-800"
                />
                <div>
                  <h2 className="text-base font-bold text-white">
                    {viewingJob.title}
                  </h2>
                  <p className="text-xs text-purple-400 font-medium">
                    {viewingJob.company}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setViewingJob(null)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-2">
                <span className="text-gray-400 font-semibold block">Job Overview & Requirements</span>
                <p className="text-gray-200 leading-relaxed">
                  {viewingJob.description}
                </p>
              </div>

              {/* Grid Specs */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-1">
                  <span className="text-gray-500 text-[10px] uppercase font-semibold flex items-center gap-1">
                    <DollarSignIcon className="w-3 h-3 text-purple-400" />
                    Salary Range
                  </span>
                  <p className="font-bold text-white truncate">{viewingJob.salary}</p>
                </div>

                <div className="p-3 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-1">
                  <span className="text-gray-500 text-[10px] uppercase font-semibold flex items-center gap-1">
                    <MapPinIcon className="w-3 h-3 text-purple-400" />
                    Location
                  </span>
                  <p className="font-bold text-white">{viewingJob.location}</p>
                </div>

                <div className="p-3 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-1">
                  <span className="text-gray-500 text-[10px] uppercase font-semibold block">
                    Job Type
                  </span>
                  <p className="font-bold text-white">{viewingJob.type}</p>
                </div>

                <div className="p-3 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-1">
                  <span className="text-gray-500 text-[10px] uppercase font-semibold block">
                    Posted Date
                  </span>
                  <p className="font-bold text-white">{viewingJob.postedDate}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end pt-3 border-t border-gray-800">
              <button
                type="button"
                onClick={() => setViewingJob(null)}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-xl cursor-pointer transition-all shadow-md"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* EDIT JOB MODAL                             */}
      {/* ========================================== */}
      {editingJob && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl w-full max-w-md p-6 space-y-6 shadow-2xl relative">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div>
                <h2 className="text-base font-bold text-white">
                  Edit Job Posting
                </h2>
                <p className="text-xs text-purple-400">ID: {editingJob.id}</p>
              </div>

              <button
                onClick={() => setEditingJob(null)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveEdit} className="space-y-3.5 text-xs">
              <div className="space-y-1.5">
                <label className="text-gray-300 font-semibold block">Job Title</label>
                <input
                  type="text"
                  value={editFormData.title}
                  onChange={(e) =>
                    setEditFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  required
                  className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-gray-300 font-semibold block">Company</label>
                  <input
                    type="text"
                    value={editFormData.company}
                    onChange={(e) =>
                      setEditFormData((prev) => ({ ...prev, company: e.target.value }))
                    }
                    required
                    className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-300 font-semibold block">Job Type</label>
                  <select
                    value={editFormData.type}
                    onChange={(e) =>
                      setEditFormData((prev) => ({ ...prev, type: e.target.value }))
                    }
                    className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none cursor-pointer"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-gray-300 font-semibold block">Location</label>
                  <input
                    type="text"
                    value={editFormData.location}
                    onChange={(e) =>
                      setEditFormData((prev) => ({ ...prev, location: e.target.value }))
                    }
                    required
                    className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-300 font-semibold block">Salary Range</label>
                  <input
                    type="text"
                    value={editFormData.salary}
                    onChange={(e) =>
                      setEditFormData((prev) => ({ ...prev, salary: e.target.value }))
                    }
                    required
                    className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-300 font-semibold block">Description</label>
                <textarea
                  rows={3}
                  value={editFormData.description}
                  onChange={(e) =>
                    setEditFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  required
                  className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setEditingJob(null)}
                  className="px-4 py-2 bg-[#0a0a0f] hover:bg-gray-800 border border-gray-800 text-gray-300 rounded-xl transition-all cursor-pointer font-medium"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-md cursor-pointer transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}