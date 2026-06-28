import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Icosahedron, Dodecahedron, RoundedBox, MeshDistortMaterial } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

/* ============================================================
   Canvas-texture icon builder (fully offline — no font/HDRI CDN)
   Draws an app-icon style rounded tile with either letters
   (Ps / Ai) or a lucide-style line glyph (brush / eraser / pen).
   ============================================================ */
/* Draws ONLY the glyph (letters or line icon) on a fully transparent
   canvas. The colored rounded tile itself is real 3D geometry, so there
   is never a black square behind the icon. */
function makeGlyphTexture({ fg, text, paths, circles }) {
  const size = 256
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')

  if (text) {
    ctx.fillStyle = fg
    ctx.font = `800 ${size * 0.5}px Outfit, Arial, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, size / 2, size / 2 + size * 0.03)
  }

  if (paths || circles) {
    ctx.save()
    // lucide icons use a 24x24 viewBox — center & scale to ~58% of tile
    const inner = size * 0.58
    const s = inner / 24
    ctx.translate((size - inner) / 2, (size - inner) / 2)
    ctx.scale(s, s)
    ctx.strokeStyle = fg
    ctx.lineWidth = 2
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    ;(paths || []).forEach((d) => ctx.stroke(new Path2D(d)))
    ;(circles || []).forEach(([cx, cy, cr]) => {
      ctx.beginPath()
      ctx.arc(cx, cy, cr, 0, Math.PI * 2)
      ctx.stroke()
    })
    ctx.restore()
  }

  const tex = new THREE.CanvasTexture(c)
  tex.anisotropy = 8
  tex.needsUpdate = true
  return tex
}

/* Icon definitions (brand-evoking colors, no copyrighted logos) */
const ICONS = {
  photoshop: { bg: '#001E36', bg2: '#0b2a44', fg: '#31A8FF', text: 'Ps' },
  illustrator: { bg: '#330000', bg2: '#4d0f00', fg: '#FF9A00', text: 'Ai' },
  brush: {
    bg: '#6d28d9',
    bg2: '#a21caf',
    fg: '#ffffff',
    paths: [
      'm9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08',
      'M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z',
    ],
  },
  eraser: {
    bg: '#db2777',
    bg2: '#f43f5e',
    fg: '#ffffff',
    paths: ['m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21', 'M22 21H7', 'm5 11 9 9'],
  },
  pen: {
    bg: '#0891b2',
    bg2: '#0ea5e9',
    fg: '#ffffff',
    paths: [
      'M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z',
      'm18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18',
      'm2.3 2.3 7.286 7.286',
    ],
    circles: [[11, 11, 2]],
  },
}

/* A floating 3D app-icon tile.  The rounded box IS the colored tile;
   the glyph sits on top on a transparent plane — no black background. */
function IconTile({ def, position, rotation = [0, 0, 0], scale = 1 }) {
  const texture = useMemo(() => makeGlyphTexture(def), [def])
  return (
    <Float speed={1.5} rotationIntensity={0.35} floatIntensity={0.55}>
      <group position={position} rotation={rotation} scale={scale}>
        <RoundedBox args={[1, 1, 0.2]} radius={0.26} smoothness={8}>
          <meshStandardMaterial
            color={def.bg}
            emissive={def.bg2 || def.bg}
            emissiveIntensity={0.3}
            metalness={0.45}
            roughness={0.35}
          />
        </RoundedBox>
        <mesh position={[0, 0, 0.105]}>
          <planeGeometry args={[0.92, 0.92]} />
          <meshBasicMaterial map={texture} transparent toneMapped={false} />
        </mesh>
      </group>
    </Float>
  )
}

/* Eases the group toward the pointer — rotation only + tiny translation,
   so the icons keep their place (never drift out of frame). */
function ParallaxRig({ children, intensity = 0.4 }) {
  const group = useRef()
  useFrame((state) => {
    if (!group.current) return
    const x = state.pointer.x
    const y = state.pointer.y
    group.current.rotation.y += (x * intensity * 0.5 - group.current.rotation.y) * 0.06
    group.current.rotation.x += (-y * intensity * 0.4 - group.current.rotation.x) * 0.06
    group.current.position.x += (x * 0.18 - group.current.position.x) * 0.05
    group.current.position.y += (y * 0.18 - group.current.position.y) * 0.05
  })
  return <group ref={group}>{children}</group>
}

/* Objects BEHIND the portrait.
   Icons sit on an even orbit around the portrait (clock positions),
   uniform scale, so the composition reads as a balanced ring. */
function BackObjects() {
  return (
    <>
      {/* Soft distorted blob — ambient violet glow, kept far back */}
      <Float speed={1.2} rotationIntensity={0.8} floatIntensity={0.8}>
        <Icosahedron args={[1.3, 2]} position={[-1.7, -0.5, -2.5]}>
          <MeshDistortMaterial
            color="#7c3aed"
            emissive="#4c1d95"
            emissiveIntensity={0.55}
            distort={0.28}
            speed={1.6}
            roughness={0.2}
            metalness={0.5}
          />
        </Icosahedron>
      </Float>

      {/* App tiles hugging the frame — top-left & lower-right */}
      <IconTile def={ICONS.photoshop} position={[-1.34, 1.05, -0.4]} rotation={[0.1, 0.4, -0.1]} scale={0.6} />
      <IconTile def={ICONS.illustrator} position={[1.39, -0.98, -0.4]} rotation={[0.1, -0.4, 0.1]} scale={0.6} />
    </>
  )
}

/* Objects IN FRONT of the portrait (transparent overlay canvas).
   Three tools evenly spaced on the orbit + two accent crystals
   filling the remaining gaps for a balanced ring. */
function FrontObjects() {
  return (
    <>
      {/* three tools hugging the frame: top-right, left, bottom-left */}
      <IconTile def={ICONS.brush} position={[1.34, 1.05, 0.9]} rotation={[0.12, -0.35, 0.1]} scale={0.58} />
      <IconTile def={ICONS.pen} position={[-1.7, 0.0, 0.9]} rotation={[0.1, 0.35, 0.05]} scale={0.58} />
      <IconTile def={ICONS.eraser} position={[-0.8, -1.5, 0.9]} rotation={[-0.1, 0.3, -0.08]} scale={0.58} />

      {/* accent crystals filling the ring gaps (top & bottom-right) */}
      <Float speed={2.4} rotationIntensity={1.5} floatIntensity={1.1}>
        <Dodecahedron args={[0.18]} position={[0.0, 1.7, 0.8]}>
          <meshStandardMaterial color="#ec4899" emissive="#be185d" emissiveIntensity={0.7} />
        </Dodecahedron>
      </Float>
      <Float speed={2.6} rotationIntensity={1.6} floatIntensity={1.2}>
        <Dodecahedron args={[0.16]} position={[0.85, -1.47, 0.9]}>
          <meshStandardMaterial color="#22d3ee" emissive="#06b6d4" emissiveIntensity={0.9} />
        </Dodecahedron>
      </Float>
    </>
  )
}

/**
 * @param {('back'|'front')} layer  which depth layer to render
 * @param {boolean} isMobile        reduces pixel ratio / object scale for perf
 */
export default function FloatingScene({ layer = 'back', isMobile = false }) {
  const dpr = useMemo(() => (isMobile ? [1, 1.3] : [1, 2]), [isMobile])

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ alpha: true, antialias: !isMobile, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'transparent' }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 4, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[5, 5, 5]} intensity={2.6} color="#0033ff" />
      <pointLight position={[-5, -3, 2]} intensity={2.2} color="#977dff" />
      <pointLight position={[0, -4, 3]} intensity={1.2} color="#ffccf2" />

      <ParallaxRig intensity={layer === 'front' ? 0.55 : 0.4}>
        <group scale={isMobile ? 0.78 : 1}>
          {layer === 'back' ? <BackObjects /> : <FrontObjects />}
        </group>
      </ParallaxRig>
    </Canvas>
  )
}
