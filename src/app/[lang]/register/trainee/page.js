import { getDictionary } from '@/lib/get-dictionary';
import TraineeRegisterClient from './TraineeRegisterClient';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);

    return {
        title: dictionary.register_trainee_page.step1_title + ' | Reps Egypt',
        description: dictionary.register_trainee_page.step1_subtitle,
    };
}

export default async function TraineeRegisterPage({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return <TraineeRegisterClient content={dictionary.register_trainee_page} dictionary={dictionary} lang={lang} />;
}
