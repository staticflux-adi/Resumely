import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-8 py-16 text-center shadow-glow"
      >
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
          Ready to build your standout resume?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-brand-100">
          It takes less than 10 minutes. No credit card, no account, no catch.
        </p>
        <Link
          to="/dashboard"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-brand-700 shadow-soft transition-transform hover:scale-[1.03]"
        >
          Start Building Free <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </section>
  )
}
