import folderBack from '../assets/background.svg'
import folderFront from '../assets/front.svg'

export default function Folder({ className = '', style = {} }) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        width: 'clamp(100px, 12.33vw, 213px)',
        aspectRatio: '213 / 182',
        filter: 'drop-shadow(0 3.399px 4.532px rgba(0, 0, 0, 0.25)) drop-shadow(-3.399px 0 4.532px rgba(0, 0, 0, 0.25))',
        ...style,
      }}
    >
      <img
        src={folderBack}
        alt=""
        className="absolute left-1/2 -translate-x-1/2 top-0"
        style={{ width: '95.77%' }}
      />
      <img
        src={folderFront}
        alt=""
        className="absolute left-1/2 -translate-x-1/2"
        style={{ width: '104.69%', top: '18.13%' }}
      />
    </div>
  )
}
