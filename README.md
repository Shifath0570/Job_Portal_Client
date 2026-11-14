# 🚀 Job Portal Platform (Findora / CareerHub)

A modern, full-stack job portal web application designed to connect job seekers with top recruiters and companies. Built with a responsive dark-mode UI, role-based workflows, resume handling, and real-time application tracking.

🌐 **Live Demo:** [https://job-portal-jet-nu.vercel.app](https://job-portal-jet-nu.vercel.app)

---

## 🛠️ Tech Stack

### **Frontend**
*   **Framework:** Next.js (React / App Router)
*   **Styling:** Tailwind CSS
*   **Icons:** Lucide React
*   **Authentication Client:** Auth Client (`@/app/lib/auth-client`)

### **Backend & Database**
*   **Server Runtime:** Node.js, Express.js
*   **Database:** MongoDB & MongoDB Native/Mongoose Driver
*   **Hosting / Deployment:** Vercel (Frontend), Node Backend Server

---

## ✨ Key Features

### 👤 For Job Seekers
*   **Advanced Job Search & Filtering:** Search by job title, required skills, company, category, job type (Full-Time, Part-Time, Contract), workplace type (Remote, Hybrid, On-site), and salary ranges.
*   **Profile Management:** Maintain candidate profile details, contact info, skills, experience, education, and resume document attachments.
*   **Quick Applications:** Apply to jobs seamlessly with pre-linked resumes and optional cover letters.
*   **Saved Jobs Dashboard:** Bookmark/save interesting job postings to review or apply to later.
*   **Application Tracking:** Monitor application statuses (e.g., Pending, Reviewed, Interview, Rejected).

### 🏢 For Recruiters & Employers
*   **Job Posting & Management:** Create, update, archive, and manage active job listings.
*   **Applicant Tracking:** Review incoming candidate applications, cover letters, and applicant qualifications in real time.
*   **Company Branding:** Manage company profile information, logos, and contact details.

### 🛡️ For Administrators
*   **Admin Overview Dashboard:** Real-time platform metrics tracking total users, candidates, recruiters, total jobs, active jobs, and total applications.
*   **System Audit Logs:** Monitor automated flags, company verifications, and administrative actions.

---

## 📂 Project Structure

```text
job-portal/
├── app/                  # Next.js App Router Pages & Components
│   ├── lib/              # Authentication and utility clients
│   ├── browse/           # Job browsing & filtering view
│   └── dashboard/        # User & Admin dashboards
├── server/               # Express Backend Server (API routes)
│   ├── models/           # Database schemas
│   └── routes/           # Endpoints for jobs, applications, users
├── public/               # Static assets & images
└── package.json          # Project dependencies & scripts


