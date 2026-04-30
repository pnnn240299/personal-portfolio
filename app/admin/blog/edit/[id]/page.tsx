'use client'

import { useState, useEffect, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useDataCRUD from "@/lib/useDataCRUD";
import Editor from "../../components/Editor";

const BlogEdit = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const { updateItem, getItem, loading, error, success } = useDataCRUD("blogs");
  const id = use(params).id;

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    description: "",
    thumbnail_url: "",
    slug: "",
  });
  
  useEffect(() => {
    if (id) {
      (async () => {
        const data = await getItem(id);
        if (data) setFormData(data);
      })();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await updateItem(id, formData);
    if (success) {
      router.push("/admin/blog");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Chỉnh sửa bài viết</h2>

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
          placeholder="Upload hình ảnh"
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

export default BlogEdit;
