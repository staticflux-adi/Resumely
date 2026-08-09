export type TemplateId =
  | 'modern'
  | 'professional'
  | 'minimal'
  | 'creative'
  | 'executive'
  | 'classic-ats'

export type PageSize = 'a4' | 'letter'

export interface ThemeSettings {
  primaryColor: string
  secondaryColor: string
  fontFamily: string
  fontSize: number // base px
  lineHeight: number
  margin: number // px
  showIcons: boolean
  accentColor: string
}

export const DEFAULT_THEME: ThemeSettings = {
  primaryColor: '#3346f0',
  secondaryColor: '#1e2352',
  fontFamily: 'Inter',
  fontSize: 14,
  lineHeight: 1.5,
  margin: 32,
  showIcons: true,
  accentColor: '#f78c1f',
}

export interface PersonalInfo {
  firstName: string
  lastName: string
  title: string
  email: string
  phone: string
  address: string
  website: string
  linkedin: string
  github: string
  portfolio: string
}

export interface EducationItem {
  id: string
  school: string
  degree: string
  field: string
  startDate: string
  endDate: string
  grade: string
  description: string
}

export interface ExperienceItem {
  id: string
  jobTitle: string
  company: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  bullets: string[]
}

export interface ProjectItem {
  id: string
  name: string
  technologies: string
  description: string
  githubLink: string
  liveLink: string
}

export interface SkillItem {
  id: string
  name: string
  level: number // 1-5
}

export interface CertificationItem {
  id: string
  name: string
  issuer: string
  date: string
}

export interface AchievementItem {
  id: string
  title: string
  description: string
}

export interface LanguageItem {
  id: string
  name: string
  proficiency: 'Basic' | 'Conversational' | 'Fluent' | 'Native'
}

export interface ReferenceItem {
  id: string
  name: string
  relationship: string
  company: string
  email: string
  phone: string
}

export interface CustomSection {
  id: string
  title: string
  items: { id: string; heading: string; subheading: string; description: string }[]
}

export type SectionKey =
  | 'summary'
  | 'experience'
  | 'education'
  | 'projects'
  | 'skills'
  | 'certifications'
  | 'achievements'
  | 'languages'
  | 'interests'
  | 'references'
  | `custom:${string}`

export interface ResumeData {
  personal: PersonalInfo
  summary: string
  education: EducationItem[]
  experience: ExperienceItem[]
  projects: ProjectItem[]
  technicalSkills: SkillItem[]
  softSkills: SkillItem[]
  certifications: CertificationItem[]
  achievements: AchievementItem[]
  languages: LanguageItem[]
  interests: string[]
  references: ReferenceItem[]
  customSections: CustomSection[]
  sectionOrder: string[]
}

export interface Resume {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  template: TemplateId
  theme: ThemeSettings
  data: ResumeData
}

export const DEFAULT_SECTION_ORDER = [
  'summary',
  'experience',
  'education',
  'projects',
  'skills',
  'certifications',
  'achievements',
  'languages',
  'interests',
  'references',
]

export function blankResumeData(): ResumeData {
  return {
    personal: {
      firstName: '',
      lastName: '',
      title: '',
      email: '',
      phone: '',
      address: '',
      website: '',
      linkedin: '',
      github: '',
      portfolio: '',
    },
    summary: '',
    education: [],
    experience: [],
    projects: [],
    technicalSkills: [],
    softSkills: [],
    certifications: [],
    achievements: [],
    languages: [],
    interests: [],
    references: [],
    customSections: [],
    sectionOrder: [...DEFAULT_SECTION_ORDER],
  }
}
