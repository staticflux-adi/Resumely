import React, { useState } from 'react'
import Modal from '@/components/ui/Modal'
import { TEMPLATE_META } from '@/data/templateMeta'
import { TemplateId } from '@/types/resume'
import { Check } from 'lucide-react'

interface NewResumeModalProps {
  open: boolean
  onClose: () => void
  onCreate: (name: string, template: TemplateId) => void
}

export default function NewResumeModal({ open, onClose, onCreate }: NewResumeModalProps) {
  const [name, setName] = useState('')
  const [template, setTemplate] = useState<TemplateId>('modern')

  const handleCreate = () => {
    onCreate(name.trim() || 'Untitled Resume', template)
    setName('')
    setTemplate('modern')
  }

  return (
    <Modal open={open} onClose={onClose} title="Create a new resume" maxWidth="max-w-lg">
      <div className="space-y-5">
        <div>
          <label className="label">Resume name</label>
          <input
            className="input"
            placeholder="e.g. Software Engineer Resume"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </div>
        <div>
          <label className="label">Choose a template</label>
          <div className="grid grid-cols-3 gap-3">
            {TEMPLATE_META.map((t) => (
              <button
                key={t.id}
                onClick={() => setTemplate(t.id)}
                className={`relative rounded-xl border-2 p-2 text-left transition-all ${
                  template === t.id
                    ? 'border-brand-500 ring-2 ring-brand-100 dark:ring-brand-950'
                    : 'border-slate-200 dark:border-slate-700 hover:border-brand-300'
                }`}
              >
                {template === t.id && (
                  <div className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-500 text-white">
                    <Check className="h-2.5 w-2.5" />
                  </div>
                )}
                <div
                  className="h-14 w-full rounded-md"
                  style={{ background: t.previewGradient }}
                />
                <p className="mt-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                  {t.name}
                </p>
              </button>
            ))}
          </div>
        </div>
        <button className="btn-primary w-full" onClick={handleCreate}>
          Create Resume
        </button>
      </div>
    </Modal>
  )
}
