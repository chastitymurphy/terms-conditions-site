import { episodes, reflections } from '@/lib/data'
import HeroSection from '@/components/HeroSection'
import EpisodeCard from '@/components/EpisodeCard'
import ReflectionCard from '@/components/ReflectionCard'
import TopicsGrid from '@/components/TopicsGrid'
import NewsletterCTA from '@/components/NewsletterCTA'
import Link from 'next/link'

export default function HomePage() {
  const latestEpisode   = episodes[0]
  const latestReflection = reflections[0]
  const recentEpisodes  = episodes.slice(1)

  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Featured Episode */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-terracotta" />
                <span className="text-xs font-sans uppercase tracking-[0.2em] text-terracotta">Latest Episode</span>
              </div>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-espresso">
                Featured Episode
              </h2>
            </div>
            <Link href="/episodes" className="hidden sm:inline text-sm text-warm-gray hover:text-terracotta transition-colors">
              All episodes →
            </Link>
          </div>
          <EpisodeCard episode={latestEpisode} featured />
        </div>
      </section>

      {/* Featured Reflection */}
      <section className="py-20 lg:py-28 bg-beige-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-terracotta" />
                <span className="text-xs font-sans uppercase tracking-[0.2em] text-terracotta">Latest Reflection</span>
              </div>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-espresso">
                Featured Essay
              </h2>
            </div>
            <Link href="/reflections" className="hidden sm:inline text-sm text-warm-gray hover:text-terracotta transition-colors">
              All essays →
            </Link>
          </div>
          <ReflectionCard reflection={latestReflection} featured />
        </div>
      </section>

      {/* Topics Grid */}
      <TopicsGrid />

      {/* Recent Episodes */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-terracotta" />
                <span className="text-xs font-sans uppercase tracking-[0.2em] text-terracotta">Recent</span>
              </div>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-espresso">
                More Episodes
              </h2>
            </div>
            <Link href="/episodes" className="hidden sm:inline text-sm text-warm-gray hover:text-terracotta transition-colors">
              Browse all →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {recentEpisodes.map(ep => (
              <EpisodeCard key={ep.slug} episode={ep} />
            ))}
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-20 lg:py-28 bg-warm-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-copper/60" />
              <span className="text-xs font-sans uppercase tracking-[0.2em] text-copper/80">The Platform</span>
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-bold text-cream leading-tight mb-6">
              Understanding the systems that shape economic life
            </h2>
            <p className="text-beige/70 leading-relaxed mb-8">
              Most people interact with financial systems every day without understanding the
              institutions and decisions that shape them. Terms &amp; Conditions examines those
              systems and the people working to build, regulate, reform, and challenge them.
            </p>
            <Link href="/about" className="btn-ghost border-beige/30 text-beige hover:bg-beige/10 hover:text-beige">
              About the podcast
            </Link>
          </div>

          <div className="lg:pl-12">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <div className="font-serif text-xl text-cream italic leading-relaxed mb-6">
                &ldquo;I understand something about the economy that nobody ever explained to me before.&rdquo;
              </div>
              <div className="h-px bg-copper/20 mb-5" />
              <p className="text-sm text-beige/50 uppercase tracking-widest">
                What every visitor should feel leaving this site
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterCTA />

      {/* Podcast Platforms */}
      <section className="py-10 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-warm-gray">Available on</span>
            {[
              { label: 'Spotify', href: 'https://open.spotify.com' },
              { label: 'Apple Podcasts', href: 'https://podcasts.apple.com' },
              { label: 'YouTube', href: 'https://youtube.com' },
              { label: 'RSS Feed', href: '/api/rss' },
            ].map(platform => (
              <a
                key={platform.label}
                href={platform.href}
                target={platform.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="text-sm font-medium text-espresso/60 hover:text-terracotta transition-colors border border-beige/60 px-4 py-2 rounded-full hover:border-terracotta/40"
              >
                {platform.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
