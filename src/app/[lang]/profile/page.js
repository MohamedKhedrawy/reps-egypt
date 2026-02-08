import { getDictionary } from '@/lib/get-dictionary';
import ProfileClient from './ProfileClient';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);

    return {
        title: dictionary.profile_page.edit_profile + ' | Reps Egypt',
        description: dictionary.profile_page.about_me,
    };
}

export default async function ProfilePage({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return <ProfileClient content={dictionary.profile_page} dictionary={dictionary} lang={lang} />;
}
