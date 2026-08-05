"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#0a0a0f] text-white pt-16 pb-8 relative border-t border-gray-800/60">
      <div className="w-full lg:w-[75%] mx-auto px-4">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-gray-800/80">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-500 to-blue-500 flex items-center justify-center font-bold text-white text-sm shadow-md shadow-purple-500/20">
                C
              </div>
              <span className="text-lg font-extrabold tracking-tight text-white">
                CareerConnect
              </span>
            </Link>

            <p className="text-xs text-gray-400 leading-relaxed mb-6 max-w-xs">
              Your dream job is waiting for you. <br />
              Find it now on CareerConnect.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-[#12121a] hover:bg-gray-800 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-8 h-8 rounded-full bg-[#12121a] hover:bg-gray-800 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-[#12121a] hover:bg-gray-800 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-8 h-8 rounded-full bg-[#12121a] hover:bg-gray-800 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">For Candidates</h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-medium">
              <li><Link href="#browse-jobs" className="hover:text-white transition-colors">Browse Jobs</Link></li>
              <li><Link href="#career-resources" className="hover:text-white transition-colors">Career Resources</Link></li>
              <li><Link href="#resume-builder" className="hover:text-white transition-colors">Resume Builder</Link></li>
              <li><Link href="#job-alerts" className="hover:text-white transition-colors">Job Alerts</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">For Employers</h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-medium">
              <li><Link href="#post-job" className="hover:text-white transition-colors">Post a Job</Link></li>
              <li><Link href="#browse-candidates" className="hover:text-white transition-colors">Browse Candidates</Link></li>
              <li><Link href="#employer-resources" className="hover:text-white transition-colors">Employer Resources</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-medium">
              <li><Link href="#about-us" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#contact-us" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="#careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-medium">
              <li><Link href="#help-center" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="#terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#community" className="hover:text-white transition-colors">Community</Link></li>
              <li><Link href="#sitemap" className="hover:text-white transition-colors">Sitemap</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 text-center sm:text-left w-full">
            © 2024 CareerConnect. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-8 h-8 rounded-lg bg-[#12121a] hover:bg-gray-800 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer shrink-0"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}

export default Footer;