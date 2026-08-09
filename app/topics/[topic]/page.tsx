import { notFound } from 'next/navigation'
import { getEpisodes, getReflections } from '@/lib/contentful'
import { topics } from '@/lib/data'
import { getSiteSettings } from '@/lib/contentful'
import Link from 'next/link'

export async function generateStaticParams() {
  return topics.map(t => ({ topic: t.slug }))
}

export default async function TopicPage({ params }: { params: { topic: string } }) {
  const topic = topics.find(t => t.slug === params.topic)
  if (!topic) notFound()

  const [episodes, reflections, settings] = await Promise.all([
    getEpisodes(),
    getReflections(),
    getSiteSettings(),
  ])

  const topicEpisodes    = episodes.filter(ep => ep.topics.includes(params.topic))
  const topicReflections = reflections.filter(r => r.topic === params.topic)

  return (
    <>
      <div className="pt-32 pb-16 bg-espresso">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-copper/60" />
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-copper/80">Topic</span>
          </div>
          <h1 className="font-serif text-4xl lg:text-6xl font-bold text-cream mb-4">{topic.label}</h1>
          <p className="text-beige/70 text-lg max-w-xl">{topic.description}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 lg:px-10 py-20 lg:py-28 text-center">
        {topicEpisodes.length === 0 && topicReflections.length === 0 ? (
          <>
            <p className="font-serif text-2xl lg:text-3xl text-espresso leading-snug mb-4">
              Conversations on this topic are coming.
            </p>
            <p className="text-espresso/70 leading-relaxed mb-8">
              Episodes and reflections on {topic.label.toLowerCase()} will be added as they are released.
              Subscribe to be the first to know.
            </p>
            <Link
              href={settings.substackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-4"
            >
              Subscribe before launch
            </Link>
          </>
        ) : (
          <div className="text-left space-y-12">
            {topicEpisodes.length > 0 && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-espresso mb-6">Episodes</h2>
                <div className="space-y-4">
                  {topicEpisodes.map(ep => (
                    <Link key={ep.slug} href={`/episodes/${ep.slug}`} className="block bg-white/70 border border-beige/60 rounded-xl p-6 hover:border-terracotta transition-colors">
                      <h3 className="font-serif text-lg font-bold text-espresso mb-1">{ep.title}</h3>
                      <p className="text-sm text-warm-gray">{ep.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {topicReflections.length > 0 && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-espresso mb-6">Reflections</h2>
                <div className="space-y-4">
                  {topicReflections.map(r => (
                    <Link key={r.slug} href={`/reflections/${r.slug}`} className="block bg-white/70 border border-beige/60 rounded-xl p-6 hover:border-terracotta transition-colors">
                      <h3 className="font-serif text-lg font-bold text-espresso mb-1">{r.title}</h3>
                      <p className="text-sm text-warm-gray">{r.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
