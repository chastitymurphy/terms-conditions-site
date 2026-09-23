'use client'

import { ReactNode, useEffect, useRef } from 'react'

// Subtle scroll parallax: translates the wrapped content against scroll
// direction by `speed` (0.05 = barely perceptible, 0.3 = clearly layered).
// Respects prefers-reduced-motion (renders static).
export function Parallax({ speed = 0.15, className = '', children }: { speed?: number; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const update = () => {
      const rect = el.getBoundingClientRect()
      const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight
      el.style.transform = `translate3d(0, ${(-progress * speed * 100).toFixed(2)}px, 0)`
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [speed])

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  )
}
