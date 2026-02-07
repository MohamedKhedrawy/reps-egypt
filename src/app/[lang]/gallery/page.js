import Link from "next/link";
import { getDictionary } from '@/lib/get-dictionary';
import GalleryClient from './GalleryClient';
import clientPromise from '@/lib/mongodb';

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
    return await db.collection('gallery').find({}).sort({ createdAt: -1 }).toArray();
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return [];
  }
}

export default async function GalleryPage({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const content = dictionary.gallery_page;
  const galleryImages = await getGalleryImages();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <GalleryClient dictionary={content} images={galleryImages} lang={lang} />
    </div>
  );
}
