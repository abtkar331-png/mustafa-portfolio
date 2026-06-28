import { useRef } from 'react'
import { motion } from 'framer-motion'

/**
 * Button that magnetically follows the cursor while hovered,
 * then springs back to center on leave.
 */
export default function MagneticButton({
  children,
  className = '',
  strength = 0.4,
  magnetic = true,
  onClick,
  dataCursor,
  as: Tag = 'button',
  ...props
}) {
  const ref = useRef(null)

  const handleMove = (e) => {
    if (!magnetic) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const handleLeave = () => {
    if (!magnetic) return
    const el = ref.current
    if (el) el.style.transform = 'translate(0px, 0px)'
  }

  const MotionTag = motion(Tag)

  return (
    <MotionTag
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      data-cursor={dataCursor}
      className={`inline-flex items-center justify-center transition-transform duration-300 ease-out will-change-transform ${className}`}
      {...props}
    >
      {children}
    </MotionTag>
  )
}
