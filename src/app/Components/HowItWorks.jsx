"use client";

import React from "react";
import { UserPlus, Search, Send, Briefcase } from "lucide-react";

const steps = [
  {
    step: "Step 1",
    title: "Create Account",
    description: "Sign up and create your profile in a few minutes",
    icon: UserPlus,
  },
  {
    step: "Step 2",
    title: "Find Jobs",
    description: "Search and filter jobs that match your skills",
    icon: Search,
  },
  {
    step: "Step 3",
    title: "Apply Jobs",
    description: "Apply to jobs with one click and get hired",
    icon: Send,
  },
  {
    step: "Step 4",
    title: "Get Hired",
    description: "Get hired and start your dream career",
    icon: Briefcase,
  },
];

export function HowItWorks() {
  return (
    <section className="w-full bg-[#0a0a0f] py-16 lg:py-24">
      {/* 75% Container Width matching Navbar and Banner */}
      <div className="w-full lg:w-[75%] mx-auto px-4 text-center">
        
        {/* Section Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-16">
          How It{" "}
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Works
          </span>
        </h2>

        {/* Steps Grid / Timeline Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Connecting Line between step icons (Desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-[1px] bg-gray-800/80 z-0" />
                )}

                {/* Step Icon Badge */}
                <div className="relative z-10 w-14 h-14 rounded-2xl bg-[#12121a]/80 border border-gray-800 group-hover:border-indigo-500/50 flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-indigo-500/10">
                  <Icon className="w-6 h-6 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                </div>

                {/* Step Pill Label */}
                <span className="text-xs font-semibold text-indigo-400 mb-2">
                  {item.step}
                </span>

                {/* Step Title */}
                <h3 className="text-base font-bold text-white mb-2">
                  {item.title}
                </h3>

                {/* Step Description */}
                <p className="text-xs text-gray-400 leading-relaxed max-w-[200px] mx-auto">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;