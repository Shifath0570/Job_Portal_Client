
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Search,
  Building2,
  MapPin,
  Briefcase,
  DollarSign,
  Filter,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Loader2,
} from "lucide-react";

// Mock Fallback Data in case the backend API is unreachable
const MOCK_JOBS = [
  {
    id: "job-1",
    title: "Senior Full Stack Engineer",
    company: "Vercel",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80",
    location: "Remote",
    category: "Software Engineering",
    employmentType: "Full-Time",
    salary: 145000,
    salaryDisplay: "$145,000 - $165,000 / yr",
  },
  {
    id: "job-2",
    title: "Lead Product Designer",
    company: "Figma",
    companyLogo: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=150&auto=format&fit=crop&q=80",
    location: "San Francisco, USA",
    category: "Design",
    employmentType: "Full-Time",
    salary: 130000,
    salaryDisplay: "$130,000 - $150,000 / yr",
  },
  {
    id: "job-3",
    title: "Growth Marketing Manager",
    company: "Stripe",
    companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&auto=format&fit=crop&q=80",
    location: "New York, USA",
    category: "Marketing",
    employmentType: "Full-Time",
    salary: 115000,
    salaryDisplay: "$115,000 / yr",
  },
  {
    id: "job-4",
    title: "Data Scientist & AI Specialist",
    company: "Databricks",
    companyLogo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&auto=format&fit=crop&q=80",
    location: "London, UK",
    category: "Data & Analytics",
    employmentType: "Contract",
    salary: 120000,
    salaryDisplay: "$120,000 / yr",
  },
];

const CATEGORIES = ["All", "Software Engineering", "Design", "Marketing", "Data & Analytics", "Development"];
const JOB_TYPES = ["All", "Full-Time", "Part-Time", "Contract", "Remote", "Full Time"];
const LOCATIONS = ["All", "Remote", "New York, USA", "San Francisco, USA", "London, UK"];

// Helper to parse numerical value from salary strings or numbers
const parseSalaryNumber = (salaryVal) => {
  if (!salaryVal) return 0;
  if (typeof salaryVal === "number") return salaryVal;
  const numbers = String(salaryVal).replace(/[^0-9]/g, "");
  return numbers ? parseInt(numbers, 10) : 0;
};

