import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { entities } from '../../data/entities'

function worstResult(checks) {
  if (checks.some((c) => c.result === 'critical')) return 'critical'
  if (checks.some((c) => c.result === 'warning')) return 'warning'
  return 'pass'
}

const accentColor = {
  critical: 'bg-red-500',
  warning: 'bg-orange-400',
  pass: 'bg-emerald-500',
}

const rowTint = {
  critical: 'bg-red-50/50',
  warning: 'bg-orange-50/50',
  pass: 'bg-emerald-50/30',
}

const fileTypeConfig = {
  pdf: {
    label: 'PDF',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
  xlsx: {
    label: 'Excel',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M10.875 12c-.621 0-1.125.504-1.125 1.125M12 12c.621 0 1.125.504 1.125 1.125m0 0v1.5c0 .621-.504 1.125-1.125 1.125m1.125-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M10.875 12c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125" />
      </svg>
    ),
  },
  filing: {
    label: 'HMRC Filing',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
      </svg>
    ),
  },
}

function FileTypePill({ fileType }) {
  const config = fileTypeConfig[fileType] || fileTypeConfig.pdf
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-warmgrey/15 text-charcoal/70">
      {config.icon}
      {config.label}
    </span>
  )
}

export function CheckRow({ file }) {
  const worst = worstResult(file.checks)
  const entityName = entities.find((e) => e.id === file.entityId)?.name

  const passCount = file.checks.filter((c) => c.result === 'pass').length
  const warningCount = file.checks.filter((c) => c.result === 'warning').length
  const criticalCount = file.checks.filter((c) => c.result === 'critical').length

  return (
    <Link
      to={`/app/checks/${file.id}`}
      className={cn(
        'flex items-stretch bg-white rounded-xl border border-warmgrey/20 overflow-hidden hover:shadow-md transition-all group',
        rowTint[worst],
      )}
    >
      <div className={cn('w-1 rounded-l shrink-0', accentColor[worst])} />

      <div className="flex items-center gap-4 px-4 py-3 flex-1 min-w-0">
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-lg font-semibold text-nearblack truncate">
            {entityName || file.entityId}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm text-charcoal/70 truncate">{file.fileName}</p>
            <FileTypePill fileType={file.fileType} />
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {criticalCount > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-700">
              {criticalCount} ✖
            </span>
          )}
          {warningCount > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-orange-100 text-orange-700">
              {warningCount} ⚠
            </span>
          )}
          {passCount > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700">
              {passCount} ✓
            </span>
          )}
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-warmgrey group-hover:text-charcoal transition-colors shrink-0"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </div>
    </Link>
  )
}
