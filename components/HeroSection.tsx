'use client'

import Link from 'next/link'
import Image from 'next/image'
import { SUBSTACK_URL } from '@/lib/data'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-warm-dark">
      {/* Background — warm, people-centered documentary photo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1800&q=80')",
        }}
      />
      {/* Deep overlay preserving warmth */}
      <div className="absolute inset-0 bg-gradient-to-r from-warm-dark/95 via-warm-dark/85 to-warm-dark/60" />
      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Gold accent glow — bottom right */}
      <div className="absolute bottom-0 right-0 w-1/2 h-2/3 bg-gradient-to-tl from-copper/8 to-transparent pointer-events-none" />
      {/* Decorative line */}
      <div className="absolute left-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-copper/15 to-transparent hidden xl:block" />

      {/* Two-column layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-16 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* ── Left: Text ── */}
        <div>
          {/* Title lockup */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-copper/60" />
            <div>
              <span className="text-xs font-sans uppercase tracking-[0.2em] text-copper/80">
                Terms &amp; Conditions: The Fine Print
              </span>
              <span className="text-copper/40 mx-2">·</span>
              <span className="text-xs font-sans uppercase tracking-[0.2em] text-cream/40">
                University of Manchester
              </span>
            </div>
          </div>

          {/* Hero question — the main headline */}
          <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-cream leading-[1.1] tracking-tight mb-6">
            Why does it feel like the economy runs on rules nobody explained to us?
          </h1>

          {/* Supporting text */}
          <p className="font-sans text-lg lg:text-xl text-cream/70 leading-relaxed mb-10 max-w-lg">
            Terms &amp; Conditions explores the hidden systems behind money, technology,
            wealth, opportunity, and public life — and the people working to build
            something better.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <Link href="/episodes" className="btn-primary text-base px-8 py-4">
              Listen
            </Link>
            <a
              href={SUBSTACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-cream/30 text-cream font-medium text-base hover:bg-cream/10 transition-colors"
            >
              Subscribe
            </a>
            <Link
              href="#topics"
              className="inline-flex items-center gap-2 text-base font-medium text-copper hover:text-cream transition-colors"
            >
              Explore Topics
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Host byline */}
          <div className="flex items-center gap-3 pt-6 border-t border-white/10">
            <div>
              <p className="text-[10px] font-sans uppercase tracking-[0.25em] text-cream/40 mb-0.5">Hosted by</p>
              <p className="text-sm font-semibold text-cream/80 font-serif">Chastity Murphy</p>
              <p className="text-xs text-cream/40">Policy Strategist &amp; Former U.S. Treasury Advisor</p>
            </div>
          </div>
        </div>

        {/* ── Right: Portrait photo ── */}
        <div className="relative flex justify-center lg:justify-end">
          {/* Gold frame glow */}
          <div className="absolute -inset-4 bg-gradient-to-br from-copper/20 via-transparent to-terracotta/10 rounded-3xl blur-2xl" />

          {/* Photo container */}
          <div className="relative w-72 sm:w-80 lg:w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden border border-copper/30 shadow-2xl">
            <Image
              src="/chastity-murphy.jpg"
              alt="Chastity Murphy — Host of Terms & Conditions: The Fine Print"
              fill
              priority
              className="object-cover object-top"
            />
            {/* Subtle gradient at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-warm-dark/70 to-transparent" />
            {/* Name badge */}
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-xs font-sans uppercase tracking-[0.2em] text-copper/80 mb-1">Host</p>
              <p className="font-serif text-lg font-bold text-cream">Chastity Murphy</p>
            </div>
          </div>

          {/* Corner accents */}
          <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-copper/30 rounded-tr-xl pointer-events-none hidden lg:block" />
          <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-copper/30 rounded-bl-xl pointer-events-none hidden lg:block" />
        </div>
      </div>

      {/* Bottom fade into cream */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream to-transparent" />
    </section>
  )
}
