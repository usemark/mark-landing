"use client";

import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { useEffect, useState } from "react";

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
  /* WAITLIST FORM STATE           */
  /* ============================= */
  const [showHeroWaitlist, setShowHeroWaitlist] = useState(false);
  const [showCtaWaitlist, setShowCtaWaitlist] = useState(false);

  const toggleHeroWaitlist = (buttonRef: HTMLButtonElement | null) => {
    setShowHeroWaitlist(!showHeroWaitlist);
    
    // Scroll to keep the button in view after the form expands/collapses
    if (!showHeroWaitlist && buttonRef) {
      setTimeout(() => {
        buttonRef.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 100);
    }
  };

  const toggleCtaWaitlist = (buttonRef: HTMLButtonElement | null) => {
    setShowCtaWaitlist(!showCtaWaitlist);
    
    // Scroll to keep the button in view after the form expands/collapses
    if (!showCtaWaitlist && buttonRef) {
      setTimeout(() => {
        buttonRef.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 100);
    }
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
        <Image
          src="/mark-logo.png"
          alt="Mark Logo"
          width={80}
          height={26}
          className="object-contain"
          priority
        />
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
          Mark is your marketing operating system—an AI-powered workspace where brand memory, content strategy, and daily insights come together in one place.
        </p>

        {/* CTA BUTTON */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={(e) => toggleHeroWaitlist(e.currentTarget)}
            className="btn-glow inline-flex items-center justify-center gap-2 px-8 py-3 text-sm md:text-[15px] font-semibold tracking-tight"
          >
            <span className="text-white">
              {showHeroWaitlist ? "Hide form" : "Join the early access list"}
            </span>
          </button>
        </div>

        {/* EXPANDING FORM */}
        <div
          className={`transition-all duration-700 overflow-hidden ${
            showHeroWaitlist ? "max-h-[600px] mt-6" : "max-h-0"
          }`}
        >
          <form
            action="https://app.kit.com/forms/8813748/subscriptions"
            method="post"
            className="bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/20 rounded-xl p-6 mt-4 max-w-md mx-auto w-full space-y-4"
          >
            {/* Redirect to thank-you page */}
            <input
              type="hidden"
              name="redirect_url"
              value="https://usemark.app/thank-you"
            />

            {/* First Name */}
            <input
              type="text"
              name="fields[first_name]"
              placeholder="First Name"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#FF6A1A]"
              required
            />

            {/* Last Name */}
            <input
              type="text"
              name="fields[last_name]"
              placeholder="Last Name"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#FF6A1A]"
              required
            />

            {/* Email */}
            <input
              type="email"
              name="email_address"
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#FF6A1A]"
              required
            />

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-[#FF6A1A] hover:bg-[#ff7e3a] transition text-white font-semibold rounded-lg shadow-lg"
            >
              Join Early Access
            </button>

            {/* No spam text */}
            <p className="text-[11px] text-white/50 text-center">
              No spam. You'll only hear from me when Mark is ready for you.
            </p>
          </form>
        </div>

        {/* GLASS CARD */}
        <div className="mt-20 flex justify-center">
          <div className="backdrop-blur-xl bg-white/30 border border-white/50 shadow-xl rounded-3xl px-12 py-10 max-w-xl animate-fade-in-up">
            <p className="text-lg text-[#0A0A0A] leading-relaxed font-medium">
              Think of Mark as your marketing command center—a single system that handles everything from campaign strategy to brand consistency, built for marketers and creators who share content online.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* ROADMAP TO BETA TIMELINE */}
      {/* ================================================== */}
      <section className="px-8 py-32 max-w-6xl mx-auto relative z-10 reveal">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#0A0A0A] mb-6">
            Roadmap to Beta
          </h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            Building Mark in public. Follow our journey from conception to launch.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#FF6A1A] via-[#FF8A1A] to-[#FFB84D]" />

          {/* Milestone 1: Development Start */}
          <div className="relative mb-24">
            <div className="flex items-center justify-between">
              {/* Left Content */}
              <div className="w-5/12 text-right pr-12">
                <div className="inline-block bg-white/80 backdrop-blur-md border border-black/5 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
                  <span className="inline-block px-3 py-1 bg-[#FF6A1A]/10 text-[#FF6A1A] rounded-full text-xs font-bold mb-3">
                    COMPLETED
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#0A0A0A] mb-2">Development Start</h3>
                  <p className="text-sm text-black/60 mb-2">Building the foundation of your marketing OS</p>
                  <p className="text-lg font-bold text-[#FF6A1A]">October 17, 2025</p>
                </div>
              </div>

              {/* Center Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#FF6A1A] rounded-full border-4 border-white shadow-lg z-10" />

              {/* Right Space */}
              <div className="w-5/12" />
            </div>
          </div>

          {/* Milestone 2: Alpha Testing */}
          <div className="relative mb-24">
            <div className="flex items-center justify-between">
              {/* Left Space */}
              <div className="w-5/12" />

              {/* Center Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#FF8A1A] rounded-full border-4 border-white shadow-lg z-10" />

              {/* Right Content */}
              <div className="w-5/12 text-left pl-12">
                <div className="inline-block bg-white/80 backdrop-blur-md border border-black/5 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
                  <span className="inline-block px-3 py-1 bg-[#FF8A1A]/10 text-[#FF8A1A] rounded-full text-xs font-bold mb-3">
                    IN PROGRESS
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#0A0A0A] mb-2">Alpha Testing</h3>
                  <p className="text-sm text-black/60 mb-2">Core features live, internal testing underway</p>
                  <p className="text-lg font-bold text-[#FF8A1A]">December 2025</p>
                </div>
              </div>
            </div>
          </div>

          {/* Milestone 3: Beta Launch */}
          <div className="relative">
            <div className="flex items-center justify-between">
              {/* Left Content */}
              <div className="w-5/12 text-right pr-12">
                <div className="inline-block bg-gradient-to-br from-[#FF6A1A]/10 to-[#FFB84D]/10 backdrop-blur-md border-2 border-[#FF6A1A]/30 rounded-2xl shadow-[0_20px_60px_rgba(255,106,26,0.3)] p-8 hover:shadow-[0_30px_80px_rgba(255,106,26,0.4)] transition-all">
                  <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#FF6A1A] to-[#FFB84D] text-white rounded-full text-sm font-bold mb-4">
                    🚀 BETA LAUNCH
                  </span>
                  <h3 className="text-3xl font-extrabold text-[#0A0A0A] mb-3">Mark Pro Beta</h3>
                  <p className="text-base text-black/70 mb-4">Public beta launch for all waitlist members</p>
                  <p className="text-2xl font-extrabold bg-gradient-to-r from-[#FF6A1A] to-[#FFB84D] bg-clip-text text-transparent">
                    January 22, 2026
                  </p>
                </div>
              </div>

              {/* Center Dot - HERO */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-[#FF6A1A] to-[#FFB84D] rounded-full border-4 border-white shadow-[0_0_30px_rgba(255,106,26,0.5)] z-10 animate-pulse" />

              {/* Right Space */}
              <div className="w-5/12" />
            </div>
          </div>

        </div>

        {/* Pricing Info */}
        <div className="mt-24 text-center">
          <div className="inline-block bg-white/80 backdrop-blur-md border border-black/5 rounded-2xl shadow-lg p-8 max-w-2xl">
            <h3 className="text-2xl font-extrabold text-[#0A0A0A] mb-4">Subscription-Based Premium Service</h3>
            <p className="text-base text-black/70 mb-4">
              Mark Pro will be a single-tier subscription designed for serious marketers and creators who want the best tools for their craft.
            </p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-lg font-semibold text-black/60">Pricing:</span>
              <span className="px-4 py-2 bg-[#FF6A1A]/10 text-[#FF6A1A] rounded-lg font-bold">
                Premium • TBA
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* DEMO PREVIEW - SCREENSHOTS */}
      {/* ================================================== */}
      <section className="px-8 py-32 max-w-[1400px] mx-auto relative z-10 reveal">
        <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#0A0A0A] text-center mb-6">
          See Mark in action
        </h2>
        <p className="text-lg text-black/70 text-center max-w-2xl mx-auto mb-20">
          Your marketing operating system in five powerful modules.
        </p>

        {/* Screenshot Grid - Premium Layout - All Full Width */}
        <div className="space-y-24">
          
          {/* Brand Profile Screenshot - Full Width */}
          <div className="group">
            <div className="mb-6 text-center">
              <h3 className="text-3xl font-extrabold text-[#0A0A0A] mb-3">Brand Memory System</h3>
              <p className="text-base text-black/60 max-w-2xl mx-auto">
                Teach Mark your voice, style, and goals—it remembers everything so your content stays consistent across every channel.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.12)] border border-black/5 hover:shadow-[0_30px_100px_rgba(0,0,0,0.18)] transition-all duration-500 group-hover:scale-[1.02]">
              <Image
                src="/screenshots/brand-profile.png"
                alt="Mark Brand Profile - Build your personalized AI marketing assistant"
                width={1400}
                height={787}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>

          {/* Idea Lab Screenshot - Full Width */}
          <div className="group">
            <div className="mb-6 text-center">
              <h3 className="text-3xl font-extrabold text-[#0A0A0A] mb-3">Idea Lab</h3>
              <p className="text-base text-black/60 max-w-2xl mx-auto">
                Brainstorm and develop campaign ideas through a structured 3-phase workflow—from initial concepts to execution-ready strategies.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.12)] border border-black/5 hover:shadow-[0_30px_100px_rgba(0,0,0,0.18)] transition-all duration-500 group-hover:scale-[1.02]">
              <Image
                src="/screenshots/idea-lab.png"
                alt="Mark Idea Lab - 3-phase brainstorming workflow for marketers and content creators"
                width={1400}
                height={787}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Projects Screenshot - Full Width */}
          <div className="group">
            <div className="mb-6 text-center">
              <h3 className="text-3xl font-extrabold text-[#0A0A0A] mb-3">Projects</h3>
              <p className="text-base text-black/60 max-w-2xl mx-auto">
                Organize campaigns and initiatives in dedicated project spaces with summaries, artifacts, briefs, and task tracking.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.12)] border border-black/5 hover:shadow-[0_30px_100px_rgba(0,0,0,0.18)] transition-all duration-500 group-hover:scale-[1.02]">
              <Image
                src="/screenshots/projects-view.png"
                alt="Mark Projects - Organize campaigns and track progress in dedicated workspaces"
                width={1400}
                height={787}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Daily News Screenshot - Full Width */}
          <div className="group">
            <div className="mb-6 text-center">
              <h3 className="text-3xl font-extrabold text-[#0A0A0A] mb-3">Daily News Insights</h3>
              <p className="text-base text-black/60 max-w-2xl mx-auto">
                Get personalized industry news and trends curated for your market every morning—stay ahead without the noise.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.12)] border border-black/5 hover:shadow-[0_30px_100px_rgba(0,0,0,0.18)] transition-all duration-500 group-hover:scale-[1.02]">
              <Image
                src="/screenshots/daily-news.png"
                alt="Mark Daily News - Personalized news insights for content creators"
                width={1400}
                height={787}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Conversational Threads Screenshot - Full Width */}
          <div className="group">
            <div className="mb-6 text-center">
              <h3 className="text-3xl font-extrabold text-[#0A0A0A] mb-3">Conversational Threads</h3>
              <p className="text-base text-black/60 max-w-2xl mx-auto">
                Work through strategy, copywriting, and revisions in natural conversations—no complex interfaces, just intelligent dialogue.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.12)] border border-black/5 hover:shadow-[0_30px_100px_rgba(0,0,0,0.18)] transition-all duration-500 group-hover:scale-[1.02]">
              <Image
                src="/screenshots/threads-interface.png"
                alt="Mark Conversational Threads - Natural AI conversations for content strategy"
                width={1400}
                height={787}
                className="w-full h-auto"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ================================================== */}
      {/* CTA SECTION (CUSTOM CONVERTKIT FORM + REDIRECT) */}
      {/* ================================================== */}
      <section className="px-8 py-28 max-w-4xl mx-auto relative z-10 reveal">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FF6A1A] via-[#FF8A1A] to-[#FF3E00] p-[1px] shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          <div className="bg-[#050505] rounded-3xl px-10 py-10 md:px-12 md:py-12 text-center text-white relative">
            <div className="absolute inset-0 opacity-40 blur-3xl bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.28),transparent_60%)] pointer-events-none" />

            <div className="relative">
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
                Your marketing operating system awaits.
              </h3>

              <p className="text-sm md:text-base text-white/75 max-w-xl mx-auto mb-8">
                Join the waitlist and be among the first to experience a workspace built for marketers and creators—where strategy, content, and brand memory work together seamlessly.
              </p>

              <div className="flex flex-col items-center">

                {/* CTA BUTTON */}
                <MagneticButton 
                  onClick={(buttonElement) => toggleCtaWaitlist(buttonElement)}
                >
                  <span className="text-white">
                    {showCtaWaitlist ? "Hide form" : "Join the early access list"}
                  </span>
                </MagneticButton>

                {/* EXPANDING CUSTOM FORM */}
                <div
                  className={`transition-all duration-700 overflow-hidden ${
                    showCtaWaitlist ? "max-h-[600px] mt-6" : "max-h-0"
                  }`}
                >
                  <form
                    action="https://app.kit.com/forms/8813748/subscriptions"
                    method="post"
                    className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 mt-4 max-w-md mx-auto w-full space-y-4"
                  >

                    {/* Redirect to thank-you page */}
                    <input
                      type="hidden"
                      name="redirect_url"
                      value="https://usemark.app/thank-you"
                    />

                    {/* First Name */}
                    <input
                      type="text"
                      name="fields[first_name]"
                      placeholder="First Name"
                      className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#FF6A1A]"
                      required
                    />

                    {/* Last Name */}
                    <input
                      type="text"
                      name="fields[last_name]"
                      placeholder="Last Name"
                      className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#FF6A1A]"
                      required
                    />

                    {/* Email */}
                    <input
                      type="email"
                      name="email_address"
                      placeholder="Email Address"
                      className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#FF6A1A]"
                      required
                    />

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#FF6A1A] hover:bg-[#ff7e3a] transition text-white font-semibold rounded-lg shadow-lg"
                    >
                      Join Early Access
                    </button>

                  </form>
                </div>
              </div>

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
          Hey, I'm Brendan. I built Mark because marketers and content creators deserve better tools. The marketing landscape is fragmented—AI tools that don't remember your brand, strategy tools disconnected from execution, and no single system built specifically for people who create and share content online.
        </p>

        <p className="text-lg text-black/70 leading-relaxed mt-4 font-medium">
          Mark is my answer to that: a marketing operating system that brings everything together—brand memory, strategic thinking, campaign planning, and daily insights—in one intelligent workspace that learns from you and grows with you.
        </p>


      </section>

      {/* ================================================== */}
      {/* FOOTER */}
      {/* ================================================== */}
      <footer className="px-8 py-12 border-t text-center text-sm text-black/60 relative z-10">
        © {new Date().getFullYear()} Mark. Built in public by Brendan Goforth.
      </footer>
    </main>
  );
}

/* ================================================== */
/* FEATURE CARD */
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
/* MAGNETIC BUTTON */
/* ================================================== */

function MagneticButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: (buttonElement: HTMLButtonElement | null) => void;
}) {
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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e.currentTarget);
    }
  };

  return (
    <button
      onClick={handleClick}
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
