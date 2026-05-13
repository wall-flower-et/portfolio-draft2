import { useState, useEffect } from 'react'

const sections = [
  { id: 'hero', label: 'Intro' },
  { id: 'work', label: 'Work' },
  { id: 'experiments', label: 'Lab' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

export default function SideNav() {
  const [active, setActive] = useState('hero')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? scrollY / docHeight : 0)
    }

    const els = sections.map(s => document.getElementById(s.id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length) setActive(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    )

    els.forEach(el => observer.observe(el))
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const ticks = Array.from({ length: 40 }, (_, i) => i)

  return (
    <nav
      className="fixed hidden md:flex items-center"
      style={{
        left: '0',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        padding: '0',
        gap: 'clamp(8px, 0.93vw, 16px)',
      }}
      aria-label="Section navigation"
    >
      {/* Tick marks + progress line (vertical) */}
      <div style={{ position: 'relative', width: '24px', height: 'clamp(200px, 23.15vw, 400px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', height: '100%' }}>
          {ticks.map((_, i) => {
            const pos = i / (ticks.length - 1)
            const distFromProgress = Math.abs(pos - progress)
            const isNear = distFromProgress < 0.08
            const width = isNear ? 12 + (1 - distFromProgress / 0.08) * 10 : 12
            return (
              <div
                key={i}
                style={{
                  height: '1px',
                  width: `${width}px`,
                  background: isNear ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.12)',
                  transition: 'width 0.2s ease, background 0.2s ease',
                }}
              />
            )
          })}
        </div>

        <div
          style={{
            position: 'absolute',
            left: '0',
            top: `${progress * 100}%`,
            height: '2px',
            width: '24px',
            background: '#000',
            transition: 'top 0.1s ease-out',
            transform: 'translateY(-1px)',
          }}
        />
      </div>

      {/* Section labels */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 'clamp(200px, 23.15vw, 400px)' }}>
        {sections.map((section) => {
          const isActive = active === section.id
          return (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              style={{
                background: isActive ? '#000' : 'none',
                color: isActive ? '#fff' : 'rgba(0,0,0,0.4)',
                border: 'none',
                borderRadius: '16px',
                padding: isActive ? '4px 12px' : '4px 8px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(10px, 0.75vw, 13px)',
                fontWeight: isActive ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
                textAlign: 'left',
              }}
            >
              {section.label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
