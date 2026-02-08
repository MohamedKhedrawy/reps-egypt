import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

const DB_NAME = process.env.MONGODB_DB || 'reps-egypt';

// PATCH /api/admin/partners/[partnerId] - Update partner
export async function PATCH(request, { params }) {
  try {
    const { partnerId } = await params;
    const body = await request.json();
    const { name, tier, logo, description, website, category, isActive } = body;

    if (!ObjectId.isValid(partnerId)) {
      return NextResponse.json({ error: 'Invalid partner ID' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection('partners');

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (tier !== undefined) updateData.tier = tier;
    if (logo !== undefined) updateData.logo = logo;
    if (description !== undefined) updateData.description = description;
    if (website !== undefined) updateData.website = website;
    if (category !== undefined) updateData.category = category;
    if (isActive !== undefined) updateData.isActive = isActive;
    updateData.updatedAt = new Date();

    const result = await collection.updateOne(
      { _id: new ObjectId(partnerId) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
    }

    const updated = await collection.findOne({ _id: new ObjectId(partnerId) });

    return NextResponse.json({ 
      success: true,
      partner: (() => {
        const { _id, ...rest } = updated;
        return { ...rest, id: _id.toString() };
      })()
    });
  } catch (error) {
    console.error('Update partner error:', error);
    return NextResponse.json({ error: 'Failed to update partner' }, { status: 500 });
  }
}

// DELETE /api/admin/partners/[partnerId] - Delete partner
export async function DELETE(request, { params }) {
  try {
    const { partnerId } = await params;

    if (!ObjectId.isValid(partnerId)) {
      return NextResponse.json({ error: 'Invalid partner ID' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection('partners');

    const result = await collection.deleteOne({ _id: new ObjectId(partnerId) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Partner deleted successfully' });
  } catch (error) {
    console.error('Delete partner error:', error);
    return NextResponse.json({ error: 'Failed to delete partner' }, { status: 500 });
  }
}
