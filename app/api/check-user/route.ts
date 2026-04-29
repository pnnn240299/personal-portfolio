import { NextResponse } from 'next/server'
import pool from '@/lib/mysqlClient'

export async function GET() {
  try {
    const connection = await pool.getConnection()
    
    // Check if users table exists
    const [tables] = await connection.query("SHOW TABLES LIKE 'users'")
    
    if (!Array.isArray(tables) || tables.length === 0) {
      return NextResponse.json({
        error: 'Users table does not exist',
        tables: tables
      })
    }
    
    // Get all users
    const [users] = await connection.query('SELECT id, name, email, role, created_at FROM users')
    
    connection.release()
    
    return NextResponse.json({
      success: true,
      tableExists: true,
      userCount: Array.isArray(users) ? users.length : 0,
      users: users
    })
  } catch (error) {
    console.error('Check user error:', error)
    return NextResponse.json({
      error: error.message,
      code: error.code,
      errno: error.errno
    }, { status: 500 })
  }
}
