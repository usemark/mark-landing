"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type DemoTab = "strategy" | "content" | "analytics";

export default function MarketingHome() {
  /* ============================= */
  /* SCROLL REVEAL ANIMATION HOOK */
  /* ============================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-slide");
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ============================= */
  /* CLIENT-ONLY PARTICLES         */
  /* ============================= */
  const [particles, setParticles] = useState<
    { top: string; left: string; delay: string }[]
  >([]);

  useEffect(() => {
    const arr = Array.from({ length: 18 }).map(() => ({
      top: `${Math.random() * 90}%`,
      left: `${Math.random() * 90}%`,
      delay: `${Math.random() * 3}s`,
    }));
    setParticles(arr);
  }, []);

  /* ============================= */
  /* PARALLAX SCROLL STATE         */
  /* ============================= */
  const [scrollY, setScrollY] = useState(0);

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

  /* ============================= */
  /* CURSOR SPOTLIGHT STATE        */
  /* ============================= */
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPos({ x, y });
  };

  /* ============================= */
  /* DEMO TABS STATE               */
  /* ============================= */
  const [demoTab, setDemoTab] = useState<DemoTab>("strategy");

  const demoContent: Record<DemoTab, { user: string; mark: string }> = {
    strategy: {
      user: "Give me a 7-day content game plan to relaunch my brand on TikTok.",
      mark: "Here’s a 7-day relaunch sprint: Day 1 – Origin story video, Day 2 – Problem & promise, Day 3 – Quick win tutorial, Day 4 – Blind reaction / stitch, Day 5 – Results or proof, Day 6 – Behind-the-scenes process, Day 7 – Recap + call to action. I’ll script each one and keep them in a single thread so you never lose the plan.",
    },
    content: {
      user: "Write a bold hook and caption for a TikTok about turning chaos into a marketing system.",
      mark: "Hook: “Your marketing isn’t failing… it’s just scattered.” Caption: “Most creators don’t need more ideas—they need a system that turns ideas into content on repeat. Here’s how I’d turn your chaos into a weekly content engine 👇” Then add 3–5 punchy bullet points and a soft CTA to your offer or waitlist.",
    },
    analytics: {
      user: "Look at my last 20 posts and tell me what’s actually working.",
      mark: "Your posts with the strongest watch time are all: 1) concrete and specific, 2) story-driven, and 3) tied to a clear transformation. Formats that underperform are vague listicles and generic trends. I’d recommend we double down on story-first posts and build two repeatable series from those top performers.",
    },
  };

  return (
    <main
      className="min-h-screen bg-white relative overflow-hidden flex flex-col"
      onMouseMove={handleMouseMove}
    >
      {/* ================================================== */}
      {/* BACKGROUND GLOWS + WAVE + PARTICLES + SPOTLIGHT   */}
      {/* ================================================== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* ORANGE GRADIENTS */}
        <div
          className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[1600px] h-[1600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,106,26,0.55),rgba(255,180,120,0.20),transparent_70%)] blur-[260px]"
          style={{ transform: `translate3d(0, ${scrollY * -0.05}px, 0)` }}
        />
        <div
          className="absolute top-[40%] left-[20%] w-[1100px] h-[1100px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,90,0,0.22),transparent_70%)] blur-[210px]"
          style={{ transform: `translate3d(0, ${scrollY * -0.03}px, 0)` }}
        />

        {/* ANIMATED BACKGROUND WAVE */}
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

        {/* FLOATING PARTICLES — CLIENT ONLY */}
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

        {/* CURSOR SPOTLIGHT */}
        <div
          className="cursor-spotlight"
          style={{
            top: `${cursorPos.y}px`,
            left: `${cursorPos.x}px`,
          }}
        />
      </div>

      {/* ================================================== */}
      {/* NAVBAR */}
      {/* ================================================== */}
      <nav className="w-full flex justify-between items-center px-8 py-6 border-b bg-white/70 backdrop-blur-lg relative z-10">
        <div className="text-4xl font-extrabold tracking-tight text-[#0A0A0A]">
          Mark
        </div>

