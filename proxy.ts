import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './auth';

export async function proxy(request: NextRequest) {
    const session = await auth();
    if (!session) {
        if (request.nextUrl.pathname.startsWith('/issues/')) {
          return NextResponse.redirect(new URL(`/api/auth/signin`, request.url));
        } else {
          return NextResponse.redirect(new URL('/', request.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/issues/:path*',
    ]
}

