import { useState } from "react";
import { Link } from "react-router-dom";
import BlogCard from "./components/BlogCard";
import avatar1 from "@/admin/assets/img/avatars/avatar1.png";
import avatar2 from "@/admin/assets/img/avatars/avatar2.png";
import avatar3 from "@/admin/assets/img/avatars/avatar3.png";
import useDataCRUD from "../../../lib/useDataCRUD";

const mockData = [
  {
    id: 1,
    title: "Cách tối ưu Laravel cho dự án lớn",
    description: "Hướng dẫn chi tiết về caching, query optimization...",
    image: avatar1,
    createdAt: "2024-03-10",
  },
  {
    id: 2,
    title: "ReactJS & TailwindCSS – Hướng dẫn từ A-Z",
    description: "Cách kết hợp React và Tailwind để tạo UI chuyên nghiệp.",
    image: avatar2,
    createdAt: "2024-03-12",
  },
  {
    id: 3,
    title: "ReactJS & TailwindCSS – Hướng dẫn từ A-Z",
    description: "Cách kết hợp React và Tailwind để tạo UI chuyên nghiệp.",
    image: avatar3,
    createdAt: "2024-03-12",
  },
  {
    id: 1,
    title: "Cách tối ưu Laravel cho dự án lớn",
    description: "Hướng dẫn chi tiết về caching, query optimization...",
    image: avatar1,
    createdAt: "2024-03-10",
  },
  {
    id: 2,
    title: "ReactJS & TailwindCSS – Hướng dẫn từ A-Z",
    description: "Cách kết hợp React và Tailwind để tạo UI chuyên nghiệp.",
    image: avatar2,
    createdAt: "2024-03-12",
  },
  {
    id: 3,
    title: "ReactJS & TailwindCSS – Hướng dẫn từ A-Z",
    description: "Cách kết hợp React và Tailwind để tạo UI chuyên nghiệp.",
    image: avatar3,
    createdAt: "2024-03-12",
  },
];

const BlogList = () => {

  const { data: blogs, loading, error, fetchData } = useDataCRUD("blogs");
  if (loading) return <p>⏳ Đang tải...</p>;
  if (error) return <p>❌ Lỗi: {error.message}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quản lý Bài viết</h2>
        <Link
          to="/admin/blog/create"
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
        >
          + Viết bài mới
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
