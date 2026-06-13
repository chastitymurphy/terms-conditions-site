import Link from 'next/link'
import { topics } from '@/lib/data'

const topicIcons: Record<string, string> = {
  'banking':                 '🏛️',
  'payments':                '⚡',
  'financial-infrastructure':'🔩',
  'wealth':                  '⚖️',
  'consumer-protection':     '🛡️',
  'ai-technology':           '🤖',
  'privacy-surveillance':    '🔐',
  'public-banking':          '🏗️',
  'financial-inclusion':     '🌐',
  'economic-democracy':      '🗳️',
}

export default function TopicsGrid() {
  return (
    <section id="topics" className="py-20 lg:py-28 bg-cream-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-terracotta" />
              <span className="text-xs font-sans uppercase tracking-[0.2em] text-terracotta">Browse by subject</span>
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-espresso">
              Explore Topics
            </h2>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
          {topics.map(topic => (
            <Link
              key={topic.slug}
              href={`/topics/${topic.slug}`}
              className="group relative bg-white/70 rounded-xl p-5 border border-beige/50
                         hover:bg-espresso hover:border-espresso transition-all duration-300
                         hover:-translate-y-1 hover:shadow-lg cursor-pointer"
            >
              <div className="text-2xl mb-3">{topicIcons[topic.slug] || '📌'}</div>
              <h3 className="font-serif font-semibold text-espresso group-hover:text-cream text-sm leading-tight mb-1 transition-colors">
                {topic.label}
              </h3>
              <p className="text-xs text-warm-gray group-hover:text-beige/70 line-clamp-2 transition-colors leading-relaxed">
                {topic.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
