import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getEpisode, getEpisodes, getSiteSettings, getRelated } from '@/lib/contentful'
import { DUMMY_EPISODE } from '@/lib/dummy-episode'
import EpisodeHero from '@/components/episode/EpisodeHero'
import MediaPlayer from '@/components/episode/MediaPlayer'
import EditorialQuestion from '@/components/episode/EditorialQuestion'
import KeyTakeaways from '@/components/episode/KeyTakeaways'
import TimestampList from '@/components/episode/TimestampList'
import FinePrint from '@/components/episode/FinePrint'
import GuestProfile from '@/components/episode/GuestProfile'
import Resources from '@/components/episode/Resources'
import Transcript from '@/components/episode/Transcript'
import RelatedContent from '@/components/episode/RelatedContent'
import NewsletterCTA from '@/components/NewsletterCTA'

// Stepped edge: the upper section's color descends in equal steps into the lower color.
function StepperEdge({ lowerBg, upperFill }: { lowerBg: string; upperFill: string }) {
  return (
    <svg
      className="block w-full h-[64px]"
      style={{ background: lowerBg }}
      viewBox="0 0 1200 64"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,0 L1200,0 L1200,11 L1000,11 L1000,22 L800,22 L800,32 L600,32 L600,43 L400,43 L400,53 L0,53 Z"
        fill={upperFill}
      />
    </svg>
  )
}

// Draft episodes render ONLY on preview/development deployments.
const isPreviewBuild = () => process.env.VERCEL_ENV !== 'production'

interface Props { params: { slug: string } }

// Only generate static paths for published episodes (pre-launch: none yet)
export async function generateStaticParams() {
  const episodes = await getEpisodes()
  return episodes.map((ep) => ({ slug: ep.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ep = (await getEpisode(params.slug)) ?? (isPreviewBuild() && params.slug === DUMMY_EPISODE.slug ? DUMMY_EPISODE : undefined)
  if (!ep) return {}
  return {
    title: ep.seoTitle || ep.title,
    description: ep.seoDescription || ep.description,
    // Draft/template episodes must never be indexed or previewed socially.
    ...(ep.status !== 'published' ? { robots: { index: false, follow: false } } : {}),
  }
}

export default async function EpisodePage({ params }: Props) {
  const [ep, settings] = await Promise.all([getEpisode(params.slug, isPreviewBuild()), getSiteSettings()])
  const episode = ep ?? (isPreviewBuild() && params.slug === DUMMY_EPISODE.slug ? DUMMY_EPISODE : undefined)
  if (!episode) notFound()

  const isDraft = episode.status !== 'published'
  const related = await getRelated({ tags: episode.topics, excludeSlug: episode.slug })

  return (
    <>
      {isDraft && isPreviewBuild() && (
        <div className="bg-copper text-espresso text-center text-xs font-sans font-semibold uppercase tracking-[0.2em] py-2">
          Preview — draft episode, not public
        </div>
      )}
      <EpisodeHero ep={episode} />

      {episode.audioEmbed || episode.videoEmbed ? (
        <>
          <MediaPlayer audioEmbed={episode.audioEmbed} videoEmbed={episode.videoEmbed} />
          <StepperEdge lowerBg="#FAF7F0" upperFill="#2B3A52" />
        </>
      ) : (
        <StepperEdge lowerBg="#FAF7F0" upperFill="#2B3A52" />
      )}

      {episode.heroQuestion && (
        <EditorialQuestion
          question={episode.heroQuestion}
          paragraphs={episode.fullIntroduction ? episode.fullIntroduction.split(/\n\n+/) : undefined}
        />
      )}

      <KeyTakeaways takeaways={episode.takeaways} />

      <TimestampList timestamps={episode.timestamps} youtubeId={episode.youtubeId} />

      <FinePrint entries={episode.finePrint} />

      {episode.guest && <GuestProfile ep={episode} />}

      <Resources resources={episode.resources} />

      <Transcript transcript={episode.transcript ?? ''} hostName={settings.hostName} />

      <RelatedContent items={related} />

      <NewsletterCTA />
    </>
  )
}
