import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import pool from '@/lib/mysqlClient'

export async function POST() {
  try {
    const connection = await pool.getConnection()
    
    // Hash the password "admin123"
    const hashedPassword = await bcrypt.hash('admin123', 10)
    console.log('New hash for admin123:', hashedPassword)
    
    // Update password for admin@example.com
    const [result] = await connection.execute(
      'UPDATE users SET password = ?, updated_at = NOW() WHERE email = ?',
      [hashedPassword, 'admin@example.com']
    )
    
    // Also try admin@portfolio.com
    const [result2] = await connection.execute(
      'UPDATE users SET password = ?, updated_at = NOW() WHERE email = ?',
      [hashedPassword, 'admin@portfolio.com']
    )
    
    connection.release()
    
    return NextResponse.json({
      success: true,
      message: 'Password reset successfully',
      updatedRows: (result as any).affectedRows + (result2 as any).affectedRows,
      hash: hashedPassword
    })
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      errno: error.errno
    }, { status: 500 })
  }
}
