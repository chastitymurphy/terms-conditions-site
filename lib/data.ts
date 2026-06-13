import { Episode, Reflection, Guest, Topic } from './types'

export const topics: Topic[] = [
  { slug: 'banking', label: 'Banking', description: 'Who controls the systems that hold and move money — and who gets left out.' },
  { slug: 'payments', label: 'Payments', description: 'The invisible rails under every swipe, tap, and transfer.' },
  { slug: 'financial-infrastructure', label: 'Financial Infrastructure', description: 'The plumbing of economic life: payment networks, clearing systems, and credit architecture.' },
  { slug: 'wealth', label: 'Wealth', description: 'How wealth is built, transferred, and blocked — and by whom.' },
  { slug: 'consumer-protection', label: 'Consumer Protection', description: 'The rules that govern what companies can take from you — and what they can get away with.' },
  { slug: 'ai-technology', label: 'AI & Technology', description: 'Algorithms deciding credit, insurance, and opportunity — often without explanation.' },
  { slug: 'privacy-surveillance', label: 'Privacy & Surveillance', description: 'Every transaction leaves a trace. Who owns it, and what they do with it.' },
  { slug: 'public-banking', label: 'Public Banking', description: 'The case for financial infrastructure as public infrastructure.' },
  { slug: 'financial-inclusion', label: 'Financial Inclusion', description: 'Why millions remain outside the financial system — and what it costs them.' },
  { slug: 'economic-democracy', label: 'Economic Democracy', description: 'Who gets a voice in the rules governing economic life.' },
]

export const episodes: Episode[] = [
  {
    slug: 'who-owns-the-payment-rails',
    title: 'Who Owns the Payment Rails?',
    guest: 'Dr. Sarah Chen',
    guestTitle: 'Senior Fellow, Payments Policy Institute',
    description: 'Every digital transaction travels across infrastructure owned by a handful of companies. We trace the history of payment networks, the concentration of power, and what a public alternative might look like.',
    longDescription: 'When you tap your card at the register, you probably think nothing of it. But that transaction crosses a network owned by one of two companies — Visa or Mastercard — that together process nearly $15 trillion in purchases every year. How did two private companies come to own the infrastructure of everyday economic life? And what would it mean to build something different?',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    youtubeId: 'dQw4w9WgXcQ',
    publishedAt: '2026-05-28',
    duration: '58 min',
    topics: ['payments', 'financial-infrastructure', 'public-banking'],
    takeaways: [
      'Visa and Mastercard together control roughly 80% of U.S. card transaction volume.',
      'Interchange fees — paid by merchants — average 2–3% and are largely invisible to consumers.',
      'Several countries have built public payment systems that charge a fraction of private network fees.',
      'The Federal Reserve\'s FedNow system is a partial step toward public payment infrastructure.',
    ],
    resources: [
      { title: 'The Payments System', author: 'David Birch', type: 'book', description: 'A comprehensive history of how money moves.' },
      { title: 'FedNow Service', type: 'organization', url: 'https://www.frbservices.org/financial-services/fednow', description: 'The Federal Reserve\'s instant payment service.' },
    ],
    transcript: 'Coming soon.',
  },
  {
    slug: 'the-unbanked-and-underbanked',
    title: 'The Unbanked and the Underbanked',
    guest: 'Marcus Williams',
    guestTitle: 'Director of Financial Equity, National Consumer Law Center',
    description: 'An estimated 5.9 million U.S. households have no bank account. We examine why, who bears the cost, and what policy can do.',
    longDescription: 'Being unbanked is expensive. Check cashing fees, money order costs, and payday loan interest drain hundreds of dollars each year from households that can least afford it. We examine the history of banking exclusion, the structural reasons it persists, and the policy proposals — from postal banking to public fintech — that could change it.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    publishedAt: '2026-04-14',
    duration: '52 min',
    topics: ['banking', 'financial-inclusion', 'wealth'],
    takeaways: [
      'FDIC data shows 5.9 million U.S. households were unbanked in 2023.',
      'Unbanked households pay an average of $1,000+ per year in fees to access basic financial services.',
      'Redlining and discriminatory banking practices created structural exclusion that persists today.',
      'Postal banking proposals would use existing USPS infrastructure to provide basic accounts.',
    ],
    resources: [
      { title: 'FDIC National Survey of Unbanked and Underbanked Households', type: 'report', url: 'https://www.fdic.gov/research/household-survey/', description: 'Annual data on household banking status.' },
    ],
    transcript: 'Coming soon.',
  },
  {
    slug: 'your-credit-score-a-short-history',
    title: 'Your Credit Score: A Short History',
    guest: 'Prof. Keeanga-Yamahtta Taylor',
    guestTitle: 'Professor of African American Studies, Northwestern University',
    description: 'Credit scoring was designed to remove human bias from lending decisions. Instead, it encoded structural inequality into an algorithm. We trace the history.',
    longDescription: 'The FICO score was introduced in 1989 as a way to make lending objective. The theory: replace a banker\'s subjective judgment with a number derived from payment history, debt levels, and length of credit history. In practice, the algorithm reproduced many of the same inequities it was meant to eliminate — and added new ones.',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80',
    publishedAt: '2026-03-03',
    duration: '61 min',
    topics: ['banking', 'financial-infrastructure', 'wealth', 'ai-technology'],
    takeaways: [
      'The FICO score was standardized by Fannie Mae and Freddie Mac in 1995, embedding it into the mortgage market.',
      'Median credit scores differ significantly by race — largely due to wealth gaps, not individual behavior.',
      'Alternative credit data (rent, utilities) could help some consumers but raises new privacy concerns.',
      'The CFPB has proposed rules requiring credit bureaus to remove medical debt from credit reports.',
    ],
    resources: [],
    transcript: 'Coming soon.',
  },
]

