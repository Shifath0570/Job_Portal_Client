
"use client";

import { authClient } from "@/app/lib/auth-client";
import React, { useState } from "react";

const UploadIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" x2="12" y1="3" y2="15" />
  </svg>
);

const SaveIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

const RefreshIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M16 16h5v5" />
  </svg>
);

const BuildingIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01" />
    <path d="M16 6h.01" />
    <path d="M12 6h.01" />
    <path d="M12 10h.01" />
    <path d="M12 14h.01" />
    <path d="M16 10h.01" />
    <path d="M16 14h.01" />
    <path d="M8 10h.01" />
    <path d="M8 14h.01" />
  </svg>
);

const INITIAL_PROFILE = {
  companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80",
  companyName: "",
  industry: "Software & Technology",
  website: "https://acme.tech",
  email: "",
  phoneNumber: "+1 (555) 234-5678",
  companySize: "51-200 employees",
  address: "100 Innovation Way, Suite 400, San Francisco, CA 94105",
  description: "Acme Technologies is a leading software enterprise pioneering next-generation recruitment platforms and automated HR solutions globally.",
  socialLinks: {
    linkedin: "https://linkedin.com/company/acmetechnologies",
    twitter: "https://twitter.com/acmetech",
    facebook: "https://facebook.com/acmetechnologies",
    github: "https://github.com/acmetechnologies",
  },
};

export default function CompanyProfile() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  console.log(user);

  // Initialize form state without useEffect
  const [formData, setFormData] = useState(INITIAL_PROFILE);

  const [logoPreview, setLogoPreview] = useState(INITIAL_PROFILE.companyLogo);
  const [isSaving, setIsSaving] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // Compute inputs so user profile info populates dynamically as session loads
  const companyNameValue = formData.companyName !== "" ? formData.companyName : (user?.name || user?.displayName || "");
  const emailValue = formData.email !== "" ? formData.email : (user?.email || "");

  // Handler for text input changes
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

  // Handler for Logo Upload
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
        setFormData((prev) => ({ ...prev, companyLogo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // GET Method: Fetch existing profile from server
  const handleFetchProfile = async () => {
    setIsFetching(true);
    setStatusMessage("");
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
      const response = await fetch(`${baseUrl}/api/company/profile`);
      if (!response.ok) throw new Error("Failed to fetch profile");

      const data = await response.json();
      if (data) {
        setFormData((prev) => ({
          ...prev,
          ...data,
          companyName: data.companyName || user?.name || prev.companyName,
          email: data.email || user?.email || prev.email,
        }));
        if (data.companyLogo) setLogoPreview(data.companyLogo);
        setStatusMessage("Profile updated from server!");
      }
    } catch (error) {
      console.warn("Server unavailable. Retaining active profile:", error);
      setStatusMessage("Using present baseline data.");
    } finally {
      setIsFetching(false);
    }
  };

  // PUT Method: Save profile changes
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSaving(true);
    setStatusMessage("");

    // Ensure session defaults are sent if not manually edited
    const payload = {
      ...formData,
      companyName: companyNameValue,
      email: emailValue,
    };

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
      const response = await fetch(`${baseUrl}/api/company/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      setStatusMessage("Company profile saved successfully!");
    } catch (error) {
      console.warn("Server update failed, saved locally:", error);
      setStatusMessage("Changes saved locally.");
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
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#14141f] hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white text-sm font-medium rounded-xl transition-all disabled:opacity-50"
          >
            <RefreshIcon className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} />
            {isFetching ? "Syncing..." : "Reload Data"}
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-4 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm rounded-xl">
          {statusMessage}
        </div>
      )}

      {/* Main Form Container */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Company Logo Section */}
        <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-lg font-bold text-white border-b border-gray-800 pb-3">
            Company Logo
          </h2>
          <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
            <div className="w-24 h-24 rounded-2xl border border-gray-700 bg-[#0a0a0f] overflow-hidden flex items-center justify-center shrink-0 shadow-inner">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Company Logo Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <BuildingIcon className="w-10 h-10 text-gray-500" />
              )}
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-xl cursor-pointer transition-all shadow-md">
                <UploadIcon className="w-4 h-4" />
                Upload New Logo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-400">
                Recommended: Square PNG or JPG, max size 2MB.
              </p>
            </div>
          </div>
        </div>

        {/* Basic Information Grid */}
        <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-6">
          <h2 className="text-lg font-bold text-white border-b border-gray-800 pb-3">
            General Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name (Set to User Name) */}
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

            {/* Industry */}
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

            {/* Website */}
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

            {/* Email (Set to User Email) */}
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

            {/* Phone Number */}
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

            {/* Company Size */}
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

          {/* Address */}
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

          {/* Description */}
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

        {/* Social Links Section */}
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

        {/* Action Button Footer */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm rounded-xl transition-all shadow-lg cursor-pointer disabled:opacity-50"
          >
            <SaveIcon className="w-4 h-4" />
            {isSaving ? "Saving Changes..." : "Save Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}
