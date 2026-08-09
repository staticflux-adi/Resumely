import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Copy, Trash2, Pencil, Check, X, FileText } from 'lucide-react'
import { Resume } from '@/types/resume'
import { getTemplateMeta } from '@/data/templateMeta'

interface ResumeCardProps {
  resume: Resume
  onDuplicate: (id: string) => void
  onDelete: (id: string) => void
  onRename: (id: string, name: string) => void
}

export default function ResumeCard({ resume, onDuplicate, onDelete, onRename }: ResumeCardProps) {
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)
  const [nameDraft, setNameDraft] = useState(resume.name)
  const meta = getTemplateMeta(resume.template)

  const commitRename = () => {
    onRename(resume.id, nameDraft.trim() || resume.name)
    setEditing(false)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="card group flex flex-col overflow-hidden"
    >
      <button
        onClick={() => navigate(`/builder/${resume.id}`)}
        className="flex h-40 w-full items-center justify-center p-5"
        style={{ background: meta.previewGradient }}
      >
        <div className="flex h-full w-full flex-col gap-1.5 rounded-lg bg-white/90 p-3 shadow">
          <div className="h-2 w-1/2 rounded" style={{ background: meta.accent }} />
          <div className="h-1 w-3/4 rounded bg-slate-200" />
          <div className="mt-1 h-1 w-full rounded bg-slate-100" />
          <div className="h-1 w-full rounded bg-slate-100" />
          <div className="h-1 w-2/3 rounded bg-slate-100" />
        </div>
      </button>

      <div className="flex flex-1 flex-col gap-2 p-4">
        {editing ? (
          <div className="flex items-center gap-1.5">
            <input
              autoFocus
              className="input !py-1.5 text-sm"
              value={nameDraft}
              onChange={(e) => setNameDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commitRename()
                if (e.key === 'Escape') setEditing(false)
              }}
            />
            <button onClick={commitRename} className="btn-ghost !p-1.5 text-emerald-600">
              <Check className="h-4 w-4" />
            </button>
            <button onClick={() => setEditing(false)} className="btn-ghost !p-1.5 text-rose-500">
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate(`/builder/${resume.id}`)}
            className="flex items-center gap-2 text-left"
          >
            <FileText className="h-4 w-4 shrink-0 text-brand-500" />
            <span className="truncate font-semibold text-slate-800 dark:text-white">{resume.name}</span>
          </button>
        )}
        <p className="text-xs text-slate-400">
          Edited {new Date(resume.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
        </p>
        <p className="text-xs font-medium text-brand-500">{meta.name} template</p>

        <div className="mt-auto flex items-center gap-1 pt-3 opacity-0 transition-opacity group-hover:opacity-100">
          <button onClick={() => setEditing(true)} className="btn-ghost !p-2" title="Rename">
            <Pencil className="h-4 w-4" />
          </button>
          <button onClick={() => onDuplicate(resume.id)} className="btn-ghost !p-2" title="Duplicate">
            <Copy className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(resume.id)}
            className="btn-ghost !p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
