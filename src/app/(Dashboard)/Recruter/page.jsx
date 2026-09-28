'use client';

import React from 'react';

export default function RecruiterProfileDisplay() {
  const profileData = {
    companyName: 'Rifath', //[cite: 2]
    industry: 'Software & Technology', //[cite: 2]
    websiteUrl: 'https://acme.tech', //[cite: 2]
    officialEmail: 'sharifulamin2222@gmail.com', //[cite: 2]
    phoneNumber: '+1 (555) 234-5678', //[cite: 2]
    companySize: '51-200 employees', //[cite: 2]
    headquartersAddress: '100 Innovation Way, Suite 400, San Francisco, CA 94105', //[cite: 2]
    companyDescription:
      'Acme Technologies is a leading software enterprise pioneering next-generation recruitment platforms and automated HR solutions globally.', //[cite: 2]
    socials: {
      linkedin: 'https://linkedin.com/company/acmetechnologies', //[cite: 2]
      twitter: 'https://twitter.com/acmetech', //[cite: 2]
      facebook: 'https://facebook.com/acmetechnologies', //[cite: 2]
      github: 'https://github.com/acmetechnologies', //[cite: 2]
    },
  };

  return (
    <div className="min-h-screen flex-1 bg-[#0b0c10] text-gray-200 p-6 md:p-12 font-sans flex justify-center">
      <div className="w-full max-w-5xl space-y-8">
        
        {/* Header / Banner Card */}
        <div className="bg-[#12131a] border border-[#1f212d] rounded-2xl p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-6">
              {/* Logo Badge */}
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center text-white font-extrabold text-3xl shadow-lg border border-white/10">
                <span>R</span>
              </div>
              
              {/* Main Title & Tagline */}
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">{profileData.companyName}</h1>
                <p className="text-purple-400 font-medium text-sm mt-1">{profileData.industry}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>{profileData.companySize}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <a
                href={profileData.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-[#1e1b4b] hover:bg-[#2e2a72] text-purple-300 border border-purple-800/60 rounded-xl text-sm font-medium transition shadow-sm text-center flex-1 md:flex-none"
              >
                Visit Website
              </a>
              <a
                href={`mailto:${profileData.officialEmail}`}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-medium rounded-xl shadow-lg transition text-center flex-1 md:flex-none"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>

        {/* Overview & Contact Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Info Column (2 cols) */}
          <div className="md:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-[#12131a] border border-[#1f212d] rounded-2xl p-6 shadow-md">
              <h2 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-4">
                About the Company
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                {profileData.companyDescription}
              </p>
            </div>

            {/* Social Media Links */}
            <div className="bg-[#12131a] border border-[#1f212d] rounded-2xl p-6 shadow-md">
              <h2 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-4">
                Social Profiles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(profileData.socials).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3 bg-[#181a24] hover:bg-[#202330] border border-[#272a38] rounded-xl text-sm text-gray-300 transition group"
                  >
                    <span className="capitalize font-medium text-gray-200">{platform}</span>
                    <span className="text-gray-500 group-hover:text-purple-400 transition">→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info Column (1 col) */}
          <div className="space-y-6">
            <div className="bg-[#12131a] border border-[#1f212d] rounded-2xl p-6 shadow-md space-y-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">
                Company Details
              </h2>

              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Official Email</p>
                <a
                  href={`mailto:${profileData.officialEmail}`}
                  className="text-sm text-purple-300 hover:underline break-all"
                >
                  {profileData.officialEmail}
                </a>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Phone Number</p>
                <p className="text-sm text-gray-200 font-medium">{profileData.phoneNumber}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Headquarters</p>
                <p className="text-sm text-gray-300 leading-snug">{profileData.headquartersAddress}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Industry</p>
                <p className="text-sm text-gray-200 font-medium">{profileData.industry}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Company Size</p>
                <p className="text-sm text-gray-200 font-medium">{profileData.companySize}</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}










