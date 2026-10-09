
// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   Eye as EyeIcon,
//   SquarePen as EditIcon,
//   Trash2 as TrashIcon,
//   Lock as LockIcon,
//   LockKeyholeOpen as UnlockIcon,
//   RefreshCw as RefreshIcon,
//   X as CloseIcon,
// } from "lucide-react";

// export default function ManageJobs() {
//   const [jobs, setJobs] = useState([]);
//   const [isFetching, setIsFetching] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [editingJob, setEditingJob] = useState(null);
//   const [filterStatus, setFilterStatus] = useState("All");

//   // Fetch jobs list from backend endpoint GET /api/jobs
//   const handleFetchJobs = async () => {
//     setIsFetching(true);
//     setError(null);
//     try {
//       const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
//       const response = await fetch(`${baseUrl}/api/jobs`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to fetch jobs: ${response.statusText}`);
//       }

//       const data = await response.json();

//       // Handle array payload or nested object payloads (e.g. { jobs: [...] })
//       if (Array.isArray(data)) {
//         setJobs(data);
//       } else if (data && Array.isArray(data.jobs)) {
//         setJobs(data.jobs);
//       } else {
//         setJobs([]);
//       }
//     } catch (err) {
//       console.error("Error fetching jobs:", err);
//       setError("Unable to load job listings. Please try again.");
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   // Automatically fetch jobs on initial mount
//   useEffect(() => {
//     handleFetchJobs();
//   }, []);

//   // Toggle Job Status (Close / Reopen)
//   const handleToggleStatus = (jobId) => {
//     setJobs((prev) =>
//       prev.map((job) =>
//         job.id === jobId
//           ? { ...job, status: job.status === "Active" ? "Closed" : "Active" }
//           : job
//       )
//     );
//   };

//   // Delete Job
//   const handleDeleteJob = (jobId) => {
//     if (confirm("Are you sure you want to delete this job posting?")) {
//       setJobs((prev) => prev.filter((job) => job.id !== jobId));
//     }
//   };

//   // Save Edited Job
//   const handleSaveEdit = (e) => {
//     e.preventDefault();
//     setJobs((prev) =>
//       prev.map((job) => (job.id === editingJob.id ? editingJob : job))
//     );
//     setEditingJob(null);
//   };

//   const filteredJobs = jobs.filter((job) => {
//     if (filterStatus === "Active") return job.status === "Active";
//     if (filterStatus === "Closed") return job.status === "Closed";
//     return true;
//   });

//   return (
//     <div className="min-h-screen flex-1 bg-[#0a0a0f] text-white p-4 sm:p-6 lg:p-8 space-y-8">
//       {/* Header Section */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800/80">
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
//             Manage Jobs
//           </h1>
//           <p className="text-gray-400 text-sm pt-1">
//             View, edit, close, reopen, or remove posted job listings.
//           </p>
//         </div>
//         <div className="flex items-center gap-3">
//           <button
//             onClick={handleFetchJobs}
//             disabled={isFetching}
//             className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#14141f] hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white text-sm font-medium rounded-xl transition-all disabled:opacity-50 cursor-pointer"
//           >
//             <RefreshIcon
//               className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
//             />
//             {isFetching ? "Syncing..." : "Reload Jobs"}
//           </button>
//         </div>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-sm">
//           {error}
//         </div>
//       )}

//       {/* Filter Tabs */}
//       <div className="flex items-center gap-2 border-b border-gray-800/80 pb-4">
//         {["All", "Active", "Closed"].map((status) => (
//           <button
//             key={status}
//             onClick={() => setFilterStatus(status)}
//             className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${filterStatus === status
//                 ? "bg-purple-600/20 text-purple-400 border border-purple-500/30"
//                 : "bg-[#14141f] text-gray-400 border border-gray-800 hover:text-white"
//               }`}
//           >
//             {status} Jobs
//           </button>
//         ))}
//       </div>

