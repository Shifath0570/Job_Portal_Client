"use client";

import React from "react";
import Link from "next/link";
import { 
  Code2, 
  Pencil, 
  Megaphone, 
  TrendingUp, 
  Package, 
  Database 
} from "lucide-react";

const categories = [
  {
    title: "Development",
    jobsCount: "12,345 Jobs",
    icon: Code2,
    badgeBg: "bg-blue-500/10 border-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    title: "Design",
    jobsCount: "8,245 Jobs",
    icon: Pencil,
    badgeBg: "bg-purple-500/10 border-purple-500/20",
    iconColor: "text-purple-400",
  },
  {
    title: "Marketing",
    jobsCount: "6,745 Jobs",
    icon: Megaphone,
    badgeBg: "bg-orange-500/10 border-orange-500/20",
    iconColor: "text-orange-400",
  },
  {
    title: "Sales",
    jobsCount: "4,295 Jobs",
    icon: TrendingUp,
    badgeBg: "bg-emerald-500/10 border-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    title: "Product",
    jobsCount: "3,845 Jobs",
    icon: Package,
    badgeBg: "bg-pink-500/10 border-pink-500/20",
    iconColor: "text-pink-400",
  },
  {
    title: "Data Science",
    jobsCount: "2,945 Jobs",
    icon: Database,
    badgeBg: "bg-amber-500/10 border-amber-500/20",
    iconColor: "text-amber-400",
  },
];

export function PopularCategories() {
  return (
    <section id="categories" className="w-full bg-[#0a0a0f] py-16">
      {/* 75% Container Width matching Navbar and Hero Banner */}
      <div className="w-full lg:w-[75%] mx-auto px-4">
        
        {/* Header Row */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Popular{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Categories
            </span>
          </h2>

          <Link
            href="#all-categories"
            className="border border-gray-800 hover:border-gray-600 bg-gray-900/50 hover:bg-gray-800/80 text-gray-300 hover:text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer"
          >
            Browse All
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <a
                key={cat.title}
                href={`#${cat.title.toLowerCase().replace(" ", "-")}`}
                className="group flex flex-col items-center justify-center text-center p-6 bg-[#12121a]/60 hover:bg-[#181826] border border-gray-800/80 hover:border-indigo-500/40 rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 cursor-pointer"
              >
                {/* Custom Color Badge Container */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center border ${cat.badgeBg} mb-4 group-hover:scale-110 transition-transform duration-200`}
                >
                  <Icon className={`w-6 h-6 ${cat.iconColor}`} />
                </div>

                {/* Category Name */}
                <h3 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors mb-1">
                  {cat.title}
                </h3>

                {/* Jobs Counter */}
                <p className="text-xs text-gray-400 font-medium">
                  {cat.jobsCount}
                </p>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default PopularCategories;