export const experiments = [
  {
    title: 'Data Garden',
    tags: ['Physical Computing', 'Arduino'],
    image: 'https://www.artic.edu/iiif/2/c612af6e-f630-487e-5b85-3a15381065fc/full/1200,/0/default.jpg',
    description: 'An installation that visualizes environmental sensor data as generative digital plants growing in real time.',
  },
  {
    title: 'Sound Map',
    tags: ['Creative Coding', 'p5.js'],
    image: 'https://www.artic.edu/iiif/2/50ac2e3e-1d1a-553f-6aeb-5c22cf323a8e/full/843,/0/default.jpg',
    description: 'Interactive map capturing and layering ambient sounds from different NYC neighborhoods.',
  },
  {
    title: 'Wearable Display',
    tags: ['Fabrication', 'LEDs'],
    image: 'https://www.artic.edu/iiif/2/ec272cba-5f5c-dcc1-00e3-00dfdb042a52/full/1200,/0/default.jpg',
    description: 'A flexible LED garment that responds to body movement and surrounding audio frequencies.',
  },
  {
    title: 'Kinetic Wall',
    tags: ['Motors', 'Sensors'],
    image: 'https://www.artic.edu/iiif/2/b703b636-976c-b35b-8a8e-f8df3f5ba003/full/843,/0/default.jpg',
    description: 'Mechanical wall with servo-actuated panels creating wave patterns triggered by proximity.',
  },
  {
    title: 'Projection Map',
    tags: ['TouchDesigner'],
    image: 'https://www.artic.edu/iiif/2/18adfd19-6c76-989e-36ae-1343aa15701b/full/1200,/0/default.jpg',
    description: 'Real-time generative projections that transform architectural surfaces into living canvases.',
  },
  {
    title: 'Generative Poster',
    tags: ['p5.js', 'Print'],
    image: 'https://www.artic.edu/iiif/2/4a04138f-43d8-cd9f-5ac4-478cd8828210/full/843,/0/default.jpg',
    description: 'Code-generated poster series where each print is unique, driven by real-time weather data.',
  },
]

