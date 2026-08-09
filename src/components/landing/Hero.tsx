import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Star } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-24 px-6">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-50 via-white to-accent-400/10 dark:from-slate-950 dark:via-slate-950 dark:to-brand-950 animate-gradient bg-[length:200%_200%]"
      />
      <div
        aria-hidden
        className="absolute -top-24 right-0 -z-10 h-96 w-96 rounded-full bg-brand-400/20 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 -z-10 h-72 w-72 rounded-full bg-accent-400/20 blur-3xl"
      />

      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-brand-700 dark:text-brand-300">
            <Sparkles className="h-3.5 w-3.5" />
            Free, no sign-up required
          </div>
          <h1 className="section-heading text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Build a resume that gets you{' '}
            <span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">
              hired faster
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg text-slate-600 dark:text-slate-300">
            Craft a beautifully designed, recruiter-ready resume in minutes. Pick a template,
            fill in your details, customize the look, and export a polished PDF — completely free.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/dashboard" className="btn-primary text-base">
              Create My Resume <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#templates" className="btn-secondary text-base">
              Browse Templates
            </a>
          </div>
          <div className="mt-10 flex items-center justify-center gap-6">
            <div className="flex -space-x-3">
              {['#4a6bff', '#f78c1f', '#22c55e', '#e11d48'].map((c, i) => (
                <div
                  key={i}
                  className="h-9 w-9 rounded-full border-2 border-white dark:border-slate-950 shadow-soft"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-0.5 text-accent-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Loved by 50,000+ job seekers</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
