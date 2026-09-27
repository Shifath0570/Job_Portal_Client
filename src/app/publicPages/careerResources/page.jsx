"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  MessageSquare,
  Compass,
  DollarSign,
  Briefcase,
  Laptop,
  Smile,
  Search,
  BookOpen,
  ArrowRight,
  Clock,
  SlidersHorizontal,
  Loader2,
} from "lucide-react";

// Sections / Categories configuration
const SECTIONS = [
  { id: "All", label: "All Resources", icon: BookOpen },
  { id: "Resume Writing Tips", label: "Resume Writing", icon: FileText },
  { id: "Interview Tips", label: "Interview Tips", icon: MessageSquare },
  { id: "Career Advice", label: "Career Advice", icon: Compass },
  { id: "Salary Guide", label: "Salary Guide", icon: DollarSign },
  { id: "Freelancing Guide", label: "Freelancing Guide", icon: Briefcase },
  { id: "Remote Work Tips", label: "Remote Work Tips", icon: Laptop },
  { id: "Soft Skills Development", label: "Soft Skills", icon: Smile },
];

export default function CareerResourcesPage() {
  // Data States
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Filter States
  const [activeSection, setActiveSection] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // GET request triggered by user interaction
  const fetchResources = async (overrideParams = {}) => {
    setLoading(true);
    setError(null);
    setHasLoaded(true);

    const sectionParam =
      overrideParams.section !== undefined ? overrideParams.section : activeSection;
    const searchParam =
      overrideParams.search !== undefined ? overrideParams.search : searchQuery;

    const queryParams = new URLSearchParams({
      ...(sectionParam !== "All" && { section: sectionParam }),
      ...(searchParam && { search: searchParam }),
    });

    try {
      const response = await fetch(`/api/career-resources?${queryParams.toString()}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch resources: ${response.statusText}`);
      }

      const result = await response.json();
      setResources(result.resources || result || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "An error occurred while fetching resources.");
    } finally {
      setLoading(false);
    }
  };

  // Section Switch Handler
  const handleSectionSelect = (sectionId) => {
    setActiveSection(sectionId);
    fetchResources({ section: sectionId });
  };

  // Search Submit Handler
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchResources();
  };

  // Reset Filters Handler
  const handleResetFilters = () => {
    setActiveSection("All");
    setSearchQuery("");
    fetchResources({ section: "All", search: "" });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Title */}
        <div className="text-center md:text-left space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Career Resources & Guides
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Expert advice, guides, and tips to accelerate your professional journey
          </p>
        </div>

        {/* Top Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="bg-[#14141f] border border-gray-800 rounded-2xl p-4 shadow-xl flex flex-col md:flex-row items-center gap-4"
        >
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search guides, resume tips, interview questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#0a0a0f] border border-gray-800 rounded-xl text-sm focus:outline-none focus:border-purple-500 text-white placeholder-gray-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-sm rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            Search Resources
          </button>
        </form>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-800">
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => handleSectionSelect(sec.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                  isActive
                    ? "bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-500/20"
                    : "bg-[#14141f] text-gray-400 border-gray-800 hover:text-white hover:border-gray-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-red-950/40 border border-red-600/60 rounded-2xl text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {/* Main Content States */}
        {loading ? (
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
            <p className="text-sm text-gray-400">Loading career resources from server...</p>
          </div>
        ) : !hasLoaded ? (
          /* Prompt state before user initiates action */
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-12 text-center space-y-4">
            <BookOpen className="w-12 h-12 text-gray-600 mx-auto" />
            <h3 className="text-lg font-semibold text-white">Unlock Career Growth</h3>
            <p className="text-sm text-gray-400 max-w-sm mx-auto">
              Click below to fetch the latest guides on resume optimization, salary negotiations, and interview prep.
            </p>
            <button
              type="button"
              onClick={() => fetchResources()}
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold shadow-lg transition-all cursor-pointer"
            >
              Load Career Resources
            </button>
          </div>
        ) : resources.length > 0 ? (
          /* Resource Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((item) => (
              <div
                key={item.id || item._id}
                className="group bg-[#14141f] border border-gray-800 hover:border-purple-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  {/* Category Tag & Read Time */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/20">
                      {item.section || item.category}
                    </span>
                    {item.readTime && (
                      <span className="flex items-center gap-1 text-gray-400">
                        <Clock className="w-3.5 h-3.5" />
                        {item.readTime}
                      </span>
                    )}
                  </div>

                  {/* Title & Excerpt */}
                  <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">
                    {item.description || item.excerpt}
                  </p>
                </div>

                {/* Footer Read Action */}
                <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {item.author ? `By ${item.author}` : "Free Guide"}
                  </span>
                  <Link
                    href={`/career-resources/${item.id || item._id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors group-hover:translate-x-1 duration-200"
                  >
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-12 text-center space-y-4">
            <SlidersHorizontal className="w-12 h-12 text-gray-600 mx-auto" />
            <h3 className="text-lg font-semibold text-white">No resources found</h3>
            <p className="text-sm text-gray-400 max-w-sm mx-auto">
              We couldnt find any articles matching your search query or section choice.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 bg-purple-600/20 text-purple-300 border border-purple-500/30 rounded-lg text-xs font-semibold hover:bg-purple-600/30 transition-all cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}