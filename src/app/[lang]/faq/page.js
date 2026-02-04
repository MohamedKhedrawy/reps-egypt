import { getDictionary } from '@/lib/get-dictionary';
import FAQClient from './FAQClient';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);

    return {
        title: dictionary.faq_page.title + ' | Reps Egypt',
        description: dictionary.faq_page.subtitle,
    };
}

export default async function FAQPage({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return <FAQClient content={dictionary.faq_page} />;
}
