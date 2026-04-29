import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path is for admin routes (excluding auth pages)
  if (pathname.startsWith('/admin')) {
    // Get the admin user from cookies
    const adminUser = request.cookies.get('adminUser');
    
    if (!adminUser) {
      // Redirect to sign-in page if not authenticated
      const signInUrl = new URL('/auth/signin', request.url);
      return NextResponse.redirect(signInUrl);
    }
    
    try {
      // Verify the stored user data is valid
      const user = JSON.parse(adminUser.value);
      if (!user || !user.email) {
        // Invalid user data, redirect to sign-in
        const signInUrl = new URL('/auth/signin', request.url);
        const response = NextResponse.redirect(signInUrl);
        response.cookies.delete('adminUser');
        return response;
      }
    } catch (error) {
      // Invalid JSON, redirect to sign-in
      const signInUrl = new URL('/auth/signin', request.url);
      const response = NextResponse.redirect(signInUrl);
      response.cookies.delete('adminUser');
      return response;
    }
  }
  
  // Allow access to auth pages and non-admin routes
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
