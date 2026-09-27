"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Avatar,
  Button,
  Tooltip,
} from "@heroui/react";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Bookmark,
  Users,
  CreditCard,
  LogOut,
  Briefcase,
  User,
} from "lucide-react";
import { useSession, authClient } from "../lib/auth-client";

const DashboardSidebar = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const { data: session, isPending } = useSession();
  const user = session?.user;

  // Navigation items grouped by role
  const seekerNavItems = [
    { id: "seekerOverview", href: "/Seeker/seekerOverview", label: "Overview", icon: LayoutDashboard },
    { id: "seekerProfile", href: "/Seeker/seekerProfile", label: "My Profile", icon: Briefcase },
    { id: "browseJobs", href: "/Seeker/browseJobs", label: "Browse Jobs", icon: Bookmark },
    { id: "savedJobs", href: "/Seeker/savedJobs", label: "Saved Jobs", icon: FileText },
    { id: "myApplications", href: "/Seeker/myApplications", label: "My Applications", icon: FileText },
    { id: "interviews", href: "/Seeker/interviews", label: "Interviews", icon: FileText },
    { id: "notifications", href: "/Seeker/notifications", label: "Notifications", icon: FileText },
  ];

  const recruiterNavItems = [
    { id: "recruterOverview", href: "/Recruter/recruterOverview", label: "Overview", icon: LayoutDashboard },
    { id: "companyProfile", href: "/Recruter/companyProfile", label: "Company Profile", icon: PlusCircle },
    { id: "jobForm", href: "/Recruter/jobForm", label: "Post a Job", icon: PlusCircle },
    { id: "manageJobs", href: "/Recruter/manageJobs", label: "Manage Jobs", icon: FileText },
    { id: "viewApplicants", href: "/Recruter/viewApplicants", label: "View Applicants", icon: Users },
    { id: "notifications", href: "/Recruter/notifications", label: "Notifications", icon: User },
    { id: "recruiterAnalytics", href: "/Recruter/recruiterAnalytics", label: "Recruiter Analytics", icon: User },
  ];

  const adminNavItems = [
    { id: "adminOverview", href: "/Admin/adminOverview", label: "Overview", icon: LayoutDashboard },
    { id: "manageUsers", href: "/Admin/manageUsers", label: "Manage Users", icon: LayoutDashboard },
    { id: "manageRecruiters", href: "/Admin/manageRecruiters", label: "Manage Recruiters", icon: Users },
    { id: "manageCandidates", href: "/Admin/manageCandidates", label: "Manage Candidates", icon: Briefcase },
    { id: "manageJobs", href: "/Admin/manageJobs", label: "Manage Jobs", icon: CreditCard },
    { id: "application", href: "/Admin/application", label: "Application", icon: CreditCard },
    { id: "reportsManagement", href: "/Admin/reportsManagement", label: "Reports Management", icon: CreditCard },
    { id: "jobCategoriesManagement", href: "/Admin/jobCategoriesManagement", label: "Job Categories Management", icon: CreditCard },
    { id: "notifications", href: "/Admin/notifications", label: "Notifications", icon: CreditCard },
    { id: "analyticsDashboard", href: "/Admin/analyticsDashboard", label: "Analytics Dashboard", icon: CreditCard },
  ];

  const navLinkMap = {
    seeker: seekerNavItems,
    recruiter: recruiterNavItems,
    admin: adminNavItems,
  };

  const currentRole = user?.role?.toLowerCase() || "seeker";
  const navItems = navLinkMap[currentRole] || seekerNavItems;

  const handleLogout = async () => {
    await authClient.signOut();
  };

  // Helper for role chip colors
  const roleColorMap = {
    admin: "danger",
    recruiter: "secondary",
    seeker: "primary",
  };

  return (
    <aside className="dark w-64 h-screen sticky top-0 flex flex-col justify-between border-r border-zinc-800 bg-[#0a0a0f] backdrop-blur-xl p-4 text-zinc-100 shadow-2xl">
      {/* Top Header & Navigation */}
      <div className="flex flex-col gap-6">
        {/* Brand Logo Header */}
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
            C
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-tight leading-tight text-zinc-100">
              CareerConnect
            </span>
            <span className="text-xs text-zinc-400 font-medium capitalize">
              {currentRole} Portal
            </span>
          </div>
        </div>

        {/* Dark Divider */}
        <hr className="border-t border-zinc-800/80 my-0" />

        {/* Dynamic Role Navigation Menu */}
        <div className="flex flex-col gap-1">
          <p className="px-2 text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
            Menu
          </p>
          <nav aria-label="Dashboard Navigation" className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 h-10 px-3 rounded-xl text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600/15 text-blue-400 font-semibold border border-blue-500/30 shadow-sm shadow-blue-500/10"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 hover:border hover:border-zinc-800/60"
                  }`}
                >
                  <IconComponent
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? "text-blue-400" : "text-zinc-500"
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Profile Footer & Logout */}
      <div className="flex flex-col gap-3">
        <hr className="border-t border-zinc-800/80 my-0" />

        {isPending ? (
          <div className="flex items-center gap-3 px-2 py-1 animate-pulse">
            <div className="w-10 h-10 rounded-full bg-zinc-800" />
            <div className="flex flex-col gap-1 flex-1">
              <div className="h-3.5 bg-zinc-800 rounded w-24" />
              <div className="h-2.5 bg-zinc-800/60 rounded w-16" />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800/80">
            <div className="flex items-center gap-3 min-w-0">
              <Avatar
                src={user?.image}
                name={user?.name || user?.email || "User"}
                size="sm"
                isBordered
                color={roleColorMap[currentRole] || "default"}
                className="shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-zinc-200 truncate leading-tight">
                  {user?.name || "User Account"}
                </span>
                <span className="text-[11px] text-zinc-500 truncate mt-0.5">
                  {user?.email}
                </span>
              </div>
            </div>

            <Tooltip content="Sign Out" placement="top" color="danger" className="dark">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                color="danger"
                onClick={handleLogout}
                aria-label="Logout"
                className="text-zinc-400 hover:text-red-400 hover:bg-red-500/10"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </Tooltip>
          </div>
        )}
      </div>
    </aside>
  );
};

export default DashboardSidebar;








