"use client";

import React, { useState } from "react";

// ==========================================
// Inline Custom SVG Icons
// ==========================================

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

const BookmarkCheckIcon = (props) => (
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
    <polyline points="9 10 11 12 15 8" />
  </svg>
);

const ShareIcon = (props) => (
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
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
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
// Mock Jobs Dataset
// ==========================================

const INITIAL_JOBS = [
  {
    id: "job-101",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80",
    jobTitle: "Senior React Developer",
    companyName: "Acme Technologies",
    location: "San Francisco, CA",
    salary: "$130,000 - $160,000",
    salaryMin: 130000,
    jobType: "Full-Time",
    workplaceType: "Remote",
    category: "Software Engineering",
    experienceLevel: "Senior Level",
    postedDate: "2 days ago",
    deadline: "Aug 28, 2026",
    description: "We are seeking a seasoned Senior React Developer to architect and build performant web applications using React, Next.js, and TypeScript.",
    responsibilities: [
      "Architect and maintain scalable Frontend design systems.",
      "Collaborate with Product and UI/UX designers on feature rollouts.",
      "Optimize web page render speed and core web vitals.",
    ],
    requirements: [
      "5+ years experience in modern JavaScript ecosystem.",
      "Expertise with React 18+, Next.js, and Tailwind CSS.",
      "Proven experience in state management and web optimization.",
    ],
    requiredSkills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "REST API"],
    benefits: ["Health, Dental & Vision Insurance", "Flexible Remote Work", "401(k) Matching", "$2,000 Annual Learning Stipend"],
    companyInfo: "Acme Technologies is an industry-leading SaaS company building next-generation productivity tools for remote software teams.",
  },
  {
    id: "job-102",
    companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80",
    jobTitle: "UI/UX Product Designer",
    companyName: "Starlight Design Studio",
    location: "New York, NY",
    salary: "$110,000 - $135,000",
    salaryMin: 110000,
    jobType: "Full-Time",
    workplaceType: "Hybrid",
    category: "Design",
    experienceLevel: "Mid Level",
    postedDate: "1 day ago",
    deadline: "Sep 05, 2026",
    description: "Join Starlight Studio to design elegant design systems, high-fidelity interactive wireframes, and intuitive mobile app interfaces.",
    responsibilities: [
      "Create interactive prototypes and user journey maps.",
      "Conduct user research and usability testing.",
      "Maintain design libraries in Figma.",
    ],
    requirements: [
      "3+ years experience in UI/UX Product Design.",
      "Strong portfolio showcasing responsive web and mobile designs.",
      "Expert-level mastery of Figma and Prototyping tools.",
    ],
    requiredSkills: ["Figma", "User Research", "Prototyping", "Design Systems", "Wireframing"],
    benefits: ["Unlimited PTO", "Hybrid Flexibility", "Wellness Allowance", "Latest MacBook Pro"],
    companyInfo: "Starlight Studio designs world-class digital products for venture-backed startups and Fortune 500 enterprises.",
  },
  {
    id: "job-103",
    companyLogo: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=100&auto=format&fit=crop&q=80",
    jobTitle: "DevOps & Cloud Engineer",
    companyName: "Apex Cloud Innovations",
    location: "Austin, TX",
    salary: "$140,000 - $175,000",
    salaryMin: 140000,
    jobType: "Full-Time",
    workplaceType: "On-site",
    category: "DevOps",
    experienceLevel: "Senior Level",
    postedDate: "3 days ago",
    deadline: "Aug 30, 2026",
    description: "Looking for a DevOps Engineer to manage Kubernetes infrastructure, automated CI/CD deployment pipelines, and cloud security compliance.",
    responsibilities: [
      "Manage AWS cloud infrastructure using Terraform.",
      "Maintain Docker & Kubernetes clusters.",
      "Build automated CI/CD pipelines in GitHub Actions.",
    ],
    requirements: [
      "4+ years experience in DevOps or SRE roles.",
      "Hands-on expertise with AWS, Terraform, and Kubernetes.",
      "Deep understanding of CI/CD and container security.",
    ],
    requiredSkills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
    benefits: ["Onsite Gym & Cafeteria", "Health Coverage", "Performance Bonuses", "Relocation Assistance"],
    companyInfo: "Apex Cloud Innovations powers scalable cloud architecture for enterprise high-traffic applications.",
  },
  {
    id: "job-104",
    companyLogo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80",
    jobTitle: "Backend Node.js Developer",
    companyName: "Nexus Systems",
    location: "Remote",
    salary: "$95,000 - $120,000",
    salaryMin: 95000,
    jobType: "Contract",
    workplaceType: "Remote",
    category: "Software Engineering",
    experienceLevel: "Mid Level",
    postedDate: "4 days ago",
    deadline: "Aug 25, 2026",
    description: "Develop high-throughput RESTful and GraphQL APIs using Node.js, Express, and PostgreSQL database systems.",
    responsibilities: [
      "Build secure API endpoints and microservices.",
      "Optimize SQL query performance and database indexing.",
      "Write comprehensive unit and integration tests.",
    ],
    requirements: [
      "3+ years building backend systems with Node.js.",
      "Strong knowledge of PostgreSQL and Redis caching.",
      "Experience with API rate-limiting and JWT authentication.",
    ],
    requiredSkills: ["Node.js", "Express", "PostgreSQL", "GraphQL", "Redis"],
    benefits: ["100% Remote Schedule", "Flexible Hours", "Project Completion Bonuses"],
    companyInfo: "Nexus Systems builds decentralized API engines for Fintech applications.",
  },
];

