"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("yearly");
  const { isDark } = useTheme();

  const plans = [
    {
      id: "student",
      name: "Student",
      description: "Perfect for starting your fitness journey",
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        "Access to basic study resources",
        "Join the community forum",
        "Event and workshop discounts",
        "Basic profile listing"
      ],
      cta: "Register Free",
      href: "/register/trainee",
      isPopular: false
    },
    {
      id: "pro",
      name: "Pro Member",
      description: "For certified professionals growing their career",
      monthlyPrice: 150,
      yearlyPrice: 1200,
      features: [
        "Everything in Student",
        "Professional Liability Insurance",
        "Exclusive Job Board Access",
        "Partner Discounts (Equipment/Supplements)",
        "Verified 'Pro' Badge"
      ],
      cta: "Upgrade to Pro",
      href: "/checkout?plan=pro",
      isPopular: true
    },
    {
      id: "master",
      name: "Master Coach",
      description: "Elite status for industry leaders & mentors",
      monthlyPrice: 300,
      yearlyPrice: 2500,
      features: [
        "Everything in Pro",
        "Priority Search Listing",
        "Exclusive Mentorship Opportunities",
        "Featured in Weekly Newsletter",
        "VIP Support Access"
      ],
      cta: "Become a Master",
      href: "/checkout?plan=master",
      isPopular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Invest in Your <span className="text-red-600">Future</span>
          </h1>
          <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Choose the plan that fits your career stage. Upgrade anytime as your business grows.
          </p>

          {/* Billing Toggle (Segmented Control) */}
          <div className="flex items-center justify-center mb-16">
            <div className="relative flex items-center p-1 bg-tertiary border border-border rounded-full w-[300px] h-14">
               {/* Sliding Indicator */}
               <div 
                 className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-red-600 rounded-full shadow-sm transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${billingCycle === "monthly" ? "left-1" : "left-[calc(50%+4px)]"}`}
               />
               
               {/* Monthly Button */}
               <button
                 onClick={() => setBillingCycle("monthly")}
                 className={`relative flex-1 h-full rounded-full text-sm font-bold z-10 transition-colors duration-300 ${billingCycle === "monthly" ? "text-white" : "text-muted hover:text-foreground"}`}
               >
                 Monthly
               </button>

               {/* Yearly Button */}
               <button
                 onClick={() => setBillingCycle("yearly")}
                 className={`relative flex-1 h-full rounded-full text-sm font-bold z-10 transition-colors duration-300 flex items-center justify-center gap-2 ${billingCycle === "yearly" ? "text-white" : "text-muted hover:text-foreground"}`}
               >
                 Yearly
                 <span className={`text-[10px] uppercase px-1.5 py-0.5 rounded-full border ${billingCycle === "yearly" ? "bg-white/20 text-white border-transparent" : "bg-red-600/10 text-red-600 border-red-600/20"}`}>
                   -30%
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
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted text-sm min-h-[40px]">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">
                    {billingCycle === "yearly" ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-sm font-bold text-muted">EGP</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted text-sm">/{billingCycle === "yearly" ? "year" : "month"}</span>
                  {billingCycle === "yearly" && plan.yearlyPrice > 0 && (
                    <span className="text-xs font-light text-muted/70 mt-1">
                      (Just {Math.round(plan.yearlyPrice / 12)} EGP/month)
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
             <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
             <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                   <h4 className="font-bold mb-2">Can I cancel anytime?</h4>
                   <p className="text-muted text-sm">Yes, you can cancel your subscription at any time. Your access will remain active until the end of your billing period.</p>
                </div>
                <div>
                   <h4 className="font-bold mb-2">Is the certificate international?</h4>
                   <p className="text-muted text-sm">Yes, REPs Egypt certifications are recognized globally in participating countries including UAE, UK, and Australia.</p>
                </div>
             </div>
          </div>
      </section>

    </div>
  );
}
