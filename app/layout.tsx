import React from 'react'
import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { getSiteSettings } from '@/lib/contentful'
import { PODCAST_TITLE, PODCAST_DESCRIPTION, SITE_URL, HOST_NAME } from '@/lib/data'

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
    default: `${PODCAST_TITLE} | Podcast`,
    template: `%s | ${PODCAST_TITLE}`,
  },
  description: PODCAST_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  applicationName: PODCAST_TITLE,
  keywords: [
    'podcast',
    'financial infrastructure',
    'public banking',
    'fintech policy',
    'payments',
    'wealth inequality',
    'economic democracy',
    'Chastity Murphy',
    'University of Manchester',
  ],
  authors: [{ name: HOST_NAME }],
  creator: HOST_NAME,
  publisher: PODCAST_TITLE,
  alternates: { types: { 'application/rss+xml': '/api/rss' } },
  openGraph: {
    siteName: PODCAST_TITLE,
    title: `${PODCAST_TITLE} | Podcast`,
    description: PODCAST_DESCRIPTION,
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PODCAST_TITLE} | Podcast`,
    description: PODCAST_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const s = await getSiteSettings()

  // CSS custom properties from Contentful — change in Contentful → Site Settings → Publish
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tokens: any = {
    '--cream':      s.colorBackground,
    '--cream-dark': s.colorSand,
    '--espresso':   s.colorText,
    '--warm-dark':  s.colorHeroBg,
    '--terracotta': s.colorAccent,
    '--copper':     s.colorGold,
  }

  // PodcastSeries JSON-LD structured data — using ONLY verified facts.
  // No fake episodes, no fake dates, no fake guests.
  const podcastJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'PodcastSeries',
    name: PODCAST_TITLE,
    description: PODCAST_DESCRIPTION,
    url: SITE_URL,
    inLanguage: 'en-US',
    author: {
      '@type': 'Person',
      name: s.hostName,
      jobTitle: s.hostTitle,
      affiliation: s.hostAffiliation ? {
        '@type': 'Organization',
        name: s.hostAffiliation,
      } : undefined,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Terms & Conditions: The Fine Print',
    },
    // No episodes array yet — pre-launch.
  }

  // Organization JSON-LD
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: PODCAST_TITLE,
    url: SITE_URL,
    description: PODCAST_DESCRIPTION,
  }

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} style={tokens}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(podcastJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
