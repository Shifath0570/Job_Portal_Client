
// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   Check,
//   Upload,
//   FileText,
//   Eye,
//   Download,
//   RotateCw,
//   X,
//   Plus,
//   Loader2,
// } from "lucide-react";
// import { authClient } from "@/app/lib/auth-client";

// const INITIAL_PROFILE = {
//   profilePhoto:
//     "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
//   fullName: "Alex Rivera",
//   email: "alex.rivera@example.com",
//   phone: "+1 (555) 019-2834",
//   dateOfBirth: "1997-04-12",
//   gender: "Non-binary",
//   address: "742 Evergreen Terrace, San Francisco, CA",
//   aboutMe:
//     "Driven Full-Stack Engineer with over 4 years of experience delivering pixel-perfect Web Apps using React, Node.js, and TypeScript.",
//   skills: ["React", "TypeScript", "Next.js", "Node.js", "Tailwind CSS", "GraphQL"],
//   experience:
//     "Senior Frontend Engineer at Apex Labs (2023 - Present)\nFull Stack Developer at Bright Web Studio (2021 - 2023)",
//   education:
//     "B.Sc. in Computer Science — University of California, Berkeley (2017 - 2021)",
//   languages: "English (Native), Spanish (Intermediate)",
//   portfolioWebsite: "https://alexrivera.dev",
//   gitHub: "https://github.com/alexrivera-dev",
//   linkedIn: "https://linkedin.com/in/alexrivera-dev",
// };

// const INITIAL_RESUME = {
//   fileName: "Alex_Rivera_Resume_2026.pdf",
//   fileSize: "1.8 MB",
//   uploadDate: "Aug 01, 2026",
//   fileUrl: "/resumes/alex-rivera-resume.pdf",
// };

// export default function SeekerProfile() {
//   const { data: session } = authClient.useSession();
//   const user = session?.user;

//   const [profile, setProfile] = useState(INITIAL_PROFILE);
//   const [resume, setResume] = useState(INITIAL_RESUME);
//   const [newSkill, setNewSkill] = useState("");
//   const [isSaving, setIsSaving] = useState(false);
//   const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
//   const [saveMessage, setSaveMessage] = useState("");
//   const [showResumeModal, setShowResumeModal] = useState(false);

//   // Sync session user name and email when session resolves
//   useEffect(() => {
//     if (user) {
//       setProfile((prev) => ({
//         ...prev,
//         fullName: user.name || prev.fullName,
//         email: user.email || prev.email,
//         profilePhoto: user.image || prev.profilePhoto,
//       }));
//     }
//   }, [user]);

//   // General Field Updates
//   const handleChange = (field, value) => {
//     setProfile((prev) => ({ ...prev, [field]: value }));
//   };

//   // Add Skill
//   const handleAddSkill = (e) => {
//     e.preventDefault();
//     if (!newSkill.trim()) return;
//     if (!profile.skills.includes(newSkill.trim())) {
//       setProfile((prev) => ({
//         ...prev,
//         skills: [...prev.skills, newSkill.trim()],
//       }));
//     }
//     setNewSkill("");
//   };

//   // Remove Skill
//   const handleRemoveSkill = (skillToRemove) => {
//     setProfile((prev) => ({
//       ...prev,
//       skills: prev.skills.filter((skill) => skill !== skillToRemove),
//     }));
//   };

//   // Handle ImgBB Photo Upload
//   const handlePhotoUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setIsUploadingPhoto(true);
//     try {
//       const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
//       if (!apiKey) {
//         throw new Error("ImgBB API key is missing in environment variables.");
//       }

//       const formData = new FormData();
//       formData.append("image", file);

//       const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();

//       if (data.success && data.data?.url) {
//         handleChange("profilePhoto", data.data.url);
//         setSaveMessage("Profile picture uploaded successfully to ImgBB!");
//         setTimeout(() => setSaveMessage(""), 4000);
//       } else {
//         throw new Error(data.error?.message || "Failed to upload image to ImgBB");
//       }
//     } catch (error) {
//       console.error("Image Upload Error:", error);
//       alert(`Error uploading photo: ${error.message}`);
//     } finally {
//       setIsUploadingPhoto(false);
//     }
//   };

