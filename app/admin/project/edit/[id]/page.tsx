'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HiArrowLeft, HiSave, HiDocumentText, HiGlobe, HiCode, HiLink } from "react-icons/hi";
import useDataCRUD from "@/lib/useDataCRUD";

const ProjectEdit = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { updateItem, getItem, loading, error, success } = useDataCRUD("projects");
  const id = params.id;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    longDescription: "",
    image_url: "",
    live_url: "",
    github_url: "",
    slug: "",
    technologies: "",
    status: "active",
  });

  const [originalData, setOriginalData] = useState({
    name: "",
    description: "",
    longDescription: "",
    image_url: "",
    live_url: "",
    github_url: "",
    slug: "",
    technologies: "",
    status: "active",
  });

  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getItem(id);
        if (data) {
          const processedData = {
            ...data,
            technologies: Array.isArray(data.technologies) ? data.technologies.join(', ') : '',
          };
          setFormData(processedData);
          setOriginalData(processedData);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id, getItem]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      errors.name = "Tên dự án không được để trống";
    }

    if (!formData.description.trim()) {
      errors.description = "Mô tả không được để trống";
    }

    if (!formData.image_url.trim()) {
      errors.image_url = "URL hình ảnh không được để trống";
    } else if (!/^https?:\/\/.+/.test(formData.image_url)) {
      errors.image_url = "URL hình ảnh không hợp lệ";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      // Process technologies string into array
      const processedData = {
        ...formData,
        technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech),
        slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      };

      await updateItem(id, processedData);
      
      if (success) {
        router.push("/admin/project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const hasChanges = () => {
    return JSON.stringify(formData) !== JSON.stringify(originalData);
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-8">
            <p className="text-gray-500">Đang tải thông tin dự án...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/admin/project"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <HiArrowLeft className="h-5 w-5" />
            Quay lại
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Chỉnh sửa Dự án</h1>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-700">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <HiDocumentText className="inline h-4 w-4 mr-1" />
                  Tên dự án *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    validationErrors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Nhập tên dự án"
                />
                {validationErrors.name && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug (URL thân thiện)
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="project-name"
                />
                <p className="mt-1 text-xs text-gray-500">Để trống để tự động tạo từ tên dự án</p>
              </div>
            </div>

            {/* Descriptions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <HiDocumentText className="inline h-4 w-4 mr-1" />
                Mô tả ngắn *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  validationErrors.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Mô tả ngắn về dự án"
              />
              {validationErrors.description && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.description}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả chi tiết
              </label>
              <textarea
                name="longDescription"
                value={formData.longDescription}
                onChange={handleChange}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Mô tả chi tiết về dự án, tính năng, công nghệ sử dụng..."
              />
            </div>

            {/* URLs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL hình ảnh *
                </label>
                <input
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    validationErrors.image_url ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="https://example.com/image.jpg"
                />
                {validationErrors.image_url && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.image_url}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <HiGlobe className="inline h-4 w-4 mr-1" />
                  URL Live Demo
                </label>
                <input
                  type="url"
                  name="live_url"
                  value={formData.live_url}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <HiCode className="inline h-4 w-4 mr-1" />
                URL GitHub
              </label>
              <input
                type="url"
                name="github_url"
                value={formData.github_url}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://github.com/username/repo"
              />
            </div>

            {/* Technologies */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <HiCode className="inline h-4 w-4 mr-1" />
                Công nghệ sử dụng
              </label>
              <input
                type="text"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="React, Next.js, TypeScript, Tailwind CSS"
              />
              <p className="mt-1 text-xs text-gray-500">Phân tách bằng dấu phẩy</p>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trạng thái
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="active">Hoạt động</option>
                <option value="inactive">Không hoạt động</option>
                <option value="maintenance">Bảo trì</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Link
                href="/admin/project"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                <HiArrowLeft className="h-4 w-4" />
                Hủy
              </Link>
              <button
                type="submit"
                disabled={loading || !hasChanges()}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <HiSave className="h-4 w-4" />
                {loading ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectEdit;
