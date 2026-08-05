"use client";

import React, { useState } from "react";
import { Mail } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with: ${email}`);
      setEmail("");
    }
  };

  return (
    <section className="w-full bg-[#0a0a0f] py-16">
      {/* 75% Container Width matching Navbar and Banner */}
      <div className="w-full lg:w-[75%] mx-auto px-4">
        
        {/* Newsletter Card Box */}
        <div className="bg-[#12121a]/80 border border-gray-800/80 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          
          {/* Left Side: Icon & Copy Text */}
          <div className="flex items-center gap-4 text-center md:text-left">
            {/* Blue Icon Badge */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
              <Mail className="w-6 h-6 text-white" />
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                Get The Latest Jobs & Updates
              </h3>
              <p className="text-xs sm:text-sm text-gray-400">
                Subscribe to our newsletter and never miss an update.
              </p>
            </div>
          </div>

          {/* Right Side: Inline Email Input & Subscribe Button Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full md:w-auto flex items-center bg-[#0a0a0f]/80 border border-gray-800 rounded-xl p-1.5 focus-within:border-indigo-500/60 transition-colors"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full md:w-64 lg:w-72 bg-transparent px-3 py-2 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs sm:text-sm px-5 py-2.5 rounded-lg transition-all shadow-md shadow-indigo-500/20 cursor-pointer shrink-0"
            >
              Subscribe
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}

export default Newsletter;