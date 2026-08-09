import React from 'react'
import { motion } from 'framer-motion'

const STATS = [
  { value: '50K+', label: 'Resumes Created' },
  { value: '6', label: 'Premium Templates' },
  { value: '4.9/5', label: 'Average Rating' },
  { value: '100%', label: 'Free to Use' },
]

export default function Stats() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="card grid grid-cols-2 gap-8 p-10 md:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center"
            >
              <p className="font-display text-3xl font-extrabold text-brand-600 dark:text-brand-400 sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
