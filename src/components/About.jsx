import { useReveal } from '../hooks/useReveal'

const designTools = ['Figma', 'Framer', 'Adobe Suite', 'Blender', 'After Effects', 'Principle']
const techTools = ['React', 'JavaScript', 'Python', 'Tailwind', 'Node.js', 'Arduino', 'TouchDesigner', 'p5.js']

export default function About() {
  const [ref, visible] = useReveal(0.1)

  return (
    <section id="about" ref={ref} className="px-6 py-16 md:py-24 max-w-4xl mx-auto">
      <div className={`border-t border-border pt-12 md:pt-16 fade-in ${visible ? 'visible' : ''}`}>
        <div className="flex flex-col md:flex-row gap-10 md:gap-14">
          <div className="md:w-52 shrink-0">
            <div className="bg-mat p-2.5 sm:p-3 w-40 md:w-full">
              <img
                src="https://www.artic.edu/iiif/2/aa870b0d-5a1b-660a-6dc6-56c12109cf6e/full/1200,/0/default.jpg"
                alt="Portrait of Ege Tezcan"
                className="w-full aspect-[3/4] object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="flex-1">
            <p className="text-[15px] text-ink leading-relaxed mb-4">
              Born in Istanbul, I grew up curious and ended up living in Alaska,
              the Netherlands, and Morocco before landing in New York for grad
              school at NYU ITP.
            </p>
            <p className="text-[15px] text-ink-secondary leading-relaxed mb-8">
              I studied psychology, visual arts, and creative technology — and I
              bring this knowledge to design. I start by understanding real needs
              and the emotions behind them, then move into sketches, prototypes,
              and iterations.
            </p>

            <div className="flex flex-col gap-5">
              <div>
                <p className="text-[12px] text-ink-tertiary uppercase tracking-wider font-mono mb-2">Design</p>
                <p className="text-[13px] text-ink-secondary leading-relaxed">{designTools.join(', ')}</p>
              </div>
              <div>
                <p className="text-[12px] text-ink-tertiary uppercase tracking-wider font-mono mb-2">Technology</p>
                <p className="text-[13px] text-ink-secondary leading-relaxed">{techTools.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
