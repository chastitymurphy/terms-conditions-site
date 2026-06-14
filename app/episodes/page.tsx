import { getEpisodes } from '@/lib/contentful'
import EpisodeCard from '@/components/EpisodeCard'
import NewsletterCTA from '@/components/NewsletterCTA'
import StreamingLinks from '@/components/StreamingLinks'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Episodes',
  description: 'All episodes of Terms & Conditions: The Fine Print',
}

export default async function EpisodesPage() {
  const episodes = await getEpisodes()
  return (
    <>
      <div className="pt-32 pb-16 bg-espresso">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-copper/60" />
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-copper/80">All Episodes</span>
          </div>
          <h1 className="font-serif text-4xl lg:text-6xl font-bold text-cream mb-4">Episodes</h1>
          <p className="text-beige/60 text-lg max-w-xl">
            Conversations about the financial infrastructure, institutions, and policies that shape economic life.
          </p>
        </div>
      </div>

      <div className="bg-espresso border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5">
          <StreamingLinks dark />
        </div>
      </div>

      <div className="py-16 lg:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {episodes[0] && <div className="mb-12"><EpisodeCard episode={episodes[0]} featured /></div>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {episodes.slice(1).map(ep => <EpisodeCard key={ep.slug} episode={ep} />)}
          </div>
        </div>
      </div>

      <NewsletterCTA />
    </>
  )
}
