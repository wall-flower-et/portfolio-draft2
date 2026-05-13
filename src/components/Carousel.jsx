import { useRef, useEffect, useCallback } from 'react'

/* ——————————————————————————————————————————————
   Card Component
   —————————————————————————————————————————————— */
function CarouselCard({ image, title, tags = [] }) {
  return (
    <div
      className="bg-surface border border-border-medium rounded-[20px] shadow-card flex flex-col items-start overflow-hidden shrink-0 will-change-transform absolute pointer-events-none"
      style={{
        width: 'clamp(200px, 20vw, 350px)',
        aspectRatio: '3 / 4',
        padding: 'clamp(6px, 0.46vw, 8px)',
        gap: 'clamp(6px, 0.46vw, 8px)',
      }}
    >
      {/* Image area */}
      <div className="flex-1 w-full rounded-[16px] overflow-hidden bg-white relative min-h-0 flex items-center justify-center">
        {image ? (
          <img
            src={image}
            alt={title || ''}
            className="absolute inset-0 w-full h-full object-cover rounded-[16px] pointer-events-none"
          />
        ) : (
          <span className="font-display text-primary opacity-10" style={{ fontSize: 'clamp(40px, 4vw, 69px)' }}>
            {title}
          </span>
        )}
      </div>
      {/* Tags row */}
      {tags.length > 0 && (
        <div className="flex items-center gap-2 overflow-hidden w-full shrink-0">
          {tags.map((tag, i) => (
            <div
              key={i}
              className="border border-border-light rounded-[8px] flex items-center justify-center overflow-hidden shrink-0"
              style={{ padding: 'clamp(3px, 0.29vw, 5px) clamp(6px, 0.52vw, 9px)' }}
            >
              <span className="font-medium font-body text-primary whitespace-nowrap" style={{ fontSize: 'clamp(10px, 0.69vw, 12px)', lineHeight: '2' }}>
                {tag}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ——————————————————————————————————————————————
   Ease-out curve for snap animations
   cubic-bezier(0.22, 1, 0.36, 1) approximation
   —————————————————————————————————————————————— */
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

/* ——————————————————————————————————————————————
   Row Component
   Snap-and-hold carousel with drag, throw, 3D coverflow
   —————————————————————————————————————————————— */
function CarouselRow({ cards, direction = -1 }) {
  const containerRef = useRef(null)
  const s = useRef({
    // Layout
    cardWidth: 0,
    gap: 16,
    step: 0,           // cardWidth + gap
    count: 0,

    // Scroll position (single offset for the whole strip)
    offset: 0,

    // Auto-advance
    currentIndex: 0,
    holdTimer: null,
    isSnapping: false,
    snapStart: 0,       // offset at snap start
    snapTarget: 0,      // offset at snap end
    snapTime: 0,        // timestamp when snap started
    snapDuration: 800,   // ms

    // Drag
    isDragging: false,
    lastPointerX: 0,
    velocity: 0,
    isDecelerating: false,

    // Animation
    animId: null,
    initialized: false,
  })

  /* Measure cards and initialize */
  const init = useCallback(() => {
    const el = containerRef.current
    if (!el || !el.children.length) return
    const st = s.current
    st.cardWidth = el.children[0].offsetWidth
    st.step = st.cardWidth + st.gap
    st.count = cards.length

    // Center the first card
    const viewW = window.innerWidth
    st.offset = viewW / 2 - st.cardWidth / 2
    st.currentIndex = 0
    st.initialized = true

    // Start auto-advance
    scheduleAdvance()
  }, [cards.length])

  /* Schedule the next auto-advance after hold period */
  const scheduleAdvance = useCallback(() => {
    const st = s.current
    clearTimeout(st.holdTimer)
    st.holdTimer = setTimeout(() => {
      if (!st.isDragging && !st.isDecelerating) {
        advanceToNext()
      }
    }, 2000)
  }, [])

  /* Snap-animate to the next card in direction */
  const advanceToNext = useCallback(() => {
    const st = s.current
    st.currentIndex += direction
    snapToIndex(st.currentIndex)
  }, [direction])

  /* Snap-animate to a specific card index */
  const snapToIndex = useCallback((index) => {
    const st = s.current
    const viewW = window.innerWidth
    // Target offset: place card[index] at viewport center
    const targetOffset = viewW / 2 - st.cardWidth / 2 - index * st.step
    st.isSnapping = true
    st.snapStart = st.offset
    st.snapTarget = targetOffset
    st.snapTime = performance.now()
  }, [])

  /* Find the card index closest to viewport center based on current offset */
  const findNearestIndex = useCallback(() => {
    const st = s.current
    const viewW = window.innerWidth
    const centerX = viewW / 2
    // Solve for index: offset + index * step + cardWidth/2 = centerX
    const rawIndex = (centerX - st.offset - st.cardWidth / 2) / st.step
    return Math.round(rawIndex)
  }, [])

  useEffect(() => {
    requestAnimationFrame(() => init())
    window.addEventListener('resize', init)
    return () => {
      window.removeEventListener('resize', init)
      clearTimeout(s.current.holdTimer)
    }
  }, [init])

  /* Main animation loop */
  useEffect(() => {
    const st = s.current

    const tick = (now) => {
      const el = containerRef.current
      if (!el || !st.initialized) {
        st.animId = requestAnimationFrame(tick)
        return
      }

      const children = el.children
      const viewW = window.innerWidth
      const centerX = viewW / 2
      const cw = st.cardWidth
      const step = st.step
      const count = st.count

      /* —— Snap animation —— */
      if (st.isSnapping) {
        const elapsed = now - st.snapTime
        const progress = Math.min(elapsed / st.snapDuration, 1)
        const eased = easeInOutCubic(progress)
        st.offset = st.snapStart + (st.snapTarget - st.snapStart) * eased

        if (progress >= 1) {
          st.offset = st.snapTarget
          st.isSnapping = false
          scheduleAdvance()
        }
      }

      /* —— Drag deceleration —— */
      if (st.isDecelerating) {
        st.velocity *= 0.95
        st.offset += st.velocity

        if (Math.abs(st.velocity) < 0.5) {
          st.isDecelerating = false
          // Snap to nearest card
          const nearest = findNearestIndex()
          st.currentIndex = nearest
          snapToIndex(nearest)
        }
      }

      /* —— Render cards with 3D coverflow —— */
      for (let i = 0; i < children.length; i++) {
        // Wrap card positions for infinite loop
        // Calculate the "visual" x using modular arithmetic
        let baseX = st.offset + i * step

        // Wrap into visible range
        const totalWidth = count * step
        // Normalize baseX so cards wrap around
        const wrapOffset = ((baseX % totalWidth) + totalWidth + step) % totalWidth - step
        const x = wrapOffset

        // Card center relative to viewport
        const cardCenter = x + cw / 2
        const normalizedOffset = (cardCenter - centerX) / (viewW / 2)
        const absOffset = Math.min(Math.abs(normalizedOffset), 1.5)

        // 3D Coverflow transforms
        const rotateY = Math.max(-15, Math.min(15, normalizedOffset * -15))
        const translateZ = -absOffset * 200
        const spreadX = normalizedOffset * 50
        const scale = 1
        const opacity = Math.max(1 - absOffset * 0.4, 0.3)
        const zIndex = Math.round((1 - absOffset) * 100)

        const child = children[i]
        child.style.transform = `translateX(${x + spreadX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`
        child.style.opacity = opacity
        child.style.zIndex = zIndex
      }

      st.animId = requestAnimationFrame(tick)
    }

    st.animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(st.animId)
  }, [scheduleAdvance, findNearestIndex, snapToIndex])

  /* —— Pointer event handlers —— */
  const onPointerDown = (e) => {
    const st = s.current
    clearTimeout(st.holdTimer)
    st.isDragging = true
    st.isSnapping = false
    st.isDecelerating = false
    st.lastPointerX = e.clientX
    st.velocity = 0
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e) => {
    const st = s.current
    if (!st.isDragging) return
    const delta = e.clientX - st.lastPointerX
    st.velocity = delta
    st.offset += delta
    st.lastPointerX = e.clientX
  }

  const onPointerUp = () => {
    const st = s.current
    st.isDragging = false
    // If thrown with enough force, decelerate then snap
    if (Math.abs(st.velocity) > 2) {
      st.isDecelerating = true
    } else {
      // Low velocity — snap immediately to nearest
      const nearest = findNearestIndex()
      st.currentIndex = nearest
      snapToIndex(nearest)
    }
  }

  return (
    <div
      className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing select-none touch-none"
      style={{
        height: 'clamp(280px, 28vw, 480px)',
        perspective: '1000px',
        maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <div
        ref={containerRef}
        className="absolute inset-0 flex items-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {cards.map((card, i) => (
          <CarouselCard key={i} {...card} />
        ))}
      </div>
    </div>
  )
}

/* ——————————————————————————————————————————————
   Carousel Section — two rows, full width
   —————————————————————————————————————————————— */
const placeholderCards = Array.from({ length: 12 }, (_, i) => ({
  title: String(i + 1).padStart(2, '0'),
  tags: ['Creative Coding', 'Design'],
  image: null,
}))

export default function Carousel() {
  return (
    <section
      id="carousel"
      className="w-screen relative left-1/2 -translate-x-1/2"
      style={{ padding: 'clamp(40px, 4.63vw, 80px) 0' }}
    >
      <div className="flex flex-col" style={{ gap: 'clamp(16px, 2vw, 24px)' }}>
        {/* Top row — advances left */}
        <CarouselRow cards={placeholderCards} direction={1} />
        {/* Bottom row — advances right */}
        <CarouselRow cards={placeholderCards} direction={-1} />
      </div>
    </section>
  )
}
