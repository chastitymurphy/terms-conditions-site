# Terms & Conditions: The Fine Print — Website

A Next.js 14 website for the *Terms & Conditions: The Fine Print* podcast and publication platform.

---

## Quick Start

```bash
# From this directory:
npm install
npm run dev
# → Open http://localhost:3000
```

---

## Deploy to Vercel (5 minutes)

1. Push this folder to a GitHub repository
2. Go to [vercel.com/new](https://vercel.com/new) → Import your repo
3. Vercel auto-detects Next.js — click **Deploy**
4. Your site is live. Add your custom domain in Vercel → Settings → Domains

---

## Substack Integration

### Step 1: Create Your Substack
1. Go to [substack.com](https://substack.com) and create a new publication
2. Name it **Terms & Conditions: The Fine Print** (or a variant)
3. Note your Substack URL (e.g. `https://termsconditions.substack.com`)

### Step 2: Update the Site
Open `lib/data.ts` and update:
```ts
export const SUBSTACK_URL = 'https://YOUR-PUBLICATION.substack.com'
```

### Step 3: Embed the Subscribe Form (Optional)
Substack provides an embeddable form. Replace the Subscribe buttons by adding:
```html
<iframe
  src="https://YOUR-PUBLICATION.substack.com/embed"
  width="100%"
  height="150"
  style="border: none; background: transparent;"
  frameborder="0"
  scrolling="no"
/>
```

---

## Podcast Platform Setup

### Spotify for Podcasters
1. Go to [podcasters.spotify.com](https://podcasters.spotify.com)
2. Click **Get Started** → Add your podcast
3. Enter your RSS feed URL: `https://YOUR-DOMAIN.com/api/rss`
4. Fill in show details and submit

### Apple Podcasts Connect
1. Go to [podcastsconnect.apple.com](https://podcastsconnect.apple.com)
2. Sign in with your Apple ID
3. Click **+** → Add Show
4. Enter your RSS feed URL: `https://YOUR-DOMAIN.com/api/rss`
5. Review and submit (approval takes 24–72 hours)

### RSS Feed
Your RSS feed is automatically generated at `/api/rss`.  
It includes all episode metadata, descriptions, and links formatted for all major podcast apps.

---

## Adding Content

All content lives in `lib/data.ts`. Everything is typed — TypeScript will catch errors.

### Add an Episode
```ts
episodes.push({
  slug: 'your-episode-slug',
  title: 'Episode Title',
  guest: 'Guest Name',
  guestTitle: 'Guest Title and Organization',
  description: 'Short description (1–2 sentences)',
  longDescription: 'Full paragraph description',
  image: 'https://...', // Unsplash or your own image URL
  youtubeId: 'youtube-video-id', // optional
  spotifyUrl: 'https://open.spotify.com/episode/...', // optional, add after publishing
  publishedAt: '2026-01-01',
  duration: '55 min',
  topics: ['banking', 'payments'],
  takeaways: ['Key point 1', 'Key point 2'],
  resources: [
    { title: 'Book Title', author: 'Author', type: 'book', url: '...', description: '...' }
  ],
  transcript: 'Full transcript text or "Coming soon."',
})
```

### Add a Reflection Essay
```ts
reflections.push({
  slug: 'essay-slug',
  title: 'Essay Title',
  subtitle: 'Optional subtitle',
  excerpt: 'Opening sentence shown in card previews',
  content: `Full essay text. Separate paragraphs with blank lines.`,
  publishedAt: '2026-01-01',
  topic: 'banking', // must match a topic slug
  image: 'https://...',
  readingTime: '7 min read',
})
```

### Add a Guest
```ts
guests.push({
  slug: 'guest-slug',
  name: 'Full Name',
  title: 'Title',
  organization: 'Organization',
  bio: 'Short biography',
  episodes: ['episode-slug'],
})
```

---

## Update Site Metadata

In `lib/data.ts`, update these constants when your domain is live:
```ts
export const SUBSTACK_URL   = 'https://YOUR.substack.com'
export const PODCAST_EMAIL  = 'hello@YOUR-DOMAIN.com'
export const SITE_URL       = 'https://YOUR-DOMAIN.com'
```

---

## File Structure

```
app/
  layout.tsx          ← Root layout (fonts, Nav, Footer)
  page.tsx            ← Homepage
  globals.css         ← Design tokens + base styles
  episodes/
    page.tsx          ← Episodes archive
    [slug]/page.tsx   ← Episode detail
  reflections/
    page.tsx          ← Essays archive  
    [slug]/page.tsx   ← Essay detail
  topics/[topic]/     ← Topic landing pages
  about/page.tsx
  guests/page.tsx
  resources/page.tsx
  api/rss/route.ts    ← Podcast RSS feed

components/
  Nav.tsx
  Footer.tsx
  HeroSection.tsx
  EpisodeCard.tsx
  ReflectionCard.tsx
  TopicsGrid.tsx
  NewsletterCTA.tsx

lib/
  data.ts             ← All content (episodes, reflections, guests)
  types.ts            ← TypeScript interfaces
```

---

## Design System

Colors (from `tailwind.config.ts`):
- `espresso` (#2C1810) — primary dark
- `terracotta` (#B84A2E) — accent / CTA
- `copper` (#B87B4F) — decorative / headings
- `beige` (#E8D5C0) — card backgrounds
- `cream` (#FAF7F2) — page backgrounds
- `warm-dark` (#1A0F08) — hero / dark sections

Typography:
- Headlines: **Playfair Display** (loaded via Next.js Google Fonts)
- Body: **Inter** (loaded via Next.js Google Fonts)

---

## Future Expansion

The codebase is structured to support:
- **Live events** — add an `/events` route
- **Conference recordings** — extend episode types with `isConference: true`
- **Educational resources** — add a `/learn` section
- **Interactive timelines** — add as a React component in any page
- **Guest-curated reading lists** — extend the `Guest` type with `readingList: Resource[]`
- **Podcast season structure** — add `season: number` to the `Episode` type