//       {/* Jobs Table / List Container */}
//       <div className="bg-[#14141f] border border-gray-800 rounded-2xl shadow-xl overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse text-sm">
//             <thead>
//               <tr className="border-b border-gray-800 bg-[#0a0a0f]/50 text-gray-400 uppercase text-xs font-semibold tracking-wider">
//                 <th className="py-4 px-6">Job Title</th>
//                 <th className="py-4 px-6">Department</th>
//                 <th className="py-4 px-6">Applications</th>
//                 <th className="py-4 px-6">Status</th>
//                 <th className="py-4 px-6 text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-800/80">
//               {isFetching && jobs.length === 0 ? (
//                 <tr>
//                   <td colSpan={5} className="py-8 text-center text-gray-500">
//                     Loading job listings...
//                   </td>
//                 </tr>
//               ) : filteredJobs.length === 0 ? (
//                 <tr>
//                   <td colSpan={5} className="py-8 text-center text-gray-500">
//                     No job listings found for this filter.
//                   </td>
//                 </tr>
//               ) : (
//                 filteredJobs.map((job) => (
//                   <tr
//                     key={job.id}
//                     className="hover:bg-purple-500/[0.02] transition-colors"
//                   >
//                     <td className="py-4 px-6">
//                       <div className="font-semibold text-white">{job.title}</div>
//                       <div className="text-xs text-gray-400">
//                         {job.location} • {job.employmentType}
//                       </div>
//                     </td>
//                     <td className="py-4 px-6 text-gray-300">
//                       {job.category}
//                     </td>
//                     <td className="py-4 px-6 font-medium text-purple-400">
//                       {job.applicationsCount} 0
//                     </td>
//                     <td className="py-4 px-6">
//                       <span
//                         className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${job.status === "Active"
//                             ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
//                             : "bg-gray-500/10 text-gray-400 border-gray-500/20"
//                           }`}
//                       >
//                         {job.status}
//                       </span>
//                     </td>
//                     <td className="py-4 px-6 text-right space-x-2">
//                       {/* Action: View Job */}
//                       <button
//                         onClick={() => setSelectedJob(job)}
//                         title="View Job Details"
//                         className="p-2 bg-[#0a0a0f] border border-gray-800 hover:border-gray-700 text-gray-300 hover:text-white rounded-lg transition-all cursor-pointer inline-flex items-center justify-center"
//                       >
//                         <EyeIcon className="w-4 h-4" />
//                       </button>

//                       {/* Action: Edit Job */}
//                       <button
//                         onClick={() => setEditingJob(job)}
//                         title="Edit Job"
//                         className="p-2 bg-[#0a0a0f] border border-gray-800 hover:border-purple-500/40 text-purple-400 rounded-lg transition-all cursor-pointer inline-flex items-center justify-center"
//                       >
//                         <EditIcon className="w-4 h-4" />
//                       </button>

//                       {/* Action: Close / Reopen Job */}
//                       <button
//                         onClick={() => handleToggleStatus(job.id)}
//                         title={
//                           job.status === "Active" ? "Close Job" : "Reopen Job"
//                         }
//                         className={`p-2 bg-[#0a0a0f] border border-gray-800 rounded-lg transition-all cursor-pointer inline-flex items-center justify-center ${job.status === "Active"
//                             ? "hover:border-amber-500/40 text-amber-400"
//                             : "hover:border-emerald-500/40 text-emerald-400"
//                           }`}
//                       >
//                         {job.status === "Active" ? (
//                           <LockIcon className="w-4 h-4" />
//                         ) : (
//                           <UnlockIcon className="w-4 h-4" />
//                         )}
//                       </button>

