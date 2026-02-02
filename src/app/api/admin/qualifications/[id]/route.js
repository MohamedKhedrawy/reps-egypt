import { NextResponse } from 'next/server';
import { updateQualificationChangeStatus } from '@/lib/qualifications';

export async function PATCH(request, { params }) {
    try {
        const { id } = await params;
        const { status } = await request.json();
        const adminId = request.headers.get('x-user-id');

        if (!['approved', 'rejected'].includes(status)) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
        }

        await updateQualificationChangeStatus(id, status, adminId);
        
        return NextResponse.json({ message: `Request ${status} successfully` });
    } catch (error) {
        console.error('Update qualification change error:', error);
        return NextResponse.json({ error: 'Failed to update request' }, { status: 500 });
    }
}
