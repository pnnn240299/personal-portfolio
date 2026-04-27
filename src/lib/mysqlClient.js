import mysql from "mysql2/promise";

const host = process.env.MYSQL_HOST || "localhost";
const port = Number(process.env.MYSQL_PORT || 3306);
const user = process.env.MYSQL_USER || "root";
const password = process.env.MYSQL_PASSWORD || "";
const database = process.env.MYSQL_DATABASE || "portfolio_db";

if (!database) {
  throw new Error("Missing MySQL database name. Set MYSQL_DATABASE or MYSQL_DATABASE in .env.");
}

const pool = mysql.createPool({
  host,
  port,
  user,
  password,
  database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true,
});

export default pool;
