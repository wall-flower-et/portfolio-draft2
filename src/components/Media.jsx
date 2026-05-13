import { useRef } from 'react'

export function isVideo(src) {
  if (!src) return false
  return /\.(mp4|webm|mov|ogg)(\?|$)/i.test(src) || src.startsWith('data:video/')
}

export default function Media({ src, alt = '', className = '', style, poster, hoverPlay = false }) {
  const videoRef = useRef(null)

  if (!src) return null

  if (isVideo(src)) {
    const handleEnter = () => { if (hoverPlay && videoRef.current) videoRef.current.play().catch(() => {}) }
    const handleLeave = () => {
      if (hoverPlay && videoRef.current) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
    }

    return (
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={!hoverPlay}
        muted
        loop
        playsInline
        className={className}
        style={style}
        onPointerEnter={hoverPlay ? handleEnter : undefined}
        onPointerLeave={hoverPlay ? handleLeave : undefined}
      />
    )
  }

  return <img src={src} alt={alt} className={className} style={style} loading="lazy" />
}
