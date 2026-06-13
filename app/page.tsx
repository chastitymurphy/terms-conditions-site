import { getEpisodes, getReflections } from '@/lib/contentful'
import HeroSection from '@/components/HeroSection'
import EpisodeCard from '@/components/EpisodeCard'
import ReflectionCard from '@/components/ReflectionCard'
import TopicsGrid from '@/components/TopicsGrid'
import NewsletterCTA from '@/components/NewsletterCTA'
import Link from 'next/link'

export default async function HomePage() {
  const [episodes, reflections] = await Promise.all([getEpisodes(), getReflections()])

  const latestEpisode    = episodes[0]
  const latestReflection = reflections[0]
  const recentEpisodes   = episodes.slice(1)

  return (
    <>
      <HeroSection />

      {/* Streaming platforms — right below hero */}
      <section className="py-5 bg-warm-dark border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-6">
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-cream/40">Listen on</span>
            {[
              { label: 'Spotify', href: 'https://open.spotify.com' },
              { label: 'Apple Podcasts', href: 'https://podcasts.apple.com' },
              { label: 'YouTube', href: 'https://youtube.com' },
              { label: 'RSS Feed', href: '/api/rss' },
            ].map(p => (
              <a key={p.label} href={p.href} target={p.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                className="text-xs font-medium text-cream/60 hover:text-copper transition-colors border border-white/15 px-4 py-2 rounded-full hover:border-copper/40">
                {p.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA — second thing after hero */}
      <NewsletterCTA />

      {/* Featured Episode */}
      {latestEpisode && (
        <section className="py-20 lg:py-28 bg-cream">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-8 bg-terracotta" />
                  <span className="text-xs font-sans uppercase tracking-[0.2em] text-terracotta">Latest Episode</span>
                </div>
                <h2 className="font-serif text-3xl lg:text-4xl font-bold text-espresso">Featured Episode</h2>
              </div>
              <Link href="/episodes" className="hidden sm:inline text-sm text-warm-gray hover:text-terracotta transition-colors">All episodes →</Link>
            </div>
            <EpisodeCard episode={latestEpisode} featured />
          </div>
        </section>
      )}

      {/* Featured Reflection */}
      {latestReflection && (
        <section className="py-20 lg:py-28 bg-beige-light">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-8 bg-terracotta" />
                  <span className="text-xs font-sans uppercase tracking-[0.2em] text-terracotta">Latest Reflection</span>
                </div>
                <h2 className="font-serif text-3xl lg:text-4xl font-bold text-espresso">Featured Essay</h2>
              </div>
              <Link href="/reflections" className="hidden sm:inline text-sm text-warm-gray hover:text-terracotta transition-colors">All essays →</Link>
            </div>
            <ReflectionCard reflection={latestReflection} featured />
          </div>
        </section>
      )}

      <TopicsGrid />

      {/* Recent Episodes */}
      {recentEpisodes.length > 0 && (
        <section className="py-20 lg:py-28 bg-cream">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-8 bg-terracotta" />
                  <span className="text-xs font-sans uppercase tracking-[0.2em] text-terracotta">Recent</span>
                </div>
                <h2 className="font-serif text-3xl lg:text-4xl font-bold text-espresso">More Episodes</h2>
              </div>
              <Link href="/episodes" className="hidden sm:inline text-sm text-warm-gray hover:text-terracotta transition-colors">Browse all →</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentEpisodes.map(ep => <EpisodeCard key={ep.slug} episode={ep} />)}
            </div>
          </div>
        </section>
      )}

      {/* About teaser */}
      <section className="py-20 lg:py-28 bg-warm-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-copper/60" />
              <span className="text-xs font-sans uppercase tracking-[0.2em] text-copper/80">The Platform</span>
            </div>
            <h2 className="font-serif text-3xl lg:text-5xl font-bold text-cream leading-tight mb-6">Understanding the systems that shape economic life</h2>
            <p className="text-beige/70 leading-relaxed mb-8">Most people interact with financial systems every day without understanding the institutions and decisions that shape them. Terms &amp; Conditions examines those systems and the people working to build, regulate, reform, and challenge them.</p>
            <Link href="/about" className="btn-ghost border-beige/30 text-beige hover:bg-beige/10 hover:text-beige">About the podcast</Link>
          </div>
          <div className="lg:pl-12">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <div className="font-serif text-xl text-cream italic leading-relaxed mb-6">&ldquo;I understand something about the economy that nobody ever explained to me before.&rdquo;</div>
              <div className="h-px bg-copper/20 mb-5" />
              <p className="text-sm text-beige/50 uppercase tracking-widest">What every visitor should feel leaving this site</p>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
