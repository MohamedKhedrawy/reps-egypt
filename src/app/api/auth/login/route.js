import { NextResponse } from 'next/server';
import { verifyPassword, createToken } from '@/lib/auth';
import { findUserByEmail } from '@/lib/user';

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password, rememberMe = false } = body;

        // Validate input
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Find user by email
        const user = await findUserByEmail(email);
        if (!user) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Verify password
        const isValid = await verifyPassword(password, user.password);
        if (!isValid) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Token expiration: 30 days if remember me, else 1 day
        const tokenExpiry = rememberMe ? '30d' : '1d';
        const cookieMaxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24; // 30 days or 1 day

        // Create JWT token with appropriate expiry
        const token = await createToken({
            userId: user._id.toString(),
            email: user.email,
        }, tokenExpiry);

        // Create response with token
        const response = NextResponse.json({
            message: 'Login successful',
            user: {
                id: user._id.toString(),
                email: user.email,
                fullName: user.fullName,
            },
        });

        // Set HTTP-only cookie with appropriate maxAge
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: cookieMaxAge,
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

