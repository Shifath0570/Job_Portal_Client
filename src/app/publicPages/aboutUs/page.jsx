"use client";

import React from "react";
import Link from "next/link";
import {
  Target,
  Eye,
  ShieldCheck,
  Zap,
  Award,
  Users,
  ArrowRight,
  Briefcase,
} from "lucide-react";

// ==========================================
// Custom Brand SVGs
// (Prevents missing export errors in lucide-react)
// ==========================================

const LinkedinIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const GithubIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const FacebookIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// ==========================================
// Mock Data Configuration
// ==========================================

const TEAM_MEMBERS = [
  {
    id: "1",
    name: "Alex Morgan",
    role: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    bio: "Ex-Tech Recruiter with 10+ years of experience bridging top talent with industry leaders.",
    linkedin: "#",
    twitter: "#",
    facebook: "#",
  },
  {
    id: "2",
    name: "David Chen",
    role: "Head of Product",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "Passionate product strategist dedicated to building intuitive and modern career platforms.",
    linkedin: "#",
    github: "#",
    facebook: "#",
  },
  {
    id: "3",
    name: "Sophia Martinez",
    role: "Lead Talent Acquisition",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
    bio: "Specializes in helping companies scale high-performing remote and engineering teams.",
    linkedin: "#",
    twitter: "#",
    instagram: "#",
  },
  {
    id: "4",
    name: "Marcus Vance",
    role: "Engineering Director",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    bio: "Architecting scalable infrastructure to ensure seamless matching algorithms for job seekers.",
    linkedin: "#",
    github: "#",
    twitter: "#",
  },
];

const WHY_CHOOSE_US = [
  {
    icon: ShieldCheck,
    title: "Verified Companies",
    description:
      "Every employer is thoroughly vetted to ensure legitimate and high-quality job opportunities.",
  },
  {
    icon: Zap,
    title: "Instant Job Matching",
    description:
      "Advanced smart filters connect candidates directly with roles that match their exact skillset.",
  },
  {
    icon: Award,
    title: "Career Resources",
    description:
      "Access curated guides, resume tips, and interview coaching to accelerate your professional growth.",
  },
  {
    icon: Users,
    title: "Global Talent Network",
    description:
      "Connecting thousands of candidates with top remote and location-specific tech companies daily.",
  },
];

// ==========================================
// Page Component
// ==========================================

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* 1. Company Introduction Section */}
        <section className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" />
            About Our Platform
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Connecting Talent with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
              Opportunity
            </span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            We are dedicated to transforming how people find jobs and how companies hire talent. Our platform empowers professionals to build meaningful careers through verified listings, intelligent matching, and industry-leading career guidance.
          </p>
        </section>

        {/* 2. Mission & 3. Vision Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="bg-[#14141f] border border-gray-800 hover:border-purple-500/40 rounded-2xl p-8 transition-all duration-300 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Our Mission</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              To simplify and humanize the job search process by providing job seekers with direct access to top-tier companies, transparent salary ranges, and actionable career development resources.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-[#14141f] border border-gray-800 hover:border-indigo-500/40 rounded-2xl p-8 transition-all duration-300 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Our Vision</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              To become the worlds most trusted recruitment ecosystem—where skills are recognized instantly, career growth is accessible to everyone, and hiring is seamless regardless of location.
            </p>
          </div>
        </section>

        {/* 4. Why Choose Us Section */}
        <section className="space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Why Choose Us</h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              Built with precision for candidates and employers seeking efficiency, trust, and growth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE_US.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#14141f] border border-gray-800 hover:border-purple-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] space-y-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. Team Members Section */}
        <section className="space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Meet Our Team</h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              The passionate professionals driving innovation behind our career platform.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="group bg-[#14141f] border border-gray-800 hover:border-purple-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] flex flex-col justify-between"
              >
                <div>
                  {/* Member Image */}
                  <div className="relative aspect-square w-full overflow-hidden bg-[#0a0a0f]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Member Details */}
                  <div className="p-5 space-y-2">
                    <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-medium text-purple-400">
                      {member.role}
                    </p>
                    <p className="text-xs text-gray-400 pt-1 leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {/* Social Links */}
                <div className="px-5 pb-5 pt-2 flex items-center gap-3 border-t border-gray-800/80 text-gray-400">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      className="hover:text-purple-400 transition-colors"
                      aria-label="LinkedIn Profile"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      className="hover:text-purple-400 transition-colors"
                      aria-label="Twitter Profile"
                    >
                      <TwitterIcon className="w-4 h-4" />
                    </a>
                  )}
                  {member.facebook && (
                    <a
                      href={member.facebook}
                      className="hover:text-purple-400 transition-colors"
                      aria-label="Facebook Profile"
                    >
                      <FacebookIcon className="w-4 h-4" />
                    </a>
                  )}
                  {member.github && (
                    <a
                      href={member.github}
                      className="hover:text-purple-400 transition-colors"
                      aria-label="GitHub Profile"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {member.instagram && (
                    <a
                      href={member.instagram}
                      className="hover:text-purple-400 transition-colors"
                      aria-label="Instagram Profile"
                    >
                      <InstagramIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call-to-Action Banner */}
        <section className="bg-gradient-to-r from-purple-900/30 via-[#14141f] to-indigo-900/30 border border-purple-500/20 rounded-2xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Ready to Take the Next Step in Your Career?
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Explore thousands of active job opportunities or post open positions for your company today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Link
              href="/find-jobs"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-sm rounded-xl transition-all shadow-md"
            >
              Find Jobs <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/companies"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#0a0a0f] border border-gray-800 hover:border-purple-500/40 text-gray-300 hover:text-white font-medium text-sm rounded-xl transition-all"
            >
              Explore Employers
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}