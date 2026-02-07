import { NextResponse } from 'next/server';
import { findUserById, updateUser } from '@/lib/user';

export async function POST(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { message, severity, timestamp } = body;

        if (!message || !message.trim()) {
            return NextResponse.json({ error: 'Alert message is required' }, { status: 400 });
        }

        const user = await findUserById(id);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Initialize alerts array if it doesn't exist
        if (!user.alerts) user.alerts = [];

        // Add new alert
        const newAlert = {
            message: message.trim(),
            severity: severity || 'warning',
            timestamp: timestamp || new Date().toISOString(),
        };

        user.alerts.push(newAlert);

        // Keep only last 50 alerts
        if (user.alerts.length > 50) {
            user.alerts = user.alerts.slice(-50);
        }

        // Update user
        const updated = await updateUser(id, { alerts: user.alerts });

        return NextResponse.json({ alerts: user.alerts });
    } catch (error) {
        console.error('Add alert error:', error);
        return NextResponse.json({ error: 'Failed to add alert' }, { status: 500 });
    }
}
