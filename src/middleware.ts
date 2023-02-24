
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
   if (req.nextUrl.pathname.startsWith('/checkout')) {
      const token = req.cookies.get('token')?.value;
      const requestedPage = req.nextUrl.pathname.replace('/checkout', '');
      if (!token) {
         return NextResponse.redirect(new URL(`/auth/login?p=/checkout${requestedPage}`, req.url))
      }
   }
   return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
   matcher: [
      '/checkout/:path*',
   ]
}