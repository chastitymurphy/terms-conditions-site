import { Timestamp } from '@/lib/types'

function toSeconds(t: string): number {
  const parts = t.split(':').map(Number)
  if (parts.some(Number.isNaN)) return 0
  return parts.reduce((acc, p) => acc * 60 + p, 0)
}

export default function TimestampList({ timestamps, youtubeId }: { timestamps: Timestamp[]; youtubeId?: string }) {
  if (!timestamps.length) return null
  return (
    <section className="py-16 lg:py-24 bg-cream">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-8 bg-terracotta" />
          <span className="text-xs font-sans uppercase tracking-[0.2em] text-terracotta">Episode at a glance</span>
        </div>
        <ol className="border-b border-espresso/10">
          {timestamps.map((ts, i) => (
            <li key={i} className="flex items-baseline gap-5 py-4 border-t border-espresso/10">
              <span className="font-mono text-sm text-copper shrink-0 w-16">
                {youtubeId ? (
                  <a
                    href={`https://www.youtube.com/watch?v=${youtubeId}&t=${toSeconds(ts.time)}s`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {ts.time}
                  </a>
                ) : (
                  ts.time
                )}
              </span>
              <span className="font-serif text-lg text-espresso">{ts.label}</span>
            </li>
          ))}
        </ol>
        {youtubeId && (
          <p className="text-xs text-warm-gray mt-3">Timestamps link to the video on YouTube.</p>
        )}
      </div>
    </section>
  )
}
