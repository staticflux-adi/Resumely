import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TEMPLATE_META } from '@/data/templateMeta'

export default function TemplatesShowcase() {
  return (
    <section id="templates" className="px-6 py-24 bg-slate-50 dark:bg-slate-900/40">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-heading text-3xl sm:text-4xl">Templates for every career stage</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            Every template is fully re-themeable — swap colors and fonts without losing the layout.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEMPLATE_META.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="card group overflow-hidden"
            >
              <div
                className="flex h-56 items-center justify-center p-6"
                style={{ background: t.previewGradient }}
              >
                <div className="h-full w-full rounded-lg bg-white/90 shadow-lg p-4 flex flex-col gap-2">
                  <div className="h-3 w-1/2 rounded" style={{ background: t.accent }} />
                  <div className="h-1.5 w-3/4 rounded bg-slate-200" />
                  <div className="mt-2 h-1.5 w-full rounded bg-slate-100" />
                  <div className="h-1.5 w-full rounded bg-slate-100" />
                  <div className="h-1.5 w-2/3 rounded bg-slate-100" />
                  <div className="mt-2 h-1.5 w-1/3 rounded" style={{ background: t.accent }} />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">{t.name}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t.description}</p>
                <Link
                  to="/dashboard"
                  className="mt-4 inline-block text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400"
                >
                  Use this template →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
