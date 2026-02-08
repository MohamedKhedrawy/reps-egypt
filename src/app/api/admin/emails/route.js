import { NextResponse } from 'next/server';
import { 
    getOrganizationEmails, 
    addOrganizationEmail 
} from '@/lib/organizationEmails';

// GET /api/admin/emails - List all organization emails
export async function GET() {
    try {
        const emails = await getOrganizationEmails();
        
        const formatted = emails.map(email => ({
            id: email._id.toString(),
            email: email.email,
            label: email.label,
            isDefault: email.isDefault || false,
            createdAt: email.createdAt,
        }));

        return NextResponse.json({ emails: formatted });
    } catch (error) {
        console.error('Failed to fetch organization emails:', error);
        return NextResponse.json(
            { error: 'Failed to fetch emails' },
            { status: 500 }
        );
    }
}

// POST /api/admin/emails - Add new organization email
export async function POST(request) {
    try {
        const body = await request.json();
        const { email, label, isDefault } = body;

        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { error: 'Valid email is required' },
                { status: 400 }
            );
        }

        const result = await addOrganizationEmail({ 
            email, 
            label, 
            isDefault: isDefault || false 
        });

        return NextResponse.json({ 
            success: true, 
            id: result.insertedId.toString() 
        });
    } catch (error) {
        console.error('Failed to add organization email:', error);
        return NextResponse.json(
            { error: 'Failed to add email' },
            { status: 500 }
        );
    }
}
