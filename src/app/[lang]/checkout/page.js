import { getDictionary } from '@/lib/get-dictionary';
import CheckoutClient from './CheckoutClient';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);

    return {
        title: dictionary.checkout_page.title + ' | Reps Egypt',
        description: dictionary.checkout_page.subtitle,
    };
}

export default async function CheckoutPage({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return <CheckoutClient content={dictionary.checkout_page} lang={lang} />;
}
