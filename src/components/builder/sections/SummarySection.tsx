import React from 'react'
import { SectionHeader } from './shared'

interface Props {
  value: string
  onChange: (value: string) => void
}

export default function SummarySection({ value, onChange }: Props) {
  return (
    <div>
      <SectionHeader
        title="Professional Summary"
        description="A short, punchy overview of your experience and strengths (2–4 sentences)."
      />
      <textarea
        className="input min-h-[160px] resize-y"
        placeholder="Results-driven software engineer with 5+ years of experience building scalable web applications..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <p className="mt-2 text-right text-xs text-slate-400">{value.length} characters</p>
    </div>
  )
}
