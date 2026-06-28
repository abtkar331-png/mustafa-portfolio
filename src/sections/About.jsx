import { motion } from 'framer-motion'
import { Palette, Wand2, Sparkles, CalendarDays, Layers, Heart, ArrowUpRight } from 'lucide-react'

const stats = [
  { icon: CalendarDays, value: '5+', label: 'Years', ar: 'سنوات خبرة' },
  { icon: Layers, value: '320+', label: 'Projects', ar: 'مشروع' },
  { icon: Heart, value: '98%', label: 'Satisfaction', ar: 'رضا العملاء' },
]

const services = [
  {
    icon: Palette,
    title: 'Color Grading',
    ar: 'دمج الألوان',
    desc: 'Cinematic color harmony that gives every frame its own identity and emotional depth.',
  },
  {
    icon: Wand2,
    title: 'Pro Retouching',
    ar: 'تعديل احترافي',
    desc: 'High-precision retouching with pixel-perfect attention to every subtle detail.',
  },
  {
    icon: Sparkles,
    title: 'Creative Direction',
    ar: 'لمسة إبداعية',
    desc: 'Out-of-the-box concepts that transform a simple brief into a striking visual narrative.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function About() {
  return (
    <section id="about" className="snap-section grain relative overflow-hidden" dir="ltr">
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute -top-32 left-1/4 h-[50vh] w-[50vh] rounded-full bg-neon-3/20 blur-[120px]"
          style={{ opacity: 0.35 }}
        />
        <div
          className="absolute -bottom-20 right-1/4 h-[40vh] w-[40vh] rounded-full bg-neon/15 blur-[100px]"
          style={{ opacity: 0.3 }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        {/* Badge — raised 2cm */}
        <div style={{ transform: 'translateY(-2cm)' }}>
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="mb-12 flex justify-center"
          >
            <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-neon-2 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-neon-2 shadow-[0_0_10px_rgba(var(--neon-2-rgb),0.6)]" />
              About Me
              <span
                className="text-[11px] font-medium lowercase tracking-normal text-muted/60"
                style={{ fontFamily: 'var(--font-primary-ar)' }}
              >
                نبذة عني
              </span>
            </span>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3" style={{ gap: '20px', marginBottom: '24px' }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              custom={i + 2}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              className="group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm transition-colors duration-500 hover:border-white/[0.12] hover:bg-white/[0.04]"
              style={{ padding: '20px 28px' }}
            >
              <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-b from-white/[0.08] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex flex-col items-center gap-3 text-center md:flex-row md:items-center md:gap-5 md:text-left">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-neon/25 via-neon-2/20 to-transparent ring-1 ring-white/5 transition-transform duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(var(--neon-2-rgb),0.25)]">
                  <s.icon size={24} className="text-neon-2" />
                </div>
                <div>
                  <div className="font-display text-3xl font-black tracking-tight text-gradient md:text-4xl">
                    {s.value}
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-ink/75 md:text-sm">
                    {s.label}
                  </div>
                  <div
                    className="text-[11px] text-muted/45"
                    style={{ fontFamily: 'var(--font-primary-ar)' }}
                  >
                    {s.ar}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Services cards — no hover movement */}
        <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: '20px' }}>
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              custom={i + 5}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.015] backdrop-blur-sm transition-colors duration-500 hover:border-white/[0.14] hover:bg-white/[0.04]"
              style={{ padding: '24px 28px' }}
            >
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-neon-2/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-neon/30 via-neon-2/20 to-transparent ring-1 ring-white/5 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_35px_rgba(var(--neon-2-rgb),0.3)]"
                style={{ marginBottom: '20px' }}
              >
                <s.icon size={25} className="text-neon-2" />
              </div>
              <h3 className="flex items-baseline gap-2 font-display text-xl font-bold text-ink">
                {s.title}
                <span
                  dir="rtl"
                  className="text-xs font-medium text-muted/45"
                  style={{ fontFamily: 'var(--font-primary-ar)' }}
                >
                  {s.ar}
                </span>
              </h3>
              <p className="flex-1 text-sm leading-relaxed text-muted/75" style={{ marginTop: '12px' }}>
                {s.desc}
              </p>
              <div
                className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neon-2/60 transition-colors group-hover:text-neon-2"
                style={{ marginTop: '20px' }}
              >
                <span>Learn more</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
