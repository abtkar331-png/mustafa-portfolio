import { useRef, useState, useCallback, useEffect } from 'react'

/**
 * Draggable before/after comparison slider.
 * `before` and `after` are image URLs. Works with mouse + touch.
 * Forced LTR internally so it behaves correctly inside an RTL page.
 */
export default function BeforeAfterSlider({ before, after, beforeLabel = 'قبل', afterLabel = 'بعد' }) {
  const ref = useRef(null)
  const [pos, setPos] = useState(50)
  const [width, setWidth] = useState(0)
  const dragging = useRef(false)

  useEffect(() => {
    const measure = () => ref.current && setWidth(ref.current.offsetWidth)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const update = useCallback((clientX) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width)
    setPos((x / rect.width) * 100)
  }, [])

  const onDown = (e) => {
    dragging.current = true
    update(e.touches ? e.touches[0].clientX : e.clientX)
  }
  const onMove = (e) => {
    if (!dragging.current) return
    update(e.touches ? e.touches[0].clientX : e.clientX)
  }
  const onUp = () => (dragging.current = false)

  return (
    <div
      ref={ref}
      dir="ltr"
      className="group relative h-full w-full cursor-ew-resize select-none overflow-hidden rounded-2xl"
      onMouseDown={onDown}
      onMouseMove={onMove}
      onMouseUp={onUp}
      onMouseLeave={onUp}
      onTouchStart={onDown}
      onTouchMove={onMove}
      onTouchEnd={onUp}
      data-cursor="اسحب"
    >
      {/* After (full, underneath) */}
      <img src={after} alt="after" draggable={false} className="absolute inset-0 h-full w-full object-cover" />
      <span className="absolute bottom-3 right-3 z-[5] rounded-full glass px-3 py-1 text-xs font-bold">{afterLabel}</span>

      {/* Before (clipped from the left) */}
      <div className="absolute top-0 bottom-0 left-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img
          src={before}
          alt="before"
          draggable={false}
          className="absolute top-0 left-0 h-full object-cover"
          style={{ width: width || '100%', maxWidth: 'none' }}
        />
        <span className="absolute bottom-3 left-3 rounded-full glass px-3 py-1 text-xs font-bold">{beforeLabel}</span>
      </div>

      {/* Handle */}
      <div className="absolute top-0 bottom-0 z-10 w-[2px] -translate-x-1/2 bg-white/90" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-bg shadow-lg neon-glow">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 18l-6-6 6-6M15 6l6 6-6 6" />
          </svg>
        </div>
      </div>
    </div>
  )
}
