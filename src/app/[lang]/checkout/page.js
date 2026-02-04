"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const plan = searchParams.get("plan") || "pro";
  const billing = searchParams.get("billing") || "yearly";
  
  const prices = {
      pro: { monthly: 150, yearly: 1200 },
      master: { monthly: 300, yearly: 2500 }
  };
  
  const price = prices[plan]?.[billing] || 0;
  const totalPrice = (price * 1.14).toFixed(2);
  
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("card"); // card, wallet, fawry, valu
  const [fawryCode, setFawryCode] = useState(null);
  const [valuStep, setValuStep] = useState(1); // 1: Phone, 2: Plans
  
  const [formData, setFormData] = useState({
      cardName: "Ahmed Mohamed",
      cardNumber: "",
      expiry: "",
      cvc: "",
      zip: "",
      walletPhone: "",
      valuPhone: ""
  });

  const methods = [
      { id: "card", label: "Credit / Debit Card", icon: "💳" },
      { id: "wallet", label: "Mobile Wallet", icon: "📱" },
      { id: "fawry", label: "Fawry Pay", icon: "🧾" },
      { id: "valu", label: "ValU Installments", icon: "⚡" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cardNumber') {
        const formatted = value.replace(/\D/g, '').substring(0, 16).replace(/(\d{4})/g, '$1 ').trim();
        setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate different flows
    setTimeout(() => {
        setLoading(false);
        
        if (method === 'fawry') {
            setFawryCode("923 940 112");
            toast.success("Reference code generated!");
            return;
        }

        if (method === 'valu' && valuStep === 1) {
            setValuStep(2);
            toast.success("Account verified!");
            return;
        }

        toast.success("Payment Successful!");
        setTimeout(() => {
            router.push("/profile?payment=success");
        }, 2000);
    }, 2000);
  };

  if (fawryCode) {
      return (
          <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
              <div className="w-24 h-24 bg-amber-500 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-amber-500/30 animate-in zoom-in">
                  <span className="text-4xl text-white font-bold">F</span>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">Pay at Fawry</h1>
              <p className="text-muted text-lg mb-8 max-w-md">Use the reference number below to pay at any Fawry kiosk.</p>
              
              <div className="bg-secondary p-6 rounded-2xl border border-border mb-8 w-full max-w-sm">
                  <div className="text-xs text-muted uppercase font-bold mb-2">Reference Number</div>
                  <div className="text-4xl font-mono font-bold text-foreground tracking-widest">{fawryCode}</div>
                  <div className="mt-4 text-xs text-red-500 font-bold">Expires in 23:59:59</div>
              </div>

              <Link href="/profile" className="px-8 py-3 bg-tertiary rounded-xl font-bold hover:bg-white/10 transition-colors">Return to Profile</Link>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Payment Methods & Form */}
            <div className="lg:col-span-8">
                <h1 className="text-3xl font-bold mb-2">Secure Checkout</h1>
                <p className="text-muted mb-8">Choose your preferred payment method.</p>
                
                {/* Method Tabs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                    {methods.map((m) => (
                        <button
                            key={m.id}
                            onClick={() => setMethod(m.id)}
                            className={cn(
                                "flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all duration-200",
                                method === m.id 
                                    ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/20" 
                                    : "bg-secondary border-border text-muted hover:border-red-600/50 hover:bg-tertiary"
                            )}
                        >
                            <span className="text-2xl">{m.icon}</span>
                            <span className="text-xs font-bold">{m.label}</span>
                        </button>
                    ))}
                </div>

                <div className="bg-secondary border border-border rounded-3xl p-8 relative overflow-hidden">
                    {loading && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
                            <p className="font-bold animate-pulse">Processing Payment...</p>
                        </div>
                    )}

                    <form onSubmit={handlePayment} className="space-y-6">
                        {/* CREDIT CARD FORM */}
                        {method === 'card' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-muted">Name on Card</label>
                                    <input required name="cardName" value={formData.cardName} onChange={handleInputChange} type="text" className="w-full bg-tertiary border border-border rounded-xl px-4 py-3.5 focus:border-red-600 focus:outline-none transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-muted">Card Number</label>
                                    <div className="relative">
                                        <input required name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} type="text" placeholder="0000 0000 0000 0000" maxLength={19} className="w-full bg-tertiary border border-border rounded-xl px-4 py-3.5 pl-12 focus:border-red-600 focus:outline-none transition-colors font-mono" />
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">💳</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-muted">Expiry</label>
                                        <input required name="expiry" onChange={handleInputChange} type="text" placeholder="MM/YY" maxLength={5} className="w-full bg-tertiary border border-border rounded-xl px-4 py-3.5 focus:border-red-600 focus:outline-none transition-colors text-center" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-muted">CVC</label>
                                        <input required name="cvc" onChange={handleInputChange} type="text" placeholder="123" maxLength={3} className="w-full bg-tertiary border border-border rounded-xl px-4 py-3.5 focus:border-red-600 focus:outline-none transition-colors text-center" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* MOBILE WALLET FORM */}
                        {method === 'wallet' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                                <div className="p-4 bg-tertiary rounded-xl border border-border text-sm text-muted mb-4">
                                    We support Vodafone Cash, Orange Cash, Etisalat Cash, and WE Pay.
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-muted">Wallet Number</label>
                                    <div className="relative">
                                        <input required name="walletPhone" onChange={handleInputChange} type="tel" placeholder="01xxxxxxxxx" className="w-full bg-tertiary border border-border rounded-xl px-4 py-3.5 pl-12 focus:border-red-600 focus:outline-none transition-colors" />
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🇪🇬</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* FAWRY FORM */}
                        {method === 'fawry' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 text-center py-8">
                                <span className="text-6xl mb-4 block">🧾</span>
                                <h3 className="text-xl font-bold">Pay at any Fawry Store</h3>
                                <p className="text-muted max-w-sm mx-auto">Click below to generate a reference number. You will have 24 hours to complete your payment at any Fawry POS.</p>
                            </div>
                        )}

                        {/* VALU FORM */}
                        {method === 'valu' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                                {valuStep === 1 ? (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-muted">ValU Phone Number</label>
                                            <input required name="valuPhone" onChange={handleInputChange} type="tel" placeholder="01xxxxxxxxx" className="w-full bg-tertiary border border-border rounded-xl px-4 py-3.5 focus:border-red-600 focus:outline-none transition-colors" />
                                        </div>
                                    </>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="text-sm font-bold text-muted uppercase">Select Installment Plan</div>
                                        {[3, 6, 12].map(months => (
                                            <label key={months} className="flex items-center justify-between p-4 bg-tertiary border border-border rounded-xl cursor-pointer hover:border-red-600 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <input type="radio" name="valuPlan" className="accent-red-600 w-5 h-5" defaultChecked={months === 6} />
                                                    <span className="font-bold">{months} Months</span>
                                                </div>
                                                <span className="text-sm text-muted">0% Interest</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/30 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2"
                        >
                            {method === 'fawry' 
                                ? 'Get Reference Code' 
                                : method === 'valu' && valuStep === 1 
                                    ? 'Verify Account' 
                                    : `Pay ${totalPrice} EGP`
                            }
                        </button>
                    </form>
                </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
                <div className="bg-secondary border border-border rounded-3xl p-8">
                    <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                    
                    <div className="flex justify-between items-center py-4 border-b border-border">
                        <div>
                            <div className="font-bold text-lg capitalize">{plan} Membership</div>
                            <div className="text-sm text-muted capitalize">Billed {billing}</div>
                        </div>
                        <div className="font-bold">{price} EGP</div>
                    </div>
                    
                    <div className="flex justify-between items-center py-4 border-b border-border text-sm text-muted">
                        <div>Subtotal</div>
                        <div>{price} EGP</div>
                    </div>
                     <div className="flex justify-between items-center py-4 border-b border-border text-sm text-muted">
                        <div>Tax (14%)</div>
                        <div>{(price * 0.14).toFixed(2)} EGP</div>
                    </div>

                    <div className="flex justify-between items-center pt-6 text-xl font-bold">
                        <div>Total</div>
                        <div className="text-red-500">{totalPrice} EGP</div>
                    </div>
                    
                    <div className="mt-8 pt-4 border-t border-border flex items-center justify-center gap-2 opacity-50">
                        <span className="text-xs font-bold text-muted">Secure Payment by</span>
                        <div className="flex gap-1">
                            {/* Paymob-like generic logos */}
                            <div className="w-2 h-2 rounded-full bg-blue-500"/>
                            <div className="w-2 h-2 rounded-full bg-green-500"/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin"/></div>}>
            <CheckoutContent />
        </Suspense>
    )
}
