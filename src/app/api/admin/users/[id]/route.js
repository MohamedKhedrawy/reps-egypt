import { NextResponse } from 'next/server';
import { findUserById, updateUser, updateUserStatus, deleteUser } from '@/lib/user';

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const user = await findUserById(id);
        
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const { password, ...userData } = user;
        return NextResponse.json({ user: { ...userData, id: user._id.toString() } });
    } catch (error) {
        console.error('Get user error:', error);
        return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
    }
}

export async function PATCH(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const adminId = request.headers.get('x-user-id');

        // Check if this is a status update
        if (body.status && ['approved', 'rejected', 'pending'].includes(body.status)) {
            await updateUserStatus(id, body.status, adminId);
            return NextResponse.json({ message: `User ${body.status} successfully` });
        }

        // Otherwise update user data
        const { status, ...updateData } = body;
        if (status) updateData.status = status;
        
        await updateUser(id, updateData);
        return NextResponse.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Update user error:', error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        await deleteUser(id);
        return NextResponse.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Delete user error:', error);
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
    }
}
