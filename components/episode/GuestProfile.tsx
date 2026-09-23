import { Episode } from '@/lib/types'
import { Reveal } from '@/components/Reveal'

const SOCIALS = [
  { key: 'guestWebsite', label: 'Website' },
  { key: 'guestLinkedIn', label: 'LinkedIn' },
  { key: 'guestInstagram', label: 'Instagram' },
] as const

export default function GuestProfile({ ep }: { ep: Episode }) {
  const socials = SOCIALS.filter(({ key }) => ep[key])
  return (
    <section className="py-16 lg:py-24 bg-cream">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-8 bg-terracotta" />
          <span className="text-xs font-sans uppercase tracking-[0.2em] text-terracotta">About the guest</span>
        </div>
        <Reveal>
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {ep.guestPhoto && (
              <div className="md:col-span-1">
                <div className="relative w-44 h-44 rounded-2xl overflow-hidden border border-beige">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ep.guestPhoto} alt={ep.guest} className="w-full h-full object-cover" />
                </div>
              </div>
            )}
            <div className={ep.guestPhoto ? 'md:col-span-2' : 'md:col-span-3'}>
              <h3 className="font-serif text-2xl lg:text-3xl font-bold text-espresso mb-1">{ep.guest}</h3>
              {ep.guestTitle && <p className="text-sm text-cinnamon font-medium mb-1">{ep.guestTitle}</p>}
              {ep.guestOrganization && (
                <p className="text-sm text-warm-gray mb-4">{ep.guestOrganization}</p>
              )}
              {ep.guestBio && <p className="text-espresso/80 leading-relaxed">{ep.guestBio}</p>}
              {socials.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-4">
                  {socials.map(({ key, label }) => (
                    <a
                      key={key}
                      href={ep[key] as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-terracotta hover:underline"
                    >
                      {label} ↗
                    </a>
                  ))}
                </div>
              )}
              {ep.guestWork && (
                <div className="mt-6 border-t border-espresso/10 pt-4">
                  <p className="text-xs font-sans uppercase tracking-[0.2em] text-warm-gray mb-2">
                    Mentioned in the conversation
                  </p>
                  <p className="text-sm text-espresso/70 leading-relaxed">{ep.guestWork}</p>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
