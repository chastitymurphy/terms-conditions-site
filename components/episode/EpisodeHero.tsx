import { Episode } from '@/lib/types'
import { Reveal, MaskLine } from '@/components/Reveal'
import TopicTag from './TopicTag'

export default function EpisodeHero({ ep }: { ep: Episode }) {
  const fmtDate = ep.publishedAt
    ? new Date(ep.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : 'Coming soon'
  return (
    <header className="pt-36 pb-20 bg-espresso relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-8 bg-copper/60" />
          <span className="text-xs font-sans uppercase tracking-[0.2em] text-copper/80">
            Episode {String(ep.episodeNumber ?? 0).padStart(2, '0')}
          </span>
        </div>
        <TopicTag topics={ep.topics} className="text-copper/80 mb-4" />
        <h1 className="font-serif text-4xl lg:text-6xl font-bold text-cream mb-6 max-w-3xl leading-tight">
          <MaskLine>{ep.title}</MaskLine>
        </h1>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-beige/70 mb-8">
          {ep.guest && (
            <span>
              with <span className="text-cream font-medium">{ep.guest}</span>
              {ep.guestTitle ? `, ${ep.guestTitle}` : ''}
            </span>
          )}
          <span>{fmtDate}</span>
          {ep.duration && <span>{ep.duration}</span>}
        </div>
        {ep.heroQuestion && (
          <p className="font-serif italic text-xl lg:text-2xl text-beige/80 max-w-2xl leading-relaxed">
            <Reveal>{ep.heroQuestion}</Reveal>
          </p>
        )}
        <div className="flex flex-wrap gap-3 mt-10">
          {(ep.audioEmbed || ep.videoEmbed || ep.spotifyUrl || ep.youtubeId) && (
            <a href="#listen" className="btn-primary text-sm px-6 py-3">Listen</a>
          )}
          {(ep.videoEmbed || ep.youtubeId) && (
            <a href="#listen" className="text-sm border border-copper/40 text-beige px-6 py-3 rounded-full hover:bg-copper/10 transition-colors">Watch</a>
          )}
          {ep.transcript && (
            <a href="#transcript" className="text-sm border border-copper/40 text-beige px-6 py-3 rounded-full hover:bg-copper/10 transition-colors">Read</a>
          )}
        </div>
      </div>
    </header>
  )
}
