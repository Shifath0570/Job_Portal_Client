// "use client";

// import React, { useState } from "react";
// import {
//     Building2,
//     Mail,
//     Phone,
//     MapPin,
//     Globe,
//     Users,
//     Calendar,
//     ExternalLink,
//     CheckCircle2,
//     Share2,
//     Code2,
//     MessageSquare,
//     Compass,
// } from "lucide-react";

// export default function CompanyDetailsPage() {
//     // Company data state mapped from your provided object
//     const [company] = useState({
//         identifier: "company_profile_main",
//         address: "123 Tech Avenue, Silicon District (Update Address)",
//         companyLogo: "https://i.ibb.co/d0vYZ4B6/aggri-Nova-Community-post-picture-not-posted.jpg",
//         companyName: "Tech Solution",
//         companySize: "51-200 employees",
//         description: "Tech Solution is a cutting-edge software and technology company dedicated to building robust digital platforms, scalable web applications, and innovative enterprise solutions. We empower businesses to accelerate their growth through modern full-stack engineering and cloud architecture.",
//         email: "sharifulamin4444@gmail.com",
//         industry: "Software and Technology",
//         phoneNumber: "+1 (555) 019-2834",
//         socialLinks: {
//             linkedin: "https://linkedin.com",
//             twitter: "https://twitter.com",
//             facebook: "https://facebook.com",
//             github: "https://github.com",
//         },
//         updatedAt: "2026-10-09T14:04:38.988Z",
//         website: "https://techsolution.example.com",
//     });

//     return (
//         <div className="min-h-screen bg-[#0a0a0f] text-white py-10 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-5xl mx-auto space-y-8">

//                 {/* Hero / Header Banner Card */}
//                 <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
//                     <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

//                     <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
//                         {/* Company Logo */}
//                         <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-[#0a0a0f] border border-purple-500/30 overflow-hidden shrink-0 shadow-lg flex items-center justify-center">
//                             {company.companyLogo ? (
//                                 <img
//                                     src={company.companyLogo}
//                                     alt={company.companyName}
//                                     className="w-full h-full object-cover"
//                                 />
//                             ) : (
//                                 <Building2 className="w-12 h-12 text-purple-400" />
//                             )}
//                         </div>

//                         {/* Title & Industry Info */}
//                         <div className="flex-1 text-center sm:text-left space-y-3">
//                             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//                                 <div>
//                                     <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center justify-center sm:justify-start gap-2">
//                                         {company.companyName}
//                                         <CheckCircle2 className="w-5 h-5 text-purple-400 inline" />
//                                     </h1>
//                                     <p className="text-sm text-purple-300 font-medium pt-1">
//                                         {company.industry}
//                                     </p>
//                                 </div>

//                                 <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold rounded-full self-center sm:self-auto">
//                                     <Users className="w-3.5 h-3.5" />
//                                     {company.companySize}
//                                 </span>
//                             </div>

//                             <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 leading-relaxed">
//                                 {company.description || "No company description provided yet."}
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Main Content Grid */}
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
//                     {/* Left 2 Columns: About & Overview */}
//                     <div className="lg:col-span-2 space-y-6">
//                         <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
//                             <h2 className="text-lg font-bold text-white border-b border-gray-800 pb-3 flex items-center gap-2">
//                                 <Building2 className="w-5 h-5 text-purple-400" />
//                                 About {company.companyName}
//                             </h2>
//                             <p className="text-sm text-gray-300 leading-relaxed font-mono">
//                                 {company.description}
//                             </p>

//                             <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
//                                 <div className="p-4 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-1">
//                                     <span className="text-gray-500 block">Identifier / Slug</span>
//                                     <span className="font-mono text-purple-300">{company.identifier}</span>
//                                 </div>
//                                 <div className="p-4 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-1">
//                                     <span className="text-gray-500 block">Last Updated</span>
//                                     <span className="font-mono text-gray-300">
//                                         {new Date(company.updatedAt).toLocaleDateString()}
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Right Column: Contact & Socials Sidebar */}
//                     <div className="space-y-6">
                        
