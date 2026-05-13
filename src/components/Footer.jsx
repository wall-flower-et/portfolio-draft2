export default function Footer() {
  return (
    <footer style={{ padding: 'clamp(24px, 2.78vw, 48px) 0' }}>
      <p className="font-body text-secondary" style={{ fontSize: 'clamp(10px, 0.75vw, 13px)' }}>
        &copy; {new Date().getFullYear()} Ege Tezcan
      </p>
    </footer>
  )
}
