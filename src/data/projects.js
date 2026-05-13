import { loadCMS } from './store'

// ——— Defaults (placeholder content, blocks format) ———

const defaultSelectedWork = [
  {
    slug: 'sleeping-ai',
    title: 'Sleeping AI',
    subtitle: 'What happens when we anthropomorphize machines?',
    tags: ['Generative Audio', 'Hardware', 'AI'],
    files: ['#4BA677', '#B17F6E', '#EF6C41'],
    thumbnail: 'https://picsum.photos/seed/sleeping/800/600',
    hero: 'https://picsum.photos/seed/sleeping-hero/1200/600',
    meta: { role: 'Creative Technologist', duration: '10 Weeks', team: 'Solo', tools: 'Python, Arduino, TouchDesigner, GPT-4' },
    blocks: [
      { type: 'text-image', number: '01', title: 'The Problem', text: 'We talk about AI "thinking" and "learning" — but never sleeping. I wanted to explore what rest looks like for a machine. Not as a metaphor, but as a real installation: an AI that generates ambient soundscapes while "dreaming" about its training data.', image: 'https://picsum.photos/seed/sleep-prob/800/600' },
      { type: 'text', number: '02', title: 'Research', text: 'I studied sleep cycles in humans — REM patterns, delta waves, the relationship between memory consolidation and dreaming. Then I mapped those biological rhythms onto generative audio parameters. The question wasn\'t "can AI sleep?" but "what would it sound like if it did?"' },
      { type: 'image-grid', images: ['https://picsum.photos/seed/sleep-r1/800/600', 'https://picsum.photos/seed/sleep-r2/800/600'] },
      { type: 'list', title: 'Key Insights', items: [
        'Sleep isn\'t absence of activity — it\'s a different kind of processing. The AI\'s "dreams" became most interesting when I stopped trying to make them coherent.',
        'Hardware constraints (a single Raspberry Pi) forced creative decisions that made the installation more intimate.',
        'Visitors spent longer with the piece when the room was darker — context shapes perception of AI more than the output itself.',
      ] },
      { type: 'text', number: '03', title: 'Design Process', text: 'The hardest part was the hardware integration. A Raspberry Pi running inference, connected to 4 speakers arranged spatially, with an Arduino controlling ambient lighting. Every component had latency. I spent 3 weeks just getting the audio pipeline to feel "live" rather than pre-rendered.' },
      { type: 'image-grid', images: ['https://picsum.photos/seed/sleep-p1/800/600', 'https://picsum.photos/seed/sleep-p2/800/600'] },
      { type: 'cards', number: '04', title: 'Design Decisions', items: [
        { title: 'Mono speaker → spatial array', text: 'The first prototype used a single speaker. It felt like listening to a recording. Switching to 4 directional speakers made the sound feel alive — like it was breathing around you.' },
        { title: 'No screen, no interface', text: 'I removed all visual UI. No screen showing waveforms, no controls. Just sound and light. This forced visitors to listen rather than watch.' },
        { title: 'Embracing latency as texture', text: 'Instead of fighting the 200ms hardware delay, I incorporated it into the rhythm. The slight lag between light and sound created an organic, breathing quality.' },
      ] },
      { type: 'image', number: '05', title: 'Final Design', src: 'https://picsum.photos/seed/sleep-final/1200/600' },
      { type: 'image-grid', images: ['https://picsum.photos/seed/sleep-s1/600/800', 'https://picsum.photos/seed/sleep-s2/600/800', 'https://picsum.photos/seed/sleep-s3/600/800'], aspect: '3/4' },
      { type: 'metrics', number: '06', title: 'Results', items: [
        { metric: '4 min', label: 'Avg. dwell time', note: 'Visitors stayed and listened' },
        { metric: '150+', label: 'Exhibition visitors', note: 'NYU ITP Winter Show' },
        { metric: '3', label: 'Audio modes', note: 'REM, Deep, Light sleep cycles' },
      ] },
      { type: 'text', number: '07', title: 'Reflection', text: 'This project taught me that the most powerful AI experiences are the ones where the technology disappears. Nobody asked "what model is this running?" They asked "is it actually dreaming?" That\'s the gap between technical demo and meaningful experience.' },
    ],
  },
  {
    slug: 'gutsy',
    title: 'Gutsy',
    subtitle: 'Designing for health decisions when the AI isn\'t sure',
    tags: ['Speculative Design', 'AI Health', 'FigBuild'],
    files: ['#5B8DEF', '#E8A44A', '#D45B7A'],
    thumbnail: 'https://picsum.photos/seed/gutsy/800/600',
    hero: 'https://picsum.photos/seed/gutsy-hero/1200/600',
    meta: { role: 'UX Designer', duration: '8 Weeks', team: '3 People', tools: 'Figma, FigBuild, Miro, GPT-4' },
    blocks: [
      { type: 'text-image', number: '01', title: 'The Problem', text: 'Health apps powered by AI present recommendations with false confidence. "You should eat X." "Your risk level is Y." But the models behind these recommendations have uncertainty ranges they never show. What happens when you design an interface that\'s honest about what it doesn\'t know?', image: 'https://picsum.photos/seed/gutsy-prob/800/600' },
      { type: 'text', number: '02', title: 'Research', text: 'I interviewed 15 people about their health app usage. The pattern: they either trusted everything blindly or dismissed everything as unreliable. There was no middle ground because the interfaces didn\'t offer one.' },
      { type: 'image-grid', images: ['https://picsum.photos/seed/gutsy-r1/800/600', 'https://picsum.photos/seed/gutsy-r2/800/600'] },
      { type: 'list', title: 'Key Insights', items: [
        'People don\'t want certainty — they want to understand the basis for a recommendation.',
        'Visual uncertainty (blurred edges, gradient ranges) was more intuitive than numerical confidence scores.',
        'Users trusted the app MORE when it admitted uncertainty. Honesty builds trust faster than false precision.',
      ] },
      { type: 'text', number: '03', title: 'Design Process', text: 'I used FigBuild to create a working prototype that pulled from a mock AI backend. The prototype surfaced uncertainty visually — using gradient bars instead of exact numbers, showing the range of possible recommendations.' },
      { type: 'image-grid', images: ['https://picsum.photos/seed/gutsy-p1/800/600', 'https://picsum.photos/seed/gutsy-p2/800/600'] },
      { type: 'cards', number: '04', title: 'Design Decisions', items: [
        { title: 'Gradients over numbers', text: 'Instead of "82% match," the UI shows a gradient bar with the likely range. Users understood intuitively that wider gradients meant less certainty.' },
        { title: '"Show me why" expansion', text: 'Every recommendation has a tap-to-expand that shows the reasoning: which data points contributed, which were missing, and what would change the recommendation.' },
        { title: 'Speculative mode', text: 'A "What if?" toggle lets users adjust inputs and watch recommendations shift in real-time. This turned passive consumption into active exploration.' },
      ] },
      { type: 'image', number: '05', title: 'Final Design', src: 'https://picsum.photos/seed/gutsy-final/1200/600' },
      { type: 'image-grid', images: ['https://picsum.photos/seed/gutsy-s1/600/800', 'https://picsum.photos/seed/gutsy-s2/600/800', 'https://picsum.photos/seed/gutsy-s3/600/800'], aspect: '3/4' },
      { type: 'metrics', number: '06', title: 'Results', items: [
        { metric: '+40%', label: 'Trust score', note: 'vs. baseline interface' },
        { metric: '3x', label: 'Engagement depth', note: 'Users explored more' },
        { metric: '0', label: 'Blind trust', note: 'All users checked reasoning' },
      ] },
      { type: 'text', number: '07', title: 'Reflection', text: 'Uncertainty isn\'t a bug to hide — it\'s information to design for. Every AI interface that hides confidence levels is making a choice to prioritize conversion over trust.' },
    ],
  },
  {
    slug: 'canvas-ai',
    title: 'CanvasAI',
    subtitle: 'When AI tries to read your intent from how you move',
    tags: ['AI Inference', 'Physical Computing', 'iOS'],
    files: ['#7B61FF', '#4ECDC4', '#FF6B6B'],
    thumbnail: 'https://picsum.photos/seed/canvas/800/600',
    hero: 'https://picsum.photos/seed/canvas-hero/1200/600',
    meta: { role: 'Designer + Developer', duration: '12 Weeks', team: '2 People', tools: 'Swift, Core Motion, Python, Figma' },
    blocks: [
      { type: 'text-image', number: '01', title: 'The Problem', text: 'Drawing apps give you tools. You pick a brush, pick a color, draw. But what if the app watched how you move your hand and inferred what you\'re trying to create? Not autocomplete for art — more like a collaborator that anticipates your next move.', image: 'https://picsum.photos/seed/canvas-prob/800/600' },
      { type: 'text', number: '02', title: 'Research', text: 'I studied gesture recognition research, Core Motion sensor data, and parallax-based UI patterns. The key insight: phone accelerometer data contains far more information about user intent than touch coordinates alone.' },
      { type: 'image-grid', images: ['https://picsum.photos/seed/canvas-r1/800/600', 'https://picsum.photos/seed/canvas-r2/800/600'] },
      { type: 'list', title: 'Key Insights', items: [
        'Speed of movement correlates with confidence. Fast strokes = the user knows what they want. Slow = exploration.',
        'Tilt angle maps naturally to brush pressure. Users discovered this without being told.',
        'The AI got intent wrong 30% of the time. But the wrong guesses were often more interesting than the right ones.',
      ] },
      { type: 'text', number: '03', title: 'Design Process', text: 'The inference pipeline: Core Motion data → feature extraction → lightweight on-device model → UI adaptation. The model ran at 60fps on-device. No cloud round-trip. The challenge was making suggestions feel like collaboration, not correction.' },
      { type: 'image-grid', images: ['https://picsum.photos/seed/canvas-p1/800/600', 'https://picsum.photos/seed/canvas-p2/800/600'] },
      { type: 'cards', number: '04', title: 'Design Decisions', items: [
        { title: 'Suggestions, not corrections', text: 'The AI offers ghost previews of what it thinks you\'re drawing. Accept by continuing in that direction or reject by deviating. No buttons, no prompts.' },
        { title: 'On-device inference only', text: 'Privacy and latency both demanded on-device processing. A 3MB Core ML model running at 60fps.' },
        { title: 'Celebrating wrong guesses', text: 'When the AI misread intent, the "wrong" suggestion often sparked new creative directions. I added a feature to save these "happy accidents."' },
      ] },
      { type: 'image', number: '05', title: 'Final Design', src: 'https://picsum.photos/seed/canvas-final/1200/600' },
      { type: 'image-grid', images: ['https://picsum.photos/seed/canvas-s1/600/800', 'https://picsum.photos/seed/canvas-s2/600/800', 'https://picsum.photos/seed/canvas-s3/600/800'], aspect: '3/4' },
      { type: 'metrics', number: '06', title: 'Results', items: [
        { metric: '70%', label: 'Intent accuracy', note: 'On first suggestion' },
        { metric: '60fps', label: 'Inference speed', note: 'On-device, no cloud' },
        { metric: '45%', label: 'Kept wrong guesses', note: 'Happy accidents' },
      ] },
      { type: 'text', number: '07', title: 'Reflection', text: 'Users didn\'t care about the AI accuracy percentage. They cared about whether it felt like a good collaborator. A 70% accurate model that feels responsive beats a 95% accurate model with 500ms latency.' },
    ],
  },
]

