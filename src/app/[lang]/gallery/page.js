import Link from "next/link";
import { getDictionary } from '@/lib/get-dictionary';
import GalleryClient from './GalleryClient';
import clientPromise from '@/lib/mongodb';

// Revalidate every 10 minutes (ISR)
export const revalidate = 600;

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);

    return {
        title: `${dictionary.gallery_page.title_prefix} ${dictionary.gallery_page.title_highlight} | Reps Egypt`,
        description: dictionary.gallery_page.subtitle,
    };
}

async function getGalleryImages() {
  try {
    const client = await clientPromise;
    const db = client.db();
    // Project out 'image' to reduce payload size
    const rawImages = await db.collection('gallery').find({}).project({ title: 1, category: 1, _id: 1 }).sort({ createdAt: -1 }).toArray();
    
    // Add API URL for lazy loading
    return rawImages.map(img => ({
      ...img,
      image: `/api/gallery/${img._id}/image`
    }));
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return [];
  }
}

export default async function GalleryPage({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const content = dictionary.gallery_page;
  const rawImages = await getGalleryImages();
  const galleryImages = JSON.parse(JSON.stringify(rawImages));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <GalleryClient dictionary={content} images={galleryImages} lang={lang} />
    </div>
  );
}
