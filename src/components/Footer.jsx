function FooterPill({ children, href }) {
  const Tag = href ? 'a' : 'button'
  return (
    <Tag
      className="bg-control rounded-sm shadow-pill font-medium font-body text-primary whitespace-nowrap flex items-center justify-center"
      style={{
        height: 'clamp(32px, 2.91vw, 50px)',
        padding: 'clamp(8px, 0.75vw, 13px) clamp(14px, 1.40vw, 24px)',
        fontSize: 'clamp(12px, 0.93vw, 16px)',
        lineHeight: '1.5',
        textDecoration: 'none',
      }}
      {...(href ? { href, target: href.startsWith('mailto') ? undefined : '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </Tag>
  )
}

export default function Footer() {
  return (
    <footer
      className="bg-surface rounded-md shadow-nav flex items-center justify-center mx-auto"
      style={{
        width: 'fit-content',
        height: 'clamp(42px, 3.83vw, 66px)',
        padding: 'clamp(5px, 0.47vw, 8px)',
        gap: 'clamp(8px, 0.93vw, 16px)',
        marginTop: 'clamp(48px, 5.56vw, 96px)',
        marginBottom: 'clamp(24px, 2.95vw, 51px)',
      }}
    >
      <FooterPill href="mailto:m.egetezcan@gmail.com">m.egetezcan@gmail.com</FooterPill>
      <FooterPill>LinkedIn</FooterPill>
      <FooterPill>X</FooterPill>
    </footer>
  )
}
