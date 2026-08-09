import React from 'react'
import {
  User, FileText, Briefcase, GraduationCap, FolderKanban, Sparkles, Award,
  Trophy, Languages, Heart, Users, Plus, Palette, GripVertical, ListPlus,
} from 'lucide-react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import DragList from './DragList'
import { ResumeData } from '@/types/resume'
import { sectionLabel } from '@/templates/sectionRenderers'

const ICONS: Record<string, any> = {
  summary: FileText,
  experience: Briefcase,
  education: GraduationCap,
  projects: FolderKanban,
  skills: Sparkles,
  certifications: Award,
  achievements: Trophy,
  languages: Languages,
  interests: Heart,
  references: Users,
}

interface Props {
  data: ResumeData
  activeSection: string
  onSelect: (key: string) => void
  onReorder: (order: string[]) => void
  onAddCustomSection: () => void
}

function NavRow({
  id, label, icon: Icon, active, onSelect,
}: { id: string; label: string; icon: any; active: boolean; onSelect: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center gap-1 rounded-lg pr-2 transition-colors ${
        active ? 'bg-brand-50 dark:bg-brand-950' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
      }`}
    >
      <button {...attributes} {...listeners} className="cursor-grab touch-none p-2 text-slate-300 hover:text-slate-500 active:cursor-grabbing">
        <GripVertical className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={onSelect}
        className={`flex flex-1 items-center gap-2.5 py-2.5 text-left text-sm font-medium ${
          active ? 'text-brand-700 dark:text-brand-300' : 'text-slate-600 dark:text-slate-300'
        }`}
      >
        <Icon className="h-4 w-4 shrink-0" />
        <span className="truncate">{label}</span>
      </button>
    </div>
  )
}

export default function BuilderSidebar({ data, activeSection, onSelect, onReorder, onAddCustomSection }: Props) {
  const orderItems = data.sectionOrder.map((key) => ({ id: key }))

  return (
    <div className="flex h-full flex-col gap-1 overflow-y-auto p-3">
      <button
        onClick={() => onSelect('personal')}
        className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium ${
          activeSection === 'personal'
            ? 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
            : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
        }`}
      >
        <User className="h-4 w-4 shrink-0" />
        Personal Info
      </button>

      <div className="mt-2 px-3 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        Content Sections
      </div>

      <DragList
        items={orderItems}
        onReorder={(items) => onReorder(items.map((i) => i.id))}
        renderItem={(item) => (
          <NavRow
            key={item.id}
            id={item.id}
            label={sectionLabel(item.id, data)}
            icon={ICONS[item.id] ?? ListPlus}
            active={activeSection === item.id}
            onSelect={() => onSelect(item.id)}
          />
        )}
      />

      <button onClick={onAddCustomSection} className="btn-ghost mt-1 justify-start text-brand-600">
        <Plus className="h-4 w-4" /> Add Custom Section
      </button>

      <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800">
        <button
          onClick={() => onSelect('theme')}
          className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium ${
            activeSection === 'theme'
              ? 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
          }`}
        >
          <Palette className="h-4 w-4 shrink-0" />
          Design & Theme
        </button>
      </div>
    </div>
  )
}
