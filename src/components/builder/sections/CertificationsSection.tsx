import React from 'react'
import { CertificationItem } from '@/types/resume'
import { uid } from '@/utils/id'
import { Field, SectionHeader } from './shared'
import { EmptyState } from './EducationSection'
import { Plus, Trash2 } from 'lucide-react'

interface Props {
  items: CertificationItem[]
  onChange: (items: CertificationItem[]) => void
}

export default function CertificationsSection({ items, onChange }: Props) {
  const add = () => onChange([...items, { id: uid('cert'), name: '', issuer: '', date: '' }])
  const update = (id: string, patch: Partial<CertificationItem>) =>
    onChange(items.map((i) => (i.id === id ? { ...i, ...patch } : i)))
  const remove = (id: string) => onChange(items.filter((i) => i.id !== id))

  return (
    <div>
      <SectionHeader title="Certifications" description="Professional certifications and licenses." />
      {items.length === 0 ? (
        <EmptyState onAdd={add} label="Add Certification" />
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Certification Name">
                  <input className="input" value={item.name} onChange={(e) => update(item.id, { name: e.target.value })} />
                </Field>
                <Field label="Issuing Organization">
                  <input className="input" value={item.issuer} onChange={(e) => update(item.id, { issuer: e.target.value })} />
                </Field>
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <Field label="Date">
                      <input className="input" placeholder="Mar 2023" value={item.date} onChange={(e) => update(item.id, { date: e.target.value })} />
                    </Field>
                  </div>
                  <button onClick={() => remove(item.id)} className="btn-ghost !p-2.5 text-rose-500">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {items.length > 0 && (
        <button className="btn-secondary mt-4" onClick={add}>
          <Plus className="h-4 w-4" /> Add Certification
        </button>
      )}
    </div>
  )
}