//                         {/* Contact Information */}
//                         <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
//                             <h3 className="text-sm font-bold text-white border-b border-gray-800 pb-3 uppercase tracking-wider">
//                                 Contact Information
//                             </h3>

//                             <div className="space-y-3 text-xs">
//                                 <div className="flex items-center gap-3 text-gray-300">
//                                     <Mail className="w-4 h-4 text-purple-400 shrink-0" />
//                                     <a href={`mailto:${company.email}`} className="hover:text-purple-300 truncate">
//                                         {company.email || "Not provided"}
//                                     </a>
//                                 </div>

//                                 <div className="flex items-center gap-3 text-gray-300">
//                                     <Phone className="w-4 h-4 text-purple-400 shrink-0" />
//                                     <span>{company.phoneNumber || "Phone not added"}</span>
//                                 </div>

//                                 <div className="flex items-center gap-3 text-gray-300">
//                                     <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
//                                     <span>{company.address || "Address not provided"}</span>
//                                 </div>

//                                 <div className="flex items-center gap-3 text-gray-300">
//                                     <Globe className="w-4 h-4 text-purple-400 shrink-0" />
//                                     {company.website ? (
//                                         <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline flex items-center gap-1 truncate">
//                                             {company.website} <ExternalLink className="w-3 h-3" />
//                                         </a>
//                                     ) : (
//                                         <span className="text-gray-500">Website not linked</span>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Social Networks */}
//                         <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
//                             <h3 className="text-sm font-bold text-white border-b border-gray-800 pb-3 uppercase tracking-wider">
//                                 Social Networks
//                             </h3>

//                             <div className="grid grid-cols-2 gap-3 text-xs">
//                                 <a
//                                     href={company.socialLinks.linkedin || "#"}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="p-3 bg-[#0a0a0f] hover:bg-purple-600/10 border border-gray-800 hover:border-purple-500/40 rounded-xl flex items-center gap-2.5 text-gray-300 transition-all"
//                                 >
//                                     <Share2 className="w-4 h-4 text-blue-400" />
//                                     LinkedIn
//                                 </a>

//                                 <a
//                                     href={company.socialLinks.twitter || "#"}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="p-3 bg-[#0a0a0f] hover:bg-purple-600/10 border border-gray-800 hover:border-purple-500/40 rounded-xl flex items-center gap-2.5 text-gray-300 transition-all"
//                                 >
//                                     <Compass className="w-4 h-4 text-sky-400" />
//                                     Twitter
//                                 </a>

//                                 <a
//                                     href={company.socialLinks.facebook || "#"}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="p-3 bg-[#0a0a0f] hover:bg-purple-600/10 border border-gray-800 hover:border-purple-500/40 rounded-xl flex items-center gap-2.5 text-gray-300 transition-all"
//                                 >
//                                     <MessageSquare className="w-4 h-4 text-indigo-400" />
//                                     Facebook
//                                 </a>

//                                 <a
//                                     href={company.socialLinks.github || "#"}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="p-3 bg-[#0a0a0f] hover:bg-purple-600/10 border border-gray-800 hover:border-purple-500/40 rounded-xl flex items-center gap-2.5 text-gray-300 transition-all"
//                                 >
//                                     <Code2 className="w-4 h-4 text-purple-400" />
//                                     GitHub
//                                 </a>
//                             </div>
//                         </div>

//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// }

"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
    Building2,
    Mail,
    Phone,
    MapPin,
    Globe,
    Users,
    ArrowLeft,
    ExternalLink,
    CheckCircle2,
    Share2,
    Code2,
    MessageSquare,
    Compass,
    Loader2,
} from "lucide-react";

