import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { X, Download, Printer, FileJson, Loader2 } from 'lucide-react'
import { Resume, PageSize, TemplateId } from '@/types/resume'
import TemplateRenderer from '@/templates/TemplateRenderer'
import { TEMPLATE_META } from '@/data/templateMeta'
import { exportElementToPDF } from '@/utils/pdfExport'
import { downloadJSON } from '@/utils/storage'
import { useToast } from '@/components/ui/Toast'

interface Props {
  resume: Resume
  onClose: () => void
  onTemplateChange: (id: TemplateId) => void
}

const PAGE_PX: Record<PageSize, { width: number }> = {
  a4: { width: 794 },
  letter: { width: 816 },
}

export default function PreviewOverlay({ resume, onClose, onTemplateChange }: Props) {
  const [pageSize, setPageSize] = useState<PageSize>('a4')
  const [exporting, setExporting] = useState(false)
  const printRef = useRef<HTMLDivElement>(null)
  const { showToast } = useToast()

  const handleExportPDF = async () => {
    if (!printRef.current) return
    setExporting(true)
    try {
      await exportElementToPDF(printRef.current, `${resume.name}.pdf`, pageSize)
      showToast('PDF exported successfully')
    } catch (e) {
      console.error(e)
      showToast('Failed to export PDF', 'error')
    } finally {
      setExporting(false)
    }
  }

  const handlePrint = () => window.print()

  const handleExportJSON = () => {
    downloadJSON(`${resume.name}.json`, resume)
    showToast('Resume exported as JSON')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-slate-900/60 backdrop-blur-sm"
    >
      <div className="glass flex items-center justify-between gap-3 px-6 py-3 print:hidden">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="btn-ghost !p-2">
            <X className="h-5 w-5" />
          </button>
          <h3 className="font-display font-bold text-slate-800 dark:text-white">Preview & Export</h3>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            className="input !w-auto !py-2"
            value={resume.template}
            onChange={(e) => onTemplateChange(e.target.value as TemplateId)}
          >
            {TEMPLATE_META.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
          <select className="input !w-auto !py-2" value={pageSize} onChange={(e) => setPageSize(e.target.value as PageSize)}>
            <option value="a4">A4</option>
            <option value="letter">Letter</option>
          </select>
          <button className="btn-secondary !py-2" onClick={handleExportJSON}>
            <FileJson className="h-4 w-4" /> JSON
          </button>
          <button className="btn-secondary !py-2" onClick={handlePrint}>
            <Printer className="h-4 w-4" /> Print
          </button>
          <button className="btn-primary !py-2" onClick={handleExportPDF} disabled={exporting}>
            {exporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            Export PDF
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto py-10">
        <div
          id="resume-print-area"
          ref={printRef}
          style={{ width: PAGE_PX[pageSize].width, margin: '0 auto' }}
          className="shadow-2xl"
        >
          <TemplateRenderer resume={resume} />
        </div>
      </div>
    </motion.div>
  )
}
