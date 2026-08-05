"use client";

import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Product Designer at Google",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    quote:
      "CareerConnect helped me find my dream job in just a week. The platform is easy to use and has amazing opportunities.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Brown",
    role: "HR Manager at Microsoft",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    quote:
      "As a recruiter, this platform makes hiring so easy. I get quality candidates every time.",
    rating: 5,
  },
  {
    id: 3,
    name: "David Wilson",
    role: "Frontend Developer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    quote:
      "Best job portal I've used so far. The job alerts and recommendations are super helpful.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="w-full bg-[#0a0a0f] py-16 lg:py-24">
      {/* 75% Container Width matching Navbar and Banner */}
      <div className="w-full lg:w-[75%] mx-auto px-4 text-center">
        
        {/* Section Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-12">
          What Our{" "}
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Users
          </span>{" "}
          Say
        </h2>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between p-6 sm:p-7 bg-[#12121a]/60 hover:bg-[#181826] border border-gray-800/80 hover:border-indigo-500/30 rounded-2xl transition-all duration-200 shadow-sm"
            >
              <div>
                {/* Header: User Avatar & Quote Text */}
                <div className="flex items-start gap-4 mb-6">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover shrink-0 border border-gray-700/60"
                  />
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                    {item.quote}
                  </p>
                </div>
              </div>

              {/* Bottom Details: User Info & Rating Stars */}
              <div className="pt-4 border-t border-gray-800/50">
                <h3 className="text-sm font-semibold text-white mb-0.5">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-400 mb-3">
                  {item.role}
                </p>

                {/* Star Ratings */}
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Testimonials;