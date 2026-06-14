import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { getSiteSettings } from '@/lib/contentful'
import { PODCAST_TITLE, PODCAST_DESCRIPTION, SITE_URL } from '@/lib/data'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: PODCAST_TITLE,
    template: `%s | ${PODCAST_TITLE}`,
  },
  description: PODCAST_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: { siteName: PODCAST_TITLE, type: 'website', locale: 'en_US' },
  twitter: { card: 'summary_large_image' },
  alternates: { types: { 'application/rss+xml': '/api/rss' } },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const s = await getSiteSettings()

  // Inject Contentful color + font tokens as CSS custom properties on <html>
  // Change any of these in Contentful → Site Settings → Publish → live in ~60s
  const designTokens = {
    '--cream':        s.colorBackground,
    '--cream-dark':   s.colorSand,
    '--espresso':     s.colorText,
    '--warm-dark':    s.colorHeroBg,
    '--terracotta':   s.colorAccent,
    '--copper':       s.colorGold,
  } as React.CSSProperties

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
      style={designTokens}
    >
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
