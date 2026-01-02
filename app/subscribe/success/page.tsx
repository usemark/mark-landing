"use client";

import { CheckCircle2 } from "lucide-react";

export default function SubscribeSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF6A1A] via-[#FF8A1A] to-[#FFB84D] blur-xl opacity-50 animate-pulse"></div>
            <CheckCircle2 className="relative w-24 h-24 text-[#FF6A1A]" strokeWidth={1.5} />
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-5xl md:text-6xl font-bold">
            <span className="text-white">Welcome to </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A1A] via-[#FF8A1A] to-[#FFB84D]">
              Mark Pro
            </span>
          </h1>
          
          <p className="text-xl text-white/70 max-w-xl mx-auto">
            Your subscription is now active. You have <span className="text-[#FF6A1A] font-semibold">7 days free</span> to explore everything Mark has to offer.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-white/90 text-sm leading-relaxed">
              <span className="text-[#FF6A1A] font-semibold">Your trial has started!</span> You won't be charged until{" "}
              {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}. Cancel anytime before then at no cost.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <a 
            href={process.env.NEXT_PUBLIC_APP_URL || "https://app.usemark.app"}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#FF6A1A] via-[#FF8A1A] to-[#FFB84D] hover:opacity-90 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span>Access Mark Now</span>
            <svg 
              className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>

        {/* Support Message */}
        <div className="mt-12 text-center">
          <p className="text-white/50 text-sm">
            Need help getting started?{" "}
            <a 
              href="mailto:support@usemark.app" 
              className="text-[#FF6A1A] hover:text-[#ff7e3a] transition-colors"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
