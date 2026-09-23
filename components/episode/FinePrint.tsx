import { FinePrintEntry } from '@/lib/types'

export default function FinePrint({ entries }: { entries: FinePrintEntry[] }) {
  if (!entries.length) return null
  return (
    <section className="py-16 lg:py-24 bg-espresso">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-8 bg-copper/60" />
          <span className="text-xs font-sans uppercase tracking-[0.2em] text-copper/80">The Fine Print</span>
        </div>
        <h2 className="font-serif text-3xl lg:text-4xl font-bold text-cream mb-4">
          The context beneath the conversation
        </h2>
        <p className="text-beige/60 leading-relaxed max-w-xl mb-10">
          What you need to understand the system underneath this episode — terms, laws, history, and data.
        </p>
        <div className="space-y-0 border-b border-white/10">
          {entries.map((e, i) => (
            <div key={i} className="py-6 border-t border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-copper border border-copper/40 rounded px-2 py-0.5">
                  {e.type}
                </span>
                <h3 className="font-serif text-lg font-bold text-cream">{e.title}</h3>
              </div>
              <p className="text-sm text-beige/70 leading-relaxed max-w-2xl">{e.body}</p>
              {e.url && (
                <a
                  href={e.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-copper hover:underline mt-2 inline-block"
                >
                  {e.url.replace(/^https?:\/\//, '').split('/')[0]} ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