//                       {/* Action: Delete Job */}
//                       <button
//                         onClick={() => handleDeleteJob(job.id)}
//                         title="Delete Job"
//                         className="p-2 bg-[#0a0a0f] border border-gray-800 hover:border-rose-500/40 text-rose-400 rounded-lg transition-all cursor-pointer inline-flex items-center justify-center"
//                       >
//                         <TrashIcon className="w-4 h-4" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* View Job Modal */}
//       {selectedJob && (
//         <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
//           <div className="bg-[#14141f] border border-gray-800 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl relative">
//             <div className="flex items-center justify-between pb-3 border-b border-gray-800">
//               <h3 className="text-lg font-bold text-white">
//                 {selectedJob.title}
//               </h3>
//               <button
//                 onClick={() => setSelectedJob(null)}
//                 className="text-gray-400 hover:text-white cursor-pointer"
//               >
//                 <CloseIcon className="w-5 h-5" />
//               </button>
//             </div>
//             <div className="space-y-2 text-sm text-gray-300">
//               <p>
//                 <strong className="text-gray-400">Department:</strong>{" "}
//                 {selectedJob.department}
//               </p>
//               <p>
//                 <strong className="text-gray-400">Location:</strong>{" "}
//                 {selectedJob.location}
//               </p>
//               <p>
//                 <strong className="text-gray-400">Type:</strong>{" "}
//                 {selectedJob.type}
//               </p>
//               <p>
//                 <strong className="text-gray-400">Applications:</strong>{" "}
//                 {selectedJob.applicationsCount}
//               </p>
//               <p>
//                 <strong className="text-gray-400">Posted On:</strong>{" "}
//                 {selectedJob.postedDate}
//               </p>
//               <p className="pt-2">
//                 <strong className="text-gray-400">Description:</strong>
//               </p>
//               <p className="bg-[#0a0a0f] p-3 rounded-xl border border-gray-800 text-xs text-gray-400 leading-relaxed">
//                 {selectedJob.description}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Edit Job Modal */}
//       {editingJob && (
//         <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
//           <form
//             onSubmit={handleSaveEdit}
//             className="bg-[#14141f] border border-gray-800 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl relative"
//           >
//             <div className="flex items-center justify-between pb-3 border-b border-gray-800">
//               <h3 className="text-lg font-bold text-white">
//                 Edit Job Details
//               </h3>
//               <button
//                 type="button"
//                 onClick={() => setEditingJob(null)}
//                 className="text-gray-400 hover:text-white cursor-pointer"
//               >
//                 <CloseIcon className="w-5 h-5" />
//               </button>
//             </div>

//             <div className="space-y-3">
//               <div>
//                 <label className="text-xs font-semibold text-gray-400">
//                   Job Title
//                 </label>
//                 <input
//                   type="text"
//                   value={editingJob.title}
//                   onChange={(e) =>
//                     setEditingJob({ ...editingJob, title: e.target.value })
//                   }
//                   className="w-full mt-1 px-3 py-2 bg-[#0a0a0f] border border-gray-800 text-white text-sm rounded-xl outline-none focus:border-purple-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="text-xs font-semibold text-gray-400">
//                   Department
//                 </label>
//                 <input
//                   type="text"
//                   value={editingJob.department}
//                   onChange={(e) =>
//                     setEditingJob({
//                       ...editingJob,
//                       department: e.target.value,
//                     })
//                   }
//                   className="w-full mt-1 px-3 py-2 bg-[#0a0a0f] border border-gray-800 text-white text-sm rounded-xl outline-none focus:border-purple-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="text-xs font-semibold text-gray-400">
//                   Location
//                 </label>
//                 <input
//                   type="text"
//                   value={editingJob.location}
//                   onChange={(e) =>
//                     setEditingJob({ ...editingJob, location: e.target.value })
//                   }
//                   className="w-full mt-1 px-3 py-2 bg-[#0a0a0f] border border-gray-800 text-white text-sm rounded-xl outline-none focus:border-purple-500"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="flex justify-end gap-3 pt-3">
//               <button
//                 type="button"
//                 onClick={() => setEditingJob(null)}
//                 className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold rounded-xl transition-all cursor-pointer"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-xl transition-all shadow-md cursor-pointer"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { authClient } from "@/app/lib/auth-client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Eye as EyeIcon,
  SquarePen as EditIcon,
  Trash2 as TrashIcon,
  Lock as LockIcon,
  LockKeyholeOpen as UnlockIcon,
  RefreshCw as RefreshIcon,
  X as CloseIcon,
} from "lucide-react";

