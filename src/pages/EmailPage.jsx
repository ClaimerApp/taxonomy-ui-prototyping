import { useParams, useNavigate, useLocation } from 'react-router-dom'
import EmailShell from '../components/layout/EmailShell'
import Inbox from '../components/email/Inbox'
import EmailDetail from '../components/email/EmailDetail'
import { emails, sentEmails } from '../data/emails'

export default function EmailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const isSent = location.pathname.startsWith('/email/sent')
  const folderEmails = isSent ? sentEmails : emails
  const selectedId = id || folderEmails[0]?.id
  const selectedEmail = folderEmails.find((e) => e.id === selectedId)
  const basePath = isSent ? '/email/sent' : '/email'

  return (
    <EmailShell activeFolder={isSent ? 'Sent Items' : 'Inbox'}>
      <div className="flex h-full">
        <div className="w-80 border-r border-slate-200 overflow-y-auto">
          <Inbox
            emails={folderEmails}
            selectedId={selectedId}
            onSelect={(emailId) => navigate(`${basePath}/${emailId}`)}
            isSent={isSent}
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          <EmailDetail email={selectedEmail} />
        </div>
      </div>
    </EmailShell>
  )
}
