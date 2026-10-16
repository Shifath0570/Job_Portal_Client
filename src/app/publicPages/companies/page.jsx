
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Building2,
  Search,
  MapPin,
  Briefcase,
  Users,
  SlidersHorizontal,
  ArrowRight,
  Filter,
  Loader2,
} from "lucide-react";

const INDUSTRIES = [
  "All",
  "Technology",
  "Design & Creative",
  "Marketing & Sales",
  "Finance & Banking",
  "Healthcare",
];

const COMPANY_SIZES = [
  "All",
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "500+ employees",
];

export default function CompaniesPage() {
  // Data States
  const [allCompanies, setAllCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedSize, setSelectedSize] = useState("All");

  // Base API URL configuration
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

  // Fetch all companies from backend
  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseUrl}/api/company/all`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch companies: ${response.statusText}`);
      }

      const result = await response.json();
      
      // Access the array from response (res.data or array directly)
      const rawData = result.data || result.companies || (Array.isArray(result) ? result : []);

      // Normalize schema field mappings
      const formattedCompanies = rawData.map((comp) => ({
        ...comp,
        id: comp._id || comp.id,
        name: comp.companyName || comp.name || "Unnamed Company",
        logo: comp.companyLogo || comp.logo || "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150&auto=format&fit=crop&q=80",
        industry: comp.industry || "General Industry",
        location: comp.location || comp.address || "Remote",
        size: comp.companySize || comp.size || "11-50 employees",
        totalOpenJobs: comp.totalOpenJobs || comp.openJobs || 0,
      }));

      setAllCompanies(formattedCompanies);
      setFilteredCompanies(formattedCompanies);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "An error occurred while fetching companies.");
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  // Initial load on component mount
  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  // Client-side Filter & Search Logic
  const applyFilters = useCallback(
    (query = searchQuery, ind = selectedIndustry, sz = selectedSize) => {
      let updated = [...allCompanies];

      if (query.trim()) {
        const q = query.toLowerCase();
        updated = updated.filter(
          (c) =>
            c.name?.toLowerCase().includes(q) ||
            c.industry?.toLowerCase().includes(q) ||
            c.location?.toLowerCase().includes(q)
        );
      }

      if (ind !== "All") {
        updated = updated.filter(
          (c) => c.industry?.toLowerCase() === ind.toLowerCase()
        );
      }

      if (sz !== "All") {
        updated = updated.filter(
          (c) => c.size?.toLowerCase() === sz.toLowerCase()
        );
      }

      setFilteredCompanies(updated);
    },
    [allCompanies, searchQuery, selectedIndustry, selectedSize]
  );

  // Re-run filtering when search parameters change
  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedIndustry, selectedSize, applyFilters]);

  // Search Form Submit Handler
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    applyFilters();
  };

  // Filter Handlers
  const handleIndustryChange = (industry) => {
    setSelectedIndustry(industry);
    applyFilters(searchQuery, industry, selectedSize);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    applyFilters(searchQuery, selectedIndustry, size);
  };

  // Reset Filters Handler
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedIndustry("All");
    setSelectedSize("All");
    setFilteredCompanies(allCompanies);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Title */}
        <div className="text-center md:text-left space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Explore Companies
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Discover top organizations hiring for your next career move
          </p>
        </div>

        {/* Search & Main Layout Grid */}
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

            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Search Company
              </label>
              <div className="relative flex items-center">
                <Search className="absolute left-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Company name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#0a0a0f] border border-gray-800 rounded-xl text-sm focus:outline-none focus:border-purple-500 text-white placeholder-gray-500 transition-colors"
                />
              </div>
            </form>

            {/* Industry Filter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Industry
              </label>
              <select
                value={selectedIndustry}
                onChange={(e) => handleIndustryChange(e.target.value)}
                className="w-full p-2.5 bg-[#0a0a0f] border border-gray-800 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-purple-500 cursor-pointer"
              >
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>

            {/* Company Size Filter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Company Size
              </label>
              <select
                value={selectedSize}
                onChange={(e) => handleSizeChange(e.target.value)}
                className="w-full p-2.5 bg-[#0a0a0f] border border-gray-800 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-purple-500 cursor-pointer"
              >
                {COMPANY_SIZES.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => applyFilters()}
              className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-xs rounded-xl transition-all shadow-md cursor-pointer"
            >
              Apply Filters
            </button>
          </aside>

          {/* Right Main Grid */}
          <main className="lg:col-span-3 space-y-6">
            {/* Header Counter */}
            <div className="bg-[#14141f] border border-gray-800 rounded-2xl px-6 py-4 flex items-center justify-between">
              <span className="text-sm text-gray-400">
                Found <strong className="text-white">{filteredCompanies.length}</strong> companies
              </span>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="p-4 bg-red-950/40 border border-red-600/60 rounded-2xl text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            {/* Loading / Data / Empty Display States */}
            {loading ? (
              <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-3">
                <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                <p className="text-sm text-gray-400">Fetching companies from server...</p>
              </div>
            ) : filteredCompanies.length > 0 ? (
              /* Company Cards Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCompanies.map((company) => (
                  <div
                    key={company.id}
                    className="group bg-[#14141f] border border-gray-800 hover:border-purple-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] flex flex-col justify-between space-y-5"
                  >
                    {/* Header: Logo & Name */}
                    <div className="flex items-start gap-4">
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="w-14 h-14 rounded-xl object-cover border border-gray-700/60 shrink-0"
                      />
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                          {company.name}
                        </h3>
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-md border border-purple-500/20">
                          <Briefcase className="w-3 h-3" />
                          {company.industry}
                        </span>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="space-y-2 text-xs text-gray-400 pt-2 border-t border-gray-800/80">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-gray-500" />
                        <span>{company.location}</span>
                      </div>
                      {company.size && (
                        <div className="flex items-center gap-2">
                          <Users className="w-3.5 h-3.5 text-gray-500" />
                          <span>{company.size}</span>
                        </div>
                      )}
                    </div>

                    {/* Footer: Open Jobs & Action */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                        {company.totalOpenJobs} Open Jobs
                      </span>

                      <Link
                        href={`/companies/${company.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-300 hover:text-white transition-colors group-hover:translate-x-0.5 duration-200"
                      >
                        View Company <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-12 text-center space-y-4">
                <Filter className="w-12 h-12 text-gray-600 mx-auto" />
                <h3 className="text-lg font-semibold text-white">No companies found</h3>
                <p className="text-sm text-gray-400 max-w-sm mx-auto">
                  We couldn&apos;t find any companies matching your search filters.
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
          </main>
        </div>
      </div>
    </div>
  );
}






