import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Prevent logged-in users from accessing the login page
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (pathname === '/login') {
    if (token) {
      const url = req.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  // Prevent premium users from accessing the /premium page
  if (pathname === '/premium') {
    // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (token?.role === 'premium') {
      const url = req.nextUrl.clone();
      url.pathname = '/'; // Redirect premium users to home or dashboard
      return NextResponse.redirect(url);
    }
  }

  // Define paths that require premium role
  const premiumPaths = ['/interventions', '/outcomes', '/medications', '/supplements', '/membership-premium'];

  // Protect premium content
  if (premiumPaths.some((path) => pathname.startsWith(path))) {
    // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    if (token.role !== 'premium') {
      const url = req.nextUrl.clone();
      url.pathname = '/premium';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Middleware applies only to specific paths
export const config = {
  matcher: [
    '/interventions/:path*',
    '/outcomes/:path*',
    '/medications/:path*',
    '/supplements/:path*',
    '/login',
    '/membership-premium',
    '/premium', // Add premium page to matcher
  ],
};
