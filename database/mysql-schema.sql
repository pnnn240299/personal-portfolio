-- Portfolio Database Schema for Next.js Application

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    skill TEXT NOT NULL,
    description TEXT NOT NULL,
    repo_url TEXT,
    image_url VARCHAR(500),
    live_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- External links table
CREATE TABLE IF NOT EXISTS external_links (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    icon VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Project external links junction table
CREATE TABLE IF NOT EXISTS project_external_links (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    external_link_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (external_link_id) REFERENCES external_links(id) ON DELETE CASCADE,
    UNIQUE KEY unique_project_link (project_id, external_link_id)
);

-- Blog posts table (for future use)
CREATE TABLE IF NOT EXISTS blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image VARCHAR(500),
    status ENUM('draft', 'published') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    status ENUM('unread', 'read', 'replied') DEFAULT 'unread',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample admin user (password: admin123)
INSERT IGNORE INTO admin_users (username, email, password) VALUES 
('admin', 'admin@portfolio.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Insert sample external links
INSERT IGNORE INTO external_links (title, url, icon) VALUES 
('GitHub', 'https://github.com', 'github'),
('LinkedIn', 'https://linkedin.com', 'linkedin'),
('Twitter', 'https://twitter.com', 'twitter'),
('Website', 'https://example.com', 'globe');

-- Insert sample project
INSERT IGNORE INTO projects (name, skill, description, repo_url, image_url, live_url) VALUES 
('Portfolio Website', 'Next.js, React, TypeScript, Tailwind CSS, MySQL', 
 'A modern portfolio website built with Next.js featuring admin panel and project management', 
 'https://github.com/username/portfolio', 
 'https://example.com/project-image.jpg', 
 'https://portfolio.example.com');
