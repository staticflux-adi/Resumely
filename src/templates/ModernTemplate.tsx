import React from 'react'
import { ResumeData, ThemeSettings } from '@/types/resume'
import {
  renderSectionBody, sectionHasContent, sectionLabel,
} from './sectionRenderers'
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react'

const SIDEBAR_KEYS = ['skills', 'languages', 'interests', 'certifications']

export default function ModernTemplate({ data, theme }: { data: ResumeData; theme: ThemeSettings }) {
  const order = data.sectionOrder
  const sidebarSections = order.filter((k) => SIDEBAR_KEYS.includes(k) && sectionHasContent(k, data))
  const mainSections = order.filter((k) => !SIDEBAR_KEYS.includes(k) && sectionHasContent(k, data))

  const contactItems = [
    data.personal.email && { icon: Mail, text: data.personal.email },
    data.personal.phone && { icon: Phone, text: data.personal.phone },
    data.personal.address && { icon: MapPin, text: data.personal.address },
    data.personal.website && { icon: Globe, text: data.personal.website },
    data.personal.linkedin && { icon: Linkedin, text: data.personal.linkedin },
    data.personal.github && { icon: Github, text: data.personal.github },
  ].filter(Boolean) as { icon: any; text: string }[]

  return (
    <div style={{ fontFamily: theme.fontFamily, display: 'flex', minHeight: '100%', background: '#fff' }}>
      <div style={{ width: '34%', background: theme.secondaryColor, padding: theme.margin, color: '#fff' }}>
        <h1 style={{ fontSize: theme.fontSize * 1.5, fontWeight: 800, lineHeight: 1.2 }}>
          {data.personal.firstName} {data.personal.lastName}
        </h1>
        <p style={{ fontSize: theme.fontSize * 0.95, color: theme.accentColor, fontWeight: 600, marginTop: 4 }}>
          {data.personal.title}
        </p>

        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {contactItems.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: theme.fontSize * 0.78, color: 'rgba(255,255,255,0.85)' }}>
              {theme.showIcons && <item.icon style={{ width: 14, height: 14, flexShrink: 0 }} />}
              <span style={{ wordBreak: 'break-word' }}>{item.text}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 22 }}>
          {sidebarSections.map((key) => (
            <div key={key}>
              <h2
                style={{
                  fontSize: theme.fontSize * 0.95,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: theme.accentColor,
                  marginBottom: 10,
                  paddingBottom: 6,
                  borderBottom: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                {sectionLabel(key, data)}
              </h2>
              <div style={{ color: 'rgba(255,255,255,0.9)' }}>
                <SidebarContent sectionKey={key} data={data} theme={theme} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ width: '66%', padding: theme.margin }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          {mainSections.map((key) => (
            <div key={key}>
              <h2
                style={{
                  fontSize: theme.fontSize * 1.05,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  color: theme.primaryColor,
                  marginBottom: 10,
                  paddingBottom: 6,
                  borderBottom: `2px solid ${theme.primaryColor}33`,
                }}
              >
                {sectionLabel(key, data)}
              </h2>
              {renderSectionBody(key, data, theme)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SidebarContent({ sectionKey, data, theme }: { sectionKey: string; data: ResumeData; theme: ThemeSettings }) {
  if (sectionKey === 'skills') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[...data.technicalSkills, ...data.softSkills].map((s) => (
          <div key={s.id}>
            <p style={{ fontSize: theme.fontSize * 0.82 }}>{s.name}</p>
            <div style={{ height: 5, width: '100%', borderRadius: 999, background: 'rgba(255,255,255,0.2)', marginTop: 4 }}>
              <div style={{ height: 5, borderRadius: 999, width: `${(s.level / 5) * 100}%`, background: theme.accentColor }} />
            </div>
          </div>
        ))}
      </div>
    )
  }
  if (sectionKey === 'languages') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {data.languages.map((l) => (
          <div key={l.id} style={{ fontSize: theme.fontSize * 0.82, display: 'flex', justifyContent: 'space-between' }}>
            <span>{l.name}</span>
            <span style={{ opacity: 0.7 }}>{l.proficiency}</span>
          </div>
        ))}
      </div>
    )
  }
  if (sectionKey === 'interests') {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {data.interests.map((i) => (
          <span key={i} style={{ fontSize: theme.fontSize * 0.74, background: 'rgba(255,255,255,0.12)', padding: '4px 10px', borderRadius: 999 }}>
            {i}
          </span>
        ))}
      </div>
    )
  }
  if (sectionKey === 'certifications') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {data.certifications.map((c) => (
          <div key={c.id} style={{ fontSize: theme.fontSize * 0.8 }}>
            <p style={{ fontWeight: 600 }}>{c.name}</p>
            <p style={{ opacity: 0.7, fontSize: theme.fontSize * 0.72 }}>{c.issuer} {c.date && `· ${c.date}`}</p>
          </div>
        ))}
      </div>
    )
  }
  return null
}
