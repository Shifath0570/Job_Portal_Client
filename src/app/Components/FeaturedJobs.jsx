"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Clock, DollarSign } from "lucide-react";

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Google",
    logo: "https://www.svgrepo.com/show/475656/google-color.svg",
    location: "Remote",
    type: "Full Time",
    salary: "$120k - $150k",
    badge: "Featured",
  },
  {
    id: 2,
    title: "Product Designer",
    company: "Dribbble",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/dribbble.svg",
    logoBg: "bg-pink-500/20 border-pink-500/30 text-pink-500",
    isSimpleIcon: true,
    location: "Remote",
    type: "Full Time",
    salary: "$90k - $120k",
    badge: "Featured",
  },
  {
    id: 3,
    title: "Backend Developer",
    company: "Spotify",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/spotify.svg",
    logoBg: "bg-emerald-500/20 border-emerald-500/30 text-emerald-400",
    isSimpleIcon: true,
    location: "New York, USA",
    type: "Full Time",
    salary: null, // Salary optional matching third card in design
    badge: "Featured",
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "Amazon",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazon.svg",
    logoBg: "bg-amber-500/20 border-amber-500/30 text-amber-400",
    isSimpleIcon: true,
    location: "Seattle, USA",
    type: "Full Time",
    salary: "$130k - $160k",
    badge: "Featured",
  },
];

export function FeaturedJobs() {
  return (
    <section id="find-jobs" className="w-full bg-[#0a0a0f] py-16">
      {/* 75% Container Width matching Navbar and Banner */}
      <div className="w-full lg:w-[75%] mx-auto px-4">
        
        {/* Header Row */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Featured{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Jobs
            </span>
          </h2>

          <Link
            href="#all-jobs"
            className="border border-gray-800 hover:border-gray-600 bg-gray-900/50 hover:bg-gray-800/80 text-gray-300 hover:text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer"
          >
            View All Jobs
          </Link>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="group flex flex-col justify-between p-5 bg-[#12121a]/60 hover:bg-[#181826] border border-gray-800/80 hover:border-indigo-500/40 rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 cursor-pointer"
            >
              <div>
                {/* Company Logo & Job Header */}
                <div className="flex items-start gap-3.5 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-gray-800 flex items-center justify-center p-2 shrink-0 group-hover:scale-105 transition-transform">
                    {job.isSimpleIcon ? (
                      <div className={`w-full h-full rounded-lg flex items-center justify-center ${job.logoBg}`}>
                        <img
                          src={job.logo}
                          alt={`${job.company} logo`}
                          className="w-5 h-5 filter invert"
                        />
                      </div>
                    ) : (
                      <img
                        src={job.logo}
                        alt={`${job.company} logo`}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 text-left">
                    <h3 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors truncate">
                      {job.title}
                    </h3>
                    <p className="text-xs text-gray-400 truncate mt-0.5">
                      {job.company}
                    </p>
                  </div>
                </div>

                {/* Job Details Meta */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-400 font-medium mb-6">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-500" />
                    <span>{job.location}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-500" />
                    <span>{job.type}</span>
                  </div>

                  {job.salary && (
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-gray-500" />
                      <span>{job.salary}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Tag Badge */}
              <div className="pt-2">
                <span className="inline-block px-3 py-1 rounded-md bg-blue-950/50 border border-blue-500/20 text-blue-400 text-[11px] font-semibold">
                  {job.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default FeaturedJobs;