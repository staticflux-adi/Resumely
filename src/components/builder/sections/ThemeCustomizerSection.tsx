import React from 'react'
import { ThemeSettings } from '@/types/resume'
import { SectionHeader } from './shared'

interface Props {
  theme: ThemeSettings
  onChange: (theme: ThemeSettings) => void
}

const FONTS = ['Inter', 'Poppins', 'Georgia', 'Times New Roman', 'Roboto', 'Lato']

export default function ThemeCustomizerSection({ theme, onChange }: Props) {
  const set = <K extends keyof ThemeSettings>(key: K, value: ThemeSettings[K]) =>
    onChange({ ...theme, [key]: value })

  return (
    <div>
      <SectionHeader title="Theme Customization" description="Changes apply instantly to your resume preview and export." />

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Primary Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.primaryColor}
                onChange={(e) => set('primaryColor', e.target.value)}
                className="h-10 w-12 cursor-pointer rounded-lg border border-slate-200 dark:border-slate-700"
              />
              <input className="input" value={theme.primaryColor} onChange={(e) => set('primaryColor', e.target.value)} />
            </div>
          </div>
          <div>
            <label className="label">Secondary Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.secondaryColor}
                onChange={(e) => set('secondaryColor', e.target.value)}
                className="h-10 w-12 cursor-pointer rounded-lg border border-slate-200 dark:border-slate-700"
              />
              <input className="input" value={theme.secondaryColor} onChange={(e) => set('secondaryColor', e.target.value)} />
            </div>
          </div>
          <div>
            <label className="label">Accent Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.accentColor}
                onChange={(e) => set('accentColor', e.target.value)}
                className="h-10 w-12 cursor-pointer rounded-lg border border-slate-200 dark:border-slate-700"
              />
              <input className="input" value={theme.accentColor} onChange={(e) => set('accentColor', e.target.value)} />
            </div>
          </div>
          <div>
            <label className="label">Font Family</label>
            <select className="input" value={theme.fontFamily} onChange={(e) => set('fontFamily', e.target.value)}>
              {FONTS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Font Size ({theme.fontSize}px)</label>
            <input
              type="range"
              min={11}
              max={18}
              value={theme.fontSize}
              onChange={(e) => set('fontSize', Number(e.target.value))}
              className="w-full accent-brand-600"
            />
          </div>
          <div>
            <label className="label">Line Height ({theme.lineHeight.toFixed(1)})</label>
            <input
              type="range"
              min={1.1}
              max={2}
              step={0.1}
              value={theme.lineHeight}
              onChange={(e) => set('lineHeight', Number(e.target.value))}
              className="w-full accent-brand-600"
            />
          </div>
          <div>
            <label className="label">Page Margins ({theme.margin}px)</label>
            <input
              type="range"
              min={16}
              max={64}
              value={theme.margin}
              onChange={(e) => set('margin', Number(e.target.value))}
              className="w-full accent-brand-600"
            />
          </div>
          <div className="flex items-end pb-1.5">
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                className="h-4 w-4 rounded accent-brand-600"
                checked={theme.showIcons}
                onChange={(e) => set('showIcons', e.target.checked)}
              />
              Show icons
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
