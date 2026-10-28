
"use client";

import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  FileText,
  Video,
  ExternalLink,
} from "lucide-react";
import { authClient } from "@/app/lib/auth-client";

export default function Interviews() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("UPCOMING");
  const [notification] = useState("");

  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const user = session?.user;
  const userEmail = user?.email?.toLowerCase().trim() || "";

  // Fetch interviews from backend API once session resolves
  useEffect(() => {
    if (sessionLoading) return;

    async function fetchInterviews() {
      try {
        setLoading(true);
        if (!userEmail) {
          setInterviews([]);
          return;
        }

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

        const res = await fetch(`${baseUrl}/api/interviews/${encodeURIComponent(userEmail)}`);
        const data = await res.json();

        if (data.success && Array.isArray(data.interviews)) {
          // Strictly filter items where the applicant's email matches the user's email
          const matchedInterviews = data.interviews.filter((item) => {
            const candidateMail = (
              item.applicantEmail ||
              item.candidateEmail ||
              item.email ||
              ""
            ).toLowerCase().trim();
            return candidateMail === userEmail;
          });

          const formattedInterviews = matchedInterviews.map((item) => ({
            ...item,
            id: item._id || item.id,
            companyName: item.companyName || "Company Not Specified",
            companyLogo:
              item.companyLogo ||
              "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80",
            jobTitle: item.jobTitle || item.jobPosition || "Role Not Specified",
            date: item.date || "TBD",
            time: item.time || "Time Not Specified",
            type: item.type || "Virtual / Interview",
            meetingLink: item.meetingLink || null,
            interviewLocation:
              item.officeAddress || item.interviewLocation || "Online / Remote",
            recruiterNotes: item.notes || item.recruiterNotes || "No notes provided.",
            status: item.status || "Upcoming",
          }));

          setInterviews(formattedInterviews);
        } else {
          setError(data.message || "Failed to load interviews");
        }
      } catch (err) {
        console.error("Fetch Interviews Error:", err);
        setError("Something went wrong while fetching interviews.");
      } finally {
        setLoading(false);
      }
    }

    fetchInterviews();
  }, [sessionLoading, userEmail]);

  // Filter interviews based on active tab
  const filteredInterviews = interviews.filter((item) => {
    const status = (item.status || "").toLowerCase();
    if (activeTab === "UPCOMING") {
      return status === "upcoming" || status === "interview scheduled";
    } else {
      return status === "completed" || status === "hired" || status === "rejected";
    }
  });

  if (loading || sessionLoading) {
    return (
      <div className="min-h-screen flex-1 bg-[#0a0a0f] text-white flex items-center justify-center">
        <p className="text-purple-400 text-sm animate-pulse">Loading interview schedules...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex-1 bg-[#0a0a0f] text-white flex items-center justify-center p-6">
        <div className="p-6 bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-xl">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex-1 bg-[#0a0a0f] text-white p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Interview Schedule
          </h1>
          <p className="text-gray-400 text-sm pt-1">
            Review your upcoming virtual meetings, location details, and recruiter notes.
          </p>
        </div>

        {/* Tab Filter */}
        <div className="flex items-center bg-[#14141f] border border-gray-800 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab("UPCOMING")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeTab === "UPCOMING"
                ? "bg-purple-600 text-white shadow-md"
                : "text-gray-400 hover:text-white"
              }`}
          >
            Upcoming
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("COMPLETED")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeTab === "COMPLETED"
                ? "bg-purple-600 text-white shadow-md"
                : "text-gray-400 hover:text-white"
              }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Toast Notification Banner */}
      {notification && (
        <div className="p-4 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
          {notification}
        </div>
      )}

      {/* Interview Cards List */}
      <div className="space-y-6">
        {filteredInterviews.length === 0 ? (
          <div className="p-12 text-center bg-[#14141f] border border-gray-800 rounded-2xl text-gray-500 space-y-2 shadow-xl">
            <Calendar className="w-10 h-10 mx-auto text-gray-600 mb-2" />
            <h3 className="text-base font-bold text-white">No {activeTab.toLowerCase()} interviews</h3>
            <p className="text-xs text-gray-400">
              When recruiters schedule an interview, meeting parameters will appear here.
            </p>
          </div>
        ) : (
          filteredInterviews.map((interview) => (
            <div
              key={interview.id}
              className="bg-[#14141f] border border-gray-800 hover:border-purple-500/40 rounded-2xl p-6 space-y-6 transition-all shadow-xl"
            >
              {/* Header: Company, Job & Status Pill */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-5">
                <div className="flex items-center gap-4">
                  <img
                    src={interview.companyLogo}
                    alt={interview.companyName}
                    className="w-12 h-12 rounded-xl object-cover border border-gray-800 shrink-0"
                  />
                  <div>
                    <h2 className="text-base font-bold text-white">
                      {interview.jobTitle}
                    </h2>
                    <p className="text-xs text-purple-400 font-semibold pt-0.5">
                      {interview.companyName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[11px] font-semibold rounded-full">
                    {interview.type}
                  </span>
                </div>
              </div>

              {/* Grid Details: Date, Time & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                {/* Date */}
                <div className="p-3.5 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-1">
                  <span className="text-gray-500 text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    Date
                  </span>
                  <p className="font-bold text-white text-sm">{interview.date}</p>
                </div>

                {/* Time */}
                <div className="p-3.5 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-1">
                  <span className="text-gray-500 text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    Time Slot
                  </span>
                  <p className="font-bold text-white text-sm">{interview.time}</p>
                </div>

                {/* Location */}
                <div className="p-3.5 bg-[#0a0a0f] border border-gray-800 rounded-xl space-y-1">
                  <span className="text-gray-500 text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    Location
                  </span>
                  <p className="font-bold text-white text-sm truncate">
                    {interview.interviewLocation}
                  </p>
                </div>
              </div>

              {/* Recruiter Notes Block */}
              {interview.recruiterNotes && (
                <div className="p-4 bg-[#0a0a0f] border border-gray-800/80 rounded-xl space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 text-gray-400 font-semibold">
                    <FileText className="w-4 h-4 text-purple-400" />
                    <span>Recruiter Notes / Instructions</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed pl-5">
                    {interview.recruiterNotes}
                  </p>
                </div>
              )}

              {/* Action Buttons: Join Link */}
              {activeTab === "UPCOMING" && (
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-gray-800/60">
                  <div className="text-xs text-gray-400">
                    {interview.meetingLink ? (
                      <span className="flex items-center gap-2">
                        <Video className="w-4 h-4 text-emerald-400" />
                        Online Video Conference
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-amber-400" />
                        In-Person Meeting
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {interview.meetingLink && (
                      <a
                        href={interview.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md cursor-pointer transition-all inline-flex items-center gap-2"
                      >
                        <Video className="w-4 h-4" />
                        Join Meeting
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}




