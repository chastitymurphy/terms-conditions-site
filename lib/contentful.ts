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

// PUBLIC: Only return published episodes. Pre-launch returns []. Use getAllEpisodes for admin/CMS-only views.
export async function getEpisodes(): Promise<Episode[]> {
  const items = await fetchEntries('episode', '&order=-fields.publishedAt')
  return items
    .filter((item: any) => (item.fields?.status?.['en-US'] ?? '') === 'published')
    .map((item: any) => {
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
        status:          fields.status?.['en-US'] as Episode['status'],
      }
    })
}

export async function getEpisode(slug: string): Promise<Episode | undefined> {
  const items = await fetchEntries('episode', `&fields.slug=${slug}`)
  const item  = items[0]
  if (!item) return undefined
  // Only return published episodes — prevent pre-launch fake episodes from rendering
  if ((item.fields?.status?.['en-US'] ?? '') !== 'published') return undefined
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
    status:          fields.status?.['en-US'] as Episode['status'],
  }
}

// ─── Reflections ─────────────────────────────────────────────────────────────

export async function getReflections(): Promise<Reflection[]> {
  const items = await fetchEntries('reflection', '&order=-fields.publishedAt')
  return items
    .filter((item: any) => (item.fields?.status?.['en-US'] ?? '') === 'published')
    .map((item: any) => {
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
        status:      fields.status?.['en-US'] as Reflection['status'],
      }
    })
}

export async function getReflection(slug: string): Promise<Reflection | undefined> {
  const items = await fetchEntries('reflection', `&fields.slug=${slug}`)
  const item  = items[0]
  if (!item) return undefined
  if ((item.fields?.status?.['en-US'] ?? '') !== 'published') return undefined
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
    status:      fields.status?.['en-US'] as Reflection['status'],
  }
}

// ─── Guests ──────────────────────────────────────────────────────────────────

// PUBLIC: Only return guests marked announced or published (those safe to show).
// Use getRecordedGuests() for the CMS placeholder list.
export async function getGuests(): Promise<Guest[]> {
  const items = await fetchEntries('guest', '&order=fields.name')
  return items
    .filter((item: any) => {
      const status = item.fields?.status?.['en-US'] ?? ''
      return status === 'announced' || status === 'published'
    })
    .map((item: any) => {
      const fields = f(item)
      return {
        slug:         fields.slug ?? '',
        name:         fields.name ?? '',
        title:        fields.title ?? '',
        organization: fields.organization ?? '',
        bio:          fields.bio ?? '',
        image:        fields.image,
        episodes:     fields.episodeSlugs ?? [],
        status:       fields.status?.['en-US'] as Guest['status'],
        discussionTheme: fields.discussionTheme,
      }
    })
}

// ADMIN/CMS-only: Returns all guests regardless of status (for the CMS placeholder view).
export async function getAllGuests(): Promise<Guest[]> {
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
      status:       fields.status?.['en-US'] as Guest['status'],
      discussionTheme: fields.discussionTheme,
    }
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
  aboutHostLong: string
  aboutUniversity: string
  prelaunchCount: string
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

export async function getSiteSettings(): Promise<SiteSettings> {
  const res = await fetch(
    `${BASE}/entries/siteSettings`,
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
      next: { revalidate: 60 },
    }
  )

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
    aboutHostLong:   '',
    aboutUniversity: 'Terms & Conditions: The Fine Print is presented by the University of Manchester, bringing academic rigor and public-interest research to the broader conversation about how financial systems are governed, who they serve, and what alternatives exist.',
    prelaunchCount:  'Six',
    substackUrl:     'https://substack.com/@chastitymurphy',
    spotifyUrl:      '',
    applePodcastsUrl:'',
    youtubeUrl:      '',
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
    aboutHostLong:   loc('aboutHostLong'),
    aboutUniversity: loc('aboutUniversity'),
    prelaunchCount:  loc('prelaunchCount'),
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
