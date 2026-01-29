import { NextResponse } from 'next/server';
import { hashPassword, createToken } from '@/lib/auth';
import { findUserByEmail, createUser } from '@/lib/user';

export async function POST(request) {
    try {
        const body = await request.json();
        const { 
            email, 
            password, 
            fullName,
            // Extended fields
            phone,
            birthDate,
            age,
            socialMedia,
            specialization,
            termsAccepted,
            role
        } = body;

        // Validate required fields
        if (!email || !password || !fullName) {
            return NextResponse.json(
                { error: 'Email, password, and full name are required' },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: 'Password must be at least 6 characters' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 409 }
            );
        }

        // Hash password and create user with all fields
        const hashedPassword = await hashPassword(password);
        const result = await createUser({
            email,
            password: hashedPassword,
            fullName,
            phone,
            birthDate,
            age,
            socialMedia,
            specialization,
            termsAccepted,
            role: role || 'trainer'
        });

        // Create JWT token
        const token = await createToken({
            userId: result.insertedId.toString(),
            email,
            role: role || 'trainer'
        });

        // Create response with token in cookie
        const response = NextResponse.json(
            {
                message: 'User registered successfully',
                user: {
                    id: result.insertedId.toString(),
                    email,
                    fullName,
                    role: role || 'trainer',
                    status: 'pending'
                },
            },
            { status: 201 }
        );

        // Set HTTP-only cookie
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Register error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
