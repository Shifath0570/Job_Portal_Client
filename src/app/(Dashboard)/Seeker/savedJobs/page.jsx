
"use client";

import React, { useState, useEffect } from "react";
import {
  Bookmark,
  Trash2,
  Search,
  MapPin,
  DollarSign,
  Clock,
  X,
  CheckCircle,
  FileText,
  Loader2,
} from "lucide-react";
import { authClient } from "@/app/lib/auth-client";

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState("");

  // Modal State for "Apply Now"
  const [applyingJob, setApplyingJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [selectedResume] = useState("Alex_Rivera_Resume_2026.pdf");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Fetch saved jobs from backend API by user email on mount or user change
  useEffect(() => {
    const fetchSavedJobs = async () => {
      if (!user?.email) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
        const response = await fetch(`${baseUrl}/api/savejob?email=${encodeURIComponent(user.email)}`);

        if (response.ok) {
          const data = await response.json();
          const fetchedJobs = Array.isArray(data) ? data : data.jobs || [];
          setSavedJobs(fetchedJobs);
        } else {
          console.error("Failed to fetch saved jobs");
        }
      } catch (error) {
        console.error("Error connecting to server:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedJobs();
  }, [user?.email]);

  // Remove Job from Saved List (Local UI filter)
  const handleRemoveSavedJob = (jobId, jobTitle) => {
    setSavedJobs((prev) => prev.filter((job) => (job._id || job.id) !== jobId));
    setNotification(`"${jobTitle || "Job"}" removed from your saved bookmarks.`);
    setTimeout(() => setNotification(""), 3000);
  };

  // Submit Application Action
  const handleSubmitApplication = (e) => {
    e.preventDefault();
    if (!applyingJob) return;

    const jobId = applyingJob._id || applyingJob.id;
    const jobTitle = applyingJob.title || applyingJob.jobTitle;

    setIsSubmitting(true);
    setTimeout(() => {
      setAppliedJobIds((prev) => [...prev, jobId]);
      setIsSubmitting(false);
      setNotification(`Successfully submitted application for ${jobTitle}!`);
      setTimeout(() => setNotification(""), 4000);
      setApplyingJob(null);
      setCoverLetter("");
    }, 900);
  };

  // Search Filtered Bookmarks
  const filteredJobs = savedJobs.filter((job) => {
    const jobTitle = job.title || job.jobTitle || "";
    const companyName = job.companyName || "";
    const skills = job.skills || job.requiredSkills || [];

    if (!searchQuery) return true;
    return (
      jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
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
          <CheckCircle className="w-4 h-4 text-purple-400 shrink-0" />
          {notification}
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-4 shadow-xl">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-3.5 text-gray-500" />
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
      {isLoading ? (
        <div className="p-16 text-center bg-[#14141f] border border-gray-800 rounded-2xl flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
          <p className="text-xs text-gray-400">Loading your saved jobs...</p>
        </div>
      ) : !user?.email ? (
        <div className="p-12 text-center bg-[#14141f] border border-gray-800 rounded-2xl text-gray-500 space-y-3 shadow-xl">
          <Bookmark className="w-10 h-10 mx-auto text-gray-600 mb-1" />
          <h3 className="text-base font-bold text-white">Please log in</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            Log in to view and manage your bookmarked job opportunities.
          </p>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="p-12 text-center bg-[#14141f] border border-gray-800 rounded-2xl text-gray-500 space-y-3 shadow-xl">
          <Bookmark className="w-10 h-10 mx-auto text-gray-600 mb-1" />
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
            const jobId = job._id || job.id;
            const isApplied = appliedJobIds.includes(jobId);

            const jobTitle = job.title || job.jobTitle;
            const workplace = job.workplaceType || job.remoteOption || "Remote";
            const salary = job.salary || job.salaryRange;
            const jobType = job.jobType || job.employmentType;
            const skillsList = job.skills || job.requiredSkills || [];

            return (
              <div
                key={jobId}
                className="bg-[#14141f] border border-gray-800 hover:border-purple-500/40 rounded-2xl p-6 space-y-5 transition-all shadow-xl flex flex-col justify-between"
              >
                {/* Header: Company Logo & Action Buttons */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={job.companyLogo || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100"}
                        alt={job.companyName}
                        className="w-12 h-12 rounded-xl object-cover border border-gray-800 shrink-0"
                      />
                      <div>
                        <h2 className="text-base font-bold text-white">
                          {jobTitle}
                        </h2>
                        <p className="text-xs text-gray-400 font-medium">
                          {job.companyName}
                        </p>
                      </div>
                    </div>

                    {/* Remove Bookmark Button */}
                    <button
                      onClick={() => handleRemoveSavedJob(jobId, jobTitle)}
                      title="Remove Saved Job"
                      className="p-2 bg-[#0a0a0f] hover:bg-rose-500/10 border border-gray-800 hover:border-rose-500/30 text-gray-400 hover:text-rose-400 rounded-xl transition-all cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Metadata Chips */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-300">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#0a0a0f] border border-gray-800 rounded-lg text-[11px]">
                      <MapPin className="w-3.5 h-3.5 text-purple-400" />
                      {job.location} ({workplace})
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#0a0a0f] border border-gray-800 rounded-lg text-[11px]">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                      {salary}
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#0a0a0f] border border-gray-800 rounded-lg text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      {jobType}
                    </span>
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {skillsList.map((skill) => (
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
                    Saved on {job.savedAt ? new Date(job.savedAt).toLocaleDateString() : "Recently"}
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
      {/* APPLY NOW MODAL                           */}
      {/* ========================================== */}
      {applyingJob && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl w-full max-w-lg p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white">
                  Apply for {applyingJob.title || applyingJob.jobTitle}
                </h2>
                <p className="text-xs text-purple-400">{applyingJob.companyName}</p>
              </div>

              <button
                onClick={() => setApplyingJob(null)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
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
                    <FileText className="w-5 h-5 text-purple-400" />
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









