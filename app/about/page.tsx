import { Metadata } from 'next'
import Image from 'next/image'
import { getSiteSettings } from '@/lib/contentful'
import NewsletterCTA from '@/components/NewsletterCTA'

export const metadata: Metadata = {
  title: 'About',
  description: 'About Terms & Conditions: The Fine Print — a podcast and publication by Chastity Murphy.',
}

export default async function AboutPage() {
  const s = await getSiteSettings()

  return (
    <>
      <div className="pt-32 pb-16 bg-espresso relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-copper/60" />
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-copper/80">The Platform</span>
          </div>
          <h1 className="font-serif text-4xl lg:text-6xl font-bold text-cream">About</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

          {/* About the Podcast — editable in Contentful → About Podcast */}
          <div>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-espresso mb-6">About the Podcast</h2>
            <div className="space-y-4 text-espresso/80 leading-relaxed">
              {s.aboutPodcast.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* About the Host — editable in Contentful → About Host */}
          <div>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-espresso mb-6">About the Host</h2>

            <div className="relative w-40 h-40 rounded-2xl overflow-hidden mb-6 border border-beige">
              <Image src="/chastity-murphy.jpg" alt={s.hostName} fill className="object-cover object-top" />
            </div>

            <div className="space-y-4 text-espresso/80 leading-relaxed">
              <p>{s.aboutHost}</p>
              <div className="mt-8 pt-6 border-t border-beige/60">
                <h3 className="font-serif text-lg font-bold text-espresso mb-4">Current Affiliations</h3>
                <ul className="space-y-3 text-sm text-warm-gray">
                  <li className="flex gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-1.5 shrink-0" />
                    {/* Editable in Contentful → Host Affiliation */}
                    <span>{s.hostAffiliation}</span>
                  </li>
                </ul>
                <p className="text-xs text-warm-gray/60 mt-4 italic">Affiliations are updated as they change.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-12 border-t border-beige/60">
          <div className="max-w-2xl">
            <h2 className="font-serif text-2xl font-bold text-espresso mb-4">Presented by the University of Manchester</h2>
            <p className="text-espresso/70 leading-relaxed">
              Terms &amp; Conditions: The Fine Print is presented by the University of Manchester,
              bringing academic rigor and public-interest research to the broader conversation
              about how financial systems are governed, who they serve, and what alternatives exist.
            </p>
          </div>
        </div>
      </div>

      <NewsletterCTA />
    </>
  )
}
