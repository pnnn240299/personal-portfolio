# Hướng Dẫn Migration sang Multi-DB Connect

## So Sánh Code Trước và Sau

### 🔴 Code Hiện Tại (Trước Migration)

```tsx
// File: src/admin/pages/project/index.tsx
import useDataCRUD from "../../../lib/useDataCRUD";
import projectModel from "@/models/supabaseQuery/project.js";

const Project = () => {
  const { data, loading, error, fetchData } = useDataCRUD<GetProjects>("projects", projectModel);

  if (loading) return <p>⏳ Đang tải...</p>;
  if (error) return <p>❌ Lỗi: {error.message}</p>;
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Component content */}
    </div>
  );
};
```

### 🟢 Code Sau Migration (Với Multi-DB Connect)

```tsx
// File: src/admin/pages/project/index.tsx
import { useDataCRUD, configManager } from 'multi-db-connect';

// Cấu hình database
configManager.setConfig('supabase', {
  url: import.meta.env.VITE_SUPABASE_URL,
  key: import.meta.env.VITE_SUPABASE_ANON_KEY
});

const Project = () => {
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
    provider: 'supabase',
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
      { column: 'active', value: true }
    ],
    order: {
      column: 'created_at',
      ascending: false
    }
  });

  // Nhiều tính năng hơn: createItem, updateItem, deleteItem, refresh, clearError
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Component content với nhiều tính năng hơn */}
    </div>
  );
};
```

## Các Bước Migration

### Bước 1: Cài Đặt Package

```bash
# Trong thư mục personal-portfolio
npm install file:../multi-db-js
# hoặc nếu đã publish
npm install multi-db-connect
```

### Bước 2: Tạo File Cấu Hình Database

```typescript
// src/config/database.ts
import { configManager } from 'multi-db-connect';

export const initializeDatabase = () => {
  // Supabase (Production)
  configManager.setConfig('supabase', {
    url: import.meta.env.VITE_SUPABASE_URL,
    key: import.meta.env.VITE_SUPABASE_ANON_KEY,
    options: {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    }
  });

  // MySQL (Backup/Archive)
  configManager.setConfig('mysql', {
    host: import.meta.env.VITE_MYSQL_HOST || 'localhost',
    user: import.meta.env.VITE_MYSQL_USER || 'root',
    password: import.meta.env.VITE_MYSQL_PASSWORD || '',
    database: import.meta.env.VITE_MYSQL_DATABASE || 'portfolio_backup'
  });

  // Firebase (Analytics/Real-time)
  configManager.setConfig('firebase', {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  });

  // Thiết lập provider mặc định
  configManager.setDefaultProvider('supabase');
};

export default initializeDatabase;
```

### Bước 3: Cập Nhật Main App

```typescript
// src/App.tsx hoặc src/main.tsx
import initializeDatabase from './config/database';

// Khởi tạo database configuration
initializeDatabase();

function App() {
  // App component
}
```

### Bước 4: Cập Nhật Environment Variables

```bash
# .env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Optional: MySQL backup
VITE_MYSQL_HOST=localhost
VITE_MYSQL_USER=root
VITE_MYSQL_PASSWORD=password
VITE_MYSQL_DATABASE=portfolio_backup

# Optional: Firebase analytics
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_PROJECT_ID=your-project-id
```

### Bước 5: Migration Từng Component

#### Component Cũ:
```tsx
import useDataCRUD from "../../../lib/useDataCRUD";
import projectModel from "@/models/supabaseQuery/project.js";

const { data, loading, error } = useDataCRUD<GetProjects>("projects", projectModel);
```

#### Component Mới:
```tsx
import { useDataCRUD } from 'multi-db-connect';

const { 
  data, 
  loading, 
  error,
  createItem,
  updateItem,
  deleteItem,
  refresh,
  clearError
} = useDataCRUD<GetProjects>("projects", {
  provider: 'supabase',
  select: projectModel.select,
  filters: projectModel.filters,
  order: projectModel.order
});
```

## Ví Dụ Migration Hoàn Chỉnh

### File Migration: src/admin/pages/project/index.tsx

