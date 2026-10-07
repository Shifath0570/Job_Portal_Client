
"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Search,
  Filter,
  Calendar,
  X as CloseIcon,
  MapPin,
  FileText,
  ExternalLink,
} from "lucide-react";

const INITIAL_APPLICATIONS = [
  {
    id: "app-101",
    jobTitle: "Senior React Developer",
    company: "Acme Technologies",
    companyLogo:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80",
    location: "San Francisco, CA (Remote)",
    appliedDate: "Aug 06, 2026",
    status: "Hired",
    statusNote:
      "Official offer letter accepted. Onboarding begins September 1st.",
    resumeUsed: "Alex_Rivera_Resume_2026.pdf",
    salary: "$145,000 / year",
  },
  {
    id: "app-102",
    jobTitle: "UI/UX Product Designer",
    company: "Starlight Design Studio",
    companyLogo:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80",
    location: "New York, NY (Hybrid)",
    appliedDate: "Aug 04, 2026",
    status: "Interview Scheduled",
    statusNote:
      "Technical round scheduled via Google Meet on Aug 12, 2:00 PM.",
    resumeUsed: "Alex_Rivera_Resume_2026.pdf",
    salary: "$120,000 / year",
  },
  {
    id: "app-103",
    jobTitle: "Frontend Architect",
    company: "Nexus Systems",
    companyLogo:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80",
    location: "Remote",
    appliedDate: "Jul 28, 2026",
    status: "Shortlisted",
    statusNote:
      "Application moved to candidate shortlist. Hiring manager review in progress.",
    resumeUsed: "Alex_Rivera_Resume_2026.pdf",
    salary: "$150,000 / year",
  },
  {
    id: "app-104",
    jobTitle: "Full Stack JavaScript Developer",
    company: "CyberPulse Labs",
    companyLogo:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=100&auto=format&fit=crop&q=80",
    location: "Austin, TX",
    appliedDate: "Jul 22, 2026",
    status: "Reviewed",
    statusNote: "Application has been viewed by the recruitment team.",
    resumeUsed: "Alex_Rivera_Resume_2026.pdf",
    salary: "$130,000 / year",
  },
  {
    id: "app-105",
    jobTitle: "Junior Software Engineer",
    company: "CloudVibe Tech",
    companyLogo:
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=80",
    location: "Remote",
    appliedDate: "Jul 18, 2026",
    status: "Pending",
    statusNote: "Submission received. Awaiting initial screening.",
    resumeUsed: "Alex_Rivera_Resume_2026.pdf",
    salary: "$95,000 / year",
  },
  {
    id: "app-106",
    jobTitle: "DevOps & Cloud Engineer",
    company: "Apex Innovations",
    companyLogo:
      "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&auto=format&fit=crop&q=80",
    location: "Seattle, WA",
    appliedDate: "Jul 10, 2026",
    status: "Rejected",
    statusNote:
      "Position filled by an internal candidate. Submission archived.",
    resumeUsed: "Alex_Rivera_Resume_2026.pdf",
    salary: "$140,000 / year",
  },
];

