import { motion } from 'framer-motion'
import { Card } from '../ui/Card'
import { cn } from '../../lib/cn'

const dummyComms = [
  {
    id: 'comm-1',
    subject: 'HMRC Inquiry — Response Deadline',
    messages: 3,
    lastDate: '2026-03-05',
    participants: ['Sarah Thompson', 'Dr. Paul Okafor'],
    direction: 'inbound',
    preview: 'Hi Sarah — just checking in on the status of the HMRC response. The deadline is this Friday...',
  },
  {
    id: 'comm-2',
    subject: 'R&D Claim FY2025 — Technical Narrative Review',
    messages: 5,
    lastDate: '2026-02-18',
    participants: ['Sarah Thompson', 'Lisa Moran'],
    direction: 'outbound',
    preview: 'Please find attached the revised technical narrative for your review. Key changes on pages 4–6...',
  },
  {
    id: 'comm-3',
    subject: 'Engagement Letter & Scope Confirmation',
    messages: 2,
    lastDate: '2026-01-12',
    participants: ['James Perry', 'Dr. Paul Okafor'],
    direction: 'outbound',
    preview: 'Thank you for confirming the engagement scope. Attached is the signed letter for your records...',
  },
  {
    id: 'comm-4',
    subject: 'Cost Schedule — Clarification Needed',
    messages: 4,
    lastDate: '2025-12-20',
    participants: ['Sarah Thompson', 'Lisa Moran'],
    direction: 'inbound',
    preview: 'Could you clarify the subcontractor line items on the cost schedule? We need to split direct vs indirect...',
  },
]

export function EntityCommsTab() {
  return (
    <div className="space-y-3">
      {dummyComms.map((comm, i) => (
        <motion.div
          key={comm.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04, duration: 0.3 }}
        >
          <Card hover className="p-4 cursor-pointer">
            <div className="flex items-start gap-3">
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
                comm.direction === 'inbound' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500',
              )}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  {comm.direction === 'inbound' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                  )}
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-nearblack truncate">{comm.subject}</p>
                  <span className="text-xs text-warmgrey shrink-0">{comm.messages} msgs</span>
                </div>
                <p className="text-xs text-warmgrey mt-0.5">
                  {comm.participants.join(', ')} · {comm.lastDate}
                </p>
                <p className="text-sm text-charcoal/70 mt-1 line-clamp-1">{comm.preview}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
