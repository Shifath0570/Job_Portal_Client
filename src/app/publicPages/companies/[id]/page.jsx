"use client";

import React, { useState } from "react";
import {
    Building2,
    Mail,
    Phone,
    MapPin,
    Globe,
    Users,
    Calendar,
    Linkedin,
    Twitter,
    Facebook,
    Github,
    ExternalLink,
    CheckCircle2,
    Edit3,
} from "lucide-react";

export default function CompanyDetailsPage() {
    // Company data state mapped from your provided object
    const [company] = useState({
        identifier: "company_profile_main",
        address: "123 Tech Avenue, Silicon District (Update Address)",
        companyLogo: "https://i.ibb.co/d0vYZ4B6/aggri-Nova-Community-post-picture-not-posted.jpg",
        companyName: "Tech Solution",
        companySize: "51-200 employees",
        description: "Tech Solution is a cutting-edge software and technology company dedicated to building robust digital platforms, scalable web applications, and innovative enterprise solutions. We empower businesses to accelerate their growth through modern full-stack engineering and cloud architecture.",
        email: "sharifulamin4444@gmail.com",
        industry: "Software and Technology",
        phoneNumber: "+1 (555) 019-2834",
        socialLinks: {
            linkedin: "https://linkedin.com",
            twitter: "https://twitter.com",
            facebook: "https://facebook.com",
            github: "https://github.com",
        },
        updatedAt: "2026-10-09T14:04:38.988Z",
        website: "https://techsolution.example.com",
    });

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Hero / Header Banner Card */}
                <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
                        {/* Company Logo */}
                        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-[#0a0a0f] border border-purple-500/30 overflow-hidden shrink-0 shadow-lg flex items-center justify-center">
                            {company.companyLogo ? (
                                <img
                                    src={company.companyLogo}
                                    alt={company.companyName}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <Building2 className="w-12 h-12 text-purple-400" />
                            )}
                        </div>

                        {/* Title & Industry Info */}
                        <div className="flex-1 text-center sm:text-left space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center justify-center sm:justify-start gap-2">
                                        {company.companyName}
                                        <CheckCircle2 className="w-5 h-5 text-purple-400 inline" />
                                    </h1>
                                    <p className="text-sm text-purple-300 font-medium pt-1">
                                        {company.industry}
                                    </p>
                                </div>

                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold rounded-full self-center sm:self-auto">
                                    <Users className="w-3.5 h-3.5" />
                                    {company.companySize}
                                </span>
                            </div>

                            <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 leading-relaxed">
                                {company.description || "No company description provided yet."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left 2 Columns: About & Overview */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
                            <h2 className="text-lg font-bold text-white border-b border-gray-800 pb-3 flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-purple-400" />
                                About {company.companyName}
                            </h2>
                            <p className="text-sm text-gray-300 leading-relaxed font-mono">
                                {company.description}
                            </p>

                            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                                <div className="p-4 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-1">
                                    <span className="text-gray-500 block">Identifier / Slug</span>
                                    <span className="font-mono text-purple-300">{company.identifier}</span>
                                </div>
                                <div className="p-4 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-1">
                                    <span className="text-gray-500 block">Last Updated</span>
                                    <span className="font-mono text-gray-300">
                                        {new Date(company.updatedAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact & Socials Sidebar */}
                    <div className="space-y-6">
                        
                        {/* Contact Information */}
                        <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
                            <h3 className="text-sm font-bold text-white border-b border-gray-800 pb-3 uppercase tracking-wider">
                                Contact Information
                            </h3>

                            <div className="space-y-3 text-xs">
                                <div className="flex items-center gap-3 text-gray-300">
                                    <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                                    <a href={`mailto:${company.email}`} className="hover:text-purple-300 truncate">
                                        {company.email || "Not provided"}
                                    </a>
                                </div>

                                <div className="flex items-center gap-3 text-gray-300">
                                    <Phone className="w-4 h-4 text-purple-400 shrink-0" />
                                    <span>{company.phoneNumber || "Phone not added"}</span>
                                </div>

                                <div className="flex items-center gap-3 text-gray-300">
                                    <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                                    <span>{company.address || "Address not provided"}</span>
                                </div>

                                <div className="flex items-center gap-3 text-gray-300">
                                    <Globe className="w-4 h-4 text-purple-400 shrink-0" />
                                    {company.website ? (
                                        <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline flex items-center gap-1 truncate">
                                            {company.website} <ExternalLink className="w-3 h-3" />
                                        </a>
                                    ) : (
                                        <span className="text-gray-500">Website not linked</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
                            <h3 className="text-sm font-bold text-white border-b border-gray-800 pb-3 uppercase tracking-wider">
                                Social Networks
                            </h3>

                            <div className="grid grid-cols-2 gap-3 text-xs">
                                <a
                                    href={company.socialLinks.linkedin || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-[#0a0a0f] hover:bg-purple-600/10 border border-gray-800 hover:border-purple-500/40 rounded-xl flex items-center gap-2.5 text-gray-300 transition-all"
                                >
                                    <Linkedin className="w-4 h-4 text-blue-400" />
                                    LinkedIn
                                </a>

                                <a
                                    href={company.socialLinks.twitter || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-[#0a0a0f] hover:bg-purple-600/10 border border-gray-800 hover:border-purple-500/40 rounded-xl flex items-center gap-2.5 text-gray-300 transition-all"
                                >
                                    <Twitter className="w-4 h-4 text-sky-400" />
                                    Twitter
                                </a>

                                <a
                                    href={company.socialLinks.facebook || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-[#0a0a0f] hover:bg-purple-600/10 border border-gray-800 hover:border-purple-500/40 rounded-xl flex items-center gap-2.5 text-gray-300 transition-all"
                                >
                                    <Facebook className="w-4 h-4 text-indigo-400" />
                                    Facebook
                                </a>

                                <a
                                    href={company.socialLinks.github || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-[#0a0a0f] hover:bg-purple-600/10 border border-gray-800 hover:border-purple-500/40 rounded-xl flex items-center gap-2.5 text-gray-300 transition-all"
                                >
                                    <Github className="w-4 h-4 text-purple-400" />
                                    GitHub
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}




