import { useParams, useNavigate } from 'react-router-dom'

/* ——— Tag pill ——— */
function Tag({ children, color = '#000', bg = '#E2E2E2' }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full font-medium font-body whitespace-nowrap"
      style={{
        backgroundColor: bg,
        color: color,
        fontSize: 'clamp(10px, 0.81vw, 14px)',
        padding: 'clamp(4px, 0.35vw, 6px) clamp(12px, 1.04vw, 18px)',
        lineHeight: '1.5',
      }}
    >
      {children}
    </span>
  )
}

/* ——— Dot grid background container ——— */
function DotSection({ children, className = '', style = {} }) {
  return (
    <div
      className={`border border-border-medium rounded-lg ${className}`}
      style={{
        backgroundColor: '#F1EFEF',
        backgroundImage: 'radial-gradient(circle, rgba(213, 211, 211, 0.7) 2px, transparent 2px)',
        backgroundSize: '17.28px 17.28px',
        padding: 'clamp(24px, 2.78vw, 48px) clamp(24px, 2.78vw, 48px)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/* ——— Placeholder image block ——— */
function PlaceholderImage({ aspect = '16 / 9', label = '' }) {
  return (
    <div
      className="w-full bg-surface border border-border-medium rounded-md overflow-hidden relative"
      style={{ aspectRatio: aspect }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-display text-primary opacity-10"
          style={{ fontSize: 'clamp(24px, 2.78vw, 48px)' }}
        >
          {label}
        </span>
      </div>
    </div>
  )
}

/* ——— Section heading with folder icon ——— */
function SectionHeading({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 'clamp(24px, 2.78vw, 48px)' }}>
      <h2
        className="font-medium font-body text-primary"
        style={{
          fontSize: 'clamp(18px, 1.63vw, 28px)',
          lineHeight: '1.33',
          letterSpacing: '-1px',
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="font-medium font-body text-secondary"
          style={{
            fontSize: 'clamp(12px, 1.05vw, 18px)',
            lineHeight: '1.33',
            letterSpacing: '-0.5px',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

/* ——— Nav pill (Next/Previous) ——— */
function NavButton({ children, onClick, align = 'left' }) {
  return (
    <div
      className="bg-surface rounded-md shadow-nav flex items-center justify-center"
      style={{
        height: 'clamp(42px, 3.83vw, 66px)',
        padding: 'clamp(5px, 0.47vw, 8px)',
      }}
    >
      <button
        className="bg-control rounded-sm shadow-pill font-medium font-body text-primary whitespace-nowrap flex items-center w-full h-full"
        style={{
          padding: 'clamp(8px, 0.75vw, 13px) clamp(14px, 1.40vw, 24px)',
          fontSize: 'clamp(12px, 0.93vw, 16px)',
          lineHeight: '1.5',
          justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
        }}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  )
}

/* ——— Left Sidebar ——— */
function Sidebar({ slug }) {
  const navigate = useNavigate()

  return (
    <div
      className="shrink-0 sticky flex flex-col"
      style={{
        width: 'clamp(240px, 23.60vw, 406px)',
        top: 'clamp(24px, 2.95vw, 51px)',
        gap: 'clamp(10px, 0.93vw, 16px)',
        alignSelf: 'flex-start',
      }}
    >
      {/* Overview card */}
      <DotSection style={{ padding: 'clamp(20px, 1.86vw, 32px)' }}>
        <h1
          className="font-medium font-body text-primary"
          style={{
            fontSize: 'clamp(20px, 1.86vw, 32px)',
            lineHeight: '1.33',
            letterSpacing: '-1px',
            marginBottom: 'clamp(16px, 1.86vw, 32px)',
          }}
        >
          Project Name
        </h1>
        <p
          className="font-medium font-body text-secondary"
          style={{
            fontSize: 'clamp(12px, 0.93vw, 16px)',
            lineHeight: '1.33',
            letterSpacing: '-1px',
            marginBottom: 'clamp(20px, 1.86vw, 32px)',
          }}
        >
          Project Description short
        </p>

        <div className="flex flex-col" style={{ gap: 'clamp(20px, 1.86vw, 32px)' }}>
          {[
            { label: 'Role', value: 'Lead Designer' },
            { label: 'Duration', value: '8 Weeks' },
            { label: 'Team', value: '3 People' },
            { label: 'Tools', value: 'Figma, Maze, Miro' },
          ].map(({ label, value }) => (
            <div key={label}>
              <p
                className="font-medium font-body text-secondary"
                style={{
                  fontSize: 'clamp(10px, 0.81vw, 14px)',
                  lineHeight: '1.5',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: 'clamp(4px, 0.46vw, 8px)',
                }}
              >
                {label}
              </p>
              <p
                className="font-medium font-body text-primary"
                style={{
                  fontSize: 'clamp(16px, 1.39vw, 24px)',
                  lineHeight: '1.33',
                  letterSpacing: '-0.5px',
                }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
      </DotSection>

      {/* Next / Previous buttons */}
      <NavButton align="right">Next: Project Name &rarr;</NavButton>
      <NavButton onClick={() => navigate('/')}>&larr; Previous: Project Name</NavButton>
    </div>
  )
}

/* ——— Project Page ——— */
export default function ProjectPage() {
  const { slug } = useParams()

  return (
    <div
      className="flex items-start"
      style={{
        gap: 'clamp(12px, 1.05vw, 18px)',
        paddingTop: 'clamp(24px, 2.78vw, 48px)',
      }}
    >
      {/* Left sticky sidebar */}
      <Sidebar slug={slug} />

      {/* Right scrollable content */}
      <div className="flex-1 flex flex-col" style={{ gap: 'clamp(48px, 5.56vw, 96px)' }}>

        {/* Hero Image */}
        <PlaceholderImage aspect="1247 / 781" label="HERO" />

        {/* The Problem */}
        <section>
          <SectionHeading title="The Problem" subtitle="What needed fixing and why it mattered" />
          <div className="flex" style={{ gap: 'clamp(24px, 2.78vw, 48px)' }}>
            <div style={{ flex: 1 }}>
              <p
                className="font-medium font-body text-primary"
                style={{
                  fontSize: 'clamp(14px, 1.28vw, 22px)',
                  lineHeight: '1.8',
                  letterSpacing: '-0.5px',
                }}
              >
                Existing support systems treated every ticket the same — a blank form
                with no context. Users had to re-explain issues, navigate confusing
                category trees, and wait without knowing what was happening.
              </p>
              <br />
              <p
                className="font-medium font-body text-secondary"
                style={{
                  fontSize: 'clamp(12px, 1.05vw, 18px)',
                  lineHeight: '1.6',
                  letterSpacing: '-0.5px',
                }}
              >
                Completion rates were low, average resolution time was high,
                and user satisfaction scores reflected the pain.
              </p>
            </div>
            <div style={{ flex: 1 }}>
              <PlaceholderImage aspect="4 / 3" label="BEFORE" />
            </div>
          </div>
        </section>

        {/* Research */}
        <section>
          <SectionHeading title="Research" subtitle="Listening before designing" />
          <div
            className="grid grid-cols-3"
            style={{ gap: 'clamp(12px, 1.39vw, 24px)', marginBottom: 'clamp(24px, 2.78vw, 48px)' }}
          >
            <PlaceholderImage aspect="1 / 1" label="INTERVIEWS" />
            <PlaceholderImage aspect="1 / 1" label="AFFINITY MAP" />
            <PlaceholderImage aspect="1 / 1" label="JOURNEY MAP" />
          </div>
          <DotSection>
            <h3
              className="font-medium font-body text-primary"
              style={{
                fontSize: 'clamp(16px, 1.39vw, 24px)',
                lineHeight: '1.33',
                letterSpacing: '-0.5px',
                marginBottom: 'clamp(12px, 1.39vw, 24px)',
              }}
            >
              Key Insights
            </h3>
            <div className="flex flex-col" style={{ gap: 'clamp(12px, 1.39vw, 24px)' }}>
              {[
                { num: '01', text: 'Users abandon tickets when they can\'t estimate resolution time — uncertainty breeds frustration.' },
                { num: '02', text: 'Most issues fall into 4 patterns, but users don\'t know that. Guided paths reduce cognitive load.' },
                { num: '03', text: 'Tone matters as much as function — a warm, conversational UI reduces perceived effort by 40%.' },
              ].map(({ num, text }) => (
                <div key={num} className="flex items-start" style={{ gap: 'clamp(8px, 1.05vw, 18px)' }}>
                  <span
                    className="font-display text-primary shrink-0"
                    style={{ fontSize: 'clamp(20px, 2.33vw, 40px)', lineHeight: '1', opacity: 0.2 }}
                  >
                    {num}
                  </span>
                  <p
                    className="font-medium font-body text-primary"
                    style={{ fontSize: 'clamp(12px, 1.05vw, 18px)', lineHeight: '1.6', letterSpacing: '-0.5px' }}
                  >
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </DotSection>
        </section>

        {/* Design Process */}
        <section>
          <SectionHeading title="Design Process" subtitle="From sketches to screens" />
          <div
            className="grid grid-cols-2"
            style={{ gap: 'clamp(12px, 1.39vw, 24px)', marginBottom: 'clamp(24px, 2.78vw, 48px)' }}
          >
            <PlaceholderImage aspect="4 / 3" label="SKETCHES" />
            <PlaceholderImage aspect="4 / 3" label="WIREFRAMES" />
          </div>
          <div className="flex" style={{ gap: 'clamp(24px, 2.78vw, 48px)' }}>
            <p className="flex-1 font-medium font-body text-primary" style={{ fontSize: 'clamp(14px, 1.28vw, 22px)', lineHeight: '1.8', letterSpacing: '-0.5px' }}>
              The core idea: replace the blank form with a guided flow that adapts
              based on user input. Each step narrows the problem space and shows
              an estimated timeline.
            </p>
            <p className="flex-1 font-medium font-body text-secondary" style={{ fontSize: 'clamp(12px, 1.05vw, 18px)', lineHeight: '1.6', letterSpacing: '-0.5px' }}>
              I started with paper sketches to explore flow structures,
              then moved to low-fi wireframes in Figma. Testing early flows with
              5 users confirmed the conversational framing.
            </p>
          </div>
        </section>

        {/* Design Decisions */}
        <section>
          <SectionHeading title="Design Decisions" subtitle="The choices that shaped the outcome" />
          <div className="flex flex-col" style={{ gap: 'clamp(24px, 2.78vw, 48px)' }}>
            {[
              { title: 'Conversational flow over static forms', body: 'The ticket system presents one question at a time in a chat-like format, reducing visual clutter.', label: 'FLOW' },
              { title: 'Contextual help that doesn\'t interrupt', body: 'Relevant help articles appear alongside — not in a popup. This resolved 23% of issues before submission.', label: 'CONTEXT' },
              { title: 'Transparent timeline from the start', body: 'Every ticket shows an estimated resolution time. This improved satisfaction scores by 31%.', label: 'TIMELINE' },
            ].map(({ title, body, label }, i) => (
              <div
                key={i}
                className="flex items-center"
                style={{ gap: 'clamp(24px, 2.78vw, 48px)', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse' }}
              >
                <div style={{ flex: 1 }}>
                  <h3 className="font-medium font-body text-primary" style={{ fontSize: 'clamp(16px, 1.39vw, 24px)', lineHeight: '1.33', letterSpacing: '-0.5px', marginBottom: 'clamp(8px, 1.05vw, 18px)' }}>
                    {title}
                  </h3>
                  <p className="font-medium font-body text-secondary" style={{ fontSize: 'clamp(12px, 1.05vw, 18px)', lineHeight: '1.6', letterSpacing: '-0.5px' }}>
                    {body}
                  </p>
                </div>
                <div style={{ flex: 1 }}>
                  <PlaceholderImage aspect="4 / 3" label={label} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final Design */}
        <section>
          <SectionHeading title="Final Design" subtitle="The polished result" />
          <div style={{ marginBottom: 'clamp(24px, 2.78vw, 48px)' }}>
            <PlaceholderImage aspect="16 / 9" label="FINAL — OVERVIEW" />
          </div>
          <div className="grid grid-cols-2" style={{ gap: 'clamp(12px, 1.39vw, 24px)', marginBottom: 'clamp(24px, 2.78vw, 48px)' }}>
            <PlaceholderImage aspect="9 / 16" label="MOBILE" />
            <PlaceholderImage aspect="9 / 16" label="MOBILE" />
          </div>
          <div className="grid grid-cols-3" style={{ gap: 'clamp(12px, 1.39vw, 24px)' }}>
            <PlaceholderImage aspect="4 / 3" label="SCREEN 01" />
            <PlaceholderImage aspect="4 / 3" label="SCREEN 02" />
            <PlaceholderImage aspect="4 / 3" label="SCREEN 03" />
          </div>
        </section>

        {/* Results */}
        <section>
          <DotSection>
            <SectionHeading title="Results" subtitle="What changed after launch" />
            <div className="grid grid-cols-3" style={{ gap: 'clamp(16px, 2.09vw, 36px)' }}>
              {[
                { metric: '68%', label: 'Ticket completion rate', note: 'up from 41%' },
                { metric: '31%', label: 'Satisfaction improvement', note: 'measured via CSAT' },
                { metric: '2.4×', label: 'Faster resolution', note: 'avg. time to close' },
              ].map(({ metric, label, note }) => (
                <div key={label} className="text-center">
                  <p className="font-display text-primary" style={{ fontSize: 'clamp(32px, 4.07vw, 70px)', lineHeight: '1', marginBottom: 'clamp(6px, 0.70vw, 12px)' }}>
                    {metric}
                  </p>
                  <p className="font-medium font-body text-primary" style={{ fontSize: 'clamp(12px, 1.05vw, 18px)', lineHeight: '1.33', letterSpacing: '-0.5px' }}>
                    {label}
                  </p>
                  <p className="font-medium font-body text-secondary" style={{ fontSize: 'clamp(9px, 0.70vw, 12px)', lineHeight: '1.5' }}>
                    {note}
                  </p>
                </div>
              ))}
            </div>
          </DotSection>
        </section>

        {/* Reflection */}
        <section>
          <SectionHeading title="Reflection" />
          <div style={{ maxWidth: '700px' }}>
            <p className="font-medium font-body text-primary" style={{ fontSize: 'clamp(14px, 1.28vw, 22px)', lineHeight: '1.8', letterSpacing: '-0.5px', marginBottom: 'clamp(12px, 1.39vw, 24px)' }}>
              This project taught me that the frame around a problem matters
              as much as the solution inside it. A ticket form and a conversation
              can collect the same information — but one feels like work
              and the other feels like help.
            </p>
            <p className="font-medium font-body text-secondary" style={{ fontSize: 'clamp(12px, 1.05vw, 18px)', lineHeight: '1.6', letterSpacing: '-0.5px' }}>
              If I revisited this, I'd explore voice input as an entry point
              and experiment with AI-assisted categorization to further
              reduce the steps between "I have a problem" and "help is on the way."
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
