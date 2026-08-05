"use client";

import React from "react";

const companies = [
  {
    name: "Google",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg",
  },
  {
    name: "Microsoft",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoft.svg",
  },
  {
    name: "Amazon",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazon.svg",
  },
  {
    name: "Airbnb",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/airbnb.svg",
  },
  {
    name: "Meta",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/meta.svg",
  },
  {
    name: "Spotify",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/spotify.svg",
  },
  {
    name: "Uber",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/uber.svg",
  },
  {
    name: "Cisco",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/cisco.svg",
  },
];

export function TrustedCompanies() {
  return (
    <section className="w-full bg-[#0a0a0f] py-12">
      {/* 75% Container Width to align with Navbar and Hero Banner */}
      <div className="w-full lg:w-[75%] mx-auto px-4 text-center">
        
        {/* Section Heading */}
        <h3 className="text-sm font-medium text-gray-300 tracking-wide mb-8">
          Trusted by 1000+ Top Companies
        </h3>

        {/* Responsive Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 items-center justify-center">
          {companies.map((company) => (
            <div
              key={company.name}
              className="group flex items-center justify-center gap-2.5 px-4 py-3.5 bg-[#12121a]/60 hover:bg-[#181824] border border-gray-800/80 hover:border-gray-700/80 rounded-xl transition-all duration-200 cursor-pointer shadow-sm"
            >
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                className="w-5 h-5 filter invert opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <span className="text-sm font-semibold text-white tracking-tight">
                {company.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default TrustedCompanies;