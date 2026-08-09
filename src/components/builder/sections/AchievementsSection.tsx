import React from 'react'
import { AchievementItem } from '@/types/resume'
import { uid } from '@/utils/id'
import { Field, SectionHeader } from './shared'
import { EmptyState } from './EducationSection'
import { Plus, Trash2 } from 'lucide-react'

interface Props {
  items: AchievementItem[]
  onChange: (items: AchievementItem[]) => void
}

export default function AchievementsSection({ items, onChange }: Props) {
  const add = () => onChange([...items, { id: uid('ach'), title: '', description: '' }])
  const update = (id: string, patch: Partial<AchievementItem>) =>
    onChange(items.map((i) => (i.id === id ? { ...i, ...patch } : i)))
  const remove = (id: string) => onChange(items.filter((i) => i.id !== id))

  return (
    <div>
      <SectionHeader title="Achievements" description="Awards, recognitions, and notable accomplishments." />
      {items.length === 0 ? (
        <EmptyState onAdd={add} label="Add Achievement" />
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
              <div className="flex items-start gap-3">
                <div className="flex-1 space-y-3">
                  <Field label="Title">
                    <input className="input" value={item.title} onChange={(e) => update(item.id, { title: e.target.value })} />
                  </Field>
                  <Field label="Description">
                    <textarea className="input min-h-[60px]" value={item.description} onChange={(e) => update(item.id, { description: e.target.value })} />
                  </Field>
                </div>
                <button onClick={() => remove(item.id)} className="btn-ghost !p-2.5 text-rose-500">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {items.length > 0 && (
        <button className="btn-secondary mt-4" onClick={add}>
          <Plus className="h-4 w-4" /> Add Achievement
        </button>
      )}
    </div>
  )
}
