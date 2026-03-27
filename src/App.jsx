import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Work from './components/Work'
import Experiments from './components/Experiments'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectPage from './components/ProjectPage'
import ExperimentsPage from './components/ExperimentsPage'

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
      <About />
      <Experiments />
      <Contact />
    </>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:slug" element={<ProjectPage />} />
        <Route path="/experiments" element={<ExperimentsPage />} />
      </Routes>
      <Footer />
    </div>
  )
}
