"use client";

export default function ThankYouPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-[#050505] overflow-hidden px-6 text-center">

      {/* ORANGE GLOW BACKGROUND */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1600px] h-[1600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,106,26,0.55),rgba(255,106,26,0.20),transparent_70%)] blur-[260px] opacity-60 pointer-events-none" />

      {/* SECONDARY GLOW */}
      <div className="absolute bottom-[-25%] right-[-10%] w-[1200px] h-[1200px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,180,120,0.25),transparent_70%)] blur-[240px] opacity-40 pointer-events-none" />

      {/* GLASS CARD */}
      <div className="relative z-10 max-w-2xl w-full px-10 py-16 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.6)] animate-fade-slide">

        {/* HEADER */}
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-[0.9] text-white drop-shadow-[0_4px_14px_rgba(255,106,26,0.35)]">
          You're in.
          <span className="block text-[#FF6A1A] mt-2">Welcome aboard 🎉</span>
        </h1>

        {/* COPY */}
        <p className="text-lg md:text-xl text-white/70 leading-relaxed font-medium mt-6 mb-10">
          You’re officially on the early access list for <span className="text-white font-semibold">Mark</span>.
          <br />
          I’ll email you the moment your invite is ready.
        </p>

        {/* DIVIDER */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-10" />

        {/* CTA BUTTON */}
        <a
          href="/"
          className="inline-block px-10 py-4 rounded-xl bg-[#FF6A1A] text-white text-lg font-semibold shadow-[0_10px_40px_rgba(255,106,26,0.45)] hover:bg-[#FF7E3A] transition-all duration-300 hover:scale-[1.04]"
        >
          Back to Home
        </a>

        {/* MINI FOOTER */}
        <p className="text-xs text-white/40 mt-12 tracking-wide">
          Mark — Make your Mark.
        </p>
      </div>
    </main>
  );
}
