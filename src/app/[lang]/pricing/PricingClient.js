"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export default function PricingClient({ dictionary, lang }) {
  const [billingCycle, setBillingCycle] = useState("yearly");
  const { isDark } = useTheme();
  const t = dictionary.pricing_page;

  // Countdown Logic (2 weeks from now simulates urgency)
  const [timeLeft, setTimeLeft] = useState({ days: 13, hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const plans = [
    {
      id: "trainee",
      name: t.plans.trainee.name,
      description: t.plans.trainee.desc,
      monthlyPrice: Number(t.plans.trainee.price),
      yearlyPrice: 0,
      features: t.plans.trainee.features,
      cta: t.plans.trainee.cta,
      href: `/${lang}/register/trainee`,
      isPopular: false
    },
    {
      id: "pro",
      name: t.plans.pro.name,
      description: t.plans.pro.desc,
      monthlyPrice: Number(t.plans.pro.price),
      yearlyPrice: Number(t.plans.pro.yearly_price),
      features: t.plans.pro.features,
      cta: t.plans.pro.cta,
      href: `/${lang}/checkout?plan=pro`,
      isPopular: true,
      offer: t.offer_pro_duration
    },
    {
      id: "master",
      name: t.plans.master.name,
      description: t.plans.master.desc,
      monthlyPrice: Number(t.plans.master.price),
      yearlyPrice: Number(t.plans.master.yearly_price),
      features: t.plans.master.features,
      cta: t.plans.master.cta,
      href: `/${lang}/checkout?plan=master`,
      isPopular: false,
      offer: t.offer_elite_duration
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            {t.title_prefix} <span className="text-red-600">{t.title_highlight}</span>
          </h1>
          <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-12">
            {t.subtitle}
          </p>

          {/* Countdown Banner */}
          <div className="inline-flex items-center gap-4 bg-red-600/10 border border-red-600/20 rounded-full px-6 py-2 mb-12 animate-pulse">
            <span className="text-red-600 font-bold text-sm uppercase tracking-wide">{t.offer_expires}:</span>
            <div className="flex items-center gap-1 text-red-600 font-mono font-bold">
                <span>{String(timeLeft.days).padStart(2, '0')}d</span>:
                <span>{String(timeLeft.hours).padStart(2, '0')}h</span>:
                <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>:
                <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
            </div>
          </div>

          {/* Billing Toggle (Segmented Control) */}
          <div className="flex items-center justify-center mb-16">
            <div className="relative flex items-center p-1 bg-tertiary border border-border rounded-full w-[300px] h-14">
               {/* Sliding Indicator */}
               <div 
                 className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-red-600 rounded-full shadow-sm transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${billingCycle === "monthly" ? "left-1 rtl:right-1 rtl:left-auto" : "left-[calc(50%+4px)] rtl:right-[calc(50%+4px)] rtl:left-auto"}`}
               />
               
               {/* Monthly Button */}
               <button
                 onClick={() => setBillingCycle("monthly")}
                 className={`relative flex-1 h-full rounded-full text-sm font-bold z-10 transition-colors duration-300 ${billingCycle === "monthly" ? "text-white" : "text-muted hover:text-foreground"}`}
               >
                 {t.monthly}
               </button>

               {/* Yearly Button */}
               <button
                 onClick={() => setBillingCycle("yearly")}
                 className={`relative flex-1 h-full rounded-full text-sm font-bold z-10 transition-colors duration-300 flex items-center justify-center gap-2 ${billingCycle === "yearly" ? "text-white" : "text-muted hover:text-foreground"}`}
               >
                 {t.yearly}
                 <span className={`text-[10px] uppercase px-1.5 py-0.5 rounded-full border ${billingCycle === "yearly" ? "bg-white/20 text-white border-transparent" : "bg-red-600/10 text-red-600 border-red-600/20"}`}>
                   {t.save_percent}
                 </span>
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                plan.isPopular 
                  ? "bg-secondary border-red-600 shadow-xl shadow-red-600/10 z-10 scale-105 md:scale-110" 
                  : "bg-background border-border hover:border-red-600/30"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg whitespace-nowrap">
                  {t.most_popular}
                </div>
              )}

              {/* Limited Time Offer Badge */}
              {plan.offer && (
                <div className="absolute -top-3 -right-3 rotate-12 bg-yellow-400 text-black text-xs font-black px-3 py-1 rounded shadow-lg border-2 border-background z-20">
                    {plan.offer}
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted text-sm min-h-[40px]">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2 flex-wrap">
                  {/* Strikethrough Price if Offer Exists */}
                  {plan.offer && (
                     <span className="text-xl text-muted/50 line-through decoration-red-500 decoration-2">
                        {billingCycle === "yearly" ? plan.yearlyPrice : plan.monthlyPrice}
                     </span>
                  )}
                  
                  <span className="text-4xl font-extrabold text-foreground">
                    {plan.offer ? "0" : (billingCycle === "yearly" ? plan.yearlyPrice : plan.monthlyPrice)}
                  </span>
                  <span className="text-sm font-bold text-muted">EGP</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted text-sm">/{billingCycle === "yearly" ? t.year : t.month}</span>
                  {billingCycle === "yearly" && plan.yearlyPrice > 0 && !plan.offer && (
                    <span className="text-xs font-light text-muted/70 mt-1">
                      (Just {Math.round(plan.yearlyPrice / 12)} {t.per_month})
                    </span>
                  )}
                  {plan.offer && (
                    <span className="text-xs font-bold text-green-500 mt-1">
                      {t.save_100}
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted/90">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-600 shrink-0 mt-0.5">
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link 
                href={`${plan.href}${billingCycle === 'monthly' ? '&billing=monthly' : '&billing=yearly'}`}
                className={`w-full py-3.5 rounded-xl text-center font-bold transition-all duration-300 ${
                  plan.isPopular
                    ? "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/25"
                    : "bg-tertiary text-foreground hover:bg-foreground hover:text-background border border-border"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ / Trust Section */}
      <section className="pb-24 px-6 border-t border-border">
          <div className="max-w-4xl mx-auto pt-16 text-center">
             <h2 className="text-2xl font-bold mb-8">{t.faq.title}</h2>
             <div className="grid md:grid-cols-2 gap-8 text-start rtl:text-right">
                <div>
                   <h4 className="font-bold mb-2">{t.faq.q1}</h4>
                   <p className="text-muted text-sm">{t.faq.a1}</p>
                </div>
                <div>
                   <h4 className="font-bold mb-2">{t.faq.q2}</h4>
                   <p className="text-muted text-sm">{t.faq.a2}</p>
                </div>
             </div>
          </div>
      </section>

    </div>
  );
}
