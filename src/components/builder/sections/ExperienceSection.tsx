import React from 'react'
import { ExperienceItem } from '@/types/resume'
import { uid } from '@/utils/id'
import { Field, SectionHeader } from './shared'
import DragList from '@/components/builder/DragList'
import SortableEntryCard from '@/components/builder/SortableEntryCard'
import { EmptyState } from './EducationSection'
import { Plus, X } from 'lucide-react'

interface Props {
  items: ExperienceItem[]
  onChange: (items: ExperienceItem[]) => void
}

const blank = (): ExperienceItem => ({
  id: uid('exp'),
  jobTitle: '',
  company: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  description: '',
  bullets: [],
})

export default function ExperienceSection({ items, onChange }: Props) {
  const update = (id: string, patch: Partial<ExperienceItem>) =>
    onChange(items.map((i) => (i.id === id ? { ...i, ...patch } : i)))

  const remove = (id: string) => onChange(items.filter((i) => i.id !== id))
  const add = () => onChange([...items, blank()])

  const addBullet = (item: ExperienceItem) => update(item.id, { bullets: [...item.bullets, ''] })
  const updateBullet = (item: ExperienceItem, idx: number, val: string) => {
    const bullets = [...item.bullets]
    bullets[idx] = val
    update(item.id, { bullets })
  }
  const removeBullet = (item: ExperienceItem, idx: number) =>
    update(item.id, { bullets: item.bullets.filter((_, i) => i !== idx) })

  return (
    <div>
      <SectionHeader title="Work Experience" description="List your roles, most recent first." />
      {items.length === 0 ? (
        <EmptyState onAdd={add} label="Add Experience" />
      ) : (
        <DragList
          items={items}
          onReorder={onChange}
          renderItem={(item) => (
            <SortableEntryCard
              key={item.id}
              id={item.id}
              title={item.jobTitle ? `${item.jobTitle}${item.company ? ' · ' + item.company : ''}` : 'New Experience Entry'}
              onRemove={() => remove(item.id)}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Job Title">
                  <input className="input" value={item.jobTitle} onChange={(e) => update(item.id, { jobTitle: e.target.value })} />
                </Field>
                <Field label="Company">
                  <input className="input" value={item.company} onChange={(e) => update(item.id, { company: e.target.value })} />
                </Field>
                <Field label="Location">
                  <input className="input" value={item.location} onChange={(e) => update(item.id, { location: e.target.value })} />
                </Field>
                <div className="flex items-end gap-2 pb-1.5">
                  <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded accent-brand-600"
                      checked={item.current}
                      onChange={(e) => update(item.id, { current: e.target.checked, endDate: e.target.checked ? '' : item.endDate })}
                    />
                    I currently work here
                  </label>
                </div>
                <Field label="Start Date">
                  <input className="input" placeholder="Jan 2021" value={item.startDate} onChange={(e) => update(item.id, { startDate: e.target.value })} />
                </Field>
                <Field label="End Date">
                  <input
                    className="input disabled:opacity-50"
                    placeholder="Present"
                    disabled={item.current}
                    value={item.current ? 'Present' : item.endDate}
                    onChange={(e) => update(item.id, { endDate: e.target.value })}
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Description">
                    <textarea className="input min-h-[70px]" value={item.description} onChange={(e) => update(item.id, { description: e.target.value })} />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <label className="label">Bullet Points</label>
                  <div className="space-y-2">
                    {item.bullets.map((b, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-slate-400">•</span>
                        <input
                          className="input"
                          value={b}
                          placeholder="Increased conversion rate by 30% through..."
                          onChange={(e) => updateBullet(item, idx, e.target.value)}
                        />
                        <button onClick={() => removeBullet(item, idx)} className="btn-ghost !p-1.5 text-rose-500">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button className="btn-ghost text-brand-600" onClick={() => addBullet(item)}>
                      <Plus className="h-3.5 w-3.5" /> Add bullet point
                    </button>
                  </div>
                </div>
              </div>
            </SortableEntryCard>
          )}
        />
      )}
      {items.length > 0 && (
        <button className="btn-secondary mt-4" onClick={add}>
          <Plus className="h-4 w-4" /> Add Experience
        </button>
      )}
    </div>
  )
}
