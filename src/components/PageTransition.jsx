import { createContext, useContext, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

const Ctx = createContext(() => {})
export const usePageNav = () => useContext(Ctx)

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/* SVG paths — 100×100 viewBox stretched with preserveAspectRatio="none"
   All paths share the same command structure: M C L L Z
   so Framer Motion can interpolate d="" smoothly. */
const P_HIDDEN = 'M -8 -8 C -8 25, -8 75, -8 108 L -8 108 L -8 -8 Z'
const P_COVER  = 'M 108 -8 C 82 22, 82 78, 108 108 L -8 108 L -8 -8 Z'
const P_EXIT   = 'M 116 -8 C 116 25, 116 75, 116 108 L 116 108 L 116 -8 Z'

/* One liquid SVG layer */
function LiquidLayer({ targetD, color1, color2, id, duration, delay }) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor={color1} />
          <stop offset="100%" stopColor={color2} />
        </linearGradient>
      </defs>
      <motion.path
        fill={`url(#${id})`}
        initial={{ d: P_HIDDEN }}
        animate={{ d: targetD }}
        transition={{ duration, delay, ease: [0.76, 0, 0.24, 1] }}
      />
    </svg>
  )
}

/* Double curtain overlay */
function LiquidCurtain({ status }) {
  const d = status === 'out' ? P_EXIT : P_COVER
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 998, pointerEvents: 'none' }}>
      {/* Back layer — deep blue, enters 2nd, exits 1st */}
      <LiquidLayer
        id="lq1"
        targetD={d}
        color1="#02041e"
        color2="#0600AB"
        duration={0.62}
        delay={status === 'in' ? 0.09 : 0}
      />
      {/* Front layer — dark violet, leads entry, lags exit */}
      <LiquidLayer
        id="lq2"
        targetD={d}
        color1="#0d0630"
        color2="#1a0545"
        duration={0.58}
        delay={status === 'in' ? 0 : 0.09}
      />
    </div>
  )
}

export function PageTransitionProvider({ children }) {
  const [status, setStatus] = useState('idle')

  const navigate = useCallback(
    async (targetId) => {
      if (status !== 'idle') return

      setStatus('in')
      await sleep(700)   // curtain fully covers screen

      const container = document.getElementById('scroll-container')
      const el = document.getElementById(targetId)
      if (container && el) container.scrollTop = el.offsetTop

      await sleep(40)
      setStatus('out')
      await sleep(720)
      setStatus('idle')
    },
    [status]
  )

  return (
    <Ctx.Provider value={navigate}>
      {children}
      {status !== 'idle' && <LiquidCurtain status={status} />}
    </Ctx.Provider>
  )
}
