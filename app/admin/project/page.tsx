'use client'

import NewCard from "@/admin/pages/project/components/NewCard";
import Link from "next/link";
import useDataCRUD from "@/lib/useDataCRUD";
import projectModel from "@/models/supabaseQuery/project.js";
import { GetProjects } from "@/types/projects";
import { ButtonLink } from "@/admin/components/buttons/ButtonLink";
import { HiPlus } from "react-icons/hi";

const Project = () => {
  const { data, loading, error, fetchData } = useDataCRUD("projects");

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
          <NewCard
            key={item.id}
            name={item?.name}
            description={item?.description}
            image={item?.image}
            technologies={item?.technologies}
            github={item?.github}
            live={item?.live}
            slug={item?.slug}
            edit={`/admin/project/edit/${item?.slug}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Project;