import Link from 'next/link'
import Image from 'next/image'
import { getSiteSettings } from '@/lib/contentful'

export default async function HeroSection() {
  const s = await getSiteSettings()

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-warm-dark">
      {/* Background image — editable in Contentful → Site Settings → Hero Background Image URL */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url('${s.heroImageUrl}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-warm-dark/98 via-warm-dark/88 to-warm-dark/60" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")" }}
      />
      <div className="absolute bottom-0 right-0 w-1/2 h-2/3 bg-gradient-to-tl from-copper/8 to-transparent pointer-events-none" />
      <div className="absolute left-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-copper/15 to-transparent hidden xl:block" />

      {/* Two-column layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-16 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left: Text — all editable in Contentful */}
        <div>
          <div className="flex items-center gap-3 mb-7">
            <div className="h-px w-10 bg-copper/60" />
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-copper/80">
              Presented by the University of Manchester
            </span>
          </div>

          <h1 className="font-serif text-5xl lg:text-6xl xl:text-7xl font-bold text-cream leading-[0.95] tracking-tight mb-4">
            Terms &amp; Conditions
          </h1>
          <div className="font-serif text-3xl lg:text-4xl xl:text-5xl font-normal text-copper italic mb-6">
            The Fine Print
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-16 bg-copper/40" />
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-cream/45">
              {s.siteTagline}
            </span>
          </div>

          {/* Editable in Contentful → Hero Question */}
          <p className="font-serif text-xl lg:text-2xl italic text-cream/90 leading-relaxed mb-4 max-w-lg">
            {s.heroQuestion}
          </p>

          {/* Editable in Contentful → Hero Description */}
          <p className="font-sans text-lg text-cream leading-relaxed mb-10 max-w-lg">
            {s.heroDescription}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-10">
            <Link href="/episodes" className="btn-primary text-base px-8 py-4">Listen</Link>
            <a
              href={s.substackUrl}
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

          <div className="flex items-center gap-3 pt-6 border-t border-white/10">
            <div>
              <p className="text-[10px] font-sans uppercase tracking-[0.25em] text-cream/35 mb-0.5">Hosted by</p>
              <p className="text-sm font-semibold text-cream/80 font-serif">{s.hostName}</p>
              <p className="text-xs text-cream/35">{s.hostTitle}</p>
            </div>
          </div>
        </div>

        {/* Right: Portrait */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="absolute -inset-4 bg-gradient-to-br from-copper/15 via-transparent to-terracotta/8 rounded-3xl blur-2xl" />
          <div className="relative w-72 sm:w-80 lg:w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden border border-copper/25 shadow-2xl">
            <Image
              src="/chastity-murphy.jpg"
              alt={`${s.hostName} — Host of Terms & Conditions: The Fine Print`}
              fill
              priority
              className="object-cover object-top"
            />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-warm-dark/75 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-xs font-sans uppercase tracking-[0.2em] text-copper/80 mb-1">Host</p>
              <p className="font-serif text-lg font-bold text-cream">{s.hostName}</p>
            </div>
          </div>
          <div className="absolute top-4 right-4 w-14 h-14 border-t-2 border-r-2 border-copper/25 rounded-tr-xl pointer-events-none hidden lg:block" />
          <div className="absolute bottom-4 left-4 w-14 h-14 border-b-2 border-l-2 border-copper/25 rounded-bl-xl pointer-events-none hidden lg:block" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-cream to-transparent" />
    </section>
  )
}
