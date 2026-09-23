export interface FinePrintEntry {
  type: string // TERM | CONTEXT | DATA | READ | LAW
  title: string
  body: string
  url?: string
}

export interface Timestamp {
  time: string
  label: string
}

export interface Episode {
  slug: string
  title: string
  guest: string
  guestTitle: string
  guestOrganization?: string
  guestBio?: string
  guestPhoto?: string
  guestWebsite?: string
  guestInstagram?: string
  guestLinkedIn?: string
  guestWork?: string
  description: string
  longDescription: string
  image: string
  episodeNumber?: number
  heroQuestion?: string
  fullIntroduction?: string
  youtubeId?: string
  spotifyUrl?: string
  appleUrl?: string
  audioEmbed?: string
  videoEmbed?: string
  publishedAt: string
  duration: string
  topics: string[]
  takeaways: string[]
  timestamps: Timestamp[]
  finePrint: FinePrintEntry[]
  resources: Resource[]
  transcript?: string
  seoTitle?: string
  seoDescription?: string
  socialImage?: string
  status?: 'recorded' | 'in_production' | 'scheduled' | 'published'
}

export interface Reflection {
  slug: string
  title: string
  subtitle?: string
  excerpt: string
  content: string
  publishedAt: string
  topic: string
  topicTags?: string[]
  image?: string
  readingTime: string
  status?: 'draft' | 'scheduled' | 'published'
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
  status?: 'recorded' | 'announced' | 'published'
  discussionTheme?: string
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
