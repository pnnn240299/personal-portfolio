import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import pool from '@/lib/mysqlClient'

export async function POST() {
  try {
    const connection = await pool.getConnection()
    
    // Create users table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'admin',
        is_active TINYINT(1) NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)
    
    // Check if admin user exists
    const [existingAdmin] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      ['admin@example.com']
    )
    
    let message = ''
    if (Array.isArray(existingAdmin) && existingAdmin.length === 0) {
      // Create default admin user
      const hashedPassword = await bcrypt.hash('admin123', 10)
      
      await connection.execute(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        ['Admin User', 'admin@example.com', hashedPassword, 'admin']
      )
      
      message = 'Default admin user created successfully'
    } else {
      message = 'Admin user already exists'
    }
    
    // Get all admin users
    const [adminUsers] = await connection.execute(
      'SELECT id, name, email, role, created_at FROM users'
    )
    
    connection.release()
    
    return NextResponse.json({
      success: true,
      message,
      adminUsers
    })
  } catch (error) {
    console.error('Setup admin error:', error)
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      errno: error.errno
    }, { status: 500 })
  }
}
