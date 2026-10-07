"use client";

import React, { useState } from "react";
import {
  Search as SearchIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  Calendar as CalendarIcon,
  Eye as EyeIcon,
  Download as DownloadIcon,
  X as CloseIcon,
} from "lucide-react";

const STATUS_OPTIONS = [
  "Pending",
  "Reviewed",
  "Shortlisted",
  "Interview Scheduled",
  "Rejected",
  "Hired",
];

const INITIAL_APPLICANTS = [
  {
    id: "app-101",
    profilePicture:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    name: "Eleanor Pena",
    email: "eleanor.pena@example.com",
    phone: "+1 (555) 345-6789",
    jobPosition: "Senior Frontend Engineer",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    experienceLevel: "Senior Level (5+ yrs)",
    experience: "5 Years at Tech Corp as Lead Frontend Dev",
    education: "B.Sc. in Computer Science, Stanford University",
    coverLetter:
      "I have over 5 years of experience building modern web architectures. Excited to bring my Next.js and frontend skillsets to your engineering team.",
    applicationDate: "Aug 05, 2026",
    status: "Shortlisted",
    resumeUrl: "/resumes/eleanor-pena.pdf",
  },
  {
    id: "app-102",
    profilePicture:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    name: "Jerome Bell",
    email: "jerome.bell@example.com",
    phone: "+1 (555) 876-5432",
    jobPosition: "UI/UX Product Designer",
    skills: ["Figma", "User Research", "Prototyping", "Wireframing"],
    experienceLevel: "Mid Level (3-5 yrs)",
    experience: "3 Years at Design Studio as UI Designer",
    education: "B.A. in Graphic Design, NYU",
    coverLetter:
      "Crafting intuitive digital experiences is my passion. I have designed product systems for over 10 scalable web applications.",
    applicationDate: "Aug 02, 2026",
    status: "Interview Scheduled",
    resumeUrl: "/resumes/jerome-bell.pdf",
  },
  {
    id: "app-103",
    profilePicture:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    name: "Devon Lane",
    email: "devon.lane@example.com",
    phone: "+1 (555) 234-9876",
    jobPosition: "Backend Node.js Architect",
    skills: ["Node.js", "Express", "PostgreSQL", "Docker", "GraphQL"],
    experienceLevel: "Senior Level (5+ yrs)",
    experience: "6 Years as Senior Backend Developer",
    education: "M.Sc. in Software Engineering, MIT",
    coverLetter:
      "Specialized in microservices design, RESTful APIs, and database optimization. Looking forward to discussing this opportunity.",
    applicationDate: "Jul 29, 2026",
    status: "Pending",
    resumeUrl: "/resumes/devon-lane.pdf",
  },
];