export default function MyApplications() {
  const [applications] = useState(INITIAL_APPLICATIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("ALL");
  const [activeApplicationModal, setActiveApplicationModal] = useState(null);

  // Status Styling & Badge Helper
  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Reviewed":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Shortlisted":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "Interview Scheduled":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
      case "Hired":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Rejected":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  // Filter Logic
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      searchQuery === "" ||
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.company.toLowerCase().includes(searchQuery.toLowerCase());

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
            My Applications
          </h1>
          <p className="text-gray-400 text-sm pt-1">
            Track and monitor the status of all your active job submissions in real-time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold rounded-xl">
            {applications.length} Submissions Total
          </span>
        </div>
      </div>

      {/* Summary Counter Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          {
            label: "Pending",
            count: applications.filter((a) => a.status === "Pending").length,
            color: "text-amber-400",
          },
          {
            label: "Reviewed",
            count: applications.filter((a) => a.status === "Reviewed").length,
            color: "text-blue-400",
          },
          {
            label: "Shortlisted",
            count: applications.filter((a) => a.status === "Shortlisted").length,
            color: "text-purple-400",
          },
          {
            label: "Interview",
            count: applications.filter((a) => a.status === "Interview Scheduled").length,
            color: "text-indigo-400",
          },
          {
            label: "Hired",
            count: applications.filter((a) => a.status === "Hired").length,
            color: "text-emerald-400",
          },
          {
            label: "Rejected",
            count: applications.filter((a) => a.status === "Rejected").length,
            color: "text-rose-400",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-[#14141f] border border-gray-800 rounded-xl p-3.5 flex flex-col justify-between space-y-1 shadow-md"
          >
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              {item.label}
            </span>
            <span className={`text-xl font-black ${item.color}`}>
              {item.count}
            </span>
          </div>
        ))}
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Field */}
        <div className="relative w-full sm:flex-1">
          <Search className="w-4 h-4 absolute left-4 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search applications by Job Title or Company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl text-xs outline-none"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-purple-400 shrink-0" />
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2 bg-[#0a0a0f] border border-gray-800 text-gray-300 rounded-xl text-xs outline-none focus:border-purple-500 cursor-pointer font-medium"
          >
            <option value="ALL">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Interview Scheduled">Interview Scheduled</option>
            <option value="Hired">Hired</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications Table / Cards */}
      <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
        {filteredApplications.length === 0 ? (
          <div className="p-12 text-center text-gray-500 space-y-2">
            <Briefcase className="w-10 h-10 mx-auto text-gray-600 mb-2" />
            <p className="text-sm font-semibold text-white">
              No applications match your query.
            </p>
            <p className="text-xs text-gray-400">
              Try adjusting your filter status or search term.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 uppercase font-semibold tracking-wider">
                  <th className="py-3 px-4">Job Title & Company</th>
                  <th className="py-3 px-4">Applied Date</th>
                  <th className="py-3 px-4">Current Status</th>
                  <th className="py-3 px-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/80">
                {filteredApplications.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-purple-500/[0.02] transition-colors group"
                  >
                    {/* Job Title & Company */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={app.companyLogo}
                          alt={app.company}
                          className="w-10 h-10 rounded-xl object-cover border border-gray-800 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-white text-sm group-hover:text-purple-400 transition-colors">
                            {app.jobTitle}
                          </p>
                          <p className="text-gray-400 text-[11px] pt-0.5">
                            {app.company} • {app.location}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Applied Date */}
                    <td className="py-4 px-4 text-gray-300 font-medium">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-purple-400" />
                        {app.appliedDate}
                      </span>
                    </td>

                    {/* Application Status Badge */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold border ${getStatusBadgeStyle(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                      <p className="text-[11px] text-gray-500 pt-1 line-clamp-1 max-w-xs">
                        {app.statusNote}
                      </p>
                    </td>

                    {/* View Details Action */}
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => setActiveApplicationModal(app)}
                        className="px-3 py-1.5 bg-[#0a0a0f] hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white rounded-xl transition-all cursor-pointer font-medium text-xs inline-flex items-center gap-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ========================================== */}
      {/* APPLICATION DETAILS MODAL                  */}
      {/* ========================================== */}
      {activeApplicationModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl w-full max-w-lg p-6 space-y-6 shadow-2xl relative">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={activeApplicationModal.companyLogo}
                  alt={activeApplicationModal.company}
                  className="w-11 h-11 rounded-xl object-cover border border-gray-800"
                />
                <div>
                  <h2 className="text-base font-bold text-white">
                    {activeApplicationModal.jobTitle}
                  </h2>
                  <p className="text-xs text-purple-400">
                    {activeApplicationModal.company}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveApplicationModal(null)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Info */}
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Current Status</span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusBadgeStyle(
                      activeApplicationModal.status
                    )}`}
                  >
                    {activeApplicationModal.status}
                  </span>
                </div>

                <div className="pt-2 border-t border-gray-800/80 space-y-1">
                  <span className="text-gray-400 block font-semibold">
                    Status Note:
                  </span>
                  <p className="text-gray-200 leading-relaxed">
                    {activeApplicationModal.statusNote}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-gray-300">
                <div className="p-3 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-1">
                  <span className="text-gray-500 text-[10px] font-semibold block uppercase">
                    Applied Date
                  </span>
                  <p className="font-bold text-white">
                    {activeApplicationModal.appliedDate}
                  </p>
                </div>

                <div className="p-3 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-1">
                  <span className="text-gray-500 text-[10px] font-semibold block uppercase">
                    Offered / Target Salary
                  </span>
                  <p className="font-bold text-emerald-400">
                    {activeApplicationModal.salary}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-[#0a0a0f] border border-gray-800 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-300">Resume Submitted:</span>
                </div>
                <span className="font-bold text-white">
                  {activeApplicationModal.resumeUsed}
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end pt-3 border-t border-gray-800">
              <button
                type="button"
                onClick={() => setActiveApplicationModal(null)}
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








