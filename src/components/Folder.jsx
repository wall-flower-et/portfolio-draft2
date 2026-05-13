import folderBack from '../assets/back_new.svg'
import folderFront from '../assets/front_new 16.svg'

export default function Folder({ className = '', style = {} }) {
  return (
    <div
      aria-hidden="true"
      className={`relative ${className}`}
      style={{
        width: 'clamp(100px, 12.33vw, 213px)',
        aspectRatio: '366 / 312',
        filter: 'drop-shadow(0 3.399px 4.532px rgba(0, 0, 0, 0.25)) drop-shadow(-3.399px 0 4.532px rgba(0, 0, 0, 0.25))',
        ...style,
      }}
    >
      <img
        src={folderBack}
        alt=""
        className="absolute left-1/2 -translate-x-1/2"
        style={{ width: '95.56%', top: '0%' }}
      />
      <img
        src={folderFront}
        alt=""
        className="absolute left-1/2 -translate-x-1/2"
        style={{ width: '104.64%', top: '14%' }}
      />
    </div>
  )
}
