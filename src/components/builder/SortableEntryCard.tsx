import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash2 } from 'lucide-react'

interface SortableEntryCardProps {
  id: string
  title: string
  onRemove: () => void
  children: React.ReactNode
  defaultOpen?: boolean
}

export default function SortableEntryCard({ id, title, onRemove, children }: SortableEntryCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab touch-none text-slate-400 hover:text-slate-600 active:cursor-grabbing"
            aria-label="Drag to reorder"
          >
            <GripVertical className="h-4 w-4" />
          </button>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{title}</span>
        </div>
        <button
          onClick={onRemove}
          className="rounded-lg p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950"
          aria-label="Remove entry"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}
