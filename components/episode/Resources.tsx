import { Resource } from '@/lib/types'
import { Reveal } from '@/components/Reveal'

export default function Resources({ resources }: { resources: Resource[] }) {
  if (!resources.length) return null
  return (
    <section className="py-16 lg:py-24 bg-sand">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-8 bg-terracotta" />
          <span className="text-xs font-sans uppercase tracking-[0.2em] text-terracotta">Resources</span>
        </div>
        <h2 className="font-serif text-3xl lg:text-4xl font-bold text-espresso mb-8">
          <Reveal>Go deeper</Reveal>
        </h2>
        <ul className="space-y-0 border-b border-espresso/10">
          {resources.map((r, i) => (
            <li key={i} className="py-5 border-t border-espresso/10">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-copper">{r.type}</span>
              {r.url ? (
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="block font-serif text-lg font-bold text-espresso hover:text-terracotta transition-colors mt-1">
                  {r.title}
                </a>
              ) : (
                <p className="font-serif text-lg font-bold text-espresso mt-1">{r.title}</p>
              )}
              {r.author && <p className="text-xs text-warm-gray mt-0.5">{r.author}</p>}
              {r.description && <p className="text-sm text-espresso/70 leading-relaxed mt-2 max-w-2xl">{r.description}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
