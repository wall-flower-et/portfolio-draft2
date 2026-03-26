export default function SpinningCard({ src, alt = 'Student ID' }) {
  return (
    <span
      className="inline-block align-middle"
      style={{
        perspective: '800px',
        height: '1.8em',
        width: '1.2em',
      }}
    >
      <span
        className="block rounded-[8px]"
        style={{
          width: '100%',
          height: '100%',
          transform: 'rotate(-6deg)',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
        }}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover rounded-[8px] pointer-events-none"
          />
        ) : (
          <span
            className="flex items-center justify-center w-full h-full rounded-[8px] bg-white border border-border-light"
            style={{ fontSize: '0.4em' }}
          />
        )}
      </span>
    </span>
  )
}
