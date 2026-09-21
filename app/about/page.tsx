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
      </div>

      {/* ── Presented by MLATI — full-width editorial institutional section ── */}
      <section id="mlati" className="mlati-section py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-3 gap-10 items-center">
          <div>
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-terracotta">Presented by</span>
            <div className="mt-4 bg-white/80 rounded-xl p-3 inline-block border border-beige/60 shadow-sm">
              <Image src="/mlti-logo.png" alt="Manchester Law & Technology Initiative" width={110} height={110} />
            </div>
          </div>
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-espresso mb-5">
              University of Manchester Law &amp; Technology Initiative
            </h2>
            <div className="text-espresso/80 leading-relaxed space-y-4 max-w-2xl">
              <p>
                Terms &amp; Conditions: The Fine Print is presented by the University of Manchester Law &amp; Technology
                Initiative (MLATI).
              </p>
              <p>
                The collaboration brings together research, public education, and conversations about the systems shaping
                everyday life—from money and technology to law, infrastructure, power, and the institutions we depend on.
              </p>
              <p>
                Through Terms &amp; Conditions, those questions move beyond academic and policy circles and into
                conversations designed for a broader public audience: How did these systems get built? Who do they work
                for? And what could we build differently?
              </p>
            </div>
            <p className="font-sans text-sm font-medium text-espresso/70 my-5 tracking-wide">
              Research <span className="text-terracotta mx-1">→</span> Conversation{' '}
              <span className="text-terracotta mx-1">→</span> Public Understanding
            </p>
            <a
              href="https://www.law-tech.manchester.ac.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-terracotta hover:underline"
            >
              Learn more about MLATI →
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-16 lg:pb-24 pt-16 lg:pt-24 space-y-20">

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
