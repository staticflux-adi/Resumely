import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { Resume, TemplateId, DEFAULT_THEME, blankResumeData } from '@/types/resume'
import { loadResumes, saveResumes } from '@/utils/storage'
import { uid } from '@/utils/id'

interface ResumeContextValue {
  resumes: Resume[]
  createResume: (name: string, template?: TemplateId) => Resume
  updateResume: (id: string, updater: (r: Resume) => Resume) => void
  deleteResume: (id: string) => void
  duplicateResume: (id: string) => Resume | undefined
  renameResume: (id: string, name: string) => void
  getResume: (id: string) => Resume | undefined
  importResume: (data: unknown) => Resume | undefined
}

const ResumeContext = createContext<ResumeContextValue | undefined>(undefined)

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resumes, setResumes] = useState<Resume[]>(() => loadResumes())

  useEffect(() => {
    saveResumes(resumes)
  }, [resumes])

  const createResume = useCallback((name: string, template: TemplateId = 'modern') => {
    const now = new Date().toISOString()
    const resume: Resume = {
      id: uid('resume'),
      name: name.trim() || 'Untitled Resume',
      createdAt: now,
      updatedAt: now,
      template,
      theme: { ...DEFAULT_THEME },
      data: blankResumeData(),
    }
    setResumes((prev) => [resume, ...prev])
    return resume
  }, [])

  const updateResume = useCallback((id: string, updater: (r: Resume) => Resume) => {
    setResumes((prev) =>
      prev.map((r) => (r.id === id ? { ...updater(r), updatedAt: new Date().toISOString() } : r)),
    )
  }, [])

  const deleteResume = useCallback((id: string) => {
    setResumes((prev) => prev.filter((r) => r.id !== id))
  }, [])

  const duplicateResume = useCallback(
    (id: string) => {
      let copy: Resume | undefined
      setResumes((prev) => {
        const original = prev.find((r) => r.id === id)
        if (!original) return prev
        const now = new Date().toISOString()
        copy = {
          ...original,
          id: uid('resume'),
          name: `${original.name} (Copy)`,
          createdAt: now,
          updatedAt: now,
        }
        return [copy, ...prev]
      })
      return copy
    },
    [],
  )

  const renameResume = useCallback((id: string, name: string) => {
    setResumes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, name, updatedAt: new Date().toISOString() } : r)),
    )
  }, [])

  const getResume = useCallback((id: string) => resumes.find((r) => r.id === id), [resumes])

  const importResume = useCallback((data: unknown) => {
    try {
      const parsed = data as Resume
      if (!parsed || typeof parsed !== 'object' || !parsed.data) return undefined
      const now = new Date().toISOString()
      const resume: Resume = {
        ...parsed,
        id: uid('resume'),
        name: `${parsed.name || 'Imported Resume'}`,
        createdAt: now,
        updatedAt: now,
      }
      setResumes((prev) => [resume, ...prev])
      return resume
    } catch {
      return undefined
    }
  }, [])

  return (
    <ResumeContext.Provider
      value={{
        resumes,
        createResume,
        updateResume,
        deleteResume,
        duplicateResume,
        renameResume,
        getResume,
        importResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  )
}

export function useResumes(): ResumeContextValue {
  const ctx = useContext(ResumeContext)
  if (!ctx) throw new Error('useResumes must be used within ResumeProvider')
  return ctx
}
