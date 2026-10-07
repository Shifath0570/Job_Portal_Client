

"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  ShieldAlert,
  Trash2,
  Eye,
  Building,
  X,
  ExternalLink,
} from "lucide-react";

const INITIAL_RECRUITERS = [
  {
    id: "rec-101",
    name: "Sarah Jenkins",
    title: "Lead Talent Partner",
    email: "sarah.j@starlight.design",
    status: "Verified",
    company: {
      name: "Starlight Design Studio",
      website: "https://starlight.design",
      industry: "Design & Agency",
      size: "50-200 Employees",
      location: "New York, NY",
      description: "Premier product design studio serving Fortune 500 tech startups.",
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80",
    },
    joinedDate: "Feb 02, 2026",
  },
  {
    id: "rec-102",
    name: "David Miller",
    title: "Director of Technical Recruiting",
    email: "d.miller@acmetech.io",
    status: "Pending",
    company: {
      name: "Acme Technologies",
      website: "https://acmetech.io",
      industry: "Software & SaaS",
      size: "500-1000 Employees",
      location: "San Francisco, CA",
      description: "Cloud infrastructure and AI toolings software enterprise.",
      logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80",
    },
    joinedDate: "Aug 01, 2026",
  },
  {
    id: "rec-103",
    name: "Rachel Vance",
    title: "HR Specialist",
    email: "rachel@cyberpulse.com",
    status: "Suspended",
    company: {
      name: "CyberPulse Labs",
      website: "https://cyberpulse.com",
      industry: "Cybersecurity",
      size: "100-250 Employees",
      location: "Austin, TX",
      description: "Cyber threat response and automated security monitoring systems.",
      logo: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=100&auto=format&fit=crop&q=80",
    },
    joinedDate: "Mar 14, 2026",
  },
  {
    id: "rec-104",
    name: "Kenneth Cole",
    title: "Head of People",
    email: "k.cole@cloudvibe.net",
    status: "Rejected",
    company: {
      name: "CloudVibe Tech",
      website: "https://cloudvibe.net",
      industry: "Cloud Computing",
      size: "20-50 Employees",
      location: "Seattle, WA",
      description: "Cloud hosting solutions and developer ecosystem utilities.",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=80",
    },
    joinedDate: "Jul 18, 2026",
  },
];

