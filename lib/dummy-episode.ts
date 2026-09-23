import { Episode } from './types'

// Neutral placeholder episode for evaluating the episode-page template.
// Rendered ONLY on preview/development deployments (never production) —
// delete this file once the template has been approved.
export const DUMMY_EPISODE: Episode = {
  slug: 'episode-01-template-demo',
  title: 'Episode Title',
  guest: 'Guest Name',
  guestTitle: 'Guest Title',
  guestOrganization: 'Guest Organization',
  guestBio:
    'A short editorial biography of the guest goes here. It explains who they are, the institution they represent, and why their perspective matters for this conversation.',
  guestPhoto: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80',
  guestWebsite: 'https://example.com',
  description:
    'A short episode description used across cards and social previews. This placeholder stands in until real episode data is supplied.',
  longDescription: '',
  image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80',
  episodeNumber: 1,
  heroQuestion: 'Are we solving the problem — or just learning to live with it?',
  fullIntroduction: [
    'This is where the editorial introduction lives: why this conversation matters, what larger system it investigates, and what listeners should pay attention to.',
    'A second short paragraph might name the stakes — the part of everyday economic life this episode makes visible — without pretending the system is simple.',
  ].join('\n\n'),
  publishedAt: '2026-01-01',
  duration: '42 min',
  topics: ['Money', 'Technology', 'Public Life'],
  takeaways: [
    "The system isn't neutral: short editorial explanation of the first takeaway goes here.",
    'Access is not the same as power: the second takeaway in one or two sentences.',
    'A third takeaway heading appears as a sentence-length claim, explained briefly beneath it.',
  ],
  timestamps: [
    { time: '00:00', label: 'Introduction' },
    { time: '04:30', label: 'Topic one' },
    { time: '12:45', label: 'Topic two' },
    { time: '21:10', label: 'Topic three' },
  ],
  finePrint: [
    { type: 'TERM', title: 'A term worth defining', body: 'A plain-language definition of the key concept this episode turns on.' },
    { type: 'CONTEXT', title: 'Historical context', body: 'Two or three sentences of institutional or historical background beneath the conversation.' },
    { type: 'DATA', title: 'A key statistic', body: 'The number that anchors the episode, and where it comes from.' },
  ],
  resources: [
    { title: 'A report worth reading', type: 'report', url: 'https://example.com', description: 'Why this report matters for understanding the system underneath the episode.' },
    { title: 'A book by the guest', type: 'book', author: 'Guest Name' },
  ],
  transcript: [
    "Chastity Murphy: Welcome to Terms & Conditions: The Fine Print. I'm Chastity Murphy.",
    "Guest Name: Thank you for having me. This is a conversation about the rules underneath the systems we use every day.",
    "Chastity Murphy: Let's start with the question in the title of this episode.",
  ].join('\n'),
  seoTitle: 'Episode 01 — Episode Title (Template Demo)',
  seoDescription: 'Template demo episode page. Not for publication.',
  status: 'recorded',
}
