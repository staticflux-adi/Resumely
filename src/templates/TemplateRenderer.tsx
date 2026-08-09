import React from 'react'
import { Resume } from '@/types/resume'
import ModernTemplate from './ModernTemplate'
import ProfessionalTemplate from './ProfessionalTemplate'
import MinimalTemplate from './MinimalTemplate'
import CreativeTemplate from './CreativeTemplate'
import ExecutiveTemplate from './ExecutiveTemplate'
import ClassicAtsTemplate from './ClassicAtsTemplate'

export default function TemplateRenderer({ resume }: { resume: Resume }) {
  const props = { data: resume.data, theme: resume.theme }
  switch (resume.template) {
    case 'modern':
      return <ModernTemplate {...props} />
    case 'professional':
      return <ProfessionalTemplate {...props} />
    case 'minimal':
      return <MinimalTemplate {...props} />
    case 'creative':
      return <CreativeTemplate {...props} />
    case 'executive':
      return <ExecutiveTemplate {...props} />
    case 'classic-ats':
      return <ClassicAtsTemplate {...props} />
    default:
      return <ModernTemplate {...props} />
  }
}
