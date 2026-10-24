
"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Users,
  Search,
  Filter,
  Eye,
  FileText,
  ShieldAlert,
  Trash2,
  CheckCircle2,
  X,
  MapPin,
  ExternalLink,
  Loader2,
} from "lucide-react";

export default function ManageCandidates() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("ALL");

  // Modals state
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [resumeCandidate, setResumeCandidate] = useState(null);
  const [deletingCandidate, setDeletingCandidate] = useState(null); // Delete Confirmation Modal State
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

  // Fetch job seekers from backend API
  const fetchSeekers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseUrl}/api/seeker/all`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch job seekers: ${response.statusText}`);
      }

      const result = await response.json();
      const rawSeekers = result.data || result.seekers || (Array.isArray(result) ? result : []);

      // Normalize MongoDB fields to frontend expected structure
      const formattedCandidates = rawSeekers.map((seek, idx) => ({
        id: seek._id || seek.id || `cand-${101 + idx}`,
        name: seek.fullName || seek.name || "Candidate Name",
        title: seek.jobTitle || seek.title || "Full Stack Developer",
        email: seek.email || "candidate@example.com",
        phone: seek.phoneNumber || seek.phone || "+1 (555) 000-0000",
        location: seek.location || seek.address || "Remote",
        status: seek.status || "Active",
        appliedCount: seek.appliedCount || seek.applications?.length || 0,
        skills: seek.skills || ["JavaScript", "React", "Node.js"],
        bio: seek.bio || seek.description || "Passionate professional eager to contribute to innovative tech teams.",
        resumeUrl: seek.resumeUrl || seek.resume || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        resumeName: seek.resumeName || "Candidate_Resume.pdf",
        joinedDate: seek.createdAt ? new Date(seek.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) : "Recent",
        avatar: seek.avatar || seek.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      }));

      setCandidates(formattedCandidates);
    } catch (err) {
      console.error("Fetch Seekers Error:", err);
      setError(err.message || "Failed to load job seeker profiles.");
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  useEffect(() => {
    fetchSeekers();
  }, [fetchSeekers]);

  // Toggle Suspend / Activate Status
  const handleToggleSuspend = (id, name, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Suspended" : "Active";
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
    showToast(`Candidate ${name} account set to ${newStatus.toLowerCase()}.`);
  };

  // Open Delete Confirmation Modal
  const handleOpenDelete = (candidate) => {
    setDeletingCandidate(candidate);
  };

  // Confirm & Execute Delete Candidate
  const handleConfirmDelete = async () => {
    if (!deletingCandidate) return;
    const { id, name } = deletingCandidate;

    try {
      const response = await fetch(`${baseUrl}/api/seeker/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to delete job seeker profile");
      }

      setCandidates((prev) => prev.filter((c) => c.id !== id));
      showToast(`Candidate ${name} removed from system.`);
    } catch (err) {
      console.error("Error deleting candidate:", err);
      alert(`Failed to delete candidate: ${err.message}`);
    } finally {
      setDeletingCandidate(null);
    }
  };

  // Filter Candidates
  const filteredCandidates = candidates.filter((cand) => {
    const matchesSearch =
      cand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cand.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cand.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatusFilter === "ALL" || cand.status === selectedStatusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen flex-1 bg-[#0a0a0f] text-white p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Manage Candidates
          </h1>
          <p className="text-gray-400 text-sm pt-1">
            Review registered candidates, inspect resume documents, and handle account privileges.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchSeekers}
            disabled={loading}
            className="px-4 py-2 bg-[#14141f] hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white text-xs font-semibold rounded-xl transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? "Refreshing..." : "Reload Data"}
          </button>
          <span className="px-3.5 py-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold rounded-xl">
            {candidates.length} Registered Candidates
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
            placeholder="Search candidates by name, email, or job title..."
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
            <option value="ALL">All Candidates</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-950/40 border border-red-600/60 rounded-2xl text-red-400 text-sm text-center">
          {error}
        </div>
      )}

      {/* Candidates Table / Loading State */}
      <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
        {loading ? (
          <div className="p-16 text-center flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
            <p className="text-sm text-gray-400">Loading registered job seekers...</p>
          </div>
        ) : filteredCandidates.length === 0 ? (
          <div className="p-12 text-center text-gray-500 space-y-2">
            <Users className="w-10 h-10 mx-auto text-gray-600 mb-2" />
            <p className="text-sm font-semibold text-white">No candidates found.</p>
            <p className="text-xs text-gray-400">Try modifying your search criteria or filter options.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 uppercase font-semibold tracking-wider">
                  <th className="py-3 px-4">Candidate</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Applications</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/80">
                {filteredCandidates.map((cand) => (
                  <tr
                    key={cand.id}
                    className="hover:bg-purple-500/[0.02] transition-colors group"
                  >
                    {/* Candidate Details */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={cand.avatar}
                          alt={cand.name}
                          className="w-10 h-10 rounded-full object-cover border border-gray-800 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-white text-sm group-hover:text-purple-400 transition-colors">
                            {cand.name}
                          </p>
                          <p className="text-purple-400 text-[11px] font-medium pt-0.5">
                            {cand.title} <span className="text-gray-400">({cand.email})</span>
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-4 px-4 text-gray-300 font-medium">
                      {cand.location}
                    </td>

                    {/* Applications Submitted Badge */}
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 bg-[#0a0a0f] border border-gray-800 text-gray-300 font-semibold rounded-lg">
                        {cand.appliedCount} Jobs
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                          cand.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                        }`}
                      >
                        {cand.status}
                      </span>
                    </td>

                    {/* Action Controls */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View Candidate Profile Modal Button */}
                        <button
                          type="button"
                          onClick={() => setSelectedCandidate(cand)}
                          title="View Candidate Profile"
                          className="p-2 bg-[#0a0a0f] hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white rounded-xl transition-all cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* View Resume Button */}
                        <button
                          type="button"
                          onClick={() => setResumeCandidate(cand)}
                          title="View Candidate Resume"
                          className="p-2 bg-[#0a0a0f] hover:bg-purple-500/10 border border-gray-800 hover:border-purple-500/30 text-gray-300 hover:text-purple-400 rounded-xl transition-all cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>

                        {/* Suspend / Activate Button */}
                        <button
                          type="button"
                          onClick={() => handleToggleSuspend(cand.id, cand.name, cand.status)}
                          title={cand.status === "Active" ? "Suspend Candidate" : "Activate Candidate"}
                          className={`p-2 bg-[#0a0a0f] border rounded-xl transition-all cursor-pointer ${
                            cand.status === "Active"
                              ? "border-gray-800 text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/30"
                              : "border-gray-800 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/30"
                          }`}
                        >
                          <ShieldAlert className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Candidate Button */}
                        <button
                          type="button"
                          onClick={() => handleOpenDelete(cand)}
                          title="Delete Candidate Account"
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
      {/* VIEW CANDIDATE PROFILE MODAL               */}
      {/* ========================================== */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl w-full max-w-lg p-6 space-y-6 shadow-2xl relative">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={selectedCandidate.avatar}
                  alt={selectedCandidate.name}
                  className="w-12 h-12 rounded-full object-cover border border-gray-800"
                />
                <div>
                  <h2 className="text-base font-bold text-white">
                    {selectedCandidate.name}
                  </h2>
                  <p className="text-xs text-purple-400 font-medium">
                    {selectedCandidate.title}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCandidate(null)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-2">
                <span className="text-gray-400 font-semibold block">About Candidate</span>
                <p className="text-gray-200 leading-relaxed">
                  {selectedCandidate.bio}
                </p>
              </div>

              {/* Grid Metadata */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-1">
                  <span className="text-gray-500 text-[10px] uppercase font-semibold block">
                    Email Address
                  </span>
                  <p className="font-bold text-white truncate">{selectedCandidate.email}</p>
                </div>

                <div className="p-3 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-1">
                  <span className="text-gray-500 text-[10px] uppercase font-semibold block">
                    Phone Contact
                  </span>
                  <p className="font-bold text-white">{selectedCandidate.phone}</p>
                </div>

                <div className="p-3 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-1">
                  <span className="text-gray-500 text-[10px] uppercase font-semibold flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-purple-400" />
                    Location
                  </span>
                  <p className="font-bold text-white">{selectedCandidate.location}</p>
                </div>

                <div className="p-3 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-1">
                  <span className="text-gray-500 text-[10px] uppercase font-semibold block">
                    Joined Date
                  </span>
                  <p className="font-bold text-white">{selectedCandidate.joinedDate}</p>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="p-3 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-2">
                <span className="text-gray-400 font-semibold block">Top Skillsets</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCandidate.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[11px] font-medium rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end pt-3 border-t border-gray-800">
              <button
                type="button"
                onClick={() => setSelectedCandidate(null)}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-xl cursor-pointer transition-all shadow-md"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* VIEW CANDIDATE RESUME MODAL                */}
      {/* ========================================== */}
      {resumeCandidate && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl w-full max-w-2xl p-6 space-y-6 shadow-2xl relative">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">
                    {resumeCandidate.name} Resume
                  </h2>
                  <p className="text-xs text-gray-400">{resumeCandidate.resumeName}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setResumeCandidate(null)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* PDF Mock Viewer / Placeholder */}
            <div className="bg-[#0a0a0f] border border-gray-800 rounded-xl p-8 text-center space-y-4">
              <FileText className="w-12 h-12 mx-auto text-purple-400" />
              <div className="space-y-1">
                <p className="text-sm font-bold text-white">{resumeCandidate.resumeName}</p>
                <p className="text-xs text-gray-400">PDF Document</p>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <a
                  href={resumeCandidate.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md cursor-pointer transition-all inline-flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Document in New Tab
                </a>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end pt-2 border-t border-gray-800">
              <button
                type="button"
                onClick={() => setResumeCandidate(null)}
                className="px-5 py-2 bg-[#0a0a0f] hover:bg-gray-800 border border-gray-800 text-gray-300 text-xs font-semibold rounded-xl cursor-pointer transition-all"
              >
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* DELETE CONFIRMATION MODAL                 */}
      {/* ========================================== */}
      {deletingCandidate && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl w-full max-w-sm p-6 space-y-6 shadow-2xl relative text-xs">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <ShieldAlert className="w-5 h-5" />
                Confirm Deletion
              </div>
              <button
                type="button"
                onClick={() => setDeletingCandidate(null)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-gray-300">
              <p>
                Are you sure you want to delete candidate <span className="font-bold text-white">{deletingCandidate.name}</span>?
              </p>
              <p className="text-[11px] text-gray-400">
                This action is permanent and will remove the job seeker profile and associated records from the database.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800">
              <button
                type="button"
                onClick={() => setDeletingCandidate(null)}
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



