import { getDictionary } from '@/lib/get-dictionary';
import LoginClient from './LoginClient';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);

    return {
        title: dictionary.login_page.title + ' | Reps Egypt',
        description: dictionary.login_page.subtitle,
    };
}

export default async function LoginPage({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return <LoginClient content={dictionary.login_page} lang={lang} />;
}
