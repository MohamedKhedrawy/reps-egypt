import { getUsers } from "@/lib/user";
import { getDictionary } from '@/lib/get-dictionary';
import CoachesClient from './CoachesClient';

// Force dynamic rendering to avoid MongoDB timeout during static build
export const dynamic = 'force-dynamic';

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
  const coaches = await getUsers({ role: 'trainer', status: 'approved' });

  return (
    <CoachesClient coaches={coaches} content={content} lang={lang} />
  );
}
