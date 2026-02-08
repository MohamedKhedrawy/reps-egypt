import { getDictionary } from '@/lib/get-dictionary';
import TrainerRegisterClient from './TrainerRegisterClient';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);

    return {
        title: dictionary.register_trainer_page.step1_title + ' | Reps Egypt',
        description: dictionary.register_trainer_page.step1_subtitle,
    };
}

export default async function TrainerRegisterPage({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  // Merge trainee content (shared fields) with trainer-specific content
  const content = {
    ...dictionary.register_trainee_page,
    ...dictionary.register_trainer_page
  };

  return <TrainerRegisterClient content={content} dictionary={dictionary} lang={lang} />;
}
