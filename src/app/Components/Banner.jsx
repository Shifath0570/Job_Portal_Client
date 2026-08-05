"use client";

import React from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Briefcase, 
  Building2, 
  Users, 
  Bookmark, 
  Search 
} from "lucide-react";

export function Banner() {
  return (
    <section className="relative w-full bg-[#0a0a0f] text-white overflow-hidden py-16 lg:py-24">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Container (75% width on desktop matching your Navbar) */}
      <div className="w-full lg:w-[75%] mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
        
        {/* Left Column: Text & CTAs */}
        <div className="flex-1 max-w-2xl text-center lg:text-left">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Find the career you love</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] mb-6">
            Find Jobs That <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Match Your Skills
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
            Discover thousands of job opportunities with top companies and grow your career to the next level.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-12">
            <Link
              href="#find-jobs"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium px-6 py-3 rounded-lg text-sm transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              Find Jobs
            </Link>

            <Link
              href="#post-job"
              className="flex items-center justify-center gap-2 border border-gray-700 hover:border-gray-500 bg-gray-900/40 hover:bg-gray-800/60 text-gray-200 hover:text-white font-medium px-6 py-3 rounded-lg text-sm transition-all duration-200 cursor-pointer"
            >
              Post a Job
            </Link>
          </div>

          {/* Metrics / Stats Footer */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-800/80 max-w-md mx-auto lg:mx-0">
            
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-gray-900 border border-gray-800 text-purple-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-lg font-bold text-white">25K+</p>
                <p className="text-xs text-gray-400">Jobs Available</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-gray-900 border border-gray-800 text-indigo-400">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-lg font-bold text-white">12K+</p>
                <p className="text-xs text-gray-400">Companies</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-gray-900 border border-gray-800 text-blue-400">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-lg font-bold text-white">50K+</p>
                <p className="text-xs text-gray-400">Active Users</p>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Visual Image & Floating Job Cards */}
        <div className="flex-1 relative w-full flex justify-center items-center">
          
          {/* Main Hero Image Frame */}
          <div className="relative z-10 max-w-md lg:max-w-none">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
              alt="Professional working on laptop"
              className="w-[320px] sm:w-[420px] lg:w-[460px] object-cover rounded-2xl filter drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
            />
          </div>

          {/* Floating Card 1: Google Software Engineer (Top Left) */}
          <div className="absolute top-4 -left-2 sm:left-4 z-20 bg-[#14141f]/90 backdrop-blur-md border border-gray-800 p-3.5 rounded-xl shadow-2xl flex items-center gap-3.5 min-w-[200px] sm:min-w-[220px] animate-bounce-slow">
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center p-2 shadow">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1 text-left">
              <p className="text-xs font-semibold text-white">Software Engineer</p>
              <p className="text-[11px] text-gray-400">Google</p>
              <p className="text-[10px] font-medium text-emerald-400 mt-0.5">$120k - $150k</p>
            </div>
            <button className="text-gray-400 hover:text-purple-400 transition-colors">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>

          {/* Floating Card 2: Dribbble Product Designer (Top Right) */}
          <div className="absolute top-20 -right-2 sm:right-0 z-20 bg-[#14141f]/90 backdrop-blur-md border border-gray-800 p-3.5 rounded-xl shadow-2xl flex items-center gap-3.5 min-w-[190px] sm:min-w-[210px]">
            <div className="w-10 h-10 rounded-lg bg-pink-500/20 border border-pink-500/30 flex items-center justify-center p-2">
              <span className="font-bold text-pink-500 text-sm">D</span>
            </div>
            <div className="flex-1 text-left">
              <p className="text-xs font-semibold text-white">Product Designer</p>
              <p className="text-[11px] text-gray-400">Dribbble</p>
              <p className="text-[10px] font-medium text-emerald-400 mt-0.5">$90k - $120k</p>
            </div>
            <button className="text-gray-400 hover:text-purple-400 transition-colors">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>

          {/* Floating Card 3: Microsoft Frontend Developer (Bottom Right) */}
          <div className="absolute bottom-6 right-2 sm:right-6 z-20 bg-[#14141f]/90 backdrop-blur-md border border-gray-800 p-3.5 rounded-xl shadow-2xl flex items-center gap-3.5 min-w-[210px] sm:min-w-[230px]">
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center p-2 shadow">
              <img
                src="https://www.svgrepo.com/show/448239/microsoft.svg"
                alt="Microsoft Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1 text-left">
              <p className="text-xs font-semibold text-white">Frontend Developer</p>
              <p className="text-[11px] text-gray-400">Microsoft</p>
              <p className="text-[10px] font-medium text-emerald-400 mt-0.5">$110k - $140k</p>
            </div>
            <button className="text-gray-400 hover:text-purple-400 transition-colors">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Banner;