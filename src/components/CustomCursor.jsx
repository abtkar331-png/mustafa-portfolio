import { useEffect, useRef, useState } from 'react'

/**
 * Custom magnetic cursor with a small dot + a larger trailing ring.
 * Grows / changes label when hovering interactive elements that carry
 * the `data-cursor` attribute (e.g. data-cursor="view" on portfolio images).
 */
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState('')

  useEffect(() => {
    // Only enable on devices with a precise pointer.
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`

      const el = e.target.closest('a, button, [data-cursor]')
      if (el) {
        setHovering(true)
        setLabel(el.getAttribute('data-cursor') || '')
      } else {
        setHovering(false)
        setLabel('')
      }
    }

    let raf
    const loop = () => {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] -ml-1 -mt-1 h-2 w-2 rounded-full bg-white mix-blend-difference"
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9998] flex items-center justify-center rounded-full border border-white/60 text-[10px] font-bold tracking-wide text-white mix-blend-difference transition-[width,height,background-color,opacity] duration-300 ${
          hovering ? 'h-16 w-16 bg-white/10' : 'h-9 w-9'
        }`}
        style={{ marginLeft: hovering ? '-2rem' : '-1.125rem', marginTop: hovering ? '-2rem' : '-1.125rem' }}
      >
        {label && <span className="uppercase">{label}</span>}
      </div>
    </>
  )
}
