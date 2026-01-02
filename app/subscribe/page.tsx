"use client";

import Link from "next/link";
import Image from "next/image";
import { Check, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import MarketingNav from "@/components/MarketingNav";

export default function SubscribePage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [scrollY, setScrollY] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<{ top: string; left: string; delay: string }[]>([]);

  const monthlyPrice = 79.99;
  const annualPrice = 767.90;
  const annualMonthly = (annualPrice / 12).toFixed(2);
  const savings = ((monthlyPrice * 12 - annualPrice) / (monthlyPrice * 12) * 100).toFixed(0);

  const features = [
    "Persistent Brand Memory",
    "Cross-Thread Search",
    "AI Learning from Your Content",
    "Daily News Insights",
    "Unlimited Threads",
    "Projects Workspace",
    "Today Page with To-Do",
    "Knowledge Page",
    "Calendar Integration",
  ];

  useEffect(() => {
    const arr = Array.from({ length: 18 }).map(() => ({
      top: `${Math.random() * 90}%`,
      left: `${Math.random() * 90}%`,
      delay: `${Math.random() * 3}s`,
    }));
    setParticles(arr);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        setScrollY(window.scrollY || window.pageYOffset);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPos({ x, y });
  };

  return (
    <main 
      className="min-h-screen bg-white relative overflow-hidden flex flex-col"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[1600px] h-[1600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,106,26,0.55),rgba(255,180,120,0.20),transparent_70%)] blur-[260px]"
          style={{ transform: `translate3d(0, ${scrollY * -0.05}px, 0)` }}
        />
        <div
          className="absolute top-[40%] left-[20%] w-[1100px] h-[1100px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,90,0,0.22),transparent_70%)] blur-[210px]"
          style={{ transform: `translate3d(0, ${scrollY * -0.03}px, 0)` }}
        />
        <div
          className="absolute bottom-[-2rem] left-0 w-[200%] h-40 opacity-[0.28] overflow-hidden"
          style={{ transform: `translate3d(0, ${scrollY * 0.05}px, 0)` }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200%"
            height="100%"
            viewBox="0 0 1440 320"
            className="animate-wave"
          >
            <path
              fill="#FF6A1A"
              fillOpacity="0.18"
              d="M0,256L48,250.7C96,245,192,235,288,229.3C384,224,480,224,576,229.3C672,235,768,245,864,240C960,235,1056,213,1152,208C1248,203,1344,213,1392,218.7L1440,224V320H0Z"
            />
          </svg>
        </div>
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/70 rounded-full animate-sparkle"
            style={{
              top: p.top,
              left: p.left,
              animationDelay: p.delay,
            }}
          />
        ))}
        <div
          className="cursor-spotlight"
          style={{
            top: `${cursorPos.y}px`,
            left: `${cursorPos.x}px`,
          }}
        />
      </div>

      <MarketingNav />

      <section className="relative z-10 pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF6A1A]/10 to-[#FFB84D]/10 border border-[#FF6A1A]/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-[#FF6A1A]" />
            <span className="text-sm font-semibold text-[#FF6A1A]">7-Day Free Trial</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
            <span className="text-[#0A0A0A]">Simple, </span>
            <span className="bg-gradient-to-r from-[#FF6A1A] via-[#FF8A1A] to-[#FFB84D] bg-clip-text text-transparent">
              Powerful
            </span>
            <span className="text-[#0A0A0A]"> Pricing</span>
          </h1>
          
          <p className="text-xl text-black/70 max-w-2xl mx-auto mb-12">
            Start your 7-day free trial today. No credit card required. Cancel anytime.
          </p>

          <div className="inline-flex items-center gap-3 p-1.5 bg-white/80 backdrop-blur-md border border-black/5 shadow-md rounded-full">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${
                billingCycle === "monthly"
                  ? "bg-gradient-to-r from-[#FF6A1A] via-[#FF8A1A] to-[#FFB84D] text-white shadow-lg"
                  : "text-black/60 hover:text-black/80"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all flex items-center gap-2 ${
                billingCycle === "annual"
                  ? "bg-gradient-to-r from-[#FF6A1A] via-[#FF8A1A] to-[#FFB84D] text-white shadow-lg"
                  : "text-black/60 hover:text-black/80"
              }`}
            >
              Annual
              <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                billingCycle === "annual" ? "bg-[#0A0A0A] text-white" : "bg-gradient-to-r from-[#FF6A1A] via-[#FF8A1A] to-[#FFB84D] text-white"
              }`}>
                Save {savings}%
              </span>
            </button>
          </div>
        </div>
      </section>

      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-md mx-auto">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF6A1A] via-[#FF8A1A] to-[#FFB84D] rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
            
            <div className="relative bg-white/90 backdrop-blur-md border-2 border-[#FF6A1A]/20 rounded-3xl p-8 shadow-2xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="px-4 py-1.5 bg-gradient-to-r from-[#FF6A1A] to-[#FFB84D] text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  MOST POPULAR
                </div>
              </div>

              <div className="text-center pt-4 pb-6 border-b border-black/5">
                <h3 className="text-3xl font-extrabold mb-2">
                  <span className="text-[#0A0A0A]">Mark </span>
                  <span className="bg-gradient-to-r from-[#FF6A1A] via-[#FF8A1A] to-[#FFB84D] bg-clip-text text-transparent">
                    Pro
                  </span>
                </h3>
                <p className="text-sm text-black/60">
                  Your complete marketing OS
                </p>
              </div>

              <div className="py-8 text-center">
                {billingCycle === "monthly" ? (
                  <>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-extrabold text-[#0A0A0A]">${monthlyPrice}</span>
                      <span className="text-lg text-black/60 font-medium">/month</span>
                    </div>
                    <p className="text-sm text-black/50 mt-2">Billed monthly</p>
                  </>
                ) : (
                  <>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-extrabold text-[#0A0A0A]">${annualMonthly}</span>
                      <span className="text-lg text-black/60 font-medium">/month</span>
                    </div>
                    <p className="text-sm text-black/50 mt-2">
                      ${annualPrice} billed annually
                    </p>
                    <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs font-semibold text-green-700">
                        Save ${(monthlyPrice * 12 - annualPrice).toFixed(2)}/year
                      </span>
                    </div>
                  </>
                )}
              </div>

              <button
                disabled
                className="block w-full py-4 px-6 bg-gray-300 text-gray-500 font-bold text-center rounded-xl shadow-lg cursor-not-allowed opacity-60"
                title="Signups currently disabled"
              >
                Signups Temporarily Disabled
              </button>
              
              <p className="text-xs text-center text-black/50 mt-3">
                No credit card required • Cancel anytime
              </p>

              <div className="mt-8 pt-8 border-t border-black/5 space-y-4">
                <p className="text-sm font-semibold text-black/70 mb-4">Everything included:</p>
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-br from-[#FF6A1A] via-[#FF8A1A] to-[#FFB84D] rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-white stroke-[3]" />
                    </div>
                    <span className="text-sm text-black/80 leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-xs text-black/50 max-w-md mx-auto leading-relaxed">
              *AI responses powered by OpenAI. Monthly usage limits included with your subscription. Additional AI credits available for purchase as needed.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 pb-32 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center mb-12 text-[#0A0A0A]">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-md border border-black/5 rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">
                What happens after my free trial?
              </h3>
              <p className="text-black/70">
                After your 7-day trial, you'll be charged based on your chosen plan (monthly or annual). You can cancel anytime during the trial without being charged.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-md border border-black/5 rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">
                Can I switch between monthly and annual?
              </h3>
              <p className="text-black/70">
                Yes! You can upgrade from monthly to annual anytime to start saving. Changes take effect at the start of your next billing period.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-md border border-black/5 rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">
                What are AI usage limits?
              </h3>
              <p className="text-black/70">
                Your subscription includes generous monthly AI usage for typical workflows. If you need more, additional credits are available for purchase at any time.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-md border border-black/5 rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">
                Can I cancel my subscription?
              </h3>
              <p className="text-black/70">
                Absolutely. Cancel anytime from your billing settings. You'll continue to have access until the end of your current billing period.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-black/5 bg-white/50 backdrop-blur-sm py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-black/50">
            © 2026 Mark. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
