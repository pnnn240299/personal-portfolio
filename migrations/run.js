import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { Client } from "pg";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const migrationsDir = __dirname;
const metadataPath = path.join(migrationsDir, "schema_migrations.json");

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("Missing DATABASE_URL environment variable. Set it in .env or export it before running.");
  process.exit(1);
}

const client = new Client({ connectionString: databaseUrl });

const metadata = fs.existsSync(metadataPath)
  ? JSON.parse(fs.readFileSync(metadataPath, "utf8"))
  : { applied: [] };

const migrations = fs
  .readdirSync(migrationsDir)
  .filter((file) => file.endsWith(".sql"))
  .sort();

const parseMigration = (content) => {
  const lines = content.split(/\r?\n/);
  let current = null;
  const sections = { up: [], down: [] };

  for (const line of lines) {
    const trimmed = line.trim().toLowerCase();
    if (trimmed === "-- up" || trimmed === "--up") {
      current = "up";
      continue;
    }
    if (trimmed === "-- down" || trimmed === "--down") {
      current = "down";
      continue;
    }
    if (current) {
      sections[current].push(line);
    }
  }

  return {
    up: sections.up.join("\n").trim(),
    down: sections.down.join("\n").trim()
  };
};

const writeMetadata = () => {
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2), "utf8");
};

const run = async () => {
  const command = process.argv[2] || "status";

  await client.connect();

  try {
    if (command === "up") {
      const pending = migrations.filter((file) => !metadata.applied.includes(file));

      if (pending.length === 0) {
        console.log("No pending migrations.");
        return;
      }

      for (const file of pending) {
        const filePath = path.join(migrationsDir, file);
        const content = fs.readFileSync(filePath, "utf8");
        const { up } = parseMigration(content);

        if (!up) {
          console.warn(`Skipping ${file}: no -- up section found.`);
          continue;
        }

        console.log(`Running migration: ${file}`);
        await client.query("BEGIN");
        try {
          await client.query(up);
          await client.query("COMMIT");
          metadata.applied.push(file);
          writeMetadata();
          console.log(`Applied ${file}`);
        } catch (error) {
          await client.query("ROLLBACK");
          throw error;
        }
      }
    } else if (command === "down") {
      const last = metadata.applied[metadata.applied.length - 1];

      if (!last) {
        console.log("No migrations to rollback.");
        return;
      }

      const filePath = path.join(migrationsDir, last);
      const content = fs.readFileSync(filePath, "utf8");
      const { down } = parseMigration(content);

      if (!down) {
        console.error(`Migration ${last} has no -- down section.`);
        process.exit(1);
      }

      console.log(`Rolling back migration: ${last}`);
      await client.query("BEGIN");
      try {
        await client.query(down);
        await client.query("COMMIT");
        metadata.applied.pop();
        writeMetadata();
        console.log(`Rolled back ${last}`);
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      }
    } else if (command === "status") {
      console.log("Migration status:");
      migrations.forEach((file) => {
        const status = metadata.applied.includes(file) ? "applied" : "pending";
        console.log(`- ${file} [${status}]`);
      });
    } else {
      console.error("Unknown migrate command. Use: up, down, status");
      process.exit(1);
    }
  } finally {
    await client.end();
  }
};

run().catch((error) => {
  console.error("Migration failed:", error.message || error);
  process.exit(1);
});
