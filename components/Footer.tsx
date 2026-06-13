import Link from 'next/link'
import { SUBSTACK_URL, HOST_NAME, PODCAST_TITLE } from '@/lib/data'

const footerNav = {
  Content: [
    { href: '/episodes',    label: 'Episodes' },
    { href: '/reflections', label: 'Reflections' },
    { href: '/resources',   label: 'Resource Library' },
    { href: '/guests',      label: 'Guests' },
  ],
  Topics: [
    { href: '/topics/banking',                label: 'Banking' },
    { href: '/topics/payments',               label: 'Payments' },
    { href: '/topics/financial-infrastructure', label: 'Financial Infrastructure' },
    { href: '/topics/public-banking',         label: 'Public Banking' },
  ],
  Platform: [
    { href: '/about',                         label: 'About' },
    { href: SUBSTACK_URL,                     label: 'Newsletter', external: true },
    { href: '/api/rss',                       label: 'RSS Feed' },
    { href: 'https://open.spotify.com',       label: 'Spotify', external: true },
    { href: 'https://podcasts.apple.com',     label: 'Apple Podcasts', external: true },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-espresso text-beige-light">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <div className="font-serif text-xl font-bold text-cream">Terms &amp; Conditions</div>
              <div className="font-sans text-xs uppercase tracking-[0.2em] text-copper mt-0.5">The Fine Print</div>
            </div>
            <p className="text-sm text-beige/70 leading-relaxed max-w-xs">
              A podcast and publication exploring the hidden rules of economic life.
              Presented by the University of Manchester. Hosted by {HOST_NAME}.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm border border-copper/40 text-beige px-4 py-2 rounded-full hover:bg-copper/10 transition-colors"
              >
                Subscribe
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(footerNav).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-xs font-sans font-semibold uppercase tracking-widest text-copper mb-4">
                {section}
              </h3>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.href}>
                    {'external' in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-beige/60 hover:text-beige transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-beige/60 hover:text-beige transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-beige/40">
          <span>© {year} {PODCAST_TITLE}. All rights reserved.</span>
          <span>Presented by the University of Manchester</span>
        </div>
      </div>
    </footer>
  )
}
