'use client'

import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useState } from "react";
import Card from "@/admin/components/card";
import Link from "next/link";
import Image from "next/image";

const NewCard = (props: {
  image: any;
  name: string;
  description: string;
  technologies: string[]; // Changed from array of objects to array of strings
  github?: string;
  live?: string;
  slug?: string;
  demoLink?: string;
  edit?: string;
  extra?: string;
}) => {
  const { name, image, description, technologies, github, live, slug, demoLink, edit, extra } = props;
  const [heart, setHeart] = useState(false);

  return (
    <Card
      extra={`flex flex-col w-full h-full rounded-lg shadow-md overflow-hidden border border-gray-200 bg-white ${extra}`}
    >
      {/* Hình ảnh */}
      <div className="relative w-full">
        <Image
          src={image}
          className="w-full h-48 object-cover rounded-t-lg"
          alt={name}
          width={400}
          height={192}
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
            <div className="mt-2 flex flex-wrap gap-2">
              {technologies.map((tech, key) => (
                <span
                  key={key}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm italic">Chưa có thông tin công nghệ.</p>
          )}
        </>

        {/* Links */}
        <div className="flex gap-2 pt-2">
          {github && (
            <Link
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-gray-800 text-white text-sm rounded hover:bg-gray-700 transition"
            >
              GitHub
            </Link>
          )}
          {live && (
            <Link
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
            >
              Live Demo
            </Link>
          )}
          {edit && (
            <Link
              href={edit}
              className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition"
            >
              Chỉnh sửa
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
};

export default NewCard;
