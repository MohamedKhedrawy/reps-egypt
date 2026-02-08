import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const DB_NAME = process.env.MONGODB_DB || 'reps-egypt';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const jobsCollection = await db.collection('jobs');
    
    const jobs = await jobsCollection.find({}).sort({ postedAt: -1 }).toArray();
    
    return Response.json({ jobs, success: true });
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    return Response.json({ error: 'Failed to fetch jobs', success: false }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, company, location, type, salary, description, requirements, benefits, featured } = body;

    if (!title || !company || !location || !type) {
      return Response.json(
        { error: 'Missing required fields', success: false },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const jobsCollection = await db.collection('jobs');

    const newJob = {
      title,
      company,
      location,
      type,
      type_key: type.toLowerCase().replace(/[^a-z]/g, '_'),
      salary: salary || 'Negotiable',
      description: description || '',
      requirements: requirements || [],
      benefits: benefits || [],
      featured: featured || false,
      postedAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await jobsCollection.insertOne(newJob);

    return Response.json({
      success: true,
      job: { _id: result.insertedId, ...newJob },
    });
  } catch (error) {
    console.error('Failed to create job:', error);
    return Response.json({ error: 'Failed to create job', success: false }, { status: 500 });
  }
}
