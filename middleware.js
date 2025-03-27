import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("Token: ", token)                                                      

  // Admin-specific logic
  if (token?.role === 'admin') {
    if (pathname === '/login') {
      const url = req.nextUrl.clone();
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }
    return NextResponse.next(); // Allow admin to access all other pages
  }

  // Restrict dashboard to admins only
  if (pathname.startsWith('/dashboard')) {
    const url = req.nextUrl.clone();
    url.pathname = '/404';
    return NextResponse.redirect(url);
  }

  // Redirect logged-in users away from login
  if (pathname === '/login' && token) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // Redirect premium users from premium plan page
  if (pathname === '/premium' && token?.role === 'premium') {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // Protect premium content routes
  const premiumPaths = ['/interventions', '/outcomes', '/medications', '/supplements', '/membership-premium'];
  if (premiumPaths.some(path => pathname.startsWith(path))) {
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
    // Allow premium users and admins (admins handled earlier)
    if (token.role !== 'premium') {
      const url = req.nextUrl.clone();
      url.pathname = '/premium';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/interventions/:path*',
    '/outcomes/:path*',
    '/medications/:path*',
    '/supplements/:path*',
    '/login',
    '/membership-premium',
    '/premium',
  ],
};











