
"use client";

import React, { useState, useEffect } from "react";
import {
    User,
    Building2,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Globe,
    Share2,
    MessageSquare,
    FileText,
    Download,
    Briefcase,
    GraduationCap,
    Languages,
    Sparkles,
    CheckCircle2,
    Edit3,
    Loader2,
} from "lucide-react";

// Mock User Data matching your schemas
const MOCK_SEEKER_USER = {
    email: "sharifulamin5555@gmail.com",
    SeekerName: "Rafid",
    fullName: "Rafid",
    aboutMe:
        "Driven Full-Stack Engineer with over 4 years of experience delivering pixel-perfect Web Apps using React, Node.js, and TypeScript.",
    address: "742 Evergreen Terrace, San Francisco, CA",
    dateOfBirth: "1997-04-12",
    education:
        "B.Sc. in Computer Science — University of California, Berkeley (2017 - 2021)",
    experience:
        "Senior Frontend Engineer at Apex Labs (2023 - Present)\nFull Stack Developer at Bright Web Studio (2021 - 2023)",
    gender: "Non-binary",
    gitHub: "https://github.com/alexrivera-dev",
    linkedIn: "https://linkedin.com/in/alexrivera-dev",
    portfolioWebsite: "https://alexrivera.dev",
    languages: "English (Native), Spanish (Intermediate)",
    phone: "01826987456",
    profilePhoto:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    resume: {
        fileName: "Alex_Rivera_Resume_2026.pdf",
        fileSize: "1.8 MB",
        uploadDate: "Aug 01, 2026",
        fileUrl: "/resumes/alex-rivera-resume.pdf",
    },
    skills: ["React", "TypeScript", "Next.js", "Node.js", "Tailwind CSS", "GraphQL"],
    updatedAt: "2026-10-12T06:48:01.677Z",
};

const MOCK_RECRUITER_USER = {
    email: "sharifulamin2222@gmail.com",
    companyName: "Rifath",
    companyLogo: "https://i.ibb.co/VWSs4HHp/resume-session.jpg",
    companySize: "51-200 employees",
    industry: "Software Farm",
    location: "Chandgaong abashik",
    address: "",
    description: "Leading tech hub specializing in scalable enterprise software solutions.",
    phoneNumber: "01800000000",
    website: "https://rifath.tech",
    socialLinks: {
        linkedin: "https://linkedin.com/company/rifath",
        twitter: "https://twitter.com/rifath_tech",
        facebook: "https://facebook.com/rifath",
        github: "https://github.com/rifath-org",
    },
    updatedAt: "2026-10-16T16:38:41.428Z",
};

