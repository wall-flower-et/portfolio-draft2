import { useState, useEffect, useRef } from 'react'
import Folder from './Folder'

import portrait from '../assets/about/portrait.png'
import cat from '../assets/about/cat.png'
import alaska from '../assets/about/alaska.png'
import netherlands from '../assets/about/netherlands.png'
import morocco from '../assets/about/morocco.png'
import gradschool from '../assets/about/gradschool.png'
import technology from '../assets/about/technology.png'
import prototype from '../assets/about/prototype.png'

function InlineThumb({ src, alt, onMouseEnter, onMouseLeave }) {
  return (
    <img
      src={src}
      alt={alt}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="inline-block rounded-sm object-cover cursor-pointer"
      style={{
        width: 'clamp(22px, 2.55vw, 44px)',
        height: 'clamp(29px, 3.40vw, 59px)',
        verticalAlign: 'middle',
        margin: '0 2px',
        transition: 'transform 0.2s ease',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    />
  )
}

function StackPill({ children, color = '#000', bg = '#E2E2E2' }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full font-medium font-body whitespace-nowrap"
      style={{
        backgroundColor: bg,
        color: color,
        fontSize: 'clamp(11px, 0.87vw, 15px)',
        padding: 'clamp(5px, 0.41vw, 7px) clamp(14px, 1.16vw, 20px)',
        lineHeight: '1.5',
      }}
    >
      {children}
    </span>
  )
}

function StackSection({ title, children }) {
  return (
    <div>
      <p
        className="font-medium font-body text-secondary"
        style={{
          fontSize: 'clamp(11px, 0.87vw, 15px)',
          lineHeight: '1.5',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginBottom: 'clamp(8px, 0.70vw, 12px)',
        }}
      >
        {title}
      </p>
      <div className="flex flex-wrap" style={{ gap: 'clamp(6px, 0.52vw, 9px)' }}>
        {children}
      </div>
    </div>
  )
}

const rotatingImages = [portrait, cat, alaska, netherlands, morocco, gradschool]

export default function About() {
  const [activeImage, setActiveImage] = useState(portrait)
  const [isHovering, setIsHovering] = useState(false)
  const timerRef = useRef(null)
  const indexRef = useRef(0)

  // Auto-rotate when not hovering an inline thumb
  useEffect(() => {
    if (isHovering) {
      clearInterval(timerRef.current)
      return
    }
    timerRef.current = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % rotatingImages.length
      setActiveImage(rotatingImages[indexRef.current])
    }, 2500)
    return () => clearInterval(timerRef.current)
  }, [isHovering])

  const hover = (src) => { setIsHovering(true); setActiveImage(src) }
  const reset = () => { setIsHovering(false) }

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
            About
          </h2>
          <p
            className="font-medium font-body text-secondary"
            style={{
              fontSize: 'clamp(14px, 1.16vw, 20px)',
              lineHeight: '1.33',
              letterSpacing: '-1px',
            }}
          >
            The person behind the pixels
          </p>
        </div>
      </div>

      {/* Content */}
      <div
        className="border border-border-medium rounded-lg"
        style={{
          backgroundColor: '#F1EFEF',
          backgroundImage: 'radial-gradient(circle, rgba(213, 211, 211, 0.7) 2px, transparent 2px)',
          backgroundSize: '17.28px 17.28px',
          padding: 'clamp(24px, 3.47vw, 60px) clamp(32px, 5.23vw, 90px)',
        }}
      >
        <div
          className="flex items-start"
          style={{ gap: 'clamp(32px, 4.65vw, 80px)' }}
        >
          {/* Left: Photo card — matches Lab card style, auto-rotates */}
          <div
            className="shrink-0 bg-surface border border-border-medium rounded-lg shadow-card flex flex-col items-start"
            style={{
              width: 'clamp(200px, 20vw, 350px)',
              aspectRatio: '3 / 4',
              padding: 'clamp(6px, 0.52vw, 9px)',
            }}
          >
            <div className="flex-1 w-full rounded-[16px] overflow-hidden bg-white relative min-h-0">
              <img
                src={activeImage}
                alt="About Ege"
                className="absolute inset-0 w-full h-full object-cover rounded-[16px] pointer-events-none"
                style={{ transition: 'opacity 0.4s ease' }}
                key={activeImage}
              />
            </div>
          </div>

          {/* Right: Bio + stacks */}
          <div className="flex-1 flex flex-col" style={{ gap: 'clamp(28px, 2.91vw, 50px)' }}>
            {/* Bio with inline images */}
            <p
              className="font-medium font-body text-primary"
              style={{
                fontSize: 'clamp(16px, 1.63vw, 28px)',
                lineHeight: '1.8',
                letterSpacing: '-0.5px',
              }}
            >
              I was born in Istanbul{' '}
              <InlineThumb src={cat} alt="Istanbul cat" onMouseEnter={() => hover(cat)} onMouseLeave={reset} />{' '}
              grew up curious, and ended up living in Alaska{' '}
              <InlineThumb src={alaska} alt="Alaska" onMouseEnter={() => hover(alaska)} onMouseLeave={reset} />{' '}
              Netherlands{' '}
              <InlineThumb src={netherlands} alt="Netherlands" onMouseEnter={() => hover(netherlands)} onMouseLeave={reset} />{' '}
              and Morocco{' '}
              <InlineThumb src={morocco} alt="Morocco" onMouseEnter={() => hover(morocco)} onMouseLeave={reset} />{' '}
              before landing in New York for grad school{' '}
              <InlineThumb src={gradschool} alt="Grad school" onMouseEnter={() => hover(gradschool)} onMouseLeave={reset} />{' '}
              I studied psychology, visual arts, and creative technology{' '}
              <img
                src={technology}
                alt="Creative technology"
                className="inline-block object-contain cursor-pointer"
                style={{
                  width: 'clamp(22px, 2.55vw, 44px)',
                  height: 'clamp(29px, 3.40vw, 59px)',
                  verticalAlign: 'middle',
                  margin: '0 2px',
                  transition: 'transform 0.2s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />{' '}
              and I bring these knowledge to design!
            </p>
            <p
              className="font-body text-secondary"
              style={{
                fontSize: 'clamp(13px, 1.16vw, 20px)',
                lineHeight: '1.6',
                letterSpacing: '-0.3px',
              }}
            >
              I start the design process understanding real needs, the friction points
              and emotions behind them, then move quickly into sketches, prototypes,
              and iterations.
            </p>

            {/* Design Stack */}
            <StackSection title="Design">
              <StackPill color="#1260E7" bg="#E0F7FF">Figma</StackPill>
              <StackPill color="#CB12E7" bg="#FFE0FF">Framer</StackPill>
              <StackPill color="#FF9A41" bg="#FFEFE0">Adobe Suite</StackPill>
              <StackPill color="#6EAE19" bg="#E4FFE0">Blender</StackPill>
              <StackPill color="#12B9E7" bg="#E0F7FF">After Effects</StackPill>
              <StackPill color="#E75912" bg="#FFEFE0">Principle</StackPill>
            </StackSection>

            {/* Tech Stack */}
            <StackSection title="Technology">
              <StackPill color="#1260E7" bg="#E0F7FF">React</StackPill>
              <StackPill color="#6EAE19" bg="#E4FFE0">JavaScript</StackPill>
              <StackPill color="#CB12E7" bg="#FFE0FF">Python</StackPill>
              <StackPill color="#12B9E7" bg="#E0F7FF">Tailwind CSS</StackPill>
              <StackPill color="#FF9A41" bg="#FFEFE0">Node.js</StackPill>
              <StackPill color="#E75912" bg="#FFEFE0">Arduino</StackPill>
              <StackPill color="#1260E7" bg="#E0F7FF">TouchDesigner</StackPill>
              <StackPill color="#6EAE19" bg="#E4FFE0">p5.js</StackPill>
            </StackSection>
          </div>
        </div>
      </div>
    </section>
  )
}
