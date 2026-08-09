import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getSiteSettings } from '@/lib/contentful'

export const metadata: Metadata = {
  title: 'About',
  description: 'About Terms & Conditions: The Fine Print — a podcast and publication hosted by Chastity Murphy exploring the hidden systems behind money, technology, wealth, and public life.',
}

export default async function AboutPage() {
  const s = await getSiteSettings()

  return (
    <>
      <div className="pt-32 pb-16 bg-espresso relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-copper/60" />
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-copper/80">The Platform</span>
          </div>
          <h1 className="font-serif text-4xl lg:text-6xl font-bold text-cream">About</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24 space-y-20">
        {/* ── About Terms & Conditions ───────────────────────────────────────── */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-terracotta" />
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-terracotta">Editorial premise</span>
          </div>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-espresso mb-6">About Terms &amp; Conditions</h2>
          <div className="text-espresso/80 leading-relaxed space-y-4 max-w-3xl">
            <p>
              Every day we agree to terms and conditions we never read — not only online, but in the financial systems,
              technologies, institutions, and rules that organize everyday life.
            </p>
            <p>
              Terms &amp; Conditions is a podcast and publication about those hidden agreements: who designed them,
              who benefits from them, who gets excluded, and how they might be rewritten.
            </p>
            <p>
              Through conversations with researchers, policymakers, organizers, technologists, artists, and practitioners,
              the series makes complicated systems understandable without pretending they are simple.
            </p>
          </div>
        </section>

        {/* ── About the Host ──────────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-terracotta" />
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-terracotta">The host</span>
          </div>
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-1 flex justify-center">
              <div className="relative w-40 h-40 lg:w-48 lg:h-48 rounded-2xl overflow-hidden border border-beige">
                <Image src="/chastity-murphy.jpg" alt={s.hostName} fill className="object-cover object-top" />
              </div>
            </div>
            <div className="lg:col-span-2">
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-espresso mb-2">{s.hostName}</h2>
              <p className="text-sm text-cinnamon font-medium mb-4">{s.hostTitle}</p>

              {/* Long-form bio from Contentful, with fallback short bio */}
              {s.aboutHostLong ? (
                <div className="text-espresso/80 leading-relaxed space-y-4 whitespace-pre-line">
                  {s.aboutHostLong}
                </div>
              ) : (
                <>
                  <p className="text-espresso/80 leading-relaxed mb-4">
                    {s.aboutHost}
                  </p>
                  <p className="text-xs text-warm-gray/60 italic mt-4">
                    A longer biography will be added here when supplied.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ── University of Manchester ────────────────────────────────────────── */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-terracotta" />
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-terracotta">Affiliation</span>
          </div>
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-1">
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-espresso mb-3">
                University of Manchester
              </h2>
              <span className="inline-block px-3 py-1 rounded-full bg-beige text-cinnamon text-xs font-sans font-medium uppercase tracking-widest">
                Presented by
              </span>
            </div>
            <div className="lg:col-span-2">
              <p className="text-espresso/80 leading-relaxed">
                {s.aboutUniversity}
              </p>
            </div>
          </div>
        </section>

        {/* ── Pre-launch CTA ───────────────────────────────────────────────────── */}
        <section className="text-center max-w-2xl mx-auto">
          <div className="h-px w-8 bg-terracotta mx-auto mb-6" />
          <p className="font-serif text-2xl text-espresso mb-4">
            Subscribe to be there when the first episode drops.
          </p>
          <Link
            href={s.substackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base px-8 py-4"
          >
            Subscribe on Substack
          </Link>
        </section>
      </div>
    </>
  )
}
