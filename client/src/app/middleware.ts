import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const role = request.cookies.get('userRole')?.value;

  if (request.nextUrl.pathname.startsWith('/student') && role !== 'student') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/provider') && role !== 'provider') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/student/:path*', '/provider/:path*', '/admin/:path*'],
};
