'use client'

import { useEffect, useRef } from 'react'

// The Viru-style pinned zoom moment: the video scales from 1.0× to 1.25× as you
// scroll through the section, the dark veil lifts, and the through-line holds the frame.

export default function ZoomSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const veilRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const section = sectionRef.current
        if (!section) {
          ticking = false
          return
        }
        const rect = section.getBoundingClientRect()
        const total = rect.height - window.innerHeight
        const progress = Math.min(1, Math.max(0, -rect.top / (total || 1)))
        if (videoRef.current) {
          videoRef.current.style.transform = `scale(${1 + progress * 0.25})`
        }
        if (veilRef.current) {
          veilRef.current.style.opacity = String(0.35 - progress * 0.3)
        }
        if (textRef.current) {
          textRef.current.style.opacity = String(1 - Math.max(0, progress - 0.75) * 4)
          textRef.current.style.transform = `translateY(${progress * -40}px)`
        }
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section ref={sectionRef} className="relative h-[150vh] bg-warm-dark" aria-label="Financial infrastructure is everywhere">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <video
            ref={videoRef}
            src="/hero-bg.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover opacity-85 will-change-transform"
            aria-hidden="true"
          />
          <div ref={veilRef} className="absolute inset-0 bg-[rgba(13,29,53,0.35)]" />
        </div>
        <div ref={textRef} className="relative z-10 text-center px-[30px] will-change-transform">
          <div className="font-mono text-[11px] tracking-[0.2em] text-copper mb-[22px]">// 03 — THE THROUGH-LINE</div>
          <h3 className="font-serif text-cream text-[clamp(34px,5.4vw,68px)] leading-[1.1] font-bold">
            Financial infrastructure
            <br />
            is <em className="text-copper italic">everywhere.</em>
          </h3>
        </div>
        <div className="absolute bottom-7 left-6 lg:left-10 z-[4] font-mono text-[10px] text-beige/40 tracking-[0.08em]">
          {'// CAPITOL GROUNDS — WASHINGTON, D.C. — DUSK'}
        </div>
      </div>
    </section>
  )
}
