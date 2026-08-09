import React, { useState } from 'react'
import { SectionHeader } from './shared'
import { X, Plus } from 'lucide-react'

interface Props {
  items: string[]
  onChange: (items: string[]) => void
}

export default function InterestsSection({ items, onChange }: Props) {
  const [draft, setDraft] = useState('')

  const addChip = () => {
    const v = draft.trim()
    if (!v || items.includes(v)) return
    onChange([...items, v])
    setDraft('')
  }

  return (
    <div>
      <SectionHeader title="Interests & Hobbies" description="Add a few personal interests as chips." />
      <div className="flex gap-2">
        <input
          className="input"
          placeholder="e.g. Photography"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addChip()
            }
          }}
        />
        <button className="btn-secondary shrink-0" onClick={addChip}>
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((chip) => (
          <span
            key={chip}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700 dark:bg-brand-950 dark:text-brand-300"
          >
            {chip}
            <button onClick={() => onChange(items.filter((c) => c !== chip))} className="hover:text-rose-500">
              <X className="h-3.5 w-3.5" />
            </button>
          </span>
        ))}
        {items.length === 0 && <p className="text-sm text-slate-400">No interests added yet.</p>}
      </div>
    </div>
  )
}
