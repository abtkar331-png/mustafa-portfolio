import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import WavyArrow from '../components/WavyArrow'

gsap.registerPlugin(ScrollTrigger)

const skills = [
  { name: 'Adobe Photoshop', level: 95, color: 'from-blue-500 to-cyan-400' },
  { name: 'Adobe Premiere Pro', level: 80, color: 'from-violet-500 to-fuchsia-500' },
  { name: 'After Effects', level: 75, color: 'from-purple-500 to-indigo-500' },
  { name: 'AI Image Generation', level: 90, color: 'from-pink-500 to-rose-400' },
  { name: 'Lightroom', level: 94, color: 'from-cyan-500 to-teal-400' },
]

const primaryBadges = [
  { src: `${import.meta.env.BASE_URL}photoshop.png`, label: 'Adobe Photoshop', glow: '#31A8FF' },
  { src: `${import.meta.env.BASE_URL}illustrator.png`, label: 'Adobe Illustrator', glow: '#FF9A00' },
  { src: `${import.meta.env.BASE_URL}premiere-pro.png`, label: 'Adobe Premiere Pro', glow: '#9A7CFF' },
  { src: `${import.meta.env.BASE_URL}after-effects.png`, label: 'After Effects', glow: '#C79CFF' },
]

const secondaryBadges = [
  { src: `${import.meta.env.BASE_URL}lightroom.png`, label: 'Adobe Lightroom', glow: '#4DC3FF' },
  { src: `${import.meta.env.BASE_URL}figma.png`, label: 'Figma', glow: '#A259FF' },
]

export default function Skills() {
  const root = useRef(null)

  useEffect(() => {
    const scroller = document.getElementById('scroll-container')
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.skill-bar-fill').forEach((bar) => {
        const target = bar.getAttribute('data-level')
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: `${target}%`,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bar,
              scroller,
              start: 'top 90%',
            },
          }
        )
      })
    }, root)

    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [])

  return (
    <section 
      id="skills" 
      ref={root} 
      // تم إزالة min-h-screen واستبدالها بـ min-h-[100dvh] لتجنب التداخل،
      // وإضافة pt-28 لدفع المحتوى لأسفل بمقدار كافٍ (يعادل ارتفاع الـ Navbar تقريباً)
      // وضبط py-16 لتقليل المسافات غير الضرورية
      className="snap-section grain relative overflow-hidden py-20"
    >
      <div className="aurora pointer-events-none absolute bottom-10 right-10 h-[36vh] w-[36vh] rounded-full bg-neon opacity-20 blur-[100px]" />
      <WavyArrow side="left" delay={0.4} />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 lg:px-8">
        
        <div className="flex flex-col items-center text-center" style={{ paddingBottom: '80px' }}>
          <div className="glass inline-block rounded-2xl border border-white/10 px-8 py-4 shadow-xl backdrop-blur-md">
            <h2 className="text-sm font-semibold tracking-widest text-muted uppercase">My Tools &amp; Skills</h2>
          </div>

          {/* Premium glass title card */}
          <div
            className="relative mt-9 inline-block rounded-[1.6rem] bg-gradient-to-tr from-neon/60 via-neon-2/50 to-neon-3/60 p-[1.5px] shadow-2xl neon-glow"
          >
            <div className="rounded-[calc(1.6rem-1.5px)] bg-white/[0.04] px-10 py-5 backdrop-blur-2xl sm:px-14 sm:py-6">
              {/* subtle top sheen */}
              <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              <h3
                className="text-4xl font-extrabold text-ink drop-shadow-[0_2px_12px_rgba(124,58,237,0.45)] sm:text-5xl"
                style={{ fontFamily: 'var(--font-primary-ar)' }}
              >
                أدواتي ومهاراتي
              </h3>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse items-center gap-16 lg:flex-row lg:items-start lg:gap-12" style={{ marginTop: '60px' }}>
          
          {/* Progress bars */}
          <div className="w-full space-y-7 lg:w-1/2" dir="ltr">
            {skills.map((s) => (
              <div key={s.name} className="group">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-base font-semibold tracking-wide text-ink transition-colors group-hover:text-neon">
                    {s.name}
                  </span>
                  <span className="text-sm font-medium text-muted">{s.level}%</span>
                </div>
                <div className="h-3.5 w-full overflow-hidden rounded-full bg-white/10 shadow-inner backdrop-blur-sm">
                  <div
                    className={`skill-bar-fill h-full rounded-full bg-gradient-to-r ${s.color} shadow-[0_0_12px_rgba(255,255,255,0.2)]`}
                    data-level={s.level}
                    style={{ width: 0 }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Floating badges */}
          <div className="flex w-full flex-col items-center gap-6 lg:w-1/2 lg:items-end">
            <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
              {primaryBadges.map((b, i) => (
                <motion.div
                  key={b.label}
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 3.5 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.1, rotate: 5, zIndex: 10 }}
                  data-cursor="Tool"
                  title={b.label}
                  className="group relative flex h-20 w-20 items-center justify-center rounded-2xl glass transition-all hover:shadow-lg sm:h-24 sm:w-24 md:h-28 md:w-28"
                  style={{
                    boxShadow: `0 8px 32px ${b.glow}15, inset 0 1px 0 rgba(255,255,255,0.1)`
                  }}
                >
                  <span
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-40 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${b.glow}, transparent 70%)` }}
                  />
                  <img
                    src={b.src}
                    alt={b.label}
                    className="relative h-10 w-10 object-contain transition-transform duration-500 group-hover:scale-110 sm:h-12 sm:w-12 md:h-14 md:w-14"
                    style={{ filter: `drop-shadow(0 4px 12px ${b.glow}88)` }}
                  />
                </motion.div>
              ))}
            </div>

            <div className="flex w-full flex-wrap justify-center gap-5 sm:gap-6 mt-4">
              {secondaryBadges.map((b, i) => (
                <motion.div
                  key={b.label}
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 3.5 + (i + 4) * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.1, rotate: -5, zIndex: 10 }}
                  data-cursor="Tool"
                  title={b.label}
                  className="group relative flex h-20 w-20 items-center justify-center rounded-2xl glass transition-all hover:shadow-lg sm:h-24 sm:w-24 md:h-28 md:w-28"
                  style={{
                    boxShadow: `0 8px 32px ${b.glow}15, inset 0 1px 0 rgba(255,255,255,0.1)`
                  }}
                >
                  <span
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-40 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${b.glow}, transparent 70%)` }}
                  />
                  <img
                    src={b.src}
                    alt={b.label}
                    className="relative h-10 w-10 object-contain transition-transform duration-500 group-hover:scale-110 sm:h-12 sm:w-12 md:h-14 md:w-14"
                    style={{ filter: `drop-shadow(0 4px 12px ${b.glow}88)` }}
                  />
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}