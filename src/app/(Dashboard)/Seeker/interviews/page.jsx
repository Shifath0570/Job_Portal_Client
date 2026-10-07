
"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  FileText,
  Video,
  Copy,
  ExternalLink,
} from "lucide-react";

const INITIAL_INTERVIEWS = [
  {
    id: "int-101",
    companyName: "Starlight Design Studio",
    companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80",
    jobTitle: "UI/UX Product Designer",
    date: "Aug 12, 2026",
    time: "02:00 PM - 03:00 PM EST",
    type: "Virtual / Technical Round",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    interviewLocation: "Google Meet",
    recruiterNotes:
      "Please prepare a 15-minute presentation walking through your recent Design Systems portfolio case study. You will be interviewing with Sarah Jenkins (Lead Product Designer).",
    status: "Upcoming",
  },
  {
    id: "int-102",
    companyName: "Acme Technologies",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80",
    jobTitle: "Senior React Developer",
    date: "Aug 18, 2026",
    time: "10:30 AM - 11:30 AM PST",
    type: "On-site / Final Cultural Round",
    meetingLink: null,
    interviewLocation: "500 Howard St, Suite 400, San Francisco, CA",
    recruiterNotes:
      "Please check in at the 4th-floor lobby guest counter. Ask for David Miller. Parking validation is provided at the garage entrance.",
    status: "Upcoming",
  },
  {
    id: "int-103",
    companyName: "CyberPulse Labs",
    companyLogo: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=100&auto=format&fit=crop&q=80",
    jobTitle: "Full Stack JavaScript Developer",
    date: "Jul 29, 2026",
    time: "01:00 PM - 02:00 PM EST",
    type: "Virtual / Initial Screener",
    meetingLink: "https://zoom.us/j/9876543210",
    interviewLocation: "Zoom Video Call",
    recruiterNotes:
      "Informal conversation regarding past experience with Node.js and AWS deployment pipelines.",
    status: "Completed",
  },
];

export default function Interviews() {
  const [interviews] = useState(INITIAL_INTERVIEWS);
  const [activeTab, setActiveTab] = useState("UPCOMING");
  const [notification, setNotification] = useState("");

  const handleCopyLink = (link) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link);
      setNotification("Meeting link copied to clipboard!");
      setTimeout(() => setNotification(""), 3000);
    }
  };

  const filteredInterviews = interviews.filter((item) =>
    activeTab === "UPCOMING" ? item.status === "Upcoming" : item.status === "Completed"
  );

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
            onClick={() => setActiveTab("UPCOMING")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === "UPCOMING"
                ? "bg-purple-600 text-white shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab("COMPLETED")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === "COMPLETED"
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
                    <span>Recruiter Notes</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed pl-5">
                    {interview.recruiterNotes}
                  </p>
                </div>
              )}

              {/* Action Buttons: Join Link / Copy Link */}
              {interview.status === "Upcoming" && (
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
                      <>
                        <button
                          onClick={() => handleCopyLink(interview.meetingLink)}
                          className="px-3.5 py-2 bg-[#0a0a0f] hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white text-xs font-semibold rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          Copy Link
                        </button>

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
                      </>
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





