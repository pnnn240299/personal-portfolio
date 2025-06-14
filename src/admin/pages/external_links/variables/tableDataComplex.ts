import useDataCRUD from "../../../../lib/useDataCRUD";

const { data: fetchLinks, loading, error, fetchData } = useDataCRUD("external_links");

if (loading) return <p>⏳ Đang tải...</p>;
if (error) return <p>❌ Lỗi: {error.message}</p>;


const columns: ColumnDef<ExternalLink, any>[] = [
	columnHelper.accessor("name", {
		header: "Name",
		cell: (info) => <p className="text-sm font-bold"> { info.getValue() } < /p>,
	}),
	columnHelper.accessor("tech", {
		header: "Tech",
		cell: (info) => (
			<div className= "flex gap-2 text-xl" >
			{
				info.getValue().map((item, idx) => {
					if (item === "apple") return <DiApple key={ idx } />;
					if (item === "android") return <DiAndroid key={ idx } />;
					if (item === "windows") return <DiWindows key={ idx } />;
					return null;
				})
			}
			< /div>
    ),
  }),
columnHelper.accessor("progress", {
	header: "Progress",
	cell: (info) => `${info.getValue()}%`,
}),
	columnHelper.accessor("date", {
		header: "Date",
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor("status", {
		header: "Status",
		cell: (info) => {
			const value = info.getValue();
			const Icon =
				value === "Approved"
					? MdCheckCircleOutline
					: value === "Disable"
						? MdCancel
						: value === "Error"
							? MdOutlineError
							: null;
			return (
				<div className= "flex items-center gap-1" >
				{ Icon && <Icon className="text-lg" />}
          < span > { value } < /span>
		< /div>
	);
    },
  }),
];

type RowObj = {
	name: string;
	tech: string[];
	date: string;
	status: string;
	progress: number;
};

const { data: fetchLinks, loading, error, fetchData } = useDataCRUD("external_links");

const tableDataComplex: RowObj[] = fetchLinks;

export default tableDataComplex;

