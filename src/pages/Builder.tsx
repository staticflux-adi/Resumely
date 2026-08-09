import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Eye, Menu, X, LayoutTemplate } from 'lucide-react'
import { useResumes } from '@/context/ResumeContext'
import { useToast } from '@/components/ui/Toast'
import { uid } from '@/utils/id'
import { TemplateId, CustomSection } from '@/types/resume'
import { TEMPLATE_META } from '@/data/templateMeta'

import BuilderSidebar from '@/components/builder/Sidebar'
import PreviewOverlay from '@/components/builder/PreviewOverlay'
import PersonalInfoSection from '@/components/builder/sections/PersonalInfoSection'
import SummarySection from '@/components/builder/sections/SummarySection'
import EducationSection from '@/components/builder/sections/EducationSection'
import ExperienceSection from '@/components/builder/sections/ExperienceSection'
import ProjectsSection from '@/components/builder/sections/ProjectsSection'
import SkillsSection from '@/components/builder/sections/SkillsSection'
import CertificationsSection from '@/components/builder/sections/CertificationsSection'
import AchievementsSection from '@/components/builder/sections/AchievementsSection'
import LanguagesSection from '@/components/builder/sections/LanguagesSection'
import InterestsSection from '@/components/builder/sections/InterestsSection'
import ReferencesSection from '@/components/builder/sections/ReferencesSection'
import CustomSectionEditor from '@/components/builder/sections/CustomSectionEditor'
import ThemeCustomizerSection from '@/components/builder/sections/ThemeCustomizerSection'

