import { NextResponse } from 'next/server';

export async function GET() {
    const healthCheck = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        mongodb: {
            configured: !!process.env.MONGODB_URI,
            status: process.env.MONGODB_URI ? 'connection configured' : 'not configured'
        }
    };

    try {
        // If MongoDB is configured, we could add a connection check here
        if (process.env.MONGODB_URI) {
            // Dynamic import to avoid errors when MongoDB is not configured
            const { default: clientPromise } = await import('@/lib/mongodb');
            const client = await clientPromise;
            await client.db().admin().ping();
            healthCheck.mongodb.status = 'connected';
        }
    } catch (error) {
        healthCheck.mongodb.status = 'connection error';
        healthCheck.mongodb.error = error.message;
    }

    return NextResponse.json(healthCheck, { status: 200 });
}
