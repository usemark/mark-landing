"use client";

export default function ThankYouPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden px-6 text-center">

      {/* ORANGE GLOW BACKGROUND — TOP */}
      <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[1600px] h-[1600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,106,26,0.25),rgba(255,106,26,0.08),transparent_70%)] blur-[220px] opacity-70 pointer-events-none" />

      {/* ORANGE GLOW BACKGROUND — BOTTOM RIGHT */}
      <div className="absolute bottom-[-25%] right-[-10%] w-[1200px] h-[1200px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,162,100,0.22),transparent_70%)] blur-[200px] opacity-50 pointer-events-none" />

      {/* GLASS CARD */}
      <div className="relative z-10 max-w-2xl w-full px-10 py-16 rounded-3xl bg-white/70 backdrop-blur-2xl border border-black/5 shadow-[0_8px_40px_rgba(0,0,0,0.12)] animate-fade-slide">

        {/* HEADER */}
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-[0.9] text-[#0A0A0A]">
          You're in.
          <span className="block text-[#FF6A1A] drop-shadow-[0_4px_14px_rgba(255,106,26,0.35)] mt-2">
            Welcome aboard 🎉
          </span>
        </h1>

        {/* COPY */}
        <p className="text-lg md:text-xl text-black/70 leading-relaxed font-medium mt-6 mb-10">
          Thanks for joining the early access waitlist for{" "}
          <span className="text-black font-semibold">Mark</span>.
          <br />
          I’ll reach out as soon as your invite is ready.
        </p>

        {/* DIVIDER */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-black/10 to-transparent my-10" />

        {/* CTA BUTTON */}
        <a
          href="/"
          className="inline-block px-10 py-4 rounded-xl bg-[#FF6A1A] text-white text-lg font-semibold shadow-[0_10px_40px_rgba(255,106,26,0.35)] hover:bg-[#FF7E3A] transition-all duration-300 hover:scale-[1.04]"
        >
          Back to Home
        </a>

        {/* MINI FOOTER */}
        <p className="text-xs text-black/40 mt-12 tracking-wide">
          Mark — Make your Mark.
        </p>
      </div>
    </main>
  );
}
