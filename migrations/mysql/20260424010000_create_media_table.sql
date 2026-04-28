-- up
CREATE TABLE IF NOT EXISTS media (
  id INT AUTO_INCREMENT PRIMARY KEY,
  file_name VARCHAR(255),
  file_path TEXT NOT NULL,        -- URL hoặc path (/uploads/...)
  file_type VARCHAR(50),          -- image, video, document
  mime_type VARCHAR(100),         -- image/png, video/mp4
  size INT,                       -- bytes
  alt_text VARCHAR(255),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS media_relations (
  id INT AUTO_INCREMENT PRIMARY KEY,

  media_id INT NOT NULL,
  entity_id INT NOT NULL,
  entity_type VARCHAR(50) NOT NULL, -- 'blog' | 'project'

  type VARCHAR(50), -- thumbnail | gallery | banner | video
  sort_order INT DEFAULT 0,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (media_id) REFERENCES media(id) ON DELETE CASCADE,

  INDEX idx_entity (entity_type, entity_id),
  INDEX idx_media (media_id)
);

-- down
DROP TABLE IF EXISTS media_relations;
DROP TABLE IF EXISTS media;
