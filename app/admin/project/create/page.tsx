'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HiArrowLeft, HiSave, HiDocumentText, HiGlobe, HiCode, HiLink, HiUpload, HiX } from "react-icons/hi";
import useDataCRUD from "@/lib/useDataCRUD";
import restApiProvider from "@/providers/restApiProvider";

const ProjectCreate = () => {
  const router = useRouter();
  const { createItem, loading, error, success } = useDataCRUD("projects");
  const provider = restApiProvider("projects");

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
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    longDescription: "",
    image_url: "",
    live_url: "",
    github_url: "",
    slug: "",
    selectedTechnologies: [], // Change from string to array
    status: "active",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [uploadedMedia, setUploadedMedia] = useState<any>(null);

  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setValidationErrors(prev => ({ ...prev, image: 'Chỉ chấp nhận file ảnh (JPEG, PNG, GIF, WebP)' }));
        return;
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setValidationErrors(prev => ({ ...prev, image: 'File quá lớn. Tối đa 5MB' }));
        return;
      }

      setSelectedFile(file);
      setValidationErrors(prev => ({ ...prev, image: '' }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImagePreview("");
    setUploadedMedia(null);
    setFormData(prev => ({ ...prev, image_url: "" }));
    if (validationErrors.image) {
      setValidationErrors(prev => ({ ...prev, image: '' }));
    }
  };

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

    if (!selectedFile && !uploadedMedia && !formData.image_url.trim()) {
      errors.image = "Vui lòng chọn hình ảnh";
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
      let imageUrl = formData.image_url;
      let mediaId = null;
      
      // Upload image if file is selected
      if (selectedFile && !uploadedMedia) {
        setUploading(true);
        try {
          const uploadResult = await provider.uploadFile(selectedFile);
          imageUrl = uploadResult.url;
          mediaId = uploadResult.mediaId;
          setUploadedMedia(uploadResult);
        } catch (uploadError) {
          console.error("Error uploading image:", uploadError);
          setValidationErrors({ image: "Không thể tải lên hình ảnh" });
          setUploading(false);
          return;
        }
        setUploading(false);
      } else if (uploadedMedia) {
        imageUrl = uploadedMedia.url;
        mediaId = uploadedMedia.mediaId;
      }

      // Process form data - field mapping is handled by the provider
      const processedData = {
        name: formData.name,
        description: formData.description,
        longDescription: formData.longDescription,
        image_url: imageUrl,
        live_url: formData.live_url,
        github_url: formData.github_url, // Provider will map to repo_url
        selectedTechnologies: formData.selectedTechnologies, // Will be converted to skill string
        slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        status: formData.status,
        media_id: mediaId,
      };

      const createdProject = await createItem(processedData);
      
      // Create media relation if media was uploaded
      if (mediaId && createdProject?.id) {
        try {
          await fetch('/api/media-relations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              media_id: mediaId,
              entity_id: createdProject.id,
              entity_type: 'project',
              type: 'thumbnail',
              sort_order: 0
            })
          });
        } catch (error) {
          console.error("Error creating media relation:", error);
        }
      }
      
      // Show success and redirect
      console.log("Project created successfully, redirecting...");
      
      // Show success message briefly before redirect
      const successDiv = document.createElement('div');
      successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-300';
      successDiv.textContent = 'Dự án đã được tạo thành công!';
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
        router.push("/admin/project");
      }, 1500);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

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
          <h1 className="text-2xl font-bold text-gray-900">Tạo Dự án Mới</h1>
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
                  Hình ảnh dự án *
                </label>
                
                {/* Image Preview */}
                {(imagePreview || formData.image_url) && (
                  <div className="mb-3 relative">
                    <img 
                      src={imagePreview || formData.image_url || undefined} 
                      alt="Preview" 
                      className="h-32 w-32 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <HiX className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {/* File Input */}
                <div className="flex items-center gap-3">
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      disabled={uploading}
                    />
                    <div className={`px-4 py-2 border-2 border-dashed rounded-md text-center transition-colors ${
                      validationErrors.image ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                    } ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}>
                      {uploading ? (
                        <span className="text-gray-500">Đang tải lên...</span>
                      ) : (
                        <span className="text-gray-600">
                          {selectedFile ? selectedFile.name : "Chọn file ảnh"}
                        </span>
                      )}
                    </div>
                  </label>
                </div>
                
                {validationErrors.image && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.image}</p>
                )}
                
                <p className="mt-1 text-xs text-gray-500">
                  Chấp nhận: JPEG, PNG, GIF, WebP. Tối đa: 5MB
                </p>
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
                          if (e.target.checked) {
                            setFormData(prev => ({
                              ...prev,
                              selectedTechnologies: [...prev.selectedTechnologies, link.id]
                            }));
                          } else {
                            setFormData(prev => ({
                              ...prev,
                              selectedTechnologies: prev.selectedTechnologies.filter(id => id !== link.id)
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
              <Link
                href="/admin/project"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                <HiArrowLeft className="h-4 w-4" />
                Hủy
              </Link>
              <button
                type="submit"
                disabled={loading || uploading}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <HiSave className="h-4 w-4" />
                {loading || uploading ? "Đang xử lý..." : "Tạo Dự án"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectCreate;
