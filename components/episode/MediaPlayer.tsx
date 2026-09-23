function toEmbed(url: string): string | null {
  let m = url.match(/youtube\.com\/watch\?v=([\w-]+)/)
  if (m) return `https://www.youtube.com/embed/${m[1]}`
  m = url.match(/youtu\.be\/([\w-]+)/)
  if (m) return `https://www.youtube.com/embed/${m[1]}`
  m = url.match(/youtube\.com\/embed\/([\w-]+)/)
  if (m) return url
  m = url.match(/open\.spotify\.com\/(episode|show|playlist)\/([\w]+)/)
  if (m) return url
  m = url.match(/spotify\.com\/(episode|show|playlist)\/([\w]+)/)
  if (m) return `https://open.spotify.com/embed/${m[1]}/${m[2]}`
  return null
}

export default function MediaPlayer({ audioEmbed, videoEmbed }: { audioEmbed?: string; videoEmbed?: string }) {
  const video = videoEmbed ? toEmbed(videoEmbed) : null
  const audio = audioEmbed ? toEmbed(audioEmbed) : null
  if (!video && !audio) return null
  return (
    <section id="listen" className="py-14 lg:py-16 bg-espresso">
      <div className="max-w-4xl mx-auto px-6 lg:px-10 space-y-6">
        {video && (
          <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
            <iframe src={video} className="w-full h-full" title="Episode video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        )}
        {audio && (
          <div className="rounded-xl overflow-hidden" style={{ height: video ? 152 : 232 }}>
            <iframe src={audio} className="w-full h-full" title="Episode audio" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
          </div>
        )}
      </div>
    </section>
  )
}
