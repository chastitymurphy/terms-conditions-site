import { Episode, Reflection, Guest } from './types'

const SPACE = process.env.CONTENTFUL_SPACE_ID!
const TOKEN = process.env.CONTENTFUL_DELIVERY_TOKEN!
const BASE  = `https://cdn.contentful.com/spaces/${SPACE}/environments/master`

async function fetchEntries(contentType: string, extra = '') {
  const res = await fetch(
    `${BASE}/entries?content_type=${contentType}&limit=100${extra}`,
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
      next: { revalidate: 60 },
    }
  )
  if (!res.ok) {
    console.error(`Contentful fetch failed for ${contentType}:`, await res.text())
    return []
  }
  const data = await res.json()
  return data.items ?? []
}

function f(item: any) {
  return item.fields ?? {}
}

// ─── Episodes ───────────────────────────────────────────────────────────────

export async function getEpisodes(): Promise<Episode[]> {
  const items = await fetchEntries('episode', '&order=-fields.publishedAt')
  return items.map((item: any) => {
    const fields = f(item)
    return {
      slug:            fields.slug ?? '',
      title:           fields.title ?? '',
      guest:           fields.guest ?? '',
      guestTitle:      fields.guestTitle ?? '',
      description:     fields.description ?? '',
      longDescription: fields.longDescription ?? '',
      image:           fields.coverImage ?? '',
      youtubeId:       fields.youtubeId,
      spotifyUrl:      fields.spotifyUrl,
      publishedAt:     fields.publishedAt?.slice(0, 10) ?? '',
      duration:        fields.duration ?? '',
      topics:          fields.topics ?? [],
      takeaways:       fields.takeaways ?? [],
      resources:       [],
      transcript:      fields.transcript,
    } satisfies Episode
  })
}

export async function getEpisode(slug: string): Promise<Episode | undefined> {
  const items = await fetchEntries('episode', `&fields.slug=${slug}`)
  const item  = items[0]
  if (!item) return undefined
  const fields = f(item)
  return {
    slug:            fields.slug ?? '',
    title:           fields.title ?? '',
    guest:           fields.guest ?? '',
    guestTitle:      fields.guestTitle ?? '',
    description:     fields.description ?? '',
    longDescription: fields.longDescription ?? '',
    image:           fields.coverImage ?? '',
    youtubeId:       fields.youtubeId,
    spotifyUrl:      fields.spotifyUrl,
    publishedAt:     fields.publishedAt?.slice(0, 10) ?? '',
    duration:        fields.duration ?? '',
    topics:          fields.topics ?? [],
    takeaways:       fields.takeaways ?? [],
    resources:       [],
    transcript:      fields.transcript,
  }
}

// ─── Reflections ─────────────────────────────────────────────────────────────

export async function getReflections(): Promise<Reflection[]> {
  const items = await fetchEntries('reflection', '&order=-fields.publishedAt')
  return items.map((item: any) => {
    const fields = f(item)
    return {
      slug:        fields.slug ?? '',
      title:       fields.title ?? '',
      subtitle:    fields.subtitle,
      excerpt:     fields.excerpt ?? '',
      content:     fields.content ?? '',
      publishedAt: fields.publishedAt?.slice(0, 10) ?? '',
      topic:       fields.topic ?? '',
      image:       fields.image,
      readingTime: fields.readingTime ?? '',
    } satisfies Reflection
  })
}

export async function getReflection(slug: string): Promise<Reflection | undefined> {
  const items = await fetchEntries('reflection', `&fields.slug=${slug}`)
  const item  = items[0]
  if (!item) return undefined
  const fields = f(item)
  return {
    slug:        fields.slug ?? '',
    title:       fields.title ?? '',
    subtitle:    fields.subtitle,
    excerpt:     fields.excerpt ?? '',
    content:     fields.content ?? '',
    publishedAt: fields.publishedAt?.slice(0, 10) ?? '',
    topic:       fields.topic ?? '',
    image:       fields.image,
    readingTime: fields.readingTime ?? '',
  }
}

// ─── Guests ──────────────────────────────────────────────────────────────────

