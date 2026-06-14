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

  // CSS variable overrides from Contentful — change in Contentful, live in ~60s
  const cssVars = [
    `:root {`,
    `  --cream:       ${s.colorBackground};`,
    `  --cream-dark:  ${s.colorSand};`,
    `  --espresso:    ${s.colorText};`,
    `  --warm-dark:   ${s.colorHeroBg};`,
    `  --terracotta:  ${s.colorAccent};`,
    `  --copper:      ${s.colorGold};`,
    `  --font-size-hero:    ${s.fontSizeHero};`,
    `  --font-size-body:    ${s.fontSizeBody};`,
    `  --font-size-section: ${s.fontSizeSection};`,
    `}`,
    `body { font-size: ${s.fontSizeBody}; }`,
  ].join('\n')

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        {/* Contentful-managed design tokens injected here */}
        <style dangerouslySetInnerHTML={{ __html: cssVars }} />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
