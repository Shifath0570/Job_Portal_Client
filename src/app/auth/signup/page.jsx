"use client";

import { authClient } from "@/app/lib/auth-client";
import React, { useState } from "react";


export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Password validation check
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    try {
      await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        fetchOptions: {
          onSuccess: () => {
            window.location.href = "/"; // Redirect after successful sign-up
          },
          onError: (ctx) => {
            setError(ctx.error.message || "Failed to create account.");
            setLoading(false);
          },
        },
      });
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#14141f] border border-gray-800 rounded-2xl shadow-2xl p-8">
        
        {/* Header / Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 via-purple-500 to-indigo-400 flex items-center justify-center font-bold text-2xl shadow-lg shadow-purple-500/30 text-white mx-auto mb-3">
            C
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Create an Account
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Join CareerConnect to start applying or posting jobs
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3 bg-red-950/50 border border-red-600/60 rounded-lg text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 bg-[#0a0a0f] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-[#0a0a0f] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-[#0a0a0f] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-1.5">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-[#0a0a0f] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-lg text-sm transition-all shadow-md hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
          >
            Sign in
          </a>
        </div>

      </div>
    </div>
  );
}