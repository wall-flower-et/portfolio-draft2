import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProjectCards from './components/ProjectCards'
import Lab from './components/Lab'
import About from './components/About'
import Footer from './components/Footer'
import ProjectPage from './components/ProjectPage'

function Home() {
  return (
    <>
      <Hero />
      <ProjectCards />
      <Lab />
      <About />
    </>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-page">
      <div
        className="max-w-[1728px] mx-auto"
        style={{ padding: 'clamp(24px, 2.95vw, 51px) clamp(12px, 1.39vw, 24px) 0' }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:slug" element={<ProjectPage />} />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}

export default App
