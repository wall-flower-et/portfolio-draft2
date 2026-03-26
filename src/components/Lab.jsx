import { useRef, useCallback, useEffect } from 'react'
import Folder from './Folder'

function LabCard({ image, title, tags = [] }) {
  return (
    <div
      className="bg-surface border border-border-medium rounded-lg shadow-card flex flex-col items-start shrink-0"
      style={{
        width: 'clamp(200px, 20vw, 350px)',
        aspectRatio: '3 / 4',
        padding: 'clamp(6px, 0.52vw, 9px)',
        gap: 'clamp(5px, 0.46vw, 8px)',
      }}
    >
      <div className="flex-1 w-full rounded-[16px] overflow-hidden bg-white relative min-h-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-[16px]"
        />
      </div>
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

const labCards = [
  { image: 'https://picsum.photos/seed/lab1/600/800', title: 'Light Sculpture', tags: ['Installation', 'Arduino'] },
  { image: 'https://picsum.photos/seed/lab2/600/800', title: 'Data Garden', tags: ['Physical Computing'] },
  { image: 'https://picsum.photos/seed/lab3/600/800', title: 'Sound Map', tags: ['Creative Coding'] },
  { image: 'https://picsum.photos/seed/lab4/600/800', title: 'Wearable Display', tags: ['Fabrication'] },
  { image: 'https://picsum.photos/seed/lab5/600/800', title: 'Kinetic Wall', tags: ['Motors', 'Sensors'] },
  { image: 'https://picsum.photos/seed/lab6/600/800', title: 'Projection Map', tags: ['TouchDesigner'] },
]

function MarqueeRow({ cards, reverse = false }) {
  // Repeat enough times to always fill the viewport with no gaps
  const repeated = [...cards, ...cards, ...cards, ...cards]
  const trackRef = useRef(null)
  const state = useRef({
    offset: 0,
    velocity: 0,
    autoSpeed: reverse ? 0.5 : -0.5,
    isDragging: false,
    lastX: 0,
    animId: null,
    totalWidth: 0,
  })

  const measure = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    // totalWidth = half the track (2 logical sets out of 4 copies)
    state.current.totalWidth = el.scrollWidth / 2
  }, [])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  useEffect(() => {
    const st = state.current

    const tick = () => {
      const el = trackRef.current
      if (!el || !st.totalWidth) {
        st.animId = requestAnimationFrame(tick)
        return
      }

      if (!st.isDragging) {
        st.velocity *= 0.95
        st.offset += st.autoSpeed + st.velocity
      }

      // seamless wrap — keep offset within one set length
      const half = st.totalWidth
      if (st.offset <= -half) st.offset += half
      if (st.offset >= 0) st.offset -= half

      el.style.transform = `translateX(${st.offset}px)`
      st.animId = requestAnimationFrame(tick)
    }

    st.animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(st.animId)
  }, [reverse])

  const onPointerDown = (e) => {
    const st = state.current
    st.isDragging = true
    st.lastX = e.clientX
    st.velocity = 0
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e) => {
    const st = state.current
    if (!st.isDragging) return
    const delta = e.clientX - st.lastX
    st.velocity = delta
    st.offset += delta
    st.lastX = e.clientX
  }

  const onPointerUp = () => {
    state.current.isDragging = false
  }

  return (
    <div
      className="cursor-grab active:cursor-grabbing select-none touch-none"
      style={{
        padding: '10px 0',
        maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <div
        ref={trackRef}
        className="flex w-max will-change-transform"
        style={{ gap: 'clamp(10px, 0.93vw, 16px)' }}
      >
        {repeated.map((card, i) => (
          <LabCard key={i} {...card} />
        ))}
      </div>
    </div>
  )
}

export default function Lab() {
  return (
    <section
      style={{
        paddingTop: 'clamp(40px, 4.65vw, 80px)',
        paddingBottom: 'clamp(40px, 4.65vw, 80px)',
      }}
    >
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
            Lab
          </h2>
          <p
            className="font-medium font-body text-secondary"
            style={{
              fontSize: 'clamp(14px, 1.16vw, 20px)',
              lineHeight: '1.33',
              letterSpacing: '-1px',
            }}
          >
            Exhibited work, physical installations, cables &amp; breadboards
          </p>
        </div>
      </div>

      {/* Marquee grid — two draggable rows, opposite directions */}
      <div
        className="w-screen relative left-1/2 -translate-x-1/2 flex flex-col"
        style={{
          gap: 'clamp(24px, 2.09vw, 36px)',
          overflow: 'clip',
          overflowClipMargin: '20px',
        }}
      >
        <MarqueeRow cards={labCards} />
        <MarqueeRow cards={labCards} reverse />
      </div>
    </section>
  )
}
