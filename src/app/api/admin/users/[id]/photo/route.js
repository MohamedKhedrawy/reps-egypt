import { NextResponse } from 'next/server';
import { findUserById, updateUser } from '@/lib/user';

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        const userRole = request.headers.get('x-user-role');

        // Only admins can delete user photos
        if (userRole !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized: Only admins can delete photos' }, { status: 403 });
        }

        const user = await findUserById(id);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Delete the photo
        await updateUser(id, { profilePhoto: null });

        return NextResponse.json({ 
            message: 'Photo deleted successfully',
            profilePhoto: null 
        });
    } catch (error) {
        console.error('Delete photo error:', error);
        return NextResponse.json({ error: 'Failed to delete photo' }, { status: 500 });
    }
}
