import { getReflections, getSiteSettings } from '@/lib/contentful'
import ReflectionCard from '@/components/ReflectionCard'
import NewsletterCTA from '@/components/NewsletterCTA'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reflections',
  description: 'Essays and reflections from Terms & Conditions: The Fine Print.',
}

export default async function ReflectionsPage() {
  const [reflections, settings] = await Promise.all([getReflections(), getSiteSettings()])

  const categories = [
    'Financial Infrastructure', 'Payments', 'Wealth', 'Public Institutions',
    'AI', 'Privacy', 'Economic History', 'Economic Democracy',
  ]

  return (
    <>
      {/* Header */}
      <div className="pt-32 pb-16 bg-warm-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-copper/60" />
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-copper/80">Essays &amp; Reflections</span>
          </div>
          <h1 className="font-serif text-4xl lg:text-6xl font-bold text-cream mb-4">Reflections</h1>
          <p className="text-beige/70 text-lg max-w-xl">
            Written pieces connecting conversations from the podcast to larger questions about money,
            technology, institutions, and public life.
          </p>
        </div>
      </div>

      {reflections.length === 0 ? (
        /* ── PRE-LAUNCH EMPTY STATE — intentional, not unfinished ── */
        <div className="py-24 lg:py-32">
          <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
            <div className="h-px w-12 bg-terracotta mx-auto mb-6" />
            <p className="font-serif text-2xl lg:text-3xl text-espresso leading-snug mb-4">
              Coming with the first episodes.
            </p>
            <p className="text-espresso/70 leading-relaxed mb-8">
              Companion essays will be published alongside each episode. Subscribe to receive them as they&apos;re released.
            </p>
            <a
              href={settings.substackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-4"
            >
              Subscribe on Substack
            </a>
          </div>
        </div>
      ) : (
        /* ── LIVE ARCHIVE — appears automatically once essays are published ── */
        <>
          <div className="bg-warm-dark border-t border-white/10 sticky top-16 lg:top-20 z-30">
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
