'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useDataCRUD from "@/lib/useDataCRUD";
import Editor from "../components/Editor";

const BlogCreate = () => {
  const router = useRouter();
  const { createItem, loading, error, success } = useDataCRUD("blogs");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    description: "",
    thumbnail_url: "",
    slug: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    // Validate required fields
    if (!formData.title.trim()) {
      alert("Tiêu đề không được để trống!");
      return;
    }
    
    if (!formData.content.trim()) {
      alert("Nội dung không được để trống!");
      return;
    }

    // Generate slug from title if not provided
    const slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    const blogData = {
      title: formData.title.trim(),
      slug: slug,
      content: formData.content.trim(),
      description: formData.description.trim(),
      thumbnail_url: formData.thumbnail_url.trim(),
    };
    
    console.log("Sending blog data:", blogData);
    
    try {
      await createItem(blogData);
      if (success) {
        router.push("/admin/blog");
      }
    } catch (error) {
      console.error("Create blog error:", error);
      alert(`Lỗi khi tạo bài viết: ${error.message || error.toString()}`);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Viết bài mới !</h2>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        <label className="block text-sm font-medium text-gray-700">Slug (URL thân thiện)</label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="blog-title"
        />
        <p className="text-xs text-gray-500 mb-4">Để trống để tự động tạo từ tiêu đề</p>

        <label className="block text-sm font-medium text-gray-700">Mô tả ngắn</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        <label className="block text-sm font-medium text-gray-700">Ảnh đại diện</label>
        <input
          type="text"
          name="thumbnail_url"
          value={formData.thumbnail_url}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="URL hình ảnh"
        />

        <label className="block text-sm font-medium text-gray-700">Nội dung bài viết</label>
        <Editor value={formData.content} onChange={(value) => setFormData({ ...formData, content: value })} />

        <button
          onClick={handleSave}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Đang lưu..." : "Lưu bài viết"}
        </button>
      </div>
    </div>
  );
};

export default BlogCreate;
