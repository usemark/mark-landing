"use client";

import { useState, useEffect } from "react";

export default function ThankYouPage() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<
    { top: string; left: string; delay: string }[]
  >([]);

  /* Create floating particles */
  useEffect(() => {
    const arr = Array.from({ length: 14 }).map(() => ({
      top: `${Math.random() * 80}%`,
      left: `${Math.random() * 80}%`,
      delay: `${Math.random() * 3}s`,
    }));
    setParticles(arr);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPos({ x, y });
  };

  return (
    <main
      className="min-h-screen relative flex items-center justify-center bg-[#FDFBF9] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Orange radial glow */}
        <div
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1400px] h-[1400px] rounded-full 
          bg-[radial-gradient(circle_at_center,rgba(255,106,26,0.4),rgba(255,106,26,0.15),transparent_70%)]
          blur-[220px]"
        />

        {/* Soft ambient glow */}
        <div
          className="absolute bottom-[10%] left-[20%] w-[900px] h-[900px] rounded-full 
          bg-[radial-gradient(circle_at_center,rgba(255,151,74,0.25),transparent_70%)]
          blur-[200px]"
        />

        {/* Floating particles */}
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#FF6A1A]/70 rounded-full animate-sparkle"
            style={{
              top: p.top,
              left: p.left,
              animationDelay: p.delay,
            }}
          />
        ))}

        {/* Cursor spotlight */}
        <div
          className="pointer-events-none w-60 h-60 rounded-full absolute 
          bg-[radial-gradient(circle,rgba(255,255,255,0.35),transparent_60%)] blur-2xl mix-blend-soft-light"
          style={{
            top: cursorPos.y - 120,
            left: cursorPos.x - 120,
          }}
        />
      </div>

      {/* Main Card */}
      <div
        className="relative z-10 max-w-lg text-center px-10 py-14 rounded-3xl 
        backdrop-blur-xl bg-white/30 border border-white/40 shadow-[0_25px_80px_rgba(0,0,0,0.15)]
        animate-fade-in-up"
      >
        <h1 className="text-6xl font-extrabold tracking-tight text-[#0A0A0A] mb-4 animate-hero-left">
          You're on the list 🎉
        </h1>

        <p className="text-lg text-black/70 leading-relaxed font-medium mb-8 animate-fade-slide">
          Thanks for joining the early access waitlist for <span className="font-semibold">Mark</span>.
          <br />
          I'll send your invite as soon as the next cohort opens.
        </p>

        <a
          href="/"
          className="inline-flex items-center justify-center px-8 py-3 rounded-xl 
          bg-gradient-to-r from-[#FF6A1A] via-[#FF8A1A] to-[#FF3E00] 
          text-white font-semibold shadow-lg hover:opacity-90 transition
          animate-fade-in-up"
        >
          Back to Home
        </a>
      </div>

      {/* Keyframe Animations */}
      <style jsx>{`
        @keyframes sparkle {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.6); opacity: 0.4; }
          100% { transform: scale(1); opacity: 0.8; }
        }
        .animate-sparkle {
          animation: sparkle 3s infinite ease-in-out;
        }
        @keyframes fade-slide {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-slide {
          animation: fade-slide 0.8s ease forwards;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.9s ease forwards;
        }
        @keyframes hero-left {
          0% { opacity: 0; transform: translateX(-20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-hero-left {
          animation: hero-left 0.8s ease-out forwards;
        }
      `}</style>
    </main>
  );
}
