"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Code,
  Paintbrush,
  TrendingUp,
  BarChart2,
  HeartPulse,
  Headphones,
  ShieldCheck,
  DollarSign,
  ArrowRight,
  Grid,
  Loader2,
  Search,
} from "lucide-react";

// Fallback icon mapping based on category names
const ICON_MAP = {
  "Software Engineering": Code,
  "Design & Creative": Paintbrush,
  "Marketing & Sales": TrendingUp,
  "Data & Analytics": BarChart2,
  Healthcare: HeartPulse,
  "Customer Support": Headphones,
  Cybersecurity: ShieldCheck,
  "Finance & Accounting": DollarSign,
};

export default function CategoriesPage() {
  // Data States
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState("");

  // GET Request Function triggered on user action
  const fetchCategories = async (query = searchQuery) => {
    setLoading(true);
    setError(null);
    setHasLoaded(true);

    const queryParams = new URLSearchParams({
      ...(query && { search: query }),
    });

    try {
      const response = await fetch(`/api/categories?${queryParams.toString()}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
      }

      const result = await response.json();
      setCategories(result.categories || result || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "An error occurred while fetching categories.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchCategories();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-gray-800">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Job Categories
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Explore open positions by specialized career fields and industries
            </p>
          </div>

          {/* Quick Search */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#14141f] border border-gray-800 rounded-xl text-sm focus:outline-none focus:border-purple-500 text-white placeholder-gray-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-xl transition-all shadow-md cursor-pointer whitespace-nowrap"
            >
              Filter
            </button>
          </form>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-red-950/40 border border-red-600/60 rounded-2xl text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {/* Content States */}
        {loading ? (
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
            <p className="text-sm text-gray-400">Loading categories from server...</p>
          </div>
        ) : !hasLoaded ? (
          /* Prompt state before user initiates action */
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-12 text-center space-y-4">
            <Grid className="w-12 h-12 text-gray-600 mx-auto" />
            <h3 className="text-lg font-semibold text-white">Explore All Job Categories</h3>
            <p className="text-sm text-gray-400 max-w-sm mx-auto">
              Click the button below to load available job categories and live job listings count.
            </p>
            <button
              type="button"
              onClick={() => fetchCategories()}
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold shadow-lg transition-all cursor-pointer"
            >
              Load Categories
            </button>
          </div>
        ) : categories.length > 0 ? (
          /* Categories Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => {
              // Dynamic Icon Selection
              const CategoryIcon = ICON_MAP[category.name] || Grid;

              return (
                <div
                  key={category.id || category._id}
                  className="group bg-[#14141f] border border-gray-800 hover:border-purple-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    {/* Icon Container */}
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-500 transition-all duration-300">
                      <CategoryIcon className="w-6 h-6" />
                    </div>

                    {/* Category Title & Open Jobs Count */}
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-xs font-medium text-gray-400 pt-1">
                        <strong className="text-emerald-400">{category.totalJobs || 0}</strong> Open Jobs
                      </p>
                    </div>
                  </div>

                  {/* Explore Jobs Button */}
                  <Link
                    href={`/jobs?category=${encodeURIComponent(category.name)}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 bg-[#0a0a0f] border border-gray-800 hover:border-purple-500/40 text-xs font-semibold text-gray-200 hover:text-white rounded-xl transition-all duration-200 group-hover:bg-purple-600/10"
                  >
                    <span>Explore Jobs</span>
                    <ArrowRight className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-12 text-center space-y-4">
            <Grid className="w-12 h-12 text-gray-600 mx-auto" />
            <h3 className="text-lg font-semibold text-white">No categories found</h3>
            <p className="text-sm text-gray-400 max-w-sm mx-auto">
              We couldnt find any job category matching your search phrase.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                fetchCategories("");
              }}
              className="px-4 py-2 bg-purple-600/20 text-purple-300 border border-purple-500/30 rounded-lg text-xs font-semibold hover:bg-purple-600/30 transition-all cursor-pointer"
            >
              Reset Search
            </button>
          </div>
        )}

      </div>
    </div>
  );
}