//   // Handle Resume Upload or Replace
//   const handleResumeFileSelect = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const allowedTypes = [
//         "application/pdf",
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//         "application/msword",
//       ];
//       if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|docx|doc)$/i)) {
//         alert("Invalid file format! Please upload a PDF or DOCX file.");
//         return;
//       }
//       setResume({
//         fileName: file.name,
//         fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
//         uploadDate: new Date().toLocaleDateString("en-US", {
//           month: "short",
//           day: "2-digit",
//           year: "numeric",
//         }),
//         fileUrl: URL.createObjectURL(file),
//       });
//       setSaveMessage("Resume successfully updated!");
//       setTimeout(() => setSaveMessage(""), 4000);
//     }
//   };

//   // Save Entire Profile to Backend API
//   const handleSubmitProfile = async (e) => {
//     e.preventDefault();

//     if (!profile.email) {
//       setSaveMessage("User email is required to update profile.");
//       return;
//     }

//     setIsSaving(true);
//     setSaveMessage("");

//     const payload = {
//       ...profile,
//       SeekerName: profile.fullName,
//       email: profile.email,
//     };

//     try {
//       const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
//       const response = await fetch(
//         `${baseUrl}/api/seeker/profile/${encodeURIComponent(profile.email)}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok || (data && data.success === false)) {
//         throw new Error(data?.message || "Failed to update profile");
//       }

//       setSaveMessage("Seeker profile saved successfully!");
//       setTimeout(() => setSaveMessage(""), 4000);
//     } catch (error) {
//       console.error("Server update failed:", error);
//       setSaveMessage(`Error saving profile: ${error.message}`);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex-1 bg-[#0a0a0f] text-white p-4 sm:p-6 lg:p-8 space-y-8">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800/80">
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
//             My Profile
//           </h1>
//           <p className="text-gray-400 text-sm pt-1">
//             Manage your personal information, resume document, skills, and portfolio links.
//           </p>
//         </div>

//         <div className="flex items-center gap-3">
//           <button
//             type="button"
//             onClick={handleSubmitProfile}
//             disabled={isSaving}
//             className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50"
//           >
//             <Check className="w-4 h-4" />
//             {isSaving ? "Saving..." : "Save Changes"}
//           </button>
//         </div>
//       </div>

//       {/* Success Notification Banner */}
//       {saveMessage && (
//         <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold rounded-xl flex items-center gap-2">
//           <Check className="w-4 h-4 shrink-0" />
//           {saveMessage}
//         </div>
//       )}

//       {/* Main Grid Content */}
//       <form onSubmit={handleSubmitProfile} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//         {/* Left Column - Photo & Resume Management */}
//         <div className="lg:col-span-4 space-y-8">
//           {/* Profile Photo Card */}
//           <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl flex flex-col items-center text-center space-y-4">
//             <div className="relative group">
//               <img
//                 src={profile.profilePhoto}
//                 alt={profile.fullName}
//                 className="w-32 h-32 rounded-2xl object-cover border-2 border-purple-500/30 shadow-lg"
//               />
//               <label
//                 htmlFor="photoUploadInput"
//                 className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-xs text-white cursor-pointer transition-opacity"
//               >
//                 {isUploadingPhoto ? (
//                   <>
//                     <Loader2 className="w-5 h-5 mb-1 animate-spin text-purple-400" />
//                     <span>Uploading...</span>
//                   </>
//                 ) : (
//                   <>
//                     <Upload className="w-5 h-5 mb-1" />
//                     <span>Change Photo</span>
//                   </>
//                 )}
//               </label>
//               <input
//                 id="photoUploadInput"
//                 type="file"
//                 accept="image/*"
//                 onChange={handlePhotoUpload}
//                 disabled={isUploadingPhoto}
//                 className="hidden"
//               />
//             </div>

