/**
 * Ví dụ sử dụng Multi-DB Connect trong Personal Portfolio
 * File: D:\SoureCode\personal-portfolio\src\admin\pages\project\index.tsx
 */

import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { HiPlus, HiTrash, HiPencil } from "react-icons/hi";

// Import package multi-db-connect (sau khi cài đặt)
import { useDataCRUD, configManager } from 'multi-db-connect';

// Import các component hiện có
import NewCard from "@/admin/pages/project/components/NewCard";
import CreateLinkButton from "@/admin/components/buttons/CreateLinkButton";
import { ButtonLink } from "@/admin/components/buttons/ButtonLink";
import { GetProjects } from "@/types/projects";

// Cấu hình Multi-DB Connect (thường đặt trong file config riêng)
const initializeMultiDB = () => {
  // Cấu hình Supabase (database chính)
  configManager.setConfig('supabase', {
    url: import.meta.env.VITE_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL,
    key: import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY
  });

  // Cấu hình MySQL (backup hoặc analytics)
  configManager.setConfig('mysql', {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'portfolio'
  });

  // Cấu hình Firebase (cho real-time features)
  configManager.setConfig('firebase', {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID
  });

  // Thiết lập provider mặc định
  configManager.setDefaultProvider('supabase');
};

// Khởi tạo cấu hình
initializeMultiDB();

/**
 * Component chính sử dụng Multi-DB Connect
 * Thay thế cho file index.tsx hiện tại
 */
const ProjectWithMultiDB = () => {
  const [selectedProvider, setSelectedProvider] = useState('supabase');
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  // Sử dụng Multi-DB Connect với cấu hình linh hoạt
  const { 
    data, 
    loading, 
    error, 
    fetchData,
    createItem,
    updateItem,
    deleteItem,
    refresh,
    clearError
  } = useDataCRUD<GetProjects>("projects", {
    provider: selectedProvider,
    select: `
      id,
      name,
      description,
      live_url,
      image_url,
      external_links (
        id,
        title,
        icon,
        url
      )
    `,
    filters: [
      { column: 'active', value: true },
      { column: 'featured', value: true }
    ],
    order: {
      column: 'created_at',
      ascending: false
    }
  });

  // Handler cho việc xóa project
  const handleDeleteProject = async (projectId: number) => {
    if (window.confirm('Bạn có chắc muốn xóa project này?')) {
      try {
        await deleteItem(projectId);
        alert('Project đã được xóa thành công!');
      } catch (error) {
        alert('Lỗi khi xóa project: ' + error.message);
      }
    }
  };

  // Handler cho việc toggle featured status
  const handleToggleFeatured = async (projectId: number, currentFeatured: boolean) => {
    try {
      await updateItem(projectId, { featured: !currentFeatured });
      alert('Trạng thái featured đã được cập nhật!');
    } catch (error) {
      alert('Lỗi khi cập nhật project: ' + error.message);
    }
  };

  // Handler cho việc chuyển đổi database
  const handleProviderChange = (newProvider: string) => {
    setSelectedProvider(newProvider);
    clearError();
    // Data sẽ tự động reload khi provider thay đổi
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">⏳ Đang tải dữ liệu từ {selectedProvider}...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <h3 className="font-bold">❌ Lỗi kết nối database</h3>
        <p className="mt-2">Provider: {selectedProvider}</p>
        <p className="mt-2">Chi tiết: {error}</p>
        <div className="mt-4 space-x-2">
          <button 
            onClick={clearError}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Xóa lỗi
          </button>
          <button 
            onClick={refresh}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Thử lại
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header với database selector */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Project Management</h2>
          <p className="text-sm text-gray-600 mt-1">
            Database: <span className="font-semibold text-blue-600">{selectedProvider}</span>
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Database Provider Selector */}
          <select 
            value={selectedProvider} 
            onChange={(e) => handleProviderChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="supabase">Supabase (Production)</option>
            <option value="mysql">MySQL (Backup)</option>
            <option value="firebase">Firebase (Analytics)</option>
            <option value="restapi">REST API (External)</option>
          </select>

          {/* Advanced Options Toggle */}
          <button
            onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
            className="px-3 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-md"
          >
            Advanced
          </button>

          {/* Create Button */}
          <ButtonLink to="/admin/project/create" variant="green">
            <HiPlus />
            Create Project
          </ButtonLink>
        </div>
      </div>

      {/* Advanced Options Panel */}
      {showAdvancedOptions && (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h3 className="font-semibold mb-3">Advanced Database Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Refresh Data
              </label>
              <button 
                onClick={refresh}
                className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Refresh Now
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Database Status
              </label>
              <div className="px-3 py-2 bg-green-100 text-green-800 rounded text-sm">
                ✓ Connected to {selectedProvider}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Projects
              </label>
              <div className="px-3 py-2 bg-gray-100 rounded text-sm font-semibold">
                {data.length} projects
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {data.map((project) => (
          <div key={project.id} className="relative group">
            <NewCard
              name={project?.name}
              description={project?.description}
              demoLink={project?.live_url}
              image={project?.image_url}
              technologies={project?.external_links}
              edit={`/admin/project/edit/${project?.id}`}
            />
            
            {/* Project Actions Overlay */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex space-x-1">
                <button
                  onClick={() => handleToggleFeatured(project.id, project.featured)}
                  className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 shadow-lg"
                  title={project.featured ? "Unfeature" : "Feature"}
                >
                  ⭐
                </button>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg"
                  title="Delete Project"
                >
                  <HiTrash size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {data.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📁</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Không có project nào</h3>
          <p className="text-gray-500 mb-6">Hãy tạo project đầu tiên của bạn</p>
          <ButtonLink to="/admin/project/create" variant="green">
            <HiPlus />
            Tạo Project
          </ButtonLink>
        </div>
      )}

      {/* Database Info Footer */}
      <div className="mt-8 pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-500 text-center">
          <p>
            Đang sử dụng database: <strong>{selectedProvider}</strong> | 
            Tổng số projects: <strong>{data.length}</strong> | 
            Last updated: <strong>{new Date().toLocaleTimeString()}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectWithMultiDB;




