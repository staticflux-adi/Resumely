import React from 'react'
import { ResumeData, ThemeSettings } from '@/types/resume'
import { renderSectionBody, sectionHasContent, sectionLabel, ContactRow } from './sectionRenderers'

export default function ExecutiveTemplate({ data, theme }: { data: ResumeData; theme: ThemeSettings }) {
  const sections = data.sectionOrder.filter((k) => sectionHasContent(k, data))
  const serif = "'Georgia', 'Times New Roman', serif"

  return (
    <div style={{ fontFamily: theme.fontFamily, background: '#fff', padding: theme.margin * 1.2 }}>
      <div>
        <h1 style={{ fontFamily: serif, fontSize: theme.fontSize * 2.1, fontWeight: 700, color: theme.secondaryColor, letterSpacing: '0.02em' }}>
          {data.personal.firstName} {data.personal.lastName}
        </h1>
        <p style={{ fontSize: theme.fontSize * 1.05, color: theme.primaryColor, marginTop: 4, fontStyle: 'italic' }}>
          {data.personal.title}
        </p>
      </div>

      <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid #e2e8f0`, borderBottom: `1px solid #e2e8f0`, paddingBottom: 12 }}>
        <ContactRow data={data} theme={theme} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 22 }}>
        {sections.map((key) => (
          <div key={key}>
            <h2
              style={{
                fontFamily: serif,
                fontSize: theme.fontSize * 1.1,
                fontWeight: 700,
                color: theme.secondaryColor,
                marginBottom: 10,
                letterSpacing: '0.03em',
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
