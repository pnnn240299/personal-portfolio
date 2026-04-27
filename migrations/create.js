import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const migrationsDir = __dirname;

const description = process.argv.slice(2).join(" ").trim();

if (!description) {
  console.error("Usage: npm run migrate:new <description>");
  process.exit(1);
}

const timestamp = new Date()
  .toISOString()
  .replace(/[-:T.Z]/g, "")
  .slice(0, 14);
const slug = description
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "_")
  .replace(/^_+|_+$/g, "_");
const fileName = `${timestamp}_${slug}.sql`;
const filePath = path.join(migrationsDir, fileName);

const template = `-- up
-- Write SQL statements for migrating up here

-- down
-- Write SQL statements for rolling back here
`;

if (fs.existsSync(filePath)) {
  console.error(`Migration file already exists: ${fileName}`);
  process.exit(1);
}

fs.writeFileSync(filePath, template, "utf8");
console.log(`Created migration: ${fileName}`);