export const projects = [
  {
    slug: 'ticket-system',
    title: 'Ticket System',
    subtitle: 'Redesigning support into conversation',
    description:
      'Transforming a static support ticket form into a guided, conversational experience that reduced resolution time by 2.4x.',
    tags: ['UX Design', 'Research'],
    thumbnail:
      'https://www.artic.edu/iiif/2/d9bde524-38b2-4262-3338-e4d06a50746d/full/843,/0/default.jpg',
    hero: 'https://www.artic.edu/iiif/2/a34d9d72-c4ec-0750-389e-a01215c9aab0/full/1200,/0/default.jpg',
    meta: {
      role: 'Lead UX Designer',
      duration: '8 Weeks',
      team: '3 People',
      tools: 'Figma, Maze, Miro',
    },
    sections: {
      problem: {
        text: 'The existing support system treated every ticket the same \u2014 a blank form with no context. Users had to re-explain issues, navigate confusing category trees, and wait without knowing what was happening. Completion rates sat at 41%, resolution time averaged 4.2 days, and satisfaction scores reflected the pain.',
        image:
          'https://www.artic.edu/iiif/2/c95d58bf-fe9e-e5bb-2c71-ab8bad984759/full/1200,/0/default.jpg',
      },
      research: {
        text: 'I interviewed 12 support agents and 20 users to understand the full lifecycle of a ticket. The patterns were clear: most issues fell into just 4 categories, but the form made every problem feel unique and complex. Users described the experience as \u201cshouting into a void.\u201d',
        images: [
          'https://www.artic.edu/iiif/2/f2021182-1302-f76f-97f1-4e7850030e3b/full/843,/0/default.jpg',
          'https://www.artic.edu/iiif/2/8111acce-c8ce-2ef3-5f32-61cd63905c7d/full/1200,/0/default.jpg',
        ],
        insights: [
          "Users abandon tickets when they can't estimate resolution time \u2014 uncertainty breeds frustration.",
          "Most issues fall into 4 patterns, but users don't know that. Guided paths reduce cognitive load.",
          'Tone matters as much as function \u2014 a warm, conversational UI reduces perceived effort by 40%.',
        ],
      },
      process: {
        text: 'The core idea: replace the blank form with a guided flow that adapts based on user input. Each step narrows the problem space and shows an estimated timeline. I started with paper sketches to explore flow structures, then moved to low-fi wireframes in Figma. Testing early flows with 5 users confirmed the conversational framing resonated.',
        images: [
          'https://www.artic.edu/iiif/2/a9a3e2fa-f7a4-2713-00ed-909062cb48d7/full/1200,/0/default.jpg',
          'https://www.artic.edu/iiif/2/7f1ea423-7538-3bc7-3d4a-0766522ab62f/full/1200,/0/default.jpg',
        ],
      },
      decisions: [
        {
          title: 'Conversational flow over static forms',
          text: 'The system presents one question at a time in a chat-like format, reducing visual clutter and making the process feel like getting help rather than filling out paperwork.',
        },
        {
          title: "Contextual help that doesn't interrupt",
          text: 'Relevant help articles appear alongside the flow \u2014 not in a popup. This resolved 23% of issues before submission, reducing agent workload significantly.',
        },
        {
          title: 'Transparent timeline from the start',
          text: 'Every ticket shows an estimated resolution time based on category and current queue depth. Users know what to expect from the moment they submit.',
        },
      ],
      final: {
        hero: 'https://www.artic.edu/iiif/2/a34d9d72-c4ec-0750-389e-a01215c9aab0/full/1200,/0/default.jpg',
        screens: [
          'https://www.artic.edu/iiif/2/d9bde524-38b2-4262-3338-e4d06a50746d/full/843,/0/default.jpg',
          'https://www.artic.edu/iiif/2/c95d58bf-fe9e-e5bb-2c71-ab8bad984759/full/1200,/0/default.jpg',
          'https://www.artic.edu/iiif/2/f2021182-1302-f76f-97f1-4e7850030e3b/full/843,/0/default.jpg',
        ],
      },
      results: [
        { metric: '68%', label: 'Completion rate', note: 'Up from 41%' },
        { metric: '31%', label: 'CSAT improvement', note: 'Measured post-launch' },
        { metric: '2.4\u00d7', label: 'Faster resolution', note: 'Avg. time to close' },
      ],
      reflection:
        "This project taught me that the frame around a problem matters as much as the solution inside it. A ticket form and a conversation can collect the same information \u2014 but one feels like work and the other feels like help. If I revisited this, I'd explore voice input as an entry point and experiment with AI-assisted categorization.",
    },
  },
  {
    slug: 'design-system',
    title: 'Design System',
    subtitle: 'Building a shared language between design and engineering',
    description:
      'Creating a component library and token architecture adopted by all 4 product teams, reducing prototyping time by 60%.',
    tags: ['Product Design', 'Systems'],
    thumbnail:
      'https://www.artic.edu/iiif/2/3eaab3a3-2b47-9fdd-121c-050f6b8d9ccb/full/1200,/0/default.jpg',
    hero: 'https://www.artic.edu/iiif/2/237c25a2-6051-a8e7-1610-a01938d4deab/full/843,/0/default.jpg',
    meta: {
      role: 'Design Systems Lead',
      duration: '12 Weeks',
      team: '5 People',
      tools: 'Figma, Storybook, React, Tokens Studio',
    },
    sections: {
      problem: {
        text: 'Four product teams were designing in silos. A visual audit revealed 47 unique button styles, 12 color palettes, and zero shared components. Every feature required rebuilding basic UI from scratch, and design-engineering handoffs were a constant source of friction and bugs.',
        image:
          'https://www.artic.edu/iiif/2/7c752046-744f-2f68-482b-a7fd42550f2b/full/843,/0/default.jpg',
      },
      research: {
        text: 'I interviewed designers and engineers across all 4 teams to understand their workflows, pain points, and what they actually needed from a shared system. The key finding: previous attempts at standardization failed because they were mandated top-down rather than built collaboratively.',
        images: [
          'https://www.artic.edu/iiif/2/8eccb189-92f3-353a-3337-c0778c2680d9/full/1200,/0/default.jpg',
          'https://www.artic.edu/iiif/2/91c51644-871f-cda9-82bb-94f4973ae339/full/1200,/0/default.jpg',
        ],
        insights: [
          'Teams adopt systems they helped build. Mandated systems get worked around.',
          'Tokens matter more than components \u2014 consistent spacing, color, and type scale fix 80% of inconsistency.',
          'Documentation is the product. A component without clear guidance is a component nobody uses correctly.',
        ],
      },
      process: {
        text: 'I started with a cross-team audit to understand the overlap, then designed the token architecture before touching any components. Tokens were the foundation \u2014 color, spacing, typography, shadows \u2014 defined once and consumed everywhere. Components came next, designed for composability over prescription.',
        images: [
          'https://www.artic.edu/iiif/2/4a04138f-43d8-cd9f-5ac4-478cd8828210/full/843,/0/default.jpg',
          'https://www.artic.edu/iiif/2/2e7e28aa-a77b-c7f8-852b-708c1171f928/full/1200,/0/default.jpg',
        ],
      },
      decisions: [
        {
          title: 'Tokens-first architecture',
          text: 'Instead of jumping to components, I built a semantic token layer mapping design decisions to named variables. This made the system flexible enough to support theming and dark mode from day one.',
        },
        {
          title: 'Composable, not prescriptive',
          text: 'Components were designed as building blocks, not templates. Teams could compose them freely while staying within the visual language \u2014 reducing pushback and increasing adoption.',
        },
        {
          title: 'Living documentation',
          text: "Every component ships with usage guidelines, do/don't examples, and code snippets in Storybook. The docs are the single source of truth, updated alongside the code.",
        },
      ],
      final: {
        hero: 'https://www.artic.edu/iiif/2/237c25a2-6051-a8e7-1610-a01938d4deab/full/843,/0/default.jpg',
        screens: [
          'https://www.artic.edu/iiif/2/3eaab3a3-2b47-9fdd-121c-050f6b8d9ccb/full/1200,/0/default.jpg',
          'https://www.artic.edu/iiif/2/7c752046-744f-2f68-482b-a7fd42550f2b/full/843,/0/default.jpg',
          'https://www.artic.edu/iiif/2/8eccb189-92f3-353a-3337-c0778c2680d9/full/1200,/0/default.jpg',
        ],
      },
      results: [
        { metric: '60%', label: 'Faster prototyping', note: 'Across all teams' },
        { metric: '40%', label: 'Fewer QA bugs', note: 'First quarter post-launch' },
        { metric: '4/4', label: 'Team adoption', note: 'All product teams onboarded' },
      ],
      reflection:
        "A design system is a product, not a project \u2014 it needs ongoing care, advocacy, and evolution. The hardest part wasn't designing components; it was building trust across teams that this time would be different from previous failed attempts at standardization.",
    },
  },
  {
    slug: 'light-sculpture',
    title: 'Light Sculpture',
    subtitle: 'An interactive installation responding to presence',
    description:
      'A physical computing piece that translates human movement into light, exhibited at the NYU ITP Winter Show.',
    tags: ['Creative Coding', 'Physical'],
    thumbnail:
      'https://www.artic.edu/iiif/2/5de78980-17d7-8fb5-83de-7b2ae4e997f2/full/1200,/0/default.jpg',
    hero: 'https://www.artic.edu/iiif/2/2e7e28aa-a77b-c7f8-852b-708c1171f928/full/1200,/0/default.jpg',
    meta: {
      role: 'Creative Technologist',
      duration: '6 Weeks',
      team: 'Solo Project',
      tools: 'Arduino, TouchDesigner, p5.js, Laser Cutting',
    },
    sections: {
      problem: {
        text: 'Most digital art creates a screen between the viewer and the experience. I wanted to explore what happens when computation becomes invisible \u2014 when light responds to your body without any visible interface. The question: can technology feel like magic?',
        image:
          'https://www.artic.edu/iiif/2/5de78980-17d7-8fb5-83de-7b2ae4e997f2/full/1200,/0/default.jpg',
      },
      research: {
        text: 'I studied the work of James Turrell, Olafur Eliasson, and teamLab \u2014 artists who use light and space to create immersive experiences. The common thread: the most powerful moments happen when viewers realize their own presence is part of the piece.',
        images: [
          'https://www.artic.edu/iiif/2/a9a3e2fa-f7a4-2713-00ed-909062cb48d7/full/1200,/0/default.jpg',
          'https://www.artic.edu/iiif/2/7f1ea423-7538-3bc7-3d4a-0766522ab62f/full/1200,/0/default.jpg',
        ],
        insights: [
          "People engage more deeply when they discover cause and effect on their own \u2014 don't explain the interaction.",
          'Warm light feels inviting; cool light feels distant. Color temperature shapes emotional response.',
          'The lag between gesture and response matters \u2014 50ms feels instant, 200ms feels responsive, 500ms feels broken.',
        ],
      },
      process: {
        text: 'I started with sensor experiments \u2014 testing ultrasonic, infrared, and camera-based tracking. Ultrasonic sensors won for their reliability and invisibility. The frame was laser-cut from birch plywood, housing 144 individually addressable LEDs. TouchDesigner handled the real-time mapping from sensor data to light patterns.',
        images: [
          'https://www.artic.edu/iiif/2/8111acce-c8ce-2ef3-5f32-61cd63905c7d/full/1200,/0/default.jpg',
          'https://www.artic.edu/iiif/2/f2021182-1302-f76f-97f1-4e7850030e3b/full/843,/0/default.jpg',
        ],
      },
      decisions: [
        {
          title: 'Ultrasonic sensors over cameras',
          text: 'Cameras offered more data but required visible hardware and raised privacy concerns. Ultrasonic sensors were invisible, reliable, and kept the focus on the experience.',
        },
        {
          title: 'Warm LEDs, not RGB',
          text: 'Instead of full RGB, I used warm white LEDs with variable intensity. This created a more intimate, natural feeling \u2014 like candlelight responding to your presence.',
        },
        {
          title: 'Wood frame as part of the art',
          text: "The laser-cut birch frame isn't just structural \u2014 the wood grain and geometric patterns become part of the visual experience as light passes through and around it.",
        },
      ],
      final: {
        hero: 'https://www.artic.edu/iiif/2/2e7e28aa-a77b-c7f8-852b-708c1171f928/full/1200,/0/default.jpg',
        screens: [
          'https://www.artic.edu/iiif/2/5de78980-17d7-8fb5-83de-7b2ae4e997f2/full/1200,/0/default.jpg',
          'https://www.artic.edu/iiif/2/a34d9d72-c4ec-0750-389e-a01215c9aab0/full/1200,/0/default.jpg',
          'https://www.artic.edu/iiif/2/237c25a2-6051-a8e7-1610-a01938d4deab/full/843,/0/default.jpg',
        ],
      },
      results: [
        { metric: '200+', label: 'Visitors', note: 'NYU ITP Winter Show' },
        { metric: '4 min', label: 'Avg. engagement', note: 'Per visitor interaction' },
        {
          metric: '\u221e',
          label: 'Unique patterns',
          note: 'Generative, never repeats',
        },
      ],
      reflection:
        "Working with physical materials taught me something digital design often hides: constraints are creative fuel. When a sensor has a 3-meter range, you design for intimacy. When wood warps, you design for forgiveness. The most important lesson was learning to let go of pixel-perfect control and embrace the beauty of imperfection.",
    },
  },
]
