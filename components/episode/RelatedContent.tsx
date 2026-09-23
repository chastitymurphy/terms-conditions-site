import Link from 'next/link'
import { RelatedItem } from '@/lib/contentful'

export default function RelatedContent({ items }: { items: RelatedItem[] }) {
  if (!items.length) return null
  return (
    <section className="py-16 lg:py-24 bg-sand">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-8 bg-terracotta" />
          <span className="text-xs font-sans uppercase tracking-[0.2em] text-terracotta">Keep exploring</span>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="group block bg-white/60 rounded-2xl border border-beige/60 p-6 card-hover">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-copper">{item.type}</span>
              <h3 className="font-serif text-lg font-bold text-espresso mt-2 group-hover:text-terracotta transition-colors leading-snug">
                {item.title}
              </h3>
              {item.tags.length > 0 && (
                <p className="text-[11px] font-sans uppercase tracking-[0.15em] text-warm-gray mt-3">
                  {item.tags.slice(0, 3).join(' × ')}
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
