import Link from "next/link";
import BlogCard from "./components/BlogCard";
import useDataCRUD from "../../../lib/useDataCRUD";

const BlogList = () => {

  const { data: blogs, loading, error, fetchData } = useDataCRUD("blogs");
  if (loading) return <p>⏳ Đang tải...</p>;
  if (error) return <p>❌ Lỗi: {error.message}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quản lý Bài viết</h2>
        <Link
          href="/admin/blog/create"
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
        >
          + Viết bài mới
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            createdAt={blog.createdAt}
            id={blog.id}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
