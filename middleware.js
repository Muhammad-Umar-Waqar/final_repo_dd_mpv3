import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

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














// import { NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt';

// export async function middleware(req) {
//   const { pathname } = req.nextUrl;

//   // Retrieve token
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   console.log("Token:", token);

//   // If no token is found and the user tries to access protected routes, redirect to login
//   if (!token) {
//     const protectedPaths = ['/dashboard', '/interventions', '/outcomes', '/medications', '/supplements', '/membership-premium'];
    
//     if (protectedPaths.some((path) => pathname.startsWith(path))) {
//       const url = req.nextUrl.clone();
//       url.pathname = '/login';
//       return NextResponse.redirect(url);
//     }
//     return NextResponse.next();
//   }

//   // Prevent logged-in users from accessing the login page
//   if (pathname === '/login' && token) {
//     const url = req.nextUrl.clone();
//     url.pathname = '/';
//     return NextResponse.redirect(url);
//   }

//   // Admin role check
//   if (token.role === 'admin') {
//     if (pathname === '/login') {
//       const url = req.nextUrl.clone();
//       url.pathname = '/dashboard';
//       return NextResponse.redirect(url);
//     }
//     return NextResponse.next();
//   }

//   // Restrict access to the admin dashboard for non-admin users
//   if (pathname.startsWith('/dashboard') && token.role !== 'admin') {
//     const url = req.nextUrl.clone();
//     url.pathname = '/404';
//     return NextResponse.redirect(url);
//   }

//   // Prevent premium users from accessing the /premium page
//   if (pathname === '/premium' && token.role === 'premium') {
//     const url = req.nextUrl.clone();
//     url.pathname = '/';
//     return NextResponse.redirect(url);
//   }

//   // Define paths that require premium role
//   const premiumPaths = ['/interventions', '/outcomes', '/medications', '/supplements', '/membership-premium'];

//   // Protect premium content
//   if (premiumPaths.some((path) => pathname.startsWith(path)) && token.role !== 'premium') {
//     const url = req.nextUrl.clone();
//     url.pathname = '/premium';
//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// }

// // Middleware applies only to specific paths
// export const config = {
//   matcher: [
//     '/dashboard/:path*', 
//     '/interventions/:path*',
//     '/outcomes/:path*',
//     '/medications/:path*',
//     '/supplements/:path*',
//     '/login',
//     '/membership-premium',
//     '/premium',
//   ],
// };
