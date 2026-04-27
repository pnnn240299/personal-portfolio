import NewCard from "../../../src/admin/pages/project/components/NewCard";
import Link from "next/link";
import useDataCRUD from "../../../src/lib/useDataCRUD";
import projectModel from "../../../src/models/supabaseQuery/project.js";
import { GetProjects } from "../../../src/types/projects";
import CreateLinkButton from "../../../src/admin/components/buttons/CreateLinkButton";
import { ButtonLink } from "../../../src/admin/components/buttons/ButtonLink";
import { HiPlus } from "react-icons/hi";

const Project = () => {
  const { data, loading, error, fetchData } = useDataCRUD<GetProjects>("projects", projectModel);

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
        {data.map((data) => (
          <NewCard
            key={data.id}
            name={data?.name}
            description={data?.description}
            image={data?.image}
            technologies={data?.technologies}
            github={data?.github}
            live={data?.live}
            slug={data?.slug}
          />
        ))}
      </div>
    </div>
  );
};

export default Project;