'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import slugify from 'slugify';
import { HiArrowLeft, HiSave, HiDocumentText, HiGlobe, HiCode, HiLink, HiUpload, HiX } from "react-icons/hi";

interface ProjectFormData {
  name: string;
  description: string;
  longDescription: string;
  image_url: string;
  image_media_id?: number;
  image_file?: File;
  live_url: string;
  repo_url: string;
  slug: string;
  selectedTechnologies: (string | number)[];
  status: string;
}

interface ProjectFormProps {
  initialData?: Partial<ProjectFormData>;
  onSubmit: (data: ProjectFormData) => Promise<void>;
  loading?: boolean;
  error?: string;
  success?: string;
  submitText?: string;
  cancelHref?: string;
  title?: string;
  mode?: 'create' | 'edit';
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  initialData = {},
  onSubmit,
  loading = false,
  error,
  success,
  submitText = "Tạo dự án",
  cancelHref = "/admin/project",
  title = "Tạo Dự án Mới",
  mode = 'create'
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState<ProjectFormData>({
    name: "",
    description: "",
    longDescription: "",
    image_url: "",
    live_url: "",
    repo_url: "",
    slug: "",
    selectedTechnologies: [],
    status: "draft",
    ...initialData
  });

  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  // Fetch external links for technologies selection
  const [externalLinks, setExternalLinks] = useState([]);
  const [loadingLinks, setLoadingLinks] = useState(false);

  useEffect(() => {
    const fetchExternalLinks = async () => {
      try {
        setLoadingLinks(true);
        const response = await fetch('/api/external_links');
        const links = await response.json();
        setExternalLinks(links);
      } catch (error) {
        console.error('Error fetching external links:', error);
      } finally {
        setLoadingLinks(false);
      }
    };
    
    fetchExternalLinks();
  }, []); // Only run once on mount

  // Set initial image preview when editing
  useEffect(() => {
    if (initialData?.image_url) {
      setImagePreview(initialData.image_url);
    }
  }, [initialData?.image_url]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-generate slug from name if slug is empty
    if (name === 'name' && !formData.slug) {
      const generatedSlug = slugify(value, {
        lower: true,
        strict: true,
        trim: true
      });
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setValidationErrors(prev => ({ ...prev, image_url: 'Vui lòng chọn file hình ảnh' }));
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setValidationErrors(prev => ({ ...prev, image_url: 'Kích thước file không được vượt quá 5MB' }));
      return;
    }

    setUploadingImage(true);
    setValidationErrors(prev => ({ ...prev, image_url: "" }));

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      
      // Set the uploaded image URL and media ID
      setFormData(prev => ({ 
        ...prev, 
        image_url: result.url,
        image_media_id: result.mediaId 
      }));
      setImagePreview(result.url);
    } catch (error) {
      console.error('Upload error:', error);
      setValidationErrors(prev => ({ ...prev, image_url: 'Upload hình ảnh thất bại' }));
    } finally {
      setUploadingImage(false);
    }
  };

  // Create preview for selected file
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      handleImageUpload(e);
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

    // Validate image upload
    if (mode === 'create' && !formData.image_url?.trim() && !imagePreview) {
      errors.image_url = "Vui lòng upload hình ảnh";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    await onSubmit(formData);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <a
            href={cancelHref}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <HiArrowLeft className="h-5 w-5" />
            Quay lại
          </a>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
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
                  <HiUpload className="inline h-4 w-4 mr-1" />
                  Upload hình ảnh {mode === 'create' && '*'}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    validationErrors.image_url ? "border-red-500" : "border-gray-300"
                  }`}
                  disabled={uploadingImage}
                />
                {uploadingImage && (
                  <p className="mt-1 text-sm text-blue-600">Đang upload hình ảnh...</p>
                )}
                {validationErrors.image_url && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.image_url}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">Chấp nhận các định dạng: JPG, PNG, GIF, WebP (Tối đa 5MB)</p>
                
                {/* Image Preview */}
                {(imagePreview || formData.image_url) && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Preview:</p>
                    <img
                      src={imagePreview || formData.image_url}
                      alt="Project preview"
                      className="w-32 h-32 object-cover rounded-md border border-gray-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
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
                URL Repository
              </label>
              <input
                type="url"
                name="repo_url"
                value={formData.repo_url}
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
              {loadingLinks ? (
                <p className="text-gray-500 text-sm">Đang tải danh sách công nghệ...</p>
              ) : (
                <div className="space-y-2">
                  {externalLinks.map((link: any) => (
                    <label key={link.id} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.selectedTechnologies?.includes(link.id)}
                        onChange={(e) => {
                          const currentTechs = formData.selectedTechnologies || [];
                          if (e.target.checked) {
                            setFormData(prev => ({
                              ...prev,
                              selectedTechnologies: [...currentTechs, link.id]
                            }));
                          } else {
                            setFormData(prev => ({
                              ...prev,
                              selectedTechnologies: currentTechs.filter(techId => techId !== link.id)
                            }));
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{link.title}</span>
                      {link.icon && (
                        <img src={link.icon} alt={link.title} className="w-4 h-4" />
                      )}
                    </label>
                  ))}
                </div>
              )}
              <p className="mt-1 text-xs text-gray-500">Chọn các công nghệ đã được thêm vào hệ thống</p>
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
              <a
                href={cancelHref}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                <HiArrowLeft className="h-4 w-4" />
                Hủy
              </a>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <HiSave className="h-4 w-4" />
                {loading ? "Đang lưu..." : submitText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