export default function Builder() {
  const { resumeId } = useParams<{ resumeId: string }>()
  const navigate = useNavigate()
  const { getResume, updateResume } = useResumes()
  const { showToast } = useToast()

  const resume = resumeId ? getResume(resumeId) : undefined

  const [activeSection, setActiveSection] = useState('personal')
  const [previewOpen, setPreviewOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    if (resumeId && !resume) {
      showToast('Resume not found', 'error')
      navigate('/dashboard')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeId, resume])

  if (!resume) return null

  const patchData = (patch: Partial<typeof resume.data>) =>
    updateResume(resume.id, (r) => ({ ...r, data: { ...r.data, ...patch } }))

  const setTemplate = (template: TemplateId) => updateResume(resume.id, (r) => ({ ...r, template }))

  const addCustomSection = () => {
    const section: CustomSection = { id: uid('custom'), title: 'Custom Section', items: [] }
    updateResume(resume.id, (r) => ({
      ...r,
      data: {
        ...r.data,
        customSections: [...r.data.customSections, section],
        sectionOrder: [...r.data.sectionOrder, `custom:${section.id}`],
      },
    }))
    setActiveSection(`custom:${section.id}`)
  }

  const removeCustomSection = (sectionId: string) => {
    updateResume(resume.id, (r) => ({
      ...r,
      data: {
        ...r.data,
        customSections: r.data.customSections.filter((s) => s.id !== sectionId),
        sectionOrder: r.data.sectionOrder.filter((k) => k !== `custom:${sectionId}`),
      },
    }))
    setActiveSection('personal')
  }

  const renderActiveSection = () => {
    if (activeSection === 'personal') {
      return <PersonalInfoSection value={resume.data.personal} onChange={(personal) => patchData({ personal })} />
    }
    if (activeSection === 'theme') {
      return (
        <ThemeCustomizerSection
          theme={resume.theme}
          onChange={(theme) => updateResume(resume.id, (r) => ({ ...r, theme }))}
        />
      )
    }
    if (activeSection === 'summary') {
      return <SummarySection value={resume.data.summary} onChange={(summary) => patchData({ summary })} />
    }
    if (activeSection === 'experience') {
      return <ExperienceSection items={resume.data.experience} onChange={(experience) => patchData({ experience })} />
    }
    if (activeSection === 'education') {
      return <EducationSection items={resume.data.education} onChange={(education) => patchData({ education })} />
    }
    if (activeSection === 'projects') {
      return <ProjectsSection items={resume.data.projects} onChange={(projects) => patchData({ projects })} />
    }
    if (activeSection === 'skills') {
      return (
        <SkillsSection
          technical={resume.data.technicalSkills}
          soft={resume.data.softSkills}
          onChangeTechnical={(technicalSkills) => patchData({ technicalSkills })}
          onChangeSoft={(softSkills) => patchData({ softSkills })}
        />
      )
    }
    if (activeSection === 'certifications') {
      return <CertificationsSection items={resume.data.certifications} onChange={(certifications) => patchData({ certifications })} />
    }
    if (activeSection === 'achievements') {
      return <AchievementsSection items={resume.data.achievements} onChange={(achievements) => patchData({ achievements })} />
    }
    if (activeSection === 'languages') {
      return <LanguagesSection items={resume.data.languages} onChange={(languages) => patchData({ languages })} />
    }
    if (activeSection === 'interests') {
      return <InterestsSection items={resume.data.interests} onChange={(interests) => patchData({ interests })} />
    }
    if (activeSection === 'references') {
      return <ReferencesSection items={resume.data.references} onChange={(references) => patchData({ references })} />
    }
    if (activeSection.startsWith('custom:')) {
      const id = activeSection.split(':')[1]
      const section = resume.data.customSections.find((s) => s.id === id)
      if (!section) return null
      return (
        <CustomSectionEditor
          section={section}
          onChange={(updated) =>
            patchData({ customSections: resume.data.customSections.map((s) => (s.id === id ? updated : s)) })
          }
          onRemoveSection={() => removeCustomSection(id)}
        />
      )
    }
    return null
  }

  return (
    <div className="flex h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <header className="flex items-center justify-between gap-3 border-b border-slate-100 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-2">
          <button
            className="md:hidden btn-ghost !p-2"
            onClick={() => setMobileNavOpen((v) => !v)}
          >
            {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link to="/dashboard" className="btn-ghost !p-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <input
            className="w-40 truncate border-none bg-transparent text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-brand-200 rounded-lg px-2 py-1 sm:w-64 dark:text-white"
            value={resume.name}
            onChange={(e) => updateResume(resume.id, (r) => ({ ...r, name: e.target.value }))}
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1.5 sm:flex">
            <LayoutTemplate className="h-4 w-4 text-slate-400" />
            <select
              className="input !w-auto !py-1.5 !text-xs"
              value={resume.template}
              onChange={(e) => setTemplate(e.target.value as TemplateId)}
            >
              {TEMPLATE_META.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
          <button className="btn-primary !py-2" onClick={() => setPreviewOpen(true)}>
            <Eye className="h-4 w-4" /> Preview & Export
          </button>
        </div>
      </header>

      <div className="relative flex flex-1 overflow-hidden">
        <aside className="hidden w-72 shrink-0 border-r border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900 md:block">
          <BuilderSidebar
            data={resume.data}
            activeSection={activeSection}
            onSelect={setActiveSection}
            onReorder={(sectionOrder) => patchData({ sectionOrder })}
            onAddCustomSection={addCustomSection}
          />
        </aside>

        <AnimatePresence>
          {mobileNavOpen && (
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'tween', duration: 0.2 }}
              className="absolute inset-y-0 left-0 z-30 w-72 border-r border-slate-100 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900 md:hidden"
            >
              <BuilderSidebar
                data={resume.data}
                activeSection={activeSection}
                onSelect={(k) => {
                  setActiveSection(k)
                  setMobileNavOpen(false)
                }}
                onReorder={(sectionOrder) => patchData({ sectionOrder })}
                onAddCustomSection={() => {
                  addCustomSection()
                  setMobileNavOpen(false)
                }}
              />
            </motion.aside>
          )}
        </AnimatePresence>

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl px-6 py-8">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="card p-6"
            >
              {renderActiveSection()}
            </motion.div>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {previewOpen && (
          <PreviewOverlay resume={resume} onClose={() => setPreviewOpen(false)} onTemplateChange={setTemplate} />
        )}
      </AnimatePresence>
    </div>
  )
}
