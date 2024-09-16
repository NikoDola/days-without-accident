import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define the protected routes
const protectedRoutes = [
  '/add',
  '/null/add',
  '/settings',
  '/null/settings',
  '/documents',
  '/null/documents',
  '/search',
  '/null/search'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname is in the protectedRoutes list
  if (protectedRoutes.includes(pathname)) {
    const isAuthenticated = false; // Replace with your actual authentication logic
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// Configure the matcher to include all specified paths
export const config = {
  matcher: [
    '/add/:path*',
    '/null/add/:path*',
    '/settings/:path*',
    '/null/settings/:path*',
    '/documents/:path*',
    '/null/documents/:path*',
    '/search/:path*',
    '/null/search/:path*'
  ],
};
