import { getDictionary } from "@/lib/get-dictionary";
import PricingClient from "./PricingClient";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return {
    title: `${dictionary.pricing_page.title_prefix} ${dictionary.pricing_page.title_highlight}`,
    description: dictionary.pricing_page.subtitle,
  };
}

export default async function PricingPage({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return <PricingClient dictionary={dictionary} lang={lang} />;
}
