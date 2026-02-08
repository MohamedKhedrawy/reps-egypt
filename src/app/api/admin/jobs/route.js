import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

const DB_NAME = process.env.MONGODB_DB || 'reps-egypt';

/**
 * GET: Fetch all jobs for admin
 */
export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db(DB_NAME);
        const jobsCollection = db.collection('jobs');
        
        const jobs = await jobsCollection.find({}).sort({ featured: -1, createdAt: -1 }).toArray();
        
        return NextResponse.json({ jobs });
    } catch (error) {
        console.error('Fetch jobs error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch jobs' },
            { status: 500 }
        );
    }
}

/**
 * POST: Create a new job
 */
export async function POST(request) {
    try {
        const userRole = request.headers.get('x-user-role');

        if (userRole !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized: Admins only' }, { status: 403 });
        }

        const data = await request.json();
        const client = await clientPromise;
        const db = client.db(DB_NAME);
        const jobsCollection = db.collection('jobs');

        const job = {
            title: data.title,
            company: data.company,
            location: data.location,
            governorate: data.governorate,
            type: data.type,
            salary: data.salary,
            currency: data.currency || 'EGP',
            description: data.description,
            logo: data.logo || '',
            featured: data.featured || false,
            isPublished: data.isPublished !== false,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await jobsCollection.insertOne(job);

        return NextResponse.json({ 
            id: result.insertedId, 
            message: 'Job created successfully',
            job: { ...job, id: result.insertedId }
        });
    } catch (error) {
        console.error('Create job error:', error);
        return NextResponse.json(
            { error: 'Failed to create job' },
            { status: 500 }
        );
    }
}
