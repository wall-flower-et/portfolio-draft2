import { useReveal } from '../hooks/useReveal'

export default function Contact() {
  const [ref, visible] = useReveal(0.1)

  return (
    <section id="contact" ref={ref} className="px-6 py-16 md:py-24 max-w-4xl mx-auto">
      <div className={`border-t border-border pt-12 md:pt-16 fade-in ${visible ? 'visible' : ''}`}>
        <p className="text-[15px] font-medium text-ink mb-1">Let's work together</p>
        <p className="text-[13px] text-ink-secondary mb-6">
          Open to full-time roles and select freelance projects.
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[13px]">
          <a
            href="mailto:m.egetezcan@gmail.com"
            className="text-ink hover:text-ink-secondary transition-colors underline underline-offset-4 decoration-border hover:decoration-ink-tertiary py-2"
          >
            m.egetezcan@gmail.com
          </a>
          <a href="https://linkedin.com/in/egetezcan" target="_blank" rel="noopener noreferrer" className="text-ink-secondary hover:text-ink transition-colors py-2">
            LinkedIn ↗
          </a>
          <a href="https://twitter.com/egetezcan" target="_blank" rel="noopener noreferrer" className="text-ink-secondary hover:text-ink transition-colors py-2">
            Twitter ↗
          </a>
        </div>
      </div>
    </section>
  )
}
