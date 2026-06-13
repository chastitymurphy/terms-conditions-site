import Link from 'next/link'
import Image from 'next/image'
import { SUBSTACK_URL } from '@/lib/data'
import { SUBSTACK_URL } from '@/lib/data'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-warm-dark">
      {/* Background layers */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1800&q=80')",
        }}
      />
      {/* Warm gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-warm-dark via-espresso/95 to-burnt-clay/60" />
      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Decorative rule lines */}
      <div className="absolute left-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-copper/20 to-transparent hidden lg:block" />
      <div className="absolute right-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-copper/20 to-transparent hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-24">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-copper/60" />
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-copper/80">
              Presented by the University of Manchester
            </span>
          </div>
            <div className="h-px w-10 bg-copper/60" />
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-copper/80">
              Presented by the University of Manchester
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-5xl lg:text-7xl xl:text-8xl font-bold text-cream leading-[0.95] tracking-tight mb-4">
            Terms &amp; Conditions
          </h1>
          <div className="font-serif text-3xl lg:text-4xl xl:text-5xl font-normal text-copper/90 italic mb-6">
            The Fine Print
          </div>

          {/* Rule */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 max-w-[80px] bg-copper/40" />
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-beige/50">
              The Hidden Rules of Economic Life
            </span>
          </div>

          {/* Description */}
          <p className="font-sans text-lg lg:text-xl text-beige/70 leading-relaxed mb-10 max-w-xl">
            A podcast and publication exploring the financial infrastructure, technologies,
            institutions, and policies that shape economic life.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/episodes" className="btn-primary text-base px-8 py-4">
              Listen
            </Link>
            <a
              href={SUBSTACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-beige/30 text-beige font-medium text-base hover:bg-beige/10 transition-colors"
            >
              Subscribe
            </a>
            <Link
              href="#topics"
              className="inline-flex items-center gap-2 text-base font-medium text-copper hover:text-beige transition-colors"
            >
              Explore Topics
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Host byline */}
          <div className="flex items-center gap-3 mt-10">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-copper/40 shrink-0">
              <Image
                src="/chastity-murphy.jpg"
                alt="Chastity Murphy"
                fill
                className="object-cover object-top"
              />
            </div>
            <div>
              <p className="text-xs font-sans uppercase tracking-[0.2em] text-beige/50 mb-0.5">Hosted by</p>
              <p className="text-sm font-medium text-beige/80">Chastity Murphy</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-beige/30 hidden lg:flex">
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-copper/40 to-transparent animate-pulse" />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
    </section>
  )
}
