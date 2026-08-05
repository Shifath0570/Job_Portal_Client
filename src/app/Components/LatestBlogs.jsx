"use client";

import React from "react";
import Link from "next/link";
import { Clock } from "lucide-react";

const blogs = [
  {
    id: 1,
    title: "10 Tips to Ace Your Next Interview",
    category: "Career Tips",
    date: "May 20, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: 2,
    title: "How to Find Remote Jobs in 2024",
    category: "Job Search",
    date: "May 18, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: 3,
    title: "Resume Writing Tips That Get You Hired",
    category: "Resume",
    date: "May 15, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: 4,
    title: "Top Skills to Learn in 2024",
    category: "Career Growth",
    date: "May 12, 2024",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=300",
  },
];

export function LatestBlogs() {
  return (
    <section id="blogs" className="w-full bg-[#0a0a0f] py-16">
      {/* 75% Container Width matching Navbar and Banner */}
      <div className="w-full lg:w-[75%] mx-auto px-4">
        
        {/* Header Row */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Latest{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Blogs
            </span>
          </h2>

          <Link
            href="#all-blogs"
            className="border border-gray-800 hover:border-gray-600 bg-gray-900/50 hover:bg-gray-800/80 text-gray-300 hover:text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer"
          >
            View All Blogs
          </Link>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {blogs.map((post) => (
            <article
              key={post.id}
              className="group flex overflow-hidden bg-[#12121a]/60 hover:bg-[#181826] border border-gray-800/80 hover:border-indigo-500/40 rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 cursor-pointer"
            >
              {/* Left Thumbnail Image */}
              <div className="w-28 sm:w-32 shrink-0 relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Right Content Side */}
              <div className="flex-1 p-4 flex flex-col justify-between text-left">
                <div>
                  {/* Category Pill Tag */}
                  <div className="mb-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-950/60 border border-blue-500/20 text-blue-400 text-[11px] font-medium">
                      {post.category}
                    </span>
                  </div>

                  {/* Blog Title */}
                  <h3 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                </div>

                {/* Date & Read Time Footer */}
                <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-4 font-medium">
                  <span>{post.date}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gray-500" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default LatestBlogs;