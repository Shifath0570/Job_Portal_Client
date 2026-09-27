"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Layers,
  ListChecks,
  Clock,
  GraduationCap,
  DollarSign,
  Tag,
  MapPin,
  Calendar,
  Users,
  Globe,
  Plus,
  X,
  Send,
  Loader2,
} from "lucide-react";

export function JobForm() {
  const [skillInput, setSkillInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "Development",
    description: "",
    responsibilities: "",
    requirements: "",
    experience: "",
    education: "",
    salaryRange: "",
    skills: ["React", "JavaScript", "Tailwind CSS"],
    location: "",
    deadline: "",
    vacancies: 1,
    employmentType: "Full Time",
    remoteOption: "Hybrid",
    benefits: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  // POST method to submit data to MongoDB via API endpoint
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
      const response = await fetch(`${baseUrl}/api/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          vacancies: Number(formData.vacancies),
          createdAt: new Date().toISOString(),
        }),
      });

      // Check content-type to avoid JSON syntax errors if HTML is returned
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Server returned non-JSON response (${response.status})`);
      }

      const data = await response.json();

      console.log(data)

      if (response.ok) {
        alert("Job posted successfully to MongoDB!");
        setFormData({
          title: "",
          category: "Development",
          description: "",
          responsibilities: "",
          requirements: "",
          experience: "",
          education: "",
          salaryRange: "",
          skills: [],
          location: "",
          deadline: "",
          vacancies: 1,
          employmentType: "Full Time",
          remoteOption: "Hybrid",
          benefits: "",
        });
      } else {
        alert(`Error posting job: ${data.message || "Failed to submit"}`);
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert(`Network error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full min-h-screen bg-[#0a0a0f] py-16 text-white">
      {/* Container aligned to 75% width */}
      <div className="w-full lg:w-[75%] mx-auto px-4">

        {/* Header Title */}
        <div className="mb-10 text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            Post a New{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Job Opening
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
            Fill out the details below to publish your job listing directly to MongoDB.
          </p>
        </div>

        {/* Main Form Container */}
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* SECTION 1: Basic Job Overview */}
          <div className="bg-[#12121a]/80 border border-gray-800/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h2 className="text-base font-semibold text-indigo-300 flex items-center gap-2 border-b border-gray-800/80 pb-3">
              <Briefcase className="w-4 h-4 text-indigo-400" /> Basic Overview
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Title */}
              <div className="md:col-span-1">
                <label className="block text-xs font-medium text-gray-300 mb-2">
                  Job Title <span className="text-rose-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <Briefcase className="w-4 h-4 text-gray-500 absolute left-3.5" />
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Senior Frontend Developer"
                    className="w-full bg-[#0a0a0f]/80 border border-gray-800 focus:border-indigo-500/80 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="md:col-span-1">
                <label className="block text-xs font-medium text-gray-300 mb-2">
                  Category <span className="text-rose-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <Layers className="w-4 h-4 text-gray-500 absolute left-3.5 pointer-events-none" />
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0f]/80 border border-gray-800 focus:border-indigo-500/80 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="Development" className="bg-[#12121a]">Development</option>
                    <option value="Design" className="bg-[#12121a]">Design</option>
                    <option value="Marketing" className="bg-[#12121a]">Marketing</option>
                    <option value="Sales" className="bg-[#12121a]">Sales</option>
                    <option value="Product" className="bg-[#12121a]">Product</option>
                    <option value="Data Science" className="bg-[#12121a]">Data Science</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-2">
                Description <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Provide an engaging summary of the position..."
                  className="w-full bg-[#0a0a0f]/80 border border-gray-800 focus:border-indigo-500/80 rounded-xl p-3.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Role Details */}
          <div className="bg-[#12121a]/80 border border-gray-800/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h2 className="text-base font-semibold text-indigo-300 flex items-center gap-2 border-b border-gray-800/80 pb-3">
              <ListChecks className="w-4 h-4 text-indigo-400" /> Role Specifics & Qualifications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Responsibilities */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">
                  Responsibilities
                </label>
                <textarea
                  name="responsibilities"
                  rows={4}
                  value={formData.responsibilities}
                  onChange={handleChange}
                  placeholder="List key duties..."
                  className="w-full bg-[#0a0a0f]/80 border border-gray-800 focus:border-indigo-500/80 rounded-xl p-3.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Requirements */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">
                  Requirements
                </label>
                <textarea
                  name="requirements"
                  rows={4}
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder="List essential requirements..."
                  className="w-full bg-[#0a0a0f]/80 border border-gray-800 focus:border-indigo-500/80 rounded-xl p-3.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Experience */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">
                  Experience Level
                </label>
                <div className="relative flex items-center">
                  <Clock className="w-4 h-4 text-gray-500 absolute left-3.5" />
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="e.g. 3+ Years"
                    className="w-full bg-[#0a0a0f]/80 border border-gray-800 focus:border-indigo-500/80 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Education */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">
                  Education Level
                </label>
                <div className="relative flex items-center">
                  <GraduationCap className="w-4 h-4 text-gray-500 absolute left-3.5" />
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    placeholder="e.g. Bachelor's in CS"
                    className="w-full bg-[#0a0a0f]/80 border border-gray-800 focus:border-indigo-500/80 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: Logistics & Compensation */}
          <div className="bg-[#12121a]/80 border border-gray-800/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h2 className="text-base font-semibold text-indigo-300 flex items-center gap-2 border-b border-gray-800/80 pb-3">
              <DollarSign className="w-4 h-4 text-indigo-400" /> Logistics & Compensation
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Salary Range */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">
                  Salary Range
                </label>
                <div className="relative flex items-center">
                  <DollarSign className="w-4 h-4 text-gray-500 absolute left-3.5" />
                  <input
                    type="text"
                    name="salaryRange"
                    value={formData.salaryRange}
                    onChange={handleChange}
                    placeholder="e.g. $120k - $150k"
                    className="w-full bg-[#0a0a0f]/80 border border-gray-800 focus:border-indigo-500/80 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">
                  Location
                </label>
                <div className="relative flex items-center">
                  <MapPin className="w-4 h-4 text-gray-500 absolute left-3.5" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. San Francisco / Remote"
                    className="w-full bg-[#0a0a0f]/80 border border-gray-800 focus:border-indigo-500/80 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Deadline */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">
                  Application Deadline
                </label>
                <div className="relative flex items-center">
                  <Calendar className="w-4 h-4 text-gray-500 absolute left-3.5 pointer-events-none" />
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0f]/80 border border-gray-800 focus:border-indigo-500/80 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Vacancies */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">
                  Number of Vacancies
                </label>
                <div className="relative flex items-center">
                  <Users className="w-4 h-4 text-gray-500 absolute left-3.5" />
                  <input
                    type="number"
                    min="1"
                    name="vacancies"
                    value={formData.vacancies}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0f]/80 border border-gray-800 focus:border-indigo-500/80 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Employment Type */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">
                  Employment Type
                </label>
                <div className="relative flex items-center">
                  <Briefcase className="w-4 h-4 text-gray-500 absolute left-3.5 pointer-events-none" />
                  <select
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0f]/80 border border-gray-800 focus:border-indigo-500/80 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="Full Time" className="bg-[#12121a]">Full Time</option>
                    <option value="Part Time" className="bg-[#12121a]">Part Time</option>
                    <option value="Contract" className="bg-[#12121a]">Contract</option>
                    <option value="Internship" className="bg-[#12121a]">Internship</option>
                  </select>
                </div>
              </div>

              {/* Remote Option */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">
                  Remote Option
                </label>
                <div className="relative flex items-center">
                  <Globe className="w-4 h-4 text-gray-500 absolute left-3.5 pointer-events-none" />
                  <select
                    name="remoteOption"
                    value={formData.remoteOption}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0f]/80 border border-gray-800 focus:border-indigo-500/80 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="Remote" className="bg-[#12121a]">Remote</option>
                    <option value="On-site" className="bg-[#12121a]">On-site</option>
                    <option value="Hybrid" className="bg-[#12121a]">Hybrid</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 4: Skills & Benefits */}
          <div className="bg-[#12121a]/80 border border-gray-800/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h2 className="text-base font-semibold text-indigo-300 flex items-center gap-2 border-b border-gray-800/80 pb-3">
              <Tag className="w-4 h-4 text-indigo-400" /> Skills & Benefits
            </h2>

            {/* Skills Tag Input */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-2">
                Required Skills
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="Add a skill (e.g. TypeScript)"
                  className="flex-1 bg-[#0a0a0f]/80 border border-gray-800 focus:border-indigo-500/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2.5 rounded-xl text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>

              {/* Skills Tags List */}
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-medium"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="hover:text-rose-400 transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-2">
                Perks & Benefits
              </label>
              <div className="relative">
                <textarea
                  name="benefits"
                  rows={3}
                  value={formData.benefits}
                  onChange={handleChange}
                  placeholder="e.g. Health insurance, 401(k) matching..."
                  className="w-full bg-[#0a0a0f]/80 border border-gray-800 focus:border-indigo-500/80 rounded-xl p-3.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-medium text-sm px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Post Job Opening
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </section>
  );
}

export default JobForm;