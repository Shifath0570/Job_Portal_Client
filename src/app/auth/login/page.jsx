"use client";

import { authClient } from "@/app/lib/auth-client";
import React, { useState } from "react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        fetchOptions: {
          onSuccess: () => {
            window.location.href = "/"; // Redirect after successful login
          },
          onError: (ctx) => {
            setError(ctx.error.message || "Invalid credentials. Please try again.");
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
            Welcome Back
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Sign in to access your CareerConnect account
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3 bg-red-950/50 border border-red-600/60 rounded-lg text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-2">
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
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider">
                Password
              </label>
              <a href="#forgot" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                Forgot password?
              </a>
            </div>
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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-lg text-sm transition-all shadow-md hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center text-sm text-gray-400">
          Dont have an account?{" "}
          <a
            href="/signup"
            className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
          >
            Sign up
          </a>
        </div>

      </div>
    </div>
  );
}