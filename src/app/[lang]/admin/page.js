import { getDictionary } from "@/lib/get-dictionary";
import AdminDashboard from "./AdminDashboard";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  return {
    title: `${dictionary.admin.header_title} | Reps Egypt`,
  };
}

export default async function AdminPage({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return <AdminDashboard dictionary={dictionary} lang={lang} />;
}
