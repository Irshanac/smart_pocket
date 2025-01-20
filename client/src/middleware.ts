import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Log when the middleware runs
  console.log("Middleware is running...");

  // Log the requested URL
  console.log('Requested URL:', request.nextUrl.pathname);

  // Check if cookies are available
  const role = request.cookies.get('role')?.value;
  console.log('Role from cookies:', role); // Log the role to verify cookie value

  // Check if role and path match, redirect if necessary
  if (request.nextUrl.pathname.startsWith('/student') && role !== 'Student') {
    console.log('Redirecting to home: Not a Student');
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (request.nextUrl.pathname.startsWith('/provider') && role !== 'Provider') {
    console.log('Redirecting to home: Not a Provider');
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (request.nextUrl.pathname.startsWith('/admin') && role !== 'Admin') {
    console.log('Redirecting to home: Not an Admin');
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If all checks pass, continue the request
  return NextResponse.next();
}

export const config = {
  matcher: ['/student/:path*', '/provider/:path*', '/admin/:path*'],
};
