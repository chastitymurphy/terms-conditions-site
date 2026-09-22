'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

// Scroll-triggered reveals for the dossier design language:
// MaskLine = headline lines slide up from behind an invisible mask (virugroup-style).
// Reveal = cards/paragraphs fade-slide in. Both fire once when entering the viewport.

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLSpanElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true)
            io.disconnect()
          }
        })
      },
      { threshold }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return { ref, inView }
}

export function MaskLine({
  children,
  delay = 0,
  light = false,
  className = '',
}: {
  children: ReactNode
  delay?: number
  light?: boolean
  className?: string
}) {
  const { ref, inView } = useInView(0.3)
  return (
    <span ref={ref} className={`mask-line ${inView ? 'in' : ''} ${light ? 'light' : ''} ${className}`}>
      <span className="block" style={{ transitionDelay: `${delay}s` }}>
        {children}
      </span>
    </span>
  )
}

export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const { ref, inView } = useInView(0.12)
  return (
    <div ref={ref} className={`reveal ${inView ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  )
}
