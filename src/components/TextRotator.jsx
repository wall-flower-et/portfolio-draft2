import { useState, useEffect, useRef } from 'react'

export default function TextRotator({ words = [], interval = 3000, delay = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [nextIndex, setNextIndex] = useState(null)
  const pillRef = useRef(null)
  const timerRef = useRef(null)
  const delayRef = useRef(null)
  const [maxWidth, setMaxWidth] = useState('auto')

  /* Measure the widest word once on mount to fix the pill width */
  useEffect(() => {
    if (!pillRef.current) return
    const measurer = pillRef.current.querySelector('[data-measurer]')
    if (!measurer) return

    let widest = 0
    words.forEach((w) => {
      measurer.textContent = typeof w === 'string' ? w : w.text
      widest = Math.max(widest, measurer.offsetWidth)
    })
    measurer.textContent = ''
    setMaxWidth(widest + 'px')
  }, [words])

  /* Rotation timer */
  useEffect(() => {
    const start = () => {
      timerRef.current = setInterval(() => {
        setIsAnimating(true)
        setNextIndex(null)
        setCurrentIndex((prev) => {
          const next = (prev + 1) % words.length
          setNextIndex(next)
          return prev
        })

        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % words.length)
          setNextIndex(null)
          setIsAnimating(false)
        }, 450)
      }, interval)
    }

    delayRef.current = setTimeout(start, delay)

    return () => {
      clearTimeout(delayRef.current)
      clearInterval(timerRef.current)
    }
  }, [words.length, interval, delay])

  const getWord = (index) => {
    const w = words[index]
    if (typeof w === 'string') return { text: w, color: '#000', bg: '#fff', glow: 'none' }
    return w
  }

  const current = getWord(currentIndex)
  const target = isAnimating && nextIndex !== null ? getWord(nextIndex) : current

  return (
    <span
      ref={pillRef}
      className="inline-flex items-center justify-center rounded-full"
      style={{
        backgroundColor: target.bg,
        boxShadow: `inset 0px 4px 30.8px -10px ${target.glow}`,
        padding: 'clamp(2px, 0.23vw, 4px) clamp(12px, 1.16vw, 20px)',
        overflow: 'hidden',
        height: '1.5em',
        width: maxWidth !== 'auto' ? `calc(${maxWidth} + clamp(24px, 2.32vw, 40px))` : 'auto',
        position: 'relative',
        verticalAlign: 'baseline',
        transition: 'background-color 0.45s ease, box-shadow 0.45s ease',
      }}
    >
      {/* Hidden measurer for calculating max width */}
      <span
        className="font-medium font-body whitespace-nowrap absolute invisible"
        style={{ pointerEvents: 'none' }}
        data-measurer
      />

      {/* Current word */}
      <span
        className="font-medium font-body whitespace-nowrap"
        style={{
          color: current.color,
          textShadow: '0px 4px 7.3px rgba(0, 0, 0, 0.25)',
          animation: isAnimating ? 'slide-up-out 450ms ease-out forwards' : 'none',
        }}
      >
        {current.text}
      </span>

      {/* Next word (slides in from below) */}
      {isAnimating && nextIndex !== null && (() => {
        const next = getWord(nextIndex)
        return (
          <span
            className="font-medium font-body whitespace-nowrap absolute"
            style={{
              color: next.color,
              textShadow: '0px 4px 7.3px rgba(0, 0, 0, 0.25)',
              animation: 'slide-up-in 450ms ease-out forwards',
            }}
          >
            {next.text}
          </span>
        )
      })()}
    </span>
  )
}
