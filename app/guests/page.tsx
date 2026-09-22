import { getGuests, getSiteSettings } from '@/lib/contentful'
import { MaskLine, Reveal } from '@/components/Reveal'
import NewsletterCTA from '@/components/NewsletterCTA'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Guests',
  description: 'People working on the institutions, technologies, policies, and ideas that shape economic life.',
}

function StepperEdge({ lowerBg, upperFill }: { lowerBg: string; upperFill: string }) {
  return (
    <svg
      className="block w-full h-[64px]"
      style={{ background: lowerBg }}
      viewBox="0 0 1200 64"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,0 L1200,0 L1200,11 L1000,11 L1000,22 L800,22 L800,32 L600,32 L600,43 L400,43 L400,53 L0,53 Z"
        fill={upperFill}
      />
    </svg>
  )
}

const TEASERS = [1, 2, 3, 4, 5, 6]

export default async function GuestsPage() {
  const [guests, settings] = await Promise.all([getGuests(), getSiteSettings()])

  // Only show guests whose status is announced or published.
  // Recorded-only guests stay in the CMS until announced.
  const publicGuests = guests.filter(g => g.status === 'announced' || g.status === 'published')

  return (
    <>
      {/* ── Page header — navy with dossier readout ── */}
      <header className="pt-36 pb-20 bg-espresso relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-copper/60" />
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-copper/80">The Roster</span>
          </div>
          <h1 className="font-serif text-5xl lg:text-7xl font-bold text-cream mb-5">
            <MaskLine>Guests</MaskLine>
          </h1>
          <p className="text-beige/70 text-lg max-w-xl">
            Conversations with people working on the institutions, technologies, policies, and
            ideas that shape economic life.
          </p>
        </div>
        <div className="dossier">
          <div>
            ROSTER <span className="dim">—</span> GUESTS
          </div>
          <div>
            STATUS <span className="dim">:</span> <span className="blink">IN PRODUCTION</span>
          </div>
          <div>
            RECORDED <span className="dim">:</span> 06
          </div>
          <div>
            ANNOUNCED <span className="dim">:</span> 00
          </div>
        </div>
      </header>

      {/* Stepped edge: navy → cream */}
      <StepperEdge lowerBg="#FAF7F0" upperFill="#2B3A52" />

      {publicGuests.length === 0 ? (
        /* ── 01 — The conversations are recorded, names forthcoming ── */
        <section className="pb-24 pt-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono text-[11px] tracking-[0.12em] text-terracotta">// 01</span>
              <div className="h-px w-8 bg-terracotta" />
              <span className="font-mono text-[11px] tracking-[0.12em] text-terracotta">
                NAMES ANNOUNCED AS EPISODES NEAR
              </span>
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-espresso mb-5 leading-tight">
              <MaskLine>The conversations are recorded.</MaskLine>
              <MaskLine delay={0.12}>
                <em className="hl">The names are forthcoming.</em>
              </MaskLine>
            </h2>
            <Reveal>
              <p className="text-espresso/70 leading-relaxed max-w-2xl mb-2">
                Six conversations are in the can. Guest names will be announced here as episodes
                approach release — subscribe to be the first to know who is featured.
              </p>
            </Reveal>

            <Reveal className="mt-10">
              <div className="stat-row">
                <div className="stat">
                  <div className="num">
                    0<em>6</em>
                  </div>
                  <div className="lbl">Conversations recorded</div>
                </div>
                <div className="stat">
                  <div className="num">
                    0<em>0</em>
                  </div>
                  <div className="lbl">Names announced</div>
                </div>
                <div className="stat">
                  <div className="num">
                    <em>—</em>
                  </div>
                  <div className="lbl">Episodes pending</div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <a
                href={settings.substackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-base px-8 py-4 mt-10"
              >
                Subscribe before launch
              </a>
            </Reveal>
          </div>
        </section>
      ) : (
        /* ── LIVE ROSTER — appears automatically once guests are announced ── */
        <section className="py-16 lg:py-20 bg-cream">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
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
          </div>
        </section>
      )}

      <NewsletterCTA />
    </>
  )
}
