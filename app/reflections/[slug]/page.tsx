import { notFound } from 'next/navigation'
import { getReflections, getReflection } from '@/lib/contentful'
import Image from 'next/image'
import Link from 'next/link'
import NewsletterCTA from '@/components/NewsletterCTA'
import ReflectionCard from '@/components/ReflectionCard'
import { Metadata } from 'next'

interface Props { params: { slug: string } }

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
  const [r, all] = await Promise.all([getReflection(params.slug), getReflections()])
  if (!r) notFound()
  const related = all.filter(x => x.slug !== r.slug && x.topic === r.topic).slice(0, 2)

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
          <div className="mb-4"><span className="inline-block text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 text-copper/80 border border-copper/20">{r.topic.replace(/-/g, ' ')}</span></div>
          <h1 className="font-serif text-3xl lg:text-5xl xl:text-6xl font-bold text-cream leading-tight mb-3">{r.title}</h1>
          {r.subtitle && <p className="font-serif italic text-copper/80 text-xl mb-5">{r.subtitle}</p>}
          <div className="flex items-center gap-4 text-xs text-beige/40">
            <span>By Chastity Murphy</span><span>·</span>
            <span>{new Date(r.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span>·</span><span>{r.readingTime}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid lg:grid-cols-4 gap-12">
          <article className="lg:col-span-3">
            <p className="font-serif text-xl lg:text-2xl text-espresso/80 leading-relaxed mb-8 border-l-2 border-terracotta pl-5 italic">{r.excerpt}</p>
            <div className="prose prose-lg max-w-none">
              {r.content.split('\n\n').map((para, i) => (
                <p key={i} className={`text-base lg:text-lg text-espresso/80 leading-relaxed mb-6 ${i === 0 ? 'drop-cap' : ''}`}>{para}</p>
              ))}
            </div>
          </article>
          <aside className="lg:col-span-1 space-y-6">
            <NewsletterCTA minimal />
            <div className="bg-beige-light rounded-2xl p-5 border border-beige/60">
              <h3 className="font-serif text-base font-bold text-espresso mb-2">About the Author</h3>
              <p className="text-xs text-warm-gray leading-relaxed">Chastity Murphy is a policy strategist, researcher, and former U.S. Treasury advisor whose work focuses on financial infrastructure, technology governance, economic opportunity, and public institutions.</p>
              <Link href="/about" className="text-xs text-terracotta hover:underline mt-2 inline-block">Full bio →</Link>
            </div>
          </aside>
        </div>
        {related.length > 0 && (
          <div className="mt-16 pt-12 border-t border-beige/60">
            <h2 className="font-serif text-2xl font-bold text-espresso mb-8">Related Essays</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {related.map(ref => <ReflectionCard key={ref.slug} reflection={ref} />)}
            </div>
          </div>
        )}
      </div>
      <NewsletterCTA />
    </>
  )
}
