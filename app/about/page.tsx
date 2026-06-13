import NewsletterCTA from '@/components/NewsletterCTA'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About',
  description: 'About Terms & Conditions: The Fine Print — a podcast and publication by Chastity Murphy.',
}

export default function AboutPage() {
  return (
    <>
      {/* Header */}
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
          {/* About the Podcast */}
          <div>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-espresso mb-6">
              About the Podcast
            </h2>
            <div className="space-y-4 text-espresso/80 leading-relaxed">
              <p>
                Terms &amp; Conditions explores the hidden rules of economic life.
              </p>
              <p>
                Most people interact with financial systems every day without understanding
                the institutions and decisions that shape them. The podcast examines those
                systems and the people working to build, regulate, reform, and challenge them.
              </p>
              <p>
                The platform sits at the intersection of financial infrastructure, banking,
                payments, financial technology, consumer protection, wealth-building, public
                banking, privacy, financial surveillance, artificial intelligence, economic
                opportunity, public institutions, and economic democracy.
              </p>
              <p>
                Its purpose is to help ordinary people understand the systems that shape
                their lives — while making complex financial and policy issues accessible
                to a broader public audience.
              </p>
            </div>

            <div className="mt-10 p-6 bg-beige-light rounded-2xl border border-beige/60">
              <p className="font-serif text-lg italic text-espresso leading-relaxed">
                &ldquo;I understand something about the economy that nobody ever explained to me before.&rdquo;
              </p>
              <p className="text-xs text-warm-gray mt-3 uppercase tracking-widest">
                What every episode should leave you feeling
              </p>
            </div>
          </div>

          {/* About the Host */}
          <div>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-espresso mb-6">
              About the Host
            </h2>
            {/* Host photo */}
            <div className="relative w-40 h-40 rounded-2xl overflow-hidden mb-6 border border-beige">
              <Image
                src="/chastity-murphy.jpg"
                alt="Chastity Murphy"
                fill
                className="object-cover object-top"
              />
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-espresso mb-6">
              About the Host
            </h2>
            <div className="space-y-4 text-espresso/80 leading-relaxed">
              <p>
                Chastity Murphy is a policy strategist, researcher, and former U.S. Treasury
                advisor whose work focuses on financial infrastructure, technology governance,
                economic opportunity, and public institutions.
              </p>
              {/* Update affiliations as they change */}
              <div className="mt-8 pt-6 border-t border-beige/60">
                <h3 className="font-serif text-lg font-bold text-espresso mb-4">
                  Current Affiliations
                </h3>
                <ul className="space-y-3 text-sm text-warm-gray">
                  <li className="flex gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-1.5 shrink-0" />
                    <span>University of Manchester</span>
                  </li>
                </ul>
                <p className="text-xs text-warm-gray/60 mt-4 italic">
                  Affiliations are updated as they change.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* University */}
        <div className="mt-16 pt-12 border-t border-beige/60">
          <div className="max-w-2xl">
            <h2 className="font-serif text-2xl font-bold text-espresso mb-4">
              Presented by the University of Manchester
            </h2>
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
