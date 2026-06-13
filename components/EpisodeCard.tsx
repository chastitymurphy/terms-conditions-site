import Link from 'next/link'
import Image from 'next/image'
import { Episode } from '@/lib/types'

export default function EpisodeCard({ episode, featured = false }: { episode: Episode; featured?: boolean }) {
  return (
    <Link
      href={`/episodes/${episode.slug}`}
      className={`group block bg-white/60 rounded-2xl overflow-hidden border border-beige/60 card-hover ${
        featured ? 'lg:flex' : ''
      }`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden bg-beige ${
          featured ? 'lg:w-2/5 h-64 lg:h-auto' : 'h-52'
        }`}
      >
        <Image
          src={episode.image}
          alt={episode.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-espresso/30">
          <div className="w-14 h-14 rounded-full bg-cream/90 flex items-center justify-center">
            <svg className="w-5 h-5 text-espresso ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`p-6 flex flex-col ${featured ? 'lg:w-3/5 lg:p-8 lg:justify-center' : ''}`}>
        {/* Topics */}
        <div className="flex flex-wrap gap-2 mb-3">
          {episode.topics.slice(0, 2).map(topic => (
            <span key={topic} className="topic-pill">{topic.replace(/-/g, ' ')}</span>
          ))}
        </div>

        <h3 className={`font-serif font-bold text-espresso leading-tight mb-2 group-hover:text-terracotta transition-colors ${
          featured ? 'text-2xl lg:text-3xl' : 'text-xl'
        }`}>
          {episode.title}
        </h3>

        <p className="text-sm text-cinnamon font-medium mb-3">
          {episode.guest} — {episode.guestTitle}
        </p>

        <p className="text-sm text-warm-gray leading-relaxed line-clamp-2 mb-4">
          {episode.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs text-warm-gray">
            {new Date(episode.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            {' · '}{episode.duration}
          </span>
          <span className="text-xs font-medium text-terracotta group-hover:underline">
            Listen →
          </span>
        </div>
      </div>
    </Link>
  )
}
