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
