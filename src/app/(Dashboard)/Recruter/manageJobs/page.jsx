"use client";

import React, { useState } from "react";

// ==========================================
// Inline Custom SVG Icons
// ==========================================

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
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
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

const LockIcon = (props) => (
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
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const UnlockIcon = (props) => (
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
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 9.9-1" />
  </svg>
);

const RefreshIcon = (props) => (
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
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M16 16h5v5" />
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

// ==========================================
// Baseline Mock Data
// ==========================================

const INITIAL_JOBS = [
  {
    id: "job-101",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote / San Francisco",
    type: "Full-Time",
    applicationsCount: 42,
    status: "Active",
    postedDate: "Aug 01, 2026",
    description: "Looking for a React and Next.js expert to build responsive dashboards.",
  },
  {
    id: "job-102",
    title: "UI/UX Product Designer",
    department: "Design",
    location: "New York, NY",
    type: "Full-Time",
    applicationsCount: 28,
    status: "Active",
    postedDate: "Jul 28, 2026",
    description: "Lead end-to-end user research and high-fidelity Figma designs.",
  },
  {
    id: "job-103",
    title: "Backend Node.js Architect",
    department: "Engineering",
    location: "Remote",
    type: "Contract",
    applicationsCount: 65,
    status: "Closed",
    postedDate: "Jun 15, 2026",
    description: "Build microservices and GraphQL API endpoints for scalability.",
  },
];

export default function ManageJobs() {
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");

  // Fetch updated jobs list from backend without useEffect
  const handleFetchJobs = async () => {
    setIsFetching(true);
    try {
      const response = await fetch("/api/recruiter/jobs");
      if (!response.ok) throw new Error("Failed to fetch jobs");
      const data = await response.json();
      if (Array.isArray(data)) setJobs(data);
    } catch (error) {
      console.warn("Using current job listings:", error);
    } finally {
      setIsFetching(false);
    }
  };

  // Toggle Job Status (Close / Reopen)
  const handleToggleStatus = (jobId) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId
          ? { ...job, status: job.status === "Active" ? "Closed" : "Active" }
          : job
      )
    );
  };

  // Delete Job
  const handleDeleteJob = (jobId) => {
    if (confirm("Are you sure you want to delete this job posting?")) {
      setJobs((prev) => prev.filter((job) => job.id !== jobId));
    }
  };

  // Save Edited Job
  const handleSaveEdit = (e) => {
    e.preventDefault();
    setJobs((prev) =>
      prev.map((job) => (job.id === editingJob.id ? editingJob : job))
    );
    setEditingJob(null);
  };

  const filteredJobs = jobs.filter((job) => {
    if (filterStatus === "Active") return job.status === "Active";
    if (filterStatus === "Closed") return job.status === "Closed";
    return true;
  });

  return (
    <div className="min-h-screen flex-1 bg-[#0a0a0f] text-white p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Manage Jobs
          </h1>
          <p className="text-gray-400 text-sm pt-1">
            View, edit, close, reopen, or remove posted job listings.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleFetchJobs}
            disabled={isFetching}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#14141f] hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white text-sm font-medium rounded-xl transition-all disabled:opacity-50 cursor-pointer"
          >
            <RefreshIcon className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} />
            {isFetching ? "Syncing..." : "Reload Jobs"}
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-800/80 pb-4">
        {["All", "Active", "Closed"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filterStatus === status
                ? "bg-purple-600/20 text-purple-400 border border-purple-500/30"
                : "bg-[#14141f] text-gray-400 border border-gray-800 hover:text-white"
            }`}
          >
            {status} Jobs
          </button>
        ))}
      </div>

      {/* Jobs Table / List Container */}
      <div className="bg-[#14141f] border border-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-800 bg-[#0a0a0f]/50 text-gray-400 uppercase text-xs font-semibold tracking-wider">
                <th className="py-4 px-6">Job Title</th>
                <th className="py-4 px-6">Department</th>
                <th className="py-4 px-6">Applications</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/80">
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    No job listings found for this filter.
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="hover:bg-purple-500/[0.02] transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="font-semibold text-white">{job.title}</div>
                      <div className="text-xs text-gray-400">
                        {job.location} • {job.type}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-300">{job.department}</td>
                    <td className="py-4 px-6 font-medium text-purple-400">
                      {job.applicationsCount} applicants
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                          job.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-gray-500/10 text-gray-400 border-gray-500/20"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      {/* Action: View Job */}
                      <button
                        onClick={() => setSelectedJob(job)}
                        title="View Job Details"
                        className="p-2 bg-[#0a0a0f] border border-gray-800 hover:border-gray-700 text-gray-300 hover:text-white rounded-lg transition-all cursor-pointer"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>

                      {/* Action: Edit Job */}
                      <button
                        onClick={() => setEditingJob(job)}
                        title="Edit Job"
                        className="p-2 bg-[#0a0a0f] border border-gray-800 hover:border-purple-500/40 text-purple-400 rounded-lg transition-all cursor-pointer"
                      >
                        <EditIcon className="w-4 h-4" />
                      </button>

                      {/* Action: Close / Reopen Job */}
                      <button
                        onClick={() => handleToggleStatus(job.id)}
                        title={job.status === "Active" ? "Close Job" : "Reopen Job"}
                        className={`p-2 bg-[#0a0a0f] border border-gray-800 rounded-lg transition-all cursor-pointer ${
                          job.status === "Active"
                            ? "hover:border-amber-500/40 text-amber-400"
                            : "hover:border-emerald-500/40 text-emerald-400"
                        }`}
                      >
                        {job.status === "Active" ? (
                          <LockIcon className="w-4 h-4" />
                        ) : (
                          <UnlockIcon className="w-4 h-4" />
                        )}
                      </button>

                      {/* Action: Delete Job */}
                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        title="Delete Job"
                        className="p-2 bg-[#0a0a0f] border border-gray-800 hover:border-rose-500/40 text-rose-400 rounded-lg transition-all cursor-pointer"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Job Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <h3 className="text-lg font-bold text-white">{selectedJob.title}</h3>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-gray-400 hover:text-white"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2 text-sm text-gray-300">
              <p><strong className="text-gray-400">Department:</strong> {selectedJob.department}</p>
              <p><strong className="text-gray-400">Location:</strong> {selectedJob.location}</p>
              <p><strong className="text-gray-400">Type:</strong> {selectedJob.type}</p>
              <p><strong className="text-gray-400">Applications:</strong> {selectedJob.applicationsCount}</p>
              <p><strong className="text-gray-400">Posted On:</strong> {selectedJob.postedDate}</p>
              <p className="pt-2"><strong className="text-gray-400">Description:</strong></p>
              <p className="bg-[#0a0a0f] p-3 rounded-xl border border-gray-800 text-xs text-gray-400 leading-relaxed">
                {selectedJob.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Edit Job Modal */}
      {editingJob && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveEdit}
            className="bg-[#14141f] border border-gray-800 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl relative"
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <h3 className="text-lg font-bold text-white">Edit Job Details</h3>
              <button
                type="button"
                onClick={() => setEditingJob(null)}
                className="text-gray-400 hover:text-white"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-400">Job Title</label>
                <input
                  type="text"
                  value={editingJob.title}
                  onChange={(e) =>
                    setEditingJob({ ...editingJob, title: e.target.value })
                  }
                  className="w-full mt-1 px-3 py-2 bg-[#0a0a0f] border border-gray-800 text-white text-sm rounded-xl outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-400">Department</label>
                <input
                  type="text"
                  value={editingJob.department}
                  onChange={(e) =>
                    setEditingJob({ ...editingJob, department: e.target.value })
                  }
                  className="w-full mt-1 px-3 py-2 bg-[#0a0a0f] border border-gray-800 text-white text-sm rounded-xl outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-400">Location</label>
                <input
                  type="text"
                  value={editingJob.location}
                  onChange={(e) =>
                    setEditingJob({ ...editingJob, location: e.target.value })
                  }
                  className="w-full mt-1 px-3 py-2 bg-[#0a0a0f] border border-gray-800 text-white text-sm rounded-xl outline-none focus:border-purple-500"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setEditingJob(null)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-xl transition-all shadow-md cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}