//             <div>
//               <h2 className="text-lg font-bold text-white">{profile.fullName}</h2>
//               <p className="text-xs text-purple-400 font-medium pt-0.5">{profile.email}</p>
//             </div>
//           </div>

//           {/* Resume Upload & Actions Card */}
//           <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-5">
//             <div className="flex items-center justify-between pb-3 border-b border-gray-800">
//               <div className="flex items-center gap-2">
//                 <FileText className="w-5 h-5 text-purple-400" />
//                 <h2 className="text-base font-bold text-white">Resume Document</h2>
//               </div>
//               <span className="text-[10px] text-gray-500">PDF, DOCX supported</span>
//             </div>

//             {resume ? (
//               <div className="space-y-4">
//                 <div className="p-4 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-2">
//                   <div className="flex items-center justify-between">
//                     <span className="text-xs font-bold text-white truncate max-w-[180px]">
//                       {resume.fileName}
//                     </span>
//                     <span className="text-[10px] text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
//                       Active
//                     </span>
//                   </div>
//                   <div className="flex justify-between text-[11px] text-gray-500">
//                     <span>{resume.fileSize}</span>
//                     <span>Uploaded: {resume.uploadDate}</span>
//                   </div>
//                 </div>

//                 {/* Resume Action Buttons */}
//                 <div className="grid grid-cols-2 gap-2 text-xs">
//                   <button
//                     type="button"
//                     onClick={() => setShowResumeModal(true)}
//                     className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#0a0a0f] hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white rounded-xl transition-all cursor-pointer"
//                   >
//                     <Eye className="w-3.5 h-3.5 text-purple-400" />
//                     View
//                   </button>

//                   <a
//                     href={resume.fileUrl}
//                     download={resume.fileName}
//                     className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#0a0a0f] hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white rounded-xl transition-all cursor-pointer"
//                   >
//                     <Download className="w-3.5 h-3.5 text-emerald-400" />
//                     Download
//                   </a>
//                 </div>

//                 {/* Replace Resume Button */}
//                 <label
//                   htmlFor="resumeReplaceInput"
//                   className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0a0a0f] hover:bg-purple-600/10 border border-gray-800 hover:border-purple-500/40 text-purple-400 text-xs font-semibold rounded-xl cursor-pointer transition-all"
//                 >
//                   <RotateCw className="w-4 h-4" />
//                   Replace Resume
//                 </label>
//                 <input
//                   id="resumeReplaceInput"
//                   type="file"
//                   accept=".pdf,.docx,.doc"
//                   onChange={handleResumeFileSelect}
//                   className="hidden"
//                 />
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 <label
//                   htmlFor="resumeUploadInput"
//                   className="w-full p-6 border-2 border-dashed border-gray-800 hover:border-purple-500/50 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-[#0a0a0f]"
//                 >
//                   <Upload className="w-8 h-8 text-purple-400 mb-2" />
//                   <span className="text-xs font-semibold text-white">Upload Resume</span>
//                   <span className="text-[10px] text-gray-500 mt-1">
//                     Drag and drop or browse (.PDF, .DOCX)
//                   </span>
//                 </label>
//                 <input
//                   id="resumeUploadInput"
//                   type="file"
//                   accept=".pdf,.docx,.doc"
//                   onChange={handleResumeFileSelect}
//                   className="hidden"
//                 />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Right Column - Profile Form Inputs */}
//         <div className="lg:col-span-8 space-y-8">
//           {/* Basic Personal Information */}
//           <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-5">
//             <h2 className="text-base font-bold text-white pb-3 border-b border-gray-800">
//               Personal Information
//             </h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
//               <div>
//                 <label className="text-gray-400 font-semibold block mb-1">
//                   Full Name *
//                 </label>
//                 <input
//                   type="text"
//                   value={profile.fullName}
//                   onChange={(e) => handleChange("fullName", e.target.value)}
//                   className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="text-gray-400 font-semibold block mb-1">
//                   Email Address *
//                 </label>
//                 <input
//                   type="email"
//                   value={profile.email}
//                   onChange={(e) => handleChange("email", e.target.value)}
//                   className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="text-gray-400 font-semibold block mb-1">
//                   Phone Number
//                 </label>
//                 <input
//                   type="text"
//                   value={profile.phone}
//                   onChange={(e) => handleChange("phone", e.target.value)}
//                   className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none"
//                 />
//               </div>

