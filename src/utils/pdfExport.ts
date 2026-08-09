import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { PageSize } from '@/types/resume'

const PAGE_DIMENSIONS_MM: Record<PageSize, { width: number; height: number }> = {
  a4: { width: 210, height: 297 },
  letter: { width: 215.9, height: 279.4 },
}

export async function exportElementToPDF(
  element: HTMLElement,
  filename: string,
  pageSize: PageSize = 'a4',
): Promise<void> {
  const { width: pageWidthMm, height: pageHeightMm } = PAGE_DIMENSIONS_MM[pageSize]

  const canvas = await html2canvas(element, {
    scale: 2.5,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
  })

  const imgData = canvas.toDataURL('image/jpeg', 0.98)

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: pageSize,
  })

  const imgWidthMm = pageWidthMm
  const imgHeightMm = (canvas.height * imgWidthMm) / canvas.width

  let heightLeftMm = imgHeightMm
  let positionMm = 0
  let page = 0

  while (heightLeftMm > 0) {
    if (page > 0) {
      pdf.addPage(pageSize)
    }
    pdf.addImage(imgData, 'JPEG', 0, positionMm, imgWidthMm, imgHeightMm, undefined, 'FAST')
    heightLeftMm -= pageHeightMm
    positionMm -= pageHeightMm
    page += 1
    if (page > 20) break // safety cap
  }

  pdf.save(filename.endsWith('.pdf') ? filename : `${filename}.pdf`)
}
