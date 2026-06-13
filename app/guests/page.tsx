import { guests, getEpisode } from '@/lib/data'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Guests',
  description: 'Guests who have appeared on Terms & Conditions: The Fine Print.',
}

export default function GuestsPage() {
  return (
    <>
      <div className="pt-32 pb-16 bg-espresso">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-copper/60" />
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-copper/80">The Conversations</span>
          </div>
          <h1 className="font-serif text-4xl lg:text-6xl font-bold text-cream mb-4">Guests</h1>
          <p className="text-beige/60 text-lg max-w-xl">
            Researchers, policymakers, advocates, and practitioners working on the
            financial systems that shape economic life.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guests.map(guest => {
            const ep = guest.episodes[0] ? getEpisode(guest.episodes[0]) : null
            return (
              <div key={guest.slug} className="bg-white/60 border border-beige/60 rounded-2xl p-6 card-hover">
                <div className="w-12 h-12 rounded-full bg-beige flex items-center justify-center text-lg font-serif font-bold text-espresso mb-4">
                  {guest.name.charAt(0)}
                </div>
                <h3 className="font-serif text-xl font-bold text-espresso mb-1">{guest.name}</h3>
                <p className="text-sm text-cinnamon mb-1">{guest.title}</p>
                <p className="text-xs text-warm-gray mb-4">{guest.organization}</p>
                <p className="text-sm text-espresso/70 leading-relaxed mb-5">{guest.bio}</p>
                {ep && (
                  <Link
                    href={`/episodes/${ep.slug}`}
                    className="text-xs text-terracotta hover:underline"
                  >
                    Listen to episode: {ep.title} →
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
