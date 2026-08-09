import React from 'react'
import { LanguageItem } from '@/types/resume'
import { uid } from '@/utils/id'
import { Field, SectionHeader } from './shared'
import { EmptyState } from './EducationSection'
import { Plus, Trash2 } from 'lucide-react'

interface Props {
  items: LanguageItem[]
  onChange: (items: LanguageItem[]) => void
}

const LEVELS: LanguageItem['proficiency'][] = ['Basic', 'Conversational', 'Fluent', 'Native']

export default function LanguagesSection({ items, onChange }: Props) {
  const add = () => onChange([...items, { id: uid('lang'), name: '', proficiency: 'Conversational' }])
  const update = (id: string, patch: Partial<LanguageItem>) =>
    onChange(items.map((i) => (i.id === id ? { ...i, ...patch } : i)))
  const remove = (id: string) => onChange(items.filter((i) => i.id !== id))

  return (
    <div>
      <SectionHeader title="Languages" description="Languages you speak and your proficiency level." />
      {items.length === 0 ? (
        <EmptyState onAdd={add} label="Add Language" />
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-end gap-3 rounded-xl border border-slate-200 p-4 dark:border-slate-700">
              <div className="flex-1">
                <Field label="Language">
                  <input className="input" placeholder="Spanish" value={item.name} onChange={(e) => update(item.id, { name: e.target.value })} />
                </Field>
              </div>
              <div className="flex-1">
                <Field label="Proficiency">
                  <select
                    className="input"
                    value={item.proficiency}
                    onChange={(e) => update(item.id, { proficiency: e.target.value as LanguageItem['proficiency'] })}
                  >
                    {LEVELS.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
              <button onClick={() => remove(item.id)} className="btn-ghost !p-2.5 text-rose-500">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
      {items.length > 0 && (
        <button className="btn-secondary mt-4" onClick={add}>
          <Plus className="h-4 w-4" /> Add Language
        </button>
      )}
    </div>
  )
}
