import { notFound } from 'next/navigation'
import { getEpisodes, getEpisode } from '@/lib/contentful'
import Image from 'next/image'
import Link from 'next/link'
import NewsletterCTA from '@/components/NewsletterCTA'
import { Metadata } from 'next'

interface Props { params: { slug: string } }

// Only generate static paths for published episodes (pre-launch: none yet)
export async function generateStaticParams() {
  const episodes = await getEpisodes()
  return episodes.map(ep => ({ slug: ep.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ep = await getEpisode(params.slug)
  if (!ep) return {}
  return { title: ep.title, description: ep.description }
}

export default async function EpisodePage({ params }: Props) {
  // getEpisode already returns undefined for unpublished / placeholder content.
  const ep = await getEpisode(params.slug)
  if (!ep) notFound()

  return (
    <>
      <div className="pt-24 bg-espresso">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <Link href="/episodes" className="text-xs text-copper/70 uppercase tracking-widest hover:text-copper transition-colors mb-6 inline-flex items-center gap-2">← All Episodes</Link>
              <h1 className="font-serif text-3xl lg:text-5xl font-bold text-cream leading-tight mb-4">{ep.title}</h1>
              <p className="text-copper font-medium mb-1">{ep.guest}</p>
              <p className="text-beige/50 text-sm mb-6">{ep.guestTitle}</p>
              <p className="text-beige/70 leading-relaxed mb-6">{ep.longDescription}</p>
            </div>
            {ep.image && (
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image src={ep.image} alt={ep.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 to-transparent" />
              </div>
            )}
          </div>
        </div>
      </div>
      <NewsletterCTA />
    </>
  )
}
