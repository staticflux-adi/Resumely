import React from 'react'
import { ResumeData, ThemeSettings } from '@/types/resume'
import {
  Mail, Phone, MapPin, Globe, Linkedin, Github, Link as LinkIcon,
} from 'lucide-react'

export function ContactRow({ data, theme, dark = false }: { data: ResumeData; theme: ThemeSettings; dark?: boolean }) {
  const { personal } = data
  const iconColor = dark ? 'rgba(255,255,255,0.85)' : theme.secondaryColor
  const items = [
    personal.email && { icon: Mail, text: personal.email },
    personal.phone && { icon: Phone, text: personal.phone },
    personal.address && { icon: MapPin, text: personal.address },
    personal.website && { icon: Globe, text: personal.website },
    personal.linkedin && { icon: Linkedin, text: personal.linkedin },
    personal.github && { icon: Github, text: personal.github },
    personal.portfolio && { icon: LinkIcon, text: personal.portfolio },
  ].filter(Boolean) as { icon: any; text: string }[]

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1.5" style={{ fontSize: theme.fontSize * 0.78 }}>
      {items.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-1.5" style={{ color: dark ? 'rgba(255,255,255,0.85)' : '#475569' }}>
          {theme.showIcons && <item.icon className="h-3.5 w-3.5" style={{ color: iconColor }} />}
          {item.text}
        </span>
      ))}
    </div>
  )
}

export function SectionTitle({ children, theme, style }: { children: React.ReactNode; theme: ThemeSettings; style?: React.CSSProperties }) {
  return (
    <h2
      style={{
        color: theme.primaryColor,
        fontSize: theme.fontSize * 1.05,
        letterSpacing: '0.04em',
        borderBottom: `2px solid ${theme.primaryColor}33`,
        ...style,
      }}
      className="mb-2.5 pb-1.5 font-bold uppercase"
    >
      {children}
    </h2>
  )
}

export function SummaryBlock({ data, theme }: { data: ResumeData; theme: ThemeSettings }) {
  if (!data.summary) return null
  return (
    <p style={{ fontSize: theme.fontSize * 0.92, lineHeight: theme.lineHeight, color: '#334155' }}>
      {data.summary}
    </p>
  )
}

