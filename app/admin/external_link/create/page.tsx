'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HiArrowLeft, HiSave } from "react-icons/hi";
import useDataCRUD from "@/lib/useDataCRUD";

const ExternalLinkCreate = () => {
  const router = useRouter();
  const { createItem, loading, error, success } = useDataCRUD("external_links");

  const [formData, setFormData] = useState({
    title: "",
    icon: "",
    url: "",
  });

  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      errors.title = "Tiêu đề không được để trống";
    }

    if (!formData.url.trim()) {
      errors.url = "URL không được để trống";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await createItem(formData);
      
      // Show success message
      const successDiv = document.createElement('div');
      successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-300';
      successDiv.textContent = 'External link đã được tạo thành công!';
      document.body.appendChild(successDiv);
      
      // Auto-remove success notification after 3 seconds
      setTimeout(() => {
        successDiv.style.opacity = '0';
        setTimeout(() => {
          if (document.body.contains(successDiv)) {
            document.body.removeChild(successDiv);
          }
        }, 300); // Wait for fade out animation
      }, 3000);
      
      // Redirect after showing success message
      setTimeout(() => {
        router.push("/admin/external_link");
      }, 1500);
    } catch (error) {
      console.error("Error creating external link:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/admin/external_link"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <HiArrowLeft className="h-5 w-5" />
            Quay lại
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Tạo External Link Mới</h1>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tiêu đề *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  validationErrors.title ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Nhập tiêu đề external link"
              />
              {validationErrors.title && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.title}</p>
              )}
            </div>

            {/* Icon */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icon URL
              </label>
              <input
                type="text"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="URL icon (tùy chọn)"
              />
              <p className="mt-1 text-xs text-gray-500">URL của icon hình ảnh (VD: /icons/react.svg)</p>
            </div>

            {/* URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL *
              </label>
              <input
                type="text"
                name="url"
                value={formData.url}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  validationErrors.url ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Nhập URL link"
              />
              {validationErrors.url && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.url}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Link
                href="/admin/external_link"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                <HiArrowLeft className="h-4 w-4" />
                Hủy
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <HiSave className="h-4 w-4" />
                {loading ? "Đang xử lý..." : "Tạo External Link"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExternalLinkCreate;
