import { NextResponse } from 'next/server'
import { getDynamicRoutes } from '@/admin/utils/dynamicRoutes'

export async function GET() {
  try {
    const routes = await getDynamicRoutes()
    return NextResponse.json(routes)
  } catch (error) {
    console.error('Error getting routes:', error)
    
    // Fallback routes
    const fallbackRoutes = [
      {
        name: "Dashboard",
        layout: "/admin",
        path: "dashboard",
        icon: "📊",
      },
    ]
    
    return NextResponse.json(fallbackRoutes)
  }
}
