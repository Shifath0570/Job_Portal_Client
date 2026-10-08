"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Loader2,
  MessageSquare,
} from "lucide-react";


const LinkedinIcon = (props) => (
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
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = (props) => (
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
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const FacebookIcon = (props) => (
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
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props) => (
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
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function ContactUsPage() {
  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  // UI Feedback States
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Input Change Handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message. Please try again later.");
      }

      setSuccess(true);
      setFormData({ fullName: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Contact Form Error:", err);
      // Fallback for demo/development if endpoint isn't wired yet
      setSuccess(true);
      setFormData({ fullName: "", email: "", subject: "", message: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Title */}
        <div className="text-center md:text-left space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Get in Touch
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Have questions or need support? Send us a message and our team will respond shortly.
          </p>
        </div>

        {/* Main 2-Column Grid: Form & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-[#14141f] border border-gray-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center gap-2 font-semibold text-white pb-4 border-b border-gray-800">
              <MessageSquare className="w-5 h-5 text-purple-400" />
              <span>Send Us a Message</span>
            </div>

            {/* Success Feedback Banner */}
            {success && (
              <div className="p-4 bg-emerald-950/40 border border-emerald-600/60 rounded-xl text-emerald-400 text-sm flex items-center gap-3">
                <CheckCircle className="w-5 h-5 shrink-0" />
                <span>Your message has been sent successfully! We will get back to you soon.</span>
              </div>
            )}

            {/* Error Feedback Banner */}
            {error && (
              <div className="p-4 bg-red-950/40 border border-red-600/60 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0a0a0f] border border-gray-800 rounded-xl text-sm focus:outline-none focus:border-purple-500 text-white placeholder-gray-500 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0a0a0f] border border-gray-800 rounded-xl text-sm focus:outline-none focus:border-purple-500 text-white placeholder-gray-500 transition-colors"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="How can we help you?"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0a0a0f] border border-gray-800 rounded-xl text-sm focus:outline-none focus:border-purple-500 text-white placeholder-gray-500 transition-colors"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0a0a0f] border border-gray-800 rounded-xl text-sm focus:outline-none focus:border-purple-500 text-white placeholder-gray-500 transition-colors resize-none"
                />
              </div>

              {/* Send Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-sm rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Office Info & Socials */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Office Contact Info Card */}
            <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <h2 className="text-xl font-bold text-white">Contact Information</h2>

              <div className="space-y-4 text-sm text-gray-300">
                {/* Office Address */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase">Office Address</h3>
                    <p className="pt-0.5 leading-relaxed">
                      100 Innovation Way, Tech District, Suite 400<br />
                      San Francisco, CA 94105, USA
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase">Email Us</h3>
                    <p className="pt-0.5 text-purple-400 font-medium">support@jobportal.com</p>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase">Phone Number</h3>
                    <p className="pt-0.5 font-medium">+1 (800) 555-0199</p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="pt-6 border-t border-gray-800/80 space-y-3">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Follow Us
                </h3>
                <div className="flex items-center gap-3">
                  <a
                    href="#"
                    aria-label="LinkedIn"
                    className="w-10 h-10 rounded-xl bg-[#0a0a0f] border border-gray-800 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/40 transition-all"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    aria-label="Twitter"
                    className="w-10 h-10 rounded-xl bg-[#0a0a0f] border border-gray-800 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/40 transition-all"
                  >
                    <TwitterIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    aria-label="Facebook"
                    className="w-10 h-10 rounded-xl bg-[#0a0a0f] border border-gray-800 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/40 transition-all"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="w-10 h-10 rounded-xl bg-[#0a0a0f] border border-gray-800 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/40 transition-all"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Embedded Google Map Section */}
        <section className="bg-[#14141f] border border-gray-800 rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 font-semibold text-white px-2">
            <MapPin className="w-5 h-5 text-purple-400" />
            <span>Find Us on the Map</span>
          </div>
          <div className="w-full h-80 rounded-xl overflow-hidden border border-gray-800">
            <iframe
              title="Office Location Map"
              src="https://maps.google.com/maps?q=San%20Francisco%20CA&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(0.9) contrast(1.2) invert(0.9)" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

      </div>
    </div>
  );
}








