import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SECTIONS = ['hero', 'skills', 'portfolio', 'contact']

/* Curved down-arrow SVG — mirrors horizontally for right side */
function CurvedDownArrow({ flip = false }) {
  return (
    <svg
      width="36"
      height="56"
      viewBox="0 0 36 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
    >
      {/* curved shaft */}
      <path
        d="M28 4 C28 4, 6 12, 10 34"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* arrowhead */}
      <path
        d="M4 28 L10 36 L18 29"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

export default function SectionArrows() {
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const container = document.getElementById('scroll-container')
    if (!container) return
    const observers = []
    SECTIONS.forEach((id, idx) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIdx(idx) },
        { root: container, threshold: 0.5 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  /* hide on last section (contact) */
  const hasNext = activeIdx < SECTIONS.length - 1
  if (!hasNext) return null

  const goNext = () =>
    document.getElementById(SECTIONS[activeIdx + 1])?.scrollIntoView({ behavior: 'smooth' })

  return (
    <AnimatePresence>
      <Arrow key={`left-${activeIdx}`} side="left" onClick={goNext} />
      <Arrow key={`right-${activeIdx}`} side="right" onClick={goNext} />
    </AnimatePresence>
  )
}

function Arrow({ side, onClick }) {
  const isLeft = side === 'left'

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 0.5, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      whileHover={{ opacity: 1, y: 4 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Next section"
      className={`group fixed top-1/2 z-50 -translate-y-1/2 ${isLeft ? 'left-14' : 'right-5'}`}
    >
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: isLeft ? 0 : 0.4 }}
        className="flex flex-col items-center gap-1"
      >
        {/* glow ring */}
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full border border-neon-2/20 transition-all duration-300 group-hover:border-neon-2/60 group-hover:shadow-[0_0_20px_rgba(151,125,255,0.4)]"
          style={{ background: 'rgba(151,125,255,0.07)' }}
        >
          <svg
            width="18" height="18" viewBox="0 0 18 18" fill="none"
            className="text-neon-2 transition-colors duration-300"
          >
            <path
              d={isLeft
                ? 'M14 3 C14 3, 4 6, 6 13 M2 9 L6 14 L11 10'
                : 'M4 3 C4 3, 14 6, 12 13 M16 9 L12 14 L7 10'
              }
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* dotted line underneath */}
        <div className="flex flex-col items-center gap-[5px]">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-1 w-1 rounded-full bg-neon-2"
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.25 }}
            />
          ))}
        </div>
      </motion.div>
    </motion.button>
  )
}
