import { NextResponse } from 'next/server';
import { findOrganizationEmailById } from '@/lib/organizationEmails';
import { getUsersCollection } from '@/lib/user';
import { sendBulkEmail } from '@/lib/email';

// POST /api/admin/emails/send - Send bulk email to users
export async function POST(request) {
    try {
        const body = await request.json();
        const { 
            fromEmailId, 
            subject, 
            htmlContent, 
            textContent,
            filters = {} 
        } = body;

        // Validate required fields
        if (!fromEmailId || !subject || !htmlContent) {
            return NextResponse.json(
                { error: 'From email, subject, and content are required' },
                { status: 400 }
            );
        }

        // Get the sender email
        const senderEmail = await findOrganizationEmailById(fromEmailId);
        if (!senderEmail) {
            return NextResponse.json(
                { error: 'Sender email not found' },
                { status: 404 }
            );
        }

        // Build user query based on filters
        const query = { status: 'approved' }; // Only send to approved users

        // Role filter
        if (filters.roles && filters.roles.length > 0) {
            query.role = { $in: filters.roles };
        }

        // Age range filter
        if (filters.ageMin || filters.ageMax) {
            query.age = {};
            if (filters.ageMin) query.age.$gte = parseInt(filters.ageMin);
            if (filters.ageMax) query.age.$lte = parseInt(filters.ageMax);
        }

        // REPS ID range filter
        if (filters.idMin || filters.idMax) {
            query.repsId = {};
            if (filters.idMin) query.repsId.$gte = parseInt(filters.idMin);
            if (filters.idMax) query.repsId.$lte = parseInt(filters.idMax);
        }

        // Fetch users matching the filters
        const usersCollection = await getUsersCollection();
        const users = await usersCollection
            .find(query)
            .project({ email: 1, fullName: 1 })
            .toArray();

        if (users.length === 0) {
            return NextResponse.json(
                { error: 'No users match the specified filters' },
                { status: 400 }
            );
        }

        // Get recipient emails
        const recipients = users.map(u => u.email);

        // Send the bulk email
        const result = await sendBulkEmail({
            fromEmail: senderEmail.email,
            fromLabel: senderEmail.label,
            recipients,
            subject,
            htmlContent,
            textContent: textContent || subject,
        });

        return NextResponse.json({ 
            success: true, 
            sentCount: recipients.length,
            messageId: result.id 
        });
    } catch (error) {
        console.error('Failed to send bulk email:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to send emails' },
            { status: 500 }
        );
    }
}

// GET /api/admin/emails/send - Get recipient count for filters (preview)
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        
        // Parse filters from query params
        const roles = searchParams.get('roles')?.split(',').filter(Boolean) || [];
        const ageMin = searchParams.get('ageMin');
        const ageMax = searchParams.get('ageMax');
        const idMin = searchParams.get('idMin');
        const idMax = searchParams.get('idMax');

        // Build query
        const query = { status: 'approved' };

        if (roles.length > 0) {
            query.role = { $in: roles };
        }

        if (ageMin || ageMax) {
            query.age = {};
            if (ageMin) query.age.$gte = parseInt(ageMin);
            if (ageMax) query.age.$lte = parseInt(ageMax);
        }

        if (idMin || idMax) {
            query.repsId = {};
            if (idMin) query.repsId.$gte = parseInt(idMin);
            if (idMax) query.repsId.$lte = parseInt(idMax);
        }

        // Get count
        const usersCollection = await getUsersCollection();
        const count = await usersCollection.countDocuments(query);

        return NextResponse.json({ count });
    } catch (error) {
        console.error('Failed to get recipient count:', error);
        return NextResponse.json(
            { error: 'Failed to get count' },
            { status: 500 }
        );
    }
}