//               <div>
//                 <label className="text-gray-400 font-semibold block mb-1">
//                   Date of Birth
//                 </label>
//                 <input
//                   type="date"
//                   value={profile.dateOfBirth}
//                   onChange={(e) => handleChange("dateOfBirth", e.target.value)}
//                   className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none"
//                 />
//               </div>

//               <div>
//                 <label className="text-gray-400 font-semibold block mb-1">
//                   Gender
//                 </label>
//                 <select
//                   value={profile.gender}
//                   onChange={(e) => handleChange("gender", e.target.value)}
//                   className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none cursor-pointer"
//                 >
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Non-binary">Non-binary</option>
//                   <option value="Prefer not to say">Prefer not to say</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="text-gray-400 font-semibold block mb-1">
//                   Languages Spoken
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="e.g. English, Spanish"
//                   value={profile.languages}
//                   onChange={(e) => handleChange("languages", e.target.value)}
//                   className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none"
//                 />
//               </div>

//               <div className="sm:col-span-2">
//                 <label className="text-gray-400 font-semibold block mb-1">
//                   Address
//                 </label>
//                 <input
//                   type="text"
//                   value={profile.address}
//                   onChange={(e) => handleChange("address", e.target.value)}
//                   className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* About Me & Skills */}
//           <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-5">
//             <h2 className="text-base font-bold text-white pb-3 border-b border-gray-800">
//               About & Skills
//             </h2>

//             <div className="space-y-4 text-xs">
//               <div>
//                 <label className="text-gray-400 font-semibold block mb-1">
//                   About Me
//                 </label>
//                 <textarea
//                   rows={4}
//                   value={profile.aboutMe}
//                   onChange={(e) => handleChange("aboutMe", e.target.value)}
//                   className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none resize-y"
//                   placeholder="Summarize your professional background..."
//                 />
//               </div>

//               <div>
//                 <label className="text-gray-400 font-semibold block mb-2">
//                   Skills
//                 </label>
//                 <div className="flex flex-wrap gap-2 mb-3">
//                   {profile.skills.map((skill) => (
//                     <span
//                       key={skill}
//                       className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-lg text-xs"
//                     >
//                       {skill}
//                       <button
//                         type="button"
//                         onClick={() => handleRemoveSkill(skill)}
//                         className="hover:text-rose-400 cursor-pointer"
//                       >
//                         <X className="w-3 h-3" />
//                       </button>
//                     </span>
//                   ))}
//                 </div>

//                 <div className="flex gap-2">
//                   <input
//                     type="text"
//                     value={newSkill}
//                     onChange={(e) => setNewSkill(e.target.value)}
//                     placeholder="Add a new skill (e.g. Next.js)..."
//                     className="flex-1 px-3.5 py-2 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none"
//                   />
//                   <button
//                     type="button"
//                     onClick={handleAddSkill}
//                     className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl inline-flex items-center gap-1 cursor-pointer"
//                   >
//                     <Plus className="w-4 h-4" /> Add
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Education & Experience */}
//           <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-5">
//             <h2 className="text-base font-bold text-white pb-3 border-b border-gray-800">
//               Experience & Education
//             </h2>

//             <div className="space-y-4 text-xs">
//               <div>
//                 <label className="text-gray-400 font-semibold block mb-1">
//                   Work Experience
//                 </label>
//                 <textarea
//                   rows={4}
//                   value={profile.experience}
//                   onChange={(e) => handleChange("experience", e.target.value)}
//                   className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none resize-y"
//                   placeholder="Detail your career trajectory and accomplishments..."
//                 />
//               </div>

