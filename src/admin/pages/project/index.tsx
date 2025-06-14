

import NewCard from "@/admin/pages/project/components/NewCard";
import { Link } from "react-router-dom";
import useDataCRUD from "../../../lib/useDataCRUD";
import projectModel from "@/models/supabaseQuery/project.js";
import { GetProjects } from "@/types/projects";
import CreateLinkButton from "@/admin/components/buttons/CreateLinkButton";
import { ButtonLink } from "@/admin/components/buttons/ButtonLink";
import { HiPlus } from "react-icons/hi";
const Project = () => {

  const { data, loading, error, fetchData } = useDataCRUD<GetProjects>("projects", projectModel);

  if (loading) return <p>⏳ Đang tải...</p>;
  if (error) return <p>❌ Lỗi: {error.message}</p>;
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">List</h2>
        <ButtonLink to="/admin/project/create" variant="green">
          <HiPlus />
          Create
        </ButtonLink>
      </div>
      <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
        {data.map((data) => (
          <NewCard
            name={data?.name}
            description={data?.description}
            demoLink={data?.live_url}
            image={data?.image_url}
            technologies={data?.external_links}
            edit={`/admin/project/edit/${data?.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Project;
