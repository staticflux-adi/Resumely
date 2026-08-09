import React from 'react'
import { ResumeData, ThemeSettings } from '@/types/resume'
import { renderSectionBody, sectionHasContent, sectionLabel, ContactRow } from './sectionRenderers'

export default function MinimalTemplate({ data, theme }: { data: ResumeData; theme: ThemeSettings }) {
  const sections = data.sectionOrder.filter((k) => sectionHasContent(k, data))

  return (
    <div style={{ fontFamily: theme.fontFamily, background: '#fff', padding: theme.margin * 1.3 }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1 style={{ fontSize: theme.fontSize * 2, fontWeight: 300, letterSpacing: '0.08em', color: '#0f172a', textTransform: 'uppercase' }}>
          {data.personal.firstName} <span style={{ fontWeight: 700 }}>{data.personal.lastName}</span>
        </h1>
        <p style={{ fontSize: theme.fontSize, color: theme.primaryColor, marginTop: 6, letterSpacing: '0.05em' }}>
          {data.personal.title}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
          <ContactRow data={data} theme={theme} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
        {sections.map((key) => (
          <div key={key}>
            <h2
              style={{
                fontSize: theme.fontSize * 0.85,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: '#94a3b8',
                marginBottom: 12,
              }}
            >
              {sectionLabel(key, data)}
            </h2>
            {renderSectionBody(key, data, theme)}
          </div>
        ))}
      </div>
    </div>
  )
}
