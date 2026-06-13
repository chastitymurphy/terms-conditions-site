import Link from 'next/link'
import Image from 'next/image'
import { Reflection } from '@/lib/types'

export default function ReflectionCard({ reflection, featured = false }: { reflection: Reflection; featured?: boolean }) {
  return (
    <Link
      href={`/reflections/${reflection.slug}`}
      className={`group block bg-cream-dark rounded-2xl overflow-hidden border border-beige/60 card-hover ${
        featured ? 'lg:flex' : ''
      }`}
    >
      {/* Image */}
      {reflection.image && (
        <div
          className={`relative overflow-hidden bg-beige ${
            featured ? 'lg:w-2/5 h-64 lg:h-auto' : 'h-48'
          }`}
        >
          <Image
            src={reflection.image}
            alt={reflection.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/20 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className={`p-6 flex flex-col ${featured ? 'lg:w-3/5 lg:p-8 lg:justify-center' : ''}`}>
        {/* Topic tag */}
        <div className="mb-3">
          <span className="topic-pill">{reflection.topic.replace(/-/g, ' ')}</span>
        </div>

        <h3 className={`font-serif font-bold text-espresso leading-tight mb-1 group-hover:text-terracotta transition-colors ${
          featured ? 'text-2xl lg:text-3xl' : 'text-xl'
        }`}>
          {reflection.title}
        </h3>

        {reflection.subtitle && (
          <p className="font-serif italic text-warm-gray text-sm mb-3">
            {reflection.subtitle}
          </p>
        )}

        <p className="text-sm text-warm-gray leading-relaxed line-clamp-3 mb-4">
          {reflection.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs text-warm-gray">
            {new Date(reflection.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            {' · '}{reflection.readingTime}
          </span>
          <span className="text-xs font-medium text-terracotta group-hover:underline">
            Read →
          </span>
        </div>
      </div>
    </Link>
  )
}
