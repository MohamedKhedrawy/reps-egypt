import clientPromise from './mongodb';
import { ObjectId } from 'mongodb';

export async function getGalleryImages() {
  const client = await clientPromise;
  const db = client.db();
  return await db.collection('gallery').find({}).sort({ createdAt: -1 }).toArray();
}

export async function addGalleryImage({ image, title, category }) {
  const client = await clientPromise;
  const db = client.db();
  const doc = {
    image,
    title: title || '',
    category: category || 'Certification',
    createdAt: new Date(),
  };
  const result = await db.collection('gallery').insertOne(doc);
  return { ...doc, _id: result.insertedId };
}

export async function deleteGalleryImage(id) {
  const client = await clientPromise;
  const db = client.db();
  await db.collection('gallery').deleteOne({ _id: new ObjectId(id) });
  return { success: true };
}
