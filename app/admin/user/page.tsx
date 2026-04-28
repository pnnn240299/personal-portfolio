'use client'

import { useState } from "react";
import Link from "next/link";
import useDataCRUD from "@/lib/useDataCRUD";
import UserCard from "./components/UserCard";
import { HiPlus, HiSearch, HiFilter } from "react-icons/hi";

const UserList = () => {
  const { data: users, loading, error, fetchData } = useDataCRUD("users");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  // Mock data for demonstration
  const mockUsers = [
    {
      id: 1,
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      status: "active",
      createdAt: "2024-01-15",
      lastLogin: "2024-04-28"
    },
    {
      id: 2,
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
      status: "active",
      createdAt: "2024-02-20",
      lastLogin: "2024-04-27"
    },
    {
      id: 3,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "editor",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
      status: "inactive",
      createdAt: "2024-03-10",
      lastLogin: "2024-04-20"
    }
  ];

  const displayUsers = users && users.length > 0 ? users : mockUsers;

  // Filter users based on search and role
  const filteredUsers = displayUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  if (loading) return <p className="p-6">⏳ Đang tải...</p>;
  if (error) return <p className="p-6">❌ Lỗi: {error.message}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Quản lý Người dùng</h2>
          <Link
            href="/admin/user/create"
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-colors"
          >
            <HiPlus className="h-5 w-5" />
            Tạo Người dùng Mới
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm người dùng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="relative">
              <HiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option value="all">Tất cả vai trò</option>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
        </div>

        {/* User Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onUpdate={fetchData}
            />
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-500">Không tìm thấy người dùng nào.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
