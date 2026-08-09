import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    q: 'Is Resumely really free?',
    a: 'Yes. Every template, customization option, and PDF export is free with no hidden limits or watermarks.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No sign-up required. Your resumes are saved securely in your browser via localStorage.',
  },
  {
    q: 'Will my data be uploaded anywhere?',
    a: 'No. Resumely runs entirely in your browser with no backend — your data never leaves your device.',
  },
  {
    q: 'Can I export more than one resume?',
    a: 'Yes, you can create and manage unlimited resumes from your dashboard, each with its own template and theme.',
  },
  {
    q: 'Are the templates ATS-friendly?',
    a: 'The Classic ATS template is built specifically for clean parsing. Other templates are optimized for human readers.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="px-6 py-24 bg-slate-50 dark:bg-slate-900/40">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="section-heading text-3xl sm:text-4xl">Frequently asked questions</h2>
        </div>
        <div className="mt-12 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = openIndex === i
            return (
              <div key={f.q} className="card overflow-hidden">
                <button
                  className="flex w-full items-center justify-between px-6 py-4 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span className="font-semibold text-slate-800 dark:text-white">{f.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm text-slate-600 dark:text-slate-300">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
