import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

const DB_NAME = process.env.MONGODB_DB || 'reps-egypt';

/**
 * PATCH: Update a job
 */
export async function PATCH(request, { params }) {
    try {
        const userRole = request.headers.get('x-user-role');

        if (userRole !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized: Admins only' }, { status: 403 });
        }

        const { jobId } = await params;
        const data = await request.json();
        const client = await clientPromise;
        const db = client.db(DB_NAME);
        const jobsCollection = db.collection('jobs');

        const updateData = {
            title: data.title,
            company: data.company,
            location: data.location,
            governorate: data.governorate,
            type: data.type,
            salary: data.salary,
            currency: data.currency,
            description: data.description,
            logo: data.logo,
            featured: data.featured,
            isPublished: data.isPublished,
            updatedAt: new Date(),
        };

        const result = await jobsCollection.updateOne(
            { _id: new ObjectId(jobId) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: 'Job not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Job updated successfully' });
    } catch (error) {
        console.error('Update job error:', error);
        return NextResponse.json(
            { error: 'Failed to update job' },
            { status: 500 }
        );
    }
}

/**
 * DELETE: Delete a job
 */
export async function DELETE(request, { params }) {
    try {
        const userRole = request.headers.get('x-user-role');

        if (userRole !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized: Admins only' }, { status: 403 });
        }

        const { jobId } = await params;
        const client = await clientPromise;
        const db = client.db(DB_NAME);
        const jobsCollection = db.collection('jobs');

        const result = await jobsCollection.deleteOne({ _id: new ObjectId(jobId) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: 'Job not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Job deleted successfully' });
    } catch (error) {
        console.error('Delete job error:', error);
        return NextResponse.json(
            { error: 'Failed to delete job' },
            { status: 500 }
        );
    }
}
