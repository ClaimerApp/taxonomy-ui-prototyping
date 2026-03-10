import { motion } from 'framer-motion'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'

const dummyFiles = [
  { id: 'f-1', name: 'R&D_Tax_Claim_FY2025.pdf', type: 'PDF', size: '2.4 MB', uploadedAt: '2026-02-18', uploadedBy: 'Sarah Thompson', status: 'checked' },
  { id: 'f-2', name: 'Technical_Narrative_v3.docx', type: 'DOCX', size: '890 KB', uploadedAt: '2026-02-10', uploadedBy: 'Sarah Thompson', status: 'checked' },
  { id: 'f-3', name: 'Cost_Schedule_2025.xlsx', type: 'XLSX', size: '145 KB', uploadedAt: '2026-01-28', uploadedBy: 'Client upload', status: 'unchecked' },
  { id: 'f-4', name: 'Engagement_Letter_Signed.pdf', type: 'PDF', size: '520 KB', uploadedAt: '2026-01-10', uploadedBy: 'James Perry', status: 'checked' },
  { id: 'f-5', name: 'Project_Breakdown_Notes.pdf', type: 'PDF', size: '1.1 MB', uploadedAt: '2025-12-05', uploadedBy: 'Client upload', status: 'unchecked' },
]

const typeIcon = {
  PDF: 'text-red-500',
  DOCX: 'text-blue-500',
  XLSX: 'text-green-600',
}

export function EntityFilesTab() {
  return (
    <div className="space-y-3">
      {dummyFiles.map((file, i) => (
        <motion.div
          key={file.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04, duration: 0.3 }}
        >
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <svg className={`w-5 h-5 shrink-0 ${typeIcon[file.type] || 'text-warmgrey'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-nearblack truncate">{file.name}</p>
                <p className="text-xs text-warmgrey mt-0.5">
                  {file.type} · {file.size} · Uploaded {file.uploadedAt} by {file.uploadedBy}
                </p>
              </div>
              <Badge variant={file.status === 'checked' ? 'pass' : 'default'} className="shrink-0">
                {file.status === 'checked' ? 'Checked' : 'Unchecked'}
              </Badge>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
