"use client";

import React, { useState } from "react";

// ==========================================
// Inline Custom SVG Icons
// ==========================================

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
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

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
// Mock Candidates Data
// ==========================================

const INITIAL_CANDIDATES = [
  {
    id: "cand-101",
    name: "Alex Rivera",
    title: "Senior Full Stack Engineer",
    email: "alex.rivera@example.com",
    phone: "+1 (555) 019-2834",
    location: "San Francisco, CA",
    status: "Active",
    appliedCount: 12,
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    bio: "Passionate engineer with 6+ years of experience crafting high-throughput web applications and cloud architectures.",
    resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    resumeName: "Alex_Rivera_Software_Engineer_CV.pdf",
    joinedDate: "Jan 15, 2026",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: "cand-102",
    name: "Marcus Vance",
    title: "UI/UX Product Designer",
    email: "m.vance@devmail.org",
    phone: "+1 (555) 014-8821",
    location: "Austin, TX",
    status: "Active",
    appliedCount: 8,
    skills: ["Figma", "Design Systems", "Prototyping", "User Research", "CSS"],
    bio: "Product designer focused on building intuitive, high-conversion design systems for enterprise SaaS platforms.",
    resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    resumeName: "Marcus_Vance_Product_Designer_Resume.pdf",
    joinedDate: "Apr 20, 2026",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: "cand-103",
    name: "Sophia Chen",
    title: "DevOps & Cloud Architect",
    email: "sophia.chen@cloudlab.io",
    phone: "+1 (555) 017-3390",
    location: "Seattle, WA",
    status: "Suspended",
    appliedCount: 4,
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
    bio: "Cloud infrastructure developer specialized in Kubernetes cluster management and zero-downtime deployment pipelines.",
    resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    resumeName: "Sophia_Chen_DevOps_Specialist.pdf",
    joinedDate: "May 11, 2026",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: "cand-104",
    name: "Jordan Lee",
    title: "Data Scientist & AI Specialist",
    email: "j.lee@datascience.net",
    phone: "+1 (555) 012-9012",
    location: "Chicago, IL",
    status: "Active",
    appliedCount: 15,
    skills: ["Python", "PyTorch", "SQL", "Pandas", "Scikit-Learn"],
    bio: "Data scientist developing predictive analytics models and natural language processing pipelines for fintech applications.",
    resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    resumeName: "Jordan_Lee_Data_Science_CV.pdf",
    joinedDate: "Jun 02, 2026",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
  },
];

export default function ManageCandidates() {
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("ALL");

  // Modals state
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [resumeCandidate, setResumeCandidate] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Toggle Suspend / Activate Status
  const handleToggleSuspend = (id, name, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Suspended" : "Active";
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
    showToast(`Candidate ${name} account set to ${newStatus.toLowerCase()}.`);
  };

  // Delete Candidate Account
  const handleDeleteCandidate = (id, name) => {
    setCandidates((prev) => prev.filter((c) => c.id !== id));
    showToast(`Candidate ${name} removed from system.`);
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

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold rounded-xl">
            {candidates.length} Registered Candidates
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
            placeholder="Search candidates by name, email, or job title..."
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
            <option value="ALL">All Candidates</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Candidates Table */}
      <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
        {filteredCandidates.length === 0 ? (
          <div className="p-12 text-center text-gray-500 space-y-2">
            <UsersIcon className="w-10 h-10 mx-auto text-gray-600 mb-2" />
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
                            {cand.title} • <span className="text-gray-400">{cand.email}</span>
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
                          onClick={() => setSelectedCandidate(cand)}
                          title="View Candidate Profile"
                          className="p-2 bg-[#0a0a0f] hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white rounded-xl transition-all cursor-pointer"
                        >
                          <EyeIcon className="w-3.5 h-3.5" />
                        </button>

                        {/* View Resume Button */}
                        <button
                          onClick={() => setResumeCandidate(cand)}
                          title="View Candidate Resume"
                          className="p-2 bg-[#0a0a0f] hover:bg-purple-500/10 border border-gray-800 hover:border-purple-500/30 text-gray-300 hover:text-purple-400 rounded-xl transition-all cursor-pointer"
                        >
                          <FileTextIcon className="w-3.5 h-3.5" />
                        </button>

                        {/* Suspend / Activate Button */}
                        <button
                          onClick={() => handleToggleSuspend(cand.id, cand.name, cand.status)}
                          title={cand.status === "Active" ? "Suspend Candidate" : "Activate Candidate"}
                          className={`p-2 bg-[#0a0a0f] border rounded-xl transition-all cursor-pointer ${
                            cand.status === "Active"
                              ? "border-gray-800 text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/30"
                              : "border-gray-800 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/30"
                          }`}
                        >
                          <ShieldAlertIcon className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Candidate Button */}
                        <button
                          onClick={() => handleDeleteCandidate(cand.id, cand.name)}
                          title="Delete Candidate Account"
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
                onClick={() => setSelectedCandidate(null)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <CloseIcon className="w-5 h-5" />
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
                    <MapPinIcon className="w-3 h-3 text-purple-400" />
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
                  <FileTextIcon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">
                    {resumeCandidate.name}s Resume
                  </h2>
                  <p className="text-xs text-gray-400">{resumeCandidate.resumeName}</p>
                </div>
              </div>

              <button
                onClick={() => setResumeCandidate(null)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            {/* PDF Mock Viewer / Placeholder */}
            <div className="bg-[#0a0a0f] border border-gray-800 rounded-xl p-8 text-center space-y-4">
              <FileTextIcon className="w-12 h-12 mx-auto text-purple-400" />
              <div className="space-y-1">
                <p className="text-sm font-bold text-white">{resumeCandidate.resumeName}</p>
                <p className="text-xs text-gray-400">PDF Document • 1.2 MB</p>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <a
                  href={resumeCandidate.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md cursor-pointer transition-all inline-flex items-center gap-2"
                >
                  <ExternalLinkIcon className="w-4 h-4" />
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
    </div>
  );
}