export function ExperienceBlock({ data, theme }: { data: ResumeData; theme: ThemeSettings }) {
  if (data.experience.length === 0) return null
  return (
    <div className="space-y-4">
      {data.experience.map((exp) => (
        <div key={exp.id}>
          <div className="flex items-baseline justify-between gap-2 flex-wrap">
            <h3 style={{ fontSize: theme.fontSize * 1, color: '#0f172a' }} className="font-bold">
              {exp.jobTitle}
              {exp.company && <span style={{ color: theme.primaryColor }}> · {exp.company}</span>}
            </h3>
            <span style={{ fontSize: theme.fontSize * 0.8, color: '#64748b' }}>
              {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
            </span>
          </div>
          {exp.location && (
            <p style={{ fontSize: theme.fontSize * 0.78, color: '#94a3b8' }}>{exp.location}</p>
          )}
          {exp.description && (
            <p style={{ fontSize: theme.fontSize * 0.9, lineHeight: theme.lineHeight, color: '#334155' }} className="mt-1">
              {exp.description}
            </p>
          )}
          {exp.bullets.filter(Boolean).length > 0 && (
            <ul className="mt-1.5 space-y-1 pl-4" style={{ fontSize: theme.fontSize * 0.88, color: '#334155', listStyleType: 'disc' }}>
              {exp.bullets.filter(Boolean).map((b, i) => (
                <li key={i} style={{ lineHeight: theme.lineHeight }}>{b}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}

export function EducationBlock({ data, theme }: { data: ResumeData; theme: ThemeSettings }) {
  if (data.education.length === 0) return null
  return (
    <div className="space-y-3">
      {data.education.map((ed) => (
        <div key={ed.id}>
          <div className="flex items-baseline justify-between gap-2 flex-wrap">
            <h3 style={{ fontSize: theme.fontSize * 0.98, color: '#0f172a' }} className="font-bold">
              {ed.degree}{ed.field && `, ${ed.field}`}
            </h3>
            <span style={{ fontSize: theme.fontSize * 0.8, color: '#64748b' }}>
              {ed.startDate} — {ed.endDate}
            </span>
          </div>
          <p style={{ fontSize: theme.fontSize * 0.88, color: theme.primaryColor }}>
            {ed.school}{ed.grade && ` · ${ed.grade}`}
          </p>
          {ed.description && (
            <p style={{ fontSize: theme.fontSize * 0.85, lineHeight: theme.lineHeight, color: '#334155' }} className="mt-1">
              {ed.description}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

export function ProjectsBlock({ data, theme }: { data: ResumeData; theme: ThemeSettings }) {
  if (data.projects.length === 0) return null
  return (
    <div className="space-y-3">
      {data.projects.map((p) => (
        <div key={p.id}>
          <h3 style={{ fontSize: theme.fontSize * 0.96, color: '#0f172a' }} className="font-bold">
            {p.name}
            {p.technologies && (
              <span style={{ fontSize: theme.fontSize * 0.78, color: theme.primaryColor, fontWeight: 500 }}> — {p.technologies}</span>
            )}
          </h3>
          {p.description && (
            <p style={{ fontSize: theme.fontSize * 0.86, lineHeight: theme.lineHeight, color: '#334155' }}>{p.description}</p>
          )}
          <p style={{ fontSize: theme.fontSize * 0.76, color: '#64748b' }}>
            {[p.githubLink, p.liveLink].filter(Boolean).join('   ·   ')}
          </p>
        </div>
      ))}
    </div>
  )
}

export function SkillsBlock({ items, theme, bars = false }: { items: ResumeData['technicalSkills']; theme: ThemeSettings; bars?: boolean }) {
  if (items.length === 0) return null
  if (bars) {
    return (
      <div className="space-y-2">
        {items.map((s) => (
          <div key={s.id}>
            <p style={{ fontSize: theme.fontSize * 0.85, color: '#334155' }}>{s.name}</p>
            <div className="mt-1 h-1.5 w-full rounded-full" style={{ background: '#e2e8f0' }}>
              <div
                className="h-1.5 rounded-full"
                style={{ width: `${(s.level / 5) * 100}%`, background: theme.primaryColor }}
              />
            </div>
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((s) => (
        <span
          key={s.id}
          className="rounded-full px-2.5 py-1"
          style={{ fontSize: theme.fontSize * 0.78, background: `${theme.primaryColor}14`, color: theme.primaryColor }}
        >
          {s.name}
        </span>
      ))}
    </div>
  )
}

export function CertificationsBlock({ data, theme }: { data: ResumeData; theme: ThemeSettings }) {
  if (data.certifications.length === 0) return null
  return (
    <div className="space-y-1.5">
      {data.certifications.map((c) => (
        <div key={c.id} className="flex items-baseline justify-between gap-2 flex-wrap">
          <p style={{ fontSize: theme.fontSize * 0.88, color: '#334155' }}>
            <span className="font-semibold">{c.name}</span>{c.issuer && ` — ${c.issuer}`}
          </p>
          <span style={{ fontSize: theme.fontSize * 0.76, color: '#94a3b8' }}>{c.date}</span>
        </div>
      ))}
    </div>
  )
}

export function AchievementsBlock({ data, theme }: { data: ResumeData; theme: ThemeSettings }) {
  if (data.achievements.length === 0) return null
  return (
    <ul className="space-y-1.5 pl-4" style={{ listStyleType: 'disc' }}>
      {data.achievements.map((a) => (
        <li key={a.id} style={{ fontSize: theme.fontSize * 0.88, color: '#334155', lineHeight: theme.lineHeight }}>
          <span className="font-semibold">{a.title}</span>{a.description && ` — ${a.description}`}
        </li>
      ))}
    </ul>
  )
}

export function LanguagesBlock({ data, theme }: { data: ResumeData; theme: ThemeSettings }) {
  if (data.languages.length === 0) return null
  return (
    <div className="space-y-1">
      {data.languages.map((l) => (
        <div key={l.id} className="flex items-center justify-between" style={{ fontSize: theme.fontSize * 0.86, color: '#334155' }}>
          <span>{l.name}</span>
          <span style={{ color: '#94a3b8' }}>{l.proficiency}</span>
        </div>
      ))}
    </div>
  )
}

export function InterestsBlock({ data, theme }: { data: ResumeData; theme: ThemeSettings }) {
  if (data.interests.length === 0) return null
  return (
    <div className="flex flex-wrap gap-1.5">
      {data.interests.map((i) => (
        <span
          key={i}
          className="rounded-full px-2.5 py-1"
          style={{ fontSize: theme.fontSize * 0.76, background: '#f1f5f9', color: '#475569' }}
        >
          {i}
        </span>
      ))}
    </div>
  )
}

export function ReferencesBlock({ data, theme }: { data: ResumeData; theme: ThemeSettings }) {
  if (data.references.length === 0) return null
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {data.references.map((r) => (
        <div key={r.id} style={{ fontSize: theme.fontSize * 0.85, color: '#334155' }}>
          <p className="font-semibold">{r.name}</p>
          <p style={{ color: '#64748b' }}>{r.relationship}{r.company && `, ${r.company}`}</p>
          <p style={{ color: '#64748b' }}>{[r.email, r.phone].filter(Boolean).join(' · ')}</p>
        </div>
      ))}
    </div>
  )
}

export function CustomSectionsBlock({ data, theme, sectionKey }: { data: ResumeData; theme: ThemeSettings; sectionKey: string }) {
  const id = sectionKey.split(':')[1]
  const section = data.customSections.find((s) => s.id === id)
  if (!section || section.items.length === 0) return null
  return (
    <div className="space-y-2.5">
      {section.items.map((item) => (
        <div key={item.id}>
          <div className="flex items-baseline justify-between gap-2 flex-wrap">
            <h3 style={{ fontSize: theme.fontSize * 0.94, color: '#0f172a' }} className="font-bold">{item.heading}</h3>
            {item.subheading && <span style={{ fontSize: theme.fontSize * 0.78, color: '#94a3b8' }}>{item.subheading}</span>}
          </div>
          {item.description && (
            <p style={{ fontSize: theme.fontSize * 0.85, lineHeight: theme.lineHeight, color: '#334155' }}>{item.description}</p>
          )}
        </div>
      ))}
    </div>
  )
}

export function customSectionTitle(data: ResumeData, sectionKey: string): string {
  const id = sectionKey.split(':')[1]
  return data.customSections.find((s) => s.id === id)?.title ?? 'Custom Section'
}

export const SECTION_LABELS: Record<string, string> = {
  summary: 'Summary',
  experience: 'Experience',
  education: 'Education',
  projects: 'Projects',
  skills: 'Skills',
  certifications: 'Certifications',
  achievements: 'Achievements',
  languages: 'Languages',
  interests: 'Interests',
  references: 'References',
}

export function renderSectionBody(
  key: string,
  data: ResumeData,
  theme: ThemeSettings,
  opts?: { skillsBars?: boolean },
): React.ReactNode {
  if (key === 'summary') return <SummaryBlock data={data} theme={theme} />
  if (key === 'experience') return <ExperienceBlock data={data} theme={theme} />
  if (key === 'education') return <EducationBlock data={data} theme={theme} />
  if (key === 'projects') return <ProjectsBlock data={data} theme={theme} />
  if (key === 'skills')
    return (
      <div className="space-y-3">
        <SkillsBlock items={data.technicalSkills} theme={theme} bars={opts?.skillsBars} />
        <SkillsBlock items={data.softSkills} theme={theme} bars={opts?.skillsBars} />
      </div>
    )
  if (key === 'certifications') return <CertificationsBlock data={data} theme={theme} />
  if (key === 'achievements') return <AchievementsBlock data={data} theme={theme} />
  if (key === 'languages') return <LanguagesBlock data={data} theme={theme} />
  if (key === 'interests') return <InterestsBlock data={data} theme={theme} />
  if (key === 'references') return <ReferencesBlock data={data} theme={theme} />
  if (key.startsWith('custom:')) return <CustomSectionsBlock data={data} theme={theme} sectionKey={key} />
  return null
}

export function sectionHasContent(key: string, data: ResumeData): boolean {
  switch (key) {
    case 'summary': return !!data.summary
    case 'experience': return data.experience.length > 0
    case 'education': return data.education.length > 0
    case 'projects': return data.projects.length > 0
    case 'skills': return data.technicalSkills.length > 0 || data.softSkills.length > 0
    case 'certifications': return data.certifications.length > 0
    case 'achievements': return data.achievements.length > 0
    case 'languages': return data.languages.length > 0
    case 'interests': return data.interests.length > 0
    case 'references': return data.references.length > 0
    default:
      if (key.startsWith('custom:')) {
        const id = key.split(':')[1]
        return (data.customSections.find((s) => s.id === id)?.items.length ?? 0) > 0
      }
      return false
  }
}

export function sectionLabel(key: string, data: ResumeData): string {
  if (key.startsWith('custom:')) return customSectionTitle(data, key)
  return SECTION_LABELS[key] ?? key
}
