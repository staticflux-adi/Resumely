import React, { useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Moon, Sun, Plus, Search, Upload, Inbox } from 'lucide-react'
import { useResumes } from '@/context/ResumeContext'
import { useAppTheme } from '@/context/ThemeContext'
import { useToast } from '@/components/ui/Toast'
import ResumeCard from '@/components/dashboard/ResumeCard'
import NewResumeModal from '@/components/dashboard/NewResumeModal'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import Skeleton from '@/components/ui/Skeleton'
import { TemplateId } from '@/types/resume'

export default function Dashboard() {
  const { resumes, createResume, deleteResume, duplicateResume, renameResume, importResume } = useResumes()
  const { darkMode, toggleDarkMode } = useAppTheme()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const [loading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    const sorted = [...resumes].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
    if (!q) return sorted
    return sorted.filter((r) => r.name.toLowerCase().includes(q))
  }, [resumes, search])

  const recent = useMemo(() => filtered.slice(0, 4), [filtered])

  const handleCreate = (name: string, template: TemplateId) => {
    const resume = createResume(name, template)
    setModalOpen(false)
    showToast('Resume created')
    navigate(`/builder/${resume.id}`)
  }

  const handleImportClick = () => fileInputRef.current?.click()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string)
        const resume = importResume(data)
        if (resume) {
          showToast('Resume imported successfully')
          navigate(`/builder/${resume.id}`)
        } else {
          showToast('Invalid resume file', 'error')
        }
      } catch {
        showToast('Could not parse JSON file', 'error')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
              <FileText className="h-5 w-5" />
            </div>
            <span className="font-display text-xl font-bold text-slate-900 dark:text-white">Resumely</span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              My Resumes
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {resumes.length} resume{resumes.length === 1 ? '' : 's'} saved locally
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                className="input !pl-9 sm:w-64"
                placeholder="Search resumes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="btn-secondary" onClick={handleImportClick}>
              <Upload className="h-4 w-4" /> Import
            </button>
            <input
              type="file"
              accept="application/json"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <button className="btn-primary" onClick={() => setModalOpen(true)}>
              <Plus className="h-4 w-4" /> New Resume
            </button>
          </div>
        </div>

        {recent.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Recently Edited
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <AnimatePresence>
                {recent.map((r) => (
                  <ResumeCard
                    key={r.id}
                    resume={r}
                    onDuplicate={(id) => {
                      duplicateResume(id)
                      showToast('Resume duplicated')
                    }}
                    onDelete={(id) => setConfirmDeleteId(id)}
                    onRename={(id, name) => {
                      renameResume(id, name)
                      showToast('Resume renamed')
                    }}
                  />
                ))}
              </AnimatePresence>
            </div>
          </section>
        )}

        <section className="mt-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            All Resumes
          </h2>

          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-64 w-full" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="card flex flex-col items-center justify-center gap-3 py-20 text-center">
              <Inbox className="h-10 w-10 text-slate-300 dark:text-slate-600" />
              <p className="font-semibold text-slate-700 dark:text-slate-200">
                {search ? 'No resumes match your search' : 'No resumes yet'}
              </p>
              <p className="max-w-xs text-sm text-slate-500 dark:text-slate-400">
                {search
                  ? 'Try a different search term.'
                  : 'Create your first resume to get started — it only takes a few minutes.'}
              </p>
              {!search && (
                <button className="btn-primary mt-2" onClick={() => setModalOpen(true)}>
                  <Plus className="h-4 w-4" /> Create Resume
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <AnimatePresence>
                {filtered.map((r) => (
                  <ResumeCard
                    key={r.id}
                    resume={r}
                    onDuplicate={(id) => {
                      duplicateResume(id)
                      showToast('Resume duplicated')
                    }}
                    onDelete={(id) => setConfirmDeleteId(id)}
                    onRename={(id, name) => {
                      renameResume(id, name)
                      showToast('Resume renamed')
                    }}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>
      </main>

      <NewResumeModal open={modalOpen} onClose={() => setModalOpen(false)} onCreate={handleCreate} />

      <ConfirmDialog
        open={!!confirmDeleteId}
        title="Delete resume?"
        message="This action can't be undone. The resume will be permanently removed from your browser storage."
        confirmLabel="Delete"
        danger
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={() => {
          if (confirmDeleteId) {
            deleteResume(confirmDeleteId)
            showToast('Resume deleted', 'info')
          }
        }}
      />
    </div>
  )
}