export default function FindJobsPage() {
  // Data State
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalJobs, setTotalJobs] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  // Search & Filter States
  const [keyword, setKeyword] = useState("");
  const [companySearch, setCompanySearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedJobType, setSelectedJobType] = useState("All");
  const [minSalary, setMinSalary] = useState(0);
  const [sortBy, setSortBy] = useState("newest");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Single GET Request function with fallback logic
  const fetchJobs = useCallback(
    async (params = {}) => {
      setLoading(true);
      setError(null);
      setHasSearched(true);

      const targetPage = params.page !== undefined ? params.page : currentPage;
      const targetSort = params.sortBy !== undefined ? params.sortBy : sortBy;
      const targetKeyword = params.keyword !== undefined ? params.keyword : keyword;
      const targetCompany = params.companySearch !== undefined ? params.companySearch : companySearch;
      const targetCategory = params.category !== undefined ? params.category : selectedCategory;
      const targetLocation = params.location !== undefined ? params.location : selectedLocation;
      const targetJobType = params.jobType !== undefined ? params.jobType : selectedJobType;
      const targetMinSalary = params.minSalary !== undefined ? params.minSalary : minSalary;

      // Construct API Query Parameters
      const queryParams = new URLSearchParams({
        page: targetPage.toString(),
        limit: itemsPerPage.toString(),
        sortBy: targetSort,
      });

      if (targetKeyword) queryParams.append("keyword", targetKeyword);
      if (targetCompany) queryParams.append("company", targetCompany);
      if (targetCategory !== "All") queryParams.append("category", targetCategory);
      if (targetLocation !== "All") queryParams.append("location", targetLocation);
      if (targetJobType !== "All") queryParams.append("jobType", targetJobType);
      if (targetMinSalary > 0) queryParams.append("minSalary", targetMinSalary.toString());

      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
        const response = await fetch(`${baseUrl}/api/jobs?${queryParams.toString()}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();

        if (Array.isArray(data)) {
          setJobs(data);
          setTotalJobs(data.length);
        } else if (data && Array.isArray(data.jobs)) {
          setJobs(data.jobs);
          setTotalJobs(data.totalJobs ?? data.total ?? data.jobs.length);
        } else {
          setJobs([]);
          setTotalJobs(0);
        }
      } catch (err) {
        console.warn("Backend API unreachable. Falling back to mock items:", err);

        // Filter demo items locally as fallback
        const filteredMock = MOCK_JOBS.filter((job) => {
          const compName = job.company || job.companyName || "";
          const empType = job.employmentType || job.jobType || "";
          const jobSalary = parseSalaryNumber(job.salary || job.salaryRange);

          if (targetKeyword && !job.title.toLowerCase().includes(targetKeyword.toLowerCase())) return false;
          if (targetCompany && !compName.toLowerCase().includes(targetCompany.toLowerCase())) return false;
          if (targetCategory !== "All" && job.category !== targetCategory) return false;
          if (targetLocation !== "All" && job.location !== targetLocation) return false;
          if (targetJobType !== "All" && empType !== targetJobType) return false;
          if (targetMinSalary > 0 && jobSalary < targetMinSalary) return false;
          return true;
        });

        setJobs(filteredMock);
        setTotalJobs(filteredMock.length);
      } finally {
        setLoading(false);
      }
    },
    [currentPage, sortBy, keyword, companySearch, selectedCategory, selectedLocation, selectedJobType, minSalary]
  );

  // Automatically fetch jobs on initial component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  // Form Submit Handler
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchJobs({ page: 1 });
  };

  // Generic Filter Change Handler
  const handleFilterChange = (updates) => {
    setCurrentPage(1);
    fetchJobs({ ...updates, page: 1 });
  };

  // Reset Filters Handler
  const handleResetFilters = () => {
    setKeyword("");
    setCompanySearch("");
    setSelectedCategory("All");
    setSelectedLocation("All");
    setSelectedJobType("All");
    setMinSalary(0);
    setSortBy("newest");
    setCurrentPage(1);
    fetchJobs({
      keyword: "",
      companySearch: "",
      category: "All",
      location: "All",
      jobType: "All",
      minSalary: 0,
      sortBy: "newest",
      page: 1,
    });
  };

  // Pagination Handler
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchJobs({ page: newPage });
  };

  const totalPages = Math.max(1, Math.ceil(totalJobs / itemsPerPage));

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Title */}
        <div className="text-center md:text-left space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Explore Opportunities
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Search through thousands of top remote and office positions
          </p>
        </div>

        {/* Top Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="bg-[#14141f] border border-gray-800 rounded-2xl p-4 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-4"
        >
          {/* Keyword Input */}
          <div className="relative flex items-center md:col-span-5">
            <Search className="absolute left-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or keyword..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#0a0a0f] border border-gray-800 rounded-xl text-sm focus:outline-none focus:border-purple-500 text-white placeholder-gray-500 transition-colors"
            />
          </div>

          {/* Company Input */}
          <div className="relative flex items-center md:col-span-5">
            <Building2 className="absolute left-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Filter by company name..."
              value={companySearch}
              onChange={(e) => setCompanySearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#0a0a0f] border border-gray-800 rounded-xl text-sm focus:outline-none focus:border-purple-500 text-white placeholder-gray-500 transition-colors"
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="md:col-span-2 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-sm rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
        </form>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar Filters */}
          <aside className="lg:col-span-1 bg-[#14141f] border border-gray-800 rounded-2xl p-6 h-fit space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-800">
              <div className="flex items-center gap-2 font-semibold text-white">
                <SlidersHorizontal className="w-5 h-5 text-purple-400" />
                <span>Filters</span>
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-purple-400 hover:text-purple-300 font-medium transition-colors cursor-pointer"
              >
                Reset All
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  handleFilterChange({ category: e.target.value });
                }}
                className="w-full p-2.5 bg-[#0a0a0f] border border-gray-800 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-purple-500"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => {
                  setSelectedLocation(e.target.value);
                  handleFilterChange({ location: e.target.value });
                }}
                className="w-full p-2.5 bg-[#0a0a0f] border border-gray-800 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-purple-500"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Job Type Filter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Job Type
              </label>
              <select
                value={selectedJobType}
                onChange={(e) => {
                  setSelectedJobType(e.target.value);
                  handleFilterChange({ jobType: e.target.value });
                }}
                className="w-full p-2.5 bg-[#0a0a0f] border border-gray-800 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-purple-500"
              >
                {JOB_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Minimum Salary Slider Filter */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <span>Min Salary</span>
                <span className="text-purple-400 font-bold">
                  ${minSalary.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="150000"
                step="10000"
                value={minSalary}
                onChange={(e) => setMinSalary(Number(e.target.value))}
                onMouseUp={() => handleFilterChange({ minSalary })}
                onTouchEnd={() => handleFilterChange({ minSalary })}
                className="w-full accent-purple-500 bg-[#0a0a0f] rounded-lg cursor-pointer"
              />
            </div>
          </aside>

          {/* Right Main Job Grid / List Section */}
          <main className="lg:col-span-3 space-y-6">
            {/* Results Count & Sort Dropdown */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#14141f] border border-gray-800 rounded-2xl px-6 py-4">
              <span className="text-sm text-gray-400">
                Showing <strong className="text-white">{jobs.length}</strong> of{" "}
                <strong className="text-white">{totalJobs}</strong> available positions
              </span>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 text-sm w-full sm:w-auto justify-end">
                <ArrowUpDown className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 whitespace-nowrap">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    handleFilterChange({ sortBy: e.target.value });
                  }}
                  className="bg-[#0a0a0f] border border-gray-800 text-white text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-purple-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="salary-high">Salary: High to Low</option>
                  <option value="salary-low">Salary: Low to High</option>
                </select>
              </div>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="p-4 bg-red-950/40 border border-red-600/60 rounded-2xl text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            {/* Loading / Empty / Data States */}
            {loading ? (
              <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-3">
                <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                <p className="text-sm text-gray-400">Fetching jobs...</p>
              </div>
            ) : !hasSearched ? (
              <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-12 text-center space-y-4">
                <Search className="w-12 h-12 text-gray-600 mx-auto" />
                <h3 className="text-lg font-semibold text-white">Find Your Next Job</h3>
                <p className="text-sm text-gray-400 max-w-sm mx-auto">
                  Click the button below or select filters to fetch available positions.
                </p>
                <button
                  type="button"
                  onClick={() => fetchJobs()}
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold shadow-lg transition-all cursor-pointer"
                >
                  Load All Jobs
                </button>
              </div>
            ) : jobs.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {jobs.map((job) => {
                  const jobId = job.id || job._id;
                  const compName = job.company || job.companyName || "Anonymous Company";
                  const empType = job.employmentType || job.jobType || "Full-Time";
                  const salaryText =
                    job.salaryDisplay ||
                    (job.salaryRange ? job.salaryRange : null) ||
                    (job.salary ? `$${job.salary.toLocaleString()}` : "Competitive");

                  return (
                    <div
                      key={jobId}
                      className="group bg-[#14141f] border border-gray-800 hover:border-purple-500/50 rounded-2xl p-5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      {/* Left Column: Job Details */}
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl border border-gray-700/60 bg-[#0a0a0f] overflow-hidden flex items-center justify-center shrink-0">
                          {job.companyLogo ? (
                            <img
                              src={job.companyLogo}
                              alt={compName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Building2 className="w-6 h-6 text-gray-500" />
                          )}
                        </div>

                        <div className="space-y-1">
                          <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                            {job.title}
                          </h3>
                          <p className="text-sm font-medium text-gray-400">{compName}</p>

                          {/* Metadata Pills */}
                          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-gray-400">
                            <span className="flex items-center gap-1 bg-[#0a0a0f] border border-gray-800 px-2.5 py-1 rounded-md">
                              <MapPin className="w-3.5 h-3.5 text-purple-400" />
                              {job.location || "Remote"}
                            </span>
                            <span className="flex items-center gap-1 bg-[#0a0a0f] border border-gray-800 px-2.5 py-1 rounded-md">
                              <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                              {empType}
                            </span>
                            <span className="flex items-center gap-1 bg-[#0a0a0f] border border-gray-800 px-2.5 py-1 rounded-md">
                              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                              {salaryText}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: View Details CTA */}
                      <div className="sm:text-right shrink-0">
                        <Link
                          href={`/jobs/${jobId}`}
                          className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs sm:text-sm rounded-xl transition-all shadow-md hover:shadow-indigo-500/20"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Empty Search Results State */
              <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-12 text-center space-y-4">
                <Filter className="w-12 h-12 text-gray-600 mx-auto" />
                <h3 className="text-lg font-semibold text-white">No jobs found</h3>
                <p className="text-sm text-gray-400 max-w-sm mx-auto">
                  We couldnt find any positions matching your search parameters. Try resetting your filters.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-purple-600/20 text-purple-300 border border-purple-500/30 rounded-lg text-xs font-semibold hover:bg-purple-600/30 transition-all cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            {!loading && hasSearched && totalPages > 1 && (
              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-4 py-2 bg-[#14141f] border border-gray-800 rounded-xl text-xs font-medium text-gray-300 hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNum = idx + 1;
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          currentPage === pageNum
                            ? "bg-purple-600 text-white shadow-md shadow-purple-500/30"
                            : "bg-[#14141f] border border-gray-800 text-gray-400 hover:text-white"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-4 py-2 bg-[#14141f] border border-gray-800 rounded-xl text-xs font-medium text-gray-300 hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}








