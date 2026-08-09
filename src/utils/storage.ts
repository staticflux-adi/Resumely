import { Resume } from '@/types/resume'

const RESUMES_KEY = 'resumely.resumes.v1'
const THEME_KEY = 'resumely.darkMode.v1'

export function loadResumes(): Resume[] {
  try {
    const raw = localStorage.getItem(RESUMES_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

export function saveResumes(resumes: Resume[]): void {
  try {
    localStorage.setItem(RESUMES_KEY, JSON.stringify(resumes))
  } catch (e) {
    console.error('Failed to save resumes', e)
  }
}

export function loadDarkMode(): boolean {
  try {
    const raw = localStorage.getItem(THEME_KEY)
    if (raw === null) {
      return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
    }
    return raw === 'true'
  } catch {
    return false
  }
}

export function saveDarkMode(value: boolean): void {
  try {
    localStorage.setItem(THEME_KEY, String(value))
  } catch (e) {
    console.error('Failed to save theme', e)
  }
}

export function downloadJSON(filename: string, data: unknown): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
