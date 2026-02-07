import { NextResponse } from 'next/server';
import { findUserById, updateUser } from '@/lib/user';

export async function POST(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { message, timestamp } = body;

        if (!message || !message.trim()) {
            return NextResponse.json({ error: 'Note message is required' }, { status: 400 });
        }

        const user = await findUserById(id);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Initialize activityNotes array if it doesn't exist
        if (!user.activityNotes) user.activityNotes = [];

        // Add new note
        const newNote = {
            message: message.trim(),
            timestamp: timestamp || new Date().toISOString(),
        };

        user.activityNotes.push(newNote);

        // Keep only last 100 notes
        if (user.activityNotes.length > 100) {
            user.activityNotes = user.activityNotes.slice(-100);
        }

        // Update user
        await updateUser(id, { activityNotes: user.activityNotes });

        return NextResponse.json({ notes: user.activityNotes });
    } catch (error) {
        console.error('Add note error:', error);
        return NextResponse.json({ error: 'Failed to add note' }, { status: 500 });
    }
}
