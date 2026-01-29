import { NextResponse } from 'next/server';
import { findUserByEmail } from '@/lib/user';

/**
 * Check if an email already exists in the database
 * Used for real-time validation during registration
 */
export async function POST(request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        const existingUser = await findUserByEmail(email);
        
        return NextResponse.json({
            exists: !!existingUser
        });
    } catch (error) {
        console.error('Check email error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
