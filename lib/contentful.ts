import { Episode, Reflection, Guest, Resource, FinePrintEntry, Timestamp } from './types'

const SPACE = process.env.CONTENTFUL_SPACE_ID!
const TOKEN = process.env.CONTENTFUL_DELIVERY_TOKEN!
// Draft episodes render ONLY on preview/development deployments, never production.
const PREVIEW_TOKEN = process.env.CONTENTFUL_PREVIEW_TOKEN
const PREVIEW_ALLOWED = process.env.VERCEL_ENV !== 'production' && Boolean(PREVIEW_TOKEN)

const BASE = `https://cdn.contentful.com/spaces/${SPACE}/environments/master`
const PREVIEW_BASE = `https://preview.contentful.com/spaces/${SPACE}/environments/master`

async function fetchEntries(contentType: string, extra = '', includeDrafts = false): Promise<any[]> {
  const usePreview = includeDrafts && PREVIEW_ALLOWED
  const res = await fetch(
    `${usePreview ? PREVIEW_BASE : BASE}/entries?content_type=${contentType}&limit=100${extra}`,
    {
      headers: { Authorization: `Bearer ${usePreview ? PREVIEW_TOKEN : TOKEN}` },
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

// The Delivery API returns single-locale fields FLAT (fields.slug is a string).
// This also accepts locale-nested values ({ 'en-US': ... }) so the same mapping
// works if entries are ever fetched with locale=*.
function g(raw: any): any {
  if (raw == null) return undefined
  if (typeof raw === 'object' && !Array.isArray(raw) && 'en-US' in raw) return raw['en-US']
  return raw
}

function asArray<T>(raw: any): T[] {
  return Array.isArray(raw) ? (raw as T[]) : []
}

// ─── Episodes ───────────────────────────────────────────────────────────────

function mapEpisode(item: any): Episode {
  const fields = f(item)
  return {
    slug: g(fields.slug) ?? '',
    title: g(fields.title) ?? '',
    guest: g(fields.guest) ?? '',
    guestTitle: g(fields.guestTitle) ?? '',
    guestOrganization: g(fields.guestOrganization),
    guestBio: g(fields.guestBio),
    guestPhoto: g(fields.guestPhoto),
    guestWebsite: g(fields.guestWebsite),
    guestInstagram: g(fields.guestInstagram),
    guestLinkedIn: g(fields.guestLinkedIn),
    guestWork: g(fields.guestWork),
    description: g(fields.description) ?? '',
    longDescription: g(fields.longDescription) ?? '',
    image: g(fields.coverImage) ?? '',
    episodeNumber: g(fields.episodeNumber),
    heroQuestion: g(fields.heroQuestion),
    fullIntroduction: g(fields.fullIntroduction),
    youtubeId: g(fields.youtubeId),
    spotifyUrl: g(fields.spotifyUrl),
    appleUrl: g(fields.appleUrl),
    audioEmbed: g(fields.audioEmbed),
    videoEmbed: g(fields.videoEmbed),
    publishedAt: (g(fields.publishedAt) ?? '').slice(0, 10),
    duration: g(fields.duration) ?? '',
    topics: asArray<string>(g(fields.topics)),
    takeaways: asArray<string>(g(fields.takeaways)),
    timestamps: asArray<Timestamp>(g(fields.timestamps)),
    finePrint: asArray<FinePrintEntry>(g(fields.finePrint)),
    resources: asArray<Resource>(g(fields.resources)),
    transcript: g(fields.transcript),
    seoTitle: g(fields.seoTitle),
    seoDescription: g(fields.seoDescription),
    socialImage: g(fields.socialImage),
    status: g(fields.status) as Episode['status'],
  }
}

// PUBLIC: Only return published episodes. Pre-launch returns [].
export async function getEpisodes(includeDrafts = false): Promise<Episode[]> {
  const items = await fetchEntries('episode', '&order=-fields.publishedAt', includeDrafts)
  return items
    .map(mapEpisode)
    .filter((ep) => (includeDrafts ? Boolean(ep.slug) : ep.status === 'published'))
}

export async function getEpisode(slug: string, includeDrafts = false): Promise<Episode | undefined> {
  const items = await fetchEntries('episode', `&fields.slug=${slug}`, includeDrafts)
  const item = items[0]
  if (!item) return undefined
  const ep = mapEpisode(item)
  // Only published episodes render on production. Preview deployments may
  // render any episode found via the Preview API (drafts included).
  if (!includeDrafts && ep.status !== 'published') return undefined
  return ep
}

// ─── Reflections ─────────────────────────────────────────────────────────────

function mapReflection(item: any): Reflection {
  const fields = f(item)
  return {
    slug: g(fields.slug) ?? '',
    title: g(fields.title) ?? '',
    subtitle: g(fields.subtitle),
    excerpt: g(fields.excerpt) ?? '',
    content: g(fields.content) ?? '',
    publishedAt: (g(fields.publishedAt) ?? '').slice(0, 10),
    topic: g(fields.topic) ?? '',
    topicTags: asArray<string>(g(fields.topicTags)),
    image: g(fields.image),
    readingTime: g(fields.readingTime) ?? '',
    status: g(fields.status) as Reflection['status'],
  }
}

export async function getReflections(): Promise<Reflection[]> {
  const items = await fetchEntries('reflection', '&order=-fields.publishedAt')
  return items.map(mapReflection).filter((r) => r.status === 'published')
}

export async function getReflection(slug: string): Promise<Reflection | undefined> {
  const items = await fetchEntries('reflection', `&fields.slug=${slug}`)
  const item = items[0]
  if (!item) return undefined
  const r = mapReflection(item)
  if (r.status !== 'published') return undefined
  return r
}

// ─── Guests ──────────────────────────────────────────────────────────────────

// PUBLIC: Only return guests marked announced or published (those safe to show).
// Use getAllGuests() for the CMS placeholder list.
export async function getGuests(): Promise<Guest[]> {
  const items = await fetchEntries('guest', '&order=fields.name')
  return items
    .filter((item: any) => {
      const status = g(f(item).status) ?? ''
      return status === 'announced' || status === 'published'
    })
    .map((item: any) => {
      const fields = f(item)
      return {
        slug: g(fields.slug) ?? '',
        name: g(fields.name) ?? '',
        title: g(fields.title) ?? '',
        organization: g(fields.organization) ?? '',
        bio: g(fields.bio) ?? '',
        image: g(fields.image),
        episodes: asArray<string>(g(fields.episodeSlugs)),
        status: g(fields.status) as Guest['status'],
        discussionTheme: g(fields.discussionTheme),
      }
    })
}

// ADMIN/CMS-only: Returns all guests regardless of status (for the CMS placeholder view).
export async function getAllGuests(): Promise<Guest[]> {
  const items = await fetchEntries('guest', '&order=fields.name')
  return items.map((item: any) => {
    const fields = f(item)
    return {
      slug: g(fields.slug) ?? '',
      name: g(fields.name) ?? '',
      title: g(fields.title) ?? '',
      organization: g(fields.organization) ?? '',
      bio: g(fields.bio) ?? '',
      image: g(fields.image),
      episodes: asArray<string>(g(fields.episodeSlugs)),
      status: g(fields.status) as Guest['status'],
      discussionTheme: g(fields.discussionTheme),
    }
  })
}

// ─── Related content (shared topic tags) ────────────────────────────────────

export interface RelatedItem {
  title: string
  href: string
  type: 'Episode' | 'Reflection'
  tags: string[]
}

export async function getRelated(current: { tags: string[]; excludeSlug: string }): Promise<RelatedItem[]> {
  const [episodes, reflections] = await Promise.all([getEpisodes(), getReflections()])
  const items: RelatedItem[] = []
  for (const ep of episodes) {
    if (ep.slug === current.excludeSlug) continue
    items.push({ title: ep.title, href: `/episodes/${ep.slug}`, type: 'Episode', tags: ep.topics })
  }
  for (const r of reflections) {
    if (r.slug === current.excludeSlug) continue
    items.push({ title: r.title, href: `/reflections/${r.slug}`, type: 'Reflection', tags: r.topicTags ?? [r.topic] })
  }
  const t = current.tags.map((x) => x.toLowerCase())
  return items
    .filter((i) => i.tags.some((tag) => t.includes(tag.toLowerCase())))
    .slice(0, 3)
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
  showResources: boolean
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
  const res = await fetch(`${BASE}/entries/siteSettings`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    next: { revalidate: 60 },
  })

  const defaults: SiteSettings = {
    siteTitle:       'Terms & Conditions: The Fine Print',
    siteTagline:     'The Hidden Rules of Economic Life',
    heroQuestion:    'Why does it feel like the economy runs on rules nobody explained to us?',
    heroDescription: 'Terms & Conditions explores the hidden systems behind money, technology, wealth, opportunity, and public life \u2014 and the people working to build something better.',
    heroImageUrl:    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1800&q=80',
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
    showResources:   false,
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

  if (!res.ok) {
    console.error('Contentful siteSettings fetch failed:', res.status, await res.text())
    return defaults
  }

  const item = await res.json()
  const fields = item.fields ?? {}
  // Delivery API returns flat fields; g() also handles locale-nested values.
  const loc = (key: string) => g(fields[key]) ?? (defaults as any)[key]

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
    showResources:   Boolean(g(fields['showResources']) ?? false),
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
