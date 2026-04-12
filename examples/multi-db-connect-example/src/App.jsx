import React, { useState, useEffect } from 'react';
import { useDataCRUD, configManager } from 'multi-db-connect';

// Cấu hình các provider (thường được làm trong file khởi tạo app)
useEffect(() => {
  // Cấu hình Supabase cho projects và blog posts
  configManager.setConfig('supabase', {
    url: import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co',
    key: import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key'
  });

  // Cấu hình Firebase cho skills
  configManager.setConfig('firebase', {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-api-key',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo.firebaseapp.com',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo-project'
  });

  // Cấu hình MongoDB cho analytics
  configManager.setConfig('mongodb', {
    connection: import.meta.env.VITE_MONGODB_URI || 'mongodb://localhost:27017',
    database: import.meta.env.VITE_MONGODB_DATABASE || 'portfolio'
  });

  // Cấu hình REST API cho GitHub data
  configManager.setConfig('restapi', {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.github.com',
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_GITHUB_TOKEN || ''}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  });

  // Thiết lập provider mặc định
  configManager.setDefaultProvider(import.meta.env.VITE_DEFAULT_DB_PROVIDER || 'supabase');
}, []);

function App() {
  const [activeTab, setActiveTab] = useState('projects');
  const [selectedProvider, setSelectedProvider] = useState('supabase');

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1>🚀 Portfolio Demo với Multi-DB Connect</h1>
        <p>Demo sử dụng thư viện multi-db-connect để quản lý portfolio với nhiều database khác nhau</p>
        <div className="provider-status">
          <div className="indicator"></div>
          <span>Multi-DB Connect đang hoạt động</span>
        </div>
      </header>

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-buttons">
          <button 
            className={`nav-button ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            📁 Dự Án
          </button>
          <button 
            className={`nav-button ${activeTab === 'blog' ? 'active' : ''}`}
            onClick={() => setActiveTab('blog')}
          >
            📝 Blog Posts
          </button>
          <button 
            className={`nav-button ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            🛠️ Kỹ Năng
          </button>
          <button 
            className={`nav-button ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            📊 Analytics
          </button>
          <button 
            className={`nav-button ${activeTab === 'github' ? 'active' : ''}`}
            onClick={() => setActiveTab('github')}
          >
            🐙 GitHub
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="content">
        {activeTab === 'projects' && <ProjectsSection />}
        {activeTab === 'blog' && <BlogSection />}
        {activeTab === 'skills' && <SkillsSection />}
        {activeTab === 'analytics' && <AnalyticsSection />}
        {activeTab === 'github' && <GitHubSection />}
      </main>
    </div>
  );
}

// Projects Section - Sử dụng Supabase
function ProjectsSection() {
  const { 
    data: projects, 
    loading, 
    error, 
    createItem, 
    updateItem, 
    deleteItem,
    refresh,
    clearError 
  } = useDataCRUD('projects', {
    provider: 'supabase',
    select: 'id, title, description, technologies, github_url, demo_url, featured, created_at',
    filters: [{ column: 'published', value: true }],
    order: { column: 'created_at', ascending: false }
  });

  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: '',
    github_url: '',
    demo_url: '',
    featured: false
  });

  const handleCreateProject = async () => {
    if (!newProject.title.trim()) return;
    
    try {
      await createItem({
        ...newProject,
        published: true,
        created_at: new Date().toISOString()
      });
      setNewProject({
        title: '',
        description: '',
        technologies: '',
        github_url: '',
        demo_url: '',
        featured: false
      });
      alert('Dự án đã được thêm thành công!');
    } catch (err) {
      alert('Lỗi: ' + err.message);
    }
  };

  const handleToggleFeatured = async (projectId, currentFeatured) => {
    try {
      await updateItem(projectId, { featured: !currentFeatured });
      alert('Đã cập nhật trạng thái featured!');
    } catch (err) {
      alert('Lỗi: ' + err.message);
    }
  };

  if (error) {
    return (
      <div className="error">
        <h3>Lỗi kết nối database:</h3>
        <p>{error}</p>
        <button onClick={clearError}>Xóa lỗi</button>
        <button onClick={refresh}>Thử lại</button>
      </div>
    );
  }

  return (
    <div>
      <h2>📁 Quản Lý Dự Án (Supabase)</h2>
      
      {/* Add Project Form */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3>Thêm Dự Án Mới</h3>
        <div className="form-group">
          <label>Tên dự án:</label>
          <input
            type="text"
            value={newProject.title}
            onChange={(e) => setNewProject({...newProject, title: e.target.value})}
            placeholder="Nhập tên dự án..."
          />
        </div>
        <div className="form-group">
          <label>Mô tả:</label>
          <textarea
            value={newProject.description}
            onChange={(e) => setNewProject({...newProject, description: e.target.value})}
            placeholder="Mô tả dự án..."
          />
        </div>
        <div className="form-group">
          <label>Công nghệ sử dụng:</label>
          <input
            type="text"
            value={newProject.technologies}
            onChange={(e) => setNewProject({...newProject, technologies: e.target.value})}
            placeholder="React, Node.js, MongoDB..."
          />
        </div>
        <div className="form-group">
          <label>GitHub URL:</label>
          <input
            type="url"
            value={newProject.github_url}
            onChange={(e) => setNewProject({...newProject, github_url: e.target.value})}
            placeholder="https://github.com/username/repo"
          />
        </div>
        <div className="form-group">
          <label>Demo URL:</label>
          <input
            type="url"
            value={newProject.demo_url}
            onChange={(e) => setNewProject({...newProject, demo_url: e.target.value})}
            placeholder="https://demo.com"
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={newProject.featured}
              onChange={(e) => setNewProject({...newProject, featured: e.target.checked})}
            />
            Featured Project
          </label>
        </div>
        <button className="btn" onClick={handleCreateProject}>Thêm Dự Án</button>
      </div>

      {/* Projects List */}
      {loading && <div className="loading">Đang tải dự án...</div>}
      
      {!loading && (
        <div className="card-grid">
          {projects.map(project => (
            <div key={project.id} className="card">
              <h3>
                {project.title}
                {project.featured && <span style={{color: '#fbbf24'}}> ⭐</span>}
              </h3>
              <p>{project.description}</p>
              <div className="card-meta">
                <div>
                  <strong>Công nghệ:</strong> {project.technologies}
                </div>
                <div>
                  <strong>Ngày tạo:</strong> {new Date(project.created_at).toLocaleDateString('vi-VN')}
                </div>
              </div>
              <div style={{ marginTop: '15px' }}>
                <button 
                  className="btn btn-small btn-secondary"
                  onClick={() => handleToggleFeatured(project.id, project.featured)}
                >
                  {project.featured ? 'Bỏ Featured' : 'Đặt Featured'}
                </button>
                <button 
                  className="btn btn-small btn-danger"
                  onClick={() => {
                    if (window.confirm('Bạn có chắc muốn xóa dự án này?')) {
                      deleteItem(project.id);
                    }
                  }}
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && projects.length === 0 && (
        <div className="empty-state">
          <h3>Chưa có dự án nào</h3>
          <p>Hãy thêm dự án đầu tiên của bạn!</p>
        </div>
      )}
    </div>
  );
}

// Blog Section - Sử dụng Supabase
function BlogSection() {
  const { 
    data: posts, 
    loading, 
    error, 
    createItem, 
    updateItem, 
    deleteItem,
    refresh,
    clearError 
  } = useDataCRUD('blog_posts', {
    provider: 'supabase',
    select: 'id, title, content, excerpt, tags, published, created_at, updated_at',
    filters: [{ column: 'published', value: true }],
    order: { column: 'created_at', ascending: false }
  });

  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: '',
    published: true
  });

  const handleCreatePost = async () => {
    if (!newPost.title.trim()) return;
    
    try {
      await createItem({
        ...newPost,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      setNewPost({
        title: '',
        content: '',
        excerpt: '',
        tags: '',
        published: true
      });
      alert('Bài viết đã được thêm thành công!');
    } catch (err) {
      alert('Lỗi: ' + err.message);
    }
  };

  if (error) {
    return (
      <div className="error">
        <h3>Lỗi kết nối database:</h3>
        <p>{error}</p>
        <button onClick={clearError}>Xóa lỗi</button>
        <button onClick={refresh}>Thử lại</button>
      </div>
    );
  }

  return (
    <div>
      <h2>📝 Quản Lý Blog Posts (Supabase)</h2>
      
      {/* Add Post Form */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3>Viết Bài Mới</h3>
        <div className="form-group">
          <label>Tiêu đề:</label>
          <input
            type="text"
            value={newPost.title}
            onChange={(e) => setNewPost({...newPost, title: e.target.value})}
            placeholder="Nhập tiêu đề bài viết..."
          />
        </div>
        <div className="form-group">
          <label>Tóm tắt:</label>
          <input
            type="text"
            value={newPost.excerpt}
            onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
            placeholder="Mô tả ngắn gọn về bài viết..."
          />
        </div>
        <div className="form-group">
          <label>Nội dung:</label>
          <textarea
            value={newPost.content}
            onChange={(e) => setNewPost({...newPost, content: e.target.value})}
            placeholder="Nội dung bài viết..."
            rows="6"
          />
        </div>
        <div className="form-group">
          <label>Tags:</label>
          <input
            type="text"
            value={newPost.tags}
            onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
            placeholder="javascript, react, tutorial"
          />
        </div>
        <button className="btn" onClick={handleCreatePost}>Đăng Bài</button>
      </div>

      {/* Posts List */}
      {loading && <div className="loading">Đang tải bài viết...</div>}
      
      {!loading && (
        <div className="card-grid">
          {posts.map(post => (
            <div key={post.id} className="card">
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div className="card-meta">
                <div>
                  <strong>Tags:</strong> {post.tags}
                </div>
                <div>
                  <strong>Ngày đăng:</strong> {new Date(post.created_at).toLocaleDateString('vi-VN')}
                </div>
              </div>
              <div style={{ marginTop: '15px' }}>
                <button 
                  className="btn btn-small btn-danger"
                  onClick={() => {
                    if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
                      deleteItem(post.id);
                    }
                  }}
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && posts.length === 0 && (
        <div className="empty-state">
          <h3>Chưa có bài viết nào</h3>
          <p>Hãy viết bài đầu tiên của bạn!</p>
        </div>
      )}
    </div>
  );
}

// Skills Section - Sử dụng Firebase
function SkillsSection() {
  const { 
    data: skills, 
    loading, 
    error, 
    createItem, 
    updateItem, 
    deleteItem,
    refresh,
    clearError 
  } = useDataCRUD('skills', {
    provider: 'firebase',
    filters: [{ column: 'active', value: true }],
    order: { column: 'proficiency', ascending: false }
  });

  const [newSkill, setNewSkill] = useState({
    name: '',
    category: 'Programming',
    proficiency: 5,
    years_experience: 1,
    active: true
  });

  const handleCreateSkill = async () => {
    if (!newSkill.name.trim()) return;
    
    try {
      await createItem({
        ...newSkill,
        created_at: new Date().toISOString()
      });
      setNewSkill({
        name: '',
        category: 'Programming',
        proficiency: 5,
        years_experience: 1,
        active: true
      });
      alert('Kỹ năng đã được thêm thành công!');
    } catch (err) {
      alert('Lỗi: ' + err.message);
    }
  };

  if (error) {
    return (
      <div className="error">
        <h3>Lỗi kết nối Firebase:</h3>
        <p>{error}</p>
        <button onClick={clearError}>Xóa lỗi</button>
        <button onClick={refresh}>Thử lại</button>
      </div>
    );
  }

  return (
    <div>
      <h2>🛠️ Quản Lý Kỹ Năng (Firebase)</h2>
      
      {/* Add Skill Form */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3>Thêm Kỹ Năng Mới</h3>
        <div className="form-group">
          <label>Tên kỹ năng:</label>
          <input
            type="text"
            value={newSkill.name}
            onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
            placeholder="React, Node.js, Python..."
          />
        </div>
        <div className="form-group">
          <label>Danh mục:</label>
          <select
            value={newSkill.category}
            onChange={(e) => setNewSkill({...newSkill, category: e.target.value})}
          >
            <option value="Programming">Programming</option>
            <option value="Framework">Framework</option>
            <option value="Database">Database</option>
            <option value="Tool">Tool</option>
            <option value="Language">Language</option>
          </select>
        </div>
        <div className="form-group">
          <label>Mức độ thành thạo (1-10):</label>
          <input
            type="range"
            min="1"
            max="10"
            value={newSkill.proficiency}
            onChange={(e) => setNewSkill({...newSkill, proficiency: parseInt(e.target.value)})}
          />
          <span>{newSkill.proficiency}/10</span>
        </div>
        <div className="form-group">
          <label>Số năm kinh nghiệm:</label>
          <input
            type="number"
            min="0"
            value={newSkill.years_experience}
            onChange={(e) => setNewSkill({...newSkill, years_experience: parseInt(e.target.value)})}
          />
        </div>
        <button className="btn" onClick={handleCreateSkill}>Thêm Kỹ Năng</button>
      </div>

      {/* Skills List */}
      {loading && <div className="loading">Đang tải kỹ năng...</div>}
      
      {!loading && (
        <div>
          {/* Skills by Category */}
          {['Programming', 'Framework', 'Database', 'Tool', 'Language'].map(category => {
            const categorySkills = skills.filter(skill => skill.category === category);
            if (categorySkills.length === 0) return null;
            
            return (
              <div key={category} style={{ marginBottom: '30px' }}>
                <h3 style={{ color: '#2d3748', marginBottom: '15px' }}>{category}</h3>
                <div className="card-grid">
                  {categorySkills.map(skill => (
                    <div key={skill.id} className="card">
                      <h4>{skill.name}</h4>
                      <div style={{ marginBottom: '10px' }}>
                        <strong>Thành thạo:</strong> {skill.proficiency}/10
                        <div style={{ 
                          width: '100%', 
                          height: '8px', 
                          backgroundColor: '#e2e8f0', 
                          borderRadius: '4px',
                          marginTop: '5px'
                        }}>
                          <div style={{ 
                            width: `${(skill.proficiency / 10) * 100}%`, 
                            height: '100%', 
                            backgroundColor: '#48bb78',
                            borderRadius: '4px',
                            transition: 'width 0.3s ease'
                          }}></div>
                        </div>
                      </div>
                      <div className="card-meta">
                        <div>
                          <strong>Kinh nghiệm:</strong> {skill.years_experience} năm
                        </div>
                        <div>
                          <strong>Trạng thái:</strong> {skill.active ? 'Hoạt động' : 'Không hoạt động'}
                        </div>
                      </div>
                      <div style={{ marginTop: '15px' }}>
                        <button 
                          className="btn btn-small btn-danger"
                          onClick={() => {
                            if (window.confirm('Bạn có chắc muốn xóa kỹ năng này?')) {
                              deleteItem(skill.id);
                            }
                          }}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!loading && skills.length === 0 && (
        <div className="empty-state">
          <h3>Chưa có kỹ năng nào</h3>
          <p>Hãy thêm kỹ năng đầu tiên của bạn!</p>
        </div>
      )}
    </div>
  );
}

// Analytics Section - Sử dụng MongoDB
function AnalyticsSection() {
  const { 
    data: analytics, 
    loading, 
    error, 
    createItem, 
    updateItem, 
    deleteItem,
    refresh,
    clearError 
  } = useDataCRUD('portfolio_analytics', {
    provider: 'mongodb',
    select: { date: 1, page_views: 1, unique_visitors: 1, bounce_rate: 1, avg_session_duration: 1 },
    order: { column: 'date', ascending: false }
  });

  const [newAnalytic, setNewAnalytic] = useState({
    page_views: 0,
    unique_visitors: 0,
    bounce_rate: 0,
    avg_session_duration: 0
  });

  const handleCreateAnalytic = async () => {
    try {
      await createItem({
        ...newAnalytic,
        date: new Date().toISOString(),
        created_at: new Date().toISOString()
      });
      setNewAnalytic({
        page_views: 0,
        unique_visitors: 0,
        bounce_rate: 0,
        avg_session_duration: 0
      });
      alert('Dữ liệu analytics đã được thêm thành công!');
    } catch (err) {
      alert('Lỗi: ' + err.message);
    }
  };

  // Calculate stats
  const totalPageViews = analytics.reduce((sum, item) => sum + (item.page_views || 0), 0);
  const totalUniqueVisitors = analytics.reduce((sum, item) => sum + (item.unique_visitors || 0), 0);
  const avgBounceRate = analytics.length > 0 ? analytics.reduce((sum, item) => sum + (item.bounce_rate || 0), 0) / analytics.length : 0;
  const avgSessionDuration = analytics.length > 0 ? analytics.reduce((sum, item) => sum + (item.avg_session_duration || 0), 0) / analytics.length : 0;

  if (error) {
    return (
      <div className="error">
        <h3>Lỗi kết nối MongoDB:</h3>
        <p>{error}</p>
        <button onClick={clearError}>Xóa lỗi</button>
        <button onClick={refresh}>Thử lại</button>
      </div>
    );
  }

  return (
    <div>
      <h2>📊 Portfolio Analytics (MongoDB)</h2>
      
      {/* Stats Overview */}
      <div className="stats">
        <div className="stat-card">
          <h3>{totalPageViews.toLocaleString()}</h3>
          <p>Tổng lượt xem</p>
        </div>
        <div className="stat-card">
          <h3>{totalUniqueVisitors.toLocaleString()}</h3>
          <p>Lượt truy cập duy nhất</p>
        </div>
        <div className="stat-card">
          <h3>{avgBounceRate.toFixed(1)}%</h3>
          <p>Tỷ lệ thoát trung bình</p>
        </div>
        <div className="stat-card">
          <h3>{avgSessionDuration.toFixed(1)}s</h3>
          <p>Thời gian phiên trung bình</p>
        </div>
      </div>

      {/* Add Analytics Form */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3>Thêm Dữ Liệu Analytics</h3>
        <div className="form-group">
          <label>Lượt xem trang:</label>
          <input
            type="number"
            value={newAnalytic.page_views}
            onChange={(e) => setNewAnalytic({...newAnalytic, page_views: parseInt(e.target.value) || 0})}
          />
        </div>
        <div className="form-group">
          <label>Lượt truy cập duy nhất:</label>
          <input
            type="number"
            value={newAnalytic.unique_visitors}
            onChange={(e) => setNewAnalytic({...newAnalytic, unique_visitors: parseInt(e.target.value) || 0})}
          />
        </div>
        <div className="form-group">
          <label>Tỷ lệ thoát (%):</label>
          <input
            type="number"
            min="0"
            max="100"
            value={newAnalytic.bounce_rate}
            onChange={(e) => setNewAnalytic({...newAnalytic, bounce_rate: parseFloat(e.target.value) || 0})}
          />
        </div>
        <div className="form-group">
          <label>Thời gian phiên trung bình (giây):</label>
          <input
            type="number"
            value={newAnalytic.avg_session_duration}
            onChange={(e) => setNewAnalytic({...newAnalytic, avg_session_duration: parseFloat(e.target.value) || 0})}
          />
        </div>
        <button className="btn" onClick={handleCreateAnalytic}>Thêm Dữ Liệu</button>
      </div>

      {/* Analytics List */}
      {loading && <div className="loading">Đang tải dữ liệu analytics...</div>}
      
      {!loading && (
        <div className="card-grid">
          {analytics.map(analytic => (
            <div key={analytic._id} className="card">
              <h3>Ngày: {new Date(analytic.date).toLocaleDateString('vi-VN')}</h3>
              <div className="card-meta">
                <div><strong>Lượt xem:</strong> {analytic.page_views?.toLocaleString()}</div>
                <div><strong>Lượt truy cập duy nhất:</strong> {analytic.unique_visitors?.toLocaleString()}</div>
                <div><strong>Tỷ lệ thoát:</strong> {analytic.bounce_rate?.toFixed(1)}%</div>
                <div><strong>Thời gian phiên:</strong> {analytic.avg_session_duration?.toFixed(1)}s</div>
              </div>
              <div style={{ marginTop: '15px' }}>
                <button 
                  className="btn btn-small btn-danger"
                  onClick={() => {
                    if (window.confirm('Bạn có chắc muốn xóa dữ liệu này?')) {
                      deleteItem(analytic._id);
                    }
                  }}
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && analytics.length === 0 && (
        <div className="empty-state">
          <h3>Chưa có dữ liệu analytics</h3>
          <p>Hãy thêm dữ liệu đầu tiên!</p>
        </div>
      )}
    </div>
  );
}

// GitHub Section - Sử dụng REST API
function GitHubSection() {
  const { 
    data: repos, 
    loading, 
    error, 
    refresh,
    clearError 
  } = useDataCRUD('users/octocat/repos', {
    provider: 'restapi'
  });

  if (error) {
    return (
      <div className="error">
        <h3>Lỗi kết nối GitHub API:</h3>
        <p>{error}</p>
        <button onClick={clearError}>Xóa lỗi</button>
        <button onClick={refresh}>Thử lại</button>
      </div>
    );
  }

  return (
    <div>
      <h2>🐙 GitHub Repositories (REST API)</h2>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        Dữ liệu từ GitHub API - danh sách repositories của user "octocat"
      </p>
      
      {loading && <div className="loading">Đang tải repositories từ GitHub...</div>}
      
      {!loading && (
        <div className="card-grid">
          {repos.slice(0, 10).map(repo => (
            <div key={repo.id} className="card">
              <h3>{repo.name}</h3>
              <p>{repo.description || 'Không có mô tả'}</p>
              <div className="card-meta">
                <div><strong>⭐ Stars:</strong> {repo.stargazers_count}</div>
                <div><strong>🍴 Forks:</strong> {repo.forks_count}</div>
                <div><strong>🔧 Language:</strong> {repo.language || 'N/A'}</div>
                <div><strong>📅 Cập nhật:</strong> {new Date(repo.updated_at).toLocaleDateString('vi-VN')}</div>
              </div>
              <div style={{ marginTop: '15px' }}>
                <a 
                  href={repo.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-small"
                  style={{ textDecoration: 'none', display: 'inline-block' }}
                >
                  Xem trên GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && repos.length === 0 && (
        <div className="empty-state">
          <h3>Không tìm thấy repositories</h3>
          <p>Có thể GitHub API không trả về dữ liệu hoặc có lỗi kết nối.</p>
        </div>
      )}
    </div>
  );
}

export default App;



