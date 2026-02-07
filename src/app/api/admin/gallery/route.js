import { NextResponse } from 'next/server';
import { getGalleryImages, addGalleryImage, deleteGalleryImage } from '@/lib/gallery';

export async function GET() {
  const images = await getGalleryImages();
  return NextResponse.json({ images });
}

export async function POST(request) {
  const { image, title, category } = await request.json();
  const result = await addGalleryImage({ image, title, category });
  return NextResponse.json(result);
}

export async function DELETE(request) {
  const { id } = await request.json();
  const result = await deleteGalleryImage(id);
  return NextResponse.json(result);
}
