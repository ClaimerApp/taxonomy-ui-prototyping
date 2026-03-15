import { Link, useNavigate } from 'react-router-dom'

const folders = [
  { label: 'Inbox', count: 4, path: '/email' },
  { label: 'Sent Items', path: '/email/sent' },
  { label: 'Drafts' },
  { label: 'Deleted Items' },
]

const toolbarActions = ['New', 'Reply', 'Forward', 'Delete']

export default function EmailShell({ activeFolder = 'Inbox', children }) {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-56 bg-slate-50 border-r border-slate-200 flex flex-col">
        {/* Outlook header */}
        <Link to="/" className="p-4 flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity">
          {/* Fake Microsoft icon — 4-square grid */}
          <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
            <div className="bg-slate-400 rounded-[1px]" />
            <div className="bg-slate-400 rounded-[1px]" />
            <div className="bg-slate-400 rounded-[1px]" />
            <div className="bg-slate-400 rounded-[1px]" />
          </div>
          <span className="text-sm font-semibold text-slate-700">Outlook</span>
        </Link>

        {/* Folders */}
        <nav className="flex-1 py-2">
          {folders.map((folder) => {
            const isActive = folder.label === activeFolder
            return (
              <button
                key={folder.label}
                onClick={() => folder.path && navigate(folder.path)}
                className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between transition-colors ${
                  isActive
                    ? 'border-l-2 border-blue-500 bg-blue-50 text-blue-700 font-medium'
                    : 'border-l-2 border-transparent text-slate-600 hover:bg-slate-100'
                } ${folder.path ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <span>{folder.label}</span>
                {folder.count && (
                  <span className={`text-xs ${isActive ? 'text-blue-500' : 'text-slate-400'}`}>
                    {folder.count}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center gap-1">
          {toolbarActions.map((action) => (
            <button
              key={action}
              className="px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded transition-colors"
            >
              {action}
            </button>
          ))}
        </div>

        {/* Content — inbox list + reading pane handled by children */}
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  )
}
