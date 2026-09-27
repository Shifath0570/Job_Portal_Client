"use client";

import React, { useState } from "react";

// ==========================================
// Inline Custom SVG Icons
// ==========================================

const BookmarkIcon = (props) => (
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
    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
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

// ==========================================
// Initial Mock Bookmarked Jobs
// ==========================================

const INITIAL_SAVED_JOBS = [
  {
    id: "saved-101",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80",
    jobTitle: "Senior React Developer",
    companyName: "Acme Technologies",
    location: "San Francisco, CA",
    salary: "$130,000 - $160,000",
    jobType: "Full-Time",
    workplaceType: "Remote",
    savedOn: "Aug 05, 2026",
    deadline: "Aug 28, 2026",
    requiredSkills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
  },
  {
    id: "saved-102",
    companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80",
    jobTitle: "UI/UX Product Designer",
    companyName: "Starlight Design Studio",
    location: "New York, NY",
    salary: "$110,000 - $135,000",
    jobType: "Full-Time",
    workplaceType: "Hybrid",
    savedOn: "Aug 02, 2026",
    deadline: "Sep 05, 2026",
    requiredSkills: ["Figma", "User Research", "Prototyping", "Design Systems"],
  },
  {
    id: "saved-103",
    companyLogo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80",
    jobTitle: "Backend Node.js Architect",
    companyName: "Nexus Systems",
    location: "Remote",
    salary: "$140,000 - $170,000",
    jobType: "Contract",
    workplaceType: "Remote",
    savedOn: "Jul 29, 2026",
    deadline: "Aug 20, 2026",
    requiredSkills: ["Node.js", "Express", "PostgreSQL", "Redis"],
  },
];

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState(INITIAL_SAVED_JOBS);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState("");

  // Modal State for "Apply Later / Apply Now"
  const [applyingJob, setApplyingJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [selectedResume] = useState("Alex_Rivera_Resume_2026.pdf");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Remove Job from Saved List
  const handleRemoveSavedJob = (jobId, jobTitle) => {
    setSavedJobs((prev) => prev.filter((job) => job.id !== jobId));
    setNotification(`"${jobTitle}" removed from your saved bookmarks.`);
    setTimeout(() => setNotification(""), 3000);
  };

  // Submit Application Action
  const handleSubmitApplication = (e) => {
    e.preventDefault();
    if (!applyingJob) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setAppliedJobIds((prev) => [...prev, applyingJob.id]);
      setIsSubmitting(false);
      setNotification(`Successfully submitted application for ${applyingJob.jobTitle}!`);
      setTimeout(() => setNotification(""), 4000);
      setApplyingJob(null);
      setCoverLetter("");
    }, 900);
  };

  // Search Filtered Bookmarks
  const filteredJobs = savedJobs.filter((job) => {
    if (!searchQuery) return true;
    return (
      job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.requiredSkills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  });

  return (
    <div className="min-h-screen flex-1 bg-[#0a0a0f] text-white p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Saved Jobs
          </h1>
          <p className="text-gray-400 text-sm pt-1">
            Bookmarked positions saved for later review or application.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold rounded-xl">
            {savedJobs.length} Saved Opportunities
          </span>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="p-4 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold rounded-xl flex items-center gap-2">
          <CheckCircleIcon className="w-4 h-4 text-purple-400 shrink-0" />
          {notification}
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-4 shadow-xl">
        <div className="relative">
          <SearchIcon className="w-5 h-5 absolute left-4 top-3.5 text-gray-500" />
          <input
            type="text"
            placeholder="Search saved jobs by title, company, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl text-xs outline-none"
          />
        </div>
      </div>

      {/* Saved Jobs List Grid */}
      {filteredJobs.length === 0 ? (
        <div className="p-12 text-center bg-[#14141f] border border-gray-800 rounded-2xl text-gray-500 space-y-3 shadow-xl">
          <BookmarkIcon className="w-10 h-10 mx-auto text-gray-600 mb-1" />
          <h3 className="text-base font-bold text-white">No saved jobs found</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            {searchQuery
              ? "No saved job matches your search keywords."
              : "You haven't bookmarked any jobs yet. Browse available postings to save opportunities for later!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredJobs.map((job) => {
            const isApplied = appliedJobIds.includes(job.id);

            return (
              <div
                key={job.id}
                className="bg-[#14141f] border border-gray-800 hover:border-purple-500/40 rounded-2xl p-6 space-y-5 transition-all shadow-xl flex flex-col justify-between"
              >
                {/* Header: Company Logo & Action Buttons */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={job.companyLogo}
                        alt={job.companyName}
                        className="w-12 h-12 rounded-xl object-cover border border-gray-800 shrink-0"
                      />
                      <div>
                        <h2 className="text-base font-bold text-white">
                          {job.jobTitle}
                        </h2>
                        <p className="text-xs text-gray-400 font-medium">
                          {job.companyName}
                        </p>
                      </div>
                    </div>

                    {/* Remove Bookmark Button */}
                    <button
                      onClick={() => handleRemoveSavedJob(job.id, job.jobTitle)}
                      title="Remove Saved Job"
                      className="p-2 bg-[#0a0a0f] hover:bg-rose-500/10 border border-gray-800 hover:border-rose-500/30 text-gray-400 hover:text-rose-400 rounded-xl transition-all cursor-pointer shrink-0"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Metadata Chips */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-300">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#0a0a0f] border border-gray-800 rounded-lg text-[11px]">
                      <MapPinIcon className="w-3.5 h-3.5 text-purple-400" />
                      {job.location} ({job.workplaceType})
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#0a0a0f] border border-gray-800 rounded-lg text-[11px]">
                      <DollarSignIcon className="w-3.5 h-3.5 text-emerald-400" />
                      {job.salary}
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#0a0a0f] border border-gray-800 rounded-lg text-[11px]">
                      <ClockIcon className="w-3.5 h-3.5 text-blue-400" />
                      {job.jobType}
                    </span>
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.requiredSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[10px] font-semibold rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer with Saved Date & Apply Action */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-800 text-xs">
                  <span className="text-gray-500 text-[11px]">
                    Saved on {job.savedOn}
                  </span>

                  {isApplied ? (
                    <span className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold rounded-xl text-[11px]">
                      Applied
                    </span>
                  ) : (
                    <button
                      onClick={() => setApplyingJob(job)}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-md cursor-pointer transition-all"
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================== */}
      {/* APPLY NOW MODAL                            */}
      {/* ========================================== */}
      {applyingJob && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl w-full max-w-lg p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white">
                  Apply for {applyingJob.jobTitle}
                </h2>
                <p className="text-xs text-purple-400">{applyingJob.companyName}</p>
              </div>

              <button
                onClick={() => setApplyingJob(null)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitApplication} className="space-y-4 text-xs">
              {/* Selected Resume Details */}
              <div className="space-y-2">
                <label className="text-gray-300 font-semibold block">
                  Select Resume Document *
                </label>
                <div className="p-3 bg-[#0a0a0f] border border-purple-500/30 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileTextIcon className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="font-bold text-white">{selectedResume}</p>
                      <p className="text-[10px] text-gray-500">PDF Document • 1.8 MB</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                    Ready
                  </span>
                </div>
              </div>

              {/* Cover Letter Input */}
              <div className="space-y-1.5">
                <label className="text-gray-300 font-semibold block">
                  Cover Letter <span className="text-gray-500">(Optional)</span>
                </label>
                <textarea
                  rows={4}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Introduce yourself or highlight why you are a good fit for this bookmarked job..."
                  className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none resize-y"
                />
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setApplyingJob(null)}
                  className="px-4 py-2 bg-[#0a0a0f] hover:bg-gray-800 border border-gray-800 text-gray-300 rounded-xl transition-all cursor-pointer font-medium"
                >
                  Apply Later
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-md cursor-pointer transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}