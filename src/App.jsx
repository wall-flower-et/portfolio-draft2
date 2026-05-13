import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Work from './components/Work'
import Experiments from './components/Experiments'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Carousel from './components/Carousel'
import ProjectPage from './components/ProjectPage'
import ExperimentsPage from './components/ExperimentsPage'
import Admin from './components/Admin'
import ScrollPopup from './components/ScrollPopup'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function Home() {
  return (
    <>
      <Hero />
      <Work />
      <Experiments />
      <Carousel />
      <About />
      <Contact />
    </>
  )
}

export default function App() {
  const { pathname } = useLocation()
  if (pathname === '/admin') return <Admin />

  return (
    <div className="min-h-screen bg-page">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <ScrollToTop />
      <div
        className="max-w-[1728px] mx-auto"
        style={{ padding: 'clamp(24px, 2.95vw, 51px) clamp(12px, 1.39vw, 24px) 0' }}
      >
        <Nav />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:slug" element={<ProjectPage />} />
            <Route path="/experiments" element={<ExperimentsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <ScrollPopup />
    </div>
  )
}
