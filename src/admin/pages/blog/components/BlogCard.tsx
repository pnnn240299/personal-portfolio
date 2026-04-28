import Link from "next/link";
import Image from 'next/image';

const BlogCard = ({ 
  title, 
  description, 
  image, 
  createdAt, 
  id 
}: { 
  title: any;
  description: any;
  image: any;
  createdAt: any;
  id: any;
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <Image src={image} alt={title} width={320} height={160} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-gray-500 text-xs">{createdAt}</span>
          <Link
            href={`/admin/blog/edit/${id}`}
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
