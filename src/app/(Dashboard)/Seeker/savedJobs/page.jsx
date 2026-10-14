
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
  AlertTriangle,
} from "lucide-react";
import { authClient } from "@/app/lib/auth-client";

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState("");

  // Seeker Profile State
  const [seekerProfile, setSeekerProfile] = useState(null);

  // Modal State for "Apply Now"
  const [applyingJob, setApplyingJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [selectedResume, setSelectedResume] = useState("Alex_Rivera_Resume_2026.pdf");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal State for "Delete Saved Job"
  const [deletingJob, setDeletingJob] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  // 1. Fetch saved jobs & already applied jobs on mount / user change
  useEffect(() => {
    const fetchSavedAndAppliedJobs = async () => {
      if (!user?.email) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

        // Fetch saved jobs
        const savedRes = await fetch(`${baseUrl}/api/savejob?email=${encodeURIComponent(user.email)}`);
        if (savedRes.ok) {
          const data = await savedRes.json();
          setSavedJobs(Array.isArray(data) ? data : data.jobs || []);
        }

        // Fetch already submitted applications to match applicantId & jobId
        const appliedRes = await fetch(`${baseUrl}/api/applications/${encodeURIComponent(user.email)}`);
        if (appliedRes.ok) {
          const data = await appliedRes.json();
          const applicationsList = data.applications || [];

          const appliedIds = applicationsList
            .filter((app) =>
              (user.id && app.applicantId === user.id) ||
              (user.email && app.applicantEmail?.toLowerCase() === user.email.toLowerCase())
            )
            .map((app) => String(app.jobId));

          setAppliedJobIds(appliedIds);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedAndAppliedJobs();
  }, [user?.email, user?.id]);

  // 2. Fetch Seeker Profile by User Email (Includes phone, skills, experience, education, etc.)
  useEffect(() => {
    const fetchSeekerProfile = async () => {
      if (!user?.email) return;
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
        const response = await fetch(`${baseUrl}/api/seeker/profile/${encodeURIComponent(user.email)}`);

        if (response.ok) {
          const data = await response.json();
          setSeekerProfile(data);

          if (data.resume) {
            const resumeName = typeof data.resume === "string" ? data.resume : data.resume.fileName || data.resume.filename || "";
            setSelectedResume(resumeName);
          } else if (data.resumes && data.resumes.length > 0) {
            const firstRes = data.resumes[0];
            const firstName = typeof firstRes === "string" ? firstRes : firstRes.fileName || firstRes.filename || "Resume 1";
            setSelectedResume(firstName);
          }
        }
      } catch (error) {
        console.error("Error fetching seeker profile:", error);
      }
    };

    fetchSeekerProfile();
  }, [user?.email]);

  // Handle Confirmed Delete Saved Job
  const handleConfirmDelete = async () => {
    if (!deletingJob || !user?.email) return;

    const jobId = String(deletingJob.id || deletingJob._id);
    const jobTitle = deletingJob.title || deletingJob.jobTitle;

    setIsDeleting(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

      const response = await fetch(`${baseUrl}/api/savejob?id=${jobId}&email=${encodeURIComponent(user.email)}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        setSavedJobs((prev) => prev.filter((job) => String(job.id || job._id) !== jobId));
        setNotification(`"${jobTitle || "Job"}" removed from your saved bookmarks.`);
      } else {
        setNotification(data.message || "Failed to remove saved job.");
      }
    } catch (error) {
      console.error("Error deleting saved job:", error);
      setNotification("Network error processing deletion.");
    } finally {
      setIsDeleting(false);
      setDeletingJob(null);
      setTimeout(() => setNotification(""), 4000);
    }
  };

  // Submit Application Action to Backend API with Complete Seeker Details
  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    if (!applyingJob || !user?.email) return;

    const jobId = String(applyingJob.id || applyingJob._id);
    const jobTitle = applyingJob.title || applyingJob.jobTitle;

    setIsSubmitting(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
      const payload = {
        jobId,
        jobTitle,
        jobEmail: applyingJob.companyEmail || applyingJob.jobEmail || "",
        companyLogo: applyingJob.companyLogo || "",
        companyName: applyingJob.companyName || "",
        applicantId: user.id,
        applicantEmail: user.email,
        applicantName: user.name || seekerProfile?.fullName || seekerProfile?.SeekerName || "",
        coverLetter,
        resume: seekerProfile?.resume || selectedResume,
        location: applyingJob.location || "",
        remoteOption: applyingJob.workplaceType || applyingJob.remoteOption || "Remote",
        salaryRange: applyingJob.salary || applyingJob.salaryRange || "",
        number: seekerProfile?.phone || seekerProfile?.number || seekerProfile?.contactNumber || "",
        skills: seekerProfile?.skills || [],
        experience: seekerProfile?.experience || [],
        education: seekerProfile?.education || [],
        appliedAt: new Date().toISOString(),
        status: "Pending",
      };

      const response = await fetch(`${baseUrl}/api/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setAppliedJobIds((prev) => [...prev, jobId]);
        setNotification(`Successfully submitted application for ${jobTitle}!`);
        setApplyingJob(null);
        setCoverLetter("");
      } else {
        setNotification(data.message || "Failed to submit application.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setNotification("Network error processing application.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setNotification(""), 4000);
    }
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
            const jobId = String(job.id || job._id);
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

                    <button
                      onClick={() => setDeletingJob(job)}
                      title="Remove Saved Job"
                      className="p-2 bg-[#0a0a0f] hover:bg-rose-500/10 border border-gray-800 hover:border-rose-500/30 text-gray-400 hover:text-rose-400 rounded-xl transition-all cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

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

      {/* DELETE CONFIRMATION MODAL */}
      {deletingJob && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl w-full max-w-sm p-6 space-y-5 shadow-2xl relative text-center">
            <div className="w-12 h-12 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center mx-auto text-rose-400">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-base font-bold text-white">Remove Saved Job</h2>
              <p className="text-xs text-gray-400">
                Are you sure you want to remove <span className="text-white font-semibold">{deletingJob.title || deletingJob.jobTitle}</span> from your saved bookmarks?
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingJob(null)}
                className="flex-1 px-4 py-2.5 bg-[#0a0a0f] hover:bg-gray-800 border border-gray-800 text-gray-300 rounded-xl transition-all cursor-pointer text-xs font-medium"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="flex-1 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl shadow-md cursor-pointer transition-all text-xs font-semibold disabled:opacity-50"
              >
                {isDeleting ? "Removing..." : "Remove"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* APPLY NOW MODAL */}
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
              <div className="space-y-2">
                <label className="text-gray-300 font-semibold block">
                  Select Resume Document *
                </label>
                <div className="p-3 bg-[#0a0a0f] border border-purple-500/30 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="font-bold text-white">
                        {seekerProfile?.resume?.fileName || selectedResume || "No resume uploaded yet"}
                      </p>
                      <p className="text-[10px] text-gray-500">Linked from Profile</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                    Ready
                  </span>
                </div>
              </div>

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

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setApplyingJob(null)}
                  className="px-4 py-2 bg-[#0a0a0f] hover:bg-gray-800 border border-gray-800 text-gray-300 rounded-xl transition-all cursor-pointer font-medium"
                >
                  Cancel
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





