import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import pool from '@/lib/mysqlClient'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const connection = await pool.getConnection()
    const [rows] = await connection.execute(
      'SELECT id, username, email, created_at, updated_at FROM admin_users WHERE id = ?',
      [params.id]
    )
    connection.release()

    if (Array.isArray(rows) && rows.length === 0) {
      return NextResponse.json(
        { error: 'Admin user not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(rows[0])
  } catch (error) {
    console.error('Error fetching admin user:', error)
    return NextResponse.json(
      { error: 'Failed to fetch admin user' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { username, email, password } = body

    if (!username || !email) {
      return NextResponse.json(
        { error: 'Username and email are required' },
        { status: 400 }
      )
    }

    const connection = await pool.getConnection()
    let updateQuery = 'UPDATE admin_users SET username = ?, email = ?, updated_at = NOW()'
    let updateParams = [username, email]

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10)
      updateQuery += ', password = ?'
      updateParams.push(hashedPassword)
    }

    updateQuery += ' WHERE id = ?'
    updateParams.push(params.id)

    const [result] = await connection.execute(updateQuery, updateParams)
    connection.release()

    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { error: 'Admin user not found' },
        { status: 404 }
      )
    }

    const { password: _, ...adminData } = body

    return NextResponse.json({ id: params.id, ...adminData })
  } catch (error) {
    console.error('Error updating admin user:', error)
    return NextResponse.json(
      { error: 'Failed to update admin user' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const connection = await pool.getConnection()
    const [result] = await connection.execute(
      'DELETE FROM admin_users WHERE id = ?',
      [params.id]
    )
    connection.release()

    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { error: 'Admin user not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Admin user deleted successfully' })
  } catch (error) {
    console.error('Error deleting admin user:', error)
    return NextResponse.json(
      { error: 'Failed to delete admin user' },
      { status: 500 }
    )
  }
}
