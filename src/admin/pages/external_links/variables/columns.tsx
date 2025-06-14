import { generateColumns } from "@/admin/components/table/generateColumns";
import { GetExternalLinks } from "@/types/external_links";
import { Link } from "react-router-dom";

const columnConfig = [
  {
    accessor: "title",
    header: "Title",
    cell: (data: any) => <p className="text-sm font-bold">{data.getValue()}</p>,
  },
  {
    accessor: "icon",
    header: "Icon",
    cell: (data: any) => (
      <img
        src={data.getValue()}
        alt="icon"
        className="w-8 h-8 object-contain"
      />
    ),
  },
  {
    accessor: "url",
    header: "Url",
    cell: (data: any) => <span>{data.getValue()}</span>,
  },
  {
    accessor: "id",
    header: "Action",
    cell: (data: any) => <span>
      <Link
        to={`/admin/external_link/edit/${data.getValue()}`}
        className="text-blue-500 text-sm hover:underline"
      >
        Chỉnh sửa
      </Link>
    </span>,
  },
];

export const columns = generateColumns<GetExternalLinks>({
  columns: columnConfig
});
