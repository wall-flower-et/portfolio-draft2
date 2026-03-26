import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Folder from './Folder'

function ProjectCard({ slug, image, title, description, tags = [] }) {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()

  return (
    <div
      className="bg-surface border border-border-medium rounded-lg shadow-card flex flex-col items-start overflow-hidden cursor-pointer"
      onClick={() => navigate(`/project/${slug}`)}
      style={{
        padding: 'clamp(6px, 0.52vw, 9px)',
        gap: 'clamp(5px, 0.46vw, 8px)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      <div className="flex-1 w-full rounded-[16px] overflow-hidden bg-white relative min-h-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-[16px]"
        />

        {/* Hover description overlay */}
        <div
          className="absolute inset-0 flex items-end rounded-[16px]"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        >
          <div
            className="w-full bg-white rounded-[12px] font-body text-primary"
            style={{
              margin: 'clamp(8px, 0.70vw, 12px)',
              padding: 'clamp(12px, 1.05vw, 18px)',
            }}
          >
            <p
              className="font-medium"
              style={{
                fontSize: 'clamp(13px, 1.05vw, 18px)',
                lineHeight: '1.33',
                letterSpacing: '-0.5px',
                marginBottom: 'clamp(4px, 0.35vw, 6px)',
              }}
            >
              {title}
            </p>
            <p
              className="text-secondary"
              style={{
                fontSize: 'clamp(10px, 0.76vw, 13px)',
                lineHeight: '1.5',
                letterSpacing: '-0.3px',
              }}
            >
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Tags row */}
      {tags.length > 0 && (
        <div
          className="flex items-center overflow-hidden w-full shrink-0"
          style={{ gap: 'clamp(5px, 0.46vw, 8px)' }}
        >
          {tags.map((tag, i) => (
            <div
              key={i}
              className="border border-border-light rounded-[8px] flex items-center justify-center overflow-hidden shrink-0"
              style={{ padding: 'clamp(4px, 0.35vw, 6px) clamp(6px, 0.58vw, 10px)' }}
            >
              <span
                className="font-medium font-body text-primary whitespace-nowrap"
                style={{ fontSize: 'clamp(9px, 0.69vw, 12px)', lineHeight: '2' }}
              >
                {tag}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const cards = [
  {
    slug: 'ticket-system',
    image: 'https://picsum.photos/seed/proj1/800/1000',
    title: 'Ticket System',
    description: 'Redesigning a support ticket experience to feel less like a form and more like a conversation.',
    tags: ['UX Design', 'Research'],
  },
  {
    slug: 'design-system',
    image: 'https://picsum.photos/seed/proj2/800/1000',
    title: 'Design System',
    description: 'Building a shared component library that bridges design and engineering workflows.',
    tags: ['Product Design', 'Systems'],
  },
  {
    slug: 'light-sculpture',
    image: 'https://picsum.photos/seed/proj3/800/1000',
    title: 'Light Sculpture',
    description: 'An interactive light installation responding to presence and movement in physical space.',
    tags: ['Creative Coding', 'Design'],
  },
]

export default function ProjectCards() {
  return (
    <section>
      {/* Section header */}
      <div
        className="flex items-start"
        style={{
          gap: 'clamp(8px, 0.93vw, 16px)',
          marginBottom: 'clamp(20px, 2.33vw, 40px)',
          padding: '0 clamp(4px, 0.35vw, 6px)',
        }}
      >
        <div className="shrink-0">
          <Folder style={{ width: 'clamp(40px, 4.07vw, 70px)', aspectRatio: '213 / 182' }} />
        </div>
        <div>
          <h2
            className="font-medium font-body text-primary"
            style={{
              fontSize: 'clamp(20px, 1.86vw, 32px)',
              lineHeight: '1.33',
              letterSpacing: '-1px',
            }}
          >
            Selected Work
          </h2>
          <p
            className="font-medium font-body text-secondary"
            style={{
              fontSize: 'clamp(14px, 1.16vw, 20px)',
              lineHeight: '1.33',
              letterSpacing: '-1px',
            }}
          >
            Case studies, sleepless nights, design decisions
          </p>
        </div>
      </div>

      {/* Project cards grid */}
      <div
        className="grid grid-cols-3"
        style={{
          gap: 'clamp(10px, 0.93vw, 16px)',
          height: 'clamp(280px, 34.83vw, 599px)',
        }}
      >
        {cards.map((card, i) => (
          <ProjectCard key={i} {...card} />
        ))}
      </div>
    </section>
  )
}
