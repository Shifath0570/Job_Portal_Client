
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
    Sparkles,
} from "lucide-react";
import { authClient } from "@/app/lib/auth-client";

export default function BlogWrite() {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

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

    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [aiTitleInput, setAiTitleInput] = useState("");
    const [isGeneratingAi, setIsGeneratingAi] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData((prev) => ({
                ...prev,
                authorName: user.name || user.fullName || prev.authorName,
                authorAvatar: user.image || user.avatar || prev.authorAvatar,
            }));
        }
    }, [user]);

    if (isPending) {
        return (
            <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center text-purple-400">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

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

    const handleQuickAiGenerate = async () => {
        if (!formData.title.trim()) {
            showToast("Please enter an Article Title first before generating content!");
            return;
        }

        setIsGeneratingAi(true);
        showToast("AI is crafting your article content...");

        try {
            const response = await fetch('/api/generate-blog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: formData.title,
                    category: formData.category,
                }),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || "Failed to generate AI content.");
            }

            setFormData((prev) => ({
                ...prev,
                content: result.content,
            }));

            showToast("Article content generated successfully!");
        } catch (error) {
            console.error("AI Generation Error:", error);
            showToast(`AI generation failed: ${error.message}`);
        } finally {
            setIsGeneratingAi(false);
        }
    };

    const handleGenerateAiContent = async (e) => {
        e.preventDefault();
        if (!aiTitleInput.trim()) {
            showToast("Please provide at least a blog title.");
            return;
        }

        setIsGeneratingAi(true);
        showToast("AI is crafting your comprehensive blog post...");

        try {
            const response = await fetch('/api/generate-blog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: aiTitleInput,
                    category: formData.category,
                }),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || "Failed to generate AI content.");
            }

            setFormData((prev) => ({
                ...prev,
                title: aiTitleInput,
                content: result.content,
            }));

            setIsAiModalOpen(false);
            setAiTitleInput("");
            showToast("Full blog post generated successfully by AI!");
        } catch (error) {
            console.error("AI Generation Error:", error);
            showToast(`AI generation failed: ${error.message}`);
        } finally {
            setIsGeneratingAi(false);
        }
    };

    // POST Submission Handler pointing directly to Express backend
    const handleSubmit = async (e, saveStatus) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.content.trim()) {
            showToast("Please fill in both the title and content.");
            return;
        }

        setSubmitting(true);
        const finalData = { ...formData, status: saveStatus };

        try {
            const backendUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

            const response = await fetch(`${backendUrl}/api/blogs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(finalData),
            });

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const rawText = await response.text();
                throw new Error(`Server returned non-JSON response: ${rawText.slice(0, 100)}`);
            }

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || "Failed to submit blog post.");
            }

            setSubmitting(false);
            showToast(
                saveStatus === "Published"
                    ? "Blog post published successfully to database!"
                    : "Draft saved successfully to database!"
            );
        } catch (error) {
            console.error("Blog submission error:", error);
            setSubmitting(false);
            showToast(`Submission failed: ${error.message}`);
        }
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
                        onClick={() => setIsAiModalOpen(true)}
                        className="px-4 py-2 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 hover:from-purple-600/30 hover:to-indigo-600/30 border border-purple-500/40 text-purple-300 text-xs font-semibold rounded-xl transition-all cursor-pointer inline-flex items-center gap-2 shadow-lg"
                    >
                        <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                        AI Generate Blog
                    </button>

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
                                Article Title Required
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

                        {/* AI Content Generation Action Bar */}
                        <div className="pt-2 pb-1">
                            <button
                                type="button"
                                onClick={handleQuickAiGenerate}
                                disabled={isGeneratingAi}
                                className="w-full py-3 bg-gradient-to-r from-purple-600/30 via-indigo-600/30 to-purple-600/30 hover:from-purple-600/40 hover:to-indigo-600/40 border border-purple-500/50 text-purple-200 text-xs font-bold rounded-xl transition-all cursor-pointer inline-flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                            >
                                {isGeneratingAi ? (
                                    <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                                ) : (
                                    <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                                )}
                                {isGeneratingAi ? "Generating Article Content..." : "Generate AI Content for this Title and Category"}
                            </button>
                        </div>

                        {/* Content Textarea */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-300 block flex items-center gap-1.5">
                                <PenTool className="w-3.5 h-3.5 text-purple-400" />
                                Article Content Required
                            </label>
                            <textarea
                                name="content"
                                rows={12}
                                placeholder="Start typing your blog post here, or use AI generation..."
                                value={formData.content}
                                onChange={handleChange}
                                required
                                className="w-full p-4 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl text-xs outline-none resize-y leading-relaxed font-mono"
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar Configuration Section */}
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

                    {/* Cover Image Settings */}
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
                        </div>
                    </div>
                </div>
            </form>

            {/* AI Generator Modal */}
            {isAiModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#14141f] border border-gray-800 rounded-2xl w-full max-w-lg p-6 space-y-6 shadow-2xl relative">
                        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                                <Sparkles className="w-5 h-5" />
                                AI Blog Content Generator
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsAiModalOpen(false)}
                                className="text-gray-400 hover:text-white cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleGenerateAiContent} className="space-y-4 text-xs">
                            <div className="space-y-2">
                                <label className="text-gray-300 font-semibold block">
                                    Blog Title or Main Topic Required
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Mastering MongoDB Aggregation Pipelines in Node.js"
                                    value={aiTitleInput}
                                    onChange={(e) => setAiTitleInput(e.target.value)}
                                    required
                                    className="w-full p-3 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none text-xs"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsAiModalOpen(false)}
                                    className="px-4 py-2 bg-[#0a0a0f] hover:bg-gray-800 border border-gray-800 text-gray-300 rounded-xl transition-all cursor-pointer font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isGeneratingAi}
                                    className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-md cursor-pointer transition-all inline-flex items-center gap-2 disabled:opacity-50"
                                >
                                    {isGeneratingAi && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {isGeneratingAi ? "AI is writing..." : "Generate Full Blog"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}








