import { Link } from 'react-router-dom'
import { experiments } from '../data/projects'
import { useReveal } from '../hooks/useReveal'

function ExpThumb({ exp, index, visible }) {
  return (
    <div
      className={`fade-in ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="bg-mat p-2.5 sm:p-3 mb-2.5">
        <img
          src={exp.image}
          alt={`${exp.title} — ${exp.tags.join(', ')}`}
          className="w-full aspect-square object-cover"
          loading="lazy"
        />
      </div>
      <p className="text-[13px] font-medium text-ink leading-snug">{exp.title}</p>
      <p className="text-[12px] text-ink-tertiary font-mono mt-0.5">
        {exp.tags.join(' · ')}
      </p>
    </div>
  )
}

export default function Experiments() {
  const [ref, visible] = useReveal(0.1)
  const preview = experiments.slice(0, 4)

  return (
    <section id="experiments" ref={ref} className="px-6 py-16 md:py-24 max-w-4xl mx-auto">
      <div className={`border-t border-border pt-12 md:pt-16 fade-in ${visible ? 'visible' : ''}`}>
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <p className="text-[15px] font-medium text-ink">Experiments</p>
            <p className="text-[13px] text-ink-secondary mt-0.5">
              Physical installations, creative coding, cables &amp; breadboards
            </p>
          </div>
          <Link
            to="/experiments"
            className="text-[13px] text-ink-secondary hover:text-ink transition-colors whitespace-nowrap"
          >
            View all ({experiments.length}) &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-6 md:gap-x-5 md:gap-y-8">
          {preview.map((exp, i) => (
            <ExpThumb key={exp.title} exp={exp} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}
