import { useEffect, useState } from 'react'

export default function ScrollPopup() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('updatePopupDismissed')) return

    const onScroll = () => {
      if (window.scrollY > 200) {
        setVisible(true)
        window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => {
    setDismissed(true)
    sessionStorage.setItem('updatePopupDismissed', '1')
    setTimeout(() => setVisible(false), 300)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: 'clamp(16px, 2vw, 32px)',
        right: 'clamp(16px, 2vw, 32px)',
        zIndex: 50,
        maxWidth: 'min(360px, calc(100vw - 32px))',
        padding: 'clamp(16px, 1.5vw, 24px)',
        background: 'var(--color-white)',
        border: '1px solid var(--color-border-light)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-card)',
        fontFamily: 'var(--font-body)',
        opacity: dismissed ? 0 : 1,
        transform: dismissed ? 'translateY(12px)' : 'none',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }}
    >
      <button
        onClick={close}
        aria-label="Dismiss"
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          width: 28,
          height: 28,
          border: 'none',
          background: 'transparent',
          fontSize: 20,
          lineHeight: 1,
          color: 'var(--color-secondary)',
          borderRadius: 'var(--radius-sm)',
        }}
      >
        ×
      </button>
      <p
        style={{
          margin: 0,
          paddingRight: 24,
          fontSize: 'var(--text-body)',
          lineHeight: 1.5,
          color: 'var(--color-primary)',
        }}
      >
        hey! i'm updating my portfolio — the full version will be live soon ✨
      </p>
    </div>
  )
}
