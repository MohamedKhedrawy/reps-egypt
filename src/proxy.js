import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret-change-me');

// Routes that require authentication
const protectedRoutes = ['/api/auth/me', '/api/messages/send'];

// Routes that require admin role
const adminRoutes = ['/admin', '/api/admin'];

export async function proxy(request) {
    const { pathname } = request.nextUrl;

    // Check route type
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));

    if (!isProtectedRoute && !isAdminRoute) {
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
        // For page routes, redirect to login
        if (isAdminRoute && !pathname.startsWith('/api/')) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        return NextResponse.json(
            { error: 'Authentication required' },
            { status: 401 }
        );
    }

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        
        // Check admin role for admin routes
        if (isAdminRoute) {
            if (payload.role !== 'admin') {
                // For page routes, redirect to home
                if (!pathname.startsWith('/api/')) {
                    return NextResponse.redirect(new URL('/', request.url));
                }
                return NextResponse.json(
                    { error: 'Admin access required' },
                    { status: 403 }
                );
            }
        }
        
        // Add user info to request headers so API routes can access it
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('x-user-id', payload.userId);
        requestHeaders.set('x-user-email', payload.email);
        requestHeaders.set('x-user-role', payload.role || 'user');

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    } catch (error) {
        // For page routes, redirect to login
        if (isAdminRoute && !pathname.startsWith('/api/')) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        return NextResponse.json(
            { error: 'Invalid or expired token' },
            { status: 401 }
        );
    }
}

export const config = {
    matcher: ['/api/auth/me/:path*', '/admin/:path*', '/api/admin/:path*', '/api/messages/send'],
};

