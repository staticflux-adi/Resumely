import React from 'react'
import { Link } from 'react-router-dom'
import { FileText, Github, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 px-6 py-12 dark:border-slate-800">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white">
            <FileText className="h-4 w-4" />
          </div>
          <span className="font-display font-bold text-slate-900 dark:text-white">Resumely</span>
        </Link>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} Resumely. Built for job seekers, by job seekers.
        </p>
        <div className="flex items-center gap-4 text-slate-400">
          <a href="#" aria-label="Twitter" className="hover:text-brand-600">
            <Twitter className="h-5 w-5" />
          </a>
          <a href="#" aria-label="GitHub" className="hover:text-brand-600">
            <Github className="h-5 w-5" />
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-brand-600">
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
