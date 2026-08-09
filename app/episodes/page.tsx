import { getSiteSettings } from '@/lib/contentful'

export const metadata = {
  title: 'Episodes',
  description: 'Conversations from Terms & Conditions: The Fine Print. First episodes coming soon.',
}

export default async function EpisodesPage() {
  const settings = await getSiteSettings()
  return (
    <div className="bg-cream min-h-screen">
      <div className="pt-32 pb-16 bg-espresso">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-copper/60" />
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-copper/80">Episodes</span>
          </div>
          <h1 className="font-serif text-4xl lg:text-6xl font-bold text-cream mb-4">Episodes</h1>
          <p className="text-beige/70 text-lg max-w-xl">
            Conversations with people working on the institutions, technologies, policies, and systems that shape economic life.
          </p>
        </div>
      </div>

      <div className="py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <div className="inline-block mb-6">
            <div className="h-px w-12 bg-terracotta mx-auto" />
          </div>
          <p className="font-serif text-2xl lg:text-3xl text-espresso leading-snug mb-4">
            First episodes coming soon.
          </p>
          <p className="text-espresso/70 leading-relaxed mb-8">
            {settings.prelaunchCount} conversations have already been recorded and are currently in production.
            Subscribe to get the first episode when it drops.
          </p>
          <a
            href={settings.substackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base px-8 py-4"
          >
            Subscribe before launch
          </a>
        </div>
      </div>
    </div>
  )
}
