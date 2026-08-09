import React from 'react'
import { Link } from 'react-router-dom'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 dark:bg-slate-950 text-center px-4">
      <FileQuestion className="h-16 w-16 text-brand-500" />
      <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Page not found</h1>
      <p className="text-slate-500 dark:text-slate-400">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-primary mt-2">
        Back to Home
      </Link>
    </div>
  )
}
