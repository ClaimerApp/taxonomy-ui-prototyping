import EmailRow from './EmailRow'

export default function Inbox({ emails, selectedId, onSelect }) {
  return (
    <div className="overflow-y-auto h-full divide-y divide-slate-100">
      {emails.map((email) => (
        <EmailRow
          key={email.id}
          email={email}
          selected={email.id === selectedId}
          onClick={() => onSelect(email.id)}
        />
      ))}
    </div>
  )
}