{/* Temporarily removed Sign In button for public landing launch */}
      </nav>

      {/* ================================================== */}
      {/* HERO */}
      {/* ================================================== */}
      <section className="px-8 py-40 max-w-5xl mx-auto text-center relative z-10">
        <h1 className="text-7xl md:text-8xl font-extrabold tracking-tight leading-[0.9] text-[#0A0A0A]">
          <span className="block animate-hero-left">Make your</span>
          <span className="block text-[#FF6A1A] animate-hero-right">Mark.</span>
        </h1>

        <p className="mt-8 text-xl md:text-2xl font-medium text-black/70 max-w-3xl mx-auto leading-relaxed">
          Your all-in-one AI Marketing Assistant—built for creators, founders,
          and businesses who want clarity, consistency, and speed.
        </p>

        <p className="mt-3 text-sm text-black/60 italic">
          Early access waitlist opening soon.
        </p>

        {/* GLASS CARD */}
        <div className="mt-20 flex justify-center">
          <div className="backdrop-blur-xl bg-white/30 border border-white/50 shadow-xl rounded-3xl px-12 py-10 max-w-xl animate-fade-in-up">
            <p className="text-lg text-[#0A0A0A] leading-relaxed font-medium">
              Mark is built to feel like a true teammate — one that understands
              your brand, your voice, and your goals… and helps you create
              faster, smarter, and with total clarity.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* FEATURES — SCROLL REVEAL + 3D TILT */}
      {/* ================================================== */}
      <section className="px-8 py-28 max-w-6xl mx-auto grid md:grid-cols-3 gap-12 relative z-10">
        <div className="reveal">
          <FeatureCard
            title="AI-Powered Threads"
            desc="A conversation-based workflow that handles planning, creation, strategy, and analysis in one place."
          />
        </div>

        <div className="reveal delay-1">
          <FeatureCard
            title="Brand-Aware Intelligence"
            desc="Mark learns your tone, goals, and audience—automatically generating content aligned with your identity."
          />
        </div>

        <div className="reveal delay-2">
          <FeatureCard
            title="Unified Marketing OS"
            desc="A single workspace for content, insights, automations, and planning—built for speed and simplicity."
          />
        </div>
      </section>

      {/* ================================================== */}
      {/* INTERACTIVE DEMO PREVIEW */}
      {/* ================================================== */}
      <section className="px-8 py-24 max-w-4xl mx-auto relative z-10 reveal">
        <h2 className="text-4xl font-extrabold tracking-tight text-[#0A0A0A] text-center mb-4">
          See Mark in action
        </h2>
        <p className="text-base text-black/70 text-center max-w-2xl mx-auto">
          A single thread where strategy, content, and analytics all live in one
          place.
        </p>

        <div className="mt-10 bg-white/80 backdrop-blur-md border border-black/5 rounded-3xl shadow-lg p-6 md:p-8">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 text-xs font-medium text-black/70 mb-6">
            {(["strategy", "content", "analytics"] as DemoTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setDemoTab(tab)}
                className={`px-3 py-1 rounded-full border transition ${
                  demoTab === tab
                    ? "bg-[#FF6A1A] text-white border-transparent"
                    : "bg-white text-black/60 border-black/10 hover:bg-black/5"
                }`}
              >
                {tab === "strategy" && "Strategy"}
                {tab === "content" && "Content"}
                {tab === "analytics" && "Analytics"}
              </button>
            ))}
          </div>

          {/* Fake conversation */}
          <div className="space-y-4 text-sm leading-relaxed">
            {/* User bubble */}
            <div className="flex justify-end">
              <div className="rounded-2xl bg-[#111111] text-white px-4 py-3 max-w-[80%] shadow-md">
                {demoContent[demoTab].user}
              </div>
            </div>
            {/* Mark bubble */}
            <div className="flex justify-start">
              <div className="rounded-2xl bg-[#FFF3E8] border border-[#FFD0A3] text-[#3A1A00] px-4 py-3 max-w-[85%] shadow-sm">
                {demoContent[demoTab].mark}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* GLOWING CTA SECTION + MAGNETIC BUTTON */}
      {/* ================================================== */}
      <section className="px-8 py-28 max-w-4xl mx-auto relative z-10 reveal">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FF6A1A] via-[#FF8A1A] to-[#FF3E00] p-[1px] shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          <div className="bg-[#050505] rounded-3xl px-10 py-10 md:px-12 md:py-12 text-center text-white relative">
            <div className="absolute inset-0 opacity-40 blur-3xl bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.28),transparent_60%)] pointer-events-none" />
            <div className="relative">
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
                A new way to run your marketing.
              </h3>
              <p className="text-sm md:text-base text-white/75 max-w-xl mx-auto mb-8">
                Be one of the first to plug your brand into Mark and turn chaos
                into a clear, repeatable marketing system.
              </p>

              <MagneticButton>
                Join the early access list
              </MagneticButton>

              <p className="mt-3 text-[11px] text-white/50">
                No spam. You’ll only hear from me when Mark is ready for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* FOUNDER MESSAGE */}
      {/* ================================================== */}
      <section className="px-8 py-32 max-w-3xl mx-auto text-center relative z-10 reveal">
        <h2 className="text-5xl font-extrabold tracking-tight text-[#0A0A0A] mb-8">
          A message from the founder
        </h2>

        <p className="text-lg text-black/70 leading-relaxed font-medium">
          Hey — I’m Brendan. I’m building Mark because marketing shouldn’t feel
          overwhelming or scattered across dozens of tools. I wanted a system
          that helps creators and businesses move faster, stay consistent, and
          grow without chaos.
        </p>

        <p className="text-lg text-black/70 leading-relaxed mt-4 font-medium">
          Mark is designed to feel human — a teammate who understands your brand,
          your goals, and how to help you move forward every day.
        </p>

        <p className="text-sm text-black/60 italic mt-6">
          Early access waitlist launching soon.
        </p>
      </section>

      {/* ================================================== */}
      {/* FOOTER */}
      {/* ================================================== */}
      <footer className="px-8 py-12 border-t text-center text-sm text-black/60 relative z-10">
        © {new Date().getFullYear()} Mark — Built in public by Brendan Goforth
      </footer>
    </main>
  );
}

/* ================================================== */
/* 3D Tilt Feature Card */
/* ================================================== */

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div
      className="
        p-8 rounded-2xl bg-white/70 backdrop-blur-md border border-white/60 shadow-lg
        tilt-3d hover:shadow-2xl transition-all
      "
    >
      <h3 className="text-3xl font-extrabold text-[#0A0A0A] mb-2">{title}</h3>
      <p className="text-sm text-black/70 leading-relaxed font-medium">
        {desc}
      </p>
    </div>
  );
}

/* ================================================== */
/* MAGNETIC CTA BUTTON */
/* ================================================== */

function MagneticButton({ children }: { children: React.ReactNode }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relativeX = e.clientX - (rect.left + rect.width / 2);
    const relativeY = e.clientY - (rect.top + rect.height / 2);

    setOffset({
      x: relativeX / 6,
      y: relativeY / 6,
    });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <button
      className="btn-glow inline-flex items-center justify-center gap-2 px-8 py-3 text-sm md:text-[15px] font-semibold tracking-tight"
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}
