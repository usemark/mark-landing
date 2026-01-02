"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function AuthCheckoutPage() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("Initializing...");

  useEffect(() => {
    const handleCheckout = async () => {
      try {
        const plan = searchParams.get("plan") || "monthly";
        
        setStatus("Redirecting to sign-in...");
        
        // Define price IDs
        const priceIds = {
          monthly: "price_1SkwslRcHs25I9Gszj33u6sU",
          annual: "price_1SkyHLRcHs25I9GsVx91d03y"
        };

        const priceId = priceIds[plan as keyof typeof priceIds];
        
        if (!priceId) {
          throw new Error("Invalid plan selected");
        }

        // Encode checkout data in URL for after sign-in
        const checkoutData = encodeURIComponent(JSON.stringify({ priceId, plan }));
        
        // Use environment variable or default to production URL
        const baseUrl = process.env.NEXT_PUBLIC_LANDING_URL || 'https://usemark.app';
        
        // Redirect to Clerk sign-in on marketing site with return to this page
        const signInUrl = `${baseUrl}/sign-in?redirect_url=${encodeURIComponent(
          `${baseUrl}/auth/checkout-handler?data=${checkoutData}`
        )}`;
        
        window.location.href = signInUrl;
        
      } catch (err) {
        console.error("Checkout error:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };

    handleCheckout();
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <Image
          src="/mark-logo.png"
          alt="Mark Logo"
          width={120}
          height={40}
          className="object-contain mx-auto mb-8"
        />
        
        {error ? (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-[#0A0A0A] mb-2">
              Something went wrong
            </h1>
            <p className="text-black/60 mb-6">{error}</p>
            <a
              href="/subscribe"
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#FF6A1A] to-[#FF8A4A] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Back to Subscribe
            </a>
          </>
        ) : (
          <>
            <div className="w-16 h-16 border-4 border-[#FF6A1A]/20 border-t-[#FF6A1A] rounded-full animate-spin mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-[#0A0A0A] mb-2">
              {status}
            </h1>
            <p className="text-black/60">
              Please wait while we prepare your checkout...
            </p>
          </>
        )}
      </div>
    </main>
  );
}
