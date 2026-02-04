import { getDictionary } from '@/lib/get-dictionary';
import JobsClient from './JobsClient';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);

    return {
        title: dictionary.jobs_page.title_prefix + ' ' + dictionary.jobs_page.title_highlight + ' | Reps Egypt',
        description: dictionary.jobs_page.subtitle,
    };
}

export default async function JobsPage({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return <JobsClient content={dictionary.jobs_page} lang={lang} />;
}
