import { NextResponse } from 'next/server';
import { 
    deleteOrganizationEmail, 
    setDefaultEmail 
} from '@/lib/organizationEmails';

// DELETE /api/admin/emails/[id] - Delete organization email
export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        
        const result = await deleteOrganizationEmail(id);
        
        if (result.deletedCount === 0) {
            return NextResponse.json(
                { error: 'Email not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete organization email:', error);
        return NextResponse.json(
            { error: 'Failed to delete email' },
            { status: 500 }
        );
    }
}

// PATCH /api/admin/emails/[id] - Update organization email (set as default)
export async function PATCH(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { isDefault } = body;

        if (isDefault) {
            await setDefaultEmail(id);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to update organization email:', error);
        return NextResponse.json(
            { error: 'Failed to update email' },
            { status: 500 }
        );
    }
}
