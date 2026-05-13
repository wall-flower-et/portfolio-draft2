import { useState, useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import Folder from './Folder'

import portrait from '../assets/about/portrait.png'
import cat from '../assets/about/cat.png'
import alaska from '../assets/about/alaska.png'
import netherlands from '../assets/about/netherlands.png'
import morocco from '../assets/about/morocco.png'
import gradschool from '../assets/about/gradschool.png'
import technology from '../assets/about/technology.png'

function InlineThumb({ src, alt, onActivate, onDeactivate }) {
  return (
    <button
      type="button"
      onClick={onActivate}
      onPointerEnter={onActivate}
      onPointerLeave={onDeactivate}
      className="inline-flex items-center justify-center rounded-sm cursor-pointer"
      style={{ minWidth: '44px', minHeight: '44px', verticalAlign: 'middle', margin: '0 2px', padding: '0', background: 'none', border: 'none' }}
      aria-label={`View ${alt} photo`}
    >
      <img
        src={src} alt=""
        className="rounded-sm object-cover pointer-events-none"
        style={{ width: 'clamp(22px, 2.55vw, 44px)', height: 'clamp(29px, 3.40vw, 59px)', transition: 'transform 0.2s ease', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
      />
    </button>
  )
}

function StackSection({ title, children }) {
  return (
    <div>
      <p className="font-medium font-body text-secondary" style={{ fontSize: 'clamp(10px, 0.81vw, 14px)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 'clamp(6px, 0.52vw, 9px)' }}>{title}</p>
      <p className="font-body text-secondary" style={{ fontSize: 'clamp(12px, 0.93vw, 16px)', lineHeight: '1.6' }}>{children}</p>
    </div>
  )
}

const rotatingImages = [portrait, cat, alaska, netherlands, morocco, gradschool]

export default function About() {
  const [ref, visible] = useReveal(0.1)
  const [activeImage, setActiveImage] = useState(portrait)
  const [isHovering, setIsHovering] = useState(false)
  const timerRef = useRef(null)
  const indexRef = useRef(0)

  useEffect(() => {
    if (isHovering) { clearInterval(timerRef.current); return }
    timerRef.current = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % rotatingImages.length
      setActiveImage(rotatingImages[indexRef.current])
    }, 2500)
    return () => clearInterval(timerRef.current)
  }, [isHovering])

  const hover = (src) => { setIsHovering(true); setActiveImage(src) }
  const reset = () => { setIsHovering(false) }

  return (
    <section id="about" ref={ref} style={{ padding: 'clamp(40px, 4.63vw, 80px) 0' }}>
      <div className={`border-t border-border-medium reveal ${visible ? 'visible' : ''}`} style={{ paddingTop: 'clamp(32px, 3.70vw, 64px)' }}>
        <div className="flex items-start" style={{ gap: 'clamp(8px, 0.93vw, 16px)', marginBottom: 'clamp(20px, 2.33vw, 40px)' }}>
          <div className="shrink-0"><Folder style={{ width: 'clamp(40px, 4.07vw, 70px)', aspectRatio: '213 / 182' }} /></div>
          <div>
            <h2 className="font-medium font-body text-primary" style={{ fontSize: 'clamp(20px, 1.86vw, 32px)', lineHeight: '1.33', letterSpacing: '-1px' }}>About</h2>
            <p className="font-medium font-body text-secondary" style={{ fontSize: 'clamp(14px, 1.16vw, 20px)', lineHeight: '1.33', letterSpacing: '-1px' }}>The person behind the pixels</p>
          </div>
        </div>
        <div className="border border-border-medium rounded-lg mx-auto" style={{ maxWidth: '1100px', backgroundColor: '#F1EFEF', backgroundImage: 'radial-gradient(circle, rgba(213,211,211,0.7) 2px, transparent 2px)', backgroundSize: '17.28px 17.28px', padding: 'clamp(24px, 3.47vw, 60px) clamp(32px, 5.23vw, 90px)' }}>
          <div className="flex flex-col md:flex-row items-start" style={{ gap: 'clamp(24px, 3.49vw, 60px)' }}>
            <div className="shrink-0 bg-surface border border-border-medium rounded-lg flex flex-col items-start" style={{ width: 'clamp(160px, 16.28vw, 280px)', aspectRatio: '3 / 4', padding: 'clamp(6px, 0.52vw, 9px)' }}>
              <div className="flex-1 w-full rounded-[16px] overflow-hidden bg-white relative min-h-0">
                <img src={activeImage} alt="About Ege" className="absolute inset-0 w-full h-full object-cover rounded-[16px] pointer-events-none" style={{ transition: 'opacity 0.4s ease' }} key={activeImage} />
              </div>
            </div>
            <div className="flex-1 flex flex-col" style={{ gap: 'clamp(20px, 2.33vw, 40px)' }}>
              <p className="font-medium font-body text-primary" style={{ fontSize: 'clamp(14px, 1.39vw, 24px)', lineHeight: '1.8', letterSpacing: '-0.5px' }}>
                I was born in Istanbul{' '}<InlineThumb src={cat} alt="Istanbul cat" onActivate={() => hover(cat)} onDeactivate={reset} />{' '}
                grew up curious, and ended up living in Alaska{' '}<InlineThumb src={alaska} alt="Alaska" onActivate={() => hover(alaska)} onDeactivate={reset} />{' '}
                Netherlands{' '}<InlineThumb src={netherlands} alt="Netherlands" onActivate={() => hover(netherlands)} onDeactivate={reset} />{' '}
                and Morocco{' '}<InlineThumb src={morocco} alt="Morocco" onActivate={() => hover(morocco)} onDeactivate={reset} />{' '}
                before landing in New York for grad school{' '}<InlineThumb src={gradschool} alt="Grad school" onActivate={() => hover(gradschool)} onDeactivate={reset} />{' '}
                I studied psychology, visual arts, and creative technology{' '}
                <img src={technology} alt="Creative technology" className="inline-block object-contain" style={{ width: 'clamp(22px, 2.55vw, 44px)', height: 'clamp(29px, 3.40vw, 59px)', verticalAlign: 'middle', margin: '0 2px' }} />{' '}
                and I bring these knowledge to design!
              </p>
              <p className="font-body text-secondary" style={{ fontSize: 'clamp(12px, 1.05vw, 18px)', lineHeight: '1.6', letterSpacing: '-0.3px' }}>
                I think about AI the way I think about any design material — what does it afford, where does it break, and what happens when people trust it?
              </p>
              <StackSection title="Design">Figma, Framer, Adobe Suite, Blender, After Effects, Principle</StackSection>
              <StackSection title="Technology">React, JavaScript, Python, Tailwind, Node.js, Arduino, TouchDesigner, p5.js</StackSection>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
