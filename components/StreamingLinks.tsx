// Streaming platform links with official brand logos
// Usage: <StreamingLinks dark /> or <StreamingLinks />

const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#1DB954">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
)

const ApplePodcastsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#9933CC">
    <path d="M12.003 0C5.374 0 0 5.374 0 12.003c0 6.628 5.374 12.003 12.003 12.003 6.628 0 12.003-5.375 12.003-12.003C24.006 5.374 18.63 0 12.003 0zm0 2.4c5.304 0 9.604 4.3 9.604 9.603 0 5.304-4.3 9.604-9.604 9.604-5.303 0-9.603-4.3-9.603-9.604C2.4 6.7 6.7 2.4 12.003 2.4zm-.036 2.403c-1.327 0-2.4 1.073-2.4 2.4s1.073 2.4 2.4 2.4c1.326 0 2.4-1.073 2.4-2.4s-1.074-2.4-2.4-2.4zm-.036 5.882c-2.591.058-4.68 2.147-4.68 4.75 0 1.26.487 2.407 1.285 3.263l-.663 2.485a.48.48 0 0 0 .468.603h7.254a.48.48 0 0 0 .468-.603l-.664-2.485c.8-.856 1.286-2.003 1.286-3.263 0-2.603-2.089-4.692-4.68-4.75h-.074z"/>
  </svg>
)

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#FF0000">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

const RSSIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#F26522">
    <path d="M19.199 24C19.199 13.467 10.533 4.8 0 4.8V0c13.165 0 24 10.835 24 24h-4.801zM3.291 17.415c1.814 0 3.293 1.479 3.293 3.295 0 1.813-1.485 3.29-3.301 3.29C1.47 24 0 22.526 0 20.71s1.475-3.294 3.291-3.295zM15.909 24h-4.665c0-6.169-5.075-11.245-11.244-11.245V8.09c8.727 0 15.909 7.184 15.909 15.91z"/>
  </svg>
)

const platforms = [
  {
    label: 'Spotify',
    href: 'https://open.spotify.com',
    Icon: SpotifyIcon,
    bg: 'hover:bg-[#1DB954]/10',
    border: 'hover:border-[#1DB954]/40',
  },
  {
    label: 'Apple Podcasts',
    href: 'https://podcasts.apple.com',
    Icon: ApplePodcastsIcon,
    bg: 'hover:bg-[#9933CC]/10',
    border: 'hover:border-[#9933CC]/40',
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    Icon: YouTubeIcon,
    bg: 'hover:bg-[#FF0000]/10',
    border: 'hover:border-[#FF0000]/30',
  },
  {
    label: 'RSS Feed',
    href: '/api/rss',
    Icon: RSSIcon,
    bg: 'hover:bg-[#F26522]/10',
    border: 'hover:border-[#F26522]/40',
  },
]

export default function StreamingLinks({ dark = false }: { dark?: boolean }) {
  const textColor = dark ? 'text-cream/70 hover:text-cream' : 'text-espresso/60 hover:text-espresso'
  const borderColor = dark ? 'border-white/15' : 'border-beige/60'
  const bgBase = dark ? 'bg-white/5' : 'bg-white/60'

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-5">
      <span className={`text-xs font-sans uppercase tracking-[0.2em] ${dark ? 'text-cream/35' : 'text-warm-gray'}`}>
        Listen on
      </span>
      {platforms.map(({ label, href, Icon, bg, border }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel="noopener noreferrer"
          className={`
            flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all duration-200
            ${bgBase} ${borderColor} ${bg} ${border} ${textColor}
          `}
        >
          <Icon />
          <span className="text-sm font-medium">{label}</span>
        </a>
      ))}
    </div>
  )
}
