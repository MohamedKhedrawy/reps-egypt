import { NextResponse } from 'next/server';
import { getUsersPaginated, searchUsers } from '@/lib/user';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search');
        const status = searchParams.get('status');
        const role = searchParams.get('role');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');
        const skip = (page - 1) * limit;

        // Build filter
        const filter = {};
        if (status) filter.status = status;
        if (role) filter.role = role;

        let users;
        if (search) {
            users = await searchUsers(search, filter);
        } else {
            users = await getUsersPaginated(filter, { limit, skip });
        }

        // Format for frontend
        const formatted = users.map(user => ({
            id: user._id.toString(),
            name: user.fullName,
            email: user.email,
            phone: user.phone,
            role: user.role || 'user',
            status: user.status || 'pending',
            specialization: user.specialization,
            createdAt: user.createdAt,
        }));

        return NextResponse.json({ users: formatted });
    } catch (error) {
        console.error('Users list error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}
