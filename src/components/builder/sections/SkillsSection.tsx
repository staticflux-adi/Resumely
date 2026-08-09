import React from 'react'
import { SkillItem } from '@/types/resume'
import { uid } from '@/utils/id'
import { SectionHeader } from './shared'
import DragList from '@/components/builder/DragList'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash2, Plus } from 'lucide-react'

interface Props {
  technical: SkillItem[]
  soft: SkillItem[]
  onChangeTechnical: (items: SkillItem[]) => void
  onChangeSoft: (items: SkillItem[]) => void
}

const LEVEL_LABELS = ['Novice', 'Beginner', 'Intermediate', 'Advanced', 'Expert']

function SkillRow({
  item,
  onUpdate,
  onRemove,
}: {
  item: SkillItem
  onUpdate: (patch: Partial<SkillItem>) => void
  onRemove: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id })
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900"
    >
      <button {...attributes} {...listeners} className="cursor-grab touch-none text-slate-400 active:cursor-grabbing">
        <GripVertical className="h-4 w-4" />
      </button>
      <input
        className="input flex-1 !py-2"
        placeholder="e.g. TypeScript"
        value={item.name}
        onChange={(e) => onUpdate({ name: e.target.value })}
      />
      <input
        type="range"
        min={1}
        max={5}
        value={item.level}
        onChange={(e) => onUpdate({ level: Number(e.target.value) })}
        className="w-32 accent-brand-600"
      />
      <span className="w-24 text-xs font-medium text-slate-500">{LEVEL_LABELS[item.level - 1]}</span>
      <button onClick={onRemove} className="text-rose-500 hover:text-rose-600">
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}

function SkillGroup({
  title,
  items,
  onChange,
}: {
  title: string
  items: SkillItem[]
  onChange: (items: SkillItem[]) => void
}) {
  const add = () => onChange([...items, { id: uid('skill'), name: '', level: 3 }])
  const update = (id: string, patch: Partial<SkillItem>) =>
    onChange(items.map((i) => (i.id === id ? { ...i, ...patch } : i)))
  const remove = (id: string) => onChange(items.filter((i) => i.id !== id))

  return (
    <div>
      <h3 className="mb-3 text-sm font-bold text-slate-700 dark:text-slate-200">{title}</h3>
      {items.length > 0 && (
        <DragList
          items={items}
          onReorder={onChange}
          renderItem={(item) => (
            <SkillRow
              key={item.id}
              item={item}
              onUpdate={(patch) => update(item.id, patch)}
              onRemove={() => remove(item.id)}
            />
          )}
        />
      )}
      <button className="btn-ghost mt-2 text-brand-600" onClick={add}>
        <Plus className="h-3.5 w-3.5" /> Add Skill
      </button>
    </div>
  )
}

export default function SkillsSection({ technical, soft, onChangeTechnical, onChangeSoft }: Props) {
  return (
    <div className="space-y-8">
      <SectionHeader title="Skills" description="Rate your proficiency to help tailor your resume for each role." />
      <SkillGroup title="Technical Skills" items={technical} onChange={onChangeTechnical} />
      <SkillGroup title="Soft Skills" items={soft} onChange={onChangeSoft} />
    </div>
  )
}
