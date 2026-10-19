
"use client";

import React, { useState, useEffect } from "react";
import {
    PenTool,
    Image as ImageIcon,
    Tag,
    Clock,
    User,
    CheckCircle2,
    Eye,
    Send,
    Save,
    X,
    FileText,
    Upload,
    Loader2,
} from "lucide-react";
import { authClient } from "@/app/lib/auth-client";

export default function BlogWrite() {
    // 1️⃣ ALL HOOKS CALLED UNCONDITIONALLY FIRST
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    console.log(user)

    const [formData, setFormData] = useState({
        title: "",
        category: "Career Advice",
        coverImage: "",
        authorName: "",
        authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        readTime: "5 min read",
        content: "",
        status: "Published",
    });

    const [previewMode, setPreviewMode] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);

    // Sync user details whenever `user` object updates from session
    useEffect(() => {
        if (user) {
            setFormData((prev) => ({
                ...prev,
                authorName: user.name || user.fullName || prev.authorName,
                authorAvatar: user.image || user.avatar || prev.authorAvatar,
            }));
        }
    }, [user]);

    // 2️⃣ CONDITIONAL RETURNS GO AFTER ALL HOOKS ARE DECLARED
    if (isPending) {
        return (
            <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center text-purple-400">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    console.log("Better Auth Session User:", user);

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(""), 3000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // ImgBB Upload Handler
    const handleCoverImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploadingImage(true);
        showToast("");

        const localReader = new FileReader();
        localReader.onloadend = () => {
            setFormData((prev) => ({ ...prev, coverImage: localReader.result }));
        };
        localReader.readAsDataURL(file);

        try {
            const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
            if (!apiKey) {
                throw new Error("NEXT_PUBLIC_IMGBB_API_KEY environment variable is missing.");
            }

            const imgData = new FormData();
            imgData.append("image", file);

            const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: "POST",
                body: imgData,
            });

            const resData = await response.json();

            if (resData.success) {
                const uploadedUrl = resData.data.url;
                setFormData((prev) => ({ ...prev, coverImage: uploadedUrl }));
                showToast("Cover image uploaded to ImgBB successfully!");
            } else {
                throw new Error(resData.error?.message || "Failed to upload image to ImgBB.");
            }
        } catch (error) {
            console.error("ImgBB upload error:", error);
            showToast(`Image upload failed: ${error.message}`);
        } finally {
            setIsUploadingImage(false);
        }
    };

    const handleSubmit = async (e, saveStatus) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.content.trim()) {
            showToast("Please fill in both the title and content.");
            return;
        }

        setSubmitting(true);
        const finalData = { ...formData, status: saveStatus };

        setTimeout(() => {
            console.log("Submitting blog post:", finalData);
            setSubmitting(false);
            showToast(
                saveStatus === "Published"
                    ? "Blog post published successfully!"
                    : "Draft saved successfully!"
            );
        }, 800);
    };

    return (
        <div className="min-h-screen flex-1 bg-[#0a0a0f] text-white p-4 sm:p-6 lg:p-8 space-y-8">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800/80">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                        Create Blog Post
                    </h1>
                    <p className="text-gray-400 text-sm pt-1">
                        Write and publish insightful articles, career advice, and platform announcements.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setPreviewMode(true)}
                        className="px-4 py-2 bg-[#14141f] hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white text-xs font-semibold rounded-xl transition-all cursor-pointer inline-flex items-center gap-2"
                    >
                        <Eye className="w-4 h-4 text-purple-400" />
                        Live Preview
                    </button>
                </div>
            </div>

            {/* Toast Notification Banner */}
            {toastMessage && (
                <div className="p-4 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                    {toastMessage}
                </div>
            )}

            {/* Blog Writing Form */}
            <form onSubmit={(e) => handleSubmit(e, "Published")} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Editor Section (Left 2 Columns) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-5">
                        {/* Blog Title */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-300 block">
                                Article Title <span className="text-purple-400">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="e.g. 10 Essential Interview Tips for Full Stack Engineers"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl text-sm outline-none font-medium"
                            />
                        </div>

                        {/* Category & Read Time Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gray-300 block flex items-center gap-1.5">
                                    <Tag className="w-3.5 h-3.5 text-purple-400" />
                                    Category
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-[#0a0a0f] border border-gray-800 text-gray-300 rounded-xl text-xs outline-none focus:border-purple-500 cursor-pointer font-medium"
                                >
                                    <option value="Career Advice">Career Advice</option>
                                    <option value="Tech Trends">Tech Trends</option>
                                    <option value="Interview Prep">Interview Prep</option>
                                    <option value="Company News">Company News</option>
                                    <option value="Tutorials">Tutorials</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gray-300 block flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5 text-purple-400" />
                                    Estimated Read Time
                                </label>
                                <input
                                    type="text"
                                    name="readTime"
                                    placeholder="e.g. 5 min read"
                                    value={formData.readTime}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl text-xs outline-none"
                                />
                            </div>
                        </div>

                        {/* Content Textarea */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-300 block flex items-center gap-1.5">
                                <PenTool className="w-3.5 h-3.5 text-purple-400" />
                                Article Content (Markdown or HTML supported) <span className="text-purple-400">*</span>
                            </label>
                            <textarea
                                name="content"
                                rows={12}
                                placeholder="Start writing your article content here..."
                                value={formData.content}
                                onChange={handleChange}
                                required
                                className="w-full p-4 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl text-xs outline-none resize-y leading-relaxed font-mono"
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar Configuration Section (Right 1 Column) */}
                <div className="space-y-6">
                    {/* Publish Action Box */}
                    <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
                        <h2 className="text-sm font-bold text-white border-b border-gray-800 pb-3 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-purple-400" />
                            Publishing Options
                        </h2>

                        <div className="space-y-3 pt-1">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg cursor-pointer transition-all inline-flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                <Send className="w-4 h-4" />
                                {submitting ? "Publishing..." : "Publish Article"}
                            </button>

                            <button
                                type="button"
                                onClick={(e) => handleSubmit(e, "Draft")}
                                disabled={submitting}
                                className="w-full py-3 bg-[#0a0a0f] hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white text-xs font-semibold rounded-xl transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                Save as Draft
                            </button>
                        </div>
                    </div>

                    {/* Cover Image Settings (ImgBB Integration) */}
                    <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
                        <h2 className="text-sm font-bold text-white border-b border-gray-800 pb-3 flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-purple-400" />
                            Cover Image
                        </h2>

                        <div className="space-y-3">
                            <div className="flex flex-col gap-2">
                                <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium rounded-xl cursor-pointer transition-all shadow-md disabled:opacity-50">
                                    {isUploadingImage ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Upload className="w-4 h-4" />
                                    )}
                                    {isUploadingImage ? "Uploading to ImgBB..." : "Upload Cover Image"}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleCoverImageUpload}
                                        disabled={isUploadingImage}
                                        className="hidden"
                                    />
                                </label>
                                <p className="text-[10px] text-gray-400">
                                    Or paste direct URL below:
                                </p>
                            </div>

                            <input
                                type="url"
                                name="coverImage"
                                placeholder="https://i.ibb.co/..."
                                value={formData.coverImage}
                                onChange={handleChange}
                                className="w-full px-3.5 py-2 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl text-xs outline-none"
                            />

                            {formData.coverImage ? (
                                <div className="relative rounded-xl overflow-hidden border border-gray-800 h-36">
                                    <img
                                        src={formData.coverImage}
                                        alt="Cover preview"
                                        className="w-full h-full object-cover"
                                    />
                                    {isUploadingImage && (
                                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                                            <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="h-36 bg-[#0a0a0f] border border-dashed border-gray-800 rounded-xl flex flex-col items-center justify-center text-gray-500 text-xs">
                                    <ImageIcon className="w-8 h-8 text-gray-600 mb-1" />
                                    No cover image preview
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Author Metadata Section */}
                    <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
                        <h2 className="text-sm font-bold text-white border-b border-gray-800 pb-3 flex items-center gap-2">
                            <User className="w-4 h-4 text-purple-400" />
                            Author Details
                        </h2>

                        {/* Live Author Card */}
                        <div className="flex items-center gap-3 p-3 bg-[#0a0a0f] border border-gray-800 rounded-xl">
                            <img
                                src={formData.authorAvatar}
                                alt={formData.authorName || "Author"}
                                className="w-10 h-10 rounded-full object-cover border border-purple-500/30 shrink-0"
                            />
                            <div className="overflow-hidden">
                                <p className="text-xs font-bold text-white truncate">
                                    {formData.authorName || "Guest Author"}
                                </p>
                                <p className="text-[10px] text-purple-400 font-medium">
                                    {user ? "Active Author Session" : "Logged Out"}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3 pt-1">
                            <div className="space-y-1">
                                <label className="text-[11px] text-gray-400 font-semibold block">Author Name</label>
                                <input
                                    type="text"
                                    name="authorName"
                                    value={formData.authorName}
                                    onChange={handleChange}
                                    placeholder="Enter author name"
                                    className="w-full px-3 py-2 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl text-xs outline-none"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[11px] text-gray-400 font-semibold block">Author Avatar URL</label>
                                <input
                                    type="url"
                                    name="authorAvatar"
                                    value={formData.authorAvatar}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                    className="w-full px-3 py-2 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl text-xs outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {/* Live Preview Modal */}
            {previewMode && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#14141f] border border-gray-800 rounded-2xl w-full max-w-2xl p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                            <div className="flex items-center gap-2">
                                <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-semibold rounded-full">
                                    {formData.category}
                                </span>
                                <span className="text-gray-400 text-xs">{formData.readTime}</span>
                            </div>

                            <button
                                onClick={() => setPreviewMode(false)}
                                className="text-gray-400 hover:text-white cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-xl sm:text-2xl font-bold text-white">
                                {formData.title || "Untitled Article"}
                            </h1>

                            <div className="flex items-center gap-3">
                                <img
                                    src={formData.authorAvatar}
                                    alt={formData.authorName}
                                    className="w-9 h-9 rounded-full object-cover border border-gray-800"
                                />
                                <div>
                                    <p className="text-xs font-bold text-white">{formData.authorName || "Guest Author"}</p>
                                    <p className="text-[10px] text-gray-400">Published Today</p>
                                </div>
                            </div>

                            {formData.coverImage && (
                                <div className="rounded-xl overflow-hidden border border-gray-800 h-52">
                                    <img
                                        src={formData.coverImage}
                                        alt="Cover"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            <div className="p-4 bg-[#0a0a0f] border border-gray-800 rounded-xl text-xs text-gray-200 whitespace-pre-wrap leading-relaxed font-mono">
                                {formData.content || "No content provided yet..."}
                            </div>
                        </div>

                        <div className="flex justify-end pt-3 border-t border-gray-800">
                            <button
                                type="button"
                                onClick={() => setPreviewMode(false)}
                                className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-xl cursor-pointer transition-all shadow-md"
                            >
                                Close Preview
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}



