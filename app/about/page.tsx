import { Metadata } from 'next'
import Image from 'next/image'
import { getSiteSettings } from '@/lib/contentful'
import { MaskLine, Reveal } from '@/components/Reveal'
import { Parallax } from '@/components/about/Motion'
import PeopleGrid from '@/components/people/PeopleGrid'

export const metadata: Metadata = {
  title: 'About',
  description: 'About Terms & Conditions: The Fine Print — a podcast and publication hosted by Chastity Murphy exploring the hidden systems behind money, technology, wealth, and public life.',
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

const GHOST_WORDS = ['TERMS', 'SYSTEMS', 'POWER', 'PUBLIC LIFE']

const QUESTIONS = [
  'What should count as public infrastructure in a digital economy?',
  'Who should control the systems through which money moves?',
  'Can technology expand access without expanding surveillance?',
  'What happens when private infrastructure begins governing public life?',
  'How do we build systems around public values instead of adding protections after the fact?',
]

const BLOCKS = [
  {
    label: 'Conversation',
    copy: 'Long-form interviews with policymakers, researchers, organizers, technologists, artists, and practitioners.',
    image: '/about-infra-2.jpg',
  },
  {
    label: 'Explanation',
    copy: 'Clear, accessible breakdowns of complicated systems without flattening their complexity.',
    image: null as string | null,
  },
  {
    label: 'Research',
    copy: 'Ideas emerging from law, economics, technology, public infrastructure, and political economy.',
    image: '/about-infra-3.jpg',
  },
  {
    label: 'Public life',
    copy: 'Connecting technical debates to the consequences people experience in everyday life.',
    image: null as string | null,
  },
]

const VALUES = [
  { term: 'Public value', copy: 'Start with what systems should enable people and communities to do.' },
  { term: 'Accessibility', copy: 'Explain complexity without requiring people to become specialists.' },
  { term: 'Independence', copy: 'Ask difficult questions across government, finance, technology, and political institutions.' },
  { term: 'Curiosity', copy: 'Treat disagreement and uncertainty as reasons to investigate more deeply.' },
  { term: 'Accountability', copy: 'Examine not only what institutions intend, but what their systems actually produce.' },
]

function Times({ items }: { items: string[] }) {
  return (
    <>
      {items.map((word, i) => (
        <span key={word} className="whitespace-nowrap">
          {i > 0 && <span className="text-copper mx-2 sm:mx-3">×</span>}
          {word}
        </span>
      ))}
    </>
  )
}

export default async function AboutPage() {
  const s = await getSiteSettings()

  // Condense the CMS long bio to 2–3 paragraphs: merge the middle paragraphs
  // when the entry carries more than three (host section sits lower on the
  // page and should read as "who is guiding the conversation", not a CV).
  const paras = (s.aboutHostLong || '').split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
  const bioParas =
    paras.length > 3
      ? [paras[0], paras.slice(1, -1).join(' '), paras[paras.length - 1]]
      : paras

  return (
    <>
      {/* ── 1. Hero — layered editorial opening ─────────────────────────────── */}
      <header className="relative bg-espresso overflow-hidden">
        {/* Ghost background typography — moves slower than the foreground */}
        <Parallax speed={0.22} className="absolute inset-0 flex items-center pointer-events-none" >
          <div aria-hidden="true" className="font-serif font-bold text-cream/[0.05] leading-[0.95] select-none break-words text-[22vw] px-4">
            {GHOST_WORDS.map((w) => (
              <div key={w}>{w}</div>
            ))}
          </div>
        </Parallax>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-36 pb-24 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-copper/60" />
              <span className="text-xs font-sans uppercase tracking-[0.2em] text-copper/80">The Platform</span>
            </div>
            <h1 className="font-serif text-5xl lg:text-7xl font-bold text-cream leading-[1.02] mb-8">
              <MaskLine>The rules underneath</MaskLine>
              <MaskLine delay={0.1}>
                <em className="hl gold">everyday life.</em>
              </MaskLine>
            </h1>
            <Reveal delay={0.15}>
              <p className="font-serif italic text-lg lg:text-xl text-beige/80 max-w-xl leading-relaxed">
                Terms &amp; Conditions examines the systems, technologies, institutions, and agreements that
                shape how we live — and asks who designed them, who benefits, and what could be built differently.
              </p>
            </Reveal>
          </div>

          {/* Overlapping editorial image card — shifts subtly against the card */}
          <div className="lg:col-span-5 relative">
            <Parallax speed={0.08}>
              <div className="relative rounded-2xl overflow-hidden border border-copper/30 shadow-2xl rotate-1">
                <Image
                  src="/about-infra-1.jpg"
                  alt="Institutional buildings at dusk with drifting documents and golden network lines"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 to-transparent" />
                <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-cream/80">
                  EXHIBIT A — EVERYDAY ECONOMIC LIFE
                </div>
              </div>
            </Parallax>
          </div>
        </div>
      </header>

      <StepperEdge lowerBg="#FAF7F0" upperFill="#2B3A52" />

      {/* ── 2. Platform statement — the manifesto ───────────────────────────── */}
      <section className="py-20 lg:py-32 bg-cream">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="font-serif text-5xl lg:text-7xl font-bold text-espresso leading-[1.02] mb-10">
            <MaskLine>Every system</MaskLine>
            <MaskLine delay={0.1}>
              <em className="hl">has terms.</em>
            </MaskLine>
          </h2>
          <Reveal>
            <p className="text-espresso/80 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
              Every day we move through systems we rarely get to negotiate — money, payments, housing,
              technology, data, work, public services, and the rules governing them.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-espresso font-medium text-lg mt-6">Terms &amp; Conditions makes those systems visible.</p>
          </Reveal>

          <div className="mt-14 max-w-3xl mx-auto text-left">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-terracotta mb-6">It asks:</p>
            </Reveal>
            {['Who built them?', 'Who do they work for?', 'Who gets excluded?', 'And what could we build differently?'].map((q, i) => (
              <Reveal key={q} delay={i * 0.08}>
                <p className="font-serif text-2xl lg:text-4xl font-bold text-espresso leading-snug border-t border-espresso/10 py-4">
                  {q}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. What the platform does — alternating editorial blocks ────────── */}
      <section className="pb-20 lg:pb-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-16 lg:space-y-24">
          {BLOCKS.map((b, i) => (
            <div key={b.label} className={`grid lg:grid-cols-12 gap-10 items-center`}>
              <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[11px] tracking-[0.12em] text-terracotta">0{i + 1}</span>
                  <div className="h-px w-8 bg-terracotta" />
                </div>
                <h3 className="font-serif text-3xl lg:text-4xl font-bold text-espresso uppercase tracking-wide mb-4">
                  <MaskLine>{b.label}</MaskLine>
                </h3>
                <Reveal>
                  <p className="text-espresso/75 text-lg leading-relaxed max-w-md">{b.copy}</p>
                </Reveal>
              </div>
              <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                {b.image ? (
                  <Parallax speed={0.06}>
                    <div className="rounded-2xl overflow-hidden shadow-lg border border-beige">
                      <Image src={b.image} alt={b.label} width={1200} height={800} className="w-full h-auto" />
                    </div>
                  </Parallax>
                ) : (
                  <Reveal>
                    <div className="rounded-2xl bg-espresso p-10 lg:p-14 text-center relative overflow-hidden">
                      <div aria-hidden="true" className="absolute inset-0 font-serif font-bold text-cream/[0.04] text-[9rem] leading-none select-none flex items-center justify-center">
                        0{i + 1}
                      </div>
                      <p className="relative font-mono text-[11px] uppercase tracking-[0.25em] text-copper/80">
                        Terms &amp; Conditions — The Fine Print
                      </p>
                    </div>
                  </Reveal>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <StepperEdge lowerBg="#2B3A52" upperFill="#FAF7F0" />

      {/* ── 4. The questions we keep asking ─────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-espresso relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[11px] tracking-[0.12em] text-copper">// Q</span>
            <div className="h-px w-8 bg-copper/60" />
            <span className="font-mono text-[11px] tracking-[0.12em] text-copper">THE QUESTIONS WE KEEP ASKING</span>
          </div>
          <div className="border-b border-white/10">
            {QUESTIONS.map((q, i) => (
              <Parallax key={q} speed={0.03 + i * 0.008}>
                <div className="flex items-baseline gap-6 lg:gap-10 py-8 lg:py-10 border-t border-white/10">
                  <span className="font-mono text-copper text-lg shrink-0">0{i + 1}</span>
                  <p className="font-serif text-2xl lg:text-4xl font-bold text-cream leading-snug">
                    <Reveal>{q}</Reveal>
                  </p>
                </div>
              </Parallax>
            ))}
          </div>
        </div>
      </section>

      <StepperEdge lowerBg="#FAF7F0" upperFill="#2B3A52" />

      {/* ── 5. Manchester / MLATI — institutional partnership ────────────────── */}
      <section id="mlati" className="mlati-section py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-start">
          {/* Left: logo + layered institutional image */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-terracotta" />
              <span className="text-xs font-sans uppercase tracking-[0.2em] text-terracotta">Presented by</span>
            </div>
            <Parallax speed={0.07}>
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-40 h-40 rounded-2xl bg-espresso/90 -z-0" aria-hidden="true" />
                <div className="relative bg-white/90 rounded-xl p-4 inline-block border border-beige/60 shadow-sm">
                  <Image src="/mlti-logo.png" alt="Manchester Law & Technology Initiative" width={128} height={128} />
                </div>
              </div>
            </Parallax>
            <Parallax speed={0.04}>
              <div className="mt-6 rounded-2xl overflow-hidden border border-beige shadow-md">
                <Image src="/about-infra-1.jpg" alt="" width={900} height={600} className="w-full h-auto" />
              </div>
            </Parallax>
          </div>

          {/* Right: the partnership story */}
          <div className="lg:col-span-8">
            <h2 className="font-serif text-3xl lg:text-5xl font-bold text-espresso uppercase tracking-wide leading-tight mb-6">
              <MaskLine>
                Where <span className="text-copper">×</span> Law <span className="text-copper">×</span> Technology{' '}
                <span className="text-copper">×</span> Public Life Meet
              </MaskLine>
            </h2>
            <p className="font-serif italic text-xl text-espresso/90 mb-6">University of Manchester Law &amp; Technology Initiative</p>
            <div className="text-espresso/80 leading-relaxed space-y-4 max-w-2xl">
              <Reveal>
                <p>
                  <em>Where law, technology, and public infrastructure meet.</em> The Manchester Law &amp; Technology
                  Initiative explores how technological change is reshaping the laws, institutions, and infrastructure
                  that organize everyday life.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p>
                  Terms &amp; Conditions translates questions being explored across research, government, technology,
                  and public institutions into a broader public conversation.
                </p>
              </Reveal>
            </div>
            <p className="font-sans text-sm font-medium text-espresso/70 my-6 tracking-wide">
              Research <span className="text-terracotta mx-1">→</span> Conversation{' '}
              <span className="text-terracotta mx-1">→</span> Public Understanding
            </p>
            <a
              href="https://www.law-tech.manchester.ac.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-terracotta hover:underline"
            >
              Explore the Manchester Law &amp; Technology Initiative ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── 6. How we approach the work — editorial commitments ─────────────── */}
      <section className="py-20 lg:py-28 bg-sand">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-terracotta" />
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-terracotta">Fundamentals</span>
          </div>
          <h2 className="font-serif text-3xl lg:text-5xl font-bold text-espresso mb-12">
            <MaskLine>How we approach the work</MaskLine>
          </h2>
          <div className="border-b border-espresso/10">
            {VALUES.map((v, i) => (
              <Reveal key={v.term} delay={i * 0.05}>
                <div className="grid grid-cols-12 gap-4 lg:gap-8 py-6 border-t border-espresso/10 items-baseline">
                  <span className="col-span-2 lg:col-span-1 font-mono text-xs text-copper">0{i + 1}</span>
                  <h3 className="col-span-10 lg:col-span-4 font-sans text-sm font-bold uppercase tracking-[0.2em] text-espresso">
                    {v.term}
                  </h3>
                  <p className="col-span-12 lg:col-span-7 text-espresso/75 leading-relaxed">{v.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. The host — lower on the page, layered treatment ──────────────── */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-px w-8 bg-terracotta" />
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-terracotta">
              Hosted by Chastity Murphy
            </span>
          </div>
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Layered portrait card */}
            <div className="lg:col-span-5">
              <Parallax speed={0.07}>
                <div className="relative max-w-sm mx-auto lg:mx-0">
                  <div aria-hidden="true" className="absolute -top-5 -left-5 w-full h-full rounded-2xl bg-espresso" />
                  <div className="relative rounded-2xl overflow-hidden border-4 border-cream shadow-xl">
                    <Image
                      src="/chastity-murphy.jpg"
                      alt={s.hostName}
                      width={800}
                      height={1000}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div aria-hidden="true" className="absolute -bottom-3 -right-3 w-24 h-px bg-copper" />
                  <div aria-hidden="true" className="absolute -bottom-3 -right-3 w-px h-24 bg-copper" />
                </div>
              </Parallax>
            </div>

            {/* Who is guiding the conversation */}
            <div className="lg:col-span-7">
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-espresso mb-3">{s.hostName}</h2>
              <p className="font-serif italic text-lg text-cinnamon mb-8">
                Policy strategist, researcher &amp; former U.S. Treasury advisor
              </p>
              <div className="text-espresso/80 leading-relaxed space-y-4 max-w-xl">
                {bioParas.map((p, i) => (
                  <Reveal key={i} delay={i * 0.06}>
                    <p className="whitespace-pre-line">{p}</p>
                  </Reveal>
                ))}
              </div>
              <p className="font-sans text-xs uppercase tracking-[0.25em] text-espresso/60 mt-10">
                Money <span className="text-copper">×</span> Technology <span className="text-copper">×</span> Public Infrastructure <span className="text-copper">×</span> Economic Power
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Future contributor architecture: renders nothing until a CMS-backed
          people source exists. See components/people/PeopleGrid.tsx. */}
      <PeopleGrid people={[]} />

      {/* ── Subscribe ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-sand text-center">
        <div className="max-w-2xl mx-auto px-6 lg:px-10">
          <div className="h-px w-8 bg-terracotta mx-auto mb-6" />
          <p className="font-serif text-2xl text-espresso mb-4">
            Subscribe to be there when the first episode drops.
          </p>
          <a
            href={s.substackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base px-8 py-4"
          >
            Subscribe on Substack
          </a>
        </div>
      </section>
    </>
  )
}