export default function UserProfilePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

    useEffect(() => {
        const fetchUserProfile = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${baseUrl}/api/user/profile`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) throw new Error("Failed to load user profile");

                const result = await response.json();
                const data = result.data || result.user || result;
                setUser(data);
            } catch (err) {
                console.warn("Backend API unreachable, using Seeker mock profile:", err);
                setUser(MOCK_SEEKER_USER); // Defaulting to Seeker structure for preview
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [baseUrl]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center justify-center space-y-3">
                <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                <p className="text-sm text-gray-400">Loading user profile...</p>
            </div>
        );
    }

    // Determine account type dynamically
    const isRecruiter = Boolean(user?.companyName || user?.companyLogo || user?.industry);

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-8">
                
                {/* Header Banner Card */}
                <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 relative z-10">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                            
                            {/* Profile / Company Avatar */}
                            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-[#0a0a0f] border border-purple-500/30 overflow-hidden shrink-0 shadow-lg flex items-center justify-center">
                                {isRecruiter ? (
                                    user.companyLogo ? (
                                        <img src={user.companyLogo} alt={user.companyName} className="w-full h-full object-cover" />
                                    ) : (
                                        <Building2 className="w-12 h-12 text-purple-400" />
                                    )
                                ) : user.profilePhoto ? (
                                    <img src={user.profilePhoto} alt={user.fullName || user.SeekerName} className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-12 h-12 text-purple-400" />
                                )}
                            </div>

                            {/* Main Info */}
                            <div className="space-y-2">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold rounded-full">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    {isRecruiter ? "Recruiter Account" : "Job Seeker"}
                                </span>

                                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center justify-center sm:justify-start gap-2">
                                    {isRecruiter ? user.companyName : user.fullName || user.SeekerName}
                                    <CheckCircle2 className="w-5 h-5 text-purple-400" />
                                </h1>

                                <p className="text-xs sm:text-sm text-gray-400 flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                                    <Mail className="w-4 h-4 text-purple-400" /> {user.email}
                                    {(user.phone || user.phoneNumber) && (
                                        <>
                                            <span className="text-gray-600">•</span>
                                            <Phone className="w-4 h-4 text-purple-400" /> {user.phone || user.phoneNumber}
                                        </>
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* Edit Action Button */}
                        <button
                            type="button"
                            className="px-4 py-2 bg-[#0a0a0f] hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white text-xs font-semibold rounded-xl transition-all cursor-pointer inline-flex items-center gap-2"
                        >
                            <Edit3 className="w-3.5 h-3.5 text-purple-400" /> Edit Profile
                        </button>
                    </div>
                </div>

                {/* Body Content rendering depending on role */}
                {isRecruiter ? <RecruiterProfileBody user={user} /> : <SeekerProfileBody user={user} />}

            </div>
        </div>
    );
}

// ==========================================
// JOB SEEKER PROFILE BODY COMPONENT
// ==========================================
function SeekerProfileBody({ user }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Columns */}
            <div className="lg:col-span-2 space-y-6">
                
                {/* About Me */}
                {user.aboutMe && (
                    <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
                        <h2 className="text-lg font-bold text-white border-b border-gray-800 pb-3 flex items-center gap-2">
                            <User className="w-5 h-5 text-purple-400" /> About Me
                        </h2>
                        <p className="text-sm text-gray-300 leading-relaxed">{user.aboutMe}</p>
                    </div>
                )}

                {/* Work Experience */}
                {user.experience && (
                    <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
                        <h2 className="text-lg font-bold text-white border-b border-gray-800 pb-3 flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-purple-400" /> Work Experience
                        </h2>
                        <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line font-mono">
                            {user.experience}
                        </p>
                    </div>
                )}

                {/* Education */}
                {user.education && (
                    <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
                        <h2 className="text-lg font-bold text-white border-b border-gray-800 pb-3 flex items-center gap-2">
                            <GraduationCap className="w-5 h-5 text-purple-400" /> Education
                        </h2>
                        <p className="text-sm text-gray-300 leading-relaxed font-mono">{user.education}</p>
                    </div>
                )}

                {/* Resume Card */}
                {user.resume && (
                    <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
                        <h2 className="text-lg font-bold text-white border-b border-gray-800 pb-3 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-purple-400" /> Attached Resume
                        </h2>
                        <div className="p-4 bg-[#0a0a0f] border border-gray-800 rounded-xl flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div className="space-y-0.5">
                                    <h3 className="text-sm font-semibold text-white">{user.resume.fileName}</h3>
                                    <p className="text-xs text-gray-500">
                                        {user.resume.fileSize} • Uploaded {user.resume.uploadDate}
                                    </p>
                                </div>
                            </div>
                            <a
                                href={user.resume.fileUrl || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-xl transition-all inline-flex items-center gap-2"
                            >
                                <Download className="w-4 h-4" /> Download
                            </a>
                        </div>
                    </div>
                )}
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
                
                {/* Skills */}
                {user.skills && user.skills.length > 0 && (
                    <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-800 pb-3">
                            Skills & Expertise
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {user.skills.map((skill, index) => (
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

                {/* Personal Details */}
                <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4 text-xs">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-800 pb-3">
                        Personal Info
                    </h3>

                    <div className="space-y-3 text-gray-300">
                        {user.dateOfBirth && (
                            <div className="flex items-center gap-3">
                                <Calendar className="w-4 h-4 text-purple-400 shrink-0" />
                                <span>Born: {user.dateOfBirth}</span>
                            </div>
                        )}
                        {user.gender && (
                            <div className="flex items-center gap-3">
                                <User className="w-4 h-4 text-purple-400 shrink-0" />
                                <span>Gender: {user.gender}</span>
                            </div>
                        )}
                        {user.address && (
                            <div className="flex items-center gap-3">
                                <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                                <span>{user.address}</span>
                            </div>
                        )}
                        {user.languages && (
                            <div className="flex items-center gap-3">
                                <Languages className="w-4 h-4 text-purple-400 shrink-0" />
                                <span>{user.languages}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Links */}
                <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-3 text-xs">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-800 pb-3">
                        Portfolio & Socials
                    </h3>
                    <div className="space-y-2">
                        {user.portfolioWebsite && (
                            <a
                                href={user.portfolioWebsite}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-[#0a0a0f] hover:bg-purple-600/10 border border-gray-800 rounded-xl flex items-center gap-3 text-gray-300 transition-all truncate"
                            >
                                <Globe className="w-4 h-4 text-purple-400" /> {user.portfolioWebsite}
                            </a>
                        )}
                        {user.gitHub && (
                            <a
                                href={user.gitHub}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-[#0a0a0f] hover:bg-purple-600/10 border border-gray-800 rounded-xl flex items-center gap-3 text-gray-300 transition-all truncate"
                            >
                                <Share2 className="w-4 h-4 text-white" /> {user.gitHub}
                            </a>
                        )}
                        {user.linkedIn && (
                            <a
                                href={user.linkedIn}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-[#0a0a0f] hover:bg-purple-600/10 border border-gray-800 rounded-xl flex items-center gap-3 text-gray-300 transition-all truncate"
                            >
                                <Share2 className="w-4 h-4 text-blue-400" /> {user.linkedIn}
                            </a>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

// ==========================================
// RECRUITER PROFILE BODY COMPONENT
// ==========================================
function RecruiterProfileBody({ user }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Columns */}
            <div className="lg:col-span-2 space-y-6">
                
                {/* About Company */}
                <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
                    <h2 className="text-lg font-bold text-white border-b border-gray-800 pb-3 flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-purple-400" /> Company Overview
                    </h2>
                    <p className="text-sm text-gray-300 leading-relaxed">
                        {user.description || "No company description added yet."}
                    </p>
                </div>

                {/* Company Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 bg-[#14141f] border border-gray-800 rounded-2xl space-y-1">
                        <span className="text-gray-500 block">Industry Sector</span>
                        <span className="font-semibold text-purple-300 text-sm">{user.industry || "Not Specified"}</span>
                    </div>

                    <div className="p-4 bg-[#14141f] border border-gray-800 rounded-2xl space-y-1">
                        <span className="text-gray-500 block">Company Size</span>
                        <span className="font-semibold text-emerald-400 text-sm">{user.companySize || "N/A"}</span>
                    </div>
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
                
                {/* Contact & Location Info */}
                <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4 text-xs">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-800 pb-3">
                        Location & Contact
                    </h3>

                    <div className="space-y-3 text-gray-300">
                        <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                            <span>{user.location || user.address || "Location not provided"}</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                            <span className="truncate">{user.email}</span>
                        </div>

                        {user.phoneNumber && (
                            <div className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-purple-400 shrink-0" />
                                <span>{user.phoneNumber}</span>
                            </div>
                        )}

                        {user.website && (
                            <div className="flex items-center gap-3">
                                <Globe className="w-4 h-4 text-purple-400 shrink-0" />
                                <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline truncate">
                                    {user.website}
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Social Channels */}
                {user.socialLinks && (
                    <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-3 text-xs">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-800 pb-3">
                            Company Social Networks
                        </h3>

                        <div className="grid grid-cols-2 gap-2">
                            {user.socialLinks.linkedin && (
                                <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-[#0a0a0f] hover:bg-purple-600/10 border border-gray-800 rounded-xl flex items-center gap-2 text-gray-300">
                                    <Share2 className="w-4 h-4 text-blue-400" /> LinkedIn
                                </a>
                            )}
                            {user.socialLinks.twitter && (
                                <a href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-3 bg-[#0a0a0f] hover:bg-purple-600/10 border border-gray-800 rounded-xl flex items-center gap-2 text-gray-300">
                                    <Share2 className="w-4 h-4 text-sky-400" /> Twitter
                                </a>
                            )}
                            {user.socialLinks.facebook && (
                                <a href={user.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="p-3 bg-[#0a0a0f] hover:bg-purple-600/10 border border-gray-800 rounded-xl flex items-center gap-2 text-gray-300">
                                    <MessageSquare className="w-4 h-4 text-indigo-400" /> Facebook
                                </a>
                            )}
                            {user.socialLinks.github && (
                                <a href={user.socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-[#0a0a0f] hover:bg-purple-600/10 border border-gray-800 rounded-xl flex items-center gap-2 text-gray-300">
                                    <Share2 className="w-4 h-4 text-purple-400" /> GitHub
                                </a>
                            )}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}



