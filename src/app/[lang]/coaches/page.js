import { getUsers, getPublicCoaches } from "@/lib/user";
import { getDictionary } from '@/lib/get-dictionary';
import CoachesClient from './CoachesClient';

// Revalidate every 10 minutes (ISR)
export const revalidate = 600;

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);

    return {
        title: `${dictionary.coaches_page.title_prefix} ${dictionary.coaches_page.title_highlight} | Reps Egypt`,
        description: dictionary.coaches_page.subtitle,
    };
}

export default async function CoachesPage({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const content = dictionary.coaches_page;

  // Fetch approved trainers
  const rawCoaches = await getPublicCoaches();
  const coaches = JSON.parse(JSON.stringify(rawCoaches));

  return (
    <CoachesClient coaches={coaches} content={content} dictionary={dictionary} lang={lang} />
  );
}
