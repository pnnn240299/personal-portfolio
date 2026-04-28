'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HiArrowLeft, HiSave, HiUser, HiMail, HiLockClosed, HiShieldCheck } from "react-icons/hi";
import useDataCRUD from "@/lib/useDataCRUD";

const UserEdit = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { updateItem, getItem, loading, error, success } = useDataCRUD("users");
  const id = params.id;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    status: "active",
  });

  const [originalData, setOriginalData] = useState({
    name: "",
    email: "",
    role: "user",
    status: "active",
  });

  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getItem(id);
        if (data) {
          const { password, confirmPassword, ...userData } = data;
          setFormData(userData);
          setOriginalData(userData);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id, getItem]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      errors.name = "Tên không được để trống";
    }

    if (!formData.email.trim()) {
      errors.email = "Email không được để trống";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email không hợp lệ";
    }

    // Only validate password if user is trying to change it
    if (formData.password) {
      if (formData.password.length < 6) {
        errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
      }

      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Mật khẩu xác nhận không khớp";
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      // Only include password if it's being changed
      const submitData = formData.password 
        ? formData 
        : { ...formData, password: undefined, confirmPassword: undefined };

      await updateItem(id, submitData);
      
      if (success) {
        router.push("/admin/user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const hasChanges = () => {
    const { password, confirmPassword, ...currentData } = formData;
    const { password: _, confirmPassword: __, ...original } = originalData;
    
    return JSON.stringify(currentData) !== JSON.stringify(original) || 
           (formData.password !== "");
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-2xl mx-auto">
          <div className="text-center py-8">
            <p className="text-gray-500">Đang tải thông tin người dùng...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/admin/user"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <HiArrowLeft className="h-5 w-5" />
            Quay lại
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Chỉnh sửa Người dùng</h1>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-700">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <HiUser className="inline h-4 w-4 mr-1" />
                Tên người dùng
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  validationErrors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Nhập tên người dùng"
              />
              {validationErrors.name && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <HiMail className="inline h-4 w-4 mr-1" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  validationErrors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Nhập email"
              />
              {validationErrors.email && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
              )}
            </div>

            {/* Password (Optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <HiLockClosed className="inline h-4 w-4 mr-1" />
                Mật khẩu <span className="text-gray-500 font-normal">(Để trống nếu không đổi)</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  validationErrors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Nhập mật khẩu mới"
              />
              {validationErrors.password && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <HiLockClosed className="inline h-4 w-4 mr-1" />
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  validationErrors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Nhập lại mật khẩu mới"
                disabled={!formData.password}
              />
              {validationErrors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.confirmPassword}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <HiShieldCheck className="inline h-4 w-4 mr-1" />
                Vai trò
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="user">User</option>
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trạng thái
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={formData.status === "active"}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Hoạt động</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="inactive"
                    checked={formData.status === "inactive"}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Không hoạt động</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Link
                href="/admin/user"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                <HiArrowLeft className="h-4 w-4" />
                Hủy
              </Link>
              <button
                type="submit"
                disabled={loading || !hasChanges()}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <HiSave className="h-4 w-4" />
                {loading ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;
