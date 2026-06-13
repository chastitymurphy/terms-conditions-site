export interface Episode {
  slug: string
  title: string
  guest: string
  guestTitle: string
  description: string
  longDescription: string
  image: string
  youtubeId?: string
  spotifyUrl?: string
  appleUrl?: string
  publishedAt: string
  duration: string
  topics: string[]
  takeaways: string[]
  resources: Resource[]
  transcript?: string
}

export interface Reflection {
  slug: string
  title: string
  subtitle?: string
  excerpt: string
  content: string
  publishedAt: string
  topic: string
  image?: string
  readingTime: string
}

export interface Guest {
  slug: string
  name: string
  title: string
  organization: string
  bio: string
  image?: string
  episodes: string[]
  website?: string
  twitter?: string
}

export interface Resource {
  title: string
  author?: string
  type: 'book' | 'article' | 'report' | 'organization' | 'video'
  url?: string
  description?: string
}

export interface Topic {
  slug: string
  label: string
  description: string
  icon?: string
}
