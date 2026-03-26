import { cn } from '../../lib/cn'

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

const formatShortDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

const fileTypeIcon = (type) => {
  if (type === 'pdf') {
    return (
      <div className="w-10 h-12 bg-white border border-slate-200 rounded-sm flex flex-col items-center justify-center shrink-0">
        <svg className="w-5 h-5 text-red-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" opacity="0.15" />
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M14 2v6h6" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span className="text-[7px] font-bold text-red-600 mt-0.5 leading-none">PDF</span>
      </div>
    )
  }
  return (
    <div className="w-10 h-12 bg-white border border-slate-200 rounded-sm flex items-center justify-center shrink-0">
      <svg className="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
        <path d="M14 2v6h6" />
      </svg>
    </div>
  )
}

export default function EmailDetail({ email }) {
  if (!email) {
    return (
      <div className="flex items-center justify-center h-full text-slate-400 text-sm">
        Select an email to read
      </div>
    )
  }

  const isSent = email.folder === 'sent'

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto">
        {/* Subject */}
        <h1 className="text-xl font-semibold text-slate-900 mb-4" style={{ fontFamily: "'Segoe UI', -apple-system, sans-serif" }}>
          {email.subject}
        </h1>

        {isSent ? (
          /* Sent email header — Outlook style */
          <div className="text-[13px] mb-0" style={{ fontFamily: "'Segoe UI', -apple-system, sans-serif" }}>
            <div className="flex items-center gap-3 mb-2">
              {/* Sender avatar — Outlook uses initials circle */}
              <div className="w-8 h-8 rounded-full bg-[#0078d4] flex items-center justify-center text-white text-xs font-semibold shrink-0">
                {email.from.initials}
              </div>
              <div>
                <span className="font-semibold text-slate-900">{email.from.name}</span>
                <span className="text-slate-500 ml-1.5">&lt;{email.from.email}&gt;</span>
              </div>
            </div>
            <div className="pl-11 space-y-0.5 text-slate-500">
              <div>
                <span className="font-semibold text-slate-600">To:</span>
                <span className="ml-2">{email.to}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-600">Sent:</span>
                <span className="ml-2">{formatShortDate(email.date)}</span>
              </div>
            </div>
          </div>
        ) : (
          /* Received email header */
          <>
            <div className="flex items-start justify-between mb-1">
              <div>
                <span className="font-medium text-slate-900">{email.from.name}</span>
                <span className="text-sm text-slate-500 ml-2">&lt;{email.from.email}&gt;</span>
              </div>
              <span className="text-sm text-slate-400 shrink-0">{formatDate(email.date)}</span>
            </div>
            <div className="text-sm text-slate-500 mb-4">
              To: {email.to}
            </div>
          </>
        )}

        <hr className="border-slate-200 my-3" />

        {/* Attachments — Outlook shows these below the header separator */}
        {email.attachments?.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-2">
              {email.attachments.map((att) => (
                <div
                  key={att.name}
                  className="flex items-center gap-2.5 border border-slate-200 rounded px-2.5 py-1.5 hover:bg-slate-50 cursor-pointer group"
                  style={{ fontFamily: "'Segoe UI', -apple-system, sans-serif" }}
                >
                  {fileTypeIcon(att.type)}
                  <div className="flex flex-col min-w-0">
                    <span className="text-[13px] text-slate-800 truncate">{att.name}</span>
                    <span className="text-[11px] text-slate-400">{att.size}</span>
                  </div>
                  {/* Outlook-style dropdown chevron on hover */}
                  <svg className="w-3 h-3 text-slate-300 group-hover:text-slate-500 shrink-0 ml-1" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 5l3 3 3-3" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Body */}
        {email.body ? (
          <div
            className="prose prose-slate prose-sm max-w-none [&_a]:text-amber-600 [&_a]:no-underline hover:[&_a]:underline"
            dangerouslySetInnerHTML={{ __html: email.body }}
            onClick={(e) => {
              const link = e.target.closest('a')
              if (link?.href?.includes('#/app/')) {
                e.preventDefault()
                window.open(link.href, '_blank')
              }
            }}
          />
        ) : (
          <div className="text-sm text-slate-400 italic mt-4">No message body</div>
        )}
      </div>
    </div>
  )
}
