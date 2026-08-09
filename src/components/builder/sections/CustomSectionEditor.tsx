import React from 'react'
import { CustomSection } from '@/types/resume'
import { uid } from '@/utils/id'
import { Field, SectionHeader } from './shared'
import { Plus, Trash2 } from 'lucide-react'

interface Props {
  section: CustomSection
  onChange: (section: CustomSection) => void
  onRemoveSection: () => void
}

export default function CustomSectionEditor({ section, onChange, onRemoveSection }: Props) {
  const addItem = () =>
    onChange({
      ...section,
      items: [...section.items, { id: uid('citem'), heading: '', subheading: '', description: '' }],
    })

  const updateItem = (id: string, patch: Partial<CustomSection['items'][number]>) =>
    onChange({ ...section, items: section.items.map((i) => (i.id === id ? { ...i, ...patch } : i)) })

  const removeItem = (id: string) => onChange({ ...section, items: section.items.filter((i) => i.id !== id) })

  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex-1">
          <label className="label">Section Title</label>
          <input
            className="input font-semibold"
            value={section.title}
            onChange={(e) => onChange({ ...section, title: e.target.value })}
          />
        </div>
        <button
          onClick={onRemoveSection}
          className="btn-ghost mt-6 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950"
        >
          <Trash2 className="h-4 w-4" /> Delete Section
        </button>
      </div>

      {section.items.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-slate-200 py-10 text-center dark:border-slate-700">
          <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">No entries yet.</p>
          <button className="btn-primary" onClick={addItem}>
            <Plus className="h-4 w-4" /> Add Entry
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {section.items.map((item) => (
            <div key={item.id} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Heading">
                  <input className="input" value={item.heading} onChange={(e) => updateItem(item.id, { heading: e.target.value })} />
                </Field>
                <Field label="Subheading">
                  <input className="input" value={item.subheading} onChange={(e) => updateItem(item.id, { subheading: e.target.value })} />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Description">
                    <textarea className="input min-h-[70px]" value={item.description} onChange={(e) => updateItem(item.id, { description: e.target.value })} />
                  </Field>
                </div>
              </div>
              <button onClick={() => removeItem(item.id)} className="btn-ghost mt-3 text-rose-500">
                <Trash2 className="h-4 w-4" /> Remove Entry
              </button>
            </div>
          ))}
        </div>
      )}
      {section.items.length > 0 && (
        <button className="btn-secondary mt-4" onClick={addItem}>
          <Plus className="h-4 w-4" /> Add Entry
        </button>
      )}
    </div>
  )
}
