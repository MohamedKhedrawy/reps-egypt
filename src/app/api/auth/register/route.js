import { NextResponse } from 'next/server';
import { hashPassword, createToken } from '@/lib/auth';
import { findUserByEmail, createUser } from '@/lib/user';

export async function POST(request) {
    try {
        const body = await request.json();
        const { 
            email, 
            password, 
            firstName,
            lastName,
            fullName: providedFullName,
            // Extended fields
            phone,
            birthDate,
            age,
            socialMedia,
            specialization,
            uploadedFiles,
            termsAccepted,
            role
        } = body;

        // Build fullName from firstName + lastName if not provided directly
        const fullName = providedFullName || `${firstName || ''} ${lastName || ''}`.trim();

        // Validate required fields
        if (!email || !password || !fullName) {
            return NextResponse.json(
                { error: 'Email, password, and name are required', field: 'general' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format', field: 'email' },
                { status: 400 }
            );
        }

        // Validate password strength
        if (password.length < 8) {
            return NextResponse.json(
                { error: 'Password must be at least 8 characters', field: 'password' },
                { status: 400 }
            );
        }

        // Validate phone if provided
        if (phone) {
            const phoneRegex = /^01[0125][0-9]{8}$/;
            if (!phoneRegex.test(phone)) {
                return NextResponse.json(
                    { error: 'Invalid Egyptian phone number format', field: 'phone' },
                    { status: 400 }
                );
            }
        }

        // Check if user already exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email already exists', field: 'email' },
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
            uploadedFiles,
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
