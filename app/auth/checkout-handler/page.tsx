"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

function CheckoutHandlerContent() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("Creating checkout session...");

  useEffect(() => {
    const createCheckout = async () => {
      try {
        // Get checkout data from URL
        const data = searchParams.get("data");
        if (!data) {
          throw new Error("Missing checkout data");
        }

        const { priceId, plan } = JSON.parse(decodeURIComponent(data));
        
        setStatus("Contacting Stripe...");

        // Call backend to create Stripe checkout session
        const response = await fetch("http://localhost:8000/api/stripe/create-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            user_id: "temp", // Will be replaced by backend with actual user from session
            email: "temp@temp.com", // Will be replaced by backend
            name: "Temp User", // Will be replaced by backend
            brand_id: null,
            price_id: priceId,
            success_url: `${window.location.origin}/subscribe/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${window.location.origin}/subscribe?canceled=true`
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "Failed to create checkout session");
        }

        const checkoutData = await response.json();
        
        // Redirect to Stripe
        if (checkoutData.url) {
          setStatus("Redirecting to Stripe...");
          window.location.href = checkoutData.url;
        } else {
          throw new Error("No checkout URL received from Stripe");
        }
        
      } catch (err) {
        console.error("Checkout error:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      }
    };

    createCheckout();
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
              You'll be redirected to Stripe to complete your subscription.
            </p>
          </>
        )}
      </div>
    </main>
  );
}

export default function CheckoutHandlerPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="w-16 h-16 border-4 border-[#FF6A1A]/20 border-t-[#FF6A1A] rounded-full animate-spin" />
      </main>
    }>
      <CheckoutHandlerContent />
    </Suspense>
  );
}
