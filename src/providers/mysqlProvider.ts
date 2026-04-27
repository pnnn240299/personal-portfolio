import pool from "@/lib/mysqlClient";

export default function mysqlProvider(table) {
  return {
    async fetchData() {
      const [rows] = await pool.query(`SELECT * FROM ${table}`);
      return rows;
    },

    async getItem(id) {
      const [rows] = await pool.query(
        `SELECT * FROM ${table} WHERE id = ?`,
        [id]
      );
      return rows[0];
    },

    async getItemByField(field, value) {
      const [rows] = await pool.query(
        `SELECT * FROM ${table} WHERE ?? = ?`,
        [field, value]
      );
      return rows[0];
    },

    async createItem(data) {
      const [result] = await pool.query(
        `INSERT INTO ${table} SET ?`,
        [data]
      );
      return { id: result.insertId, ...data };
    },

    async updateItem(id, data) {
      await pool.query(
        `UPDATE ${table} SET ? WHERE id = ?`,
        [data, id]
      );
      return { id, ...data };
    },

    async updateItemByField(field, value, data) {
      await pool.query(
        `UPDATE ${table} SET ? WHERE ?? = ?`,
        [data, field, value]
      );
      return { [field]: value, ...data };
    },

    async deleteItem(id) {
      await pool.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
    },

    async deleteItemByField(field, value) {
      await pool.query(`DELETE FROM ${table} WHERE ?? = ?`, [field, value]);
    },
  };
}
