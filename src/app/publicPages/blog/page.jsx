"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Calendar,
  User,
  ArrowRight,
  Filter,
  Loader2,
  BookOpen,
  SlidersHorizontal,
} from "lucide-react";

// Mock Categories - replace or fetch dynamically if needed
const BLOG_CATEGORIES = [
  "All",
  "Career Development",
  "Job Search Strategy",
  "Interview Prep",
  "Remote Work",
  "Industry Trends",
];

export default function BlogPage() {
  // Data States
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // GET Request function triggered on user interaction
  const fetchBlogs = async (overrideParams = {}) => {
    setLoading(true);
    setError(null);
    setHasLoaded(true);

    const categoryParam =
      overrideParams.category !== undefined
        ? overrideParams.category
        : selectedCategory;
    const searchParam =
      overrideParams.search !== undefined
        ? overrideParams.search
        : searchQuery;

    const queryParams = new URLSearchParams({
      ...(categoryParam !== "All" && { category: categoryParam }),
      ...(searchParam && { search: searchParam }),
    });

    try {
      const response = await fetch(`/api/blogs?${queryParams.toString()}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch blogs: ${response.statusText}`);
      }

      const result = await response.json();
      setBlogs(result.blogs || result || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "An error occurred while fetching blog posts.");
    } finally {
      setLoading(false);
    }
  };

  // Search Submit Handler
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchBlogs();
  };

  // Category Filter Select Handler
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    fetchBlogs({ category });
  };

  // Reset Filters Handler
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    fetchBlogs({ search: "", category: "All" });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Title */}
        <div className="text-center md:text-left space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Latest News & Insights
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Articles, guides, and career insights to keep you ahead in the job market
          </p>
        </div>

        {/* Search & Filter Header Bar */}
        <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-4 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Keyword Search Input */}
          <form onSubmit={handleSearchSubmit} className="md:col-span-8 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search blogs by title or key topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#0a0a0f] border border-gray-800 rounded-xl text-sm focus:outline-none focus:border-purple-500 text-white placeholder-gray-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-sm rounded-xl transition-all shadow-md cursor-pointer whitespace-nowrap"
            >
              Search
            </button>
          </form>

          {/* Category Filter Dropdown */}
          <div className="md:col-span-4 relative">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full py-3 px-4 bg-[#0a0a0f] border border-gray-800 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-purple-500 cursor-pointer"
            >
              {BLOG_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "All" ? "Filter by Category: All" : cat}
                </option>
              ))}
            </select>
          </div>
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
            <p className="text-sm text-gray-400">Fetching blog posts from server...</p>
          </div>
        ) : !hasLoaded ? (
          /* Prompt state before user initiates action */
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-12 text-center space-y-4">
            <BookOpen className="w-12 h-12 text-gray-600 mx-auto" />
            <h3 className="text-lg font-semibold text-white">Explore Career Blogs</h3>
            <p className="text-sm text-gray-400 max-w-sm mx-auto">
              Click the button below to fetch the latest articles, job trends, and expert tips.
            </p>
            <button
              type="button"
              onClick={() => fetchBlogs()}
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold shadow-lg transition-all cursor-pointer"
            >
              Load All Blogs
            </button>
          </div>
        ) : blogs.length > 0 ? (
          /* Blog Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <article
                key={blog.id || blog._id}
                className="group bg-[#14141f] border border-gray-800 hover:border-purple-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] flex flex-col justify-between"
              >
                <div>
                  {/* Blog Image */}
                  <div className="relative aspect-video w-full overflow-hidden bg-[#0a0a0f]">
                    <img
                      src={blog.image || "/placeholder-blog.png"}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {blog.category && (
                      <span className="absolute top-3 left-3 bg-[#0a0a0f]/80 backdrop-blur-md text-purple-400 border border-purple-500/30 text-[11px] font-semibold px-2.5 py-1 rounded-md">
                        {blog.category}
                      </span>
                    )}
                  </div>

                  {/* Blog Info */}
                  <div className="p-6 space-y-3">
                    {/* Meta: Author & Date */}
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-purple-400" />
                        {blog.author || "Editorial Team"}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-500" />
                        {blog.date || "Recently"}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors line-clamp-2 leading-snug">
                      {blog.title}
                    </h3>
                  </div>
                </div>

                {/* Footer Read More Button */}
                <div className="px-6 pb-6 pt-2">
                  <Link
                    href={`/blogs/${blog.id || blog._id}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-12 text-center space-y-4">
            <SlidersHorizontal className="w-12 h-12 text-gray-600 mx-auto" />
            <h3 className="text-lg font-semibold text-white">No blog posts found</h3>
            <p className="text-sm text-gray-400 max-w-sm mx-auto">
              We couldnt find any articles matching your search query or selected category.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 bg-purple-600/20 text-purple-300 border border-purple-500/30 rounded-lg text-xs font-semibold hover:bg-purple-600/30 transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}