export default function BrowseJobs() {
  const [jobs] = useState(INITIAL_JOBS);
  const [savedJobIds, setSavedJobIds] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedJobType, setSelectedJobType] = useState("ALL");
  const [selectedWorkplace, setSelectedWorkplace] = useState("ALL");
  const [selectedExperience, setSelectedExperience] = useState("ALL");
  const [minSalary, setMinSalary] = useState(0);

  // Selected Detail & Apply Modal States
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyingJob, setApplyingJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [selectedResume, setSelectedResume] = useState("Alex_Rivera_Resume_2026.pdf");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState("");

  // Toggle Save Job
  const handleToggleSave = (jobId) => {
    setSavedJobIds((prev) => {
      const exists = prev.includes(jobId);
      const updated = exists ? prev.filter((id) => id !== jobId) : [...prev, jobId];
      setNotification(exists ? "Job removed from saved list" : "Job saved to your dashboard!");
      setTimeout(() => setNotification(""), 3000);
      return updated;
    });
  };

  // Share Link Action
  const handleShareJob = (jobTitle) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setNotification(`Share link for "${jobTitle}" copied to clipboard!`);
      setTimeout(() => setNotification(""), 3000);
    }
  };

  // Handle Submit Application
  const handleSubmitApplication = (e) => {
    e.preventDefault();
    if (!applyingJob) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setAppliedJobIds((prev) => [...prev, applyingJob.id]);
      setIsSubmitting(false);
      setNotification(`Application submitted successfully for ${applyingJob.jobTitle}!`);
      setTimeout(() => setNotification(""), 4000);
      setApplyingJob(null);
      setCoverLetter("");
    }, 1000);
  };

  // Filtered Jobs Logic
  const filteredJobs = jobs.filter((job) => {
    // Search Query Match (Title, Company, or Keywords)
    const matchesSearch =
      searchQuery === "" ||
      job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.requiredSkills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );

    // Category Filter
    const matchesCategory = selectedCategory === "ALL" || job.category === selectedCategory;

    // Job Type Filter
    const matchesJobType = selectedJobType === "ALL" || job.jobType === selectedJobType;

    // Workplace Type Filter
    const matchesWorkplace = selectedWorkplace === "ALL" || job.workplaceType === selectedWorkplace;

    // Experience Level Filter
    const matchesExperience = selectedExperience === "ALL" || job.experienceLevel === selectedExperience;

    // Salary Range Filter
    const matchesSalary = job.salaryMin >= minSalary;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesJobType &&
      matchesWorkplace &&
      matchesExperience &&
      matchesSalary
    );
  });

  return (
    <div className="min-h-screen flex-1 bg-[#0a0a0f] text-white p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Browse Opportunities
          </h1>
          <p className="text-gray-400 text-sm pt-1">
            Explore active job listings, filter requirements, and submit application profiles.
          </p>
        </div>
      </div>

      {/* Toast Notification Banner */}
      {notification && (
        <div className="p-4 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold rounded-xl flex items-center gap-2">
          <CheckCircleIcon className="w-4 h-4 text-purple-400 shrink-0" />
          {notification}
        </div>
      )}

      {/* Search Bar & Multi-Criteria Filters */}
      <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-5 space-y-4 shadow-xl">
        {/* Search Bar */}
        <div className="relative">
          <SearchIcon className="w-5 h-5 absolute left-4 top-3.5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by Job Title, Company Name, or Skills (e.g. React, Node)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl text-xs outline-none"
          />
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2.5 bg-[#0a0a0f] border border-gray-800 text-gray-300 rounded-xl outline-none focus:border-purple-500 cursor-pointer"
          >
            <option value="ALL">All Categories</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Design">Design</option>
            <option value="DevOps">DevOps</option>
          </select>

          {/* Job Type */}
          <select
            value={selectedJobType}
            onChange={(e) => setSelectedJobType(e.target.value)}
            className="px-3 py-2.5 bg-[#0a0a0f] border border-gray-800 text-gray-300 rounded-xl outline-none focus:border-purple-500 cursor-pointer"
          >
            <option value="ALL">All Job Types</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Contract">Contract</option>
            <option value="Part-Time">Part-Time</option>
          </select>

          {/* Workplace / Remote */}
          <select
            value={selectedWorkplace}
            onChange={(e) => setSelectedWorkplace(e.target.value)}
            className="px-3 py-2.5 bg-[#0a0a0f] border border-gray-800 text-gray-300 rounded-xl outline-none focus:border-purple-500 cursor-pointer"
          >
            <option value="ALL">All Workplaces</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>

          {/* Experience Level */}
          <select
            value={selectedExperience}
            onChange={(e) => setSelectedExperience(e.target.value)}
            className="px-3 py-2.5 bg-[#0a0a0f] border border-gray-800 text-gray-300 rounded-xl outline-none focus:border-purple-500 cursor-pointer"
          >
            <option value="ALL">All Experience Levels</option>
            <option value="Mid Level">Mid Level</option>
            <option value="Senior Level">Senior Level</option>
          </select>

          {/* Min Salary Range */}
          <select
            value={minSalary}
            onChange={(e) => setMinSalary(Number(e.target.value))}
            className="px-3 py-2.5 bg-[#0a0a0f] border border-gray-800 text-gray-300 rounded-xl outline-none focus:border-purple-500 cursor-pointer col-span-2 sm:col-span-1"
          >
            <option value={0}>Any Salary</option>
            <option value={100000}>$100k+ / year</option>
            <option value={130000}>$130k+ / year</option>
            <option value={150000}>$150k+ / year</option>
          </select>
        </div>
      </div>

      {/* Job Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Showing {filteredJobs.length} available openings</span>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="p-12 text-center bg-[#14141f] border border-gray-800 rounded-2xl text-gray-500 space-y-2">
            <FilterIcon className="w-8 h-8 mx-auto text-gray-600 mb-2" />
            <p className="text-sm">No job postings match your search filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredJobs.map((job) => {
              const isSaved = savedJobIds.includes(job.id);
              const isApplied = appliedJobIds.includes(job.id);

              return (
                <div
                  key={job.id}
                  className="bg-[#14141f] border border-gray-800 hover:border-purple-500/40 rounded-2xl p-6 space-y-5 transition-all shadow-xl flex flex-col justify-between"
                >
                  {/* Card Header: Logo, Company & Title */}
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <img
                          src={job.companyLogo}
                          alt={job.companyName}
                          className="w-12 h-12 rounded-xl object-cover border border-gray-800 shrink-0"
                        />
                        <div>
                          <h2
                            onClick={() => setSelectedJob(job)}
                            className="text-base font-bold text-white hover:text-purple-400 transition-colors cursor-pointer"
                          >
                            {job.jobTitle}
                          </h2>
                          <p className="text-xs text-gray-400 font-medium">
                            {job.companyName}
                          </p>
                        </div>
                      </div>

                      {/* Bookmark Icon */}
                      <button
                        onClick={() => handleToggleSave(job.id)}
                        className={`p-2 rounded-xl border transition-all cursor-pointer ${
                          isSaved
                            ? "bg-purple-500/10 border-purple-500/30 text-purple-400"
                            : "bg-[#0a0a0f] border-gray-800 text-gray-400 hover:text-white"
                        }`}
                      >
                        {isSaved ? (
                          <BookmarkCheckIcon className="w-4 h-4" />
                        ) : (
                          <BookmarkIcon className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Metadata Pills */}
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

                  {/* Card Footer Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-800 text-xs">
                    <span className="text-gray-500 text-[11px]">
                      Posted {job.postedDate}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedJob(job)}
                        className="px-3.5 py-2 bg-[#0a0a0f] hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white rounded-xl transition-all cursor-pointer font-medium"
                      >
                        Details
                      </button>

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
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ========================================== */}
      {/* JOB DETAILS MODAL                          */}
      {/* ========================================== */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-gray-800 pb-5">
              <div className="flex items-center gap-4">
                <img
                  src={selectedJob.companyLogo}
                  alt={selectedJob.companyName}
                  className="w-14 h-14 rounded-2xl object-cover border border-gray-800"
                />
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {selectedJob.jobTitle}
                  </h2>
                  <p className="text-xs text-purple-400 font-semibold">
                    {selectedJob.companyName} • {selectedJob.location}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedJob(null)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#0a0a0f] border border-gray-800 rounded-xl">
              <div className="text-xs space-y-0.5">
                <p className="text-gray-400">Salary Range</p>
                <p className="text-emerald-400 font-bold">{selectedJob.salary}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleToggleSave(selectedJob.id)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#14141f] border border-gray-800 text-gray-300 hover:text-white text-xs font-semibold rounded-xl cursor-pointer"
                >
                  <BookmarkIcon className="w-4 h-4 text-purple-400" />
                  {savedJobIds.includes(selectedJob.id) ? "Saved" : "Save Job"}
                </button>

                <button
                  onClick={() => handleShareJob(selectedJob.jobTitle)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#14141f] border border-gray-800 text-gray-300 hover:text-white text-xs font-semibold rounded-xl cursor-pointer"
                >
                  <ShareIcon className="w-4 h-4 text-blue-400" />
                  Share Job
                </button>

                {appliedJobIds.includes(selectedJob.id) ? (
                  <span className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold rounded-xl text-xs">
                    Applied
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      setApplyingJob(selectedJob);
                      setSelectedJob(null);
                    }}
                    className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl text-xs cursor-pointer shadow-md"
                  >
                    Apply Now
                  </button>
                )}
              </div>
            </div>

            {/* Main Information Breakdown */}
            <div className="space-y-6 text-xs text-gray-300 leading-relaxed">
              <div>
                <h3 className="text-sm font-bold text-white mb-2">
                  Job Description
                </h3>
                <p>{selectedJob.description}</p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-2">
                  Key Responsibilities
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-400">
                  {selectedJob.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-2">
                  Requirements
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-400">
                  {selectedJob.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-2">
                  Perks & Benefits
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedJob.benefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="p-2.5 bg-[#0a0a0f] border border-gray-800 rounded-lg text-gray-300 flex items-center gap-2"
                    >
                      <CheckCircleIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-1">
                <h3 className="text-xs font-bold text-white">
                  About {selectedJob.companyName}
                </h3>
                <p className="text-gray-400">{selectedJob.companyInfo}</p>
                <p className="text-[11px] text-gray-500 pt-2">
                  Application Deadline: <strong>{selectedJob.deadline}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* APPLY FOR JOB MODAL                        */}
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
              {/* Select Resume */}
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

              {/* Cover Letter (Optional) */}
              <div className="space-y-1.5">
                <label className="text-gray-300 font-semibold block">
                  Cover Letter <span className="text-gray-500">(Optional)</span>
                </label>
                <textarea
                  rows={4}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Introduce yourself or briefly highlight your relevant experience for this role..."
                  className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none resize-y"
                />
              </div>

              {/* Submission Footer */}
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