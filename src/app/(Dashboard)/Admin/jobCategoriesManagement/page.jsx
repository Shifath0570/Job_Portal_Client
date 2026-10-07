
"use client";

import React, { useState } from "react";
import {
  Layers,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  CheckCircle2,
} from "lucide-react";


const INITIAL_CATEGORIES = [
  {
    id: "cat-01",
    name: "Software Development",
    slug: "software-development",
    jobCount: 124,
    description:
      "Frontend, Backend, Full Stack, Mobile & Cloud Engineering roles.",
  },
  {
    id: "cat-02",
    name: "Design",
    slug: "design",
    jobCount: 68,
    description:
      "UI/UX, Product Design, Graphic Design, and Brand Architecture.",
  },
  {
    id: "cat-03",
    name: "Marketing",
    slug: "marketing",
    jobCount: 42,
    description:
      "Digital Marketing, SEO, Content Strategy, and Brand Growth.",
  },
  {
    id: "cat-04",
    name: "Sales",
    slug: "sales",
    jobCount: 35,
    description:
      "Account Management, Business Development, and Enterprise Sales.",
  },
  {
    id: "cat-05",
    name: "Finance",
    slug: "finance",
    jobCount: 29,
    description:
      "Financial Analysis, Accounting, Payroll, and Investment Strategy.",
  },
  {
    id: "cat-06",
    name: "HR",
    slug: "hr",
    jobCount: 18,
    description:
      "Talent Acquisition, People Operations, and Workplace Management.",
  },
];

export default function JobCategoriesManagement() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Form Fields
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Reset Form
  const resetForm = () => {
    setCategoryName("");
    setCategoryDescription("");
  };

  // Open Add Modal
  const handleOpenAdd = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setCategoryName(cat.name);
    setCategoryDescription(cat.description);
  };

  // Add Category Handler
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    const newCategory = {
      id: `cat-${Date.now()}`,
      name: categoryName,
      slug: categoryName.toLowerCase().replace(/\s+/g, "-"),
      jobCount: 0,
      description: categoryDescription || "No description provided.",
    };

    setCategories((prev) => [newCategory, ...prev]);
    showToast(`Category "${categoryName}" created successfully!`);
    setIsAddModalOpen(false);
    resetForm();
  };

  // Edit Category Handler
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingCategory || !categoryName.trim()) return;

    setCategories((prev) =>
      prev.map((c) =>
        c.id === editingCategory.id
          ? {
              ...c,
              name: categoryName,
              slug: categoryName.toLowerCase().replace(/\s+/g, "-"),
              description: categoryDescription,
            }
          : c
      )
    );

    showToast(`Category "${categoryName}" updated.`);
    setEditingCategory(null);
    resetForm();
  };

  // Delete Category Handler
  const handleDeleteCategory = (id, name) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showToast(`Category "${name}" deleted.`);
  };

  // Filter Categories
  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex-1 bg-[#0a0a0f] text-white p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Job Categories Management
          </h1>
          <p className="text-gray-400 text-sm pt-1">
            Organize, create, edit, or remove job sector classifications for candidate discovery.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="p-4 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
          {toastMessage}
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-[#14141f] border border-gray-800 rounded-2xl p-4 shadow-xl flex items-center justify-between gap-4">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-4 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search categories by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl text-xs outline-none"
          />
        </div>
      </div>

      {/* Categories Cards Grid */}
      {filteredCategories.length === 0 ? (
        <div className="p-12 text-center bg-[#14141f] border border-gray-800 rounded-2xl space-y-2">
          <Layers className="w-10 h-10 mx-auto text-gray-600 mb-2" />
          <p className="text-sm font-semibold text-white">No categories found.</p>
          <p className="text-xs text-gray-400">
            Try creating one or modifying your search query.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="bg-[#14141f] border border-gray-800 hover:border-purple-500/40 rounded-2xl p-5 shadow-xl transition-all flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="p-2.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl">
                    <Layers className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-1 bg-[#0a0a0f] border border-gray-800 text-gray-400 text-[11px] font-semibold rounded-lg">
                    {cat.jobCount} Active Jobs
                  </span>
                </div>

                <div>
                  <h2 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors">
                    {cat.name}
                  </h2>
                  <p className="text-gray-500 text-[11px] font-mono pt-0.5">
                    /{cat.slug}
                  </p>
                </div>

                <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-gray-800/80 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleOpenEdit(cat)}
                  title="Edit Category"
                  className="p-2 bg-[#0a0a0f] hover:bg-purple-500/10 border border-gray-800 hover:border-purple-500/30 text-gray-300 hover:text-purple-400 rounded-xl transition-all cursor-pointer"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleDeleteCategory(cat.id, cat.name)}
                  title="Delete Category"
                  className="p-2 bg-[#0a0a0f] hover:bg-rose-500/10 border border-gray-800 hover:border-rose-500/30 text-gray-400 hover:text-rose-400 rounded-xl transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================== */}
      {/* ADD CATEGORY MODAL                         */}
      {/* ========================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl w-full max-w-md p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <h2 className="text-base font-bold text-white">
                Add New Category
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCategory} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-gray-300 font-semibold block">
                  Category Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Software Development"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-300 font-semibold block">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Brief summary of jobs included in this category..."
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-[#0a0a0f] hover:bg-gray-800 border border-gray-800 text-gray-300 rounded-xl cursor-pointer font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-md cursor-pointer transition-all"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* EDIT CATEGORY MODAL                        */}
      {/* ========================================== */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14141f] border border-gray-800 rounded-2xl w-full max-w-md p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <h2 className="text-base font-bold text-white">Edit Category</h2>
              <button
                onClick={() => setEditingCategory(null)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-gray-300 font-semibold block">
                  Category Name
                </label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-300 font-semibold block">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0a0a0f] border border-gray-800 focus:border-purple-500 text-white rounded-xl outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="px-4 py-2 bg-[#0a0a0f] hover:bg-gray-800 border border-gray-800 text-gray-300 rounded-xl cursor-pointer font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-md cursor-pointer transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}







