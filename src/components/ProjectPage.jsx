import { useParams, useNavigate, Link } from 'react-router-dom'
import { selectedWork, proofProject } from '../data/projects'
import { useReveal } from '../hooks/useReveal'
import Media from './Media'

const allProjects = [...selectedWork, proofProject]

// ——— Shared primitives ———

function ImgBlock({ src, alt, aspect = 'aspect-[4/3]' }) {
  return (
    <div className={`${aspect} bg-surface border border-border-medium rounded-md overflow-hidden`}>
      <Media src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  )
}

function SectionHeading({ number, title }) {
  return (
    <div style={{ marginBottom: 'clamp(16px, 1.85vw, 32px)' }}>
      {number && <p className="font-body text-secondary" style={{ fontSize: 'clamp(10px, 0.81vw, 14px)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>{number}</p>}
      <h2 className="font-medium font-body text-primary" style={{ fontSize: 'clamp(18px, 1.62vw, 28px)', lineHeight: '1.33', letterSpacing: '-0.5px' }}>{title}</h2>
    </div>
  )
}

function RevealSection({ children }) {
  const [ref, visible] = useReveal(0.1)
  return <section ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>{children}</section>
}

// ——— Block renderers ———

function TextBlock({ number, title, text }) {
  return (
    <RevealSection>
      {title && <SectionHeading number={number} title={title} />}
      <p className="font-medium font-body text-primary" style={{ fontSize: 'clamp(14px, 1.28vw, 22px)', lineHeight: '1.8', letterSpacing: '-0.5px', maxWidth: '640px' }}>{text}</p>
    </RevealSection>
  )
}

function ImageBlockRenderer({ number, title, src, caption }) {
  return (
    <RevealSection>
      {title && <SectionHeading number={number} title={title} />}
      <ImgBlock src={src} alt={title || 'Project image'} aspect="aspect-video" />
      {caption && <p className="font-body text-secondary" style={{ fontSize: 'clamp(10px, 0.75vw, 13px)', marginTop: '8px' }}>{caption}</p>}
    </RevealSection>
  )
}

function TextImageBlock({ number, title, text, image }) {
  return (
    <RevealSection>
      {title && <SectionHeading number={number} title={title} />}
      <div className="flex flex-col md:flex-row" style={{ gap: 'clamp(20px, 2.33vw, 40px)' }}>
        <p className="flex-1 font-medium font-body text-primary" style={{ fontSize: 'clamp(14px, 1.28vw, 22px)', lineHeight: '1.8', letterSpacing: '-0.5px' }}>{text}</p>
        <div className="flex-1"><ImgBlock src={image} alt={title || 'Project image'} /></div>
      </div>
    </RevealSection>
  )
}

function ImageGridBlock({ images = [], aspect }) {
  const cols = images.length <= 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'
  const ar = aspect ? `aspect-[${aspect}]` : 'aspect-[4/3]'
  return (
    <RevealSection>
      <div className={`grid ${cols}`} style={{ gap: 'clamp(12px, 1.39vw, 24px)' }}>
        {images.map((img, i) => <ImgBlock key={i} src={img} alt={`Image ${i + 1}`} aspect={ar} />)}
      </div>
    </RevealSection>
  )
}

function ListBlock({ title, items = [] }) {
  return (
    <RevealSection>
      <div className="border-t border-border-medium" style={{ paddingTop: 'clamp(24px, 2.78vw, 48px)' }}>
        {title && <h3 className="font-medium font-body text-primary" style={{ fontSize: 'clamp(14px, 1.16vw, 20px)', marginBottom: 'clamp(16px, 1.85vw, 32px)' }}>{title}</h3>}
        <div className="flex flex-col" style={{ gap: 'clamp(12px, 1.39vw, 24px)' }}>
          {items.map((t, i) => (
            <div key={i} className="flex items-start" style={{ gap: 'clamp(8px, 0.93vw, 16px)' }}>
              <span className="font-display text-primary shrink-0" style={{ fontSize: 'clamp(20px, 2.33vw, 40px)', lineHeight: '1', opacity: 0.2 }}>{String(i + 1).padStart(2, '0')}</span>
              <p className="font-medium font-body text-primary" style={{ fontSize: 'clamp(12px, 1.05vw, 18px)', lineHeight: '1.6', letterSpacing: '-0.5px' }}>{t}</p>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  )
}

function CardsBlock({ number, title, items = [] }) {
  return (
    <RevealSection>
      {title && <SectionHeading number={number} title={title} />}
      {items.map((d, i) => (
        <div key={i} className="border-t border-border-medium" style={{ padding: 'clamp(16px, 1.85vw, 32px) 0' }}>
          <h3 className="font-medium font-body text-primary" style={{ fontSize: 'clamp(14px, 1.16vw, 20px)', marginBottom: '6px' }}>{d.title}</h3>
          <p className="font-body text-secondary" style={{ fontSize: 'clamp(12px, 1.05vw, 18px)', lineHeight: '1.6' }}>{d.text}</p>
        </div>
      ))}
    </RevealSection>
  )
}

function MetricsBlock({ number, title, items = [] }) {
  return (
    <RevealSection>
      {title && <SectionHeading number={number} title={title} />}
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {items.map((r, i) => (
          <div key={i} className="text-center border-t border-border-medium" style={{ padding: 'clamp(16px, 1.85vw, 32px) 0' }}>
            <p className="font-display text-primary" style={{ fontSize: 'clamp(32px, 4.07vw, 70px)', lineHeight: '1', marginBottom: 'clamp(4px, 0.46vw, 8px)' }}>{r.metric}</p>
            <p className="font-medium font-body text-primary" style={{ fontSize: 'clamp(12px, 1.05vw, 18px)', marginBottom: '2px' }}>{r.label}</p>
            <p className="font-body text-secondary" style={{ fontSize: 'clamp(10px, 0.75vw, 13px)' }}>{r.note}</p>
          </div>
        ))}
      </div>
    </RevealSection>
  )
}

function EmbedBlock({ number, title, url, caption, aspectRatio = '16/9' }) {
  return (
    <RevealSection>
      {title && <SectionHeading number={number} title={title} />}
      <div className="border border-border-medium rounded-md overflow-hidden" style={{ aspectRatio, background: '#000' }}>
        <iframe src={url} title={title || 'Embed'} className="w-full h-full border-0" allowFullScreen allow="autoplay; fullscreen" loading="lazy" />
      </div>
      {caption && <p className="font-body text-secondary" style={{ fontSize: 'clamp(10px, 0.75vw, 13px)', marginTop: '8px' }}>{caption}</p>}
    </RevealSection>
  )
}

function BlockRenderer({ block }) {
  switch (block.type) {
    case 'text': return <TextBlock {...block} />
    case 'image': return <ImageBlockRenderer {...block} />
    case 'text-image': return <TextImageBlock {...block} />
    case 'image-grid': return <ImageGridBlock {...block} />
    case 'list': return <ListBlock {...block} />
    case 'cards': return <CardsBlock {...block} />
    case 'metrics': return <MetricsBlock {...block} />
    case 'embed': return <EmbedBlock {...block} />
    default: return null
  }
}

// ——— Navigation ———

function PrevNextNav({ prev, next }) {
  const navigate = useNavigate()
  return (
    <div className="border-t border-border-medium flex justify-between" style={{ marginTop: 'clamp(48px, 5.56vw, 96px)', paddingTop: 'clamp(24px, 2.78vw, 48px)' }}>
      <button onClick={() => navigate(`/project/${prev.slug}`)} aria-label={`Previous project: ${prev.title}`} className="font-medium font-body text-secondary hover:text-primary transition-colors" style={{ fontSize: 'clamp(12px, 0.93vw, 16px)', minHeight: '44px' }}>&larr; {prev.title}</button>
      <button onClick={() => navigate(`/project/${next.slug}`)} aria-label={`Next project: ${next.title}`} className="font-medium font-body text-secondary hover:text-primary transition-colors" style={{ fontSize: 'clamp(12px, 0.93vw, 16px)', minHeight: '44px' }}>{next.title} &rarr;</button>
    </div>
  )
}

// ——— Full project page (blocks-based) ———

function FullProjectPage({ project }) {
  const idx = allProjects.findIndex(p => p.slug === project.slug)
  const prev = allProjects[(idx - 1 + allProjects.length) % allProjects.length]
  const next = allProjects[(idx + 1) % allProjects.length]
  const { meta, blocks = [] } = project

  return (
    <div style={{ paddingTop: 'clamp(24px, 2.78vw, 48px)' }}>
      <Link to="/" className="inline-flex items-center font-medium font-body text-secondary hover:text-primary transition-colors" style={{ fontSize: 'clamp(12px, 0.93vw, 16px)', minHeight: '44px', marginBottom: 'clamp(16px, 1.85vw, 32px)' }}>&larr; All projects</Link>
      <h1 className="font-display text-primary" style={{ fontSize: 'clamp(36px, 5.23vw, 90px)', lineHeight: '1', letterSpacing: '-1px', marginBottom: 'clamp(8px, 0.93vw, 16px)' }}>{project.title.toUpperCase()}</h1>
      <p className="font-medium font-body text-secondary" style={{ fontSize: 'clamp(14px, 1.39vw, 24px)', lineHeight: '1.5', letterSpacing: '-0.5px', marginBottom: 'clamp(20px, 2.33vw, 40px)', maxWidth: '640px' }}>{project.subtitle}</p>
      {meta && (
        <div className="flex flex-wrap" style={{ gap: 'clamp(16px, 2.33vw, 40px)', marginBottom: 'clamp(32px, 3.70vw, 64px)' }}>
          {Object.entries(meta).map(([key, val]) => (
            <div key={key}>
              <p className="font-medium font-body text-secondary" style={{ fontSize: 'clamp(10px, 0.81vw, 14px)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>{key}</p>
              <p className="font-medium font-body text-primary" style={{ fontSize: 'clamp(14px, 1.16vw, 20px)', letterSpacing: '-0.5px' }}>{val}</p>
            </div>
          ))}
        </div>
      )}
      <ImgBlock src={project.hero} alt={project.title} aspect="aspect-video" />
      <div className="flex flex-col" style={{ gap: 'clamp(48px, 5.56vw, 96px)', marginTop: 'clamp(48px, 5.56vw, 96px)' }}>
        {blocks.map((block, i) => <BlockRenderer key={i} block={block} />)}
      </div>
      <PrevNextNav prev={prev} next={next} />
    </div>
  )
}

// ——— Proof page (simpler layout, unchanged) ———

function ProofPage() {
  const p = proofProject
  const idx = allProjects.findIndex(pr => pr.slug === p.slug)
  const prev = allProjects[(idx - 1 + allProjects.length) % allProjects.length]
  const next = allProjects[(idx + 1) % allProjects.length]
  return (
    <div style={{ paddingTop: 'clamp(24px, 2.78vw, 48px)' }}>
      <Link to="/" className="inline-flex items-center font-medium font-body text-secondary hover:text-primary transition-colors" style={{ fontSize: 'clamp(12px, 0.93vw, 16px)', minHeight: '44px', marginBottom: 'clamp(16px, 1.85vw, 32px)' }}>&larr; All projects</Link>
      <h1 className="font-display text-primary" style={{ fontSize: 'clamp(36px, 5.23vw, 90px)', lineHeight: '1', marginBottom: 'clamp(8px, 0.93vw, 16px)' }}>{p.title.toUpperCase()}</h1>
      <p className="font-medium font-body text-secondary" style={{ fontSize: 'clamp(14px, 1.39vw, 24px)', marginBottom: 'clamp(32px, 3.70vw, 64px)' }}>{p.subtitle}</p>
      <ImgBlock src={p.hero} alt={p.title} aspect="aspect-video" />
      <div className="flex flex-col md:flex-row" style={{ gap: 'clamp(24px, 2.78vw, 48px)', margin: 'clamp(32px, 3.70vw, 64px) 0' }}>
        <div className="flex-1">
          <p className="font-medium font-body text-secondary" style={{ fontSize: 'clamp(10px, 0.81vw, 14px)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Problem</p>
          <p className="font-medium font-body text-primary" style={{ fontSize: 'clamp(14px, 1.28vw, 22px)', lineHeight: '1.6' }}>{p.problem}</p>
        </div>
        <div className="flex-1">
          <p className="font-medium font-body text-secondary" style={{ fontSize: 'clamp(10px, 0.81vw, 14px)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Insight</p>
          <p className="font-medium font-body text-primary" style={{ fontSize: 'clamp(14px, 1.28vw, 22px)', lineHeight: '1.6' }}>{p.insight}</p>
        </div>
      </div>
      <div className="grid grid-cols-3" style={{ gap: 'clamp(12px, 1.39vw, 24px)', marginBottom: 'clamp(32px, 3.70vw, 64px)' }}>
        {p.screens.map((src, i) => <ImgBlock key={i} src={src} alt={`Screen ${i + 1}`} aspect="aspect-[1/2]" />)}
      </div>
      <div className="border-t border-border-medium" style={{ paddingTop: 'clamp(16px, 1.85vw, 32px)' }}>
        <p className="font-medium font-body text-secondary" style={{ fontSize: 'clamp(10px, 0.81vw, 14px)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Outcome</p>
        <p className="font-medium font-body text-primary" style={{ fontSize: 'clamp(14px, 1.28vw, 22px)', lineHeight: '1.6', maxWidth: '640px' }}>{p.outcome}</p>
      </div>
      <PrevNextNav prev={prev} next={next} />
    </div>
  )
}

export default function ProjectPage() {
  const { slug } = useParams()
  if (slug === proofProject.slug) return <ProofPage />
  const project = selectedWork.find(p => p.slug === slug)
  if (!project) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-medium font-body text-primary" style={{ fontSize: '20px', marginBottom: '12px' }}>Project not found</h1>
        <Link to="/" className="font-body text-secondary hover:text-primary">&larr; Back home</Link>
      </div>
    </div>
  )
  return <FullProjectPage project={project} />
}
