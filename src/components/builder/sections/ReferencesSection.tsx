import React from 'react'
import { ReferenceItem } from '@/types/resume'
import { uid } from '@/utils/id'
import { Field, SectionHeader } from './shared'
import { EmptyState } from './EducationSection'
import { Plus, Trash2 } from 'lucide-react'

interface Props {
  items: ReferenceItem[]
  onChange: (items: ReferenceItem[]) => void
}

export default function ReferencesSection({ items, onChange }: Props) {
  const add = () =>
    onChange([...items, { id: uid('ref'), name: '', relationship: '', company: '', email: '', phone: '' }])
  const update = (id: string, patch: Partial<ReferenceItem>) =>
    onChange(items.map((i) => (i.id === id ? { ...i, ...patch } : i)))
  const remove = (id: string) => onChange(items.filter((i) => i.id !== id))

  return (
    <div>
      <SectionHeader title="References" description="Professional references who can vouch for your work." />
      {items.length === 0 ? (
        <EmptyState onAdd={add} label="Add Reference" />
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name">
                  <input className="input" value={item.name} onChange={(e) => update(item.id, { name: e.target.value })} />
                </Field>
                <Field label="Relationship">
                  <input className="input" placeholder="Former Manager" value={item.relationship} onChange={(e) => update(item.id, { relationship: e.target.value })} />
                </Field>
                <Field label="Company">
                  <input className="input" value={item.company} onChange={(e) => update(item.id, { company: e.target.value })} />
                </Field>
                <Field label="Email">
                  <input className="input" type="email" value={item.email} onChange={(e) => update(item.id, { email: e.target.value })} />
                </Field>
                <Field label="Phone">
                  <input className="input" value={item.phone} onChange={(e) => update(item.id, { phone: e.target.value })} />
                </Field>
              </div>
              <button onClick={() => remove(item.id)} className="btn-ghost mt-3 text-rose-500">
                <Trash2 className="h-4 w-4" /> Remove
              </button>
            </div>
          ))}
        </div>
      )}
      {items.length > 0 && (
        <button className="btn-secondary mt-4" onClick={add}>
          <Plus className="h-4 w-4" /> Add Reference
        </button>
      )}
    </div>
  )
}