const defaultProofProject = {
  slug: 'travel-app',
  title: 'Travel App',
  subtitle: 'Reducing decision fatigue in trip planning',
  tags: ['UX Design', 'Mobile'],
  thumbnail: 'https://picsum.photos/seed/travel/800/600',
  hero: 'https://picsum.photos/seed/travel-hero/1200/600',
  problem: 'Trip planning apps overwhelm users with options. 47 hotels, 200 restaurants, infinite itinerary combinations. Users spend more time planning than traveling.',
  insight: 'People don\'t want more choices — they want fewer, better ones. Constraint-based filtering ("3 days, $200/day, walkable") reduced decision time by 60%.',
  screens: ['https://picsum.photos/seed/travel-s1/400/800', 'https://picsum.photos/seed/travel-s2/400/800', 'https://picsum.photos/seed/travel-s3/400/800'],
  outcome: '60% faster trip creation, 4.2/5 user satisfaction in usability testing with 12 participants.',
}

const defaultExperiments = [
  { title: 'Light Sculpture', tags: ['Arduino', 'LEDs'], image: 'https://picsum.photos/seed/exp-light/600/600', description: 'An interactive light installation responding to presence and movement. Ultrasonic sensors trigger individually addressable LEDs housed in a laser-cut birch frame.' },
  { title: 'Data Garden', tags: ['Physical Computing'], image: 'https://picsum.photos/seed/exp-garden/600/600', description: 'Digital plants that grow from real-world sensor data — humidity, temperature, and soil moisture drive generative visuals.' },
  { title: 'Sound Map', tags: ['Creative Coding', 'p5.js'], image: 'https://picsum.photos/seed/exp-sound/600/600', description: 'Interactive map layering ambient sounds from different NYC neighborhoods into a generative visual composition.' },
  { title: 'Wearable Display', tags: ['Fabrication', 'LEDs'], image: 'https://picsum.photos/seed/exp-wear/600/600', description: 'A flexible LED garment that responds to body movement and surrounding audio frequencies.' },
  { title: 'Kinetic Wall', tags: ['Motors', 'Sensors'], image: 'https://picsum.photos/seed/exp-kinetic/600/600', description: 'Servo-actuated panels creating wave patterns triggered by proximity sensors. Built for a gallery installation.' },
  { title: 'Generative Poster', tags: ['p5.js', 'Print'], image: 'https://picsum.photos/seed/exp-poster/600/600', description: 'Code-generated poster series where each print is unique, driven by real-time weather data at the moment of generation.' },
]

// ——— Read from CMS (localStorage) or fall back to defaults ———

const cms = loadCMS()

export const selectedWork = cms?.selectedWork ?? defaultSelectedWork
export const proofProject = cms?.proofProject ?? defaultProofProject
export const experiments = cms?.experiments ?? defaultExperiments

export { defaultSelectedWork, defaultProofProject, defaultExperiments }
