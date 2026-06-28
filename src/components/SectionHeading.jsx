import { motion } from 'framer-motion'

/**
 * Consistent bilingual heading used by every section.
 * - eyebrow: small uppercase label (e.g. "Skills · المهارات")
 * - titleAr: Arabic heading (string or JSX)
 * - titleEn: English subtitle
 * - align: 'center' (default) or 'start'
 */
export default function SectionHeading({ eyebrow, titleAr, titleEn, align = 'center', children }) {
  const alignCls = align === 'start' ? 'items-start text-right' : 'items-center text-center'
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col ${alignCls}`}
    >
      <span className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-neon-2 md:text-sm">
        {eyebrow}
      </span>
      <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] md:text-5xl">{titleAr}</h2>
      {titleEn && (
        <p dir="ltr" className="mt-2 font-display text-lg font-semibold text-muted md:text-xl">
          {titleEn}
        </p>
      )}
      {children}
    </motion.div>
  )
}