export default function CompanyDetailPage() {
    const params = useParams();
    const companyId = params?.id;

    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

    useEffect(() => {
        if (!companyId) return;

        const fetchCompanyDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${baseUrl}/api/company/${companyId}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch company details: ${response.statusText}`);
                }

                const result = await response.json();
                const data = result.data || result.company || result;
                setCompany(data);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message || "Could not load company details.");
            } finally {
                setLoading(false);
            }
        };

        fetchCompanyDetails();
    }, [companyId, baseUrl]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center justify-center space-y-3">
                <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                <p className="text-sm text-gray-400">Loading company profile...</p>
            </div>
        );
    }

    if (error || !company) {
        return (
            <div className="min-h-screen bg-[#0a0a0f] text-white py-16 px-4 text-center space-y-4">
                <div className="p-4 bg-red-950/40 border border-red-600/60 rounded-2xl text-red-400 text-sm max-w-md mx-auto">
                    {error || "Company not found."}
                </div>
                <Link
                    href="/companies"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Companies
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-8">
                
                {/* Back Button */}
                <div>
                    <Link
                        href="/companies"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors bg-[#14141f] border border-gray-800 px-4 py-2 rounded-xl"
                    >
                        <ArrowLeft className="w-4 h-4 text-purple-400" /> Back to All Companies
                    </Link>
                </div>

                {/* Hero / Header Banner Card */}
                <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
                        {/* Company Logo */}
                        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-[#0a0a0f] border border-purple-500/30 overflow-hidden shrink-0 shadow-lg flex items-center justify-center">
                            {company.companyLogo || company.logo ? (
                                <img
                                    src={company.companyLogo || company.logo}
                                    alt={company.companyName || company.name}
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
                                        {company.companyName || company.name}
                                        <CheckCircle2 className="w-5 h-5 text-purple-400 inline" />
                                    </h1>
                                    <p className="text-sm text-purple-300 font-medium pt-1">
                                        {company.industry || "General Industry"}
                                    </p>
                                </div>

                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold rounded-full self-center sm:self-auto">
                                    <Users className="w-3.5 h-3.5" />
                                    {company.companySize || company.size || "11-50 employees"}
                                </span>
                            </div>

                            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
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
                                About {company.companyName || company.name}
                            </h2>
                            <p className="text-sm text-gray-300 leading-relaxed font-mono">
                                {company.description || "No detailed overview available."}
                            </p>

                            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                                <div className="p-4 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-1">
                                    <span className="text-gray-500 block">Identifier / Slug</span>
                                    <span className="font-mono text-purple-300">{company.identifier || company._id}</span>
                                </div>
                                <div className="p-4 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-1">
                                    <span className="text-gray-500 block">Last Updated</span>
                                    <span className="font-mono text-gray-300">
                                        {company.updatedAt ? new Date(company.updatedAt).toLocaleDateString() : "Recently"}
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
                                    <span>{company.phoneNumber || company.phone || "Phone not added"}</span>
                                </div>

                                <div className="flex items-center gap-3 text-gray-300">
                                    <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                                    <span>{company.address || company.location || "Address not provided"}</span>
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

                        {/* Social Networks */}
                        {company.socialLinks && (
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
                                        <Share2 className="w-4 h-4 text-blue-400" />
                                        LinkedIn
                                    </a>

                                    <a
                                        href={company.socialLinks.twitter || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 bg-[#0a0a0f] hover:bg-purple-600/10 border border-gray-800 hover:border-purple-500/40 rounded-xl flex items-center gap-2.5 text-gray-300 transition-all"
                                    >
                                        <Compass className="w-4 h-4 text-sky-400" />
                                        Twitter
                                    </a>

                                    <a
                                        href={company.socialLinks.facebook || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 bg-[#0a0a0f] hover:bg-purple-600/10 border border-gray-800 hover:border-purple-500/40 rounded-xl flex items-center gap-2.5 text-gray-300 transition-all"
                                    >
                                        <MessageSquare className="w-4 h-4 text-indigo-400" />
                                        Facebook
                                    </a>

                                    <a
                                        href={company.socialLinks.github || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 bg-[#0a0a0f] hover:bg-purple-600/10 border border-gray-800 hover:border-purple-500/40 rounded-xl flex items-center gap-2.5 text-gray-300 transition-all"
                                    >
                                        <Code2 className="w-4 h-4 text-purple-400" />
                                        GitHub
                                    </a>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </div>
    );
}





