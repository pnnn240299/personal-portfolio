import React from "react";
import { Link } from "react-router-dom";

const ContactList = () => {
  // Mock dữ liệu contact
  const contacts = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ];

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h1 className="text-xl font-bold mb-4">Contact Management</h1>
      <Link to="/admin/contacts/create" className="bg-blue-500 text-white px-4 py-2 rounded">
        + Add Contact
      </Link>
      <table className="w-full mt-4 border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id} className="border">
              <td className="p-2">{contact.id}</td>
              <td className="p-2">{contact.name}</td>
              <td className="p-2">{contact.email}</td>
              <td className="p-2">
                <Link to={`/admin/contacts/edit/${contact.id}`} className="text-blue-500 mr-2">Edit</Link>
                <button className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
