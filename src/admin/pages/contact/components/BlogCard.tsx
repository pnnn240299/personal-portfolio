import Link from "next/link";
import Image from 'next/image';

const BlogCard = ({ blog }: { blog: any }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <Image src={blog.image} alt={blog.title} width={320} height={160} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{blog.title}</h3>
        <p className="text-gray-600 text-sm mt-1">{blog.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-gray-500 text-xs">{blog.createdAt}</span>
          <Link
            href={`/admin/blog/edit/${blog.id}`}
            className="text-blue-500 text-sm hover:underline"
          >
            Chỉnh sửa
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
