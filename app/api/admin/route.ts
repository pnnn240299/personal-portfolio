import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import pool from '@/lib/mysqlClient'

export async function GET() {
  try {
    const connection = await pool.getConnection()
    const [rows] = await connection.execute(
      'SELECT id, username, email, created_at, updated_at FROM admin_users ORDER BY created_at DESC'
    )
    connection.release()
    
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Error fetching admin users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch admin users' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, email, password } = body

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'Username, email, and password are required' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const connection = await pool.getConnection()
    const [result] = await connection.execute(
      'INSERT INTO admin_users (username, email, password, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
      [username, email, hashedPassword]
    )
    connection.release()

    const { password: _, ...adminData } = body

    return NextResponse.json(
      { id: (result as any).insertId, ...adminData },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating admin user:', error)
    return NextResponse.json(
      { error: 'Failed to create admin user' },
      { status: 500 }
    )
  }
}
