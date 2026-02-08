import { NextResponse } from 'next/server';
import { hashPassword, createToken } from '@/lib/auth';
import { findUserByEmail, createUser } from '@/lib/user';
import { registerSchema } from '@/lib/schemas';

export async function POST(request) {
    try {
        const body = await request.json();
        // We will validate 'body' directly with Zod below
        
        // Parse and validate with Zod
        // We pass the raw body to the schema. 
        // Note: The schema handles 'role' validation (enums: trainer, trainee)
        const validation = registerSchema.safeParse(body);

        if (!validation.success) {
            // Return the first error message
            const firstError = validation.error.errors[0];
            return NextResponse.json(
                { error: firstError.message, field: firstError.path[0] },
                { status: 400 }
            );
        }

        const validData = validation.data;
        
        // Destructure validated data
        const { 
            email, 
            password, 
            firstName,
            lastName,
            fullName: providedFullName,
            phone,
            birthDate,
            age,
            gender,
            governorate,
            socialMedia,
            specialization,
            role, // This is now guaranteed to be 'trainer' or 'trainee' by Zod
            termsAccepted
        } = validData;

        // Build fullName if needed
        const fullName = providedFullName || `${firstName || ''} ${lastName || ''}`.trim();
        if (!fullName) {
             return NextResponse.json({ error: "Full name is required", field: "fullName" }, { status: 400 });
        }

        // Additional Logic: Check if user exists (Zod doesn't check DB)

        // Check if user already exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email already exists', field: 'email' },
                { status: 409 }
            );
        }

        // Create user
        const hashedPassword = await hashPassword(password);
        const result = await createUser({
            email,
            password: hashedPassword,
            fullName,
            phone,
            birthDate,
            age,
            gender,
            governorate,
            socialMedia,
            specialization,
            uploadedFiles: body.uploadedFiles, // Files not in schema yet, pass through
            termsAccepted,
            role // Already sanitized by Zod
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
