export default function TopicTag({ topics, className = '' }: { topics: string[]; className?: string }) {
  if (!topics.length) return null
  return (
    <p className={`font-sans text-xs font-semibold uppercase tracking-[0.25em] ${className}`}>
      {topics.map((t, i) => (
        <span key={t}>
          {i > 0 && <span className="text-copper mx-2">×</span>}
          {t}
        </span>
      ))}
    </p>
  )
}