```tsx
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { HiPlus, HiTrash, HiPencil, HiRefresh } from "react-icons/hi";

// Thay thế import cũ
// import useDataCRUD from "../../../lib/useDataCRUD";
// import projectModel from "@/models/supabaseQuery/project.js";

// Import mới từ package
import { useDataCRUD } from 'multi-db-connect';

// Import các component hiện có
import NewCard from "@/admin/pages/project/components/NewCard";
import { ButtonLink } from "@/admin/components/buttons/ButtonLink";
import { GetProjects } from "@/types/projects";

const Project = () => {
  const [selectedProvider, setSelectedProvider] = useState('supabase');

  // Sử dụng Multi-DB Connect với nhiều tính năng hơn
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
      { column: 'active', value: true }
    ],
    order: {
      column: 'created_at',
      ascending: false
    }
  });

  // Handler cho việc xóa project
  const handleDelete = async (projectId: number) => {
    if (window.confirm('Bạn có chắc muốn xóa project này?')) {
      try {
        await deleteItem(projectId);
        alert('Project đã được xóa thành công!');
      } catch (error) {
        alert('Lỗi khi xóa project: ' + error.message);
      }
    }
  };

  // Handler cho việc refresh data
  const handleRefresh = async () => {
    try {
      await refresh();
      alert('Dữ liệu đã được cập nhật!');
    } catch (error) {
      alert('Lỗi khi refresh: ' + error.message);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">⏳ Đang tải dữ liệu...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <h3 className="font-bold">❌ Lỗi kết nối database</h3>
        <p className="mt-2">Chi tiết: {error}</p>
        <div className="mt-4 space-x-2">
          <button 
            onClick={clearError}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Xóa lỗi
          </button>
          <button 
            onClick={handleRefresh}
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Project Management</h2>
        
        <div className="flex items-center space-x-4">
          {/* Database Provider Selector */}
          <select 
            value={selectedProvider} 
            onChange={(e) => setSelectedProvider(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="supabase">Supabase (Production)</option>
            <option value="mysql">MySQL (Backup)</option>
            <option value="firebase">Firebase (Analytics)</option>
          </select>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center space-x-1"
          >
            <HiRefresh />
            <span>Refresh</span>
          </button>

          {/* Create Button */}
          <ButtonLink to="/admin/project/create" variant="green">
            <HiPlus />
            Create
          </ButtonLink>
        </div>
      </div>

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
            
            {/* Delete Button Overlay */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleDelete(project.id)}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg"
                title="Delete Project"
              >
                <HiTrash size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
```

## Lợi Ích Sau Migration

### ✅ Tính Năng Mới
- **Multi-Database Support**: Chuyển đổi giữa Supabase, MySQL, Firebase
- **Advanced Error Handling**: `clearError`, retry mechanisms
- **More CRUD Operations**: `createItem`, `updateItem`, `deleteItem` built-in
- **Refresh Capability**: `refresh()` method
- **Provider Switching**: Runtime database switching

### ✅ Cải Thiện Developer Experience
- **TypeScript Support**: Full type definitions
- **Better Error Messages**: More descriptive errors
- **Configuration Management**: Centralized config
- **Environment Variables**: Automatic loading

### ✅ Performance & Reliability
- **Connection Pooling**: Better resource management
- **Error Recovery**: Automatic retry mechanisms
- **Caching**: Built-in caching strategies
- **Monitoring**: Database health monitoring

## Testing Migration

### 1. Test với Supabase (Production)
```tsx
const { data } = useDataCRUD("projects", {
  provider: 'supabase',
  // ... config
});
```

### 2. Test với MySQL (Backup)
```tsx
const { data } = useDataCRUD("projects", {
  provider: 'mysql',
  // ... config
});
```

### 3. Test với Firebase (Analytics)
```tsx
const { data } = useDataCRUD("projects", {
  provider: 'firebase',
  // ... config
});
```

## Rollback Plan

Nếu cần rollback về code cũ:

1. **Giữ backup** của file gốc
2. **Revert imports** về local useDataCRUD
3. **Remove** multi-db-connect package
4. **Restore** original component logic

```bash
# Uninstall package
npm uninstall multi-db-connect

# Restore original files
git checkout HEAD~1 -- src/admin/pages/project/index.tsx
```

Migration này sẽ giúp dự án của bạn có khả năng mở rộng tốt hơn và dễ dàng quản lý nhiều database sources!