export const reflections: Reflection[] = [
  {
    slug: 'the-infrastructure-we-dont-see',
    title: 'The Infrastructure We Don\'t See',
    subtitle: 'On payment networks, public goods, and why visibility matters',
    excerpt: 'The hidden plumbing of economic life was built by private actors to serve private interests. It\'s time to make it visible — and ask who it should serve.',
    content: `When the power goes out, you notice infrastructure. When the bridge is closed, you notice infrastructure. But the infrastructure that moves money is almost perfectly designed for invisibility — and that invisibility is, in part, the point.

Payment networks were not built to be seen. They were built to be used, without friction, without thought. The genius of the credit card network is precisely that you don't think about Visa when you tap your card. You think about the coffee, the book, the train ticket. The infrastructure disappears.

But invisibility has costs. When we can't see a system, we can't ask who built it, who owns it, and whose interests it serves. We can't ask why it costs what it costs, or why some people are excluded from it, or what would happen if it failed.

The United States has no public payments infrastructure in any meaningful sense. The systems that move the vast majority of American money — the networks that process debit cards, credit cards, and most digital payments — are owned by two private companies that together represent one of the most profitable duopolies in the history of American commerce.

This is not a natural outcome. It is a political one. The payment system as we know it was built through a series of decisions — by Congress, by regulators, by courts, and by industry — that could have gone differently. In other countries, they did go differently. Brazil built Pix. India built UPI. The European Union built SEPA. These are public systems, or systems built on public mandates, that process payments at a fraction of the cost of the American private network.

The question worth asking is not whether we could have built something different. We clearly could have. The question is what we would need to believe, and who would need to act, to build something different now.`,
    publishedAt: '2026-06-01',
    topic: 'financial-infrastructure',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    readingTime: '7 min read',
  },
  {
    slug: 'what-your-transaction-data-reveals',
    title: 'What Your Transaction Data Reveals',
    subtitle: 'The surveillance economy hiding in plain sight',
    excerpt: 'Your payment history is a diary you never agreed to write. The question is who gets to read it.',
    content: `Every financial transaction leaves a trace. Not just a record of the purchase — the amount, the merchant, the time — but a point in a pattern. Enough points, and a pattern becomes a portrait.

Payment companies, banks, data brokers, and advertisers have been assembling those portraits for decades. Your transaction history can reveal where you live, where you work, how you commute, who you spend time with, whether you're religious, whether you're pregnant, whether you're in financial distress, whether you're politically active.

None of this is secret. It's buried in terms and conditions — the fine print of agreements you clicked through to get a service you needed. The legal framework governing financial data in the United States is fragmented, outdated, and largely inadequate to the surveillance economy that has grown up around it.

The irony is that we built this surveillance infrastructure in the name of convenience. Stored card numbers meant you didn't have to re-enter your information. Transaction data meant better fraud detection. Behavioral data meant more relevant offers. Each individual feature is defensible. The aggregate is something else.

What the aggregate has built is an asymmetry of information so extreme that the companies holding your data know more about your financial life than you do. They can predict when you're about to switch banks, take out a loan, or go through a divorce — often before you've made any decision at all.

The question for policy is how to rebalance that asymmetry. Not by eliminating data collection — some of it serves genuine purposes — but by giving individuals meaningful rights over their own financial portraits. The right to see what's held. The right to correct it. The right to limit its use. The right, in some cases, to delete it entirely.`,
    publishedAt: '2026-04-22',
    topic: 'privacy-surveillance',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
    readingTime: '8 min read',
  },
  {
    slug: 'the-quiet-politics-of-credit',
    title: 'The Quiet Politics of Credit',
    subtitle: 'How lending decisions became a site of structural inequality',
    excerpt: 'Credit is not a neutral technology. It\'s a mechanism for distributing risk — and historically, that distribution has followed the lines of race and class.',
    content: `There is a version of the credit story that goes like this: lending used to be subjective and therefore discriminatory. The banker decided on instinct — and instinct, being human, was biased. Then along came the credit score, which reduced the lending decision to a number derived from behavior, not identity. The bias was removed.

This story is appealing because it suggests that discrimination can be solved by removing human judgment from the loop. But the credit score did not remove discrimination from lending. It obscured the mechanisms through which discrimination operates — making it harder to see, harder to challenge, and harder to remedy.

The FICO score was standardized in 1995, when Fannie Mae and Freddie Mac adopted it as the benchmark for mortgage underwriting. Within years, it had spread to auto loans, credit cards, rental applications, and insurance pricing. It became the number that determined whether you could buy a house, finance a car, or rent an apartment.

What the score measures is history — specifically, your history of accessing and managing credit. This seems neutral until you ask who was systematically denied access to credit for most of the twentieth century. Black Americans were excluded from FHA-backed mortgages under redlining. They were denied business loans at rates far exceeding their white counterparts. They were charged more for the same products through a system of dual pricing that persisted, openly and covertly, for decades.

The credit score did not create these gaps. But it did encode them. A number that purports to measure creditworthiness is, in practice, also measuring decades of exclusion.`,
    publishedAt: '2026-03-10',
    topic: 'wealth',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    readingTime: '9 min read',
  },
]

