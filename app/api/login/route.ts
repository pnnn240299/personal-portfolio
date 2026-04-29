import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import pool from '@/lib/mysqlClient'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const connection = await pool.getConnection()
    
    const [rows] = await connection.execute(
      'SELECT id, name, email, password, role FROM users WHERE email = ?',
      [email]
    )
    connection.release()

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json(
        { error: 'Invalid credentials - user not found' },
        { status: 401 }
      )
    }

    const adminUser = rows[0] as any

    const isPasswordValid = await bcrypt.compare(password, adminUser.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials - wrong password'+ password},
        { status: 401 }
      )
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = adminUser

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    return NextResponse.json(
      { error: 'Login failed', details: error.message },
      { status: 500 }
    )
  }
}