//               <div>
//                 <label className="text-gray-400 font-semibold block mb-1">
//                   Education Details
//                 </label>
//                 <textarea
//                   rows={3}
//                   value={profile.education}
//                   onChange={(e) => handleChange("education", e.target.value)}
//                   className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none resize-y"
//                   placeholder="Degrees, certifications, or academic institutions..."
//                 />
//               </div>
//             </div>
//           </div>

//           {/* External Links */}
//           <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-5">
//             <h2 className="text-base font-bold text-white pb-3 border-b border-gray-800">
//               Portfolio & Social Links
//             </h2>

//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
//               <div>
//                 <label className="text-gray-400 font-semibold block mb-1">
//                   Portfolio Website
//                 </label>
//                 <input
//                   type="url"
//                   placeholder="https://yourportfolio.com"
//                   value={profile.portfolioWebsite}
//                   onChange={(e) => handleChange("portfolioWebsite", e.target.value)}
//                   className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none"
//                 />
//               </div>

//               <div>
//                 <label className="text-gray-400 font-semibold block mb-1">
//                   GitHub Profile
//                 </label>
//                 <input
//                   type="url"
//                   placeholder="https://github.com/username"
//                   value={profile.gitHub}
//                   onChange={(e) => handleChange("gitHub", e.target.value)}
//                   className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none"
//                 />
//               </div>

//               <div>
//                 <label className="text-gray-400 font-semibold block mb-1">
//                   LinkedIn Profile
//                 </label>
//                 <input
//                   type="url"
//                   placeholder="https://linkedin.com/in/username"
//                   value={profile.linkedIn}
//                   onChange={(e) => handleChange("linkedIn", e.target.value)}
//                   className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </form>

//       {/* Resume Viewer Modal */}
//       {showResumeModal && resume && (
//         <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
//           <div className="bg-[#14141f] border border-gray-800 rounded-2xl w-full max-w-2xl p-6 space-y-4 shadow-2xl relative">
//             <div className="flex items-center justify-between pb-3 border-b border-gray-800">
//               <h3 className="text-lg font-bold text-white">
//                 Resume Viewer: {resume.fileName}
//               </h3>
//               <button
//                 type="button"
//                 onClick={() => setShowResumeModal(false)}
//                 className="text-gray-400 hover:text-white cursor-pointer"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             <div className="p-8 bg-[#0a0a0f] border border-gray-800 rounded-xl text-center space-y-4">
//               <FileText className="w-12 h-12 text-purple-400 mx-auto" />
//               <p className="text-xs text-gray-300">
//                 Document standard preview canvas for <strong>{profile.fullName}</strong>.
//               </p>
//               <div className="p-12 border border-dashed border-gray-800 rounded-xl text-gray-500 text-xs">
//                 [PDF / DOCX File Viewer Engine]
//               </div>
//               <a
//                 href={resume.fileUrl}
//                 download={resume.fileName}
//                 className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-xl shadow-md cursor-pointer transition-all"
//               >
//                 <Download className="w-4 h-4" /> Download File ({resume.fileSize})
//               </a>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



"use client";

import React, { useState, useEffect } from "react";
import {
  Check,
  Upload,
  FileText,
  Eye,
  Download,
  RotateCw,
  X,
  Plus,
  Loader2,
} from "lucide-react";
import { authClient } from "@/app/lib/auth-client";

