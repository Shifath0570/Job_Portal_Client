'use client';

import React from 'react';

export default function CandidateProfilePage() {
  const candidateData = {
    name: 'Alex Rivera', //[cite: 3]
    email: 'alex.rivera@example.com', //[cite: 3]
    phone: '+1 (555) 019-2834', //[cite: 3]
    dob: '04/12/1997', //[cite: 3]
    gender: 'Non-binary', //[cite: 3]
    languages: 'English (Native), Spanish (Intermediate)', //[cite: 3]
    address: '742 Evergreen Terrace, San Francisco, CA', //[cite: 3]
    about:
      'Driven Full-Stack Engineer with over 4 years of experience delivering pixel-perfect Web Apps using React, Node.js, and TypeScript.', //[cite: 3]
    skills: ['React', 'TypeScript', 'Next.js', 'Node.js', 'Tailwind CSS', 'GraphQL'], //[cite: 3]
    experience: [
      'Senior Frontend Engineer at Apex Labs (2023 - Present)', //[cite: 3]
      'Full Stack Developer at Bright Web Studio (2021 - 2023)', //[cite: 3]
    ],
    education: [
      'B.Sc. in Computer Science — University of California, Berkeley (2017 - 2021)', //[cite: 3]
    ],
    resume: {
      fileName: 'Alex_Rivera_Resume_2026.pdf', //[cite: 3]
      size: '1.8 MB', //[cite: 3]
      uploaded: 'Aug 01, 2026', //[cite: 3]
    },
    portfolioUrl: 'https://alexrivera.dev', //[cite: 3]
    githubUrl: 'https://github.com/alexrivera-dev', //[cite: 3]
    linkedinUrl: 'https://linkedin.com/in/alexrivera-dev', //[cite: 3]
  };

  return (
    <div className="min-h-screen flex-1 bg-[#0b0c10] text-gray-200 p-6 md:p-12 font-sans flex justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Sidebar Column (Avatar & Resume & Links) */}
        <div className="space-y-6">
          
          {/* Profile Card */}
          <div className="bg-[#12131a] border border-[#1f212d] rounded-2xl p-6 text-center shadow-xl relative overflow-hidden">
            <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-purple-500/50 shadow-md mb-4 bg-gray-800">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop"
                alt={candidateData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">{candidateData.name}</h1>
            <p className="text-sm text-purple-400 mt-0.5">{candidateData.email}</p>
          </div>

          {/* Resume Document Card */}
          <div className="bg-[#12131a] border border-[#1f212d] rounded-2xl p-6 shadow-md space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Resume Document
            </h2>

            <div className="p-4 bg-[#181a24] border border-[#272a38] rounded-xl flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-200 truncate">{candidateData.resume.fileName}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {candidateData.resume.size} • Uploaded {candidateData.resume.uploaded}
                  </p>
                </div>
                <span className="px-2.5 py-1 bg-purple-900/40 text-purple-300 text-[10px] font-bold rounded-md border border-purple-800/50 uppercase">
                  Active
                </span>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-[#272a38]">
                <button className="flex-1 py-1.5 bg-[#1f212d] hover:bg-[#282b3a] text-xs font-medium rounded-lg text-gray-300 transition">
                  View
                </button>
                <button className="flex-1 py-1.5 bg-purple-600 hover:bg-purple-500 text-xs font-medium rounded-lg text-white transition">
                  Download
                </button>
              </div>
            </div>
          </div>

          {/* Social / Portfolio Links */}
          <div className="bg-[#12131a] border border-[#1f212d] rounded-2xl p-6 shadow-md space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">
              Portfolio & Social Links
            </h2>

            <a
              href={candidateData.portfolioUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3 bg-[#181a24] hover:bg-[#202330] border border-[#272a38] rounded-xl text-xs text-gray-300 transition"
            >
              <span className="font-medium">Portfolio Website</span>
              <span className="text-purple-400">↗</span>
            </a>

            <a
              href={candidateData.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3 bg-[#181a24] hover:bg-[#202330] border border-[#272a38] rounded-xl text-xs text-gray-300 transition"
            >
              <span className="font-medium">GitHub Profile</span>
              <span className="text-purple-400">↗</span>
            </a>

            <a
              href={candidateData.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3 bg-[#181a24] hover:bg-[#202330] border border-[#272a38] rounded-xl text-xs text-gray-300 transition"
            >
              <span className="font-medium">LinkedIn Profile</span>
              <span className="text-purple-400">↗</span>
            </a>
          </div>

        </div>

        {/* Right Details Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* About & Skills */}
          <div className="bg-[#12131a] border border-[#1f212d] rounded-2xl p-6 shadow-md space-y-6">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-3">
                About Me
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">{candidateData.about}</p>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-3">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {candidateData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-[#1e1b4b] border border-purple-800/60 text-purple-300 rounded-lg text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-[#12131a] border border-[#1f212d] rounded-2xl p-6 shadow-md space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-4">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 bg-[#181a24] border border-[#272a38] rounded-xl">
                <p className="text-[10px] uppercase font-bold text-gray-500">Full Name</p>
                <p className="text-sm font-medium text-gray-200 mt-1">{candidateData.name}</p>
              </div>

              <div className="p-3 bg-[#181a24] border border-[#272a38] rounded-xl">
                <p className="text-[10px] uppercase font-bold text-gray-500">Email Address</p>
                <p className="text-sm font-medium text-gray-200 mt-1">{candidateData.email}</p>
              </div>

              <div className="p-3 bg-[#181a24] border border-[#272a38] rounded-xl">
                <p className="text-[10px] uppercase font-bold text-gray-500">Phone Number</p>
                <p className="text-sm font-medium text-gray-200 mt-1">{candidateData.phone}</p>
              </div>

              <div className="p-3 bg-[#181a24] border border-[#272a38] rounded-xl">
                <p className="text-[10px] uppercase font-bold text-gray-500">Date of Birth</p>
                <p className="text-sm font-medium text-gray-200 mt-1">{candidateData.dob}</p>
              </div>

              <div className="p-3 bg-[#181a24] border border-[#272a38] rounded-xl">
                <p className="text-[10px] uppercase font-bold text-gray-500">Gender</p>
                <p className="text-sm font-medium text-gray-200 mt-1">{candidateData.gender}</p>
              </div>

              <div className="p-3 bg-[#181a24] border border-[#272a38] rounded-xl">
                <p className="text-[10px] uppercase font-bold text-gray-500">Languages Spoken</p>
                <p className="text-sm font-medium text-gray-200 mt-1">{candidateData.languages}</p>
              </div>
            </div>

            <div className="p-3 bg-[#181a24] border border-[#272a38] rounded-xl">
              <p className="text-[10px] uppercase font-bold text-gray-500">Address</p>
              <p className="text-sm font-medium text-gray-200 mt-1">{candidateData.address}</p>
            </div>
          </div>

          {/* Experience & Education */}
          <div className="bg-[#12131a] border border-[#1f212d] rounded-2xl p-6 shadow-md space-y-6">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-3">
                Work Experience
              </h2>
              <div className="space-y-3">
                {candidateData.experience.map((exp, index) => (
                  <div key={index} className="p-3 bg-[#181a24] border border-[#272a38] rounded-xl text-sm text-gray-200 font-medium">
                    {exp}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-3">
                Education Details
              </h2>
              <div className="space-y-3">
                {candidateData.education.map((edu, index) => (
                  <div key={index} className="p-3 bg-[#181a24] border border-[#272a38] rounded-xl text-sm text-gray-200 font-medium">
                    {edu}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}