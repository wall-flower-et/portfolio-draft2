import { selectedWork } from '../data/projects'
import { useReveal } from '../hooks/useReveal'
import Folder from './Folder'
import ProjectFolder from './ProjectFolder'

export default function Work() {
  const [ref, visible] = useReveal(0.1)

  return (
    <section id="work">
      {/* Section header */}
      <div className="flex items-start" style={{ gap: 'clamp(8px, 0.93vw, 16px)', marginBottom: 'clamp(20px, 2.33vw, 40px)' }}>
        <div className="shrink-0">
          <Folder style={{ width: 'clamp(40px, 4.07vw, 70px)', aspectRatio: '213 / 182' }} />
        </div>
        <div>
          <h2 className="font-medium font-body text-primary" style={{ fontSize: 'clamp(20px, 1.86vw, 32px)', lineHeight: '1.33', letterSpacing: '-1px' }}>
            Selected Work
          </h2>
          <p className="font-medium font-body text-secondary" style={{ fontSize: 'clamp(14px, 1.16vw, 20px)', lineHeight: '1.33', letterSpacing: '-1px' }}>
            AI products, honest process, real constraints
          </p>
        </div>
      </div>

      {/* Project folders */}
      <div
        ref={ref}
        className={`flex flex-wrap justify-center reveal ${visible ? 'visible' : ''}`}
        style={{ gap: 'clamp(80px, 9.26vw, 160px)', rowGap: 'clamp(40px, 4.63vw, 80px)', marginTop: 'clamp(-20px, -2.33vw, -40px)' }}
      >
        {selectedWork.map((project) => (
          <ProjectFolder key={project.slug} project={project} width="clamp(144px, 16.67vw, 288px)" />
        ))}
      </div>
    </section>
  )
}
