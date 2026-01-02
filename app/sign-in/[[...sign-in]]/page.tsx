"use client";

import { SignIn } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function SignInPage() {
  const [particles, setParticles] = useState<{ top: string; left: string; delay: string }[]>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Generate particles
    const arr = Array.from({ length: 20 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
    }));
    setParticles(arr);

    // Parallax scroll
    const handleScroll = () => {
      setScrollY(window.scrollY || window.pageYOffset);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Orange Gradient Glows */}
        <div
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1400px] h-[1400px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,106,26,0.45),rgba(255,180,120,0.15),transparent_70%)] blur-[200px]"
          style={{ transform: `translate3d(-50%, ${scrollY * -0.05}px, 0)` }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,138,26,0.25),transparent_70%)] blur-[180px]"
          style={{ transform: `translate3d(0, ${scrollY * -0.03}px, 0)` }}
        />

        {/* Floating Particles */}
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#FF6A1A]/30 rounded-full animate-sparkle"
            style={{
              top: p.top,
              left: p.left,
              animationDelay: p.delay,
            }}
          />
        ))}

        {/* Animated Wave */}
        <div className="absolute bottom-0 left-0 w-[200%] h-32 opacity-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200%"
            height="100%"
            viewBox="0 0 1440 320"
            className="animate-wave"
          >
            <path
              fill="#FF6A1A"
              fillOpacity="0.3"
              d="M0,256L48,250.7C96,245,192,235,288,229.3C384,224,480,224,576,229.3C672,235,768,245,864,240C960,235,1056,213,1152,208C1248,203,1344,213,1392,218.7L1440,224V320H0Z"
            />
          </svg>
        </div>
      </div>

      {/* Logo - Top Left */}
      <Link 
        href="/" 
        className="absolute top-6 left-8 z-20 hover:opacity-80 transition-opacity"
      >
        <Image
          src="/mark-logo.png"
          alt="Mark Logo"
          width={80}
          height={26}
          className="object-contain"
          priority
        />
      </Link>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Hero Text */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">
            <span className="text-[#0A0A0A]">Welcome</span>{' '}
            <span className="bg-gradient-to-r from-[#FF6A1A] to-[#FF8A4A] bg-clip-text text-transparent">
              Back
            </span>
          </h1>
          <p className="text-lg text-black/60">
            Sign in to continue to your Marketing OS
          </p>
        </div>

        {/* Glassmorphic Card */}
        <div className="relative group">
          {/* Glow Effect on Hover */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF6A1A] via-[#FF8A1A] to-[#FFB84D] rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />
          
          {/* Card */}
          <div className="relative bg-white/70 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
            <SignIn
              appearance={{
                elements: {
                  rootBox: 'w-full',
                  card: 'bg-transparent shadow-none w-full',
                  headerTitle: 'hidden',
                  headerSubtitle: 'hidden',
                  socialButtonsBlockButton: 
                    'border-2 border-black/10 hover:border-[#FF6A1A]/30 hover:bg-[#FF6A1A]/5 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md',
                  socialButtonsBlockButtonText: 'font-semibold text-[#0A0A0A]',
                  socialButtonsIconButton: 'rounded-xl',
                  dividerLine: 'bg-black/10',
                  dividerText: 'text-black/40 text-sm',
                  formButtonPrimary: 
                    'bg-gradient-to-r from-[#FF6A1A] via-[#FF8A1A] to-[#FFB84D] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-white font-semibold shadow-md rounded-xl py-3',
                  formFieldInput: 
                    'rounded-xl border-2 border-black/10 focus:border-[#FF6A1A] focus:ring-4 focus:ring-[#FF6A1A]/10 transition-all duration-200 bg-white/50 backdrop-blur-sm',
                  formFieldLabel: 'text-[#0A0A0A] font-semibold text-sm',
                  footerActionLink: 'text-[#FF6A1A] hover:text-[#ff7e3a] font-semibold hover:underline transition-colors',
                  footerActionText: 'text-black/60',
                  identityPreviewText: 'text-[#0A0A0A] font-medium',
                  identityPreviewEditButton: 'text-[#FF6A1A] hover:text-[#ff7e3a] font-semibold',
                  formResendCodeLink: 'text-[#FF6A1A] hover:text-[#ff7e3a] font-semibold',
                  otpCodeFieldInput: 'border-2 border-black/10 focus:border-[#FF6A1A] focus:ring-4 focus:ring-[#FF6A1A]/10 rounded-lg',
                  formFieldInputShowPasswordButton: 'text-black/40 hover:text-[#FF6A1A]',
                  formFieldAction: 'text-[#FF6A1A] hover:text-[#ff7e3a] font-semibold',
                  footer: 'bg-transparent',
                  main: 'gap-6',
                  // Hide Clerk branding
                  logoBox: 'hidden',
                  footerPages: 'hidden',
                  footerActionLink__signUp: 'text-[#FF6A1A] hover:text-[#ff7e3a] font-semibold hover:underline transition-colors',
                  footerAction: 'text-center',
                  badge: 'hidden',
                  modalCloseButton: 'text-black/60 hover:text-black',
                },
                variables: {
                  colorPrimary: '#FF6A1A',
                  colorText: '#0A0A0A',
                  colorTextSecondary: '#6B7280',
                  colorBackground: 'transparent',
                  colorInputBackground: 'rgba(255, 255, 255, 0.5)',
                  colorInputText: '#0A0A0A',
                  borderRadius: '0.75rem',
                  fontFamily: 'inherit',
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes wave {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-sparkle {
          animation: sparkle 3s ease-in-out infinite;
        }

        .animate-wave {
          animation: wave 20s linear infinite;
        }

        /* Hide Clerk branding badge */
        .cl-internal-b3fm6y,
        .cl-footer,
        .cl-footerAction__signUp,
        .cl-badge {
          display: none !important;
        }
      `}</style>
    </main>
  );
}