const INITIAL_PROFILE = {
  profilePhoto:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
  fullName: "Alex Rivera",
  email: "alex.rivera@example.com",
  phone: "+1 (555) 019-2834",
  dateOfBirth: "1997-04-12",
  gender: "Non-binary",
  address: "742 Evergreen Terrace, San Francisco, CA",
  aboutMe:
    "Driven Full-Stack Engineer with over 4 years of experience delivering pixel-perfect Web Apps using React, Node.js, and TypeScript.",
  skills: ["React", "TypeScript", "Next.js", "Node.js", "Tailwind CSS", "GraphQL"],
  experience:
    "Senior Frontend Engineer at Apex Labs (2023 - Present)\nFull Stack Developer at Bright Web Studio (2021 - 2023)",
  education:
    "B.Sc. in Computer Science — University of California, Berkeley (2017 - 2021)",
  languages: "English (Native), Spanish (Intermediate)",
  portfolioWebsite: "https://alexrivera.dev",
  gitHub: "https://github.com/alexrivera-dev",
  linkedIn: "https://linkedin.com/in/alexrivera-dev",
};

const INITIAL_RESUME = {
  fileName: "Alex_Rivera_Resume_2026.pdf",
  fileSize: "1.8 MB",
  uploadDate: "Aug 01, 2026",
  fileUrl: "/resumes/alex-rivera-resume.pdf",
};

