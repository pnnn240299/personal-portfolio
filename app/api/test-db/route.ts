import { NextResponse } from 'next/server';
import pool from '@/lib/mysqlClient';

export async function GET() {
  try {
    // Test basic connection
    const [rows] = await pool.query('SELECT 1 as test');
    
    // Test if users table exists
    const [adminTables] = await pool.query("SHOW TABLES LIKE 'users'");
    
    // Test users table structure and data
    let adminStructure = null;
    let adminUsers = null;
    if (Array.isArray(adminTables) && adminTables.length > 0) {
      const [columns] = await pool.query('DESCRIBE users');
      adminStructure = columns;
      
      const [users] = await pool.query('SELECT id, name, email, role, created_at FROM users');
      adminUsers = users;
    }
    
    // Test if blogs table exists
    const [tables] = await pool.query("SHOW TABLES LIKE 'blogs'");
    
    // Test blogs table structure
    let structure = null;
    if (Array.isArray(tables) && tables.length > 0) {
      const [columns] = await pool.query('DESCRIBE blogs');
      structure = columns;
    }
    
    return NextResponse.json({
      connection: 'OK',
      test: rows,
      adminUsersTableExists: Array.isArray(adminTables) && adminTables.length > 0,
      adminUsersStructure: adminStructure,
      adminUsers: adminUsers,
      blogsTableExists: Array.isArray(tables) && tables.length > 0,
      blogsStructure: structure
    });
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({
      error: error.message,
      code: error.code,
      errno: error.errno
    }, { status: 500 });
  }
}
