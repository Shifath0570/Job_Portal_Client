
"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Filter,
  Briefcase,
  Eye,
  CheckCircle,
  Trash2,
  X,
  DollarSign,
  MapPin,
  Loader2,
  ShieldAlert,
} from "lucide-react";

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("ALL");
  const [toastMessage, setToastMessage] = useState("");

  // Modal States
  const [viewingJob, setViewingJob] = useState(null);
  const [deletingJob, setDeletingJob] = useState(null); // Delete Confirmation Modal State

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

  // Fetch jobs from backend API
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseUrl}/api/jobs`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch jobs: ${response.statusText}`);
      }

      const result = await response.json();
      const rawJobs = result.jobs || result.data || (Array.isArray(result) ? result : []);

      // Normalize MongoDB fields
      const formattedJobs = rawJobs.map((job, idx) => ({
        id: job._id || job.id || `job-${101 + idx}`,
        title: job.jobTitle || job.title || "Untitled Position",
        company: job.companyName || job.company || "Company Name",
        companyLogo: job.companyLogo || job.logo || "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150&auto=format&fit=crop&q=80",
        location: job.location || job.address || "Remote",
        type: job.jobType || job.type || "Full-Time",
        salary: job.salary || job.salaryRange || "$100,000 - $130,000",
        status: job.status || "Active",
        postedDate: job.createdAt ? new Date(job.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) : "Recent",
        applicationsCount: job.applicationsCount || job.applicants?.length || 0,
        description: job.description || job.jobDescription || "No job overview provided.",
      }));

      setJobs(formattedJobs);
    } catch (err) {
      console.error("Fetch Jobs Error:", err);
      setError(err.message || "Failed to load job listings.");
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Approve Job Posting
  const handleApprove = (id, title) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, status: "Active" } : j))
    );
    showToast(`Job "${title}" approved and published!`);
  };

  // Open Delete Confirmation Modal
  const handleOpenDelete = (job) => {
    setDeletingJob(job);
  };

  // Confirm & Execute Delete Job Posting
  const handleConfirmDelete = async () => {
    if (!deletingJob) return;
    const { id, title } = deletingJob;

    try {
      const response = await fetch(`${baseUrl}/api/jobs/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to delete job");
      }

      setJobs((prev) => prev.filter((j) => j.id !== id));
      showToast(`Job "${title}" has been deleted.`);
    } catch (err) {
      console.error("Error deleting job:", err);
      alert(`Failed to delete job: ${err.message}`);
    } finally {
      setDeletingJob(null);
    }
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
            Monitor, approve, or delete job postings across the platform.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchJobs}
            disabled={loading}
            className="px-4 py-2 bg-[#14141f] hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white text-xs font-semibold rounded-xl transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? "Refreshing..." : "Reload Data"}
          </button>
          <span className="px-3.5 py-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold rounded-xl">
            {jobs.length} Total Postings
          </span>
        </div>
      </div>

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="p-4 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold rounded-xl flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-purple-400 shrink-0" />
          {toastMessage}
        </div>
      )}

      {/* Search & Filter Controls */}
      <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Field */}
        <div className="relative w-full sm:flex-1">
          <Search className="w-4 h-4 absolute left-4 top-3 text-gray-500" />
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
          <Filter className="w-4 h-4 text-purple-400 shrink-0" />
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

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-950/40 border border-red-600/60 rounded-2xl text-red-400 text-sm text-center">
          {error}
        </div>
      )}

      {/* Jobs Table / Loading State */}
      <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
        {loading ? (
          <div className="p-16 text-center flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
            <p className="text-sm text-gray-400">Loading job listings...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="p-12 text-center text-gray-500 space-y-2">
            <Briefcase className="w-10 h-10 mx-auto text-gray-600 mb-2" />
            <p className="text-sm font-semibold text-white">No jobs found.</p>
            <p className="text-xs text-gray-400">
              Try modifying your search criteria or status filter.
            </p>
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
                            {job.company} •{" "}
                            <span className="text-gray-500">{job.location}</span>
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Type & Salary */}
                    <td className="py-4 px-4">
                      <div className="space-y-0.5">
                        <p className="font-semibold text-gray-200">
                          {job.salary}
                        </p>
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
                          type="button"
                          onClick={() => setViewingJob(job)}
                          title="View Job Details"
                          className="p-2 bg-[#0a0a0f] hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white rounded-xl transition-all cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Approve Button (if pending) */}
                        {job.status === "Pending" && (
                          <button
                            type="button"
                            onClick={() => handleApprove(job.id, job.title)}
                            title="Approve Job Posting"
                            className="p-2 bg-[#0a0a0f] hover:bg-emerald-500/10 border border-gray-800 hover:border-emerald-500/30 text-emerald-400 rounded-xl transition-all cursor-pointer"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Delete Job Button */}
                        <button
                          type="button"
                          onClick={() => handleOpenDelete(job)}
                          title="Delete Job Posting"
                          className="p-2 bg-[#0a0a0f] hover:bg-rose-500/10 border border-gray-800 hover:border-rose-500/30 text-gray-400 hover:text-rose-400 rounded-xl transition-all cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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
                type="button"
                onClick={() => setViewingJob(null)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-2">
                <span className="text-gray-400 font-semibold block">
                  Job Overview & Requirements
                </span>
                <p className="text-gray-200 leading-relaxed">
                  {viewingJob.description}
                </p>
              </div>

              {/* Grid Specs */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-1">
                  <span className="text-gray-500 text-[10px] uppercase font-semibold flex items-center gap-1">
                    <DollarSign className="w-3 h-3 text-purple-400" />
                    Salary Range
                  </span>
                  <p className="font-bold text-white truncate">
                    {viewingJob.salary}
                  </p>
                </div>

                <div className="p-3 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-1">
                  <span className="text-gray-500 text-[10px] uppercase font-semibold flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-purple-400" />
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
      {/* DELETE CONFIRMATION MODAL                 */}
      {/* ========================================== */}
      {deletingJob && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl w-full max-w-sm p-6 space-y-6 shadow-2xl relative text-xs">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <ShieldAlert className="w-5 h-5" />
                Confirm Deletion
              </div>
              <button
                type="button"
                onClick={() => setDeletingJob(null)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-gray-300">
              <p>
                Are you sure you want to delete job <span className="font-bold text-white">"{deletingJob.title}"</span>?
              </p>
              <p className="text-[11px] text-gray-400">
                This action is permanent and will remove the job posting and its associated records from the database.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800">
              <button
                type="button"
                onClick={() => setDeletingJob(null)}
                className="px-4 py-2 bg-[#0a0a0f] hover:bg-gray-800 border border-gray-800 text-gray-300 rounded-xl transition-all cursor-pointer font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-xl shadow-md cursor-pointer transition-all"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



