import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { i18n } from './i18n-config';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret-change-me');

// Routes that require authentication
const protectedRoutes = ['/api/auth/me', '/api/messages/send'];

// Routes that require admin role
const adminRoutes = ['/admin', '/api/admin'];

function getLocale(request) {
  const negotiatorHeaders = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  try {
    return matchLocale(languages, locales, i18n.defaultLocale);
  } catch (e) {
    return i18n.defaultLocale;
  }
}

export async function proxy(request) {
    const { pathname } = request.nextUrl;

    // 1. i18n Middleware Logic
    // Skip API routes and static files from i18n handling
    if (
        !pathname.startsWith('/api') &&
        !pathname.startsWith('/_next') &&
        !pathname.includes('.') // Skip files (images, etc)
    ) {
        const pathnameIsMissingLocale = i18n.locales.every(
            (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
        );

        // Redirect if there is no locale
        if (pathnameIsMissingLocale) {
            const locale = getLocale(request);
            return NextResponse.redirect(
                new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
            );
        }
    }

    // 2. Auth/Admin Logic (Preserved)
    // Check route type
    // Note: pathname now might include locale, so we need to check ignoring locale for page protections
    // But API routes don't have locale, so logic remains simpler for API.
    // For admin pages like /en/admin, we need to handle that.
    
    // Helper to strip locale for checking paths
    const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, '') || '/';

    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    // Admin route check needs to handle both /api/admin (no locale) and /en/admin (locale)
    const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route) || pathWithoutLocale.startsWith(route));

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
            // Redirect to localized login
            const locale = pathname.match(/^\/(en|ar)/)?.[1] || i18n.defaultLocale;
            return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
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
            // Exception: Allow users to update their own profile via /api/admin/users/[id]
            const userProfileMatch = pathname.match(/\/api\/admin\/users\/([a-zA-Z0-9]+)$/);
            const isSelfUpdate = userProfileMatch && userProfileMatch[1] === payload.userId;

            if (payload.role !== 'admin' && !isSelfUpdate) {
                // For page routes, redirect to home
                if (!pathname.startsWith('/api/')) {
                    const locale = pathname.match(/^\/(en|ar)/)?.[1] || i18n.defaultLocale;
                    return NextResponse.redirect(new URL(`/${locale}/`, request.url));
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
            const locale = pathname.match(/^\/(en|ar)/)?.[1] || i18n.defaultLocale;
            return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
        }
        return NextResponse.json(
            { error: 'Invalid or expired token' },
            { status: 401 }
        );
    }
}

export const config = {
    // Matcher must include "/" to trigger i18n redirect
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

