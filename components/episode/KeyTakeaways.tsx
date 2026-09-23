import { Reveal } from '@/components/Reveal'

export default function KeyTakeaways({ takeaways }: { takeaways: string[] }) {
  if (!takeaways.length) return null
  return (
    <section className="py-16 lg:py-24 bg-sand">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-8 bg-terracotta" />
          <span className="text-xs font-sans uppercase tracking-[0.2em] text-terracotta">Key takeaways</span>
        </div>
        <h2 className="font-serif text-3xl lg:text-4xl font-bold text-espresso mb-8">
          <Reveal>What the conversation surfaces</Reveal>
        </h2>
        <ol className="border-b border-espresso/10">
          {takeaways.map((t, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <li className="flex items-baseline gap-5 py-5 border-t border-espresso/10">
                <span className="font-mono text-xs text-copper shrink-0 pt-1">0{i + 1}</span>
                <p className="text-espresso/85 leading-relaxed">{t}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
