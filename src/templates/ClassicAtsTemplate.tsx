import React from 'react'
import { ResumeData, ThemeSettings } from '@/types/resume'
import { sectionHasContent, sectionLabel } from './sectionRenderers'

// Deliberately avoids icons, colors, columns, and graphics so ATS parsers
// can read the content linearly and reliably.
export default function ClassicAtsTemplate({ data, theme }: { data: ResumeData; theme: ThemeSettings }) {
  const sections = data.sectionOrder.filter((k) => sectionHasContent(k, data))
  const p = data.personal

  return (
    <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', background: '#fff', padding: theme.margin, color: '#111' }}>
      <h1 style={{ fontSize: theme.fontSize * 1.6, fontWeight: 700 }}>
        {p.firstName} {p.lastName}
      </h1>
      <p style={{ fontSize: theme.fontSize * 0.95, fontWeight: 600, marginTop: 2 }}>{p.title}</p>
      <p style={{ fontSize: theme.fontSize * 0.82, marginTop: 6, color: '#333' }}>
        {[p.email, p.phone, p.address, p.website, p.linkedin, p.github, p.portfolio].filter(Boolean).join(' | ')}
      </p>

      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {sections.map((key) => (
          <div key={key}>
            <h2 style={{ fontSize: theme.fontSize * 0.98, fontWeight: 700, textTransform: 'uppercase', marginBottom: 6, borderBottom: '1px solid #333', paddingBottom: 3 }}>
              {sectionLabel(key, data)}
            </h2>
            <AtsSectionBody sectionKey={key} data={data} theme={theme} />
          </div>
        ))}
      </div>
    </div>
  )
}

function AtsSectionBody({ sectionKey, data, theme }: { sectionKey: string; data: ResumeData; theme: ThemeSettings }) {
  const fs = theme.fontSize * 0.88
  if (sectionKey === 'summary') return <p style={{ fontSize: fs }}>{data.summary}</p>
  if (sectionKey === 'experience')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {data.experience.map((e) => (
          <div key={e.id}>
            <p style={{ fontSize: fs, fontWeight: 700 }}>
              {e.jobTitle} — {e.company} ({e.startDate} - {e.current ? 'Present' : e.endDate})
            </p>
            {e.location && <p style={{ fontSize: fs * 0.92, color: '#444' }}>{e.location}</p>}
            {e.description && <p style={{ fontSize: fs, marginTop: 2 }}>{e.description}</p>}
            {e.bullets.filter(Boolean).map((b, i) => (
              <p key={i} style={{ fontSize: fs, marginLeft: 12 }}>- {b}</p>
            ))}
          </div>
        ))}
      </div>
    )
  if (sectionKey === 'education')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {data.education.map((e) => (
          <p key={e.id} style={{ fontSize: fs }}>
            {e.degree}{e.field && `, ${e.field}`} — {e.school} ({e.startDate} - {e.endDate}){e.grade && ` — ${e.grade}`}
          </p>
        ))}
      </div>
    )
  if (sectionKey === 'projects')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {data.projects.map((p) => (
          <p key={p.id} style={{ fontSize: fs }}>
            {p.name}{p.technologies && ` (${p.technologies})`}: {p.description}
          </p>
        ))}
      </div>
    )
  if (sectionKey === 'skills')
    return (
      <p style={{ fontSize: fs }}>
        {[...data.technicalSkills, ...data.softSkills].map((s) => s.name).filter(Boolean).join(', ')}
      </p>
    )
  if (sectionKey === 'certifications')
    return (
      <p style={{ fontSize: fs }}>
        {data.certifications.map((c) => `${c.name} — ${c.issuer} (${c.date})`).join('; ')}
      </p>
    )
  if (sectionKey === 'achievements')
    return (
      <div>
        {data.achievements.map((a) => (
          <p key={a.id} style={{ fontSize: fs }}>- {a.title}{a.description && `: ${a.description}`}</p>
        ))}
      </div>
    )
  if (sectionKey === 'languages')
    return <p style={{ fontSize: fs }}>{data.languages.map((l) => `${l.name} (${l.proficiency})`).join(', ')}</p>
  if (sectionKey === 'interests') return <p style={{ fontSize: fs }}>{data.interests.join(', ')}</p>
  if (sectionKey === 'references')
    return (
      <div>
        {data.references.map((r) => (
          <p key={r.id} style={{ fontSize: fs }}>
            {r.name}, {r.relationship}{r.company && `, ${r.company}`} — {[r.email, r.phone].filter(Boolean).join(', ')}
          </p>
        ))}
      </div>
    )
  if (sectionKey.startsWith('custom:')) {
    const id = sectionKey.split(':')[1]
    const section = data.customSections.find((s) => s.id === id)
    return (
      <div>
        {section?.items.map((item) => (
          <p key={item.id} style={{ fontSize: fs }}>
            {item.heading}{item.subheading && ` — ${item.subheading}`}{item.description && `: ${item.description}`}
          </p>
        ))}
      </div>
    )
  }
  return null
}
