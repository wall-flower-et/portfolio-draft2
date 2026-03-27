import { useParams, useNavigate, Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { useReveal } from '../hooks/useReveal'

function MetaItem({ label, value }) {
  return (
    <div>
      <p className="text-[12px] text-ink-tertiary uppercase tracking-wider font-mono mb-0.5">{label}</p>
      <p className="text-[14px] text-ink">{value}</p>
    </div>
  )
}

function SectionLabel({ number, title }) {
  return (
    <div className="mb-5 md:mb-6">
      <p className="text-[12px] text-ink-tertiary uppercase tracking-wider font-mono mb-1">{number}</p>
      <h2 className="text-lg md:text-xl font-medium text-ink">{title}</h2>
    </div>
  )
}

function ImageBlock({ src, alt, aspect = 'aspect-[4/3]' }) {
  return (
    <div className={`${aspect} rounded-lg overflow-hidden`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
    </div>
  )
}

function InsightRow({ number, text }) {
  return (
    <div className="flex gap-3 items-start">
      <span className="text-[13px] text-ink-tertiary font-mono shrink-0 pt-0.5">{number}</span>
      <p className="text-[14px] text-ink leading-relaxed">{text}</p>
    </div>
  )
}

function ResultCard({ metric, label, note }) {
  return (
    <div className="text-center py-6 border-t border-border">
      <p className="text-2xl md:text-3xl font-medium text-ink mb-1">{metric}</p>
      <p className="text-[14px] text-ink mb-0.5">{label}</p>
      <p className="text-[12px] text-ink-tertiary">{note}</p>
    </div>
  )
}

function RevealSection({ children }) {
  const [ref, visible] = useReveal(0.1)
  return (
    <section ref={ref} className={`fade-in ${visible ? 'visible' : ''}`}>
      {children}
    </section>
  )
}

export default function ProjectPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const project = projects.find((p) => p.slug === slug)
  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length]
  const nextProject = projects[(currentIndex + 1) % projects.length]

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-lg font-medium text-ink mb-3">Project not found</h1>
          <Link to="/" className="text-[13px] text-ink-secondary hover:text-ink transition-colors">&larr; Back home</Link>
        </div>
      </div>
    )
  }

  const { sections, meta } = project

  return (
    <div className="pt-20 md:pt-24 pb-16 md:pb-24 max-w-4xl mx-auto px-6">
      <Link to="/" className="inline-flex items-center gap-1 text-[13px] text-ink-secondary hover:text-ink transition-colors py-2 -my-2 mb-8">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
        All projects
      </Link>

      <div className="mb-10 md:mb-12">
        <h1 className="text-2xl md:text-3xl font-medium text-ink mb-2">{project.title}</h1>
        <p className="text-[15px] text-ink-secondary mb-6">{project.subtitle}</p>
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <MetaItem label="Role" value={meta.role} />
          <MetaItem label="Duration" value={meta.duration} />
          <MetaItem label="Team" value={meta.team} />
          <MetaItem label="Tools" value={meta.tools} />
        </div>
      </div>

      <div className="mb-16 md:mb-20">
        <ImageBlock src={project.hero} alt={`${project.title} — overview`} aspect="aspect-video" />
      </div>

      <div className="flex flex-col gap-16 md:gap-20">
        <RevealSection>
          <SectionLabel number="01" title="The Problem" />
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <p className="flex-1 text-[15px] text-ink leading-relaxed">{sections.problem.text}</p>
            <div className="flex-1">
              <ImageBlock src={sections.problem.image} alt={`${project.title} — problem context`} />
            </div>
          </div>
        </RevealSection>

        <RevealSection>
          <SectionLabel number="02" title="Research" />
          <p className="text-[15px] text-ink leading-relaxed mb-8">{sections.research.text}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {sections.research.images.map((img, i) => (
              <ImageBlock key={i} src={img} alt={`${project.title} — research artifact ${i + 1}`} />
            ))}
          </div>
          <div className="border-t border-border pt-8">
            <h3 className="text-[15px] font-medium text-ink mb-5">Key Insights</h3>
            <div className="flex flex-col gap-4">
              {sections.research.insights.map((insight, i) => (
                <InsightRow key={i} number={String(i + 1).padStart(2, '0')} text={insight} />
              ))}
            </div>
          </div>
        </RevealSection>

        <RevealSection>
          <SectionLabel number="03" title="Design Process" />
          <p className="text-[15px] text-ink leading-relaxed mb-8">{sections.process.text}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sections.process.images.map((img, i) => (
              <ImageBlock key={i} src={img} alt={`${project.title} — process ${i + 1}`} />
            ))}
          </div>
        </RevealSection>

        <RevealSection>
          <SectionLabel number="04" title="Design Decisions" />
          <div className="flex flex-col gap-0">
            {sections.decisions.map((d, i) => (
              <div key={i} className="border-t border-border py-5">
                <h3 className="text-[15px] font-medium text-ink mb-1.5">{d.title}</h3>
                <p className="text-[13px] text-ink-secondary leading-relaxed">{d.text}</p>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection>
          <SectionLabel number="05" title="Final Design" />
          <div className="mb-5">
            <ImageBlock src={sections.final.hero} alt={`${project.title} — final overview`} aspect="aspect-video" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {sections.final.screens.map((img, i) => (
              <ImageBlock key={i} src={img} alt={`${project.title} — screen ${i + 1}`} aspect="aspect-[3/4]" />
            ))}
          </div>
        </RevealSection>

        <RevealSection>
          <SectionLabel number="06" title="Results" />
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {sections.results.map((r, i) => (
              <ResultCard key={i} {...r} />
            ))}
          </div>
        </RevealSection>

        <RevealSection>
          <SectionLabel number="07" title="Reflection" />
          <p className="text-[15px] text-ink leading-relaxed max-w-2xl">{sections.reflection}</p>
        </RevealSection>

        <div className="border-t border-border pt-8 flex flex-wrap justify-between gap-4">
          <button
            onClick={() => navigate(`/project/${prevProject.slug}`)}
            className="text-[13px] text-ink-secondary hover:text-ink transition-colors py-2"
          >
            &larr; {prevProject.title}
          </button>
          <button
            onClick={() => navigate(`/project/${nextProject.slug}`)}
            className="text-[13px] text-ink-secondary hover:text-ink transition-colors py-2"
          >
            {nextProject.title} &rarr;
          </button>
        </div>
      </div>
    </div>
  )
}
