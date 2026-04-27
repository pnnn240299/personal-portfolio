from pathlib import Path
path = Path('src/providers/mysqlProvider.js')
text = path.read_text(encoding='utf-8')
old = '''    async deleteItem(id) {
      await pool.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
    },
  };
}
'''
new = '''    async deleteItem(id) {
      await pool.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
    },

    async deleteItemByField(field, value) {
      await pool.query(`DELETE FROM ${table} WHERE ?? = ?`, [field, value]);
    },
  };
}
'''
if old not in text:
    raise RuntimeError('Old block not found')
path.write_text(text.replace(old, new), encoding='utf-8')
print('updated')
