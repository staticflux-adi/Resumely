import React from 'react'
import { ResumeData, ThemeSettings } from '@/types/resume'
import { renderSectionBody, sectionHasContent, sectionLabel, ContactRow } from './sectionRenderers'

const SIDEBAR_KEYS = ['skills', 'languages', 'interests', 'certifications', 'education']

export default function CreativeTemplate({ data, theme }: { data: ResumeData; theme: ThemeSettings }) {
  const order = data.sectionOrder
  const sidebarSections = order.filter((k) => SIDEBAR_KEYS.includes(k) && sectionHasContent(k, data))
  const mainSections = order.filter((k) => !SIDEBAR_KEYS.includes(k) && sectionHasContent(k, data))

  return (
    <div style={{ fontFamily: theme.fontFamily, background: '#fff' }}>
      <div
        style={{
          background: `linear-gradient(120deg, ${theme.primaryColor}, ${theme.accentColor})`,
          padding: theme.margin,
          paddingBottom: theme.margin * 1.6,
          color: '#fff',
        }}
      >
        <div>
          <h1 style={{ fontSize: theme.fontSize * 1.9, fontWeight: 800 }}>
            {data.personal.firstName} {data.personal.lastName}
          </h1>
          <p style={{ fontSize: theme.fontSize * 1.05, fontWeight: 600, opacity: 0.95, marginTop: 2 }}>
            {data.personal.title}
          </p>
        </div>
      </div>

      <div style={{ padding: theme.margin, marginTop: -theme.margin * 0.9 }}>
        <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 8px 24px rgba(0,0,0,0.08)', padding: '14px 20px', marginBottom: 24 }}>
          <ContactRow data={data} theme={theme} />
        </div>

        <div style={{ display: 'flex', gap: 28 }}>
          <div style={{ width: '32%', display: 'flex', flexDirection: 'column', gap: 22 }}>
            {sidebarSections.map((key) => (
              <div key={key}>
                <h2
                  style={{
                    fontSize: theme.fontSize * 0.9,
                    fontWeight: 800,
                    color: theme.accentColor,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: 8,
                  }}
                >
                  {sectionLabel(key, data)}
                </h2>
                {renderSectionBody(key, data, theme, { skillsBars: true })}
              </div>
            ))}
          </div>
          <div style={{ width: '68%', display: 'flex', flexDirection: 'column', gap: 22 }}>
            {mainSections.map((key) => (
              <div key={key}>
                <h2
                  style={{
                    fontSize: theme.fontSize * 1.05,
                    fontWeight: 800,
                    color: theme.primaryColor,
                    marginBottom: 10,
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
    </div>
  )
}
