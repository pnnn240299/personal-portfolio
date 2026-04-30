'use client'

import ProjectCard from "./components/ProjectCard";
import useDataCRUD from "@/lib/useDataCRUD";
import { ButtonLink } from "@/admin/components/buttons/ButtonLink";
import { HiPlus } from "react-icons/hi";

const Project = () => {
  const { data, loading, error } = useDataCRUD("projects");

  if (loading) return <p>⏳ Đang tải...</p>;
  if (error) return <p>❌ Lỗi: {error.message}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">List</h2>
        <ButtonLink href="/admin/project/create" variant="green">
          <HiPlus />
          Create
        </ButtonLink>
      </div>
      <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
        {data.map((item) => (
          <ProjectCard
            key={item.id}
            name={item?.name}
            description={item?.description}
            image={item?.image_url}
            technologies={item?.technologies || []}
            github={item?.repo_url}
            live={item?.live_url}
            slug={item?.slug}
            edit={`/admin/project/edit/${item?.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Project;