export default function ViewApplicants() {
  const [applicants, setApplicants] = useState(INITIAL_APPLICANTS);
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

  // Handle Status Change
  const handleStatusChange = (applicantId, newStatus) => {
    setApplicants((prev) =>
      prev.map((app) => (app.id === applicantId ? { ...app, status: newStatus } : app))
    );
  };

  // Schedule Interview Submission
  const handleScheduleInterview = (e) => {
    e.preventDefault();
    if (!interviewModalApplicant) return;

    // Auto-update status to "Interview Scheduled"
    handleStatusChange(interviewModalApplicant.id, "Interview Scheduled");

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
      app.name.toLowerCase().includes(query) ||
      app.jobPosition.toLowerCase().includes(query) ||
      app.skills.some((skill) => skill.toLowerCase().includes(query));

    const matchesStatus = filterStatus === "All" || app.status === filterStatus;
    const matchesExperience =
      filterExperience === "All" || app.experienceLevel === filterExperience;
    const matchesJob = filterJob === "All" || app.jobPosition === filterJob;

    return matchesSearch && matchesStatus && matchesExperience && matchesJob;
  });

  // Dynamic lists for filter dropdowns
  const uniqueJobs = Array.from(new Set(applicants.map((a) => a.jobPosition)));

  return (
    <div className="min-h-screen flex-1 bg-[#0a0a0f] text-white p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Job Applicants
          </h1>
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
        {/* Search Bar */}
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

        {/* Filter Selects */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Status Filter */}
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

          {/* Job Filter */}
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

          {/* Experience Filter */}
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

      {/* Applicants Grid / Cards */}
      <div className="space-y-6">
        {filteredApplicants.length === 0 ? (
          <div className="p-12 text-center bg-[#14141f] border border-gray-800 rounded-2xl text-gray-500">
            No applicants found matching your search and filter criteria.
          </div>
        ) : (
          filteredApplicants.map((app) => (
            <div
              key={app.id}
              className="bg-[#14141f] border border-gray-800 hover:border-purple-500/40 rounded-2xl p-6 shadow-xl transition-all space-y-6"
            >
              {/* Header Info */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-gray-800 pb-5">
                <div className="flex items-center gap-4">
                  <img
                    src={app.profilePicture}
                    alt={app.name}
                    className="w-16 h-16 rounded-2xl object-cover border border-purple-500/20 shadow-md shrink-0"
                  />
                  <div>
                    <h2 className="text-lg font-bold text-white">{app.name}</h2>
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
                      <span>• Applied: {app.applicationDate}</span>
                    </div>
                  </div>
                </div>

                {/* Status Selector & Schedule Button */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 font-medium">Status:</span>
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.id, e.target.value)}
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

              {/* Applicant Details Body */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs text-gray-300">
                {/* Skills */}
                <div className="space-y-2">
                  <span className="text-gray-400 uppercase tracking-wider font-semibold">
                    Skills
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {app.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-lg text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div className="space-y-1">
                  <span className="text-gray-400 uppercase tracking-wider font-semibold block">
                    Experience
                  </span>
                  <p className="text-white pt-1">{app.experience}</p>
                  <p className="text-gray-500">{app.experienceLevel}</p>
                </div>

                {/* Education */}
                <div className="space-y-1">
                  <span className="text-gray-400 uppercase tracking-wider font-semibold block">
                    Education
                  </span>
                  <p className="text-white pt-1">{app.education}</p>
                </div>
              </div>

              {/* Cover Letter */}
              <div className="space-y-2">
                <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                  Cover Letter
                </span>
                <p className="p-3 bg-[#0a0a0f] border border-gray-800 rounded-xl text-xs text-gray-400 leading-relaxed">
                  {app.coverLetter}
                </p>
              </div>

              {/* Resume Action Bar */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-800/80">
                <span className="text-xs text-gray-500">Attached Resume File</span>
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
                    download
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0a0a0f] hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white text-xs font-medium rounded-xl transition-all cursor-pointer"
                  >
                    <DownloadIcon className="w-3.5 h-3.5 text-emerald-400" />
                    Download Resume (PDF)
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Resume Modal View */}
      {selectedResume && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl w-full max-w-2xl p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <h3 className="text-lg font-bold text-white">
                Resume: {selectedResume.name}
              </h3>
              <button
                onClick={() => setSelectedResume(null)}
                className="text-gray-400 hover:text-white"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 bg-[#0a0a0f] border border-gray-800 rounded-xl text-center space-y-4">
              <p className="text-sm text-gray-300">
                Previewing PDF document for <strong>{selectedResume.name}</strong> ({selectedResume.jobPosition})
              </p>
              <div className="p-12 border border-dashed border-gray-800 rounded-xl text-gray-500 text-xs">
                [PDF Document Viewer Canvas]
              </div>
              <a
                href={selectedResume.resumeUrl}
                download
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
                className="text-gray-400 hover:text-white"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 font-semibold block mb-1">
                    Date *
                  </label>
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
                  <label className="text-gray-400 font-semibold block mb-1">
                    Time *
                  </label>
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





