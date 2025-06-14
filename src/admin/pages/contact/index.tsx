import tableDataDevelopment from "../tables/variables/tableDataDevelopment";
import DevelopmentTable from "../../components/table/DefaultTable";
import { Link } from "react-router-dom";

const ContactList = () => {
  const contacts = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quản lý Bài viết</h2>
        <Link
          to="/admin/blog/create"
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
        >
          + Viết bài mới
        </Link>
      </div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
        <DevelopmentTable tableData={tableDataDevelopment} />
      </div>
    </div>
  );
};

export default ContactList;
