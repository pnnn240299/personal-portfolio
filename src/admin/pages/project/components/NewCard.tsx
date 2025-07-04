import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useState } from "react";
import Card from "@/admin/components/card";
import { Link } from "react-router-dom";

const NewCard = (props: {
  image: string;
  name: string;
  description: string;
  technologies: { title: string; icon: string; url: string }[];
  demoLink?: string;
  edit?: string;
  extra?: string;
}) => {
  const { name, image, description, technologies, demoLink, edit, extra } = props;
  const [heart, setHeart] = useState(false);

  return (
    <Card
      extra={`flex flex-col w-full h-full rounded-lg shadow-md overflow-hidden border border-gray-200 bg-white ${extra}`}
    >
      {/* Hình ảnh */}
      <div className="relative w-full">
        <img
          src={image}
          className="w-full h-48 object-cover rounded-t-lg"
          alt={name}
        />
        {/* Nút Yêu thích */}
        <button
          onClick={() => setHeart(!heart)}
          className="absolute right-3 top-3 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer shadow-md transition hover:bg-gray-100"
        >
          {heart ? (
            <IoHeart className="text-red-500 transition-transform duration-200 scale-110" />
          ) : (
            <IoHeartOutline className="text-gray-600 transition-transform duration-200 hover:scale-110" />
          )}
        </button>
      </div>

      {/* Nội dung */}
      <div className="p-4 space-y-3">
        {/* Tiêu đề */}
        <div>
          <p className="text-lg font-bold text-gray-900">Tên dự án:</p>
          <p className="mt-1 text-sm font-medium text-gray-600">{name}</p>
        </div>

        {/* Mô tả ngắn */}
        <div>
          <p className="text-sm font-bold text-gray-900">Mô tả:</p>
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        </div>

        {/* Công nghệ sử dụng */}
        <>
          <p className="text-sm font-bold text-brand-500">Công nghệ sử dụng:</p>
          {Array.isArray(technologies) && technologies.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-3">
              {technologies.map((tech, key) => (
                <a
                  key={key}
                  href={tech?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-md shadow-sm transition-transform transform hover:scale-110"
                >
                  <img src={tech?.icon} alt={tech?.title} className="w-8 h-8" />
                </a>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm italic">Chưa có thông tin công nghệ.</p>
          )}
        </>

        {/* Link demo (Button) - Căn phải */}
        {demoLink && (
          <div className="mt-3 flex justify-end">
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-white bg-blue-500 rounded-md shadow-md transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Xem Demo
            </a>
          </div>
        )}
        <div className="flex justify-between items-center mt-4">
          <Link
            to={edit}
            className="text-blue-500 text-sm hover:underline"
          >
            Chỉnh sửa
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default NewCard;
