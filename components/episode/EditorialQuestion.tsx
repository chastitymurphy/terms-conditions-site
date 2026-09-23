import { Reveal } from '@/components/Reveal'

export default function EditorialQuestion({ question, paragraphs }: { question: string; paragraphs?: string[] }) {
  return (
    <section className="py-16 lg:py-24 bg-cream">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-terracotta" />
          <span className="text-xs font-sans uppercase tracking-[0.2em] text-terracotta">The question</span>
        </div>
        <h2 className="font-serif text-3xl lg:text-5xl font-bold text-espresso leading-tight mb-8">
          <Reveal>{question}</Reveal>
        </h2>
        {paragraphs?.length ? (
          <div className="text-espresso/80 leading-relaxed space-y-4">
            {paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
