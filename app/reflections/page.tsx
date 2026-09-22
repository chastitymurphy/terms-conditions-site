import { getReflections, getSiteSettings } from '@/lib/contentful'
import { MaskLine, Reveal } from '@/components/Reveal'
import ReflectionCard from '@/components/ReflectionCard'
import NewsletterCTA from '@/components/NewsletterCTA'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reflections',
  description: 'Essays and reflections from Terms & Conditions: The Fine Print.',
}

function StepperEdge({ lowerBg, upperFill }: { lowerBg: string; upperFill: string }) {
  return (
    <svg
      className="block w-full h-[64px]"
      style={{ background: lowerBg }}
      viewBox="0 0 1200 64"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,0 L1200,0 L1200,11 L1000,11 L1000,22 L800,22 L800,32 L600,32 L600,43 L400,43 L400,53 L0,53 Z"
        fill={upperFill}
      />
    </svg>
  )
}

export default async function ReflectionsPage() {
  const [reflections, settings] = await Promise.all([getReflections(), getSiteSettings()])

  const categories = [
    'Financial Infrastructure', 'Payments', 'Wealth', 'Public Institutions',
    'AI', 'Privacy', 'Economic History', 'Economic Democracy',
  ]

  return (
    <>
      {/* ── Page header — navy with dossier readout ── */}
      <header className="pt-36 pb-20 bg-espresso relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-copper/60" />
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-copper/80">The Written Record</span>
          </div>
          <h1 className="font-serif text-5xl lg:text-7xl font-bold text-cream mb-5">
            <MaskLine>Reflections</MaskLine>
          </h1>
          <p className="text-beige/70 text-lg max-w-xl">
            Written pieces connecting conversations from the podcast to larger questions about
            money, technology, institutions, and public life.
          </p>
        </div>
        <div className="dossier">
          <div>
            ARCHIVE <span className="dim">—</span> REFLECTIONS
          </div>
          <div>
            STATUS <span className="dim">:</span> <span className="blink">IN PRODUCTION</span>
          </div>
          <div>
            ESSAYS <span className="dim">:</span> 00 PUBLISHED
          </div>
          <div>
            COMPANION <span className="dim">:</span> EACH EPISODE
          </div>
        </div>
      </header>

      {/* Stepped edge: navy → cream */}
      <StepperEdge lowerBg="#FAF7F0" upperFill="#2B3A52" />

      {reflections.length === 0 ? (
        /* ── 01 — Coming with the first episodes ── */
        <section className="pb-24 pt-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono text-[11px] tracking-[0.12em] text-terracotta">// 01</span>
              <div className="h-px w-8 bg-terracotta" />
              <span className="font-mono text-[11px] tracking-[0.12em] text-terracotta">
                COMPANION ESSAYS
              </span>
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-espresso mb-5 leading-tight">
              <MaskLine>Written pieces,</MaskLine>
              <MaskLine delay={0.12}>
                <em className="hl">published with each episode.</em>
              </MaskLine>
            </h2>
            <Reveal>
              <p className="text-espresso/70 leading-relaxed max-w-2xl mb-2">
                Companion essays connect each conversation to larger questions about money,
                technology, institutions, and public life. Subscribe to receive them as
                they&apos;re released.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <a
                href={settings.substackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-base px-8 py-4 mt-8"
              >
                Subscribe on Substack
              </a>
            </Reveal>
          </div>
        </section>
      ) : (
        /* ── LIVE ARCHIVE — appears automatically once essays are published ── */
        <>
          <div className="bg-espresso border-t border-white/10 sticky top-16 lg:top-20 z-30">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-3 flex gap-2 overflow-x-auto">
              <button className="shrink-0 text-xs border border-copper/40 text-copper px-3 py-1.5 rounded-full bg-copper/10">All</button>
              {categories.map(cat => (
                <button key={cat} className="shrink-0 text-xs border border-white/10 text-beige/50 px-3 py-1.5 rounded-full hover:border-copper/30 hover:text-copper/80 transition-colors">
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="py-16 lg:py-20 bg-cream">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              {reflections[0] && (
                <div className="mb-12">
                  <ReflectionCard reflection={reflections[0]} featured />
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reflections.slice(1).map(r => <ReflectionCard key={r.slug} reflection={r} />)}
              </div>
            </div>
          </div>
        </>
      )}

      <NewsletterCTA />
    </>
  )
}
