'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SUBSTACK_URL } from '@/lib/data'

const navLinks = [
  { href: '/episodes',    label: 'Episodes' },
  { href: '/reflections', label: 'Reflections' },
  { href: '/guests',      label: 'Guests' },
  { href: '/resources',   label: 'Resources' },
  { href: '/about',       label: 'About' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <Link href="/" className="group flex flex-col leading-none">
          <span className={`font-serif text-base lg:text-lg font-bold tracking-tight transition-colors duration-300 ${scrolled ? 'text-espresso' : 'text-cream'}`}>
            Terms &amp; Conditions
          </span>
          <span className={`font-sans text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 group-hover:text-terracotta ${scrolled ? 'text-warm-gray' : 'text-beige/60'}`}>
            The Fine Print
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors tracking-wide hover:text-terracotta ${scrolled ? 'text-espresso/70' : 'text-beige/80'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Subscribe CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={SUBSTACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm"
          >
            Subscribe
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`lg:hidden p-2 transition-colors ${scrolled ? 'text-espresso' : 'text-cream'}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span className={`block h-px bg-current transition-all duration-200 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-px bg-current transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-px bg-current transition-all duration-200 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-cream border-t border-beige px-6 py-6 flex flex-col gap-4">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-espresso py-1"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={SUBSTACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm mt-2 self-start"
          >
            Subscribe
          </a>
        </div>
      )}
    </header>
  )
}