export async function getGuests(): Promise<Guest[]> {
  const items = await fetchEntries('guest', '&order=fields.name')
  return items.map((item: any) => {
    const fields = f(item)
    return {
      slug:         fields.slug ?? '',
      name:         fields.name ?? '',
      title:        fields.title ?? '',
      organization: fields.organization ?? '',
      bio:          fields.bio ?? '',
      image:        fields.image,
      episodes:     fields.episodeSlugs ?? [],
    } satisfies Guest
  })
}


// ─── Site Settings ───────────────────────────────────────────────────────────

export interface SiteSettings {
  siteTitle: string
  siteTagline: string
  heroQuestion: string
  heroDescription: string
  heroImageUrl: string
  aboutPodcast: string
  aboutHost: string
  hostName: string
  hostTitle: string
  hostAffiliation: string
  substackUrl: string
  spotifyUrl: string
  applePodcastsUrl: string
  youtubeUrl: string
  // Colors
  colorBackground: string
  colorSand: string
  colorText: string
  colorAccent: string
  colorGold: string
  colorHeroBg: string
  // Typography
  fontSizeHero: string
  fontSizeBody: string
  fontSizeSection: string
}
  spotifyUrl: string
  applePodcastsUrl: string
  youtubeUrl: string
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const res = await fetch(
    `${BASE}/entries/siteSettings`,
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
      next: { revalidate: 60 },
    }
  )

  // Fallback defaults if Contentful is unavailable
  const defaults: SiteSettings = {
    siteTitle:       'Terms & Conditions: The Fine Print',
    siteTagline:     'The Hidden Rules of Economic Life',
    heroQuestion:    'Why does it feel like the economy runs on rules nobody explained to us?',
    heroDescription: 'Terms & Conditions explores the hidden systems behind money, technology, wealth, opportunity, and public life \u2014 and the people working to build something better.',
    heroImageUrl:    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=80',
    aboutPodcast:    'Terms & Conditions explores the hidden rules of economic life.',
    aboutHost:       'Chastity Murphy is a policy strategist, researcher, and former U.S. Treasury advisor.',
    hostName:        'Chastity Murphy',
    hostTitle:       'Policy Strategist & Former U.S. Treasury Advisor',
    hostAffiliation: 'University of Manchester',
    substackUrl:     'https://substack.com/@chastitymurphy',
    spotifyUrl:      'https://open.spotify.com',
    applePodcastsUrl:'https://podcasts.apple.com',
    youtubeUrl:      'https://youtube.com',
    colorBackground: '#FAF7F0',
    colorSand:       '#F2E8D6',
    colorText:       '#2B3A52',
    colorAccent:     '#C4623A',
    colorGold:       '#D4A84B',
    colorHeroBg:     '#1A2B42',
    fontSizeHero:    'clamp(48px, 7vw, 72px)',
    fontSizeBody:    '18px',
    fontSizeSection: '32px',
  }

  if (!res.ok) return defaults

  const item = await res.json()
  const fields = item.fields ?? {}
  const loc = (key: string) => fields[key]?.['en-US'] ?? (defaults as any)[key]

  return {
    siteTitle:       loc('siteTitle'),
    siteTagline:     loc('siteTagline'),
    heroQuestion:    loc('heroQuestion'),
    heroDescription: loc('heroDescription'),
    heroImageUrl:    loc('heroImageUrl'),
    aboutPodcast:    loc('aboutPodcast'),
    aboutHost:       loc('aboutHost'),
    hostName:        loc('hostName'),
    hostTitle:       loc('hostTitle'),
    hostAffiliation: loc('hostAffiliation'),
    substackUrl:     loc('substackUrl'),
    spotifyUrl:      loc('spotifyUrl'),
    applePodcastsUrl:loc('applePodcastsUrl'),
    youtubeUrl:      loc('youtubeUrl'),
    colorBackground: loc('colorBackground'),
    colorSand:       loc('colorSand'),
    colorText:       loc('colorText'),
    colorAccent:     loc('colorAccent'),
    colorGold:       loc('colorGold'),
    colorHeroBg:     loc('colorHeroBg'),
    fontSizeHero:    loc('fontSizeHero'),
    fontSizeBody:    loc('fontSizeBody'),
    fontSizeSection: loc('fontSizeSection'),
  }
}