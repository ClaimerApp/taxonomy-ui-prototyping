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
        {/* Header */}
        <h1 className="text-xl font-semibold text-slate-900 mb-4">{email.subject}</h1>

        <div className="flex items-start justify-between mb-1">
          <div>
            {isSent ? (
              <>
                <span className="text-sm text-slate-500">To:</span>
                <span className="font-medium text-slate-900 ml-2">{email.to}</span>
              </>
            ) : (
              <>
                <span className="font-medium text-slate-900">{email.from.name}</span>
                <span className="text-sm text-slate-500 ml-2">&lt;{email.from.email}&gt;</span>
              </>
            )}
          </div>
          <span className="text-sm text-slate-400 shrink-0">{formatDate(email.date)}</span>
        </div>

        {!isSent && (
          <div className="text-sm text-slate-500 mb-4">
            To: {email.to}
          </div>
        )}

        {/* Attachments */}
        {email.attachments?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {email.attachments.map((att) => (
              <div
                key={att.name}
                className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
              >
                <svg className="w-4 h-4 text-red-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-700">{att.name}</span>
                <span className="text-slate-400 text-xs">{att.size}</span>
              </div>
            ))}
          </div>
        )}

        <hr className="border-slate-200 mb-6" />

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
          <div className="text-sm text-slate-400 italic">No message body</div>
        )}
      </div>
    </div>
  )
}
