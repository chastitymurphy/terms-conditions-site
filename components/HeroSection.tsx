import { getSiteSettings } from '@/lib/contentful'
import HeroInteractive from './HeroInteractive'

// Server wrapper: fetches CMS-managed copy and renders the interactive hero.
// The background video, left-side layout, and all other hero elements are unchanged —
// the right column (contract → Under the Surface) and the signature module are the
// new Sign & Reveal interaction, per directive.

export default async function HeroSection() {
  const s = await getSiteSettings()
  return (
    <HeroInteractive
      tagline={s.siteTagline}
      question={s.heroQuestion}
      description={s.heroDescription}
      substackUrl={s.substackUrl}
    />
  )
}
