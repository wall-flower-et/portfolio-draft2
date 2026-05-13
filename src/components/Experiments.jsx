import { Link } from 'react-router-dom'
import { experiments } from '../data/projects'
import { useReveal } from '../hooks/useReveal'
import Folder from './Folder'
import Media from './Media'

function ExpCard({ exp, index, visible }) {
  return (
    <div
      className={`reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div
        className="bg-surface border border-border-medium rounded-lg overflow-hidden mb-2 transition-colors duration-300 hover:bg-surface-muted"
        style={{ padding: 'clamp(6px, 0.52vw, 9px)' }}
      >
        <div className="rounded-[16px] overflow-hidden bg-white">
          <Media src={exp.image} alt={`${exp.title} — ${exp.tags.join(', ')}`} className="w-full aspect-square object-cover" />
        </div>
      </div>
      <p className="font-medium font-body text-primary" style={{ fontSize: 'clamp(12px, 0.93vw, 16px)', lineHeight: '1.33' }}>{exp.title}</p>
      <p className="font-body text-secondary" style={{ fontSize: 'clamp(10px, 0.75vw, 13px)', marginTop: '2px' }}>{exp.tags.join(' · ')}</p>
    </div>
  )
}

export default function Experiments() {
  const [ref, visible] = useReveal(0.1)

  return (
    <section id="experiments" ref={ref} style={{ padding: 'clamp(40px, 4.63vw, 80px) 0' }}>
      <div className={`border-t border-border-medium reveal ${visible ? 'visible' : ''}`} style={{ paddingTop: 'clamp(32px, 3.70vw, 64px)' }}>
        <div className="flex items-start justify-between" style={{ marginBottom: 'clamp(20px, 2.33vw, 40px)' }}>
          <div className="flex items-start" style={{ gap: 'clamp(8px, 0.93vw, 16px)' }}>
            <div className="shrink-0">
              <Folder style={{ width: 'clamp(40px, 4.07vw, 70px)', aspectRatio: '213 / 182' }} />
            </div>
            <div>
              <h2 className="font-medium font-body text-primary" style={{ fontSize: 'clamp(20px, 1.86vw, 32px)', lineHeight: '1.33', letterSpacing: '-1px' }}>
                Lab
              </h2>
              <p className="font-medium font-body text-secondary" style={{ fontSize: 'clamp(14px, 1.16vw, 20px)', lineHeight: '1.33', letterSpacing: '-1px' }}>
                Cables, breadboards, creative code
              </p>
            </div>
          </div>
          <Link
            to="/experiments"
            className="font-medium font-body text-secondary hover:text-primary transition-colors whitespace-nowrap flex items-center"
            style={{ fontSize: 'clamp(12px, 0.93vw, 16px)', minHeight: '44px' }}
          >
            View all ({experiments.length}) &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4" style={{ gap: 'clamp(12px, 1.16vw, 20px)', rowGap: 'clamp(20px, 2.33vw, 40px)' }}>
          {experiments.slice(0, 4).map((exp, i) => (
            <ExpCard key={exp.title} exp={exp} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}
