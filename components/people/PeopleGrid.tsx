// Future contributor architecture (directives §8): contributors, fellows,
// advisors, collaborators, institutional partners. The component is wired
// into the About page but renders NOTHING until a CMS-backed people source
// exists — no placeholder people, no empty cards, ever.
export interface Person {
  name: string
  role: string
  kind: 'contributor' | 'fellow' | 'advisor' | 'collaborator' | 'partner'
  photo?: string
  bio?: string
  link?: string
}

export default function PeopleGrid({ people }: { people: Person[] }) {
  if (!people.length) return null
  return (
    <section className="py-16 lg:py-24 bg-cream">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-8 bg-terracotta" />
          <span className="text-xs font-sans uppercase tracking-[0.2em] text-terracotta">People</span>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {people.map((p) => (
            <div key={p.name} className="bg-white/60 rounded-2xl border border-beige/60 p-6">
              <p className="font-serif text-lg font-bold text-espresso">{p.name}</p>
              <p className="text-sm text-cinnamon font-medium mt-1">{p.role}</p>
              {p.bio && <p className="text-sm text-warm-gray leading-relaxed mt-3">{p.bio}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
