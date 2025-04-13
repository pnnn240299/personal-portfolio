import DefaultTable from "../../components/table/DefaultTable";
import { columns } from "./variables/columns";
import useDataCRUD from "../../../lib/useDataCRUD";
import { Link } from "react-router-dom";

export default function ExternalLinksManager() {
  const { data, loading, error } = useDataCRUD("external_links");

  if (loading) return <p>⏳ Đang tải...</p>;
  if (error) return <p>❌ Lỗi: {error.message}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quản lý External Links</h2>
        <Link
          to="#"
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
        >
          + Tạo mới
        </Link>
      </div>

      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
        <DefaultTable data={data} columns={columns} title="External Links" />
      </div>
    </div>
  );
}
