function NavPill({ children }) {
  return (
    <button
      className="bg-control rounded-sm shadow-pill font-medium font-body text-primary whitespace-nowrap flex items-center justify-center"
      style={{
        height: 'clamp(32px, 2.91vw, 50px)',
        padding: 'clamp(8px, 0.75vw, 13px) clamp(14px, 1.40vw, 24px)',
        fontSize: 'clamp(12px, 0.93vw, 16px)',
        lineHeight: '1.5',
      }}
    >
      {children}
    </button>
  )
}

function NavGroup({ children }) {
  return (
    <div
      className="bg-surface rounded-md shadow-nav flex items-center justify-center"
      style={{
        height: 'clamp(42px, 3.83vw, 66px)',
        padding: 'clamp(5px, 0.47vw, 8px)',
        gap: 'clamp(8px, 0.93vw, 16px)',
      }}
    >
      {children}
    </div>
  )
}

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between">
      <NavGroup>
        <NavPill>Home</NavPill>
      </NavGroup>

      <NavGroup>
        <NavPill>Projects</NavPill>
        <NavPill>Lab</NavPill>
        <NavPill>About</NavPill>
      </NavGroup>

      <NavGroup>
        <NavPill>Resume</NavPill>
        <NavPill>X</NavPill>
        <NavPill>LinkedIn</NavPill>
      </NavGroup>
    </nav>
  )
}
