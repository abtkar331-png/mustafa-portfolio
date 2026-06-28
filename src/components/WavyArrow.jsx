import { motion } from 'framer-motion'

/**
 * Decorative wavy arrow — flows from outer edge inward, then drops straight down.
 * @param {('left'|'right')} side  corner to anchor (bottom-left or bottom-right)
 * @param {number}           delay animation delay in seconds
 */
export default function WavyArrow({ side = 'right', delay = 0.8 }) {
  /* For right side: path goes RIGHT→LEFT then drops down on the right.
     We draw as if always anchored on the right, then scaleX-mirror for left. */
  const gradId = `wg-${side}`
  const glowId = `glow-${side}`

  return (
    <div
      className="pointer-events-none absolute bottom-4 z-0"
      style={{ [side]: '20px', opacity: 0.24 }}
      aria-hidden="true"
    >
      <svg
        width="400"
        height="130"
        viewBox="0 0 800 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        /* Mirror horizontally for left side */
        style={{ transform: side === 'left' ? 'scaleX(-1)' : 'none' }}
      >
        <defs>
          <linearGradient id={gradId} x1="800" y1="0" x2="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#ffccf2" stopOpacity="0.2" />
            <stop offset="45%"  stopColor="#977dff" stopOpacity="1"   />
            <stop offset="100%" stopColor="#0033ff" stopOpacity="0.4" />
          </linearGradient>
          <filter id={glowId} x="-30%" y="-60%" width="160%" height="240%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Wavy shaft: starts RIGHT side, waves LEFT, then turns down ── */}
        <motion.path
          d="M 788 58
             C 700 20,  590 115, 470 62
             C 350 10,  240 118, 128 65
             C  74 40,   38  90,  28 148
             L  28 195"
          stroke={`url(#${gradId})`}
          strokeWidth="5.5"
          strokeLinecap="round"
          fill="none"
          filter={`url(#${glowId})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, delay, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* ── Arrowhead — clean V pointing straight DOWN ── */}
        <motion.path
          d="M -4 174 L 28 210 L 60 174"
          stroke={`url(#${gradId})`}
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter={`url(#${glowId})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.55, delay: delay + 2, ease: 'easeOut' }}
        />
      </svg>
    </div>
  )
}
