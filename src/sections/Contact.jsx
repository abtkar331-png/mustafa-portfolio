import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Check, User, Mail, MessageSquare, MapPin, Phone } from 'lucide-react'

const BrandIcon = ({ d, viewBox = '0 0 24 24' }) => (
  <svg width="22" height="22" viewBox={viewBox} fill="currentColor" aria-hidden="true">
    <path d={d} />
  </svg>
)

const socials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/muostvfv?igsh=ZmQ4dXBidG04M3Q2',
    d: 'M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.86s0 3.6-.07 4.86c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.86.07s-3.6 0-4.86-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.86c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.52.01-4.76.07-.9.04-1.39.2-1.71.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.32-.28.81-.32 1.71C3.4 8.48 3.4 8.85 3.4 12s0 3.52.07 4.76c.04.9.19 1.39.32 1.71.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.13.81.28 1.71.32 1.24.06 1.61.07 4.76.07s3.52 0 4.76-.07c.9-.04 1.39-.19 1.71-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.32.28-.81.32-1.71.06-1.24.07-1.61.07-4.76s0-3.52-.07-4.76c-.04-.9-.19-1.39-.32-1.71a2.86 2.86 0 0 0-.69-1.06 2.86 2.86 0 0 0-1.06-.69c-.32-.13-.81-.28-1.71-.32C15.52 4.01 15.15 4 12 4zm0 3.06A4.94 4.94 0 1 1 12 17a4.94 4.94 0 0 1 0-9.88zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28zm5.13-.78a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0z',
  },
  {
    label: 'WhatsApp',
    href: 'https://api.whatsapp.com/send?phone=201013610199&text=',
    d: 'M19.05 4.91C17.18 3.03 14.74 2 12.04 2 6.58 2 2.13 6.45 2.13 11.91c0 1.73.44 3.36 1.27 4.78L2.06 22l5.44-1.43c1.41.77 3 1.21 4.67 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01l-.13-.12zM12.04 20.15c-1.41 0-2.79-.38-4-1.09l-.29-.17-3.23.85.86-3.15-.19-.3c-.71-1.14-1.09-2.45-1.09-3.82 0-3.96 3.23-7.19 7.19-7.19 1.92 0 3.72.75 5.08 2.11 1.36 1.36 2.11 3.16 2.11 5.08 0 3.96-3.23 7.19-7.19 7.19zM16.92 14.1c-.23-.12-1.33-.66-1.53-.73-.21-.08-.36-.12-.51.12-.15.23-.59.73-.72.88-.13.15-.26.17-.49.06-.23-.12-.96-.36-1.82-1.13-.68-.6-1.13-1.34-1.26-1.57-.13-.23-.01-.35.1-.46.1-.1.23-.26.34-.4.12-.13.15-.23.23-.38.08-.15.04-.28-.02-.4-.06-.12-.51-1.23-.7-1.68-.19-.44-.37-.38-.51-.39-.13-.01-.28-.01-.43-.01-.15 0-.4.06-.6.28-.21.23-.79.77-.79 1.89 0 1.11.81 2.19.92 2.34.12.15 1.59 2.43 3.85 3.41.54.23.96.37 1.29.47.54.17 1.03.15 1.42.09.43-.07 1.33-.55 1.52-1.07.19-.53.19-.98.13-1.07-.06-.09-.21-.15-.43-.26z',
  },
]

