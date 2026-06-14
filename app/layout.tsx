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
  openGraph: {
    siteName: PODCAST_TITLE,
    type: 'website',
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image' },
  alternates: { types: { 'application/rss+xml': '/api/rss' } },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Fetch colors + font sizes from Contentful — updates live without redeployment
  const s = await getSiteSettings()

  // Build CSS variable overrides from Contentful values
  const cssVars = `
    :root {
      --cream:       ${s.colorBackground};
      --cream-dark:  ${s.colorSand};
      --espresso:    ${s.colorText};
      --warm-dark:   ${s.colorHeroBg};
      --terracotta:  ${s.colorAccent};
      --copper:      ${s.colorGold};
      --font-size-hero:    ${s.fontSizeHero};
      --font-size-body:    ${s.fontSizeBody};
      --font-size-section: ${s.fontSizeSection};
    }
    h1.hero-title { font-size: ${s.fontSizeHero} !important; }
    body { font-size: ${s.fontSizeBody}; }
    h2.section-heading { font-size: ${s.fontSizeSection}; }
  `.trim()

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        {/* Contentful-managed design tokens — edit in Contentful → Site Settings */}
        <style dangerouslySetInnerHTML={{ __html: cssVars }} />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
