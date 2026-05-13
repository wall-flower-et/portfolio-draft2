import { useReveal } from '../hooks/useReveal'

export default function Contact() {
  const [ref, visible] = useReveal(0.1)

  return (
    <section id="contact" ref={ref} style={{ padding: 'clamp(40px, 4.63vw, 80px) 0' }}>
      <div className={`border-t border-border-medium reveal ${visible ? 'visible' : ''}`} style={{ paddingTop: 'clamp(32px, 3.70vw, 64px)' }}>
        <p className="font-medium font-body text-primary" style={{ fontSize: 'clamp(16px, 1.39vw, 24px)', marginBottom: '4px' }}>
          Let&rsquo;s work together
        </p>
        <p className="font-body text-secondary" style={{ fontSize: 'clamp(12px, 0.93vw, 16px)', marginBottom: 'clamp(16px, 1.85vw, 32px)' }}>
          Open to full-time roles and select freelance projects.
        </p>
        <div className="flex flex-wrap items-center" style={{ gap: 'clamp(12px, 1.39vw, 24px)' }}>
          <a
            href="mailto:m.egetezcan@gmail.com"
            className="font-medium font-body text-primary hover:text-secondary transition-colors underline underline-offset-4 decoration-border-light hover:decoration-secondary"
            style={{ fontSize: 'clamp(12px, 0.93vw, 16px)', minHeight: '44px', display: 'flex', alignItems: 'center' }}
          >
            m.egetezcan@gmail.com
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in new tab)" className="font-body text-secondary hover:text-primary transition-colors" style={{ fontSize: 'clamp(12px, 0.93vw, 16px)', minHeight: '44px', display: 'flex', alignItems: 'center' }}>
            LinkedIn &nearr;
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter profile (opens in new tab)" className="font-body text-secondary hover:text-primary transition-colors" style={{ fontSize: 'clamp(12px, 0.93vw, 16px)', minHeight: '44px', display: 'flex', alignItems: 'center' }}>
            Twitter &nearr;
          </a>
        </div>
      </div>
    </section>
  )
}
