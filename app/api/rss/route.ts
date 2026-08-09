import { NextResponse } from 'next/server'
import { getEpisodes } from '@/lib/contentful'
import { PODCAST_TITLE, PODCAST_DESCRIPTION, HOST_NAME, SITE_URL } from '@/lib/data'

export async function GET() {
  // Pre-launch: no published episodes. Return a valid but empty feed so subscribers
  // know the show exists and can subscribe without seeing fake episode entries.
  const emptyChannel = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(PODCAST_TITLE)}</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/api/rss" rel="self" type="application/rss+xml" />
    <description>${escapeXml(PODCAST_DESCRIPTION)}</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <itunes:author>${escapeXml(HOST_NAME)}</itunes:author>
    <itunes:summary>${escapeXml(PODCAST_DESCRIPTION)}</itunes:summary>
    <itunes:explicit>false</itunes:explicit>
    <itunes:image href="${SITE_URL}/podcast-cover.jpg" />
  </channel>
</rss>`

  // Also try to include any real published episodes that have been added since pre-launch
  const episodes = await getEpisodes()
  if (episodes.length === 0) {
    return new NextResponse(emptyChannel, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  }

  // If real episodes exist, build full feed (this branch activates on launch)
  const items = episodes.map(ep => `
    <item>
      <title>${escapeXml(ep.title)}</title>
      <link>${SITE_URL}/episodes/${ep.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/episodes/${ep.slug}</guid>
      <description>${escapeXml(ep.description)}</description>
      <pubDate>${new Date(ep.publishedAt).toUTCString()}</pubDate>
      <itunes:title>${escapeXml(ep.title)}</itunes:title>
      <itunes:summary>${escapeXml(ep.description)}</itunes:summary>
      <itunes:duration>${ep.duration}</itunes:duration>
    </item>`).join('')

  const fullChannel = emptyChannel.replace('</channel>', `${items}\n  </channel>`)

  return new NextResponse(fullChannel, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
