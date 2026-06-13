import { SUBSTACK_URL } from '@/lib/data'

export default function NewsletterCTA({ minimal = false }: { minimal?: boolean }) {
  if (minimal) {
    return (
      <div className="bg-beige rounded-2xl p-6 border border-copper/20">
        <h3 className="font-serif text-lg font-bold text-espresso mb-1">
          Get the newsletter
        </h3>
        <p className="text-sm text-warm-gray mb-4">
          Essays, episode notes, and resources delivered to your inbox.
        </p>
        <a
          href={SUBSTACK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-sm"
        >
          Subscribe on Substack
        </a>
      </div>
    )
  }

  return (
    <section className="py-20 lg:py-28 bg-espresso relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(184,122,79,0.3) 40px, rgba(184,122,79,0.3) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(184,122,79,0.3) 40px, rgba(184,122,79,0.3) 41px)"
        }}
      />

      <div className="relative max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-8 bg-copper/50" />
          <span className="text-xs font-sans uppercase tracking-[0.2em] text-copper">
            Never miss an episode
          </span>
          <div className="h-px w-8 bg-copper/50" />
        </div>

        <h2 className="font-serif text-3xl lg:text-5xl font-bold text-cream leading-tight mb-4">
          The Fine Print,<br />
          <span className="italic text-copper">in your inbox</span>
        </h2>

        <p className="font-sans text-beige/70 text-lg mb-8 max-w-xl mx-auto">
          Companion essays, episode notes, and reading lists. A publication exploring
          the hidden rules of economic life — delivered every time a new episode drops.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={SUBSTACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-terracotta text-cream font-medium hover:bg-burnt-clay transition-colors"
          >
            Subscribe on Substack
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <span className="text-xs text-beige/40">Free. No spam. Unsubscribe anytime.</span>
        </div>
      </div>
    </section>
  )
}
