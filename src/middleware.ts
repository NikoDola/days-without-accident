import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(request) {
  console.log('loading')
  const cookieStore = cookies();
  const userId = cookieStore.get('user_id');
  const { pathname } = request.nextUrl;


  // Allow access to home and login pages for unauthenticated users
  if (!userId && pathname !== '/' && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow access to all pages for authenticated users
  return NextResponse.next();
}

// Apply middleware to specific paths
export const config = {
  matcher: ['/admin/:path*', '/other-protected-routes/:path*'], // Add any other protected routes here
};
