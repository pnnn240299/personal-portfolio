

import NewCard from "@/admin/pages/project/components/NewCard";
import { Link } from "react-router-dom";
import useDataCRUD from "../../../lib/useDataCRUD";
import projectModel from "@/models/supabaseQuery/project.js";
const Project = () => {

  const { data: projects, loading, error, fetchData } = useDataCRUD("projects", projectModel);
  console.log(projects);

  if (loading) return <p>⏳ Đang tải...</p>;
  if (error) return <p>❌ Lỗi: {error.message}</p>;
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Danh sach</h2>
        <Link
          to="/admin/project/create"
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
        >
          + Viết bài mới
        </Link>
      </div>
      <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
        {projects.map((data) => (
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
