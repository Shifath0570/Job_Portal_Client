"use client";

import React from "react";
import Link from "next/link";

const topCompanies = [
  {
    id: 1,
    name: "Google",
    jobsCount: "1,245 Jobs",
    logo: "https://www.svgrepo.com/show/475656/google-color.svg",
    isSvg: true,
  },
  {
    id: 2,
    name: "Microsoft",
    jobsCount: "856 Jobs",
    logo: "https://www.svgrepo.com/show/448239/microsoft.svg",
    isSvg: true,
  },
  {
    id: 3,
    name: "Amazon",
    jobsCount: "2,145 Jobs",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazon.svg",
    logoBg: "bg-amber-500/10 border-amber-500/20",
    iconColor: "filter invert",
  },
  {
    id: 4,
    name: "Spotify",
    jobsCount: "425 Jobs",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/spotify.svg",
    logoBg: "bg-emerald-500/10 border-emerald-500/20",
    iconColor: "filter invert brightness-0 saturate-100 invert-[62%] sepia-[82%] saturate-[410%] hue-rotate-[90deg]",
  },
  {
    id: 5,
    name: "Airbnb",
    jobsCount: "325 Jobs",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/airbnb.svg",
    logoBg: "bg-rose-500/10 border-rose-500/20",
    iconColor: "filter invert brightness-0 saturate-100 invert-[38%] sepia-[75%] saturate-[2500%] hue-rotate-[325deg]",
  },
  {
    id: 6,
    name: "Meta",
    jobsCount: "674 Jobs",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/meta.svg",
    logoBg: "bg-blue-500/10 border-blue-500/20",
    iconColor: "filter invert brightness-0 saturate-100 invert-[45%] sepia-[85%] saturate-[1800%] hue-rotate-[190deg]",
  },
];

export function TopCompanies() {
  return (
    <section id="companies" className="w-full bg-[#0a0a0f] py-16">
      {/* 75% Container Width matching Navbar and Banner */}
      <div className="w-full lg:w-[75%] mx-auto px-4">
        
        {/* Header Row */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Top{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Companies
            </span>{" "}
            Hiring
          </h2>

          <Link
            href="#all-companies"
            className="border border-gray-800 hover:border-gray-600 bg-gray-900/50 hover:bg-gray-800/80 text-gray-300 hover:text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer"
          >
            View All Companies
          </Link>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {topCompanies.map((company) => (
            <div
              key={company.id}
              className="group flex flex-col items-center justify-between p-6 bg-[#12121a]/60 hover:bg-[#181826] border border-gray-800/80 hover:border-indigo-500/40 rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 cursor-pointer"
            >
              {/* Logo & Info */}
              <div className="flex flex-col items-center text-center w-full">
                {/* Logo Frame */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center p-2 mb-4 group-hover:scale-105 transition-transform">
                  {company.isSvg ? (
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className={`w-full h-full rounded-xl flex items-center justify-center ${company.logoBg} p-2.5`}>
                      <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        className={`w-full h-full object-contain ${company.iconColor}`}
                      />
                    </div>
                  )}
                </div>

                {/* Company Name */}
                <h3 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors mb-1 truncate w-full">
                  {company.name}
                </h3>

                {/* Open Jobs Counter */}
                <p className="text-xs text-gray-400 font-medium mb-5">
                  {company.jobsCount}
                </p>
              </div>

              {/* View Jobs Button */}
              <button className="w-full py-2 px-3 rounded-lg bg-gray-900/80 hover:bg-gray-800 border border-gray-800/80 hover:border-gray-700 text-xs font-medium text-gray-300 hover:text-white transition-all cursor-pointer">
                View Jobs
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default TopCompanies;