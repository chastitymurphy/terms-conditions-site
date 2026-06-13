import { notFound } from 'next/navigation'
import { getEpisodes, getEpisode } from '@/lib/contentful'
import Image from 'next/image'
import Link from 'next/link'
import NewsletterCTA from '@/components/NewsletterCTA'
import EpisodeCard from '@/components/EpisodeCard'
import { Metadata } from 'next'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  const episodes = await getEpisodes()
  return episodes.map(ep => ({ slug: ep.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ep = await getEpisode(params.slug)
  if (!ep) return {}
  return { title: ep.title, description: ep.description }
}

export default async function EpisodePage({ params }: Props) {
  const [ep, all] = await Promise.all([getEpisode(params.slug), getEpisodes()])
  if (!ep) notFound()
  const related = all.filter(e => e.slug !== ep.slug && e.topics.some(t => ep.topics.includes(t))).slice(0, 2)

  return (
    <>
      <div className="pt-24 bg-espresso">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <Link href="/episodes" className="text-xs text-copper/70 uppercase tracking-widest hover:text-copper transition-colors mb-6 inline-flex items-center gap-2">← All Episodes</Link>
              <div className="flex flex-wrap gap-2 mb-5">
                {ep.topics.map(t => <span key={t} className="inline-block text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 text-copper/80 border border-copper/20">{t.replace(/-/g, ' ')}</span>)}
              </div>
              <h1 className="font-serif text-3xl lg:text-5xl font-bold text-cream leading-tight mb-4">{ep.title}</h1>
              <p className="text-copper font-medium mb-1">{ep.guest}</p>
              <p className="text-beige/50 text-sm mb-6">{ep.guestTitle}</p>
              <p className="text-beige/70 leading-relaxed mb-6">{ep.longDescription}</p>
              <div className="flex items-center gap-2 text-xs text-beige/40">
                <span>{new Date(ep.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span>·</span><span>{ep.duration}</span>
              </div>
            </div>
            {ep.image && (
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image src={ep.image} alt={ep.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 to-transparent" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-espresso border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex flex-wrap gap-3">
          {ep.spotifyUrl && <a href={ep.spotifyUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-copper border border-copper/20 px-4 py-2 rounded-full hover:bg-copper/10 transition-colors">Listen on Spotify</a>}
          <a href="https://podcasts.apple.com" target="_blank" rel="noopener noreferrer" className="text-xs text-copper border border-copper/20 px-4 py-2 rounded-full hover:bg-copper/10 transition-colors">Apple Podcasts</a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {ep.youtubeId && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-espresso mb-5">Watch</h2>
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-espresso/5">
                  <iframe src={`https://www.youtube.com/embed/${ep.youtubeId}`} title={ep.title} className="absolute inset-0 w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
              </div>
            )}
            {ep.takeaways.length > 0 && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-espresso mb-5">Key Takeaways</h2>
                <div className="space-y-3">
                  {ep.takeaways.map((t, i) => (
                    <div key={i} className="flex gap-4 bg-beige-light rounded-xl p-4">
                      <span className="font-serif text-2xl font-bold text-copper/40 leading-none mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                      <p className="text-sm text-espresso leading-relaxed">{t}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div>
              <h2 className="font-serif text-2xl font-bold text-espresso mb-5">Transcript</h2>
              <div className="bg-beige-light rounded-xl p-6 text-sm text-warm-gray leading-relaxed">{ep.transcript || 'Full transcript coming soon.'}</div>
            </div>
          </div>
          <div className="space-y-6">
            <NewsletterCTA minimal />
            <div className="bg-white/60 border border-beige/60 rounded-2xl p-6">
              <h3 className="font-serif text-lg font-bold text-espresso mb-3">About the Guest</h3>
              <p className="font-medium text-espresso text-sm">{ep.guest}</p>
              <p className="text-xs text-warm-gray mb-3">{ep.guestTitle}</p>
            </div>
            <div className="bg-white/60 border border-beige/60 rounded-2xl p-6">
              <h3 className="font-serif text-lg font-bold text-espresso mb-3">Topics</h3>
              <div className="flex flex-wrap gap-2">
                {ep.topics.map(t => <Link key={t} href={`/topics/${t}`} className="topic-pill hover:bg-terracotta hover:text-cream transition-colors">{t.replace(/-/g, ' ')}</Link>)}
              </div>
            </div>
          </div>
        </div>
        {related.length > 0 && (
          <div className="mt-16 pt-12 border-t border-beige/60">
            <h2 className="font-serif text-2xl font-bold text-espresso mb-8">Related Episodes</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {related.map(ep => <EpisodeCard key={ep.slug} episode={ep} />)}
            </div>
          </div>
        )}
      </div>
      <NewsletterCTA />
    </>
  )
}
