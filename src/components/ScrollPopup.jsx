import { useEffect, useState } from 'react'

export default function ScrollPopup() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const trigger = () => {
      if (window.scrollY > 50) {
        setVisible(true)
        cleanup()
      }
    }
    const cleanup = () => {
      window.removeEventListener('scroll', trigger)
      window.removeEventListener('wheel', trigger)
      window.removeEventListener('touchmove', trigger)
      window.removeEventListener('keydown', onKey)
    }
    const onKey = (e) => {
      if ([' ', 'ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'End', 'Home'].includes(e.key)) {
        setVisible(true)
        cleanup()
      }
    }
    window.addEventListener('scroll', trigger, { passive: true })
    window.addEventListener('wheel', trigger, { passive: true })
    window.addEventListener('touchmove', trigger, { passive: true })
    window.addEventListener('keydown', onKey)
    return cleanup
  }, [])

  useEffect(() => {
    if (!visible) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [visible])

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(16px, 3vw, 48px)',
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        animation: 'menu-enter 0.3s ease-out',
      }}
    >
      <div
        style={{
          maxWidth: 'min(480px, 100%)',
          padding: 'clamp(24px, 3vw, 40px)',
          background: 'var(--color-white)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-card)',
          fontFamily: 'var(--font-body)',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            margin: 0,
            marginBottom: 'clamp(8px, 1vw, 16px)',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 5vw, 56px)',
            lineHeight: 1.0,
            letterSpacing: '0.01em',
            color: 'var(--color-primary)',
          }}
        >
          hey!
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: 'var(--text-body-lg)',
            lineHeight: 1.4,
            color: 'var(--color-primary)',
          }}
        >
          i'm updating my portfolio — the full version will be live soon ✨
        </p>
      </div>
    </div>
  )
}
