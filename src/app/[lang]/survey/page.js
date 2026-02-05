import Link from "next/link";
import { getDictionary } from '@/lib/get-dictionary';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);

    return {
        title: dictionary.survey_page.title + ' | Reps Egypt',
        description: dictionary.survey_page.subtitle,
    };
}

export default async function SurveyPage({ params }) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
            <div className="max-w-3xl mx-auto px-6 py-20">
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">
                        {dictionary.survey_page.title}
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
                    <p className="mt-4 text-gray-300 text-lg">
                        {dictionary.survey_page.subtitle}
                    </p>
                </header>

                <form className="space-y-8">
                    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 space-y-6">
                        
                        <div>
                            <label className="block text-lg font-medium text-white mb-4">
                                {dictionary.survey_page.q1_label}
                            </label>
                            <div className="space-y-3">
                                {dictionary.survey_page.q1_options.map((option) => (
                                    <label key={option} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
                                        <input type="radio" name="satisfaction" className="w-5 h-5 text-purple-600 focus:ring-purple-500 bg-white/10 border-white/20" />
                                        <span className="text-gray-300">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="w-full h-px bg-white/10" />

                        <div>
                            <label className="block text-lg font-medium text-white mb-4">
                                {dictionary.survey_page.q2_label}
                            </label>
                            <div className="grid md:grid-cols-2 gap-3">
                                {dictionary.survey_page.q2_options.map((option) => (
                                    <label key={option} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
                                        <input type="checkbox" className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500 bg-white/10 border-white/20" />
                                        <span className="text-gray-300">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="w-full h-px bg-white/10" />

                        <div>
                            <label htmlFor="feedback" className="block text-lg font-medium text-white mb-4">
                                {dictionary.survey_page.q3_label}
                            </label>
                            <textarea
                                id="feedback"
                                rows="4"
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                                placeholder={dictionary.survey_page.q3_placeholder}
                            ></textarea>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-0.5"
                            >
                                {dictionary.survey_page.btn_submit}
                            </button>
                        </div>

                    </div>
                </form>

                <footer className="mt-16 text-center">
                    <Link
                        href={`/${lang}`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-medium hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
                    >
                        {dictionary.survey_page.btn_back}
                    </Link>
                </footer>
            </div>
        </main>
    );
}
