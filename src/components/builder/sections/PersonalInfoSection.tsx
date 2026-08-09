import React from 'react'
import { PersonalInfo } from '@/types/resume'
import { Field, SectionHeader } from './shared'

interface Props {
  value: PersonalInfo
  onChange: (value: PersonalInfo) => void
}

export default function PersonalInfoSection({ value, onChange }: Props) {
  const set = (key: keyof PersonalInfo, v: string) => onChange({ ...value, [key]: v })

  return (
    <div>
      <SectionHeader title="Personal Information" description="How employers will identify and contact you." />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First Name">
          <input className="input" value={value.firstName} onChange={(e) => set('firstName', e.target.value)} />
        </Field>
        <Field label="Last Name">
          <input className="input" value={value.lastName} onChange={(e) => set('lastName', e.target.value)} />
        </Field>
        <Field label="Professional Title">
          <input
            className="input"
            placeholder="e.g. Senior Product Designer"
            value={value.title}
            onChange={(e) => set('title', e.target.value)}
          />
        </Field>
        <Field label="Email">
          <input className="input" type="email" value={value.email} onChange={(e) => set('email', e.target.value)} />
        </Field>
        <Field label="Phone">
          <input className="input" value={value.phone} onChange={(e) => set('phone', e.target.value)} />
        </Field>
        <Field label="Address">
          <input className="input" value={value.address} onChange={(e) => set('address', e.target.value)} />
        </Field>
        <Field label="Website">
          <input className="input" value={value.website} onChange={(e) => set('website', e.target.value)} />
        </Field>
        <Field label="LinkedIn">
          <input className="input" value={value.linkedin} onChange={(e) => set('linkedin', e.target.value)} />
        </Field>
        <Field label="GitHub">
          <input className="input" value={value.github} onChange={(e) => set('github', e.target.value)} />
        </Field>
        <Field label="Portfolio">
          <input className="input" value={value.portfolio} onChange={(e) => set('portfolio', e.target.value)} />
        </Field>
      </div>
    </div>
  )
}