export default function SeekerProfile() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [resume, setResume] = useState(INITIAL_RESUME);
  const [newSkill, setNewSkill] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [showResumeModal, setShowResumeModal] = useState(false);

  // 1. Initial sync with session user
  useEffect(() => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        fullName: user.name || prev.fullName,
        email: user.email || prev.email,
        profilePhoto: user.image || prev.profilePhoto,
      }));
    }
  }, [user]);

  // 2. Fetch existing seeker profile from backend database by email
  useEffect(() => {
    const fetchSeekerProfile = async () => {
      const emailQuery = user?.email || profile.email;
      if (!emailQuery) return;

      setIsFetching(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
        const response = await fetch(
          `${baseUrl}/api/seeker/profile/${encodeURIComponent(emailQuery)}`
        );

        if (response.ok) {
          const data = await response.json();
          if (data && data.success !== false) {
            // Merge fetched profile data over defaults
            setProfile((prev) => ({
              ...prev,
              ...data,
              fullName: data.fullName || data.SeekerName || prev.fullName,
            }));
          }
        }
      } catch (error) {
        console.error("Failed to fetch seeker profile:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchSeekerProfile();
  }, [user?.email]);

  // General Field Updates
  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  // Add Skill
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (!profile.skills.includes(newSkill.trim())) {
      setProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
    }
    setNewSkill("");
  };

  // Remove Skill
  const handleRemoveSkill = (skillToRemove) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  // Handle ImgBB Photo Upload
  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingPhoto(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      if (!apiKey) {
        throw new Error("ImgBB API key is missing in environment variables.");
      }

      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success && data.data?.url) {
        handleChange("profilePhoto", data.data.url);
        setSaveMessage("Profile picture uploaded successfully to ImgBB!");
        setTimeout(() => setSaveMessage(""), 4000);
      } else {
        throw new Error(data.error?.message || "Failed to upload image to ImgBB");
      }
    } catch (error) {
      console.error("Image Upload Error:", error);
      alert(`Error uploading photo: ${error.message}`);
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  // Handle Resume Upload or Replace
  const handleResumeFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword",
      ];
      if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|docx|doc)$/i)) {
        alert("Invalid file format! Please upload a PDF or DOCX file.");
        return;
      }
      setResume({
        fileName: file.name,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        uploadDate: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        fileUrl: URL.createObjectURL(file),
      });
      setSaveMessage("Resume successfully updated!");
      setTimeout(() => setSaveMessage(""), 4000);
    }
  };

  // Save Entire Profile to Backend API
  const handleSubmitProfile = async (e) => {
    e.preventDefault();

    if (!profile.email) {
      setSaveMessage("User email is required to update profile.");
      return;
    }

    setIsSaving(true);
    setSaveMessage("");

    const payload = {
      ...profile,
      SeekerName: profile.fullName,
      email: profile.email,
    };

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
      const response = await fetch(
        `${baseUrl}/api/seeker/profile/${encodeURIComponent(profile.email)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok || (data && data.success === false)) {
        throw new Error(data?.message || "Failed to update profile");
      }

      setSaveMessage("Seeker profile saved successfully!");
      setTimeout(() => setSaveMessage(""), 4000);
    } catch (error) {
      console.error("Server update failed:", error);
      setSaveMessage(`Error saving profile: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex-1 bg-[#0a0a0f] text-white p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-3">
            My Profile
            {isFetching && <Loader2 className="w-5 h-5 animate-spin text-purple-400" />}
          </h1>
          <p className="text-gray-400 text-sm pt-1">
            Manage your personal information, resume document, skills, and portfolio links.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSubmitProfile}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            <Check className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {saveMessage && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          {saveMessage}
        </div>
      )}

      {/* Main Grid Content */}
      <form onSubmit={handleSubmitProfile} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Photo & Resume Management */}
        <div className="lg:col-span-4 space-y-8">
          {/* Profile Photo Card */}
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl flex flex-col items-center text-center space-y-4">
            <div className="relative group">
              <img
                src={profile.profilePhoto}
                alt={profile.fullName}
                className="w-32 h-32 rounded-2xl object-cover border-2 border-purple-500/30 shadow-lg"
              />
              <label
                htmlFor="photoUploadInput"
                className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-xs text-white cursor-pointer transition-opacity"
              >
                {isUploadingPhoto ? (
                  <>
                    <Loader2 className="w-5 h-5 mb-1 animate-spin text-purple-400" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 mb-1" />
                    <span>Change Photo</span>
                  </>
                )}
              </label>
              <input
                id="photoUploadInput"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                disabled={isUploadingPhoto}
                className="hidden"
              />
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">{profile.fullName}</h2>
              <p className="text-xs text-purple-400 font-medium pt-0.5">{profile.email}</p>
            </div>
          </div>

          {/* Resume Upload & Actions Card */}
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" />
                <h2 className="text-base font-bold text-white">Resume Document</h2>
              </div>
              <span className="text-[10px] text-gray-500">PDF, DOCX supported</span>
            </div>

            {resume ? (
              <div className="space-y-4">
                <div className="p-4 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white truncate max-w-[180px]">
                      {resume.fileName}
                    </span>
                    <span className="text-[10px] text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                      Active
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-gray-500">
                    <span>{resume.fileSize}</span>
                    <span>Uploaded: {resume.uploadDate}</span>
                  </div>
                </div>

                {/* Resume Action Buttons */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setShowResumeModal(true)}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#0a0a0f] hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white rounded-xl transition-all cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-purple-400" />
                    View
                  </button>

                  <a
                    href={resume.fileUrl}
                    download={resume.fileName}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#0a0a0f] hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white rounded-xl transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                    Download
                  </a>
                </div>

                {/* Replace Resume Button */}
                <label
                  htmlFor="resumeReplaceInput"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0a0a0f] hover:bg-purple-600/10 border border-gray-800 hover:border-purple-500/40 text-purple-400 text-xs font-semibold rounded-xl cursor-pointer transition-all"
                >
                  <RotateCw className="w-4 h-4" />
                  Replace Resume
                </label>
                <input
                  id="resumeReplaceInput"
                  type="file"
                  accept=".pdf,.docx,.doc"
                  onChange={handleResumeFileSelect}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-3">
                <label
                  htmlFor="resumeUploadInput"
                  className="w-full p-6 border-2 border-dashed border-gray-800 hover:border-purple-500/50 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-[#0a0a0f]"
                >
                  <Upload className="w-8 h-8 text-purple-400 mb-2" />
                  <span className="text-xs font-semibold text-white">Upload Resume</span>
                  <span className="text-[10px] text-gray-500 mt-1">
                    Drag and drop or browse (.PDF, .DOCX)
                  </span>
                </label>
                <input
                  id="resumeUploadInput"
                  type="file"
                  accept=".pdf,.docx,.doc"
                  onChange={handleResumeFileSelect}
                  className="hidden"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Profile Form Inputs */}
        <div className="lg:col-span-8 space-y-8">
          {/* Basic Personal Information */}
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-5">
            <h2 className="text-base font-bold text-white pb-3 border-b border-gray-800">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-gray-400 font-semibold block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-gray-400 font-semibold block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-gray-400 font-semibold block mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="text-gray-400 font-semibold block mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={profile.dateOfBirth}
                  onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="text-gray-400 font-semibold block mb-1">
                  Gender
                </label>
                <select
                  value={profile.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none cursor-pointer"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="text-gray-400 font-semibold block mb-1">
                  Languages Spoken
                </label>
                <input
                  type="text"
                  placeholder="e.g. English, Spanish"
                  value={profile.languages}
                  onChange={(e) => handleChange("languages", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-gray-400 font-semibold block mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none"
                />
              </div>
            </div>
          </div>

          {/* About Me & Skills */}
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-5">
            <h2 className="text-base font-bold text-white pb-3 border-b border-gray-800">
              About & Skills
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-gray-400 font-semibold block mb-1">
                  About Me
                </label>
                <textarea
                  rows={4}
                  value={profile.aboutMe}
                  onChange={(e) => handleChange("aboutMe", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none resize-y"
                  placeholder="Summarize your professional background..."
                />
              </div>

              <div>
                <label className="text-gray-400 font-semibold block mb-2">
                  Skills
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-lg text-xs"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="hover:text-rose-400 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a new skill (e.g. Next.js)..."
                    className="flex-1 px-3.5 py-2 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Education & Experience */}
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-5">
            <h2 className="text-base font-bold text-white pb-3 border-b border-gray-800">
              Experience & Education
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-gray-400 font-semibold block mb-1">
                  Work Experience
                </label>
                <textarea
                  rows={4}
                  value={profile.experience}
                  onChange={(e) => handleChange("experience", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none resize-y"
                  placeholder="Detail your career trajectory and accomplishments..."
                />
              </div>

              <div>
                <label className="text-gray-400 font-semibold block mb-1">
                  Education Details
                </label>
                <textarea
                  rows={3}
                  value={profile.education}
                  onChange={(e) => handleChange("education", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none resize-y"
                  placeholder="Degrees, certifications, or academic institutions..."
                />
              </div>
            </div>
          </div>

          {/* External Links */}
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-5">
            <h2 className="text-base font-bold text-white pb-3 border-b border-gray-800">
              Portfolio & Social Links
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="text-gray-400 font-semibold block mb-1">
                  Portfolio Website
                </label>
                <input
                  type="url"
                  placeholder="https://yourportfolio.com"
                  value={profile.portfolioWebsite}
                  onChange={(e) => handleChange("portfolioWebsite", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="text-gray-400 font-semibold block mb-1">
                  GitHub Profile
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/username"
                  value={profile.gitHub}
                  onChange={(e) => handleChange("gitHub", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="text-gray-400 font-semibold block mb-1">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  value={profile.linkedIn}
                  onChange={(e) => handleChange("linkedIn", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Resume Viewer Modal */}
      {showResumeModal && resume && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl w-full max-w-2xl p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <h3 className="text-lg font-bold text-white">
                Resume Viewer: {resume.fileName}
              </h3>
              <button
                type="button"
                onClick={() => setShowResumeModal(false)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 bg-[#0a0a0f] border border-gray-800 rounded-xl text-center space-y-4">
              <FileText className="w-12 h-12 text-purple-400 mx-auto" />
              <p className="text-xs text-gray-300">
                Document standard preview canvas for <strong>{profile.fullName}</strong>.
              </p>
              <div className="p-12 border border-dashed border-gray-800 rounded-xl text-gray-500 text-xs">
                [PDF / DOCX File Viewer Engine]
              </div>
              <a
                href={resume.fileUrl}
                download={resume.fileName}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-xl shadow-md cursor-pointer transition-all"
              >
                <Download className="w-4 h-4" /> Download File ({resume.fileSize})
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}







