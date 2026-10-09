
"use client";

import { authClient } from "@/app/lib/auth-client";
import React, { useState, useEffect, useCallback } from "react";
import { Upload, Save, RefreshCw, Building2, Loader2 } from "lucide-react";

const EMPTY_PROFILE = {
  companyLogo: "",
  companyName: "",
  industry: "",
  website: "",
  email: "",
  phoneNumber: "",
  companySize: "51-200 employees",
  address: "",
  description: "",
  socialLinks: {
    linkedin: "",
    twitter: "",
    facebook: "",
    github: "",
  },
};

export default function CompanyProfile() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Form State
  const [formData, setFormData] = useState(EMPTY_PROFILE);
  const [logoPreview, setLogoPreview] = useState("");

  // Status States
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // Dynamic fallback values from session user
  const companyNameValue = formData.companyName !== "" ? formData.companyName : (user?.name || user?.displayName || "");
  const emailValue = formData.email !== "" ? formData.email : (user?.email || "");

  // Text inputs & social handles handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("social.")) {
      const socialKey = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialKey]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // GET Handler: Fetch profile matching active user email
  const handleFetchProfile = useCallback(async () => {
    if (!emailValue) return;

    setIsFetching(true);
    setStatusMessage("");
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
      const response = await fetch(`${baseUrl}/api/company/profile/${encodeURIComponent(emailValue)}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          // New profile: fall back to session defaults smoothly
          return;
        }
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      if (data) {
        setFormData({
          companyLogo: data.companyLogo || "",
          companyName: data.companyName || "",
          industry: data.industry || "",
          website: data.website || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
          companySize: data.companySize || "51-200 employees",
          address: data.address || "",
          description: data.description || "",
          socialLinks: {
            linkedin: data.socialLinks?.linkedin || "",
            twitter: data.socialLinks?.twitter || "",
            facebook: data.socialLinks?.facebook || "",
            github: data.socialLinks?.github || "",
          },
        });

        if (data.companyLogo) {
          setLogoPreview(data.companyLogo);
        }
      }
    } catch (error) {
      console.warn("Error fetching profile data:", error);
    } finally {
      setIsFetching(false);
    }
  }, [emailValue]);

  // Automatically fetch profile when user email is resolved from session
  useEffect(() => {
    if (emailValue) {
      handleFetchProfile();
    }
  }, [emailValue, handleFetchProfile]);

  // ImgBB Upload Handler
  const handleLogoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingLogo(true);
    setStatusMessage("");

    const localReader = new FileReader();
    localReader.onloadend = () => {
      setLogoPreview(localReader.result);
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
        setLogoPreview(uploadedUrl);
        setFormData((prev) => ({ ...prev, companyLogo: uploadedUrl }));
        setStatusMessage("Logo uploaded to ImgBB successfully!");
      } else {
        throw new Error(resData.error?.message || "Failed to upload image to ImgBB.");
      }
    } catch (error) {
      console.error("ImgBB upload error:", error);
      setStatusMessage(`Logo upload failed: ${error.message}`);
    } finally {
      setIsUploadingLogo(false);
    }
  };

  // PUT Handler: Send updates to /api/company/profile/:email
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailValue) {
      setStatusMessage("User email is required to update profile.");
      return;
    }

    setIsSaving(true);
    setStatusMessage("");

    const payload = {
      ...formData,
      companyName: companyNameValue,
      email: emailValue,
    };

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
      const response = await fetch(`${baseUrl}/api/company/profile/${encodeURIComponent(emailValue)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to update profile");
      }

      setStatusMessage("Company profile saved successfully!");
    } catch (error) {
      console.error("Server update failed:", error);
      setStatusMessage(`Error saving profile: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex-1 bg-[#0a0a0f] text-white p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Company Profile
          </h1>
          <p className="text-gray-400 text-sm pt-1">
            Manage and update your company details visible to applicants and partners.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleFetchProfile}
            disabled={isFetching}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#14141f] hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white text-sm font-medium rounded-xl transition-all disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} />
            {isFetching ? "Syncing..." : "Reload Data"}
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-4 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm rounded-xl">
          {statusMessage}
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Company Logo Section */}
        <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-lg font-bold text-white border-b border-gray-800 pb-3">
            Company Logo
          </h2>
          <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
            <div className="relative w-24 h-24 rounded-2xl border border-gray-700 bg-[#0a0a0f] overflow-hidden flex items-center justify-center shrink-0 shadow-inner">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Company Logo Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Building2 className="w-10 h-10 text-gray-500" />
              )}
              {isUploadingLogo && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
                </div>
              )}
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-xl cursor-pointer transition-all shadow-md disabled:opacity-50">
                {isUploadingLogo ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                {isUploadingLogo ? "Uploading to ImgBB..." : "Upload New Logo"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  disabled={isUploadingLogo}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-400">
                Uploaded securely to ImgBB. Direct image URL auto-populates upon completion.
              </p>
            </div>
          </div>
        </div>

        {/* General Information */}
        <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-6">
          <h2 className="text-lg font-bold text-white border-b border-gray-800 pb-3">
            General Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Company Name *
              </label>
              <input
                type="text"
                name="companyName"
                value={companyNameValue}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white text-sm rounded-xl outline-none transition-all"
                placeholder="e.g. Acme Tech Solutions"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Industry *
              </label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white text-sm rounded-xl outline-none transition-all"
                placeholder="e.g. Software & Technology"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Website URL
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white text-sm rounded-xl outline-none transition-all"
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Official Email *
              </label>
              <input
                type="email"
                name="email"
                value={emailValue}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white text-sm rounded-xl outline-none transition-all"
                placeholder="contact@company.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white text-sm rounded-xl outline-none transition-all"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Company Size
              </label>
              <select
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white text-sm rounded-xl outline-none transition-all"
              >
                <option value="1-10 employees">1-10 employees</option>
                <option value="11-50 employees">11-50 employees</option>
                <option value="51-200 employees">51-200 employees</option>
                <option value="201-500 employees">201-500 employees</option>
                <option value="500+ employees">500+ employees</option>
              </select>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Headquarters Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white text-sm rounded-xl outline-none transition-all"
              placeholder="Full street address, city, state, postal code"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Company Description
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white text-sm rounded-xl outline-none transition-all resize-y"
              placeholder="Tell candidates about your mission, products, and tech culture..."
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-6">
          <h2 className="text-lg font-bold text-white border-b border-gray-800 pb-3">
            Social Media Handles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                LinkedIn URL
              </label>
              <input
                type="url"
                name="social.linkedin"
                value={formData.socialLinks.linkedin}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white text-sm rounded-xl outline-none transition-all"
                placeholder="https://linkedin.com/company/yourcompany"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Twitter / X URL
              </label>
              <input
                type="url"
                name="social.twitter"
                value={formData.socialLinks.twitter}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white text-sm rounded-xl outline-none transition-all"
                placeholder="https://twitter.com/yourhandle"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Facebook URL
              </label>
              <input
                type="url"
                name="social.facebook"
                value={formData.socialLinks.facebook}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white text-sm rounded-xl outline-none transition-all"
                placeholder="https://facebook.com/yourpage"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                GitHub / Portfolio URL
              </label>
              <input
                type="url"
                name="social.github"
                value={formData.socialLinks.github}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white text-sm rounded-xl outline-none transition-all"
                placeholder="https://github.com/yourorg"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving || isUploadingLogo}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm rounded-xl transition-all shadow-lg cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving Changes..." : "Save Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}














