import Link from 'next/link'
import Image from 'next/image'
import { getSiteSettings } from '@/lib/contentful'

// Immersive animated hero — "fine print coming into focus"
// Background: cinematic video (Capitol at dusk, contracts drifting, data lines) — autoplay/muted/loop.
// Sequence: MLTI/UoM header → title pops in → "The Fine Print" → rule draws →
// tagline reveals word-by-word from blur → CTAs. Podcast cover art floats as the centerpiece.

export default async function HeroSection() {
  const s = await getSiteSettings()

  const taglineWords = s.siteTagline.split(' ').filter(Boolean)

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-warm-dark">
      {/* Cinematic video background — contracts drifting through economic life.
          Swap in Contentful later via Site Settings if wanted. */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* Navy gradient overlay — heavier on the left where the text sits */}
      <div className="absolute inset-0 bg-gradient-to-r from-warm-dark/95 via-warm-dark/65 to-warm-dark/25" />
      {/* Bottom + top vignette for depth */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-warm-dark/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-warm-dark/80 to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-16 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* ── Left: animated text stack ── */}
        <div>
          {/* University of Manchester + MLTI — prominent institutional header */}
          <div
            className="flex items-center gap-4 mb-10"
            style={{ animation: 'fadeUp 0.7s ease 0.05s both' }}
          >
            <div className="bg-cream rounded-xl p-2 shadow-lg shrink-0">
              <Image
                src="/mlti-logo.png"
                alt="Manchester Law & Technology Initiative"
                width={52}
                height={52}
                style={{ width: 52, height: 52 }}
              />
            </div>
            <div className="leading-tight">
              <p className="text-base font-sans font-semibold text-cream tracking-wide">
                University of Manchester
              </p>
              <p className="text-xs font-sans uppercase tracking-[0.18em] text-copper/90 mt-0.5">
                Manchester Law &amp; Technology Initiative
              </p>
            </div>
          </div>

          {/* Title — pops in first */}
          <h1
            className="font-serif text-5xl lg:text-6xl xl:text-7xl font-bold text-cream leading-[0.95] tracking-tight mb-3"
            style={{ animation: 'popIn 0.75s cubic-bezier(0.34, 1.56, 0.64, 1) 0.35s both' }}
          >
            Terms &amp;<br />Conditions
          </h1>

          {/* The Fine Print */}
          <div
            className="font-serif text-3xl lg:text-4xl xl:text-5xl font-normal text-copper italic mb-6"
            style={{ animation: 'fadeUp 0.6s ease 1.0s both' }}
          >
            The Fine Print
          </div>

          {/* Tagline — word-by-word blur-to-focus: hidden rules becoming legible */}
          <div
            className="text-xs font-sans uppercase tracking-[0.22em] text-cream/70 mb-9 leading-loose"
            aria-label={s.siteTagline}
          >
            {taglineWords.map((word, i) => (
              <span
                key={i}
                className="inline-block"
                style={{ animation: `focusIn 0.6s ease ${1.35 + i * 0.14}s both` }}
              >
                {word}{'\u00A0'}
              </span>
            ))}
          </div>

          {/* Question */}
          <p
            className="font-serif text-xl lg:text-2xl italic text-cream/90 leading-relaxed mb-4 max-w-lg"
            style={{ animation: 'fadeUp 0.6s ease 2.5s both' }}
          >
            {s.heroQuestion}
          </p>

          {/* Description */}
          <p
            className="font-sans text-lg text-cream leading-relaxed mb-10 max-w-lg"
            style={{ animation: 'fadeUp 0.6s ease 2.7s both' }}
          >
            {s.heroDescription}
          </p>

          {/* CTAs — pre-launch: subscribe is primary, guests secondary */}
          <div className="flex flex-wrap items-center gap-4" style={{ animation: 'fadeUp 0.6s ease 3.0s both' }}>
            <a
              href={s.substackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-4"
            >
              Get the first episode
            </a>
            <Link
              href="/guests"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-cream/30 text-cream font-medium text-base hover:bg-cream/10 transition-colors"
            >
              Meet the guests
            </Link>
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
        </div>

        {/* ── Right: podcast cover art — the centerpiece, floating ── */}
        <div className="relative flex justify-center lg:justify-end">
          {/* Warm glow behind the cover */}
          <div
            className="absolute -inset-6 rounded-[2rem] blur-2xl pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(212,168,75,0.25) 0%, rgba(196,98,58,0.12) 100%)',
              animation: 'pulseGlow 6s ease-in-out infinite',
            }}
          />

          <div
            className="relative w-72 sm:w-80 lg:w-full max-w-md aspect-square"
            style={{ animation: 'popIn 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s both' }}
          >
            <div
              className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"
              style={{ animation: 'floatY 7s ease-in-out 2s infinite', willChange: 'transform' }}
            >
              <Image
                src="/podcast-cover.png"
                alt="Terms & Conditions: The Fine Print — podcast cover art"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 320px, 448px"
              />
            </div>

            {/* Corner accents — fine print frame motif */}
            <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-copper/35 rounded-tr-xl pointer-events-none hidden lg:block" />
            <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-2 border-l-2 border-copper/35 rounded-bl-xl pointer-events-none hidden lg:block" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-cream/20 hidden lg:flex"
        style={{ animation: 'fadeUp 0.8s ease 3.4s both' }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-copper/40 to-transparent animate-pulse" />
      </div>

      {/* Bottom fade to cream */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-cream to-transparent" />
    </section>
  )
}
