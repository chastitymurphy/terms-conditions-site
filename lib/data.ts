import { Topic } from './types'

// Consolidated editorial territory — six subject areas, not ten.
export const topics: Topic[] = [
  { slug: 'money-payments',     label: 'Money & Payments',          description: 'How money moves, who controls the rails, and what flows underneath every transaction.' },
  { slug: 'banking-infrastructure', label: 'Banking & Public Infrastructure', description: 'The institutions that hold money and the public systems that govern access to it.' },
  { slug: 'technology-ai',      label: 'Technology & AI',           description: 'Algorithms, automation, and artificial intelligence shaping financial and economic life.' },
  { slug: 'privacy-surveillance',label: 'Privacy & Surveillance',    description: 'Data trails, transaction records, and the systems that watch what we do.' },
  { slug: 'wealth-power',       label: 'Wealth & Economic Power',   description: 'How wealth is built, distributed, transferred, and blocked.' },
  { slug: 'democracy-institutions', label: 'Democracy & Public Institutions', description: 'Governance, public life, and the institutions that shape economic rules.' },
]

export const SUBSTACK_URL = 'https://substack.com/@chastitymurphy'
export const PODCAST_TITLE = 'Terms & Conditions: The Fine Print'
export const PODCAST_DESCRIPTION = 'Terms & Conditions is a podcast hosted by Chastity Murphy exploring the hidden systems behind money, technology, wealth, and public life.'
export const HOST_NAME = 'Chastity Murphy'
export const PODCAST_EMAIL = 'hello@termsconditions.fm'
export const SITE_URL = 'https://termsandconditionspod.com'
