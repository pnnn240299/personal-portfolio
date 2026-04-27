import DefaultTable from "../../../src/admin/components/table/DefaultTable";
import { columns } from "../../../src/admin/pages/external_links/variables/columns";
import Link from "next/link";
import useDataCRUD from "../../../src/lib/useDataCRUD";
import { GetExternalLinks } from "../../../src/types/external_links";

export default function ExternalLinksManager() {
  const { data, loading, error, fetchData } = useDataCRUD<GetExternalLinks>("external_links");

  if (loading) return <p className="p-6">⏳ Đang tải...</p>;
  if (error) return <p className="p-6 text-red-500">❌ Lỗi: {error.message}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quản lý External Links</h2>
        <Link
          href="/admin/external_link/create"
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
        >
          + Tạo mới
        </Link>
      </div>

      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
        <DefaultTable
          data={data}
          columns={columns}
          title="External Links"
        />
      </div>
    </div>
  );
}