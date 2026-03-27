import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const navLinks = [
  { label: 'Work', id: 'work' },
  { label: 'Experiments', id: 'experiments' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => setMenuOpen(false), [location.pathname])

  const scrollTo = (id) => {
    if (!isHome) {
      navigate('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 150)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  const goHome = () => {
    isHome ? window.scrollTo({ top: 0, behavior: 'smooth' }) : navigate('/')
    setMenuOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${scrolled ? 'bg-white/90 backdrop-blur-md' : ''}`}>
      <div className="max-w-4xl mx-auto px-6 flex items-center justify-between h-14">
        <button onClick={goHome} className="text-[15px] font-medium text-ink hover:text-ink-secondary transition-colors py-3 -my-3">
          Ege Tezcan
        </button>

        <div className="hidden sm:flex items-center gap-6">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-[13px] text-ink-secondary hover:text-ink transition-colors py-2"
            >
              {label}
            </button>
          ))}
        </div>

        <button
          className="sm:hidden flex items-center justify-center w-11 h-11 -mr-2.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <div className="relative w-5 h-4">
            <span className={`absolute left-0 block h-px w-5 bg-ink transition-all duration-200 ${menuOpen ? 'top-[7px] rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 top-[7px] block h-px w-5 bg-ink transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`absolute left-0 block h-px w-5 bg-ink transition-all duration-200 ${menuOpen ? 'top-[7px] -rotate-45' : 'top-[14px]'}`} />
          </div>
        </button>
      </div>

      {menuOpen && (
        <div className="sm:hidden bg-white/95 backdrop-blur-md border-t border-border/50 menu-enter">
          <div className="max-w-4xl mx-auto px-6 py-4 flex flex-col">
            {navLinks.map(({ label, id }) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left text-[15px] text-ink py-3">
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
