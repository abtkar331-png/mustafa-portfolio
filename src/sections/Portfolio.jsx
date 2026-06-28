import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw, Eye } from 'lucide-react'
import BeforeAfterSlider from '../components/BeforeAfterSlider'
import WavyArrow from '../components/WavyArrow'

const b = import.meta.env.BASE_URL

/* ضع صورك في مجلد public واستبدل المسارات هنا */
const works = [
  { src: `${b}work1.png`, tag: 'Retouch' },
  { src: `${b}work2.png`, tag: 'Color Grade' },
  { src: `${b}work3.png`, tag: 'Manipulation' },
  { src: `${b}work4.png`, tag: 'Poster' },
  { src: `${b}work5.png`, tag: 'Portrait' },
]

/* بوسترات إعلانية عمودية — ضعهم في public باسم poster1.png و poster2.png */
const posters = [
  { src: `${b}poster1.png`, tag: 'Ad Poster' },
  { src: `${b}poster2.png`, tag: 'Ad Poster' },
]

/* ─── Premium Lightbox ─────────────────────────────────── */
function PremiumLightbox({ images, works, index, onClose, onNext, onPrev }) {
  const [zoom, setZoom] = useState(1)
  const imgRef = useRef(null)

  useEffect(() => { setZoom(1) }, [index])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') { setZoom(1); onNext() }
      if (e.key === 'ArrowLeft')  { setZoom(1); onPrev() }
      if (e.key === '+') setZoom(z => Math.min(+(z + 0.25).toFixed(2), 4))
      if (e.key === '-') setZoom(z => Math.max(+(z - 0.25).toFixed(2), 0.3))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index])

  const zoomIn  = () => setZoom(z => Math.min(+(z + 0.25).toFixed(2), 4))
  const zoomOut = () => setZoom(z => Math.max(+(z - 0.25).toFixed(2), 0.3))
  const reset   = () => setZoom(1)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[998] flex flex-col select-none"
      style={{ background: 'rgba(2,4,30,0.94)', backdropFilter: 'blur(28px)' }}
      onClick={onClose}
    >
      {/* ── Top bar ── */}
      <div
        className="relative z-10 flex items-center justify-between px-6"
        style={{ height: '64px' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Counter */}
        <div className="flex items-center gap-3">
          <span
            className="rounded-full border border-white/10 text-xs font-semibold tracking-widest text-white/60"
            style={{ background: 'rgba(255,255,255,0.06)', padding: '6px 14px' }}
          >
            {index + 1} <span className="text-white/30">/</span> {images.length}
          </span>
          <span
            className="rounded-full text-xs font-bold uppercase tracking-widest"
            style={{
              background: 'linear-gradient(135deg,rgba(151,125,255,0.25),rgba(0,51,255,0.2))',
              border: '1px solid rgba(151,125,255,0.3)',
              color: '#c4b5fd',
              padding: '6px 14px',
            }}
          >
            {works[index].tag}
          </span>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="flex items-center justify-center rounded-2xl border border-white/10 text-white/60 transition-all duration-200 hover:border-white/30 hover:bg-white/10 hover:text-white"
          style={{ width: '44px', height: '44px', background: 'rgba(255,255,255,0.05)' }}
        >
          <X size={18} />
        </button>
      </div>

      {/* ── Image area ── */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden">

        {/* Prev arrow */}
        <button
          onClick={e => { e.stopPropagation(); setZoom(1); onPrev() }}
          aria-label="Previous"
          className="absolute left-4 z-10 flex items-center justify-center rounded-2xl border border-white/10 text-white/60 transition-all duration-200 hover:border-neon-2/50 hover:bg-neon-2/10 hover:text-white"
          style={{ width: '52px', height: '52px', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)' }}
        >
          <ChevronLeft size={24} />
        </button>

        {/* Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -12 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
            drag={zoom > 1}
            dragElastic={0.05}
            dragConstraints={{ left: -600, right: 600, top: -400, bottom: 400 }}
            style={{ cursor: zoom > 1 ? 'grab' : 'default' }}
          >
            <img
              ref={imgRef}
              src={images[index]}
              alt={works[index].tag}
              style={{
                maxWidth: '80vw',
                maxHeight: '65vh',
                objectFit: 'contain',
                transform: `scale(${zoom})`,
                transformOrigin: 'center center',
                transition: 'transform 0.2s ease',
                borderRadius: '16px',
                boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 40px rgba(151,125,255,0.15)',
                display: 'block',
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Next arrow */}
        <button
          onClick={e => { e.stopPropagation(); setZoom(1); onNext() }}
          aria-label="Next"
          className="absolute right-4 z-10 flex items-center justify-center rounded-2xl border border-white/10 text-white/60 transition-all duration-200 hover:border-neon-2/50 hover:bg-neon-2/10 hover:text-white"
          style={{ width: '52px', height: '52px', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)' }}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* ── Bottom zoom bar ── */}
      <div
        className="flex items-center justify-center gap-4"
        style={{ height: '72px' }}
        onClick={e => e.stopPropagation()}
      >
        <div
          className="flex items-center gap-3 rounded-2xl border border-white/10"
          style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(16px)', padding: '10px 20px' }}
        >
          {/* Zoom out */}
          <button
            onClick={zoomOut}
            disabled={zoom <= 0.3}
            className="flex items-center justify-center rounded-xl text-white/60 transition-colors hover:text-white disabled:opacity-30"
            style={{ width: '32px', height: '32px' }}
            aria-label="Zoom out"
          >
            <ZoomOut size={17} />
          </button>

          {/* Slider */}
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={30}
              max={400}
              step={5}
              value={Math.round(zoom * 100)}
              onChange={e => setZoom(+(+e.target.value / 100).toFixed(2))}
              className="zoom-slider"
              style={{ width: '140px', accentColor: '#977dff', cursor: 'pointer' }}
            />
            <span
              className="min-w-[44px] text-center text-xs font-semibold"
              style={{ color: zoom === 1 ? 'rgba(255,255,255,0.5)' : '#c4b5fd' }}
            >
              {Math.round(zoom * 100)}%
            </span>
          </div>

          {/* Zoom in */}
          <button
            onClick={zoomIn}
            disabled={zoom >= 4}
            className="flex items-center justify-center rounded-xl text-white/60 transition-colors hover:text-white disabled:opacity-30"
            style={{ width: '32px', height: '32px' }}
            aria-label="Zoom in"
          >
            <ZoomIn size={17} />
          </button>

          {/* Divider */}
          <span style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)', flexShrink: 0 }} />

          {/* Reset */}
          <button
            onClick={reset}
            className="flex items-center justify-center gap-1.5 rounded-xl text-xs font-semibold text-white/50 transition-colors hover:text-white"
            style={{ padding: '0 8px', height: '32px' }}
            aria-label="Reset zoom"
          >
            <RotateCcw size={13} />
            Reset
          </button>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Main Section ─────────────────────────────────────── */
export default function Portfolio() {
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  /* دمج الصور والأعمال في مصفوفة واحدة للـ lightbox */
  const allWorks = [...works, ...posters]
  const images = allWorks.map((w) => w.src)

  const openLightbox = (i) => setLightboxIndex(i)
  const closeLightbox = () => setLightboxIndex(-1)
  const next = () => setLightboxIndex((s) => (s + 1) % images.length)
  const prev = () => setLightboxIndex((s) => (s - 1 + images.length) % images.length)

  return (
    <section id="portfolio" className="snap-section grain !items-start overflow-y-auto py-20 md:!items-center md:py-0" style={{ position: 'relative' }}>
      <WavyArrow side="right" delay={0.4} />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6" style={{ paddingTop: '3cm' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center"
          style={{ paddingBottom: '60px' }}
        >
          <div className="glass inline-block rounded-2xl border border-white/10 px-8 py-4 shadow-xl backdrop-blur-md">
            <h2 className="text-sm font-semibold tracking-widest text-muted uppercase">Some of my work</h2>
          </div>
          <div className="relative mt-9 inline-block rounded-[1.6rem] bg-gradient-to-tr from-neon/60 via-neon-2/50 to-neon-3/60 p-[1.5px] shadow-2xl neon-glow">
            <div className="rounded-[calc(1.6rem-1.5px)] bg-white/[0.04] px-10 py-5 backdrop-blur-2xl sm:px-14 sm:py-6">
              <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              <h3
                className="text-4xl font-extrabold text-ink drop-shadow-[0_2px_12px_rgba(124,58,237,0.45)] sm:text-5xl"
                style={{ fontFamily: 'var(--font-primary-ar)' }}
              >
                معرض الأعمال
              </h3>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3" style={{ marginTop: '40px' }}>

          {/* ── Before / After slider — no badge ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="neon-card-border lg:col-span-2 lg:row-span-2 h-72 sm:h-96 lg:h-full"
          >
            <div className="neon-card-inner glass h-full p-1">
              <BeforeAfterSlider
                before={`${b}before.png`}
                after={`${b}after.png`}
                beforeLabel="قبل · Before"
                afterLabel="بعد · After"
              />
            </div>
          </motion.div>

          {/* ── Work cards with "View Art" badge ── */}
          {works.map((w, i) => (
            <motion.div
              key={w.src}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="neon-card-border"
            >
              <figure
                data-cursor="عرض"
                className="neon-card-inner group relative glass cursor-pointer"
                onClick={() => openLightbox(i)}
              >
                <img
                  src={w.src}
                  alt={w.tag}
                  className="h-44 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />

                {/* "View Art" frosted glass badge — always visible */}
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <div
                    className="flex items-center gap-2 rounded-full transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(14px)',
                      WebkitBackdropFilter: 'blur(14px)',
                      border: '1px solid rgba(255,255,255,0.18)',
                      padding: '8px 18px',
                      opacity: 0.75,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    }}
                  >
                    <Eye size={13} color="rgba(255,255,255,0.9)" strokeWidth={2} />
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.9)',
                      }}
                    >
                      View Art
                    </span>
                  </div>
                </div>

                {/* Tag label bottom */}
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="rounded-full glass px-3 py-1 text-xs font-bold">{w.tag}</span>
                </figcaption>
              </figure>
            </motion.div>
          ))}
        </div>

        {/* ── Poster row — two tall portrait cards ── */}
        <div className="grid grid-cols-2 gap-6" style={{ marginTop: '24px', paddingBottom: '60px' }}>
          {posters.map((p, i) => (
            <motion.div
              key={p.src}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="neon-card-border"
            >
              <figure
                data-cursor="عرض"
                className="neon-card-inner group relative glass cursor-pointer overflow-hidden"
                style={{ aspectRatio: '4/5' }}
                onClick={() => openLightbox(works.length + i)}
              >
                <img
                  src={p.src}
                  alt={p.tag}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ display: 'block' }}
                />

                {/* Subtle gradient overlay */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: 'linear-gradient(180deg, transparent 50%, rgba(2,4,30,0.55) 100%)',
                  }}
                />

                {/* "View Art" frosted badge — centered */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div
                    className="flex items-center gap-2 rounded-full transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(14px)',
                      WebkitBackdropFilter: 'blur(14px)',
                      border: '1px solid rgba(255,255,255,0.18)',
                      padding: '8px 18px',
                      opacity: 0.75,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    }}
                  >
                    <Eye size={13} color="rgba(255,255,255,0.9)" strokeWidth={2} />
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.9)',
                      }}
                    >
                      View Art
                    </span>
                  </div>
                </div>

                {/* Tag bottom-left */}
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="rounded-full glass px-3 py-1 text-xs font-bold">{p.tag}</span>
                </figcaption>
              </figure>
            </motion.div>
          ))}
        </div>

      </div>

      {/* ── Premium Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex > -1 && (
          <PremiumLightbox
            images={images}
            works={allWorks}
            index={lightboxIndex}
            onClose={closeLightbox}
            onNext={next}
            onPrev={prev}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
