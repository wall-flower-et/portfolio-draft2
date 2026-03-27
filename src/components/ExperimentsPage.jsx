import { Link } from 'react-router-dom'
import { experiments } from '../data/projects'
import { useReveal } from '../hooks/useReveal'

function ExpCard({ exp, index }) {
  const [ref, visible] = useReveal(0.1)

  return (
    <div
      ref={ref}
      className={`fade-in ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="bg-mat p-2.5 sm:p-3 mb-3">
        <img
          src={exp.image}
          alt={`${exp.title} — ${exp.tags.join(', ')}`}
          className="w-full aspect-[4/5] object-cover"
          loading="lazy"
        />
      </div>
      <h3 className="text-[14px] font-medium text-ink leading-snug">{exp.title}</h3>
      <p className="text-[13px] text-ink-secondary mt-0.5 leading-relaxed">
        {exp.description}
      </p>
      <p className="text-[12px] text-ink-tertiary font-mono mt-1">
        {exp.tags.join(' · ')}
      </p>
    </div>
  )
}

export default function ExperimentsPage() {
  return (
    <div className="pt-20 md:pt-24 pb-16 md:pb-24 max-w-4xl mx-auto px-6">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-[13px] text-ink-secondary hover:text-ink transition-colors py-2 -my-2 mb-8"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back
      </Link>

      <div className="mb-10 md:mb-14">
        <h1 className="text-2xl md:text-3xl font-medium text-ink mb-1">
          Experiments ({experiments.length})
        </h1>
        <p className="text-[15px] text-ink-secondary">
          Physical installations, creative coding, cables &amp; breadboards
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10 md:gap-x-6 md:gap-y-12">
        {experiments.map((exp, i) => (
          <ExpCard key={exp.title} exp={exp} index={i} />
        ))}
      </div>
    </div>
  )
}
