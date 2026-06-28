import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const counter = { hidden: 0, shown: 100 }

/**
 * Full-screen intro overlay shown on first load.
 * Counts up to 100% then slides away as a curtain reveal.
 */
export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let current = 0
    const id = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 3
      if (current >= 100) {
        current = 100
        clearInterval(id)
      }
      setCount(current)
    }, 90)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-bg"
      initial={{ y: 0 }}
      animate={count >= 100 ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.35 }}
      onAnimationComplete={() => count >= 100 && onDone?.()}
    >
      <div className="grain absolute inset-0" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-6"
      >
        <span className="font-display text-sm uppercase tracking-[0.5em] text-muted">
          Mustafa Studio
        </span>
        <span className="font-display text-7xl font-extrabold text-gradient md:text-9xl">
          {count}
          <span className="text-2xl align-top">%</span>
        </span>
        <div className="h-[2px] w-56 overflow-hidden rounded bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-neon via-neon-2 to-neon-3 transition-[width] duration-150"
            style={{ width: `${count}%` }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
