
"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
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

// Robust Mock Database for Fallback & Immediate Responsiveness
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

const parseSalaryNumber = (salaryVal) => {
    if (!salaryVal) return 0;
    if (typeof salaryVal === "number") return salaryVal;
    const numbers = String(salaryVal).replace(/[^0-9]/g, "");
    return numbers ? parseInt(numbers, 10) : 0;
};

export default function FindJobsPage() {
    // Raw Master List from Backend
    const [allJobs, setAllJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    // Fetch All Jobs once on mount (with Fallback to Mock Data)
    useEffect(() => {
        const fetchAllJobs = async () => {
            setLoading(true);
            setError(null);
            try {
                const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
                const response = await fetch(`${baseUrl}/api/jobs`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                const data = await response.json();
                let jobList = [];

                if (Array.isArray(data)) {
                    jobList = data;
                } else if (data && Array.isArray(data.jobs)) {
                    jobList = data.jobs;
                } else if (data && Array.isArray(data.data)) {
                    jobList = data.data;
                }

                setAllJobs(jobList.length > 0 ? jobList : MOCK_JOBS);
            } catch (err) {
                console.warn("Backend API unreachable or failed. Using mock jobs fallback:", err);
                setAllJobs(MOCK_JOBS);
            } finally {
                setLoading(false);
            }
        };

        fetchAllJobs();
    }, []);

    // Filter and Sort Logic computed instantly via useMemo
    const filteredAndSortedJobs = useMemo(() => {
        let result = [...allJobs];

        // 1. Keyword search (Title)
        if (keyword.trim()) {
            const q = keyword.toLowerCase();
            result = result.filter(
                (job) =>
                    job.title?.toLowerCase().includes(q) ||
                    job.description?.toLowerCase().includes(q) ||
                    job.requirements?.toLowerCase().includes(q)
            );
        }

        // 2. Company search
        if (companySearch.trim()) {
            const cQ = companySearch.toLowerCase();
            result = result.filter((job) => {
                const comp = job.company || job.companyName || "";
                return comp.toLowerCase().includes(cQ);
            });
        }

        // 3. Category filter
        if (selectedCategory !== "All") {
            result = result.filter((job) => job.category?.toLowerCase() === selectedCategory.toLowerCase());
        }

        // 4. Location filter
        if (selectedLocation !== "All") {
            result = result.filter((job) => job.location?.toLowerCase().includes(selectedLocation.toLowerCase()));
        }

        // 5. Job Type filter
        if (selectedJobType !== "All") {
            result = result.filter((job) => {
                const type = job.employmentType || job.jobType || "";
                return type.toLowerCase() === selectedJobType.toLowerCase();
            });
        }

        // 6. Min Salary filter
        if (minSalary > 0) {
            result = result.filter((job) => {
                const sal = parseSalaryNumber(job.salary || job.salaryRange);
                return sal >= minSalary;
            });
        }

        // 7. Sorting
        result.sort((a, b) => {
            if (sortBy === "salary-high") {
                return parseSalaryNumber(b.salary || b.salaryRange) - parseSalaryNumber(a.salary || a.salaryRange);
            }
            if (sortBy === "salary-low") {
                return parseSalaryNumber(a.salary || a.salaryRange) - parseSalaryNumber(b.salary || b.salaryRange);
            }
            // "newest" or default
            const dateA = new Date(a.createdAt || a.date || 0);
            const dateB = new Date(b.createdAt || b.date || 0);
            return dateB - dateA;
        });

        return result;
    }, [allJobs, keyword, companySearch, selectedCategory, selectedLocation, selectedJobType, minSalary, sortBy]);

    // Pagination Slicing
    const totalJobs = filteredAndSortedJobs.length;
    const totalPages = Math.max(1, Math.ceil(totalJobs / itemsPerPage));
    const paginatedJobs = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredAndSortedJobs.slice(start, start + itemsPerPage);
    }, [filteredAndSortedJobs, currentPage]);

    // Reset page to 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [keyword, companySearch, selectedCategory, selectedLocation, selectedJobType, minSalary, sortBy]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setCurrentPage(1);
    };

    const handleResetFilters = () => {
        setKeyword("");
        setCompanySearch("");
        setSelectedCategory("All");
        setSelectedLocation("All");
        setSelectedJobType("All");
        setMinSalary(0);
        setSortBy("newest");
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Title */}
                <div className="text-center md:text-left space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Explore Opportunities</h1>
                    <p className="text-gray-400 text-sm sm:text-base">
                        Search through top remote and office positions
                    </p>
                </div>

                {/* Top Search Bar */}
                <form
                    onSubmit={handleSearchSubmit}
                    className="bg-[#14141f] border border-gray-800 rounded-2xl p-4 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-4"
                >
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
                                onChange={(e) => setSelectedCategory(e.target.value)}
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
                                onChange={(e) => setSelectedLocation(e.target.value)}
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
                                onChange={(e) => setSelectedJobType(e.target.value)}
                                className="w-full p-2.5 bg-[#0a0a0f] border border-gray-800 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-purple-500"
                            >
                                {JOB_TYPES.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Minimum Salary Slider */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                <span>Min Salary</span>
                                <span className="text-purple-400 font-bold">${minSalary.toLocaleString()}</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="150000"
                                step="10000"
                                value={minSalary}
                                onChange={(e) => setMinSalary(Number(e.target.value))}
                                className="w-full accent-purple-500 bg-[#0a0a0f] rounded-lg cursor-pointer"
                            />
                        </div>
                    </aside>

                    {/* Right Main Job Grid */}
                    <main className="lg:col-span-3 space-y-6">
                        {/* Results Count & Sort Dropdown */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#14141f] border border-gray-800 rounded-2xl px-6 py-4">
                            <span className="text-sm text-gray-400">
                                Showing <strong className="text-white">{paginatedJobs.length}</strong> of{" "}
                                <strong className="text-white">{totalJobs}</strong> available positions
                            </span>

                            <div className="flex items-center gap-2 text-sm w-full sm:w-auto justify-end">
                                <ArrowUpDown className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-400 whitespace-nowrap">Sort by:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
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

                        {/* Loading State */}
                        {loading ? (
                            <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-3">
                                <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                                <p className="text-sm text-gray-400">Fetching jobs...</p>
                            </div>
                        ) : paginatedJobs.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4">
                                {paginatedJobs.map((job) => {
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

                                            <div className="sm:text-right shrink-0">
                                                <Link
                                                    href={`/publicPages/findJobs/${jobId}`}
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
                            <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-12 text-center space-y-4">
                                <Filter className="w-12 h-12 text-gray-600 mx-auto" />
                                <h3 className="text-lg font-semibold text-white">No jobs found</h3>
                                <p className="text-sm text-gray-400 max-w-sm mx-auto">
                                    We couldn&apos;t find any positions matching your search parameters. Try resetting your filters.
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
                        {!loading && totalPages > 1 && (
                            <div className="flex items-center justify-between pt-4">
                                <button
                                    type="button"
                                    onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
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
                                                onClick={() => setCurrentPage(pageNum)}
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
                                    onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
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






