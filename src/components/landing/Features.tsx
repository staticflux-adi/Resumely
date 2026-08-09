import React from 'react'
import { motion } from 'framer-motion'
import { LayoutTemplate, Palette, MousePointerClick, FileDown, Moon, Save } from 'lucide-react'

const FEATURES = [
  {
    icon: LayoutTemplate,
    title: '6 Premium Templates',
    desc: 'From minimal to executive, pick a layout that matches your style and industry.',
  },
  {
    icon: Palette,
    title: 'Full Customization',
    desc: 'Tune colors, fonts, spacing, and layout — changes apply instantly.',
  },
  {
    icon: MousePointerClick,
    title: 'Drag & Drop Ordering',
    desc: 'Reorder experience, education, and entire sections exactly how you want them.',
  },
  {
    icon: FileDown,
    title: 'Beautiful PDF Export',
    desc: 'Export high-quality, multi-page PDFs sized for A4 or Letter in one click.',
  },
  {
    icon: Moon,
    title: 'Light & Dark Mode',
    desc: 'A polished interface that looks great day or night, on any device.',
  },
  {
    icon: Save,
    title: 'Auto-Saved Locally',
    desc: 'Everything is saved to your browser instantly — no account, no backend.',
  },
]

export default function Features() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-heading text-3xl sm:text-4xl">Everything you need, nothing you don't</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            A focused toolkit for building a resume that stands out — without the clutter.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="card group p-6 transition-all hover:-translate-y-1 hover:shadow-card"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-950 dark:text-brand-400">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-display text-lg font-bold text-slate-900 dark:text-white">
                {f.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
