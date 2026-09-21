'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, type CSSProperties } from 'react'

// Sign & Reveal — the Fine Print as an interaction.
// Layer 1: Capitol video (untouched) → Layer 2: gradient/vignette →
// Layer 3: dimensional contract → Layer 4: Under the Surface panel + typography.

const SIG_PATH =
  'M12 46 C 30 8, 42 62, 64 32 C 78 12, 86 52, 110 38 C 130 26, 122 56, 150 42 C 168 32, 180 46, 204 38 C 218 33, 228 40, 234 36'

const CARDS = [
  { label: 'MONEY', q: 'Who actually owns what\u2019s in your bank account?' },
  { label: 'TECHNOLOGY', q: 'Who decides what gets built \u2014 and why?' },
  { label: 'POWER', q: 'Who benefits from the systems we inherit?' },
  { label: 'INFRASTRUCTURE', q: 'What should belong to the public?' },
]

type Phase = 'contract' | 'signing' | 'revealed'

export default function HeroInteractive({
  tagline,
  question,
  description,
  substackUrl,
}: {
  tagline: string
  question: string
  description: string
  substackUrl: string
}) {
  const [phase, setPhase] = useState<'contract' | 'signing' | 'revealed'>('contract')
  const [showPanel, setShowPanel] = useState(false)
  const [contractGone, setContractGone] = useState(false)
  const [signCount, setSignCount] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)
  const timers = useRef<number[]>([])

  const signing = phase === 'signing'
  const revealed = phase === 'revealed'
  const signed = phase !== 'contract'

  function clearTimers() {
    // timers are short-lived UI transitions; safe to recreate per click
  }

  function handleSign() {
    if (phase === 'signing') return
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    setContractGone(false)
    setShowPanel(false)
    setSignCount((c) => c + 1)
    setPhase('signing')

    if (reduced) {
      // Reduced motion: simple swap, no signature/peel animation.
      setPhase('revealed')
      setShowPanel(true)
      setContractGone(true)
      return
    }
    window.setTimeout(() => {
      setPhase('revealed')
      setShowPanel(true)
      window.setTimeout(() => setContractGone(true), 950)
    }, 1300)
  }

  function handleReset() {
    setPhase('contract')
    setShowPanel(false)
    setContractGone(false)
  }

  // Focus the revealed panel heading for keyboard users
  useEffect(() => {
    if (phase === 'revealed' && panelRef.current) panelRef.current.focus()
  }, [showPanel])

  const taglineWords = tagline.split(' ').filter(Boolean)

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-warm-dark">
      {/* ── Layer 1: cinematic video background (unchanged) ── */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-warm-dark/95 via-warm-dark/65 to-warm-dark/25" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-warm-dark/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-warm-dark/80 to-transparent" />

      <div className="hero-grid">
        {/* ── Intro (grid area: intro) ── */}
        <div className="hero-area-intro">
          <div
            className="flex items-center gap-4 mb-9"
            style={{ animation: 'fadeUp 0.7s ease 0.05s both' }}
          >
            <div className="bg-cream rounded-xl p-2 shadow-lg shrink-0">
              <Image
                src="/mlti-logo.png"
                alt="Manchester Law & Technology Initiative"
                width={52}
                height={52}
                style={{ width: 52, height: 52 }}
              />
            </div>
            <div className="leading-tight">
              <p className="text-base font-sans font-semibold text-cream tracking-wide">
                University of Manchester
              </p>
              <p className="text-xs font-sans uppercase tracking-[0.18em] text-copper/90 mt-0.5">
                Manchester Law &amp; Technology Initiative
              </p>
            </div>
          </div>

          <h1
            className="font-serif text-5xl lg:text-6xl xl:text-7xl font-bold text-cream leading-[0.95] tracking-tight mb-3"
            style={{ animation: 'popIn 0.75s cubic-bezier(0.34, 1.56, 0.64, 1) 0.35s both' }}
          >
            Terms &amp;<br />Conditions
          </h1>
          <div
            className="font-serif text-3xl lg:text-4xl xl:text-5xl font-normal text-copper italic mb-6"
            style={{ animation: 'fadeUp 0.6s ease 1.0s both' }}
          >
            The Fine Print
          </div>
          <div
            className="text-xs font-sans uppercase tracking-[0.22em] text-cream/70 mb-8 leading-loose"
            aria-label={tagline}
          >
            {taglineWords.map((word, i) => (
              <span key={i} className="inline-block" style={{ animation: `focusIn 0.6s ease ${1.35 + i * 0.14}s both` }}>
                {word}{'\u00A0'}
              </span>
            ))}
          </div>
          <p
            className="font-serif text-xl lg:text-2xl italic text-cream/90 leading-relaxed mb-4 max-w-lg"
            style={{ animation: 'fadeUp 0.6s ease 2.4s both' }}
          >
            {question}
          </p>
          <p
            className="font-sans text-lg text-cream leading-relaxed max-w-lg"
            style={{ animation: 'fadeUp 0.6s ease 2.7s both' }}
          >
            {description}
          </p>
        </div>

        {/* ── Signature module (grid area: sign) ── */}
        <div className="hero-area-sign" style={{ animation: 'fadeUp 0.7s ease 2.85s both' }}>
          <p className="sign-copy">
            By continuing, you acknowledge that you have read and understood the systems
            shaping your everyday life.
          </p>
          <div className="sign-line-wrap">
            <div className="sign-here">SIGN HERE</div>
            <div className="sign-x">x</div>
            <div className="sign-rule" />
            {signed && (
              <svg
                key={signCount}
                className="sig-svg"
                viewBox="0 0 240 58"
                aria-hidden="true"
              >
                <path
                  d={SIG_PATH}
                  fill="none"
                  stroke="#FAF7F0"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  pathLength={1}
                  style={{
                    strokeDasharray: 1,
                    strokeDashoffset: signing ? 1 : 0,
                    animation: signing ? 'sigDraw 1.2s ease-in-out forwards' : undefined,
                    transition: 'stroke-dashoffset .3s ease',
                  }}
                />
              </svg>
            )}
            {signing && (
              <div
                className="sig-nib"
                style={
                  {
                    offsetPath: `path("${SIG_PATH}")`,
                    animation: 'nibTravel 1.3s linear forwards',
                  } as CSSProperties
                }
              />
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {revealed ? (
              <>
                <button onClick={handleSign} className="btn-primary text-base px-7 py-3.5">
                  Reveal Again
                </button>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center px-6 py-3 rounded-full border border-cream/25 text-cream/70 font-medium text-sm hover:bg-cream/10 transition-colors"
                >
                  Reset
                </button>
              </>
            ) : (
              <button
                onClick={handleSign}
                disabled={signing}
                className="btn-primary text-base px-7 py-3.5 disabled:opacity-70"
              >
                {signing ? 'Signing…' : 'Sign & Reveal the Fine Print'}
              </button>
            )}
          </div>
          <p className="sign-note">
            {revealed
              ? 'You acknowledged the fine print. Now you know where to look.'
              : 'No account needed. This is what the show does — it shows you the fine print.'}
          </p>
        </div>

        {/* ── Right column: dimensional contract → Under the Surface ── */}
        <div className="hero-area-cover relative min-h-[440px] flex items-center">
          {(revealed || showPanel) && (
            <div
              ref={(el) => {
                if (el && revealed) el.focus({ preventScroll: true })
              }}
              tabIndex={-1}
              className="reveal-panel w-full outline-none"
              role="region"
              aria-label="Under the surface"
            >
              <div className="rp-eyebrow">// UNDER THE SURFACE</div>
              <h3 className="rp-title">The rules are already shaping your life.</h3>
              <p className="rp-intro">
                Behind the everyday things we do are systems of ownership, incentives and power
                that most people never get to see.
              </p>
              <div className="rp-grid">
                {CARDS.map((c, i) => (
                  <div
                    key={c.label}
                    className="rp-card"
                    style={{ animation: `cardIn .5s ease ${0.15 + i * 0.13}s both` }}
                  >
                    <div className="rp-label">{c.label}</div>
                    <div className="rp-q">{c.q}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!contractGone && (
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
              <div className={`contract-stack w-full max-w-md ${signing || revealed ? 'leaving' : ''}`}>
                <div className="paper-back paper-back-2" />
                <div className="paper-back paper-back-1" />
                <div className="paper-front">
                  <div className="paper-inner">
                    <div className="doc-eyebrow">Agreement / Public Life</div>
                    <div className="doc-heading">You accepted the terms.</div>
                    <div className="doc-heading" style={{ marginBottom: 0 }}>
                      Did anyone explain them?
                    </div>
                    <div className="fine-lines" />
                    <div className="doc-seal">
                      THE
                      <br />
                      FINE
                      <br />
                      PRINT
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── CTAs (own grid area so mobile order lands after the reveal) ── */}
        <div className="hero-area-ctas flex flex-wrap items-center gap-4">
          <a
            href={substackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base px-8 py-4"
          >
            Get the first episode
          </a>
          <Link
            href="/guests"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-cream/30 text-cream font-medium text-base hover:bg-cream/10 transition-colors"
          >
            Meet the guests
          </Link>
          <Link
            href="#topics"
            className="inline-flex items-center gap-2 text-base font-medium text-copper hover:text-cream transition-colors"
          >
            Explore Topics
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-cream/20 hidden lg:flex">
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-copper/40 to-transparent animate-pulse" />
      </div>

      {/* Bottom fade to cream */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-cream to-transparent" />
    </section>
  )
}
