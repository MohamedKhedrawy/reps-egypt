import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

const DB_NAME = process.env.MONGODB_DB || 'reps-egypt';

// GET /api/admin/partners - Get all partners (PUBLIC)
export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection('partners');
    
    const partners = await collection.find({}).sort({ createdAt: -1 }).toArray();
    
    return NextResponse.json({ 
      success: true, 
      partners: partners.map(({ _id, ...partner }) => ({
        ...partner,
        id: _id.toString()
      }))
    });
  } catch (error) {
    console.error('Get partners error:', error);
    return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 });
  }
}

// POST /api/admin/partners - Add new partner
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, tier, logo, description, website, category, isActive } = body;

    if (!name || !tier || !logo) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection('partners');

    const partner = {
      name,
      tier,
      logo,
      description: description || '',
      website: website || '',
      category: category || 'general',
      isActive: isActive !== undefined ? isActive : true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await collection.insertOne(partner);

    return NextResponse.json({ 
      success: true, 
      partner: {
        ...partner,
        id: result.insertedId.toString()
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Add partner error:', error);
    return NextResponse.json({ error: 'Failed to add partner' }, { status: 500 });
  }
}
