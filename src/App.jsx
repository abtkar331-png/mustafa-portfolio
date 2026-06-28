import { useRef, useState } from 'react'
import CustomCursor from './components/CustomCursor'
import Preloader from './components/Preloader'
import SideNav from './components/SideNav'
import Hero from './sections/Hero'
import Skills from './sections/Skills'
import Portfolio from './sections/Portfolio'
import Contact from './sections/Contact'
import { PageTransitionProvider, usePageNav } from './components/PageTransition'

function AppInner() {
  const [loaded, setLoaded] = useState(false)
  const scrollRef = useRef(null)
  const navigate = usePageNav()

  return (
    <>
      <CustomCursor />
      <Preloader onDone={() => setLoaded(true)} />
      <SideNav />

      <div className="site-grid" aria-hidden="true" />

      <div
        id="scroll-container"
        ref={scrollRef}
        className={`transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <Hero onSeeWork={() => navigate('portfolio')} />
        <Skills />
        <Portfolio />
        <Contact />
      </div>
    </>
  )
}

export default function App() {
  return (
    <PageTransitionProvider>
      <AppInner />
    </PageTransitionProvider>
  )
}
