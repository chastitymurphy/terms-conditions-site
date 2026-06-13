import { episodes } from '@/lib/data'
import { Resource } from '@/lib/types'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resource Library',
  description: 'Books, reports, articles, and organizations recommended on Terms & Conditions.',
}

// Aggregate all resources from episodes
const allResources: (Resource & { episode: string; episodeSlug: string })[] = episodes.flatMap(ep =>
  ep.resources.map(r => ({ ...r, episode: ep.title, episodeSlug: ep.slug }))
)

const typeLabels: Record<string, string> = {
  book:         '📚 Book',
  article:      '📰 Article',
  report:       '📋 Report',
  organization: '🏛️ Organization',
  video:        '▶️ Video',
}

export default function ResourcesPage() {
  return (
    <>
      <div className="pt-32 pb-16 bg-espresso">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-copper/60" />
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-copper/80">Reading &amp; Research</span>
          </div>
          <h1 className="font-serif text-4xl lg:text-6xl font-bold text-cream mb-4">
            Resource Library
          </h1>
          <p className="text-beige/60 text-lg max-w-xl">
            Books, reports, articles, organizations, and guest recommendations referenced
            across every episode.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        {allResources.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif text-2xl text-espresso/40 mb-4">Resources coming soon</p>
            <p className="text-warm-gray">Check back after new episodes are published.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {allResources.map((r, i) => (
              <div key={i} className="bg-white/70 border border-beige/60 rounded-xl p-5 card-hover">
                <span className="topic-pill text-[10px] mb-3">{typeLabels[r.type] || r.type}</span>
                <h3 className="font-serif font-bold text-espresso mb-1">{r.title}</h3>
                {r.author && <p className="text-xs text-warm-gray mb-2">{r.author}</p>}
                {r.description && <p className="text-sm text-espresso/70 leading-relaxed mb-3">{r.description}</p>}
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs text-warm-gray/60">Via: {r.episode}</span>
                  {r.url && (
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-xs text-terracotta hover:underline">
                      View →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
