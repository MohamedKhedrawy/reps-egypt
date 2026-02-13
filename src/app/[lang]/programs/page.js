import { getPrograms } from "@/lib/programs";
import { getDictionary } from '@/lib/get-dictionary';
import ProgramsClient from './ProgramsClient';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);

    return {
        title: `${dictionary.programs_page.title_prefix} ${dictionary.programs_page.title_highlight} | Reps Egypt`,
        description: dictionary.programs_page.subtitle,
    };
}

export default async function ProgramsPage({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  const programs = await getPrograms();

  return (
    <ProgramsClient programs={programs} lang={lang} dictionary={dictionary} />
  );
}
