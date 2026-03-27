import { useReveal } from '../hooks/useReveal'

export default function Hero() {
  const [ref, visible] = useReveal()

  return (
    <section ref={ref} className="px-6 pt-24 pb-6 md:pt-28 md:pb-8 max-w-4xl mx-auto">
      <div className={`fade-in ${visible ? 'visible' : ''}`}>
        <p className="text-[15px] text-ink-secondary leading-relaxed max-w-lg">
          Product designer and creative technologist based in New York.
          Bridging psychology, technology, and design.
        </p>
        <div className="flex items-center gap-1.5 mt-3">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          <span className="text-[12px] text-ink-secondary">Available for work</span>
        </div>
      </div>
    </section>
  )
}
