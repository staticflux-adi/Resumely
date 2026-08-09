import React from 'react'
import { EducationItem } from '@/types/resume'
import { uid } from '@/utils/id'
import { Field, SectionHeader } from './shared'
import DragList from '@/components/builder/DragList'
import SortableEntryCard from '@/components/builder/SortableEntryCard'
import { Plus } from 'lucide-react'

interface Props {
  items: EducationItem[]
  onChange: (items: EducationItem[]) => void
}

const blank = (): EducationItem => ({
  id: uid('edu'),
  school: '',
  degree: '',
  field: '',
  startDate: '',
  endDate: '',
  grade: '',
  description: '',
})

export default function EducationSection({ items, onChange }: Props) {
  const update = (id: string, patch: Partial<EducationItem>) =>
    onChange(items.map((i) => (i.id === id ? { ...i, ...patch } : i)))

  const remove = (id: string) => onChange(items.filter((i) => i.id !== id))

  const add = () => onChange([...items, blank()])

  return (
    <div>
      <SectionHeader title="Education" description="Add your academic background, most recent first." />
      {items.length === 0 ? (
        <EmptyState onAdd={add} label="Add Education" />
      ) : (
        <DragList
          items={items}
          onReorder={onChange}
          renderItem={(item) => (
            <SortableEntryCard
              key={item.id}
              id={item.id}
              title={item.school || 'New Education Entry'}
              onRemove={() => remove(item.id)}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="School">
                  <input className="input" value={item.school} onChange={(e) => update(item.id, { school: e.target.value })} />
                </Field>
                <Field label="Degree">
                  <input className="input" value={item.degree} onChange={(e) => update(item.id, { degree: e.target.value })} />
                </Field>
                <Field label="Field of Study">
                  <input className="input" value={item.field} onChange={(e) => update(item.id, { field: e.target.value })} />
                </Field>
                <Field label="Grade">
                  <input className="input" value={item.grade} onChange={(e) => update(item.id, { grade: e.target.value })} />
                </Field>
                <Field label="Start Date">
                  <input className="input" placeholder="Sep 2018" value={item.startDate} onChange={(e) => update(item.id, { startDate: e.target.value })} />
                </Field>
                <Field label="End Date">
                  <input className="input" placeholder="Jun 2022" value={item.endDate} onChange={(e) => update(item.id, { endDate: e.target.value })} />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Description">
                    <textarea className="input min-h-[80px]" value={item.description} onChange={(e) => update(item.id, { description: e.target.value })} />
                  </Field>
                </div>
              </div>
            </SortableEntryCard>
          )}
        />
      )}
      {items.length > 0 && (
        <button className="btn-secondary mt-4" onClick={add}>
          <Plus className="h-4 w-4" /> Add Education
        </button>
      )}
    </div>
  )
}

export function EmptyState({ onAdd, label }: { onAdd: () => void; label: string }) {
  return (
    <div className="rounded-xl border-2 border-dashed border-slate-200 py-12 text-center dark:border-slate-700">
      <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">Nothing here yet.</p>
      <button className="btn-primary" onClick={onAdd}>
        <Plus className="h-4 w-4" /> {label}
      </button>
    </div>
  )
}
