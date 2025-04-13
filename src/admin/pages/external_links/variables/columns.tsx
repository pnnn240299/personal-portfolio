import { generateColumns } from "@/admin/components/table/generateColumns";
import { GetExternalLinks } from "@/types/external_links";

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
    header: "Action",
    isAction: true,
  },
];

export const columns = generateColumns<GetExternalLinks>({
  columns: columnConfig
});
