import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const DB_NAME = process.env.MONGODB_DB || 'reps-egypt';

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    if (!ObjectId.isValid(id)) {
      return Response.json({ error: 'Invalid job ID', success: false }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const jobsCollection = await db.collection('jobs');

    const updateData = {
      ...body,
      updatedAt: new Date(),
    };

    const result = await jobsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return Response.json({ error: 'Job not found', success: false }, { status: 404 });
    }

    return Response.json({ success: true, message: 'Job updated successfully' });
  } catch (error) {
    console.error('Failed to update job:', error);
    return Response.json({ error: 'Failed to update job', success: false }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    if (!ObjectId.isValid(id)) {
      return Response.json({ error: 'Invalid job ID', success: false }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const jobsCollection = await db.collection('jobs');

    const result = await jobsCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return Response.json({ error: 'Job not found', success: false }, { status: 404 });
    }

    return Response.json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Failed to delete job:', error);
    return Response.json({ error: 'Failed to delete job', success: false }, { status: 500 });
  }
}
