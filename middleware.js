import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Prevent logged-in users from accessing the login page
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  console.log("token", token);


  if (token?.role === 'admin') {
    if (pathname === '/login') {
      const url = req.nextUrl.clone();
      url.pathname = '/dashboard'; // Redirect admins to dashboard or home
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }


  // Restrict access to the admin dashboard for non-admin users
  if (pathname.startsWith('/dashboard')) {
    const url = req.nextUrl.clone();
    url.pathname = '/404';
    return NextResponse.redirect(url);
  }



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
    '/dashboard/:path*', // Protects all admin routes
    '/interventions/:path*',
    '/outcomes/:path*',
    '/medications/:path*',
    '/supplements/:path*',
    '/login',
    '/membership-premium',
    '/premium', // Add premium page to matcher
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
