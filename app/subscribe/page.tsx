"use client";

import Link from "next/link";
import Image from "next/image";
import { Check, Sparkles } from "lucide-react";
import { useState } from "react";
import MarketingNav from "@/components/MarketingNav";

export default function SubscribePage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  /* ============================= */
  /* PERFORMANCE: Removed all expensive effects:
   * - scrollY state (caused re-renders 120x/second on scroll)
   * - cursorPos state (constant state updates on mouse move)
   * - particles state (18 concurrent CSS animations)
   * - blur gradients (expensive CSS filter operations)
   * - animate-wave (continuous CSS animation)
   * ============================= */

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
    "Thread Folders",
    "Notepad",
    "Robust To-Do List System",
    "Knowledge Page",
    "Calendar Integration",
  ];

  return (
    <main 
      className="min-h-screen bg-white relative overflow-hidden flex flex-col"
      /* PERFORMANCE: Removed onMouseMove handler that triggered state updates on every pixel */
    >
      {/* ================================================== */}
      {/* BACKGROUND ELEMENTS                               */}
      {/* PERFORMANCE: Removed all expensive blur gradients, particles, and wave animations */}
      {/* These caused expensive CSS filter operations and continuous animations */}
      {/* ================================================== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* PERFORMANCE: Orange gradient blurs REMOVED - too expensive for scroll performance */}
        {/* PERFORMANCE: Animated wave SVG REMOVED - continuous CSS animation hurts scroll */}
        {/* PERFORMANCE: Floating particles REMOVED - 18 concurrent CSS animations add up */}
        {/* PERFORMANCE: Cursor spotlight REMOVED - constant state updates on mouse move */}
      </div>

      <MarketingNav />

      <section className="relative z-10 pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge - Dark design matching the main page style */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A0A0A] border border-black/10 rounded-full mb-6 shadow-lg">
            <Sparkles className="w-4 h-4 text-[#FF6A1A]" />
            <span className="text-sm font-bold text-white">7-Day Free Trial</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
            <span className="text-[#0A0A0A]">Simple, </span>
            <span className="bg-gradient-to-r from-[#FF6A1A] to-[#FF8A1A] bg-clip-text text-transparent">
              Powerful
            </span>
            <span className="text-[#0A0A0A]"> Pricing</span>
          </h1>
          
          <p className="text-xl text-black/70 max-w-2xl mx-auto mb-12">
            Start your 7-day free trial today. No credit card required. Cancel anytime.
          </p>

          <div className="inline-flex items-center gap-3 p-1.5 bg-white/95 border border-black/5 shadow-md rounded-full">
            {/* PERFORMANCE: Replaced backdrop-blur-md with solid bg-white/95 */}
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-colors duration-200 ${
                billingCycle === "monthly"
                  ? "bg-gradient-to-r from-[#FF6A1A] to-[#FF8A1A] text-white shadow-lg"
                  : "text-black/60 hover:text-black/80"
              }`}
            >
              {/* PERFORMANCE: Changed transition-all to transition-colors */}
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-colors duration-200 flex items-center gap-2 ${
                billingCycle === "annual"
                  ? "bg-gradient-to-r from-[#FF6A1A] to-[#FF8A1A] text-white shadow-lg"
                  : "text-black/60 hover:text-black/80"
              }`}
            >
              Annual
              <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                billingCycle === "annual" ? "bg-[#0A0A0A] text-white" : "bg-gradient-to-r from-[#FF6A1A] to-[#FF8A1A] text-white"
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
            {/* PERFORMANCE: Removed blur-xl glow effect - expensive CSS filter operation */}
            {/* Using solid gradient border instead */}
            <div className="absolute -inset-[2px] bg-gradient-to-b from-[#FF6A1A] to-[#FF8A1A] rounded-3xl" />
            
            <div className="relative bg-[#0A0A0A] border border-[#FF6A1A]/30 rounded-3xl p-8 shadow-xl">
              {/* PERFORMANCE: Changed from white/90 backdrop-blur-md to dark card pattern matching main page */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="px-4 py-1.5 bg-gradient-to-r from-[#FF6A1A] to-[#FF8A1A] text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  MOST POPULAR
                </div>
              </div>

              <div className="text-center pt-4 pb-6 border-b border-white/10">
                <h3 className="text-3xl font-extrabold mb-2">
                  <span className="text-white">Mark </span>
                  <span className="bg-gradient-to-r from-[#FF6A1A] to-[#FF8A1A] bg-clip-text text-transparent">
                    Pro
                  </span>
                </h3>
                <p className="text-sm text-white/60">
                  The AI marketing assistant with permanent brand memory.
                </p>
              </div>

              <div className="py-8 text-center">
                {billingCycle === "monthly" ? (
                  <>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-extrabold text-white">${monthlyPrice}</span>
                      <span className="text-lg text-white/60 font-medium">/month</span>
                    </div>
                    <p className="text-sm text-white/50 mt-2">Billed monthly</p>
                  </>
                ) : (
                  <>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-extrabold text-white">${annualMonthly}</span>
                      <span className="text-lg text-white/60 font-medium">/month</span>
                    </div>
                    <p className="text-sm text-white/50 mt-2">
                      ${annualPrice} billed annually
                    </p>
                    <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 border border-emerald-400/50 rounded-full">
                      {/* PERFORMANCE: Removed animate-pulse - continuous animation */}
                      <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                      <span className="text-xs font-semibold text-emerald-300">
                        Save ${(monthlyPrice * 12 - annualPrice).toFixed(2)}/year
                      </span>
                    </div>
                  </>
                )}
              </div>

              <button
                disabled
                className="block w-full py-4 px-6 bg-white/20 text-white/50 font-bold text-center rounded-xl cursor-not-allowed"
                title="Signups currently disabled"
              >
                Signups Temporarily Disabled
              </button>
              
              <p className="text-xs text-center text-white/50 mt-3">
                No credit card required • Cancel anytime
              </p>

              <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
                <p className="text-sm font-semibold text-white/70 mb-4">Everything included:</p>
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-br from-[#FF6A1A] to-[#FF8A1A] rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-white stroke-[3]" />
                    </div>
                    <span className="text-sm text-white/80 leading-relaxed">{feature}</span>
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
            {/* PERFORMANCE: Removed backdrop-blur-md from all FAQ cards */}
            <div className="bg-[#0A0A0A] border border-black/10 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-white mb-2">
                What happens after my free trial?
              </h3>
              <p className="text-white/70">
                After your 7-day trial, you'll be charged based on your chosen plan (monthly or annual). You can cancel anytime during the trial without being charged.
              </p>
            </div>

            <div className="bg-[#0A0A0A] border border-black/10 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-white mb-2">
                Can I switch between monthly and annual?
              </h3>
              <p className="text-white/70">
                Yes! You can upgrade from monthly to annual anytime to start saving. Changes take effect at the start of your next billing period.
              </p>
            </div>

            <div className="bg-[#0A0A0A] border border-black/10 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-white mb-2">
                What are AI usage limits?
              </h3>
              <p className="text-white/70">
                Your subscription includes generous monthly AI usage for typical workflows. If you need more, additional credits are available for purchase at any time.
              </p>
            </div>

            <div className="bg-[#0A0A0A] border border-black/10 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-white mb-2">
                Can I cancel my subscription?
              </h3>
              <p className="text-white/70">
                Absolutely. Cancel anytime from your billing settings. You'll continue to have access until the end of your current billing period.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* FOOTER - Matching main page design                */}
      {/* ================================================== */}
      <footer className="bg-white py-16 relative z-10">
        {/* PERFORMANCE: Removed backdrop-blur-sm - expensive filter operation */}
        <div className="max-w-6xl mx-auto px-8">
          
          {/* Social Links */}
          <div className="flex justify-center items-center gap-6 mb-8">
            <a 
              href="https://x.com/usemarkapp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-black/5 border border-black/10 hover:scale-110 transition-transform duration-200 flex items-center justify-center group"
              aria-label="Follow Mark on X (Twitter)"
            >
              <svg className="w-5 h-5 text-black/50 group-hover:text-[#FF6A1A] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            <a 
              href="https://www.instagram.com/usemarkapp/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-black/5 border border-black/10 hover:scale-110 transition-transform duration-200 flex items-center justify-center group"
              aria-label="Follow Mark on Instagram"
            >
              <svg className="w-5 h-5 text-black/50 group-hover:text-[#FF6A1A] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            <a 
              href="https://www.tiktok.com/@usemarkapp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-black/5 border border-black/10 hover:scale-110 transition-transform duration-200 flex items-center justify-center group"
              aria-label="Follow Mark on TikTok"
            >
              <svg className="w-5 h-5 text-black/50 group-hover:text-[#FF6A1A] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>

            <a 
              href="https://www.facebook.com/usemarkapp/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-black/5 border border-black/10 hover:scale-110 transition-transform duration-200 flex items-center justify-center group"
              aria-label="Follow Mark on Facebook"
            >
              <svg className="w-5 h-5 text-black/50 group-hover:text-[#FF6A1A] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            <a 
              href="https://www.youtube.com/@usemarkapp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-black/5 border border-black/10 hover:scale-110 transition-transform duration-200 flex items-center justify-center group"
              aria-label="Subscribe to Mark on YouTube"
            >
              <svg className="w-5 h-5 text-black/50 group-hover:text-[#FF6A1A] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-black/50">
            © {new Date().getFullYear()} Mark. Built in public by Brendan Goforth.
          </div>
        </div>
      </footer>
    </main>
  );
}
