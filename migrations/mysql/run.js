import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import { fileURLToPath } from "url";

// Load .env.local first, then fallback to .env
dotenv.config({ path: '.env.local' });
if (!process.env.MYSQL_DATABASE) {
  dotenv.config(); // Load .env as fallback
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const migrationsDir = __dirname;
const metadataPath = path.join(migrationsDir, "schema_migrations.json");

const host = process.env.MYSQL_HOST || "localhost";
const port = Number(process.env.MYSQL_PORT || 3306);
const user = process.env.MYSQL_USER || "root";
const password = process.env.MYSQL_PASSWORD || "";
const database = process.env.MYSQL_DATABASE;

if (!database) {
  console.error("❌ Missing MYSQL_DATABASE in .env or .env.local. Please set it before running migrations.");
  console.error("💡 Create .env.local file with:");
  console.error("   MYSQL_HOST=localhost");
  console.error("   MYSQL_USER=root");
  console.error("   MYSQL_PASSWORD=your_password");
  console.error("   MYSQL_DATABASE=portfolio_db");
  process.exit(1);
}

console.log("📋 MySQL Connection Config:");
console.log(`  Host: ${host}`);
console.log(`  Port: ${port}`);
console.log(`  User: ${user}`);
console.log(`  Database: ${database}`);
console.log("");

const pool = mysql.createPool({
  host,
  port,
  user,
  password,
  database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

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

  // Split SQL statements by semicolon and clean up
  const splitStatements = (sql) => {
    return sql
      .split(";")
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0);
  };

  return {
    up: splitStatements(sections.up.join("\n")),
    down: splitStatements(sections.down.join("\n")),
  };
};

const writeMetadata = async (connection) => {
  // Insert/update migration records in database
  console.log(`💾 Writing migration metadata to database...`);
  for (const migrationFile of metadata.applied) {
    try {
      const [result] = await connection.query(
        'INSERT INTO schema_migrations (migration_file, executed_at, success) VALUES (?, NOW(), 1) ON DUPLICATE KEY UPDATE executed_at = NOW(), success = 1',
        [migrationFile]
      );
      console.log(`✅ Recorded migration: ${migrationFile}, result:`, result);
    } catch (error) {
      console.error(`Failed to record migration ${migrationFile}:`, error);
    }
  }
  
  // Verify records were written
  try {
    const [records] = await connection.query('SELECT migration_file, executed_at FROM schema_migrations ORDER BY executed_at DESC LIMIT 5');
    console.log(`📋 Recent migration records:`, records);
  } catch (error) {
    console.error('Failed to verify migration records:', error);
  }
};

const run = async () => {
  const command = process.argv[2] || "status";
  let connection;

  try {
    console.log(`🔄 Attempting to connect to MySQL...`);
    connection = await pool.getConnection();
    console.log("✅ Connected to MySQL successfully!");
    console.log(`📊 Connection ID: ${connection.threadId}`);
    console.log(`🔗 Database: ${database}`);

    if (command === "up") {
      const pending = migrations.filter((file) => !metadata.applied.includes(file));
      if (pending.length === 0) {
        console.log("✓ No pending migrations.");
        return;
      }
      console.log(`📦 Found ${pending.length} pending migration(s):\n`);
      
      for (const file of pending) {
        const filePath = path.join(migrationsDir, file);
        const content = fs.readFileSync(filePath, "utf8");
        const { up } = parseMigration(content);
        if (!up || up.length === 0) {
          console.warn(`⏭️  Skipping ${file}: missing -- up section.`);
          continue;
        }
        console.log(`▶️  Running migration: ${file}`);
        await connection.beginTransaction();
        try {
          for (const statement of up) {
            if (statement.length > 0) {
              console.log(`🔧 Executing: ${statement}`);
              await connection.query(statement);
            }
          }
          await connection.commit();
          metadata.applied.push(file);
          await writeMetadata(connection);
          console.log(`✅ Applied ${file}\n`);
          
          // Verify table was created
          if (file.includes('create_portfolio_schema')) {
            const [tables] = await connection.query('SHOW TABLES');
            console.log(`📋 Tables in database:`, tables.map(t => Object.values(t)[0]));
          }
        } catch (error) {
          await connection.rollback();
          console.error(`❌ Error in migration ${file}:`);
          console.error(`   SQL Error: ${error.message}`);
          console.error(`   Code: ${error.code}`);
          console.error(`   Full error:`, error);
          throw error;
        }
      }
      console.log("🎉 All migrations completed successfully!");
    } else if (command === "down") {
      const last = metadata.applied[metadata.applied.length - 1];
      if (!last) {
        console.log("ℹ️  No migrations to rollback.");
        return;
      }
      const filePath = path.join(migrationsDir, last);
      const content = fs.readFileSync(filePath, "utf8");
      const { down } = parseMigration(content);
      if (!down || down.length === 0) {
        console.error(`❌ Migration ${last} has no -- down section.`);
        process.exit(1);
      }
      console.log(`⏮️  Rolling back migration: ${last}`);
      await connection.beginTransaction();
      try {
        for (const statement of down) {
          if (statement.length > 0) {
            await connection.query(statement);
          }
        }
        await connection.commit();
        metadata.applied.pop();
        await writeMetadata(connection);
        console.log(`✅ Rolled back ${last}`);
      } catch (error) {
        await connection.rollback();
        console.error(`❌ Error rolling back ${last}:`);
        console.error(`   SQL Error: ${error.message}`);
        throw error;
      }
    } else if (command === "status") {
      console.log("📊 Migration status:");
      if (migrations.length === 0) {
        console.log("  (no migrations found)");
        return;
      }
      migrations.forEach((file) => {
        const status = metadata.applied.includes(file) ? "✅ applied" : "⏳ pending";
        console.log(`- ${file} [${status}]`);
      });
    } else {
      console.error("❌ Unknown migrate command. Use: up, down, or status.");
      process.exit(1);
    }
  } catch (error) {
    console.error("\n❌ Migration failed!");
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.error("Error details:");
    console.error(`  Message: ${error.message}`);
    console.error(`  Code: ${error.code}`);
    console.error(`  Stack:`, error.stack);
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    
    if (error.code === "ECONNREFUSED") {
      console.error("\n💡 Connection refused. Make sure:");
      console.error("   1. MySQL server is running");
      console.error("   2. Host is correct: " + host);
      console.error("   3. Port is correct: " + port);
      console.error("   4. Credentials are correct");
    }
    
    process.exit(1);
  } finally {
    if (connection) {
      connection.release();
    }
    await pool.end();
  }
};

run().catch((error) => {
  // This catch is for any unhandled errors in the run function
  process.exit(1);
});

