import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const links = [
  { label: 'Work', id: 'work' },
  { label: 'Experiments', id: 'experiments' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
]

function NavPill({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-control rounded-sm shadow-pill font-medium font-body text-primary whitespace-nowrap flex items-center justify-center"
      style={{
        height: 'clamp(32px, 2.91vw, 50px)',
        padding: 'clamp(8px, 0.75vw, 13px) clamp(14px, 1.40vw, 24px)',
        fontSize: 'clamp(12px, 0.93vw, 16px)',
        lineHeight: '1.5',
      }}
    >
      {children}
    </button>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => setOpen(false), [location.pathname])

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!open) return
    const handleKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open])

  const scrollTo = (id) => {
    if (!isHome) {
      navigate('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 150)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
    setOpen(false)
  }

  const goHome = () => {
    isHome ? window.scrollTo({ top: 0, behavior: 'smooth' }) : navigate('/')
    setOpen(false)
  }

  return (
    <nav aria-label="Main navigation" className="flex items-center justify-between flex-wrap" style={{ gap: 'clamp(8px, 0.93vw, 16px)' }}>
      {/* Left — Home */}
      <div
        className="bg-surface rounded-md shadow-nav flex items-center justify-center"
        style={{ height: 'clamp(42px, 3.83vw, 66px)', padding: 'clamp(5px, 0.47vw, 8px)' }}
      >
        <NavPill onClick={goHome}>Home</NavPill>
      </div>

      {/* Center — Sections (hidden on mobile) */}
      <div
        className="hidden sm:flex bg-surface rounded-md shadow-nav items-center justify-center"
        style={{ height: 'clamp(42px, 3.83vw, 66px)', padding: 'clamp(5px, 0.47vw, 8px)', gap: 'clamp(8px, 0.93vw, 16px)' }}
      >
        {links.map(({ label, id }) => (
          <NavPill key={id} onClick={() => scrollTo(id)}>{label}</NavPill>
        ))}
      </div>

      {/* Right — External links (hidden on mobile) */}
      <div
        className="hidden sm:flex bg-surface rounded-md shadow-nav items-center justify-center"
        style={{ height: 'clamp(42px, 3.83vw, 66px)', padding: 'clamp(5px, 0.47vw, 8px)', gap: 'clamp(8px, 0.93vw, 16px)' }}
      >
        <NavPill>Resume</NavPill>
        <NavPill>LinkedIn</NavPill>
      </div>

      {/* Mobile hamburger */}
      <button
        className="sm:hidden flex items-center justify-center bg-surface rounded-md shadow-nav"
        style={{ width: 'clamp(42px, 3.83vw, 66px)', height: 'clamp(42px, 3.83vw, 66px)' }}
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <div className="relative w-5 h-4">
          <span className={`absolute left-0 block h-px w-5 bg-primary transition-all duration-200 ${open ? 'top-[7px] rotate-45' : 'top-0'}`} />
          <span className={`absolute left-0 top-[7px] block h-px w-5 bg-primary transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`absolute left-0 block h-px w-5 bg-primary transition-all duration-200 ${open ? 'top-[7px] -rotate-45' : 'top-[14px]'}`} />
        </div>
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden w-full bg-surface rounded-md shadow-nav menu-enter" style={{ padding: 'clamp(8px, 0.93vw, 16px)' }}>
          <div className="flex flex-col" style={{ gap: '8px' }}>
            {links.map(({ label, id }) => (
              <NavPill key={id} onClick={() => scrollTo(id)}>{label}</NavPill>
            ))}
            <NavPill>Resume</NavPill>
            <NavPill>LinkedIn</NavPill>
          </div>
        </div>
      )}
    </nav>
  )
}
