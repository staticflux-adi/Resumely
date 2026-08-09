import React from 'react'
import { ProjectItem } from '@/types/resume'
import { uid } from '@/utils/id'
import { Field, SectionHeader } from './shared'
import DragList from '@/components/builder/DragList'
import SortableEntryCard from '@/components/builder/SortableEntryCard'
import { EmptyState } from './EducationSection'
import { Plus } from 'lucide-react'

interface Props {
  items: ProjectItem[]
  onChange: (items: ProjectItem[]) => void
}

const blank = (): ProjectItem => ({
  id: uid('proj'),
  name: '',
  technologies: '',
  description: '',
  githubLink: '',
  liveLink: '',
})

export default function ProjectsSection({ items, onChange }: Props) {
  const update = (id: string, patch: Partial<ProjectItem>) =>
    onChange(items.map((i) => (i.id === id ? { ...i, ...patch } : i)))
  const remove = (id: string) => onChange(items.filter((i) => i.id !== id))
  const add = () => onChange([...items, blank()])

  return (
    <div>
      <SectionHeader title="Projects" description="Showcase personal, academic, or professional projects." />
      {items.length === 0 ? (
        <EmptyState onAdd={add} label="Add Project" />
      ) : (
        <DragList
          items={items}
          onReorder={onChange}
          renderItem={(item) => (
            <SortableEntryCard key={item.id} id={item.id} title={item.name || 'New Project'} onRemove={() => remove(item.id)}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Project Name">
                  <input className="input" value={item.name} onChange={(e) => update(item.id, { name: e.target.value })} />
                </Field>
                <Field label="Technologies Used">
                  <input className="input" placeholder="React, Node.js, PostgreSQL" value={item.technologies} onChange={(e) => update(item.id, { technologies: e.target.value })} />
                </Field>
                <Field label="GitHub Link">
                  <input className="input" value={item.githubLink} onChange={(e) => update(item.id, { githubLink: e.target.value })} />
                </Field>
                <Field label="Live Demo Link">
                  <input className="input" value={item.liveLink} onChange={(e) => update(item.id, { liveLink: e.target.value })} />
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
          <Plus className="h-4 w-4" /> Add Project
        </button>
      )}
    </div>
  )
}
