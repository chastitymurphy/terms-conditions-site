import { getEpisodes, getReflections, getAllGuests, getSiteSettings } from '@/lib/contentful'
import HeroSection from '@/components/HeroSection'
import StreamingLinks from '@/components/StreamingLinks'
import Link from 'next/link'

export default async function HomePage() {
  const [episodes, reflections, guests, settings] = await Promise.all([
    getEpisodes(),
    getReflections(),
    getAllGuests(),
    getSiteSettings(),
  ])

  // Public-side: only guests safe to mention by name (announced or published).
  const announcedGuests = guests.filter(g => g.status === 'announced' || g.status === 'published')

  return (
    <>
      <HeroSection />

      {/* ── 2. IN PRODUCTION ───────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-terracotta" />
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-terracotta">In production</span>
          </div>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-espresso mb-4">
            Conversations already in the works
          </h2>
          <p className="text-espresso/75 leading-relaxed max-w-3xl mb-12">
            The first season of Terms &amp; Conditions is already in production. {settings.prelaunchCount} conversations
            with researchers, policymakers, technologists, advocates, and practitioners will examine the systems
            beneath everyday economic life — from payments and banking to surveillance, public infrastructure,
            technology, and economic power.
          </p>

          {announcedGuests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {announcedGuests.slice(0, 6).map(guest => (
                <div key={guest.slug} className="bg-white/70 border border-beige/60 rounded-2xl p-6">
                  <div className="w-12 h-12 rounded-full bg-beige flex items-center justify-center text-lg font-serif font-bold text-espresso mb-4">
                    {(guest.name || '?').charAt(0)}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-espresso mb-1">{guest.name}</h3>
                  <p className="text-xs text-warm-gray mb-3">{guest.title}{guest.organization ? ` · ${guest.organization}` : ''}</p>
                  {guest.discussionTheme && (
                    <p className="text-sm text-espresso/70 leading-relaxed italic mb-3">
                      On: {guest.discussionTheme}
                    </p>
                  )}
                  <span className="inline-block text-xs font-sans uppercase tracking-widest text-terracotta">
                    Conversation recorded · Episode forthcoming
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-beige-light border border-beige/60 rounded-2xl p-10 max-w-3xl">
              <p className="font-serif text-2xl text-espresso mb-3 leading-snug">
                {settings.prelaunchCount} conversations are currently in production.
              </p>
              <p className="text-espresso/70 leading-relaxed mb-6">
                Guest names will be announced as episodes approach release. Subscribe to be notified when the first episode drops.
              </p>
              <Link
                href={settings.substackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
              >
                Subscribe before launch
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── 3. WHAT WE EXPLORE ───────────────────────────────────────── */}
      <section id="topics" className="py-20 lg:py-28 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-terracotta" />
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-terracotta">Editorial territory</span>
          </div>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-espresso mb-10">
            What we explore
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: 'Money & Payments',                desc: 'How money moves, who controls the rails, and what flows beneath every transaction.' },
              { label: 'Banking & Public Infrastructure',  desc: 'The institutions that hold money and the public systems that govern access to it.' },
              { label: 'Technology & AI',                 desc: 'Algorithms, automation, and artificial intelligence shaping financial and economic life.' },
              { label: 'Privacy & Surveillance',          desc: 'Data trails, transaction records, and the systems that watch what we do.' },
              { label: 'Wealth & Economic Power',         desc: 'How wealth is built, distributed, transferred, and blocked.' },
              { label: 'Democracy & Public Institutions', desc: 'Governance, public life, and the institutions that shape economic rules.' },
            ].map(topic => (
              <div key={topic.label} className="bg-white/70 rounded-2xl border border-beige/50 p-6">
                <h3 className="font-serif text-lg font-bold text-espresso mb-2">{topic.label}</h3>
                <p className="text-sm text-warm-gray leading-relaxed">{topic.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WHY THIS PROJECT ───────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-warm-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-copper/60" />
              <span className="text-xs font-sans uppercase tracking-[0.2em] text-copper/80">Why this project</span>
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-bold text-cream leading-tight mb-6">
              Understanding the systems that shape economic life
            </h2>
            <div className="text-beige/70 leading-relaxed space-y-4">
              <p>
                We interact with financial and technological systems every day, often without knowing who designed them,
                how they work, or whose interests they serve.
              </p>
              <p>
                Terms &amp; Conditions makes those systems legible — through conversations with people who study them,
                govern them, challenge them, and build alternatives.
              </p>
            </div>
          </div>
          <div className="lg:pl-12">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <div className="font-serif text-xl lg:text-2xl text-cream italic leading-relaxed mb-6">
                &ldquo;I understand something about the economy that nobody ever explained to me before.&rdquo;
              </div>
              <div className="h-px bg-copper/20 mb-5" />
              <p className="text-xs text-beige/45 uppercase tracking-widest">A north star for the project</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. HOST ─────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-3 gap-10 items-center">
            <div className="lg:col-span-1 flex justify-center">
              <div className="relative w-40 h-40 lg:w-48 lg:h-48 rounded-2xl overflow-hidden border border-beige">
                <img src="/chastity-murphy.jpg" alt={settings.hostName} className="w-full h-full object-cover object-top" />
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-terracotta" />
                <span className="text-xs font-sans uppercase tracking-[0.2em] text-terracotta">Host</span>
              </div>
              <h3 className="font-serif text-2xl lg:text-3xl font-bold text-espresso mb-2">{settings.hostName}</h3>
              <p className="text-sm text-cinnamon font-medium mb-4">{settings.hostTitle}</p>
              <p className="text-espresso/75 leading-relaxed mb-6">
                {settings.aboutHost}
              </p>
              <Link href="/about" className="btn-ghost text-sm">
                About the host →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. NEWSLETTER ───────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-warm-dark text-cream">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 bg-copper/50" />
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-copper/80">Newsletter</span>
            <div className="h-px w-8 bg-copper/50" />
          </div>
          <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-bold text-cream leading-tight mb-3">
            The Fine Print, <em className="text-copper">in your inbox</em>
          </h2>
          <p className="font-serif text-xl italic text-cream/70 mb-6 leading-snug">
            Be there when the first episode drops.
          </p>
          <p className="text-beige/70 leading-relaxed mb-8 max-w-xl mx-auto">
            Subscribe for new episodes, companion essays, reading lists, and occasional notes from behind the project.
          </p>
          <div className="flex flex-col items-center gap-4">
            <a
              href={settings.substackUrl}
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

      {/* ── 7. FOLLOW / LISTEN (only platforms with real URLs) ────────── */}
      <section className="py-10 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <StreamingLinks settings={settings} />
        </div>
      </section>
    </>
  )
}
