import { useParams, useNavigate } from 'react-router-dom'
import EmailShell from '../components/layout/EmailShell'
import Inbox from '../components/email/Inbox'
import EmailDetail from '../components/email/EmailDetail'
import { emails } from '../data/emails'

export default function EmailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const selectedId = id || emails[0]?.id
  const selectedEmail = emails.find((e) => e.id === selectedId)

  return (
    <EmailShell>
      <div className="flex h-full">
        <div className="w-80 border-r border-slate-200 overflow-y-auto">
          <Inbox
            emails={emails}
            selectedId={selectedId}
            onSelect={(emailId) => navigate(`/email/${emailId}`)}
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          <EmailDetail email={selectedEmail} />
        </div>
      </div>
    </EmailShell>
  )
}
