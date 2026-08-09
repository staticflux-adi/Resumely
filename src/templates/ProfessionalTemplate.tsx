import React from 'react'
import { ResumeData, ThemeSettings } from '@/types/resume'
import { renderSectionBody, sectionHasContent, sectionLabel, ContactRow } from './sectionRenderers'

export default function ProfessionalTemplate({ data, theme }: { data: ResumeData; theme: ThemeSettings }) {
  const sections = data.sectionOrder.filter((k) => sectionHasContent(k, data))

  return (
    <div style={{ fontFamily: theme.fontFamily, background: '#fff', padding: theme.margin }}>
      <div style={{ borderBottom: `3px solid ${theme.primaryColor}`, paddingBottom: 18, marginBottom: 20 }}>
        <h1 style={{ fontSize: theme.fontSize * 1.8, fontWeight: 800, color: '#0f172a' }}>
          {data.personal.firstName} {data.personal.lastName}
        </h1>
        <p style={{ fontSize: theme.fontSize * 1.05, color: theme.primaryColor, fontWeight: 600, marginTop: 2 }}>
          {data.personal.title}
        </p>
        <div style={{ marginTop: 8 }}>
          <ContactRow data={data} theme={theme} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {sections.map((key) => (
          <div key={key}>
            <h2
              style={{
                fontSize: theme.fontSize * 1.02,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: theme.secondaryColor,
                marginBottom: 10,
                paddingBottom: 4,
                borderBottom: `1.5px solid ${theme.primaryColor}`,
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
