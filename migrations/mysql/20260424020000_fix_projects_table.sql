-- up
-- Add slug column (this is the main missing column causing the error)
ALTER TABLE projects ADD COLUMN slug VARCHAR(255) NOT NULL UNIQUE AFTER name;

-- Update existing records to have default slug values
UPDATE projects 
SET slug = CONCAT('project-', id, '-', LOWER(REPLACE(IFNULL(name, ''), ' ', '-'))) 
WHERE slug IS NULL OR slug = '';

-- down
-- Note: We don't drop the slug column to avoid data loss
