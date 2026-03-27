import { useNavigate } from 'react-router-dom'
import { projects } from '../data/projects'
import { useReveal } from '../hooks/useReveal'

function ProjectThumb({ project, index }) {
  const navigate = useNavigate()
  const [ref, visible] = useReveal(0.1)

  return (
    <article
      ref={ref}
      onClick={() => navigate(`/project/${project.slug}`)}
      className={`project-item cursor-pointer group fade-in ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/project/${project.slug}`)}
    >
      <div className="bg-mat p-2.5 sm:p-3 mb-3 transition-colors duration-300 group-hover:bg-mat-hover">
        <img
          src={project.thumbnail}
          alt={`${project.title} — ${project.subtitle}`}
          className="w-full aspect-[4/3] object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[14px] font-medium text-ink leading-snug group-hover:underline underline-offset-4 decoration-ink-tertiary">
            {project.title}
          </h3>
          <p className="text-[13px] text-ink-secondary mt-0.5 leading-relaxed">
            {project.subtitle}
          </p>
        </div>
        <p className="text-[12px] text-ink-tertiary hidden sm:block whitespace-nowrap pt-0.5 font-mono shrink-0">
          {project.tags.join(' · ')}
        </p>
      </div>
    </article>
  )
}

export default function Work() {
  return (
    <section id="work" className="px-6 pt-10 pb-16 md:pt-14 md:pb-24 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-10 md:gap-x-6 md:gap-y-12">
        {projects.map((project, i) => (
          <ProjectThumb key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
