import { useEffect, useState } from 'react'
import { usePageNav } from './PageTransition'

const sections = [
  { id: 'hero', label: 'الرئيسية · Home' },
  { id: 'skills', label: 'المهارات · Skills' },
  { id: 'portfolio', label: 'الأعمال · Work' },
  { id: 'contact', label: 'تواصل · Contact' },
]

export default function SideNav() {
  const navigate = usePageNav()
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const root = document.getElementById('scroll-container')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { root, threshold: 0.5 }
    )
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const go = (id) => navigate(id)

  return (
    <nav className="fixed left-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-4 md:flex">
      {sections.map((s) => (
        <button
          key={s.id}
          onClick={() => go(s.id)}
          aria-label={s.label}
          data-cursor=""
          className="group relative flex items-center"
        >
          <span
            className={`block rounded-full transition-all duration-300 ${
              active === s.id ? 'h-6 w-2 bg-neon-2 neon-glow' : 'h-2 w-2 bg-white/30 group-hover:bg-white/70'
            }`}
          />
          <span className="pointer-events-none absolute left-5 whitespace-nowrap rounded-md glass px-2 py-1 text-xs opacity-0 transition-opacity group-hover:opacity-100">
            {s.label}
          </span>
        </button>
      ))}
    </nav>
  )
}
