
"use client";

import React, { useState, useEffect } from "react";
import {
  Search as SearchIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  Calendar as CalendarIcon,
  Eye as EyeIcon,
  Download as DownloadIcon,
  X as CloseIcon,
  MapPin as MapPinIcon,
  Briefcase as BriefcaseIcon,
  DollarSign as DollarSignIcon,
} from "lucide-react";
import { authClient } from "@/app/lib/auth-client";

const STATUS_OPTIONS = [
  "Pending",
  "Reviewed",
  "Shortlisted",
  "Interview Scheduled",
  "Rejected",
  "Hired",
];

export default function ViewApplicants() {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterExperience, setFilterExperience] = useState("All");
  const [filterJob, setFilterJob] = useState("All");

  // Modals state
  const [selectedResume, setSelectedResume] = useState(null);
  const [interviewModalApplicant, setInterviewModalApplicant] = useState(null);
  const [notificationMsg, setNotificationMsg] = useState("");

  // Interview Form State
  const [interviewForm, setInterviewForm] = useState({
    date: "",
    time: "",
    meetingLink: "",
    officeAddress: "",
    notes: "",
  });

  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const user = session?.user;

  // Fetch applications from backend API once session is resolved
  useEffect(() => {
    if (sessionLoading) return;

    async function fetchApplicants() {
      try {
        setLoading(true);
        const targetEmail = user?.email || "all";

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
        const res = await fetch(`${baseUrl}/api/applicants/${targetEmail}`);
        const data = await res.json();

        if (data.success && Array.isArray(data.applications)) {
          // Map all MongoDB schema fields to frontend expected fields
          const formattedApplicants = data.applications.map((app) => ({
            ...app,
            id: app._id,
            name: app.applicantName || app.name,
            email: app.applicantEmail || app.email,
            jobPosition: app.jobTitle || app.jobPosition,
            phone: app.number || app.phone,
            companyName: app.companyName || "N/A",
            companyLogo: app.companyLogo || "",
            location: app.location || "Remote",
            remoteOption: app.remoteOption || "On-site",
            salaryRange: app.salaryRange || "Not Specified",
            skills: Array.isArray(app.skills) ? app.skills : [],
            resumeUrl: app.resume?.fileUrl || app.resumeUrl || "#",
            applicationDate: app.appliedAt
              ? new Date(app.appliedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })
              : "Recent",
          }));

          setApplicants(formattedApplicants);
        } else {
          setError(data.message || "Failed to load applicants");
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Something went wrong while fetching applicants.");
      } finally {
        setLoading(false);
      }
    }

    fetchApplicants();
  }, [sessionLoading, user?.email]);

  // Handle Status Change
  const handleStatusChange = (applicantId, newStatus) => {
    setApplicants((prev) =>
      prev.map((app) =>
        app._id === applicantId || app.id === applicantId
          ? { ...app, status: newStatus }
          : app
      )
    );
  };

  // Schedule Interview Submission
  const handleScheduleInterview = (e) => {
    e.preventDefault();
    if (!interviewModalApplicant) return;

    const targetId = interviewModalApplicant._id || interviewModalApplicant.id;
    handleStatusChange(targetId, "Interview Scheduled");

    setNotificationMsg(
      `Interview scheduled with ${interviewModalApplicant.name}. A notification email has been dispatched!`
    );
    setInterviewModalApplicant(null);
    setInterviewForm({ date: "", time: "", meetingLink: "", officeAddress: "", notes: "" });

    setTimeout(() => setNotificationMsg(""), 5000);
  };

  // Filter & Search Logic
  const filteredApplicants = applicants.filter((app) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      app.name?.toLowerCase().includes(query) ||
      app.jobPosition?.toLowerCase().includes(query) ||
      app.skills?.some((skill) => skill.toLowerCase().includes(query));

    const matchesStatus = filterStatus === "All" || app.status === filterStatus;
    const matchesExperience =
      filterExperience === "All" || app.experienceLevel === filterExperience;
    const matchesJob = filterJob === "All" || app.jobPosition === filterJob;

    return matchesSearch && matchesStatus && matchesExperience && matchesJob;
  });

  // Dynamic lists for filter dropdowns
  const uniqueJobs = Array.from(new Set(applicants.map((a) => a.jobPosition).filter(Boolean)));

  if (loading || sessionLoading) {
    return (
      <div className="min-h-screen flex-1 bg-[#0a0a0f] text-white flex items-center justify-center">
        <p className="text-purple-400 text-sm animate-pulse">Loading applicant profiles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex-1 bg-[#0a0a0f] text-white flex items-center justify-center p-6">
        <div className="p-6 bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-xl">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex-1 bg-[#0a0a0f] text-white p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Job Applicants</h1>
          <p className="text-gray-400 text-sm pt-1">
            Review candidate profiles, change application statuses, download resumes, and schedule interviews.
          </p>
        </div>
      </div>

      {/* Notification Banner */}
      {notificationMsg && (
        <div className="p-4 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm rounded-xl">
          {notificationMsg}
        </div>
      )}

      {/* Search & Filter Controls */}
      <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="relative">
          <SearchIcon className="w-5 h-5 absolute left-4 top-3 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search applicants by name, skills (e.g. React), or job title..."
            className="w-full pl-11 pr-4 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white text-sm rounded-xl outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
              Application Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 bg-[#0a0a0f] border border-gray-800 text-white text-xs rounded-xl outline-none focus:border-purple-500 cursor-pointer"
            >
              <option value="All">All Statuses</option>
              {STATUS_OPTIONS.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
              Job Position
            </label>
            <select
              value={filterJob}
              onChange={(e) => setFilterJob(e.target.value)}
              className="w-full px-3 py-2 bg-[#0a0a0f] border border-gray-800 text-white text-xs rounded-xl outline-none focus:border-purple-500 cursor-pointer"
            >
              <option value="All">All Job Positions</option>
              {uniqueJobs.map((job) => (
                <option key={job} value={job}>
                  {job}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
              Experience Level
            </label>
            <select
              value={filterExperience}
              onChange={(e) => setFilterExperience(e.target.value)}
              className="w-full px-3 py-2 bg-[#0a0a0f] border border-gray-800 text-white text-xs rounded-xl outline-none focus:border-purple-500 cursor-pointer"
            >
              <option value="All">All Experience Levels</option>
              <option value="Junior Level (1-2 yrs)">Junior Level (1-2 yrs)</option>
              <option value="Mid Level (3-5 yrs)">Mid Level (3-5 yrs)</option>
              <option value="Senior Level (5+ yrs)">Senior Level (5+ yrs)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applicants Grid */}
      <div className="space-y-6">
        {filteredApplicants.length === 0 ? (
          <div className="p-12 text-center bg-[#14141f] border border-gray-800 rounded-2xl text-gray-500">
            No applicants found matching your search and filter criteria.
          </div>
        ) : (
          filteredApplicants.map((app) => {
            const appId = app._id || app.id;
            return (
              <div
                key={appId}
                className="bg-[#14141f] border border-gray-800 hover:border-purple-500/40 rounded-2xl p-6 shadow-xl transition-all space-y-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-gray-800 pb-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        app.companyLogo ||
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                      }
                      alt={app.name}
                      className="w-16 h-16 rounded-2xl object-cover border border-purple-500/20 shadow-md shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-white">{app.name}</h2>
                        <span className="px-2 py-0.5 bg-gray-800 text-gray-300 text-[10px] font-medium rounded-md">
                          {app.companyName}
                        </span>
                      </div>
                      <p className="text-xs text-purple-400 font-medium pt-0.5">
                        Applied for: <span className="text-white">{app.jobPosition}</span>
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 pt-1">
                        <span className="flex items-center gap-1">
                          <MailIcon className="w-3.5 h-3.5" /> {app.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <PhoneIcon className="w-3.5 h-3.5" /> {app.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPinIcon className="w-3.5 h-3.5 text-red-400" /> {app.location} ({app.remoteOption})
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSignIcon className="w-3.5 h-3.5 text-emerald-400" /> {app.salaryRange}
                        </span>
                        <span>Applied: {app.applicationDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 font-medium">Status:</span>
                      <select
                        value={app.status || "Pending"}
                        onChange={(e) => handleStatusChange(appId, e.target.value)}
                        className="px-3 py-1.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-xs font-semibold text-white rounded-xl outline-none cursor-pointer"
                      >
                        {STATUS_OPTIONS.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={() => setInterviewModalApplicant(app)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-medium rounded-xl transition-all shadow-md cursor-pointer"
                    >
                      <CalendarIcon className="w-4 h-4" />
                      Schedule Interview
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs text-gray-300">
                  <div className="space-y-2">
                    <span className="text-gray-400 uppercase tracking-wider font-semibold">
                      Skills
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {app.skills?.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-lg text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-gray-400 uppercase tracking-wider font-semibold block">
                      Experience
                    </span>
                    <p className="text-white pt-1 whitespace-pre-line">{app.experience}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-gray-400 uppercase tracking-wider font-semibold block">
                      Education
                    </span>
                    <p className="text-white pt-1">{app.education}</p>
                  </div>
                </div>

                {app.coverLetter && (
                  <div className="space-y-2">
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                      Cover Letter
                    </span>
                    <p className="p-3 bg-[#0a0a0f] border border-gray-800 rounded-xl text-xs text-gray-400 leading-relaxed">
                      {app.coverLetter}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-gray-800/80">
                  <span className="text-xs text-gray-500">
                    Attached Resume: {app.resume?.fileName || "Document.pdf"} ({app.resume?.fileSize || ""})
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedResume(app)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0a0a0f] hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white text-xs font-medium rounded-xl transition-all cursor-pointer"
                    >
                      <EyeIcon className="w-3.5 h-3.5 text-purple-400" />
                      View Resume
                    </button>
                    <a
                      href={app.resumeUrl}
                      download={app.resume?.fileName || "resume.pdf"}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0a0a0f] hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white text-xs font-medium rounded-xl transition-all cursor-pointer"
                    >
                      <DownloadIcon className="w-3.5 h-3.5 text-emerald-400" />
                      Download Resume
                    </a>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Resume Modal */}
      {selectedResume && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl w-full max-w-2xl p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <h3 className="text-lg font-bold text-white">Resume: {selectedResume.name}</h3>
              <button
                onClick={() => setSelectedResume(null)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 bg-[#0a0a0f] border border-gray-800 rounded-xl text-center space-y-4">
              <p className="text-sm text-gray-300">
                Previewing file: <strong>{selectedResume.resume?.fileName || "Resume.pdf"}</strong> ({selectedResume.resume?.fileSize || ""})
              </p>
              <div className="p-12 border border-dashed border-gray-800 rounded-xl text-gray-500 text-xs">
                [PDF Document Viewer Canvas]
              </div>
              <a
                href={selectedResume.resumeUrl}
                download={selectedResume.resume?.fileName || "resume.pdf"}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-xl shadow-md cursor-pointer transition-all"
              >
                <DownloadIcon className="w-4 h-4" /> Download PDF File
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Interview Modal */}
      {interviewModalApplicant && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleScheduleInterview}
            className="bg-[#14141f] border border-gray-800 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl relative"
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <h3 className="text-lg font-bold text-white">
                Schedule Interview: {interviewModalApplicant.name}
              </h3>
              <button
                type="button"
                onClick={() => setInterviewModalApplicant(null)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 font-semibold block mb-1">Date *</label>
                  <input
                    type="date"
                    value={interviewForm.date}
                    onChange={(e) =>
                      setInterviewForm({ ...interviewForm, date: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#0a0a0f] border border-gray-800 text-white rounded-xl outline-none focus:border-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-400 font-semibold block mb-1">Time *</label>
                  <input
                    type="time"
                    value={interviewForm.time}
                    onChange={(e) =>
                      setInterviewForm({ ...interviewForm, time: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#0a0a0f] border border-gray-800 text-white rounded-xl outline-none focus:border-purple-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-400 font-semibold block mb-1">
                  Meeting Link (Google Meet / Zoom)
                </label>
                <input
                  type="url"
                  placeholder="https://meet.google.com/abc-defg-hij"
                  value={interviewForm.meetingLink}
                  onChange={(e) =>
                    setInterviewForm({ ...interviewForm, meetingLink: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#0a0a0f] border border-gray-800 text-white rounded-xl outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-gray-400 font-semibold block mb-1">
                  Office Address (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 100 Innovation Way, Suite 400"
                  value={interviewForm.officeAddress}
                  onChange={(e) =>
                    setInterviewForm({ ...interviewForm, officeAddress: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#0a0a0f] border border-gray-800 text-white rounded-xl outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-gray-400 font-semibold block mb-1">
                  Interview Notes / Instructions
                </label>
                <textarea
                  rows={3}
                  placeholder="Instructions for candidate regarding technical preparations..."
                  value={interviewForm.notes}
                  onChange={(e) =>
                    setInterviewForm({ ...interviewForm, notes: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#0a0a0f] border border-gray-800 text-white rounded-xl outline-none focus:border-purple-500 resize-y"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-gray-800">
              <button
                type="button"
                onClick={() => setInterviewModalApplicant(null)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-xl cursor-pointer shadow-md"
              >
                Send Invite & Notify Candidate
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}




