import { useState } from "react";
import { Link } from "react-router-dom";
import BlogCard from "./components/BlogCard";

const mockBlogs = [
  {
    id: 1,
    title: "Cách tối ưu Laravel cho dự án lớn",
    description: "Hướng dẫn chi tiết về caching, query optimization...",
    image: "/images/blog-laravel.jpg",
    createdAt: "2024-03-10",
  },
  {
    id: 2,
    title: "ReactJS & TailwindCSS – Hướng dẫn từ A-Z",
    description: "Cách kết hợp React và Tailwind để tạo UI chuyên nghiệp.",
    image: "/images/blog-react.jpg",
    createdAt: "2024-03-12",
  },
];

const BlogList = () => {
  const [blogs] = useState(mockBlogs);

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