export default function ManageJobs() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const userEmail = user?.email || "";

  const [jobs, setJobs] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");

  // Fetch jobs list for the logged-in user's company email
  const handleFetchJobs = useCallback(async () => {
    if (!userEmail) return;

    setIsFetching(true);
    setError(null);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
      const response = await fetch(
        `${baseUrl}/api/jobs/company/${encodeURIComponent(userEmail)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch jobs: ${response.statusText}`);
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setJobs(data);
      } else if (data && Array.isArray(data.jobs)) {
        setJobs(data.jobs);
      } else {
        setJobs([]);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Unable to load job listings. Please try again.");
    } finally {
      setIsFetching(false);
    }
  }, [userEmail]);

  // Fetch jobs whenever user email resolves
  useEffect(() => {
    if (userEmail) {
      handleFetchJobs();
    }
  }, [userEmail, handleFetchJobs]);

  // Toggle Job Status (Close / Reopen)
  const handleToggleStatus = (jobId) => {
    setJobs((prev) =>
      prev.map((job) => {
        const id = job._id || job.id;
        return id === jobId
          ? { ...job, status: job.status === "Active" ? "Closed" : "Active" }
          : job;
      })
    );
  };

  // Delete Job
  const handleDeleteJob = (jobId) => {
    if (confirm("Are you sure you want to delete this job posting?")) {
      setJobs((prev) =>
        prev.filter((job) => (job._id || job.id) !== jobId)
      );
    }
  };

  // Save Edited Job
  const handleSaveEdit = (e) => {
    e.preventDefault();
    setJobs((prev) =>
      prev.map((job) =>
        (job._id || job.id) === (editingJob._id || editingJob.id)
          ? editingJob
          : job
      )
    );
    setEditingJob(null);
  };

  const filteredJobs = jobs.filter((job) => {
    if (filterStatus === "Active") return job.status === "Active";
    if (filterStatus === "Closed") return job.status === "Closed";
    return true;
  });

  return (
    <div className="min-h-screen flex-1 bg-[#0a0a0f] text-white p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Manage Jobs
          </h1>
          <p className="text-gray-400 text-sm pt-1">
            View, edit, close, reopen, or remove posted job listings for{" "}
            <span className="text-indigo-400 font-medium">
              {userEmail || "your account"}
            </span>
            .
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleFetchJobs}
            disabled={isFetching || !userEmail}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#14141f] hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white text-sm font-medium rounded-xl transition-all disabled:opacity-50 cursor-pointer"
          >
            <RefreshIcon
              className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
            />
            {isFetching ? "Syncing..." : "Reload Jobs"}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-800/80 pb-4">
        {["All", "Active", "Closed"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filterStatus === status
                ? "bg-purple-600/20 text-purple-400 border border-purple-500/30"
                : "bg-[#14141f] text-gray-400 border border-gray-800 hover:text-white"
            }`}
          >
            {status} Jobs
          </button>
        ))}
      </div>

      {/* Jobs Table Container */}
      <div className="bg-[#14141f] border border-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-800 bg-[#0a0a0f]/50 text-gray-400 uppercase text-xs font-semibold tracking-wider">
                <th className="py-4 px-6">Job Title</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Vacancies</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/80">
              {isFetching && jobs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    Loading job listings...
                  </td>
                </tr>
              ) : filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    No job listings found for this company.
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => {
                  const jobId = job._id || job.id;
                  return (
                    <tr
                      key={jobId}
                      className="hover:bg-purple-500/[0.02] transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="font-semibold text-white">
                          {job.title}
                        </div>
                        <div className="text-xs text-gray-400">
                          {job.location || "Remote"} • {job.employmentType || "Full Time"}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-300">
                        {job.category || "General"}
                      </td>
                      <td className="py-4 px-6 font-medium text-purple-400">
                        {job.vacancies ?? 1}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                            job.status === "Active"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : "bg-gray-500/10 text-gray-400 border-gray-500/20"
                          }`}
                        >
                          {job.status || "Active"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        {/* View Job */}
                        <button
                          onClick={() => setSelectedJob(job)}
                          title="View Job Details"
                          className="p-2 bg-[#0a0a0f] border border-gray-800 hover:border-gray-700 text-gray-300 hover:text-white rounded-lg transition-all cursor-pointer inline-flex items-center justify-center"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </button>

                        {/* Edit Job */}
                        <button
                          onClick={() => setEditingJob(job)}
                          title="Edit Job"
                          className="p-2 bg-[#0a0a0f] border border-gray-800 hover:border-purple-500/40 text-purple-400 rounded-lg transition-all cursor-pointer inline-flex items-center justify-center"
                        >
                          <EditIcon className="w-4 h-4" />
                        </button>

                        {/* Close / Reopen Job */}
                        <button
                          onClick={() => handleToggleStatus(jobId)}
                          title={
                            job.status === "Active" ? "Close Job" : "Reopen Job"
                          }
                          className={`p-2 bg-[#0a0a0f] border border-gray-800 rounded-lg transition-all cursor-pointer inline-flex items-center justify-center ${
                            job.status === "Active"
                              ? "hover:border-amber-500/40 text-amber-400"
                              : "hover:border-emerald-500/40 text-emerald-400"
                          }`}
                        >
                          {job.status === "Active" ? (
                            <LockIcon className="w-4 h-4" />
                          ) : (
                            <UnlockIcon className="w-4 h-4" />
                          )}
                        </button>

                        {/* Delete Job */}
                        <button
                          onClick={() => handleDeleteJob(jobId)}
                          title="Delete Job"
                          className="p-2 bg-[#0a0a0f] border border-gray-800 hover:border-rose-500/40 text-rose-400 rounded-lg transition-all cursor-pointer inline-flex items-center justify-center"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Job Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <h3 className="text-lg font-bold text-white">
                {selectedJob.title}
              </h3>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2 text-sm text-gray-300">
              <p>
                <strong className="text-gray-400">Category:</strong>{" "}
                {selectedJob.category || "N/A"}
              </p>
              <p>
                <strong className="text-gray-400">Location:</strong>{" "}
                {selectedJob.location || "N/A"}
              </p>
              <p>
                <strong className="text-gray-400">Employment Type:</strong>{" "}
                {selectedJob.employmentType || "N/A"}
              </p>
              <p>
                <strong className="text-gray-400">Salary Range:</strong>{" "}
                {selectedJob.salaryRange || "N/A"}
              </p>
              <p>
                <strong className="text-gray-400">Vacancies:</strong>{" "}
                {selectedJob.vacancies ?? 1}
              </p>
              <p className="pt-2">
                <strong className="text-gray-400">Description:</strong>
              </p>
              <p className="bg-[#0a0a0f] p-3 rounded-xl border border-gray-800 text-xs text-gray-400 leading-relaxed">
                {selectedJob.description || "No description provided."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Edit Job Modal */}
      {editingJob && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveEdit}
            className="bg-[#14141f] border border-gray-800 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl relative"
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <h3 className="text-lg font-bold text-white">
                Edit Job Details
              </h3>
              <button
                type="button"
                onClick={() => setEditingJob(null)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-400">
                  Job Title
                </label>
                <input
                  type="text"
                  value={editingJob.title || ""}
                  onChange={(e) =>
                    setEditingJob({ ...editingJob, title: e.target.value })
                  }
                  className="w-full mt-1 px-3 py-2 bg-[#0a0a0f] border border-gray-800 text-white text-sm rounded-xl outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-400">
                  Category
                </label>
                <input
                  type="text"
                  value={editingJob.category || ""}
                  onChange={(e) =>
                    setEditingJob({
                      ...editingJob,
                      category: e.target.value,
                    })
                  }
                  className="w-full mt-1 px-3 py-2 bg-[#0a0a0f] border border-gray-800 text-white text-sm rounded-xl outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-400">
                  Location
                </label>
                <input
                  type="text"
                  value={editingJob.location || ""}
                  onChange={(e) =>
                    setEditingJob({ ...editingJob, location: e.target.value })
                  }
                  className="w-full mt-1 px-3 py-2 bg-[#0a0a0f] border border-gray-800 text-white text-sm rounded-xl outline-none focus:border-purple-500"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setEditingJob(null)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-xl transition-all shadow-md cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}










