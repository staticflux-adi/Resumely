import React from 'react'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const TESTIMONIALS = [
  {
    quote:
      'I built a resume that actually looked like it came from a design studio. Landed three interviews in a week.',
    name: 'Priya Sharma',
    role: 'Product Designer',
    color: '#4a6bff',
  },
  {
    quote:
      'The drag-and-drop reordering saved me so much time reorganizing my experience for different roles.',
    name: 'Daniel Cho',
    role: 'Software Engineer',
    color: '#f78c1f',
  },
  {
    quote: 'Clean, fast, and the PDF export quality is genuinely better than tools I paid for.',
    name: 'Amara Okafor',
    role: 'Marketing Manager',
    color: '#22c55e',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-heading text-3xl sm:text-4xl">Loved by job seekers everywhere</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card p-6"
            >
              <Quote className="h-7 w-7 text-brand-300" />
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full font-display text-sm font-bold text-white"
                  style={{ backgroundColor: t.color }}
                >
                  {t.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
