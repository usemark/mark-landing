"use client";

import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { useEffect, useState } from "react";
import MarketingNav from "@/components/MarketingNav";

export default function MarketingHome() {
  /* ============================= */
  /* BLOG POSTS STATE              */
  /* ============================= */
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch('/api/blog');
        const allPosts = await response.json();
        setPosts(allPosts.slice(0, 2)); // Get first 2 posts
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

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
  /* PERFORMANCE: Removed particles, scroll tracking, and cursor tracking */
  /* These caused continuous animations and React state updates */
  /* ============================= */

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
    >
      {/* PERFORMANCE: Removed onMouseMove handler that triggered state updates on every pixel */}

      {/* ================================================== */}
      {/* BACKGROUND ELEMENTS                               */}
      {/* PERFORMANCE: Removed orange blur gradients entirely - they were causing */}
      {/* expensive CSS filter operations even at reduced blur radius */}
      {/* ================================================== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* PERFORMANCE: Orange gradient blurs REMOVED - too expensive for scroll performance */}
        {/* If you want subtle color, use a static CSS gradient without blur filter */}

        {/* PERFORMANCE: Removed animated wave SVG - continuous CSS animation hurts scroll */}
        {/* The wave used animate-wave which ran constantly */}

        {/* PERFORMANCE: Removed floating particles - 8 concurrent CSS animations add up */}
        {/* Each particle had animate-sparkle running continuously */}
      </div>

      {/* ================================================== */}
      {/* NAVBAR */}
      {/* ================================================== */}
      <MarketingNav />

      {/* ================================================== */}
      {/* HERO SECTION - Bold transformation */}
      {/* ================================================== */}
      <section className="pt-32 pb-20 relative z-10">
        <div className="max-w-6xl mx-auto px-8">
          {/* The Hero Statement */}
          <div className="text-center mb-20">
            {/* Make Your Mark tagline */}
            <p className="inline-block mb-6 text-lg md:text-xl font-bold tracking-wide">
              <span className="text-[#0A0A0A]">Make Your </span>
              <span className="bg-gradient-to-r from-[#FF6A1A] to-[#FF8A1A] bg-clip-text text-transparent">Mark</span>
            </p>
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-[#0A0A0A] leading-[0.95]">
              Stop re-explaining yourself.
              <br />
              <span className="bg-gradient-to-r from-[#FF6A1A] to-[#FF8A1A] bg-clip-text text-transparent">Start creating.</span>
            </h1>
            <p className="mt-8 text-xl md:text-2xl text-black/60 max-w-2xl mx-auto">
              The AI marketing assistant with permanent brand memory.
            </p>

            {/* CTA BUTTON */}
            <div className="mt-10 flex justify-center">
              <button
                onClick={(e) => toggleHeroWaitlist(e.currentTarget)}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold tracking-tight rounded-full bg-gradient-to-r from-[#FF6A1A] to-[#FF8A1A] text-white shadow-lg hover:scale-105 transition-transform duration-200"
              >
                <span>
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
                className="bg-[#0A0A0A] border border-white/20 rounded-xl p-6 mt-4 max-w-md mx-auto w-full space-y-4"
              >
                <input
                  type="hidden"
                  name="redirect_url"
                  value="https://usemark.app/thank-you"
                />

                <input
                  type="text"
                  name="fields[first_name]"
                  placeholder="First Name"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#FF6A1A]"
                  required
                />

                <input
                  type="text"
                  name="fields[last_name]"
                  placeholder="Last Name"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#FF6A1A]"
                  required
                />

                <input
                  type="email"
                  name="email_address"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#FF6A1A]"
                  required
                />

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#FF6A1A] to-[#FF8A1A] hover:opacity-90 transition text-white font-semibold rounded-lg shadow-lg"
                >
                  Join Early Access
                </button>

                <p className="text-[11px] text-white/50 text-center">
                  No spam. You'll only hear from me when Mark is ready for you.
                </p>
              </form>
            </div>
          </div>

          {/* The Visual Transformation - Oversized contrast */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* LEFT: Without Mark - The cost of repetition (RED focus) */}
            <div className="relative group">
              {/* Bold red glow border */}
              <div className="absolute -inset-[2px] bg-gradient-to-b from-red-500 via-red-600/60 to-red-700/40 rounded-3xl" />
              <div className="relative bg-gradient-to-b from-[#1A0A0A] to-[#0A0A0A] rounded-3xl p-10 h-full min-h-[450px] flex flex-col border border-red-500/30">
                {/* Top accent line */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-red-500/70 to-transparent" />
                
                {/* Strikethrough label */}
                <div className="mb-6">
                  <span className="text-red-400 text-sm font-medium uppercase tracking-widest line-through decoration-red-500 decoration-2">
                    Average AI Tool
                  </span>
                </div>
                
                {/* The endless loop visualization */}
                <div className="flex-1 flex flex-col justify-center items-center">
                  {/* Giant X mark */}
                  <div className="text-center mb-8">
                    <span className="text-8xl md:text-9xl font-black text-red-500/40">✕</span>
                    <p className="text-white font-bold text-2xl mt-4">Re-explained. Again.</p>
                  </div>
                  
                  {/* Repeated context message - glass effect */}
                  <div className="bg-red-500/10 border border-red-500/40 rounded-2xl px-6 py-4 max-w-sm">
                    <p className="text-white/70 text-base italic">
                      "Let me give you some context about my business, my audience, my goals..."
                    </p>
                  </div>
                </div>

                {/* Bottom tagline */}
                <p className="text-red-400 text-lg text-center mt-6 font-medium">
                  Every prompt starts from zero.
                </p>
              </div>
            </div>

            {/* RIGHT: With Mark - The relief of continuity (GREEN focus) */}
            <div className="relative group">
              {/* Single bold emerald glow border */}
              <div className="absolute -inset-[2px] bg-gradient-to-b from-emerald-300 via-emerald-400 to-emerald-500 rounded-3xl" />
              <div className="relative bg-gradient-to-b from-[#0A2418] to-[#0A1A10] rounded-3xl p-10 h-full min-h-[450px] flex flex-col">
                {/* Top accent line */}
                <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />
                
                {/* Mark label */}
                <div className="mb-6">
                  <span className="inline-flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-300 to-emerald-400" />
                    <span className="bg-gradient-to-r from-emerald-300 to-emerald-400 bg-clip-text text-transparent text-sm font-bold uppercase tracking-widest">
                      With Mark
                    </span>
                  </span>
                </div>
                
                {/* The result - bold statement */}
                <div className="flex-1 flex flex-col justify-center items-center">
                  {/* Giant checkmark - vibrant */}
                  <div className="text-center mb-8">
                    <span className="text-8xl md:text-9xl font-black bg-gradient-to-r from-emerald-300 to-emerald-400 bg-clip-text text-transparent">✓</span>
                    <p className="text-white font-bold text-2xl mt-4">Your business, remembered.</p>
                  </div>
                  
                  {/* Mark knows - glass effect */}
                  <div className="bg-emerald-400/20 border border-emerald-400/70 rounded-2xl px-6 py-4 max-w-sm">
                    <p className="text-white text-base">
                      <span className="text-emerald-300 font-bold">"I have the context."</span> Your brand, goals, audience, and history—already here.
                    </p>
                  </div>
                </div>

                {/* Bottom tagline */}
                <p className="bg-gradient-to-r from-emerald-300 to-emerald-400 bg-clip-text text-transparent text-lg text-center mt-6 font-bold">
                  Set once. Built on forever.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* FEATURES SECTION - Light background with dark cards */}
      {/* ================================================== */}
      <section className="bg-white py-16 relative z-10">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A0A0A] tracking-tight">
              Everything you need. <span className="bg-gradient-to-r from-[#FF6A1A] to-[#FF8A1A] bg-clip-text text-transparent">Nothing you don't.</span>
            </h2>
          </div>

          {/* Feature Grid - 2x2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Feature 1: Never Forgets */}
            <div className="bg-[#0A0A0A] border border-black/10 rounded-2xl p-8 hover:border-[#FF6A1A]/50 transition-colors duration-300 shadow-lg">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-[#FF6A1A] to-[#FF8A1A] flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Mark never forgets</h3>
              <p className="text-white/60 text-lg leading-relaxed">
                Your brand voice, audience, goals, and strategy—permanently stored. No more starting from scratch.
              </p>
            </div>
            
            {/* Feature 2: References & Cites */}
            <div className="bg-[#0A0A0A] border border-black/10 rounded-2xl p-8 hover:border-[#FF6A1A]/50 transition-colors duration-300 shadow-lg">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-[#FF6A1A] to-[#FF8A1A] flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Cites its sources</h3>
              <p className="text-white/60 text-lg leading-relaxed">
                Mark references your previous conversations and shows exactly where insights come from.
              </p>
            </div>
            
            {/* Feature 3: Unified Tools */}
            <div className="bg-[#0A0A0A] border border-black/10 rounded-2xl p-8 hover:border-[#FF6A1A]/50 transition-colors duration-300 shadow-lg">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-[#FF6A1A] to-[#FF8A1A] flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">One unified workspace</h3>
              <p className="text-white/60 text-lg leading-relaxed">
                AI powered copy, strategy, execution, to-do organization, note taking—all your social media marketing needs in one place.
              </p>
            </div>
            
            {/* Feature 4: Daily Insights */}
            <div className="bg-[#0A0A0A] border border-black/10 rounded-2xl p-8 hover:border-[#FF6A1A]/50 transition-colors duration-300 shadow-lg">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-[#FF6A1A] to-[#FF8A1A] flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Stay ahead</h3>
              <p className="text-white/60 text-lg leading-relaxed">
                Daily personalized news and trends tailored to your industry sent right to your front page.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* BUILDING IN PUBLIC - YOUTUBE VIDEO */}
      {/* ================================================== */}
      <section className="bg-white py-16 relative z-10">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/5 rounded-full mb-6 border border-black/10">
              <span className="text-2xl">🎬</span>
              <span className="text-sm font-bold text-[#0A0A0A] uppercase tracking-wide">Building in Public</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#0A0A0A] mb-6">
              Follow the <span className="bg-gradient-to-r from-[#FF6A1A] to-[#FF8A1A] bg-clip-text text-transparent">Journey</span>
            </h2>
            <p className="text-lg text-black/60 max-w-2xl mx-auto">
              Watch as we build Mark from the ground up. Episode 1: The current state of development, architecture decisions, and what's coming next.
            </p>
          </div>

          {/* Video Container */}
          <div className="max-w-5xl mx-auto">
            {/* Video card with dark theme styling */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-black/10 bg-[#0A0A0A] p-4 md:p-6 hover:scale-[1.01] transition-transform duration-300">
            
              {/* Episode Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-gradient-to-r from-[#FF6A1A] to-[#FF8A1A] text-white rounded-full text-xs font-bold">
                    EPISODE 1
                  </span>
                  <span className="text-sm font-semibold text-white/70">Development Deep Dive</span>
                </div>
                <a
                  href="https://www.youtube.com/@usemarkapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-[#FF6A1A] transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span className="font-medium">Subscribe</span>
                </a>
              </div>

              {/* YouTube Embed */}
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/LM586RHnauE"
                  title="Building Mark in Public - Episode 1"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              {/* Video Description */}
              <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="text-sm text-white/70 leading-relaxed">
                  In this episode, I walk through where Mark is right now—the architecture, the features we've built, and the roadmap ahead. This is the first episode in our building in public series, where you'll get an inside look at every step of creating a modern marketing OS.
                </p>
              </div>

              {/* Series Indicator */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/50">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Part of the Building in Public series • More episodes coming soon</span>
              </div>
            </div>
          </div>

          {/* CTA Below Video */}
          <div className="mt-12 text-center">
            <p className="text-base text-black/60 mb-4">
              Want to be part of the journey from the start?
            </p>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF6A1A] to-[#FF8A1A] text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
            >
              <span>Join the Waitlist</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* CTA SECTION (CUSTOM CONVERTKIT FORM + REDIRECT) */}
      {/* ================================================== */}
      <section className="bg-white py-16 relative z-10">
        <div className="max-w-4xl mx-auto px-8">
          {/* Orange gradient border */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FF6A1A] to-[#FF8A1A] p-[2px] shadow-2xl">
            <div className="bg-[#0A0A0A] rounded-3xl px-10 py-10 md:px-12 md:py-12 text-center text-white relative">

              <div className="relative">
                <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
                  Never explain your brand <span className="bg-gradient-to-r from-[#FF6A1A] to-[#FF8A1A] bg-clip-text text-transparent">again</span>.
                </h3>

                <p className="text-sm md:text-base text-white/75 max-w-xl mx-auto mb-8">
                  Join the early access list for Mark—the AI workspace that actually remembers who you are, what you're building, and how you sound.
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
                      className="bg-white/10 border border-white/20 rounded-xl p-6 mt-4 max-w-md mx-auto w-full space-y-4"
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
                      className="w-full py-3 bg-gradient-to-r from-[#FF6A1A] to-[#FF8A1A] hover:opacity-90 transition text-white font-semibold rounded-lg shadow-lg"
                    >
                      Join Early Access
                    </button>

                  </form>
                </div>
              </div>

              <p className="mt-3 text-[11px] text-white/50">
                No spam. You'll only hear from me when Mark is ready for you.
              </p>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* BLOG SECTION */}
      {/* ================================================== */}
      <section className="bg-white py-16 relative z-10">
        <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#0A0A0A] mb-6">
            From the <span className="bg-gradient-to-r from-[#FF6A1A] to-[#FF8A1A] bg-clip-text text-transparent">Blog</span>
          </h2>
          <p className="text-lg text-black/60 max-w-2xl mx-auto">
            Follow along as we <span className="text-[#FF6A1A] font-bold">build in public</span>. Latest updates from the Mark team.
          </p>
        </div>

        {/* Blog Posts Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-[#FF6A1A]/30 border-t-[#FF6A1A] rounded-full animate-spin" />
            <p className="mt-4 text-black/50">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-black/50">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
            {posts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className="group w-full md:w-[calc(50%-1rem)] max-w-md"
              >
                <article className="h-full bg-[#0A0A0A] border border-black/10 rounded-2xl p-6 hover:border-[#FF6A1A]/50 hover:scale-[1.02] transition-all duration-200 shadow-lg">
                  {/* Category Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">📝</span>
                    <span className="text-xs font-semibold text-[#FF6A1A] uppercase tracking-wider">
                      {post.category || 'Blog'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 
                    className="text-2xl font-bold text-white mb-3 transition line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: post.title }}
                  />

                  {/* Excerpt */}
                  <p className="text-white/60 mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-white/40 pt-4 border-t border-white/10">
                    <span>{(() => {
                      const [year, month, day] = post.date.split('-').map(Number);
                      const date = new Date(year, month - 1, day, 12, 0, 0);
                      return date.toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric'
                      });
                    })()}</span>
                    <span>{post.readTime}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* View All Blog Posts Button */}
        {posts.length > 0 && (
          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] border border-black/10 rounded-xl font-semibold text-white hover:border-[#FF6A1A] hover:text-[#FF6A1A] transition-colors duration-200 shadow-lg"
            >
              View All Posts
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
        </div>
      </section>

      {/* ================================================== */}
      {/* FOUNDER MESSAGE */}
      {/* ================================================== */}
      <section className="bg-white py-16 relative z-10">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-5xl font-extrabold tracking-tight text-[#0A0A0A] mb-8">
            A <span className="bg-gradient-to-r from-[#FF6A1A] to-[#FF8A1A] bg-clip-text text-transparent">message</span> from the <span className="bg-gradient-to-r from-[#FF6A1A] to-[#FF8A1A] bg-clip-text text-transparent">founder</span>
          </h2>

          <p className="text-lg text-black/70 leading-relaxed font-medium">
            Hey, I'm Brendan. I built Mark because marketers and content creators deserve better tools. The marketing landscape is fragmented—AI tools that don't remember your brand, strategy tools disconnected from execution, and no single system built specifically for people who create and share content online.
          </p>

          <p className="text-lg text-black/70 leading-relaxed mt-4 font-medium">
            Mark is my answer to that: a marketing operating system that brings everything together—brand memory, strategic thinking, campaign planning, and daily insights—in one intelligent workspace that learns from you and grows with you.
          </p>
        </div>
      </section>

      {/* ================================================== */}
      {/* FOOTER */}
      {/* ================================================== */}
      <footer className="bg-white py-16 relative z-10">
        <div className="max-w-6xl mx-auto px-8">
          
          {/* Social Links */}
          <div className="flex justify-center items-center gap-6 mb-8">
            <a 
              href="https://x.com/usemarkapp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-black/5 border border-black/10 hover:scale-110 transition-transform duration-200 flex items-center justify-center group"
              aria-label="Follow Mark on X (Twitter)"
            >
              <svg className="w-5 h-5 text-black/50 group-hover:text-[#FF6A1A] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            <a 
              href="https://www.instagram.com/usemarkapp/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-black/5 border border-black/10 hover:scale-110 transition-transform duration-200 flex items-center justify-center group"
              aria-label="Follow Mark on Instagram"
            >
              <svg className="w-5 h-5 text-black/50 group-hover:text-[#FF6A1A] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            <a 
              href="https://www.tiktok.com/@usemarkapp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-black/5 border border-black/10 hover:scale-110 transition-transform duration-200 flex items-center justify-center group"
              aria-label="Follow Mark on TikTok"
            >
              <svg className="w-5 h-5 text-black/50 group-hover:text-[#FF6A1A] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>

            <a 
              href="https://www.facebook.com/usemarkapp/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-black/5 border border-black/10 hover:scale-110 transition-transform duration-200 flex items-center justify-center group"
              aria-label="Follow Mark on Facebook"
            >
              <svg className="w-5 h-5 text-black/50 group-hover:text-[#FF6A1A] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            <a 
              href="https://www.youtube.com/@usemarkapp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-black/5 border border-black/10 hover:scale-110 transition-transform duration-200 flex items-center justify-center group"
              aria-label="Subscribe to Mark on YouTube"
            >
              <svg className="w-5 h-5 text-black/50 group-hover:text-[#FF6A1A] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-black/50">
            © {new Date().getFullYear()} Mark. Built in public by Brendan Goforth.
          </div>
        </div>
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
        p-8 rounded-2xl bg-white/95 border border-white/60 shadow-lg
        hover:scale-[1.02] transition-transform duration-200
      "
    >
      {/* PERFORMANCE: Removed tilt-3d, hover:shadow-2xl, transition-all */}
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

/* ================================================== */
/* SECTION DIVIDER - Subtle gradient separator       */
/* ================================================== */

function SectionDivider({ variant = "default" }: { variant?: "default" | "orange" | "subtle" }) {
  const gradientClasses = {
    default: "from-transparent via-black/10 to-transparent",
    orange: "from-transparent via-[#FF6A1A]/20 to-transparent",
    subtle: "from-transparent via-black/5 to-transparent",
  };

  return (
    <div 
      className={`w-full h-px bg-gradient-to-r ${gradientClasses[variant]}`}
      aria-hidden="true"
    />
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