export const guests: Guest[] = [
  {
    slug: 'sarah-chen',
    name: 'Dr. Sarah Chen',
    title: 'Senior Fellow',
    organization: 'Payments Policy Institute',
    bio: 'Dr. Chen studies the political economy of payment systems, with a focus on the regulatory structures governing digital payments in the United States and abroad.',
    episodes: ['who-owns-the-payment-rails'],
  },
  {
    slug: 'marcus-williams',
    name: 'Marcus Williams',
    title: 'Director of Financial Equity',
    organization: 'National Consumer Law Center',
    bio: 'Marcus Williams leads research and advocacy on financial exclusion, with a focus on banking access, credit equity, and consumer financial protection.',
    episodes: ['the-unbanked-and-underbanked'],
  },
]

export function getEpisode(slug: string): Episode | undefined {
  return episodes.find(e => e.slug === slug)
}

export function getReflection(slug: string): Reflection | undefined {
  return reflections.find(r => r.slug === slug)
}

export function getGuest(slug: string): Guest | undefined {
  return guests.find(g => g.slug === slug)
}

export const SUBSTACK_URL = 'https://substack.com/@chastitymurphy'
export const PODCAST_TITLE = 'Terms & Conditions: The Fine Print'
export const PODCAST_DESCRIPTION = 'A podcast and publication exploring the financial infrastructure, technologies, institutions, and policies that shape economic life.'
export const HOST_NAME = 'Chastity Murphy'
export const PODCAST_EMAIL = 'hello@termsconditions.fm' // Update
export const SITE_URL = 'https://termsconditions.fm' // Update
