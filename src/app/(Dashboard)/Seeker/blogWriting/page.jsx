
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
    BookOpen,
    Plus,
    Trash2,
    Calendar,
    ArrowRight,
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
        authorEmail: "",
        authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        readTime: "5 min read",
        content: "",
        images: [],
        status: "Published",
    });

    const [previewMode, setPreviewMode] = useState(false);
    const [selectedBlogForDetail, setSelectedBlogForDetail] = useState(null); // For "See More" modal viewing
    const [toastMessage, setToastMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [isUploadingContentImage, setIsUploadingContentImage] = useState(false);

    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [aiTitleInput, setAiTitleInput] = useState("");
    const [isGeneratingAi, setIsGeneratingAi] = useState(false);

    // State for user's authored blogs list
    const [userBlogs, setUserBlogs] = useState([]);
    const [loadingBlogs, setLoadingBlogs] = useState(false);

    useEffect(() => {
        if (user) {
            const email = user.email || "";
            setFormData((prev) => ({
                ...prev,
                authorName: user.name || user.fullName || prev.authorName,
                authorEmail: email,
                authorAvatar: user.image || user.avatar || prev.authorAvatar,
            }));

            if (email) {
                fetchUserBlogs(email);
            }
        }
    }, [user]);

    // Fetch blogs by author email with proper encoding
    const fetchUserBlogs = async (email) => {
        setLoadingBlogs(true);
        try {
            const backendUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
            const encodedEmail = encodeURIComponent(email);
            const response = await fetch(`${backendUrl}/api/blogs/${encodedEmail}`);
            const result = await response.json();

            if (response.ok) {
                setUserBlogs(result.data || result);
            }
        } catch (error) {
            console.error("Failed to fetch user blogs:", error);
        } finally {
            setLoadingBlogs(false);
        }
    };

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

    // ImgBB Upload Handler for Cover Image
    const handleCoverImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploadingImage(true);
        showToast("");

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
                throw new Error(resData.error?.message || "Failed to upload image.");
            }
        } catch (error) {
            console.error("ImgBB upload error:", error);
            showToast(`Image upload failed: ${error.message}`);
        } finally {
            setIsUploadingImage(false);
        }
    };

    // ImgBB Upload Handler for Additional Blog Images Data Array
    const handleAddBlogImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploadingContentImage(true);
        try {
            const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
            if (!apiKey) {
                throw new Error("NEXT_PUBLIC_IMGBB_API_KEY is missing.");
            }

            const imgData = new FormData();
            imgData.append("image", file);

            const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: "POST",
                body: imgData,
            });

            const resData = await response.json();

            if (resData.success) {
                const imageUrl = resData.data.url;
                setFormData((prev) => ({
                    ...prev,
                    images: [...prev.images, imageUrl],
                }));
                showToast("Blog image attached successfully!");
            } else {
                throw new Error(resData.error?.message || "Failed to upload image.");
            }
        } catch (error) {
            console.error("Upload error:", error);
            showToast(`Upload failed: ${error.message}`);
        } finally {
            setIsUploadingContentImage(false);
        }
    };

    const handleRemoveImage = (indexToRemove) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, idx) => idx !== indexToRemove),
        }));
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

    // POST Submission Handler including authorEmail & blog image data
    const handleSubmit = async (e, saveStatus) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.content.trim()) {
            showToast("Please fill in both the title and content.");
            return;
        }

        setSubmitting(true);

        const finalData = {
            ...formData,
            authorEmail: user?.email || formData.authorEmail || "",
            status: saveStatus
        };

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

            // Refresh user blogs list
            if (finalData.authorEmail) {
                fetchUserBlogs(finalData.authorEmail);
            }
        } catch (error) {
            console.error("Blog submission error:", error);
            setSubmitting(false);
            showToast(`Submission failed: ${error.message}`);
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#0a0a0f] text-white p-4 sm:p-6 lg:p-10 space-y-8">
            {/* Page Header */}
            <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800/80">
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
                <div className="w-full p-4 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                    {toastMessage}
                </div>
            )}

            {/* 100% Full Width Blog Writing Form */}
            <form onSubmit={(e) => handleSubmit(e, "Published")} className="w-full space-y-6">
                <div className="w-full bg-[#14141f] border border-gray-800 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl space-y-6">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-300 block flex items-center gap-1.5">
                                <Tag className="w-3.5 h-3.5 text-purple-400" />
                                Category
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-[#0a0a0f] border border-gray-800 text-gray-300 rounded-xl text-xs outline-none focus:border-purple-500 cursor-pointer font-medium"
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
                                className="w-full px-4 py-3 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl text-xs outline-none"
                            />
                        </div>
                    </div>

                    {/* Cover Image Upload Section */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-300 block flex items-center gap-1.5">
                            <ImageIcon className="w-4 h-4 text-purple-400" />
                            Cover Image (Upload or URL)
                        </label>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <label className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium rounded-xl cursor-pointer transition-all shadow-md disabled:opacity-50 shrink-0">
                                {isUploadingImage ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Upload className="w-4 h-4" />
                                )}
                                {isUploadingImage ? "Uploading..." : "Upload Cover Image"}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleCoverImageUpload}
                                    disabled={isUploadingImage}
                                    className="hidden"
                                />
                            </label>

                            <input
                                type="url"
                                name="coverImage"
                                placeholder="https://i.ibb.co/... or paste direct URL"
                                value={formData.coverImage}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl text-xs outline-none"
                            />
                        </div>
                    </div>

                    {/* Additional Blog Images Data Array Section */}
                    <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                                <ImageIcon className="w-4 h-4 text-purple-400" />
                                Article Gallery / Content Images ({formData.images.length})
                            </label>
                            <label className="px-3 py-1.5 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 text-xs font-semibold rounded-lg cursor-pointer transition-all inline-flex items-center gap-1.5">
                                {isUploadingContentImage ? (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                    <Plus className="w-3.5 h-3.5" />
                                )}
                                Add Image
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAddBlogImageUpload}
                                    disabled={isUploadingContentImage}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {formData.images.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                                {formData.images.map((imgUrl, index) => (
                                    <div key={index} className="relative group bg-[#0a0a0f] border border-gray-800 rounded-xl overflow-hidden p-2">
                                        <img src={imgUrl} alt={`Blog Asset ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute top-3 right-3 p-1 bg-red-500/80 hover:bg-red-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                        <span className="text-[10px] text-gray-400 truncate block mt-1 px-1">Image #{index + 1}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* AI Content Generation Action Bar */}
                    <div className="pt-2">
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
                            rows={14}
                            placeholder="Start typing your blog post here, or use AI generation..."
                            value={formData.content}
                            onChange={handleChange}
                            required
                            className="w-full p-4 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl text-xs outline-none resize-y leading-relaxed font-mono"
                        />
                    </div>

                    {/* Publishing Actions Bar */}
                    <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4 border-t border-gray-800">
                        <button
                            type="button"
                            onClick={(e) => handleSubmit(e, "Draft")}
                            disabled={submitting}
                            className="w-full sm:w-auto px-6 py-3 bg-[#0a0a0f] hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white text-xs font-semibold rounded-xl transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                        >
                            <Save className="w-4 h-4" />
                            Save as Draft
                        </button>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg cursor-pointer transition-all inline-flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            <Send className="w-4 h-4" />
                            {submitting ? "Publishing..." : "Publish Article"}
                        </button>
                    </div>
                </div>
            </form>

            {/* 100% Full Width Bottom Section: My Authored Blogs */}
            <div className="w-full bg-[#14141f] border border-gray-800 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl space-y-6">
                <div className="w-full flex items-center justify-between border-b border-gray-800 pb-4">
                    <div className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-purple-400" />
                        <h2 className="text-base font-bold text-white">My Authored Blogs</h2>
                    </div>
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full font-semibold">
                        Total: {userBlogs.length}
                    </span>
                </div>

                {loadingBlogs ? (
                    <div className="flex items-center justify-center py-12 text-purple-400">
                        <Loader2 className="w-6 h-6 animate-spin" />
                    </div>
                ) : userBlogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                        {userBlogs.map((blog, idx) => (
                            <div
                                key={blog._id || idx}
                                className="p-4 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-3 hover:border-purple-500/40 transition-all flex flex-col justify-between"
                            >
                                <div className="space-y-2">
                                    {blog.coverImage && (
                                        <img src={blog.coverImage} alt={blog.title} className="w-full h-32 object-cover rounded-lg mb-2" />
                                    )}
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] text-purple-400 font-medium bg-purple-500/10 px-2.5 py-1 rounded">
                                            {blog.category || "General"}
                                        </span>
                                        <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${blog.status === "Published" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
                                            {blog.status || "Published"}
                                        </span>
                                    </div>
                                    <h3 className="text-sm font-semibold text-gray-200 line-clamp-2">
                                        {blog.title}
                                    </h3>
                                    <p className="text-xs text-gray-400 line-clamp-2">
                                        {blog.content}
                                    </p>
                                </div>
                                <div className="pt-3 border-t border-gray-800/60 flex items-center justify-between">
                                    <span className="text-[11px] text-gray-500 flex items-center gap-1">
                                        <Clock className="w-3 h-3 text-purple-400" />
                                        {blog.readTime || "5 min read"}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedBlogForDetail(blog)}
                                        className="px-3 py-1.5 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 text-xs font-semibold rounded-lg transition-all inline-flex items-center gap-1 cursor-pointer"
                                    >
                                        See More <ArrowRight className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 space-y-2 text-gray-400 text-xs">
                        <FileText className="w-8 h-8 mx-auto text-gray-600" />
                        <p>No blogs found under your account email yet.</p>
                    </div>
                )}
            </div>

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

            {/* Live Preview / See More Blog Detail Modal */}
            {(previewMode || selectedBlogForDetail) && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                    <div className="bg-[#14141f] border border-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                                <FileText className="w-5 h-5" />
                                {previewMode ? "Live Article Preview" : "Article Detail View"}
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    setPreviewMode(false);
                                    setSelectedBlogForDetail(null);
                                }}
                                className="p-1.5 bg-gray-800/60 hover:bg-gray-800 text-gray-300 hover:text-white rounded-lg cursor-pointer transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Article Content Display */}
                        <div className="space-y-6 text-gray-200">
                            {/* Category & Read Time */}
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-purple-400 font-medium bg-purple-500/10 px-3 py-1 rounded-full">
                                    {previewMode ? formData.category : selectedBlogForDetail?.category}
                                </span>
                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5 text-purple-400" />
                                    {previewMode ? formData.readTime : selectedBlogForDetail?.readTime}
                                </span>
                            </div>

                            {/* Title */}
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                                {previewMode ? formData.title || "Untitled Article" : selectedBlogForDetail?.title}
                            </h2>

                            {/* Author Bar */}
                            <div className="flex items-center gap-3 pt-2">
                                <img
                                    src={previewMode ? formData.authorAvatar : (selectedBlogForDetail?.authorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80")}
                                    alt="Author"
                                    className="w-10 h-10 rounded-full object-cover border border-purple-500/30"
                                />
                                <div>
                                    <h4 className="text-sm font-semibold text-white">
                                        {previewMode ? formData.authorName || "Anonymous Author" : selectedBlogForDetail?.authorName}
                                    </h4>
                                    <p className="text-[11px] text-gray-400">
                                        Published on {new Date(previewMode ? Date.now() : (selectedBlogForDetail?.createdAt || Date.now())).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            {/* Cover Image */}
                            {(previewMode ? formData.coverImage : selectedBlogForDetail?.coverImage) && (
                                <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-gray-800">
                                    <img
                                        src={previewMode ? formData.coverImage : selectedBlogForDetail?.coverImage}
                                        alt="Cover"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            {/* Main Content Body */}
                            <div className="p-6 bg-[#0a0a0f] border border-gray-800 rounded-2xl font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap text-gray-300">
                                {previewMode ? formData.content || "No content written yet..." : selectedBlogForDetail?.content}
                            </div>

                            {/* Gallery / Content Images */}
                            {((previewMode ? formData.images : selectedBlogForDetail?.images) || []).length > 0 && (
                                <div className="space-y-3 pt-2">
                                    <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                        Article Gallery & Assets
                                    </h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {(previewMode ? formData.images : selectedBlogForDetail?.images).map((imgUrl, i) => (
                                            <div key={i} className="bg-[#0a0a0f] border border-gray-800 rounded-xl overflow-hidden p-2">
                                                <img src={imgUrl} alt={`Asset ${i + 1}`} className="w-full h-32 object-cover rounded-lg" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}



