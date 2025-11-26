"use client";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-6 text-center">
      <div className="max-w-lg animate-fade-slide">
        <h1 className="text-5xl font-extrabold text-[#0A0A0A] mb-4">
          You're on the list 🎉
        </h1>

        <p className="text-lg text-black/70 leading-relaxed font-medium mb-6">
          Thanks for joining the early access waitlist for Mark.
          <br />
          You’ll hear from me as soon as your invite is ready.
        </p>

        <a
          href="/"
          className="inline-block mt-4 px-6 py-3 rounded-lg bg-[#FF6A1A] text-white font-semibold shadow-lg hover:bg-[#FF7E3A] transition"
        >
          Back to Home
        </a>
      </div>
    </main>
  );
}
