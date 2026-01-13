import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret-change-me');

// Routes that require authentication
const protectedRoutes = ['/api/auth/me'];

export async function middleware(request) {
    const { pathname } = request.nextUrl;

    // Check if this is a protected route
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    if (!isProtectedRoute) {
        return NextResponse.next();
    }

    // Get token from Authorization header or cookie
    let token = null;
    
    const authHeader = request.headers.get('Authorization');
    if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.substring(7);
    } else {
        token = request.cookies.get('token')?.value;
    }

    if (!token) {
        return NextResponse.json(
            { error: 'Authentication required' },
            { status: 401 }
        );
    }

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        
        // Add user info to request headers so API routes can access it
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('x-user-id', payload.userId);
        requestHeaders.set('x-user-email', payload.email);

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid or expired token' },
            { status: 401 }
        );
    }
}

export const config = {
    matcher: ['/api/auth/me/:path*'],
};
