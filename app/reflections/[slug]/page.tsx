import { notFound } from 'next/navigation'
import { getReflections, getReflection } from '@/lib/contentful'
import Image from 'next/image'
import Link from 'next/link'
import NewsletterCTA from '@/components/NewsletterCTA'
import { Metadata } from 'next'

interface Props { params: { slug: string } }

// Only generate static paths for published reflections (pre-launch: none yet)
export async function generateStaticParams() {
  const reflections = await getReflections()
  return reflections.map(r => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = await getReflection(params.slug)
  if (!r) return {}
  return { title: r.title, description: r.excerpt }
}

export default async function ReflectionPage({ params }: Props) {
  const r = await getReflection(params.slug)
  if (!r) notFound()

  return (
    <>
      <div className="pt-24 bg-espresso min-h-[50vh] flex flex-col justify-end relative overflow-hidden">
        {r.image && (
          <>
            <Image src={r.image} alt={r.title} fill className="object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/80 to-espresso/40" />
          </>
        )}
        <div className="relative max-w-4xl mx-auto px-6 lg:px-10 py-16">
          <Link href="/reflections" className="text-xs text-copper/70 uppercase tracking-widest hover:text-copper transition-colors mb-6 inline-flex items-center gap-2">← All Reflections</Link>
          <div className="mb-4">
            <span className="inline-block text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 text-copper/80 border border-copper/20">{r.topic.replace(/-/g, ' ')}</span>
          </div>
          <h1 className="font-serif text-3xl lg:text-5xl xl:text-6xl font-bold text-cream leading-tight mb-3">{r.title}</h1>
          {r.subtitle && <p className="font-serif italic text-copper/80 text-xl mb-5">{r.subtitle}</p>}
          <div className="flex items-center gap-4 text-xs text-beige/40">
            <span>By Chastity Murphy</span><span>·</span>
            <span>{new Date(r.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span>·</span><span>{r.readingTime}</span>
          </div>
        </div>
      </div>
      <NewsletterCTA />
    </>
  )
}
