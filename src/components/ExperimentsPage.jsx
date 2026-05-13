import { Link } from 'react-router-dom'
import { experiments } from '../data/projects'
import { useReveal } from '../hooks/useReveal'
import Media from './Media'

function ExpCard({ exp, index }) {
  const [ref, visible] = useReveal(0.1)

  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${index * 60}ms` }}>
      <div
        className="bg-surface border border-border-medium rounded-lg overflow-hidden mb-3 transition-colors duration-300 hover:bg-surface-muted"
        style={{ padding: 'clamp(6px, 0.52vw, 9px)' }}
      >
        <div className="rounded-[16px] overflow-hidden bg-white">
          <Media src={exp.image} alt={`${exp.title} — ${exp.tags.join(', ')}`} className="w-full aspect-square object-cover" />
        </div>
      </div>
      <h3 className="font-medium font-body text-primary" style={{ fontSize: 'clamp(14px, 1.16vw, 20px)', letterSpacing: '-0.5px' }}>{exp.title}</h3>
      <p className="font-body text-secondary" style={{ fontSize: 'clamp(10px, 0.75vw, 13px)', marginTop: '2px', marginBottom: '6px' }}>{exp.tags.join(' · ')}</p>
      <p className="font-body text-secondary" style={{ fontSize: 'clamp(12px, 0.93vw, 16px)', lineHeight: '1.6' }}>{exp.description}</p>
    </div>
  )
}

export default function ExperimentsPage() {
  return (
    <div style={{ paddingTop: 'clamp(40px, 4.63vw, 80px)' }}>
      <Link
        to="/"
        className="inline-flex items-center font-medium font-body text-secondary hover:text-primary transition-colors"
        style={{ fontSize: 'clamp(12px, 0.93vw, 16px)', minHeight: '44px', marginBottom: 'clamp(16px, 1.85vw, 32px)' }}
      >
        &larr; Back
      </Link>

      <h1 className="font-display text-primary" style={{ fontSize: 'clamp(32px, 4.63vw, 80px)', lineHeight: '1', marginBottom: 'clamp(8px, 0.93vw, 16px)' }}>
        EXPERIMENTS
      </h1>
      <p className="font-medium font-body text-secondary" style={{ fontSize: 'clamp(14px, 1.16vw, 20px)', marginBottom: 'clamp(32px, 3.70vw, 64px)' }}>
        Physical installations, creative coding, cables &amp; breadboards
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3" style={{ gap: 'clamp(16px, 1.85vw, 32px)', rowGap: 'clamp(32px, 3.70vw, 64px)' }}>
        {experiments.map((exp, i) => (
          <ExpCard key={exp.title} exp={exp} index={i} />
        ))}
      </div>
    </div>
  )
}
