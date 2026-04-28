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
      try {
        console.log(`Creating item in ${table} with data:`, JSON.stringify(data, null, 2));
        
        const [result] = await pool.query(
          `INSERT INTO ${table} SET ?`,
          [data]
        );
        const insertId = (result as any).insertId;
        console.log(`Successfully created item with ID: ${insertId}`);
        return { id: insertId, ...data };
      } catch (error) {
        console.error(`Error creating item in ${table}:`, error);
        console.error(`Data being inserted:`, JSON.stringify(data, null, 2));
        console.error(`SQL Error Code:`, (error as any).code);
        console.error(`SQL Error Message:`, (error as any).message);
        throw new Error(`Failed to create item: ${(error as any).message}`);
      }
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
