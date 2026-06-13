import { NextResponse } from 'next/server'
import { episodes, PODCAST_TITLE, PODCAST_DESCRIPTION, HOST_NAME, PODCAST_EMAIL, SITE_URL } from '@/lib/data'

export async function GET() {
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${PODCAST_TITLE}</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/api/rss" rel="self" type="application/rss+xml" />
    <description>${PODCAST_DESCRIPTION}</description>
    <language>en-US</language>
    <managingEditor>${PODCAST_EMAIL} (${HOST_NAME})</managingEditor>
    <webMaster>${PODCAST_EMAIL}</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <itunes:author>${HOST_NAME}</itunes:author>
    <itunes:summary>${PODCAST_DESCRIPTION}</itunes:summary>
    <itunes:owner>
      <itunes:name>${HOST_NAME}</itunes:name>
      <itunes:email>${PODCAST_EMAIL}</itunes:email>
    </itunes:owner>
    <itunes:explicit>false</itunes:explicit>
    <itunes:category text="Business">
      <itunes:category text="Investing" />
    </itunes:category>
    <itunes:category text="News">
      <itunes:category text="Politics" />
    </itunes:category>
    <itunes:image href="${SITE_URL}/podcast-cover.jpg" />
    ${episodes
      .map(ep => `
    <item>
      <title>${escapeXml(ep.title)}</title>
      <link>${SITE_URL}/episodes/${ep.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/episodes/${ep.slug}</guid>
      <description>${escapeXml(ep.description)}</description>
      <content:encoded><![CDATA[${ep.longDescription}]]></content:encoded>
      <pubDate>${new Date(ep.publishedAt).toUTCString()}</pubDate>
      <itunes:title>${escapeXml(ep.title)}</itunes:title>
      <itunes:summary>${escapeXml(ep.description)}</itunes:summary>
      <itunes:author>${HOST_NAME}</itunes:author>
      <itunes:duration>${ep.duration}</itunes:duration>
      <itunes:explicit>false</itunes:explicit>
      <itunes:image href="${ep.image}" />
      ${ep.youtubeId ? `<enclosure url="https://www.youtube.com/watch?v=${ep.youtubeId}" type="video/mp4" length="0" />` : ''}
    </item>`
      )
      .join('')}
  </channel>
</rss>`

  return new NextResponse(rss, {
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
