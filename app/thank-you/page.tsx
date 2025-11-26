"use client";

export default function ThankYouPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden px-6 text-center">

      {/* Soft orange glow */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1400px] h-[1400px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,106,26,0.40),rgba(255,106,26,0.10),transparent_70%)] blur-[240px] opacity-60 pointer-events-none" />

      {/* Dimmed background glow */}
      <div className="absolute bottom-[-20%] right-[-10%] w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,140,60,0.35),transparent_70%)] blur-[200px] opacity-40 pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 max-w-xl animate-fade-slide">

        <h1 className="text-6xl md:text-7xl font-extrabold text-[#0A0A0A] tracking-tight leading-[0.9]">
          You're in.  
          <span className="block text-[#FF6A1A] mt-1">Welcome aboard 🎉</span>
        </h1>

        <p className="text-lg text-black/70 leading-relaxed font-medium mt-6 mb-8">
          Thanks for joining the early access waitlist for Mark — your all-in-one AI Marketing Assistant.
          <br />
          You’ll be the first to know when your invite is ready.
        </p>

        <a
          href="/"
          className="inline-block px-8 py-4 rounded-xl bg-[#FF6A1A] text-white text-lg font-semibold shadow-[0_10px_30px_rgba(255,106,26,0.35)] hover:bg-[#FF7E3A] transition-transform duration-300 hover:scale-[1.04]"
        >
          Back to Home
        </a>

      </div>
    </main>
  );
}
