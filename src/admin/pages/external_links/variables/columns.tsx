import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<any, any>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: (info) => <p className="text-sm font-bold">{info.getValue()}</p>,
  },
  {
    accessorKey: "icon",
    header: "Icon",
    cell: (info) => (
      <img
        src={info.getValue()}
        alt="icon"
        className="w-8 h-8 object-contain"
      />
    ),
  },
  {
    accessorKey: "url",
    header: "Url",
    cell: (info) => <span>{info.getValue()}</span>,
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: (info) => (
      <Link
        href={`/admin/external_link/edit/${info.getValue()}`}
        className="text-blue-500 text-sm hover:underline"
      >
        Chỉnh sửa
      </Link>
    ),
  },
];
