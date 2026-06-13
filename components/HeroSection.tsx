import Link from 'next/link'
import Image from 'next/image'
import { SUBSTACK_URL } from '@/lib/data'

export default function HeroSection() {
  return (
    // Hero keeps the original warm espresso brown — independent of the site-wide navy palette
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: '#1A0F08' }}>
      {/* Original warm brown background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1800&q=80')",
        }}
      />
      {/* Warm brown gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #1A0F08 55%, rgba(90,35,10,0.6) 100%)',
        }}
      />
      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Amber glow — bottom right */}
      <div
        className="absolute bottom-0 right-0 w-2/3 h-2/3 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom right, rgba(184,80,42,0.18) 0%, transparent 70%)' }}
      />

      {/* Decorative lines */}
      <div className="absolute left-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-800/20 to-transparent hidden xl:block" />

      {/* Two-column layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-16 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* ── Left: Text ── */}
        <div>
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-7">
            <div className="h-px w-10" style={{ backgroundColor: 'rgba(184,123,79,0.6)' }} />
            <span className="text-xs font-sans uppercase tracking-[0.25em]" style={{ color: 'rgba(184,123,79,0.85)' }}>
              Presented by the University of Manchester
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-5xl lg:text-6xl xl:text-7xl font-bold text-cream leading-[0.95] tracking-tight mb-4">
            Terms &amp; Conditions
          </h1>
          <div className="font-serif text-3xl lg:text-4xl xl:text-5xl font-normal italic mb-6" style={{ color: '#D4A44B' }}>
            The Fine Print
          </div>

          {/* Tagline */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-16" style={{ backgroundColor: 'rgba(184,123,79,0.4)' }} />
            <span className="text-xs font-sans uppercase tracking-[0.2em]" style={{ color: 'rgba(250,247,240,0.45)' }}>
              The Hidden Rules of Economic Life
            </span>
          </div>

          {/* New copy */}
          <p className="font-serif text-xl lg:text-2xl italic leading-relaxed mb-4 max-w-lg" style={{ color: 'rgba(250,247,240,0.92)' }}>
            Why does it feel like the economy runs on rules nobody explained to us?
          </p>
          <p className="font-sans text-lg leading-relaxed mb-10 max-w-lg" style={{ color: 'rgba(250,247,240,0.62)' }}>
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
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-base transition-colors"
              style={{ border: '1.5px solid rgba(250,247,240,0.3)', color: 'rgba(250,247,240,0.9)' }}
            >
              Subscribe
            </a>
            <Link
              href="#topics"
              className="inline-flex items-center gap-2 text-base font-medium transition-colors"
              style={{ color: '#D4A44B' }}
            >
              Explore Topics
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Host byline */}
          <div className="flex items-center gap-3 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div>
              <p className="text-[10px] font-sans uppercase tracking-[0.25em] mb-0.5" style={{ color: 'rgba(250,247,240,0.35)' }}>Hosted by</p>
              <p className="text-sm font-semibold font-serif" style={{ color: 'rgba(250,247,240,0.82)' }}>Chastity Murphy</p>
              <p className="text-xs" style={{ color: 'rgba(250,247,240,0.35)' }}>Policy Strategist &amp; Former U.S. Treasury Advisor</p>
            </div>
          </div>
        </div>

        {/* ── Right: Large portrait ── */}
        <div className="relative flex justify-center lg:justify-end">
          {/* Warm glow behind photo */}
          <div
            className="absolute -inset-4 rounded-3xl blur-2xl pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(184,80,42,0.2) 0%, rgba(212,164,75,0.08) 100%)' }}
          />

          {/* Photo */}
          <div
            className="relative w-72 sm:w-80 lg:w-full max-w-sm overflow-hidden shadow-2xl"
            style={{
              aspectRatio: '3/4',
              borderRadius: '16px',
              border: '1px solid rgba(184,123,79,0.3)',
            }}
          >
            <Image
              src="/chastity-murphy.jpg"
              alt="Chastity Murphy — Host of Terms & Conditions: The Fine Print"
              fill
              priority
              className="object-cover object-top"
            />
            {/* Bottom gradient */}
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{ height: '35%', background: 'linear-gradient(to top, rgba(26,15,8,0.75), transparent)' }}
            />
            {/* Name badge */}
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-xs font-sans uppercase tracking-[0.2em] mb-1" style={{ color: 'rgba(212,164,75,0.85)' }}>Host</p>
              <p className="font-serif text-lg font-bold text-cream">Chastity Murphy</p>
            </div>
          </div>

          {/* Corner accents */}
          <div className="absolute top-4 right-4 w-14 h-14 hidden lg:block pointer-events-none" style={{ borderTop: '2px solid rgba(184,123,79,0.3)', borderRight: '2px solid rgba(184,123,79,0.3)', borderRadius: '0 8px 0 0' }} />
          <div className="absolute bottom-4 left-4 w-14 h-14 hidden lg:block pointer-events-none" style={{ borderBottom: '2px solid rgba(184,123,79,0.3)', borderLeft: '2px solid rgba(184,123,79,0.3)', borderRadius: '0 0 0 8px' }} />
        </div>
      </div>

      {/* Fade to cream */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-cream to-transparent" />
    </section>
  )
}
