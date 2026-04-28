import tableDataDevelopment from "@/admin/pages/tables/variables/tableDataDevelopment";
import DefaultTable from "@/admin/components/table/DefaultTable";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

const ContactList = () => {
  const contacts = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ];

  const columns: ColumnDef<any, any>[] = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quản lý Contact</h2>
        <Link
          href="/admin/contact/create"
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
        >
          + Tạo Contact Mới
        </Link>
      </div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
        <DefaultTable data={contacts} columns={columns} title="Contact List" />
      </div>
    </div>
  );
};

export default ContactList;