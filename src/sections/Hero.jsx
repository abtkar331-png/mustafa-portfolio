import { motion } from 'framer-motion'
import { Suspense, useState, useEffect, useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import FloatingScene from '../three/FloatingScene'
import MagneticButton from '../components/MagneticButton'
import useIsMobile from '../hooks/useIsMobile'
import WavyArrow from '../components/WavyArrow'
import { usePageNav } from '../components/PageTransition'

const TYPED_WORDS = ['Mustafa', 'مصطفى']

function useTypewriter(words, { typeSpeed = 80, deleteSpeed = 45, holdMs = 2000, pauseMs = 400 } = {}) {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [phase, setPhase] = useState('typing') // 'typing' | 'holding' | 'deleting' | 'pausing'
  const timeout = useRef(null)

  useEffect(() => {
    const word = words[wordIdx]

    if (phase === 'typing') {
      if (display.length < word.length) {
        timeout.current = setTimeout(() => setDisplay(word.slice(0, display.length + 1)), typeSpeed)
      } else {
        timeout.current = setTimeout(() => setPhase('holding'), holdMs)
      }
    } else if (phase === 'holding') {
      timeout.current = setTimeout(() => setPhase('deleting'), 0)
    } else if (phase === 'deleting') {
      if (display.length > 0) {
        timeout.current = setTimeout(() => setDisplay(d => d.slice(0, -1)), deleteSpeed)
      } else {
        timeout.current = setTimeout(() => {
          setWordIdx(i => (i + 1) % words.length)
          setPhase('pausing')
        }, 0)
      }
    } else if (phase === 'pausing') {
      timeout.current = setTimeout(() => setPhase('typing'), pauseMs)
    }

    return () => clearTimeout(timeout.current)
  }, [display, phase, wordIdx, words, typeSpeed, deleteSpeed, holdMs, pauseMs])

  return display
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero({ onSeeWork }) {
  const isMobile = useIsMobile()
  const navigate = usePageNav()
  const typedText = useTypewriter(TYPED_WORDS, { typeSpeed: 80, deleteSpeed: 40, holdMs: 2200, pauseMs: 350 })

  return (
    <section id="hero" className="snap-section grain relative flex min-h-screen items-center overflow-hidden">
      {/* Ambient aurora background - Fixed position to avoid overflowing */}
      <div className="aurora pointer-events-none absolute -top-10 right-0 h-[40vh] w-[40vh] rounded-full bg-neon opacity-40 blur-[120px]" />
      <div className="aurora pointer-events-none absolute bottom-0 left-0 h-[36vh] w-[36vh] rounded-full bg-neon-2 opacity-30 blur-[120px]" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col-reverse items-center justify-between gap-12 px-6 py-20 md:flex-row md:gap-8 md:py-0">
        
        {/* LEFT — Text (Adjusted to LTR alignment for English text) */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          dir="ltr"
          className="flex w-full flex-col items-center text-center md:w-1/2 md:items-start md:text-left"
        >
          <motion.span
            variants={item}
            className="mb-6 inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-medium tracking-wide text-muted shadow-sm backdrop-blur-md"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400" style={{ animation: 'pulse-green 1.5s ease-in-out infinite', boxShadow: '0 0 0 0 rgba(52,211,153,0.7)' }} />
            Available for work
          </motion.span>

          <motion.h1
            variants={item}
            className="font-display text-5xl font-extrabold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl"
          >
            Hi, I&apos;m{' '}
            <span className="text-gradient">
              {typedText}
              <span className="animate-pulse" style={{ opacity: 1 }}>|</span>
            </span>
          </motion.h1>

          <motion.div variants={item} className="mt-6 max-w-lg">
            <p className="text-base leading-relaxed text-muted/90 md:text-lg lg:text-xl">
              Graphic designer & photo-editing specialist — turning ideas into striking visuals through color, light, and creative retouching.
            </p>
          </motion.div>

          {/* Buttons Area - تم التعديل هنا لتوسيط الأزرار دائماً */}
          <motion.div variants={item} className="mt-10 flex w-full flex-wrap items-center justify-center gap-4">
            {/* Primary CTA */}
            <MagneticButton
              onClick={onSeeWork}
              magnetic={false}
              dataCursor="View Work"
              className="group relative flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-bold text-white transition-all duration-300"
              style={{
                padding: '14px 32px',
                background: 'linear-gradient(135deg, var(--neon), var(--neon-2))',
                boxShadow: '0 0 24px rgba(151,125,255,0.45), 0 4px 20px rgba(0,0,0,0.3)',
              }}
            >
              <span className="relative z-10 text-sm font-semibold tracking-widest uppercase">View My Work</span>
              {/* Arrow icon */}
              <svg className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
              {/* Shimmer overlay */}
              <span className="absolute inset-0 z-0 -translate-x-full skew-x-[-20deg] bg-white/20 transition-transform duration-700 group-hover:translate-x-[200%]" />
            </MagneticButton>

            {/* Secondary CTA */}
            <MagneticButton
              onClick={() => navigate('contact')}
              magnetic={false}
              dataCursor="Contact"
              className="group relative flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-bold transition-all duration-300"
              style={{
                padding: '13px 30px',
                background: 'rgba(255,255,255,0.04)',
                border: '1.5px solid rgba(151,125,255,0.35)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <span className="relative z-10 text-sm font-semibold tracking-widest uppercase text-white/80 transition-colors duration-300 group-hover:text-white">Get in Touch</span>
              {/* Glow fill on hover */}
              <span
                className="absolute inset-0 z-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: 'linear-gradient(135deg, rgba(151,125,255,0.15), rgba(0,51,255,0.1))' }}
              />
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* RIGHT — Portrait + layered 3D (Added top margin on mobile to separate from text) */}
        <div className="relative mt-10 flex w-full items-center justify-center md:mt-0 md:w-1/2">
          <div className="relative aspect-square w-[75vw] max-w-[420px] md:w-[90%] lg:w-full">
            
            {/* 3D behind the portrait */}
            <Suspense fallback={null}>
              <FloatingScene layer="back" isMobile={isMobile} />
            </Suspense>

            {/* Glow ring behind the portrait */}
            <div className="absolute left-1/2 top-1/2 h-[75%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-neon/50 to-neon-2/40 blur-[80px]" />

            {/* Framed circular portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-1/2 top-1/2 z-10 aspect-square w-[75%] -translate-x-1/2 -translate-y-1/2"
            >
              {/* Rotating neon ring */}
              <div className="absolute inset-[-4%] animate-spin rounded-full bg-[conic-gradient(from_0deg,#7c3aed,#06b6d4,#ec4899,#7c3aed)] opacity-80 blur-md [animation-duration:10s]" />
              
              {/* Gradient border */}
              <div className="relative h-full w-full rounded-full bg-gradient-to-tr from-neon via-neon-2 to-neon-3 p-[4px] shadow-2xl neon-glow">
                <div className="relative h-full w-full overflow-hidden rounded-full bg-bg-soft">
                    <PortraitMesh />
                    <PortraitPlaceholder />
                    <FloatingIcons />
                </div>
              </div>
            </motion.div>

            {/* 3D in front of the portrait */}
            <div className="pointer-events-none absolute inset-0 z-20">
              <Suspense fallback={null}>
                <FloatingScene layer="front" isMobile={isMobile} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      <WavyArrow side="right" delay={1.4} />

      {/* Scroll hint - Adjusted padding & animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 12, 0] }}
        transition={{ delay: 1.5, duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted/70 transition-colors hover:text-neon"
      >
        <ArrowDown size={28} />
      </motion.div>
    </section>
  )
}

/* Placeholder for your portrait image */
function PortraitPlaceholder() {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-bg-soft p-4 text-center">
        <span className="font-display text-8xl font-extrabold drop-shadow-lg text-gradient">M</span>
        <p className="mt-3 text-xs uppercase tracking-widest text-muted/80">
          Add image to <br />
          <code className="mt-1 block text-[10px] text-neon-2">public/portrait.png</code>
        </p>
      </div>
    )
  }

  return (
    <img
      src={`${import.meta.env.BASE_URL}portrait.png`}
      alt="Mustafa"
      onError={() => setFailed(true)}
      className="relative z-10 h-full w-full scale-110 object-cover object-top transition-transform duration-700 hover:scale-100"
    />
  )
}

/* Animated wavy neon-mesh that sits behind the cut-out portrait */
function PortraitMesh() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {/* colored ambient washes */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(0, 0, 0, 0.55),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_85%,rgba(6,182,212,0.45),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgb(255, 0, 0),transparent_60%)]" />

      {/* wavy animated grid */}
      <svg
        className="absolute inset-0 h-full w-full opacity-70"
        viewBox="0 0 200 200"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="portrait-wave" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.011 0.018" numOctaves="2" seed="7" result="noise">
              <animate
                attributeName="baseFrequency"
                dur="20s"
                values="0.011 0.018;0.02 0.012;0.011 0.018"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="22" />
          </filter>
          <linearGradient id="portrait-mesh-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="50%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
          <pattern id="portrait-grid" width="13" height="13" patternUnits="userSpaceOnUse">
            <path d="M13 0 L0 0 0 13" fill="none" stroke="url(#portrait-mesh-grad)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect x="-30" y="-30" width="260" height="260" fill="url(#portrait-grid)" filter="url(#portrait-wave)" />
      </svg>
    </div>
  )
}

/* Floating icons overlayed on the portrait */
function FloatingIcons() {
  return (
    <div className="pointer-events-none absolute inset-0 z-30">
      <img src={`${import.meta.env.BASE_URL}illustrator.png`} alt="Illustrator" className="floating-icon icon-1" />
      <img src={`${import.meta.env.BASE_URL}lightroom.png`} alt="Lightroom" className="floating-icon icon-2" />
      <img src={`${import.meta.env.BASE_URL}figma.png`} alt="Figma" className="floating-icon icon-3" />
    </div>
  )
}