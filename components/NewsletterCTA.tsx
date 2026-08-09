import { SUBSTACK_URL } from '@/lib/data'

export default function NewsletterCTA({ minimal = false }: { minimal?: boolean }) {
  if (minimal) {
    return (
      <div className="bg-beige rounded-2xl p-6 border border-copper/20">
        <h3 className="font-serif text-lg font-bold text-espresso mb-1">
          Get the newsletter
        </h3>
        <p className="text-sm text-warm-gray mb-4">
          Subscribe for new episodes, companion essays, and notes from behind the project.
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
    <section className="py-20 lg:py-28 bg-warm-dark text-cream">
      <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-8 bg-copper/50" />
          <span className="text-xs font-sans uppercase tracking-[0.2em] text-copper">
            Newsletter
          </span>
          <div className="h-px w-8 bg-copper/50" />
        </div>

        <h2 className="font-serif text-3xl lg:text-5xl font-bold text-cream leading-tight mb-3">
          The Fine Print,<br />
          <span className="italic text-copper">in your inbox</span>
        </h2>

        <p className="font-serif text-xl italic text-cream/70 mb-6 leading-snug">
          Be there when the first episode drops.
        </p>

        <p className="font-sans text-beige/70 text-lg mb-8 max-w-xl mx-auto">
          Subscribe for new episodes, companion essays, reading lists, and occasional notes from behind the project.
        </p>

        <div className="flex flex-col items-center gap-4">
          <a
            href={SUBSTACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-terracotta text-cream font-medium hover:bg-burnt-clay transition-colors"
          >
            Subscribe free on Substack
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
