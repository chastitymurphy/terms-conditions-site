import { getGuests } from '@/lib/contentful'
import { getSiteSettings } from '@/lib/contentful'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Guests',
  description: 'People working on the institutions, technologies, policies, and ideas that shape economic life.',
}

export default async function GuestsPage() {
  const [guests, settings] = await Promise.all([getGuests(), getSiteSettings()])

  // Only show guests whose status is announced or published.
  // Recorded-only guests are NOT shown publicly (they live in CMS for internal tracking).
  const publicGuests = guests.filter(g => g.status === 'announced' || g.status === 'published')

  return (
    <>
      <div className="pt-32 pb-16 bg-espresso">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-copper/60" />
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-copper/80">The Conversations</span>
          </div>
          <h1 className="font-serif text-4xl lg:text-6xl font-bold text-cream mb-4">Guests</h1>
          <p className="text-beige/70 text-lg max-w-xl">
            Conversations with people working on the institutions, technologies, policies, and ideas that shape economic life.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        {publicGuests.length === 0 ? (
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-serif text-2xl lg:text-3xl text-espresso leading-snug mb-4">
              Guest names will be announced as episodes approach release.
            </p>
            <p className="text-espresso/70 leading-relaxed mb-8">
              {settings.prelaunchCount} conversations have already been recorded. Subscribe to be the first to know who is featured.
            </p>
            <a
              href={settings.substackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-4"
            >
              Subscribe before launch
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicGuests.map(guest => (
              <div key={guest.slug} className="bg-white/70 border border-beige/60 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-full bg-beige flex items-center justify-center text-lg font-serif font-bold text-espresso mb-4">
                  {(guest.name || '?').charAt(0)}
                </div>
                <h3 className="font-serif text-xl font-bold text-espresso mb-1">{guest.name}</h3>
                <p className="text-sm text-cinnamon mb-1">{guest.title}</p>
                <p className="text-xs text-warm-gray mb-3">{guest.organization}</p>
                {guest.discussionTheme && (
                  <p className="text-sm text-espresso/70 leading-relaxed italic mb-3">
                    On: {guest.discussionTheme}
                  </p>
                )}
                {guest.bio && (
                  <p className="text-sm text-espresso/70 leading-relaxed mb-4">{guest.bio}</p>
                )}
                <span className="inline-block text-xs font-sans uppercase tracking-widest text-terracotta">
                  {guest.status === 'published' ? 'Episode published' : 'Conversation recorded · Episode forthcoming'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
