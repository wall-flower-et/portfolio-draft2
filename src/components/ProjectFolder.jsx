import { useState } from 'react'
import { Link } from 'react-router-dom'
import folderBack from '../assets/back_new.svg'
import folderFront from '../assets/front_new 16.svg'

export default function ProjectFolder({ project, width }) {
  const [hovered, setHovered] = useState(false)
  const { slug, title, subtitle, tags = [], thumbnail, files = ['#5B8DEF', '#E8A44A', '#D45B7A'] } = project

  return (
    <article
      className="relative"
      style={{ width: width || 'clamp(200px, 23.15vw, 400px)' }}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <Link to={`/project/${slug}`} className="block" aria-label={`${title} — ${subtitle}`}>
        {/* Folder container */}
        <div className="relative" style={{ width: '100%', aspectRatio: '366 / 500' }}>
          {/* Folder back */}
          <img
            src={folderBack} alt=""
            className="absolute left-1/2"
            style={{
              width: '95.56%', top: '38%',
              transform: hovered ? 'translateX(-50%) scale(0.93)' : 'translateX(-50%) scale(1)',
              transformOrigin: 'center bottom',
              transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
              zIndex: 0,
            }}
          />

          {/* Colored file cards behind folder */}
          <div
            className="absolute rounded-md overflow-hidden"
            style={{
              width: hovered ? '100%' : '60%', height: hovered ? '52%' : '40%',
              left: hovered ? '0%' : '20%', top: hovered ? '-5%' : '38%',
              backgroundColor: files[0], opacity: hovered ? 1 : 0.8,
              transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)', zIndex: 1,
            }}
          />
          <div
            className="absolute rounded-md overflow-hidden"
            style={{
              width: hovered ? '39%' : '25%', height: hovered ? '52%' : '35%',
              left: hovered ? '-12%' : '10%', top: hovered ? '15%' : '42%',
              backgroundColor: files[1], opacity: hovered ? 1 : 0.6,
              transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)', zIndex: 1,
            }}
          />
          <div
            className="absolute rounded-md overflow-hidden"
            style={{
              width: hovered ? '39%' : '25%', height: hovered ? '52%' : '35%',
              right: hovered ? '-12%' : '10%', top: hovered ? '15%' : '38%',
              backgroundColor: files[2], opacity: hovered ? 1 : 0.6,
              transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)', zIndex: 1,
            }}
          />

          {/* Folder front (glass) */}
          <img
            src={folderFront} alt=""
            className="absolute left-1/2"
            style={{
              width: '104.64%', top: '47%',
              transform: hovered ? 'translateX(-50%) scale(0.93)' : 'translateX(-50%) scale(1)',
              transformOrigin: 'center bottom',
              transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
              zIndex: 2,
              filter: 'drop-shadow(0 3.399px 4.532px rgba(0, 0, 0, 0.25)) drop-shadow(-3.399px 0 4.532px rgba(0, 0, 0, 0.25))',
            }}
          />

          {/* Screenshot card — on top of folder, offset right */}
          {thumbnail && (
            <div
              className="absolute rounded-lg overflow-hidden shadow-card"
              style={{
                width: '55%', aspectRatio: '3 / 4',
                right: '-8%', top: '32%',
                zIndex: 3,
                transform: hovered ? 'rotate(3deg) scale(1.05)' : 'rotate(3deg)',
                transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                border: '2px solid rgba(255,255,255,0.8)',
              }}
            >
              <img src={thumbnail} alt="" className="w-full h-full object-cover pointer-events-none" />
            </div>
          )}
        </div>

        {/* Title + description + tags */}
        <div style={{ marginTop: 'clamp(8px, 0.93vw, 16px)' }}>
          <h3
            className="font-medium font-body text-primary"
            style={{ fontSize: 'clamp(14px, 1.16vw, 20px)', lineHeight: '1.33', letterSpacing: '-0.5px' }}
          >
            {title}
          </h3>
          <p
            className="font-body text-secondary"
            style={{ fontSize: 'clamp(12px, 0.93vw, 16px)', lineHeight: '1.5', marginTop: '4px' }}
          >
            {subtitle}
          </p>
          {tags.length > 0 && (
            <div className="flex flex-wrap" style={{ gap: '4px', marginTop: 'clamp(6px, 0.58vw, 10px)' }}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="font-body text-secondary"
                  style={{ fontSize: 'clamp(10px, 0.69vw, 12px)', background: '#E9E8E8', borderRadius: '12px', padding: '2px 8px' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  )
}