function Field({ label, type = 'text', textarea, value, onChange, icon: Icon }) {
  const [focused, setFocused] = useState(false)
  return (
    <div className={`group relative flex gap-3 ${textarea ? 'items-start' : 'items-center'}`}>
      {Icon && (
        <div
          className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl border transition-colors duration-300 ${
            focused
              ? 'border-neon-2/50 bg-neon-2/10 text-neon-2'
              : 'border-white/[0.08] bg-white/[0.02] text-muted/50'
          }`}
        >
          <Icon size={18} />
        </div>
      )}
      <motion.div
        animate={{ scale: focused ? 1.005 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`flex-1 relative overflow-hidden rounded-xl border transition-all duration-300 ${
          focused
            ? 'border-neon-2/40 bg-white/[0.04] shadow-[0_0_16px_rgba(var(--neon-2-rgb),0.1)]'
            : 'border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.03]'
        }`}
      >
        {textarea ? (
          <textarea
            rows={4}
            value={value}
            required
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full resize-none bg-transparent py-4 px-4 text-sm text-ink outline-none placeholder:text-muted/45"
            placeholder={label}
          />
        ) : (
          <input
            type={type}
            value={value}
            required
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full bg-transparent h-12 px-4 text-sm text-ink outline-none placeholder:text-muted/45"
            placeholder={label}
          />
        )}
      </motion.div>
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('https://formsubmit.co/ajax/abtkar331@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: 'رسالة جديدة من موقعك الشخصي',
        }),
      })
      if (response.ok) {
        setSent(true)
        setForm({ name: '', email: '', message: '' })
        setTimeout(() => setSent(false), 4000)
      } else {
        alert('حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.')
      }
    } catch (err) {
      console.error(err)
      alert('تعذر الاتصال. تأكد من اتصالك بالإنترنت.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="snap-section grain relative overflow-hidden" dir="ltr">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -left-24 top-1/3 h-[45vh] w-[45vh] rounded-full bg-neon/20 blur-[130px]" />
      <div className="pointer-events-none absolute -right-16 bottom-1/4 h-[35vh] w-[35vh] rounded-full bg-neon-2/15 blur-[110px]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">

        {/* Section header — same pattern as Skills & Portfolio */}
        <div style={{ marginBottom: '32px' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          <div className="glass inline-block rounded-2xl border border-white/10 px-8 py-4 shadow-xl backdrop-blur-md">
            <h2 className="text-sm font-semibold tracking-widest text-muted uppercase">Get in Touch</h2>
          </div>
          <div className="relative mt-7 inline-block rounded-[1.6rem] bg-gradient-to-tr from-neon/60 via-neon-2/50 to-neon-3/60 p-[1.5px] shadow-2xl neon-glow">
            <div className="rounded-[calc(1.6rem-1.5px)] bg-white/[0.04] px-10 py-4 backdrop-blur-2xl sm:px-14">
              <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              <h3
                className="text-3xl font-extrabold text-ink drop-shadow-[0_2px_12px_rgba(124,58,237,0.45)] sm:text-4xl"
                style={{ fontFamily: 'var(--font-primary-ar)' }}
              >
                دعنا نعمل معاً
              </h3>
            </div>
          </div>
        </motion.div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-14" style={{ marginTop: '2cm' }}>

          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center lg:col-span-2"
          >
            <p className="text-base leading-relaxed text-muted/75">
              Have a project in mind? I'd love to hear about it. Send a message and I'll get back to you soon.
            </p>
            <div style={{ height: '24px' }} />

            {/* Contact details */}
            <div className="mt-10 flex flex-col gap-5">
              {[
                { Icon: Mail, label: 'Email', value: 'abtkar331@gmail.com' },
                { Icon: MapPin, label: 'Location', value: 'Mansoura, Egypt' },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="group flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-muted/60 transition-colors group-hover:border-neon-2/30 group-hover:text-neon-2">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted/50">{label}</p>
                    <p className="text-sm font-medium text-ink/90 transition-colors group-hover:text-neon-2">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social links — full width rows with label */}
            <div className="mt-10">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted/40">Connect</p>
              <div className="flex flex-col gap-3 w-full">
                {socials.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ x: 5 }}
                    data-cursor="Visit"
                    className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-muted/70 backdrop-blur-sm transition-all duration-300 hover:border-neon-2/40 hover:bg-neon-2/[0.06] hover:text-neon-2"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] transition-colors group-hover:border-neon-2/40 group-hover:bg-neon-2/10">
                      <BrandIcon d={s.d} viewBox="0 0 24 24" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink/80 transition-colors group-hover:text-neon-2">{s.label}</p>
                      <p className="text-[11px] text-muted/40">
                        {s.label === 'Instagram' ? '@muostvfv' : '+20 101 361 0199'}
                      </p>
                    </div>
                    <svg className="ml-auto opacity-30 transition-opacity group-hover:opacity-80" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.015] shadow-2xl backdrop-blur-xl" style={{ padding: '32px' }}>
              {/* Personal signature — top-right corner of card */}
              <img
                src="/111.png"
                alt="Mustafa signature"
                className="pointer-events-none absolute select-none"
                style={{
                  top: '6px',
                  right: '6px',
                  width: '120px',
                  opacity: 0.85,
                  transform: 'rotate(10deg)',
                  filter: 'brightness(0) invert(1)',
                  zIndex: 10,
                }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-2/30 to-transparent" />

              <form onSubmit={submit} className="relative z-10 flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field
                    icon={User}
                    label="Name · الاسم"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <Field
                    icon={Mail}
                    type="email"
                    label="Email · البريد"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <Field
                  icon={MessageSquare}
                  textarea
                  label="Tell me about your project · حدثني عن مشروعك..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />

                <motion.button
                  type="submit"
                  disabled={loading}
                  data-cursor="إرسال"
                  className={`group relative flex h-14 w-full items-center justify-center overflow-hidden rounded-2xl text-base font-bold text-white shadow-lg transition-all duration-300 ${
                    sent
                      ? 'bg-emerald-500/80'
                      : loading
                        ? 'cursor-wait bg-white/10'
                        : 'bg-gradient-to-r from-neon to-neon-2 hover:shadow-[0_0_30px_rgba(var(--neon-2-rgb),0.35)]'
                  }`}
                  style={{ marginTop: '8px' }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {loading ? (
                      <span>Sending · جاري الإرسال...</span>
                    ) : sent ? (
                      <>
                        <Check size={20} />
                        <span>Message sent · تم الإرسال بنجاح</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message · إرسال</span>
                        <Send size={18} />
                      </>
                    )}
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>

        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="border-t border-white/[0.05] text-center"
          style={{ marginTop: '48px', paddingTop: '24px' }}
        >
          <p className="text-xs font-medium tracking-wide text-muted/50">
            © {new Date().getFullYear()} Mustafa. All rights reserved.
            <span className="mx-2 opacity-30">|</span>
            <span dir="rtl" style={{ fontFamily: 'var(--font-primary-ar)' }}>جميع الحقوق محفوظة</span>
          </p>
        </motion.div>

      </div>
    </section>
  )
}