export default function ManageRecruiters() {
  const [recruiters, setRecruiters] = useState(INITIAL_RECRUITERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("ALL");
  const [activeCompanyModal, setActiveCompanyModal] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Verify Recruiter
  const handleVerify = (id, name) => {
    setRecruiters((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Verified" } : r))
    );
    showToast(`Recruiter ${name} has been verified!`);
  };

  // Reject Recruiter
  const handleReject = (id, name) => {
    setRecruiters((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Rejected" } : r))
    );
    showToast(`Recruiter ${name} application rejected.`);
  };

  // Toggle Suspend / Activate
  const handleToggleSuspend = (id, name, currentStatus) => {
    const newStatus = currentStatus === "Suspended" ? "Verified" : "Suspended";
    setRecruiters((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    showToast(`Recruiter ${name} status changed to ${newStatus}.`);
  };

  // Delete Recruiter
  const handleDelete = (id, name) => {
    setRecruiters((prev) => prev.filter((r) => r.id !== id));
    showToast(`Recruiter ${name} account deleted.`);
  };

  // Status Badge Colors
  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case "Verified":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Pending":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Suspended":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      case "Rejected":
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  // Filter Logic
  const filteredRecruiters = recruiters.filter((rec) => {
    const matchesSearch =
      rec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.company.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatusFilter === "ALL" || rec.status === selectedStatusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen flex-1 bg-[#0a0a0f] text-white p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Manage Recruiters
          </h1>
          <p className="text-gray-400 text-sm pt-1">
            Review company credentials, verify recruiter accounts, or adjust status.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold rounded-xl">
            {recruiters.length} Registered Recruiters
          </span>
        </div>
      </div>

      {/* Toast Banner */}
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
            placeholder="Search by recruiter name, email, or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl text-xs outline-none"
          />
        </div>

        {/* Status Filter Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-purple-400 shrink-0" />
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2 bg-[#0a0a0f] border border-gray-800 text-gray-300 rounded-xl text-xs outline-none focus:border-purple-500 cursor-pointer font-medium"
          >
            <option value="ALL">All Statuses</option>
            <option value="Verified">Verified</option>
            <option value="Pending">Pending</option>
            <option value="Suspended">Suspended</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Recruiters Table */}
      <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
        {filteredRecruiters.length === 0 ? (
          <div className="p-12 text-center text-gray-500 space-y-2">
            <Building className="w-10 h-10 mx-auto text-gray-600 mb-2" />
            <p className="text-sm font-semibold text-white">No recruiters found.</p>
            <p className="text-xs text-gray-400">Try modifying your query or filter criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 uppercase font-semibold tracking-wider">
                  <th className="py-3 px-4">Recruiter</th>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Joined Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/80">
                {filteredRecruiters.map((rec) => (
                  <tr
                    key={rec.id}
                    className="hover:bg-purple-500/[0.02] transition-colors group"
                  >
                    {/* Recruiter Details */}
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-bold text-white text-sm group-hover:text-purple-400 transition-colors">
                          {rec.name}
                        </p>
                        <p className="text-gray-400 text-[11px] pt-0.5">
                          {rec.title} • {rec.email}
                        </p>
                      </div>
                    </td>

                    {/* Company Info Trigger */}
                    <td className="py-4 px-4">
                      <button
                        type="button"
                        onClick={() => setActiveCompanyModal(rec.company)}
                        className="flex items-center gap-2.5 text-left group/comp cursor-pointer"
                      >
                        <img
                          src={rec.company.logo}
                          alt={rec.company.name}
                          className="w-8 h-8 rounded-lg object-cover border border-gray-800 shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-gray-200 group-hover/comp:text-purple-400 transition-colors inline-flex items-center gap-1">
                            {rec.company.name}
                            <Eye className="w-3 h-3 text-purple-400 opacity-0 group-hover/comp:opacity-100 transition-opacity" />
                          </p>
                          <p className="text-gray-500 text-[10px]">
                            {rec.company.industry}
                          </p>
                        </div>
                      </button>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusBadgeStyle(
                          rec.status
                        )}`}
                      >
                        {rec.status}
                      </span>
                    </td>

                    {/* Joined Date */}
                    <td className="py-4 px-4 text-gray-400 font-medium">
                      {rec.joinedDate}
                    </td>

                    {/* Action Controls */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Verify Button (if not verified) */}
                        {rec.status !== "Verified" && (
                          <button
                            type="button"
                            onClick={() => handleVerify(rec.id, rec.name)}
                            title="Verify Recruiter"
                            className="p-2 bg-[#0a0a0f] hover:bg-emerald-500/10 border border-gray-800 hover:border-emerald-500/30 text-gray-400 hover:text-emerald-400 rounded-xl transition-all cursor-pointer"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Reject Button (if pending) */}
                        {rec.status === "Pending" && (
                          <button
                            type="button"
                            onClick={() => handleReject(rec.id, rec.name)}
                            title="Reject Recruiter"
                            className="p-2 bg-[#0a0a0f] hover:bg-rose-500/10 border border-gray-800 hover:border-rose-500/30 text-gray-400 hover:text-rose-400 rounded-xl transition-all cursor-pointer"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Suspend / Unsuspend Button */}
                        <button
                          type="button"
                          onClick={() => handleToggleSuspend(rec.id, rec.name, rec.status)}
                          title={rec.status === "Suspended" ? "Activate Recruiter" : "Suspend Recruiter"}
                          className={`p-2 bg-[#0a0a0f] border rounded-xl transition-all cursor-pointer ${
                            rec.status === "Suspended"
                              ? "border-gray-800 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/30"
                              : "border-gray-800 text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/30"
                          }`}
                        >
                          <ShieldAlert className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleDelete(rec.id, rec.name)}
                          title="Delete Recruiter Account"
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
      {/* COMPANY INFORMATION MODAL                  */}
      {/* ========================================== */}
      {activeCompanyModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl w-full max-w-lg p-6 space-y-6 shadow-2xl relative">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={activeCompanyModal.logo}
                  alt={activeCompanyModal.name}
                  className="w-12 h-12 rounded-xl object-cover border border-gray-800"
                />
                <div>
                  <h2 className="text-base font-bold text-white">
                    {activeCompanyModal.name}
                  </h2>
                  <p className="text-xs text-purple-400 font-medium">
                    {activeCompanyModal.industry}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveCompanyModal(null)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-2">
                <span className="text-gray-400 font-semibold block">Company Overview</span>
                <p className="text-gray-200 leading-relaxed">
                  {activeCompanyModal.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-1">
                  <span className="text-gray-500 text-[10px] uppercase font-semibold block">
                    Company Size
                  </span>
                  <p className="font-bold text-white">{activeCompanyModal.size}</p>
                </div>

                <div className="p-3 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-1">
                  <span className="text-gray-500 text-[10px] uppercase font-semibold block">
                    Headquarters
                  </span>
                  <p className="font-bold text-white">{activeCompanyModal.location}</p>
                </div>
              </div>

              <div className="p-3 bg-[#0a0a0f] border border-gray-800 rounded-xl flex items-center justify-between">
                <span className="text-gray-400 font-medium">Official Website:</span>
                <a
                  href={activeCompanyModal.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 font-bold inline-flex items-center gap-1"
                >
                  {activeCompanyModal.website.replace("https://", "")}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end pt-3 border-t border-gray-800">
              <button
                type="button"
                onClick={() => setActiveCompanyModal(null)}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-xl cursor-pointer transition-all shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}










