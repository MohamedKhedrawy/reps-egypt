import { NextResponse } from 'next/server';
import { findUserById } from '@/lib/user';

export async function GET(request) {
    try {
        // User info is set by middleware
        const userId = request.headers.get('x-user-id');
        const email = request.headers.get('x-user-email');

        if (!userId) {
            return NextResponse.json(
                { error: 'User not authenticated' },
                { status: 401 }
            );
        }

        // Fetch full user data from database
        const user = await findUserById(userId);

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Return user data without password
        return NextResponse.json({
            user: {
                id: user._id.toString(),
                email: user.email,
                fullName: user.fullName,
                role: user.role || 'user',
                status: user.status || 'pending',
                phone: user.phone || '',
                specialization: user.specialization || '',
                bio: user.bio || '',
                location: user.location || 'Egypt',
                socialMedia: user.socialMedia || {},
                profilePhoto: user.profilePhoto || null,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        console.error('Get user error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
