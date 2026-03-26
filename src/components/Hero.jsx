import TextRotator from './TextRotator'
import SpinningCard from './SpinningCard'
import idCard from '../assets/id.png'

export default function Hero() {
  return (
    <section
      className="flex items-center justify-between"
      style={{
        paddingTop: 'clamp(56px, 7.56vw, 130px)',
        paddingBottom: 'clamp(40px, 5.23vw, 90px)',
      }}
    >
      {/* EGE — aligned left */}
      <h1
        className="font-display text-primary whitespace-nowrap shrink-0"
        style={{
          fontSize: 'clamp(80px, 15.17vw, 261px)',
          lineHeight: '1',
        }}
      >
        EGE
      </h1>

      {/* Tagline with rotating pills */}
      <p
        className="font-medium font-body text-primary shrink-0"
        style={{
          fontSize: 'clamp(16px, 1.86vw, 32px)',
          lineHeight: '2.2',
          letterSpacing: '-1px',
          width: 'clamp(240px, 30.12vw, 518px)',
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

      {/* TZCN — aligned right */}
      <h1
        className="font-display text-primary whitespace-nowrap shrink-0"
        style={{
          fontSize: 'clamp(80px, 15.17vw, 261px)',
          lineHeight: '1',
        }}
      >
        TZCN
      </h1>
    </section>
  )
}
