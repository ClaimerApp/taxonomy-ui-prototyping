import { cn } from '../../lib/cn'

const relativeDate = (dateStr) => {
  const d = new Date(dateStr)
  const now = new Date('2026-03-08T12:00:00Z')
  const diffH = Math.round((now - d) / 3600000)
  if (diffH < 1) return 'Just now'
  if (diffH < 24) return `${diffH}h ago`
  if (diffH < 48) return 'Yesterday'
  const days = Math.round(diffH / 24)
  if (days < 7) return `${days}d ago`
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

export default function EmailRow({ email, selected, onClick }) {
  const initials = email.from.initials || email.from.name.charAt(0)
  const unread = !email.read

  return (
    <div
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors border-l-2',
        selected ? 'bg-blue-50 border-l-blue-500' : unread ? 'bg-white border-l-blue-500' : 'bg-transparent border-l-transparent',
        !selected && 'hover:bg-slate-50'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0',
          email.isAtlas ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-600'
        )}
      >
        {initials}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className={cn('text-sm truncate', unread ? 'font-bold text-slate-900' : 'font-medium text-slate-700')}>
            {email.from.name}
          </span>
          {email.isAtlas && (
            <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded shrink-0">
              Atlas
            </span>
          )}
        </div>
        <div className={cn('text-sm truncate', unread ? 'font-semibold text-slate-800' : 'text-slate-600')}>
          {email.subject}
        </div>
        <div className="text-sm text-slate-500 truncate">{email.preview}</div>
      </div>

      {/* Right: time + star */}
      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className="text-xs text-slate-400">{relativeDate(email.date)}</span>
        {email.starred && (
          <svg className="w-4 h-4 text-amber-500 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.025 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.324-3.957z" />
          </svg>
        )}
      </div>
    </div>
  )
}
