import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { trackPageView } from './lib/pirsch';

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
                                                    

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
  
  // Restrict intervention-table to admins only
  if (pathname.startsWith('/interventions-table')) {
    const url = req.nextUrl.clone();
    url.pathname = '/404';
    return NextResponse.redirect(url);
  }

  // Restrict outcomes-table to admins only
  if (pathname.startsWith('/outcomes-table')) {
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

  // Track page view with Pirsch
  // Only track in production mode and only for non-API routes and non-asset requests
  if (process.env.NODE_ENV === 'production') {
    const isAsset = /\.(ico|png|jpg|jpeg|gif|svg|css|js)$/i.test(pathname);
    const isApiRoute = pathname.startsWith('/api/');
    
    if (!isApiRoute && !isAsset) {
      try {
        await trackPageView(req);
        console.log('Tracked page view for:', pathname);
      } catch (error) {
        console.error('Pirsch tracking error:', error);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (.png, .jpg, .ico, etc.)
     */
    '/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$|.*\\.ico$|.*\\.svg$|.*\\.css$|.*\\.js$).*)',
  ],
};
