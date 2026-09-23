// Renders a transcript as readable editorial text: lines beginning with
// "Speaker:" get a strong mono label; everything else is a normal paragraph.
export default function Transcript({ transcript, hostName }: { transcript: string; hostName: string }) {
  if (!transcript?.trim()) return null
  const lines = transcript.split('\n').map((l) => l.trim()).filter(Boolean)
  return (
    <section id="transcript" className="py-16 lg:py-24 bg-cream">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-8 bg-terracotta" />
          <span className="text-xs font-sans uppercase tracking-[0.2em] text-terracotta">Transcript</span>
        </div>
        <div className="max-w-prose">
          {lines.map((line, i) => {
            const m = line.match(/^([A-Za-z][A-Za-z .'&-]{0,60}):\s*(.+)$/)
            if (m) {
              const [, speaker, text] = m
              return (
                <div key={i} className="mb-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-terracotta mb-1">
                    {speaker === 'Chastity Murphy' || speaker === 'Chastity' ? hostName : speaker}
                  </p>
                  <p className="text-espresso/80 leading-relaxed">{text}</p>
                </div>
              )
            }
            return (
              <p key={i} className="text-espresso/80 leading-relaxed mb-5">{line}</p>
            )
          })}
        </div>
      </div>
    </section>
  )
}
