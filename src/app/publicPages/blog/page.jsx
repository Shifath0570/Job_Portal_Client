
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
    Search,
    Calendar,
    User,
    ArrowRight,
    Loader2,
    BookOpen,
    SlidersHorizontal,
    X,
    Clock,
    FileText,
} from "lucide-react";

const BLOG_CATEGORIES = [
    "All",
    "Career Advice",
    "Tech Trends",
    "Interview Prep",
    "Company News",
    "Tutorials",
];

export default function BlogPage() {
    // Data States
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Filter States
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Modal State for "See More" View Details
    const [selectedBlog, setSelectedBlog] = useState(null);

    // Fetch blogs function
    const fetchBlogs = async (overrideParams = {}) => {
        setLoading(true);
        setError(null);

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
            const backendUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
            const response = await fetch(`${backendUrl}/api/blogs?${queryParams.toString()}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch blogs: ${response.statusText}`);
            }

            const result = await response.json();
            setBlogs(result.blogs || result.data || []);
        } catch (err) {
            console.error("Fetch error:", err);
            setError(err.message || "An error occurred while fetching blog posts.");
        } finally {
            setLoading(false);
        }
    };

    // Automatically load all blogs when the page first mounts
    useEffect(() => {
        fetchBlogs();
    }, []);

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
                                placeholder="Search blogs by title or content..."
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
                ) : blogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.map((blog) => (
                            <article
                                key={blog._id}
                                className="group bg-[#14141f] border border-gray-800 hover:border-purple-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] flex flex-col justify-between"
                            >
                                <div>
                                    {/* Blog Image */}
                                    <div className="relative aspect-video w-full overflow-hidden bg-[#0a0a0f]">
                                        <img
                                            src={blog.coverImage || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop&q=80"}
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
                                        <div className="flex items-center gap-4 text-xs text-gray-400">
                                            <span className="flex items-center gap-1.5 truncate">
                                                <User className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                                                <span className="truncate">{blog.authorName || "Editorial Team"}</span>
                                            </span>
                                            <span className="flex items-center gap-1.5 shrink-0">
                                                <Calendar className="w-3.5 h-3.5 text-gray-500" />
                                                {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "Recently"}
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors line-clamp-2 leading-snug">
                                            {blog.title}
                                        </h3>
                                        <p className="text-xs text-gray-400 line-clamp-2 font-mono">
                                            {blog.content}
                                        </p>
                                    </div>
                                </div>

                                <div className="px-6 pb-6 pt-2 flex items-center justify-between">
                                    <span className="text-[11px] text-gray-500 flex items-center gap-1">
                                        <Clock className="w-3 h-3 text-purple-400" />
                                        {blog.readTime || "5 min read"}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedBlog(blog)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 text-xs font-semibold rounded-lg transition-all cursor-pointer"
                                    >
                                        <span>See More</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-12 text-center space-y-4">
                        <SlidersHorizontal className="w-12 h-12 text-gray-600 mx-auto" />
                        <h3 className="text-lg font-semibold text-white">No blog posts found</h3>
                        <p className="text-sm text-gray-400 max-w-sm mx-auto">
                            We couldn&apos;t find any articles matching your search query or selected category.
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

            {/* See More Blog Detail Modal */}
            {selectedBlog && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                    <div className="bg-[#14141f] border border-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
                        
                        {/* Modal Header Actions */}
                        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                                <FileText className="w-5 h-5" />
                                Article Details
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedBlog(null)}
                                className="p-1.5 bg-gray-800/60 hover:bg-gray-800 text-gray-300 hover:text-white rounded-lg cursor-pointer transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Body Content */}
                        <div className="space-y-6 text-gray-200">
                            
                            {/* Category & Read Time */}
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-purple-400 font-medium bg-purple-500/10 px-3 py-1 rounded-full">
                                    {selectedBlog.category || "General"}
                                </span>
                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5 text-purple-400" />
                                    {selectedBlog.readTime || "5 min read"}
                                </span>
                            </div>

                            {/* Title */}
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                                {selectedBlog.title}
                            </h2>

                            {/* Author Information Bar */}
                            <div className="flex items-center gap-3 pt-2">
                                <img
                                    src={selectedBlog.authorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
                                    alt="Author"
                                    className="w-10 h-10 rounded-full object-cover border border-purple-500/30"
                                />
                                <div>
                                    <h4 className="text-sm font-semibold text-white">
                                        {selectedBlog.authorName || "Editorial Team"}
                                    </h4>
                                    <p className="text-[11px] text-gray-400">
                                        Published on {selectedBlog.createdAt ? new Date(selectedBlog.createdAt).toLocaleDateString() : "Recently"}
                                    </p>
                                </div>
                            </div>

                            {/* Cover Image */}
                            {selectedBlog.coverImage && (
                                <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-gray-800">
                                    <img
                                        src={selectedBlog.coverImage}
                                        alt={selectedBlog.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            {/* Main Content Body */}
                            <div className="p-6 bg-[#0a0a0f] border border-gray-800 rounded-2xl font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap text-gray-300">
                                {selectedBlog.content}
                            </div>

                            {/* Additional Gallery / Content Images */}
                            {selectedBlog.images && selectedBlog.images.length > 0 && (
                                <div className="space-y-3 pt-2">
                                    <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                        Article Gallery & Assets ({selectedBlog.images.length})
                                    </h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {selectedBlog.images.map((imgUrl, i) => (
                                            <div key={i} className="bg-[#0a0a0f] border border-gray-800 rounded-xl overflow-hidden p-2">
                                                <img src={imgUrl} alt={`Asset ${i + 1}`} className="w-full h-32 object-cover rounded-lg" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}




