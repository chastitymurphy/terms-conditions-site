import { getEpisodes, getSiteSettings } from '@/lib/contentful'
import EpisodeCard from '@/components/EpisodeCard'
import NewsletterCTA from '@/components/NewsletterCTA'
import StreamingLinks from '@/components/StreamingLinks'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Episodes',
  description: 'Conversations from Terms & Conditions: The Fine Print.',
}

export default async function EpisodesPage() {
  const [episodes, settings] = await Promise.all([getEpisodes(), getSiteSettings()])

  return (
    <>
      {/* Header */}
      <div className="pt-32 pb-16 bg-espresso">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-copper/60" />
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-copper/80">Episodes</span>
          </div>
          <h1 className="font-serif text-4xl lg:text-6xl font-bold text-cream mb-4">Episodes</h1>
          <p className="text-beige/70 text-lg max-w-xl">
            Conversations with people working on the institutions, technologies, policies, and systems that shape economic life.
          </p>
        </div>
      </div>

      {episodes.length === 0 ? (
        /* ── PRE-LAUNCH EMPTY STATE — intentional, not unfinished ── */
        <>
          <div className="py-24 lg:py-32">
            <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
              <div className="h-px w-12 bg-terracotta mx-auto mb-6" />
              <p className="font-serif text-2xl lg:text-3xl text-espresso leading-snug mb-4">
                First episodes coming soon.
              </p>
              <p className="text-espresso/70 leading-relaxed mb-8">
                {settings.prelaunchCount} conversations have already been recorded and are currently in production.
                Subscribe to get the first episode when it drops.
              </p>
              <a
                href={settings.substackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-base px-8 py-4"
              >
                Subscribe before launch
              </a>
            </div>
          </div>
          <NewsletterCTA />
        </>
      ) : (
        /* ── LIVE ARCHIVE — appears automatically once episodes are published ── */
        <>
          <div className="py-16 lg:py-20 bg-cream">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              {episodes[0] && (
                <div className="mb-12">
                  <EpisodeCard episode={episodes[0]} featured />
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {episodes.slice(1).map(ep => <EpisodeCard key={ep.slug} episode={ep} />)}
              </div>
            </div>
          </div>
          <div className="py-10 bg-cream-dark">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              <StreamingLinks settings={settings} />
            </div>
          </div>
          <NewsletterCTA />
        </>
      )}
    </>
  )
}
