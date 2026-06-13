import { notFound } from 'next/navigation'
import { topics, episodes, reflections } from '@/lib/data'
import EpisodeCard from '@/components/EpisodeCard'
import ReflectionCard from '@/components/ReflectionCard'

export async function generateStaticParams() {
  return topics.map(t => ({ topic: t.slug }))
}

export default function TopicPage({ params }: { params: { topic: string } }) {
  const topic = topics.find(t => t.slug === params.topic)
  if (!topic) notFound()

  const topicEpisodes   = episodes.filter(ep => ep.topics.includes(params.topic))
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
          <p className="text-beige/60 text-lg max-w-xl">{topic.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20 space-y-16">
        {topicEpisodes.length > 0 && (
          <div>
            <h2 className="font-serif text-2xl font-bold text-espresso mb-8">Episodes</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {topicEpisodes.map(ep => <EpisodeCard key={ep.slug} episode={ep} />)}
            </div>
          </div>
        )}
        {topicReflections.length > 0 && (
          <div>
            <h2 className="font-serif text-2xl font-bold text-espresso mb-8">Reflections</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {topicReflections.map(r => <ReflectionCard key={r.slug} reflection={r} />)}
            </div>
          </div>
        )}
        {topicEpisodes.length === 0 && topicReflections.length === 0 && (
          <p className="text-warm-gray">Content on this topic coming soon.</p>
        )}
      </div>
    </>
  )
}
