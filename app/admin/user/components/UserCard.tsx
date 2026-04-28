'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiPencil, HiTrash, HiMail, HiCalendar, HiShieldCheck, HiXCircle } from "react-icons/hi";

interface UserCardProps {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    status: string;
    createdAt: string;
    lastLogin?: string;
  };
  onUpdate?: () => void;
}

const UserCard = ({ user, onUpdate }: UserCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "editor":
        return "bg-yellow-100 text-yellow-800";
      case "user":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin":
        return "Admin";
      case "editor":
        return "Editor";
      case "user":
        return "User";
      default:
        return role;
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa người dùng "${user.name}"?`)) {
      setIsDeleting(true);
      try {
        // Add delete logic here - you can use the useDataCRUD hook or API call
        console.log(`Deleting user ${user.id}`);
        // await deleteUser(user.id);
        if (onUpdate) onUpdate();
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Không thể xóa người dùng. Vui lòng thử lại.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Header with avatar */}
      <div className="relative h-24 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <Image
              src={user.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"}
              alt={user.name}
              width={64}
              height={64}
              className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
            />
            <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
              user.status === "active" ? "bg-green-500" : "bg-gray-400"
            }`} />
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="pt-10 pb-4 px-4">
        <div className="text-center mb-4">
          <h3 className="font-semibold text-gray-900 text-lg">{user.name}</h3>
          <div className="flex items-center justify-center gap-1 text-gray-500 text-sm mt-1">
            <HiMail className="h-4 w-4" />
            <span className="truncate">{user.email}</span>
          </div>
        </div>

        {/* Role Badge */}
        <div className="flex justify-center mb-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
            <HiShieldCheck className="h-3 w-3 mr-1" />
            {getRoleLabel(user.role)}
          </span>
        </div>

        {/* Status */}
        <div className="flex items-center justify-center mb-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            user.status === "active" 
              ? "bg-green-100 text-green-800" 
              : "bg-gray-100 text-gray-800"
          }`}>
            {user.status === "active" ? (
              <>
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></div>
                Hoạt động
              </>
            ) : (
              <>
                <HiXCircle className="h-3 w-3 mr-1" />
                Không hoạt động
              </>
            )}
          </span>
        </div>

        {/* Additional Info */}
        <div className="space-y-2 text-xs text-gray-500 mb-4">
          <div className="flex items-center justify-center gap-1">
            <HiCalendar className="h-3 w-3" />
            <span>Tham gia: {new Date(user.createdAt).toLocaleDateString('vi-VN')}</span>
          </div>
          {user.lastLogin && (
            <div className="flex items-center justify-center gap-1">
              <HiCalendar className="h-3 w-3" />
              <span>Lần cuối: {new Date(user.lastLogin).toLocaleDateString('vi-VN')}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            href={`/admin/user/edit/${user.id}`}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
          >
            <HiPencil className="h-4 w-4" />
            Sửa
          </Link>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <HiTrash className="h-4 w-4" />
            {isDeleting ? "Đang xóa..." : "Xóa"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
