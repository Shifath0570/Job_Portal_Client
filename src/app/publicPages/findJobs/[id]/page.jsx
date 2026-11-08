"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
    Briefcase,
    Building2,
    Mail,
    MapPin,
    Calendar,
    Users,
    DollarSign,
    GraduationCap,
    Clock,
    CheckCircle2,
    ArrowLeft,
    Send,
    Loader2,
    ShieldCheck,
    Award,
} from "lucide-react";

export default function JobDetailPage() {
    const params = useParams();
    const jobId = params?.id;

    // Local job state (Using mock/passed state or dynamic fetch)
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [applying, setApplying] = useState(false);
    const [applied, setApplied] = useState(false);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

    useEffect(() => {
        if (!jobId) return;

        const fetchJobDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${baseUrl}/api/jobs/${jobId}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch job details: ${response.statusText}`);
                }

                const result = await response.json();
                const data = result.data || result.job || result;
                setJob(data);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message || "Could not load job details.");
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [jobId, baseUrl]);

    const handleApply = async () => {
        setApplying(true);
        // Simulate application API submission
        setTimeout(() => {
            setApplying(false);
            setApplied(true);
        }, 1500);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center justify-center space-y-3">
                <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                <p className="text-sm text-gray-400">Loading job opening...</p>
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className="min-h-screen bg-[#0a0a0f] text-white py-16 px-4 text-center space-y-4">
                <div className="p-4 bg-red-950/40 border border-red-600/60 rounded-2xl text-red-400 text-sm max-w-md mx-auto">
                    {error || "Job opening not found."}
                </div>
                <Link
                    href="/jobs"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Job Listings
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-8">
                
                {/* Back Link */}
                <div>
                    <Link
                        href="/jobs"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors bg-[#14141f] border border-gray-800 px-4 py-2 rounded-xl"
                    >
                        <ArrowLeft className="w-4 h-4 text-purple-400" /> Back to All Jobs
                    </Link>
                </div>

                {/* Hero / Header Card */}
                <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 relative z-10">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#0a0a0f] border border-purple-500/30 overflow-hidden shrink-0 shadow-lg flex items-center justify-center">
                                {job.companyLogo ? (
                                    <img
                                        src={job.companyLogo}
                                        alt={job.companyName}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <Building2 className="w-10 h-10 text-purple-400" />
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <span className="text-xs text-purple-400 font-medium bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/20">
                                    {job.category || "Development"}
                                </span>
                                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white pt-1">
                                    {job.title}
                                </h1>
                                <p className="text-sm text-gray-300 font-medium flex items-center justify-center sm:justify-start gap-2">
                                    <Building2 className="w-4 h-4 text-purple-400" />
                                    {job.companyName}
                                    <span className="text-gray-600">•</span>
                                    <span className="text-gray-400">{job.companyEmail}</span>
                                </p>
                            </div>
                        </div>

                        {/* Apply Action Button */}
                        <div className="w-full sm:w-auto shrink-0">
                            {applied ? (
                                <div className="px-6 py-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold rounded-xl flex items-center justify-center gap-2">
                                    <CheckCircle2 className="w-4 h-4" /> Application Submitted
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleApply}
                                    disabled={applying}
                                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg transition-all cursor-pointer inline-flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {applying ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                    {applying ? "Submitting..." : "Apply For This Job"}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Quick Metadata Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-800 text-xs">
                        <div className="p-3 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-1">
                            <span className="text-gray-500 flex items-center gap-1">
                                <DollarSign className="w-3.5 h-3.5 text-purple-400" /> Salary Range
                            </span>
                            <span className="font-semibold text-white">{job.salaryRange || "Competitive"}</span>
                        </div>

                        <div className="p-3 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-1">
                            <span className="text-gray-500 flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-purple-400" /> Location / Mode
                            </span>
                            <span className="font-semibold text-white">{job.location} ({job.remoteOption})</span>
                        </div>

                        <div className="p-3 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-1">
                            <span className="text-gray-500 flex items-center gap-1">
                                <Briefcase className="w-3.5 h-3.5 text-purple-400" /> Employment Type
                            </span>
                            <span className="font-semibold text-white">{job.employmentType}</span>
                        </div>

                        <div className="p-3 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-1">
                            <span className="text-gray-500 flex items-center gap-1">
                                <Users className="w-3.5 h-3.5 text-purple-400" /> Vacancies
                            </span>
                            <span className="font-semibold text-white">{job.vacancies?.toString() || "1"} Openings</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left 2 Columns: Description, Responsibilities & Requirements */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* Job Description */}
                        <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
                            <h2 className="text-lg font-bold text-white border-b border-gray-800 pb-3 flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-purple-400" />
                                Job Description
                            </h2>
                            <p className="text-sm text-gray-300 leading-relaxed font-mono whitespace-pre-line">
                                {job.description || "No description provided."}
                            </p>
                        </div>

                        {/* Responsibilities */}
                        <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
                            <h2 className="text-lg font-bold text-white border-b border-gray-800 pb-3 flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-purple-400" />
                                Key Responsibilities
                            </h2>
                            <p className="text-sm text-gray-300 leading-relaxed font-mono whitespace-pre-line">
                                {job.responsibilities || "Not specified."}
                            </p>
                        </div>

                        {/* Requirements */}
                        <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
                            <h2 className="text-lg font-bold text-white border-b border-gray-800 pb-3 flex items-center gap-2">
                                <Award className="w-5 h-5 text-purple-400" />
                                Requirements & Qualifications
                            </h2>
                            <p className="text-sm text-gray-300 leading-relaxed font-mono whitespace-pre-line">
                                {job.requirements || "Not specified."}
                            </p>
                        </div>

                    </div>

                    {/* Right Column: Required Skills & Overview Sidebar */}
                    <div className="space-y-6">
                        
                        {/* Required Skills */}
                        {job.skills && job.skills.length > 0 && (
                            <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
                                <h3 className="text-sm font-bold text-white border-b border-gray-800 pb-3 uppercase tracking-wider">
                                    Required Skills
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {job.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-purple-600/10 border border-purple-500/30 text-purple-300 text-xs font-semibold rounded-lg"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Additional Info Box */}
                        <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4 text-xs">
                            <h3 className="text-sm font-bold text-white border-b border-gray-800 pb-3 uppercase tracking-wider">
                                Job Overview
                            </h3>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-gray-300">
                                    <span className="text-gray-500 flex items-center gap-1.5">
                                        <Clock className="w-4 h-4 text-purple-400" /> Experience
                                    </span>
                                    <span className="font-semibold text-white">{job.experience || "N/A"} Years</span>
                                </div>

                                <div className="flex items-center justify-between text-gray-300">
                                    <span className="text-gray-500 flex items-center gap-1.5">
                                        <GraduationCap className="w-4 h-4 text-purple-400" /> Education
                                    </span>
                                    <span className="font-semibold text-white truncate max-w-[150px]">{job.education || "Any"}</span>
                                </div>

                                <div className="flex items-center justify-between text-gray-300">
                                    <span className="text-gray-500 flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4 text-purple-400" /> Application Deadline
                                    </span>
                                    <span className="font-semibold text-red-400">{job.deadline || "Open"}</span>
                                </div>

                                <div className="flex items-center justify-between text-gray-300">
                                    <span className="text-gray-500 flex items-center gap-1.5">
                                        <CheckCircle2 className="w-4 h-4 text-purple-400" /> Status
                                    </span>
                                    <span className="font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded">
                                        {job.status || "Active"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Benefits / Perks */}
                        {job.benefits && (
                            <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-3">
                                <h3 className="text-sm font-bold text-white border-b border-gray-800 pb-3 uppercase tracking-wider">
                                    Perks & Benefits
                                </h3>
                                <p className="text-xs text-gray-300 font-mono leading-relaxed">
                                    {job.benefits}
                                </p>
                            </div>
                        )}

                    </div>

                </div>

            </div>
        </div>
    );
}