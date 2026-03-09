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

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <h1 className="text-xl font-semibold text-slate-900 mb-4">{email.subject}</h1>

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

        <hr className="border-slate-200 mb-6" />

        {/* Body */}
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
      </div>
    </div>
  )
}
