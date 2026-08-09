import { TemplateId } from '@/types/resume'

export interface TemplateMeta {
  id: TemplateId
  name: string
  description: string
  accent: string
  previewGradient: string
}

export const TEMPLATE_META: TemplateMeta[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Bold sidebar layout with a clean two-column split.',
    accent: '#3346f0',
    previewGradient: 'linear-gradient(135deg,#e0ebff,#c2d6ff)',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'A traditional single-column layout, refined for corporate roles.',
    accent: '#1e2352',
    previewGradient: 'linear-gradient(135deg,#eef0fb,#dde1f5)',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Lots of whitespace and quiet typography for a clean first impression.',
    accent: '#111827',
    previewGradient: 'linear-gradient(135deg,#f8fafc,#e2e8f0)',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'A vibrant header band and playful accents for design-forward roles.',
    accent: '#f78c1f',
    previewGradient: 'linear-gradient(135deg,#fff1e0,#ffdca8)',
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Refined serif headings and generous spacing for senior roles.',
    accent: '#7c2d12',
    previewGradient: 'linear-gradient(135deg,#f5efe8,#e8dccb)',
  },
  {
    id: 'classic-ats',
    name: 'Classic ATS',
    description: 'Plain, linear formatting built to parse cleanly in ATS systems.',
    accent: '#374151',
    previewGradient: 'linear-gradient(135deg,#f8fafc,#eef1f5)',
  },
]

export function getTemplateMeta(id: TemplateId): TemplateMeta {
  return TEMPLATE_META.find((t) => t.id === id) ?? TEMPLATE_META[0]
}
