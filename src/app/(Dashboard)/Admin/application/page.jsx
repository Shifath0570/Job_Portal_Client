
"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  FileCheck,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Trash2,
  X,
  ExternalLink,
  Loader2,
  ShieldAlert,
} from "lucide-react";


export default function Application() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("ALL");

  // Modal & Notification State
  const [viewingApp, setViewingApp] = useState(null);
  const [deletingApp, setDeletingApp] = useState(null); // Delete Confirmation Modal State
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

  // Fetch applications from backend API
  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseUrl}/api/application/all`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch applications: ${response.statusText}`);
      }

      const result = await response.json();
      const rawApps = result.data || result.applications || (Array.isArray(result) ? result : []);

      // Normalize MongoDB document structure
      const formattedApps = rawApps.map((app, idx) => ({
        id: app._id || app.id || `app-${301 + idx}`,
        candidateName: app.candidateName || app.fullName || app.applicantName || "Candidate",
        candidateEmail: app.candidateEmail || app.email || app.applicantEmail || "applicant@example.com",
        candidateAvatar: app.candidateAvatar || app.avatar || app.applicantImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        jobTitle: app.jobTitle || app.position || "Full Stack Developer",
        company: app.company || app.companyName || "Company Name",
        companyLogo: app.companyLogo || app.logo || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80",
        applicationDate: app.createdAt ? new Date(app.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) : app.applicationDate || "Recent",
        status: app.status || "Pending",
        coverNote: app.coverNote || app.coverLetter || "No cover note provided by applicant.",
        resumeUrl: app.resumeUrl || app.resume || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      }));

      setApplications(formattedApps);
    } catch (err) {
      console.error("Fetch Applications Error:", err);
      setError(err.message || "Failed to load application submissions.");
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Status Change Handler
  const handleStatusChange = (id, newStatus, candidateName) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
    showToast(`Application status for ${candidateName} updated to "${newStatus}".`);
  };

  // Open Delete Confirmation Modal
  const handleOpenDelete = (app) => {
    setDeletingApp(app);
  };

  // Confirm & Execute Delete Application Record
  const handleConfirmDelete = async () => {
    if (!deletingApp) return;
    const { id, candidateName } = deletingApp;

    try {
      const response = await fetch(`${baseUrl}/api/application/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to delete job application");
      }

      setApplications((prev) => prev.filter((app) => app.id !== id));
      showToast(`Application for ${candidateName} deleted.`);
    } catch (err) {
      console.error("Error deleting application:", err);
      alert(`Failed to delete application: ${err.message}`);
    } finally {
      setDeletingApp(null);
    }
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

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchApplications}
            disabled={loading}
            className="px-4 py-2 bg-[#14141f] hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white text-xs font-semibold rounded-xl transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? "Refreshing..." : "Reload Data"}
          </button>
          <span className="px-3.5 py-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold rounded-xl">
            {applications.length} Total Submissions
          </span>
        </div>
      </div>

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="p-4 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
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
            placeholder="Search by candidate name, job title, or company..."
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
            <option value="ALL">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Interview">Interview</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-950/40 border border-red-600/60 rounded-2xl text-red-400 text-sm text-center">
          {error}
        </div>
      )}

      {/* Applications Table / Loading State */}
      <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
        {loading ? (
          <div className="p-16 text-center flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
            <p className="text-sm text-gray-400">Loading submitted applications...</p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="p-12 text-center text-gray-500 space-y-2">
            <FileCheck className="w-10 h-10 mx-auto text-gray-600 mb-2" />
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
                          type="button"
                          onClick={() => setViewingApp(app)}
                          title="View Application Details"
                          className="p-2 bg-[#0a0a0f] hover:bg-purple-500/10 border border-gray-800 hover:border-purple-500/30 text-gray-300 hover:text-purple-400 rounded-xl transition-all cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleOpenDelete(app)}
                          title="Delete Application Record"
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
                type="button"
                onClick={() => setViewingApp(null)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
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
                  <ExternalLink className="w-3.5 h-3.5" />
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

      {/* ========================================== */}
      {/* DELETE CONFIRMATION MODAL                 */}
      {/* ========================================== */}
      {deletingApp && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl w-full max-w-sm p-6 space-y-6 shadow-2xl relative text-xs">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <ShieldAlert className="w-5 h-5" />
                Confirm Deletion
              </div>
              <button
                type="button"
                onClick={() => setDeletingApp(null)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-gray-300">
              <p>
                Are you sure you want to delete the application for <span className="font-bold text-white">{deletingApp.candidateName}</span>?
              </p>
              <p className="text-[11px] text-gray-400">
                This action is permanent and will remove the job application record from the database.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800">
              <button
                type="button"
                onClick={() => setDeletingApp(null)}
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




