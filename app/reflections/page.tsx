import { reflections } from '@/lib/data'
import ReflectionCard from '@/components/ReflectionCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reflections',
  description: 'Essays and reflections on the hidden rules of economic life by Chastity Murphy.',
}

const categories = [
  'Financial Infrastructure', 'Payments', 'Wealth', 'Public Institutions',
  'AI', 'Privacy', 'Economic History', 'Economic Democracy',
]

export default function ReflectionsPage() {
  return (
    <>
      {/* Header */}
      <div className="pt-32 pb-16 bg-warm-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-copper/60" />
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-copper/80">Essays &amp; Reflections</span>
          </div>
          <h1 className="font-serif text-4xl lg:text-6xl font-bold text-cream mb-4">
            Reflections
          </h1>
          <p className="text-beige/60 text-lg max-w-xl">
            Companion essays by Chastity Murphy connecting each episode to broader
            questions about economic life.
          </p>
        </div>
      </div>

      {/* Category filter */}
      <div className="bg-warm-dark border-t border-white/10 sticky top-16 lg:top-20 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          <button className="shrink-0 text-xs border border-copper/40 text-copper px-3 py-1.5 rounded-full bg-copper/10">
            All
          </button>
          {categories.map(cat => (
            <button key={cat} className="shrink-0 text-xs border border-white/10 text-beige/50 px-3 py-1.5 rounded-full hover:border-copper/30 hover:text-copper/80 transition-colors">
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles grid */}
      <div className="py-16 lg:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Featured */}
          <div className="mb-12">
            <ReflectionCard reflection={reflections[0]} featured />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reflections.slice(1).map(r => (
              <ReflectionCard key={r.slug} reflection={r} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
