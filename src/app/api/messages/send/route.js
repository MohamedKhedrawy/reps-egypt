import { NextResponse } from 'next/server';
import { sendCoachMessage } from '@/lib/email';
import { findUserById } from '@/lib/user';
import { messageSchema } from '@/lib/schemas';

export async function POST(request) {
    try {
        // 1. Authentication Check
        const userId = request.headers.get('x-user-id');
        const userEmail = request.headers.get('x-user-email');
        
        if (!userId || !userEmail) {
            return NextResponse.json(
                { error: 'Unauthorized. Please log in to send messages.' },
                { status: 401 }
            );
        }

        // 2. Validate Input
        const body = await request.json();
        
        const validation = messageSchema.safeParse(body);
        if (!validation.success) {
            const firstError = validation.error.errors[0];
            return NextResponse.json(
                { error: firstError.message },
                { status: 400 }
            );
        }

        const { coachId, message } = validation.data;

        // 3. Resolve Coach Email (Server-Side)
        const coach = await findUserById(coachId);
        
        if (!coach) {
            return NextResponse.json(
                { error: 'Coach not found' },
                { status: 404 }
            );
        }

        if (!coach.email) {
             return NextResponse.json(
                { error: 'Coach does not have a contact email configured' },
                { status: 400 } // Or 404
            );
        }

        // 4. Get User Details (Name)
        // We have ID and Email from headers, but need name for "From" field.
        // Option 1: Fetch from DB. Option 2: Pass in body (insecure/untrusted).
        // Best: Fetch from DB.
        const sender = await findUserById(userId);
        const fromName = sender?.fullName || 'REPS Egypt User';

        // 5. Send Email
        await sendCoachMessage({
            fromName,
            fromEmail: userEmail,
            toEmail: coach.email,
            message
        });

        return NextResponse.json({ success: true, message: 'Message sent successfully' });

    } catch (error) {
        console.error('Message send error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to send message.' },
            { status: 500 }
        );
    }
}
