import TextRotator from './TextRotator'
import SpinningCard from './SpinningCard'
import idCard from '../assets/id.png'
import { useReveal } from '../hooks/useReveal'

export default function Hero() {
  const [ref, visible] = useReveal()

  return (
    <section
      id="hero"
      ref={ref}
      className={`relative reveal ${visible ? 'visible' : ''}`}
      style={{ minHeight: 'clamp(300px, 34.72vw, 600px)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
    >
      {/* EGE + pill text + TZCN */}
      <div className="flex items-center justify-between" style={{ paddingBottom: 'clamp(40px, 4.63vw, 80px)' }}>
        <h1
          className="font-display text-primary whitespace-nowrap"
          style={{
            fontSize: 'clamp(80px, 22.4vw, 387px)',
            lineHeight: '0.85',
          }}
        >
          EGE
        </h1>

        <p
          className="font-medium font-body text-primary"
          style={{
            fontSize: 'clamp(18px, 1.85vw, 32px)',
            lineHeight: '2.2',
            letterSpacing: '-1px',
            width: 'clamp(260px, 30vw, 520px)',
            textAlign: 'left',
            marginLeft: 'auto',
            marginRight: 'clamp(8px, 1.16vw, 20px)',
          }}
        >
          I&rsquo;m a{' '}
          <TextRotator
            words={[
              { text: 'Technologist', color: '#6EAE19', bg: '#E4FFE0', glow: '#6EAE19' },
              { text: 'Designer', color: '#FF9A41', bg: '#FFEFE0', glow: '#E75912' },
              { text: 'Creative Coder', color: '#1260E7', bg: '#E0F7FF', glow: '#1260E7' },
            ]}
            interval={3000}
          />
          {' '}with a background in{' '}
          <TextRotator
            words={[
              { text: 'Psychology', color: '#12B9E7', bg: '#E0F7FF', glow: '#12B9E7' },
              { text: 'Visual Arts', color: '#CB12E7', bg: '#FFE0FF', glow: '#CB12E7' },
              { text: 'Creative Tech.', color: '#6EAE19', bg: '#E4FFE0', glow: '#6EAE19' },
            ]}
            interval={3000}
            delay={1500}
          />
          {' '}recent grad of NYU ITP.{' '}
          <SpinningCard src={idCard} />
        </p>

        <h1
          className="font-display text-primary whitespace-nowrap"
          style={{
            fontSize: 'clamp(80px, 22.4vw, 387px)',
            lineHeight: '0.85',
          }}
        >
          TZCN
        </h1>
      </div>
    </section>
  )
}
