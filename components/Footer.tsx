import Link from 'next/link'
import { SUBSTACK_URL, HOST_NAME, PODCAST_TITLE, SITE_URL } from '@/lib/data'

const footerNav = {
  Content: [
    { href: '/episodes',    label: 'Episodes' },
    { href: '/reflections', label: 'Reflections' },
    { href: '/guests',      label: 'Guests' },
    { href: '/about',       label: 'About' },
  ],
  Follow: [
    { href: SUBSTACK_URL, label: 'Newsletter', external: true },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-espresso text-beige-light">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-18">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <div className="font-serif text-xl font-bold text-cream">Terms &amp; Conditions</div>
              <div className="font-sans text-xs uppercase tracking-[0.2em] text-copper mt-0.5">The Fine Print</div>
            </div>
            <p className="text-sm text-beige/65 leading-relaxed max-w-sm">
              A podcast and publication exploring the hidden rules of economic life.
              Presented by the University of Manchester. Hosted by {HOST_NAME}.
            </p>
            <div className="mt-5">
              <a
                href={SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm border border-copper/40 text-beige px-4 py-2 rounded-full hover:bg-copper/10 transition-colors"
              >
                Subscribe on Substack
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
                        className="text-sm text-beige/55 hover:text-beige transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-beige/55 hover:text-beige transition-colors"
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
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-beige/35">
          <span>© {year} {PODCAST_TITLE}</span>
          <span>Presented by the University of Manchester</span>
        </div>
      </div>
    </footer>
  )
}
