import { getEpisodes, getSiteSettings } from '@/lib/contentful'
import { MaskLine, Reveal } from '@/components/Reveal'
import EpisodeCard from '@/components/EpisodeCard'
import NewsletterCTA from '@/components/NewsletterCTA'
import StreamingLinks from '@/components/StreamingLinks'
import { DUMMY_EPISODE } from '@/lib/dummy-episode'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Episodes',
  description: 'Conversations from Terms & Conditions: The Fine Print.',
}

// Stepped edge: the upper section's color descends in equal steps into the lower color.
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

export default async function EpisodesPage() {
  const [fetched, settings] = await Promise.all([getEpisodes(), getSiteSettings()])
  // Template demo episode appears ONLY on preview/development deployments —
  // never on production. Delete once the template has been approved.
  const isPreviewBuild = process.env.VERCEL_ENV !== 'production'
  const episodes =
    isPreviewBuild && !fetched.some((e) => e.slug === DUMMY_EPISODE.slug)
      ? [DUMMY_EPISODE, ...fetched]
      : fetched

  return (
    <>
      {/* ── Page header — navy with dossier readout ── */}
      <header className="pt-36 pb-20 bg-espresso relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-copper/60" />
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-copper/80">Season One</span>
          </div>
          <h1 className="font-serif text-5xl lg:text-7xl font-bold text-cream mb-5">
            <MaskLine>Episodes</MaskLine>
          </h1>
          <p className="text-beige/70 text-lg max-w-xl">
            Conversations with people working on the institutions, technologies, policies, and
            systems that shape economic life.
          </p>
        </div>
        <div className="dossier">
          <div>
            ARCHIVE <span className="dim">—</span> EPISODES
          </div>
          <div>
            STATUS <span className="dim">:</span> <span className="blink">IN PRODUCTION</span>
          </div>
          <div>
            RECORDED <span className="dim">:</span> 06
          </div>
          <div>
            RELEASED <span className="dim">:</span> 00
          </div>
        </div>
      </header>

      {/* Stepped edge: navy → cream */}
      <StepperEdge lowerBg="#FAF7F0" upperFill="#2B3A52" />

      {episodes.length === 0 ? (
        <>
          {/* ── 01 — First episodes coming soon ── */}
          <section className="pb-24 pt-10">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-[11px] tracking-[0.12em] text-terracotta">// 01</span>
                <div className="h-px w-8 bg-terracotta" />
                <span className="font-mono text-[11px] tracking-[0.12em] text-terracotta">
                  FIRST EPISODES COMING SOON
                </span>
              </div>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-espresso mb-5 leading-tight">
                <MaskLine>The conversations are</MaskLine>
                <MaskLine delay={0.12}>
                  <em className="hl">already recorded.</em>
                </MaskLine>
              </h2>
              <Reveal>
                <p className="text-espresso/70 leading-relaxed max-w-2xl mb-2">
                  Six conversations are in production now. When the first episode drops, it will
                  appear here first — along with the video, the companion essay, and the reading
                  list behind it.
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
                      0<em>1</em>
                    </div>
                    <div className="lbl">Season in production</div>
                  </div>
                  <div className="stat">
                    <div className="num">
                      0<em>0</em>
                    </div>
                    <div className="lbl">Episodes released</div>
                  </div>
                  <div className="stat">
                    <div className="num">
                      <em>—</em>
                    </div>
                    <div className="lbl">Release date pending</div>
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

          {/* Stepped edge: cream → navy */}
          <StepperEdge lowerBg="#2B3A52" upperFill="#FAF7F0" />

          {/* ── 02 — The conversations (teaser cards) ── */}
          <section className="py-20 lg:py-24 bg-espresso relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-[11px] tracking-[0.12em] text-copper">// 02</span>
                <div className="h-px w-8 bg-copper/60" />
                <span className="font-mono text-[11px] tracking-[0.12em] text-copper">
                  THE CONVERSATIONS
                </span>
              </div>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-cream mb-4 leading-tight">
                <MaskLine light>What&apos;s coming in</MaskLine>
                <MaskLine light delay={0.12}>
                  <em className="hl gold">season one</em>
                </MaskLine>
              </h2>
              <p className="text-beige/60 leading-relaxed max-w-2xl mb-2">
                Six conversations are in the can. Guest names will be announced here as episodes
                approach release.
              </p>

              <div className="teaser-grid">
                {TEASERS.map((n, i) => (
                  <Reveal key={n} delay={(i % 3) * 0.1}>
                    <div className="teaser">
                      <div className="t-num">GUEST 0{n}</div>
                      <div className="t-status">
                        <b>●</b> CONVERSATION RECORDED
                      </div>
                      <div className="t-theme">Discussion theme — to be announced</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        /* ── LIVE ARCHIVE — appears automatically once episodes are published ── */
        <>
          <section className="py-16 lg:py-20 bg-cream">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              {episodes[0] && (
                <div className="mb-12">
                  <EpisodeCard episode={episodes[0]} featured />
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {episodes.slice(1).map((ep) => (
                  <EpisodeCard key={ep.slug} episode={ep} />
                ))}
              </div>
            </div>
          </section>
          <div className="py-10 bg-cream-dark">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              <StreamingLinks settings={settings} />
            </div>
          </div>
        </>
      )}

      <NewsletterCTA />
    </>
  )
}
